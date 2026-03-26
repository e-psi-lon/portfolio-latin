import jwt from 'jsonwebtoken';
import { getDb } from './db';

export async function verifyToken(token) {
  try {
    if (!token) {
      return { valid: false, username: null, error: 'Missing token' };
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (!decoded || !decoded.username) {
      return { valid: false, username: null, error: 'Invalid token' };
    }

    const sql = getDb();
    const users = await sql('SELECT * FROM users WHERE username = $1', [decoded.username]);

    if (!users || users.length === 0) {
      return { valid: false, username: null, error: 'User not found' };
    }

    return { valid: true, username: decoded.username, error: null };
  } catch (error) {
    console.error('Token verification error:', error);
    return { valid: false, username: null, error: 'Token verification failed' };
  }
}

export function createToken(username, expiresIn = '3600s') {
  return jwt.sign(
    { username: username },
    process.env.SECRET_KEY,
    { expiresIn: expiresIn }
  );
}

