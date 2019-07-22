import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ElectronService } from '../../services/electron.service';
import * as moment from 'moment';

@Component({
  selector: 'app-session-panel',
  templateUrl: './session-panel.component.html',
  styleUrls: ['./session-panel.component.scss']
})
export class SessionPanelComponent implements OnInit {

  constructor(
    public sessionService: SessionService,
    private electronService: ElectronService,
  ) { }

  ngOnInit() {
  }

  
  

  public signIn(): void {
    this.sessionService.signIn(() => {
    });
  }

}
