
import { Component, OnInit } from '@angular/core';
import { Posizione } from '../classes/posizione';
import {ATTRIBUTI} from '../attributiDati';
import { SearchService } from '../services/search/search.service';
import { CriteriRicerca } from '../classes/criteri-ricerca';
import { Tempi } from '../classes/tempi';
@Component({
  selector: 'app-ricerca-user',
  templateUrl: './ricerca-user.component.html',
  styleUrls: ['./ricerca-user.component.css']
})
export class RicercaUserComponent implements OnInit {
  ATTRIBUTI=ATTRIBUTI;
  constructor() { }

  ngOnInit(): void {
  }
  p:Posizione ={//coordinate di Brooklyn
   lat: -73.9474091,
   lon: 40.6618618,
  }
  public ricercaUser!: CriteriRicerca;

  private ricerca(tipo:string,p:Posizione,tempoUser:number) {
    this.ricercaUser.preferenzaCibo=tipo;
    this.ricercaUser.posizione=p;
    this.ricercaUser.minutiDisponibili=tempoUser;

    return SearchService.search(this.ricercaUser)
  }
}
