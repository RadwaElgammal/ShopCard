

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const categorySchema = new mongoose.Schema({
  _id: { type: Number },
  catName: { type: String, required: true },
  description: { type: String },
},{_id:false});

// categorySchema.plugin(AutoIncrement, { id: 'categoryCounter' });
categorySchema.plugin(AutoIncrement, { inc_field: '_id' ,id:'categoryCounter'});


mongoose.model('Category', categorySchema);

