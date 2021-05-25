import { NgModule } from '@angular/core';

import { HeroesDetailsRoutingModule } from './heroes-details-routing.module';
import { HeroesDetailsComponent } from './heroes-details.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HeroesDetailsComponent],
  imports: [
    SharedModule,
    HeroesDetailsRoutingModule
  ]
})
export class HeroesDetailsModule { }
