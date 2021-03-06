var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var present = new Date();
var month = present.getMonth() + 1;
var year = present.getFullYear() + 543;
var nextYear = year + 1;

var selfTemplateSchema = new Schema({
    self_template: {},
    evaluatedBy: { type: String, ref: 'User' },
    timestamp: {
        month: { type: Number, default: month },
        year: { type: Number, default: year },
        evalRound: ''
    },
    isVerified: { type: Boolean, default: false }
});

selfTemplateSchema.pre('save', function(next) {
    var st = this;
    var month = st.timestamp.month;

    if (month >= 10 && month <= 12 || month >= 1 && month <= 3) {
        st.timestamp.evalRound = 1 + "/" + year + "-" + nextYear;
    } else if (month >= 4 && month <= 9) {
        st.timestamp.evalRound = 2 + "/" + year;
    }
    next();
});

module.exports = mongoose.model('SelfTemplate', selfTemplateSchema);