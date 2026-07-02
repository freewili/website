

use the asset folder to create a webpage for FREE-WILi 2 (www.freewili.com) using the assets in the folder assets.

The follow webpage is a great example on how to layout the webpage.

[M5 CardputerZero&ndash; m5stack-store](https://shop.m5stack.com/pages/m5-cardputerzero?srsltid=AfmBOoo9cq91cBj7PPavjkMLkJlWY1damLkEwEq5ujaMN_WQ03bvGsvN)



The following is a description on FREE-WILi



So day one of Free Wili one was at DEFCON in 2024. The very same day at DEFCON Raspberry Pi announced the RP2350 upgraded CPU - the RP2350. The developers of the silicon were all at DEFCON about 100 yards from our booth in vendor village. It was a good/bad surprise since we were launching with RP2040.
 It was really interesting to get to talk to RPi developers all about how the RP2350 closed a lot of the short comings of the RP2040 .So the first drop is we have upgraded the display (gpu) and the main micro-controller to the RP2350. This part has way more resources, performance and low power capabilities. It also is mostly software compatible (last year's ICS Village badge we made had it). We have augmented CPUs with 8Mbytes of serial SRAM too.



We have upgraded the GPIO on FREE-WILi 2. Mechanically this is how it adds up:

1. 20 position connector from FREE-WILi 1 (this allows compatibility with older Orcas)

2. 10 position connector with new IOs that are mainly analog

3. Mechanical fastening posts to allow rigid connection of Orcas.

The GPIO from FREE-WILi one are still there. We have upgraded the i2c translator to a faster speed upgrade.
A big user problem with the GPIO was setting the IO voltage.
To address this issue we added the ability to software enable the IO voltage from four sources: 1) the 5v supply, 2) the 3.3v supply, 3) the IO pin (as it was in FW1) , and 4) a new programmable power supply (described below). Further we measure the IO voltage with an ADC.
The IO voltage pin can now a be used as a analog trigger input. This input is fed through the same analog front end as the normal analog channels (0-5V) and the put through a window comparator.
The old debug pins are now CAN FD pins. FREE-WILi 2 is now has CAN FD so you can interface with Cars and Industrial systems. We support the full 8Mbit speed grade.
The analog inputs have a op-amp front end so the RP2350 can capture 0-5v signals. Also the analog inputs connect to a PGA amplifier so that low differential signals can be read from combinations of inputs at lower sample rates (1Khz).
The analog outputs also support 0-5V range. They run at a 25Khz update rate.
The programmable power supply supports an voltage range of 1 to 5.5 V. It has current capability of 1.5A. it is programmable by the main CPU through its i2c bus so its update rate is limited. The power supply output has a MOSFET crowbar connected to the main CPU to support voltage glitching.
The I2C bus on the analog connector is 3.3v only and is designed to communicate with the Orca module. An EEPROM memory in the Orca will let FREE-WILi 2 automatically configure and store Orca related data.





In FREE-WILi 2 we upgraded to a 3.5 inch 480x320 cap touch screen. So much more is possible on this screen.



At DEFCON last year we offered wifi support with the bottle nose orca ([Bottlenose WiFi Orca - FREE-WILi](https://freewili.com/products/orca-modules/bottlenose-wifi-orca/ "https://freewili.com/products/orca-modules/bottlenose-wifi-orca/")). I am happy to announce that FREE-WILi 2 has this integrated inside so it does not use any of the GPIO. Also we upgraded the ESP module to the C5 to support 5Ghz.

FREE-WILi 2 has upgraded the subghz support. We now have one antenna and can switch between CC1101 and a LORA radio. We have ported the meshstastic app so you can go full pirate radio!

FREE-WILi 2 upgrades the accelerometer with a full IMU (BMI323)+Magnometer (BMM350). This allows a lot of really cool uses case for using the physical position for input.

FREE-WILi 2 has added an SDCard. The SDCard is run-time swappable between the Main CPU and an integrated SDCard reader. The high speed USB SD card reader offers very fast and wide operating system support for exchanging files with the FREE-WILi device. Also you can launch FREE-WILi host software like FREE-WILi GUI right from the device. FREE-WILi GUI is a no dependency USBdrive capable app so no install is necessary.

Our audio support has expanded in FREE-WILi 2. We added a 3.5mm jack that supports an external head phone and/or microphone. Also we added 3 more microphones to support a microphone phase array. This combined with the extra processing found in the RP2350 CPU can make some really audio applications possible. VIVA LAS VEGAS is coming back loud and clear

FREE-WILi 2 has added a ambient light sensor (OPT4001) and a humidity/temperature sensor (SHT40) to expand measurement and environment awareness.

FREE-WILi 2 has added a full size DVI connector that is driven by the RP2350 HSTX capability.

Have you heard of the Adafruit FruitJam? Yes FREE-WILi 2 display CPU is nearly 100 % compatible with it (hardware is compatible but some different pins) . This means anyone will be able to easily port a fruitjam app to our hardware. [Overview | Adafruit Fruit Jam | Adafruit Learning System](https://learn.adafruit.com/adafruit-fruit-jam/overview "https://learn.adafruit.com/adafruit-fruit-jam/overview") . Our wiliteam created an port of PICO8 gaming for fruit jam to test retro gaming on our hardware. [Overview | PICO-8 Fruit Jam Reality Console | Adafruit Learning System](https://learn.adafruit.com/pico-8-fruit-jam-reality-console/ "https://learn.adafruit.com/pico-8-fruit-jam-reality-console/")



The adafruit compatiblity hints at the next feature: USB host. We have 3 host ports on FREE-WILi 2. These can be used for a mouse, keyboard, joystick, gps, serial port, thumbdrive, etc. Really its up to the limits of the USB stack (check out TinyUSB). Two ports connect to the Display CPU and are 12 Mbit - the other is high-speed 480 Mbit. The 5V host power is controlled by the Display CPU so it really easy to use these and on/off 5V sources.

The second USB port (based on PIO) in the display CPU connects to the host to support scriptable USB (bad USB or USB testing)

At both DEFCONs since we announced FREE-WILi every other question was about RFID. I am happy to say that FREE-WILi 2 has RFID (100kz) and NFC support. On the 100 khz side the RP2350 gives us some interesting options with the high speed ADC and PIO support. for NFC we support the ST25R3916B for STmicro.

The FREE-WILi 2 adds more buttons! We jave a full 5 button dpad and 4 new buttons that are A B X Y positioned named home ok cancel and page . We still have the 5 under screen context buttons. All this makes user input 1000 times better. Also dont forget We have a touch screen

The buttons are designed for comfort. So retro gaming plays as good as it can be

We have a innovative 2 button press per letter keyboard. It will be interesting to see how productive customers will get with it.



FREE-WILi 2 was designed to be a portable tool from the start. We have special ultra low power (ULP) micro on the board that controls 17 power zones. Also the board is designed to run with different powers zones on and off dynamically. The sensors are connected to the ULP on the board so they can be wake-up sources. We have also tripled the size of the battery to 3000mAH. Th ULP also controls charging and getting the most out of USB power that's available.

Free Wili expanded the size of internal USB hub to 7 ports and we use them all. It connects to all of the following: 1) main cpu, 2) USB Sdcard reader, 3) ESP32C5, 4) display CPU usb script engine, 5) debug CPU, 6) high speed main CPU ftdi, 7) Linux CPU or 3rd Host Port

The ESP32C5 supports for debugging and serial output from USB allowing in the box debug.

The debug CPU is an enhanced Raspberry Pi Debug Probe that can flash and debug both rp2350 and the LORA processor.

On board debuging is a great tool for customers building there own firmware - either by hand or with the help of AI.

- Did someone say Linux?



We have support for the RPi-CM0 module. It has a direct connection to the on board FPGA. Then it connects to both the internal USB hub to act as a USB gadget and the 3rd host port. The CM0 only has one USB so its software swapped between device mode and host port. It also has the SDCard for the OS. The RPi communicates with FREE-WILi 2 just like an app on linux would communicate. So any drivers on Linux we make work like our python API. The default mode is a headless linux OS so drawing to the screen is the same as our WASM api.

The availability of the CM0 is really questionable - even in China. We designed the FREE-WILi 2 so it works fine if it is not installed. So we are looking into the feasibility of users "bringing" their own and soldering it down.

here is the CM0 on the FREE-WILi 2 device.



FREE-WILi 2 has two sdcard slots 1 for linux and 1 for the main device. Whats fun is that the USB sdcard reader can be used with the Raspberry PI imager. So you do not have to worry about losing your micro sd card reader.



FREE-WILi GU-i has been greatly improved. There are too many new features to list. Some is i2c component data bases, integrated WASM compilers and debuggers, and point and click GUI drawing.



The IR support in FREE-WILi 2 has been improved with stonger LED transmission, a real IR window on the case, and a better orientation of the IR Rx TX circuit.

The FPGA in FREE-WILi 1 stays the same. The ICE40 is a pretty amazing device. There are limitations of the rp2350, even with PIO and dual core, that the FPGA can do well. SPI Slave simulation is one example



Finally my favorite. The SDCard UF2 boot-loader. The SDCard bootloader can load applications written by 3rd parties. So will our open hardware documentation and our AI Agent.md files FREE-WILi 2 is a platform for running any code. Software that is done by the user for the user.

Yes Agents. This new age of AI allows software like claude code to write and debug your embedded application how you want it.

we have integration for Claude and LMstudio (local models) in FREE-WILi Gui



Ok that pretty much sums up FREE-WILi 2. They will be for sale at DEFCON. Who wants to see what it looks like?
