import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HeroesDetailsFormNamesEnum } from './enums/heroes-details-form-names.enum';
import { HeroDetails } from '../sdk-heroes';

export class HeroDetailsFormBuilder {
  static create(fb: FormBuilder): FormGroup {
    return fb.group({
      [HeroesDetailsFormNamesEnum.ID]: fb.control('', Validators.required),
      [HeroesDetailsFormNamesEnum.NAME]: fb.control('', Validators.required),
    });
  }

  static setValue(form: FormGroup, hero: HeroDetails): void {
    form.setValue({
      [HeroesDetailsFormNamesEnum.ID]: hero.id,
      [HeroesDetailsFormNamesEnum.NAME]: hero.name,
    });
  }

  static getValue(form: FormGroup): HeroDetails {
    const formValues = form.value;
    const hero = new HeroDetails();
    hero.id = formValues[HeroesDetailsFormNamesEnum.ID];
    hero.name = formValues[HeroesDetailsFormNamesEnum.NAME];
    return hero;
  }
}
