import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {PaginationComponent} from './components/pagination.component'
import {UtilsServices} from 'src/app/shared/services/utils.services'
import {RouterModule} from '@angular/router'

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [UtilsServices]
})
export class PaginationModule {}
