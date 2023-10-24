'use strict'

import apikeyModel from "../models/apikey.model.js"
import crypto from 'crypto'

const findById = async (key) => {
  // const newKey = await apikeyModel.create({key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']})
  // console.log(newKey)
  const objKey = await apikeyModel.findOne({key, status: true}).lean()
  console.log('objKey', objKey)
  return objKey
}

export {
  findById
}