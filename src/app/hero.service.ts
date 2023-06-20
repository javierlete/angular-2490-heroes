import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = 'http://localhost:3000/heroes/';

  constructor(private messageService: MessageService, private http: HttpClient) { }
  
  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  
  getHero(id: number): Observable<Hero> {
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return this.http.get<Hero>(this.heroesUrl + id);
  }

  addHero(hero: Hero) {
    this.messageService.add(`HeroService: added hero ${hero.name}`);
    return this.http.post<Hero>(this.heroesUrl, hero);
  }
  updateHero(hero: Hero): Observable<Hero> {
    this.messageService.add(`HeroService: updated hero id=${hero.id}`);
    return this.http.put<Hero>(this.heroesUrl + hero.id, hero);
  }
}
