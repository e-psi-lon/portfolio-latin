import { getCorsMiddleware } from './lib/cors-config';
import { verifyToken } from './lib/auth';
import { ApiResponse } from './lib/response';
import initMiddleware from './lib/init-middleware'

const cors = initMiddleware(getCorsMiddleware(['POST']))

export default async function handler(req, res) {
    await cors(req, res)
    if (req.method !== 'POST') {
        return res.status(405).json(ApiResponse.error('Method not allowed', 'METHOD_NOT_ALLOWED'));
    }

    const { token } = req.body

    if (!token) {
        return res.status(400).json(ApiResponse.validationError('token'));
    }

    const result = await verifyToken(token);

    if (!result.valid) {
        return res.status(401).json(ApiResponse.authError(result.error));
    }

    return res.status(200).json(ApiResponse.success({ username: result.username }, 'Token valid'));
}
