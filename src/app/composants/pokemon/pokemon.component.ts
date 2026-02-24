import {Component, Inject, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pokemon} from "../../modeles/pokemon";

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent
  // implements OnInit
{

  // @Input() url: Pokemon | undefined;
  // public pokemon$: Observable<Pokemon> | undefined;
  @Input() pokemon!: Pokemon;

  constructor(
    @Inject(HttpClient) private http: HttpClient
  ) {
  }

  // ngOnInit(): void {
  //   if (this.url) {
  //     this.pokemon$ = this.http.get<Pokemon>(this.url);
  //   }
  // }
}
