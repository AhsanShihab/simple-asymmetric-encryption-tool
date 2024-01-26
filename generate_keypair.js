require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function generateKeys() {
  const passphrase = process.env.PASSPHRASE;
  if (!passphrase) {
    throw new Error("Passphrase required");
  }
  fs.mkdirSync(path.join(__dirname, "keys"), { recursive: true });
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    namedCurve: "secp256k1",
    publicKeyEncoding: {
      type: "spki",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs8",
      format: "pem",
      cipher: "aes-256-cbc",
      passphrase: passphrase,
    },
  });

  fs.writeFileSync(path.join(__dirname, "keys", "rsa_key"), privateKey);
  fs.writeFileSync(path.join(__dirname, "keys", "rsa_key.pub"), publicKey);
}

generateKeys();
