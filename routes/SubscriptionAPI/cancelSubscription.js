const digest = require("../../Helpers/CalculateDigest");
const express = require("express");
const router = express.Router();
const axios = require("axios");

//AddSubsriptionContractRequest
router.post("/", (req, res, next) => {
  // if (!req.body.contractId) {
  //   return res.status(400).json({ error: "one of the parameters is missing" });
  // }
  var body = {
    subscriptionContractId: req.body.contractId,
  };
  var signature = digest.CalculateDigest(
    body,
    !req.headers.pubkey ? process.env.TPAY_API_PUBLICKEY : req.headers.pubkey,
    !req.headers.privkey ? process.env.TPAY_API_PRIVATEKEY : req.headers.privkey
  );
  body = { signature, ...body };
  console.log(body);
  axios
    .post(
      `${process.env.TPAY_API_URI}/TPAYSubscription.svc/Json/CancelSubscriptionContractRequest`,
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
            routeName: "cancelSub",
          };
          console.log(errorResponse);
          reject(errorResponse);
        } else {
          res.send(requestandResponse);
        }
      }).catch(next);
    })
    .catch(next);
});

module.exports = router;
