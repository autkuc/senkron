import { LitElement } from 'lit';

/**
 * WAI-ARIA dialog desteği: role/aria-modal/aria-labelledby şablon tarafında
 * atanır; bu yardımcı odak yönetimi, odak tuzağı ve Escape ile kapatmayı sağlar.
 * Raporun erişilebilirlik taahhüdünün kod karşılığıdır.
 */
export declare const FOCUSABLE_SELECTOR = "button, [href], input, select, textarea, [tabindex]:not([tabindex=\"-1\"])";
/** Saf odak tuzağı kararı: birim testlerde doğrudan doğrulanabilir. */
export declare function decideTrapAction(args: {
    focusableCount: number;
    activeIndex: number;
    shiftKey: boolean;
}): 'none' | 'wrap-first' | 'wrap-last';
/** İç içe shadow root'lar dahil tüm odaklanabilir öğeleri toplar. */
export declare function collectFocusables(root: Element): HTMLElement[];
export declare class ModalA11y {
    private host;
    private close;
    private previouslyFocused;
    constructor(host: LitElement, close: () => void);
    openChanged(open: boolean): Promise<void>;
    private dialog;
    handleKeydown: (e: KeyboardEvent) => void;
}
