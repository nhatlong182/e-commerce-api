'use strict'

import { CREATED, SuccessResponse } from "../config/success.response.js"
import AccessService from "../services/access.service.js"

class AccessController {
  signUp = async (req, res) => {
    new CREATED({
      message: 'Registed OK!',
      metadata: await AccessService.signUp(req.body)
    }).send(res)
  }

  login = async (req, res) => {
    new SuccessResponse({
      metadata: await AccessService.login(req.body)
    }).send(res)
  }

  logout = async (req, res) => {
    new SuccessResponse({
      message: 'Logout success',
      metadata: await AccessService.logout({ keyStore: req.keyStore })
    }).send(res)
  }
}

export default AccessController