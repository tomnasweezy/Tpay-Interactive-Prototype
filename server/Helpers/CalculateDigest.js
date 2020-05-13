const CryptoJS = require("crypto-js");

module.exports = {
  CalculateDigest: function(body, publickey, privatekey) {
    var message = Object.values(body).join("");
    var hash = CryptoJS.HmacSHA256(message, privatekey);
    var digest = `${publickey}:${hash}`;
    return digest;
  }
};
