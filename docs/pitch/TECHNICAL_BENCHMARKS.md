# Senkron: Technical Performance & Latency Benchmarks

This document details deep-dive engineering benchmarks, stress tests, and system profiles for the **Senkron** ecosystem.

---

## 1. Microservice Load & Throughput Metrics

![Mikroservis Throughput Grafiği](images/5_throughput_benchmark_chart.png)

### Raw Benchmark Data Table

| Endpoint / Subsystem | Concurrency Level | Total Requests | Latency (p50) | Latency (p95) | Latency (p99) | Error / Drop Rate |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `POST /api/video/route-decision` | 50 workers | 1,000 | **0.42 ms** | **0.88 ms** | 1.45 ms | **0.00%** |
| `GET /api/quota/status` | 50 workers | 1,000 | **0.35 ms** | **0.72 ms** | 1.10 ms | **0.00%** |
| `POST /api/ai/generate` (Bursts) | 20 workers | 200 | **1.80 ms** | **3.40 ms** | 5.20 ms | 0.00% (Throttled gracefully to 15 RPM) |
| `moderateContent()` Engine | In-Process | 5,000 | **0.08 ms** | **0.16 ms** | 0.28 ms | **0.00%** |

---

## 2. Security & Moderation Pipeline

![Çift Aşamalı Moderasyon](images/3_dual_pass_moderation.png)

---

## 3. Workload Routing & Decision Tree

![Hibrit Karar Ağacı](images/2_hybrid_decision_tree.png)
