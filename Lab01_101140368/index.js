const fs = require('fs')
const csv = require('csv-parser')
const info = [];

textfile = ["./canada.txt","./usa.txt"]
for (let text of textfile){
    if(fs.existsSync(text)){
        fs.unlinkSync(text)
    }
    fs.writeFileSync(text, 'country,year,population\n')
}


fs.createReadStream("input_countries.csv")
.pipe(csv())
.on("data", data => {
    if(data.country == "United States" || data.country == "Canada"){
        info.push(data)
    }
})
.on("end", () => {
    for (let data of info){
        const {country, year, population} = data
        if(data.country === "Canada"){
            fs.appendFileSync(textfile[0], `${country},${year},${population}\n`);
           } else {
            fs.appendFileSync(textfile[1], `${country},${year},${population}\n`);

        }
    }
})

