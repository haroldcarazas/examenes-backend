import { Schema, model, Types } from 'mongoose'
import User from './User.js'

const cursoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  maestros: [{
    type: Types.ObjectId,
    required: true,
    ref: User
  }]
})

const Curso = model('Curso', cursoSchema)

export default Curso
