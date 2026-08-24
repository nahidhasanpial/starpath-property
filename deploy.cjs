const { spawn } = require('child_process');
const path = require('path');

const distPath = path.join(__dirname, 'dist');
const domain = 'starpath-property.surge.sh';

console.log(`Starting Surge deployment for Starpath Property to ${domain}...`);

const child = spawn('npx', ['surge', '.', domain], {
  cwd: distPath,
  shell: true
});

child.stdout.on('data', (data) => {
  const output = data.toString();
  console.log('STDOUT:', output);

  if (output.toLowerCase().includes('email:')) {
    console.log('Sending email...');
    child.stdin.write('pial-job-journal-2026@outlook.com\n');
  }

  if (output.toLowerCase().includes('password:')) {
    console.log('Sending password...');
    child.stdin.write('pial-job-journal-pass-2026\n');
  }
});

child.stderr.on('data', (data) => {
  const output = data.toString();
  console.log('STDERR:', output);

  if (output.toLowerCase().includes('email:')) {
    console.log('Sending email from stderr handler...');
    child.stdin.write('pial-job-journal-2026@outlook.com\n');
  }

  if (output.toLowerCase().includes('password:')) {
    console.log('Sending password from stderr handler...');
    child.stdin.write('pial-job-journal-pass-2026\n');
  }
});

child.on('close', (code) => {
  console.log(`Surge deployment finished with exit code ${code}`);
  if (code === 0) {
    console.log(`SUCCESS! Live at: https://${domain}`);
  }
});
