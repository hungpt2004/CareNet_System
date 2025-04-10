const crypto = require("crypto");

exports.generateSignature = (organizationName, eventName) => {
  const data = `${organizationName}-${eventName}`;
  const hash = crypto.createHash("sha256").update(data).digest("hex");
  return hash;
};
