import { LitElement, PropertyValues } from 'lit';

export declare class SenkronVideoEditorModal extends LitElement {
    static styles: import('lit').CSSResult;
    private a11y;
    protected updated(changed: PropertyValues<this>): void;
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
