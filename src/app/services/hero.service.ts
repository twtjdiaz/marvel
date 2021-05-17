import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hero } from '../models/hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  public heroes: Hero[] = [];

  constructor(private http: HttpClient) { }

  getAllHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(environment.apiURL + '/heroes');
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(environment.apiURL + '/hero/' + id);
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.http.patch<Hero>(environment.apiURL + '/hero', hero);
  }

  addNewHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(environment.apiURL + '/hero', hero);
  }

  deleteHero(id: number): Observable<Hero> {
    return this.http.delete<Hero>(environment.apiURL + '/hero/' + id);
  }

}
