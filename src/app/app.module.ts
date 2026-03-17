import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {PokemonsComponent} from './composants/pokemons/pokemons.component';
import {GenerationsComponent} from './composants/generations/generations.component';
import {PokemonComponent} from './composants/pokemon/pokemon.component';
import {NgOptimizedImage} from "@angular/common";
import { BadgesComponent } from './composants/badges/badges.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    AppComponent,
    PokemonsComponent,
    PokemonComponent,
    BadgesComponent,
    GenerationsComponent
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule {
}
