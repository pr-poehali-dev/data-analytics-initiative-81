import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const PRICE_PER_PHOTO = 7;

const CalculatorSection = () => {
  const [count, setCount] = useState(100);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const total = count * PRICE_PER_PHOTO;
  const progress = ((count - 1) / 999) * 100;

  const handleSlider = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCount(Number(e.target.value));
    e.target.style.setProperty("--progress", `${((Number(e.target.value) - 1) / 999) * 100}%`);
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const discountLabel = count >= 500
    ? "Скидка 10% применена"
    : count >= 200
    ? "Скидка 5% применена"
    : null;

  const finalTotal = count >= 500
    ? Math.round(total * 0.9)
    : count >= 200
    ? Math.round(total * 0.95)
    : total;

  return (
    <section ref={ref} id="calculator" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,255,102,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Калькулятор</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            Deep Background Removal
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Профессиональное удаление фона с ручной доработкой. <span className="text-neon">{PRICE_PER_PHOTO} ₽ за фото</span>
          </p>
        </div>

        <div className={`max-w-2xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-zinc-900/60 backdrop-blur-sm border border-white/8 rounded-3xl p-8 md:p-10">
            <div className="flex items-center justify-between mb-3">
              <label className="text-zinc-300 font-medium">Количество фотографий</label>
              <div className="bg-neon/10 border border-neon/30 rounded-xl px-4 py-2">
                <span className="text-neon font-black text-2xl">{count}</span>
                <span className="text-neon/60 text-sm ml-1">фото</span>
              </div>
            </div>

            <div className="relative mb-8">
              <input
                type="range"
                min={1}
                max={1000}
                value={count}
                onChange={handleSlider}
                className="neon-slider w-full"
                style={{ ["--progress" as string]: `${progress}%` }}
              />
              <div className="flex justify-between text-zinc-600 text-xs mt-2">
                <span>1</span>
                <span>250</span>
                <span>500</span>
                <span>750</span>
                <span>1000</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[50, 200, 500].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCount(preset)}
                  className={`rounded-xl py-3 text-sm font-semibold border transition-all ${
                    count === preset
                      ? "bg-neon/10 border-neon/40 text-neon"
                      : "bg-white/5 border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {preset} фото
                </button>
              ))}
            </div>

            <div className="border-t border-white/8 pt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-zinc-400">Стоимость без скидки</span>
                <span className={`text-zinc-400 ${discountLabel ? "line-through" : ""}`}>{total.toLocaleString("ru")} ₽</span>
              </div>
              {discountLabel && (
                <div className="flex items-center justify-between mb-2">
                  <span className="text-neon text-sm flex items-center gap-1">
                    <Icon name="Tag" size={14} /> {discountLabel}
                  </span>
                  <span className="text-neon text-sm">−{(total - finalTotal).toLocaleString("ru")} ₽</span>
                </div>
              )}
              <div className="flex items-center justify-between mt-4">
                <span className="text-white font-bold text-xl">Итого</span>
                <span className="text-4xl font-black text-neon text-glow-neon">
                  {finalTotal.toLocaleString("ru")} ₽
                </span>
              </div>
              {count >= 200 && (
                <p className="text-zinc-500 text-xs mt-2">
                  {count >= 500 ? "Скидка 10% при заказе от 500 фото" : "Скидка 5% при заказе от 200 фото"}
                </p>
              )}
            </div>

            <Button
              onClick={() => scrollTo("contact")}
              className="w-full mt-6 bg-neon text-black hover:bg-green-400 font-bold text-base py-6 rounded-xl glow-neon transition-all hover:scale-[1.02]"
            >
              <Icon name="Zap" size={18} className="mr-2" />
              Заказать {count} фото за {finalTotal.toLocaleString("ru")} ₽
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculatorSection;
