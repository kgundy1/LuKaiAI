import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import prisma from '../db';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeBody {
  email: string;
}

export default async function subscribeRoutes(app: FastifyInstance) {
  app.post<{ Body: SubscribeBody }>(
    '/subscribe',
    {
      config: { rateLimit: { max: 3, timeWindow: '1 hour' } },
      schema: {
        body: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string' },
          },
        },
      },
    },
    async (req: FastifyRequest<{ Body: SubscribeBody }>, reply: FastifyReply) => {
      const { email } = req.body;

      if (!EMAIL_RE.test(email)) {
        return reply.status(400).send({ ok: false, error: 'Invalid email address.' });
      }

      const ip = req.ip ?? null;

      try {
        await prisma.subscriber.create({ data: { email: email.toLowerCase().trim(), ip } });
        return reply.send({ ok: true });
      } catch (err: unknown) {
        // Unique constraint violation — already subscribed
        if (
          typeof err === 'object' &&
          err !== null &&
          'code' in err &&
          (err as { code: string }).code === 'P2002'
        ) {
          return reply.send({ ok: true, existing: true });
        }
        req.log.error(err, 'subscribe error');
        return reply.status(500).send({ ok: false, error: 'Internal server error.' });
      }
    }
  );
}
