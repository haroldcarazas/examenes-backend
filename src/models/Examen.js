import { Schema, model, Types } from 'mongoose'
import cursoModel from './Curso.js'
import preguntaModel from './Pregunta.js'

const preguntaPuntajeSchema = new Schema({
  pregunta: {
    type: Types.ObjectId,
    required: true,
    ref: preguntaModel
  },
  puntaje: {
    type: Number,
    required: true
  }
})

const examenSchema = new Schema({
  min: {
    type: Number,
    required: true
  },
  curso: {
    type: Types.ObjectId,
    required: true,
    ref: cursoModel
  },
  preguntas: [preguntaPuntajeSchema]
})

const examenModel = model('Examene', examenSchema)

export default examenModel
