# AI Inference & Pipeline Specification

## Pipeline Flow

```
[User Input] 
      │
      ▼
[Stage 1: Moderation] ──(Blocked)──> 400 Bad Request
      │
      ▼ (Clean)
[Stage 2: Smart Router]
      ├── Local Ollama (Primary, Concurrency <= 4)
      └── Modal Cloud GPU (Fallback / Burst)
      │
      ▼
[Stage 3: Multi-Candidate Ranking]
      │ - Candidate 1: Direct Hook + Core Body
      │ - Candidate 2: Curated Secondary Hook
      │ - Candidate 3: Concise Structured Variation
      ▼
[Stage 4: Lexical & Casing Sanitizer]
      │ - Intercepts and maps loanword anomalies
      │ - Normalizes character casing and suffix artifacts
      ▼
[Return TwoStageResult]
```

## Guardrail Parameters

- **Injection Guard**: Matches 20+ signature patterns for role hijacking, system prompt override attempts, and token leaking.
- **Toxicity Filter**: RegEx and heuristic filter scanning Turkish and English hate speech, harassment, and disallowed topics.
- **Guest Restriction**: Rejects unauthenticated requests with HTTP 403.
