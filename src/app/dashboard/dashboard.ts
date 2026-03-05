import { Component } from '@angular/core';
import { AddFooter } from './shared/add-footer/add-footer';
import { AddHeader } from './shared/add-header/add-header';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,AddHeader,AddFooter],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
