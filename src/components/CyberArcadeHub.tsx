import React, { useState, useEffect } from 'react';
import { 
  Gamepad2, 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Mail, 
  MailWarning, 
  Database, 
  Server, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Sparkles, 
  Flame, 
  Award, 
  ArrowRight, 
  RotateCcw, 
  Lock, 
  Unlock, 
  Eye, 
  Terminal, 
  Wifi, 
  Zap, 
  Layers, 
  Code2, 
  HelpCircle,
  ChevronDown,
  ExternalLink,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CertificateModal } from './CertificateModal';
import type { Expert, ActiveUser } from '../types';

interface CyberArcadeHubProps {
  currentUser: ActiveUser;
  experts: Expert[];
  onBookTutor: (expert: Expert) => void;
}

export const CyberArcadeHub: React.FC<CyberArcadeHubProps> = ({
  currentUser,
  experts,
  onBookTutor,
}) => {
  // Navigation between Arcade Tabs
  const [activeGame, setActiveGame] = useState<'phishing' | 'firewall' | 'sqli'>('phishing');

  // Gamification stats
  const [arcadeXP, setArcadeXP] = useState<number>(() => {
    const saved = localStorage.getItem('cyhub_arcade_xp');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [streak, setStreak] = useState<number>(0);
  const [completedGames, setCompletedGames] = useState<{ phishing: boolean; firewall: boolean; sqli: boolean }>({
    phishing: false,
    firewall: false,
    sqli: false,
  });

  const [certificateModalOpen, setCertificateModalOpen] = useState<boolean>(false);

  // Sync XP to localStorage
  useEffect(() => {
    localStorage.setItem('cyhub_arcade_xp', arcadeXP.toString());
  }, [arcadeXP]);

  const addXP = (amount: number) => {
    const multiplier = streak >= 3 ? 2 : streak >= 1 ? 1.5 : 1;
    const finalEarned = Math.round(amount * multiplier);
    setArcadeXP((prev) => {
      const nextXP = prev + finalEarned;
      if (nextXP >= 300 && prev < 300) {
        // Trigger celebration and offer certificate
        try {
          confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
        } catch (e) {}
      }
      return nextXP;
    });
    setStreak((prev) => prev + 1);
  };

  const resetStreak = () => {
    setStreak(0);
  };

  /* =======================================================================
     GAME TAB 1: PHISH CATCHER (Social Engineering Triage)
     ======================================================================= */
  const phishingScenarios = [
    {
      id: 1,
      senderName: 'PayPal Security Operations',
      senderEmail: 'security-notice@paypa1-support.com', // Typosquatting (digit 1)
      replyTo: 'recovery-vault892@suspicious-mx.ru',
      subject: '[URGENT] Account Suspension Warning: Action Required within 12 Hours',
      date: 'Today, 09:14 AM',
      body: `Dear Valued Merchant,\n\nOur automated intrusion detection system intercepted an unauthorized API session originating from IP address 185.220.101.4 (Moscow, RU) attempting to execute payments through your linked gateway.\n\nTo safeguard your funds, your settlement account has been provisionally placed on restricted status. You must verify identity credentials and acknowledge the incident report within 12 hours or account liquidation procedures will initiate.`,
      linkText: 'https://www.paypal.com/signin/verify-settlement',
      trueDestination: 'http://192.168.1.45/harvest.php?creds=stealer',
      protocolInfo: 'HTTP (UNENCRYPTED RAW IP)',
      attachment: {
        name: 'Dispute_Case_#884192.pdf.exe',
        size: '1.4 MB',
        isSuspicious: true,
      },
      headers: [
        'Return-Path: <bounce@paypa1-support.com>',
        'Authentication-Results: spf=softfail (sender IP not in SPF record) smtp.mailfrom=paypa1-support.com',
        'DKIM-Signature: NONE (Unsigned message body)',
        'X-Originating-IP: [185.220.101.4]',
        'Reply-To: recovery-vault892@suspicious-mx.ru',
      ],
      isPhishing: true,
      iocs: [
        'Typosquatting domain: "paypa1-support.com" uses digit "1" instead of letter "l"',
        'Mismatched Reply-To header points to an untrusted external server (@suspicious-mx.ru)',
        'Dangerous double extension: ".pdf.exe" disguises a Windows executable payload',
        'Deceptive hyperlink: Display text says paypal.com, but destination redirects to raw HTTP IP harvester',
        'High-pressure artificial urgency: Threats of account liquidation within 12 hours',
      ],
    },
    {
      id: 2,
      senderName: 'GitHub Notifications',
      senderEmail: 'notifications@github.com',
      replyTo: 'noreply@github.com',
      subject: '[GitHub] A new personal access token (classic) was generated',
      date: 'Yesterday, 16:42 PM',
      body: `Hey developer,\n\nA new personal access token (classic) was recently generated on your account:\n\n• Token Name: CI_CD_DEPLOY_KEY\n• Scopes: repo, workflow\n• Device: Chrome on macOS (IP: 198.51.100.22 - Seattle, WA)\n\nIf you generated this token, you can safely disregard this email. If you did not generate this key, revoke it immediately via your developer settings.`,
      linkText: 'https://github.com/settings/tokens',
      trueDestination: 'https://github.com/settings/tokens',
      protocolInfo: 'HTTPS (TLS 1.3 Verified GitHub Inc.)',
      attachment: null,
      headers: [
        'Return-Path: <noreply@github.com>',
        'Authentication-Results: spf=pass smtp.mailfrom=github.com; dkim=pass header.i=@github.com',
        'DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=github.com',
        'X-GitHub-Sender: notifications@github.com',
        'Reply-To: noreply@github.com',
      ],
      isPhishing: false,
      iocs: [
        'SPF and DKIM cryptographic signatures both evaluated to PASS from official @github.com',
        'Link destination perfectly matches anchor text: https://github.com/settings/tokens',
        'No malicious attachments, extortion language, or credential harvesting forms',
        'Standard informational audit notification following common security best practices',
      ],
    },
    {
      id: 3,
      senderName: 'Intuit QuickBooks Billing',
      senderEmail: 'quickbooks-invoice@intuit-accounts-portal.net',
      replyTo: 'wire-transfer-office@billing-forwarder.xyz',
      subject: 'OVERDUE INVOICE #QB-90214 - Immediate Remittance Required',
      date: '2 hours ago',
      body: `ATTENTION: ACCOUNTS PAYABLE / CONTROLLER\n\nYour quarterly subscription and enterprise payroll services invoice #QB-90214 ($14,850.00) remains unresolved after multiple attempts.\n\nFailure to remit payment within 24 hours will result in automatic reporting to Dun & Bradstreet commercial credit bureaus and immediate cessation of merchant processing.\n\nReview the itemized invoice breakdown in the attached remittance file or settle via the encrypted portal link below.`,
      linkText: 'https://quickbooks.intuit.com/pay/QB90214',
      trueDestination: 'http://malware-c2-dropzone.biz/ransom_loader.scr',
      protocolInfo: 'HTTP (KNOWN C2 MALWARE DROPZONE)',
      attachment: {
        name: 'Invoice_QB90214_Remittance.scr',
        size: '890 KB',
        isSuspicious: true,
      },
      headers: [
        'Return-Path: <drop@billing-forwarder.xyz>',
        'Authentication-Results: spf=neutral; dkim=none',
        'X-Mailer: PHPMailer 6.1.4 (automated script)',
        'Reply-To: wire-transfer-office@billing-forwarder.xyz',
      ],
      isPhishing: true,
      iocs: [
        'Impersonation domain: "intuit-accounts-portal.net" is an unverified lookalike domain',
        'Dangerous .scr attachment: Windows screen saver executable used by BlackCat/LockBit ransomware',
        'Reply-To redirection to rogue forwarder: @billing-forwarder.xyz',
        'Hyperlink masquerading: Displays legitimate intuit link but points to malware dropzone',
        'Hostile financial intimidation: Threats of credit damage to induce panicky compliance',
      ],
    },
  ];

  const [currentScenarioIndex, setCurrentScenarioIndex] = useState<number>(0);
  const [showHeaders, setShowHeaders] = useState<boolean>(false);
  const [urlTooltipActive, setUrlTooltipActive] = useState<boolean>(false);
  const [phishVerdict, setPhishVerdict] = useState<'correct' | 'incorrect' | null>(null);
  const [userChoice, setUserChoice] = useState<'safe' | 'phish' | null>(null);

  const activeEmail = phishingScenarios[currentScenarioIndex];

  const handlePhishDecision = (choice: 'safe' | 'phish') => {
    setUserChoice(choice);
    const isCorrect = (choice === 'phish' && activeEmail.isPhishing) || (choice === 'safe' && !activeEmail.isPhishing);

    if (isCorrect) {
      setPhishVerdict('correct');
      addXP(100);
      try {
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      } catch (e) {}
    } else {
      setPhishVerdict('incorrect');
      resetStreak();
    }
  };

  const handleNextEmail = () => {
    setPhishVerdict(null);
    setUserChoice(null);
    setShowHeaders(false);
    setUrlTooltipActive(false);
    if (currentScenarioIndex < phishingScenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
    } else {
      setCurrentScenarioIndex(0);
      setCompletedGames((prev) => ({ ...prev, phishing: true }));
    }
  };

  /* =======================================================================
     GAME TAB 2: FIREWALL DEFENDER (Perimeter Security)
     ======================================================================= */
  const firewallPackets = [
    {
      id: 1,
      sourceIp: '45.33.32.156',
      protocol: 'TCP',
      destPort: 443,
      service: 'HTTPS',
      payload: 'TLS 1.3 ClientHello / Valid HTTPS Customer Checkout Handshake',
      isHostile: false,
      reason: 'Port 443 HTTPS is the standard encrypted web port required for customer transactions.',
    },
    {
      id: 2,
      sourceIp: '185.220.101.5',
      protocol: 'TCP',
      destPort: 3389,
      service: 'RDP (Remote Desktop)',
      payload: 'RDP Connection Request - NLA bypass probe & dictionary login attempt',
      isHostile: true,
      reason: 'Exposing WAN RDP (Port 3389) directly to the internet is the #1 vector for small business ransomware.',
    },
    {
      id: 3,
      sourceIp: '198.51.100.4',
      protocol: 'TCP',
      destPort: 22,
      service: 'SSH',
      payload: 'SSH-2.0-libssh automated password spray targeting user "root"',
      isHostile: true,
      reason: 'Public SSH ports attract automated brute force bots. Administrative access must be restricted to a VPN.',
    },
    {
      id: 4,
      sourceIp: '66.249.66.1',
      protocol: 'TCP',
      destPort: 80,
      service: 'HTTP',
      payload: 'GET /robots.txt HTTP/1.1 - Legitimate Googlebot search engine crawler',
      isHostile: false,
      reason: 'Standard HTTP web traffic on Port 80 is legitimate and should redirect to HTTPS.',
    },
    {
      id: 5,
      sourceIp: '192.168.1.105',
      protocol: 'TCP',
      destPort: 21,
      service: 'FTP (Cleartext)',
      payload: 'USER anonymous / PASS null - Insecure unencrypted FTP authentication probe',
      isHostile: true,
      reason: 'Cleartext FTP transmits passwords and data in plain text, vulnerable to eavesdropping and data theft.',
    },
    {
      id: 6,
      sourceIp: '103.21.244.2',
      protocol: 'TCP',
      destPort: 445,
      service: 'SMB',
      payload: 'SMB_COM_TRANSACTION2 - EternalBlue (MS17-010) remote exploit scan',
      isHostile: true,
      reason: 'Port 445 SMB should NEVER be reachable from the internet. Exposing it leads to wormable ransomware spread.',
    },
  ];

  const [packetIndex, setPacketIndex] = useState<number>(0);
  const [serverHealth, setServerHealth] = useState<number>(100);
  const [firewallScore, setFirewallScore] = useState<number>(0);
  const [lastFirewallAction, setLastFirewallAction] = useState<{
    correct: boolean;
    message: string;
    packetDesc: string;
  } | null>(null);

  const activePacket = firewallPackets[packetIndex % firewallPackets.length];

  const handlePacketAction = (action: 'allow' | 'drop') => {
    if (serverHealth <= 0) return;

    const isCorrect = (action === 'allow' && !activePacket.isHostile) || (action === 'drop' && activePacket.isHostile);

    if (isCorrect) {
      addXP(50);
      setFirewallScore((prev) => prev + 50);
      setLastFirewallAction({
        correct: true,
        message: action === 'drop' ? 'THREAT DROPPED SUCCESSFULLY' : 'LEGITIMATE TRAFFIC PERMITTED',
        packetDesc: activePacket.reason,
      });
    } else {
      resetStreak();
      const newHealth = Math.max(0, serverHealth - 35);
      setServerHealth(newHealth);
      setLastFirewallAction({
        correct: false,
        message: activePacket.isHostile ? 'BREACH! MALICIOUS PACKET ALLOWED' : 'SERVICE OUTAGE! VALID TRAFFIC DROPPED',
        packetDesc: activePacket.reason,
      });
    }

    // Advance to next packet
    setPacketIndex((prev) => prev + 1);
    if (packetIndex >= 4) {
      setCompletedGames((prev) => ({ ...prev, firewall: true }));
    }
  };

  const handleResetFirewall = () => {
    setServerHealth(100);
    setFirewallScore(0);
    setLastFirewallAction(null);
  };

  /* =======================================================================
     GAME TAB 3: SQL INJECTION CRACKER & REMEDIATION
     ======================================================================= */
  const [sqliUsername, setSqliUsername] = useState<string>('');
  const [sqliPassword, setSqliPassword] = useState<string>('');
  const [isPatchedMode, setIsPatchedMode] = useState<boolean>(false);
  const [sqliResult, setSqliResult] = useState<{
    status: 'success' | 'blocked' | 'invalid' | null;
    message: string;
    leakedData?: { id: number; username: string; role: string; email: string; token: string }[];
  }>({ status: null, message: '' });

  const handleExecuteSqli = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if input contains SQL injection triggers
    const hasSqliPattern = 
      sqliUsername.includes("' OR") || 
      sqliUsername.includes("' or") || 
      sqliUsername.includes("'--") || 
      sqliUsername.includes("1=1") || 
      sqliUsername.includes("admin'");

    if (isPatchedMode) {
      // Prepared Statements Mode: Sanitized
      setSqliResult({
        status: 'blocked',
        message: 'LOGIN REJECTED: Prepared statements treated your entire payload strictly as an inert string literal. Zero SQL syntax was broken.',
      });
      addXP(75);
      setCompletedGames((prev) => ({ ...prev, sqli: true }));
    } else {
      // Vulnerable Mode: Raw concatenation
      if (hasSqliPattern) {
        addXP(100);
        setCompletedGames((prev) => ({ ...prev, sqli: true }));
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch (e) {}

        setSqliResult({
          status: 'success',
          message: 'AUTHENTICATION BYPASS SUCCESSFUL! SQL statement evaluated to TRUE (1=1). Administrative session hijacked!',
          leakedData: [
            { id: 1, username: 'admin', role: 'SUPERUSER', email: 'ciso@cyhub.internal', token: 'sec_live_9941a8fe72' },
            { id: 2, username: 'treasury', role: 'FINANCE_LEAD', email: 'cfo@cyhub.internal', token: 'sec_live_5510bb129c' },
            { id: 3, username: 'devops_deploy', role: 'CI_CD_SERVICE', email: 'infra@cyhub.internal', token: 'sec_live_3389cd4001' },
          ],
        });
      } else if (sqliUsername === 'admin' && sqliPassword === 'P@ssword2026!') {
        setSqliResult({
          status: 'success',
          message: 'Valid credentials supplied. Session authenticated normally.',
        });
      } else {
        setSqliResult({
          status: 'invalid',
          message: 'Invalid credentials. Try entering a SQL injection payload like "\' OR 1=1 --" to test the bypass.',
        });
      }
    }
  };

  const handleFillPayload = (payload: string) => {
    setSqliUsername(payload);
    setSqliPassword('any_random_pass');
  };

  return (
    <section id="arcade" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-200">
      {/* Section Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 uppercase tracking-wider font-bold">
            <Gamepad2 className="w-4 h-4 text-emerald-700" />
            <span>Interactive Labs • Cyber Arcade</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1 font-heading">
            Gamified Cyber Defense Simulator
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Sharpen practical cybersecurity instincts. Triage spear-phishing emails with raw header inspection, defend server perimeters from active port scans, and test SQL injection authentication bypass with zero cloud fees.
          </p>
        </div>

        {/* Live Score & Credential Claim Widget */}
        <div className="flex flex-wrap items-center gap-3 bg-white border border-slate-200 p-3 rounded-xl shadow-sm">
          {/* XP Gauge */}
          <div className="flex items-center gap-2 px-2">
            <div className="p-1.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Score</div>
              <div className="text-base font-mono font-bold text-slate-900">{arcadeXP} XP</div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200"></div>

          {/* Streak Multiplier */}
          <div className="flex items-center gap-2 px-2">
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200">
              <Flame className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-slate-500 uppercase font-semibold">Streak</div>
              <div className="text-base font-mono font-bold text-rose-700">
                {streak}x <span className="text-[10px] text-slate-400 font-normal">({streak >= 3 ? '2x' : streak >= 1 ? '1.5x' : '1x'})</span>
              </div>
            </div>
          </div>

          <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

          {/* Claim Certificate CTA */}
          <button
            onClick={() => setCertificateModalOpen(true)}
            className={`px-3.5 py-2 rounded-lg font-bold text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
              arcadeXP >= 300
                ? 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
                : 'bg-slate-100 text-slate-500 border border-slate-200 hover:text-slate-800'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>{arcadeXP >= 300 ? 'Claim Verified Certificate 🎓' : 'Certificate (300 XP Req)'}</span>
          </button>
        </div>
      </div>

      {/* Game Selector Tabs */}
      <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveGame('phishing')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeGame === 'phishing'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <MailWarning className="w-4 h-4 text-rose-500" />
          <span>Lab 1: Phish Catcher</span>
          {completedGames.phishing && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
        </button>

        <button
          onClick={() => setActiveGame('firewall')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeGame === 'firewall'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Shield className="w-4 h-4 text-emerald-500" />
          <span>Lab 2: Firewall Defender</span>
          {completedGames.firewall && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
        </button>

        <button
          onClick={() => setActiveGame('sqli')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
            activeGame === 'sqli'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <Database className="w-4 h-4 text-sky-500" />
          <span>Lab 3: SQLi Sandbox & Fix</span>
          {completedGames.sqli && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 ml-1" />}
        </button>
      </div>

      {/* =======================================================================
          TAB 1: PHISH CATCHER
          ======================================================================= */}
      {activeGame === 'phishing' && (
        <div className="mt-8 space-y-6">
          {/* Game Description & Scenario Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <MailWarning className="w-4 h-4 text-rose-600" />
                Phish Catcher: Corporate Email Triage Simulator
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Inspect sender domains for typosquatting, hover over links to inspect true destinations, and detect malicious payload attachments.
              </p>
            </div>

            {/* Scenario Switcher Dots */}
            <div className="flex items-center gap-2 self-start sm:self-center font-mono text-xs">
              <span className="text-slate-500 mr-1">Scenario:</span>
              {phishingScenarios.map((s, idx) => (
                <button
                  key={s.id}
                  onClick={() => {
                    setCurrentScenarioIndex(idx);
                    setPhishVerdict(null);
                    setUserChoice(null);
                    setShowHeaders(false);
                    setUrlTooltipActive(false);
                  }}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    currentScenarioIndex === idx
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                  }`}
                >
                  #{idx + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Corporate Webmail Client Interface */}
          <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
            {/* Email Client Header Bar */}
            <div className="bg-slate-100 px-5 py-3 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                <span className="text-xs font-mono text-slate-700 ml-2 font-semibold">
                  Corporate Mail Guard • Inbox [Scenario {currentScenarioIndex + 1} of 3]
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs font-mono text-slate-500">
                <span className="text-emerald-700 flex items-center gap-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Header Inspection Active
                </span>
              </div>
            </div>

            {/* Email View Pane */}
            <div className="p-6 sm:p-8 space-y-6">
              {/* Subject Line */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading">
                  {activeEmail.subject}
                </h3>
              </div>

              {/* Sender & Header Summary Box */}
              <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono">From:</span>
                      <strong className="text-slate-900">{activeEmail.senderName}</strong>
                      <span className="text-sky-800 font-mono font-semibold">&lt;{activeEmail.senderEmail}&gt;</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="font-mono">To:</span>
                      <span className="font-mono text-slate-700">employee_inbox@yourcompany.com</span>
                      <span>•</span>
                      <span className="font-mono">{activeEmail.date}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowHeaders(!showHeaders)}
                    className="self-start sm:self-center px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 font-mono text-[11px] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Info className="w-3.5 h-3.5 text-slate-500" />
                    <span>{showHeaders ? 'Hide Full Headers' : 'Inspect Raw Headers'}</span>
                    <ChevronDown className={`w-3 h-3 transition-transform ${showHeaders ? 'rotate-180' : ''}`} />
                  </button>
                </div>

                {/* Collapsible Raw Email Headers */}
                {showHeaders && (
                  <div className="mt-3 pt-3 border-t border-slate-200 font-mono text-[11px] text-slate-200 bg-slate-900 p-3 rounded-lg space-y-1">
                    <div className="text-sky-400 font-bold mb-1">=== RAW RFC 822 HEADERS ===</div>
                    {activeEmail.headers.map((h, i) => (
                      <div key={i} className="text-slate-300">{h}</div>
                    ))}
                  </div>
                )}
              </div>

              {/* Email Message Content Body */}
              <div className="p-5 rounded-lg bg-slate-50/60 border border-slate-200 text-slate-800 text-sm whitespace-pre-line leading-relaxed font-sans">
                {activeEmail.body}

                {/* Embedded Link with Hoverable URL Inspector */}
                <div className="mt-5 p-3 rounded-lg bg-white border border-slate-200 shadow-2xs">
                  <div className="text-xs font-mono text-slate-500 mb-1 flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-600" />
                    <span>Action Link in Email (Hover to inspect destination):</span>
                  </div>

                  <div className="relative inline-block">
                    <a
                      href="#inspect"
                      onClick={(e) => e.preventDefault()}
                      onMouseEnter={() => setUrlTooltipActive(true)}
                      onMouseLeave={() => setUrlTooltipActive(false)}
                      className="text-sky-700 underline font-semibold text-xs hover:text-sky-800 cursor-help"
                    >
                      {activeEmail.linkText}
                    </a>

                    {/* Interactive URL Inspector Tooltip */}
                    {urlTooltipActive && (
                      <div className="absolute left-0 bottom-full mb-2 w-80 p-3 rounded-xl bg-slate-900 text-white shadow-xl z-30 text-xs font-mono space-y-1">
                        <div className="flex items-center justify-between text-[10px] uppercase font-bold text-slate-400">
                          <span>URL Sandbox Inspector</span>
                          <span className={activeEmail.isPhishing ? 'text-rose-400' : 'text-emerald-400'}>
                            {activeEmail.isPhishing ? '⚠️ Malicious' : '✓ Legitimate'}
                          </span>
                        </div>
                        <div className="text-slate-100 break-all font-mono">
                          <span className="text-slate-400">Destination: </span>
                          <span className={activeEmail.isPhishing ? 'text-rose-300 font-bold' : 'text-emerald-300 font-bold'}>
                            {activeEmail.trueDestination}
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 pt-0.5">
                          Protocol: <span className="text-slate-200">{activeEmail.protocolInfo}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Email Attachment Section (If present) */}
                {activeEmail.attachment && (
                  <div className="mt-4 p-3 rounded-lg bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-rose-50 text-rose-700 font-mono text-xs font-bold border border-rose-200">
                        {activeEmail.attachment.name.split('.').pop()?.toUpperCase()}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900 font-mono flex items-center gap-1.5">
                          {activeEmail.attachment.name}
                          {activeEmail.attachment.isSuspicious && (
                            <span className="text-[10px] text-rose-700 bg-rose-50 border border-rose-200 px-1.5 rounded font-semibold">
                              Double Extension (.exe)!
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500 font-mono">{activeEmail.attachment.size}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Triage Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
                <span className="text-xs font-mono text-slate-600">
                  Select your security verdict for this communication:
                </span>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    disabled={phishVerdict !== null}
                    onClick={() => handlePhishDecision('safe')}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      userChoice === 'safe'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-emerald-700 border border-emerald-300'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Mark as Safe</span>
                  </button>

                  <button
                    disabled={phishVerdict !== null}
                    onClick={() => handlePhishDecision('phish')}
                    className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      userChoice === 'phish'
                        ? 'bg-rose-600 text-white shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-rose-700 border border-rose-300'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>Report Phishing</span>
                  </button>
                </div>
              </div>

              {/* Instant Feedback Banner & IoCs Breakdown */}
              {phishVerdict && (
                <div className={`p-4 rounded-xl border space-y-2.5 ${
                  phishVerdict === 'correct'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {phishVerdict === 'correct' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                      <h4 className="text-xs sm:text-sm font-bold font-mono">
                        {phishVerdict === 'correct' 
                          ? `CORRECT DECISION! +100 XP (Streak: ${streak}x)`
                          : 'INCORRECT EVALUATION! Review the Indicators of Compromise below:'}
                      </h4>
                    </div>

                    <button
                      onClick={handleNextEmail}
                      className="px-3 py-1 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-mono font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>Next Scenario</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Bulleted Indicators of Compromise (IoCs) */}
                  <div className="text-xs space-y-1 pt-1">
                    <div className="font-mono uppercase font-bold text-slate-700 text-[11px]">
                      Security Analysis & Indicators of Compromise (IoCs):
                    </div>
                    {activeEmail.iocs.map((ioc, i) => (
                      <div key={i} className="flex items-start gap-1.5 text-slate-700 text-xs">
                        <span className="text-slate-400">•</span>
                        <span>{ioc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          TAB 2: FIREWALL DEFENDER
          ======================================================================= */}
      {activeGame === 'firewall' && (
        <div className="mt-8 space-y-6">
          {/* Top Status & Server Health Gauge */}
          <div className="p-5 rounded-xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  Firewall Defender: DMZ Perimeter Filtering
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inspect incoming ingress packets targeting Web Server (<code className="text-slate-800 font-semibold font-mono">192.168.10.50</code>). Permit legitimate HTTPS/SSH traffic and drop malicious external RDP (3389) and FTP (21) packets.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-[10px] font-mono text-slate-500 uppercase">Packets Triaged</div>
                  <div className="text-sm font-mono font-bold text-slate-900">{packetIndex} Processed</div>
                </div>
                <button
                  onClick={handleResetFirewall}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 cursor-pointer"
                  title="Reset Server Health"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Server Health Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-slate-700 flex items-center gap-1.5">
                  <Server className="w-4 h-4 text-slate-500" />
                  DMZ Server Health:
                </span>
                <span className={`font-bold ${
                  serverHealth > 50 ? 'text-emerald-700' : serverHealth > 20 ? 'text-amber-700' : 'text-rose-700'
                }`}>
                  {serverHealth}% {serverHealth <= 0 ? '(SERVER BREACHED)' : serverHealth === 100 ? '(OPTIMAL)' : '(DEGRADED)'}
                </span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    serverHealth > 50 
                      ? 'bg-emerald-600' 
                      : serverHealth > 20 
                      ? 'bg-amber-500' 
                      : 'bg-rose-600'
                  }`}
                  style={{ width: `${serverHealth}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Active Packet Inspection Card */}
          {serverHealth <= 0 ? (
            <div className="p-8 rounded-xl bg-rose-50 border border-rose-200 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
                <ShieldAlert className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">DMZ Server Compromised!</h4>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Malicious traffic breached the perimeter firewall, causing critical services to fail. Click below to reboot the firewall rules and retry.
              </p>
              <button
                onClick={handleResetFirewall}
                className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs font-mono cursor-pointer"
              >
                Reboot Firewall & Retry
              </button>
            </div>
          ) : (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-600"></span>
                  <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider">
                    Ingress Packet #{packetIndex + 1}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-500">
                  Target: <strong className="text-slate-800 font-mono">192.168.10.50 (DMZ)</strong>
                </div>
              </div>

              {/* Packet Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase">Source IP</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{activePacket.sourceIp}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase">Protocol</div>
                  <div className="text-xs font-bold text-sky-700 mt-0.5">{activePacket.protocol}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase">Port</div>
                  <div className="text-xs font-bold text-amber-700 mt-0.5">Port {activePacket.destPort}</div>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="text-[10px] text-slate-500 uppercase">Service</div>
                  <div className="text-xs font-bold text-slate-900 mt-0.5">{activePacket.service}</div>
                </div>
              </div>

              {/* Packet Payload Deep Inspection */}
              <div className="p-4 rounded-lg bg-slate-900 text-slate-200 font-mono text-xs">
                <div className="text-[10px] uppercase font-bold text-slate-400 mb-1 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-sky-400" /> Raw Packet Inspection Payload:
                </div>
                <div className="text-slate-100 bg-slate-950 p-3 rounded border border-slate-800">
                  {activePacket.payload}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
                <span className="text-xs font-mono text-slate-600">
                  Evaluate packet header & payload against security policy:
                </span>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => handlePacketAction('allow')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs font-mono cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>ALLOW PACKET</span>
                  </button>

                  <button
                    onClick={() => handlePacketAction('drop')}
                    className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs font-mono cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <XCircle className="w-4 h-4" />
                    <span>DROP PACKET</span>
                  </button>
                </div>
              </div>

              {/* Feedback on Previous Packet */}
              {lastFirewallAction && (
                <div className={`p-3.5 rounded-lg border text-xs font-mono space-y-1 ${
                  lastFirewallAction.correct
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                    : 'bg-rose-50 border-rose-200 text-rose-900'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {lastFirewallAction.correct ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-rose-600" />
                    )}
                    <span>{lastFirewallAction.message}</span>
                  </div>
                  <div className="text-slate-600 text-[11px] pl-5">
                    {lastFirewallAction.packetDesc}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Educational Callout */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-1.5 font-heading">
              <Info className="w-4 h-4 text-sky-700" />
              Why Exposing RDP (3389) & Cleartext FTP (21) Puts MSMEs at Immediate Risk
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              According to CERT-In advisories, over <strong>70% of initial access vectors</strong> in ransomware campaigns targeting healthcare and MSMEs originate from exposed Remote Desktop Protocol (RDP) ports accessible over the public internet. Cleartext protocols like FTP (Port 21) transmit administrative credentials in plain text. Proper firewall hygiene ensures administrative interfaces are restricted behind private VPN tunnels or encrypted zero-trust identity gates.
            </p>
          </div>
        </div>
      )}

      {/* =======================================================================
          TAB 3: SQL INJECTION CRACKER & REMEDIATION
          ======================================================================= */}
      {activeGame === 'sqli' && (
        <div className="mt-8 space-y-6">
          {/* Top Description & Mode Switcher */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-4 h-4 text-sky-700" />
                SQL Injection Sandbox & Parameterized Remediation Lab
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Observe how raw string concatenation permits complete database authentication bypass, and verify how parameterized queries completely neutralize attack vectors.
              </p>
            </div>

            {/* Toggle Mode Switch */}
            <div className="flex items-center gap-1.5 self-start sm:self-center bg-slate-100 p-1 rounded-lg border border-slate-200 font-mono text-xs">
              <button
                onClick={() => {
                  setIsPatchedMode(false);
                  setSqliResult({ status: null, message: '' });
                }}
                className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  !isPatchedMode 
                    ? 'bg-rose-600 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Vulnerable Mode (Concat)
              </button>

              <button
                onClick={() => {
                  setIsPatchedMode(true);
                  setSqliResult({ status: null, message: '' });
                }}
                className={`px-3 py-1 rounded-md font-bold transition-all cursor-pointer ${
                  isPatchedMode 
                    ? 'bg-emerald-600 text-white shadow-2xs' 
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Patched Mode (Prepared)
              </button>
            </div>
          </div>

          {/* Split-Screen Interactive Terminal & Query Visualizer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* Left Column: Admin Login Form */}
            <div className="lg:col-span-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-900">
                  <Lock className="w-4 h-4 text-slate-600" />
                  <span>Admin Authentication Gateway</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                  isPatchedMode ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}>
                  {isPatchedMode ? 'PROTECTED (AST Parameterized)' : 'VULNERABLE (Raw String Concat)'}
                </span>
              </div>

              {/* Quick Fill Payload Helpers */}
              <div className="space-y-1.5">
                <div className="text-[11px] font-mono text-slate-500">Quick-Fill Exploit Payloads:</div>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => handleFillPayload("' OR 1=1 --")}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono border border-slate-200 cursor-pointer"
                  >
                    ' OR 1=1 --
                  </button>
                  <button
                    type="button"
                    onClick={() => handleFillPayload("admin' --")}
                    className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-mono border border-slate-200 cursor-pointer"
                  >
                    admin' --
                  </button>
                  <button
                    type="button"
                    onClick={() => { setSqliUsername(''); setSqliPassword(''); }}
                    className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-500 text-xs font-mono cursor-pointer"
                  >
                    Clear
                  </button>
                </div>
              </div>

              {/* Form Inputs */}
              <form onSubmit={handleExecuteSqli} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">
                    Username Parameter ($username)
                  </label>
                  <input
                    type="text"
                    value={sqliUsername}
                    onChange={(e) => setSqliUsername(e.target.value)}
                    placeholder="Enter username or injection string..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-700 mb-1 font-semibold">
                    Password Parameter ($password)
                  </label>
                  <input
                    type="password"
                    value={sqliPassword}
                    onChange={(e) => setSqliPassword(e.target.value)}
                    placeholder="Enter password..."
                    className="w-full px-3.5 py-2 rounded-lg bg-slate-50 border border-slate-300 text-slate-900 font-mono text-xs focus:outline-none focus:border-slate-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs font-mono cursor-pointer transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Unlock className="w-3.5 h-3.5 text-slate-300" />
                  <span>Execute Authentication Query</span>
                </button>
              </form>
            </div>

            {/* Right Column: Live Dynamic SQL Query Visualizer */}
            <div className="lg:col-span-6 rounded-xl border border-slate-800 bg-[#0A0F1D] p-5 shadow-sm flex flex-col justify-between space-y-4 text-slate-200">
              <div>
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400">
                    <Code2 className="w-4 h-4" />
                    <span>Dynamic SQL Query AST Visualizer</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">PostgreSQL / MySQL engine</span>
                </div>

                {/* Query Display Block */}
                <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs leading-relaxed overflow-x-auto">
                  {!isPatchedMode ? (
                    <div>
                      <span className="text-purple-400">SELECT</span> <span className="text-white">*</span>{' '}
                      <span className="text-purple-400">FROM</span> <span className="text-sky-300">users</span>{' '}
                      <span className="text-purple-400">WHERE</span> username ={' '}
                      <span className="text-amber-300">'{sqliUsername || 'admin'}'</span>{' '}
                      <span className="text-purple-400">AND</span> password ={' '}
                      <span className="text-amber-300">'{sqliPassword ? '••••••••' : ''}'</span>;
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <span className="text-emerald-400 font-bold">-- Parameterized Pre-compiled Query:</span>
                      </div>
                      <div>
                        <span className="text-purple-400">SELECT</span> <span className="text-white">*</span>{' '}
                        <span className="text-purple-400">FROM</span> <span className="text-sky-300">users</span>{' '}
                        <span className="text-purple-400">WHERE</span> username = <span className="text-emerald-400 font-bold">$1</span>{' '}
                        <span className="text-purple-400">AND</span> password = <span className="text-emerald-400 font-bold">$2</span>;
                      </div>
                      <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800">
                        Bound Parameter $1 = <span className="text-amber-300">"{sqliUsername}" (Type: VARCHAR)</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Explanation text */}
                <div className="mt-3 text-xs text-slate-400 leading-relaxed font-mono">
                  {!isPatchedMode ? (
                    <p>
                      Notice how inserting <code className="text-sky-300">' OR 1=1 --</code> breaks out of string syntax, transforming the where condition into <code className="text-amber-300">WHERE username = '' OR TRUE</code>, forcing the database to return all administrative records!
                    </p>
                  ) : (
                    <p>
                      With parameterized queries (Prepared Statements), the SQL parser separates code structure from user input. The injected payload is treated purely as an inert literal string, neutralizing the exploit 100%.
                    </p>
                  )}
                </div>
              </div>

              {/* Execution Result Banner */}
              {sqliResult.status && (
                <div className={`p-3.5 rounded-lg border text-xs font-mono space-y-2 ${
                  sqliResult.status === 'success'
                    ? 'bg-emerald-950/50 border-emerald-500/50 text-emerald-200'
                    : sqliResult.status === 'blocked'
                    ? 'bg-sky-950/50 border-sky-500/50 text-sky-200'
                    : 'bg-rose-950/50 border-rose-500/50 text-rose-200'
                }`}>
                  <div className="font-bold flex items-center gap-1.5">
                    {sqliResult.status === 'success' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : sqliResult.status === 'blocked' ? (
                      <ShieldCheck className="w-4 h-4 text-sky-400" />
                    ) : (
                      <XCircle className="w-4 h-4 text-rose-400" />
                    )}
                    <span>{sqliResult.message}</span>
                  </div>

                  {/* Leaked Records Table (In Vulnerable Mode) */}
                  {sqliResult.leakedData && (
                    <div className="mt-2 pt-2 border-t border-slate-800 overflow-x-auto">
                      <div className="text-[10px] uppercase font-bold text-amber-400 mb-1">
                        Leaked Database Records:
                      </div>
                      <table className="w-full text-left text-[11px] font-mono text-slate-300 border-collapse">
                        <thead>
                          <tr className="border-b border-slate-800 text-slate-400">
                            <th className="py-1">ID</th>
                            <th>Username</th>
                            <th>Role</th>
                            <th>Token</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sqliResult.leakedData.map((row) => (
                            <tr key={row.id} className="border-b border-slate-900 text-white">
                              <td className="py-1">{row.id}</td>
                              <td className="text-sky-300 font-bold">{row.username}</td>
                              <td className="text-amber-400">{row.role}</td>
                              <td className="text-slate-400 truncate max-w-[120px]">{row.token}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Completion Certificate Modal */}
      <CertificateModal
        isOpen={certificateModalOpen}
        onClose={() => setCertificateModalOpen(false)}
        userName={currentUser.name}
        userXP={arcadeXP}
        onBookTutor={onBookTutor}
        tutors={experts}
      />
    </section>
  );
};
