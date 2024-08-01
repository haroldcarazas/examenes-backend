import { Schema, model, Types } from 'mongoose'
import Pregunta from './Pregunta.js'
import Examen from './Examen.js'
import Video from './Video.js'
import User from './User.js'

const resSchema = new Schema({
  pregunta: {
    type: Types.ObjectId,
    required: true,
    ref: Pregunta
  },
  respuestaAlumno: {
    type: String
  },
  video: {
    type: Types.ObjectId,
    ref: Video
  },
  puntajeGanado: {
    type: Number,
    required: true
  }
})

const respuestaSchema = new Schema({
  user: {
    type: Types.ObjectId,
    required: true,
    ref: User
  },
  respuestas: [resSchema],
  examen: {
    type: Types.ObjectId,
    required: true,
    ref: Examen
  },
  puntajeTotal: {
    type: Number,
    required: true
  }
})

const Respuesta = model('Respuesta', respuestaSchema)

export default Respuesta
