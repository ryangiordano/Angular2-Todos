import { Injectable, EventEmitter, Output} from '@angular/core';
import { Error} from '../models/error';
@Injectable()
export class ErrorService {
    @Output()
    errorOccurred = new EventEmitter<Error>();

    handleError(error: any) {
        const errorData = new Error(error.title, error.error.message);
        //grabs the emitter we set up there, loads it up with error data, which is an object passed into this function.
        this.errorOccurred.emit(errorData);
        console.log(errorData);
    }
    constructor() { }

}
