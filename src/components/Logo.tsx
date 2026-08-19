/** Logo oficial da marca Creative Hair. */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/creative-hair-logo.png"
      alt="Creative Hair — extensões de cabelo"
      width={1291}
      height={1130}
      className={`w-auto object-contain mix-blend-multiply ${className}`}
    />
  );
}