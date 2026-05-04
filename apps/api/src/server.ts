import Fastify from 'fastify';
import cors from '@fastify/cors';
import rateLimit from '@fastify/rate-limit';
import subscribeRoutes from './routes/subscribe';

const PORT = parseInt(process.env.PORT ?? '4000', 10);
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:5173';

const app = Fastify({ logger: true, trustProxy: true });

async function build() {
  await app.register(cors, {
    origin: (origin, cb) => {
      const allowed = [
        'https://lukaiai.pages.dev',
        'http://localhost',
        'http://localhost:5173',
        'http://localhost:3000',
        CORS_ORIGIN,
      ];
      if (!origin || allowed.includes(origin)) {
        cb(null, true);
      } else {
        cb(new Error('Not allowed by CORS'), false);
      }
    },
    credentials: true,
  });

  await app.register(rateLimit, {
    global: false,
    keyGenerator: (req) => req.ip,
  });

  app.get('/health', async () => ({ ok: true, ts: new Date() }));

  await app.register(subscribeRoutes);

  return app;
}

build()
  .then((server) => server.listen({ port: PORT, host: '0.0.0.0' }))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
