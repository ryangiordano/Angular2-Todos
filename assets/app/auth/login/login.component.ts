import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { ErrorComponent } from '../../error/error.component';
import { ErrorService } from '../../shared/services/error.service';
import 'rxjs/Rx';



@Component({
  selector: 'login',
  templateUrl: '/login.component.html',
  styleUrls: ['/login.component.css']
})
export class LoginComponent implements OnInit{
  constructor(private _authService:AuthService, private formBuilder:FormBuilder,private router:Router){}
  loginForm:FormGroup
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
        password: ['', Validators.required]
    });
  }

  onSubmit(){
    let user = new User(null, null,this.loginForm.value.email, this.loginForm.value.password);
    this._authService.login(user).subscribe(
      data=>{
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        this.router.navigate(['/todo']);
      }
    )
  }
}
