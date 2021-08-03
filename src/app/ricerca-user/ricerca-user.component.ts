
import { Component, OnInit } from '@angular/core';
import { Posizione } from '../classes/posizione';
import { SearchService } from '../services/search/search.service';
import { CriteriRicerca } from '../classes/criteri-ricerca';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Ristorante } from '../classes/ristorante';
import { Attribute } from '@angular/core';
import { NgForm } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-ricerca-user',
  templateUrl: './ricerca-user.component.html',
  styleUrls: ['./ricerca-user.component.css']
})

export class RicercaUserComponent implements OnInit {
  public readonly attributi: string[] = [
    'Pizza',
    'Bakery',
    'Sushi',
    'Italian',
    'Steakhouse',
    'McdonaldS',
    'Burger',
    'Coffee',
    'Ice Cream'
  ];

  public readonly tempi = [
    { minuti: 5, testo: '5 min' },
    { minuti: 10, testo: '10 min' },
    { minuti: 15, testo: '15 min' },
    { minuti: 30, testo: '30 min' },
    { minuti: 45, testo: '45 min' },
    { minuti: 60, testo: '1 h' },
    { minuti: 90, testo: '1h e 30 min' },
    { minuti: 120, testo: '2 h' }
  ];
  public readonly p = new Posizione(//coordinate di Brooklyn
   -73.9474091, 
   40.6618618,
    
  );


  criteriRicerca: FormGroup;
  constructor(private readonly searchService: SearchService,private formBuilder: FormBuilder) {
    this.criteriRicerca= this.formBuilder.group({
      a: ['',Validators.required],
      t: ['',Validators.required]
    })
   }
  ngOnInit(){};
  get a(){
    return this.criteriRicerca.get('a');
  }
  get t(){
    return this.criteriRicerca.get('t');
  }

  submitted = false;

  public ricerca():Ristorante[] {
    this.submitted = true;
    //console.log('ricerca in corso...', this.criteriRicerca.controls.a.value, this.criteriRicerca.controls.t.value);
    const ricercaUser = new CriteriRicerca(this.criteriRicerca.value, this.p,this.criteriRicerca.value.t);
    return this.searchService.search(ricercaUser);
   
    
  }
  public ristorantiVicini():Ristorante[]{
    return this.searchService.ristorantiVicini(this.p);
  }

  public getInfo(r:Ristorante){
    const distanzaInKm= this.searchService.distanzaCoordinate(r.coordinates,this.p) // vengono numeri grandissimi!!
    window.alert(r.name+","+r.attributo+", tempo di permanenza medio: "+r.tempo+" minuti"+", dista da te: " 
    +distanzaInKm.toPrecision(2)+"km")
  }
 
}
