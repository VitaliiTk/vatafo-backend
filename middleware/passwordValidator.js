export const passwordValidator = (req, res, next) => {
  const { password } = req.body

  if (!password) {
    return res.status(400).json({ error: 'Пароль не может быть пустым' })
  }

  if (password.length < 6 || password.length > 32) {
    return res
      .status(400)
      .json({ error: 'Пароль должен быть от 6 символов до 64 символов' })
  }

  // Проверяем наличие пробелов
  if (/\s/.test(password)) {
    return res
      .status(400)
      .json({ error: 'Пароль не должен содержать пробелов' })
  }

  next()
}
