import {Actions, createEffect, ofType} from '@ngrx/effects'
import {Injectable} from '@angular/core'
import {FeedService} from '../../services/feed.service'
import {
  getFeedAction,
  getFeedFailureAction,
  getFeedSuccessAction
} from '../actions/getFeed.action'
import {catchError, map, switchMap} from 'rxjs/operators'
import {GetFeedResponseInterface} from '../../types/getFeedResponse.interface'
import {of} from 'rxjs'

@Injectable()
export class GetFeedEffect {
  getFeed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getFeedAction),
      switchMap(({url}) => {
        return this.feedService.getFeed(url).pipe(
          map((feed: GetFeedResponseInterface) => {
            return getFeedSuccessAction({feed})
          }),
          catchError(() => of(getFeedFailureAction()))
        )
      })
    )
  )

  constructor(private actions$: Actions, private feedService: FeedService) {}
}
