const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

dotenv.config({ path: "./config.env" });

const app = express();
app.use(bodyParser.json());

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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`listenning in ${process.env.NODE_ENV} mode on port ${port}`);
});
