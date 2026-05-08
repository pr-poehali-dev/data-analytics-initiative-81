import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const services = [
  {
    icon: "Image",
    name: "Hero-Slider",
    description: "Главный продающий слайд инфографики с цепляющим дизайном под ваш товар",
    price: "800 ₽",
    tag: "Хит",
    color: "from-green-500/20 to-emerald-900/10",
  },
  {
    icon: "LayoutGrid",
    name: "Product Set",
    description: "Полная карточка товара из 5–6 слайдов: инфографика, преимущества, размеры",
    price: "2 500 ₽",
    tag: "Популярное",
    color: "from-blue-500/20 to-blue-900/10",
    popular: true,
  },
  {
    icon: "Video",
    name: "Rich-Animation",
    description: "Видео-анимация обложки товара, которая выделяет вас в ленте поиска",
    price: "1 500 ₽",
    tag: "Видео",
    color: "from-purple-500/20 to-purple-900/10",
  },
  {
    icon: "Sparkles",
    name: "AI-Environment",
    description: "Генерация товара в реалистичном интерьере через нейросеть — без фотосессии",
    price: "300 ₽",
    tag: "AI",
    color: "from-amber-500/20 to-amber-900/10",
  },
];

const ServicesSection = () => {
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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={ref} id="services" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/10 to-black pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Услуги</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            Что мы создаём
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Весь контент — под стандарты WB и Ozon. Передовой AI + ручная доработка дизайнера
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s, i) => (
            <div
              key={s.name}
              className={`relative group rounded-2xl border border-white/8 bg-gradient-to-br ${s.color} p-6 transition-all duration-500 hover:border-neon/30 hover:scale-105 cursor-pointer ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
              onClick={() => scrollTo("contact")}
            >
              {s.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-neon text-black text-xs font-black px-3 py-1 rounded-full animate-pulse-neon">
                    Популярное
                  </span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:border-neon/30 transition-colors">
                  <Icon name={s.icon as "Image"} size={22} className="text-neon" />
                </div>
                <span className="text-xs text-zinc-500 bg-white/5 rounded-full px-2 py-1">{s.tag}</span>
              </div>

              <h3 className="text-white font-bold text-lg mb-2">{s.name}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed mb-6">{s.description}</p>

              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-black text-white">{s.price}</span>
                <Icon name="ArrowRight" size={18} className="text-zinc-600 group-hover:text-neon transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
