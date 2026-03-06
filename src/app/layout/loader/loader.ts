import { Component, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader implements OnInit, AfterViewInit {
  isVisible = true;
  isDestroyed = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.isVisible = false;
      this.cdr.detectChanges(); // ← مهم
      setTimeout(() => {
        this.isDestroyed = true;
        this.cdr.detectChanges(); // ← مهم
      }, 800);
    }, 2500);
  }

  ngAfterViewInit() {
    const canvas = document.getElementById('loader-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars: any[] = [];
    for (let i = 0; i < 200; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5,
        speed: Math.random() * 0.4 + 0.1
      });
    }

    const anim = () => {
      if (this.isDestroyed) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#ffffff';
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.x -= s.speed;
        if (s.x < 0) s.x = canvas.width;
      });
      requestAnimationFrame(anim);
    };
    anim();
  }
}