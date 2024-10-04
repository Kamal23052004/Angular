import {
  Accordion,
  AccordionActionSettings,
  AccordionAnimationSettings,
  AccordionItem,
  ActionSettings,
  AppBar,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbOverflowMode,
  Carousel,
  CarouselItem,
  CarouselSwipeMode,
  ContextMenu,
  FieldSettings,
  FieldsSettings,
  HScroll,
  Header,
  Item,
  Menu,
  MenuAnimationSettings,
  MenuItem,
  NodeAnimationSettings,
  Sidebar,
  Step,
  StepLabelPosition,
  StepStatus,
  StepType,
  Stepper,
  StepperAnimationSettings,
  StepperBase,
  StepperOrientation,
  Tab,
  TabActionSettings,
  TabAnimationSettings,
  TabItem,
  Toolbar,
  TreeView,
  VScroll,
  addScrolling,
  destroyScroll
} from "./chunk-35BNGUR5.js";
import "./chunk-SSAM3KVE.js";
import "./chunk-N5UY6QDA.js";
import "./chunk-AS5YIVX4.js";
import "./chunk-2M5HFFVS.js";
import {
  ArrayBase,
  ComplexBase,
  ComponentBase,
  ComponentMixins,
  Template,
  setValue
} from "./chunk-2S3DOBG7.js";
import "./chunk-HEJJC6ZW.js";
import {
  CommonModule
} from "./chunk-ZNKC5GL5.js";
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  Injector,
  NgModule,
  Renderer2,
  ViewContainerRef,
  __decorate,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh
} from "./chunk-RXOX46UK.js";
import "./chunk-J4B6MK7R.js";

// node_modules/@syncfusion/ej2-angular-navigations/fesm2020/syncfusion-ej2-angular-navigations.mjs
var _c0 = ["header"];
var _c1 = ["content"];
var _c2 = ["headerTemplate"];
var _c3 = ["itemTemplate"];
var _c4 = [[["div"]]];
var _c5 = ["div"];
var _c6 = ["template"];
var _c7 = ["separatorTemplate"];
var _c8 = ["indicatorsTemplate"];
var _c9 = ["nextButtonTemplate"];
var _c10 = ["previousButtonTemplate"];
var _c11 = ["playButtonTemplate"];
var _c12 = ["headerText"];
var _c13 = ["nodeTemplate"];
var _c14 = ["*"];
var _c15 = ["tooltipTemplate"];
var _c16 = [[["nav"]]];
var _c17 = ["nav"];
var input$6 = ["content", "cssClass", "disabled", "expanded", "header", "iconCss", "id", "visible"];
var outputs$h = [];
var AccordionItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$h);
    this.directivePropList = input$6;
  }
};
AccordionItemDirective.ɵfac = function AccordionItemDirective_Factory(t) {
  return new (t || AccordionItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
AccordionItemDirective.ɵdir = ɵɵdefineDirective({
  type: AccordionItemDirective,
  selectors: [["e-accordionitem"]],
  contentQueries: function AccordionItemDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c0, 5);
      ɵɵcontentQuery(dirIndex, _c1, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
    }
  },
  inputs: {
    content: "content",
    cssClass: "cssClass",
    disabled: "disabled",
    expanded: "expanded",
    header: "header",
    iconCss: "iconCss",
    id: "id",
    visible: "visible"
  },
  features: [ɵɵInheritDefinitionFeature]
});
__decorate([Template()], AccordionItemDirective.prototype, "header", void 0);
__decorate([Template()], AccordionItemDirective.prototype, "content", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionItemDirective, [{
    type: Directive,
    args: [{
      selector: "e-accordionitems>e-accordionitem",
      inputs: input$6,
      outputs: outputs$h,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, {
    header: [{
      type: ContentChild,
      args: ["header"]
    }],
    content: [{
      type: ContentChild,
      args: ["content"]
    }]
  });
})();
var AccordionItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
AccordionItemsDirective.ɵfac = function AccordionItemsDirective_Factory(t) {
  return new (t || AccordionItemsDirective)();
};
AccordionItemsDirective.ɵdir = ɵɵdefineDirective({
  type: AccordionItemsDirective,
  selectors: [["e-accordionitems"]],
  contentQueries: function AccordionItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, AccordionItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionItemsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-accordion>e-accordionitems",
      queries: {
        children: new ContentChildren(AccordionItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$a = ["animation", "dataSource", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "expandMode", "expandedIndices", "headerTemplate", "height", "itemTemplate", "items", "locale", "width"];
var outputs$g = ["clicked", "created", "destroyed", "expanded", "expanding", "expandedIndicesChange"];
var twoWays$a = ["expandedIndices"];
var AccordionComponent = class AccordionComponent2 extends Accordion {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$g);
    this.addTwoWay.call(this, twoWays$a);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childItems;
    this.containerContext.ngAfterContentChecked(this);
  }
};
AccordionComponent.ɵfac = function AccordionComponent_Factory(t) {
  return new (t || AccordionComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
AccordionComponent.ɵcmp = ɵɵdefineComponent({
  type: AccordionComponent,
  selectors: [["ejs-accordion"]],
  contentQueries: function AccordionComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c2, 5);
      ɵɵcontentQuery(dirIndex, _c3, 5);
      ɵɵcontentQuery(dirIndex, AccordionItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    animation: "animation",
    dataSource: "dataSource",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    expandMode: "expandMode",
    expandedIndices: "expandedIndices",
    headerTemplate: "headerTemplate",
    height: "height",
    itemTemplate: "itemTemplate",
    items: "items",
    locale: "locale",
    width: "width"
  },
  outputs: {
    clicked: "clicked",
    created: "created",
    destroyed: "destroyed",
    expanded: "expanded",
    expanding: "expanding",
    expandedIndicesChange: "expandedIndicesChange"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c5,
  decls: 1,
  vars: 0,
  template: function AccordionComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c4);
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], AccordionComponent.prototype, "headerTemplate", void 0);
__decorate([Template()], AccordionComponent.prototype, "itemTemplate", void 0);
AccordionComponent = __decorate([ComponentMixins([ComponentBase])], AccordionComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionComponent, [{
    type: Component,
    args: [{
      selector: "ejs-accordion",
      inputs: inputs$a,
      outputs: outputs$g,
      template: `<ng-content select='div'></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(AccordionItemsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, {
    headerTemplate: [{
      type: ContentChild,
      args: ["headerTemplate"]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["itemTemplate"]
    }]
  });
})();
var AccordionModule = class {
};
AccordionModule.ɵfac = function AccordionModule_Factory(t) {
  return new (t || AccordionModule)();
};
AccordionModule.ɵmod = ɵɵdefineNgModule({
  type: AccordionModule,
  declarations: [AccordionComponent, AccordionItemDirective, AccordionItemsDirective],
  imports: [CommonModule],
  exports: [AccordionComponent, AccordionItemDirective, AccordionItemsDirective]
});
AccordionModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [AccordionComponent, AccordionItemDirective, AccordionItemsDirective],
      exports: [AccordionComponent, AccordionItemDirective, AccordionItemsDirective]
    }]
  }], null, null);
})();
var AccordionAllModule = class {
};
AccordionAllModule.ɵfac = function AccordionAllModule_Factory(t) {
  return new (t || AccordionAllModule)();
};
AccordionAllModule.ɵmod = ɵɵdefineNgModule({
  type: AccordionAllModule,
  imports: [CommonModule, AccordionModule],
  exports: [AccordionModule]
});
AccordionAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, AccordionModule], AccordionModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AccordionAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, AccordionModule],
      exports: [AccordionModule],
      providers: []
    }]
  }], null, null);
})();
var input$5 = ["align", "cssClass", "disabled", "htmlAttributes", "id", "overflow", "prefixIcon", "showAlwaysInPopup", "showTextOn", "suffixIcon", "tabIndex", "template", "text", "tooltipText", "type", "visible", "width"];
var outputs$f = ["click"];
var ItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$f);
    this.directivePropList = input$5;
  }
};
ItemDirective.ɵfac = function ItemDirective_Factory(t) {
  return new (t || ItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
ItemDirective.ɵdir = ɵɵdefineDirective({
  type: ItemDirective,
  selectors: [["e-item"]],
  contentQueries: function ItemDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c6, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    align: "align",
    cssClass: "cssClass",
    disabled: "disabled",
    htmlAttributes: "htmlAttributes",
    id: "id",
    overflow: "overflow",
    prefixIcon: "prefixIcon",
    showAlwaysInPopup: "showAlwaysInPopup",
    showTextOn: "showTextOn",
    suffixIcon: "suffixIcon",
    tabIndex: "tabIndex",
    template: "template",
    text: "text",
    tooltipText: "tooltipText",
    type: "type",
    visible: "visible",
    width: "width"
  },
  outputs: {
    click: "click"
  },
  features: [ɵɵInheritDefinitionFeature]
});
__decorate([Template()], ItemDirective.prototype, "template", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemDirective, [{
    type: Directive,
    args: [{
      selector: "e-items>e-item",
      inputs: input$5,
      outputs: outputs$f,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, {
    template: [{
      type: ContentChild,
      args: ["template"]
    }]
  });
})();
var ItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
ItemsDirective.ɵfac = function ItemsDirective_Factory(t) {
  return new (t || ItemsDirective)();
};
ItemsDirective.ɵdir = ɵɵdefineDirective({
  type: ItemsDirective,
  selectors: [["e-items"]],
  contentQueries: function ItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, ItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ItemsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-toolbar>e-items",
      queries: {
        children: new ContentChildren(ItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$9 = ["allowKeyboard", "cssClass", "enableCollision", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "height", "items", "locale", "overflowMode", "scrollStep", "width"];
var outputs$e = ["beforeCreate", "clicked", "created", "destroyed"];
var twoWays$9 = [""];
var ToolbarComponent = class ToolbarComponent2 extends Toolbar {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$e);
    this.addTwoWay.call(this, twoWays$9);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childItems;
    this.containerContext.ngAfterContentChecked(this);
  }
};
ToolbarComponent.ɵfac = function ToolbarComponent_Factory(t) {
  return new (t || ToolbarComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
ToolbarComponent.ɵcmp = ɵɵdefineComponent({
  type: ToolbarComponent,
  selectors: [["ejs-toolbar"]],
  contentQueries: function ToolbarComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, ItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    allowKeyboard: "allowKeyboard",
    cssClass: "cssClass",
    enableCollision: "enableCollision",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    height: "height",
    items: "items",
    locale: "locale",
    overflowMode: "overflowMode",
    scrollStep: "scrollStep",
    width: "width"
  },
  outputs: {
    beforeCreate: "beforeCreate",
    clicked: "clicked",
    created: "created",
    destroyed: "destroyed"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c5,
  decls: 1,
  vars: 0,
  template: function ToolbarComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c4);
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
ToolbarComponent = __decorate([ComponentMixins([ComponentBase])], ToolbarComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToolbarComponent, [{
    type: Component,
    args: [{
      selector: "ejs-toolbar",
      inputs: inputs$9,
      outputs: outputs$e,
      template: `<ng-content select='div'></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(ItemsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var ToolbarModule = class {
};
ToolbarModule.ɵfac = function ToolbarModule_Factory(t) {
  return new (t || ToolbarModule)();
};
ToolbarModule.ɵmod = ɵɵdefineNgModule({
  type: ToolbarModule,
  declarations: [ToolbarComponent, ItemDirective, ItemsDirective],
  imports: [CommonModule],
  exports: [ToolbarComponent, ItemDirective, ItemsDirective]
});
ToolbarModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToolbarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [ToolbarComponent, ItemDirective, ItemsDirective],
      exports: [ToolbarComponent, ItemDirective, ItemsDirective]
    }]
  }], null, null);
})();
var ToolbarAllModule = class {
};
ToolbarAllModule.ɵfac = function ToolbarAllModule_Factory(t) {
  return new (t || ToolbarAllModule)();
};
ToolbarAllModule.ɵmod = ɵɵdefineNgModule({
  type: ToolbarAllModule,
  imports: [CommonModule, ToolbarModule],
  exports: [ToolbarModule]
});
ToolbarAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, ToolbarModule], ToolbarModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ToolbarAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ToolbarModule],
      exports: [ToolbarModule],
      providers: []
    }]
  }], null, null);
})();
var inputs$8 = ["animationSettings", "cssClass", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "enableScrolling", "fields", "filter", "hoverDelay", "items", "locale", "showItemOnClick", "target", "template"];
var outputs$d = ["beforeClose", "beforeItemRender", "beforeOpen", "created", "onClose", "onOpen", "select"];
var twoWays$8 = [""];
var ContextMenuComponent = class ContextMenuComponent2 extends ContextMenu {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$d);
    this.addTwoWay.call(this, twoWays$8);
    setValue("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.context.ngAfterContentChecked(this);
  }
};
ContextMenuComponent.ɵfac = function ContextMenuComponent_Factory(t) {
  return new (t || ContextMenuComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
ContextMenuComponent.ɵcmp = ɵɵdefineComponent({
  type: ContextMenuComponent,
  selectors: [["ejs-contextmenu"]],
  inputs: {
    animationSettings: "animationSettings",
    cssClass: "cssClass",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enableScrolling: "enableScrolling",
    fields: "fields",
    filter: "filter",
    hoverDelay: "hoverDelay",
    items: "items",
    locale: "locale",
    showItemOnClick: "showItemOnClick",
    target: "target",
    template: "template"
  },
  outputs: {
    beforeClose: "beforeClose",
    beforeItemRender: "beforeItemRender",
    beforeOpen: "beforeOpen",
    created: "created",
    onClose: "onClose",
    onOpen: "onOpen",
    select: "select"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function ContextMenuComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
ContextMenuComponent = __decorate([ComponentMixins([ComponentBase])], ContextMenuComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuComponent, [{
    type: Component,
    args: [{
      selector: "ejs-contextmenu",
      inputs: inputs$8,
      outputs: outputs$d,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var ContextMenuModule = class {
};
ContextMenuModule.ɵfac = function ContextMenuModule_Factory(t) {
  return new (t || ContextMenuModule)();
};
ContextMenuModule.ɵmod = ɵɵdefineNgModule({
  type: ContextMenuModule,
  declarations: [ContextMenuComponent],
  imports: [CommonModule],
  exports: [ContextMenuComponent]
});
ContextMenuModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [ContextMenuComponent],
      exports: [ContextMenuComponent]
    }]
  }], null, null);
})();
var ContextMenuAllModule = class {
};
ContextMenuAllModule.ɵfac = function ContextMenuAllModule_Factory(t) {
  return new (t || ContextMenuAllModule)();
};
ContextMenuAllModule.ɵmod = ɵɵdefineNgModule({
  type: ContextMenuAllModule,
  imports: [CommonModule, ContextMenuModule],
  exports: [ContextMenuModule]
});
ContextMenuAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, ContextMenuModule], ContextMenuModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContextMenuAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ContextMenuModule],
      exports: [ContextMenuModule],
      providers: []
    }]
  }], null, null);
})();
var input$4 = ["disabled", "iconCss", "id", "text", "url"];
var outputs$c = [];
var BreadcrumbItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$c);
    this.directivePropList = input$4;
  }
};
BreadcrumbItemDirective.ɵfac = function BreadcrumbItemDirective_Factory(t) {
  return new (t || BreadcrumbItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
BreadcrumbItemDirective.ɵdir = ɵɵdefineDirective({
  type: BreadcrumbItemDirective,
  selectors: [["e-breadcrumb-item"]],
  inputs: {
    disabled: "disabled",
    iconCss: "iconCss",
    id: "id",
    text: "text",
    url: "url"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbItemDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-breadcrumb>e-breadcrumb-items>e-breadcrumb-item",
      inputs: input$4,
      outputs: outputs$c,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var BreadcrumbItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
BreadcrumbItemsDirective.ɵfac = function BreadcrumbItemsDirective_Factory(t) {
  return new (t || BreadcrumbItemsDirective)();
};
BreadcrumbItemsDirective.ɵdir = ɵɵdefineDirective({
  type: BreadcrumbItemsDirective,
  selectors: [["e-breadcrumb-items"]],
  contentQueries: function BreadcrumbItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, BreadcrumbItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbItemsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-breadcrumb>e-breadcrumb-items",
      queries: {
        children: new ContentChildren(BreadcrumbItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$7 = ["activeItem", "cssClass", "disabled", "enableActiveItemNavigation", "enableNavigation", "enablePersistence", "enableRtl", "itemTemplate", "items", "locale", "maxItems", "overflowMode", "separatorTemplate", "url"];
var outputs$b = ["beforeItemRender", "created", "itemClick", "activeItemChange"];
var twoWays$7 = ["activeItem"];
var BreadcrumbComponent = class BreadcrumbComponent2 extends Breadcrumb {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$b);
    this.addTwoWay.call(this, twoWays$7);
    setValue("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childItems;
    this.context.ngAfterContentChecked(this);
  }
};
BreadcrumbComponent.ɵfac = function BreadcrumbComponent_Factory(t) {
  return new (t || BreadcrumbComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
BreadcrumbComponent.ɵcmp = ɵɵdefineComponent({
  type: BreadcrumbComponent,
  selectors: [["ejs-breadcrumb"]],
  contentQueries: function BreadcrumbComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c7, 5);
      ɵɵcontentQuery(dirIndex, _c3, 5);
      ɵɵcontentQuery(dirIndex, BreadcrumbItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.separatorTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    activeItem: "activeItem",
    cssClass: "cssClass",
    disabled: "disabled",
    enableActiveItemNavigation: "enableActiveItemNavigation",
    enableNavigation: "enableNavigation",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    itemTemplate: "itemTemplate",
    items: "items",
    locale: "locale",
    maxItems: "maxItems",
    overflowMode: "overflowMode",
    separatorTemplate: "separatorTemplate",
    url: "url"
  },
  outputs: {
    beforeItemRender: "beforeItemRender",
    created: "created",
    itemClick: "itemClick",
    activeItemChange: "activeItemChange"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function BreadcrumbComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], BreadcrumbComponent.prototype, "separatorTemplate", void 0);
__decorate([Template()], BreadcrumbComponent.prototype, "itemTemplate", void 0);
BreadcrumbComponent = __decorate([ComponentMixins([ComponentBase])], BreadcrumbComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbComponent, [{
    type: Component,
    args: [{
      selector: "ejs-breadcrumb",
      inputs: inputs$7,
      outputs: outputs$b,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(BreadcrumbItemsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, {
    separatorTemplate: [{
      type: ContentChild,
      args: ["separatorTemplate"]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["itemTemplate"]
    }]
  });
})();
var BreadcrumbModule = class {
};
BreadcrumbModule.ɵfac = function BreadcrumbModule_Factory(t) {
  return new (t || BreadcrumbModule)();
};
BreadcrumbModule.ɵmod = ɵɵdefineNgModule({
  type: BreadcrumbModule,
  declarations: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective],
  imports: [CommonModule],
  exports: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective]
});
BreadcrumbModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective],
      exports: [BreadcrumbComponent, BreadcrumbItemDirective, BreadcrumbItemsDirective]
    }]
  }], null, null);
})();
var BreadcrumbAllModule = class {
};
BreadcrumbAllModule.ɵfac = function BreadcrumbAllModule_Factory(t) {
  return new (t || BreadcrumbAllModule)();
};
BreadcrumbAllModule.ɵmod = ɵɵdefineNgModule({
  type: BreadcrumbAllModule,
  imports: [CommonModule, BreadcrumbModule],
  exports: [BreadcrumbModule]
});
BreadcrumbAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, BreadcrumbModule], BreadcrumbModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BreadcrumbAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, BreadcrumbModule],
      exports: [BreadcrumbModule],
      providers: []
    }]
  }], null, null);
})();
var input$3 = ["cssClass", "htmlAttributes", "interval", "template"];
var outputs$a = [];
var CarouselItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$a);
    this.directivePropList = input$3;
  }
};
CarouselItemDirective.ɵfac = function CarouselItemDirective_Factory(t) {
  return new (t || CarouselItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
CarouselItemDirective.ɵdir = ɵɵdefineDirective({
  type: CarouselItemDirective,
  selectors: [["e-carousel-item"]],
  contentQueries: function CarouselItemDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c6, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
    }
  },
  inputs: {
    cssClass: "cssClass",
    htmlAttributes: "htmlAttributes",
    interval: "interval",
    template: "template"
  },
  features: [ɵɵInheritDefinitionFeature]
});
__decorate([Template()], CarouselItemDirective.prototype, "template", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselItemDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-carousel>e-carousel-items>e-carousel-item",
      inputs: input$3,
      outputs: outputs$a,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, {
    template: [{
      type: ContentChild,
      args: ["template"]
    }]
  });
})();
var CarouselItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
CarouselItemsDirective.ɵfac = function CarouselItemsDirective_Factory(t) {
  return new (t || CarouselItemsDirective)();
};
CarouselItemsDirective.ɵdir = ɵɵdefineDirective({
  type: CarouselItemsDirective,
  selectors: [["e-carousel-items"]],
  contentQueries: function CarouselItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, CarouselItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselItemsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-carousel>e-carousel-items",
      queries: {
        children: new ContentChildren(CarouselItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$6 = ["animationEffect", "autoPlay", "buttonsVisibility", "cssClass", "dataSource", "enablePersistence", "enableRtl", "enableTouchSwipe", "height", "htmlAttributes", "indicatorsTemplate", "indicatorsType", "interval", "itemTemplate", "items", "locale", "loop", "nextButtonTemplate", "partialVisible", "pauseOnHover", "playButtonTemplate", "previousButtonTemplate", "selectedIndex", "showIndicators", "showPlayButton", "swipeMode", "width"];
var outputs$9 = ["slideChanged", "slideChanging", "selectedIndexChange"];
var twoWays$6 = ["selectedIndex"];
var CarouselComponent = class CarouselComponent2 extends Carousel {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$9);
    this.addTwoWay.call(this, twoWays$6);
    setValue("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childItems;
    this.context.ngAfterContentChecked(this);
  }
};
CarouselComponent.ɵfac = function CarouselComponent_Factory(t) {
  return new (t || CarouselComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
CarouselComponent.ɵcmp = ɵɵdefineComponent({
  type: CarouselComponent,
  selectors: [["ejs-carousel"]],
  contentQueries: function CarouselComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c8, 5);
      ɵɵcontentQuery(dirIndex, _c9, 5);
      ɵɵcontentQuery(dirIndex, _c10, 5);
      ɵɵcontentQuery(dirIndex, _c11, 5);
      ɵɵcontentQuery(dirIndex, _c3, 5);
      ɵɵcontentQuery(dirIndex, CarouselItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.indicatorsTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nextButtonTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.previousButtonTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.playButtonTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.itemTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    animationEffect: "animationEffect",
    autoPlay: "autoPlay",
    buttonsVisibility: "buttonsVisibility",
    cssClass: "cssClass",
    dataSource: "dataSource",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enableTouchSwipe: "enableTouchSwipe",
    height: "height",
    htmlAttributes: "htmlAttributes",
    indicatorsTemplate: "indicatorsTemplate",
    indicatorsType: "indicatorsType",
    interval: "interval",
    itemTemplate: "itemTemplate",
    items: "items",
    locale: "locale",
    loop: "loop",
    nextButtonTemplate: "nextButtonTemplate",
    partialVisible: "partialVisible",
    pauseOnHover: "pauseOnHover",
    playButtonTemplate: "playButtonTemplate",
    previousButtonTemplate: "previousButtonTemplate",
    selectedIndex: "selectedIndex",
    showIndicators: "showIndicators",
    showPlayButton: "showPlayButton",
    swipeMode: "swipeMode",
    width: "width"
  },
  outputs: {
    slideChanged: "slideChanged",
    slideChanging: "slideChanging",
    selectedIndexChange: "selectedIndexChange"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function CarouselComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], CarouselComponent.prototype, "indicatorsTemplate", void 0);
__decorate([Template()], CarouselComponent.prototype, "nextButtonTemplate", void 0);
__decorate([Template()], CarouselComponent.prototype, "previousButtonTemplate", void 0);
__decorate([Template()], CarouselComponent.prototype, "playButtonTemplate", void 0);
__decorate([Template()], CarouselComponent.prototype, "itemTemplate", void 0);
CarouselComponent = __decorate([ComponentMixins([ComponentBase])], CarouselComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselComponent, [{
    type: Component,
    args: [{
      selector: "ejs-carousel",
      inputs: inputs$6,
      outputs: outputs$9,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(CarouselItemsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, {
    indicatorsTemplate: [{
      type: ContentChild,
      args: ["indicatorsTemplate"]
    }],
    nextButtonTemplate: [{
      type: ContentChild,
      args: ["nextButtonTemplate"]
    }],
    previousButtonTemplate: [{
      type: ContentChild,
      args: ["previousButtonTemplate"]
    }],
    playButtonTemplate: [{
      type: ContentChild,
      args: ["playButtonTemplate"]
    }],
    itemTemplate: [{
      type: ContentChild,
      args: ["itemTemplate"]
    }]
  });
})();
var CarouselModule = class {
};
CarouselModule.ɵfac = function CarouselModule_Factory(t) {
  return new (t || CarouselModule)();
};
CarouselModule.ɵmod = ɵɵdefineNgModule({
  type: CarouselModule,
  declarations: [CarouselComponent, CarouselItemDirective, CarouselItemsDirective],
  imports: [CommonModule],
  exports: [CarouselComponent, CarouselItemDirective, CarouselItemsDirective]
});
CarouselModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [CarouselComponent, CarouselItemDirective, CarouselItemsDirective],
      exports: [CarouselComponent, CarouselItemDirective, CarouselItemsDirective]
    }]
  }], null, null);
})();
var CarouselAllModule = class {
};
CarouselAllModule.ɵfac = function CarouselAllModule_Factory(t) {
  return new (t || CarouselAllModule)();
};
CarouselAllModule.ɵmod = ɵɵdefineNgModule({
  type: CarouselAllModule,
  imports: [CommonModule, CarouselModule],
  exports: [CarouselModule]
});
CarouselAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, CarouselModule], CarouselModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CarouselAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, CarouselModule],
      exports: [CarouselModule],
      providers: []
    }]
  }], null, null);
})();
var input$2 = ["content", "cssClass", "disabled", "header", "headerTemplate", "id", "tabIndex", "visible"];
var outputs$8 = [];
var TabItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$8);
    this.directivePropList = input$2;
  }
};
TabItemDirective.ɵfac = function TabItemDirective_Factory(t) {
  return new (t || TabItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
TabItemDirective.ɵdir = ɵɵdefineDirective({
  type: TabItemDirective,
  selectors: [["e-tabitem"]],
  contentQueries: function TabItemDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c1, 5);
      ɵɵcontentQuery(dirIndex, _c12, 5);
      ɵɵcontentQuery(dirIndex, _c2, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.content = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.header_text = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.headerTemplate = _t.first);
    }
  },
  inputs: {
    content: "content",
    cssClass: "cssClass",
    disabled: "disabled",
    header: "header",
    headerTemplate: "headerTemplate",
    id: "id",
    tabIndex: "tabIndex",
    visible: "visible"
  },
  features: [ɵɵInheritDefinitionFeature]
});
__decorate([Template()], TabItemDirective.prototype, "content", void 0);
__decorate([Template()], TabItemDirective.prototype, "header_text", void 0);
__decorate([Template()], TabItemDirective.prototype, "headerTemplate", void 0);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabItemDirective, [{
    type: Directive,
    args: [{
      selector: "e-tabitems>e-tabitem",
      inputs: input$2,
      outputs: outputs$8,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, {
    content: [{
      type: ContentChild,
      args: ["content"]
    }],
    header_text: [{
      type: ContentChild,
      args: ["headerText"]
    }],
    headerTemplate: [{
      type: ContentChild,
      args: ["headerTemplate"]
    }]
  });
})();
var TabItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
TabItemsDirective.ɵfac = function TabItemsDirective_Factory(t) {
  return new (t || TabItemsDirective)();
};
TabItemsDirective.ɵdir = ɵɵdefineDirective({
  type: TabItemsDirective,
  selectors: [["e-tabitems"]],
  contentQueries: function TabItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, TabItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabItemsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-tab>e-tabitems",
      queries: {
        children: new ContentChildren(TabItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$5 = ["allowDragAndDrop", "animation", "clearTemplates", "cssClass", "dragArea", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "headerPlacement", "height", "heightAdjustMode", "items", "loadOn", "locale", "overflowMode", "reorderActiveTab", "scrollStep", "selectedItem", "showCloseButton", "width"];
var outputs$7 = ["added", "adding", "created", "destroyed", "dragged", "dragging", "onDragStart", "removed", "removing", "selected", "selecting"];
var twoWays$5 = [""];
var TabComponent = class TabComponent2 extends Tab {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$7);
    this.addTwoWay.call(this, twoWays$5);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childItems;
    this.containerContext.ngAfterContentChecked(this);
  }
};
TabComponent.ɵfac = function TabComponent_Factory(t) {
  return new (t || TabComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
TabComponent.ɵcmp = ɵɵdefineComponent({
  type: TabComponent,
  selectors: [["ejs-tab"]],
  contentQueries: function TabComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, TabItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    allowDragAndDrop: "allowDragAndDrop",
    animation: "animation",
    clearTemplates: "clearTemplates",
    cssClass: "cssClass",
    dragArea: "dragArea",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    headerPlacement: "headerPlacement",
    height: "height",
    heightAdjustMode: "heightAdjustMode",
    items: "items",
    loadOn: "loadOn",
    locale: "locale",
    overflowMode: "overflowMode",
    reorderActiveTab: "reorderActiveTab",
    scrollStep: "scrollStep",
    selectedItem: "selectedItem",
    showCloseButton: "showCloseButton",
    width: "width"
  },
  outputs: {
    added: "added",
    adding: "adding",
    created: "created",
    destroyed: "destroyed",
    dragged: "dragged",
    dragging: "dragging",
    onDragStart: "onDragStart",
    removed: "removed",
    removing: "removing",
    selected: "selected",
    selecting: "selecting"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c5,
  decls: 1,
  vars: 0,
  template: function TabComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c4);
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
TabComponent = __decorate([ComponentMixins([ComponentBase])], TabComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabComponent, [{
    type: Component,
    args: [{
      selector: "ejs-tab",
      inputs: inputs$5,
      outputs: outputs$7,
      template: `<ng-content select='div'></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(TabItemsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var TabModule = class {
};
TabModule.ɵfac = function TabModule_Factory(t) {
  return new (t || TabModule)();
};
TabModule.ɵmod = ɵɵdefineNgModule({
  type: TabModule,
  declarations: [TabComponent, TabItemDirective, TabItemsDirective],
  imports: [CommonModule],
  exports: [TabComponent, TabItemDirective, TabItemsDirective]
});
TabModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [TabComponent, TabItemDirective, TabItemsDirective],
      exports: [TabComponent, TabItemDirective, TabItemsDirective]
    }]
  }], null, null);
})();
var TabAllModule = class {
};
TabAllModule.ɵfac = function TabAllModule_Factory(t) {
  return new (t || TabAllModule)();
};
TabAllModule.ɵmod = ɵɵdefineNgModule({
  type: TabAllModule,
  imports: [CommonModule, TabModule],
  exports: [TabModule]
});
TabAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, TabModule], TabModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TabAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, TabModule],
      exports: [TabModule],
      providers: []
    }]
  }], null, null);
})();
var inputs$4 = ["allowDragAndDrop", "allowEditing", "allowMultiSelection", "allowTextWrap", "animation", "autoCheck", "checkedNodes", "cssClass", "disabled", "dragArea", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "expandOn", "expandedNodes", "fields", "fullRowNavigable", "fullRowSelect", "loadOnDemand", "locale", "nodeTemplate", "selectedNodes", "showCheckBox", "sortOrder"];
var outputs$6 = ["actionFailure", "created", "dataBound", "dataSourceChanged", "destroyed", "drawNode", "keyPress", "nodeChecked", "nodeChecking", "nodeClicked", "nodeCollapsed", "nodeCollapsing", "nodeDragStart", "nodeDragStop", "nodeDragging", "nodeDropped", "nodeEdited", "nodeEditing", "nodeExpanded", "nodeExpanding", "nodeSelected", "nodeSelecting"];
var twoWays$4 = [""];
var TreeViewComponent = class TreeViewComponent2 extends TreeView {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$6);
    this.addTwoWay.call(this, twoWays$4);
    setValue("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.context.ngAfterContentChecked(this);
  }
};
TreeViewComponent.ɵfac = function TreeViewComponent_Factory(t) {
  return new (t || TreeViewComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
TreeViewComponent.ɵcmp = ɵɵdefineComponent({
  type: TreeViewComponent,
  selectors: [["ejs-treeview"]],
  contentQueries: function TreeViewComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c13, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.nodeTemplate = _t.first);
    }
  },
  inputs: {
    allowDragAndDrop: "allowDragAndDrop",
    allowEditing: "allowEditing",
    allowMultiSelection: "allowMultiSelection",
    allowTextWrap: "allowTextWrap",
    animation: "animation",
    autoCheck: "autoCheck",
    checkedNodes: "checkedNodes",
    cssClass: "cssClass",
    disabled: "disabled",
    dragArea: "dragArea",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    expandOn: "expandOn",
    expandedNodes: "expandedNodes",
    fields: "fields",
    fullRowNavigable: "fullRowNavigable",
    fullRowSelect: "fullRowSelect",
    loadOnDemand: "loadOnDemand",
    locale: "locale",
    nodeTemplate: "nodeTemplate",
    selectedNodes: "selectedNodes",
    showCheckBox: "showCheckBox",
    sortOrder: "sortOrder"
  },
  outputs: {
    actionFailure: "actionFailure",
    created: "created",
    dataBound: "dataBound",
    dataSourceChanged: "dataSourceChanged",
    destroyed: "destroyed",
    drawNode: "drawNode",
    keyPress: "keyPress",
    nodeChecked: "nodeChecked",
    nodeChecking: "nodeChecking",
    nodeClicked: "nodeClicked",
    nodeCollapsed: "nodeCollapsed",
    nodeCollapsing: "nodeCollapsing",
    nodeDragStart: "nodeDragStart",
    nodeDragStop: "nodeDragStop",
    nodeDragging: "nodeDragging",
    nodeDropped: "nodeDropped",
    nodeEdited: "nodeEdited",
    nodeEditing: "nodeEditing",
    nodeExpanded: "nodeExpanded",
    nodeExpanding: "nodeExpanding",
    nodeSelected: "nodeSelected",
    nodeSelecting: "nodeSelecting"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function TreeViewComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], TreeViewComponent.prototype, "nodeTemplate", void 0);
TreeViewComponent = __decorate([ComponentMixins([ComponentBase])], TreeViewComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeViewComponent, [{
    type: Component,
    args: [{
      selector: "ejs-treeview",
      inputs: inputs$4,
      outputs: outputs$6,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, {
    nodeTemplate: [{
      type: ContentChild,
      args: ["nodeTemplate"]
    }]
  });
})();
var TreeViewModule = class {
};
TreeViewModule.ɵfac = function TreeViewModule_Factory(t) {
  return new (t || TreeViewModule)();
};
TreeViewModule.ɵmod = ɵɵdefineNgModule({
  type: TreeViewModule,
  declarations: [TreeViewComponent],
  imports: [CommonModule],
  exports: [TreeViewComponent]
});
TreeViewModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeViewModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [TreeViewComponent],
      exports: [TreeViewComponent]
    }]
  }], null, null);
})();
var TreeViewAllModule = class {
};
TreeViewAllModule.ɵfac = function TreeViewAllModule_Factory(t) {
  return new (t || TreeViewAllModule)();
};
TreeViewAllModule.ɵmod = ɵɵdefineNgModule({
  type: TreeViewAllModule,
  imports: [CommonModule, TreeViewModule],
  exports: [TreeViewModule]
});
TreeViewAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, TreeViewModule], TreeViewModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TreeViewAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, TreeViewModule],
      exports: [TreeViewModule],
      providers: []
    }]
  }], null, null);
})();
var inputs$3 = ["animate", "closeOnDocumentClick", "dockSize", "enableDock", "enableGestures", "enablePersistence", "enableRtl", "height", "isOpen", "locale", "mediaQuery", "position", "showBackdrop", "target", "type", "width", "zIndex"];
var outputs$5 = ["change", "close", "created", "destroyed", "open", "isOpenChange"];
var twoWays$3 = ["isOpen"];
var SidebarComponent = class SidebarComponent2 extends Sidebar {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$5);
    this.addTwoWay.call(this, twoWays$3);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.containerContext.ngAfterContentChecked(this);
  }
};
SidebarComponent.ɵfac = function SidebarComponent_Factory(t) {
  return new (t || SidebarComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
SidebarComponent.ɵcmp = ɵɵdefineComponent({
  type: SidebarComponent,
  selectors: [["ejs-sidebar"]],
  inputs: {
    animate: "animate",
    closeOnDocumentClick: "closeOnDocumentClick",
    dockSize: "dockSize",
    enableDock: "enableDock",
    enableGestures: "enableGestures",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    height: "height",
    isOpen: "isOpen",
    locale: "locale",
    mediaQuery: "mediaQuery",
    position: "position",
    showBackdrop: "showBackdrop",
    target: "target",
    type: "type",
    width: "width",
    zIndex: "zIndex"
  },
  outputs: {
    change: "change",
    close: "close",
    created: "created",
    destroyed: "destroyed",
    open: "open",
    isOpenChange: "isOpenChange"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c14,
  decls: 1,
  vars: 0,
  template: function SidebarComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
SidebarComponent = __decorate([ComponentMixins([ComponentBase])], SidebarComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarComponent, [{
    type: Component,
    args: [{
      selector: "ejs-sidebar",
      inputs: inputs$3,
      outputs: outputs$5,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var SidebarModule = class {
};
SidebarModule.ɵfac = function SidebarModule_Factory(t) {
  return new (t || SidebarModule)();
};
SidebarModule.ɵmod = ɵɵdefineNgModule({
  type: SidebarModule,
  declarations: [SidebarComponent],
  imports: [CommonModule],
  exports: [SidebarComponent]
});
SidebarModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SidebarComponent],
      exports: [SidebarComponent]
    }]
  }], null, null);
})();
var SidebarAllModule = class {
};
SidebarAllModule.ɵfac = function SidebarAllModule_Factory(t) {
  return new (t || SidebarAllModule)();
};
SidebarAllModule.ɵmod = ɵɵdefineNgModule({
  type: SidebarAllModule,
  imports: [CommonModule, SidebarModule],
  exports: [SidebarModule]
});
SidebarAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, SidebarModule], SidebarModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SidebarAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SidebarModule],
      exports: [SidebarModule],
      providers: []
    }]
  }], null, null);
})();
var input$1 = ["iconCss", "id", "items", "separator", "text", "url"];
var outputs$4 = [];
var MenuItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$4);
    this.directivePropList = input$1;
  }
};
MenuItemDirective.ɵfac = function MenuItemDirective_Factory(t) {
  return new (t || MenuItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
MenuItemDirective.ɵdir = ɵɵdefineDirective({
  type: MenuItemDirective,
  selectors: [["e-menu-item"]],
  inputs: {
    iconCss: "iconCss",
    id: "id",
    items: "items",
    separator: "separator",
    text: "text",
    url: "url"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuItemDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-menu>e-menu-items>e-menu-item>",
      inputs: input$1,
      outputs: outputs$4,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var MenuItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
MenuItemsDirective.ɵfac = function MenuItemsDirective_Factory(t) {
  return new (t || MenuItemsDirective)();
};
MenuItemsDirective.ɵdir = ɵɵdefineDirective({
  type: MenuItemsDirective,
  selectors: [["e-menu-items"]],
  contentQueries: function MenuItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, MenuItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuItemsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-menu>e-menu-items",
      queries: {
        children: new ContentChildren(MenuItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$2 = ["animationSettings", "cssClass", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "enableScrolling", "fields", "filter", "hamburgerMode", "hoverDelay", "items", "locale", "orientation", "showItemOnClick", "target", "template", "title"];
var outputs$3 = ["beforeClose", "beforeItemRender", "beforeOpen", "created", "onClose", "onOpen", "select"];
var twoWays$2 = [""];
var MenuComponent = class MenuComponent2 extends Menu {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$3);
    this.addTwoWay.call(this, twoWays$2);
    setValue("currentInstance", this, this.viewContainerRef);
    this.context = new ComponentBase();
  }
  ngOnInit() {
    this.context.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.context.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.context.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childItems;
    this.context.ngAfterContentChecked(this);
  }
};
MenuComponent.ɵfac = function MenuComponent_Factory(t) {
  return new (t || MenuComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
MenuComponent.ɵcmp = ɵɵdefineComponent({
  type: MenuComponent,
  selectors: [["ejs-menu"]],
  contentQueries: function MenuComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c6, 5);
      ɵɵcontentQuery(dirIndex, MenuItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    animationSettings: "animationSettings",
    cssClass: "cssClass",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    enableScrolling: "enableScrolling",
    fields: "fields",
    filter: "filter",
    hamburgerMode: "hamburgerMode",
    hoverDelay: "hoverDelay",
    items: "items",
    locale: "locale",
    orientation: "orientation",
    showItemOnClick: "showItemOnClick",
    target: "target",
    template: "template",
    title: "title"
  },
  outputs: {
    beforeClose: "beforeClose",
    beforeItemRender: "beforeItemRender",
    beforeOpen: "beforeOpen",
    created: "created",
    onClose: "onClose",
    onOpen: "onOpen",
    select: "select"
  },
  features: [ɵɵInheritDefinitionFeature],
  decls: 0,
  vars: 0,
  template: function MenuComponent_Template(rf, ctx) {
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], MenuComponent.prototype, "template", void 0);
MenuComponent = __decorate([ComponentMixins([ComponentBase])], MenuComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuComponent, [{
    type: Component,
    args: [{
      selector: "ejs-menu",
      inputs: inputs$2,
      outputs: outputs$3,
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(MenuItemsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, {
    template: [{
      type: ContentChild,
      args: ["template"]
    }]
  });
})();
var MenuModule = class {
};
MenuModule.ɵfac = function MenuModule_Factory(t) {
  return new (t || MenuModule)();
};
MenuModule.ɵmod = ɵɵdefineNgModule({
  type: MenuModule,
  declarations: [MenuComponent, MenuItemDirective, MenuItemsDirective],
  imports: [CommonModule],
  exports: [MenuComponent, MenuItemDirective, MenuItemsDirective]
});
MenuModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [MenuComponent, MenuItemDirective, MenuItemsDirective],
      exports: [MenuComponent, MenuItemDirective, MenuItemsDirective]
    }]
  }], null, null);
})();
var MenuAllModule = class {
};
MenuAllModule.ɵfac = function MenuAllModule_Factory(t) {
  return new (t || MenuAllModule)();
};
MenuAllModule.ɵmod = ɵɵdefineNgModule({
  type: MenuAllModule,
  imports: [CommonModule, MenuModule],
  exports: [MenuModule]
});
MenuAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, MenuModule], MenuModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MenuAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, MenuModule],
      exports: [MenuModule],
      providers: []
    }]
  }], null, null);
})();
var inputs$1 = ["colorMode", "cssClass", "enablePersistence", "enableRtl", "htmlAttributes", "isSticky", "locale", "mode", "position"];
var outputs$2 = ["created", "destroyed"];
var twoWays$1 = [""];
var AppBarComponent = class AppBarComponent2 extends AppBar {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$2);
    this.addTwoWay.call(this, twoWays$1);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.containerContext.ngAfterContentChecked(this);
  }
};
AppBarComponent.ɵfac = function AppBarComponent_Factory(t) {
  return new (t || AppBarComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
AppBarComponent.ɵcmp = ɵɵdefineComponent({
  type: AppBarComponent,
  selectors: [["ejs-appbar"]],
  inputs: {
    colorMode: "colorMode",
    cssClass: "cssClass",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    htmlAttributes: "htmlAttributes",
    isSticky: "isSticky",
    locale: "locale",
    mode: "mode",
    position: "position"
  },
  outputs: {
    created: "created",
    destroyed: "destroyed"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c14,
  decls: 1,
  vars: 0,
  template: function AppBarComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
AppBarComponent = __decorate([ComponentMixins([ComponentBase])], AppBarComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppBarComponent, [{
    type: Component,
    args: [{
      selector: "ejs-appbar",
      inputs: inputs$1,
      outputs: outputs$2,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {}
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, null);
})();
var AppBarModule = class {
};
AppBarModule.ɵfac = function AppBarModule_Factory(t) {
  return new (t || AppBarModule)();
};
AppBarModule.ɵmod = ɵɵdefineNgModule({
  type: AppBarModule,
  declarations: [AppBarComponent],
  imports: [CommonModule],
  exports: [AppBarComponent]
});
AppBarModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppBarModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [AppBarComponent],
      exports: [AppBarComponent]
    }]
  }], null, null);
})();
var AppBarAllModule = class {
};
AppBarAllModule.ɵfac = function AppBarAllModule_Factory(t) {
  return new (t || AppBarAllModule)();
};
AppBarAllModule.ɵmod = ɵɵdefineNgModule({
  type: AppBarAllModule,
  imports: [CommonModule, AppBarModule],
  exports: [AppBarModule]
});
AppBarAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, AppBarModule], AppBarModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(AppBarAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, AppBarModule],
      exports: [AppBarModule],
      providers: []
    }]
  }], null, null);
})();
var input = ["cssClass", "disabled", "iconCss", "isValid", "label", "optional", "status", "text"];
var outputs$1 = [];
var StepDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$1);
    this.directivePropList = input;
  }
};
StepDirective.ɵfac = function StepDirective_Factory(t) {
  return new (t || StepDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
StepDirective.ɵdir = ɵɵdefineDirective({
  type: StepDirective,
  selectors: [["e-step"]],
  inputs: {
    cssClass: "cssClass",
    disabled: "disabled",
    iconCss: "iconCss",
    isValid: "isValid",
    label: "label",
    optional: "optional",
    status: "status",
    text: "text"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-stepper>e-steps>e-step",
      inputs: input,
      outputs: outputs$1,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var StepsDirective = class extends ArrayBase {
  constructor() {
    super("steps");
  }
};
StepsDirective.ɵfac = function StepsDirective_Factory(t) {
  return new (t || StepsDirective)();
};
StepsDirective.ɵdir = ɵɵdefineDirective({
  type: StepsDirective,
  selectors: [["e-steps"]],
  contentQueries: function StepsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, StepDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-stepper>e-steps",
      queries: {
        children: new ContentChildren(StepDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs = ["activeStep", "animation", "cssClass", "enablePersistence", "enableRtl", "labelPosition", "linear", "locale", "orientation", "readOnly", "showTooltip", "stepType", "steps", "template", "tooltipTemplate"];
var outputs = ["beforeStepRender", "created", "stepChanged", "stepChanging", "stepClick", "activeStepChange"];
var twoWays = ["activeStep"];
var StepperComponent = class StepperComponent2 extends Stepper {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["steps"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs);
    this.addTwoWay.call(this, twoWays);
    setValue("currentInstance", this, this.viewContainerRef);
    this.containerContext = new ComponentBase();
  }
  ngOnInit() {
    this.containerContext.ngOnInit(this);
  }
  ngAfterViewInit() {
    this.containerContext.ngAfterViewInit(this);
  }
  ngOnDestroy() {
    this.containerContext.ngOnDestroy(this);
  }
  ngAfterContentChecked() {
    this.tagObjects[0].instance = this.childSteps;
    this.containerContext.ngAfterContentChecked(this);
  }
};
StepperComponent.ɵfac = function StepperComponent_Factory(t) {
  return new (t || StepperComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
StepperComponent.ɵcmp = ɵɵdefineComponent({
  type: StepperComponent,
  selectors: [["ejs-stepper"]],
  contentQueries: function StepperComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, _c6, 5);
      ɵɵcontentQuery(dirIndex, _c15, 5);
      ɵɵcontentQuery(dirIndex, StepsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.template = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.tooltipTemplate = _t.first);
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childSteps = _t.first);
    }
  },
  inputs: {
    activeStep: "activeStep",
    animation: "animation",
    cssClass: "cssClass",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    labelPosition: "labelPosition",
    linear: "linear",
    locale: "locale",
    orientation: "orientation",
    readOnly: "readOnly",
    showTooltip: "showTooltip",
    stepType: "stepType",
    steps: "steps",
    template: "template",
    tooltipTemplate: "tooltipTemplate"
  },
  outputs: {
    beforeStepRender: "beforeStepRender",
    created: "created",
    stepChanged: "stepChanged",
    stepChanging: "stepChanging",
    stepClick: "stepClick",
    activeStepChange: "activeStepChange"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c17,
  decls: 1,
  vars: 0,
  template: function StepperComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c16);
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
__decorate([Template()], StepperComponent.prototype, "template", void 0);
__decorate([Template()], StepperComponent.prototype, "tooltipTemplate", void 0);
StepperComponent = __decorate([ComponentMixins([ComponentBase])], StepperComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperComponent, [{
    type: Component,
    args: [{
      selector: "ejs-stepper",
      inputs,
      outputs,
      template: `<ng-content select='nav'></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childSteps: new ContentChild(StepsDirective)
      }
    }]
  }], function() {
    return [{
      type: ElementRef
    }, {
      type: Renderer2
    }, {
      type: ViewContainerRef
    }, {
      type: Injector
    }];
  }, {
    template: [{
      type: ContentChild,
      args: ["template"]
    }],
    tooltipTemplate: [{
      type: ContentChild,
      args: ["tooltipTemplate"]
    }]
  });
})();
var StepperModule = class {
};
StepperModule.ɵfac = function StepperModule_Factory(t) {
  return new (t || StepperModule)();
};
StepperModule.ɵmod = ɵɵdefineNgModule({
  type: StepperModule,
  declarations: [StepperComponent, StepDirective, StepsDirective],
  imports: [CommonModule],
  exports: [StepperComponent, StepDirective, StepsDirective]
});
StepperModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [StepperComponent, StepDirective, StepsDirective],
      exports: [StepperComponent, StepDirective, StepsDirective]
    }]
  }], null, null);
})();
var StepperAllModule = class {
};
StepperAllModule.ɵfac = function StepperAllModule_Factory(t) {
  return new (t || StepperAllModule)();
};
StepperAllModule.ɵmod = ɵɵdefineNgModule({
  type: StepperAllModule,
  imports: [CommonModule, StepperModule],
  exports: [StepperModule]
});
StepperAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, StepperModule], StepperModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(StepperAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, StepperModule],
      exports: [StepperModule],
      providers: []
    }]
  }], null, null);
})();
export {
  Accordion,
  AccordionActionSettings,
  AccordionAllModule,
  AccordionAnimationSettings,
  AccordionComponent,
  AccordionItem,
  AccordionItemDirective,
  AccordionItemsDirective,
  AccordionModule,
  ActionSettings,
  AppBar,
  AppBarAllModule,
  AppBarComponent,
  AppBarModule,
  Breadcrumb,
  BreadcrumbAllModule,
  BreadcrumbComponent,
  BreadcrumbItem,
  BreadcrumbItemDirective,
  BreadcrumbItemsDirective,
  BreadcrumbModule,
  BreadcrumbOverflowMode,
  Carousel,
  CarouselAllModule,
  CarouselComponent,
  CarouselItem,
  CarouselItemDirective,
  CarouselItemsDirective,
  CarouselModule,
  CarouselSwipeMode,
  ContextMenu,
  ContextMenuAllModule,
  ContextMenuComponent,
  ContextMenuModule,
  FieldSettings,
  FieldsSettings,
  HScroll,
  Header,
  Item,
  ItemDirective,
  ItemsDirective,
  Menu,
  MenuAllModule,
  MenuAnimationSettings,
  MenuComponent,
  MenuItem,
  MenuItemDirective,
  MenuItemsDirective,
  MenuModule,
  NodeAnimationSettings,
  Sidebar,
  SidebarAllModule,
  SidebarComponent,
  SidebarModule,
  Step,
  StepDirective,
  StepLabelPosition,
  StepStatus,
  StepType,
  Stepper,
  StepperAllModule,
  StepperAnimationSettings,
  StepperBase,
  StepperComponent,
  StepperModule,
  StepperOrientation,
  StepsDirective,
  Tab,
  TabActionSettings,
  TabAllModule,
  TabAnimationSettings,
  TabComponent,
  TabItem,
  TabItemDirective,
  TabItemsDirective,
  TabModule,
  Toolbar,
  ToolbarAllModule,
  ToolbarComponent,
  ToolbarModule,
  TreeView,
  TreeViewAllModule,
  TreeViewComponent,
  TreeViewModule,
  VScroll,
  addScrolling,
  destroyScroll
};
//# sourceMappingURL=@syncfusion_ej2-angular-navigations.js.map
