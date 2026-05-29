import { FastifyInstance } from 'fastify';
import prisma from '../db';
import { requireAuth } from '../auth';

interface SubmitProjectBody {
  projectName?: unknown;
  projectUrl?: unknown;
  projectDescription?: unknown;
  builderDisplayName?: unknown;
  moduleCompleted?: unknown;
  isProjectPublic?: unknown;
}

function emailLocalPart(email: string): string {
  const at = email.indexOf('@');
  return at > 0 ? email.slice(0, at) : email;
}

export default async function projectsRoutes(app: FastifyInstance) {
  app.post<{ Body: SubmitProjectBody }>('/me/project', async (req, reply) => {
    const auth = await requireAuth(req, reply);
    const userId = auth.userId;

    const body = (req.body ?? {}) as SubmitProjectBody;

    if (typeof body.projectName !== 'string') {
      return reply.code(400).send({ ok: false, error: 'projectName is required' });
    }
    const projectName = body.projectName.trim();
    if (projectName.length < 1 || projectName.length > 50) {
      return reply.code(400).send({ ok: false, error: 'projectName must be 1-50 characters' });
    }

    if (typeof body.projectUrl !== 'string') {
      return reply.code(400).send({ ok: false, error: 'projectUrl is required' });
    }
    const projectUrl = body.projectUrl.trim();
    if (projectUrl.length < 1 || projectUrl.length > 500) {
      return reply.code(400).send({ ok: false, error: 'projectUrl must be 1-500 characters' });
    }
    if (!projectUrl.startsWith('http://') && !projectUrl.startsWith('https://')) {
      return reply.code(400).send({ ok: false, error: 'projectUrl must start with http:// or https://' });
    }

    if (typeof body.projectDescription !== 'string') {
      return reply.code(400).send({ ok: false, error: 'projectDescription is required' });
    }
    const projectDescription = body.projectDescription.trim();
    if (projectDescription.length < 1 || projectDescription.length > 500) {
      return reply.code(400).send({ ok: false, error: 'projectDescription must be 1-500 characters' });
    }

    let builderDisplayName: string | null = null;
    if (body.builderDisplayName !== undefined && body.builderDisplayName !== null) {
      if (typeof body.builderDisplayName !== 'string') {
        return reply.code(400).send({ ok: false, error: 'builderDisplayName must be a string' });
      }
      const trimmed = body.builderDisplayName.trim();
      if (trimmed.length > 80) {
        return reply.code(400).send({ ok: false, error: 'builderDisplayName must be 80 characters or fewer' });
      }
      builderDisplayName = trimmed.length > 0 ? trimmed : null;
    }

    let moduleCompleted: number | null = null;
    if (body.moduleCompleted !== undefined && body.moduleCompleted !== null) {
      if (typeof body.moduleCompleted !== 'number' || !Number.isInteger(body.moduleCompleted)) {
        return reply.code(400).send({ ok: false, error: 'moduleCompleted must be an integer' });
      }
      if (body.moduleCompleted < 0 || body.moduleCompleted > 10) {
        return reply.code(400).send({ ok: false, error: 'moduleCompleted must be between 0 and 10' });
      }
      moduleCompleted = body.moduleCompleted;
    }

    let isProjectPublic = true;
    if (body.isProjectPublic !== undefined) {
      if (typeof body.isProjectPublic !== 'boolean') {
        return reply.code(400).send({ ok: false, error: 'isProjectPublic must be a boolean' });
      }
      isProjectPublic = body.isProjectPublic;
    }

    const updated = await prisma.user.update({
      where: { id: userId },
      data: {
        projectName,
        projectUrl,
        projectDescription,
        builderDisplayName,
        moduleCompleted,
        isProjectPublic,
      },
      select: {
        projectName: true,
        projectUrl: true,
        projectDescription: true,
        builderDisplayName: true,
        moduleCompleted: true,
        isProjectPublic: true,
        updatedAt: true,
      },
    });

    return reply.send({
      ok: true,
      project: {
        projectName: updated.projectName,
        projectUrl: updated.projectUrl,
        projectDescription: updated.projectDescription,
        builderDisplayName: updated.builderDisplayName,
        moduleCompleted: updated.moduleCompleted,
        isProjectPublic: updated.isProjectPublic,
        submittedAt: updated.updatedAt,
      },
    });
  });

  app.get('/projects', async (_req, reply) => {
    const users = await prisma.user.findMany({
      where: {
        isProjectPublic: true,
        projectUrl: { not: null },
      },
      orderBy: { updatedAt: 'desc' },
      select: {
        email: true,
        projectName: true,
        projectUrl: true,
        projectDescription: true,
        builderDisplayName: true,
        moduleCompleted: true,
        updatedAt: true,
      },
    });

    const projects = users.map((u) => ({
      projectName: u.projectName,
      projectUrl: u.projectUrl,
      projectDescription: u.projectDescription,
      builderDisplayName:
        u.builderDisplayName && u.builderDisplayName.length > 0
          ? u.builderDisplayName
          : emailLocalPart(u.email),
      moduleCompleted: u.moduleCompleted,
      submittedAt: u.updatedAt,
    }));

    return reply.send({ ok: true, projects });
  });
}
