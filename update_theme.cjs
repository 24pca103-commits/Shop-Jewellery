const fs = require('fs');
const path = require('path');

const srcDir = 'e:/shopjj/src';

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir(srcDir, function(filePath) {
  if (filePath.endsWith('.css') || filePath.endsWith('.jsx')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content
      .replace(/200,\s*164,\s*77/g, '139, 90, 43')
      .replace(/#C8A44D/gi, '#8B5A2B')
      .replace(/#E8C97A/gi, '#A87B51')
      .replace(/#A0832A/gi, '#5C3A18')
      .replace(/#FAF7F2/gi, '#FFFFFF')
      .replace(/#F3EDE3/gi, '#F8F5F2')
      .replace(/#1A1A1A/gi, '#2D1B15')
      .replace(/#3D3D3D/gi, '#4A332A')
      .replace(/#6B6B6B/gi, '#735348')
      .replace(/#9B9B9B/gi, '#A68A80')
      .replace(/#111111/gi, '#1C100C')
      .replace(/#111\b/gi, '#1C100C');
      
    if (content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated: ' + filePath);
    }
  }
});
console.log('Theme update complete!');
