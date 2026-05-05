import React, { useEffect, useRef } from 'react';
import { usePerformance } from '../../hooks/usePerformance';
import './AlponaMatrix.css';

interface Point {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  size: number;
  rotation: number;
  type: 'lotus' | 'spiral';
  depth: number;
}

const AlponaMatrix: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const requestRef = useRef<number | null>(null);
  const scrollPos = useRef(0);
  const tier = usePerformance();

  // Resolution Scaling Factor
  const resolutionScale = tier === 'low' ? 0.75 : 1;

  // Mathematical Alpona Motif Drawing
  const drawLotus = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, depth: number) => {
    ctx.save();
    ctx.translate(x * resolutionScale, y * resolutionScale);
    
    const blur = tier === 'low' ? 0 : (1.2 - depth) * 4; // Disable blur filter on low-end
    if (blur > 0) ctx.filter = `blur(${blur}px)`;
    
    ctx.strokeStyle = `rgba(184, 28, 28, ${opacity * (depth * 0.15)})`; 
    ctx.lineWidth = depth * (tier === 'low' ? 1 : 1.5);
    
    const s = size * resolutionScale;
    for (let i = 0; i < 8; i++) {
      ctx.rotate(Math.PI / 4);
      ctx.beginPath();
      ctx.ellipse(0, -s / 2, s / 3, s / 2, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    ctx.restore();
  };

  const drawSpiral = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number, depth: number) => {
    ctx.save();
    ctx.translate(x * resolutionScale, y * resolutionScale);
    
    const blur = tier === 'low' ? 0 : (1.2 - depth) * 4;
    if (blur > 0) ctx.filter = `blur(${blur}px)`;

    ctx.strokeStyle = `rgba(184, 28, 28, ${opacity * (depth * 0.12)})`;
    ctx.lineWidth = depth;
    ctx.beginPath();
    const s = size * resolutionScale;
    for (let i = 0; i < 20; i++) {
      const angle = 0.5 * i;
      const r = (s / 20) * i;
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
      p.life -= tier === 'low' ? 0.015 : 0.008; // Faster fade on low-end to keep buffer small
      if (p.life <= 0) return false;

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
    const depth = Math.random() < 0.2 ? 1.2 : Math.random() < 0.5 ? 0.8 : 0.4;
    
    pointsRef.current.push({
      x, y, life: 1.0, maxLife: 1.0,
      size: (Math.random() * 40 + 20) * depth,
      rotation: Math.random() * Math.PI * 2,
      type: types[Math.floor(Math.random() * types.length)],
      depth
    });

    const maxPoints = tier === 'low' ? 15 : 40;
    if (pointsRef.current.length > maxPoints) {
      pointsRef.current.shift();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const threshold = tier === 'low' ? 0.92 : 0.85; // Less frequent on low-end
      if (Math.random() > threshold) {
        addPoint(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      const threshold = tier === 'low' ? 0.9 : 0.8;
      if (Math.random() > threshold) {
        const touch = e.touches[0];
        addPoint(touch.clientX, touch.clientY);
      }
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth * resolutionScale;
        canvasRef.current.height = window.innerHeight * resolutionScale;
        canvasRef.current.style.width = `${window.innerWidth}px`;
        canvasRef.current.style.height = `${window.innerHeight}px`;
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
  }, [tier, resolutionScale]);

  return (
    <canvas 
      ref={canvasRef} 
      className="alpona-matrix"
      aria-hidden="true"
    />
  );
};

export default AlponaMatrix;
