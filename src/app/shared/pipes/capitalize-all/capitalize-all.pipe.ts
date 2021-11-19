import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalizeAll'
})
export class CapitalizeAllPipe implements PipeTransform {

  transform(value:string): string {
    return value.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
  }

}
