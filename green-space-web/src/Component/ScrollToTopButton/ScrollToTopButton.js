import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-green-400 text-white shadow-lg hover:bg-green-700 transition-all"
        aria-label="Lên đầu trang"
      >
        <ArrowUp size={20} />
      </button>
    )
  );
}

export default ScrollToTopButton;
