import logo from "@/assets/creative-hair-logo.jpg.asset.json";

/** Logo oficial da marca Creative Hair. */
export function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <img
      src={logo.url}
      alt="Creative Hair — extensões de cabelo"
      width={1291}
      height={1130}
      className={`w-auto object-contain ${variant === "dark" ? "mix-blend-screen invert" : "mix-blend-multiply"} ${className}`}
    />
  );
}
