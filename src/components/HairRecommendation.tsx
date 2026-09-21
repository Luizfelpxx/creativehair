import { useState, type FormEvent } from "react";
import { Sparkles } from "lucide-react";
import { useServerFn } from "@tanstack/react-start";
import { Button } from "@/components/ui/button";
import { recommendHair } from "@/lib/hair-recommendation.functions";

const lengths = ["45cm", "55cm", "60cm", "65cm", "70cm", "75cm"] as const;
const weights = ["100g", "500g"] as const;
const colors = [
  "Preto Natural",
  "Castanho Escuro",
  "Moreno Iluminado",
  "Moreno Caramelo",
  "Loiro Iluminado",
] as const;
const goals = [
  "Alongamento discreto",
  "Mais volume",
  "Transformação completa",
  "Cobertura no topo",
] as const;

type Recommendation = Awaited<ReturnType<typeof recommendHair>>;

export function HairRecommendation() {
  const getRecommendation = useServerFn(recommendHair);
  const [length, setLength] = useState("");
  const [weight, setWeight] = useState("");
  const [color, setColor] = useState("");
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState<Recommendation | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!length || !weight || !color || !goal) {
      setError("Preencha as quatro opções para receber sua recomendação.");
      return;
    }

    setError("");
    setResult(null);
    setIsLoading(true);
    try {
      const recommendation = await getRecommendation({
        data: {
          length: length as (typeof lengths)[number],
          weight: weight as (typeof weights)[number],
          color: color as (typeof colors)[number],
          goal: goal as (typeof goals)[number],
        },
      });
      setResult(recommendation);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Não foi possível concluir a recomendação agora.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section aria-labelledby="consultoria-title" className="border-y border-border bg-sky/20 px-6 py-16 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
          <div>
            <span className="mb-4 inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
              <Sparkles className="size-4" aria-hidden="true" /> Consultoria inteligente
            </span>
            <h2 id="consultoria-title" className="max-w-md font-serif text-3xl leading-tight lg:text-5xl">
              Encontre o cabelo ideal para o seu objetivo.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-foreground/65">
              Informe suas preferências e receba uma sugestão entre os modelos disponíveis na Creative Hair.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="border border-border bg-background p-5 sm:p-8" noValidate>
            <div className="grid gap-5 sm:grid-cols-2">
              <RecommendationSelect label="Comprimento" value={length} onChange={setLength} options={lengths} />
              <RecommendationSelect label="Gramatura" value={weight} onChange={setWeight} options={weights} />
              <RecommendationSelect label="Cor" value={color} onChange={setColor} options={colors} />
              <RecommendationSelect label="Objetivo de uso" value={goal} onChange={setGoal} options={goals} />
            </div>
            <Button type="submit" className="mt-6 h-12 w-full rounded-none uppercase tracking-widest" disabled={isLoading}>
              <Sparkles aria-hidden="true" /> {isLoading ? "Analisando escolhas..." : "Receber recomendação"}
            </Button>

            <div aria-live="polite">
              {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
              {result && (
                <div className="mt-6 border-l-2 border-accent bg-blush/25 p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-accent">Sua recomendação</p>
                  <h3 className="mt-2 font-serif text-2xl">{result.productName}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{result.reason}</p>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/55"><strong>Dica:</strong> {result.tip}</p>
                  <a href={`#produto-${result.productId}`} className="mt-4 inline-block text-xs font-semibold uppercase tracking-widest text-foreground underline decoration-accent underline-offset-4">
                    Ver produto recomendado
                  </a>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function RecommendationSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
}) {
  const id = `recommendation-${label.toLowerCase().replaceAll(" ", "-")}`;
  return (
    <label htmlFor={id} className="block">
      <span className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-foreground/65">{label}</span>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-11 w-full border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        required
      >
        <option value="">Selecionar</option>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </label>
  );
}