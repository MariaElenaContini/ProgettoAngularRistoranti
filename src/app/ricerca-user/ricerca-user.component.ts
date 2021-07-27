
import { Component, OnInit } from '@angular/core';
import { Posizione } from '../classes/posizione';
import { SearchService } from '../services/search/search.service';
import { CriteriRicerca } from '../classes/criteri-ricerca';

import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-ricerca-user',
  templateUrl: './ricerca-user.component.html',
  styleUrls: ['./ricerca-user.component.css']
})

export class RicercaUserComponent implements OnInit {
  criteriRicerca = new FormGroup({
    a: new FormControl(''), // attributo
    t: new FormControl(''), // tempo
  });

  public readonly attributi: string[] = [
    'Pizza',
    'Bakery',
    'Sushi',
    'Italian',
    'Steakhouse',
    'McdonaldS',
    'Burger',
    'Coffee',
    'Ice Cream'
  ];

  public readonly tempi = [
    { minuti: 5, testo: '5 min' },
    { minuti: 10, testo: '10 min' },
    { minuti: 15, testo: '15 min' },
    { minuti: 30, testo: '30 min' },
    { minuti: 45, testo: '45 min' },
    { minuti: 60, testo: '1 h' },
    { minuti: 90, testo: '1h e 30 min' },
    { minuti: 120, testo: '2 h' }
  ];

  public readonly p = new Posizione(//coordinate di Brooklyn
    40.6618618,
    -73.9474091,
  );

  constructor(private readonly searchService: SearchService) { }

  ngOnInit(): void {
  }

  submitted = false;

  public ricerca() {
    console.log('ricerca in corso...', this.criteriRicerca.controls.a.value, this.criteriRicerca.controls.t.value);
    const ricercaUser = new CriteriRicerca(this.criteriRicerca.value.a, this.p, this.criteriRicerca.value.t);
    const ristoranti = this.searchService.search(ricercaUser);
    console.log(ristoranti);
    this.submitted = true;
  }
}
