import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ViewChildren, QueryList,
  ElementRef, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperinceServices } from '../../core/services/experince.services';
import { IExperince } from '../../core/models/Experince.model ';

@Component({
  selector: 'app-experince',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experince.html',
  styleUrls: ['./experince.css'],
  encapsulation: ViewEncapsulation.None
})
export class Experince implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('starCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('expSection') sectionRef!: ElementRef<HTMLElement>;
  @ViewChild('lineFill') lineFillRef!: ElementRef<HTMLElement>;
  @ViewChild('timelineContainer') containerRef!: ElementRef<HTMLElement>;
  @ViewChildren('timelineItem') itemRefs!: QueryList<ElementRef>;

  experiences: IExperince[] = [];
  revealedItems: boolean[] = [];
  dotPositions: number[] = [];

  private scrollFn = () => this.onScroll();

  constructor(
    public expService: ExperinceServices, // ← public
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.expService.getExperiences().subscribe(res => {
      this.experiences = res;
      this.revealedItems = new Array(res.length).fill(false);
      this.cdr.detectChanges();
      setTimeout(() => this.calculateDotPositions(), 100);
    });
  }

  ngAfterViewInit() {
    this.initStars();
    window.addEventListener('scroll', this.scrollFn);
    setTimeout(() => {
      this.calculateDotPositions();
      this.onScroll();
    }, 300);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollFn);
  }

  calculateDotPositions() {
    const container = this.containerRef?.nativeElement;
    if (!container) return;

    const containerTop = container.getBoundingClientRect().top + window.scrollY;

    this.dotPositions = this.itemRefs.map(itemRef => {
      const itemTop = itemRef.nativeElement.getBoundingClientRect().top + window.scrollY;
      const itemMiddle = itemTop - containerTop + (itemRef.nativeElement.offsetHeight / 2);
      return itemMiddle;
    });

    this.cdr.detectChanges();
  }

  onScroll() {
    const section = this.sectionRef?.nativeElement;
    const lineFill = this.lineFillRef?.nativeElement;
    if (!section || !lineFill) return;

    const sectionTop = section.getBoundingClientRect().top;
    const sectionHeight = section.offsetHeight;
    const windowHeight = window.innerHeight;

    const scrolled = windowHeight - sectionTop;
    const percentage = Math.min(100, Math.max(0, (scrolled / sectionHeight) * 120));

    lineFill.style.height = percentage + '%';

    const lineHeight = lineFill.offsetHeight;
    this.dotPositions.forEach((dotPos, i) => {
      this.revealedItems[i] = lineHeight >= dotPos;
    });

    this.cdr.detectChanges();
  }

  getImageUrl(image: string | undefined): string {
    if (!image) return 'assets/default-company.png';
    return `${this.expService.imageBaseUrl}${image}`; // ← التعديل هنا
  }

  formatDate(date: string | undefined): string {
    if (!date) return 'Present';
    return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }

  initStars() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars: any[] = [];
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5
      });
    }
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
        s.x -= 0.3;
        if (s.x < 0) s.x = canvas.width;
      });
      requestAnimationFrame(anim);
    };
    anim();
  }
}