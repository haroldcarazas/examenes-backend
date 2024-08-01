import Examen from '../models/Examen.js'

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

      const examen = await Examen.findById(id).populate({ path: 'preguntas.pregunta', select: '-respuesta' })
      res.json(examen)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async store (req, res) {
    try {
      const { preguntas } = req.body
    } catch (error) {

    }
  }
}

export default ExamenController
