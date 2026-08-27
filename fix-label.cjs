const fs = require('fs');
const filePath = 'src/app/admin/tracking/TrackingClient.tsx';
let content = fs.readFileSync(filePath, 'utf8');
content = content.replace('label: stage.label', 'label: stage.label as string');
fs.writeFileSync(filePath, content);
console.log('Fixed label in TrackingClient.tsx');
