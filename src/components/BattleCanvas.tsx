import React, { useEffect, useRef, useState } from 'react';
import { soundEngine } from '../utils/audio';
import { Play, Pause, Zap, Shield, Bot, Radar, Cpu, RefreshCw } from 'lucide-react';

interface BattleCanvasProps {
  unlockedWeaponIds: string[];
  activeModuleIndex: number;
}

interface RobotUnit {
  id: number;
  x: number;
  y: number;
  speed: number;
  hp: number;
  maxHp: number;
  type: 'scout' | 'heavy' | 'boss';
  color: string;
}

interface Projectile {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  type: string;
  progress: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  life: number;
  maxLife: number;
}

export const BattleCanvas: React.FC<BattleCanvasProps> = ({ unlockedWeaponIds, activeModuleIndex }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [wave, setWave] = useState(1);
  const [defeatedCount, setDefeatedCount] = useState(0);

  const robotsRef = useRef<RobotUnit[]>([]);
  const projectilesRef = useRef<Projectile[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameId = useRef<number | null>(null);

  // Initialize robot wave
  const spawnWave = (waveNum: number) => {
    const newRobots: RobotUnit[] = [];
    const count = 5 + waveNum * 2;

    for (let i = 0; i < count; i++) {
      const isBoss = waveNum % 3 === 0 && i === 0;
      const isHeavy = i % 3 === 0;

      newRobots.push({
        id: Math.random(),
        x: 50 + Math.random() * 500,
        y: -30 - i * 45,
        speed: isBoss ? 0.4 : isHeavy ? 0.7 : 1.2,
        hp: isBoss ? 300 : isHeavy ? 100 : 40,
        maxHp: isBoss ? 300 : isHeavy ? 100 : 40,
        type: isBoss ? 'boss' : isHeavy ? 'heavy' : 'scout',
        color: isBoss ? '#f43f5e' : isHeavy ? '#f59e0b' : '#38bdf8'
      });
    }

    robotsRef.current = newRobots;
  };

  useEffect(() => {
    spawnWave(wave);
  }, [wave]);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastShotTime = 0;

    const render = (time: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Tactical Grid Background
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.5)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Defense Perimeter line
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, canvas.height - 60);
      ctx.lineTo(canvas.width, canvas.height - 60);
      ctx.stroke();

      ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
      ctx.fillRect(0, canvas.height - 60, canvas.width, 60);

      // Draw Deployed Defensive Towers
      const towerPositions = [
        { x: 70, name: 'EMP Cannon', color: '#06b6d4', unlocked: unlockedWeaponIds.includes('module-1') },
        { x: 180, name: 'RAM Shield', color: '#10b981', unlocked: unlockedWeaponIds.includes('module-2') },
        { x: 290, name: 'Exo-Mech', color: '#f59e0b', unlocked: unlockedWeaponIds.includes('module-3') },
        { x: 400, name: 'Vector Radar', color: '#8b5cf6', unlocked: unlockedWeaponIds.includes('module-4') },
        { x: 510, name: 'Singularity', color: '#ec4899', unlocked: unlockedWeaponIds.includes('module-5') },
      ];

      towerPositions.forEach((tower) => {
        const y = canvas.height - 40;
        ctx.fillStyle = tower.unlocked ? tower.color : '#334155';
        ctx.beginPath();
        ctx.arc(tower.x, y, 14, 0, Math.PI * 2);
        ctx.fill();

        if (tower.unlocked) {
          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      });

      if (isPlaying) {
        // Update & Render Robots
        robotsRef.current.forEach((bot) => {
          bot.y += bot.speed;

          // If reached defense line, bounce back
          if (bot.y > canvas.height - 75) {
            bot.y = canvas.height - 75;
          }

          // Draw Robot Body
          ctx.fillStyle = bot.color;
          const radius = bot.type === 'boss' ? 18 : bot.type === 'heavy' ? 12 : 8;
          ctx.beginPath();
          ctx.arc(bot.x, bot.y, radius, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#0f172a';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Health bar
          const barWidth = 24;
          const barHeight = 4;
          const hpPercent = bot.hp / bot.maxHp;
          ctx.fillStyle = '#1e293b';
          ctx.fillRect(bot.x - barWidth / 2, bot.y - radius - 8, barWidth, barHeight);
          ctx.fillStyle = hpPercent > 0.5 ? '#10b981' : hpPercent > 0.2 ? '#f59e0b' : '#f43f5e';
          ctx.fillRect(bot.x - barWidth / 2, bot.y - radius - 8, barWidth * hpPercent, barHeight);
        });

        // Fire Weapons automatically at nearest active robot
        if (time - lastShotTime > 600 && robotsRef.current.length > 0) {
          lastShotTime = time;
          const target = robotsRef.current.find(b => b.hp > 0);

          if (target) {
            const activeTowers = towerPositions.filter(t => t.unlocked);
            if (activeTowers.length > 0) {
              const shooter = activeTowers[Math.floor(Math.random() * activeTowers.length)];

              projectilesRef.current.push({
                x: shooter.x,
                y: canvas.height - 40,
                targetX: target.x,
                targetY: target.y,
                color: shooter.color,
                type: shooter.name,
                progress: 0
              });

              soundEngine.playLaser();
            }
          }
        }

        // Update Projectiles
        projectilesRef.current.forEach((proj, index) => {
          proj.progress += 0.15;
          const curX = proj.x + (proj.targetX - proj.x) * proj.progress;
          const curY = proj.y + (proj.targetY - proj.y) * proj.progress;

          // Draw laser beam
          ctx.strokeStyle = proj.color;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(proj.x, proj.y);
          ctx.lineTo(curX, curY);
          ctx.stroke();

          // On Hit
          if (proj.progress >= 1) {
            projectilesRef.current.splice(index, 1);

            // Damage nearest bot
            const hitBot = robotsRef.current.find(
              b => Math.hypot(b.x - proj.targetX, b.y - proj.targetY) < 30
            );

            if (hitBot) {
              hitBot.hp -= 25;

              // Spawn explosion particles
              for (let p = 0; p < 8; p++) {
                particlesRef.current.push({
                  x: hitBot.x,
                  y: hitBot.y,
                  vx: (Math.random() - 0.5) * 4,
                  vy: (Math.random() - 0.5) * 4,
                  color: proj.color,
                  life: 0,
                  maxLife: 20
                });
              }

              if (hitBot.hp <= 0) {
                soundEngine.playEmp();
                robotsRef.current = robotsRef.current.filter(b => b.id !== hitBot.id);
                setDefeatedCount(prev => prev + 1);
              }
            }
          }
        });

        // Update Particles
        particlesRef.current.forEach((pt, idx) => {
          pt.x += pt.vx;
          pt.y += pt.vy;
          pt.life++;

          ctx.fillStyle = pt.color;
          ctx.globalAlpha = 1 - pt.life / pt.maxLife;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;

          if (pt.life >= pt.maxLife) {
            particlesRef.current.splice(idx, 1);
          }
        });

        // Check Wave Victory
        if (robotsRef.current.length === 0) {
          setWave(prev => prev + 1);
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isPlaying, unlockedWeaponIds]);

  return (
    <div className="cyber-box rounded-xl p-4 border border-slate-800 bg-slate-950/80">
      <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Bot className="w-4 h-4 text-cyan-400" />
          <h3 className="text-xs font-bold font-title uppercase tracking-wider text-slate-200">
            Real-Time Tactical Battle Grid
          </h3>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
            WAVE {wave}
          </span>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
            DEFEATED: {defeatedCount}
          </span>
          <button
            onClick={() => {
              soundEngine.playBlip();
              setIsPlaying(!isPlaying);
            }}
            className="p-1 text-slate-300 hover:text-cyan-400 bg-slate-900 border border-slate-700 rounded transition-colors"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              soundEngine.playBlip();
              spawnWave(wave);
            }}
            className="p-1 text-slate-300 hover:text-cyan-400 bg-slate-900 border border-slate-700 rounded transition-colors"
            title="Reset Wave"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950 flex justify-center">
        <canvas ref={canvasRef} width={600} height={280} className="w-full max-w-[600px] h-[280px]" />
      </div>

      {/* Unlocked Weapon Indicators */}
      <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400">
        <span>TOWERS: {unlockedWeaponIds.length} / 5 ONLINE</span>
        <div className="flex items-center gap-2">
          {unlockedWeaponIds.includes('module-1') && <span title="EMP Cannon"><Zap className="w-3.5 h-3.5 text-cyan-400" /></span>}
          {unlockedWeaponIds.includes('module-2') && <span title="RAM Barrier"><Shield className="w-3.5 h-3.5 text-emerald-400" /></span>}
          {unlockedWeaponIds.includes('module-3') && <span title="Exo-Mech"><Bot className="w-3.5 h-3.5 text-amber-400" /></span>}
          {unlockedWeaponIds.includes('module-4') && <span title="Vector Radar"><Radar className="w-3.5 h-3.5 text-purple-400" /></span>}
          {unlockedWeaponIds.includes('module-5') && <span title="Singularity"><Cpu className="w-3.5 h-3.5 text-rose-400" /></span>}
        </div>
      </div>
    </div>
  );
};
