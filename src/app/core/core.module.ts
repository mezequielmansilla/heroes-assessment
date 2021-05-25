import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ShellComponent } from './components/shell/shell.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [ShellComponent],
  exports: [ShellComponent],
  imports: [CommonModule, MaterialModule, MatToolbarModule],
})
export class CoreModule {}
