import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {StoreModule} from '@ngrx/store'
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import {StoreDevtoolsModule} from '@ngrx/store-devtools'
import {EffectsModule} from '@ngrx/effects'

import {AppRoutingModule} from 'src/app/app-routing.module'
import {AuthModule} from 'src/app/auth/auth.module'
import {AppComponent} from 'src/app/app.component'
import {environment} from 'src/environments/environment'
import {TopBarModule} from './shared/modules/topBar/topBar.module'
import {PersistenceService} from './shared/services/persistence.service'
import {AuthInterceptor} from './shared/services/auth.interceptor'
import {GlobalFeedModule} from './globalFeed/globalFeed.module'
import {routerReducer, StoreRouterConnectingModule} from '@ngrx/router-store'
import {YourFeedModule} from './yourFeed/yourFeed.module'
import {TagFeedModule} from './tagFeed/tagFeed.module'
import {ArticleModule} from './article/article.module'
import {CreateArticleModule} from './createArticle/createArticle.module'
import {EditArticleModule} from './editArticle/editArticle.module'

const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    TopBarModule,
    GlobalFeedModule,
    YourFeedModule,
    TagFeedModule,
    CreateArticleModule,
    EditArticleModule,
    ArticleModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({router: routerReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [PersistenceService, AuthInterceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule {}
