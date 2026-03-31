interface SkeletonLoaderProps {
  lines?: number;
}

const lineWidths = ['w-full', 'w-5/6', 'w-4/5', 'w-3/4', 'w-11/12', 'w-2/3', 'w-full', 'w-4/6'];

export function SkeletonLoader({ lines = 4 }: SkeletonLoaderProps) {
  return (
    <div className="animate-pulse flex flex-col gap-3 p-4">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className={`h-4 bg-zinc-200 rounded ${lineWidths[i % lineWidths.length]}`}
        />
      ))}
    </div>
  );
}
