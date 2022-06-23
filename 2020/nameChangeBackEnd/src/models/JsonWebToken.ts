export class JsonWebTokenClaims {
  iss?: string
  sub?: string
  aud?: string
  exp: number
  nbf?: number
  iat?: number
  jti?: string

  public constructor(init?: Partial<JsonWebTokenClaims>) {
    Object.assign(this, init)
  }
}
