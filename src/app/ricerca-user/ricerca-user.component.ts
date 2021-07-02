
import { Component, OnInit } from '@angular/core';
import { Posizione } from '../classes/posizione';
import {Ristorante} from '../classes/ristorante';
import {ATTRIBUTI} from '../attributiDati';
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
  lat=-73.9474091;
  lon=40.6618618;
  p:Posizione ={//coordinate di Brooklyn
   lat: -73.9474091,
   lon: 40.6618618,
  }
  public ricercaUser!: Ristorante;

  addAttributo(tipo:string){
    this.ricercaUser.attributo==tipo;
  };
  addTempo(tempoUser:number){
    this.ricercaUser.tempo==tempoUser;
  };
  addCoordinate(){
    this.ricercaUser.coordinates==this.p;
  };
}
