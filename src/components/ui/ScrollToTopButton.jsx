import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14
        flex items-center justify-center
        rounded-full
        
        bg-gradient-to-br from-primary to-primary/80
        backdrop-blur-md
        
        text-white
        shadow-xl border border-white/10
        
        transition-all duration-300 ease-out
        
        hover:scale-110 hover:shadow-2xl hover:from-primary hover:to-primary
        active:scale-95
        
        ${
          visible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }
      `}
    >
      <ArrowUp size={22} className="opacity-90" />
    </button>
  );
}