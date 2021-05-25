import {
  Component,
  OnDestroy,
  OnInit,
  ReflectiveInjector,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

import { HeroDetails, HeroesApiService } from '../sdk-heroes';
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

  private getHero(): HeroDetails {
    if (this.heroForm.invalid) {
      const keys = Object.keys(this.heroForm.controls);
      this.heroForm.markAsTouched();
      keys.forEach((key) => {
        this.heroForm.get(key).markAsTouched();
      });
      return;
    }
    return HeroDetailsFormBuilder.getValue(this.heroForm);
  }

  onCreate(): void {
    const hero = this.getHero();
    if (!hero) {
      return;
    }
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
    const hero = this.getHero();
    if (!hero) {
      return;
    }
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

  hasRequiredError(formControlName): boolean {
    const hasError = this.heroForm.get(formControlName).hasError('required');
    return hasError;
  }

  hasMinLengthError(formControlName): boolean {
    const hasError = this.heroForm.get(formControlName).hasError('minlength');
    return hasError;
  }

  private createForm(): void {
    this.heroForm = HeroDetailsFormBuilder.create(this.fb);
  }

  private heroDataInit(): void {
    if (!this.heroId) {
      return;
    }
    this.heroApiService.getHeroDetails(this.heroId).subscribe((hero) => {
      HeroDetailsFormBuilder.setValue(this.heroForm, hero);
    });
  }
}
