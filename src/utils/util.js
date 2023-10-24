'use strict'

import _ from 'lodash'

const getInfoData = ({ feilds = [], obj = {} }) => {
  return _.pick(obj, feilds)
}

export {
  getInfoData
}