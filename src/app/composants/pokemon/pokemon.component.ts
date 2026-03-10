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

  @Input() url: string | undefined;
  public pokemon$: Observable<Pokemon> | undefined;
  @Input() pokemon!: { name: string; image: string; apiTypes: any };
  @Input() pokemonInput!: any;

  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) {
  }

  ngOnInit(): void {
    if (this.url) {
      this.pokemon$ = this.http.get<Pokemon>(this.url);
    }
  }
}
