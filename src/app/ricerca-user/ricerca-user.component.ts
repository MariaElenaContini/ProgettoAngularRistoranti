
import { Component, OnInit } from '@angular/core';
import { Posizione } from '../classes/posizione';
import {attributi} from '../attributiDati';
import { SearchService } from '../services/search/search.service';
import { CriteriRicerca } from '../classes/criteri-ricerca';
import { tempi } from '../classes/tempi';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-ricerca-user',
  templateUrl: './ricerca-user.component.html',
  styleUrls: ['./ricerca-user.component.css']
})
export class RicercaUserComponent implements OnInit {
  ATTRIBUTI=attributi;

  constructor(private readonly searchService: SearchService) {}

  ngOnInit(): void {
  }
  p:Posizione ={//coordinate di Brooklyn
   lat: 40.6618618,
   lon: -73.9474091,
  }
  
  private ricerca(cr : NgForm) {
    const ricercaUser = new CriteriRicerca(cr.value(1), this.p,cr.value(2));
    const ristoranti = this.searchService.search(ricercaUser);
    console.log(ristoranti);

  }
}
