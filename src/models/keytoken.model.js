'use strict'

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = 'key'
const COLLECTION_NAME = 'keys'

const keyTokenSchema = new Schema({
  shop: {
    type: Schema.Types.ObjectId,
    require: true,
    ref: 'shop'
  },
  publicKey: {
    type: String,
    require: true
  },
  privateKey: {
    type: String,
    require: true
  },
  refeshTokensUsed: {
    type: Array,
    default: []
  },
  refeshToken: {
    type: String,
    require: true
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, keyTokenSchema)
