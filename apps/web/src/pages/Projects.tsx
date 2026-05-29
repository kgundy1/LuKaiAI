import { useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useAuth } from '../lib/AuthContext';
import { fetchProjects, submitProject, Project } from '../lib/api';

const INPUT_CLASS =
  'w-full px-4 py-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-lg text-lk-text-primary placeholder:text-lk-text-dim focus:outline-none focus:border-lk-cyan transition-colors';

function ProjectCard({ project }: { project: Project }) {
  const hasModule =
    project.moduleCompleted !== null && project.moduleCompleted !== undefined;
  return (
    <article className="p-6 border border-[rgba(255,255,255,0.07)] rounded-xl bg-[rgba(255,255,255,0.02)] hover:border-lk-cyan/30 transition-colors">
      <h3 className="font-serif text-xl text-lk-text-primary mb-2">
        {project.projectName}
      </h3>
      <p className="text-lk-text-secondary leading-relaxed mb-4">
        {project.projectDescription}
      </p>
      <div className="flex items-center justify-between text-sm">
        <span className="text-lk-text-tertiary">
          by {project.builderDisplayName}
          {hasModule && <> · Module {project.moduleCompleted}</>}
        </span>
        <a
          href={project.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lk-cyan hover:text-lk-cyan/80"
        >
          Visit →
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  const [projectName, setProjectName] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [builderDisplayName, setBuilderDisplayName] = useState('');
  const [moduleCompleted, setModuleCompleted] = useState('');
  const [isProjectPublic, setIsProjectPublic] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchProjects()
      .then(setProjects)
      .catch(() => setProjects([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const name = projectName.trim();
    const url = projectUrl.trim();
    const description = projectDescription.trim();

    if (!name) {
      setError('Project name is required.');
      return;
    }
    if (!url) {
      setError('Project URL is required.');
      return;
    }
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('Project URL must start with http:// or https://.');
      return;
    }
    if (!description) {
      setError('Description is required.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const moduleNum =
        moduleCompleted === '' ? undefined : Number(moduleCompleted);
      const displayName = builderDisplayName.trim();
      await submitProject({
        projectName: name,
        projectUrl: url,
        projectDescription: description,
        builderDisplayName: displayName.length > 0 ? displayName : undefined,
        moduleCompleted: moduleNum,
        isProjectPublic,
      });
      setSuccess(true);
      const refreshed = await fetchProjects();
      setProjects(refreshed);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Project submit failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Helmet>
        <title>Built with LuKaiAI — Projects shipped by learners</title>
        <meta
          name="description"
          content="Projects shipped by people using the LuKaiAI workflow. See what's possible."
        />
      </Helmet>
      <Nav />
      <main id="main" className="min-h-screen bg-void">
        <div className="max-w-[1060px] mx-auto pt-32 pb-20 px-6">
          <h1 className="font-serif text-4xl text-lk-text-primary mb-3">
            Built with LuKaiAI
          </h1>
          <p className="text-lk-text-secondary text-lg max-w-[640px] mb-12 leading-relaxed">
            Projects shipped by people using the LuKaiAI workflow.
          </p>

          {!user && (
            <div className="mb-16 pb-12 border-b border-[rgba(255,255,255,0.07)]">
              <p className="text-lk-text-tertiary">
                Built something with LuKaiAI?{' '}
                <Link
                  to="/login"
                  className="text-lk-cyan hover:text-lk-cyan/80"
                >
                  Log in to add it to the showcase.
                </Link>
              </p>
            </div>
          )}

          {user && !formOpen && (
            <div className="mb-16 pb-12 border-b border-[rgba(255,255,255,0.07)]">
              <button
                onClick={() => setFormOpen(true)}
                className="text-lk-cyan hover:text-lk-cyan/80 font-medium"
              >
                + Add your project
              </button>
            </div>
          )}

          {user && formOpen && (
            <div className="mb-16 pb-12 border-b border-[rgba(255,255,255,0.07)]">
              <h2 className="font-serif text-2xl text-lk-text-primary mb-6">
                Add your project
              </h2>

              <form onSubmit={handleSubmit} className="max-w-[520px]">
                <label
                  htmlFor="projectName"
                  className="block text-sm text-lk-text-secondary mb-2"
                >
                  Project name
                </label>
                <input
                  id="projectName"
                  type="text"
                  required
                  maxLength={50}
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  placeholder="e.g. PropertyTrack"
                  className={INPUT_CLASS}
                />

                <label
                  htmlFor="projectUrl"
                  className="block text-sm text-lk-text-secondary mb-2 mt-5"
                >
                  Project URL
                </label>
                <input
                  id="projectUrl"
                  type="url"
                  required
                  maxLength={500}
                  value={projectUrl}
                  onChange={(e) => setProjectUrl(e.target.value)}
                  placeholder="https://"
                  className={INPUT_CLASS}
                />

                <label
                  htmlFor="projectDescription"
                  className="block text-sm text-lk-text-secondary mb-2 mt-5"
                >
                  What does it do?
                </label>
                <textarea
                  id="projectDescription"
                  required
                  maxLength={500}
                  rows={3}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="One or two sentences. Who it's for, what it solves."
                  className={`${INPUT_CLASS} resize-none`}
                />

                <label
                  htmlFor="builderDisplayName"
                  className="block text-sm text-lk-text-secondary mb-2 mt-5"
                >
                  Display name{' '}
                  <span className="text-lk-text-dim">(optional)</span>
                </label>
                <input
                  id="builderDisplayName"
                  type="text"
                  maxLength={80}
                  value={builderDisplayName}
                  onChange={(e) => setBuilderDisplayName(e.target.value)}
                  placeholder="How should we credit you? Defaults to the part of your email before the @."
                  className={INPUT_CLASS}
                />

                <label
                  htmlFor="moduleCompleted"
                  className="block text-sm text-lk-text-secondary mb-2 mt-5"
                >
                  Module you were on when you shipped{' '}
                  <span className="text-lk-text-dim">(optional)</span>
                </label>
                <select
                  id="moduleCompleted"
                  value={moduleCompleted}
                  onChange={(e) => setModuleCompleted(e.target.value)}
                  className={`${INPUT_CLASS} appearance-none`}
                >
                  <option value="">Skip</option>
                  <option value="0">Module 0</option>
                  <option value="1">Module 1</option>
                  <option value="2">Module 2</option>
                  <option value="3">Module 3</option>
                  <option value="4">Module 4</option>
                  <option value="5">Module 5</option>
                  <option value="6">Module 6</option>
                </select>

                <label className="flex items-center gap-3 mt-6 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isProjectPublic}
                    onChange={(e) => setIsProjectPublic(e.target.checked)}
                    className="w-4 h-4 accent-lk-cyan"
                  />
                  <span className="text-sm text-lk-text-secondary">
                    Show on the public showcase
                  </span>
                </label>
                <p className="text-xs text-lk-text-dim mt-2 ml-7">
                  If unchecked, your project is saved but not displayed publicly.
                </p>

                <div className="flex gap-3 mt-8">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-lk-cyan text-void font-medium rounded-lg hover:bg-lk-cyan/90 disabled:opacity-50 transition-colors"
                  >
                    {submitting ? 'Saving…' : 'Save project'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="px-6 py-3 text-lk-text-tertiary hover:text-lk-text-primary transition-colors"
                  >
                    Cancel
                  </button>
                </div>

                {error && (
                  <p role="alert" className="text-lk-red text-sm mt-4">
                    {error}
                  </p>
                )}
                {success && (
                  <p role="status" className="text-lk-green text-sm mt-4">
                    Project saved.
                  </p>
                )}
              </form>

              <p className="text-xs text-lk-text-dim mt-4">
                Your project will be visible at lukaiai.com/projects. You can
                update it anytime by submitting again.
              </p>
            </div>
          )}

          {loading ? (
            <p className="text-lk-text-tertiary">Loading projects…</p>
          ) : projects.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-serif text-2xl text-lk-text-primary mb-3">
                The showcase is starting empty.
              </p>
              <p className="text-lk-text-tertiary max-w-[480px] mx-auto">
                This is where projects built with LuKaiAI will live. Check back
                as the list fills in.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((p, i) => (
                <ProjectCard key={i} project={p} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
