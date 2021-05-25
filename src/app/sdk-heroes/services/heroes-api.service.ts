import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { HeroList } from '../models/hero-list.model';
import { HeroDetails } from '../models/hero-details.model';
import { HERO_LIST } from '../mocks';

@Injectable()
export class HeroesApiService {
  private heroes = HERO_LIST.heroes;
  constructor() {}

  /** Return all heroes */
  getHeroList(): Observable<HeroList> {
    return of({ heroes: this.heroes });
  }

  /** Return a hero by id */
  getHeroDetails(id: number): Observable<HeroDetails> {
    const hero = this.heroes.find((h) => h.id === id);
    return of(hero);
  }

  /** Return hero by similar name */
  getHeroListByName(searchName: string): Observable<HeroList> {
    const heroes = this.heroes.filter((h) => h.name.includes(searchName));
    return of({ heroes });
  }

  /** Update a hero */
  updateHero(hero: HeroDetails): Observable<HeroDetails> {
    const heroIndex = this.heroes.findIndex((h) => h.id === hero.id);
    let removed = false;
    if (heroIndex >= 0) {
      this.heroes[heroIndex] = hero;
      removed = true;
    }
    return of(hero);
  }

  /** Delete a hero by id */
  deleteHero(id: number): Observable<boolean> {
    const heroIndex = this.heroes.findIndex((h) => h.id === id);
    let removed = false;
    if (heroIndex >= 0) {
      this.heroes.splice(0, heroIndex);
      removed = true;
    }
    return of(removed);
  }
}
