import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { Footer } from './shared/footer/footer';
    import { NgxGalaxyComponent } from "@omnedia/ngx-galaxy";
import { Home } from './home/home';
import { About } from './about/about';
import { Skills } from './skills/skills';
import { Projects } from './projects/projects';
import { Contact } from './contact/contact';
import { Experince } from './experince/experince';
import { MessageComponent } from './message/message';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet,Header,Footer,NgxGalaxyComponent,Home,About,Skills,Projects,Contact,Experince,MessageComponent],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
  standalone: true,
    template: `
    <app-navbar></app-navbar>
    <app-home></app-home>
    <app-about></app-about>
    <app-skills></app-skills>
    <app-experince></app-experince>
    <app-projects></app-projects>
    <app-contact></app-contact>
    <app-message></app-message>

  `
})
export class Layout {

}
