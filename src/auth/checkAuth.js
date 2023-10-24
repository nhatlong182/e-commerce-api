'use strict'

import { findById } from "../services/apikey.service.js"

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({ message: 'fobidden error' })
    }
    
    const objKey = await findById(key)
    if (!objKey) {
      return res.status(403).json({ message: 'fobidden error' })
    }

    req.objKey = objKey

    return next()
  } catch (error) {
    console.log(error)
  }
}

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({ message: 'permission denied' })
    }

    const isvalid = req.objKey.permissions.includes(permission)
    if (!isvalid) {
      return res.status(403).json({ message: 'permission denied' })
    }

    return next()
  }
}

export {
  apiKey,
  permission,
}