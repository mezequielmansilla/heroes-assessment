import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  success(message: string): void {
    this.snackBar.open(`[SUCCESS] ${message}`);
  }
  error(message: string): void {
    this.snackBar.open(`[ERROR] ${message}`);
  }
  warning(message: string): void {
    this.snackBar.open(`[WARNING] ${message}`);
  }
  info(message: string): void {
    this.snackBar.open(`[INFO] ${message}`);
  }
}
