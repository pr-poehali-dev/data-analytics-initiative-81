import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const portfolioItems = [
  { label: "Hero-Slider", tag: "Инфографика" },
  { label: "Product Set", tag: "Карточка" },
  { label: "Rich-Animation", tag: "Видео" },
  { label: "AI-Environment", tag: "AI" },
  { label: "Background Removal", tag: "Удаление фона" },
  { label: "Full Package", tag: "Комплект" },
];

const PortfolioSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="portfolio" className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Портфолио</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            Наши работы
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Примеры «До / После» — загрузите свои реальные кейсы для привлечения клиентов
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <div
              key={item.label}
              className={`group relative rounded-2xl border-2 border-dashed border-white/10 bg-zinc-900/30 overflow-hidden aspect-[4/3] flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-neon/40 hover:bg-neon/5 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-neon/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="relative z-10 flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 group-hover:border-neon/30 flex items-center justify-center transition-all">
                  <Icon name="ImagePlus" size={28} className="text-zinc-600 group-hover:text-neon transition-colors" />
                </div>
                <div className="text-center">
                  <p className="text-white font-semibold">{item.label}</p>
                  <p className="text-zinc-600 text-sm">Загрузите фото До / После</p>
                </div>
                <span className="text-xs bg-white/8 border border-white/10 rounded-full px-3 py-1 text-zinc-400 group-hover:text-neon group-hover:border-neon/30 transition-colors">
                  {item.tag}
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-sm z-20">
                <div className="text-center">
                  <Icon name="Upload" size={32} className="text-neon mx-auto mb-2" />
                  <p className="text-neon font-semibold text-sm">Место для вашей работы</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={`mt-12 text-center transition-all duration-700 delay-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="inline-flex items-center gap-2 bg-neon/5 border border-neon/20 rounded-2xl px-6 py-4">
            <Icon name="Info" size={16} className="text-neon" />
            <p className="text-zinc-400 text-sm">
              Заполните портфолио реальными проектами — это увеличивает конверсию до{" "}
              <span className="text-neon font-semibold">3× раз</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
