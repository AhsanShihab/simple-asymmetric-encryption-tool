require("dotenv").config();
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

function decryptStringWithRsaPrivateKey(
  toDecrypt,
  relativeOrAbsolutePathtoPrivateKey
) {
  const passphrase = process.env.PASSPHRASE;
  if (!passphrase) {
    throw new Error("Passphrase required");
  }
  const absolutePath = path.resolve(relativeOrAbsolutePathtoPrivateKey);
  const privateKey = fs.readFileSync(absolutePath, "utf8");
  const buffer = Buffer.from(toDecrypt, "base64");
  const decrypted = crypto.privateDecrypt(
    {
      key: privateKey.toString(),
      passphrase: passphrase,
    },
    buffer
  );
  return decrypted.toString("utf8");
}

function main() {
  const args = process.argv.slice(2);
  const toDecrypt = args[0];
  let priKey = path.join(__dirname, "keys", "rsa_key");
  const privateKeyPath = args[1];
  if (privateKeyPath && privateKeyPath.startsWith("--private-key=")) {
    priKey = privateKeyPath.split("=").slice(1).join();
  }
  console.log("using private key:", priKey);
  const decrypted = decryptStringWithRsaPrivateKey(toDecrypt, priKey);
  try {
    console.log(JSON.stringify(JSON.parse(decrypted), null, 2));
  } catch {
    console.log(decrypted);
  }
}

main();
