'use strict';

import mongoose from 'mongoose';

var ContactSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  mobile: String,
  email: String
});

export default mongoose.model('Contact', ContactSchema);
