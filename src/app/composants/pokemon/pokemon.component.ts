import {Component, Inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import { Pokemon } from '../../modeles/pokemon';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon.component.html'
})
export class PokemonComponent implements OnInit {

  @Input() pokemon!: Pokemon;
  @Input() url: string | undefined;
  public pokemon$: Observable<Pokemon> | undefined;

  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) {}

  getImage(): string {

    return this.pokemon?.sprites?.other?.dream_world?.front_default
      // || this.pokemon?.sprites?.other?.['official-artwork']?.front_default
      || this.pokemon?.sprites?.other.dream_world.front_default
      || 'assets/no-image.png';

  }

  ngOnInit(): void {
    if (this.url) {
      this.pokemon$ = this.http.get<Pokemon>(this.url);
    }
  }
}
