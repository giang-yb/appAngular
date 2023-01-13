import { AcccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  [x: string]: any;
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder, 
    private accountServices: AcccountService, 
    private route: Router,
    private authService: AuthService,
  ) { }
  message!: string;
  statusMessage: boolean = true;
  account: any;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [true]
    });
    this.accountServices.getListAccount().subscribe((res: any) => {
      this.account = res;
      // console.log(res);
      localStorage.setItem('accountData', JSON.stringify(res));
    });
    this.autoLogin();
  }
  getUserName() {
    return this.loginForm.get('userName');
  }
  getPassWord() {
    return this.loginForm.get('password');
  }
  isFieldValid(field: string) {
    return this.loginForm.get(field)?.touched;
  }

  randomString(length) {
    let randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  submitForm() {
    if (this.loginForm.valid) {
      this.loginForm.value;
      console.log(this.loginForm.value);
      sessionStorage.setItem('tokenLogin', JSON.stringify(this.randomString(10)));
      console.log(sessionStorage.getItem('tokenLogin'));
      let data = JSON.parse(localStorage.getItem('accountData') || '{}');
      data.forEach((_data: any) => {
        if (this.loginForm.controls['userName'].value == _data.userName && this.loginForm.controls['password'].value == _data.password) {
          this.authService.logIn();
          sessionStorage.setItem('userName', _data.userName);
          sessionStorage.setItem('role', _data.phanQuyen);
          localStorage.setItem('combineId', _data.combineId);
          this.route.navigate(['/welcome']);
        } else {
          console.log('failed to login');
          this.statusMessage = true;
          this.message = 'Wrong account or password';
        }
      });
    } else {
      Object.values(this.loginForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  autoLogin(){
    if (sessionStorage.getItem('tokenLogin') !== null) {
      this.authService.logIn();
      this.route.navigate(['/welcome']);
    } else {
      this.route.navigate(['']);
    }
  }
}
