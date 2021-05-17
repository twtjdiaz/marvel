/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule} from '@angular/platform-browser';

import { HeroFormComponent } from './hero-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Hero } from 'src/app/models/hero';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

describe('HeroFormComponent', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let httpTestingController: HttpTestingController;
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [HeroFormComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule
      ]

    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create hero', () => {
    const mockHeroes: Hero = {
      id: 1,
      name: 'test23'
    };

    component.heroForm.get('name').setValue('test23');
    component.save();


    const req = httpTestingController.expectOne(environment.apiURL + '/hero');

    expect(req.request.method).toEqual('POST');

    req.flush(mockHeroes);
  });
});

describe('HeroFormComponent with id', () => {
  let component: HeroFormComponent;
  let fixture: ComponentFixture<HeroFormComponent>;
  let httpTestingController: HttpTestingController;
  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [HeroFormComponent],
      imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        HttpClientTestingModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        }
      ]

    })
      .compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const mockHeroes: Hero = {
      id: 1,
      name: 'test23'
    };

    const req = httpTestingController.expectOne(environment.apiURL + '/hero/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockHeroes);

    expect(component.heroForm.get('name').value).toEqual('test23');

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should edit hero', () => {
    const mockHeroes: Hero = {
      id: 1,
      name: 'test23'
    };

    component.heroForm.get('name').setValue('test23');
    component.save();


    const req = httpTestingController.expectOne(environment.apiURL + '/hero');

    expect(req.request.method).toEqual('PATCH');

    req.flush(mockHeroes);
  });
});
