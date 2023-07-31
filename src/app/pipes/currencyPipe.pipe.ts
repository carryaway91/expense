import { Pipe, PipeTransform } from '@angular/core';
import { formatCurrency, getCurrencySymbol } from '@angular/common';
@Pipe({
    name: 'currencyPipe',
  })
  export class CurrencyPipe implements PipeTransform {
    transform( value: string | null) {
      let val = value?.replaceAll(',', ' ').replace('.', ',').replace('$', '');
      return val
     }
}
