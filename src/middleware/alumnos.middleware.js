import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'
import User from '../models/User.js'

export const validateAlumno = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) return res.status(403).json({ message: 'Debe proporcionar un token' })

    const decoded = jwt.verify(authorization, SECRET_KEY)

    const usuario = await User.findById(decoded.usuarioId)
    if (!usuario) return res.status(404).json({ message: 'No existe el usuario' })

    if (usuario.rol === 'maestro') return res.status(403).json({ message: 'Solo se permite el acceso a un alumno' })

    req.user = usuario
    next()
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
