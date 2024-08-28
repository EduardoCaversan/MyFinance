import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from '../../shared/services/loading.service';
import { LoadingComponent } from '../../shared/components/loading/loading.component';
import { AuthService } from '../../shared/services/auth.service';
import { IconComponent } from '../../shared/components/icon/icon.component';

interface IUserInfo {
  username: string | null;
  password: string | null;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingComponent, IconComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    username: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required, Validators.minLength(8)])
  });
  public userInfo!: IUserInfo;
  public canSeePassword: boolean = false;
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

  public toggleCanSeePassword(): void {
    this.canSeePassword = !this.canSeePassword;
  }

  public isControlInvalid(control: AbstractControl, validatorName?: string): boolean {
    if (control.touched && control.invalid) {
      if (validatorName && control.errors)
        return control.errors[validatorName] !== undefined;
      return true;
    }
    return false;
  }
}
