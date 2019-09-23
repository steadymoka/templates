import { GraphQLGuard } from "graphity"
import { Jwt, JwtSocialUser } from "../interfaces/jwt"
import { Container } from "@graphity/container"

export const authGuard: () => GraphQLGuard<any, any> = () => async (parent, args, ctx, info, next) => {
  const jwt = await Container.instance.get<Jwt>("jwt")

  let jwtJson: JwtSocialUser
  try {
    const token = (ctx as any).authorization.replace(/^Bearer\s+/, "")
    jwtJson = jwt.verify<JwtSocialUser>(token)

    if (!jwtJson) {
      throw Object.assign(new Error("forbidden"), { code: "AUTH_FORBIDDEN" })
    }

  } catch (e) {
    throw Object.assign(new Error("forbidden: wrong token"), { code: "AUTH_WRONG_TOKEN" })
  }

  (ctx as any).userId = jwtJson.id
  return next(parent, args, ctx, info)
}

export const auth: () => GraphQLGuard<any, any> = () => async (parent, args, ctx, info, next) => {
  let jwtJson: JwtSocialUser

  try {
    const jwt = await Container.instance.get<Jwt>("jwt")

    const token = (ctx as any).authorization.replace(/^Bearer\s+/, "")
    jwtJson = jwt.verify<JwtSocialUser>(token)
  } catch (e) {
    return next(parent, args, ctx, info)
  }

  if (jwtJson) {
    (ctx as any).userId = jwtJson.id
  }
  return next(parent, args, ctx, info)
}
