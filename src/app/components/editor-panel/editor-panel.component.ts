import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-editor-panel',
  templateUrl: './editor-panel.component.html',
  styleUrls: ['./editor-panel.component.scss']
})
export class EditorPanelComponent implements OnInit {

  constructor(
    public i18nService: I18nService,
  ) { }

  ngOnInit() {
  }

  updateCurrentKey(newKeyName) : void {
    for (let lang of this.i18nService.langList) {
      this.i18nService.i18nData[lang][newKeyName] = this.i18nService.i18nData[lang][this.i18nService.currentKey];
      delete this.i18nService.i18nData[lang][this.i18nService.currentKey];
    }
    this.i18nService.keyList[this.i18nService.keyList.indexOf(this.i18nService.currentKey)] = newKeyName;
    this.i18nService.keyList.sort();
    this.i18nService.currentKey = newKeyName;
  }

}
