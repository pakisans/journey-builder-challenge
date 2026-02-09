import { useEffect, type RefObject } from 'react';

export const useClickOutside = <T extends HTMLElement>(
  ref: RefObject<T | null>,
  onClose: () => void,
  enabled: boolean = true
) => {
  useEffect(() => {
    if (!enabled) return;

    const handlePointer = (ev: Event) => {
      const el = ref.current;
      if (!el) return;

      const target = ev.target as Node | null;
      if (!target) return;

      if (el.contains(target)) return;
      onClose();
    };

    const handleKeyDown = (ev: KeyboardEvent) => {
      if (ev.key === 'Escape') onClose();
    };

    document.addEventListener('pointerdown', handlePointer, true);
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('pointerdown', handlePointer, true);
      document.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [ref, onClose, enabled]);
};
