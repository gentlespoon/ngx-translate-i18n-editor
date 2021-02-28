import { Component, OnInit } from "@angular/core";
import { ElectronService } from "../../services/electron.service";
import * as moment from "moment";
import { I18nService } from "../../services/i18n.service";
import { TranslationService } from "../../services/translation.service";
import * as dotObject from "dot-object";
import {
  faFolderPlus as fasFolderPlus,
  faFolderOpen as fasFolderOpen,
  faSave as fasSave,
  faFileImport as fasFileImport,
  faFileExport as fasFileExport,
  faInfoCircle as fasInfoCircle,
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-session-panel",
  templateUrl: "./session-panel.component.html",
  styleUrls: ["./session-panel.component.scss"],
})
export class SessionPanelComponent implements OnInit {
  public fasFolderPlus = fasFolderPlus;
  public fasFolderOpen = fasFolderOpen;
  public fasSave = fasSave;
  public fasFileImport = fasFileImport;
  public fasFileExport = fasFileExport;
  public faInfoCircle = fasInfoCircle;

  constructor(
    private electronService: ElectronService,
    private i18nService: I18nService,
    private translationService: TranslationService
  ) {}

  ngOnInit() {}

  loadedFilename = "";

  public newProject(): boolean {
    if (
      Object.keys(this.i18nService.i18nData).length ||
      this.i18nService.keyList.length ||
      this.i18nService.langList.length
    ) {
      if (!confirm(this.translationService.instant("lossUnsavedWarning"))) {
        return false;
      }
    }
    this.i18nService.initialize();
    this.loadedFilename = "";
    return true;
  }

  public openProject(): boolean {
    if (!this.newProject()) return false;
    var filePath = this.electronService.remote.dialog.showOpenDialogSync({
      title: this.translationService.instant("openProjectLong"),
      filters: [{ name: "Gs i18n Project File", extensions: ["json"] }],
    });

    // console.log(filePath, filePath.length, this.electronService.fs.existsSync(filePath[0]));
    if (
      !filePath ||
      !filePath.length ||
      !this.electronService.fs.existsSync(filePath[0])
    ) {
      console.warn(`File does not exist`);
      return false;
    }

    var fileContent = this.electronService.fs.readFileSync(filePath[0], "utf8");
    try {
      this.i18nService.loadProject(fileContent);
      this.loadedFilename = filePath[0];
    } catch (ex) {
      alert(this.translationService.instant(ex));
    }
    return true;
  }

  public saveProject(): void {
    var filePath = this.electronService.remote.dialog.showSaveDialogSync({
      title: this.translationService.instant("saveProjectLong"),
      defaultPath: this.loadedFilename
        ? this.loadedFilename
        : moment().format("YYYYMMDD-HHmmss") + ".json",
    });
    if (!filePath.toLowerCase().endsWith("json")) {
      filePath += ".json";
    }

    var saveObject = { ...this.i18nService.i18nData };
    saveObject["GsI18n"] = true;
    var saveJSON = JSON.stringify(saveObject, null, 2);

    this.electronService.fs.writeFile(filePath, saveJSON, (err) => {
      if (err) alert(err);
      else this.electronService.remote.shell.showItemInFolder(filePath);
    });
  }

  public import(): void {
    alert(this.translationService.instant("notImplemented"));
  }

  public export(): void {
    if (this.i18nService.selectedLang.length) {
      var dirPath = this.electronService.remote.dialog.showOpenDialogSync({
        title: this.translationService.instant("exportToDir"),
        buttonLabel: this.translationService.instant("export"),
        properties: ["openDirectory"],
      });

      // console.log(dirPath, dirPath.length, this.electronService.fs.existsSync(dirPath[0]));
      if (
        !dirPath ||
        !dirPath.length ||
        !this.electronService.fs.existsSync(dirPath[0])
      ) {
        return console.warn(`Directory does not exist`);
      }

      for (var lang of this.i18nService.selectedLang) {
        var outputObject = dotObject.object(this.i18nService.i18nData[lang]);

        var outputJSON = JSON.stringify(outputObject, null, 2);
        this.electronService.fs.writeFile(
          `${dirPath[0]}/${lang}.json`,
          outputJSON,
          (err) => {
            if (err) alert(err);
          }
        );
      }
      this.electronService.remote.shell.showItemInFolder(
        `${dirPath[0]}/${this.i18nService.selectedLang[0]}.json`
      );
    } else {
      return alert(this.translationService.instant("selectAtLeastOneLanguage"));
    }
  }

  public about() {
    this.electronService.remote.shell.openExternal("https://angdasoft.com/");
  }
}
