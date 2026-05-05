import { FastifyInstance } from 'fastify';
import prisma from '../db';
import { hashPassword, verifyPassword, requireAuth } from '../auth';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_PASSWORD = 8;

interface SignupBody {
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

export default async function authRoutes(app: FastifyInstance) {
  app.post<{ Body: SignupBody }>('/signup', {
    config: { rateLimit: { max: 5, timeWindow: '1 hour' } },
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
  }, async (req, reply) => {
    const { email, password } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    if (!EMAIL_RE.test(cleanEmail)) {
      return reply.status(400).send({ ok: false, error: 'Invalid email' });
    }
    if (password.length < MIN_PASSWORD) {
      return reply.status(400).send({ ok: false, error: 'Password must be at least 8 characters' });
    }

    const existing = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (existing) {
      return reply.status(409).send({ ok: false, error: 'Account already exists' });
    }

    const passwordHash = await hashPassword(password);
    const user = await prisma.user.create({
      data: { email: cleanEmail, passwordHash },
    });

    const token = await reply.jwtSign({ userId: user.id, email: user.email });
    reply.setCookie('lk_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return reply.send({ ok: true, user: { id: user.id, email: user.email } });
  });

  app.post<{ Body: LoginBody }>('/login', {
    config: { rateLimit: { max: 10, timeWindow: '1 hour' } },
    schema: {
      body: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: { type: 'string' },
          password: { type: 'string' },
        },
      },
    },
  }, async (req, reply) => {
    const { email, password } = req.body;
    const cleanEmail = email.toLowerCase().trim();

    const user = await prisma.user.findUnique({ where: { email: cleanEmail } });
    if (!user) {
      return reply.status(401).send({ ok: false, error: 'Invalid credentials' });
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      return reply.status(401).send({ ok: false, error: 'Invalid credentials' });
    }

    const token = await reply.jwtSign({ userId: user.id, email: user.email });
    reply.setCookie('lk_session', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });

    return reply.send({ ok: true, user: { id: user.id, email: user.email } });
  });

  app.post('/logout', async (req, reply) => {
    reply.clearCookie('lk_session', { path: '/' });
    return reply.send({ ok: true });
  });

  app.get('/me', async (req, reply) => {
    const auth = await requireAuth(req, reply);
    const user = await prisma.user.findUnique({
      where: { id: auth.userId },
      select: { id: true, email: true, createdAt: true },
    });
    if (!user) {
      return reply.status(401).send({ ok: false, error: 'User not found' });
    }
    return reply.send({ ok: true, user });
  });
}
