'use strict';

import mongoose from 'mongoose';

var ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: Number,
  mobile: Number,
  email: String
});

export default mongoose.model('Contact', ContactSchema);
