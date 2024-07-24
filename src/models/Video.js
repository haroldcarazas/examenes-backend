import { Schema, model, Types } from 'mongoose'
import userModel from './User.js'

const videoSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: userModel
  },
  file: {
    type: String,
    required: true
  }
})

const videoModel = model('Video', videoSchema)

export default videoModel
