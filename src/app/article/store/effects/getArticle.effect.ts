import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import {ArticleService as SharedArticleService} from '../../../shared/services/article.service'
import {catchError, map, switchMap} from 'rxjs/operators'
import {of} from 'rxjs'
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction
} from '../actions/getFeed.action'
import {ArticleInterface} from '../../../shared/types/article.interface'

@Injectable()
export class GetArticleEffect {
  getArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getArticleAction),
      switchMap(({slug}) => {
        return this.sharedArticleService.getArticle(slug).pipe(
          map((article: ArticleInterface) => {
            return getArticleSuccessAction({article})
          }),
          catchError(() => of(getArticleFailureAction()))
        )
      })
    )
  )

  constructor(
    private actions$: Actions,
    private sharedArticleService: SharedArticleService
  ) {}
}
