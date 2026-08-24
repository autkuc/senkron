import { LitElement } from 'lit';
import { ContentTone } from './types';

export declare class SenkronPostGenerator extends LitElement {
    static styles: import('lit').CSSResult;
    apiUrl: string;
    graphqlUrl: string;
    defaultTone: ContentTone;
    topic: string;
    private tone;
    private isGenerating;
    private errorMessage;
    private copied;
    private drafts;
    connectedCallback(): void;
    private setTone;
    handleGenerate(): Promise<void>;
    private handleApplyToPost;
    private handleCopy;
    render(): import('lit-html').TemplateResult<1>;
}
