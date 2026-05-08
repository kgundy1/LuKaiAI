import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import jwt from '@fastify/jwt';
import cookie from '@fastify/cookie';
import subscribeRoutes from './routes/subscribe';
import authRoutes from './routes/auth';
import lessonRoutes from './routes/lessons';
import adminRoutes from './routes/admin';

const PORT = parseInt(process.env.PORT ?? '4000', 10);

const app = Fastify({ logger: true, trustProxy: true });

async function build() {
  await app.register(cors, {
    origin: (origin, cb) => {
      const allowed = [
        process.env.CORS_ORIGIN,
        'https://lukaiai.pages.dev',
        'http://localhost:5173',
        'http://localhost:3000',
      ].filter(Boolean);
      const isPreview = origin?.endsWith('.lukaiai.pages.dev') ?? false;
      if (!origin || allowed.includes(origin) || isPreview) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
  });

  await app.register(cookie);
  await app.register(jwt, {
    secret: process.env.JWT_SECRET || 'dev-secret-change-me',
    cookie: {
      cookieName: 'lk_session',
      signed: false,
    },
  });

  await app.register(rateLimit, {
    global: false,
    keyGenerator: (req) => req.ip,
  });

  app.get('/health', async () => ({ ok: true, ts: new Date() }));

  await app.register(subscribeRoutes);
  await app.register(authRoutes);
  await app.register(lessonRoutes);
  await app.register(adminRoutes);

  return app;
}

build()
  .then((server) => server.listen({ port: PORT, host: '0.0.0.0' }))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
