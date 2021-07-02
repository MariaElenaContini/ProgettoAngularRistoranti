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
  constructor() {
  }

  ngOnInit(): void {
  }
}