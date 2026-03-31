import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {PokemonComponent} from "../pokemon/pokemon.component";
import {FormsModule} from "@angular/forms";
import {Pokemon} from "../../modeles/pokemon";
import {Generation} from "../../modeles/generation";

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
  selectedGeneration = '';

  types: string[] = [];
  generations: Generation[] = [];

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

  loadByGeneration(genId: number) {

    this.http.get<any>(
      `https://pokeapi.co/api/v2/generation/${genId}`
    ).subscribe(response => {

      this.pokemons = [];

      response.pokemon_species.forEach((p: any) => {

        this.http.get<Pokemon>(
          `https://pokeapi.co/api/v2/pokemon/${p.name}`
        ).subscribe(fullPokemon => {

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

      const searchTerm = '';
      const matchName =
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      const selectedType = '';
      const matchType =
        this.selectedType === '' ||
        pokemon.types.some(t => t.type.name === this.selectedType);

      const selectedGeneration = '';
      const matchGeneration =
        this.selectedGeneration === '' ||
        this.getGeneration(pokemon.id) === Number(this.selectedGeneration);

      return matchName && matchType && matchGeneration;

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

  private getGeneration(id: number): number {

    if (id <= 151) return 1;
    if (id <= 251) return 2;
    if (id <= 386) return 3;
    if (id <= 493) return 4;
    if (id <= 649) return 5;
    if (id <= 721) return 6;
    if (id <= 809) return 7;
    if (id <= 905) return 8;

    return 9;
  }

  protected onGenerationChange() {
    if(this.selectedGeneration === ''){
      this.loadPokemons();
    } else {
      this.loadByGeneration(Number(this.selectedGeneration));
    }
  }
}
