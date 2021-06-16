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
    '../../../common/scss/canvas.scss'
    //   '../../../common/scss/condensedList.scss',
    //   '../../common/documentFilePicker/documentFilePicker.scss',
    //   '../../common/predictionFilePicker/predictionFilePicker.scss',
    //   '../../common/imageMap/imageMap.scss',
    //   '../../common/pageRange/pageRange.scss',
    //   '../../common/canvasCommandBar/canvasCommandBar.scss',
    //   '../../common/tableView/tableView.scss',
    //   '../../common/predictResult/predictResult.scss'
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
				"labelingState": 2,
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
				"labelingState": 2,
				"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
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
				"state": 0,
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
				"state": 0,
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
		"lastVisitedAssetId": "c55f29760caced9f6000c81be9adf27d6b2b1a1caade7c59745bf99809e2a6bc",
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
					"sas": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D"
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
				"1c25347038054fe14b20fd5ea0e4ca4d16c02801ba2c62eda8c0c01ff6dd75ae": {
					"id": "1c25347038054fe14b20fd5ea0e4ca4d16c02801ba2c62eda8c0c01ff6dd75ae",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 10936366_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2010936366_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 2,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"7c4bcb5c1102b6c5784f79301e42631496ae99dff74ddb3a00861df3be080a35": {
					"id": "7c4bcb5c1102b6c5784f79301e42631496ae99dff74ddb3a00861df3be080a35",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 15468221_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2015468221_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 2,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"2f9a495bc4c640598b2e2b7a5fc9af3977aecbbf44bc87cce9fcd6ac2a763bce": {
					"id": "2f9a495bc4c640598b2e2b7a5fc9af3977aecbbf44bc87cce9fcd6ac2a763bce",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 19944880_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2019944880_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 2,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"e4337b53811581a37be3cafccb1ec6f77c7fbf9215ac8cc6c089ef32559119c8": {
					"id": "e4337b53811581a37be3cafccb1ec6f77c7fbf9215ac8cc6c089ef32559119c8",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 24469911_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2024469911_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 2,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"e39ce2c1f65329c58c73ad95ccbed16de55784dcab3de5b22d55e7d22d34af90": {
					"id": "e39ce2c1f65329c58c73ad95ccbed16de55784dcab3de5b22d55e7d22d34af90",
					"format": "pdf",
					"state": 2,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 29034431_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2029034431_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf",
					"labelingState": 2,
					"schema": "https://schema.cognitiveservices.azure.com/formrecognizer/2021-03-01/labels.json"
				},
				"a4224b066560b2e848b8155534f8fc10c397d6b6d293db1864dad83603824cdb": {
					"id": "a4224b066560b2e848b8155534f8fc10c397d6b6d293db1864dad83603824cdb",
					"format": "pdf",
					"state": 0,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 33640442_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2033640442_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"45ea6ec811698fdbbdcf1fa384a039bf7c8f6a7918c39c32edce4d92982e0803": {
					"id": "45ea6ec811698fdbbdcf1fa384a039bf7c8f6a7918c39c32edce4d92982e0803",
					"format": "pdf",
					"state": 1,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 38244418_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2038244418_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"bed8e780752113d03bf146702ca51b98f1fa9ba14dee2933f442fe85bc911f48": {
					"id": "bed8e780752113d03bf146702ca51b98f1fa9ba14dee2933f442fe85bc911f48",
					"format": "pdf",
					"state": 0,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 42958865_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2042958865_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"4ae128475cd7f0eb42e456cfecb03f8661c48fbdbad36a52f5feba18f33bbbb5": {
					"id": "4ae128475cd7f0eb42e456cfecb03f8661c48fbdbad36a52f5feba18f33bbbb5",
					"format": "pdf",
					"state": 0,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 47981668_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2047981668_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"2f7c2da22f61e8940e5b8d559e23002ceca5af57134c16cd7588304e0b9af2b9": {
					"id": "2f7c2da22f61e8940e5b8d559e23002ceca5af57134c16cd7588304e0b9af2b9",
					"format": "pdf",
					"state": 1,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 52955629_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2052955629_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"c7b85e459f7398dc43cc88af086963b70f921944edad4f2dd4d46b351b00700b": {
					"id": "c7b85e459f7398dc43cc88af086963b70f921944edad4f2dd4d46b351b00700b",
					"format": "pdf",
					"state": 0,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 57954967_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2057954967_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf"
				},
				"05ef34128d42d0bf315f7fccebf5fbcf2f13feca95f517caaeb73ea303bb6180": {
					"id": "05ef34128d42d0bf315f7fccebf5fbcf2f13feca95f517caaeb73ea303bb6180",
					"format": "pdf",
					"state": 0,
					"type": 5,
					"name": "Digi Invoices PDF 1pag/Factura #FDB20 62973565_removed.pdf",
					"path": "https://unpaperstorage.blob.core.windows.net/unpaper-testdata-blob-storage/Digi%20Invoices%20PDF%201pag%2FFactura%20%23FDB20%2062973565_removed.pdf?sp=racwdl&st=2021-05-17T13:52:03Z&se=2021-05-18T13:52:03Z&sv=2020-02-10&sr=c&sig=mfRY3p9K%2BksXzuJhrx4EO5FP9YAgUm3gDByOrH6wsRE%3D",
					"size": null,
					"mimeType": "application/pdf"
				}
			},
			"lastVisitedAssetId": "1c25347038054fe14b20fd5ea0e4ca4d16c02801ba2c62eda8c0c01ff6dd75ae",
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
		]
	}`),
      //   actions: {
      //     loadProject: ProjectActions.loadProject,
      //     saveProject: ProjectActions.saveProject,
      //     deleteProject: ProjectActions.deleteProject,
      //     closeProject: ProjectActions.closeProject,
      //     addAssetToProject: ProjectActions.addAssetToProject,
      //     deleteAsset: ProjectActions.deleteAsset,
      //     loadAssets: ProjectActions.loadAssets,
      //     refreshAsset: ProjectActions.refreshAsset,
      //     loadAssetMetadata: ProjectActions.loadAssetMetadata,
      //     saveAssetMetadata: ProjectActions.saveAssetMetadata,
      //     saveAssetMetadataAndCleanEmptyLabel: ProjectActions.saveAssetMetadataAndCleanEmptyLabel,
      //     updateProjectTag: ProjectActions.updateProjectTag,
      //     deleteProjectTag: ProjectActions.deleteProjectTag,
      //     updateProjectTagsFromFiles: ProjectActions.updateProjectTagsFromFiles,
      //     updatedAssetMetadata: ProjectActions.updatedAssetMetadata,
      //     reconfigureTableTag: ProjectActions.reconfigureTableTag
      //   } as unknown as IProjectActions,
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
