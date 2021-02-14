import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../../shared/models/config.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  //TODO: Fix 404 (can't find config.json) error in deployment mode
  private readonly _configRelativeUrl = './assets/config/';
  private readonly _productionConfig = 'config.json';
  private readonly _developmentConfig = 'config.local.json';
  private _configObj: Config;
  get config(): Config {
    return this._configObj;
  }

  constructor(private _http: HttpClient) {}

  load(): Promise<any> {
    const configUrl = this._configRelativeUrl + (environment.production ? this._productionConfig : this._developmentConfig);

    return this._http
      .get<Config>(configUrl)
      .toPromise()
      .then(configObj => {
        this._configObj = new Config();
        Object.assign(this._configObj, configObj);
      })
      .catch(() => {
        console.log("Couldn't load config files data");
        return null;
      });
  }
}
