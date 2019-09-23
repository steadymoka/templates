export const SIGN_KEY = ``

export const VERIFY_KEY = ``

// if rsa algorithm
// ssh-keygen -t rsa -b 4096 -m PEM -f jwt.key -C hello@domain.com
// openssl rsa -in jwt.key -pubout -outform PEM -out jwt.key.pem

// if default algorithm, use same key
