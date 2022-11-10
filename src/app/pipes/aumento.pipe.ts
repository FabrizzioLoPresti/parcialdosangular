import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aumento'
})
export class AumentoPipe implements PipeTransform {

  transform(value: number, aumento:number): number {
    return value + ((value * aumento) / 100);
  }

}
