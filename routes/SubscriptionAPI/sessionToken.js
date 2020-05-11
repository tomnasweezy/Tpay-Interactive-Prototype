const digest = require("../../Helpers/CalculateDigest");
const express = require("express");
const router = express.Router();
const axios = require("axios");

//AddSubsriptionContractRequest
router.post("/", (req, res) => {
  let datestring = new Date(Date.now()).toISOString("u");
  let language = "en";
  var message = datestring + language;
  var body = {
    message: message,
  };
  var signature = digest.CalculateDigest(
    body,
    !req.headers.pubkey ? process.env.TPAY_API_PUBLICKEY : req.headers.pubkey,
    !req.headers.privkey ? process.env.TPAY_API_PRIVATEKEY : req.headers.privkey
  );
  let heScritp = `http://enrichment-staging.tpay.me/idxml.ashx/js-staging?date=${datestring}&lang=${language}&digest=${signature}&simulate=true&operatorcode=${req.body.operatorCode}&msisdn=${req.body.MSISDN}`;
  //   body = { signature, ...body };
  //   console.log(heScritp);

  res.send(heScritp);
  //   console.log()
});

module.exports = router;
