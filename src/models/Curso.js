import { Schema, model, Types } from 'mongoose'
import userModel from './User.js'

const cursoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  maestros: [{
    type: Types.ObjectId,
    required: true,
    ref: userModel
  }]
})

const cursoModel = model('Curso', cursoSchema)

export default cursoModel
