'use strict'

import express from "express";
import { authentication } from "../../auth/authUtils.js";
import AccessController from "../../controllers/access.controller.js";
import { asyncHandle } from "../../helpers/asyncHandler.js";

const accessRouter = express.Router();

accessRouter.post('/shop/signup', asyncHandle(new AccessController().signUp))
accessRouter.post('/shop/login', asyncHandle(new AccessController().login))

accessRouter.use(authentication)
accessRouter.post('/shop/logout', asyncHandle(new AccessController().logout))


export default accessRouter