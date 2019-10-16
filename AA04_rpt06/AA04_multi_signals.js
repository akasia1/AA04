// 'use strict';
// cds_node.js;

var serialport = require('serialport');
var portName = 'COM3';  // check your COM port!!
var port    =   process.env.PORT || 3000;

var io = require('socket.io').listen(port);

// serial port object
var sp = new serialport(portName,{
    baudRate: 9600,   // 9600  38400
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
    parser: serialport.parsers.readline('\r\n')  // new serialport.parsers.Readline
});
var dStr = '';
var readData = '';
var temp ='';
var lux = '';
var humi ='';
var mdata =[];
var firstcommaidx = 0;
var secondcommaidx = 0;

sp.on('data',function(data){
    readData = data.toString();
    firstcommaidx = readData.indexOf(',');
    secondcommaidx = readData.indexOf(',',firstcommaidx+1);

    if(firstcommaidx > 0){
        temp =readData.substring( 0 ,firstcommaidx);
        lux = readData.substring(firstcommaidx + 1,secondcommaidx);
        humi = readData.substring(secondcommaidx+1);
        readData = '';

        dStr = getDateString();
        mdata[0]=dStr;
        mdata[1]=temp;
        mdata[2]=lux;
        mdata[3]=humi;
        console.log("AA04,"+mdata);
        io.sockets.emit('message',mdata);
    } else {
        console.log(readData);
    }
})


// helper function to get a nicely formatted date string for IOT
function getDateString() {
    var time = new Date().getTime();
    // 32400000 is (GMT+9 Korea, GimHae)
    // for your timezone just multiply +/-GMT by 3600000
    var datestr = new Date(time +32400000).
    toISOString().replace(/T/, ' ').replace(/Z/, '');
    return datestr;
}

io.sockets.on('connection', function (socket) {
    // If socket.io receives message from the client browser then 
    // this call back will be executed.
    socket.on('message', function (msg) {
        console.log(msg);
    });
    // If a web browser disconnects from Socket.IO then this callback is called.
    socket.on('disconnect', function () {
        console.log('disconnected');
    });
});
