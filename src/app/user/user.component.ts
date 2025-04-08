import { Component, Input, Output, EventEmitter, output } from '@angular/core'; //, computed, signal

//import { DUMMY_USERS } from '../dummy-users';
//const randonIndex = Math.floor(Math.random() * DUMMY_USERS.length)

//type User = {
//  id: string;
//  avatar: string;
//  name: string;
//}

//interface User {
//  id: string;
//  avatar: string;
//  name: string;
//}
import { type User } from './user.model';
import { CardComponent } from '../shared/card/card.component';

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  imports: [CardComponent]
})

export class UserComponent {
  // essa manipulação com sinais é algo novo no angular
  //avatar = input.required<string>();
  //name = input.required<string>();

  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  @Output() select = new EventEmitter<string>();
  //select = output<string>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  onSelectUser() {
    this.select.emit(this.user.id);
  }

}
