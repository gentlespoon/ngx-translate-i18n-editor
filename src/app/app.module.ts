import "reflect-metadata";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import { HttpClientModule, HttpClient } from "@angular/common/http";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { ElectronService } from "./services/electron.service";

import { WebviewDirective } from "./directives/webview.directive";

import { AppComponent } from "./app.component";
import { KeylistComponent } from "./components/keylist-panel/keylist.component";
import { LanglistComponent } from "./components/langlist-panel/langlist.component";
import { SessionPanelComponent } from "./components/session-panel/session-panel.component";
import { EditorPanelComponent } from "./components/editor-panel/editor-panel.component";
import { TranslationService } from "./services/translation.service";
import { I18nService } from "./services/i18n.service";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    WebviewDirective,
    KeylistComponent,
    LanglistComponent,
    SessionPanelComponent,
    EditorPanelComponent,
  ],
  imports: [
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [ElectronService, TranslationService, I18nService],
  bootstrap: [AppComponent],
})
export class AppModule {}
