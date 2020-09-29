import {Component, OnInit} from '@angular/core'
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface'
import {Observable} from 'rxjs'
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface'
import {select, Store} from '@ngrx/store'
import {
  articleSelector,
  isSubmittingSelector,
  validationErrorsSelector
} from '../../store/selectors'
import {updateArticleAction} from '../../store/actions/updateArticle.action'
import {ActivatedRoute} from '@angular/router'
import {getArticleAction} from '../../store/actions/getArticle.action'
import {filter, map} from 'rxjs/operators'
import {ArticleInterface} from '../../../shared/types/article.interface'

@Component({
  selector: 'app-edit-article',
  templateUrl: './editArticle.component.html',
  styleUrls: ['./editArticle.component.scss']
})
export class EditArticleComponent implements OnInit {
  slug: string

  initialValues$: Observable<ArticleInputInterface>
  isSubmitting$: Observable<boolean>
  isLoading$: Observable<boolean>
  backendErrors$: Observable<BackendErrorsInterface | null>

  constructor(private store: Store, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues()
    this.fetchData()
  }

  initializeValues(): void {
    this.slug = this.route.snapshot.paramMap.get('slug')
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
    this.backendErrors$ = this.store.pipe(select(validationErrorsSelector))
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        }
      })
    )
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}))
  }

  onSubmit(articleInput: ArticleInputInterface) {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}))
  }
}
