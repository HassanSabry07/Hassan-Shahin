import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './add-header.html',
  styleUrls: ['./add-header.css']
})
export class AddHeader {
  menuOpen = false;

 navItems = [
  { route: 'addhome',       label: 'Home',       icon: 'fas fa-home'      },
  { route: 'addabout',      label: 'About',      icon: 'fas fa-user'      },
  { route: 'addskills',     label: 'Skills',     icon: 'fas fa-code'      },
  { route: 'addexperience', label: 'Experience', icon: 'fas fa-briefcase' },
  { route: 'addprojects',   label: 'Projects',   icon: 'fas fa-folder'    },
  { route: 'addcontact',    label: 'Contact',    icon: 'fas fa-envelope'  },
  { route: 'messages',      label: 'Messages',   icon: 'fas fa-inbox'     }, // ← جديد
];

  constructor(private router: Router) {}

  toggleMenu() { this.menuOpen = !this.menuOpen; }

  // ✅ Logout
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}