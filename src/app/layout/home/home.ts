import {
  Component, AfterViewInit, OnInit, OnDestroy,
  ElementRef, ViewChild, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { HomeServices } from '../../core/services/home.services';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Star {
  x: number; y: number; radius: number; speed: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  encapsulation: ViewEncapsulation.None
})
export class Home implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('starCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('homeSection') sectionRef!: ElementRef<HTMLElement>;

  homeData: any = null;

  // ✅ الـ roles بتيجي من الـ DB
  roles: string[] = [];
  currentRole = 0;

  // أنيميشن الظهور
  leftRevealed  = false;
  rightRevealed = false;

  stars: Star[] = [];
  ctx!: CanvasRenderingContext2D;
  animationFrameId?: number;

  private scrollFn = () => this.onScroll();
  private resizeFn = () => this.resizeCanvas();
  private typingTimeout?: any;

  constructor(public homeService: HomeServices, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.homeService.getHomes().subscribe({
      next: (res) => {
        let data = res.find((h: any) => h.isActive) || res[0];
        if (data) {
          data.linkedIn = this.formatUrl(data.linkedIn || '');
          data.gitHub   = this.formatUrl(data.gitHub   || '');
          data.cvURL    = this.formatUrl(data.cvURL    || '');
          this.homeData = data;

          // ✅ الـ roles من الـ DB كـ array
          if (data.roles && data.roles.length) {
            this.roles = data.roles;
          }
          // fallback
          if (!this.roles.length) {
            this.roles = ['Full Stack Developer', 'Software Tester', 'UI/UX Designer'];
          }
        }
        this.cdr.detectChanges();
        setTimeout(() => {
          this.startTypingAnimation();
          this.onScroll(); // trigger أول مرة
        }, 100);
      }
    });
  }

  ngAfterViewInit() {
    this.initStars();
    window.addEventListener('scroll', this.scrollFn);
    window.addEventListener('resize', this.resizeFn);
    setTimeout(() => this.onScroll(), 300);
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    if (this.typingTimeout) clearTimeout(this.typingTimeout);
    window.removeEventListener('scroll', this.scrollFn);
    window.removeEventListener('resize', this.resizeFn);
  }

  // ✅ أنيميشن الظهور والاختفاء مع السكرول
  onScroll() {
    const section = this.sectionRef?.nativeElement;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const wh   = window.innerHeight;
    const inView = rect.top < wh - 80 && rect.bottom > 80;
    this.leftRevealed  = inView;
    this.rightRevealed = inView;
    this.cdr.detectChanges();
  }

  formatUrl(url: string): string {
    if (!url) return '';
    const trimmed = url.trim();
    return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
  }

  // ✅ Typing animation مع cursor | بيومض
  startTypingAnimation() {
    const roleElement = document.querySelector('.role') as HTMLElement;
    if (!roleElement || !this.roles.length) return;

    let index = 0;
    let isDeleting = false;
    let showCursor = true;

    // cursor بيومض كل 500ms
    setInterval(() => {
      showCursor = !showCursor;
      const text = roleElement.getAttribute('data-text') || '';
      roleElement.textContent = text + (showCursor ? '|' : ' ');
    }, 500);

    const type = () => {
      const fullText = this.roles[this.currentRole];
      const displayed = fullText.substring(0, index);
      roleElement.setAttribute('data-text', displayed);
      roleElement.textContent = displayed + (showCursor ? '|' : ' ');

      if (!isDeleting) {
        index++;
        if (index > fullText.length) {
          isDeleting = true;
          this.typingTimeout = setTimeout(type, 1500);
          return;
        }
      } else {
        index--;
        if (index === 0) {
          isDeleting = false;
          this.currentRole = (this.currentRole + 1) % this.roles.length;
        }
      }
      this.typingTimeout = setTimeout(type, isDeleting ? 50 : 150);
    };
    type();
  }

  // ✅ Smooth scroll للـ projects section
  scrollToProjects() {
    const projectsSection = document.querySelector('app-projects') ||
                            document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // ===== Stars =====
  initStars() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;
    this.ctx = canvas.getContext('2d')!;
    this.resizeCanvas();
    this.createStars();
    this.animateStars();
  }

  resizeCanvas() {
    const canvas = this.canvasRef?.nativeElement;
    if (canvas) {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
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
    if (!this.ctx) return;
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
}