import {
  Component, OnInit, AfterViewInit, OnDestroy,
  ViewChild, ViewChildren, QueryList,
  ElementRef, ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsServices } from '../../core/services/projects.services';
import { IProjects } from '../../core/models/projects.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrls: ['./projects.css'],
  encapsulation: ViewEncapsulation.None
})
export class Projects implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('starCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  @ViewChildren('projectCard') cardRefs!: QueryList<ElementRef>;

  allProjects: IProjects[] = [];
  visibleProjects: IProjects[] = [];
  revealedItems: boolean[] = [];

  initialCount = 4;
  showAll = false;

  selectedProject: IProjects | null = null;
  modalOpen = false;

  private scrollFn = () => this.onScroll();
  private keyFn = (e: KeyboardEvent) => { if (e.key === 'Escape') this.closeModal(); };

  constructor(
    public projectsService: ProjectsServices, // ← public
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.projectsService.getProjects().subscribe(res => {
      this.allProjects = res;
      this.visibleProjects = res.slice(0, this.initialCount);
      this.revealedItems = new Array(this.visibleProjects.length).fill(false);
      this.cdr.detectChanges();
      setTimeout(() => this.onScroll(), 300);
    });
  }

  ngAfterViewInit() {
    this.initStars();
    window.addEventListener('scroll', this.scrollFn);
    window.addEventListener('keydown', this.keyFn);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollFn);
    window.removeEventListener('keydown', this.keyFn);
  }

  openModal(project: IProjects) {
    this.selectedProject = project;
    this.modalOpen = true;
    document.body.style.overflow = 'hidden';
    this.cdr.detectChanges();
  }

  closeModal() {
    this.modalOpen = false;
    document.body.style.overflow = '';
    setTimeout(() => {
      this.selectedProject = null;
      this.cdr.detectChanges();
    }, 300);
  }

  onBackdropClick(event: MouseEvent) {
    if ((event.target as HTMLElement).classList.contains('modal-backdrop')) {
      this.closeModal();
    }
  }

  getToolsArray(tools: string): string[] {
    return tools ? tools.split(',').map(t => t.trim()).filter(Boolean) : [];
  }

  toggleShowAll() {
    this.showAll = !this.showAll;
    this.visibleProjects = this.showAll
      ? this.allProjects
      : this.allProjects.slice(0, this.initialCount);

    if (!this.showAll) {
      setTimeout(() => {
        document.querySelector('.projects-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }

    this.revealedItems = new Array(this.visibleProjects.length).fill(false);
    this.cdr.detectChanges();
    setTimeout(() => this.onScroll(), 100);
  }

  get hasMore(): boolean {
    return this.allProjects.length > this.initialCount;
  }

  onScroll() {
    const windowHeight = window.innerHeight;
    this.cardRefs?.forEach((cardRef, i) => {
      const rect = cardRef.nativeElement.getBoundingClientRect();
      const inView = rect.top < windowHeight - 60 && rect.bottom > 60;
      this.revealedItems[i] = inView;
    });
    this.cdr.detectChanges();
  }

  onMouseMove(event: MouseEvent, card: HTMLElement) {
    const rect = card.getBoundingClientRect();
    const rotateX = ((event.clientY - rect.top - rect.height / 2) / rect.height) * -10;
    const rotateY = ((event.clientX - rect.left - rect.width / 2) / rect.width) * 10;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  }

  onMouseLeave(card: HTMLElement) {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  }

  getImageUrl(image: string | undefined): string {
    if (!image) return '';
    return `${this.projectsService.imageBaseUrl}${image}`; // ← التعديل هنا
  }

  getDelay(index: number): string {
    return index % 2 === 0 ? '0s' : '0.15s';
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