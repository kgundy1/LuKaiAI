import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

const MODULE_1 = {
  number: 1,
  title: 'Type your idea into Claude, get something back',
  description:
    'A working interactive prototype of your idea, built in Claude Design, that you have iterated on enough that it represents what you actually want to build.'
};

const CANDIDATE_LESSONS_PATHS = [
  // Local dev: apps/api/prisma/seed.ts -> ../../../curriculum/
  path.resolve(__dirname, '..', '..', '..', 'curriculum', 'module-1-lessons.md'),
  // Prod container: /app/prisma/seed.ts -> ../curriculum/
  path.resolve(__dirname, '..', 'curriculum', 'module-1-lessons.md'),
];

function findLessonsPath(): string {
  for (const candidate of CANDIDATE_LESSONS_PATHS) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(
    `Could not find module-1-lessons.md. Tried:\n  ${CANDIDATE_LESSONS_PATHS.join('\n  ')}`
  );
}

const MODULE_1_LESSONS_PATH = findLessonsPath();

type ParsedLesson = {
  number: number;
  title: string;
  content: string;
};

function parseLessons(markdown: string): ParsedLesson[] {
  const headingRegex = /^## Lesson (\d+)\s*[—:]\s*(.+)$/gm;
  const matches: { number: number; title: string; index: number; headingLength: number }[] = [];
  let m: RegExpExecArray | null;
  while ((m = headingRegex.exec(markdown)) !== null) {
    matches.push({
      number: parseInt(m[1], 10),
      title: m[2].trim(),
      index: m.index,
      headingLength: m[0].length
    });
  }

  return matches.map((match, i) => {
    const contentStart = match.index + match.headingLength;
    const contentEnd = i + 1 < matches.length ? matches[i + 1].index : markdown.length;
    return {
      number: match.number,
      title: match.title,
      content: markdown.slice(contentStart, contentEnd).trim()
    };
  });
}

async function main() {
  console.log(`Reading lessons from ${MODULE_1_LESSONS_PATH}`);
  const markdown = fs.readFileSync(MODULE_1_LESSONS_PATH, 'utf-8');
  const lessons = parseLessons(markdown);

  if (lessons.length === 0) {
    throw new Error('No lessons parsed. Check module-1-lessons.md format.');
  }

  console.log(`Parsed ${lessons.length} lessons.`);

  await prisma.$transaction(async (tx) => {
    const module = await tx.module.upsert({
      where: { number: MODULE_1.number },
      update: { title: MODULE_1.title, description: MODULE_1.description },
      create: MODULE_1
    });
    console.log(`Upserted Module ${module.number}: ${module.title}`);

    for (const lesson of lessons) {
      const result = await tx.lesson.upsert({
        where: { moduleId_number: { moduleId: module.id, number: lesson.number } },
        update: { title: lesson.title, content: lesson.content },
        create: {
          moduleId: module.id,
          number: lesson.number,
          title: lesson.title,
          content: lesson.content
        }
      });
      console.log(`  Upserted Lesson ${result.number}: ${result.title}`);
    }
  });

  console.log(`\nSeed complete. Module 1 with ${lessons.length} lessons.`);
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
