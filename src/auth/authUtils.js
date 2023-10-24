'use strict'

import jwt from 'jsonwebtoken'
import { AuthFailureError, NotFoundError } from '../config/error.response.js'
import KeyTokenService from '../services/keyToken.service.js'

const HEADER = {
  API_KEY: 'x-api-key',
  CLIENT_ID: 'x-client-id',
  AUTHORIZATION: 'authorization'
}

const createTokenPair = async (payload, publicKey, privateKey) => {
  try {
    const accessToken = await jwt.sign(payload, publicKey, {
      expiresIn: '2 days'
    })

    const refeshToken = await jwt.sign(payload, privateKey, {
      expiresIn: '7 days'
    })

    return { accessToken, refeshToken }
  } catch (error) {

  }
}

const authentication = async (req, res, next) => {
  try {
    const userId = req.headers[HEADER.CLIENT_ID]
    if (!userId) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Invalid request'
      })
    }

    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Not found key store'
      })
    }

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Invalid request'
      })
    }

    const decodeToken = jwt.verify(accessToken, keyStore.publicKey)
    if (userId !== decodeToken.userId) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'Invalid user'
      })
    }

    req.keyStore = keyStore
    return next()
  } catch (error) {
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: error.message
    })
  }
}

export {
  createTokenPair,
  authentication
}