export interface ScreenshotPayload {
  slotId?: string;
  placeholder?: string;
  caption?: string;
  src?: string;
  alt?: string;
  annotations?: { x: string; y: string; label: string }[];
}

export default function Screenshot({ src, alt, caption, placeholder }: ScreenshotPayload) {
  const hasImage = typeof src === 'string' && src.length > 0;

  return (
    <div className="rounded-2xl border border-white/[0.07] bg-card p-6">
      <p className="font-mono text-xs text-lk-cyan tracking-widest uppercase mb-4">— Screenshot</p>

      {hasImage ? (
        <>
          <img
            src={src}
            alt={alt ?? caption ?? ''}
            className="w-full rounded-lg border border-white/[0.07]"
          />
          {caption && (
            <p className="mt-3 text-sm text-lk-text-tertiary">{caption}</p>
          )}
        </>
      ) : (
        <div className="rounded-xl border-2 border-dashed border-white/20 px-6 py-10 flex flex-col items-center text-center">
          <p className="font-mono text-xs text-lk-text-tertiary tracking-widest uppercase mb-3">
            Screenshot
          </p>
          <p className="text-sm text-lk-text-secondary max-w-prose">
            {caption || placeholder || 'Screenshot placeholder — caption missing'}
          </p>
        </div>
      )}
    </div>
  );
}
