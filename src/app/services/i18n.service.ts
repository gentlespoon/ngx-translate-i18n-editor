import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  constructor() {
    setInterval(() => {
      console.log(this.keyList, this.langList, this.selectedLang, this.currentKey);
    }, 1000);
  }


  public keyList = [];
  public langList = [];

  public selectedLang = [];
  public currentKey = '';

  public i18nData = {
    'en-US': {
      'asdfasdf': 'asdfasdfasdfasdfasdf',
      'subobject': {
        'asdf': 'asdf',
      }
    },
    'en-TT': {
      'asdfasdf': 'asdfasdfasdfasdfasdf',
      'subobject': {
        'asdf': 'asdf',
      }
    },
    'en-GB': {
      'asdfasdf': 'asdfasdfasdfasdfasdf',
      'subobject': {
        'asdf': 'asdf',
      }
    },
    'zh-CHS': {
      'asdfasdf': '阿斯蒂芬阿斯顿发送到发斯蒂芬',
      'subobject': {
        'asdf': '阿斯蒂芬',
      }
    },
    'zh-CHT': {
      'asdfasdf': '阿斯蒂芬阿斯顿发送到发斯蒂芬',
      'subobject': {
        'asdf': '阿斯蒂芬',
      }
    }
  };


  buildList(): void {
    for (let lang of Object.keys(this.i18nData)) {
      if (this.langList.indexOf(lang) === -1) {
        this.langList.push(lang);
      }
      this.buildKeyList(this.i18nData[lang]);
    }
    this.langList.sort();
    this.keyList.sort();
  }

  buildKeyList(partialI18nData: object, prefix?: string): void {

    // prepare key prefix
    prefix = prefix ? `${prefix}.` : ``;

    // console.log(prefix);

    // recursively build key list
    for (let key of Object.keys(partialI18nData)) {
      switch(typeof (partialI18nData[key])) {
        case 'object':
          this.buildKeyList(partialI18nData[key], `${prefix}${key}`);
          break;
        case 'string':
          if (this.keyList.indexOf(`${prefix}${key}`) === -1) {
            this.keyList.push(`${prefix}${key}`);
          }
          break;
      }
    }
  }
}
