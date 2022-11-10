import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Atencion } from 'src/app/models/atencion.model';
import { Especialidad } from 'src/app/models/especialidad.model';

import { AtencionService } from 'src/app/services/atencion.service';
import { EspecialidadService } from 'src/app/services/especialidad.service';
import { Medico } from 'src/app/models/medico.model';
import { AtencionValidator } from 'src/app/validators/AtencionValidator';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.css'],
})
export class ModificarComponent implements OnInit {
  
  formulario!: FormGroup;
  atencion: Atencion;
  $especialidades: Observable<Especialidad[]>;
  $medicos: Observable<Medico[]>;
  id:string = '';

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private especialidadService: EspecialidadService,
    private atencionService: AtencionService,
    private formBuilder: FormBuilder
  ) {
    this.$especialidades = new Observable<Especialidad[]>();
    this.$medicos = new Observable<Medico[]>();
  }

  ngOnInit(): void {
  

    this.id = this.activatedRoute.snapshot.params['id'];
    this.subscription.add(
      this.atencionService.obtenerPorId(this.id).subscribe({
        next: (respuesta) => {
          this.atencion = respuesta
          this.$especialidades = this.especialidadService.obtener();
          this.$medicos = this.especialidadService.obtenerMedicoEspecialidad(this.atencion.especialidadId);
          this.cargarDatos();
        },
        error: () => alert('Error al obtener la atención'),
      })
    );
  }

  cargarDatos(): void { 

    this.formulario = this.formBuilder.group({
      paciente: [this.atencion.paciente, [
        Validators.required
      ]],
      documento: [this.atencion.documento, [
        Validators.required,
        Validators.min(0)
      ]],
      costo: [this.atencion.costo, [
        Validators.required,
        Validators.min(0)
      ]],
      especialidadId: [this.atencion.especialidadId, [
        Validators.required
      ]],
      medicoId: [this.atencion.medicoId, [
        Validators.required
      ]],
      fecha: [this.atencion.fecha, [
        Validators.required
      ], [
        AtencionValidator.fechaValidator(this.atencionService)
      ]]
    })

    this.formulario.controls['especialidadId'].valueChanges.subscribe((valor) => {
      this.$medicos = this.especialidadService.obtenerMedicoEspecialidad(valor);
    })

  }

  guardar() {
    if (this.formulario.invalid) {
      return;
    }

    this.atencion = this.formulario.value;
    this.atencion.id = this.id;
    this.subscription.add(
      this.atencionService.guardar(this.atencion).subscribe({
        next: () => {
          alert('Atención guardada con éxito');
          this.router.navigate(['listado']);
        },
        error: () => {
          alert('Ocurrió un error al guardar la atención');
        },
      })
    );
  }
}
