import { Pipe, PipeTransform } from '@angular/core';
import dayjs from 'dayjs';

@Pipe({
  name: 'dateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(
    value: Date | string | number,
    format = 'YYYY-MM-DD HH:mm:ss'
  ): string {
    if (!value) return '';
    return dayjs(value).format(format);
  }
}
