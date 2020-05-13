const express = require("express"),
  router = express.Router();

//routes
//Add Subscription
router.use(
  "/v1/AddSubscription",
  require("./routes/SubscriptionAPI/addSubscription")
);
//Verify Subscription
router.use(
  "/v1/VerifySubscription",
  require("./routes/SubscriptionAPI/verifySubscription")
);
//Resend Pin Code
router.use(
  "/v1/resendPinCode",
  require("./routes/SubscriptionAPI/resendPinCode")
);
//Send SMSs
router.use("/v1/sendSMS", require("./routes/SMSAPI/SMS"));
//cancel subscription
router.use(
  "/v1/cancelSubscription",
  require("./routes/SubscriptionAPI/cancelSubscription")
);
//HeaderEnrichemnt
router.use(
  "/v1/heEnrichment",
  require("./routes/SubscriptionAPI/sessionToken")
);

module.exports = router;
