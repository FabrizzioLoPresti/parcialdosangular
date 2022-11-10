import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'descuento'
})
export class DescuentoPipe implements PipeTransform {

  transform(value: number, descuento:number): number {
    return value - ((value * descuento) / 100);
  }

}
