var mongoose = require('mongoose')
var Schema = mongoose.Schema

var gnoteSchema = new Schema({
    key: { type: String, required: true, unique: true },
    passcode: String,
    content: { type: String, required: true },
    created_at: Date,
    updated_at: Date
})

gnoteSchema.pre('save', function(next) {
    var currentDate = new Date()
    this.updated_at = currentDate
    if (!this.created_at) {
        this.created_at = currentDate
    }
    next()
})

var Gnote = mongoose.model('Gnote', gnoteSchema)

module.exports = Gnote