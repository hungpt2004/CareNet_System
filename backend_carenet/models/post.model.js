const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
   isPrivate: { type: Boolean, default: false },
   title: { type: String, required: true },
   content: { type: String, required: true },
   like: {type: Number, default: 0},
   comment: [
      {
         user: { type: Schema.Types.ObjectId, ref: 'User' },
         content: { type: String, required: true },
         createdAt: { type: Date, default: Date.now }
      }
   ],
   createdAt: { type: Date, default: Date.now },
   share: { type: Number, default: 0 },
   url: [{
      type: String,
      default: ''
   }]
})

module.exports = mongoose.model('Post', PostSchema);