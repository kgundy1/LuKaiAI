import { FastifyInstance } from 'fastify';
import { runSeed } from '../lib/seed';
import { runSeedBlocks } from '../lib/seed-blocks';

export default async function adminRoutes(app: FastifyInstance) {
  app.post('/admin/seed', async (req, reply) => {
    const expected = process.env.ADMIN_SEED_TOKEN;
    if (!expected) {
      return reply.code(503).send({ ok: false, error: 'Admin seed not configured' });
    }

    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

    if (!token || token !== expected) {
      return reply.code(401).send({ ok: false, error: 'Unauthorized' });
    }

    try {
      const result = await runSeed();
      return reply.send({ ok: true, result });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      req.log.error({ err }, 'Seed failed');
      return reply.code(500).send({ ok: false, error: message });
    }
  });

  app.post('/admin/seed-blocks', async (req, reply) => {
    const expected = process.env.ADMIN_SEED_TOKEN;
    if (!expected) {
      return reply.code(503).send({ ok: false, error: 'Admin seed not configured' });
    }

    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : '';

    if (!token || token !== expected) {
      return reply.code(401).send({ ok: false, error: 'Unauthorized' });
    }

    try {
      const result = await runSeedBlocks();
      return reply.send({ ok: true, result });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      req.log.error({ err }, 'Seed-blocks failed');
      return reply.code(500).send({ ok: false, error: message });
    }
  });
}
