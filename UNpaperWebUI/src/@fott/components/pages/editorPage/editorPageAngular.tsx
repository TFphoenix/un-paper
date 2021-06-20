import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { IPrebuiltSettings } from 'src/@fott/models/applicationState';
// import IProjectActions, { loadAssets, loadProject } from 'src/@fott/redux/actions/projectActions';
import IProjectActions, * as ProjectActions from 'src/@fott/redux/actions/projectActions';
import { environment } from 'src/environments/environment';
import { EditorPage, IEditorPageProps } from './editorPage';

const containerElementName = 'fottEditorPageContainer';

@Component({
  selector: 'fott-editor-page',
  template: `
    <span #${containerElementName}></span>
  `,
  styleUrls: [
    './editorPage.scss',
    '../../../fott.scss',
    '../../../common/scss/canvas.scss',
    '../../../common/scss/condensedList.scss',
    '../../common/imageMap/imageMap.scss',
    '../../common/pageRange/pageRange.scss',
    '../../common/canvasCommandBar/canvasCommandBar.scss',
    '../../common/tableView/tableView.scss',
    '../../common/tagInput/tagInput.scss',
    '../../common/tagInput/tagInputSize.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class EditorPagePageAngular implements OnChanges, OnDestroy, AfterViewInit {
  @ViewChild(containerElementName, { static: false }) containerRef: ElementRef;
  // @Input() serviceCredentials: IEditorSettings;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    this.render();
  }

  ngAfterViewInit() {
    this.render();
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(this.containerRef.nativeElement);
  }

  private render() {
    // REMEMBER: Necessary because of @Input()
    // if (!this.containerRef) {
    //   return;
    // }

    const editorProperties: IEditorPageProps = {
      project: JSON.parse(`{
		"sourceConnection": {
			"providerOptions": {
				"sas": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D"
			},
			"id": "p5lJFwNut",
			"name": "UNpaper - blob container",
			"providerType": "azureBlobStorage"
		},
		"apiKey": "04c151ae65344c4fb1df1c59e1d22f47",
		"name": "Digi Invoices",
		"folderPath": "Digi Invoices PDF 1pag",
		"apiUriBase": "https://unpaper-form-recognizer.cognitiveservices.azure.com/",
		"securityToken": "Digi Invoices Token",
		"version": "2.1.3",
		"id": "wesjZ6mC7",
		"tags": [
			{
				"name": "Costumer Name",
				"color": "#CC543A",
				"type": "string",
				"format": "not-specified",
				"documentCount": 5
			},
			{
				"name": "Transaction Date",
				"color": "#7BA23F",
				"type": "date",
				"format": "dmy",
				"documentCount": 5
			},
			{
				"name": "Costumer Code",
				"color": "#58B2DC",
				"type": "string",
				"format": "not-specified",
				"documentCount": 5
			},
			{
				"name": "Invoice Number",
				"color": "#FFB11B",
				"type": "string",
				"format": "not-specified",
				"documentCount": 5
			}
		],
		"assets": {
			"c55f29760caced9f6000c81be9adf27d6b2b1a1caade7c59745bf99809e2a6bc": {
				"id": "c55f29760caced9f6000c81be9adf27d6b2b1a1caade7c59745bf99809e2a6bc",
				"format": "pdf",
				"state": 2,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 10936366_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2010936366_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf",
				"labelingState": 1,
				"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
			},
			"5846c20d989f523f365ccde042c62bbea3ad959b8bd7f5c7ac619e9c4604ea2d": {
				"id": "5846c20d989f523f365ccde042c62bbea3ad959b8bd7f5c7ac619e9c4604ea2d",
				"format": "pdf",
				"state": 2,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 15468221_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2015468221_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf",
				"labelingState": 1,
				"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json",
				"cachedImage": "data:image/jpeg;base64,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"
			},
			"d95f790b4b2b0322b8e07ff3a26b43916b1be41000b690e88ef3afefb40c8b9e": {
				"id": "d95f790b4b2b0322b8e07ff3a26b43916b1be41000b690e88ef3afefb40c8b9e",
				"format": "pdf",
				"state": 2,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 19944880_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2019944880_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf",
				"labelingState": 2,
				"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
			},
			"12b11f47cccdaeff59b429801c446b56640665401c6a9bef18894f0c7d0de3a3": {
				"id": "12b11f47cccdaeff59b429801c446b56640665401c6a9bef18894f0c7d0de3a3",
				"format": "pdf",
				"state": 2,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 24469911_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2024469911_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf",
				"labelingState": 2,
				"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
			},
			"93877cba912436db3f9cf9159bd3b21bb16ffa1f6cca4dbfa36fa70c33fc105c": {
				"id": "93877cba912436db3f9cf9159bd3b21bb16ffa1f6cca4dbfa36fa70c33fc105c",
				"format": "pdf",
				"state": 2,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 29034431_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2029034431_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf",
				"labelingState": 2,
				"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
			},
			"c73acca3ce980247ab850f445bc14993c6ea70efd416fb6489279baf93940ae3": {
				"id": "c73acca3ce980247ab850f445bc14993c6ea70efd416fb6489279baf93940ae3",
				"format": "pdf",
				"state": 1,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 33640442_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2033640442_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf"
			},
			"a8871997607677fdbd6bfeeb8641dd3b96de01eb774381434ee62792d99d7f3a": {
				"id": "a8871997607677fdbd6bfeeb8641dd3b96de01eb774381434ee62792d99d7f3a",
				"format": "pdf",
				"state": 1,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 38244418_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2038244418_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf"
			},
			"f5fa9c5e08d83b54c755b95ed288cdc4c0a68604cbdbbf9068402fed01273bd1": {
				"id": "f5fa9c5e08d83b54c755b95ed288cdc4c0a68604cbdbbf9068402fed01273bd1",
				"format": "pdf",
				"state": 1,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 42958865_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2042958865_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf"
			},
			"3dade1ebdf3f8dec8cd67b614d8be6a9f8ef841d17067d5f95b8c587448e09e3": {
				"id": "3dade1ebdf3f8dec8cd67b614d8be6a9f8ef841d17067d5f95b8c587448e09e3",
				"format": "pdf",
				"state": 0,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 47981668_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2047981668_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf"
			},
			"117b1c2eccdf594794843344cc6ce7dbf533931106b147fed10de3db6e3badc3": {
				"id": "117b1c2eccdf594794843344cc6ce7dbf533931106b147fed10de3db6e3badc3",
				"format": "pdf",
				"state": 1,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 52955629_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2052955629_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf"
			},
			"d07eb04152769d6737bdc43d8f00ed14d8217b1ed55d2417808ebd35d3f19cf1": {
				"id": "d07eb04152769d6737bdc43d8f00ed14d8217b1ed55d2417808ebd35d3f19cf1",
				"format": "pdf",
				"state": 0,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 57954967_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2057954967_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf"
			},
			"a3c8643cc1d462e0c8406e1447870ee46dc588d2cbb9478f391e6702c0e95773": {
				"id": "a3c8643cc1d462e0c8406e1447870ee46dc588d2cbb9478f391e6702c0e95773",
				"format": "pdf",
				"state": 0,
				"type": 5,
				"name": "Digi Invoices PDF 1pag/Factura #FDB20 62973565_removed.pdf",
				"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2062973565_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
				"size": null,
				"mimeType": "application/pdf"
			}
		},
		"lastVisitedAssetId": "5846c20d989f523f365ccde042c62bbea3ad959b8bd7f5c7ac619e9c4604ea2d",
		"recentModelRecords": [
			{
				"modelInfo": {
					"modelId": "d4d38090-0c4e-4f6a-b340-a9a635fc1317",
					"createdDateTime": "2021-05-17T15:54:30Z",
					"modelName": "Digi Invoices Train #1",
					"isComposed": false
				},
				"averageAccuracy": 0.95,
				"accuracies": {
					"Costumer Code": 0.8,
					"Costumer Name": 0.995,
					"Invoice Number": 0.995,
					"Transaction Date": 0.995
				},
				"isComposed": false
			}
		],
		"trainRecord": {
			"modelInfo": {
				"modelId": "d4d38090-0c4e-4f6a-b340-a9a635fc1317",
				"createdDateTime": "2021-05-17T15:54:30Z",
				"modelName": "Digi Invoices Train #1",
				"isComposed": false
			},
			"averageAccuracy": 0.95,
			"accuracies": {
				"Costumer Code": 0.8,
				"Costumer Name": 0.995,
				"Invoice Number": 0.995,
				"Transaction Date": 0.995
			}
		},
		"predictModelId": "d4d38090-0c4e-4f6a-b340-a9a635fc1317"
	}`),
      recentProjects: JSON.parse(`[
		{
			"sourceConnection": {
				"providerOptions": {
					"sas": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D"
				},
				"id": "p5lJFwNut",
				"name": "UNpaper - blob container",
				"providerType": "azureBlobStorage"
			},
			"apiKey": "04c151ae65344c4fb1df1c59e1d22f47",
			"name": "Digi Invoices",
			"folderPath": "Digi Invoices PDF 1pag",
			"apiUriBase": "https://unpaper-form-recognizer.cognitiveservices.azure.com/",
			"securityToken": "Digi Invoices Token",
			"version": "2.1.3",
			"id": "wesjZ6mC7",
			"tags": [
				{
					"name": "Costumer Name",
					"color": "#CC543A",
					"type": "string",
					"format": "not-specified",
					"documentCount": 5
				},
				{
					"name": "Transaction Date",
					"color": "#7BA23F",
					"type": "date",
					"format": "dmy",
					"documentCount": 5
				},
				{
					"name": "Costumer Code",
					"color": "#58B2DC",
					"type": "string",
					"format": "not-specified",
					"documentCount": 5
				},
				{
					"name": "Invoice Number",
					"color": "#FFB11B",
					"type": "string",
					"format": "not-specified",
					"documentCount": 5
				}
			],
			"assets": {
				"c55f29760caced9f6000c81be9adf27d6b2b1a1caade7c59745bf99809e2a6bc": {
					"id": "c55f29760caced9f6000c81be9adf27d6b2b1a1caade7c59745bf99809e2a6bc",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 10936366_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2010936366_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 1,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"5846c20d989f523f365ccde042c62bbea3ad959b8bd7f5c7ac619e9c4604ea2d": {
					"id": "5846c20d989f523f365ccde042c62bbea3ad959b8bd7f5c7ac619e9c4604ea2d",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 15468221_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2015468221_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 1,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json",
					"cachedImage": "data:image/jpeg;base64,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"
				},
				"d95f790b4b2b0322b8e07ff3a26b43916b1be41000b690e88ef3afefb40c8b9e": {
					"id": "d95f790b4b2b0322b8e07ff3a26b43916b1be41000b690e88ef3afefb40c8b9e",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 19944880_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2019944880_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 2,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"12b11f47cccdaeff59b429801c446b56640665401c6a9bef18894f0c7d0de3a3": {
					"id": "12b11f47cccdaeff59b429801c446b56640665401c6a9bef18894f0c7d0de3a3",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 24469911_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2024469911_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 2,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"93877cba912436db3f9cf9159bd3b21bb16ffa1f6cca4dbfa36fa70c33fc105c": {
					"id": "93877cba912436db3f9cf9159bd3b21bb16ffa1f6cca4dbfa36fa70c33fc105c",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 29034431_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2029034431_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 2,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"c73acca3ce980247ab850f445bc14993c6ea70efd416fb6489279baf93940ae3": {
					"id": "c73acca3ce980247ab850f445bc14993c6ea70efd416fb6489279baf93940ae3",
					"format": "pdf",
					"state": 1,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 33640442_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2033640442_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"a8871997607677fdbd6bfeeb8641dd3b96de01eb774381434ee62792d99d7f3a": {
					"id": "a8871997607677fdbd6bfeeb8641dd3b96de01eb774381434ee62792d99d7f3a",
					"format": "pdf",
					"state": 1,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 38244418_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2038244418_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"f5fa9c5e08d83b54c755b95ed288cdc4c0a68604cbdbbf9068402fed01273bd1": {
					"id": "f5fa9c5e08d83b54c755b95ed288cdc4c0a68604cbdbbf9068402fed01273bd1",
					"format": "pdf",
					"state": 1,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 42958865_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2042958865_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"3dade1ebdf3f8dec8cd67b614d8be6a9f8ef841d17067d5f95b8c587448e09e3": {
					"id": "3dade1ebdf3f8dec8cd67b614d8be6a9f8ef841d17067d5f95b8c587448e09e3",
					"format": "pdf",
					"state": 0,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 47981668_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2047981668_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"117b1c2eccdf594794843344cc6ce7dbf533931106b147fed10de3db6e3badc3": {
					"id": "117b1c2eccdf594794843344cc6ce7dbf533931106b147fed10de3db6e3badc3",
					"format": "pdf",
					"state": 1,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 52955629_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2052955629_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"d07eb04152769d6737bdc43d8f00ed14d8217b1ed55d2417808ebd35d3f19cf1": {
					"id": "d07eb04152769d6737bdc43d8f00ed14d8217b1ed55d2417808ebd35d3f19cf1",
					"format": "pdf",
					"state": 0,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 57954967_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2057954967_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"a3c8643cc1d462e0c8406e1447870ee46dc588d2cbb9478f391e6702c0e95773": {
					"id": "a3c8643cc1d462e0c8406e1447870ee46dc588d2cbb9478f391e6702c0e95773",
					"format": "pdf",
					"state": 0,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 62973565_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2062973565_removed.pdf?sp=racwdl&st=2021-06-15T14:38:24Z&se=2021-07-11T14:38:00Z&sv=2020-02-10&sr=c&sig=zYQ1Yf%2Fv9XcKsJgyCyDbgzS1ioQJFDh3%2Fe9NVny%2B%2BWw%3D",
					"size": null,
					"mimeType": "application/pdf"
				}
			},
			"lastVisitedAssetId": "5846c20d989f523f365ccde042c62bbea3ad959b8bd7f5c7ac619e9c4604ea2d",
			"recentModelRecords": [
				{
					"modelInfo": {
						"modelId": "d4d38090-0c4e-4f6a-b340-a9a635fc1317",
						"createdDateTime": "2021-05-17T15:54:30Z",
						"modelName": "Digi Invoices Train #1",
						"isComposed": false
					},
					"averageAccuracy": 0.95,
					"accuracies": {
						"Costumer Code": 0.8,
						"Costumer Name": 0.995,
						"Invoice Number": 0.995,
						"Transaction Date": 0.995
					},
					"isComposed": false
				}
			],
			"trainRecord": {
				"modelInfo": {
					"modelId": "d4d38090-0c4e-4f6a-b340-a9a635fc1317",
					"createdDateTime": "2021-05-17T15:54:30Z",
					"modelName": "Digi Invoices Train #1",
					"isComposed": false
				},
				"averageAccuracy": 0.95,
				"accuracies": {
					"Costumer Code": 0.8,
					"Costumer Name": 0.995,
					"Invoice Number": 0.995,
					"Transaction Date": 0.995
				}
			},
			"predictModelId": "d4d38090-0c4e-4f6a-b340-a9a635fc1317"
		}
	]`),
      appSettings: JSON.parse(`{
		"securityTokens": [
			{
				"name": "Digi Invoices Token",
				"key": "RBbRQzBZDqfV28lpeu4g+9AGqY5Pcp/7KTAjXS2jWzw="
			}
		],
		"thumbnailSize": {
			"width": 206,
			"height": 154.5
		}
	}`),
      actions: {} as IProjectActions,
      applicationActions: null,
      appTitleActions: null,
      history: null,
      location: null,
      match: JSON.parse(`{"path": "/projects/:projectId/edit",
      "url": "/projects/wesjZ6mC7/edit",
      "isExact": true,
      "params": {
          "projectId": "wesjZ6mC7"
      }}`)
    };

    ReactDOM.render(
      <div className={'fott-editor-page'}>
        <EditorPage
          project={editorProperties.project}
          recentProjects={editorProperties.recentProjects}
          appSettings={editorProperties.appSettings}
          actions={editorProperties.actions}
          applicationActions={editorProperties.applicationActions}
          appTitleActions={editorProperties.appTitleActions}
          history={editorProperties.history}
          location={editorProperties.location}
          match={editorProperties.match}
        />
      </div>,
      this.containerRef.nativeElement
    );
  }
}
