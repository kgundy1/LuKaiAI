import { FastifyInstance } from 'fastify';
import prisma from '../db';
import { requireAuth } from '../auth';

export default async function lessonRoutes(app: FastifyInstance) {
  app.get('/modules/:moduleNumber/lessons', async (req, reply) => {
    const { moduleNumber } = req.params as { moduleNumber: string };
    const num = Number(moduleNumber);
    if (!Number.isInteger(num) || num < 0) {
      return reply.code(400).send({ ok: false, error: 'Invalid module number' });
    }
    const auth = await requireAuth(req, reply);
    const userId = auth.userId;

    const module = await prisma.module.findUnique({
      where: { number: num },
      include: {
        lessons: {
          orderBy: { number: 'asc' },
          select: { id: true, number: true, title: true, content: true, content_blocks: true }
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

  app.get('/lessons/:lessonId/checklist-state', async (req, reply) => {
    const { lessonId } = req.params as { lessonId: string };
    if (typeof lessonId !== 'string' || lessonId.length === 0) {
      return reply.code(400).send({ ok: false, error: 'Invalid lesson id' });
    }
    const auth = await requireAuth(req, reply);
    const userId = auth.userId;

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) {
      return reply.code(404).send({ ok: false, error: 'Lesson not found' });
    }

    const items = await prisma.checklistItem.findMany({
      where: { userId, lessonId },
      select: { blockId: true, itemId: true }
    });

    return reply.send({ ok: true, completedItems: items });
  });

  app.post('/lessons/:lessonId/checklist-toggle', async (req, reply) => {
    const { lessonId } = req.params as { lessonId: string };
    if (typeof lessonId !== 'string' || lessonId.length === 0) {
      return reply.code(400).send({ ok: false, error: 'Invalid lesson id' });
    }

    const auth = await requireAuth(req, reply);
    const userId = auth.userId;

    const body = req.body as { blockId?: unknown; itemId?: unknown; completed?: unknown } | null;
    if (
      !body ||
      typeof body.blockId !== 'string' || body.blockId.length === 0 ||
      typeof body.itemId !== 'string' || body.itemId.length === 0 ||
      typeof body.completed !== 'boolean'
    ) {
      return reply.code(400).send({ ok: false, error: 'Invalid body' });
    }
    const { blockId, itemId, completed } = body as { blockId: string; itemId: string; completed: boolean };

    const lesson = await prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) {
      return reply.code(404).send({ ok: false, error: 'Lesson not found' });
    }

    if (completed) {
      await prisma.checklistItem.upsert({
        where: { userId_lessonId_blockId_itemId: { userId, lessonId, blockId, itemId } },
        update: {},
        create: { userId, lessonId, blockId, itemId }
      });
    } else {
      await prisma.checklistItem.deleteMany({
        where: { userId, lessonId, blockId, itemId }
      });
    }

    return reply.send({ ok: true });
  });
}
