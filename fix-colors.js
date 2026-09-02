const fs = require('fs');
const path = require('path');

const directories = ['app', 'components'];

const replacements = {
  'bg-\\[#0a0a0a\\]': 'bg-background',
  'bg-\\[#111\\]': 'bg-secondary',
  'bg-\\[#111111\\]': 'bg-secondary',
  'bg-\\[#1a1a1a\\]': 'bg-muted',
  'bg-\\[#222\\]': 'bg-muted',
  'text-\\[#f5f5f5\\]': 'text-foreground',
  'text-white': 'text-foreground',
  'text-\\[#8a8a8a\\]': 'text-muted-foreground',
  'text-\\[#666\\]': 'text-muted-foreground',
  'border-\\[#1a1a1a\\]': 'border-border',
  'border-\\[#222\\]': 'border-border',
  'border-\\[#333\\]': 'border-border',
  'border-\\[#0a0a0a\\]': 'border-border'
};

function walkSync(currentDirPath, callback) {
  fs.readdirSync(currentDirPath).forEach(function (name) {
    const filePath = path.join(currentDirPath, name);
    const stat = fs.statSync(filePath);
    if (stat.isFile()) {
      if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
        callback(filePath);
      }
    } else if (stat.isDirectory()) {
      walkSync(filePath, callback);
    }
  });
}

let filesChanged = 0;

directories.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) return;
  
  walkSync(dirPath, function(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;
    
    for (const [key, value] of Object.entries(replacements)) {
      const regex = new RegExp(key, 'g');
      content = content.replace(regex, value);
    }
    
    if (content !== originalContent) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesChanged++;
      console.log(`Updated ${filePath}`);
    }
  });
});

console.log(`Done! Modified ${filesChanged} files.`);
