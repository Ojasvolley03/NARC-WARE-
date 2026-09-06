import sys
import json
import re
import math
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import parse_qs, urlparse

# --- SYNTHETIC DICTIONARIES & PATTERN INDICATORS FOR LAW ENFORCEMENT DEMO ONLY ---

# Category 1: Drug Trafficking Detection Indicators
DRUG_INDICATORS = {
    "weight_slang": ["brick", "kilo", "gram", "key", "pack", "ball", "oz", "baggie", "elbow", "zip", "cartel", "pure", "uncut"],
    "transaction_phrases": ["wire", "usdt", "btc", "wallet", "cash", "crypto", "escrow", "drop", "dead drop", "payment sent", "half upfront", "stash"],
    "location_coded": ["spot", "corner", "warehouse", "locker", "dock", "parking lot", "highway exit", "storage unit", "safehouse"],
    "urgency_anomalies": ["asap", "tonight only", "move fast", "burner", "switch app", "clear chat", "delete messages", "signal app"]
}

# Category 2: Exam / Paper Leak Detection Indicators
EXAM_LEAK_INDICATORS = {
    "leak_claims": ["leak", "leaked paper", "original question paper", "solved paper", "answer key", "board paper", "paper leak", "question paper", "exam paper", "paper available", "real paper", "actual paper", "leak paper"],
    "file_media_types": [".pdf", ".png", ".jpg", ".docx", "scan copy", "question sheet", "set a", "set b", "set c", "set d", "watermarked copy", "screenshot of paper", "paper photo", "scanned sheet"],
    "payment_negotiations": ["upi", "gpay", "phonepe", "paytm", "send screenshot", "half before exam", "price per paper", "rs", "inr", "usdt", "btc", "advance payment", "gift card", "gpay upi", "payment link", "per subject"],
    "suspicious_links": ["t.me/", "drive.google.com", "mega.nz", "dropbox", "mediafire", "tinyurl", "bit.ly", "private channel", "link in bio", "dm for link", "telegram link"],
    "urgency_evasion": ["delete after", "exam tomorrow", "hurry limited", "dm fast", "100% real leak", "verified leak", "guaranteed questions", "timer", "self destruct", "clear after reading", "limited seats"]
}

def analyze_drug_trafficking(text_lower):
    found_indicators = []
    score_lang = 0
    score_txn = 0
    score_urgency = 0

    for word in DRUG_INDICATORS["weight_slang"]:
        if re.search(r'\b' + re.escape(word) + r'\b', text_lower):
            found_indicators.append(f"Suspicious quantity/purity indicator: '{word}'")
            score_lang += 15

    for word in DRUG_INDICATORS["transaction_phrases"]:
        if re.search(r'\b' + re.escape(word) + r'\b', text_lower):
            found_indicators.append(f"Transactional context phrase: '{word}'")
            score_txn += 15

    for word in DRUG_INDICATORS["location_coded"]:
        if re.search(r'\b' + re.escape(word) + r'\b', text_lower):
            found_indicators.append(f"Coded location reference: '{word}'")
            score_lang += 10

    for word in DRUG_INDICATORS["urgency_anomalies"]:
        if re.search(r'\b' + re.escape(word) + r'\b', text_lower):
            found_indicators.append(f"Communication evasion/urgency marker: '{word}'")
            score_urgency += 12

    numbers_found = re.findall(r'(\$\d+|\d+\s*k|\d+\s*usdt|\d+\s*btc|\d+\s*g|\d+\s*kg)', text_lower)
    if numbers_found:
        found_indicators.append(f"Specific monetary/weight values: {', '.join(numbers_found)}")
        score_txn += 15

    raw_score = score_lang + score_txn + score_urgency
    risk_score = min(99, max(12 if found_indicators else 5, raw_score))
    
    risk_level = "LOW"
    if risk_score >= 75:
        risk_level = "HIGH"
    elif risk_score >= 45:
        risk_level = "MEDIUM"

    confidence = round(min(98.5, 60.0 + (len(found_indicators) * 8.5)), 1)

    return {
        "category": "DRUG_TRAFFICKING",
        "riskScore": risk_score,
        "riskLevel": risk_level,
        "confidence": confidence,
        "classification": "Potentially Suspicious / Requires Human Review",
        "detectionReasons": found_indicators if found_indicators else ["Standard non-suspicious communication pattern"],
        "breakdown": {
            "languageScore": min(30, score_lang),
            "transactionScore": min(25, score_txn),
            "networkScore": 15 if len(found_indicators) > 1 else 5,
            "anomalyScore": min(20, score_urgency)
        }
    }

def analyze_exam_leak(text_lower):
    found_indicators = []
    score_claims = 0
    score_files = 0
    score_payment = 0
    score_urgency = 0

    for phrase in EXAM_LEAK_INDICATORS["leak_claims"]:
        if re.search(r'\b' + re.escape(phrase) + r'\b', text_lower):
            found_indicators.append(f"Exam paper leak claim/offer: '{phrase}'")
            score_claims += 15

    for phrase in EXAM_LEAK_INDICATORS["file_media_types"]:
        if re.search(r'\b' + re.escape(phrase) + r'\b', text_lower) or phrase in text_lower:
            found_indicators.append(f"Question paper format/scan copy indicator: '{phrase}'")
            score_files += 15

    for phrase in EXAM_LEAK_INDICATORS["payment_negotiations"]:
        if re.search(r'\b' + re.escape(phrase) + r'\b', text_lower):
            found_indicators.append(f"Payment negotiation / transaction mode: '{phrase}'")
            score_payment += 15

    for phrase in EXAM_LEAK_INDICATORS["suspicious_links"]:
        if phrase in text_lower:
            found_indicators.append(f"Suspicious file distribution / cloud link: '{phrase}'")
            score_files += 15

    for phrase in EXAM_LEAK_INDICATORS["urgency_evasion"]:
        if re.search(r'\b' + re.escape(phrase) + r'\b', text_lower):
            found_indicators.append(f"Timer evasion / timer urgency marker: '{phrase}'")
            score_urgency += 12

    # Check for monetary amounts in INR / Rs / USDT / USD
    prices_found = re.findall(r'(\d+\s*rs|\d+\s*inr|rs\.?\s*\d+|\$\d+|\d+\s*usdt)', text_lower)
    if prices_found:
        found_indicators.append(f"Price per paper / subject quote: {', '.join(prices_found)}")
        score_payment += 12

    raw_score = score_claims + score_files + score_payment + score_urgency
    risk_score = min(99, max(12 if found_indicators else 5, raw_score))

    risk_level = "LOW"
    if risk_score >= 75:
        risk_level = "HIGH"
    elif risk_score >= 45:
        risk_level = "MEDIUM"

    confidence = round(min(98.5, 62.0 + (len(found_indicators) * 8.0)), 1)

    return {
        "category": "EXAM_LEAK",
        "riskScore": risk_score,
        "riskLevel": risk_level,
        "confidence": confidence,
        "classification": "Potentially Suspicious / Requires Human Review",
        "detectionReasons": found_indicators if found_indicators else ["Standard non-suspicious academic/general communication"],
        "breakdown": {
            "leakClaimScore": min(30, score_claims),
            "fileLinkScore": min(25, score_files),
            "transactionScore": min(25, score_payment),
            "urgencyEvasionScore": min(20, score_urgency)
        }
    }

def analyze_text_nlp(text, requested_category="AUTO_DETECT"):
    text_lower = text.lower()

    drug_res = analyze_drug_trafficking(text_lower)
    exam_res = analyze_exam_leak(text_lower)

    if requested_category == "EXAM_LEAK":
        primary = exam_res
    elif requested_category == "DRUG_TRAFFICKING":
        primary = drug_res
    else:
        # AUTO_DETECT: Pick category with highest risk score, but include both in response
        primary = exam_res if exam_res["riskScore"] > drug_res["riskScore"] else drug_res

    res = {
        "text": text,
        "category": primary["category"],
        "riskScore": primary["riskScore"],
        "riskLevel": primary["riskLevel"],
        "confidence": primary["confidence"],
        "classification": "Potentially Suspicious / Requires Human Review",
        "detectionReasons": primary["detectionReasons"],
        "breakdown": primary["breakdown"],
        "categories": {
            "DRUG_TRAFFICKING": drug_res,
            "EXAM_LEAK": exam_res
        }
    }
    return res

def extract_entities_from_text(text):
    entities = []
    # Phone numbers
    phones = re.findall(r'(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})', text)
    for p in phones:
        entities.append({"type": "PHONE", "value": p, "confidence": 0.95})
    
    # Telegram handles
    handles = re.findall(r'(@[A-Za-z0-9_]{3,20})', text)
    for h in handles:
        entities.append({"type": "USERNAME", "value": h, "confidence": 0.92})

    # Crypto Wallets / Payment IDs
    wallets = re.findall(r'(0x[a-fA-F0-9]{40}|[13][a-km-zA-HJ-NP-Z1-9]{25,34}|T[A-Za-z0-9]{33}|[a-zA-Z0-9.\-_]+@[a-zA-Z]+)', text)
    for w in wallets:
        entities.append({"type": "WALLET_UPI", "value": w, "confidence": 0.96})

    # Cloud Links (Drive, Mega, Telegram channels)
    links = re.findall(r'(https?://[^\s]+|t\.me/[^\s]+|drive\.google\.com/[^\s]+|mega\.nz/[^\s]+)', text)
    for l in links:
        entities.append({"type": "SUSPICIOUS_LINK", "value": l, "confidence": 0.94})

    return entities

def rag_assistant_query(query, context_evidence):
    q_lower = query.lower()
    
    if "exam" in q_lower or "leak" in q_lower or "paper" in q_lower or "board" in q_lower:
        response = (
            "Based on intercepted messaging logs and AI Exam/Paper Leak analysis:\n\n"
            "• **Paper Leak Offers**: Coded offers for 'State Board Physics Set-A PDF' and 'University Chemistry Solved Paper' were identified.\n"
            "• **Payment & Distribution**: UPI payment requests (5000 INR per paper) linked to drive links (`drive.google.com/file/d/...`) and Telegram handles `@leak_master_2026`.\n"
            "• **Evidence References**: Supported by Evidence EVD-891 (State_Board_Physics_SetA.pdf) and EVD-892.\n\n"
            "*Note: AI generated summary. Requires human investigator review.*"
        )
    elif "summarize" in q_lower or "indicator" in q_lower or "suspicious" in q_lower:
        response = (
            "Based on multi-category intercepted messaging logs and AI analysis:\n\n"
            "• **Drug Trafficking Indicators**: Coded bulk quantity terms ('5 bricks', 'pure uncut', '20k USDT') in Case #2026-089.\n"
            "• **Exam Leak Indicators**: Question paper PDF scan offers ('Physics Set-A', '5000 INR via UPI') in Case #2026-EXM-001.\n"
            "• **Evidence References**: Supported by Evidence EVD-881 and EVD-891.\n\n"
            "*Note: AI generated summary. Requires human investigator review.*"
        )
    elif "entity" in q_lower or "connection" in q_lower or "connected" in q_lower:
        response = (
            "Network centrality analysis highlights top connected entities:\n\n"
            "1. **@leak_master_2026** (Exam Leak Ring Coordinator, Risk Score: 95/100) — Distributes Drive links & UPI payment handles.\n"
            "2. **@ghost_operator** (Drug Network Operator, Risk Score: 94/100) — Acts as bridge node between 3 sub-networks.\n"
            "3. **+1-555-0198** (Risk Score: 86/100) — Associated with 4 crypto wallet payouts.\n\n"
            "Supported by Evidence EVD-882 & EVD-892. *Human review required.*"
        )
    elif "evidence" in q_lower or "alert" in q_lower:
        response = (
            "Alert **ALT-EXM-9102** (Exam Leak Risk: 95/100 - HIGH) is supported by:\n\n"
            "• **EVD-891**: Telegram chat export containing exact PDF scan of State Board Physics Question Paper.\n"
            "• **EVD-892**: SHA-256 verified UPI transaction log and Drive link (`drive.google.com/file/d/ leak_2026`).\n"
            "• **Blockchain Integrity**: Hash verified on-chain at Block #1405."
        )
    else:
        response = (
            f"Regarding your query ('{query}'):\n\n"
            "The NARC-WARE AI Service scanned active evidence records across Drug Trafficking and Exam Leak categories. "
            "Primary findings indicate active threat indicators for both categories. "
            "All findings are classified as 'Potentially Suspicious / Requires Human Review'."
        )

    return {
        "query": query,
        "answer": response,
        "citedEvidenceIds": ["EVD-881", "EVD-882", "EVD-891", "EVD-892"],
        "classification": "Potentially Suspicious / Requires Human Review"
    }

class AIServiceHandler(BaseHTTPRequestHandler):
    def _send_json(self, data, status=200):
        self.send_response(status)
        self.send_header('Content-Type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()
        self.wfile.write(json.dumps(data).encode('utf-8'))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == '/health' or parsed.path == '/api/ai/health':
            self._send_json({"status": "UP", "service": "NARC-WARE AI Engine (Multi-Threat: Drug + Exam Leak)", "version": "2.0.0"})
        else:
            self._send_json({"error": "Not Found"}, 404)

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get('Content-Length', 0))
        body_bytes = self.rfile.read(content_length)
        
        try:
            body = json.loads(body_bytes.decode('utf-8')) if body_bytes else {}
        except Exception:
            body = {}

        if parsed.path == '/api/ai/analyze-message' or parsed.path == '/analyze-message':
            text = body.get('text', '')
            category = body.get('category', 'AUTO_DETECT')
            res = analyze_text_nlp(text, category)
            self._send_json(res)

        elif parsed.path == '/api/ai/extract-entities' or parsed.path == '/extract-entities':
            text = body.get('text', '')
            res = extract_entities_from_text(text)
            self._send_json({"entities": res})

        elif parsed.path == '/api/ai/assistant-rag' or parsed.path == '/assistant-rag':
            query = body.get('query', '')
            res = rag_assistant_query(query, body.get('context', []))
            self._send_json(res)

        else:
            self._send_json({"error": "Unknown AI Endpoint"}, 404)

def run_server(port=5000):
    server_address = ('', port)
    httpd = HTTPServer(server_address, AIServiceHandler)
    print(f"[NARC-WARE AI Service] Running on port {port} (Multi-Threat Engine: Drug + Exam Leak)...")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopping AI Service...")
        httpd.server_close()

if __name__ == '__main__':
    port = 5000
    if len(sys.argv) > 1:
        port = int(sys.argv[1])
    run_server(port)
