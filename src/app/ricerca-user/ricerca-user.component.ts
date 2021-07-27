
import { Component, OnInit } from '@angular/core';
import { Posizione } from '../classes/posizione';
import {attributi} from '../attributiDati';
import { SearchService } from '../services/search/search.service';
import { CriteriRicerca } from '../classes/criteri-ricerca';
import { tempi } from '../classes/tempi';

import { FormGroup,FormControl } from '@angular/forms';

@Component({
  selector: 'app-ricerca-user',
  templateUrl: './ricerca-user.component.html',
  styleUrls: ['./ricerca-user.component.css']
})

export class RicercaUserComponent implements OnInit {
  criteriRicerca = new FormGroup({
    a: new FormControl(''), // attributo 
    t: new FormControl(''), // tempo
  })
  
  ATTRIBUTI=attributi;

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
  }
  p:Posizione ={//coordinate di Brooklyn
   lat: 40.6618618,
   lon: -73.9474091,
  }
  submitted =false;

  private ricerca() {
    this.submitted = true;
    const ricercaUser = new CriteriRicerca(this.criteriRicerca.value.a ,this.p, this.criteriRicerca.value.t);
    const ristoranti = this.searchService.search(ricercaUser);
    console.log(ristoranti)

  }
}
