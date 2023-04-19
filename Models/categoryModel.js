const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  _id : {type :mongoose.Types.ObjectId , auto:true},
  catName: { type: String, required: true },
  description: { type: String},
});

module.exports = mongoose.model('Category', categorySchema);
