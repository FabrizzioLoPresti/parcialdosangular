import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, map } from 'rxjs';
import { AtencionService } from '../services/atencion.service';

export class AtencionValidator {
  static fechaValidator(atencionService:AtencionService): AsyncValidatorFn {
    return (control:AbstractControl): Observable<ValidationErrors | null> => {
      return atencionService
        .checkAtenciones(control.value)
        .pipe(
          map((result:boolean) => {
            return result ? {atencionesExists: result} : null
          })
        )
    }
  }
}