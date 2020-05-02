const digest = require("../../Helpers/CalculateDigest");
const express = require("express");
const router = express.Router();
const axios = require("axios");

//AddSubsriptionContractRequest
router.post("/", (req, res) => {
  if (!req.body.contractId) {
    return res.status(400).json({ error: "one of the parameters is missing" });
  }
  var body = {
    subscriptionContractId: req.body.contractId
  };
  var signature = digest.CalculateDigest(
    body,
    process.env.TPAY_API_PUBLICKEY,
    process.env.TPAY_API_PRIVATEKEY
  );
  body = { signature, ...body };
  console.log(body);
  axios
    .post(
      `${
        process.env.TPAY_API_URI
      }/TPAYSubscription.svc/Json/CancelSubscriptionContractRequest`,
      body
    )
    .then(response => {
      res.send(response.data);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
