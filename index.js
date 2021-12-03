import childProcess from "child_process"
import readline from "readline"

const runScript = (scriptPath, callback) => {

  // keep track of whether callback has been invoked to prevent multiple invocations
  let invoked = false;

  let process = childProcess.fork(scriptPath);

  // listen for errors as they may prevent the exit event from firing
  process.on('error', (err) => {
      if (invoked) return;
      invoked = true;
      callback(err);
  });

  // execute the callback once the process has finished running
  process.on('exit', (code) => {
      if (invoked) return;
      invoked = true;
      let err = code === 0 ? null : new Error('exit code ' + code);
      callback(err);
  });

}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question("What solution do you want to run? e.g. 01-1 ", (fileName) => {
  runScript(`./challenges/${fileName}.js`, (err) => {
    if (err) throw err
    console.log(`Finished running ${fileName}.js`)
    rl.close()
  })
})