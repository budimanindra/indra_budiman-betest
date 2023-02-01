import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {
  const token = req.header('authorization-token')
  if (!token) {
    res.status(400).json({
      status: res.statusCode,
      message: 'Unauthorized Access'
    });
  }
  try {
    const verified = jwt.verify(token, process.env.APP_KEY)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({
      status: res.statusCode,
      message: 'Invalid Token'
    });
  }
}