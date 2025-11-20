import { useCallback, useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type FlashCardData = {
  id?: string | number;
  question: string;
  answer: string;
};

type FlashCardsProps = {
  cards?: FlashCardData[];
  className?: string;
};

/**
 * Single-card slider of flashcards.
 * - Prev / Next controls, dots, keyboard (←/→), and basic swipe.
 * - Each card keeps its flipped state while navigating.
 */
export default function FlaschCard({ cards, className = "" }: FlashCardsProps) {
  const defaultCards: FlashCardData[] = [
    {
      id: 1,
      question: "What is React?",
      answer: "A JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      question: "What is a hook?",
      answer:
        "A function that lets you tap into React features (useState, useEffect...).",
    },
    {
      id: 3,
      question: "What is JSX?",
      answer:
        "A syntax extension that looks like HTML for describing UI in React.",
    },
    {
      id: 4,
      question: "What is a component?",
      answer: "A reusable piece of UI, either a function or class in React.",
    },
  ];

  const list = cards && cards.length > 0 ? cards : defaultCards;
  const len = list.length;

  const [index, setIndex] = useState(0);
  // store flipped state per card id/index
  const [flippedMap, setFlippedMap] = useState<
    Record<string | number, boolean>
  >({});

  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    // reset flip on mount or when index changes optionally keep flip -> we keep it persisted
  }, [index]);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + len) % len);
  }, [len]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % len);
  }, [len]);

  const goTo = useCallback(
    (i: number) => {
      setIndex(i % len);
    },
    [len]
  );

  const toggleFlip = useCallback((key: string | number) => {
    setFlippedMap((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next]);

  // basic swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  const current = list[index];
  const currentKey = current.id ?? index;
  const flipped = Boolean(flippedMap[currentKey]);

  return (
    <div className={`w-full flex items-center justify-center p-6 ${className}`}>
      <div className="max-w-[900px] w-full">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={prev}
            aria-label="Previous"
          >
            <ChevronLeft />
          </Button>

          <div
            ref={containerRef}
            className="relative flex-1"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {/* visible card area */}
            <div
              className="relative mx-auto"
              style={{ width: "min(90vw, 720px)", height: "min(60vh, 420px)" }}
            >
              <div
                // simple fade/scale transition between cards
                className="absolute inset-0 transition-all duration-400 ease-out"
                key={currentKey}
              >
                <FlashCardItem
                  question={current.question}
                  answer={current.answer}
                  flipped={flipped}
                  onToggle={() => toggleFlip(currentKey)}
                />
              </div>
            </div>

            {/* dots */}
            <div className="flex justify-center gap-2 mt-4">
              {list.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Go to card ${i + 1}`}
                  onClick={() => goTo(i)}
                  className={`h-2 w-8 rounded-full transition-all ${
                    i === index ? "bg-primary" : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>
          </div>

          <Button variant="ghost" size="icon" onClick={next} aria-label="Next">
            <ChevronRight />
          </Button>
        </div>

        {/* controls row: index / total */}
        <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
          <div>
            Card {index + 1} / {len}
          </div>
        </div>
      </div>

      {/* minimal CSS for backface and 3D preserved from before */}
      <style>{`
        .backface-hidden {
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
}

function FlashCardItem({
  question,
  answer,
  flipped,
  onToggle,
}: {
  question: string;
  answer: string;
  flipped: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="relative h-full"
      style={{ perspective: 1200 }}
      role="group"
      aria-label="Flashcard"
    >
      <div
        className={`relative w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
        tabIndex={0}
      >
        {/* front */}
        <Card
          className="absolute inset-0 w-full h-full backface-hidden flex flex-col overflow-hidden"
          data-side="front"
        >
          <CardHeader>
            <CardTitle className="text-2xl">Flashcard</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="text-sm text-muted-foreground mb-2">Question</div>
            <div className="text-lg md:text-2xl font-semibold">{question}</div>
          </CardContent>
          <div className="p-4 flex justify-end">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              Show Answer
            </Button>
          </div>
        </Card>

        {/* back */}
        <Card
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 flex flex-col overflow-hidden"
          data-side="back"
        >
          <CardHeader>
            <CardTitle className="text-2xl">Answer</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="text-lg md:text-2xl font-semibold">{answer}</div>
          </CardContent>
          <div className="p-4 flex justify-end">
            <Button
              size="sm"
              variant="outline"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              Flip Back
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
