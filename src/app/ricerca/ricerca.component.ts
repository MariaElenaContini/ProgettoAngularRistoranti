import { Component, OnInit, } from '@angular/core';
import { ristoranti } from 'src/assets/your-json-dir/ristoranti';
import { CriteriRicerca } from '../classes/criteri-ricerca';
import { Ristorante } from '../classes/ristorante';
import { Posizione } from '../classes/posizione';
import { RicercaUserComponent } from '../ricerca-user/ricerca-user.component';


@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {
  ristoranti = ristoranti;
  myAttributo : string =ricercaUser.attributo;
  myTime: number= RicercaUserComponent.ricercaUser.tempo;
  myPosition: Posizione= RicercaUserComponent.ricercaUser.coordinate;
 
  constructor() {
  }

  ngOnInit(): void {
  }

  ricercaCorrente = new CriteriRicerca(this.myAttributo, this.myPosition, this.myTime);
  punteggi = ristoranti
  .map((r) => { return { ristorante: r, punteggio: this.fitness(r, this.ricercaCorrente) } })
  .sort((r1, r2) => r1.punteggio - r2.punteggio)
  .slice(0, 9);
}