import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { hideLoader, showLoader } from '@core/utils';
import { AuthService } from '@modules/auth/services';
import { isApiResponse } from '@core/models';
import { ToasterService } from '@core/services';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  router = inject(Router);
  authSvc = inject(AuthService)
  tS = inject(ToasterService)

  signinForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  signIn() {
    showLoader();
    const self = this;
    console.log(this.signinForm)
    this.authSvc.signIn(this.signinForm.value).subscribe({
      next(response) {
        if (isApiResponse(response)) {
          if (response.code === "0") {
            self.tS.toastr({
              type: 'warning',
              message: response.message
            })
          }
          if (response.code === "1") {
            let mainResponse = JSON.parse(response.payload);
            console.log(mainResponse)
            if (mainResponse.length == 1) {
              let data = mainResponse[0];
              localStorage.setItem('currentUser', data.token);
              localStorage.setItem('userData', JSON.stringify(data));
              self.router.navigate(['/', 'admin']);
              self.tS.toastr({
                type: 'success',
                message: response.message
              })
            }
          }
        }
      },
      error(err) {
        hideLoader()
        console.log(err)
      },
      complete() {
        hideLoader();
      },
    })
  }
}
