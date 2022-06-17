var INotifyWait = require('inotifywait');
const { exec } = require('child_process');
const execSync = require('child_process').execSync;

var starttime = 0;
var count = 0;

//run test
var hrTime = process.hrtime();
starttime = hrTime[0] * 1000 + hrTime[1] / 1000000
execSync('for i in $(seq 1 100); do dd if=/dev/urandom of=/home/test/ownCloud/testfile$i bs=1M count=3; done', {encoding:'utf-8'});


var watch1 = new INotifyWait('/var/www/owncloud/data/test/files', { recursive: true });
watch1.on('ready', function (filename) {
  console.log('inotify is watching');
});
watch1.on('add', function (filename) {
  var hrTime = process.hrtime();
  var N = hrTime[0] * 1000 + hrTime[1] / 1000000
  if(filename.includes("ocTransfer")){
    count++;
    if(count == 99){
      console.log(filename + ' add took ' + (N - starttime) + ' miliseconds');
      throw ''
    }
  }
});
watch1.on('change', function (filename) {
  var hrTime = process.hrtime();
  var N = hrTime[0] * 1000 + hrTime[1] /1000000
  if(filename.includes("ocTransfer")){
    count++;
    if(count == 99){
      console.log(filename + ' change took ' + (N - starttime) + ' miliseconds');
      throw ''
    }
  }
});
watch1.on('unlink', function (filename) {
  var hrTime = process.hrtime();
  var N = hrTime[0] * 1000 + hrTime[1] /1000000
  if(filename.includes("ocTransfer")){
    count++;
    if(count == 99){
      console.log(filename + ' unlink took ' + (N - starttime) + ' miliseconds');
      throw ''
    }
  }
});
watch1.on('unknown', function (filename) {
  var hrTime = process.hrtime();
  var N = hrTime[0] * 1000 + hrTime[1] /1000000
  if(filename.includes("ocTransfer")){
    count++;
    if(count == 99){
      console.log(filename + ' unknown took ' + (N - starttime) + ' miliseconds');
      throw ''
    }
  }
});


