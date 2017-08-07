const fs = require('fs-extended');

const fileList = [
    {from: './src/index.html', to: './dist/index.html'},
    {from: './src/logo.png', to: './dist/logo.png'},
    {from: './libs/react.min.js', to: './dist/react.min.js'},
    {from: './libs/react-dom.min.js', to: './dist/react-dom.min.js'}
];

fileList.map(_ => {
    fs.copyFileSync(_.from, _.to);
});