
import { Component, OnInit } from '@angular/core';
import { Posizione } from '../classes/posizione';
import { SearchService } from '../services/search/search.service';
import { CriteriRicerca } from '../classes/criteri-ricerca';

import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Ristorante } from '../classes/ristorante';
import { timer } from 'rxjs';


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
  // public readonly p = new Posizione(//coordinate di Brooklyn
  //  -73.9474091, 
  //  40.6618618, 
  // );

  public readonly posizioni = [
    {p : new Posizione(-73.9474091, 40.6618618), img : "/assets/img.brooklyn.png"  },//Brooklyn
    {p : new Posizione(-73.984016, 40.754932), img : "/assets/img.manhattan.png" },//Manhattan
    {p : new Posizione(-73.769417, 40.742054), img : "/assets/img.queens.png" }//Queens
  ]

  currentPosition=0; 
  public cambiaPosizione(){
    this.currentPosition = (this.currentPosition + 1) % this.posizioni.length
    return this.posizioni[this.currentPosition]
  }
  


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
    //console.log('ricerca in corso...', this.criteriRicerca.value);
    const ricercaUser = new CriteriRicerca(this.criteriRicerca.controls.a.value, this.posizioni[this.currentPosition].p,this.criteriRicerca.controls.t.value);
    return this.searchService.search(ricercaUser);
   
    
  }
  public ristorantiVicini():Ristorante[]{
    return this.searchService.ristorantiVicini(this.posizioni[this.currentPosition].p);
  }
// NON LO USO 
  public getInfo(r:Ristorante){
    const distanzaInKm= this.searchService.distanzaCoordinate(r.coordinates,this.posizioni[this.currentPosition].p) 
    window.alert(r.name+","+r.attributo+", tempo di permanenza medio: "+r.tempo+" minuti"+", dista da te: " 
    +distanzaInKm.toPrecision(2)+"km")
  }
// getTempo mi da in uscita una stringa per avere il tempo in una forma più leggibile 
  public getTempo(t:number):string{
    let valore= t.toString()+ "min";
    if(t===60){
      valore="1h"}
    if(t>60 && t<120){
      valore = "1h e " + Number(t-60) + "min"}
    if(t===120){
      valore= "2h"}
    if(t>120){
      valore = "2h e " + Number(t-120) + "min"}
    return valore;
  }
  public getDistanza(coordinate:Posizione):string{
    const distanzaInKm= this.searchService.distanzaCoordinate(coordinate,this.posizioni[this.currentPosition].p)
    let valore = distanzaInKm.toPrecision(2) +"km" 
    if (distanzaInKm < 1){
      valore = Math.round(distanzaInKm*10)*100+ "m"
    }
    return valore
  }
 
  
public cerca2(){
  var i:number;
  console.time('ricerca massiva');
  for (i=0;i<5000;i++){
    const ricercaUser = new CriteriRicerca(this.attributi[Math.random()*this.attributi.length], this.posizioni[Math.floor(Math.random()*this.posizioni.length)].p,this.tempi[Math.floor(Math.random()*this.tempi.length)].minuti);
    let ricerca=this.searchService.search(ricercaUser);
  }
  console.timeEnd('ricerca massiva');
}

}
