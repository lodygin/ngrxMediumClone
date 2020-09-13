import {Injectable} from '@angular/core'

@Injectable()
export class UtilsServices {
  range(start: number, end: number) {
    return [...Array(end).keys()].map((el) => el + start)
  }
}
