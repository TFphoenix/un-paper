// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ActionTypes } from '../actions/actionTypes';
import { IProject, ITag } from '../../models/applicationState';
import { AnyAction } from '../actions/actionCreators';
import _ from 'lodash';
// tslint:disable-next-line:no-var-requires
const tagColors = require('src/@fott/components/common/tagColors.json');

/**
 * Reducer for project. Actions handled:
 * DELETE_PROJECT_SUCCESS
 * CLOSE_PROJECT_SUCCESS
 * LOAD_PROJECT_SUCCESS
 * SAVE_PROJECT_SUCCESS
 * LOAD_PROJECT_ASSETS_SUCCESS
 * SAVE_ASSET_METADATA_SUCCESS
 * @param state - Current project
 * @param action - Action that was dispatched
 */
export const reducer = (state: IProject = null, action: AnyAction): IProject => {
  switch (action.type as any) {
    case ActionTypes.DELETE_PROJECT_SUCCESS:
    case ActionTypes.CLOSE_PROJECT_SUCCESS:
      return null;
    case ActionTypes.LOAD_PROJECT_SUCCESS:
      return { ...(action as any).payload };
    case ActionTypes.ADD_ASSET_TO_PROJECT_SUCCESS:
      return { ...state, lastVisitedAssetId: (action as any).payload.id };
    case ActionTypes.LOAD_ASSET_METADATA_SUCCESS:
      if (!state) {
        return state;
      }

      return {
        ...state,
        lastVisitedAssetId: (action as any).payload.asset.id
      };

    case ActionTypes.REFRESH_ASSET_SUCCESS:
      return {
        ...state,
        assets: { ...state.assets, [(action as any).payload.id]: (action as any).payload }
      };
    case ActionTypes.DELETE_PROJECT_ASSET_SUCCESS:
    case ActionTypes.LOAD_PROJECT_ASSETS_SUCCESS:
      let assets = {};
      (action as any).payload.forEach(asset => {
        assets = { ...assets, [asset.id]: { ...asset } };
      });

      return {
        ...state,
        assets
      };
    case ActionTypes.SAVE_ASSET_METADATA_SUCCESS:
      if (!state) {
        return state;
      }
      const updatedAssets = { ...state.assets } || {};
      updatedAssets[(action as any).payload.asset.id] = _.cloneDeep((action as any).payload.asset);

      const assetTags = new Set();
      (action as any).payload.regions.forEach(region =>
        region.tags.forEach(tag => assetTags.add(tag))
      );

      const newTags: ITag[] = state.tags ? [...state.tags] : [];
      let updateTags = false;

      assetTags.forEach(tag => {
        if (
          !state.tags ||
          state.tags.length === 0 ||
          !state.tags.find(projectTag => tag === projectTag.name)
        ) {
          newTags.push({
            name: tag,
            color: tagColors[newTags.length % tagColors.length]
          } as ITag);
          updateTags = true;
        }
      });

      if (updateTags) {
        return {
          ...state,
          tags: newTags,
          assets: updatedAssets
        };
      }

      return {
        ...state,
        assets: updatedAssets
      };

    case ActionTypes.UPDATE_PROJECT_TAG_SUCCESS:
    case ActionTypes.UPDATE_PROJECT_TAGS_FROM_FILES_SUCCESS:
    case ActionTypes.UPDATE_TAG_LABEL_COUNTS_SUCCESS:
    case ActionTypes.DELETE_PROJECT_TAG_SUCCESS:
      return {
        ...state,
        tags: (action as any).payload.tags
      };
    case ActionTypes.SAVE_CONNECTION_SUCCESS:
      if (!state) {
        return state;
      }

      return {
        ...state,
        sourceConnection:
          state.sourceConnection.id === (action as any).payload.id
            ? { ...(action as any).payload }
            : state.sourceConnection
      };
    default:
      return state;
  }
};
