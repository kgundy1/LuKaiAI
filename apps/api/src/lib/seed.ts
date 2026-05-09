import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

type ModuleConfig = {
  number: number;
  title: string;
  description: string;
  lessonsFilename: string;
};

const MODULES: ModuleConfig[] = [
  {
    number: 0,
    title: 'Before you start',
    description: 'A working Claude account on the Pro plan, with Claude Design open in your browser, ready to start Module 1.',
    lessonsFilename: 'module-0-lessons.md'
  },
  {
    number: 1,
    title: 'Type your idea into Claude, get something back',
    description: 'A working interactive prototype of your idea, built in Claude Design, that you have iterated on enough that it represents what you actually want to build.',
    lessonsFilename: 'module-1-lessons.md'
  }
];

const CANDIDATE_CURRICULUM_DIRS = [
  // Local dev (TypeScript via tsx): apps/api/src/lib/seed.ts -> ../../../../curriculum/
  path.resolve(__dirname, '..', '..', '..', '..', 'curriculum'),
  // Prod container (compiled JS at /app/dist/lib/seed.js): -> ../../curriculum/
  path.resolve(__dirname, '..', '..', 'curriculum'),
];

function findCurriculumDir(): string {
  for (const candidate of CANDIDATE_CURRICULUM_DIRS) {
    if (fs.existsSync(candidate)) return candidate;
  }
  throw new Error(
    `Could not find curriculum directory. Tried:\n  ${CANDIDATE_CURRICULUM_DIRS.join('\n  ')}`
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
  modules: {
    number: number;
    title: string;
    lessons: { number: number; title: string }[];
  }[];
};

export async function runSeed(): Promise<SeedResult> {
  const curriculumDir = findCurriculumDir();
  console.log(`Reading curriculum from ${curriculumDir}`);

  const seededModules: SeedResult['modules'] = [];

  for (const moduleConfig of MODULES) {
    const lessonsPath = path.join(curriculumDir, moduleConfig.lessonsFilename);
    if (!fs.existsSync(lessonsPath)) {
      throw new Error(`Could not find ${moduleConfig.lessonsFilename} at ${lessonsPath}`);
    }

    const markdown = fs.readFileSync(lessonsPath, 'utf-8');
    const lessons = parseLessons(markdown);

    if (lessons.length === 0) {
      throw new Error(`No lessons parsed from ${moduleConfig.lessonsFilename}. Check the file format.`);
    }

    console.log(`Parsed ${lessons.length} lessons from ${moduleConfig.lessonsFilename}.`);

    const result = await prisma.$transaction(async (tx) => {
      const module = await tx.module.upsert({
        where: { number: moduleConfig.number },
        update: { title: moduleConfig.title, description: moduleConfig.description },
        create: {
          number: moduleConfig.number,
          title: moduleConfig.title,
          description: moduleConfig.description
        }
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
        number: module.number,
        title: module.title,
        lessons: upsertedLessons
      };
    });

    seededModules.push(result);
  }

  console.log(`\nSeed complete. Seeded ${seededModules.length} modules.`);
  return { modules: seededModules };
}

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
