import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '@modules/auth/services';

@Component({
  selector: 'app-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './left-sidebar.component.html', 
})
export class LeftSidebarComponent { 
  private authSvc = inject(AuthService)
  logout(){
    this.authSvc.doLogout();
  }
}
