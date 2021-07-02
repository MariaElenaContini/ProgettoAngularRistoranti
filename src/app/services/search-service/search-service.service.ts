import { Injectable } from '@angular/core';
import { CriteriRicerca } from 'src/app/classes/criteri-ricerca';
import { Ristorante } from 'src/app/classes/ristorante';

@Injectable({
  providedIn: 'root'
})
export class SearchServiceService {

  constructor() { }

  public search(criteri: CriteriRicerca): Ristorante[] {
    
  }
}
