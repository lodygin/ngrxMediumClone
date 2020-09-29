import {createFeatureSelector, createSelector} from '@ngrx/store'
import {AppStateInterface} from '../../shared/types/app.state.interface'
import {EditArticleStateInterface} from '../types/editArticleState.interface'

export const editArticleFeatureSelector = createFeatureSelector<
  AppStateInterface,
  EditArticleStateInterface
>('editArticle')

export const isSubmittingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isSubmitting
)

export const validationErrorsSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) =>
    editArticleState.validationsErrors
)

export const isLoadingSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.isLoading
)

export const articleSelector = createSelector(
  editArticleFeatureSelector,
  (editArticleState: EditArticleStateInterface) => editArticleState.article
)
