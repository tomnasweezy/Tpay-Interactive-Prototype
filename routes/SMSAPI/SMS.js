const digest = require("../../Helpers/CalculateDigest");
const express = require("express");
const router = express.Router();
const axios = require("axios");

//SendFreeMTMessage
router.post("/", (req, res, next) => {
  if (!req.body.messageBody || !req.body.MSISDN || !req.body.operatorCode) {
    return res.status(400).json({ error: "one of the parameters is missing" });
  }
  var body = {
    messageBody: req.body.messageBody,
    msisdn: req.body.MSISDN,
    operatorCode: req.body.operatorCode,
  };
  var signature = digest.CalculateDigest(
    body,
    !req.headers.pubkey ? process.env.TPAY_API_PUBLICKEY : req.headers.pubkey,
    !req.headers.privkey ? process.env.TPAY_API_PRIVATEKEY : req.headers.privkey
  );
  body = { signature, ...body };
  console.log(body);
  axios
    .post(`${process.env.TPAY_API_URI}/TPAY.svc/Json/SendFreeMTMessage`, body)
    .then((response) => {
      let requestandResponse = {
        request: body,
        response: response.data,
      };

      return new Promise((resolve, reject) => {
        if (response.data.messageDeliveryStatus == false) {
          let errorResponse = {
            errorMessage: response.data.errorMessage,
            responseWhole: requestandResponse,
            routeName: "welcomeSms",
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
