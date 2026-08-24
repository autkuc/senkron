# Backend Specification

## Endpoints

### 1. Video Routing & Decision Engine
`POST /api/video/route-decision`

#### Request Payload
```json
{
  "fileSizeBytes": 15728640,
  "durationSeconds": 24.5,
  "clientCapabilities": {
    "hasWasm": true,
    "hardwareConcurrency": 8,
    "deviceMemoryGB": 16
  }
}
```

#### Response Payload
```json
{
  "target": "client_wasm",
  "reason": "File size (15.00 MB) within client limits (<50MB)",
  "maxDimensions": {
    "width": 1080,
    "height": 1920
  },
  "recommendedCodec": "h264"
}
```

---

### 2. Tiered Rate Limiter & Quotas
`GET /api/quota/status`

Headers returned with every request:
- `X-RateLimit-Limit`: Maximum requests per sliding minute window.
- `X-RateLimit-Remaining`: Remaining request allowance.
- `X-RateLimit-Reset`: Unix epoch reset timestamp.
- `X-Quota-Remaining`: Daily compute / AI edit quota.

#### Tier Rules
| Tier | Rate Limit (RPM) | Daily Quota | Server Transcoding |
| :--- | :--- | :--- | :--- |
| **guest** | 0 | 0 | Blocked |
| **free** | 10 | 3 | Blocked (Client WASM only) |
| **standard** | 30 | 15 | Allowed |
| **pro** | 120 | Unlimited | Allowed |
