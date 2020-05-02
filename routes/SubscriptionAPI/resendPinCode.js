const digest = require("../../Helpers/CalculateDigest");
const express = require("express");
const router = express.Router();
const axios = require("axios");

//VerifySubscriptionContract
router.post("/", (req, res) => {
  if (!req.headers.pubkey || !req.headers.privkey) {
    return res.status(401).json({ error: "please provide credentials" });
  }
  if (!req.body.contractId) {
    return res.status(400).json({ error: "one of the parameters is missing" });
  }
  var body = {
    subscriptionContractId: req.body.contractId
  };
  var signature = digest.CalculateDigest(
    body,
    !req.headers.pubkey ? process.env.TPAY_API_PUBLICKEY : req.headers.pubkey,
    !req.headers.privkey ? process.env.TPAY_API_PRIVATEKEY : req.headers.privkey
  );
  body = { signature, ...body };
  axios
    .post(
      `${process.env.TPAY_API_URI}/TPAYSubscription.svc/Json/SendSubscriptionContractVerificationSMS`,
      body
    )
    .then(response => {
      let requestandResponse = {
        request: body,
        response: response.data
      };
      res.send(requestandResponse);
    })
    .catch(error => {
      console.log(error);
    });
});

module.exports = router;
