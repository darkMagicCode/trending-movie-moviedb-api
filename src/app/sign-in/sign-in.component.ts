import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators,  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(private _AuthService: AuthService , private _Router:Router) { 
    
  }

  ngOnInit(): void {   

  }

  registerForm: FormGroup  = new FormGroup(
    {
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    }
  )

  errorMes: string = '';
  loading: boolean = false;
  
  submitRegForm(regForm:FormGroup) {

    this.loading = true;
    this._AuthService.signIn(regForm.value).subscribe((data) => {
      if (data.message === 'success') {
        console.log('tmm');
        this.loading = false;
        this._Router.navigate(['/home'])
        localStorage.setItem('token', data.token)
        this._AuthService.saveUserData();
        
      }
      else {
        console.log(this.errorMes = data.message);
        this.loading = false;

        
      }
    })
  };
  




}
