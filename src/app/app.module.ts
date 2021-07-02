import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RicercaComponent } from './ricerca/ricerca.component';
import { RicercaUserComponent } from './ricerca-user/ricerca-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RicercaComponent,
    RicercaUserComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}