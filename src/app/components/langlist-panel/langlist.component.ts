import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-langlist',
  templateUrl: './langlist.component.html',
  styleUrls: ['./langlist.component.scss', '../side-panel.common.scss']
})
export class LanglistComponent implements OnInit {

  constructor(
    public i18nService: I18nService,
    ) { }

  ngOnInit() {
  }

}
