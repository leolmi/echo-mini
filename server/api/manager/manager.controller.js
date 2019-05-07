'use strict';
const u = require('../../utils');
const cp = require('child_process');
const VERSION = '1.0.0';
const execution_root = __dirname;

const _showFolder = (folder) => {
  folder = u.parseRoot(folder);
  if (fs.existsSync(folder)) {
    cp.exec(`start "" "${folder}"`);
  }
}

const _checkData = (data, res, cb) => {
  if (!data) return u.error(res, 'Undefined data!');
  if (!data.cmd) return u.error(res, 'Undefined command!');
  data.cwd = data.cwd || execution_root;
  cb(data);
}

exports.exec = (req, res) => {
  _checkData(req.body, res, (call) => {
    console.log('EXECUTE:', c);
    try {
      cp.exec(info.cmd, {
        cwd: info.cwd
      }, (err, stdout, stderr) => {
        if (err !== null) return u.error(res, err);
        u.ok(res, {
          stderr: stderr,
          stdout: stdout
        });
      });
    } catch(err) {
      u.error(res, err);
    }
  });
};

exports.version = (req, res) => {
  u.ok(res, VERSION);
}
