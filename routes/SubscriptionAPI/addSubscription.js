const digest = require("../../Helpers/CalculateDigest");
const express = require("express");
const router = express.Router();
const axios = require("axios");

//AddSubsriptionContractRequest
router.post("/", (req, res) => {
  // if (!req.headers.pubkey || !req.headers.privkey) {
  //   return res.status(401).json({ error: "please provide credentials" });
  // }
  // if (!req.body.MSISDN || !req.body.operatorCode || !req.body.lang) {
  //   return res.status(400).json({ error: "one of the parameters is missing" });
  // }
  // if (req.body.isInitial == "true" && req.body.freeStartDays) {
  //   return res.status(400).json({ error: "can't happen" });
  // }
  var body = {
    customerAccountNumber: "test",
    msisdn: req.body.MSISDN,
    operatorCode: req.body.operatorCode,
    subscriptionPlanId: !req.body.subscriptionPlanId
      ? "71488"
      : req.body.subscriptionPlanId,
    initialPaymentproductId: !req.body.productSKU
      ? "moTest123"
      : req.body.productSKU,
    initialPaymentDate: !req.body.freeStartDays
      ? new Date(Date.now()).toISOString("u")
      : new Date(
          new Date().setDate(
            new Date().getDate() + parseInt(req.body.freeStartDays)
          )
        ).toISOString("u"),
    executeInitialPaymentNow: !req.body.isInitial
      ? "false"
      : req.body.isInitial,
    recurringPaymentproductId: !req.body.productSKU
      ? "moTest123"
      : req.body.productSKU,
    productCatalogName: !req.body.catalogName
      ? "mo_Test"
      : req.body.catalogName,
    executeRecurringPaymentNow: "false",
    contractStartDate: new Date(Date.now()).toISOString("u"),
    contractEndDate: new Date(
      new Date().setFullYear(new Date().getFullYear() + 1)
    ).toISOString("u"),
    autoRenewContract: "true",
    language: req.body.lang,
    sendVerificationSMS: "true",
    allowMultipleFreeStartPeriods: "true",
    headerEnrichmentSessionId: !req.body.heRefNo ? "" : req.body.heRefNo,
    smsId: "",
  };
  var signature = digest.CalculateDigest(
    body,
    !req.headers.pubkey ? process.env.TPAY_API_PUBLICKEY : req.headers.pubkey,
    !req.headers.privkey ? process.env.TPAY_API_PRIVATEKEY : req.headers.privkey
  );
  body = { signature, ...body };
  axios
    .post(
      `${process.env.TPAY_API_URI}/TPAYSubscription.svc/Json/AddSubscriptionContractRequest`,
      body
    )
    .then((response) => {
      let requestandResponse = {
        request: body,
        response: response.data,
      };
      res.send(requestandResponse);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
