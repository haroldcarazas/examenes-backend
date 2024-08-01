import Examen from '../models/Examen.js'
import Respuesta from '../models/Respuesta.js'

class ExamenController {
  static async me (req, res) {
    try {
      const examenes = await Examen.find({ curso: req.user.curso })
      res.json(examenes)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getById (req, res) {
    try {
      const { id } = req.params

      const examen = await Examen.findById(id).populate({
        path: 'preguntas.pregunta',
        select: '-respuesta'
      })
      res.json(examen)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async store (req, res) {
    try {
      const { examen, respuestas } = req.body

      const { preguntas } = await Examen.findById(examen)
        .select('preguntas')
        .populate({ path: 'preguntas.pregunta', select: '-opciones' })

      if (preguntas.length !== respuestas.length) return res.status(400).json({ message: 'No se han enviado todas las respuestas' })

      let puntajeTotal = 0
      const respuestasDB = []
      for (const p of preguntas) {
        const respuestaAlumno = respuestas.find(r => r.preguntaId === p.pregunta._id.toString())
        if (!respuestaAlumno) return res.status(400).json({ message: 'Hubo un error en las respuestas enviadas' })

        let puntajeGanado = 0
        if (respuestaAlumno.respuesta === p.pregunta.respuesta) {
          puntajeTotal += p.puntaje
          puntajeGanado = p.puntaje
        }

        respuestasDB.push({ pregunta: p.pregunta._id, respuestaAlumno: respuestaAlumno.respuesta, puntajeGanado })
      }

      const nuevaRespuesta = await Respuesta.create({
        user: req.user._id,
        examen,
        respuestas: respuestasDB,
        puntajeTotal
      })

      res.status(201).json({ message: 'Examen guardado', data: nuevaRespuesta })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default ExamenController
