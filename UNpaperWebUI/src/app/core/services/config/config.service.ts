import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../../../shared/models/config.model';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { FunctionsApiRequestService } from '../request/functions-api-request.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private readonly _configRelativeUrl = './assets/config/';
  private readonly _productionConfig = 'config.json';
  private readonly _developmentConfig = 'config.local.json';
  private _configObj: Config;
  get config(): Config {
    return this._configObj;
  }

  constructor(
    private readonly _http: HttpClient,
    private readonly _authService: AuthService,
    private readonly _functionsRequestService: FunctionsApiRequestService
  ) {}

  //BUG: Fix 404 (can't find config.json) error in deployment mode
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
