import { SignOptions, VerifyOptions } from "jsonwebtoken"

export interface Jwt {
  sign(payload: string | Buffer| object, options?: SignOptions): string
  verify<P = {}>(token: string, options?: VerifyOptions): P // eslint-disable-line
}

export interface JwtSocialUser {
  id: string
  stp: "kakao" | "naver" | "facebook" | "google"
  sid: string
}

export interface AuthContext {
  userId: string
}
