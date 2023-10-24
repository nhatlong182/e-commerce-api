'use strict'

import shopModel from "../models/shop.model.js"
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import KeyTokenService from "./keyToken.service.js"
import { createTokenPair } from "../auth/authUtils.js"
import { getInfoData } from "../utils/util.js"
import { AuthFailureError, BadRequestError } from "../config/error.response.js"
import { findByEmail } from "./shop.service.js"

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}

class AccessService {
  static signUp = async ({ name, email, password }) => {
    // check email exist
    const hoderShop = await shopModel.findOne({ email: email }).lean();

    if (hoderShop) {
      throw new BadRequestError('Shop already exists')
    }

    const passwordHash = await bcrypt.hash(password, 10)
    const newShop = await shopModel.create({ name, email, password: passwordHash, roles: [RoleShop.SHOP] })

    // create new shop
    if (newShop) {
      // create publicKey and privateKey
      const publicKey = crypto.randomBytes(64).toString('hex')
      const privateKey = crypto.randomBytes(64).toString('hex')

      // create token
      const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey)

      // save to db
      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        refeshToken: tokens.refeshToken,
        publicKey,
        privateKey
      })

      if (!keyStore) {
        throw new BadRequestError('Key error')
      }

      return {
        shop: getInfoData({ feilds: ['_id', 'name', 'email'], obj: newShop }),
        tokens
      }
    }
  }

  static login = async ({ email, password, refeshToken = null }) => {
    const findShop = await findByEmail({ email })
    if (!findShop) {
      throw new BadRequestError('Shop not exist')
    }

    const matchPassword = await bcrypt.compare(password, findShop.password)
    if (!matchPassword) {
      throw new AuthFailureError('Authentication error')
    }

    const publicKey = crypto.randomBytes(64).toString('hex')
    const privateKey = crypto.randomBytes(64).toString('hex')

    const tokens = await createTokenPair({ userId: findShop._id, email }, publicKey, privateKey)

    const keyStore = await KeyTokenService.createKeyToken({
      userId: findShop._id,
      refeshToken: tokens.refeshToken,
      publicKey,
      privateKey
    })

    if (!keyStore) {
      throw new BadRequestError('Key error')
    }

    return {
      shop: getInfoData({ feilds: ['_id', 'name', 'email'], obj: findShop }),
      tokens
    }
  }

  static logout = async ({ keyStore }) => {
    return await KeyTokenService.removeByUserId(keyStore._id)
  }
}

export default AccessService