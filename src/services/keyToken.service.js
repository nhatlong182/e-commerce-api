'use strict'

import keytokenModel from "../models/keytoken.model.js";

class KeyTokenService {
  static createKeyToken = async ({ userId, refeshToken, publicKey, privateKey }) => {
    try {
      const filter = { shop: userId }, update = { publicKey, privateKey, refeshTokensUsed: [], refeshToken }, options = { upsert: true, new: true }

      const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)

      return tokens ? tokens.publicKey : null
    } catch (error) {
      return error
    }
  }

  static findByUserId = async (userId) => {
    return await keytokenModel.findOne({ shop: userId }).lean()
  }

  static removeByUserId = async (id) => {
    return await keytokenModel.deleteOne(id)
  }
}

export default KeyTokenService