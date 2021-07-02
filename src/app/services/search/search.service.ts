import { Injectable } from '@angular/core';
import { CriteriRicerca } from 'src/app/classes/criteri-ricerca';
import { Ristorante } from 'src/app/classes/ristorante';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor() { }

  public search(criteri: CriteriRicerca): Ristorante[] {

  }

  private fitness(r: Ristorante, cr: CriteriRicerca): number {
    var punteggio = 0;

    // aggiungi punteggio per cibo
    if (r.name == cr.preferenzaCibo)
      punteggio += 50;

    // aggiungi punteggio per vicinanza
    if (r.coordinates.lat == cr.posizione.lat && r.coordinates.lon == cr.posizione.lon)
      punteggio += 10;

    punteggio = punteggio - this.punteggioCoordinate(r.coordinates, cr.posizione);


    // aggiungi punteggio per tempo
    if (r.tempo === cr.minutiDisponibili) {
      punteggio += 10;
    }

    punteggio = punteggio - this.punteggioTempo(r.tempo, cr.minutiDisponibili);

    return punteggio;
  }

  private punteggioTempo(tempo: number, minutiDisponibili: number): number {
    return Math.abs(tempo - minutiDisponibili);
  }

  private punteggioCoordinate(coordinate: Posizione, userPosition: Posizione) {
    var EarthRadiusKm = 6371;
    const lat1 = coordinate.lat;
    const lon1 = coordinate.lon;
    const lat2 = userPosition.lat;
    const lon2 = userPosition.lon;
    var dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    var dLon = this.deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = EarthRadiusKm * c; // Distanza in km
    return Math.abs(d);
  }

  private deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }
}
