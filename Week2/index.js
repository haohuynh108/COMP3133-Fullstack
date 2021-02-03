const { Console } = require('console')
const fs = require('fs')
fs.readFile("input.txt" , (err,data)=>{
    if(err){
        console.log(`Error : ${err}`)
    }else{
    console.log(data.toString())
    }
})

console.log("--END---")

var data = fs.readFileSync('input.txt', 'utf8')

console.log(`Data: ${data}`)

console.log("--END---")

//Async

fs.readFile("input.txt", (err,data)=>{
    if(err){
        console.log(`Error: ${err}`)
    }else{
        console.log(data.toString('utf-8'))
        //console.log(data.toString('utf-8, 0, 5)) // Sampl
        //console.log(data.toString('utf-8'),8 ,10)// Data Input
        console.log(data[0].charCodeAt())
    }
})

console.log("--END 1----")

fs.writeFile("output.txt" , "Hello World", (err,data)=>{
    if(err){
        console.log(` Write Error : ${err}`)
    }else{
    console.log("Write Success")
    }
})

console.log("Data Using Open")

var dataBuffer = new Buffer[100]

fs.open("input.txt","r",(err,fd)=>{
    fs.read(fd, dataBuffer,0,dataBuffer,0,(err, bytesRead)=>{
        console.log("*** START ***")
        console.log(dataBuffer.toString())
        console.log("*** END ***")
    })

})