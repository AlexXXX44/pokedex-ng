import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Badge } from '../../modeles/badge';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-badges',
  imports: [
    AsyncPipe,
    NgOptimizedImage,
    NgForOf,
    NgIf
  ],
  templateUrl: './badges.component.html',
  standalone: true
})
export class BadgesComponent {

  public badges$!: Observable<Badge[]>;

  constructor(private http: HttpClient) {
    this.badges$ = this.http.get<Badge[]>(
      "https://pokemon-origins.gitlab.io/api/badges/FR/"
    );
  }

}
