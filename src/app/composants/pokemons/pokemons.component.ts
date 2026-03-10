import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PokemonComponent} from "../pokemon/pokemon.component";
import {FormsModule} from "@angular/forms";

interface PokeApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf,
    NgForOf,
    PokemonComponent,
    FormsModule
  ],
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {
  public pokemons$!: Observable<PokeApiResponse>;
  public limit = 20;
  public offset = 0;

  constructor(private http: HttpClient) {
    this.loadPokemons();
  }

  loadPokemons() {
    this.pokemons$ = this.http.get<PokeApiResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`
    );
  }

  next() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  previous() {
    this.offset = Math.max(0, this.offset - this.limit);
    this.loadPokemons();
  }
}
