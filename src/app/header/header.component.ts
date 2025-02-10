import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,//pode ser utilizado em outras partes da aplicação, sem precisar ser registrado em um módulo
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent { }
