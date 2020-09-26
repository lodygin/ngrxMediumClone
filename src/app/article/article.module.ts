import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {EffectsModule} from '@ngrx/effects'
import {GetArticleEffect} from './store/effects/getArticle.effect'
import {StoreModule} from '@ngrx/store'
import {reducers} from './store/reducers'
import {ArticleService as SharedArticleService} from '../shared/services/article.service'
import {RouterModule, Routes} from '@angular/router'
import {ErrorMessageModule} from '../shared/modules/errorMessage/errorMessage.module'
import {LoadingModule} from '../shared/modules/loading/loading.module'
import {ArticleComponent} from './components/article/article.component'
import {TagListModule} from '../shared/modules/tagList/tagList.module'
import {ArticleService} from './services/article.service'
import {DeleteArticleEffect} from './store/effects/deleteArticle.effect'

const routes: Routes = [
  {
    path: 'articles/:slug',
    component: ArticleComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    ErrorMessageModule,
    LoadingModule,
    TagListModule
  ],
  declarations: [ArticleComponent],
  exports: [],
  providers: [SharedArticleService, ArticleService]
})
export class ArticleModule {}
