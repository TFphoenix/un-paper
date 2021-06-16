// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssetProviderFactory } from '../providers/storage/assetProviderFactory';
import { AzureBlobStorage } from '../providers/storage/azureBlobStorage';
import { StorageProviderFactory } from '../providers/storage/storageProviderFactory';
import { LocalFileSystemProxy } from '../providers/storage/localFileSystemProxy';
// import registerToolbar from './registerToolbar';
import { strings } from './strings';
import { HostProcessType } from './hostProcess';

/**
 * Registers storage, asset and export providers, as well as all toolbar items
 */
export default function registerProviders() {
  // Storage Providers
  StorageProviderFactory.register({
    name: 'localFileSystemProxy',
    displayName: strings.connections.providers.local.title,
    platformSupport: HostProcessType.Electron,
    factory: options => new LocalFileSystemProxy(options)
  });
  StorageProviderFactory.register({
    name: 'azureBlobStorage',
    displayName: strings.connections.providers.azureBlob.title,
    factory: options => new AzureBlobStorage(options)
  });

  // Asset Providers
  AssetProviderFactory.register({
    name: 'localFileSystemProxy',
    displayName: strings.connections.providers.local.title,
    platformSupport: HostProcessType.Electron,
    factory: options => new LocalFileSystemProxy(options)
  });
  AssetProviderFactory.register({
    name: 'azureBlobStorage',
    displayName: strings.connections.providers.azureBlob.title,
    factory: options => new AzureBlobStorage(options)
  });

  //   registerToolbar();
}
