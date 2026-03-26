import Cors from 'cors'

export function getCorsMiddleware(methods = ['GET', 'POST']) {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
  ]

  if (process.env.VERCEL_URL) {
    allowedOrigins.push(`https://${process.env.VERCEL_URL}`)
  }

  return Cors({
    origin: allowedOrigins,
    methods: methods,
    credentials: true,
  })
}

