import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export function authMiddleware(handler) {
  return async (req, res) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ error: 'Not authenticated' });
    const token = header.split(' ')[1];
    try {
      const payload = jwt.verify(token, JWT_SECRET);
      req.userId = payload.userId;
      return handler(req, res);
    } catch {
      res.status(401).json({ error: 'Invalid token' });
    }
  };
}
