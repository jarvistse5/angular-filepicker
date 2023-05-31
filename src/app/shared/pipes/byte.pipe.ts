import { Pipe, PipeTransform } from '@angular/core';
/*
 * Format byte
 * Usage:
 *   value | decimal
 * Example:
 *   {{ 1024 | decimal:2 }}
 *   formats to: 1 KB
*/
@Pipe({name: 'byte'})
export class BytePipe implements PipeTransform {
  transform(value?: number, decimal: number = 2): string {
    if (value===undefined || value===null) return "";

    const lessThanZero = value < 0;
    const a = Math.abs(value);
    const b = decimal;
    if(0===a) return "0 Bytes";
    const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));
    return (lessThanZero?"-":"")+parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"][d];
  }
}
