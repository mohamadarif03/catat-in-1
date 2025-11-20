import { useState, useMemo, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuizResult from "./QuizResult";

type Question = {
  id: number;
  pertanyaan: string;
  pilihan: Array<Record<string, string>>;
  jawaban_benar?: string;
};

type Props = {
  // accept array of questions now
  questions?: Question[];
  onAnswer?: (id: number, answer: string) => void;
  onComplete?: () => void; // called when all questions are done
};

export function QuizComp({ questions, onAnswer, onComplete }: Props) {
  // default questions array
  const defaultQuestions: Question[] = [
    {
      id: 1,
      pertanyaan: "1 + 1 =",
      pilihan: [{ A: "1" }, { B: "2" }, { C: "3" }, { D: "4" }],
      jawaban_benar: "B",
    },
    {
      id: 2,
      pertanyaan: "Capital of France?",
      pilihan: [
        { A: "London" },
        { B: "Berlin" },
        { C: "Paris" },
        { D: "Rome" },
      ],
      jawaban_benar: "C",
    },
  ];

  const qs = questions && questions.length > 0 ? questions : defaultQuestions;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const q = qs[currentIndex];

  const options = useMemo(
    () =>
      q.pilihan.map((p) => {
        const key = Object.keys(p)[0];
        return { key, text: p[key] };
      }),
    [q]
  );

  const [value, setValue] = useState<string>("");
  const [answered, setAnswered] = useState<boolean>(false);

  // store selected answers by question id
  const [answersMap, setAnswersMap] = useState<Record<number, string>>({});

  // finished + showResult: showResult toggles when we move from congrats splash -> results
  const [finished, setFinished] = useState<boolean>(false);
  const [showResult, setShowResult] = useState<boolean>(false); // toggles after congrats splash

  // reset when question changes
  useEffect(() => {
    setValue("");
    setAnswered(false);
  }, [currentIndex, q.id]);

  // when finished: show a short congrats splash, then reveal results inline
  useEffect(() => {
    // splash duration in ms
    const splashDuration = 2000;
    let t: ReturnType<typeof setTimeout> | undefined;

    if (!finished) {
      // ensure results are hidden while not finished
      setShowResult(false);
      return;
    }

    // show congrats splash immediately (showResult=false => splash visible)
    setShowResult(false);

    // after splashDuration reveal results
    t = setTimeout(() => {
      setShowResult(true);
    }, splashDuration);

    return () => {
      if (t) clearTimeout(t);
    };
  }, [finished]);

  function handleChange(v: string) {
    if (answered) return; // lock after answering
    setValue(v);
    setAnswered(true);
    setAnswersMap((prev) => ({ ...prev, [q.id]: v }));
    if (onAnswer) onAnswer(q.id, v);
  }

  function handleNext() {
    if (currentIndex < qs.length - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      // finished all questions -> show popup (and call onComplete)
      if (onComplete) onComplete();
      setFinished(true);
    }
  }

  const correctKey = q.jawaban_benar ?? "";

  // progress calculation: count completed questions
  const completed = currentIndex + (answered ? 1 : 0);
  const progressPercent = Math.round((completed / qs.length) * 100);

  // diagonal stripe gradient for filled part
  const stripeBg =
    "repeating-linear-gradient(45deg, #2563eb 0 12px, #60a5fa 12px 24px)"; // blue-600 and blue-400

  // compute how many are correct from answersMap
  const correctCount = useMemo(() => {
    return qs.reduce((acc, ques) => {
      const sel = answersMap[ques.id];
      return (
        acc + (sel && ques.jawaban_benar && sel === ques.jawaban_benar ? 1 : 0)
      );
    }, 0);
  }, [qs, answersMap]);

  return (
    <div className="relative w-full h-full">
      {!finished ? (
        <div className="relative ">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-medium text-muted-foreground">
                Progress
              </div>
              <div className="text-sm font-medium text-muted-foreground">
                {completed} / {qs.length} ({progressPercent}%)
              </div>
            </div>

            <div
              className="w-full h-3 rounded-lg bg-muted border overflow-hidden"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progressPercent}
            >
              <div
                className="h-full transition-all duration-300"
                style={{
                  width: `${progressPercent}%`,
                  backgroundImage: progressPercent > 0 ? stripeBg : undefined,
                  backgroundColor: progressPercent > 0 ? undefined : undefined,
                }}
              />
            </div>
          </div>

          <div className="w-full py-6">
            <h1 className="text-center text-lg font-medium">{q.pertanyaan}</h1>
            <div className="text-sm text-muted-foreground text-center mt-1">
              Question {currentIndex + 1} / {qs.length}
            </div>
          </div>

          <RadioGroup
            value={value}
            onValueChange={handleChange}
            className="w-full space-y-3"
          >
            {options.map((opt) => {
              const id = `q-${q.id}-${opt.key}`;
              const selected = value === opt.key;
              const isCorrect = opt.key === correctKey;
              // determine classes based on answered/selected/correct
              const base =
                "block w-full cursor-pointer rounded-md border px-4 py-4 text-left transition-colors flex items-center justify-between";
              let variant = "border-border hover:bg-muted";
              if (!answered) {
                variant = selected ? "border-primary bg-primary/10" : variant;
              } else {
                if (isCorrect) {
                  // highlight correct answer (primary look)
                  variant =
                    "bg-primary text-primary-foreground border-transparent shadow-sm";
                } else if (selected && !isCorrect) {
                  // selected but wrong -> danger look
                  variant =
                    "border-destructive bg-destructive/10 text-destructive";
                } else {
                  variant =
                    "border-border bg-transparent text-muted-foreground";
                }
              }

              return (
                <div key={opt.key} className="w-full">
                  <RadioGroupItem value={opt.key} id={id} className="sr-only" />
                  <Label htmlFor={id} className={`${base} ${variant}`}>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{opt.key}.</span>
                      <span className="flex-1">{opt.text}</span>
                    </div>
                    {/* feedback icon: show check for correct, X for wrong selected */}
                    <span className="ml-4 text-lg">
                      {answered && isCorrect ? (
                        <span aria-hidden>✓</span>
                      ) : answered && selected && !isCorrect ? (
                        <span aria-hidden>✕</span>
                      ) : null}
                    </span>
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
          <div className="mt-4 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              disabled={!answered}
              className={
                "px-4 py-2 rounded-md text-sm font-medium transition " +
                (answered
                  ? "bg-primary text-primary-foreground hover:opacity-95"
                  : "opacity-50 cursor-not-allowed")
              }
            >
              {currentIndex < qs.length - 1 ? "Next" : "Finish"}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full h-full relative">
          <QuizResult correct={correctCount} total={qs.length} />
          <div
            className={`absolute inset-0 d  flex items-center transition-all duration-200 animate-fadeIn z-0  justify-center ${
              showResult ? "z-0 " : "z-20 bg-background"
            }`}
            aria-live="polite"
          >
            {/* congrats splash */}
            <div
              className={`flex flex-col  items-center gap-4 text-center transition-all duration-900 ease-out transform ${
                showResult
                  ? "opacity-0 -translate-y-4 scale-95 pointer-events-none"
                  : "opacity-100 bg-background translate-y-0 scale-100 pointer-events-auto"
              }`}
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-3xl text-primary">
                ✓
              </div>
              <h2 className="text-lg font-semibold">Congrats!</h2>
              <p className="text-sm text-muted-foreground">
                You finished the quiz. Good job!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
