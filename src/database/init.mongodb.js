"use strict"

import mongoose from "mongoose"
import { countConnect } from "../helpers/check.connect.js"
import env from "../config/config.js"

const connectionString = env.db.connectionString

class Database {
  constructor() {
    this.connect()
  }

  connect(type = 'mongodb') {
    // dev enviroment
    if (1 === 1) {
      mongoose.set('debug', true)
      mongoose.set('debug', { color: true })
    }

    mongoose.connect(connectionString)
      .then(() => {
        console.log('connect mongodb success')
        countConnect()
      })
      .catch((err) => {
        console.log('error connect', err)
      })
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }

    return Database.instance
  }
}

const instanceMongodb = Database.getInstance()

export default instanceMongodb