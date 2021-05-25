import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroDetails, HeroesApiService } from '../sdk-heroes';
import { DialogService, ToastService } from '../shared/services';
import { HeroesDetailsComponent } from './heroes-details.component';

const heroMock: HeroDetails = {
  id: 1,
  name: 'Test',
};

describe('HeroesDetailsComponent', () => {
  let component: HeroesDetailsComponent;
  let fixture: ComponentFixture<HeroesDetailsComponent>;
  let heroesApiService: jasmine.SpyObj<HeroesApiService>;

  beforeEach(async(() => {
    heroesApiService = jasmine.createSpyObj<HeroesApiService>([
      'getHeroDetails',
      'updateHero',
      'addHero',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule, ReactiveFormsModule],
      declarations: [HeroesDetailsComponent],
      providers: [
        {
          provide: HeroesApiService,
          useValue: heroesApiService,
        },
        {
          provide: ToastService,
          useValue: {},
        },
        {
          provide: DialogService,
          useValue: {},
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesDetailsComponent);
    component = fixture.componentInstance;
    heroesApiService.getHeroDetails.and.returnValue(of(heroMock));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
