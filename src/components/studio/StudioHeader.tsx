import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const StudioHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/8 shadow-[0_1px_40px_rgba(0,0,0,0.6)]"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-neon flex items-center justify-center shadow-[0_0_12px_rgba(0,255,102,0.5)]">
            <Icon name="Layers" size={16} className="text-black" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white font-black text-base tracking-tight">Visual<span className="text-neon">&</span>AI</span>
            <span className="text-zinc-600 text-[10px] font-medium tracking-widest uppercase">Studio</span>
          </div>
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-white transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={22} />
        </button>

        {/* Nav */}
        <nav className={`${isMenuOpen ? "flex" : "hidden"} md:flex absolute md:relative top-full left-0 w-full md:w-auto bg-black/98 md:bg-transparent flex-col md:flex-row border-t md:border-none border-white/8`}>
          <ul className="flex flex-col md:flex-row gap-0 p-4 md:p-0 md:items-center md:gap-1">
            {[
              { label: "Услуги", id: "services" },
              { label: "Цены", id: "calculator" },
              { label: "Портфолио", id: "portfolio" },
              { label: "Контакты", id: "contact" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="text-zinc-400 hover:text-white transition-colors text-sm font-medium px-4 py-2.5 rounded-lg hover:bg-white/5 w-full md:w-auto text-left"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA */}
        <Button
          onClick={() => scrollTo("contact")}
          className="hidden md:flex items-center gap-2 bg-neon text-black hover:bg-green-300 font-bold text-sm px-5 py-2.5 rounded-xl glow-neon transition-all hover:scale-105 shadow-[0_0_20px_rgba(0,255,102,0.3)]"
        >
          <Icon name="MessageCircle" size={15} />
          Написать нам
        </Button>
      </div>
    </header>
  );
};

export default StudioHeader;
