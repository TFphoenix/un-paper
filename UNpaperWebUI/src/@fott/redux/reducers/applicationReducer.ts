// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ActionTypes } from '../actions/actionTypes';
import { IAppSettings } from '../../models/applicationState';
import { AnyAction } from '../actions/actionCreators';

/**
 * Reducer for application settings. Actions handled:
 * TOGGLE_DEV_TOOLS_SUCCESS
 * REFRESH_APP_SUCCESS
 * @param state - Current app settings
 * @param action - Action that was dispatched
 */
export const reducer = (state: IAppSettings = null, action: AnyAction): IAppSettings => {
  switch (action.type as any) {
    case ActionTypes.SAVE_APP_SETTINGS_SUCCESS:
      return { ...(action as any).payload };
    case ActionTypes.ENSURE_SECURITY_TOKEN_SUCCESS:
      return { ...(action as any).payload };
    case ActionTypes.ADD_ASSET_TO_PROJECT_SUCCESS:
      return { ...state, hideUploadingOption: true };
    default:
      return state;
  }
};
