const { exec } = require('child_process');
const os = require('os');

const platform = os.platform();

if (platform === 'win32') exec('start http://localhost:3000');
else exec('open http://localhost:3000');
