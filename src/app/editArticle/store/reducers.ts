import {EditArticleStateInterface} from '../types/editArticleState.interface'
import {Action, createReducer, on} from '@ngrx/store'
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from './actions/updateArticle.action'
import {
  getArticleAction,
  getArticleFailureAction,
  getArticleSuccessAction
} from './actions/getArticle.action'

const initialState: EditArticleStateInterface = {
  isLoading: false,
  article: null,
  isSubmitting: false,
  validationsErrors: null
}

const editArticleReducer = createReducer(
  initialState,
  on(
    updateArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: true
    })
  ),
  on(
    updateArticleSuccessAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isSubmitting: false
    })
  ),
  on(
    updateArticleFailureAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      validationsErrors: action.errors,
      isSubmitting: false
    })
  ),
  on(
    getArticleAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: true
    })
  ),
  on(
    getArticleSuccessAction,
    (state, action): EditArticleStateInterface => ({
      ...state,
      isLoading: false,
      article: action.article
    })
  ),
  on(
    getArticleFailureAction,
    (state): EditArticleStateInterface => ({
      ...state,
      isLoading: false
    })
  )
)

export function reducers(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action)
}
