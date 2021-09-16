

function test(resolve, reject) {
  var timeOut = Math.random() * 2;
  log('set timeout to: ' + timeOut + ' seconds.');
  setTimeout(function () {
    if (timeOut < 1) {
      console.log('call resolve()...');
      resolve('200 OK');
    }
    else {
      console.log('call reject()...');
      // reject('timeout in ' + timeOut + ' seconds.');
    }
  }, timeOut * 1000);
}

let p1 = new Promise(test)

p1.then(console.log)