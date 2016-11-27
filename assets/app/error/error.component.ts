import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../shared/services/error.service';
import { Error } from '../shared/models/error';
@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  errorDisplay="none";
  errorData:Error;
  constructor(private _errorService: ErrorService) { }
  onErrorHandle(){
    this.errorDisplay='none';
  }
  ngOnInit() {
    this._errorService.errorOccurred.subscribe(
      errorData=>{
        this.errorData= errorData;
        this.errorDisplay ='block';
      }
    )
  }

}
