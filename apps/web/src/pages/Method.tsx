import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Nav from '../components/Nav';
import Footer from '../components/Footer';

type Case = {
  tag: string;
  label: string;
  start?: boolean;
  why: string;
  fixLbl: string;
  fixTxt: string;
  guess: string;
  cap: string;
  res: string;
  learned: string;
};

const cases: Case[] = [
  {
    tag: 'Getting started',
    label: "I don't even know where to start.",
    start: true,
    why: "A blank page makes it feel like you need a plan first. You don't. Trying to map out every feature before you start is just guessing at what you'll end up wanting.",
    fixLbl: 'Capture: your idea, in one sentence',
    fixTxt: 'Type what you want the way you\u2019d say it out loud to a friend \u2014 not a spec, not a feature list. One sentence. Then Claude asks you a few questions; when you don\u2019t know an answer, hit the \u201cDecide for me\u201d button.',
    guess: '(stare at the blank box, trying to plan the whole thing first)',
    cap: '\u201cI want a tool that helps me keep track of my rental property repairs.\u201d',
    res: 'In under a minute you\u2019re looking at a working first version \u2014 something real to react to instead of a blank page.',
    learned: "You don't start with a plan. You start with a sentence, and react to what comes back.",
  },
  {
    tag: 'Symptom 01',
    label: 'It built something — but not what I pictured.',
    why: 'You described it in words, so Claude filled the gaps with its best guess \u2014 close, but not your actual thing.',
    fixLbl: 'Capture: upload the real thing',
    fixTxt: "Instead of describing it, hand Claude the real thing \u2014 the actual form, the real rule document, a true example of the data. Don't paraphrase it. Drop the file straight into the chat.",
    guess: '\u201cno, the form should have more fields, and the dates work differently\u2026\u201d',
    cap: '[drag in a photo or PDF of the actual form] \u201cbuild it to match this\u201d',
    res: 'It rebuilds to match your real thing exactly \u2014 the fields, the labels, the order, all of it.',
    learned: 'If you\u2019re describing in words something that already exists, stop \u2014 and upload it instead.',
  },
  {
    tag: 'Symptom 02',
    label: 'I hit an error. Red text. Something broke.',
    why: 'Claude can\u2019t see your screen. \u201cIt\u2019s broken\u201d leaves it guessing at what went wrong \u2014 the same as you.',
    fixLbl: "Capture: screenshot what's wrong",
    fixTxt: 'Screenshot the error, drag it into the chat, and type one sentence about what\u2019s wrong. You don\u2019t need to describe the position, the size, the colors \u2014 Claude can see the picture.',
    guess: '\u201cit\u2019s broken, help me\u201d',
    cap: '[screenshot of the error] \u201cthis is what I\u2019m seeing \u2014 what\u2019s wrong?\u201d',
    res: 'Claude reads the real error and walks you through the fix, step by step.',
    learned: 'You don\u2019t have to understand the error. You just have to capture it.',
  },
  {
    tag: 'Symptom 03',
    label: "It keeps drifting back to wrong — I've fixed it 3 times.",
    why: 'You keep correcting it in words, so it keeps half-guessing and drifting back to wrong. A description isn\u2019t enough for the thing that already exists in your head.',
    fixLbl: 'Capture: show the real source of truth',
    fixTxt: 'Stop re-typing the correction. If a rule or detail keeps coming out wrong, upload the real document that defines it \u2014 or screenshot the exact part that\u2019s off and point right at it.',
    guess: '\u201cno\u2026 still not right\u201d (for the fourth time)',
    cap: '[the real policy doc] \u201cuse this as the rule\u201d \u2014 or \u2014 [screenshot] \u201cthis card is overlapping this one\u201d',
    res: 'It stops drifting, because now it has the real thing instead of your description of it.',
    learned: 'Correcting in words is still guessing. Showing the real thing is capturing.',
  },
];

export default function Method() {
  const [sel, setSel] = useState<number | null>(null);
  const c = sel !== null ? cases[sel] : null;

  return (
    <>
      <Helmet>
        <title>The Method — Capture, don&apos;t guess | LuKaiAI</title>
        <meta
          name="description"
          content="The one move that gets you past any wall when building with AI. Pick what's happening and see the fix: capture, don't guess."
        />
      </Helmet>
      <Nav />
      <main className="px-12 max-[960px]:px-6 pt-[120px] pb-[100px]">
        <div className="max-w-[780px] mx-auto">
          {/* Header */}
          <div className="text-center max-w-[600px] mx-auto mb-9">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-lk-cyan">
              The method, in action
            </div>
            <h1 className="font-serif text-[clamp(30px,4.4vw,46px)] font-normal text-lk-text-primary leading-[1.12] tracking-[-0.02em] mt-3 mb-3">
              Stuck building with AI? Diagnose it.
            </h1>
            <p className="text-[16px] text-lk-text-secondary font-light">
              Whether you&apos;re staring at a blank page or stuck mid-build, there&apos;s one move
              that gets you past it. Pick what&apos;s happening to you:
            </p>
          </div>

          {/* Symptom grid */}
          <div className="font-mono text-[12px] tracking-[0.12em] uppercase text-lk-text-tertiary text-center mb-3">
            — Where are you? —
          </div>
          <div className="grid grid-cols-2 max-[680px]:grid-cols-1 gap-3">
            {cases.map((cs, i) => {
              const active = sel === i;
              const gold = cs.start;
              return (
                <button
                  key={i}
                  onClick={() => setSel(i)}
                  className={[
                    'text-left rounded-[13px] p-[18px] cursor-pointer transition-all duration-150 border bg-card text-[15px] leading-[1.4]',
                    active
                      ? gold
                        ? 'border-lk-gold bg-[rgba(201,168,76,0.07)] text-lk-text-primary'
                        : 'border-lk-cyan bg-[rgba(0,200,240,0.07)] text-lk-text-primary'
                      : gold
                        ? 'border-[rgba(201,168,76,0.3)] text-lk-text-secondary hover:border-[rgba(201,168,76,0.55)] hover:-translate-y-0.5'
                        : 'border-[rgba(255,255,255,0.09)] text-lk-text-secondary hover:border-[rgba(0,200,240,0.45)] hover:-translate-y-0.5',
                  ].join(' ')}
                >
                  <span
                    className={`block font-mono text-[10px] tracking-[0.1em] uppercase mb-2 ${gold ? 'text-lk-gold' : 'text-lk-text-dim'}`}
                  >
                    {cs.tag}
                  </span>
                  {cs.label}
                </button>
              );
            })}
          </div>

          {/* Panel */}
          <div className="mt-[18px] bg-card border border-[rgba(255,255,255,0.08)] rounded-[16px] p-[30px] min-h-[240px]">
            {!c ? (
              <div className="flex items-center justify-center min-h-[180px] text-lk-text-tertiary text-[15px] text-center">
                ↑ Pick where you are to see the fix.
              </div>
            ) : (
              <>
                <div className="flex gap-[13px] items-start mb-5">
                  <div className="flex-none w-[30px] h-[30px] rounded-[8px] flex items-center justify-center font-mono text-[13px] font-semibold mt-0.5 bg-[rgba(248,113,113,0.12)] text-[#f87171]">
                    ?
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-lk-text-tertiary mb-1">
                      Why it&apos;s happening
                    </div>
                    <div className="text-[14.5px] text-lk-text-secondary leading-[1.55]">{c.why}</div>
                  </div>
                </div>

                <div className="flex gap-[13px] items-start mb-5">
                  <div className="flex-none w-[30px] h-[30px] rounded-[8px] flex items-center justify-center font-mono text-[13px] font-semibold mt-0.5 bg-[rgba(0,200,240,0.12)] text-lk-cyan">
                    ✓
                  </div>
                  <div className="flex-1">
                    <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-lk-text-tertiary mb-1">
                      {c.fixLbl}
                    </div>
                    <div className="text-[15px] text-lk-text-primary leading-[1.55]">{c.fixTxt}</div>
                    <div className="mt-[11px] grid grid-cols-2 max-[680px]:grid-cols-1 gap-[10px]">
                      <div className="rounded-[9px] px-[13px] py-[11px] text-[13px] leading-[1.45] font-mono bg-[rgba(248,113,113,0.07)] border border-[rgba(248,113,113,0.25)] text-lk-text-secondary">
                        <span className="block font-mono text-[9.5px] tracking-[0.1em] uppercase mb-1.5 text-[#f87171]">
                          Guess ✕
                        </span>
                        {c.guess}
                      </div>
                      <div className="rounded-[9px] px-[13px] py-[11px] text-[13px] leading-[1.45] font-mono bg-[rgba(0,200,240,0.07)] border border-[rgba(0,200,240,0.3)] text-lk-text-primary">
                        <span className="block font-mono text-[9.5px] tracking-[0.1em] uppercase mb-1.5 text-lk-cyan">
                          Capture ✓
                        </span>
                        {c.cap}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-[13px] items-start">
                  <div className="flex-none w-[30px] h-[30px] rounded-[8px] flex items-center justify-center font-mono text-[13px] font-semibold mt-0.5 bg-[rgba(52,211,153,0.12)] text-lk-green">
                    →
                  </div>
                  <div>
                    <div className="font-mono text-[10.5px] tracking-[0.12em] uppercase text-lk-text-tertiary mb-1">
                      What happens next
                    </div>
                    <div className="text-[15px] text-lk-text-primary leading-[1.55]">{c.res}</div>
                  </div>
                </div>

                <div className="mt-[18px] pt-4 border-t border-[rgba(255,255,255,0.07)] font-serif italic text-[17px] text-lk-text-primary">
                  {c.learned}
                </div>
              </>
            )}
          </div>

          {/* Outcome + CTA */}
          <div className="mt-[18px] rounded-[16px] border border-[rgba(52,211,153,0.28)] p-[26px] text-center bg-[linear-gradient(180deg,rgba(52,211,153,0.07),rgba(139,92,246,0.04))]">
            <div className="font-mono text-[11px] tracking-[0.2em] uppercase text-lk-green">
              What&apos;s in it for you
            </div>
            <p className="text-[15.5px] text-lk-text-secondary max-w-[560px] mx-auto mt-2 leading-[1.6]">
              Notice the pattern: from the blank page to every wall after it,{' '}
              <strong className="text-lk-text-primary font-semibold">the fix is the same move</strong>{' '}
              — capture, don&apos;t guess. Learn that one habit and nothing stops you for long. You
              end up with a real, working thing you actually use, and the skill to build the next one
              on your own.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-lk-cyan text-void px-[26px] py-[13px] rounded-[9px] text-[15px] font-bold no-underline tracking-[0.01em] mt-5 transition-all duration-200 hover:bg-[#22d3f0] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(0,200,240,0.28)]"
            >
              Learn it for real — free →
            </Link>
            <div className="font-mono text-[11px] text-lk-text-dim mt-3 tracking-[0.05em]">
              No course fees · you bring your own Claude subscription
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
