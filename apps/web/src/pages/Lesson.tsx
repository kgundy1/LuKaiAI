import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import { fetchModuleLessons, markLessonComplete } from '../lib/api';
import BlockRenderer from '../components/lesson/BlockRenderer';

type Lesson = {
  id: string;
  number: number;
  title: string;
  content: string;
  content_blocks: any[] | null;
  completed: boolean;
};

type Module = {
  id: string;
  number: number;
  title: string;
  description: string;
};

export default function Lesson() {
  const { moduleNumber, lessonNumber } = useParams<{ moduleNumber: string; lessonNumber: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleNumber || !lessonNumber) return;
    setLoading(true);
    fetchModuleLessons(moduleNumber).then(data => {
      if (!data.ok) {
        setError(data.error || 'Failed to load lesson');
        setLoading(false);
        return;
      }
      setModule(data.module);
      setLessons(data.lessons);
      const found = data.lessons.find((l: Lesson) => l.number === Number(lessonNumber));
      if (!found) {
        setError('Lesson not found');
      } else {
        setLesson(found);
      }
      setLoading(false);
    }).catch(() => {
      setError('Failed to load lesson');
      setLoading(false);
    });
  }, [moduleNumber, lessonNumber]);

  async function handleComplete() {
    if (!lesson) return;
    setMarking(true);
    const res = await markLessonComplete(lesson.id);
    if (res.ok) {
      setLesson({ ...lesson, completed: true });
    }
    setMarking(false);
  }

  if (loading) return <div className="p-8 text-lk-text-secondary">Loading lesson...</div>;
  if (error) return <div className="p-8 text-lk-red">{error}</div>;
  if (!module || !lesson) return null;

  const nextLesson = lessons.find(l => l.number === lesson.number + 1) ?? null;
  const isLastLesson = !nextLesson;

  return (
    <div className="min-h-screen bg-void">
      <Helmet>
        <title>{`Lesson ${lesson.number}: ${lesson.title} — LuKaiAI`}</title>
        <meta name="description" content={`Module ${module.number} · ${module.title}`} />
      </Helmet>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-lk-cyan focus:text-void focus:px-4 focus:py-2 focus:rounded-lg focus:font-bold"
      >
        Skip to content
      </a>
      <main id="main" className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/learn" className="text-lk-text-tertiary hover:text-lk-text-secondary text-sm">← Back to modules</Link>
        <article>
        <div className="mt-6 mb-2 text-lk-text-tertiary text-sm">Module {module.number} · {module.title}</div>
        <h1 className="font-serif text-3xl text-lk-text-primary mb-8">Lesson {lesson.number}: {lesson.title}</h1>

        {lesson.content_blocks && lesson.content_blocks.length > 0 ? (
          <BlockRenderer blocks={lesson.content_blocks} lessonId={lesson.id} />
        ) : (
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown>{lesson.content}</ReactMarkdown>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-wrap items-center gap-4">
          {lesson.completed ? (
            <div className="text-lk-green font-medium">✓ Lesson complete</div>
          ) : (
            <button
              onClick={handleComplete}
              disabled={marking}
              className="px-6 py-3 bg-lk-cyan hover:bg-lk-cyan/80 text-black font-medium rounded-lg disabled:opacity-50"
            >
              {marking ? 'Marking...' : 'Mark lesson complete'}
            </button>
          )}
          {nextLesson && (
            <Link
              to={`/learn/module/${module.number}/lesson/${nextLesson.number}`}
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-lk-text-secondary hover:text-lk-text-primary font-medium rounded-lg"
            >
              Next lesson →
            </Link>
          )}
          {isLastLesson && lesson.completed && (
            <Link
              to="/learn"
              className="px-6 py-3 border border-white/20 hover:border-white/40 text-lk-text-secondary hover:text-lk-text-primary font-medium rounded-lg"
            >
              Back to modules →
            </Link>
          )}
        </div>
        </article>
      </main>
    </div>
  );
}
