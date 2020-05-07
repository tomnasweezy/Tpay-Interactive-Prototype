const digest = require("../../Helpers/CalculateDigest");
const express = require("express");
const router = express.Router();
const axios = require("axios");

//VerifySubscriptionContract
router.post("/", (req, res, next) => {
  // if (!req.headers.pubkey || !req.headers.privkey) {
  //   return res.status(401).json({ error: "please provide credentials" });
  // }
  // if (!req.body.contractId || !req.body.pinCode) {
  //   return res.status(400).json({ error: "one of the parameters is missing" });
  // }
  var body = {
    subscriptionContractId: req.body.contractId,
    pinCode: req.body.pinCode,
    transactionId: !req.body.transactionId ? "" : req.body.transactionId,
    charge: !req.body.transactionId ? "false" : "true",
  };
  var signature = digest.CalculateDigest(
    body,
    !req.headers.pubkey ? process.env.TPAY_API_PUBLICKEY : req.headers.pubkey,
    !req.headers.privkey ? process.env.TPAY_API_PRIVATEKEY : req.headers.privkey
  );
  body = { signature, ...body };
  axios
    .post(
      `${process.env.TPAY_API_URI}/TPAYSubscription.svc/Json/VerifySubscriptionContract`,
      body
    )
    .then((response) => {
      let requestandResponse = {
        request: body,
        response: response.data,
      };

      return new Promise((resolve, reject) => {
        if (response.data.operationStatusCode == 51) {
          let errorResponse = {
            errorMessage: response.data.errorMessage,
            responseWhole: requestandResponse,
            routeName: "verifySub",
          };
          reject(errorResponse);
        } else {
          res.send(requestandResponse);
        }
      }).catch(next);
    })
    .catch(next);
});

module.exports = router;
