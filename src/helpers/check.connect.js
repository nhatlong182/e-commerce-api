'use strict'

import mongoose from "mongoose"
import os from "os"
import process from "process"

const _SECONDS = 5000

const countConnect = () => {
  const numConnections = mongoose.connections.length
  console.log(`number of connections: ${numConnections}`)
}

const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length
    const numCores = os.cpus().length
    const memoryUsage = process.memoryUsage().rss
    const maxConnections = numCores * 2

    console.log(`active connection:: ${numConnections}`)
    console.log(`memory usage:: ${memoryUsage / 1024 / 1024} MB`)

    if (numConnections > maxConnections) {
      console.log('connection overload!!!')
    }
  }, _SECONDS) // monitor every 5s
}

export {
  countConnect,
  checkOverload
}