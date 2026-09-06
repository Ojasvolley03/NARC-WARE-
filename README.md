<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=220&section=header&text=NARC%20WARE&fontSize=70&fontColor=00FF9C&animation=fadeIn&fontAlignY=38&desc=Privacy-Preserving%20Multi-Domain%20Intelligence%20Platform&descAlignY=58&descSize=18&descColor=8BE9FD" width="100%"/>

<img src="https://readme-typing-svg.demolab.com/?font=Fira+Code&weight=600&size=24&duration=2800&pause=900&color=00FF9C&center=true&vCenter=true&width=780&lines=%F0%9F%9B%B0%EF%B8%8F+One+Pipeline.+Four+Illicit-Activity+Domains.;%F0%9F%94%97+Blockchain-Anchored+Evidence+Integrity;%F0%9F%A7%A0+AI%2FNLP+Classification+%2B+Entity+Extraction;%F0%9F%A7%91%E2%80%8D%E2%9A%96%EF%B8%8F+Human-in-the-Loop%2C+Always;%F0%9F%94%92+Zero+Encryption+Bypass.+Zero+Private+Chat+Access." alt="Typing SVG" />

<br/>

![Version](https://img.shields.io/badge/version-2.0-00FF9C?style=for-the-badge&labelColor=0f0c29)
![Status](https://img.shields.io/badge/status-hackathon--prototype-8BE9FD?style=for-the-badge&labelColor=0f0c29)
![License](https://img.shields.io/badge/license-MIT-FF79C6?style=for-the-badge&labelColor=0f0c29)
![Made with](https://img.shields.io/badge/made%20with-%F0%9F%A7%A0%20%2B%20%E2%9B%93%EF%B8%8F-BD93F9?style=for-the-badge&labelColor=0f0c29)

<img src="https://raw.githubusercontent.com/Anmol-Baranwal/Cool-GIFs-For-Github/main/grid.gif" width="100%" height="4"/>

</div>

<br/>

## 🛰️ Transmission Received

> A payment handle surfaces in a "guaranteed 20% monthly returns" group.
> The same handle resurfaces days later — in a fake job offer letter.
> **NarcWare connects the dots before a human even opens the case.**

**NarcWare** is a privacy-preserving intelligence platform that detects, prioritizes, and helps investigate coordinated illicit activity across **four domains** — drug trafficking solicitation, exam paper leaks, financial/investment scams, and job/recruitment fraud — using **one shared architecture**. Swap the classifier, keep the pipeline. That's the whole point.

It ingests only what an operator is legally authorized to see — public channels, user reports, or synthetic data — classifies and clusters it, maps it on a relationship graph, **anchors evidence integrity on-chain**, and routes every high-priority finding through a human before anything happens.

<div align="center">

### 🔐 It Will Never
`break encryption` · `scrape private chats` · `auto-accuse` · `act without a human`

</div>

<br/>

<div align="center">
<img src="https://raw.githubusercontent.com/Anmol-Baranwal/Cool-GIFs-For-Github/main/grid.gif" width="100%" height="4"/>
</div>

## 📡 Table of Contents

| | | | |
|---|---|---|---|
| [🎯 The Four Domains](#-the-four-domains) | [🏗️ Architecture](#️-architecture) | [🧬 Tech Stack](#-tech-stack) | [🧠 AI/ML Pipeline](#-aiml-pipeline) |
| [⛓️ Blockchain Layer](#️-blockchain-evidence-integrity) | [🗂️ Data Model](#️-data-model) | [🔌 API Surface](#-api-surface) | [🔁 Case Lifecycle](#-case-lifecycle) |
| [🛡️ Security & Privacy](#️-security--privacy) | [📊 Success Criteria](#-success-criteria) | [🚀 Getting Started](#-getting-started) | [🗺️ Roadmap](#️-roadmap) |

<br/>

## 🎯 The Four Domains

<table>
<tr>
<td width="25%" align="center">

### 💊
**Trafficking**
<br/>
Coded language, payment links, quantities on public channels

</td>
<td width="25%" align="center">

### 📝
**Paper Leaks**
<br/>
Reposted exam images, urgency tied to exam date

</td>
<td width="25%" align="center">

### 📈
**Financial Scams**
<br/>
"Guaranteed returns," UPI handles, ticking deadlines

</td>
<td width="25%" align="center">

### 💼
**Job Fraud**
<br/>
Fake offer letters, advance-fee requests

</td>
</tr>
</table>

<div align="center">

**⚡ One classifier swap. One reason-code set change. Same pipeline runs all four.**

</div>

<br/>

## 🏗️ Architecture

```mermaid
%%{init: {'theme':'dark', 'themeVariables': { 'primaryColor':'#302b63','primaryTextColor':'#00FF9C','primaryBorderColor':'#8BE9FD','lineColor':'#8BE9FD','secondaryColor':'#0f0c29','tertiaryColor':'#1a1a2e'}}}%%
flowchart TD
    A["🔒 Protected / Authorized Data Source\n(real or simulated local layer)"] --> B["📥 Ingestion API\ndomain-tagged: trafficking · paper_leak · financial_scam · job_fraud"]
    B --> C["🧠 AI / NLP Service\nclassification · NER · embeddings · OCR + pHash"]
    C --> D["📊 Explainable Risk Engine\ndomain-weighted scoring + time-decay"]
    D --> E["🕸️ Graph + Semantic Similarity\n(Neo4j) — cross-domain entity links"]
    E --> F["🧑‍⚖️ Human Review Queue"]
    F --> G["🗄️ Evidence Vault\n(encrypted, off-chain)"]
    F --> H["⛓️ Blockchain Hash Ledger\n(on-chain, EVM testnet)"]
    G --> I["📁 Case Management + Audit Trail\n+ Analytics Dashboard"]
    H --> I

    style A fill:#0f0c29,stroke:#FF79C6,color:#FF79C6
    style B fill:#0f0c29,stroke:#8BE9FD,color:#8BE9FD
    style C fill:#0f0c29,stroke:#00FF9C,color:#00FF9C
    style D fill:#0f0c29,stroke:#00FF9C,color:#00FF9C
    style E fill:#0f0c29,stroke:#BD93F9,color:#BD93F9
    style F fill:#0f0c29,stroke:#FFB86C,color:#FFB86C
    style G fill:#0f0c29,stroke:#8BE9FD,color:#8BE9FD
    style H fill:#0f0c29,stroke:#FF79C6,color:#FF79C6
    style I fill:#0f0c29,stroke:#00FF9C,color:#00FF9C
```

<br/>

## 🧬 Tech Stack

<div align="center">

| Layer | Stack |
|---|---|
| 🎨 **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB) ![Tailwind](https://img.shields.io/badge/Tailwind-0F172A?style=flat-square&logo=tailwindcss&logoColor=38BDF8) ![Recharts](https://img.shields.io/badge/Recharts-0F172A?style=flat-square) |
| ⚙️ **Backend API** | ![Java](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat-square&logo=springboot&logoColor=white) ![Node](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white) |
| 🧠 **AI Service** | ![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white) |
| 🗃️ **Primary DB** | ![Postgres](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white) |
| 🕸️ **Graph DB** | ![Neo4j](https://img.shields.io/badge/Neo4j-008CC1?style=flat-square&logo=neo4j&logoColor=white) |
| 🔍 **Vector DB** | ![FAISS](https://img.shields.io/badge/FAISS%20%2F%20pgvector%20%2F%20Chroma-1a1a2e?style=flat-square) |
| ⛓️ **Blockchain** | ![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white) ![Polygon](https://img.shields.io/badge/Polygon_Amoy-8247E5?style=flat-square&logo=polygon&logoColor=white) |
| 🔐 **Auth** | ![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white) ![OAuth](https://img.shields.io/badge/OAuth_2.0-3C5280?style=flat-square) |
| 📦 **DevOps** | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=docker&logoColor=white) ![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat-square&logo=githubactions&logoColor=white) |

</div>

<br/>

## 🧠 AI/ML Pipeline

```mermaid
%%{init: {'theme':'dark'}}%%
flowchart LR
    subgraph IN["📨 Incoming Record"]
      T[Text]
      IMG[Image / Media]
    end

    T --> DC{{"🧭 Domain Router\n(auto-classify if untagged)"}}
    DC --> CLS["🧠 Shared Encoder\n4 classification heads"]
    CLS --> NER["🏷️ Entity Extraction\nregex + transformer NER + gazetteers"]
    NER --> EMB["🔗 Sentence Embeddings\n→ Vector DB"]

    IMG --> OCR["👁️ OCR"]
    OCR --> PHASH["🖼️ Perceptual Hash\npHash / aHash"]
    PHASH --> DUPE["🧩 Duplicate-Image Graph\nHamming-distance match"]

    EMB --> SIM["📐 ANN Similarity Search\nclustering threshold per domain"]
    DUPE --> SIM
    SIM --> RISK["⚖️ Explainable Risk Score\nweighted signals + time-decay"]
    RISK --> OUT["🚨 Alert + Reason Codes"]

    style DC fill:#0f0c29,stroke:#FFB86C,color:#FFB86C
    style RISK fill:#0f0c29,stroke:#00FF9C,color:#00FF9C
    style OUT fill:#0f0c29,stroke:#FF79C6,color:#FF79C6
```

**Risk score formula:**

```
score = w1·text_signal + w2·entity_signal + w3·graph_signal + w4·similarity_signal (+ w5·time_decay)
```

> ⚠️ The score **never** ships without its reason codes. The UI visually separates *"AI signal"* from *"human-confirmed fact"* — always.

<br/>

## ⛓️ Blockchain Evidence Integrity

```mermaid
%%{init: {'theme':'dark'}}%%
sequenceDiagram
    participant E as 🚩 Flagged Evidence
    participant H as 🔑 SHA-256 Hasher
    participant V as 🗄️ Encrypted Vault (off-chain)
    participant C as 📜 Solidity Contract (EVM Testnet)
    participant R as 🧑‍💻 Reviewer

    E->>H: compute hash
    H->>V: store encrypted file
    H->>C: submit tx { evidenceHash, timestamp, caseId, domain, submitter }
    C-->>R: tx receipt confirmed ✅
    R->>V: re-hash stored file (on demand)
    R->>C: compare to on-chain value
    C-->>R: MATCH ✅ / CHANGED ❌
```

> 🚫 **No raw message content or personal data is ever written on-chain** — only the hash and minimal case metadata.

<br/>

## 🗂️ Data Model

```mermaid
%%{init: {'theme':'dark'}}%%
erDiagram
    RECORD ||--o{ ENTITY : contains
    RECORD ||--|| RISKSCORE : scored_by
    RECORD }o--o{ CASE : linked_via
    CASE ||--o{ EVIDENCEHASH : anchors
    CASE ||--o{ AUDITLOGENTRY : logs

    RECORD {
        string id
        enum domain
        string source
        string raw_text
        string media_ref
        datetime ingested_at
    }
    ENTITY {
        string id
        enum type
        string value
    }
    RISKSCORE {
        float score
        float confidence
        array reason_codes
        string model_version
    }
    CASE {
        string id
        enum domain
        enum status
        float priority_score
        string assigned_reviewer
    }
    EVIDENCEHASH {
        string sha256_hash
        string tx_hash
        datetime block_timestamp
    }
    AUDITLOGENTRY {
        string actor_id
        string action
        datetime timestamp
    }
```

**🕸️ Graph edges (Neo4j):** `MENTIONS` · `LINKED_TO` · `MIRRORS` · `SHARES_PAYMENT_HANDLE` — the last one is what lets a scam and a job-fraud post get linked through a **shared payment handle**, across domains.

<br/>

## 🔌 API Surface

| Method | Endpoint | Purpose |
|---|---|---|
| `POST` | `/api/ingest` | 📥 Submit authorized record, tagged by domain |
| `GET` | `/api/alerts?domain=&status=` | 🚨 Priority-sorted, filterable alert queue |
| `GET` | `/api/cases/{id}` | 📁 Case detail — entities, graph refs, similar cases |
| `POST` | `/api/cases/{id}/review` | ✅ Reviewer submits Confirmed / False-Positive / Insufficient |
| `POST` | `/api/evidence/{id}/hash` | ⛓️ Anchor evidence hash on-chain |
| `GET` | `/api/evidence/{id}/verify` | 🔍 Re-hash and compare to ledger |
| `GET` | `/api/graph/{caseId}` | 🕸️ Relationship graph data |
| `GET` | `/api/analytics/summary?domain=` | 📊 Aggregate dashboard metrics |

<br/>

## 🔁 Case Lifecycle

```mermaid
%%{init: {'theme':'dark'}}%%
stateDiagram-v2
    [*] --> Ingested
    Ingested --> Classified: AI/NLP scoring
    Classified --> Clustered: similarity + graph
    Clustered --> Queued: risk threshold crossed
    Queued --> Escalated: exam-date / deadline proximity 🔥
    Queued --> UnderReview: reviewer opens case
    Escalated --> UnderReview
    UnderReview --> ConfirmedRelevant: ✅
    UnderReview --> FalsePositive: ❌
    UnderReview --> InsufficientEvidence: ❓
    ConfirmedRelevant --> Anchored: evidence hashed on-chain ⛓️
    Anchored --> Closed
    FalsePositive --> Closed
    InsufficientEvidence --> Closed
    Closed --> [*]
```

<br/>

## 🛡️ Security & Privacy

<table>
<tr><td>

**In transit & at rest**
🔒 TLS everywhere · AES-256 at rest for evidence

</td><td>

**Access control**
👤 RBAC at the gateway — `Admin` / `Analyst` / `Read-only`

</td></tr>
<tr><td>

**Audit**
📜 Append-only audit log, every case-affecting action

</td><td>

**Data minimization**
🧊 Only alert ID, score, confidence & reason codes leave the local layer — raw content stays local until human-authorized escalation

</td></tr>
<tr><td>

**Retention**
⏳ Configurable, documented retention window

</td><td>

**Model checks**
📉 False-positive rate + bias/drift checks per domain

</td></tr>
</table>

<div align="center">

### 🚧 Explicitly Out of Scope
`breaking encryption` · `scraping private chats without authorization` · `automated accusation/blocking/law-enforcement action without human review` · `live production platform integration (prototype uses a simulator)`

</div>

<br/>

## 📊 Success Criteria

| Target | Metric |
|---|---|
| 🎯 | **≥80% precision** on synthetic evaluation set, per domain — measured, not assumed |
| 🔗 | **100% hash-verification success** on unaltered test evidence |
| 🖥️ | **Live demo across all four domains** using the identical pipeline, only classifier + reason-codes swapped |
| ⚡ | Alert queue renders in **<3s** at hackathon-scale (~1,000–5,000 records) |

<br/>

## 🚀 Getting Started

```bash
# clone the repo
git clone https://github.com/thestralseer/narc-ware.git
cd narc-ware

# spin up the local stack (frontend, backend, AI service, Postgres, Neo4j)
docker compose up --build

# deploy the evidence-hash contract to Polygon Amoy testnet
cd blockchain && npx hardhat run scripts/deploy.js --network amoy

# feed synthetic messages across all four domains
python simulator/feed.py --domains trafficking,paper_leak,financial_scam,job_fraud
```

> 💡 This is a **hackathon prototype**. The local/on-device detection layer is simulated; no live WhatsApp/Telegram integration ships in this build.

<br/>

## 🗺️ Roadmap

- [x] Shared 4-head classification architecture
- [x] Cross-domain entity linking (`SHARES_PAYMENT_HANDLE`)
- [x] On-chain evidence anchoring + verify flow
- [ ] Multilingual gazetteer expansion (regional slang, state-board exam names)
- [ ] Formal authorization + compliance review path for production deployment
- [ ] Real-time alerting via webhook/notification service

<br/>

<div align="center">

### 🧠 Built on one belief:
**the same architecture that catches a leaked exam paper can catch a fake job offer — because both are just coordinated deception wearing a different mask.**

<br/>

![Repo size](https://img.shields.io/badge/⚠️_human--in--the--loop-always-FFB86C?style=for-the-badge&labelColor=0f0c29)
![Repo size](https://img.shields.io/badge/🔓_no_encryption_broken-ever-00FF9C?style=for-the-badge&labelColor=0f0c29)

<br/><br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=140&section=footer"/>

</div>
