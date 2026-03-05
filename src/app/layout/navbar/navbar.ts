import {
  Component, OnDestroy, HostListener,
  ChangeDetectorRef, ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
  encapsulation: ViewEncapsulation.None
})
export class Navbar implements OnDestroy {

  activeSection = 'home';
  isScrolled    = false;
  menuOpen      = false;

  navItems = [
    { id: 'home',       label: 'Home',       selector: 'app-home',      route: '/home'       },
    { id: 'about',      label: 'About',      selector: 'app-about',     route: '/about'      },
    { id: 'skills',     label: 'Skills',     selector: 'app-skills',    route: '/skills'     },
    { id: 'experience', label: 'Experiences', selector: 'app-experince', route: '/experience' },
    { id: 'projects',   label: 'Projects',   selector: 'app-projects',  route: '/projects'   },
    { id: 'contact',    label: 'Contact',    selector: 'app-contact',   route: '/contact'    },
  ];

  private scrollFn = () => this.onScroll();

  constructor(
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    window.addEventListener('scroll', this.scrollFn);
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scrollFn);
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 50;

    if (this.isHomePage()) {
      let current = 'home';
      this.navItems.forEach(item => {
        const el = document.querySelector(item.selector);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45) current = item.id;
        }
      });
      this.activeSection = current;
    }

    this.cdr.detectChanges();
  }

  isHomePage(): boolean {
    return this.router.url === '/' || this.router.url === '';
  }

  goTo(item: any) {
    if (this.isHomePage()) {
      const el = document.querySelector(item.selector);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.activeSection = item.id;
    } else {
      this.router.navigate([item.route]);
    }
    this.menuOpen = false;
    this.cdr.detectChanges();
  }

  goHome() {
    if (this.isHomePage()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      this.router.navigate(['/']);
    }
    this.menuOpen = false;
  }

  toggleMenu() { this.menuOpen = !this.menuOpen; }
}