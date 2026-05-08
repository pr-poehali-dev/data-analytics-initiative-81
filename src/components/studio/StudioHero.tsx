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
    src: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/006d8c99-b240-43d4-a754-833f217a8180.png",
    label: "Instagram Stories",
  },
  {
    src: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/e0572c6f-bce8-4d07-bbfc-2e77a50e67e7.jpeg",
    label: "Наушники",
  },
];

const StudioHero = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

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

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen relative flex items-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black z-0" />

      <div className="container mx-auto px-4 relative z-10 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-neon/10 border border-neon/30 rounded-full px-4 py-2 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-neon animate-pulse" />
            <span className="text-neon text-sm font-medium">Visual & AI Studio — контент для маркетплейсов</span>
          </div>

          <h1
            className="text-5xl md:text-7xl font-black mb-6 leading-tight animate-fade-in"
            style={{ animationDelay: "0.1s" }}
          >
            Контент для{" "}
            <span className="text-neon text-glow-neon">маркетплейсов</span>,
            <br />
            который продает за вас
          </h1>

          <p
            className="text-lg md:text-xl text-zinc-400 mb-10 max-w-2xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Профессиональные визуалы для WB и Ozon: удаление фонов, инфографика,
            карточки товаров и AI-генерация интерьеров — всё под ключ
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              onClick={() => scrollTo("contact")}
              className="bg-neon text-black hover:bg-green-400 font-bold text-base px-8 py-6 rounded-xl glow-neon transition-all hover:scale-105"
            >
              <Icon name="Zap" size={18} className="mr-2" />
              Заказать проект
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:border-neon/50 hover:text-neon font-medium text-base px-8 py-6 rounded-xl transition-all"
              asChild
            >
              <a href="/pricelist.pdf" download>
                <Icon name="Download" size={18} className="mr-2" />
                Скачать прайс-лист PDF
              </a>
            </Button>
          </div>

          {/* Portfolio strip */}
          <div
            className="mt-12 -mx-4 overflow-hidden animate-fade-in"
            style={{ animationDelay: "0.35s" }}
          >
            <p className="text-zinc-500 text-xs tracking-widest uppercase mb-4 text-center">Примеры наших работ</p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-black to-transparent" />
              <div className="absolute right-0 top-0 bottom-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-black to-transparent" />
              <div className="flex overflow-hidden">
                <div ref={trackRef} className="flex gap-3 will-change-transform" style={{ width: "max-content" }}>
                  {[...portfolioImages, ...portfolioImages].map((img, i) => (
                    <div
                      key={i}
                      className="relative flex-shrink-0 w-36 h-48 rounded-2xl overflow-hidden cursor-zoom-in group border border-white/5 hover:border-neon/40 transition-all duration-300"
                      onClick={() => setLightbox(img.src)}
                    >
                      <img src={img.src} alt={img.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <p className="absolute bottom-2 left-0 right-0 text-center text-white text-[10px] font-medium opacity-0 group-hover:opacity-100 transition-opacity px-2">{img.label}</p>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-black/60 rounded-full p-1">
                          <Icon name="ZoomIn" size={12} className="text-neon" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div
            className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            {[
              { icon: "Clock", label: "Срок выполнения", value: "2–24 ч" },
              { icon: "Bot", label: "Технология", value: "AI + ручная работа" },
              { icon: "Star", label: "Качество", value: "WB & Ozon" },
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

      <button
        onClick={() => scrollTo("services")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-zinc-500 hover:text-neon transition-colors animate-float"
      >
        <Icon name="ChevronDown" size={28} />
      </button>

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