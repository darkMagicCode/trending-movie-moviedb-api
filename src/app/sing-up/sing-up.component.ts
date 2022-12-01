import { AuthService } from './../auth.service';
import { FormGroup, FormControl, Validators,  } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss']
})
export class SingUpComponent implements OnInit {

  constructor(private _AuthService: AuthService , private _Router:Router) { 
    
  }

  ngOnInit(): void {
  }

  registerForm: FormGroup  = new FormGroup(
    {
     'first_name': new FormControl(null,[Validators.required,Validators.pattern(/^[a-z]{1,10}$/)]),
     'last_name':new FormControl(null,[Validators.required,Validators.pattern(/^[a-z]{1,10}$/)]),
     'email':new FormControl(null,[Validators.required,Validators.email]),
     'password':new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    'age':new FormControl(null,[Validators.required,Validators.min(10),Validators.max(90)])
    }
  )

  errorMes: string = '';
  loading: boolean = false;
  submitRegForm(regForm:FormGroup) {

    this.loading = true;
    this._AuthService.signUp(regForm.value).subscribe((data) => {
      if (data.message === 'success') {
        console.log('tmm');
        this.loading = false;
        this._Router.navigate(['/login'])
        
      }
      else {
        console.log(this.errorMes = data.message);
        this.loading = false;

        
      }
    })
  }

}
