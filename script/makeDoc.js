const path = require('path');
const fsp = require('fs/promises');
const marked = require('marked');
const prettier = require('prettier');

const makeDoc = async () => {
    const htmlPath = path.resolve('./draft/index.template.html');
    const stylePath = path.resolve('./draft/style.css');
    const readmePath = path.resolve('./README.md');

    const html = await fsp.readFile(htmlPath, 'utf-8');
    const style = await fsp.readFile(stylePath, 'utf-8');
    const readme = await fsp.readFile(readmePath, 'utf-8');

    const doc = prettier.format(
        html
            .replace('${style}', style)
            .replace('${body}', marked.parse(readme)),
        { parser: 'html' }
    );

    const outputPath = path.resolve('./docs/index.html');
    await fsp.writeFile(outputPath, doc);
};

makeDoc();
