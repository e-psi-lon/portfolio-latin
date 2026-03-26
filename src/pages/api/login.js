import bcrypt from 'bcryptjs';
import { getDb } from './lib/db';
import { getCorsMiddleware } from './lib/cors-config';
import { createToken } from './lib/auth';
import { ApiResponse } from './lib/response';
import initMiddleware from './lib/init-middleware'

const cors = initMiddleware(getCorsMiddleware(['POST']))

export default async function handler(req, res) {
    await cors(req, res)
    if (req.method !== 'POST') {
        return res.status(405).json(ApiResponse.error('Method not allowed', 'METHOD_NOT_ALLOWED'));
    }

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json(ApiResponse.validationError(['username', 'password']));
    }

    try {
        const sql = getDb();
        const sqlValue = await sql('SELECT * FROM users WHERE username = $1;', [username]);

        if (!sqlValue || sqlValue.length === 0) {
            return res.status(401).json(ApiResponse.authError('Incorrect username or password'));
        }

        const storedUser = sqlValue[0];

        const passwordMatch = await bcrypt.compare(password, storedUser.password);

        if (!passwordMatch) {
            return res.status(401).json(ApiResponse.authError('Incorrect username or password'));
        }

        const token = createToken(username, '3600s');
        return res.status(200).json(ApiResponse.success({ token: token }, 'Authentication successful'));
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json(ApiResponse.error('An error occurred during authentication'));
    }
}
