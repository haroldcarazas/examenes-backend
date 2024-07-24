import { Schema, model } from 'mongoose'

const preguntaSchema = new Schema({
  tipo: {
    type: String,
    required: true
  },
  pregunta: {
    type: String,
    required: true
  },
  opciones: [{
    type: String,
    required: false
  }],
  respuesta: {
    type: String,
    required: false
  }
})

const preguntaModel = model('Pregunta', preguntaSchema)

export default preguntaModel