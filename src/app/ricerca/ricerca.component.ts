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
  
  public fitness(r: Ristorante, cr: CriteriRicerca): number {
    var punteggio = 0;

    // aggiungi punteggio per cibo
    if (r.name == cr.preferenzaCibo)
      punteggio += 50;

    // aggiungi punteggio per vicinanza
    if (r.coordinates.lat == cr.posizione.lat && r.coordinates.lon == cr.posizione.lon)
      punteggio += 10;

    punteggio =punteggio- this.punteggioCoordinate(r.coordinates, cr.posizione);


    // aggiungi punteggio per tempo
    if(r.tempo==cr.minutiDisponibili){
      punteggio += 10;
    }

    punteggio=punteggio- this.punteggioTempo(r.tempo,cr.minutiDisponibili);

    return punteggio;
  }
  punteggioTempo(tempo: number, minutiDisponibili: number) {
    var d=Math.abs(tempo-minutiDisponibili)
    return d;
  }

  punteggioCoordinate(coordinate: Posizione,userPosition: Posizione){
    var R = 6371;
    const lat1=coordinate.lat;
    const lon1=coordinate.lon;
    const lat2=userPosition.lat;
    const lon2=userPosition.lon;
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distanza in km
    return Math.abs(d);
  }
  deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }

}