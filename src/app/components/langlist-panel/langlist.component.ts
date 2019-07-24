import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-langlist',
  templateUrl: './langlist.component.html',
  styleUrls: ['./langlist.component.scss', '../side-panel.common.scss']
})
export class LanglistComponent implements OnInit {

  constructor(
    public i18nService: I18nService,
    private translationService: TranslationService,
    ) { }

  languageList = [
    'af-ZA',
    'sq-AL',
    'ar-DZ',
    'ar-BH',
    'ar-EG',
    'ar-IQ',
    'ar-JO',
    'ar-KW',
    'ar-LB',
    'ar-LY',
    'ar-MA',
    'ar-OM',
    'ar-QA',
    'ar-SA',
    'ar-SY',
    'ar-TN',
    'ar-AE',
    'ar-YE',
    'hy-AM',
    'Cy-az-AZ',
    'Lt-az-AZ',
    'eu-ES',
    'be-BY',
    'bg-BG',
    'ca-ES',
    'zh-CN',
    'zh-HK',
    'zh-MO',
    'zh-SG',
    'zh-TW',
    'zh-CHS',
    'zh-CHT',
    'hr-HR',
    'cs-CZ',
    'da-DK',
    'div-MV',
    'nl-BE',
    'nl-NL',
    'en-AU',
    'en-BZ',
    'en-CA',
    'en-CB',
    'en-IE',
    'en-JM',
    'en-NZ',
    'en-PH',
    'en-ZA',
    'en-TT',
    'en-GB',
    'en-US',
    'en-ZW',
    'et-EE',
    'fo-FO',
    'fa-IR',
    'fi-FI',
    'fr-BE',
    'fr-CA',
    'fr-FR',
    'fr-LU',
    'fr-MC',
    'fr-CH',
    'gl-ES',
    'ka-GE',
    'de-AT',
    'de-DE',
    'de-LI',
    'de-LU',
    'de-CH',
    'el-GR',
    'gu-IN',
    'he-IL',
    'hi-IN',
    'hu-HU',
    'is-IS',
    'id-ID',
    'it-IT',
    'it-CH',
    'ja-JP',
    'kn-IN',
    'kk-KZ',
    'kok-IN',
    'ko-KR',
    'ky-KZ',
    'lv-LV',
    'lt-LT',
    'mk-MK',
    'ms-BN',
    'ms-MY',
    'mr-IN',
    'mn-MN',
    'nb-NO',
    'nn-NO',
    'pl-PL',
    'pt-BR',
    'pt-PT',
    'pa-IN',
    'ro-RO',
    'ru-RU',
    'sa-IN',
    'Cy-sr-SP',
    'Lt-sr-SP',
    'sk-SK',
    'sl-SI',
    'es-AR',
    'es-BO',
    'es-CL',
    'es-CO',
    'es-CR',
    'es-DO',
    'es-EC',
    'es-SV',
    'es-GT',
    'es-HN',
    'es-MX',
    'es-NI',
    'es-PA',
    'es-PY',
    'es-PE',
    'es-PR',
    'es-ES',
    'es-UY',
    'es-VE',
    'sw-KE',
    'sv-FI',
    'sv-SE',
    'syr-SY',
    'ta-IN',
    'tt-RU',
    'te-IN',
    'th-TH',
    'tr-TR',
    'uk-UA',
    'ur-PK',
    'Cy-uz-UZ',
    'Lt-uz-UZ',
    'vi-VN',
  ];

  newLang = '';
  addLangPopup = false;
  errorMsg = '';

  ngOnInit() {
  }

  dismissPopup(): void {
    this.addLangPopup = false;
  }

  addLanguage(): void {
    if (this.newLang) {
      // if language is not empty
      if (this.languageList.indexOf(this.newLang) === -1) {
        // if language is not known, ask if user wants to create a custom language code
        if (!confirm(this.translationService.instant('langNotInListConfirm'))) {
          // if not, let user add another language
          return;
        }
      }
      if (this.i18nService.langList.indexOf(this.newLang) !== -1) {
        this.errorMsg = 'languageAlreadyAdded';
        return;
      }
      this.i18nService.i18nData[this.newLang] = {};
      for (let key of this.i18nService.keyList) {
        this.i18nService.i18nData[this.newLang][key] = '';
      }
      this.i18nService.langList.push(this.newLang);
      this.i18nService.langList.sort();
      this.i18nService.selectedLang.push(this.newLang);
      this.i18nService.selectedLang.sort();
      this.newLang = '';
    }
    this.dismissPopup();
  }

  removeLanguage(): void {
    if (confirm(this.translationService.instant('removeLanguageWarning'))) {
      let langs = this.i18nService.selectedLang.join(', ');
      if (confirm(this.translationService.instant('removeLangWarning2') + '\n' + langs)) {
        for (let lang of this.i18nService.selectedLang) {
          let index = this.i18nService.langList.indexOf(lang);
          this.i18nService.langList.splice(index, 1);
          delete this.i18nService.i18nData[lang];
        }
        this.i18nService.selectedLang = [];
      }
    }
  }

}
