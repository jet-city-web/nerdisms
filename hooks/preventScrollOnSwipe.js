import { useEffect } from 'react';

export default function preventScrollOnSwipe() {

  useEffect(() => {

    let initialClientX = 0;
    let initialClientY = 0;
    let currentClientX = 0;
    let currentClientY = 0;

    function handleTouchStart(event) {
      console.log('start');
      initialClientX = event.touches[0].clientX;
      initialClientY = event.touches[0].clientY;
    }

    function handleTouchMove(event) {
      currentClientX = event.touches[0].clientX;
      currentClientY = event.touches[0].clientY;
      const horizontal = Math.abs(initialClientX - currentClientX);
      const vertical = Math.abs(initialClientY - currentClientY);
      if (horizontal > vertical) {
        document.body.style.overflow = 'hidden';
      }
    }

    function handleTouchEnd() {
      document.body.style.overflow = 'auto';
    }

    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchend', handleTouchEnd, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchmove', handleTouchStart, { passive: false });
      window.removeEventListener('touchend', handleTouchEnd, { passive: false });
      window.removeEventListener('touchmove', handleTouchMove, { passive: false });
    }
  }, []);

}
