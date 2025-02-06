import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

import { UserComponent } from './user/user.component';
import { DUMMY_USERS } from './dummy-users';


@Component({
  selector: 'app-root',
  imports: [HeaderComponent, UserComponent], 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'Angular19-Project';
  users = DUMMY_USERS;
}
