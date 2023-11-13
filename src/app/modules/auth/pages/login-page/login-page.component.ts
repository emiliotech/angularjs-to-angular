import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { hideLoader, showLoader } from '@core/utils';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  router = inject(Router);

  signinForm = new FormGroup({
    usuario: new FormControl('', Validators.required),
    contrasenia: new FormControl('', Validators.required),
  }); 
  login(){
    showLoader();
    setTimeout(()=>{
      hideLoader();
      this.router.navigate(['/', 'admin']);
    }, 1000)
  }
}
