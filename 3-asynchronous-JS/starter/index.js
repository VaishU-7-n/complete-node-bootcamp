const fs = require('fs');
const superagent = require("superagent");

const ReadFilePro = file => {
    return new Promise((resolve, reject) =>
    {
        fs.readFile(file, (err,data)=>{
            if(err)reject('I could not find that 😭');
            resolve(data);
        });
    });
}

const WriteFilePro = (file,data) => {
    return new Promise((resolve,reject)=>{
    fs.writeFile(file,data,err => {
        if(err)
            reject('I could not write into that 😭');
        resolve('sucesss');
        }
  )}
)};

/*

ReadFilePro(`${__dirname}/dog.txt`).then(data => {
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)})
   .then(res => {
   return WriteFilePro('dog-image.txt',res.body.message);
   })
   .then(()=>{
    console.log("daved ransod ");
   })
   .catch(err=>{
    console.log(err.message);
   });
    
*/

const getDogPic = async ()=>{
    try{
        const data = await ReadFilePro(`${__dirname}/dog.txt`);
   const res = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
   console.log(res.body.message);
   const pictureLink = await WriteFilePro('dog-img.txt',res.body.message);
   console.log("dog Picture Saved!");

    }
    catch(err)
    {
        console.log(err);
    }
    return '2 : READY 🙈'
};
console.log('Will get dog pics');
getDogPic();
console.log('Dog pics saved');