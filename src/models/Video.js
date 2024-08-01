import { Schema, model, Types } from 'mongoose'
import User from './User.js'

const videoSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: User
  },
  file: {
    type: String,
    required: true
  }
})

const Video = model('Video', videoSchema)

export default Video
