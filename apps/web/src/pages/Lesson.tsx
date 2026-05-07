import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { fetchModuleLessons, markLessonComplete } from '../lib/api';

type Lesson = {
  id: string;
  number: number;
  title: string;
  content: string;
  completed: boolean;
};

type Module = {
  id: string;
  number: number;
  title: string;
  description: string;
};

export default function Lesson() {
  const { moduleId, lessonId } = useParams<{ moduleId: string; lessonId: string }>();
  const [module, setModule] = useState<Module | null>(null);
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!moduleId || !lessonId) return;
    setLoading(true);
    fetchModuleLessons(moduleId).then(data => {
      if (!data.ok) {
        setError(data.error || 'Failed to load lesson');
        setLoading(false);
        return;
      }
      setModule(data.module);
      const found = data.lessons.find((l: Lesson) => l.id === lessonId);
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
  }, [moduleId, lessonId]);

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

  return (
    <div className="min-h-screen bg-void">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Link to="/learn" className="text-lk-text-tertiary hover:text-lk-text-secondary text-sm">← Back to modules</Link>
        <div className="mt-6 mb-2 text-lk-text-tertiary text-sm">Module {module.number} · {module.title}</div>
        <h1 className="text-3xl font-bold text-lk-text-primary mb-8">Lesson {lesson.number}: {lesson.title}</h1>

        <article className="prose prose-invert max-w-none">
          <ReactMarkdown>{lesson.content}</ReactMarkdown>
        </article>

        <div className="mt-12 pt-8 border-t border-white/10">
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
        </div>
      </div>
    </div>
  );
}
