const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) { 
            results = results.concat(walk(file));
        } else { 
            if (file.endsWith('route.ts')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('src/app/api');
for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    const paramRegex = /\{ params \}: \{ params: \{ ([^}]+) \} \}/g;
    if (paramRegex.test(content)) {
        content = content.replace(paramRegex, '{ params }: { params: Promise<{ $1 }> }');
        modified = true;
    }

    const typeRegex = /type Params = \{ params: \{ ([^}]+) \} \};/g;
    if (typeRegex.test(content)) {
        content = content.replace(typeRegex, 'type Params = { params: Promise<{ $1 }> };');
        modified = true;
    }

    if (modified) {
        content = content.replace(/params\.id/g, '(await params).id');
        content = content.replace(/params\.orderNumber/g, '(await params).orderNumber');
        fs.writeFileSync(file, content);
        console.log(`Updated ${file}`);
    }
}
