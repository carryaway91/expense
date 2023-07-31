import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'shorten',
  })
  export class ShortenPipe implements PipeTransform {
    transform( value: string | null) {
      if(value && value.length > 10) {
        value = value?.slice(0, 10) + '...';
      }
      return value
     }
}
