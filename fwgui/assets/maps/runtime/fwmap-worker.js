/* Worker host for the separately compiled MapLibre module. */
'use strict';
let runtime;
let runtimeReady = false;
let revision = 0;
let lastFrame = 0;
let lastStatus = '';
let pollTimer;
let stopping = false;
let pendingRequest;
const reads = {bytes: 0, largest: 0, count: 0};

function reportError(error) {
    if (stopping) return;
    postMessage({type: 'error', revision, message: String(error.message || error)});
    shutdown();
}

async function initialize(file) {
    if (!self.crossOriginIsolated || typeof SharedArrayBuffer === 'undefined')
        throw new Error('Browser maps need COOP: same-origin and COEP: require-corp hosting headers');
    if (typeof OffscreenCanvas === 'undefined')
        throw new Error('Browser maps need OffscreenCanvas and WebGL2 support');
    if (!(file instanceof Blob)) throw new Error('Select the local .mbtiles file again');
    importScripts('fwmap-web.js');
    // Emscripten fills the module object during asynchronous startup. Guard
    // C API entry and explicit pthread teardown until its pool is fully loaded.
    runtime = {
        mainScriptUrlOrBlob: new URL('fwmap-web.js', self.location.href).href,
        locateFile: path => new URL(path, self.location.href).href,
        onAbort: message => reportError(new Error('Map renderer stopped: ' + message)),
        printErr: message => console.error(message)
    };
    await createFWMapRuntime(runtime);
    if (stopping) { shutdown(); return; }
    runtimeReady = true;
    runtime.FS.mkdir('/maps');
    const read = runtime.WORKERFS.stream_ops.read;
    runtime.WORKERFS.stream_ops.read = function(stream, buffer, offset, length, position) {
        const count = read(stream, buffer, offset, length, position);
        reads.bytes += count;
        reads.largest = Math.max(reads.largest, count);
        reads.count++;
        return count;
    };
    runtime.FS.mount(runtime.WORKERFS, {blobs: [{name: 'archive.mbtiles', data: file}]}, '/maps');
    submitPending();
    pollTimer = setInterval(poll, 16);
}

function submitPending() {
    if (!runtimeReady || !pendingRequest || stopping) return;
    const request = pendingRequest;
    pendingRequest = undefined;
    runtime.ccall('fwmap_submit', null, ['string'], [JSON.stringify(request)]);
}

function poll() {
    if (!runtimeReady || stopping) return;
    try {
        const status = JSON.parse(runtime.ccall('fwmap_poll', 'string', [], []));
        if (status.stage === undefined) return;
        const frame = status.frame;
        delete status.frame;
        const serialized = JSON.stringify(status);
        if (serialized !== lastStatus) {
            lastStatus = serialized;
            postMessage({type: 'status', revision, status, reads: {...reads}});
        }
        if (frame && frame.sequence > lastFrame) {
            lastFrame = frame.sequence;
            const pointer = runtime.ccall('fwmap_frame_pixels', 'number', [], []);
            const pixels = runtime.HEAPU8.slice(pointer, pointer + frame.width * frame.height * 4);
            postMessage({type: 'frame', revision, frame, pixels, reads: {...reads}}, [pixels.buffer]);
        }
    } catch (error) { reportError(error); }
}

function shutdown() {
    stopping = true;
    clearInterval(pollTimer);
    // Once initialized, stop every pthread before closing its host. During
    // startup the browser aborts the worker tree when this host closes and its
    // owner terminates it; Emscripten's teardown must not interrupt pool setup.
    if (runtimeReady) runtime.PThread.terminateAllThreads();
    runtime = undefined;
    runtimeReady = false;
    postMessage({type: 'disposed'});
    close();
}

self.onmessage = event => {
    const message = event.data;
    if (message.type === 'dispose') { shutdown(); return; }
    if (stopping) return;
    revision = message.revision;
    lastStatus = '';
    pendingRequest = message.request;
    if (message.type === 'init') initialize(message.file).catch(reportError);
    else if (message.type === 'request') {
        try { submitPending(); } catch (error) { reportError(error); }
    }
};
