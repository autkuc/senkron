import { LitElement } from 'lit';

export declare class SenkronVideoEditorModal extends LitElement {
    static styles: import('lit').CSSResult;
    open: boolean;
    src: string;
    aspectRatio: string;
    theme: string;
    openModal(): void;
    closeModal(): void;
    private handleBackdropClick;
    private handleVideoAttached;
    render(): import('lit-html').TemplateResult<1>;
}
