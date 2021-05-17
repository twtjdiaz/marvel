/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Hero } from '../models/hero';
import { HeroService } from './hero.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('Service: Hero', () => {

  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(HeroService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should ...', inject([HeroService], (service: HeroService) => {
    expect(service).toBeTruthy();
  }));

  it('should get heroes', () => {
    const mockHeroes = [
      {
        id: 1,
        name: 'spiderman'
      }
    ];

    service.getAllHeroes().subscribe((data) => {
      expect(data.length).toBeGreaterThan(0);
    });

    const req = httpTestingController.expectOne(environment.apiURL + '/heroes');

    expect(req.request.method).toEqual('GET');

    req.flush(mockHeroes);
  });

  it('should create a hero', () => {
    const mockHeroes: Hero = new Hero();
    mockHeroes.name = 'test23';

    service.addNewHero(mockHeroes).subscribe((data) => {

    });

    const req = httpTestingController.expectOne(environment.apiURL + '/hero');

    expect(req.request.method).toEqual('POST');

    req.flush(mockHeroes);

  });

  it('should update a hero', () => {
    const mockHeroes: Hero = {
      id: 1,
      name: 'test23'
    };

    service.updateHero(mockHeroes).subscribe((data) => {
      expect(data.id).toBe(1);
    });

    const req = httpTestingController.expectOne(environment.apiURL + '/hero');

    expect(req.request.method).toEqual('PATCH');

    req.flush(mockHeroes);

  });

  it('should delete a hero', () => {
    const mockHeroes: Hero = {
      id: 1,
      name: 'test23'
    };

    service.deleteHero(1).subscribe((data) => {
    });

    const req = httpTestingController.expectOne(environment.apiURL + '/hero/1');

    expect(req.request.method).toEqual('DELETE');

    req.flush(mockHeroes);
  });

  it('should get a hero', () => {
    const mockHeroes: Hero = {
      id: 1,
      name: 'test23'
    };

    service.getHero(1).subscribe((data) => {
    });

    const req = httpTestingController.expectOne(environment.apiURL + '/hero/1');

    expect(req.request.method).toEqual('GET');

    req.flush(mockHeroes);
  });
});
