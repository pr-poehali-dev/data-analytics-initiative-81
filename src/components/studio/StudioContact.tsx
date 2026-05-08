import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Icon from "@/components/ui/icon";

const StudioContact = () => {
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch("https://functions.poehali.dev/e2e3c369-62dc-44a0-b9bb-6cdef54d1a89", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setIsSubmitted(true);
      setForm({ name: "", contact: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contacts = [
    { icon: "MessageCircle", label: "Telegram", value: "@hanzi77" },
    { icon: "Clock", label: "Время ответа", value: "До 2 часов" },
    { icon: "Zap", label: "Срок выполнения", value: "2–24 часа" },
  ];

  return (
    <section ref={ref} id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/20 to-black pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(0,255,102,0.05)_0%,transparent_60%)] pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="text-neon text-sm font-semibold tracking-widest uppercase">Контакты</span>
          <h2 className="text-4xl md:text-5xl font-black text-white mt-3 mb-4">
            Начнём работу?
          </h2>
          <p className="text-zinc-400 max-w-xl mx-auto">
            Опишите задачу — мы ответим и рассчитаем стоимость в течение нескольких часов
          </p>
        </div>

        <div className={`grid md:grid-cols-2 gap-10 max-w-4xl mx-auto transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="flex flex-col justify-center gap-6">
            {contacts.map((c) => (
              <div key={c.label} className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900/60 border border-white/8 hover:border-neon/20 transition-colors">
                <div className="p-3 rounded-xl bg-neon/10 border border-neon/20">
                  <Icon name={c.icon as "Clock"} size={20} className="text-neon" />
                </div>
                <div>
                  <p className="text-zinc-500 text-xs">{c.label}</p>
                  <p className="text-white font-semibold">{c.value}</p>
                </div>
              </div>
            ))}

            <div className="p-5 rounded-2xl bg-neon/5 border border-neon/20 mt-2">
              <p className="text-neon font-bold mb-1 flex items-center gap-2">
                <Icon name="Star" size={16} /> Гарантия качества
              </p>
              <p className="text-zinc-400 text-sm">
                Бесплатные правки до полного согласования результата. Работаем до вашего «Да»
              </p>
            </div>
          </div>

          <div className="bg-zinc-900/60 backdrop-blur-sm border border-white/8 rounded-3xl p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-zinc-600 focus:border-neon/40 rounded-xl h-12"
                />
              </div>
              <div>
                <Input
                  type="text"
                  name="contact"
                  placeholder="Telegram или email"
                  value={form.contact}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-zinc-600 focus:border-neon/40 rounded-xl h-12"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Опишите задачу: тип товара, количество фото, что нужно сделать..."
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="bg-white/5 border-white/10 text-white placeholder-zinc-600 focus:border-neon/40 rounded-xl min-h-[130px] resize-none"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-neon text-black hover:bg-green-400 font-bold py-6 rounded-xl glow-neon transition-all hover:scale-[1.02] disabled:opacity-70 disabled:scale-100"
                disabled={isSubmitting || isSubmitted}
              >
                {isSubmitting ? (
                  <><Icon name="Loader2" size={18} className="mr-2 animate-spin" /> Отправляем...</>
                ) : isSubmitted ? (
                  <><Icon name="CheckCircle" size={18} className="mr-2" /> Заявка отправлена!</>
                ) : (
                  <><Icon name="Send" size={18} className="mr-2" /> Отправить заявку</>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StudioContact;