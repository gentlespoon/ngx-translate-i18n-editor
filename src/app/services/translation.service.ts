import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root",
})
export class TranslationService {
  private DEV = false;

  public readonly languages = {
    "en-TT": "English (WTF?!)",
    "en-US": "English (United States)",
    "en-GB": "English (United Kingdom)",
    "zh-CHS": "中文 (简体)",
    "zh-CHT": "中文 (繁體)",
  };

  constructor(public translateService: TranslateService) {
    this.translateService.addLangs(["en-US", "en-GB", "zh-CHS", "zh-CHT"]);
    this.translateService.setDefaultLang("en-TT");
    this.getUserLanguage();
  }

  public getUserLanguage() {
    // if user has visited before and has a cached language, use it
    var localLanguage = localStorage.getItem("language");
    console.log(
      "[Translation.Service] getUserLanguageFromBrowser(): cachedLanguage=",
      localLanguage
    );
    if (localLanguage) {
      this.useLanguage(localLanguage);
    } else {
      // otherwise, use browser default language
      var lang = this.translateService.getBrowserCultureLang();
      switch (lang) {
        case "zh-TW":
        case "zh-HK":
        case "zh-MO":
          lang = "zh-CHT";
          break;
        case "zh-CN":
        case "zh-SG":
          lang = "zh-CHS";
          break;
      }
      this.useLanguage(lang);
    }
  }

  public saveUserLanguage(): void {
    localStorage.setItem("language", this._language);
  }

  private _language: string = "en-TT";

  public get language(): string {
    return this._language;
  }

  public useLanguage(lang: string): void {
    console.log("[Translation.Service] useLanguage(" + lang + ")");
    this._language = lang;
    this.saveUserLanguage();
    this.translateService.use(this._language);
  }

  public instant(lang: string): string {
    return this.translateService.instant(lang);
  }
}
