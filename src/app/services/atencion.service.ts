import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { Atencion } from '../models/atencion.model';

@Injectable({
  providedIn: 'root',
})
export class AtencionService {
  private URL: string = 'https://6317ca93f6b281877c5d7785.mockapi.io/atencion';

  constructor(private http: HttpClient) {}

  obtenerTodas(): Observable<Atencion[]> {
    return this.http.get<Atencion[]>(this.URL);
  }

  obtenerPorId(id: string): Observable<Atencion> {
    return this.http.get<Atencion>(`${this.URL}/${id}`);
  }

  guardar(atencion: Atencion): Observable<Atencion> {
    return this.http.put<Atencion>(`${this.URL}/${atencion.id}`, atencion);
  }

  checkAtenciones(fecha:Date): Observable<boolean> {
    return this.http.get<Atencion[]>(`${this.URL}?fecha=${fecha}`).pipe(
      map(atenciones => atenciones.length >= 3)
    )
  }

}
