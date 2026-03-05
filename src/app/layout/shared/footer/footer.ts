import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Contact } from '../../contact/contact';

@Component({
  selector: 'app-footer',
  imports: [RouterLink,RouterLinkActive,Contact],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {

}
