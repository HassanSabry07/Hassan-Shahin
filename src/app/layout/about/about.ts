import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutServices } from '../../core/services/about.services';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.html',
  styleUrls: ['./about.css'],
  encapsulation: ViewEncapsulation.None
})
export class About implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('starCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  aboutData: any = null;
  private animationFrameId?: number;
  private ctx!: CanvasRenderingContext2D;
  private stars: any[] = [];
  private observer!: IntersectionObserver;
  private resizeFn = () => this.resizeCanvas();

  constructor(
    public aboutService: AboutServices,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.aboutService.getAbouts().subscribe({
      next: (res) => {
        this.aboutData = res[0];
        this.cdr.detectChanges();
        // بعد ما الـ DOM يتحدث نبدأ الـ observer
        setTimeout(() => this.initObserver(), 100);
      },
      error: (err) => console.error('Error loading about data', err)
    });
  }

  ngAfterViewInit() {
    this.initStars();
    window.addEventListener('resize', this.resizeFn);
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.resizeFn);
    if (this.observer) this.observer.disconnect();
  }

  // ✅ IntersectionObserver بيشتغل في الاتجاهين - ظهور واختفاء
  initObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        } else {
          // ✅ بيشيل reveal لما يخرج من الشاشة عشان يعيد الأنيميشن
          entry.target.classList.remove('reveal');
        }
      });
    }, { threshold: 0.15 });

    // بنراقب كل عنصر لوحده عشان الـ stagger يشتغل
    document.querySelectorAll('.reveal-text, .about-left').forEach((el, i) => {
      // delay متدرج لكل عنصر
      (el as HTMLElement).style.transitionDelay = `${i * 0.15}s`;
      this.observer.observe(el);
    });
  }

  // ===== Stars =====
  initStars() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createStars();
    this.animateStars();
  }

  resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  createStars() {
    this.stars = [];
    for (let i = 0; i < 200; i++) {
      this.stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.4 + 0.1
      });
    }
  }

  animateStars() {
    this.ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    this.ctx.fillStyle = '#ffffff';
    this.stars.forEach(s => {
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      this.ctx.fill();
      s.x -= s.speed;
      if (s.x < 0) s.x = window.innerWidth;
    });
    this.animationFrameId = requestAnimationFrame(() => this.animateStars());
  }

  scrollToContact() {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  }
}