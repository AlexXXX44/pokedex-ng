import {Component, Inject} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pokemon} from "../../modeles/pokemon";
import {Pokemons} from "../../modeles/pokemons";

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {

  public pokemons$: Observable<Pokemon[]>;

  constructor(private http: HttpClient) {
    this.pokemons$ = this.http.get<Pokemon[]>(
      "https://pokebuildapi.fr/api/v1/pokemon/limit/100"
    );
  }
}
