import { Schema, model, Types } from 'mongoose'

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  nombres: {
    type: String,
    required: true
  },
  apellidos: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  curso: {
    type: Types.ObjectId,
    required: false
  }
})

const User = model('User', userSchema)

export default User
