import { Component, OnInit } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-keylist',
  templateUrl: './keylist.component.html',
  styleUrls: ['./keylist.component.scss', '../side-panel.common.scss']
})
export class KeylistComponent implements OnInit {

  constructor(
    public i18nService: I18nService,
  ) { }

  ngOnInit() {
  }

}
