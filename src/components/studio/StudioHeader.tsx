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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2">
          <span className="text-xl font-black tracking-tight text-white">
            Visual<span className="text-neon">&</span>AI
          </span>
          <span className="text-xs text-zinc-500 font-medium mt-1">Studio</span>
        </a>

        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Icon name={isMenuOpen ? "X" : "Menu"} size={22} />
        </button>

        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } md:flex absolute md:relative top-full left-0 w-full md:w-auto bg-black/95 md:bg-transparent flex-col md:flex-row`}
        >
          <ul className="flex flex-col md:flex-row gap-1 md:gap-0 p-4 md:p-0 md:items-center md:space-x-8">
            {[
              { label: "Услуги", id: "services" },
              { label: "Калькулятор", id: "calculator" },
              { label: "Портфолио", id: "portfolio" },
              { label: "Контакты", id: "contact" },
            ].map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => scrollTo(item.id)}
                  className="text-zinc-400 hover:text-neon transition-colors text-sm font-medium py-2 md:py-0"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <Button
          onClick={() => scrollTo("contact")}
          className="hidden md:flex bg-neon text-black hover:bg-green-400 font-bold text-sm px-5 py-2 rounded-lg glow-neon transition-all hover:scale-105"
        >
          Заказать проект
        </Button>
      </div>
    </header>
  );
};

export default StudioHeader;
