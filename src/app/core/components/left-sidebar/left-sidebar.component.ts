import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './left-sidebar.component.html', 
})
export class LeftSidebarComponent {

  router = inject(Router)
  logout(){
    this.router.navigate(['/', 'auth'])
  }
}
