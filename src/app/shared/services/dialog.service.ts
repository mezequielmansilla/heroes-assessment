import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor() { }

  confirm(message: string): Observable<boolean> {
    // TODO: add dialog
    const result = confirm(message);
    return of(result);
  }
}
