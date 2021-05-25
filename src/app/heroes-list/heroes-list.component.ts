import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { filter, switchMap } from 'rxjs/operators';

import { HeroDetails, HeroesApiService } from '../sdk-heroes';
import { DialogService } from '../shared/services';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'name', 'actions'];
  constructor(
    private herosApiService: HeroesApiService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.herosDataInit();
  }

  private herosDataInit(): void {
    this.herosApiService.getHeroList().subscribe((heroList) => {
      this.dataSource.data = heroList.heroes;
    });
  }

  onAddHero(): void {
    const hero = new HeroDetails();
    hero.id = 10;
    hero.name = 'Test add';
    this.herosApiService.addHero(hero).subscribe(() => {
      this.herosDataInit();
    });
  }

  onEditHero(hero: HeroDetails): void {
    this.herosApiService.updateHero(hero).subscribe(() => {
      this.herosDataInit();
    });
  }

  onDeleteHero(hero: HeroDetails): void {
    this.dialogService
      .confirm(`Esta seguro de eliminar el heroe ${hero.name}?`)
      .pipe(
        filter((confirm) => !!confirm),
        switchMap(() => this.herosApiService.deleteHero(hero.id))
      )
      .subscribe(() => {
        this.herosDataInit();
      });
  }
}
