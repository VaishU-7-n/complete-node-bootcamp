const http = require('http');
const url = require('url');
const fs = require('fs');
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate');

///////files////////

// Blocking Synchronous way ( since node js is single threaded it can perform only one operation at a time and when the 
// file is being read or written for example other processes are ket at hold thus blocking i/o) 

/*const textIn = fs.readFileSync('./txt/input.txt','utf-8');
console.log(textIn);
const outIn = `This is what we know about a avacado ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync('./txt/output.txt',outIn);*/


//Non-Blocking Asynchronous way uses callbacks 
//call back runs after the file is read.
//event queue is queued with the functions in order and all callbacks are pushed onto the stack and when queue is empty it 
//is pushed to the queue
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if(err)
//         return console.log('ERROR');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2);
//         fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//             console.log(data3);

//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
//                 console.log('Your file has been written');
//             });
//         });
//     });
// });
// console.log('Will read This file');

/////---------SERVER----------/////


const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8',);
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8',);
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8',)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8',);
const dataObj = JSON.parse(data);

const slugs = dataObj.map(el=> slugify(el.productName, {lower:true}));
console.log(slugs);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url,true);

    //Overview 
    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, {'Content-type': 'text/html'});

        const cardsHtml = dataObj.map(el=>
            replaceTemplate(tempCard,el)).join('');
        const output = tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
        res.end(output);
    }
    else if (pathname === '/product') {
        res.writeHead(200, {'Content-type': 'text/html'});
        const product = dataObj[query.id];
        const output = replaceTemplate(tempProduct,product);
        res.end(output);
    }
    else if (pathname === '/api') {

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(data);
    }
    else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world'
        });
        res.end('<h1>Page not found!</h1>');
    }

});

server.listen(8000, '127.0.0.1', () => {
    console.log('Listening to incoming requests on 8000');
});
