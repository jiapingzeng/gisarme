var mongoose = require('mongoose')
var Schema = mongoose.Schema

var gnoteSchema = new Schema({
    key: { type: String, required: true, unique: true, min: 5, max: 32 },
    passcode: { type: String, min: 5, max: 32 },
    content: { type: String, required: true, max: 5000 },
    created_at: Date,
    updated_at: Date
})

gnoteSchema.pre('save', function(next) {
    this.key = this.key.toLowerCase()
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at) {
        this.created_at = currentDate
    }
    next()
})

var Gnote = mongoose.model('Gnote', gnoteSchema)

module.exports = Gnote