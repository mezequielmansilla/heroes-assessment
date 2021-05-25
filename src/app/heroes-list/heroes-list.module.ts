import { NgModule } from '@angular/core';

import { HeroesListRoutingModule } from './heroes-list-routing.module';
import { HeroesListComponent } from './heroes-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeroesListComponent],
  imports: [
    SharedModule,
    HeroesListRoutingModule
  ]
})
export class HeroesListModule { }
