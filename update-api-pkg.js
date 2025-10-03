const fs = require('fs');
const path = require('path');
const file = path.join('apps', 'api', 'package.json');
let content = fs.readFileSync(file, 'utf8');
if (content.charCodeAt(0) === 0xfeff) {
  content = content.slice(1);
}
const pkg = JSON.parse(content);
pkg.scripts = pkg.scripts || {};
pkg.scripts.test = 'vitest';
pkg.devDependencies = pkg.devDependencies || {};
pkg.devDependencies.vitest = '^1.5.3';
pkg.devDependencies.supertest = '^7.1.1';
fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
