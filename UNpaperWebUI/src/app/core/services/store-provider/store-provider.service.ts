import { Injectable } from '@angular/core';
import { Store } from 'redux';
import { IApplicationState } from 'src/@fott/models/applicationState';
import initialState from 'src/@fott/redux/store/initialState';
import createReduxStore from 'src/@fott/redux/store/store';

@Injectable({
  providedIn: 'root'
})
export class StoreProviderService {
  private _store: Store;

  constructor() {}

  async registerStore(): Promise<Store> {
    const defaultState: IApplicationState = initialState;
    this._store = await createReduxStore(defaultState, true);

    return this._store;
  }

  getStore(): Store {
    return this._store;
  }
}
