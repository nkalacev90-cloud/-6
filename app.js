const http = require("http")
const fs = require("fs")

http.createServer(function(request, response){

console.log(`Запрошенный адрес: ${request.url}`)
const file = request.url.substr(1)
fs.access(file, fs.constants.R_OK, err => {
if(err){
  response.statusCode = 404
  response.end("Resourse not found!")
}
else{
  fs.createReadStream(file).pipe(response)
}
})

}).listen(3000)

http.createServer(function(request, response){

console.log(`Запрошенный адрес: ${request.url}`)
const file1 = request.url.substr(1)

fs.readFile(file1, function(error, data){
  response.end(data)
})

}).listen(2000)

http.createServer((request, response) => {

  if (request.url === "/user") {

    let data = ""
    request.on("data", chunk => {
      data += chunk
    });
    request.on("end", () => {
      console.log(data)
      response.end("Data success load")
    });
  }
  else{
    fs.readFile("index.html", (error, data) => response.end(data))
  }
}).listen(1000)

http.createServer(async (request, response) =>{

  if (request.url === "/user"){

    const buffers = []

    for await (const chunk of request){
      buffers.push(chunk)
    }

    const data = Buffer.concat(buffers).toString()
    console.log(data)
    response.end("Data success load")


  }
  else{
    fs.readFile("index.html", (error, data) => response.end(data))
  }

}).listen(4000)

http.createServer(function(request, response){

const file1 = request.url.substr(1)

fs.readFile("index.html", "utf8", function(error, data){
  
  let header = "Привет пользователь"
  let h1 = "How are you"
  data = data.replace("{header}", header).replace("{h1}", h1)
  response.end(data)
  })
}).listen(5000)

