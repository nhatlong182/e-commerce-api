'use strict'

import { model, Schema } from "mongoose";

const DOCUMENT_NAME = 'shop'
const COLLECTION_NAME = 'shop'

const shopSchema = new Schema({
  name: {
    type: String,
    trim: true,
    maxLength: 150
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  },
  verify: {
    type: Schema.Types.Boolean,
    default: false
  },
  roles: {
    type: Array,
    default: []
  }
}, {
  timestamps: true,
  collection: COLLECTION_NAME
})

export default model(DOCUMENT_NAME, shopSchema)
