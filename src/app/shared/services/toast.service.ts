import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(message);
  }
  error(message: string): void {
    this.snackBar.open(message);
  }
  warning(message: string): void {
    this.snackBar.open(message);
  }
  info(message: string): void {
    this.snackBar.open(message);
  }
}
