import { Schema, model, Types } from 'mongoose'
import userModel from './User.js'
import preguntaModel from './Pregunta.js'
import examenModel from './Examen.js'
import videoModel from './Video.js'

const resSchema = new Schema({
  pregunta: {
    type: Types.ObjectId,
    required: true,
    ref: preguntaModel
  },
  respuestaAlumno: {
    type: String
  },
  video: {
    type: Types.ObjectId,
    ref: videoModel
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
    ref: userModel
  },
  respuestas: [resSchema],
  examen: {
    type: Types.ObjectId,
    required: true,
    ref: examenModel
  },
  puntajeTotal: {
    type: Number,
    required: true
  }
})

const respuestaModel = model('Respuesta', respuestaSchema)

export default respuestaModel
