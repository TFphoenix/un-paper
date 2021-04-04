import { Injectable } from '@angular/core';
import { registerIcons } from 'src/@fott/common/registerIcons';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(private readonly _configService: ConfigService) {}

  /**
   * Load environment's config data
   */
  load(): Promise<any> {
    return this._configService.load().then(() => {
      this.onLoaded();
    });
  }

  /**
   * Called when config data is loaded
   */
  onLoaded() {
    console.log('Config data loaded');
    // Register icons for @fott
    registerIcons();
  }
}
