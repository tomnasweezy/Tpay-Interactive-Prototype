const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const i18n = require("i18n");
const path = require("path");
const history = require("connect-history-api-fallback");
const api = require("./server/api");

const errorHandlingMiddleware = require("./server/Middleware/errorHandlingMiddleware");
i18n.configure({
  locales: ["en", "ar", "fr"],
  directory: __dirname + "/locales",
});
dotenv.config({ path: "./config.env" });

const app = express();

app.use(bodyParser.json());
app.use("/api", api);
errorHandlingMiddleware(app);
let expresStatic = express.static(path.join(__dirname, "/public"));
app.use(expresStatic);
app.use(
  "/",
  history({
    index: "/public/index.html",
  })
);
// app.use(expresStatic);

// app.use(i18n.init);
// if (process.env.NODE_ENV === "development") {
app.use(morgan("dev"));
// }

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

// const port = process.env.PORT || 8000;
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
// app.listen(port);

app.listen(port, () => {
  console.log(`listenning in ${process.env.NODE_ENV} mode on port ${port}`);
});
