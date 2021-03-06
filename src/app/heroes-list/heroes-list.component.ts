import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { filter, switchMap } from 'rxjs/operators';

import { HeroDetails, HeroesApiService } from '../sdk-heroes';
import { AppRoutesEnum } from '../shared/enums';
import { DialogService, ToastService } from '../shared/services';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: ['./heroes-list.component.scss'],
})
export class HeroesListComponent implements OnInit {
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ['id', 'name', 'actions'];
  constructor(
    private router: Router,
    private herosApiService: HeroesApiService,
    private dialogService: DialogService,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.herosDataInit();
  }

  private herosDataInit(): void {
    this.herosApiService.getHeroList().subscribe((heroList) => {
      this.dataSource.data = heroList.heroes;
    });
  }

  private herosDataInitByName(name: string): void {
    this.herosApiService.getHeroListByName(name).subscribe((heroList) => {
      this.dataSource.data = heroList.heroes;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue) {
      this.herosDataInitByName(filterValue);
    } else {
      this.herosDataInit();
    }
  }

  onAddHero(): void {
    this.router.navigate([AppRoutesEnum.HEROES_DETAILS]);
  }

  onEditHero(hero: HeroDetails): void {
    this.router.navigate([AppRoutesEnum.HEROES_DETAILS, hero.id]);
  }

  onDeleteHero(hero: HeroDetails): void {
    this.dialogService
      .confirm(`Esta seguro de eliminar el heroe ${hero.name}?`)
      .pipe(
        filter((confirm) => !!confirm),
        switchMap(() => this.herosApiService.deleteHero(hero.id))
      )
      .subscribe(() => {
        this.toastService.success('Heroe eliminado');
        this.herosDataInit();
      }, () => {
        this.toastService.error('Heroe no eliminado');
      });
  }
}
