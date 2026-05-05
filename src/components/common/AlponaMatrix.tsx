import React, { useEffect, useRef } from 'react';
import './AlponaMatrix.css';

interface Point {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  type: 'lotus' | 'spiral';
  depth: number; // 0.4 (back) to 1.2 (front)
}

const AlponaMatrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number | null>(null);
  const scrollPos = useRef(0);

  // Mathematical Alpona Motif Drawing
  const drawLotus = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, depth: number) => {
    ctx.save();
    ctx.translate(x, y);
    
    // Depth-based aesthetics
    const blur = (1.2 - depth) * 4;
    ctx.filter = `blur(${blur}px)`;
    ctx.strokeStyle = `rgba(184, 28, 28, ${opacity * (depth * 0.15)})`; 
    ctx.lineWidth = depth * 1.5;
    
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.ellipse(0, -size / 2, size / 3, size / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawSpiral = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, depth: number) => {
    ctx.save();
    ctx.translate(x, y);
    
    const blur = (1.2 - depth) * 4;
    ctx.filter = `blur(${blur}px)`;
    ctx.strokeStyle = `rgba(184, 28, 28, ${opacity * (depth * 0.12)})`;
    ctx.lineWidth = depth;
    ctx.beginPath();
    for (let i = 0; i < 20; i++) {
      const angle = 0.5 * i;
      const r = (size / 20) * i;
      ctx.lineTo(r * Math.cos(angle), r * Math.sin(angle));
    }
    ctx.stroke();
    ctx.restore();
  };

  const animate = (_time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentScroll = window.scrollY;
    const deltaScroll = currentScroll - scrollPos.current;
    scrollPos.current = currentScroll;

    pointsRef.current = pointsRef.current.filter(p => {
      p.life -= 0.008; // Slower fade for holographic feel
      if (p.life <= 0) return false;

      // Parallax Application
      p.y -= deltaScroll * (p.depth - 1); 

      const opacity = p.life / p.maxLife;
      const currentSize = p.size * (1 + (1 - opacity) * 0.3);

      if (p.type === 'lotus') drawLotus(ctx, p.x, p.y, currentSize, opacity, p.depth);
      else drawSpiral(ctx, p.x, p.y, currentSize, opacity, p.depth);

      return true;
    });

    requestRef.current = requestAnimationFrame(animate);
  };

  const addPoint = (x: number, y: number) => {
    const types: ('lotus' | 'spiral')[] = ['lotus', 'spiral'];
    // Depth distribution: most are mid/back, few are foreground
    const depth = Math.random() < 0.2 ? 1.2 : Math.random() < 0.5 ? 0.8 : 0.4;
    
    pointsRef.current.push({
      x,
      y,
      life: 1.0,
      maxLife: 1.0,
      size: (Math.random() * 40 + 20) * depth,
      rotation: Math.random() * Math.PI * 2,
      type: types[Math.floor(Math.random() * types.length)],
      depth
    });

    if (pointsRef.current.length > 40) {
      pointsRef.current.shift();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.85) {
        addPoint(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.random() > 0.8) {
        const touch = e.touches[0];
        addPoint(touch.clientX, touch.clientY);
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="alpona-matrix"
      aria-hidden="true"
    />
  );
};

export default AlponaMatrix;
