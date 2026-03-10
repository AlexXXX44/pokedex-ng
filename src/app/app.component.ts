import { Component } from '@angular/core';
import {PokemonsComponent} from "./composants/pokemons/pokemons.component";
import {BadgesComponent} from "./composants/badges/badges.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokemonsComponent, BadgesComponent],
  template: `<h1>Pokédex</h1>

  <app-pokemons></app-pokemons>

  <h2>Badges</h2>
  <app-badges></app-badges>`
})
export class AppComponent {
  title = 'pokedex-ng';
}
