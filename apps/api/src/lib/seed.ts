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
  // Local dev (TypeScript via tsx): apps/api/src/lib/seed.ts -> ../../../../curriculum/
  path.resolve(__dirname, '..', '..', '..', '..', 'curriculum', 'module-1-lessons.md'),
  // Prod container (compiled JS at /app/dist/lib/seed.js): -> ../../curriculum/
  path.resolve(__dirname, '..', '..', 'curriculum', 'module-1-lessons.md'),
];

function findLessonsPath(): string {
  for (const candidate of CANDIDATE_LESSONS_PATHS) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(
    `Could not find module-1-lessons.md. Tried:\n  ${CANDIDATE_LESSONS_PATHS.join('\n  ')}`
  );
}

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

export type SeedResult = {
  moduleNumber: number;
  moduleTitle: string;
  lessons: { number: number; title: string }[];
};

export async function runSeed(): Promise<SeedResult> {
  const lessonsPath = findLessonsPath();
  console.log(`Reading lessons from ${lessonsPath}`);
  const markdown = fs.readFileSync(lessonsPath, 'utf-8');
  const lessons = parseLessons(markdown);

  if (lessons.length === 0) {
    throw new Error('No lessons parsed. Check module-1-lessons.md format.');
  }

  console.log(`Parsed ${lessons.length} lessons.`);

  const result = await prisma.$transaction(async (tx) => {
    const module = await tx.module.upsert({
      where: { number: MODULE_1.number },
      update: { title: MODULE_1.title, description: MODULE_1.description },
      create: MODULE_1
    });
    console.log(`Upserted Module ${module.number}: ${module.title}`);

    const upsertedLessons: { number: number; title: string }[] = [];
    for (const lesson of lessons) {
      const r = await tx.lesson.upsert({
        where: { moduleId_number: { moduleId: module.id, number: lesson.number } },
        update: { title: lesson.title, content: lesson.content },
        create: {
          moduleId: module.id,
          number: lesson.number,
          title: lesson.title,
          content: lesson.content
        }
      });
      console.log(`  Upserted Lesson ${r.number}: ${r.title}`);
      upsertedLessons.push({ number: r.number, title: r.title });
    }

    return {
      moduleNumber: module.number,
      moduleTitle: module.title,
      lessons: upsertedLessons
    };
  });

  console.log(`\nSeed complete. Module ${result.moduleNumber} with ${result.lessons.length} lessons.`);
  return result;
}

// CLI entry point — only runs when this file is executed directly, not when imported
if (require.main === module) {
  runSeed()
    .catch((e) => {
      console.error('Seed failed:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
}
