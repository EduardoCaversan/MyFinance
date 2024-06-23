import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { AuthService } from '../../shared/services/auth.service';

interface IUserInfo {
  username: string | null;
  password: string | null;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  public userInfo!: IUserInfo;

  constructor(
    private router: Router,
    private loading: LoadingService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    var userInfo = this.auth.getLoggedUserInfo();
    if (userInfo.token)
      this.router.navigate(['financas']);
  }

  public onLoginRequest(): void {
    this.loading.show();
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      this.loading.hide();
      return;
    }

    const { username, password } = this.loginForm.value;
    this.userInfo = {
      username: username,
      password: password
    };

    this.auth.completeLogin({ username: username, password: password, token: 'teste' });
    var timeout = setTimeout(() => {
      this.router.navigate(['financas']);
      this.loading.hide();
      clearTimeout(timeout);
    }, 6000);
  }
}
