const express = require("express");
const currenciesJson = require("./currencies.json");
const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.get("/currencies", (req, res) => {
  const { min_value } = req.query;
  res.send(currenciesJson.data);
});

app.get("/currencies/:symbol", (req, res) => {
  const { symbol } = req.params;
  const reqCurrency = currenciesJson.data.find(
    (curr) => curr.id === symbol.toUpperCase()
  );
  if (!reqCurrency)
    // return res.sendStatus(404);
    return res.status(404).send({
      message: `Currency with symbol: '${symbol}' could not be found!`,
    });
  res.send(reqCurrency);
});

// app.get("/posts/:postId/comments/:commentId", (req, res) => {
//   console.log(req.params);
// });

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
