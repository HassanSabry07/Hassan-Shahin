import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ViewChildren, QueryList,
  ElementRef, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IContact } from '../../core/models/contact.model';
import { ContactService } from '../../core/services/contact.services';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  encapsulation: ViewEncapsulation.None
})
export class Contact implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('starCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChildren('contactCard') cardRefs!: QueryList<ElementRef>;

  contacts: IContact[] = [];
  revealedItems: boolean[] = [];

  private scrollFn = () => this.onScroll();

  // ألوان مختلفة لكل كارت بالتناوب
  colors = ['#00f5ff', '#ff6b6b', '#51cf66', '#cc5de8', '#ffd43b', '#4dabf7'];

  constructor(
    private contactService: ContactService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
      this.revealedItems = new Array(res.length).fill(false);
      this.cdr.detectChanges();
      setTimeout(() => this.onScroll(), 300);
    });
  }

  ngAfterViewInit() {
    this.initStars();
    window.addEventListener('scroll', this.scrollFn);
    setTimeout(() => this.onScroll(), 300);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollFn);
  }

  getColor(index: number): string {
    return this.colors[index % this.colors.length];
  }

  getIconClass(icon: string): string {
    if (!icon) return 'fas fa-link';
    const brands = ['linkedin', 'github', 'facebook', 'instagram', 'twitter', 'youtube', 'tiktok', 'whatsapp', 'telegram', 'discord'];
    const isBrand = brands.some(b => icon.toLowerCase().includes(b));
    return isBrand ? `fab fa-${icon}` : `fas fa-${icon}`;
  }

  getHref(c: IContact): string {
    if (c.link) return c.link;
    if (c.icon?.includes('envelope') || c.type?.toLowerCase() === 'email') return `mailto:${c.value}`;
    if (c.icon?.includes('phone') || c.type?.toLowerCase() === 'phone') return `tel:${c.value}`;
    return c.value;
  }

  onScroll() {
    const wh = window.innerHeight;
    this.cardRefs?.forEach((ref, i) => {
      const rect = ref.nativeElement.getBoundingClientRect();
      this.revealedItems[i] = rect.top < wh - 60 && rect.bottom > 60;
    });
    this.cdr.detectChanges();
  }

  getDelay(i: number): string {
    return `${(i % 3) * 0.12}s`;
  }

  initStars() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const stars: any[] = [];
    for (let i = 0; i < 150; i++)
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: Math.random() * 1.5 });
    const anim = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'white';
      stars.forEach(s => {
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        s.x -= 0.3; if (s.x < 0) s.x = canvas.width;
      });
      requestAnimationFrame(anim);
    };
    anim();
  }
}