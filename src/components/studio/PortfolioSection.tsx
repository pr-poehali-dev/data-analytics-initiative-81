import { useRef, useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const portfolioItems = [
  {
    label: "Зарядное устройство",
    tag: "Hero-Slider",
    image: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/ed98e139-7205-44be-afbe-2ff0d72b9531.jpeg",
  },
  {
    label: "Портативная кофемашина",
    tag: "Product Set",
    image: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/9f19fe0c-d42b-4eef-9bb0-430255b72dbb.jpeg",
  },
  {
    label: "Instagram Stories Pack",
    tag: "Rich-Animation",
    image: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/006d8c99-b240-43d4-a754-833f217a8180.png",
  },
  {
    label: "Беспроводные наушники",
    tag: "Hero-Slider",
    image: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/e0572c6f-bce8-4d07-bbfc-2e77a50e67e7.jpeg",
  },
  {
    label: "Ваша работа",
    tag: "Место для кейса",
    image: null,
  },
  {
    label: "Ваша работа",
    tag: "Место для кейса",
    image: null,
  },
];

const PortfolioSection = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
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
            Реальные карточки для маркетплейсов — нажмите, чтобы увеличить
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {portfolioItems.map((item, i) => (
            <div
              key={i}
              className={`group relative rounded-2xl overflow-hidden aspect-[3/4] transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              } ${item.image ? "cursor-zoom-in" : "cursor-default"}`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={() => item.image && setLightbox(item.image)}
            >
              {item.image ? (
                <>
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <span className="text-xs bg-neon/20 border border-neon/40 text-neon rounded-full px-3 py-1">{item.tag}</span>
                    <p className="text-white font-semibold mt-2">{item.label}</p>
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/60 backdrop-blur-sm rounded-full p-2">
                      <Icon name="ZoomIn" size={16} className="text-white" />
                    </div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full border-2 border-dashed border-white/10 bg-zinc-900/30 flex flex-col items-center justify-center gap-3 hover:border-neon/30 hover:bg-neon/5 transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon name="ImagePlus" size={26} className="text-zinc-600" />
                  </div>
                  <div className="text-center px-4">
                    <p className="text-zinc-500 font-medium text-sm">Место для вашей работы</p>
                    <p className="text-zinc-700 text-xs mt-1">{item.tag}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

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
            alt="Увеличенное фото"
            className="max-w-full max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default PortfolioSection;