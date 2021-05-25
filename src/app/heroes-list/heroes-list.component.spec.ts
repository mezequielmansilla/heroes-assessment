import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { HeroDetails, HeroesApiService } from '../sdk-heroes';
import { DialogService, ToastService } from '../shared/services';
import { HeroesListComponent } from './heroes-list.component';

const heroMock: HeroDetails = {
  id: 1,
  name: 'Test',
};

describe('HeroesListComponent', () => {
  let component: HeroesListComponent;
  let fixture: ComponentFixture<HeroesListComponent>;
  let heroesApiService: jasmine.SpyObj<HeroesApiService>;

  beforeEach(async(() => {
    heroesApiService = jasmine.createSpyObj<HeroesApiService>([
      'getHeroList',
      'deleteHero',
    ]);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeroesListComponent],
      providers: [
        {
          provide: HeroesApiService,
          useValue: heroesApiService,
        },
        {
          provide: ToastService,
          useValue: {
            error: () => {}
          },
        },
        {
          provide: DialogService,
          useValue: {
            confirm: () => of(true),
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesListComponent);
    component = fixture.componentInstance;
    heroesApiService.getHeroList.and.returnValue(of({ heroes: [heroMock] }));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have one hero', () => {
    expect(component.dataSource.data).toBeTruthy();
    expect(component.dataSource.data.length).toBe(1);
  });

  describe('delete hero', () => {
    it('should call HeroesApiService.deleteHero ', () => {
      component.onDeleteHero(heroMock);
      expect(heroesApiService.deleteHero).toHaveBeenCalled();
    });
  });
});
