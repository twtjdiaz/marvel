import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Hero } from 'src/app/models/hero';
import { HeroService } from 'src/app/services/hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  heroForm = this.fb.group({
    name: [null, Validators.required],
  });

  hero: Hero = new Hero();

  constructor(
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private heroService: HeroService,
    private route: Router
  ) {
    const idParam = Number(this.activeRoute.snapshot.paramMap.get('id'));
    if (idParam) {
      this.hero.id = idParam;
    }
  }

  ngOnInit(): void {
    if (this.hero.id) {
      this.heroService.getHero(this.hero.id).subscribe((hero: Hero) => {
        this.hero = hero;
        for (const key in this.heroForm.controls) {
          if (this.heroForm.controls.hasOwnProperty(key)) {
            this.heroForm.get(key).setValue(this.hero[key]);
          }
        }
      });
    }
  }

  save(): void {
    if (this.heroForm.valid) {
      this.hero = {
        ...this.hero,
        ...this.heroForm.getRawValue()
      };

      if (this.hero.id) {

        this.heroService.updateHero(this.hero).subscribe(() => {
          this.route.navigate(['/']);
        });

      } else {
        this.heroService.addNewHero(this.hero).subscribe(() => {
          this.route.navigate(['/']);
        });
      }
    }
  }

  getErrorMessage(control: FormControl): string {
    for (const key in control.errors) {
      if (key === 'required') {
        return 'El campo es requerido';
      }
    }
  }

}
