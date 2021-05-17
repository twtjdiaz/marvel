import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero';


@Injectable()
export class BackendInterceptor implements HttpInterceptor {

  heroes: Hero[] = [
    {
      id: 1,
      name: 'Spiderman'
    },
    {
      id: 2,
      name: 'Hulk'
    },
    {
      id: 3,
      name: 'Ironman'
    },
    {
      id: 4,
      name: 'Thor'
    },
    {
      id: 5,
      name: 'Black panther'
    },
  ];

  constructor(private injector: Injector) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method === 'GET' && request.url === environment.apiURL + '/heroes') {
      return of(new HttpResponse({ status: 200, body: this.heroes }));
    } else if (request.method === 'GET' && request.url.startsWith(environment.apiURL + '/hero/')) {
      const id = request.url.slice((request.url.lastIndexOf('hero/') + 5) - request.url.length);
      return of(new HttpResponse({ status: 200, body: this.heroes.find((e) => e.id === Number(id)) }));
    } else if (request.method === 'PATCH' && request.url === environment.apiURL + '/hero') {
      const hero: Hero = request.body;
      const position = this.heroes.map(e => e.id).indexOf(hero.id);
      if (position > -1) {
        this.heroes[position] = hero;
      }
      return of(new HttpResponse({ status: 200, body: hero }));
    } else if (request.method === 'DELETE' && request.url.startsWith(environment.apiURL + '/hero/')) {
      const id = request.url.slice((request.url.lastIndexOf('hero/') + 5) - request.url.length);
      const position = this.heroes.map(e => e.id).indexOf(Number(id));
      let delHero: Hero;
      if (position > -1) {
        delHero = this.heroes[position];
        this.heroes.splice(position, 1);
      }
      return of(new HttpResponse({ status: 200, body: delHero }));
    } else if (request.method === 'POST' && request.url === environment.apiURL + '/hero') {
      const hero: Hero = request.body;
      hero.id = this.heroes[this.heroes.length - 1].id + 1;
      this.heroes.push(hero);
      return of(new HttpResponse({ status: 200, body: hero }));
    }
    next.handle(request);
  }
};