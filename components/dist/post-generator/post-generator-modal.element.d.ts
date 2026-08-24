import { LitElement } from 'lit';
import { ContentTone } from './types';

export declare class SenkronPostGeneratorModal extends LitElement {
    static styles: import('lit').CSSResult;
    open: boolean;
    apiUrl: string;
    defaultTone: ContentTone;
    topic: string;
    openModal(): void;
    closeModal(): void;
    private handleBackdropClick;
    private handlePostApplied;
    render(): import('lit-html').TemplateResult<1>;
}
