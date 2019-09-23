import { Provider } from "@graphity/container"
import { sign, verify } from "jsonwebtoken"
import { Jwt } from "../interfaces/jwt"
import { SIGN_KEY, VERIFY_KEY } from "../../jwt.config"

export const jwt: Provider = {
  register(app) {
    app.resolver<Jwt>("jwt", () => {
      return {
        sign(payload, options = {}) {
          return sign(payload, SIGN_KEY, {
            algorithm: "RS256",
            ...options,
          })
        },
        verify<P>(token: string, options = {}) { // eslint-disable-line
          return verify(token, VERIFY_KEY, {
            algorithms: ["RS256"],
            ...options,
          }) as any as P
        },
      }
    })
  },
}
