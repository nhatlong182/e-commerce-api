'use strict'

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = 'apikey'
const COLLECTION_NAME = 'apikeys'

const ApiKeySchema = new Schema({
  key: {
    type: String,
    require: true,
    unique: true
  },
  status: {
    type: Boolean,
    default: true
  },
  permissions: {
    type: [String],
    require: true,
    enum: ['0000', '1111', '2222']
  },
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, ApiKeySchema)
