import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchModules } from '../lib/api';
import PageShell from '../components/PageShell';

type ApiModule = {
  number: number;
  title: string;
  description: string;
};

const MODULE_NUMBERS = [0, 1, 2, 3, 4, 5, 6];

export default function Learn() {
  const [apiModules, setApiModules] = useState<ApiModule[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModules()
      .then((data) => {
        if (data.ok) {
          setApiModules(data.modules);
        } else {
          setError(data.error || 'Failed to load modules');
        }
      })
      .catch(() => {
        setError('Failed to load modules');
      });
  }, []);

  return (
    <PageShell brandTexture mainClassName="pt-24 px-6 pb-20 max-w-4xl mx-auto">
      <Helmet>
        <title>The workflow — LuKaiAI</title>
        <meta name="description" content="Seven modules. Each builds on the last. Build at your pace." />
      </Helmet>

      <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— The workflow</p>
      <h1 className="font-serif text-5xl text-lk-text-primary mb-4">Welcome to LuKai<span className="text-lk-cyan font-mono text-xl align-super">AI</span></h1>
      <p className="text-lk-text-secondary text-lg mb-16 max-w-2xl">Seven modules. Each builds on the last. Build at your pace.</p>

      {error && (
        <p className="text-red-400 text-sm mb-8">{error}</p>
      )}

      <ul role="list" className="space-y-4 list-none p-0">
        {MODULE_NUMBERS.map((num) => {
          const apiData = apiModules?.find((m) => m.number === num);
          const available = !!apiData;
          const title = apiData?.title || 'Coming soon';
          const description = apiData?.description || '';

          const cardContent = (
            <article className={`border rounded-2xl p-6 transition ${
              available
                ? 'border-lk-cyan/20 bg-card hover:border-lk-cyan/40 cursor-pointer'
                : 'border-white/[0.07] bg-card/30 opacity-60'
            }`}>
              <div className="flex items-start gap-6">
                <div className={`font-mono text-xs tracking-widest pt-1 ${available ? 'text-lk-cyan' : 'text-lk-text-dim'}`}>
                  MODULE {String(num).padStart(2, '0')}
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-2xl text-lk-text-primary mb-2">{title}</h3>
                  {description && <p className="text-lk-text-tertiary text-sm">{description}</p>}
                </div>
                <div className="text-xs font-mono pt-1">
                  {available ? (
                    <span className="text-lk-cyan">START →</span>
                  ) : (
                    <span className="text-lk-text-dim">COMING SOON</span>
                  )}
                </div>
              </div>
            </article>
          );

          return (
            <li key={num}>
              {available ? (
                <Link to={`/learn/module/${num}/lesson/1`} className="block">
                  {cardContent}
                </Link>
              ) : (
                cardContent
              )}
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}
