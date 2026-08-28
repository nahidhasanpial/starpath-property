const fs = require('fs');
const path = require('path');

const targetDir = 'C:\\Users\\Pial\\.gradle\\wrapper\\dists\\gradle-8.14.3-all\\10utluxaxniiv4wxiphsi49nj';
const targetFile = path.join(targetDir, 'gradle-8.14.3-all.zip');

async function main() {
  console.log("Fetching gradle with node fetch...");
  const res = await fetch('https://services.gradle.org/distributions/gradle-8.14.3-bin.zip', {
    redirect: 'follow'
  });
  console.log("Status:", res.status);
  const arrayBuffer = await res.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  console.log("Downloaded bytes:", buffer.length);
  fs.writeFileSync(targetFile, buffer);
  console.log("Saved to:", targetFile);
}

main().catch(console.error);
