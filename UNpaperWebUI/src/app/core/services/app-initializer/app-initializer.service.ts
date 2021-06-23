import { Injectable } from '@angular/core';
import { IconService } from '@visurel/iconify-angular';
import * as React from 'react';
import { registerIcons } from 'src/@fott/common/registerIcons';
import registerProviders from 'src/@fott/common/registerProviders';
import registerMixins from 'src/@fott/common/registerMixins';
import { appIcons } from 'src/app/configs/app-icons';
import { ConfigService } from '../config/config.service';
import { IApplicationState } from 'src/@fott/models/applicationState';
import createReduxStore from 'src/@fott/redux/store/store';
import initialState from 'src/@fott/redux/store/initialState';
import { StoreProviderService } from '../store-provider/store-provider.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _iconService: IconService,
    private readonly _storeProviderService: StoreProviderService
  ) {}

  /**
   * Load environment's config data
   */
  load(): Promise<any> {
    return this._configService.load().then(async () => {
      await this.onLoaded();
    });
  }

  /**
   * Called when config data is loaded
   */
  async onLoaded(): Promise<any> {
    console.log('Config data loaded');

    // Register React
    window.React = React;

    // Registers for @fott
    registerIcons();
    registerMixins();
    registerProviders();
    await this._storeProviderService.registerStore();

    // Register @iconify icons
    this._iconService.registerAll(appIcons);
  }
}
