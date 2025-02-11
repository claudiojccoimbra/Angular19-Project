import { Component, Input, Output, EventEmitter, output } from '@angular/core'; //, computed, signal

//import { DUMMY_USERS } from '../dummy-users';
//const randonIndex = Math.floor(Math.random() * DUMMY_USERS.length)

@Component({
  selector: 'app-user',
  standalone: true,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})

export class UserComponent {
  // essa manipulação com sinais é algo novo no angular
  //avatar = input.required<string>();
  //name = input.required<string>();

  //imagePath = computed(() => {
  //  return 'assets/users/' + this.avatar();
  //});
  //@Input({ required: true }) id!: string;
  //@Input({ required:true }) avatar!: string;
  //@Input({ required: true }) name!: string;

  @Input({ required: true }) user!: {
    id: string;
    avatar: string;
    name: string;
  };

  @Output() select = new EventEmitter<string>();
  //select = output<string>();

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }



  onSelectUser() {
    this.select.emit(this.user.id);
  }

}
