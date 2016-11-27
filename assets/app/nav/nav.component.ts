import {Component, OnInit} from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'navbar',
  templateUrl: '/nav.component.html',
  styleUrls: ['/nav.component.css']
})
export class NavComponent implements OnInit{
  constructor(private _authService:AuthService, private router:Router){}
  ngOnInit(){

  }
  logout(){
    this._authService.logout().take(1).subscribe(
      next=>{
        this.router.navigate(['login']);
      },
      error=>{
      },
      ()=>{
        console.log("Logout completed.")
      }
    );
  }
  isLoggedIn(){
    return this._authService.isLoggedIn();
  }
}
