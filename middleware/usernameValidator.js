export const usernameValidator = (req, res, next) => {
  const { username } = req.body

  if (!username) {
    return res
      .status(400)
      .json({ error: 'Имя пользователя не может быть пустым' })
  }

  if (/\s/.test(username)) {
    return res
      .status(400)
      .json({ error: 'Имя пользователя не должно содержать пробелов' })
  }

  if (username.length < 3 || username.length > 16) {
    return res.status(400).json({
      error: 'Имя пользователя должно быть от 3 символов до 16 символов',
    })
  }

  next()
}
