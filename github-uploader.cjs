const fs = require('fs');
const path = require('path');
const https = require('https');

const token = process.env.GITHUB_TOKEN || process.argv[2];

if (!token) {
  console.error("ERROR: Please provide your GitHub Personal Access Token (PAT).");
  console.error("Usage: node github-uploader.cjs <YOUR_GITHUB_TOKEN>");
  process.exit(1);
}

function ghRequest(method, endpoint, body) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : null;
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path: endpoint,
      method: method,
      headers: {
        'User-Agent': 'NodeJS-GitHub-Uploader',
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/vnd.github+json',
        ...(dataString ? {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(dataString)
        } : {})
      }
    };

    const req = https.request(options, (res) => {
      let resData = '';
      res.on('data', chunk => resData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(resData || '{}');
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(parsed);
          } else {
            reject({ status: res.statusCode, data: parsed });
          }
        } catch (e) {
          resolve(resData);
        }
      });
    });

    req.on('error', reject);
    if (dataString) req.write(dataString);
    req.end();
  });
}

function getFilesRecursively(dir, baseDir = '') {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.git', 'dist', '.vscode'].includes(file)) continue;
    const fullPath = path.join(dir, file);
    const relPath = path.join(baseDir, file).replace(/\\/g, '/');
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFilesRecursively(fullPath, relPath));
    } else {
      results.push({ fullPath, relPath });
    }
  }
  return results;
}

async function uploadToGitHub() {
  try {
    console.log("1. Authenticating with GitHub...");
    const user = await ghRequest('GET', '/user');
    console.log(`✓ Authenticated as: ${user.login} (${user.name || user.login})`);

    const repoName = 'starpath-property';
    console.log(`2. Checking / Creating repository '${repoName}'...`);
    let repo;
    try {
      repo = await ghRequest('GET', `/repos/${user.login}/${repoName}`);
      console.log(`✓ Repository exists: ${repo.html_url}`);
    } catch (e) {
      repo = await ghRequest('POST', '/user/repos', {
        name: repoName,
        description: 'Starpath Property - Mobile-First Real Estate Prototype for Starpath Holdings Ltd.',
        private: false,
        auto_init: true
      });
      console.log(`✓ Created new repository: ${repo.html_url}`);
      await new Promise(r => setTimeout(r, 2000));
    }

    const files = getFilesRecursively(__dirname);
    console.log(`3. Found ${files.length} project files to upload.`);

    console.log("4. Creating Git Blobs...");
    const treeItems = [];
    for (const file of files) {
      const isBinary = /\.(png|jpg|jpeg|gif|ico|zip|pdf)$/i.test(file.relPath);
      let content, encoding;
      if (isBinary) {
        content = fs.readFileSync(file.fullPath).toString('base64');
        encoding = 'base64';
      } else {
        content = fs.readFileSync(file.fullPath, 'utf8');
        encoding = 'utf-8';
      }

      const blob = await ghRequest('POST', `/repos/${user.login}/${repoName}/git/blobs`, {
        content,
        encoding
      });

      treeItems.push({
        path: file.relPath,
        mode: '100644',
        type: 'blob',
        sha: blob.sha
      });
      process.stdout.write('.');
    }
    console.log("\n✓ All blobs uploaded.");

    console.log("5. Creating Git Tree...");
    const tree = await ghRequest('POST', `/repos/${user.login}/${repoName}/git/trees`, {
      tree: treeItems
    });

    console.log("6. Creating Commit...");
    let parentSha = null;
    try {
      const ref = await ghRequest('GET', `/repos/${user.login}/${repoName}/git/ref/heads/main`);
      parentSha = ref.object.sha;
    } catch (e) {
      try {
        const refMaster = await ghRequest('GET', `/repos/${user.login}/${repoName}/git/ref/heads/master`);
        parentSha = refMaster.object.sha;
      } catch (err) {}
    }

    const commitData = {
      message: 'Starpath Property prototype for Starpath Holdings Ltd. (Mobile-first app)',
      tree: tree.sha,
      parents: parentSha ? [parentSha] : []
    };
    const commit = await ghRequest('POST', `/repos/${user.login}/${repoName}/git/commits`, commitData);

    console.log("7. Updating main branch reference...");
    try {
      await ghRequest('PATCH', `/repos/${user.login}/${repoName}/git/refs/heads/main`, {
        sha: commit.sha,
        force: true
      });
    } catch (e) {
      await ghRequest('POST', `/repos/${user.login}/${repoName}/git/refs`, {
        ref: 'refs/heads/main',
        sha: commit.sha
      });
    }

    console.log("\n==========================================================");
    console.log("🎉 SUCCESS! PROJECT UPLOADED TO GITHUB:");
    console.log(`🔗 ${repo.html_url}`);
    console.log("==========================================================");
  } catch (err) {
    console.error("Upload error:", err);
  }
}

uploadToGitHub();
