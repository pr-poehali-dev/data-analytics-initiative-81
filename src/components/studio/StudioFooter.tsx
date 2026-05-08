import Icon from "@/components/ui/icon";

const StudioFooter = () => {
  return (
    <footer className="bg-black border-t border-white/5 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg font-black text-white">
              Visual<span className="text-neon">&</span>AI
            </span>
            <span className="text-xs text-zinc-600 font-medium">Studio</span>
          </div>

          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} Visual & AI Studio. Все права защищены.
          </p>

          <div className="flex gap-4">
            <a href="#" className="text-zinc-600 hover:text-neon transition-colors" aria-label="Telegram">
              <Icon name="MessageCircle" size={20} />
            </a>
            <a href="#" className="text-zinc-600 hover:text-neon transition-colors" aria-label="VK">
              <Icon name="Users" size={20} />
            </a>
            <a href="#" className="text-zinc-600 hover:text-neon transition-colors" aria-label="Instagram">
              <Icon name="Instagram" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default StudioFooter;
