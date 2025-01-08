const http = require("http");
const currenciesJson = require("./currencies.json");
const PORT = 8082;

// const server = http.createServer((req, res) => {
//   // console.log(req.url);
//   // const date = new Date();
//   // console.log(date.toLocaleDateString(), date.toLocaleTimeString());

//   // res.write("Hello from server");
//   // res.write("My name is CRIO-SERVER");
//   // res.end("goodbye");

//   // const student = {
//   //   name: "sreekanth",
//   // };
//   // res.write(JSON.stringify(student));
//   if (req.url === "/info") {
//     const serverInfo = {
//       serverName: "Crio Server",
//       version: "1.0.0",
//       currentDate: new Date().toDateString(),
//       currentTime: new Date().toTimeString(),
//     };
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify(serverInfo));
//   } else {
//     res.writeHead(200, { "Content-Type": "text/plain" });
//     res.write("Hello from server");
//   }

//   // res.writeHead(200, { "Content-Type": "text/html" });
//   // res.write(
//   //   `<h1>Hello</h1><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg/640px-Cristiano_Ronaldo_playing_for_Al_Nassr_FC_against_Persepolis%2C_September_2023_%28cropped%29.jpg" />`
//   // );
//   res.end();
// });

const server = http.createServer((req, res) => {
  const path = req.url.split("/"); // /currencies/inr -> [ '', 'currencies', 'inr' ]
  let symbol, reqCurrency;
  if (path.length === 3 && path[1] === "currencies") symbol = path[2];
  switch (req.url) {
    case "/":
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write("<h1>Currency Database</h1>");
      break;
    case "/currencies":
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(currenciesJson.data));
      break;
    default:
      if (symbol)
        reqCurrency = currenciesJson.data.find(
          (curr) => curr.id === symbol.toUpperCase()
        );
      if (reqCurrency) {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(reqCurrency));
        res.end();
        return;
      }
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Route not found!" }));
  }
  res.end();
});

server.listen(PORT, () => {
  console.log(`server listening on port: ${PORT}`);
});
