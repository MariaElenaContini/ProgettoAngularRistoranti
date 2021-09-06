import { Injectable } from '@angular/core';
import { CriteriRicerca } from 'src/app/classes/criteri-ricerca';
import { Posizione } from 'src/app/classes/posizione';
import { Ristorante } from 'src/app/classes/ristorante';
import { ristoranti } from 'src/assets/your-json-dir/ristoranti';
import { RicercaUserComponent } from 'src/app/ricerca-user/ricerca-user.component';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  static search(ricercaUser: CriteriRicerca) {
    throw new Error('Method not implemented.');
  }

  constructor() { }

  /**
   * Restituisce i migliori N ristoranti che soddisfano il criterio di ricerca fornito
   * @param criteri I criteri con cui viene alimentata la ricerca
   * @returns I migliori N ristoranti individuati dalla ricerca
   */
  public search(criteri: CriteriRicerca ): Ristorante[] {
    return ristoranti
      .map((r) => ({ ristorante: r, punteggio: this.fitness(r, criteri) }))
      .sort((r1, r2) => r2.punteggio - r1.punteggio)
      .slice(0, 10)
      .map((rp) => rp.ristorante);
  }

  /**
   * E' la funzione di fitness che valuta il punteggio di un ristorante
   * @param r Il ristorante di cui calcolare la fitness
   * @param cr Il criterio di ricerca in base al quale calcolare la fitness
   * @returns Il punteggio calcolato
   */
  private fitness(r: Ristorante, cr: CriteriRicerca): number {
    let punteggio = 0;

    // aggiungi punteggio per cibo
    if (r.attributo === cr.preferenzaCibo) {
      punteggio = punteggio + 50;
    }

  // aggiungi punteggio per vicinanza --- NON succederà mai
  //if (r.coordinates.lat === cr.posizione.lat && r.coordinates.lon === cr.posizione.lon) {
  // console.log('esatta posizione');
  // punteggio += 1;
  //}

    punteggio = punteggio - this.distanzaCoordinate(r.coordinates, cr.posizione)*10;

    // aggiungi punteggio per tempo
    if (r.tempo === cr.minutiDisponibili) {
      punteggio = punteggio + 10;
    }

    punteggio = punteggio + this.punteggioTempo(r.tempo, cr.minutiDisponibili)*5;

    return punteggio;
  }

  private punteggioTempo(tempo: number, minutiDisponibili: number): number {
    return (Math.abs(tempo - minutiDisponibili) * -1);
  }

  public distanzaCoordinate(coordinate: Posizione, userPosition: Posizione): number {
    const EarthRadiusKm = 6371;
    const lat1 = coordinate.lat;
    const lon1 = coordinate.lon;
    const lat2 = userPosition.lat;
    const lon2 = userPosition.lon;
    const dLat = this.deg2rad(lat2 - lat1);  // deg2rad below
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = EarthRadiusKm * c; // Distanza in km
    return Math.abs(d);
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  public ristorantiVicini(p:Posizione):Ristorante[]{
  return ristoranti
      .map((r) => ({ ristorante: r, distanza: this.distanzaCoordinate(r.coordinates, p) }))
      .sort((r1, r2) => r1.distanza - r2.distanza) // ho invertito r1 e r2 per avere un ordine crescente 
      .slice(0, 10)                                // NB punteggioCoordinate calcola il modulo della distanza
      .map((rp) => rp.ristorante);
  }
}
