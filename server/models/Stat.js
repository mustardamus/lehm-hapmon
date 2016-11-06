'use strict'

module.exports = function (mongoose) {
  const name = 'Stat'
  const schema = new mongoose.Schema({
    visits: { type: Number, default: 0 }
  }, {
    timestamps: true
  })

  return mongoose.model(name, schema)
}
