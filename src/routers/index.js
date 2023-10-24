'use strict'

import express from "express";
import { apiKey, permission } from "../auth/checkAuth.js";
import accessRouter from "./access/accessRouter.js";

const router = express.Router();

// check api key
router.use(apiKey)
// check permission
router.use(permission('0000'))

router.get('/', (req, res) => {
  res.send('hello')
})

router.use('/v1/api', accessRouter)

export default router