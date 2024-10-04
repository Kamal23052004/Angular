import {
  AnimationSettings,
  Deferred,
  DropDownButton,
  Item,
  ProgressButton,
  SpinSettings,
  SplitButton,
  createButtonGroup,
  getModel,
  setBlankIconStyle,
  upDownKeyHandler
} from "./chunk-AS5YIVX4.js";
import "./chunk-2M5HFFVS.js";
import {
  ArrayBase,
  ComplexBase,
  ComponentBase,
  ComponentMixins,
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

// node_modules/@syncfusion/ej2-angular-splitbuttons/fesm2020/syncfusion-ej2-angular-splitbuttons.mjs
var _c0 = ["ejs-dropdownbutton", ""];
var _c1 = ["*"];
var _c2 = ["ejs-progressbutton", ""];
var input$1 = ["disabled", "iconCss", "id", "separator", "text", "url"];
var outputs$4 = [];
var DropDownButtonItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$4);
    this.directivePropList = input$1;
  }
};
DropDownButtonItemDirective.ɵfac = function DropDownButtonItemDirective_Factory(t) {
  return new (t || DropDownButtonItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
DropDownButtonItemDirective.ɵdir = ɵɵdefineDirective({
  type: DropDownButtonItemDirective,
  selectors: [["e-dropdownbuttonitem"]],
  inputs: {
    disabled: "disabled",
    iconCss: "iconCss",
    id: "id",
    separator: "separator",
    text: "text",
    url: "url"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropDownButtonItemDirective, [{
    type: Directive,
    args: [{
      selector: "e-dropdownbuttonitems>e-dropdownbuttonitem",
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
var DropDownButtonItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
DropDownButtonItemsDirective.ɵfac = function DropDownButtonItemsDirective_Factory(t) {
  return new (t || DropDownButtonItemsDirective)();
};
DropDownButtonItemsDirective.ɵdir = ɵɵdefineDirective({
  type: DropDownButtonItemsDirective,
  selectors: [["e-dropdownbuttonitems"]],
  contentQueries: function DropDownButtonItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, DropDownButtonItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropDownButtonItemsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-dropdownbutton>e-dropdownbuttonitems",
      queries: {
        children: new ContentChildren(DropDownButtonItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$2 = ["closeActionEvents", "content", "createPopupOnClick", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "iconCss", "iconPosition", "items", "locale", "target"];
var outputs$3 = ["beforeClose", "beforeItemRender", "beforeOpen", "close", "created", "open", "select"];
var twoWays$2 = [];
var DropDownButtonComponent = class DropDownButtonComponent2 extends DropDownButton {
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
DropDownButtonComponent.ɵfac = function DropDownButtonComponent_Factory(t) {
  return new (t || DropDownButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
DropDownButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: DropDownButtonComponent,
  selectors: [["", "ejs-dropdownbutton", ""]],
  contentQueries: function DropDownButtonComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, DropDownButtonItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    closeActionEvents: "closeActionEvents",
    content: "content",
    createPopupOnClick: "createPopupOnClick",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    iconCss: "iconCss",
    iconPosition: "iconPosition",
    items: "items",
    locale: "locale",
    target: "target"
  },
  outputs: {
    beforeClose: "beforeClose",
    beforeItemRender: "beforeItemRender",
    beforeOpen: "beforeOpen",
    close: "close",
    created: "created",
    open: "open",
    select: "select"
  },
  features: [ɵɵInheritDefinitionFeature],
  attrs: _c0,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function DropDownButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
DropDownButtonComponent = __decorate([ComponentMixins([ComponentBase])], DropDownButtonComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropDownButtonComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-dropdownbutton]",
      inputs: inputs$2,
      outputs: outputs$3,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(DropDownButtonItemsDirective)
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
var DropDownButtonModule = class {
};
DropDownButtonModule.ɵfac = function DropDownButtonModule_Factory(t) {
  return new (t || DropDownButtonModule)();
};
DropDownButtonModule.ɵmod = ɵɵdefineNgModule({
  type: DropDownButtonModule,
  declarations: [DropDownButtonComponent, DropDownButtonItemDirective, DropDownButtonItemsDirective],
  imports: [CommonModule],
  exports: [DropDownButtonComponent, DropDownButtonItemDirective, DropDownButtonItemsDirective]
});
DropDownButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropDownButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [DropDownButtonComponent, DropDownButtonItemDirective, DropDownButtonItemsDirective],
      exports: [DropDownButtonComponent, DropDownButtonItemDirective, DropDownButtonItemsDirective]
    }]
  }], null, null);
})();
var DropDownButtonAllModule = class {
};
DropDownButtonAllModule.ɵfac = function DropDownButtonAllModule_Factory(t) {
  return new (t || DropDownButtonAllModule)();
};
DropDownButtonAllModule.ɵmod = ɵɵdefineNgModule({
  type: DropDownButtonAllModule,
  imports: [CommonModule, DropDownButtonModule],
  exports: [DropDownButtonModule]
});
DropDownButtonAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, DropDownButtonModule], DropDownButtonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DropDownButtonAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, DropDownButtonModule],
      exports: [DropDownButtonModule],
      providers: []
    }]
  }], null, null);
})();
var input = ["disabled", "iconCss", "id", "separator", "text", "url"];
var outputs$2 = [];
var SplitButtonItemDirective = class extends ComplexBase {
  constructor(viewContainerRef) {
    super();
    this.viewContainerRef = viewContainerRef;
    setValue("currentInstance", this, this.viewContainerRef);
    this.registerEvents(outputs$2);
    this.directivePropList = input;
  }
};
SplitButtonItemDirective.ɵfac = function SplitButtonItemDirective_Factory(t) {
  return new (t || SplitButtonItemDirective)(ɵɵdirectiveInject(ViewContainerRef));
};
SplitButtonItemDirective.ɵdir = ɵɵdefineDirective({
  type: SplitButtonItemDirective,
  selectors: [["e-splitbuttonitem"]],
  inputs: {
    disabled: "disabled",
    iconCss: "iconCss",
    id: "id",
    separator: "separator",
    text: "text",
    url: "url"
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SplitButtonItemDirective, [{
    type: Directive,
    args: [{
      selector: "e-splitbuttonitems>e-splitbuttonitem",
      inputs: input,
      outputs: outputs$2,
      queries: {}
    }]
  }], function() {
    return [{
      type: ViewContainerRef
    }];
  }, null);
})();
var SplitButtonItemsDirective = class extends ArrayBase {
  constructor() {
    super("items");
  }
};
SplitButtonItemsDirective.ɵfac = function SplitButtonItemsDirective_Factory(t) {
  return new (t || SplitButtonItemsDirective)();
};
SplitButtonItemsDirective.ɵdir = ɵɵdefineDirective({
  type: SplitButtonItemsDirective,
  selectors: [["e-splitbuttonitems"]],
  contentQueries: function SplitButtonItemsDirective_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, SplitButtonItemDirective, 4);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.children = _t);
    }
  },
  features: [ɵɵInheritDefinitionFeature]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SplitButtonItemsDirective, [{
    type: Directive,
    args: [{
      selector: "ejs-splitbutton>e-splitbuttonitems",
      queries: {
        children: new ContentChildren(SplitButtonItemDirective)
      }
    }]
  }], function() {
    return [];
  }, null);
})();
var inputs$1 = ["closeActionEvents", "content", "createPopupOnClick", "cssClass", "disabled", "enableHtmlSanitizer", "enablePersistence", "enableRtl", "iconCss", "iconPosition", "items", "locale", "target"];
var outputs$1 = ["beforeClose", "beforeItemRender", "beforeOpen", "click", "close", "created", "open", "select"];
var twoWays$1 = [];
var SplitButtonComponent = class SplitButtonComponent2 extends SplitButton {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
    this.tags = ["items"];
    this.element = this.ngEle.nativeElement;
    this.injectedModules = this.injectedModules || [];
    this.registerEvents(outputs$1);
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
    this.tagObjects[0].instance = this.childItems;
    this.containerContext.ngAfterContentChecked(this);
  }
};
SplitButtonComponent.ɵfac = function SplitButtonComponent_Factory(t) {
  return new (t || SplitButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
SplitButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: SplitButtonComponent,
  selectors: [["ejs-splitbutton"]],
  contentQueries: function SplitButtonComponent_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuery(dirIndex, SplitButtonItemsDirective, 5);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.childItems = _t.first);
    }
  },
  inputs: {
    closeActionEvents: "closeActionEvents",
    content: "content",
    createPopupOnClick: "createPopupOnClick",
    cssClass: "cssClass",
    disabled: "disabled",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enablePersistence: "enablePersistence",
    enableRtl: "enableRtl",
    iconCss: "iconCss",
    iconPosition: "iconPosition",
    items: "items",
    locale: "locale",
    target: "target"
  },
  outputs: {
    beforeClose: "beforeClose",
    beforeItemRender: "beforeItemRender",
    beforeOpen: "beforeOpen",
    click: "click",
    close: "close",
    created: "created",
    open: "open",
    select: "select"
  },
  features: [ɵɵInheritDefinitionFeature],
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function SplitButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
SplitButtonComponent = __decorate([ComponentMixins([ComponentBase])], SplitButtonComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SplitButtonComponent, [{
    type: Component,
    args: [{
      selector: "ejs-splitbutton",
      inputs: inputs$1,
      outputs: outputs$1,
      template: `<ng-content ></ng-content>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      queries: {
        childItems: new ContentChild(SplitButtonItemsDirective)
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
var SplitButtonModule = class {
};
SplitButtonModule.ɵfac = function SplitButtonModule_Factory(t) {
  return new (t || SplitButtonModule)();
};
SplitButtonModule.ɵmod = ɵɵdefineNgModule({
  type: SplitButtonModule,
  declarations: [SplitButtonComponent, SplitButtonItemDirective, SplitButtonItemsDirective],
  imports: [CommonModule],
  exports: [SplitButtonComponent, SplitButtonItemDirective, SplitButtonItemsDirective]
});
SplitButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SplitButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [SplitButtonComponent, SplitButtonItemDirective, SplitButtonItemsDirective],
      exports: [SplitButtonComponent, SplitButtonItemDirective, SplitButtonItemsDirective]
    }]
  }], null, null);
})();
var SplitButtonAllModule = class {
};
SplitButtonAllModule.ɵfac = function SplitButtonAllModule_Factory(t) {
  return new (t || SplitButtonAllModule)();
};
SplitButtonAllModule.ɵmod = ɵɵdefineNgModule({
  type: SplitButtonAllModule,
  imports: [CommonModule, SplitButtonModule],
  exports: [SplitButtonModule]
});
SplitButtonAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, SplitButtonModule], SplitButtonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SplitButtonAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, SplitButtonModule],
      exports: [SplitButtonModule],
      providers: []
    }]
  }], null, null);
})();
var inputs = ["animationSettings", "content", "cssClass", "disabled", "duration", "enableHtmlSanitizer", "enableProgress", "iconCss", "iconPosition", "isPrimary", "isToggle", "spinSettings"];
var outputs = ["begin", "created", "end", "fail", "progress"];
var twoWays = [];
var ProgressButtonComponent = class ProgressButtonComponent2 extends ProgressButton {
  constructor(ngEle, srenderer, viewContainerRef, injector) {
    super();
    this.ngEle = ngEle;
    this.srenderer = srenderer;
    this.viewContainerRef = viewContainerRef;
    this.injector = injector;
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
    this.containerContext.ngAfterContentChecked(this);
  }
};
ProgressButtonComponent.ɵfac = function ProgressButtonComponent_Factory(t) {
  return new (t || ProgressButtonComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(Injector));
};
ProgressButtonComponent.ɵcmp = ɵɵdefineComponent({
  type: ProgressButtonComponent,
  selectors: [["", "ejs-progressbutton", ""]],
  inputs: {
    animationSettings: "animationSettings",
    content: "content",
    cssClass: "cssClass",
    disabled: "disabled",
    duration: "duration",
    enableHtmlSanitizer: "enableHtmlSanitizer",
    enableProgress: "enableProgress",
    iconCss: "iconCss",
    iconPosition: "iconPosition",
    isPrimary: "isPrimary",
    isToggle: "isToggle",
    spinSettings: "spinSettings"
  },
  outputs: {
    begin: "begin",
    created: "created",
    end: "end",
    fail: "fail",
    progress: "progress"
  },
  features: [ɵɵInheritDefinitionFeature],
  attrs: _c2,
  ngContentSelectors: _c1,
  decls: 1,
  vars: 0,
  template: function ProgressButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef();
      ɵɵprojection(0);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
ProgressButtonComponent = __decorate([ComponentMixins([ComponentBase])], ProgressButtonComponent);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressButtonComponent, [{
    type: Component,
    args: [{
      selector: "[ejs-progressbutton]",
      inputs,
      outputs,
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
var ProgressButtonModule = class {
};
ProgressButtonModule.ɵfac = function ProgressButtonModule_Factory(t) {
  return new (t || ProgressButtonModule)();
};
ProgressButtonModule.ɵmod = ɵɵdefineNgModule({
  type: ProgressButtonModule,
  declarations: [ProgressButtonComponent],
  imports: [CommonModule],
  exports: [ProgressButtonComponent]
});
ProgressButtonModule.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressButtonModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [ProgressButtonComponent],
      exports: [ProgressButtonComponent]
    }]
  }], null, null);
})();
var ProgressButtonAllModule = class {
};
ProgressButtonAllModule.ɵfac = function ProgressButtonAllModule_Factory(t) {
  return new (t || ProgressButtonAllModule)();
};
ProgressButtonAllModule.ɵmod = ɵɵdefineNgModule({
  type: ProgressButtonAllModule,
  imports: [CommonModule, ProgressButtonModule],
  exports: [ProgressButtonModule]
});
ProgressButtonAllModule.ɵinj = ɵɵdefineInjector({
  providers: [],
  imports: [[CommonModule, ProgressButtonModule], ProgressButtonModule]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ProgressButtonAllModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule, ProgressButtonModule],
      exports: [ProgressButtonModule],
      providers: []
    }]
  }], null, null);
})();
export {
  AnimationSettings,
  Deferred,
  DropDownButton,
  DropDownButtonAllModule,
  DropDownButtonComponent,
  DropDownButtonItemDirective,
  DropDownButtonItemsDirective,
  DropDownButtonModule,
  Item,
  ProgressButton,
  ProgressButtonAllModule,
  ProgressButtonComponent,
  ProgressButtonModule,
  SpinSettings,
  SplitButton,
  SplitButtonAllModule,
  SplitButtonComponent,
  SplitButtonItemDirective,
  SplitButtonItemsDirective,
  SplitButtonModule,
  createButtonGroup,
  getModel,
  setBlankIconStyle,
  upDownKeyHandler
};
//# sourceMappingURL=@syncfusion_ej2-angular-splitbuttons.js.map
