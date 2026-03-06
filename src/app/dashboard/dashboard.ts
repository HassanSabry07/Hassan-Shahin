import { Component } from '@angular/core';
import { AddFooter } from './shared/add-footer/add-footer';
import { AddHeader } from './shared/add-header/add-header';
import { RouterOutlet } from '@angular/router';
import { Login } from './login/login';

@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet,AddHeader,AddFooter,Login],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {

}
