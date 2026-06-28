const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  // Remove fontFamily: "...", or fontFamily: '...',
  content = content.replace(/fontFamily:\s*(['"]).*?\1\s*,?/g, '');
  content = content.replace(/font-family:\s*(['"]).*?\1\s*;?/g, '');
  fs.writeFileSync(file, content);
});
console.log('Done');
