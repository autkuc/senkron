# AI & LLM Engine (`ai/`)

## Overview

All LLM logic, prompt definitions, model integrations, and content generation pipelines reside within the `ai/` folder.

## Key Responsibilities

1. **LLM Provider Abstractions**:
   - Standardized wrapper interfaces for OpenAI, Anthropic, Gemini, or self-hosted LLM endpoints.

2. **Social Media Post Generation Pipeline**:
   - Tone, format, and platform-specific prompt templates (Twitter/X, LinkedIn, Instagram).
   - Structured JSON output parsing for post captions, hashtags, and layout recommendations.

3. **Context & Safety**:
   - Guardrails, content filtering, and token tracking.
