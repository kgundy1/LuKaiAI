import { FastifyInstance } from 'fastify';
import prisma from '../db';

export default async function moduleRoutes(app: FastifyInstance) {
  app.get('/modules', async (_req, reply) => {
    const modules = await prisma.module.findMany({
      orderBy: { number: 'asc' },
      select: { number: true, title: true, description: true }
    });
    return reply.send({ ok: true, modules });
  });
}
