import { useRef, useState, useCallback, useEffect } from "react";

const pairs = [
  {
    label: "Кофемашина",
    before: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/4c737d58-315e-47fd-96ec-9d3a560f1e36.jpeg",
    after: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/3e0d6c27-f999-4f63-83ba-8f8803585d4e.jpeg",
  },
  {
    label: "Зарядное устройство",
    before: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/ff95d11b-be07-49d3-b42f-2cb4c63904c0.png",
    after: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/9a926b0c-1d76-4adb-9792-cebe4b1e9f57.jpeg",
  },
  {
    label: "Кроссовки",
    before: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/21e9d7c1-c1e7-466f-ab9c-43b8750501e9.jpeg",
    after: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/d416edbc-a971-4f18-9182-a58f24996873.jpeg",
  },
];

const Slider = ({ before, after }: { before: string; after: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState(50);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onMouseDown = () => { dragging.current = true; };
  const onMouseMove = (e: React.MouseEvent) => { if (dragging.current) updatePos(e.clientX); };
  const onMouseUp = () => { dragging.current = false; };
  const onTouchMove = (e: React.TouchEvent) => { updatePos(e.touches[0].clientX); };

  useEffect(() => {
    const up = () => { dragging.current = false; };
    window.addEventListener("mouseup", up);
    return () => window.removeEventListener("mouseup", up);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden select-none cursor-col-resize border border-white/10"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchStart={(e) => updatePos(e.touches[0].clientX)}
    >
      <img src={after} alt="После" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <img src={before} alt="До" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      </div>

      <div className="absolute inset-y-0 flex items-center" style={{ left: `calc(${pos}% - 1px)` }}>
        <div className="w-0.5 h-full bg-white/80 shadow-[0_0_8px_rgba(255,255,255,0.5)]" />
      </div>
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center z-10"
        style={{ left: `${pos}%` }}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M6 10L2 7v6l4-3zM14 10l4-3v6l-4-3z" fill="#000" />
          <line x1="10" y1="3" x2="10" y2="17" stroke="#000" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>

      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1 rounded-full border border-white/20">ДО</div>
      <div className="absolute top-3 right-3 bg-neon/90 text-black text-xs font-semibold px-3 py-1 rounded-full">ПОСЛЕ</div>
    </div>
  );
};

const BeforeAfterSlider = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">До / После</span>
          <h2 className="text-3xl md:text-4xl font-black text-white mt-3 mb-3">
            Видите разницу?
          </h2>
          <p className="text-zinc-400 max-w-md mx-auto text-sm">
            Перетащите ползунок и сравните исходное фото с готовой карточкой
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-center max-w-4xl mx-auto">
          <div className="w-full md:w-80 flex-shrink-0">
            <Slider before={pairs[active].before} after={pairs[active].after} key={active} />
          </div>

          <div className="flex md:flex-col gap-3 w-full md:w-auto">
            {pairs.map((p, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`flex-1 md:flex-none flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all duration-200 ${
                  active === i
                    ? "border-neon/60 bg-neon/10 text-neon"
                    : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-white"
                }`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${active === i ? "bg-neon" : "bg-zinc-600"}`} />
                <span className="text-sm font-medium">{p.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
