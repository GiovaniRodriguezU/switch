import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  action: 'ingresar' | 'registrarse' = 'ingresar';
  loading = null;
  error = null;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
  }

  signIn(form: NgForm) {
    this.loading = true;
    this.error = null;
    const {user, password, userName} = form.value;

    try {
      if(this.isLogin) {
        this.auth.signIn(user, password);
      } else {
        this.auth.signUpEmail(user, password, userName);
      }
    } catch (error) {
      this.error = error.message;
    };
  }

  get isLogin() {
    return this.action === 'ingresar';
  }

  get isSignup() {
    return this.action === 'registrarse';
  }

}
