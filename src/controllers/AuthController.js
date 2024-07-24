class AuthController {
  static async login (req, res) {
    try {
      const { username, password } = req.body
      if (!username || !password) return res.status(400).json({ message: 'Faltan datos' })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}

export default AuthController
