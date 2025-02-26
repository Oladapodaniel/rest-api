import crypto from "crypto"

const SECRET = "OLADAPO_SECRET"
export const random = () => crypto.randomBytes(128).toString('base64');
export const authentication = (salt, password) => crypto.createHmac('sha256', [salt, password].join("/")).update(SECRET).digest('hex')