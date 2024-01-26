require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function encryptStringWithRsaPublicKey(
  toEncrypt,
  relativeOrAbsolutePathToPublicKey
) {
  const passphrase = process.env.PASSPHRASE;
  if (!passphrase) {
    throw new Error("Passphrase required");
  }
  const absolutePath = path.resolve(relativeOrAbsolutePathToPublicKey);
  const publicKey = fs.readFileSync(absolutePath, "utf8");
  const buffer = Buffer.from(toEncrypt);
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
}

function main() {
  const args = process.argv.slice(2);
  const dataType = args[0];
  const dataInput = args[1];
  let pubKey = path.join(__dirname, "keys", "rsa_key.pub");
  const pubKeyPath = args[2];
  if (pubKeyPath && pubKeyPath.startsWith("--public-key=")) {
    pubKey = pubKeyPath.split("=").slice(1).join();
  }
  console.log("using public key:", pubKey);
  if (dataType === "string") {
    const toEncrypt = dataInput;
    if (!toEncrypt) {
      throw new Error("Give me something to encrypt!");
    }
    const encryptedString = encryptStringWithRsaPublicKey(toEncrypt, pubKey);
    console.log(encryptedString);
    return;
  } else if (dataType === "json") {
    const dataJSON = JSON.parse(fs.readFileSync(dataInput, "utf8"));
    const toEncrypt = JSON.stringify(dataJSON);
    const encryptedString = encryptStringWithRsaPublicKey(toEncrypt, pubKey);
    console.log(encryptedString);
    return;
  } else {
    console.log("incorrect data type");
    return;
  }
}

main();
