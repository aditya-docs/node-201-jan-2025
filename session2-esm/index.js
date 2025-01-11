import express from "express";
import {
  getCurrencies,
  getCurrencyBySymbol,
} from "./controllers/currencies.controllers.js";
const app = express();
const PORT = 8082;

app.get("/", (req, res) => {
  res.send("<h1>Currency Database</h1>");
});

app.get("/currencies", getCurrencies);

app.get("/currencies/:symbol", getCurrencyBySymbol);

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
