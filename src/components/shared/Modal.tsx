import { useEffect, useId, useMemo, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { useLockBodyScroll } from '../../hooks/shared/useLockBodyScroll';
import { useClickOutside } from '../../hooks/shared/useClickOutside';

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
};

const Modal = ({ open, onClose, title, description, children }: ModalProps) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const rid = useId();
  const titleId = useMemo(() => `modal-title-${rid}`, [rid]);
  const descId = useMemo(() => `modal-desc-${rid}`, [rid]);

  useClickOutside(panelRef, onClose, open);
  useLockBodyScroll(open);

  useEffect(() => {
    if (open) {
      panelRef.current?.focus();
    }
  }, [open]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black/30 flex items-center justify-center p-4">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={description ? descId : undefined}
        tabIndex={-1}
        className="w-full max-w-2xl bg-white rounded border p-4 space-y-3 max-h-[80dvh] overflow-y-auto outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <div id={titleId} className="font-bold">
              {title}
            </div>
            {description && (
              <div id={descId} className="text-sm text-gray-500">
                {description}
              </div>
            )}
          </div>

          <button
            className="shrink-0 border rounded px-2 py-1 text-sm"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {children}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
