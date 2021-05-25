import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { HeroesApiService } from '../sdk-heroes';
import { Unsubscriber } from '../shared/classes';
import { AppParamsEnum, AppRoutesEnum } from '../shared/enums';
import { ToastService } from '../shared/services';
import { HeroesDetailsFormNamesEnum } from './enums';
import { HeroDetailsFormBuilder } from './heroes-details.form-builder';

@Component({
  selector: 'app-heroes-details',
  templateUrl: './heroes-details.component.html',
  styleUrls: ['./heroes-details.component.scss'],
})
export class HeroesDetailsComponent implements OnInit, OnDestroy {
  private unsubscriber = new Unsubscriber();
  readonly formNames = HeroesDetailsFormNamesEnum;
  heroId: number;
  heroForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private heroApiService: HeroesApiService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.route.params
      .pipe(takeUntil(this.unsubscriber.done$))
      .subscribe((param) => {
        this.heroId = +param[AppParamsEnum.HERO_ID];
        this.heroDataInit();
      });
  }

  ngOnDestroy(): void {
    this.unsubscriber.complete();
  }

  onCancel(): void {
    this.router.navigate([AppRoutesEnum.HEROES_LIST]);
  }

  onCreate(): void {
    const hero = HeroDetailsFormBuilder.getValue(this.heroForm);
    this.heroApiService.addHero(hero).subscribe(
      () => {
        this.onCancel();
        this.toastService.success('Heroe creado');
      },
      () => {
        this.toastService.error('Heroe no creado');
      }
    );
  }

  onUpdate(): void {
    const hero = HeroDetailsFormBuilder.getValue(this.heroForm);
    this.heroApiService.updateHero(hero).subscribe(
      () => {
        this.onCancel();
        this.toastService.success('Heroe actualizado');
      },
      () => {
        this.toastService.error('Heroe no actualizado');
      }
    );
  }

  private createForm(): void {
    this.heroForm = HeroDetailsFormBuilder.create(this.fb);
  }

  private heroDataInit(): void {
    this.heroApiService.getHeroDetails(this.heroId).subscribe((hero) => {
      HeroDetailsFormBuilder.setValue(this.heroForm, hero);
    });
  }
}
