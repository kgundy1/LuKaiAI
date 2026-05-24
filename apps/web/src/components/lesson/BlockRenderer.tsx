import ReactMarkdown from 'react-markdown';
import QuickCheck, { type QuickCheckPayload } from './widgets/QuickCheck';
import WorkflowSorter, { type WorkflowSorterPayload } from './widgets/WorkflowSorter';
import PromptCompare from './widgets/PromptCompare';
import TryWithClaude, { type TryWithClaudePayload } from './widgets/TryWithClaude';
import DecisionTree from './widgets/DecisionTree';

type ContentBlock =
  | { type: 'markdown';       payload: { md: string } }
  | { type: 'quick_check';    payload: QuickCheckPayload }
  | { type: 'workflow_sorter'; payload: WorkflowSorterPayload }
  | { type: 'prompt_compare'; payload: Record<string, never> }
  | { type: 'try_with_claude'; payload: TryWithClaudePayload }
  | { type: 'decision_tree';  payload: Record<string, never> };

interface Props {
  blocks: ContentBlock[];
}

export default function BlockRenderer({ blocks }: Props) {
  return (
    <div>
      {blocks.map((block, i) => {
        if (block.type === 'markdown') {
          return (
            <article key={i} className="prose prose-invert max-w-none">
              <ReactMarkdown>{block.payload.md}</ReactMarkdown>
            </article>
          );
        }

        return (
          <div key={i} className="my-8">
            {(() => {
              switch (block.type) {
                case 'quick_check':
                  return <QuickCheck {...block.payload} />;
                case 'workflow_sorter':
                  return <WorkflowSorter {...block.payload} />;
                case 'prompt_compare':
                  return <PromptCompare />;
                case 'try_with_claude':
                  return <TryWithClaude {...block.payload} />;
                case 'decision_tree':
                  return <DecisionTree />;
                default: {
                  const exhaustive = block as { type: string };
                  return (
                    <p className="text-sm italic text-lk-text-dim">
                      Unknown block type: {exhaustive.type}
                    </p>
                  );
                }
              }
            })()}
          </div>
        );
      })}
    </div>
  );
}
