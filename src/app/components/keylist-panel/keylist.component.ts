import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../services/i18n.service';
import { TranslationService } from '../../services/translation.service';

@Component({
  selector: 'app-keylist',
  templateUrl: './keylist.component.html',
  styleUrls: ['./keylist.component.scss', '../side-panel.common.scss']
})
export class KeylistComponent implements OnInit {

  constructor(
    public i18nService: I18nService,
    private translationService: TranslationService,
  ) { }

  ngOnInit() {
  }

  newKey = '';
  addKeyPopup = false;

  dismissPopup(): void {
    this.addKeyPopup = false;
  }

  addKey(): void {
    if (!this.i18nService.langList.length) {
      return alert(this.translationService.instant('addLangFirst'));
    }
    if (this.newKey) {
      // if newKey is not empty
      var splittedKeyName = this.newKey.split('.');
      if (splittedKeyName.length > 1) {
        // avoid category with no child
        if (splittedKeyName[splittedKeyName.length-1] === '') {
          return alert(this.translationService.instant('cannotAddCategory'));
        }
        // avoid category name and string name collision
        var cumulatedKeySegment = '';
        for (let keySegment of splittedKeyName) {
          cumulatedKeySegment += cumulatedKeySegment ? `.${keySegment}` : keySegment;
          if (this.i18nService.keyList.indexOf(cumulatedKeySegment) !== -1) {
            return alert(this.translationService.instant('stringWithCategoryNameExists'));
          }
        }
      }
      // avoid numeric key which will cause serialization problem
      if (!isNaN(Number(splittedKeyName[splittedKeyName.length-1]))) {
        return alert(this.translationService.instant('keyCannotBeNumber'));
      }

      var existingKeys = this.i18nService.keyList.filter(key => (key as string).startsWith(this.newKey))
      if (existingKeys.length > 0) {
        // if there is existing key equals to or starts with newKey
        for (let key of existingKeys) {
          if (key === this.newKey) {
            return alert(this.translationService.instant('keyAlreadyExists'));
          }
          // test to see if the existing key is a category;
          if (key.startsWith(this.newKey + '.')) {
            return alert(this.translationService.instant('categoryWithKeyNameExists'));
          }
        }        
      }

      // add newKey to all languages
      Object.keys(this.i18nService.i18nData).map((lang, index) => {
        this.i18nService.i18nData[lang][this.newKey] = '';
      });
      
      this.i18nService.keyList.push(this.newKey);
      this.i18nService.keyList.sort();
      this.i18nService.currentKey = this.newKey;
      this.newKey = '';
    }
    this.dismissPopup();
  }

  removeKey(): void {
    if (confirm(this.translationService.instant('removeKeyWarning'))) {
      if (confirm(this.translationService.instant('removeKeyWarning2') + '\n' + this.i18nService.currentKey)) {
        this.i18nService.keyList.splice(this.i18nService.keyList.indexOf(this.i18nService.currentKey), 1);
        for (let lang of Object.keys(this.i18nService.i18nData)) {
          delete this.i18nService.i18nData[lang][this.i18nService.currentKey];
        }
        this.i18nService.currentKey = '';
      }
    }
  }


}
