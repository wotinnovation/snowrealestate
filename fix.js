const fs = require('fs');
const path = 'c:/workstation 4/snowrealestate/src/app/single-property-1/[id]/page.tsx';
let content = fs.readFileSync(path, 'utf8');
content = content.replace(/fontSize:\s*"(\d+)px"/g, 'fontSize: "var(--fs-$1, $1px)"');
fs.writeFileSync(path, content);
