/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HeroListComponent } from './hero-list.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Hero } from 'src/app/models/hero';

describe('HeroListComponent', () => {
  let component: HeroListComponent;
  let fixture: ComponentFixture<HeroListComponent>;
  let httpTestingController: HttpTestingController;


  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [HeroListComponent],
      imports: [
        BrowserModule,
        MatPaginatorModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        HttpClientTestingModule,
        MatDialogModule,
        ReactiveFormsModule
      ]

    })
      .compileComponents();

      httpTestingController = TestBed.inject(HttpTestingController);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get all heroes', () => {
    const mockHeroes: Hero[] = [{
      id: 1,
      name: 'test23'
    }];

    component.delete(1);

    const req = httpTestingController.expectOne(environment.apiURL + '/heroes');

    expect(req.request.method).toEqual('GET');

    req.flush(mockHeroes);
  });

  it('should apply filter', () => {
    const event: any = { target: { value: 'Spider' }};
    component.dataSource = new MatTableDataSource([]);
    component.applyFilter(event);
  });
  it('should delete', () => {

    const mockHeroes: Hero = {
      id: 1,
      name: 'test23'
    };

    component.delete(1);

    const req = httpTestingController.expectOne(environment.apiURL + '/hero/1');

    expect(req.request.method).toEqual('DELETE');

    req.flush(mockHeroes);

  });
});
