
import { Component, OnInit, } from '@angular/core';
import {Dato} from '../dato';
import {DATI} from '../listaDati2';

@Component({
  selector: 'app-ricerca',
  templateUrl: './ricerca.component.html',
  styleUrls: ['./ricerca.component.css']
})
export class RicercaComponent implements OnInit {

  
  myAttributo!: string;
  myPosition!:number[];
  myTempo!:number;
  listaCompleta: Dato[]=DATI;
  vettorePunteggi!: number[];
  lat1:number=this.myPosition[1];
  lon1:number=this.myPosition[2];
  listaOrdinata!:Dato[];
 
  constructor() { 
  }

  ngOnInit(): void {
  }

  ricerca(attributo:string,position : number[], tempo:number){
    this.myPosition=position;
    this.myTempo=tempo;
    this.myAttributo=attributo;

    for(var i=0;i<this.listaCompleta.length;i++) 
    {
      if(this.listaCompleta[i].attributo==this.myAttributo)
      {
        this.vettorePunteggi[i]=100;
      }
      else {this.vettorePunteggi[i]=0;}
      const lat2 =this.listaCompleta[i].coordinates[1];
      const lon2 =this.listaCompleta[i].coordinates[2];
      this.vettorePunteggi[i]=this.vettorePunteggi[i]-Math.abs(this.getDistanceFromLatLonInKm(this.lat1,this.lon1,lat2,lon2));
      this.vettorePunteggi[i]=this.vettorePunteggi[i]-Math.abs(this.myTempo-this.listaCompleta[i].tempo);
      this.ordinaLista(this.listaCompleta[i],this.listaOrdinata,this.vettorePunteggi);
    }
  }
   getDistanceFromLatLonInKm(lat1:number, lon1:number, lat2:number , lon2:number) {
      var R = 6371; // Radius of the earth in km
      var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      var dLon = this.deg2rad(lon2-lon1); 
      var a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
        Math.sin(dLon/2) * Math.sin(dLon/2)
        ; 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c; // Distance in km
      return d;
    }
    
   deg2rad(deg: number) {
      return deg * (Math.PI/180)
    }
    ordinaLista(elem:Dato,listaOrdinata:Dato[],Punti:number[]){
        for(var j=0;j<this.listaCompleta.length;j++){
        if(listaOrdinata==[])
        {
          listaOrdinata[j]=elem;
          return 
        }
        else if(listaOrdinata[j]==null)
        {
          listaOrdinata[j]=elem;
          return
        }
        else if(listaOrdinata[j]<elem){
          this.ordinaLista(listaOrdinata[j],listaOrdinata,Punti);
          listaOrdinata[j]=elem;
        }
      }
      
    }
  }
