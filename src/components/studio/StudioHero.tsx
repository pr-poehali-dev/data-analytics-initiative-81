import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const portfolioImages = [
  {
    src: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/ed98e139-7205-44be-afbe-2ff0d72b9531.jpeg",
    label: "Зарядное устройство",
  },
  {
    src: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/9f19fe0c-d42b-4eef-9bb0-430255b72dbb.jpeg",
    label: "Кофемашина",
  },
  {
    src: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/d416edbc-a971-4f18-9182-a58f24996873.jpeg",
    label: "Instagram Stories",
  },
  {
    src: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/e0572c6f-bce8-4d07-bbfc-2e77a50e67e7.jpeg",
    label: "Наушники",
  },
];

const priceList = [
  { icon: "Image", name: "Hero-Slider", desc: "Главный продающий слайд инфографики", price: "800 ₽", tag: "Хит" },
  { icon: "LayoutGrid", name: "Product Set", desc: "Полная карточка 5–6 слайдов: инфографика, преимущества, размеры", price: "2 500 ₽", tag: "Популярное", highlight: true },
  { icon: "Video", name: "Rich-Animation", desc: "Видео-анимация обложки товара для выделения в ленте", price: "1 500 ₽", tag: "Видео" },
  { icon: "Sparkles", name: "AI-Environment", desc: "Товар в реалистичном интерьере через нейросеть", price: "300 ₽", tag: "AI" },
  { icon: "Eraser", name: "Deep Background Removal", desc: "Удаление фона с ручной доработкой дизайнера", price: "7 ₽/фото", tag: "Объём" },
];

const StudioHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [priceOpen, setPriceOpen] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 1.5 + 0.5,
        opacity: Math.random() * 0.5 + 0.1,
      });
    }
    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 102, ${p.opacity})`;
        ctx.fill();
      });
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 255, 102, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();
    const handleResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", handleResize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", handleResize); };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let pos = 0;
    const speed = 0.4;
    let rafId: number;
    const step = () => {
      pos += speed;
      const half = track.scrollWidth / 2;
      if (pos >= half) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      rafId = requestAnimationFrame(step);
    };
    rafId = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(rafId);
    const resume = () => { rafId = requestAnimationFrame(step); };
    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    return () => {
      cancelAnimationFrame(rafId);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setLightbox(null); setPriceOpen(false); }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0" />

      <div className="container mx-auto px-4 relative z-10 pt-28 pb-16">
        <div className="max-w-4xl mx-auto text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span className="text-neon text-sm font-medium">Контент для WB и Ozon — AI + ручная работа</span>
          </div>

          {/* Heading */}
          <h1
            className="text-5xl md:text-7xl font-black mb-5 leading-[1.05] animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Карточки товаров,<br />
            <span className="relative inline-block">
              <span className="text-neon text-glow-neon">которые продают</span>
            </span>
          </h1>

          <p
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Профессиональные визуалы для маркетплейсов: инфографика, удаление фонов,
            AI-среды и видео-анимации — от&nbsp;<span className="text-white font-semibold">7 ₽ за фото</span>
          </p>

          {/* Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-neon text-black hover:bg-green-400 font-bold text-base px-8 py-6 rounded-xl glow-neon transition-all hover:scale-105 shadow-[0_0_30px_rgba(0,255,102,0.3)]"
            >
              <Icon name="Zap" size={18} className="mr-2" />
              Заказать проект
            </Button>
            <Button
              variant="outline"
              onClick={() => setPriceOpen(true)}
              className="border-white/15 bg-white/5 text-white hover:border-neon/40 hover:text-neon hover:bg-neon/5 font-medium text-base px-8 py-6 rounded-xl transition-all backdrop-blur-sm"
            >
              <Icon name="ListChecks" size={18} className="mr-2" />
              Посмотреть цены
            </Button>
          </div>

          {/* Portfolio strip */}
          <div
            className="mt-14 -mx-4 overflow-hidden animate-fade-in"
            style={{ animationDelay: "0.35s" }}
          >
            <p className="text-zinc-600 text-xs tracking-widest uppercase mb-4 text-center">Примеры наших работ</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
              <div className="flex overflow-hidden">
                <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
                  {[...portfolioImages, ...portfolioImages].map((img, i) => (
                    <div
                      key={i}
                      className="relative flex-shrink-0 w-36 h-48 rounded-2xl overflow-hidden cursor-zoom-in group border border-white/5 hover:border-neon/40 transition-all duration-300 shadow-lg"
                      onClick={() => setLightbox(img.src)}
                    >
                      <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity px-2">{img.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { icon: "Clock", label: "Срок выполнения", value: "2–24 ч" },
              { icon: "Bot", label: "Технология", value: "AI + ручная работа" },
              { icon: "Star", label: "Платформы", value: "WB & Ozon" },
            ].map((item) => (
              <div key={item.label} className="text-center">
                <div className="inline-flex p-3 rounded-xl bg-neon/10 border border-neon/20 mb-3">
                  <Icon name={item.icon as "Clock"} size={20} className="text-neon" />
                </div>
                <div className="text-white font-bold text-sm">{item.value}</div>
                <div className="text-zinc-500 text-xs mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <button
        onClick={() => scrollTo("services")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-zinc-500 hover:text-neon transition-colors animate-float"
      >
        <Icon name="ChevronDown" size={28} />
      </button>

      {/* Price modal */}
      {priceOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setPriceOpen(false)}
        >
          <div
            className="relative bg-zinc-900 border border-white/10 rounded-3xl p-6 md:p-8 w-full max-w-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-zinc-500 hover:text-white bg-white/5 rounded-full p-2 transition-colors"
              onClick={() => setPriceOpen(false)}
            >
              <Icon name="X" size={18} />
            </button>

            <div className="mb-6">
              <span className="text-neon text-xs font-semibold tracking-widest uppercase">Прайс-лист</span>
              <h3 className="text-white text-2xl font-black mt-1">Наши услуги и цены</h3>
            </div>

            <div className="space-y-3">
              {priceList.map((item) => (
                <div
                  key={item.name}
                  className={`flex items-center justify-between gap-4 p-4 rounded-2xl border transition-all ${
                    item.highlight
                      ? "border-neon/30 bg-neon/5"
                      : "border-white/8 bg-white/3 hover:border-white/15"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl flex-shrink-0 ${item.highlight ? "bg-neon/15" : "bg-white/5"}`}>
                      <Icon name={item.icon as "Image"} size={18} className={item.highlight ? "text-neon" : "text-zinc-400"} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-white font-semibold text-sm">{item.name}</p>
                        {item.highlight && (
                          <span className="text-[10px] bg-neon text-black font-black px-2 py-0.5 rounded-full flex-shrink-0">ХИТ</span>
                        )}
                      </div>
                      <p className="text-zinc-500 text-xs mt-0.5 leading-snug">{item.desc}</p>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-white font-black text-lg whitespace-nowrap">{item.price}</span>
                  </div>
                </div>
              ))}
            </div>

            <Button
              onClick={() => { setPriceOpen(false); scrollTo("contact"); }}
              className="w-full mt-6 bg-neon text-black hover:bg-green-400 font-bold py-5 rounded-xl glow-neon transition-all hover:scale-[1.02]"
            >
              <Icon name="Zap" size={18} className="mr-2" />
              Заказать прямо сейчас
            </Button>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 rounded-full p-2 transition-colors"
            onClick={() => setLightbox(null)}
          >
            <Icon name="X" size={22} />
          </button>
          <img
            src={lightbox}
            alt="Превью"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default StudioHero;