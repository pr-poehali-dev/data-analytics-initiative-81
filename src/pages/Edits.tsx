import { useState } from "react";
import Icon from "@/components/ui/icon";

const portfolioItems = [
  {
    id: 1,
    title: "Cinematic Dark",
    img: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/a8595d0b-d6c0-4737-90da-c425e62cd19b.jpeg",
    tag: "Dramatic",
  },
  {
    id: 2,
    title: "Vintage Noir",
    img: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/ed06446f-8acd-4a64-bf29-65c2c0489afe.png",
    tag: "Noir",
  },
  {
    id: 3,
    title: "Action Edit",
    img: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/fe919ca1-5626-4305-9056-3eb6cba707b3.jpeg",
    tag: "Action",
  },
  {
    id: 4,
    title: "Hero Shot",
    img: "https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/04e612bd-070e-4a5b-9cb9-8d191109e928.jpeg",
    tag: "Cinematic",
  },
];

const features = [
  { icon: "Zap", text: "Готово за 24 часа" },
  { icon: "Film", text: "After Effects CC" },
  { icon: "Layers", text: "Исходники в комплекте" },
  { icon: "RefreshCw", text: "1 бесплатная правка" },
];

const OrderModal = ({ onClose }: { onClose: () => void }) => {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [desc, setDesc] = useState("");
  const [sent, setSent] = useState(false);

  const submit = () => {
    if (!name || !contact) return;
    setSent(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-2xl p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
        >
          <Icon name="X" size={20} />
        </button>

        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Icon name="Check" size={32} className="text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">Заявка принята!</h3>
            <p className="text-zinc-400 text-sm">Свяжусь с тобой в течение часа</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <div className="text-xs text-[#ff6b35] font-semibold tracking-widest uppercase mb-1">Заказать эдит</div>
              <h3 className="text-2xl font-black text-white">290 ₽ / эдит</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Имя *</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Как тебя зовут?"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#ff6b35]/50"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Telegram / VK *</label>
                <input
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="@username"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#ff6b35]/50"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 mb-1 block">Описание / референс</label>
                <textarea
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Расскажи что хочешь, кидай ссылки на референсы..."
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#ff6b35]/50 resize-none"
                />
              </div>
              <button
                onClick={submit}
                disabled={!name || !contact}
                className="w-full py-4 rounded-xl font-bold text-base transition-all duration-200 bg-[#ff6b35] hover:bg-[#ff8555] text-white disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Заказать за 290 ₽
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Edits = () => {
  const [modal, setModal] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">
      {modal && <OrderModal onClose={() => setModal(false)} />}

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://cdn.poehali.dev/projects/d9ca0fea-83dc-487e-812a-3b72fc9abd41/bucket/a8595d0b-d6c0-4737-90da-c425e62cd19b.jpeg)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#080808]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />

        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-[#ff6b35]/10 border border-[#ff6b35]/30 rounded-full px-4 py-1.5 text-[#ff6b35] text-xs font-semibold tracking-widest uppercase mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b35] animate-pulse" />
            After Effects Edit Studio
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-none mb-6 tracking-tight">
            ТВОЙ ЭДИТ.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b35] to-[#ffa040]">
              С ДУШОЙ.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl mb-10 max-w-xl mx-auto leading-relaxed">
            Кинематографичные монтажи на заказ. Тёмная атмосфера,
            резкие переходы, цветокоррекция — всё как ты хочешь.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setModal(true)}
              className="group flex items-center gap-3 bg-[#ff6b35] hover:bg-[#ff8555] text-white font-bold text-lg px-8 py-4 rounded-2xl transition-all duration-200 shadow-[0_0_30px_rgba(255,107,53,0.4)]"
            >
              Заказать эдит
              <span className="font-black text-white/80">— 290 ₽</span>
              <Icon name="ArrowRight" size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#portfolio"
              className="text-zinc-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
            >
              Смотреть работы
              <Icon name="ChevronDown" size={16} />
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={24} className="text-zinc-600" />
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.text} className="flex items-center gap-3 text-zinc-300">
                <div className="w-10 h-10 rounded-xl bg-[#ff6b35]/10 border border-[#ff6b35]/20 flex items-center justify-center flex-shrink-0">
                  <Icon name={f.icon} size={18} className="text-[#ff6b35]" />
                </div>
                <span className="text-sm font-medium">{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <span className="text-[#ff6b35] text-xs font-semibold tracking-widest uppercase">Портфолио</span>
            <h2 className="text-4xl md:text-5xl font-black text-white mt-3">
              Мои работы
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-4xl mx-auto">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="relative group rounded-2xl overflow-hidden cursor-pointer"
                style={{ aspectRatio: "4/3" }}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${hovered === item.id ? "scale-110" : "scale-100"}`}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300 ${hovered === item.id ? "opacity-100" : "opacity-70"}`} />

                <div className="absolute bottom-0 left-0 p-5">
                  <span className="text-xs text-[#ff6b35] font-semibold tracking-widest uppercase bg-[#ff6b35]/10 border border-[#ff6b35]/20 rounded-full px-3 py-1">
                    {item.tag}
                  </span>
                  <h3 className="text-xl font-black text-white mt-2">{item.title}</h3>
                </div>

                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered === item.id ? "opacity-100" : "opacity-0"}`}>
                  <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center">
                    <Icon name="Play" size={24} className="text-white ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICE CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff6b35]/5 to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-[#ff6b35]/5 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-6 py-3 mb-8">
              <span className="text-5xl font-black text-white">290</span>
              <div className="text-left">
                <div className="text-2xl font-black text-[#ff6b35]">₽</div>
                <div className="text-xs text-zinc-500">за эдит</div>
              </div>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-5">
              Готов к своему
              <br />
              <span className="text-[#ff6b35]">кинематографу?</span>
            </h2>
            <p className="text-zinc-400 mb-10 text-lg">
              Пиши — обсудим референсы, стиль, и запустим работу прямо сегодня.
            </p>

            <button
              onClick={() => setModal(true)}
              className="group inline-flex items-center gap-3 bg-[#ff6b35] hover:bg-[#ff8555] text-white font-bold text-xl px-10 py-5 rounded-2xl transition-all duration-200 shadow-[0_0_40px_rgba(255,107,53,0.35)] hover:shadow-[0_0_60px_rgba(255,107,53,0.5)]"
            >
              Заказать прямо сейчас
              <Icon name="ArrowRight" size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-8 text-center text-zinc-600 text-sm">
        <p>© 2026 Edit Studio · After Effects монтаж на заказ</p>
      </footer>
    </div>
  );
};

export default Edits;