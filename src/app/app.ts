import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './layout/navbar/navbar';
import { Footer } from './layout/shared/footer/footer';
import { Loader } from './layout/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,Navbar,Footer,Loader],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('portfolio');
}
