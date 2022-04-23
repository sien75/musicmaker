const path = require('path');
const fs = require('fs');
const marked = require('marked');
const prettier = require('prettier');

const draftPath = path.join(path.resolve('./draft'));

const htmlPath = path.join(draftPath, 'index.template.html');
const stylePath = path.join(draftPath, 'style.css');
const readmePath = path.join(path.resolve('./README.md'));

const html = fs.readFileSync(htmlPath).toString();
const style = fs.readFileSync(stylePath).toString();
const readme = fs.readFileSync(readmePath).toString();

const doc = prettier.format(
    html.replace('${style}', style).replace('${body}', marked.parse(readme)),
    { parser: 'html' }
);

const outputPath = path.join(path.resolve('./docs/index.html'));

fs.writeFileSync(outputPath, doc);
