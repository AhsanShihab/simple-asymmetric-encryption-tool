# Encryption tool

This is a simple asymmetric encryption tool.

## Passphrase

You need to set your key's Passphrase in the process environment (required). To set your passphrase in the process environment, either create a `.env` file and set the passphrase there.

```
# in .env file
PASSPHRASE=mypassphrase
```

Or you can set the environment variable in the terminal.

```
export PASSPHRASE=mypassphrase
```

or during running a command, 

```
PASSPHRASE=mypassphrase node generate_keypair
```

Note that, the input might stay in your terminal history, so adding the passphrase from the terminal is not secured. Use the `.env` file route and delete it later once you are done.


## Generate key pair

If you don't have a public-private key pair already, or want to generate a new one, you can do that by running the `generate_keypair.js` script.

```
node generate_keypair
```

It will create a key pair and save them in the `keys` folder (will be created if doesn't exist).

## Encrypt

You can encrypt using the `encrypt.js` script.

You can encrypt string value or JSON data. If you want to encrypt string, pass `string` as the first argument and the string value as the second argument to the script. As the third argument, you can pass `--public-key=/your/public/key/location`. The third argument is optional. If omitted, it will try to read the `keys/rsa_key.pub` file from the current working directory.

To encrypt json data, pass `json` as the first argument and the json file location as the second argument.

```
# encrypt string
node encrypt string "My sensitive message" --public-key=/your/public/key/location

# encrypt json
node encrypt json /my/sensitive/json/file --public-key=/your/public/key/location
```

## Decrypt

You can decrypt using the `decrypt.js` script.

The script takes the encrypted string as the first parameter. Optionally you can pass `--private-key=/your/private/key/location`. If omitted, it will try to read the `keys/rsa_key` file from the current working directory.

```
node decrypt <Your encrypted string> --private-key=/your/private/key/location
```