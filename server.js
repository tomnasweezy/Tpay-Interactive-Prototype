const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const i18n = require("i18n");
const errorHandlingMiddleware = require("./Middleware/errorHandlingMiddleware");
i18n.configure({
  locales: ["en", "ar", "fr"],
  directory: __dirname + "/locales",
});
dotenv.config({ path: "./config.env" });

const app = express();
app.use(bodyParser.json());
// app.use(i18n.init);

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
//routes
//Add Subscription
app.use(
  "/api/v1/AddSubscription",
  require("./routes/SubscriptionAPI/addSubscription")
);
//Verify Subscription
app.use(
  "/api/v1/VerifySubscription",
  require("./routes/SubscriptionAPI/verifySubscription")
);
//Resend Pin Code
app.use(
  "/api/v1/resendPinCode",
  require("./routes/SubscriptionAPI/resendPinCode")
);
//Send SMSs
app.use("/api/v1/sendSMS", require("./routes/SMSAPI/SMS"));
//cancel subscription
app.use(
  "/api/v1/cancelSubscription",
  require("./routes/SubscriptionAPI/cancelSubscription")
);
//HeaderEnrichemnt
app.use(
  "/api/v1/heEnrichment",
  require("./routes/SubscriptionAPI/sessionToken")
);

errorHandlingMiddleware(app);

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
