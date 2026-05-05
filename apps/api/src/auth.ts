import bcrypt from 'bcrypt';
import { FastifyRequest, FastifyReply } from 'fastify';

const SALT_ROUNDS = 12;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export interface AuthPayload {
  userId: string;
  email: string;
}

export async function requireAuth(req: FastifyRequest, reply: FastifyReply): Promise<AuthPayload> {
  try {
    const decoded = await req.jwtVerify<AuthPayload>();
    return decoded;
  } catch (err) {
    reply.status(401).send({ ok: false, error: 'Not authenticated' });
    throw err;
  }
}
