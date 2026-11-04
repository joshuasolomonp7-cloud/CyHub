import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Play, 
  Award, 
  RotateCcw, 
  CheckCircle, 
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { LAB_MISSIONS } from '../data/mockData';
import type { LabMission, Expert } from '../types';

interface InteractiveLabsSectionProps {
  experts: Expert[];
  onSelectExpert: (expert: Expert, sessionType: 'consultation' | 'mentorship-class' | 'rapid-triage') => void;
}

export const InteractiveLabsSection: React.FC<InteractiveLabsSectionProps> = ({
  experts,
  onSelectExpert,
}) => {
  const [selectedMission, setSelectedMission] = useState<LabMission>(LAB_MISSIONS[0]);
  const [commandInput, setCommandInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<
    { type: 'input' | 'output' | 'success' | 'error' | 'system'; text: string }[]
  >([]);

  const [completedMissionIds, setCompletedMissionIds] = useState<string[]>([]);
  const [totalXP, setTotalXP] = useState<number>(0);
  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize terminal for selected mission
  useEffect(() => {
    setTerminalHistory([
      { type: 'system', text: `=== CYHUB VIRTUAL RANGE // ${selectedMission.title.toUpperCase()} ===` },
      { type: 'system', text: selectedMission.description },
      { type: 'output', text: `OBJECTIVE: ${selectedMission.objective}` },
      { type: 'output', text: "Type 'help' to view cyber commands or 'hint' for a clue." }
    ]);
  }, [selectedMission]);

  // Auto scroll terminal
  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalHistory]);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = commandInput.trim();
    if (!cmd) return;

    // Add user input to history
    const newHistory = [...terminalHistory, { type: 'input' as const, text: `$ ${cmd}` }];
    const lowerCmd = cmd.toLowerCase();

    if (lowerCmd === 'clear') {
      setTerminalHistory([]);
      setCommandInput('');
      return;
    }

    if (lowerCmd === 'help') {
      newHistory.push(
        { type: 'system', text: '--- CYHUB CLI TOOLKIT v2.4 ---' },
        { type: 'output', text: '  help                      - Display available commands' },
        { type: 'output', text: '  hint                      - Show mission hint' },
        { type: 'output', text: '  status                    - Show completed missions and earned XP' },
        { type: 'output', text: '  clear                     - Clear terminal buffer' },
        { type: 'output', text: '  cat [file]                - Inspect files (e.g. cat auth.php, cat dump.hashes)' },
        { type: 'output', text: '  sqli-test [payload]       - Test SQL injection payload against login form' },
        { type: 'output', text: '  nmap -sV [target]         - Run service version scan on IP (e.g. 10.0.4.15)' },
        { type: 'output', text: '  john-crack [file]         - Run dictionary attack on hash file' },
        { type: 'output', text: '  submit [flag]             - Submit extracted flag to claim XP' }
      );
    } else if (lowerCmd === 'hint') {
      newHistory.push({
        type: 'output',
        text: `💡 HINT: ${selectedMission.hints[0]}`
      });
      if (selectedMission.hints[1]) {
        newHistory.push({
          type: 'output',
          text: `💡 HINT 2: ${selectedMission.hints[1]}`
        });
      }
    } else if (lowerCmd === 'status') {
      newHistory.push(
        { type: 'system', text: `Total Earned XP: ${totalXP} XP` },
        { type: 'output', text: `Completed Missions: ${completedMissionIds.length} of ${LAB_MISSIONS.length}` }
      );
    } else if (lowerCmd.startsWith('cat')) {
      if (selectedMission.id === 'lab-1') {
        newHistory.push(
          { type: 'system', text: '--- /var/www/auth.php ---' },
          { type: 'output', text: '$query = "SELECT * FROM users WHERE user=\'" . $_POST["user"] . "\' AND pass=\'" . $_POST["pass"] . "\';";' },
          { type: 'output', text: '// VULNERABILITY: Raw concatenation without prepared statements!' },
          { type: 'output', text: "// Test payload: sqli-test ' OR '1'='1" }
        );
      } else if (selectedMission.id === 'lab-3') {
        newHistory.push(
          { type: 'system', text: '--- dump.hashes ---' },
          { type: 'output', text: 'admin:$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy:flag_candidate' },
          { type: 'output', text: 'root:5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8' },
          { type: 'output', text: '// Run: john-crack dump.hashes' }
        );
      } else {
        newHistory.push({ type: 'output', text: 'cat: No such file or directory in this subnet.' });
      }
    } else if (lowerCmd.startsWith('sqli-test')) {
      if (selectedMission.id === 'lab-1') {
        newHistory.push(
          { type: 'system', text: '[+] Testing SQL payload against endpoint /api/v1/login...' },
          { type: 'system', text: '[+] Payload: ' + cmd.replace(/sqli-test\s*/i, '') },
          { type: 'success', text: '[✓] SUCCESS! Authentication bypassed! SQL statement evaluated to TRUE.' },
          { type: 'success', text: `[★] FLAG EXTRACTED: ${selectedMission.flag}` },
          { type: 'output', text: `Type: submit ${selectedMission.flag} to claim your reward!` }
        );
      } else {
        newHistory.push({ type: 'error', text: '[-] SQL injection is not applicable to the current target scope.' });
      }
    } else if (lowerCmd.startsWith('nmap')) {
      if (selectedMission.id === 'lab-2') {
        newHistory.push(
          { type: 'system', text: 'Starting Nmap 7.94 ( https://nmap.org ) at 2026-11-02 11:25 UTC' },
          { type: 'output', text: 'Nmap scan report for 10.0.4.15' },
          { type: 'output', text: 'Host is up (0.00041s latency).' },
          { type: 'output', text: 'PORT      STATE SERVICE  VERSION' },
          { type: 'output', text: '22/tcp    open  ssh      OpenSSH 9.2p1' },
          { type: 'output', text: '80/tcp    open  http     nginx/1.24.0' },
          { type: 'success', text: '33060/tcp open  mysql    MySQL 8.0.35-banner [VULN: Flag in debug banner]' },
          { type: 'success', text: `[★] HIDDEN BANNER UNLOCKED: ${selectedMission.flag}` },
          { type: 'output', text: `Type: submit ${selectedMission.flag} to register your points!` }
        );
      } else {
        newHistory.push({ type: 'error', text: '[-] Nmap probe returned host offline or filtered.' });
      }
    } else if (lowerCmd.startsWith('john-crack')) {
      if (selectedMission.id === 'lab-3') {
        newHistory.push(
          { type: 'system', text: 'Loaded 2 password hashes with 2 different salts (SHA-256 / bcrypt)...' },
          { type: 'system', text: 'Press Ctrl+C to abort, or wait for dictionary traversal...' },
          { type: 'output', text: 'admin:password123 (dump.hashes)' },
          { type: 'success', text: `root:cyhub{hash_broken_2026} (dump.hashes:2)` },
          { type: 'success', text: `[★] HASH CRACKED! FLAG: ${selectedMission.flag}` },
          { type: 'output', text: `Type: submit ${selectedMission.flag} to verify flag.` }
        );
      } else {
        newHistory.push({ type: 'error', text: '[-] No encrypted hash dump loaded in this sandbox.' });
      }
    } else if (lowerCmd.startsWith('submit')) {
      const submittedFlag = cmd.replace(/submit\s*/i, '').trim();
      if (submittedFlag === selectedMission.flag) {
        if (!completedMissionIds.includes(selectedMission.id)) {
          setCompletedMissionIds([...completedMissionIds, selectedMission.id]);
          setTotalXP(totalXP + selectedMission.xpReward);
          try {
            confetti({
              particleCount: 90,
              spread: 60,
              origin: { y: 0.7 }
            });
          } catch (e) {}
        }
        newHistory.push(
          { type: 'success', text: '==================================================' },
          { type: 'success', text: `🎉 CONGRATULATIONS! FLAG ACCEPTED: ${submittedFlag}` },
          { type: 'success', text: `+${selectedMission.xpReward} XP CREDITED TO YOUR CYHUB PROFILE` },
          { type: 'success', text: '==================================================' },
          { type: 'output', text: "Switch to the next mission or book an OSCP tutor for advanced exploitation." }
        );
      } else {
        newHistory.push({
          type: 'error',
          text: `[-] Incorrect flag '${submittedFlag}'. Ensure exact match including cyhub{...}`
        });
      }
    } else {
      newHistory.push({
        type: 'error',
        text: `bash: command not found: ${cmd}. Type 'help' for available commands.`
      });
    }

    setTerminalHistory(newHistory);
    setCommandInput('');
  };

  // Find recommended tutor for the active mission
  const recommendedTutor = experts.find(e => e.roles.includes('tutor')) || experts[0];

  return (
    <section id="interactive-labs" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 uppercase tracking-widest">
            <Terminal className="w-4 h-4 text-cyan-400" />
            <span>Interactive Cyber Sandbox & Range</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
            Hands-On Interactive Labs
          </h2>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Test real offensive and defensive cybersecurity techniques right in your browser. Complete missions, capture flags, and connect with 1-on-1 certified mentors.
          </p>
        </div>

        {/* XP Scoreboard Widget */}
        <div className="flex items-center gap-4 bg-slate-900/90 border border-slate-700/80 p-3 rounded-2xl shadow-lg">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[11px] font-mono text-slate-400 uppercase">Your Skill XP</div>
              <div className="text-lg font-mono font-bold text-amber-400">{totalXP} XP</div>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-800"></div>

          <div>
            <div className="text-[11px] font-mono text-slate-400 uppercase">Missions Solved</div>
            <div className="text-lg font-mono font-bold text-cyan-400">
              {completedMissionIds.length} / {LAB_MISSIONS.length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Mission Selector Cards */}
        <div className="lg:col-span-4 space-y-3.5">
          <div className="text-xs font-mono text-slate-400 uppercase tracking-wider font-semibold">
            Select Training Mission:
          </div>

          {LAB_MISSIONS.map((mission) => {
            const isSelected = selectedMission.id === mission.id;
            const isCompleted = completedMissionIds.includes(mission.id);

            return (
              <div
                key={mission.id}
                onClick={() => setSelectedMission(mission)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900/90 border-cyan-400 shadow-[0_0_20px_rgba(0,245,255,0.15)]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                    {mission.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-400 font-bold">+{mission.xpReward} XP</span>
                    {isCompleted && (
                      <CheckCircle className="w-4 h-4 text-emerald-400" />
                    )}
                  </div>
                </div>

                <h4 className="text-sm font-bold text-white mt-2.5">
                  {mission.title}
                </h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {mission.description}
                </p>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                  <span className={`${
                    mission.difficulty === 'Beginner' ? 'text-emerald-400' : 'text-amber-400'
                  }`}>
                    ● {mission.difficulty}
                  </span>
                  <span className="text-cyan-400 flex items-center gap-1">
                    {isSelected ? 'Range Active' : 'Load Mission'} &rarr;
                  </span>
                </div>
              </div>
            );
          })}

          {/* Mentor Pairing Card */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-500/30 mt-4 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" /> Need 1-on-1 Guidance?
            </div>
            <div className="flex items-center gap-3">
              <img
                src={recommendedTutor.avatar}
                alt={recommendedTutor.name}
                className="w-10 h-10 rounded-lg object-cover border border-cyan-500/50"
              />
              <div>
                <div className="text-xs font-bold text-white">{recommendedTutor.name}</div>
                <div className="text-[11px] text-slate-400">{recommendedTutor.title}</div>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Book a live screen-share session with a certified OSCP mentor to walk through labs and exploit methodologies.
            </p>
            <button
              onClick={() => onSelectExpert(recommendedTutor, 'mentorship-class')}
              className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-semibold cursor-pointer flex items-center justify-center gap-1.5"
            >
              Book Class with {recommendedTutor.name.split(' ')[0]} (${recommendedTutor.hourlyRate}/hr)
            </button>
          </div>
        </div>

        {/* Right Column: Virtual Terminal Window */}
        <div className="lg:col-span-8 rounded-2xl border border-slate-700/80 bg-[#070B14] shadow-2xl overflow-hidden flex flex-col h-[540px]">
          {/* Terminal Title Bar */}
          <div className="bg-[#0F172A] px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="text-xs font-mono text-slate-400 ml-2">
                cyhub-range@node-4192:~/{selectedMission.category.toLowerCase().replace(/\s+/g, '-')}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setTerminalHistory([
                    { type: 'system', text: `=== CYHUB VIRTUAL RANGE // RESET ===` },
                    { type: 'output', text: `OBJECTIVE: ${selectedMission.objective}` },
                    { type: 'output', text: "Type 'help' to view commands or 'hint' for assistance." }
                  ]);
                }}
                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                title="Reset Terminal"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Terminal Screen / Output Body */}
          <div 
            onClick={() => inputRef.current?.focus()}
            className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1.5 cursor-text bg-[#070B14]"
          >
            {terminalHistory.map((item, idx) => {
              if (item.type === 'input') {
                return (
                  <div key={idx} className="text-cyan-300 font-semibold">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'system') {
                return (
                  <div key={idx} className="text-slate-400 font-medium">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'success') {
                return (
                  <div key={idx} className="text-emerald-400 font-bold">
                    {item.text}
                  </div>
                );
              }
              if (item.type === 'error') {
                return (
                  <div key={idx} className="text-rose-400 font-medium">
                    {item.text}
                  </div>
                );
              }
              return (
                <div key={idx} className="text-slate-200">
                  {item.text}
                </div>
              );
            })}
            <div ref={terminalBottomRef} />
          </div>

          {/* Quick Helper Command Buttons */}
          <div className="bg-[#0D1424] px-4 py-2 border-t border-slate-800/80 flex flex-wrap items-center gap-1.5 text-[11px] font-mono">
            <span className="text-slate-500 mr-1">Quick Run:</span>
            {selectedMission.id === 'lab-1' && (
              <>
                <button
                  onClick={() => setCommandInput("sqli-test ' OR '1'='1")}
                  className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700"
                >
                  sqli-test ' OR '1'='1
                </button>
                <button
                  onClick={() => setCommandInput('cat auth.php')}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  cat auth.php
                </button>
              </>
            )}
            {selectedMission.id === 'lab-2' && (
              <button
                onClick={() => setCommandInput('nmap -sV 10.0.4.15')}
                className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700"
              >
                nmap -sV 10.0.4.15
              </button>
            )}
            {selectedMission.id === 'lab-3' && (
              <>
                <button
                  onClick={() => setCommandInput('cat dump.hashes')}
                  className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 hover:bg-slate-700"
                >
                  cat dump.hashes
                </button>
                <button
                  onClick={() => setCommandInput('john-crack dump.hashes')}
                  className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 hover:bg-slate-700"
                >
                  john-crack dump.hashes
                </button>
              </>
            )}
            <button
              onClick={() => setCommandInput('hint')}
              className="px-2 py-0.5 rounded bg-amber-950/60 text-amber-300 border border-amber-800/60 hover:bg-amber-900/60"
            >
              hint
            </button>
            <button
              onClick={() => setCommandInput('help')}
              className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 hover:text-white"
            >
              help
            </button>
          </div>

          {/* Interactive Command Input Form */}
          <form 
            onSubmit={handleCommandSubmit}
            className="p-3 bg-[#0B101D] border-t border-slate-800 flex items-center gap-2"
          >
            <span className="text-cyan-400 font-mono text-sm font-bold pl-1">$</span>
            <input
              ref={inputRef}
              type="text"
              value={commandInput}
              onChange={(e) => setCommandInput(e.target.value)}
              placeholder="Enter cyber command (e.g. 'help', 'hint', 'sqli-test', 'nmap', 'submit')..."
              className="flex-1 bg-transparent border-none text-cyan-300 font-mono text-xs focus:outline-none placeholder-slate-600"
            />
            <button
              type="submit"
              className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono font-bold text-xs cursor-pointer flex items-center gap-1"
            >
              Execute <Play className="w-3 h-3 fill-slate-950" />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
