import jwt from 'jsonwebtoken'
import { generateRandomString } from '../utils/helpers'
import moment from 'moment'
import config from '../config'
import { Token } from '../models'
import { GenerateTokenType, SaveTokenType } from '../types'

export const generateToken = async ({
  expires,
  user,
}: GenerateTokenType): Promise<string> => {
  return jwt.sign(
    {
      sub: user,
      iat: moment().unix(),
      expires,
    },
    config.jwtSecret,
  )
}

export const saveToken = async (payload: SaveTokenType) => {
  const tokenDoc = await Token.create({
    ...payload,
    _id: generateRandomString(),
  })

  return tokenDoc
}

export const verifyToken = async (token: string) => {
  const payload = jwt.verify(token, config.jwtSecret)

  const tokenDoc = await Token.findOne({ token, user: payload.sub })

  if (!tokenDoc) {
    throw new Error('Token not found')
  }

  return tokenDoc
}

export const generateAuthenticationToken = async (
  user: string,
): Promise<string> => {
  const expires = moment().add(1200, 'minutes').toISOString()
  const token = await generateToken({ user, expires })

  await saveToken({ expires, token, user })

  return token
}
