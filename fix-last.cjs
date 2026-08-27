const fs = require('fs');

function fixFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;

    for (let { target, newText } of replacements) {
        if (content.includes(target)) {
            content = content.replace(target, newText);
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, content);
        console.log(`Fixed ${filePath}`);
    }
}

fixFile('src/app/admin/tracking/TrackingClient.tsx', [
    { target: 'value: stage.id,', newText: 'value: stage.id as string,' }
]);

fixFile('src/app/admin/portfolio/PortfolioClient.tsx', [
    { target: 'projectDate: project.projectDate ? project.projectDate.split(\'T\')[0] : \'\',', newText: 'projectDate: project.projectDate ? new Date(project.projectDate).toISOString().split(\'T\')[0] : \'\',' }
]);

fixFile('src/app/admin/settings/SettingsClient.tsx', [
    { target: 'Object.entries(settingsByGroup).map(([group, settings])', newText: '(Object.entries(settingsByGroup) as [string, any[]][]).map(([group, settings])' }
]);

fixFile('src/app/admin/contacts/ContactsClient.tsx', [
    { target: 'viewingContact?.id === contact.id', newText: 'viewingContact?.id === deleteId' }
]);
