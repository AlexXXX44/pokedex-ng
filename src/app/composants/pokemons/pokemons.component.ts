import {Component} from '@angular/core';
import {AsyncPipe, NgForOf, NgIf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {PokemonComponent} from "../pokemon/pokemon.component";
import {FormsModule} from "@angular/forms";
import {Pokemon} from "../../modeles/pokemon";

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
    NgForOf,
    PokemonComponent,
    FormsModule
  ],
  styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent {

  pokemons: Pokemon[] = [];
  filteredPokemons: Pokemon[] = [];
  public limit = 200;
  public offset = 0;

  searchTerm = '';
  selectedType = '';

  types: string[] = [];

  constructor(private http: HttpClient) {
    this.loadPokemons();
  }

  loadPokemons() {

    this.http.get<PokeApiResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset}`
    ).subscribe(response => {

      this.pokemons = [];

      response.results.forEach(pokemon => {

        this.http.get<Pokemon>(pokemon.url).subscribe(fullPokemon => {

          this.pokemons.push(fullPokemon);

          this.filteredPokemons = [...this.pokemons];
          this.extractTypes();

        });

      });

    });

  }

  extractTypes() {

    const typeSet = new Set<string>();

    this.pokemons.forEach(p => {
      p.types.forEach(t => typeSet.add(t.type.name));
    });

    this.types = Array.from(typeSet).sort();

  }

  filterPokemons() {

    this.filteredPokemons = this.pokemons.filter(pokemon => {

      const matchName =
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchType =
        this.selectedType === '' ||
        pokemon.types.some(t => t.type.name === this.selectedType);

      return matchName && matchType;

    });

  }

  resetFilters() {

    this.searchTerm = '';
    this.selectedType = '';

    this.filteredPokemons = this.pokemons;

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
