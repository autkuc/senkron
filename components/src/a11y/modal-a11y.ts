import { LitElement } from 'lit';

/**
 * WAI-ARIA dialog desteği: role/aria-modal/aria-labelledby şablon tarafında
 * atanır; bu yardımcı odak yönetimi, odak tuzağı ve Escape ile kapatmayı sağlar.
 * Raporun erişilebilirlik taahhüdünün kod karşılığıdır.
 */

export const FOCUSABLE_SELECTOR =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/** Saf odak tuzağı kararı: birim testlerde doğrudan doğrulanabilir. */
export function decideTrapAction(args: {
  focusableCount: number;
  activeIndex: number;
  shiftKey: boolean;
}): 'none' | 'wrap-first' | 'wrap-last' {
  const { focusableCount, activeIndex, shiftKey } = args;
  if (focusableCount === 0) return 'none';
  if (shiftKey && (activeIndex === 0 || activeIndex === -1)) return 'wrap-last';
  if (!shiftKey && activeIndex === focusableCount - 1) return 'wrap-first';
  return 'none';
}

/** İç içe shadow root'lar dahil tüm odaklanabilir öğeleri toplar. */
export function collectFocusables(root: Element): HTMLElement[] {
  const out: HTMLElement[] = [];
  const walk = (el: Element | ShadowRoot): void => {
    for (const child of Array.from(el.children)) {
      if (child instanceof HTMLElement) {
        if (child.matches(FOCUSABLE_SELECTOR) && !child.hasAttribute('disabled')) {
          out.push(child);
        }
        if (child.shadowRoot) walk(child.shadowRoot);
      }
    }
  };
  walk(root);
  return out;
}

export class ModalA11y {
  private previouslyFocused: HTMLElement | null = null;

  constructor(
    private host: LitElement,
    private close: () => void
  ) {}

  async openChanged(open: boolean): Promise<void> {
    if (open) {
      this.previouslyFocused =
        typeof document !== 'undefined' ? (document.activeElement as HTMLElement) : null;
      await this.host.updateComplete;
      const dialog = this.dialog();
      const first = dialog ? collectFocusables(dialog)[0] : null;
      first?.focus();
    } else {
      const prev = this.previouslyFocused;
      this.previouslyFocused = null;
      if (prev && typeof prev.focus === 'function' && prev.isConnected) prev.focus();
    }
  }

  private dialog(): HTMLElement | null {
    return (this.host.shadowRoot?.querySelector('[role="dialog"]') as HTMLElement) ?? null;
  }

  handleKeydown = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      e.stopPropagation();
      this.close();
      return;
    }
    if (e.key !== 'Tab') return;
    const dialog = this.dialog();
    if (!dialog) return;
    const items = collectFocusables(dialog);
    const active = this.host.shadowRoot?.activeElement as HTMLElement | null;
    const activeIndex = active ? items.indexOf(active) : -1;
    const action = decideTrapAction({
      focusableCount: items.length,
      activeIndex,
      shiftKey: e.shiftKey,
    });
    if (action === 'wrap-last') {
      e.preventDefault();
      items[items.length - 1]?.focus();
    } else if (action === 'wrap-first') {
      e.preventDefault();
      items[0]?.focus();
    }
  };
}
