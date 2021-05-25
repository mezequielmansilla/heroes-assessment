import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutesEnum } from './shared/enums';

const routes: Routes = [
  {
    path: '',
    redirectTo: `/${AppRoutesEnum.DEFAULT_PAGE}`,
    pathMatch: 'full',
  },
  {
    path: `${AppRoutesEnum.HEROES_LIST}`,
    loadChildren: () =>
      import('./heroes-list/heroes-list.module').then(
        (m) => m.HeroesListModule
      ),
  },
  {
    path: `${AppRoutesEnum.HEROES_DETAILS}`,
    loadChildren: () =>
      import('./heroes-details/heroes-details.module').then(
        (m) => m.HeroesDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
