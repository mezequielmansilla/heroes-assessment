import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppParamsEnum } from '../shared/enums';

import { HeroesDetailsComponent } from './heroes-details.component';

const routes: Routes = [
  {
    path: '',
    component: HeroesDetailsComponent,
  },
  {
    path: `:${AppParamsEnum.HERO_ID}`,
    component: HeroesDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesDetailsRoutingModule {}
