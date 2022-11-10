import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ListadoComponent } from './atenciones/listado/listado.component';
import { ModificarComponent } from './atenciones/modificar/modificar.component';
import { DescuentoPipe } from './pipes/descuento.pipe';
import { AumentoPipe } from './pipes/aumento.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListadoComponent,
    ModificarComponent,
    DescuentoPipe,
    AumentoPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
