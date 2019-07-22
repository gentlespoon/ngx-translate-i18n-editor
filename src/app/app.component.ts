import { Component, OnInit } from '@angular/core';
import { ElectronService } from './services/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '../environments/environment';
import { I18nService } from './services/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private DEV = false;

  constructor(
    public electronService: ElectronService,
    public i18nService: I18nService,
    ) {

    
    if (this.DEV) console.log('environment', environment);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  ngOnInit() {
    this.i18nService.buildList();
    console.log(this.i18nService.keyList, this.i18nService.langList);
  }


  public Object = Object;
  public alert = alert;



}
