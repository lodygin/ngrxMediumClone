import {Component, Input, OnInit} from '@angular/core'
import {UtilsServices} from '../../../services/utils.services'

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
  @Input('total') totalProps: number
  @Input('limit') limitProps: number
  @Input('currentPage') currentPageProps: number
  @Input('url') urlProps: string

  pagesCount: number
  pages: number[]

  constructor(private utilsServices: UtilsServices) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.totalProps / this.limitProps)
    this.pages = this.utilsServices.range(1, this.pagesCount)
  }
}