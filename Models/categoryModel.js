const mongoose = require('mongoose');
const AutoIncreament = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
  _id:{type:Number},
  catName: { type: String, required: true },
  description: { type: String},
},{_id:false}
);

categorySchema.plugin(AutoIncreament,{id:'categoryCounter'});
mongoose.model('Category',categorySchema);
