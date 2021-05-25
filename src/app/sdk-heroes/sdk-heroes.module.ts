import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroesApiService } from './services/heroes-api.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [HeroesApiService],
})
export class SdkHeroesModule {}
