import {Component} from '@angular/core';
import {NgForOf} from '@angular/common';
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
  public limit = 1000;
  public offset = 0;

  searchTerm = '';
  selectedType = '';
  selectedGeneration = '';

  types: string[] = [];
  generations = [
    { id: 1, label: 'Gen 1' },
    { id: 2, label: 'Gen 2' },
    { id: 3, label: 'Gen 3' },
    { id: 4, label: 'Gen 4' },
    { id: 5, label: 'Gen 5' },
    { id: 6, label: 'Gen 6' },
    { id: 7, label: 'Gen 7' },
    { id: 8, label: 'Gen 8' },
    { id: 9, label: 'Gen 9' }
  ];

  constructor(private http: HttpClient) {this.loadPokemons();}

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

  loadByGeneration(genId: number) {
    if (!genId) return;

    this.http.get<any>(`https://pokeapi.co/api/v2/generation/${genId}`)
      .subscribe(response => {
        this.pokemons = []; // On vide la liste actuelle

        // On récupère les détails de chaque espèce
        response.pokemon_species.forEach((species: any) => {
          // Note : l'URL de l'espèce finit par l'ID, mais il vaut mieux
          // requêter le "pokemon" pour avoir les images/types
          const pokemonId = species.url.split('/').filter(Boolean).pop();

          this.http.get<Pokemon>(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .subscribe(fullPokemon => {
              this.pokemons.push(fullPokemon);
              // On trie par ID pour éviter l'ordre aléatoire dû à l'asynchrone
              this.pokemons.sort((a, b) => a.id - b.id);
              this.filteredPokemons = [...this.pokemons];
            });
        });
      });
  }

  protected onGenerationChange() {
    const genId = Number(this.selectedGeneration);
    if (genId > 0) {
      this.loadByGeneration(genId); // Relie l'ID du label à l'appel API
    }
  }

  private getGeneration(id: number): number {
      // Si l'ID n'est pas valide, on lève une alerte ou on retourne une valeur par défaut
      if (!id || id < 1) {
        console.error(`ID de Pokémon invalide reçu: ${id}`);
        return 0; // Ou une gestion d'erreur appropriée
      }

    if (!id || id < 1) return 0;
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

  filterPokemons() {
    this.filteredPokemons = this.pokemons.filter(pokemon => {

      // 1. Filtre par NOM (Recherche textuelle)
      // On vérifie si la recherche est vide OU si le nom correspond
      const matchName = this.searchTerm === '' ||
        pokemon.name.toLowerCase().includes(this.searchTerm.toLowerCase());

      // 2. Filtre par TYPE
      // On vérifie si aucun type n'est sélectionné OU si le Pokémon possède ce type
      const matchType = this.selectedType === '' ||
        pokemon.types.some(t => t.type.name === this.selectedType);

      // 3. Filtre par GÉNÉRATION
      // On compare l'ID calculé avec l'ID sélectionné dans le label
      const matchGeneration = this.selectedGeneration === '' ||
        this.getGeneration(pokemon.id) === Number(this.selectedGeneration);

      // FUSION : Le Pokémon n'est gardé que s'il respecte les 3 critères en même temps
      return matchName && matchType && matchGeneration;
    });
  }

  next() {
    this.offset += this.limit;
    this.loadPokemons();
  }

  resetFilters() {

    this.searchTerm = '';
    this.selectedType = '';

    this.filteredPokemons = this.pokemons;

  }

  previous() {
    this.offset = Math.max(0, this.offset - this.limit);
    this.loadPokemons();
  }
}
