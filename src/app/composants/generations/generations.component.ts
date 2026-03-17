import { Component } from '@angular/core';

@Component({
  selector: 'app-generations',
  templateUrl: './generations.component.html',
  standalone: true,
  styleUrls: ['./generations.component.scss']
})
export class GenerationsComponent {
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
}
