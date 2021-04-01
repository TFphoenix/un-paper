import { AfterContentChecked, AfterContentInit, AfterViewChecked, Component, Input, OnInit, ViewChild } from '@angular/core';

import { Feature, MapBrowserEvent, View } from 'ol';
import { Extent, getCenter } from 'ol/extent';
import { defaults as defaultInteractions, DragPan, Interaction, DragBox, Snap } from 'ol/interaction.js';
import PointerInteraction from 'ol/interaction/Pointer';
import Draw from 'ol/interaction/Draw.js';
import Style from 'ol/style/Style';
import Collection from 'ol/Collection';
import { shiftKeyOnly, never } from 'ol/events/condition';
import { Modify } from 'ol/interaction';
import Polygon from 'ol/geom/Polygon';
import ImageLayer from 'ol/layer/Image';
import Layer from 'ol/layer/Layer';
import VectorLayer from 'ol/layer/Vector';
import Map from 'ol/Map';
import Projection from 'ol/proj/Projection';
import Static from 'ol/source/ImageStatic.js';
import VectorSource from 'ol/source/Vector';
import { style } from '@angular/animations';
import { createProjection } from 'ol/proj';
import { FeatureCategory, IRegion } from '../../misc/applicationState';
import Utils from '../../misc/utils';

@Component({
  selector: 'app-image-map',
  templateUrl: './image-map.component.html',
  styleUrls: ['./image-map.component.scss']
})
export class ImageMapComponent {
  @Input() imageUri: string;
  @Input() imageWidth: number;
  @Input() imageHeight: number;
  @Input() imageAngle?: number;

  @Input() featureStyler?: (feature: any) => Style;
  @Input() tableBorderFeatureStyler?: (feature: any) => Style;
  @Input() tableIconFeatureStyler?: (feature: any, resolution: any) => Style;
  @Input() tableIconBorderFeatureStyler?: (feature: any) => Style;
  @Input() checkboxFeatureStyler?: (feature: any) => Style;
  @Input() labelFeatureStyler?: (feature: any) => Style;
  @Input() drawRegionStyler?: () => Style;
  @Input() drawnRegionStyler?: (feature: any) => Style;
  @Input() modifyStyler?: () => Style;

  @Input() initEditorMap?: boolean;
  @Input() initPredictMap?: boolean;
  @Input() initLayoutMap?: boolean;

  @Input() enableFeatureSelection?: boolean;
  @Input() handleFeatureSelect?: (feature: any, isTaggle: boolean, category: FeatureCategory) => void;
  @Input() handleFeatureDoubleClick?: (feature: any, isTaggle: boolean, category: FeatureCategory) => void;
  @Input() groupSelectMode?: boolean;
  @Input() handleIsPointerOnImage?: (isPointerOnImage: boolean) => void;
  @Input() isPointerOnImage?: boolean;
  @Input() drawRegionMode?: boolean;
  @Input() isSnapped?: boolean;
  @Input() handleIsSnapped?: (snapped: boolean) => void;
  @Input() handleVertexDrag?: (dragging: boolean) => void;
  @Input() isVertexDragging?: boolean;
  @Input() handleDrawing?: (drawing: boolean) => void;
  @Input() isDrawing?: boolean;
  @Input() handleRegionSelectByGroup?: (selectedRegions: IRegion[]) => void;
  @Input() handleFeatureSelectByGroup?: (feature: any) => IRegion;
  @Input() hoveringFeature?: string;
  @Input() onMapReady?: () => void;
  @Input() handleTableToolTipChange?: (
    display: string,
    width: number,
    height: number,
    top: number,
    left: number,
    rows: number,
    columns: number,
    featureID: string
  ) => void;
  @Input() addDrawnRegionFeatureProps?: (feature: any) => void;
  @Input() updateFeatureAfterModify?: (features: any) => any;

  private map: Map;
  private imageLayer: ImageLayer;
  private textVectorLayer: VectorLayer;
  private tableBorderVectorLayer: VectorLayer;
  private tableIconVectorLayer: VectorLayer;
  private tableIconBorderVectorLayer: VectorLayer;
  private checkboxVectorLayer: VectorLayer;
  private labelVectorLayer: VectorLayer;
  private drawRegionVectorLayer: VectorLayer;
  private drawnLabelVectorLayer: VectorLayer;

  // private mapElement: HTMLDivElement | null = null;
  @ViewChild('mapElement') mapElement: HTMLDivElement | null = null;

  private dragPan: DragPan;
  private draw: Draw;
  private dragBox: DragBox;
  private modify: Modify;
  private snap: Snap;

  private drawnFeatures: Collection<any> = new Collection([], { unique: true });
  public modifyStartFeatureCoordinates: any = {};

  private imageExtent: number[];

  private countPointerDown: number = 0;
  private isSwiping: boolean = false;

  private readonly IMAGE_LAYER_NAME = 'imageLayer';
  private readonly TEXT_VECTOR_LAYER_NAME = 'textVectorLayer';
  private readonly TABLE_BORDER_VECTOR_LAYER_NAME = 'tableBorderVectorLayer';
  private readonly TABLE_ICON_VECTOR_LAYER_NAME = 'tableIconVectorLayer';
  private readonly TABLE_ICON_BORDER_VECTOR_LAYER_NAME = 'tableIconBorderVectorLayer';
  private readonly CHECKBOX_VECTOR_LAYER_NAME = 'checkboxBorderVectorLayer';
  private readonly LABEL_VECTOR_LAYER_NAME = 'labelledVectorLayer';
  private readonly DRAWN_REGION_LABEL_VECTOR_LAYER_NAME = 'drawnRegionLabelledVectorLayer';
  private readonly DRAWN_REGION_VECTOR_LAYER_NAME = 'drawnRegionVectorLayer';

  private ignorePointerMoveEventCount: number = 5;
  private pointerMoveEventCount: number = 0;

  private imageLayerFilter = {
    layerFilter: (layer: Layer) => layer.get('name') === this.IMAGE_LAYER_NAME
  };

  private textVectorLayerFilter = {
    layerFilter: (layer: Layer) => layer.get('name') === this.TEXT_VECTOR_LAYER_NAME
  };

  private checkboxLayerFilter = {
    layerFilter: (layer: Layer) => layer.get('name') === this.CHECKBOX_VECTOR_LAYER_NAME
  };

  private tableIconBorderVectorLayerFilter = {
    layerFilter: (layer: Layer) => layer.get('name') === this.TABLE_ICON_BORDER_VECTOR_LAYER_NAME
  };

  private labelVectorLayerFilter = {
    layerFilter: (layer: Layer) => layer.get('name') === this.LABEL_VECTOR_LAYER_NAME
  };

  private drawnLabelVectorLayerFilter = {
    layerFilter: (layer: Layer) => layer.get('name') === this.DRAWN_REGION_LABEL_VECTOR_LAYER_NAME
  };

  private drawnRegionVectorLayerFilter = {
    layerFilter: (layer: Layer) => layer.get('name') === this.DRAWN_REGION_VECTOR_LAYER_NAME
  };

  constructor() {
    this.imageExtent = [0, 0, this.imageWidth, this.imageHeight];
  }

  public componentDidMount() {
    if (this.initEditorMap) {
      this.initEditorMapFunc();
    } else if (this.initPredictMap) {
      this.initPredictMapFunc();
    } else if (this.initLayoutMap) {
      this.initLayoutMapFunc();
    }
  }

  // public componentDidUpdate(prevProps: IImageMapProps) {
  //   if (this.initEditorMap || this.initLayoutMap) {
  //     if (this?.drawRegionMode) {
  //       this.removeInteraction(this.dragBox);
  //       this.initializeDraw();
  //       this.addInteraction(this.draw);
  //       this.initializeModify();
  //       this.addInteraction(this.modify);
  //       this.addInteraction(this.snap);
  //       if (this?.isPointerOnImage) {
  //         if (this.isSnapped) {
  //           this.removeInteraction(this.draw);
  //         }
  //         if (this.isDrawing) {
  //           this.removeInteraction(this.snap);
  //         }
  //       } else {
  //         this.removeInteraction(this.draw);
  //         this.removeInteraction(this.modify);
  //         this.removeInteraction(this.snap);
  //       }
  //     } else {
  //       this.removeInteraction(this.draw);
  //       this.addInteraction(this.dragBox);
  //       this.initializeModify();
  //       this.addInteraction(this.modify);
  //       this.addInteraction(this.snap);
  //       if (!this?.isPointerOnImage) {
  //         this.removeInteraction(this.modify);
  //         this.removeInteraction(this.dragBox);
  //       }
  //     }

  //     if (!this.isPointerOnImage && prevProps.isPointerOnImage && this.isVertexDragging) {
  //       this.cancelModify();
  //     }
  //   }

  //   if (prevProps.imageUri !== this.imageUri || prevProps.imageAngle !== this.imageAngle) {
  //     this.imageExtent = [0, 0, this.imageWidth, this.imageHeight];
  //     this.setImage(this.imageUri, this.imageExtent);
  //   }
  // }

  public resetAllLayerVisibility() {
    this.toggleCheckboxFeatureVisibility(true);
    this.toggleLabelFeatureVisibility(true);
    this.toggleTableFeatureVisibility(true);
    this.toggleTextFeatureVisibility(true);
    this.toggleDrawnRegionsFeatureVisibility(true);
  }

  /**
   * Hide/Display table features
   */
  public toggleTableFeatureVisibility = (visible: boolean = false) => {
    this.tableBorderVectorLayer.setVisible(visible || !this.tableBorderVectorLayer.getVisible());
    this.tableIconVectorLayer.setVisible(visible || !this.tableIconVectorLayer.getVisible());
    this.tableIconBorderVectorLayer.setVisible(visible || !this.tableIconBorderVectorLayer.getVisible());
  };

  public toggleLabelFeatureVisibility = (visible: boolean = false) => {
    this.labelVectorLayer.setVisible(visible || !this.labelVectorLayer.getVisible());
    let drawLabelVectorLayerVisibility = this.drawnLabelVectorLayer.getVisible();
    this.drawnLabelVectorLayer.setVisible(visible || !drawLabelVectorLayerVisibility);
    drawLabelVectorLayerVisibility = this.drawnLabelVectorLayer.getVisible();
    const drawnLabelFeatures = this.getAllDrawnLabelFeatures();
    if (!drawLabelVectorLayerVisibility) {
      drawnLabelFeatures?.forEach(feature => {
        this.removeFromDrawnFeatures(feature);
      });
    } else {
      drawnLabelFeatures?.forEach(feature => {
        this.pushToDrawnFeatures(feature);
      });
    }
  };

  public toggleDrawnRegionsFeatureVisibility = (visible: boolean = false) => {
    let drawRegionVectorLayerVisibility = this.drawRegionVectorLayer.getVisible();
    this.drawRegionVectorLayer.setVisible(visible || !drawRegionVectorLayerVisibility);
    drawRegionVectorLayerVisibility = this.drawRegionVectorLayer.getVisible();
    const drawnRegionFeatures = this.getAllDrawnRegionFeatures();
    if (!drawRegionVectorLayerVisibility) {
      drawnRegionFeatures?.forEach(feature => {
        this.removeFromDrawnFeatures(feature);
      });
    } else {
      drawnRegionFeatures?.forEach(feature => {
        this.pushToDrawnFeatures(feature);
      });
    }
  };

  private pushToDrawnFeatures = (feature: any, drawnFeatures: Collection<any> = this.drawnFeatures) => {
    const itemAlreadyExists = drawnFeatures.getArray().indexOf(feature) !== -1;
    if (!itemAlreadyExists) {
      drawnFeatures.push(feature);
    }
  };

  private removeFromDrawnFeatures = (feature: any, drawnFeatures: Collection<any> = this.drawnFeatures) => {
    const itemAlreadyExists = drawnFeatures.getArray().indexOf(feature) !== -1;
    if (itemAlreadyExists) {
      drawnFeatures.remove(feature);
    }
  };

  /**
   * Hide/Display checkbox features
   */
  public toggleCheckboxFeatureVisibility = (visible: boolean = false) => {
    this.checkboxVectorLayer.setVisible(visible || !this.checkboxVectorLayer.getVisible());
  };

  public getResolutionForZoom = (zoom: number) => {
    if (this.map && this.map.getView()) {
      return this.map.getView().getResolutionForZoom(zoom);
    } else {
      return null;
    }
  };

  /**
   * Hide/Display text features
   */
  public toggleTextFeatureVisibility = (visible: boolean = false) => {
    this.textVectorLayer.setVisible(visible || !this.textVectorLayer.getVisible());
  };

  /**
   * Add one text feature to the map
   */
  public addFeature = (feature: Feature) => {
    this.textVectorLayer.getSource().addFeature(feature);
  };

  public addCheckboxFeature = (feature: Feature) => {
    this.checkboxVectorLayer.getSource().addFeature(feature);
  };

  public addLabelFeature = (feature: Feature) => {
    this.labelVectorLayer.getSource().addFeature(feature);
  };

  public addDrawnLabelFeature = (feature: Feature) => {
    this.drawnLabelVectorLayer.getSource().addFeature(feature);
  };

  public addTableBorderFeature = (feature: Feature) => {
    this.tableBorderVectorLayer.getSource().addFeature(feature);
  };

  public addTableIconFeature = (feature: Feature) => {
    this.tableIconVectorLayer.getSource().addFeature(feature);
  };

  public addTableIconBorderFeature = (feature: Feature) => {
    this.tableIconBorderVectorLayer.getSource().addFeature(feature);
  };

  /**
   * Add features to the map
   */
  public addFeatures = (features: Feature[]) => {
    this.textVectorLayer.getSource().addFeatures(features);
  };

  public addCheckboxFeatures = (features: Feature[]) => {
    this.checkboxVectorLayer.getSource().addFeatures(features);
  };

  public addLabelFeatures = (features: Feature[]) => {
    this.labelVectorLayer.getSource().addFeatures(features);
  };

  public addDrawnLabelFeatures = (features: Feature[]) => {
    this.drawnLabelVectorLayer.getSource().addFeatures(features);
  };

  public addTableBorderFeatures = (features: Feature[]) => {
    this.tableBorderVectorLayer.getSource().addFeatures(features);
  };

  public addTableIconFeatures = (features: Feature[]) => {
    this.tableIconVectorLayer.getSource().addFeatures(features);
  };

  public addTableIconBorderFeatures = (features: Feature[]) => {
    this.tableIconBorderVectorLayer.getSource().addFeatures(features);
  };

  public addDrawnRegionFeatures = (features: Feature[]) => {
    this.drawRegionVectorLayer.getSource().addFeatures(features);
  };

  /**
   * Add interaction to the map
   */
  public addInteraction = (interaction: Interaction) => {
    if (
      undefined ===
      (this.map.getInteractions() as any).array_.find((existingInteraction: { constructor: Function }) => {
        return interaction.constructor === existingInteraction.constructor;
      })
    ) {
      this.map.addInteraction(interaction);
    }
  };

  /**
   * Get all features from the map
   */
  public getAllFeatures() {
    return this.textVectorLayer.getSource().getFeatures();
  }

  public getAllCheckboxFeatures() {
    return this.checkboxVectorLayer.getSource().getFeatures();
  }

  public getAllLabelFeatures() {
    return this.labelVectorLayer.getSource().getFeatures();
  }

  public getAllDrawnLabelFeatures() {
    return this.drawnLabelVectorLayer.getSource().getFeatures();
  }

  public getAllDrawnRegionFeatures() {
    return this.drawRegionVectorLayer.getSource().getFeatures();
  }

  public getFeatureByID = (featureID: string | number) => {
    return this.textVectorLayer.getSource().getFeatureById(featureID);
  };

  public getCheckboxFeatureByID = (featureID: string | number) => {
    return this.checkboxVectorLayer.getSource().getFeatureById(featureID);
  };

  public getTableBorderFeatureByID = (featureID: string | number) => {
    return this.tableBorderVectorLayer.getSource().getFeatureById(featureID);
  };

  public getTableIconFeatureByID = (featureID: string | number) => {
    return this.tableIconVectorLayer.getSource().getFeatureById(featureID);
  };

  public getTableIconBorderFeatureByID = (featureID: string | number) => {
    return this.tableIconBorderVectorLayer.getSource().getFeatureById(featureID);
  };

  public getDrawnRegionFeatureByID = (featureID: string) => {
    return this.drawRegionVectorLayer.getSource().getFeatureById(featureID);
  };

  public getLabelFeatureByID = (featureID: string | number) => {
    return this.labelVectorLayer.getSource().getFeatureById(featureID);
  };

  public getDrawnLabelFeatureByID = (featureID: string) => {
    return this.drawnLabelVectorLayer.getSource().getFeatureById(featureID);
  };

  /**
   * Remove specific feature object from the map
   */
  public removeFeature = (feature: Feature) => {
    if (feature && this.getFeatureByID(feature.getId())) {
      this.textVectorLayer.getSource().removeFeature(feature);
    }
  };

  public removeCheckboxFeature = (feature: Feature) => {
    if (feature && this.getCheckboxFeatureByID(feature.getId())) {
      this.checkboxVectorLayer.getSource().removeFeature(feature);
    }
  };

  public removeLabelFeature = (feature: Feature) => {
    if (feature && this.getLabelFeatureByID(feature.getId())) {
      this.labelVectorLayer.getSource().removeFeature(feature);
    }
  };

  public removeDrawnLabelFeature = (feature: Feature) => {
    if (feature && this.getDrawnLabelFeatureByID((feature as any).getId())) {
      this.drawnLabelVectorLayer.getSource().removeFeature(feature);
    }
  };

  public removeDrawnRegionFeature = (feature: Feature) => {
    if (feature && this.getDrawnRegionFeatureByID((feature as any).getId())) {
      this.drawRegionVectorLayer.getSource().removeFeature(feature);
    }
  };

  /**
   * Remove all features from the map
   */
  public removeAllFeatures() {
    if (this.handleTableToolTipChange) {
      this.handleTableToolTipChange('none', 0, 0, 0, 0, 0, 0, null);
    }
    this.textVectorLayer?.getSource().clear();
    this.tableBorderVectorLayer?.getSource().clear();
    this.tableIconVectorLayer?.getSource().clear();
    this.tableIconBorderVectorLayer?.getSource().clear();
    this.checkboxVectorLayer?.getSource().clear();
    this.labelVectorLayer?.getSource().clear();
    if (this.initEditorMap) {
      this.clearDrawnRegions();
    }
  }

  private clearDrawnRegions() {
    this.drawRegionVectorLayer?.getSource().clear();
    this.drawnLabelVectorLayer?.getSource().clear();

    this.drawnFeatures = new Collection([], { unique: true });

    this.drawRegionVectorLayer.getSource().on('addfeature', evt => {
      this.pushToDrawnFeatures(evt.feature, this.drawnFeatures);
    });
    this.drawRegionVectorLayer.getSource().on('removefeature', evt => {
      this.removeFromDrawnFeatures(evt.feature, this.drawnFeatures);
    });
    this.drawnLabelVectorLayer.getSource().on('addfeature', evt => {
      this.pushToDrawnFeatures(evt.feature, this.drawnFeatures);
    });
    this.drawnLabelVectorLayer.getSource().on('removefeature', evt => {
      this.removeFromDrawnFeatures(evt.feature, this.drawnFeatures);
    });

    this.removeInteraction(this.snap);
    this.initializeSnap();
    this.addInteraction(this.snap);
    this.removeInteraction(this.modify);
    this.initializeModify();
    this.addInteraction(this.modify);
  }

  public removeAllLabelFeatures() {
    this.labelVectorLayer?.getSource().clear();
  }

  public removeAllDrawnLabelFeatures() {
    this.getAllDrawnLabelFeatures().forEach(feature => {
      this.removeFromDrawnFeatures(feature);
    });
    this.drawnLabelVectorLayer?.getSource().clear();
  }

  /**
   * Remove interaction from the map
   */
  public removeInteraction = (interaction: Interaction) => {
    const existingInteraction = (this.map.getInteractions() as any).array_.find((existingInteraction: { constructor: Function }) => {
      return interaction.constructor === existingInteraction.constructor;
    });

    if (existingInteraction !== undefined) {
      this.map.removeInteraction(existingInteraction);
    }
  };

  public updateSize() {
    if (this.map) {
      this.map.updateSize();
    }
  }

  /**
   * Get the image extent (left, top, right, bottom)
   */
  public getImageExtent() {
    return this.imageExtent;
  }

  /**
   * Get features at specific extend
   */
  public getFeaturesInExtent = (extent: Extent): Feature[] => {
    const features: Feature[] = [];
    this.textVectorLayer.getSource().forEachFeatureInExtent(extent, feature => {
      features.push(feature);
    });
    return features;
  };

  public zoomIn() {
    this.map.getView().setZoom(this.map.getView().getZoom() + 0.3);
  }

  public zoomOut() {
    this.map.getView().setZoom(this.map.getView().getZoom() - 0.3);
  }

  public resetZoom() {
    this.map.getView().setZoom(0);
  }

  private initPredictMapFunc() {
    const projection = this.createProjection(this.imageExtent);
    const layers = this.initializePredictLayers(projection);
    this.initializeMap(projection, layers);
    this.initializeDragPan();
  }

  private initEditorMapFunc() {
    const projection = this.createProjection(this.imageExtent);
    const layers = this.initializeEditorLayers(projection);
    this.initializeMap(projection, layers);

    this.map.on('pointerdown', this.handlePointerDown);
    this.map.on('pointermove', this.handlePointerMove);
    this.map.on('pointermove', this.handlePointerMoveOnTableIcon);
    this.map.on('pointerup', this.handlePointerUp);
    this.map.on('dblclick', this.handleDoubleClick);

    this.initializeDefaultSelectionMode();
    this.initializeDragPan();
  }

  private initLayoutMapFunc() {
    const projection = this.createProjection(this.imageExtent);
    const layers = this.initializeEditorLayers(projection);
    this.initializeMap(projection, layers);

    this.map.on('pointerdown', this.handlePointerDown);
    this.map.on('pointermove', this.handlePointerMove);
    this.map.on('pointermove', this.handlePointerMoveOnTableIcon);
    this.map.on('pointerup', this.handlePointerUp);
    this.map.on('dblclick', this.handleDoubleClick);

    this.initializeDefaultSelectionMode();
    this.initializeDragPan();
  }

  private setImage = (imageUri: string, imageExtent: number[]) => {
    const projection = this.createProjection(imageExtent);
    this.imageLayer.setSource(this.createImageSource(imageUri, projection, imageExtent));
    const mapView = this.createMapView(projection, imageExtent);
    this.map.setView(mapView);
  };

  private createProjection = (imageExtend: number[]) => {
    return new Projection({
      code: 'xkcd-image',
      units: 'pixels',
      extent: imageExtend
    });
  };

  private createMapView = (projection: Projection, imageExtend: number[]) => {
    const minZoom = this.getMinimumZoom();
    const rotation = this.imageAngle ? Utils.degreeToRadians((this.imageAngle + 360) % 360) : 0;

    return new View({
      projection,
      center: getCenter(imageExtend),
      rotation,
      zoom: minZoom,
      minZoom
    });
  };

  private createImageSource = (imageUri: string, projection: Projection, imageExtend: number[]) => {
    return new Static({
      url: imageUri,
      projection,
      imageExtent: imageExtend
    });
  };

  private getMinimumZoom() {
    // In openlayers, the image will be projected into 256x256 pixels,
    // and image will be 2x larger at each zoom level.
    // https://openlayers.org/en/latest/examples/min-zoom.html

    const containerAspectRatio = this.mapElement ? this.mapElement.clientHeight / this.mapElement.clientWidth : 1;
    const imageAspectRatio = this.imageHeight / this.imageWidth;
    if (imageAspectRatio > containerAspectRatio) {
      // Fit to width
      return Math.LOG2E * Math.log(this.mapElement!.clientHeight / 256);
    } else {
      // Fit to height
      return Math.LOG2E * Math.log(this.mapElement!.clientWidth / 256);
    }
  }

  private handlePointerDown = (event: MapBrowserEvent) => {
    if (this.isSnapped) {
      this.handleVertexDrag(true);
      return;
    }

    if (!this.enableFeatureSelection) {
      return;
    }

    const eventPixel = this.map.getEventPixel(event.originalEvent);

    const filter = this.getLayerFilterAtPixel(eventPixel);

    const isPixelOnFeature = !!filter;
    if (isPixelOnFeature && !this.isSnapped) {
      this.setDragPanInteraction(false);
    }

    if (filter && this.handleFeatureSelect) {
      this.map.forEachFeatureAtPixel(
        eventPixel,
        feature => {
          this.handleFeatureSelect(feature, true, filter.category);
        },
        filter.layerfilter
      );
    }
  };
  private handleDoubleClick = (event: MapBrowserEvent) => {
    const eventPixel = this.map.getEventPixel(event.originalEvent);

    const filter = this.getLayerFilterAtPixel(eventPixel);
    if (filter && this.handleFeatureDoubleClick) {
      this.map.forEachFeatureAtPixel(
        eventPixel,
        feature => {
          this.handleFeatureDoubleClick(feature, true, filter.category);
        },
        filter.layerfilter
      );
    }
  };

  private getLayerFilterAtPixel = (eventPixel: any) => {
    const isPointerOnLabelledFeature = this.map.hasFeatureAtPixel(eventPixel, this.labelVectorLayerFilter);
    if (isPointerOnLabelledFeature) {
      return {
        layerfilter: this.labelVectorLayerFilter,
        category: FeatureCategory.Label
      };
    }
    const isPointerOnCheckboxFeature = this.map.hasFeatureAtPixel(eventPixel, this.checkboxLayerFilter);
    if (isPointerOnCheckboxFeature) {
      return {
        layerfilter: this.checkboxLayerFilter,
        category: FeatureCategory.Checkbox
      };
    }
    const isPointerOnTextFeature = this.map.hasFeatureAtPixel(eventPixel, this.textVectorLayerFilter);
    if (isPointerOnTextFeature) {
      return {
        layerfilter: this.textVectorLayerFilter,
        category: FeatureCategory.Text
      };
    }
    const isPointerOnDrawnRegionFeature = this.map.hasFeatureAtPixel(eventPixel, this.drawnRegionVectorLayerFilter);
    if (isPointerOnDrawnRegionFeature) {
      return {
        layerfilter: this.drawnRegionVectorLayerFilter,
        category: FeatureCategory.DrawnRegion
      };
    }
    const isPointerOnDrawnLabelFeature = this.map.hasFeatureAtPixel(eventPixel, this.drawnLabelVectorLayerFilter);
    if (isPointerOnDrawnLabelFeature) {
      return {
        layerfilter: this.drawnLabelVectorLayerFilter,
        category: FeatureCategory.DrawnRegion
      };
    }
    return null;
  };

  private handlePointerMoveOnTableIcon = (event: MapBrowserEvent) => {
    if (this.handleTableToolTipChange) {
      const eventPixel = this.map.getEventPixel(event.originalEvent);
      const isPointerOnTableIconFeature = this.map.hasFeatureAtPixel(eventPixel, this.tableIconBorderVectorLayerFilter);
      if (isPointerOnTableIconFeature) {
        const features = this.map.getFeaturesAtPixel(eventPixel, this.tableIconBorderVectorLayerFilter);
        if (features.length > 0) {
          const feature = features[0];
          if (feature && this.hoveringFeature !== feature.get('id')) {
            const geometry = feature.getGeometry();
            const coordinates = (geometry as any).getCoordinates();
            if (coordinates && coordinates.length > 0) {
              const pixels = [];
              pixels.push(this.map.getPixelFromCoordinate(coordinates[0][0]));
              pixels.push(this.map.getPixelFromCoordinate(coordinates[0][1]));
              pixels.push(this.map.getPixelFromCoordinate(coordinates[0][2]));
              pixels.push(this.map.getPixelFromCoordinate(coordinates[0][3]));
              const flattenedLines = [].concat(...pixels);
              const xAxisValues = flattenedLines.filter((value, index) => index % 2 === 0);
              const yAxisValues = flattenedLines.filter((value, index) => index % 2 === 1);
              const left = Math.min(...xAxisValues);
              const top = Math.min(...yAxisValues);
              const right = Math.max(...xAxisValues);
              const bottom = Math.max(...yAxisValues);
              const width = right - left;
              const height = bottom - top;
              this.handleTableToolTipChange(
                'block',
                width + 2,
                height + 2,
                top + 43,
                left - 1,
                feature.get('rows'),
                feature.get('columns'),
                feature.get('id')
              );
            }
          }
        }
      } else {
        if (this.hoveringFeature !== null) {
          this.handleTableToolTipChange('none', 0, 0, 0, 0, 0, 0, null);
        }
      }
    }
  };

  private handlePointerMove = (event: MapBrowserEvent) => {
    if (this.shouldIgnorePointerMove()) {
      return;
    }

    // disable vertical scrolling for iOS Safari
    event.preventDefault();

    const eventPixel = this.map.getEventPixel(event.originalEvent);
    this.map.forEachFeatureAtPixel(
      eventPixel,
      feature => {
        if (this.handleFeatureSelect) {
          this.handleFeatureSelect(feature, false /*isTaggle*/, FeatureCategory.Text);
        }
      },
      this.textVectorLayerFilter
    );
  };

  handlePointerUp() {
    if (this.isDrawing) {
      this.handleDrawing(false);
      return;
    }

    if (this.isVertexDragging) {
      this.handleVertexDrag(false);
      return;
    }

    if (!this.enableFeatureSelection) {
      return;
    }

    this.setDragPanInteraction(true);
    this.removeInteraction(this.modify);
    this.initializeModify();
    this.addInteraction(this.modify);
  }

  setDragPanInteraction(dragPanEnabled: boolean) {
    if (dragPanEnabled) {
      this.addInteraction(this.dragPan);
      this.setSwiping(false);
    } else {
      this.removeInteraction(this.dragPan);
      this.setSwiping(true);
    }
  }

  public setSwiping(swiping: boolean) {
    this.isSwiping = swiping;
  }

  shouldIgnorePointerMove() {
    if (!this.enableFeatureSelection) {
      return true;
    }

    if (!this.isSwiping) {
      return true;
    }

    return false;
  }

  public cancelDrawing() {
    this.removeInteraction(this.draw);
    this.initializeDraw();
    this.addInteraction(this.draw);
  }

  public cancelModify() {
    Object.entries(this.modifyStartFeatureCoordinates).forEach(featureCoordinate => {
      let feature = this.getDrawnRegionFeatureByID(featureCoordinate[0]);
      if (!feature) {
        feature = this.getDrawnLabelFeatureByID(featureCoordinate[0]);
      }
      if ((feature.getGeometry() as any).flatCoordinates.join(',') !== featureCoordinate[1]) {
        const oldFlattenedCoordinates = (featureCoordinate[1] as string).split(',').map(parseFloat);
        const oldCoordinates = [];
        for (let i = 0; i < oldFlattenedCoordinates.length; i += 2) {
          oldCoordinates.push([oldFlattenedCoordinates[i], oldFlattenedCoordinates[i + 1]]);
        }
        (feature.getGeometry() as any).setCoordinates([oldCoordinates]);
      }
    });
    this.modifyStartFeatureCoordinates = {};
    this.removeInteraction(this.modify);
    this.initializeModify();
    this.addInteraction(this.modify);
    this.handleIsSnapped(false);
  }

  initializeDefaultSelectionMode() {
    this.initializeSnapCheck();
    this.initializePointerOnImageCheck();
    this.initializeDragBox();
    this.initializeModify();
    this.initializeSnap();
    this.initializeDraw();
    this.addInteraction(this.dragBox);
    this.addInteraction(this.modify);
    this.addInteraction(this.snap);
  }

  initializeDraw() {
    const boundingExtent = (coordinates: any[]) => {
      const extent = createEmpty();
      coordinates.forEach((coordinate: any) => {
        extendCoordinate(extent, coordinate);
      });
      return extent;
    };

    const createEmpty = () => {
      return [Infinity, Infinity, -Infinity, -Infinity];
    };

    const extendCoordinate = (extent: any[], coordinate: any[]) => {
      if (coordinate[0] < extent[0]) {
        extent[0] = coordinate[0];
      }
      if (coordinate[0] > extent[2]) {
        extent[2] = coordinate[0];
      }
      if (coordinate[1] < extent[1]) {
        extent[1] = coordinate[1];
      }
      if (coordinate[1] > extent[3]) {
        extent[3] = coordinate[1];
      }
    };

    this.draw = new Draw({
      source: this.drawRegionVectorLayer.getSource(),
      style: this.drawRegionStyler,
      geometryFunction: (coordinates: any, optGeometry: any) => {
        const extent = boundingExtent(/** @type {LineCoordType} */ coordinates);
        const boxCoordinates = [
          [
            [extent[0], extent[3]],
            [extent[2], extent[3]],
            [extent[2], extent[1]],
            [extent[0], extent[1]]
          ]
        ];
        let geometry = optGeometry;
        if (geometry) {
          geometry.setCoordinates(boxCoordinates);
        } else {
          geometry = new Polygon(boxCoordinates);
        }
        return geometry;
      },
      freehand: true,
      stopClick: true
    } as any);

    this.draw.on('drawstart', drawEvent => {
      this.handleDrawing(true);
    });

    this.draw.on('drawend', drawEvent => {
      this.addDrawnRegionFeatureProps(drawEvent.feature);
    });
  }

  initializeModify() {
    this.modify = new Modify({
      deleteCondition: never,
      insertVertexCondition: never,
      style: this.modifyStyler,
      features: this.drawnFeatures
    });

    (this.modify as any).handleUpEvent_old = (this.modify as any).handleUpEvent;
    (this.modify as any).handleUpEvent = function (evt: any) {
      try {
        this.handleUpEvent_old(evt);
      } catch (ex) {
        // do nothing
      }
    };

    this.modify.on('modifystart', modifyEvent => {
      const features = modifyEvent.features.getArray();
      let featureCoordinates: any[] = [];
      features.forEach(feature => {
        (feature.getGeometry() as any).getCoordinates()[0].forEach((coordinate: any[]) => {
          featureCoordinates.push(coordinate[0]);
          featureCoordinates.push(coordinate[1]);
        });
        this.modifyStartFeatureCoordinates[feature.getId()] = featureCoordinates.join(',');
        featureCoordinates = [];
      });
    });

    this.modify.on('modifyend', modifyEvent => {
      const features = modifyEvent.features.getArray();
      this.updateFeatureAfterModify(features);
    });
  }

  initializeSnap() {
    this.snap = new Snap({
      edge: false,
      vertex: true,
      features: this.drawnFeatures
    });
  }

  initializeDragPan() {
    this.dragPan = new DragPan();
    this.setDragPanInteraction(true);
  }

  initializeDragBox() {
    this.dragBox = new DragBox({
      condition: shiftKeyOnly,
      className: 'ol-dragbox-style'
    } as any);

    this.dragBox.on('boxend', () => {
      const featureMap: any = {};
      const extent = this.dragBox.getGeometry().getExtent();
      const regionsToAdd: IRegion[] = [];
      if (this.labelVectorLayer.getVisible()) {
        this.labelVectorLayer.getSource().forEachFeatureInExtent(extent, feature => {
          const selectedRegion = this.handleFeatureSelectByGroup(feature);
          if (selectedRegion) {
            featureMap[feature.get('id')] = true;
            regionsToAdd.push(selectedRegion);
          }
        });
      }
      if (this.textVectorLayer.getVisible()) {
        this.textVectorLayer.getSource().forEachFeatureInExtent(extent, feature => {
          const selectedRegion = this.handleFeatureSelectByGroup(feature);
          if (selectedRegion && !featureMap.hasOwnProperty(feature.get('id'))) {
            regionsToAdd.push(selectedRegion);
          }
        });
      }
      if (regionsToAdd.length > 0) {
        this.handleRegionSelectByGroup(regionsToAdd);
      }
    });
  }

  initializeSnapCheck() {
    const snapCheck = new Interaction({
      handleEvent: (evt: MapBrowserEvent) => {
        if (!this.isVertexDragging && this.handleIsSnapped) {
          this.handleIsSnapped(this.snap.snapTo(evt.pixel, evt.coordinate, evt.map).snapped && this.isPointerOnImage);
        }
        return true;
      }
    });
    this.addInteraction(snapCheck);
  }

  initializePointerOnImageCheck() {
    const checkIfPointerOnMap = new PointerInteraction({
      handleEvent: (evt: MapBrowserEvent) => {
        const eventPixel = this.map.getEventPixel(evt.originalEvent);
        const test = this.map.forEachLayerAtPixel(
          eventPixel,
          () => {
            return true;
          },
          this.imageLayerFilter
        );

        if (this.handleIsPointerOnImage) {
          if (!Boolean(test) && this.isPointerOnImage) {
            this.handleIsPointerOnImage(false);
          } else if (!this.isPointerOnImage && Boolean(test)) {
            this.handleIsPointerOnImage(true);
          }
        }
        return true;
      }
    });
    this.addInteraction(checkIfPointerOnMap);
  }

  getCursor() {
    if (this.initEditorMap) {
      if (this.isVertexDragging) {
        return 'grabbing';
      } else if (this.isSnapped) {
        return 'grab';
      } else if (this?.groupSelectMode || this?.drawRegionMode) {
        if (this.isPointerOnImage) {
          return 'crosshair';
        } else {
          return 'default';
        }
      } else {
        return 'default';
      }
    } else {
      return 'default';
    }
  }

  handlePonterLeaveImageMap() {
    if (this.initEditorMap) {
      if (this.isDrawing) {
        this.cancelDrawing();
      }
      if (this.handleIsPointerOnImage) {
        this.handleIsPointerOnImage(false);
      }
    }
  }

  handlePointerEnterImageMap() {
    this.setDragPanInteraction(true);
  }

  initializeEditorLayers(projection: Projection) {
    this.initializeImageLayer(projection);
    this.initializeTextLayer();
    this.initializeTableLayers();
    this.initializeCheckboxLayers();
    this.initializeLabelLayer();
    this.initializeDrawnRegionLabelLayer();
    this.initializeDrawnRegionLayer();
    return [
      this.imageLayer,
      this.textVectorLayer,
      this.tableBorderVectorLayer,
      this.tableIconBorderVectorLayer,
      this.tableIconVectorLayer,
      this.checkboxVectorLayer,
      this.drawRegionVectorLayer,
      this.labelVectorLayer,
      this.drawnLabelVectorLayer
    ];
  }

  initializePredictLayers(projection: Projection) {
    this.initializeImageLayer(projection);
    this.initializeTextLayer();
    this.initializeLabelLayer();
    return [this.imageLayer, this.textVectorLayer, this.labelVectorLayer];
  }

  initializeImageLayer(projection: Projection) {
    this.imageLayer = new ImageLayer({
      source: this.createImageSource(this.imageUri, projection, this.imageExtent),
      name: this.IMAGE_LAYER_NAME
    } as any);
  }

  initializeTextLayer() {
    const textOptions: any = {};
    textOptions.name = this.TEXT_VECTOR_LAYER_NAME;
    textOptions.style = this.featureStyler;
    textOptions.source = new VectorSource();
    this.textVectorLayer = new VectorLayer(textOptions);
  }

  initializeTableLayers() {
    const tableBorderOptions: any = {};
    tableBorderOptions.name = this.TABLE_BORDER_VECTOR_LAYER_NAME;
    tableBorderOptions.style = this.tableBorderFeatureStyler;
    tableBorderOptions.source = new VectorSource();
    this.tableBorderVectorLayer = new VectorLayer(tableBorderOptions);

    const tableIconOptions: any = {};
    tableIconOptions.name = this.TABLE_ICON_VECTOR_LAYER_NAME;
    tableIconOptions.style = this.tableIconFeatureStyler;
    tableIconOptions.updateWhileAnimating = true;
    tableIconOptions.updateWhileInteracting = true;
    tableIconOptions.source = new VectorSource();
    this.tableIconVectorLayer = new VectorLayer(tableIconOptions);

    const tableIconBorderOptions: any = {};
    tableIconBorderOptions.name = this.TABLE_ICON_BORDER_VECTOR_LAYER_NAME;
    tableIconBorderOptions.style = this.tableIconBorderFeatureStyler;
    tableIconBorderOptions.source = new VectorSource();
    this.tableIconBorderVectorLayer = new VectorLayer(tableIconBorderOptions);
  }

  initializeCheckboxLayers() {
    const checkboxOptions: any = {};
    checkboxOptions.name = this.CHECKBOX_VECTOR_LAYER_NAME;
    checkboxOptions.style = this.checkboxFeatureStyler;
    checkboxOptions.source = new VectorSource();
    this.checkboxVectorLayer = new VectorLayer(checkboxOptions);
  }

  initializeDrawnRegionLayer() {
    const drawnRegionOptions: any = {};
    drawnRegionOptions.name = this.DRAWN_REGION_VECTOR_LAYER_NAME;
    drawnRegionOptions.style = this.drawnRegionStyler;
    drawnRegionOptions.source = new VectorSource();

    drawnRegionOptions.source.on('addfeature', (evt: { feature: any }) => {
      this.pushToDrawnFeatures(evt.feature);
    });

    drawnRegionOptions.source.on('removefeature', (evt: { feature: any }) => {
      this.removeFromDrawnFeatures(evt.feature);
    });

    this.drawRegionVectorLayer = new VectorLayer(drawnRegionOptions);
  }

  initializeLabelLayer() {
    const labelOptions: any = {};
    labelOptions.name = this.LABEL_VECTOR_LAYER_NAME;
    labelOptions.style = this.labelFeatureStyler;
    labelOptions.source = new VectorSource();
    this.labelVectorLayer = new VectorLayer(labelOptions);
  }

  initializeDrawnRegionLabelLayer() {
    const drawnRegionLabelOptions: any = {};
    drawnRegionLabelOptions.name = this.DRAWN_REGION_VECTOR_LAYER_NAME;
    drawnRegionLabelOptions.style = this.labelFeatureStyler;
    drawnRegionLabelOptions.source = new VectorSource();

    drawnRegionLabelOptions.source.on('addfeature', (evt: { feature: any }) => {
      if (this.drawnLabelVectorLayer.getVisible()) {
        this.pushToDrawnFeatures(evt.feature);
      }
    });

    drawnRegionLabelOptions.source.on('removefeature', (evt: { feature: any }) => {
      this.removeFromDrawnFeatures(evt.feature);
    });

    this.drawnLabelVectorLayer = new VectorLayer(drawnRegionLabelOptions);
  }

  initializeMap(projection: Projection, layers: (VectorLayer | ImageLayer)[]) {
    this.map = new Map({
      controls: [],
      interactions: defaultInteractions({
        shiftDragZoom: false,
        doubleClickZoom: false,
        pinchRotate: false
      }),
      target: 'map',
      layers,
      view: this.createMapView(projection, this.imageExtent)
    });
  }
}
