package com.narcware.service;

import com.narcware.model.*;
import com.narcware.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class DataSeedService implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CaseRepository caseRepository;

    @Autowired
    private EntityRepository entityRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private AlertRepository alertRepository;

    @Autowired
    private EvidenceRepository evidenceRepository;

    @Autowired
    private BlockchainBlockRepository blockRepository;

    @Autowired
    private AuditLogRepository auditLogRepository;

    @Autowired
    private BlockchainService blockchainService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() > 0) return; // Already seeded

        System.out.println("[NARC-WARE] Seeding synthetic multi-threat law-enforcement investigation demo data (Drug + Exam Leak)...");

        // 1. System Users
        String encodedPass = passwordEncoder.encode("Password123!");
        userRepository.save(new User("investigator1", encodedPass, "Agent Sarah Vance", "sarah.vance@narc-ware.gov", "BADGE-4891", "INVESTIGATOR"));
        userRepository.save(new User("senior_analyst", encodedPass, "Senior Analyst Marcus Cole", "marcus.cole@narc-ware.gov", "BADGE-1024", "SENIOR_ANALYST"));
        userRepository.save(new User("admin", encodedPass, "Director Elena Rostova", "elena.rostova@narc-ware.gov", "BADGE-0001", "ADMIN"));

        // 2. Cases — Category 1: Drug Trafficking Detection
        caseRepository.save(new CaseModel("CASE-2026-089", "Operation Midnight Wave", "Investigation into encrypted Telegram network operating bulk synthetic shipments across eastern port entry points.", "DRUG_TRAFFICKING", "ACTIVE", "HIGH", 88, "Agent Sarah Vance", "HIGH"));
        caseRepository.save(new CaseModel("CASE-2026-092", "Project Nexus Frost", "Cell tower analysis and cryptocurrency flow tracing targeting burner handle @phantom_vendor.", "DRUG_TRAFFICKING", "UNDER_REVIEW", "HIGH", 92, "Senior Analyst Marcus Cole", "HIGH"));
        caseRepository.save(new CaseModel("CASE-2026-104", "Operation Silk Phantom", "Cross-platform WhatsApp and Signal communication analysis involving dead drop coordinates.", "DRUG_TRAFFICKING", "NEW", "MEDIUM", 64, "Agent Sarah Vance", "MEDIUM"));
        caseRepository.save(new CaseModel("CASE-2026-118", "Project Cyber Anchor", "Financial ledger reconciliation matching USDT wallet deposits with intercepted package dispatch dates.", "DRUG_TRAFFICKING", "ESCALATED", "HIGH", 95, "Director Elena Rostova", "HIGH"));
        caseRepository.save(new CaseModel("CASE-2026-125", "Operation Shadow Grid", "Monitoring closed group chat 'DarkNet Logistics' for batch shipping code phrase occurrences.", "DRUG_TRAFFICKING", "CLOSED", "LOW", 24, "Agent Sarah Vance", "LOW"));

        // 2. Cases — Category 2: Exam / Paper Leak Detection
        caseRepository.save(new CaseModel("CASE-2026-EXM-001", "Operation Paper Guard", "Detection of unauthorized board examination question paper distribution networks on Telegram and drive sharing platforms.", "EXAM_LEAK", "ACTIVE", "HIGH", 94, "Senior Analyst Marcus Cole", "HIGH"));
        caseRepository.save(new CaseModel("CASE-2026-EXM-002", "Project Cyber Shield", "Tracing UPI payment handles and cloud drive download links offering leaked university entrance question sheets.", "EXAM_LEAK", "UNDER_REVIEW", "HIGH", 89, "Agent Sarah Vance", "HIGH"));
        caseRepository.save(new CaseModel("CASE-2026-EXM-003", "Operation Academic Integrity", "Monitoring paid VIP Telegram channels selling leaked answer keys and watermarked question paper scans.", "EXAM_LEAK", "NEW", "MEDIUM", 72, "Director Elena Rostova", "MEDIUM"));

        // 3. Suspect Entities — Drug Trafficking
        entityRepository.save(new EntityModel("Ghost Operator", "USERNAME", "@ghost_operator", 94, "HIGH", "CASE-2026-089", "High-volume coordinator, Multi-wallet proxy, Evasion tactics", 42, 12));
        entityRepository.save(new EntityModel("Phantom Vendor", "USERNAME", "@phantom_vendor", 91, "HIGH", "CASE-2026-092", "Bulk distributor, Coded pricing slang, Burner rotater", 38, 9));
        entityRepository.save(new EntityModel("Burner Cell +1-555-0198", "PHONE", "+1-555-0198", 86, "HIGH", "CASE-2026-089", "GPS tower anomaly, Drop site proximity, Burst SMS", 29, 6));
        entityRepository.save(new EntityModel("USDT Escrow Wallet", "WALLET", "0x71C7656EC7ab88b098defB751B7401B5f6d89A2", 89, "HIGH", "CASE-2026-118", "Rapid layering, Tumbler interactions, High volume cash-out", 15, 18));
        entityRepository.save(new EntityModel("Dock Courier Alias 'Jackal'", "ALIAS", "Jackal", 76, "MEDIUM", "CASE-2026-104", "Physical handover suspect, Port access credential holder", 22, 5));

        // 3. Suspect Entities — Exam Leak Detection
        entityRepository.save(new EntityModel("Exam Leak Master Ring", "USERNAME", "@leak_master_2026", 96, "HIGH", "CASE-2026-EXM-001", "Primary paper distributor, Private Telegram channel admin, Auto-delete timer enabled", 54, 16));
        entityRepository.save(new EntityModel("Paper Leak UPI Receiver", "WALLET_UPI", "paper_leak_admin@upi", 92, "HIGH", "CASE-2026-EXM-001", "Advance payment handle, 5000 INR per paper quote, GPay/PhonePe receiver", 31, 11));
        entityRepository.save(new EntityModel("Leaked Drive Folder Link", "SUSPICIOUS_LINK", "drive.google.com/file/d/leak_physics_setA", 88, "HIGH", "CASE-2026-EXM-001", "Scanned question paper PDF download, Restricted link distribution", 19, 8));
        entityRepository.save(new EntityModel("Answer Key Broker", "USERNAME", "@topper_answer_keys", 81, "MEDIUM", "CASE-2026-EXM-002", "Offers solved question sheets, Watermarked photos, Payment screenshot required", 26, 7));

        // 4. Intercepted Messaging Logs — Drug Trafficking
        messageRepository.save(new MessageModel("CONV-7891", "@ghost_operator", "+1-555-0198", "TELEGRAM", "DRUG_TRAFFICKING", "Need 5 bricks dropped at the north dock locker by midnight. Send 20k USDT to escrow first.", 92, true, "CASE-2026-089"));
        messageRepository.save(new MessageModel("CONV-7891", "+1-555-0198", "@ghost_operator", "TELEGRAM", "DRUG_TRAFFICKING", "Tx sent: 0x71C7656EC7ab88b098defB751B7401B5f6d89A2. Key is inside blue baggie under locker 4.", 88, true, "CASE-2026-089"));
        messageRepository.save(new MessageModel("CONV-8802", "@phantom_vendor", "Jackal", "WHATSAPP", "DRUG_TRAFFICKING", "Package is pure uncut. Switch to Signal app immediately and clear this chat.", 85, true, "CASE-2026-092"));

        // 4. Intercepted Messaging Logs — Exam Leak Detection
        messageRepository.save(new MessageModel("CONV-EXM-101", "@leak_master_2026", "@student_buyer_99", "TELEGRAM", "EXAM_LEAK", "State Board Physics Set-A original question paper PDF available now. 5000 INR per paper via UPI: paper_leak_admin@upi. Pay and send payment screenshot for Drive link.", 95, true, "CASE-2026-EXM-001"));
        messageRepository.save(new MessageModel("CONV-EXM-101", "@student_buyer_99", "@leak_master_2026", "TELEGRAM", "EXAM_LEAK", "Payment screenshot sent to GPay. Please send the drive link for Chemistry Set-B solved answer key before tomorrow morning 06:00 AM.", 91, true, "CASE-2026-EXM-001"));
        messageRepository.save(new MessageModel("CONV-EXM-102", "@topper_answer_keys", "+1-555-0199", "WHATSAPP", "EXAM_LEAK", "100% real leaked paper scan copy with watermarked answer sheet. Drive link: drive.google.com/file/d/leak_physics_setA. Message self-destruct timer set to 10 minutes.", 89, true, "CASE-2026-EXM-002"));

        // 5. AI Alerts — Drug Trafficking
        alertRepository.save(new AlertModel("ALT-9042", "CASE-2026-089", "DRUG_TRAFFICKING", 92, "HIGH", 94.8, "Coded quantity slang ('5 bricks'), price reference ('20k USDT'), and dead drop location phrase detected.", "@ghost_operator, +1-555-0198", "NEW"));
        alertRepository.save(new AlertModel("ALT-9045", "CASE-2026-092", "DRUG_TRAFFICKING", 87, "HIGH", 91.2, "Communication evasion indicator ('switch app', 'clear chat') coupled with purity claims ('pure uncut').", "@phantom_vendor, Jackal", "UNDER_REVIEW"));

        // 5. AI Alerts — Exam Leak Detection
        alertRepository.save(new AlertModel("ALT-EXM-9102", "CASE-2026-EXM-001", "EXAM_LEAK", 95, "HIGH", 96.5, "Original question paper leak offer ('State Board Physics Set-A PDF'), price quote ('5000 INR'), and UPI transaction handle ('paper_leak_admin@upi') detected.", "@leak_master_2026, paper_leak_admin@upi", "NEW"));
        alertRepository.save(new AlertModel("ALT-EXM-9106", "CASE-2026-EXM-002", "EXAM_LEAK", 89, "HIGH", 92.4, "Scanned paper PDF download link ('drive.google.com/file/d/leak_physics_setA') coupled with self-destruct timer evasion marker.", "@topper_answer_keys, +1-555-0199", "UNDER_REVIEW"));

        // 6. Blockchain & Evidence Records
        EvidenceModel ev1 = evidenceRepository.save(new EvidenceModel("EVD-881", "CASE-2026-089", "Telegram_Export_Conv7891.json", "TELEGRAM_EXPORT", "JSON", "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", 1048576, "VERIFIED_ON_CHAIN", 1L, "[{\"action\":\"UPLOAD\",\"by\":\"Agent Sarah Vance\",\"time\":\"2026-08-28T10:15:00Z\"}]"));
        EvidenceModel ev2 = evidenceRepository.save(new EvidenceModel("EVD-882", "CASE-2026-092", "CellTower_Dump_NorthDock.csv", "CELL_TOWER_METADATA", "CSV", "8f4e5d6c7b8a90123456789abcdef0123456789abcdef0123456789abcdef012", 2097152, "VERIFIED_ON_CHAIN", 2L, "[{\"action\":\"UPLOAD\",\"by\":\"Senior Analyst Marcus Cole\",\"time\":\"2026-08-28T11:20:00Z\"}]"));

        // Exam Leak Evidence Records
        EvidenceModel ev3 = evidenceRepository.save(new EvidenceModel("EVD-891", "CASE-2026-EXM-001", "State_Board_Physics_SetA.pdf", "QUESTION_PAPER_SCAN", "PDF", "3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b", 3145728, "VERIFIED_ON_CHAIN", 3L, "[{\"action\":\"UPLOAD\",\"by\":\"Senior Analyst Marcus Cole\",\"time\":\"2026-09-03T09:30:00Z\"}]"));
        EvidenceModel ev4 = evidenceRepository.save(new EvidenceModel("EVD-892", "CASE-2026-EXM-001", "UPI_Payment_Transaction_Logs.csv", "FINANCIAL_RECEIPT", "CSV", "5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d", 1572864, "VERIFIED_ON_CHAIN", 4L, "[{\"action\":\"UPLOAD\",\"by\":\"Agent Sarah Vance\",\"time\":\"2026-09-03T10:45:00Z\"}]"));

        // Mint Blocks in Local Blockchain Ledger
        blockchainService.mintBlock("EVD-881", ev1.getSha256Hash(), "BADGE-4891");
        blockchainService.mintBlock("EVD-882", ev2.getSha256Hash(), "BADGE-1024");
        blockchainService.mintBlock("EVD-891", ev3.getSha256Hash(), "BADGE-1024");
        blockchainService.mintBlock("EVD-892", ev4.getSha256Hash(), "BADGE-4891");

        // 7. Audit Trail Logs
        auditLogRepository.save(new AuditLogModel("investigator1", "INVESTIGATOR", "LOGIN", "SYSTEM", "User authenticated with MFA badge verification.", "192.168.1.104"));
        auditLogRepository.save(new AuditLogModel("senior_analyst", "SENIOR_ANALYST", "EXAM_LEAK_ANALYSIS", "EVD-891", "Performed multi-signal NLP risk analysis on State_Board_Physics_SetA.pdf payload.", "192.168.1.108"));
        auditLogRepository.save(new AuditLogModel("senior_analyst", "SENIOR_ANALYST", "HASH_VERIFY", "EVD-891", "Performed live blockchain cryptographic SHA-256 integrity verification.", "192.168.1.108"));

        System.out.println("[NARC-WARE] Seed completed successfully with Multi-Threat synthetic datasets!");
    }
}
