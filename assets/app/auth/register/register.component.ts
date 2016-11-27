import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService} from '../../shared/services/auth.service';
import { User } from '../../shared/models/user';
import { ErrorComponent } from '../../error/error.component';
import { ErrorService } from '../../shared/services/error.service';

import 'rxjs/Rx';

@Component({
    selector: 'register',
    templateUrl: '/register.component.html',
    styleUrls: ['/register.component.css']
})
export class RegisterComponent implements OnInit {
    constructor(private _authService: AuthService,private _errorService:ErrorService, private formBuilder: FormBuilder, private router:Router) { }
    registerForm: FormGroup;

    passwordChecker() {
        return this.registerForm.value.confirm === this.registerForm.value.password;
    }
    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
            password: ['', Validators.required]
        });
    }
    onSubmit() {
        if (!this.registerForm.valid) {
            return console.error("error")
        }
        const user = new User(this.registerForm.value.firstName, this.registerForm.value.lastName, this.registerForm.value.email, this.registerForm.value.password);
        this._authService.registerNewUser(user)
        .subscribe(
          data=>{console.log(user);
            this._authService.login(user).subscribe(
              data=>{
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data.userId);
                this.router.navigate(['/todo']);
              },
              error=>console.error(error)
            )
          },
          error=>console.error(error)
        );
        this.registerForm.reset();
    }
}
