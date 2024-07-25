import User from '../models/User.js'
import { compare, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

class AuthController {
  static async login (req, res) {
    try {
      const { usernameOrEmail, password } = req.body
      if (!usernameOrEmail || !password) return res.status(400).json({ message: 'Faltan datos' })

      const usuario = await User.findOne({ $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }] })
      if (!usuario) return res.status(404).json({ message: 'No se encontró el usuario' })

      const isValid = await compare(password, usuario.password)
      if (!isValid) return res.status(400).json({ message: 'Credenciales inválidas' })

      const token = jwt.sign({ usuarioId: usuario._id }, SECRET_KEY, { expiresIn: '1h' })

      res.json({ message: 'Login exitoso', token })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async register (req, res) {
    try {
      const { username, password, nombres, apellidos, rol, email } = req.body
      if (!username || !password || !nombres || !apellidos || !rol || !email) return res.status(400).json({ message: 'Faltan datos' })

      const usuarioExistente = await User.findOne({ $or: [{ username }, { email }] })
      if (usuarioExistente) return res.status(404).json({ message: 'Nombre de usuario o correo en uso' })

      const hashedPsswrd = await hash(password, 10)

      const usuario = await User.create({
        username,
        password: hashedPsswrd,
        nombres,
        apellidos,
        rol,
        email
      })

      const usuarioObj = usuario.toObject()
      delete usuarioObj.password
      delete usuarioObj.__v

      res.json({ message: 'Usuario creado', data: usuarioObj })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async me (req, res) {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.status(400).json({ message: 'Se debe proveer un token' })

      const decoded = jwt.verify(authorization, SECRET_KEY)

      const usuario = await User.findById(decoded.usuarioId).select('-password')
      if (!usuario) return res.status(404).json({ message: 'El usuario no existe' })

      res.json(usuario)
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) return res.status(403).json({ message: 'Token expirado' })
      res.status(500).json({ message: error.message })
    }
  }
}

export default AuthController
