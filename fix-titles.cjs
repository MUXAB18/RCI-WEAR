const fs = require('fs');

function fixFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    let lines = content.split('\n');
    let modified = false;

    for (let { lineNum, newText } of replacements) {
        if (lines[lineNum - 1] !== undefined) {
            // Replace the empty or broken line with the required property
            lines[lineNum - 1] = newText;
            modified = true;
        }
    }

    if (modified) {
        fs.writeFileSync(filePath, lines.join('\n'));
        console.log(`Fixed ${filePath}`);
    }
}

fixFile('src/app/admin/orders/OrdersClient.tsx', [
    { lineNum: 439, newText: '        title={editingOrder ? "Edit Order" : "Order Details"}' },
    { lineNum: 508, newText: '        title="Create Order"' },
    { lineNum: 680, newText: '        title="Confirm Deletion"' }
]);

fixFile('src/app/admin/reviews/ReviewsClient.tsx', [
    { lineNum: 194, newText: '        title="Reviews"' },
    { lineNum: 232, newText: '        title="Review Details"' }
]);
