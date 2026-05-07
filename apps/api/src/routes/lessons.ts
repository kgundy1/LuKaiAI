import { FastifyInstance } from 'fastify';
import prisma from '../db';
import { requireAuth } from '../auth';

export default async function lessonRoutes(app: FastifyInstance) {
  app.get('/modules/:moduleId/lessons', async (req, reply) => {
    const { moduleId } = req.params as { moduleId: string };
    const auth = await requireAuth(req, reply);
    const userId = auth.userId;

    const module = await prisma.module.findUnique({
      where: { id: moduleId },
      include: {
        lessons: {
          orderBy: { number: 'asc' },
          select: { id: true, number: true, title: true, content: true }
        }
      }
    });

    if (!module) {
      return reply.code(404).send({ ok: false, error: 'Module not found' });
    }

    const completed = await prisma.userProgress.findMany({
      where: { userId, lessonId: { in: module.lessons.map(l => l.id) } },
      select: { lessonId: true }
    });
    const completedSet = new Set(completed.map(c => c.lessonId));

    return reply.send({
      ok: true,
      module: { id: module.id, number: module.number, title: module.title, description: module.description },
      lessons: module.lessons.map(l => ({ ...l, completed: completedSet.has(l.id) }))
    });
  });

  app.post('/lessons/:lessonId/complete', async (req, reply) => {
    const { lessonId } = req.params as { lessonId: string };
    const auth = await requireAuth(req, reply);
    const userId = auth.userId;

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) {
      return reply.code(404).send({ ok: false, error: 'Lesson not found' });
    }

    await prisma.userProgress.upsert({
      where: { userId_lessonId: { userId, lessonId } },
      update: {},
      create: { userId, lessonId }
    });

    return reply.send({ ok: true });
  });
}
