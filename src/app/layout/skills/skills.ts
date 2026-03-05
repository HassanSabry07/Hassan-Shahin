import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsServices } from '../../core/services/skills.services';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './skills.html',
  styleUrls: ['./skills.css'],
  encapsulation: ViewEncapsulation.None // ✅ ده الحل - بيخلي Font Awesome يشتغل
})
export class Skills implements OnInit, AfterViewInit {
  @ViewChild('starCanvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  skills: any[] = [];

  private brandIcons = [
    'angular', 'react', 'vuejs', 'node-js', 'node', 'js',
    'html5', 'css3', 'sass', 'bootstrap', 'github', 'gitlab',
    'git-alt', 'docker', 'python', 'java', 'php', 'laravel',
    'wordpress', 'aws', 'google', 'microsoft', 'linux', 'ubuntu',
    'npm', 'yarn', 'figma', 'sketch', 'trello', 'slack',
    'twitter', 'facebook', 'bitbucket', 'swift', 'android',
    'apple', 'raspberry-pi'
  ];

  constructor(public skillService: SkillsServices, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.skillService.getSkills().subscribe(res => {
      this.skills = res;
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    this.initStars();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        } else {
          entry.target.classList.remove('reveal');
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.marquee-row').forEach(row => observer.observe(row));
  }

  getIconClass(icon: string): string {
    if (!icon) return 'fas fa-code skill-icon';
    const isBrand = this.brandIcons.some(b => icon.toLowerCase().includes(b));
    return isBrand ? `fab fa-${icon} skill-icon` : `fas fa-${icon} skill-icon`;
  }

  initStars() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let stars: any[] = [];
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