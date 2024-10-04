import {
  Popup,
  createSpinner,
  hideSpinner,
  showSpinner
} from "./chunk-2M5HFFVS.js";
import {
  Button
} from "./chunk-2S3DOBG7.js";
import {
  Animation,
  ChildProperty,
  Collection,
  Complex,
  Component,
  Event,
  EventHandler,
  KeyboardEvents,
  NotifyPropertyChanges,
  Property,
  SanitizeHtmlHelper,
  addClass,
  animationMode,
  attributes,
  classList,
  closest,
  createElement,
  deleteObject,
  detach,
  extend,
  getComponent,
  getInstance,
  getUniqueID,
  getValue,
  isNullOrUndefined,
  isRippleEnabled,
  remove,
  removeClass,
  rippleEffect,
  select,
  setValue
} from "./chunk-HEJJC6ZW.js";

// node_modules/@syncfusion/ej2-splitbuttons/src/common/common.js
var __extends = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function getModel(props, model) {
  var obj = extend({}, props);
  for (var _i = 0, _a = Object.keys(obj); _i < _a.length; _i++) {
    var prop = _a[_i];
    if (model.indexOf(prop) < 0) {
      deleteObject(obj, prop);
    }
  }
  return obj;
}
function upDownKeyHandler(ul, keyCode) {
  var defaultIdx = keyCode === 40 ? 0 : ul.childElementCount - 1;
  var liIdx = defaultIdx;
  var li;
  var selectedLi = ul.querySelector(".e-selected");
  if (selectedLi) {
    selectedLi.classList.remove("e-selected");
  }
  for (var i = 0, len = ul.children.length; i < len; i++) {
    if (ul.children[i].classList.contains("e-focused")) {
      li = ul.children[i];
      liIdx = i;
      li.classList.remove("e-focused");
      if (keyCode === 40) {
        liIdx++;
      } else {
        liIdx--;
      }
      if (liIdx === (keyCode === 40 ? ul.childElementCount : -1)) {
        liIdx = defaultIdx;
      }
    }
  }
  li = ul.children[liIdx];
  liIdx = isValidLI(ul, li, liIdx, keyCode);
  if (liIdx !== -1) {
    addClass([ul.children[liIdx]], "e-focused");
    ul.children[liIdx].focus();
  }
}
function isValidLI(ul, li, index, keyCode, count) {
  if (count === void 0) {
    count = 0;
  }
  if (li.classList.contains("e-separator") || li.classList.contains("e-disabled")) {
    if (index === (keyCode === 40 ? ul.childElementCount - 1 : 0)) {
      index = keyCode === 40 ? 0 : ul.childElementCount - 1;
    } else {
      if (keyCode === 40) {
        index++;
      } else {
        index--;
      }
    }
  }
  li = ul.children[index];
  if (li.classList.contains("e-separator") || li.classList.contains("e-disabled")) {
    count++;
    if (count === ul.childElementCount) {
      return index = -1;
    }
    index = isValidLI(ul, li, index, keyCode, count);
  }
  return index;
}
function setBlankIconStyle(popup, blankIcon) {
  var blankIconList = [].slice.call(popup.getElementsByClassName("e-blank-icon"));
  if (blankIcon) {
    var menuItem = [].slice.call(popup.getElementsByClassName("e-item"));
    menuItem.forEach(function(li) {
      if (li.style.paddingLeft || li.style.paddingRight) {
        li.removeAttribute("style");
      }
    });
  }
  if (!blankIconList.length) {
    return;
  }
  var iconLi = popup.querySelector(".e-item:not(.e-blank-icon):not(.e-separator)");
  if (isNullOrUndefined(iconLi)) {
    return;
  }
  if (iconLi.classList.contains("e-url")) {
    iconLi = iconLi.querySelector(".e-menu-url");
  }
  var icon = iconLi.querySelector(".e-menu-icon");
  var cssProp;
  var enableRtl = popup.classList.contains("e-rtl");
  if (enableRtl) {
    cssProp = { padding: "paddingRight", margin: "marginLeft" };
  } else {
    cssProp = { padding: "paddingLeft", margin: "marginRight" };
  }
  var size = parseInt(getComputedStyle(icon).fontSize, 10) + parseInt(enableRtl ? getComputedStyle(icon)[cssProp.margin] : getComputedStyle(icon)[cssProp.margin], 10) + parseInt(getComputedStyle(iconLi).paddingLeft, 10) + "px";
  blankIconList.forEach(function(li) {
    if (li.classList.contains("e-url")) {
      li.querySelector(".e-menu-url").style[cssProp.padding] = size;
    } else {
      li.style[cssProp.padding] = size;
    }
  });
}
var Item = (
  /** @class */
  function(_super) {
    __extends(Item2, _super);
    function Item2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
      Property("")
    ], Item2.prototype, "iconCss", void 0);
    __decorate([
      Property("")
    ], Item2.prototype, "id", void 0);
    __decorate([
      Property(false)
    ], Item2.prototype, "separator", void 0);
    __decorate([
      Property("")
    ], Item2.prototype, "text", void 0);
    __decorate([
      Property("")
    ], Item2.prototype, "url", void 0);
    __decorate([
      Property(false)
    ], Item2.prototype, "disabled", void 0);
    return Item2;
  }(ChildProperty)
);

// node_modules/@syncfusion/ej2-splitbuttons/src/drop-down-button/drop-down-button.js
var __extends2 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate2 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var classNames = {
  DISABLED: "e-disabled",
  FOCUS: "e-focused",
  ICON: "e-menu-icon",
  ITEM: "e-item",
  POPUP: "e-dropdown-popup",
  RTL: "e-rtl",
  SEPARATOR: "e-separator",
  VERTICAL: "e-vertical"
};
var DropDownButton = (
  /** @class */
  function(_super) {
    __extends2(DropDownButton2, _super);
    function DropDownButton2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.isPopupCreated = true;
      return _this;
    }
    DropDownButton2.prototype.preRender = function() {
    };
    DropDownButton2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    DropDownButton2.prototype.toggle = function() {
      if (this.canOpen()) {
        this.openPopUp();
      } else if (this.createPopupOnClick && !this.isPopupCreated) {
        this.createPopup();
        this.openPopUp();
      } else {
        this.closePopup();
      }
    };
    DropDownButton2.prototype.render = function() {
      this.initialize();
      if (!this.disabled) {
        this.wireEvents();
      }
      this.renderComplete();
    };
    DropDownButton2.prototype.addItems = function(items, text) {
      var newItem;
      var idx = this.items.length;
      for (var j = 0, len = this.items.length; j < len; j++) {
        if (text === this.items[j].text) {
          idx = j;
          break;
        }
      }
      for (var i = items.length - 1; i >= 0; i--) {
        newItem = new Item(this, "items", items[i], true);
        this.items.splice(idx, 0, newItem);
      }
      if (!this.canOpen()) {
        this.createItems();
      }
    };
    DropDownButton2.prototype.removeItems = function(items, isUniqueId) {
      var refresh = false;
      for (var i = 0, len = items.length; i < len; i++) {
        for (var j = 0, len_1 = this.items.length; j < len_1; j++) {
          if (items[i] === (isUniqueId ? this.items[j].id : this.items[j].text)) {
            this.items.splice(j, 1);
            refresh = true;
            break;
          }
        }
      }
      if (refresh && this.getULElement()) {
        this.createItems();
      }
    };
    DropDownButton2.prototype.createPopup = function() {
      var _a;
      var div = this.createElement("div", {
        className: classNames.POPUP,
        id: this.element.id + "-popup"
      });
      document.body.appendChild(div);
      this.dropDown = new Popup(div, {
        relateTo: this.element,
        collision: { X: "fit", Y: "flip" },
        position: { X: "left", Y: "bottom" },
        targetType: "relative",
        content: this.target ? this.getTargetElement() : "",
        enableRtl: this.enableRtl
      });
      this.dropDown.element.setAttribute("role", "dialog");
      this.dropDown.element.setAttribute("aria-label", "dropdown menu");
      if (!isNullOrUndefined(this.popupContent)) {
        this.popupContent.style.display = "";
      }
      if (this.dropDown.element.style.position === "fixed") {
        this.dropDown.refreshPosition(this.element);
      }
      this.dropDown.hide();
      attributes(this.element, (_a = {}, _a["aria-haspopup"] = this.items.length || this.target ? "true" : "false", _a["aria-expanded"] = "false", _a["type"] = "button", _a));
      if (this.cssClass) {
        addClass([div], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
      this.isPopupCreated = true;
    };
    DropDownButton2.prototype.getTargetElement = function() {
      if (this.createPopupOnClick && !this.isColorPicker() && !isNullOrUndefined(this.popupContent)) {
        return this.popupContent;
      }
      return typeof this.target === "string" ? select(this.target) : this.target;
    };
    DropDownButton2.prototype.createItems = function(appendItems) {
      var items = this.items;
      var showIcon = this.hasIcon(this.items, "iconCss");
      var span;
      var item;
      var li;
      var eventArgs;
      var ul = this.getULElement();
      if (ul) {
        ul.innerHTML = "";
      } else {
        ul = this.createElement("ul", {
          attrs: { "role": "menu", "tabindex": "0" }
        });
      }
      for (var i = 0; i < items.length; i++) {
        item = items[i];
        var tempItem = item.text;
        li = this.createElement("li", {
          innerHTML: item.url ? "" : tempItem,
          className: item.separator ? classNames.ITEM + " " + classNames.SEPARATOR : classNames.ITEM,
          attrs: item.separator ? { "role": "separator", "tabindex": "-1", "aria-label": "separator", "aria-hidden": "true" } : { "role": "menuitem", "tabindex": "-1", "aria-label": tempItem },
          id: item.id ? item.id : getUniqueID("e-" + this.getModuleName() + "-item")
        });
        if (this.enableHtmlSanitizer) {
          li.textContent = item.url ? "" : tempItem;
        } else {
          li.innerHTML = item.url ? "" : tempItem;
        }
        if (item.url) {
          li.appendChild(this.createAnchor(item));
          li.classList.add("e-url");
        }
        if (item.iconCss) {
          span = this.createElement("span", { className: classNames.ICON + " " + item.iconCss });
          if (item.url) {
            li.childNodes[0].appendChild(span);
          } else {
            li.insertBefore(span, li.childNodes[0]);
          }
        } else {
          if (showIcon && !item.separator) {
            li.classList.add("e-blank-icon");
          }
        }
        var beforeDisabled = item.disabled;
        if (item.disabled) {
          li.classList.add("e-disabled");
        }
        eventArgs = { item, element: li };
        this.trigger("beforeItemRender", eventArgs);
        var afterDisabled = eventArgs.item.disabled;
        if (beforeDisabled !== afterDisabled) {
          if (eventArgs.item.disabled) {
            li.classList.add("e-disabled");
          } else {
            li.classList.remove("e-disabled");
          }
        }
        ul.appendChild(li);
      }
      if (appendItems) {
        this.getPopUpElement().appendChild(ul);
      }
      if (showIcon) {
        setBlankIconStyle(this.getPopUpElement());
      }
    };
    DropDownButton2.prototype.hasIcon = function(items, field) {
      for (var i = 0, len = items.length; i < len; i++) {
        if (items[i]["" + field]) {
          return true;
        }
      }
      return false;
    };
    DropDownButton2.prototype.createAnchor = function(item) {
      var tempItem = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(item.text) : item.text;
      return this.createElement("a", { className: "e-menu-text e-menu-url", innerHTML: tempItem, attrs: { "href": item.url } });
    };
    DropDownButton2.prototype.initialize = function() {
      this.button = new Button({
        iconCss: this.iconCss,
        iconPosition: this.iconPosition,
        cssClass: this.cssClass,
        content: this.content,
        disabled: this.disabled,
        enableRtl: this.enableRtl,
        enablePersistence: this.enablePersistence
      });
      this.button.createElement = this.createElement;
      this.button.appendTo(this.element);
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
      this.appendArrowSpan();
      this.setActiveElem([this.element]);
      this.element.setAttribute("tabindex", "0");
      this.element.setAttribute("aria-label", this.element.textContent ? this.element.textContent : "dropdownbutton");
      if (this.target && !this.isColorPicker() && !this.createPopupOnClick || !this.createPopupOnClick) {
        this.createPopup();
      } else {
        this.isPopupCreated = false;
        if (this.target && !this.isColorPicker() && this.createPopupOnClick) {
          this.popupContent = this.getTargetElement();
          this.popupContent.style.display = "none";
        }
      }
    };
    DropDownButton2.prototype.isColorPicker = function() {
      if (!this.element) {
        return false;
      }
      var prevElem = this.element.previousSibling;
      if (prevElem && prevElem.classList && prevElem.classList.contains("e-split-colorpicker")) {
        return true;
      }
      return false;
    };
    DropDownButton2.prototype.appendArrowSpan = function() {
      this.cssClass = isNullOrUndefined(this.cssClass) ? "" : this.cssClass;
      this.element.appendChild(this.createElement("span", {
        className: "e-btn-icon e-icons e-icon-" + (this.cssClass.indexOf(classNames.VERTICAL) > -1 ? "bottom" : "right") + " e-caret"
      }));
    };
    DropDownButton2.prototype.setActiveElem = function(elem) {
      this.activeElem = elem;
    };
    DropDownButton2.prototype.getModuleName = function() {
      return "dropdown-btn";
    };
    DropDownButton2.prototype.canOpen = function() {
      var val = false;
      if (this.isPopupCreated) {
        val = this.getPopUpElement().classList.contains("e-popup-close");
      }
      return val;
    };
    DropDownButton2.prototype.destroy = function() {
      var _this = this;
      _super.prototype.destroy.call(this);
      if (this.getModuleName() === "dropdown-btn") {
        var classList_1;
        if (this.element.querySelector("span.e-caret")) {
          detach(this.element.querySelector("span.e-caret"));
        }
        if (this.cssClass) {
          classList_1 = this.cssClass.split(" ");
        }
        this.button.destroy();
        if (classList_1) {
          removeClass([this.element], classList_1);
        }
        removeClass(this.activeElem, ["e-active"]);
        var attrList = this.element.getAttribute("class") ? ["aria-haspopup", "aria-expanded", "aria-owns", "type"] : ["aria-haspopup", "aria-expanded", "aria-owns", "type", "class"];
        attrList.forEach(function(key) {
          _this.element.removeAttribute(key);
        });
        this.popupUnWireEvents();
        this.destroyPopup();
        this.isPopupCreated = false;
        if (!this.disabled) {
          this.unWireEvents();
        }
      }
    };
    DropDownButton2.prototype.destroyPopup = function() {
      if (this.isPopupCreated) {
        this.dropDown.destroy();
        if (this.getPopUpElement()) {
          var popupEle = document.getElementById(this.getPopUpElement().id);
          if (popupEle) {
            removeClass([popupEle], ["e-popup-open", "e-popup-close"]);
            detach(popupEle);
          }
        }
        EventHandler.remove(this.getPopUpElement(), "click", this.clickHandler);
        EventHandler.remove(this.getPopUpElement(), "keydown", this.keyBoardHandler);
        if (this.isPopupCreated && this.dropDown) {
          this.dropDown.element = null;
          this.dropDown = void 0;
        }
      }
      this.isPopupCreated = false;
    };
    DropDownButton2.prototype.getPopUpElement = function() {
      var val = null;
      if (!this.dropDown && this.activeElem[0].classList.contains("e-split-btn")) {
        var dropDownBtn = getComponent(this.activeElem[1], "dropdown-btn");
        if (dropDownBtn) {
          this.dropDown = dropDownBtn.dropDown;
        }
      }
      if (this.dropDown) {
        val = this.dropDown.element;
      }
      return val;
    };
    DropDownButton2.prototype.getULElement = function() {
      var val = null;
      if (this.getPopUpElement()) {
        val = this.getPopUpElement().children[0];
      }
      return val;
    };
    DropDownButton2.prototype.wireEvents = function() {
      this.delegateMousedownHandler = this.mousedownHandler.bind(this);
      if (!this.createPopupOnClick) {
        EventHandler.add(document, "mousedown touchstart", this.delegateMousedownHandler, this);
      }
      EventHandler.add(this.element, "click", this.clickHandler, this);
      EventHandler.add(this.element, "keydown", this.keyBoardHandler, this);
      EventHandler.add(window, "resize", this.windowResize, this);
    };
    DropDownButton2.prototype.windowResize = function() {
      if (!this.canOpen() && this.dropDown) {
        this.dropDown.refreshPosition(this.element);
      }
    };
    DropDownButton2.prototype.popupWireEvents = function() {
      if (!this.delegateMousedownHandler) {
        this.delegateMousedownHandler = this.mousedownHandler.bind(this);
      }
      var popupElement = this.getPopUpElement();
      if (this.createPopupOnClick) {
        EventHandler.add(document, "mousedown touchstart", this.delegateMousedownHandler, this);
      }
      if (popupElement) {
        EventHandler.add(popupElement, "click", this.clickHandler, this);
        EventHandler.add(popupElement, "keydown", this.keyBoardHandler, this);
        if (this.closeActionEvents) {
          EventHandler.add(popupElement, this.closeActionEvents, this.focusoutHandler, this);
        }
      }
      this.rippleFn = rippleEffect(popupElement, { selector: "." + classNames.ITEM });
    };
    DropDownButton2.prototype.popupUnWireEvents = function() {
      var popupElement = this.getPopUpElement();
      if (this.createPopupOnClick) {
        EventHandler.remove(document, "mousedown touchstart", this.delegateMousedownHandler);
      }
      if (popupElement && popupElement.parentElement) {
        EventHandler.remove(popupElement, "click", this.clickHandler);
        EventHandler.remove(popupElement, "keydown", this.keyBoardHandler);
        if (this.closeActionEvents) {
          EventHandler.remove(popupElement, this.closeActionEvents, this.focusoutHandler);
        }
      }
      if (isRippleEnabled && this.rippleFn) {
        this.rippleFn();
      }
    };
    DropDownButton2.prototype.keyBoardHandler = function(e) {
      if (e.target === this.element && (e.keyCode === 9 || !e.altKey && e.keyCode === 40 || e.keyCode === 38)) {
        return;
      }
      switch (e.keyCode) {
        case 38:
        case 40:
          if (e.altKey && (e.keyCode === 38 || e.keyCode === 40)) {
            this.keyEventHandler(e);
          } else {
            this.upDownKeyHandler(e);
          }
          break;
        case 9:
        case 13:
        case 27:
        case 32:
          this.keyEventHandler(e);
          break;
      }
    };
    DropDownButton2.prototype.upDownKeyHandler = function(e) {
      if (this.target && (e.keyCode === 38 || e.keyCode === 40)) {
        return;
      }
      e.preventDefault();
      upDownKeyHandler(this.getULElement(), e.keyCode);
    };
    DropDownButton2.prototype.keyEventHandler = function(e) {
      if (this.target && (e.keyCode === 13 || e.keyCode === 9)) {
        return;
      }
      if (e.keyCode === 13 && this.activeElem[0].classList.contains("e-split-btn")) {
        this.triggerSelect(e);
        this.activeElem[0].focus();
        return;
      }
      if (e.target && e.target.className.indexOf("e-edit-template") > -1 && e.keyCode === 32) {
        return;
      }
      if (e.keyCode !== 9) {
        e.preventDefault();
      }
      if (e.keyCode === 27 || e.keyCode === 38 || e.keyCode === 9) {
        if (!this.canOpen()) {
          this.closePopup(e, this.element);
        }
      } else {
        this.clickHandler(e);
      }
    };
    DropDownButton2.prototype.getLI = function(elem) {
      return elem.tagName === "LI" ? elem : closest(elem, "li");
    };
    DropDownButton2.prototype.mousedownHandler = function(e) {
      var trgt = e.target;
      if (this.dropDown && !this.canOpen() && !(closest(trgt, '[id="' + this.getPopUpElement().id + '"]') || closest(trgt, '[id="' + this.element.id + '"]'))) {
        this.closePopup(e);
      }
    };
    DropDownButton2.prototype.focusoutHandler = function(e) {
      if (this.isPopupCreated && !this.canOpen()) {
        var liTarget = e.relatedTarget;
        if (liTarget && liTarget.className.indexOf("e-item") > -1) {
          var li = this.getLI(liTarget);
          if (li) {
            var liIdx = Array.prototype.indexOf.call(this.getULElement().children, li);
            var item = this.items[liIdx];
            if (item) {
              var selectEventArgs = { element: li, item, event: e };
              this.trigger("select", selectEventArgs);
            }
          }
        }
        this.closePopup(e);
      }
    };
    DropDownButton2.prototype.clickHandler = function(e) {
      var trgt = e.target;
      if (closest(trgt, '[id="' + this.element.id + '"]')) {
        if (!this.createPopupOnClick || this.target && this.target !== "" && !this.isColorPicker() && !this.createPopupOnClick) {
          if (this.getPopUpElement().classList.contains("e-popup-close")) {
            this.openPopUp(e);
          } else {
            this.closePopup(e);
          }
        } else if (this.isPopupCreated) {
          this.closePopup(e, this.activeElem[0]);
        } else {
          this.createPopup();
          this.openPopUp(e);
        }
      } else {
        if (closest(trgt, '[id="' + this.getPopUpElement().id + '"]')) {
          var li = this.getLI(e.target);
          if (li) {
            this.triggerSelect(e);
            this.closePopup(e, this.activeElem[0]);
          }
        }
      }
    };
    DropDownButton2.prototype.triggerSelect = function(e) {
      var eventArgs;
      var liIdx;
      var item;
      var li = this.getLI(e.target);
      if (li) {
        liIdx = Array.prototype.indexOf.call(this.getULElement().children, li);
        item = this.items[liIdx];
        if (item) {
          eventArgs = { element: li, item, event: e };
          this.trigger("select", eventArgs);
        }
      }
    };
    DropDownButton2.prototype.openPopUp = function(e) {
      var _this = this;
      if (e === void 0) {
        e = null;
      }
      var isReact = false;
      var popupElem = this.getPopUpElement();
      if (!this.target) {
        this.createItems(true);
      } else {
        if (this.activeElem.length > 1) {
          var splitButton = getComponent(this.activeElem[0], "split-btn");
          if (splitButton.isReact && popupElem.childNodes.length < 1) {
            isReact = true;
            splitButton.appendReactElement(this.getTargetElement(), this.getPopUpElement());
            this.renderReactTemplates();
          }
        } else {
          if (this.isReact && popupElem.childNodes.length < 1) {
            isReact = true;
            this.appendReactElement(this.getTargetElement(), this.getPopUpElement());
            this.renderReactTemplates();
          }
        }
      }
      var ul = this.getULElement();
      this.popupWireEvents();
      var beforeOpenArgs = { element: ul, items: this.items, event: e, cancel: false };
      this.trigger("beforeOpen", beforeOpenArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          var ul_1 = _this.getULElement();
          _this.dropDown.show(null, _this.element);
          addClass([_this.element], "e-active");
          _this.element.setAttribute("aria-expanded", "true");
          _this.element.setAttribute("aria-owns", _this.getPopUpElement().id);
          if (ul_1) {
            ul_1.focus();
          }
          if (_this.enableRtl && ul_1.parentElement.style.left !== "0px") {
            var wrapperWidth = void 0;
            if (_this.element.parentElement && _this.element.parentElement.classList.contains("e-split-btn-wrapper")) {
              wrapperWidth = _this.element.parentElement.offsetWidth;
            } else {
              wrapperWidth = _this.element.offsetWidth;
            }
            var popupRect = ul_1.parentElement.offsetWidth - wrapperWidth;
            var popupLeft = parseFloat(ul_1.parentElement.style.left) - popupRect;
            if (popupLeft < 0) {
              popupLeft = 0;
            }
            ul_1.parentElement.style.left = popupLeft + "px";
          }
          var openArgs = { element: ul_1, items: _this.items };
          _this.trigger("open", openArgs);
        }
      });
    };
    DropDownButton2.prototype.closePopup = function(e, focusEle) {
      var _this = this;
      if (e === void 0) {
        e = null;
      }
      var ul = this.getULElement();
      var beforeCloseArgs = { element: ul, items: this.items, event: e, cancel: false };
      this.trigger("beforeClose", beforeCloseArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          var popupElement = _this.getPopUpElement();
          if (popupElement) {
            EventHandler.remove(popupElement, "keydown", _this.keyBoardHandler);
          }
          _this.popupUnWireEvents();
          var ul_2 = _this.getULElement();
          var selectedLi = void 0;
          if (ul_2) {
            selectedLi = ul_2.querySelector(".e-selected");
          }
          if (selectedLi) {
            selectedLi.classList.remove("e-selected");
          }
          _this.dropDown.hide();
          removeClass(_this.activeElem, "e-active");
          _this.element.setAttribute("aria-expanded", "false");
          _this.element.removeAttribute("aria-owns");
          if (focusEle) {
            focusEle.focus();
          }
          var closeArgs = { element: ul_2, items: _this.items };
          _this.trigger("close", closeArgs);
          if (!_this.target && ul_2) {
            detach(ul_2);
          }
          if (!_this.target || _this.isColorPicker() || _this.target && !_this.isColorPicker()) {
            if (_this.createPopupOnClick) {
              _this.destroyPopup();
            }
          }
        } else {
          if (ul) {
            ul.focus();
          }
        }
      });
    };
    DropDownButton2.prototype.unWireEvents = function() {
      if (!this.createPopupOnClick) {
        EventHandler.remove(document, "mousedown touchstart", this.delegateMousedownHandler);
      }
      EventHandler.remove(this.element, "click", this.clickHandler);
      EventHandler.remove(this.element, "keydown", this.keyBoardHandler);
      if (this.isPopupCreated) {
        EventHandler.remove(this.getPopUpElement(), "click", this.clickHandler);
        EventHandler.remove(this.getPopUpElement(), "keydown", this.keyBoardHandler);
      }
      EventHandler.remove(window, "resize", this.windowResize);
    };
    DropDownButton2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var btnModel = ["content", "cssClass", "iconCss", "iconPosition", "disabled", "enableRtl"];
      this.button.setProperties(getModel(newProp, btnModel));
      var popupElement;
      if (this.isPopupCreated) {
        popupElement = this.getPopUpElement();
        this.dropDown.setProperties(getModel(newProp, ["enableRtl"]));
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "content":
            if (!this.element.querySelector("span.e-caret")) {
              this.appendArrowSpan();
            }
            break;
          case "disabled":
            if (newProp.disabled) {
              this.unWireEvents();
              if (this.isPopupCreated && !this.canOpen()) {
                this.closePopup();
              }
            } else {
              this.wireEvents();
            }
            break;
          case "cssClass":
            if (newProp.cssClass.indexOf(classNames.VERTICAL) > -1 || oldProp.cssClass.indexOf(classNames.VERTICAL) > -1) {
              if (!this.element.querySelector("span.e-caret")) {
                this.appendArrowSpan();
              }
              var arrowSpan = this.element.querySelector("span.e-caret");
              newProp.cssClass.indexOf(classNames.VERTICAL) > -1 ? classList(arrowSpan, ["e-icon-bottom"], ["e-icon-right"]) : classList(arrowSpan, ["e-icon-right"], ["e-icon-bottom"]);
            }
            if (this.isPopupCreated) {
              if (oldProp.cssClass) {
                removeClass([popupElement], oldProp.cssClass.split(" "));
              }
              if (newProp.cssClass) {
                addClass([popupElement], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
              }
            }
            break;
          case "target":
            this.dropDown.content = this.getTargetElement();
            this.dropDown.dataBind();
            break;
          case "items":
            if (this.isPopupCreated && this.getULElement()) {
              this.createItems();
            }
            break;
          case "createPopupOnClick":
            if (newProp.createPopupOnClick) {
              this.destroyPopup();
            } else {
              this.createPopup();
            }
            break;
        }
      }
    };
    DropDownButton2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate2([
      Property("")
    ], DropDownButton2.prototype, "content", void 0);
    __decorate2([
      Property("")
    ], DropDownButton2.prototype, "cssClass", void 0);
    __decorate2([
      Property(false)
    ], DropDownButton2.prototype, "disabled", void 0);
    __decorate2([
      Property("")
    ], DropDownButton2.prototype, "iconCss", void 0);
    __decorate2([
      Property("Left")
    ], DropDownButton2.prototype, "iconPosition", void 0);
    __decorate2([
      Property(true)
    ], DropDownButton2.prototype, "enableHtmlSanitizer", void 0);
    __decorate2([
      Collection([], Item)
    ], DropDownButton2.prototype, "items", void 0);
    __decorate2([
      Property(false)
    ], DropDownButton2.prototype, "createPopupOnClick", void 0);
    __decorate2([
      Property("")
    ], DropDownButton2.prototype, "target", void 0);
    __decorate2([
      Property("")
    ], DropDownButton2.prototype, "closeActionEvents", void 0);
    __decorate2([
      Event()
    ], DropDownButton2.prototype, "beforeItemRender", void 0);
    __decorate2([
      Event()
    ], DropDownButton2.prototype, "beforeOpen", void 0);
    __decorate2([
      Event()
    ], DropDownButton2.prototype, "beforeClose", void 0);
    __decorate2([
      Event()
    ], DropDownButton2.prototype, "close", void 0);
    __decorate2([
      Event()
    ], DropDownButton2.prototype, "open", void 0);
    __decorate2([
      Event()
    ], DropDownButton2.prototype, "select", void 0);
    __decorate2([
      Event()
    ], DropDownButton2.prototype, "created", void 0);
    DropDownButton2 = __decorate2([
      NotifyPropertyChanges
    ], DropDownButton2);
    return DropDownButton2;
  }(Component)
);

// node_modules/@syncfusion/ej2-splitbuttons/src/split-button/split-button.js
var __extends3 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate3 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RTL = "e-rtl";
var TAGNAME = "EJS-SPLITBUTTON";
var SplitButton = (
  /** @class */
  function(_super) {
    __extends3(SplitButton2, _super);
    function SplitButton2(options, element) {
      return _super.call(this, options, element) || this;
    }
    SplitButton2.prototype.preRender = function() {
      var ele = this.element;
      if (ele.tagName === TAGNAME) {
        var ejInstance = getValue("ej2_instances", ele);
        var btn = this.createElement("button", { attrs: { "type": "button" } });
        var wrapper = this.createElement(TAGNAME, { className: "e-" + this.getModuleName() + "-wrapper" });
        for (var idx = 0, len = ele.attributes.length; idx < len; idx++) {
          btn.setAttribute(ele.attributes[idx].nodeName, ele.attributes[idx].nodeValue);
        }
        ele.parentNode.insertBefore(wrapper, ele);
        detach(ele);
        ele = btn;
        wrapper.appendChild(ele);
        setValue("ej2_instances", ejInstance, ele);
        this.wrapper = wrapper;
        this.element = ele;
      }
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
    };
    SplitButton2.prototype.render = function() {
      this.initWrapper();
      this.createPrimaryButton();
      this.renderControl();
    };
    SplitButton2.prototype.renderControl = function() {
      this.createSecondaryButton();
      this.setActiveElem([this.element, this.secondaryBtnObj.element]);
      this.setAria();
      this.wireEvents();
      this.renderComplete();
    };
    SplitButton2.prototype.addItems = function(items, text) {
      _super.prototype.addItems.call(this, items, text);
      this.secondaryBtnObj.items = this.items;
    };
    SplitButton2.prototype.removeItems = function(items, isUniqueId) {
      _super.prototype.removeItems.call(this, items, isUniqueId);
      this.secondaryBtnObj.items = this.items;
    };
    SplitButton2.prototype.initWrapper = function() {
      if (!this.wrapper) {
        this.wrapper = this.createElement("div", { className: "e-" + this.getModuleName() + "-wrapper" });
        this.element.parentNode.insertBefore(this.wrapper, this.element);
      }
      this.element.classList.remove("e-" + this.getModuleName());
      if (this.enableRtl) {
        this.wrapper.classList.add(RTL);
      }
      if (this.cssClass) {
        addClass([this.wrapper], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
    };
    SplitButton2.prototype.createPrimaryButton = function() {
      var btnModel = {
        cssClass: this.cssClass,
        enableRtl: this.enableRtl,
        iconCss: this.iconCss,
        iconPosition: this.iconPosition,
        content: this.content,
        disabled: this.disabled
      };
      this.primaryBtnObj = new Button(btnModel);
      this.primaryBtnObj.createElement = this.createElement;
      this.primaryBtnObj.appendTo(this.element);
      this.element.classList.add("e-" + this.getModuleName());
      this.element.type = "button";
      this.wrapper.appendChild(this.element);
    };
    SplitButton2.prototype.createSecondaryButton = function() {
      var _this = this;
      var btnElem = this.createElement("button", {
        className: "e-icon-btn",
        attrs: { "tabindex": "-1" },
        id: this.element.id + "_dropdownbtn"
      });
      this.wrapper.appendChild(btnElem);
      var dropDownBtnModel = {
        cssClass: this.cssClass,
        disabled: this.disabled,
        enableRtl: this.enableRtl,
        items: this.items,
        target: this.target,
        createPopupOnClick: this.createPopupOnClick
      };
      dropDownBtnModel.beforeItemRender = function(args) {
        if (_this.createPopupOnClick) {
          _this.secondaryBtnObj.dropDown.relateTo = _this.wrapper;
          _this.dropDown = _this.secondaryBtnObj.dropDown;
        }
        _this.trigger("beforeItemRender", args);
      };
      dropDownBtnModel.open = function(args) {
        _this.trigger("open", args);
      };
      dropDownBtnModel.close = function(args) {
        _this.trigger("close", args);
      };
      dropDownBtnModel.select = function(args) {
        _this.trigger("select", args);
      };
      dropDownBtnModel.beforeOpen = function(args) {
        if (_this.createPopupOnClick && _this.items.length === 0) {
          _this.secondaryBtnObj.dropDown.relateTo = _this.wrapper;
          _this.dropDown = _this.secondaryBtnObj.dropDown;
        }
        var callBackPromise = new Deferred();
        _this.trigger("beforeOpen", args, function(observedArgs) {
          callBackPromise.resolve(observedArgs);
        });
        return callBackPromise;
      };
      dropDownBtnModel.beforeClose = function(args) {
        var callBackPromise = new Deferred();
        _this.trigger("beforeClose", args, function(observedArgs) {
          callBackPromise.resolve(observedArgs);
        });
        return callBackPromise;
      };
      this.secondaryBtnObj = new DropDownButton(dropDownBtnModel);
      this.secondaryBtnObj.createElement = this.createElement;
      this.secondaryBtnObj.appendTo(btnElem);
      if (!this.createPopupOnClick) {
        this.secondaryBtnObj.dropDown.relateTo = this.wrapper;
        this.dropDown = this.secondaryBtnObj.dropDown;
      }
      this.isPopupCreated = this.secondaryBtnObj.isPopupCreated;
      this.secondaryBtnObj.activeElem = [this.element, this.secondaryBtnObj.element];
      this.secondaryBtnObj.element.querySelector(".e-btn-icon").classList.remove("e-icon-right");
      if (this.disabled) {
        this.wrapper.classList.add("e-splitbtn-disabled");
      }
    };
    SplitButton2.prototype.setAria = function() {
      attributes(this.element, {
        "aria-expanded": "false",
        "aria-haspopup": "true",
        "aria-label": this.element.textContent ? this.element.textContent + " splitbutton" : "splitbutton",
        "aria-owns": this.element.id + "_dropdownbtn-popup"
      });
    };
    SplitButton2.prototype.getModuleName = function() {
      return "split-btn";
    };
    SplitButton2.prototype.toggle = function() {
      this.secondaryBtnObj.toggle();
    };
    SplitButton2.prototype.destroy = function() {
      var _this = this;
      var classList2 = [RTL];
      if (this.cssClass) {
        classList2 = classList2.concat(this.cssClass.split(" "));
      }
      if (this.element) {
        var element = document.getElementById(this.element.id);
        if (element && element.parentElement === this.wrapper) {
          if (this.wrapper.tagName === TAGNAME) {
            this.wrapper.innerHTML = "";
            removeClass([this.wrapper], ["e-rtl", "e-" + this.getModuleName() + "-wrapper"]);
            removeClass([this.wrapper], this.cssClass.split(" "));
          } else {
            removeClass([this.element], classList2);
            ["aria-label", "aria-haspopup", "aria-expanded", "aria-owns", "type"].forEach(function(key) {
              _this.element.removeAttribute(key);
            });
            this.wrapper.parentNode.insertBefore(this.element, this.wrapper);
            remove(this.wrapper);
          }
          this.unWireEvents();
        }
      }
      this.primaryBtnObj.destroy();
      this.secondaryBtnObj.destroy();
      _super.prototype.destroy.call(this);
      if (this.element && !this.element.getAttribute("class")) {
        this.element.removeAttribute("class");
      }
      if (this.refreshing && this.isAngular) {
        this.element = this.wrapper;
        ["e-control", "e-split-btn", "e-lib"].forEach(function(key) {
          _this.element.classList.add(key);
        });
        setValue("ej2_instances", [this], this.element);
      }
      this.wrapper = null;
    };
    SplitButton2.prototype.wireEvents = function() {
      EventHandler.add(this.element, "click", this.primaryBtnClickHandler, this);
      new KeyboardEvents(this.element, {
        keyAction: this.btnKeyBoardHandler.bind(this),
        keyConfigs: {
          altdownarrow: "alt+downarrow",
          enter: "enter"
        }
      });
    };
    SplitButton2.prototype.unWireEvents = function() {
      EventHandler.remove(this.element, "click", this.primaryBtnClickHandler);
      getInstance(this.element, KeyboardEvents).destroy();
    };
    SplitButton2.prototype.primaryBtnClickHandler = function() {
      this.trigger("click", { element: this.element });
    };
    SplitButton2.prototype.btnKeyBoardHandler = function(e) {
      switch (e.action) {
        case "altdownarrow":
          this.clickHandler(e);
          break;
        case "enter":
          this.clickHandler(e);
          if (this.getPopUpElement() && !this.getPopUpElement().classList.contains("e-popup-close")) {
            this.element.classList.remove("e-active");
            this.secondaryBtnObj.element.classList.add("e-active");
          } else {
            this.secondaryBtnObj.element.classList.remove("e-active");
          }
          break;
      }
    };
    SplitButton2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var model = ["content", "iconCss", "iconPosition", "cssClass", "disabled", "enableRtl"];
      this.primaryBtnObj.setProperties(getModel(newProp, model));
      model = [
        "beforeOpen",
        "beforeItemRender",
        "select",
        "open",
        "close",
        "cssClass",
        "disabled",
        "enableRtl",
        "createPopupOnClick"
      ];
      if (Object.keys(newProp).indexOf("items") > -1) {
        this.secondaryBtnObj.items = newProp.items;
        this.secondaryBtnObj.dataBind();
      }
      this.secondaryBtnObj.setProperties(getModel(newProp, model));
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([this.wrapper], oldProp.cssClass.split(" "));
            }
            addClass([this.wrapper], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
            break;
          case "enableRtl":
            if (newProp.enableRtl) {
              addClass([this.wrapper], RTL);
            } else {
              removeClass([this.wrapper], RTL);
            }
            break;
          case "disabled":
            if (newProp.disabled) {
              addClass([this.wrapper], "e-splitbtn-disabled");
            } else {
              removeClass([this.wrapper], "e-splitbtn-disabled");
            }
        }
      }
    };
    SplitButton2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate3([
      Property("")
    ], SplitButton2.prototype, "content", void 0);
    __decorate3([
      Property("")
    ], SplitButton2.prototype, "cssClass", void 0);
    __decorate3([
      Property(false)
    ], SplitButton2.prototype, "disabled", void 0);
    __decorate3([
      Property("")
    ], SplitButton2.prototype, "iconCss", void 0);
    __decorate3([
      Property("Left")
    ], SplitButton2.prototype, "iconPosition", void 0);
    __decorate3([
      Property(false)
    ], SplitButton2.prototype, "createPopupOnClick", void 0);
    __decorate3([
      Collection([], Item)
    ], SplitButton2.prototype, "items", void 0);
    __decorate3([
      Property("")
    ], SplitButton2.prototype, "target", void 0);
    __decorate3([
      Event()
    ], SplitButton2.prototype, "beforeItemRender", void 0);
    __decorate3([
      Event()
    ], SplitButton2.prototype, "beforeOpen", void 0);
    __decorate3([
      Event()
    ], SplitButton2.prototype, "beforeClose", void 0);
    __decorate3([
      Event()
    ], SplitButton2.prototype, "click", void 0);
    __decorate3([
      Event()
    ], SplitButton2.prototype, "close", void 0);
    __decorate3([
      Event()
    ], SplitButton2.prototype, "open", void 0);
    __decorate3([
      Event()
    ], SplitButton2.prototype, "select", void 0);
    __decorate3([
      Event()
    ], SplitButton2.prototype, "created", void 0);
    SplitButton2 = __decorate3([
      NotifyPropertyChanges
    ], SplitButton2);
    return SplitButton2;
  }(DropDownButton)
);
var Deferred = (
  /** @class */
  /* @__PURE__ */ function() {
    function Deferred2() {
      var _this = this;
      this.promise = new Promise(function(resolve, reject) {
        _this.resolve = resolve;
        _this.reject = reject;
      });
      this.catch = this.promise.catch.bind(this.promise);
      this.then = this.promise.then.bind(this.promise);
    }
    return Deferred2;
  }()
);

// node_modules/@syncfusion/ej2-splitbuttons/src/button-group/button-group.js
function createButtonGroup(selector, options, createElement2) {
  if (options === void 0) {
    options = {};
  }
  var child;
  var btnElem;
  var nextChild;
  var btnModel;
  if (isNullOrUndefined(createElement2)) {
    createElement2 = createElement;
  }
  var wrapper = document.querySelector(selector);
  addClass([wrapper], ["e-btn-group", "e-css"]);
  wrapper.setAttribute("role", "group");
  var childs = wrapper.children;
  options.buttons = options.buttons || [];
  for (var i = 0, j = 0; j < childs.length; i++, j++) {
    child = childs[j];
    btnModel = options.buttons[i];
    if (btnModel !== null) {
      if (child.tagName === "BUTTON") {
        btnElem = child;
      } else {
        btnElem = createElement2("label");
        nextChild = childs[j + 1];
        if (nextChild) {
          wrapper.insertBefore(btnElem, nextChild);
        } else {
          wrapper.appendChild(btnElem);
        }
        if (child.id) {
          btnElem.setAttribute("for", child.id);
        }
        if (btnModel && btnModel.disabled) {
          child.disabled = true;
        }
        j++;
      }
      if (options.cssClass && btnModel && !btnModel.cssClass) {
        btnModel.cssClass = options.cssClass;
      }
      new Button(btnModel || {}, btnElem);
    }
  }
  return wrapper;
}

// node_modules/@syncfusion/ej2-splitbuttons/src/progress-button/progress-button.js
var __extends4 = /* @__PURE__ */ function() {
  var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d2, b2) {
      d2.__proto__ = b2;
    } || function(d2, b2) {
      for (var p in b2)
        if (b2.hasOwnProperty(p))
          d2[p] = b2[p];
    };
    return extendStatics(d, b);
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();
var __decorate4 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var HIDESPINNER = "e-hide-spinner";
var PROGRESS = "e-progress";
var PROGRESSACTIVE = "e-progress-active";
var CONTENTCLS = "e-btn-content";
var SpinSettings = (
  /** @class */
  function(_super) {
    __extends4(SpinSettings2, _super);
    function SpinSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate4([
      Property(null)
    ], SpinSettings2.prototype, "template", void 0);
    __decorate4([
      Property(16)
    ], SpinSettings2.prototype, "width", void 0);
    __decorate4([
      Property("Left")
    ], SpinSettings2.prototype, "position", void 0);
    return SpinSettings2;
  }(ChildProperty)
);
var AnimationSettings = (
  /** @class */
  function(_super) {
    __extends4(AnimationSettings2, _super);
    function AnimationSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate4([
      Property(400)
    ], AnimationSettings2.prototype, "duration", void 0);
    __decorate4([
      Property("None")
    ], AnimationSettings2.prototype, "effect", void 0);
    __decorate4([
      Property("ease")
    ], AnimationSettings2.prototype, "easing", void 0);
    return AnimationSettings2;
  }(ChildProperty)
);
var ProgressButton = (
  /** @class */
  function(_super) {
    __extends4(ProgressButton2, _super);
    function ProgressButton2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.step = 1;
      return _this;
    }
    ProgressButton2.prototype.preRender = function() {
      _super.prototype.preRender.call(this);
    };
    ProgressButton2.prototype.render = function() {
      _super.prototype.render.call(this);
      this.init();
      this.wireEvents();
      this.setAria();
      this.renderComplete();
    };
    ProgressButton2.prototype.start = function(percent) {
      this.isPaused = false;
      this.startProgress(percent ? percent : this.percent, this.progressTime);
    };
    ProgressButton2.prototype.stop = function() {
      this.isPaused = true;
      cancelAnimationFrame(this.timerId);
    };
    ProgressButton2.prototype.progressComplete = function() {
      this.isPaused = false;
      this.finishProgress();
    };
    ProgressButton2.prototype.getModuleName = function() {
      return "progress-btn";
    };
    ProgressButton2.prototype.destroy = function() {
      var _this = this;
      var classList2 = [
        HIDESPINNER,
        PROGRESSACTIVE,
        "e-round-corner",
        "e-" + _super.prototype.getModuleName.call(this),
        "e-spin-" + this.spinSettings.position.toLowerCase()
      ];
      _super.prototype.destroy.call(this);
      this.unWireEvents();
      this.element.innerHTML = "";
      if (this.cssClass) {
        classList2 = classList2.concat(this.cssClass.split(" "));
      }
      removeClass([this.element], classList2);
      var css = this.element.getAttribute("class") ? ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow"] : ["aria-label", "aria-valuemin", "aria-valuemax", "aria-valuenow", "class"];
      css.forEach(function(key) {
        _this.element.removeAttribute(key);
      });
      if (this.disabled) {
        this.element.removeAttribute("disabled");
      }
    };
    ProgressButton2.prototype.init = function() {
      this.element.classList.add("e-" + _super.prototype.getModuleName.call(this));
      this.setContent();
      this.createSpinner();
      if (this.enableProgress) {
        this.createProgress();
      }
    };
    ProgressButton2.prototype.createSpinner = function() {
      var spinner = this.createElement("span", { className: "e-spinner" });
      this.setSpinPosition(spinner);
      createSpinner({
        target: spinner,
        width: this.spinSettings.width || 16,
        template: this.spinSettings.template
      }, this.createElement);
    };
    ProgressButton2.prototype.getSpinner = function() {
      return this.element.getElementsByClassName("e-spinner")[0];
    };
    ProgressButton2.prototype.getProgress = function() {
      return this.element.getElementsByClassName(PROGRESS)[0];
    };
    ProgressButton2.prototype.setSpinPosition = function(ele) {
      var position = this.spinSettings.position || "Left";
      if (position === "Left" || position === "Top") {
        this.element.insertBefore(ele, this.element.getElementsByClassName(CONTENTCLS)[0]);
      } else {
        this.element.appendChild(ele);
      }
      this.element.classList.add("e-spin-" + position.toLowerCase());
    };
    ProgressButton2.prototype.createProgress = function() {
      this.element.appendChild(this.createElement("span", { className: PROGRESS }));
    };
    ProgressButton2.prototype.setContent = function() {
      var cont;
      cont = this.element.innerHTML;
      if (this.enableHtmlSanitizer) {
        cont = SanitizeHtmlHelper.sanitize(this.element.innerHTML);
      }
      this.element.innerHTML = "";
      this.element.appendChild(this.createElement("span", { className: CONTENTCLS, innerHTML: cont }));
    };
    ProgressButton2.prototype.setContentIcon = function(content) {
      var contElem = this.createElement("span", { className: CONTENTCLS, innerHTML: content });
      if (this.iconCss) {
        var span = this.createElement("span", { className: "e-btn-icon " + this.iconCss });
        if (!this.element.textContent.trim()) {
          this.element.classList.add("e-icon-btn");
        } else {
          span.classList.add("e-icon-" + this.iconPosition.toLowerCase());
          if (this.iconPosition === "Top" || this.iconPosition === "Bottom") {
            this.element.classList.add("e-" + this.iconPosition.toLowerCase() + "-icon-btn");
          }
        }
        var node = contElem.childNodes[0];
        if (node && (this.iconPosition === "Left" || this.iconPosition === "Top")) {
          contElem.insertBefore(span, node);
        } else {
          contElem.appendChild(span);
        }
      }
      this.element.appendChild(contElem);
    };
    ProgressButton2.prototype.clickHandler = function() {
      if (this.element.classList.contains(PROGRESSACTIVE)) {
        return;
      }
      this.startProgress();
    };
    ProgressButton2.prototype.startProgress = function(percent, progressTime) {
      var clsList = this.element.classList;
      var isVertical = clsList.contains("e-vertical");
      clsList.add(PROGRESSACTIVE);
      if (!clsList.contains(HIDESPINNER)) {
        showSpinner(this.element.querySelector(".e-spinner"));
      }
      this.startAnimate(Date.now(), progressTime ? progressTime : 0, progressTime ? Date.now() - this.duration * 1 / 100 : Date.now(), percent ? percent : 0, 0, this.step, 0, isVertical);
      this.startContAnimate();
    };
    ProgressButton2.prototype.startAnimate = function(timestamp, progressTime, prevTime, percent, prevPercent, step, prevProgressTime, isVertical) {
      var _this = this;
      try {
        var timeDiff = timestamp - prevTime;
        var stepTime = this.duration * step / 100;
        var timeDiffBuffer_1 = timeDiff ? timeDiff < stepTime ? timeDiff - stepTime : timeDiff % stepTime : 0;
        this.progressTime = progressTime = progressTime + timeDiff - timeDiffBuffer_1;
        prevTime = timestamp - timeDiffBuffer_1;
        percent = percent + (timeDiff - timeDiffBuffer_1) / this.duration * 100;
        prevPercent = (progressTime - prevProgressTime) % stepTime === 0 || percent === 100 ? percent : prevPercent;
        var args = { percent: prevPercent, currentDuration: progressTime, step };
        this.eIsVertical = isVertical;
        if (percent === 0) {
          this.trigger("begin", args, function(observedArgs) {
            _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
          });
        } else if (percent === 100 || progressTime === this.duration) {
          this.trigger("end", args, function(observedArgs) {
            _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
          });
        } else {
          this.trigger("progress", args, function(observedArgs) {
            _this.successCallback(observedArgs, percent, prevPercent, progressTime, prevProgressTime, timeDiffBuffer_1, prevTime);
          });
        }
      } catch (e) {
        cancelAnimationFrame(this.timerId);
        this.trigger("fail", e);
      }
    };
    ProgressButton2.prototype.successCallback = function(args, perc, pPerc, prgTim, pPrgTim, timDif, pTim) {
      var _this = this;
      var percent = perc;
      var prevPercent = pPerc;
      var timeDiffBuffer = timDif;
      var progressTime = prgTim;
      var prevProgressTime = pPrgTim;
      var prevTime = pTim;
      var isVertical = this.eIsVertical;
      if (percent !== args.percent && args.percent !== prevPercent) {
        percent = args.percent;
      }
      this.percent = percent;
      this.step = args.step;
      if ((progressTime - prevProgressTime) % (this.duration * args.step / 100) === 0 || percent === 100) {
        this.timerId = requestAnimationFrame(function() {
          if (_this.enableProgress && _this.getProgress()) {
            _this.getProgress().style[isVertical ? "height" : "width"] = percent + "%";
          }
          _this.element.setAttribute("aria-valuenow", percent.toString());
        });
        prevPercent = percent;
        prevProgressTime = progressTime;
      }
      if (!this.isPaused) {
        if (progressTime < this.duration && percent < 100) {
          this.interval = window.setTimeout(function() {
            _this.startAnimate(Date.now(), progressTime, prevTime, percent, prevPercent, args.step, prevProgressTime, isVertical);
          }, this.duration / 100 - timeDiffBuffer);
        } else {
          this.interval = window.setTimeout(function() {
            _this.progressTime = _this.percent = 0;
            if (_this.enableProgress && _this.getProgress()) {
              _this.getProgress().style[isVertical ? "height" : "width"] = "0%";
            }
            _this.element.setAttribute("aria-valuenow", "0");
            _this.hideSpin();
          }, 100);
        }
      }
    };
    ProgressButton2.prototype.startContAnimate = function() {
      var _this = this;
      var ele = this.element.getElementsByClassName(CONTENTCLS)[0];
      if (this.animationSettings.effect !== "None") {
        new Animation({}).animate(ele, {
          duration: this.animationSettings.duration === 0 && animationMode === "Enable" ? 400 : this.animationSettings.duration,
          name: "Progress" + this.animationSettings.effect,
          timingFunction: this.animationSettings.easing,
          begin: function() {
            if (_this.spinSettings.position === "Center") {
              _this.setSpinnerSize();
            }
          },
          end: function() {
            ele.classList.add("e-animate-end");
          }
        });
      } else if (this.spinSettings.position === "Center") {
        this.setSpinnerSize();
      }
    };
    ProgressButton2.prototype.finishProgress = function() {
      var clsList = this.element.classList;
      var isVertical = clsList.contains("e-vertical");
      clsList.add(PROGRESSACTIVE);
      var count = 100;
      for (var i = this.percent; i < count; i++) {
        i += 10;
        if (i > 100) {
          i = 100;
        }
        if (this.enableProgress && this.getProgress()) {
          this.getProgress().style[isVertical ? "height" : "width"] = this.percent < 100 ? i + "%" : "100%";
        }
      }
      this.element.setAttribute("aria-valuenow", "0");
      this.hideSpin();
      var args = { step: this.step, currentDuration: this.progressTime, percent: 100 };
      clearTimeout(this.interval);
      this.trigger("end", args);
      this.progressTime = this.percent = 0;
    };
    ProgressButton2.prototype.setSpinnerSize = function() {
      var ele = this.element.getElementsByClassName(CONTENTCLS)[0];
      var spinner = this.getSpinner();
      spinner.style.width = Math.max(spinner.offsetWidth, ele.offsetWidth) + "px";
      spinner.style.height = Math.max(spinner.offsetHeight, ele.offsetHeight) + "px";
      ele.classList.add("e-cont-animate");
    };
    ProgressButton2.prototype.hideSpin = function() {
      var cont = this.element.getElementsByClassName(CONTENTCLS)[0];
      if (!this.element.classList.contains(HIDESPINNER)) {
        hideSpinner(this.element.querySelector(".e-spinner"));
      }
      this.element.classList.remove(PROGRESSACTIVE);
      if (this.animationSettings.effect !== "None") {
        cont.classList.remove("e-animate-end");
      }
      if (this.spinSettings.position === "Center") {
        var ele = this.getSpinner();
        cont.classList.remove("e-cont-animate");
        ele.style.width = "auto";
        ele.style.height = "auto";
      }
    };
    ProgressButton2.prototype.setIconSpan = function() {
      var cont = this.element.getElementsByClassName(CONTENTCLS)[0];
      var iconSpan = this.element.getElementsByClassName("e-btn-icon")[0];
      if (cont.childNodes[0] && (this.iconPosition === "Left" || this.iconPosition === "Top")) {
        cont.insertBefore(iconSpan, cont.childNodes[0]);
      } else {
        cont.appendChild(iconSpan);
      }
    };
    ProgressButton2.prototype.setAria = function() {
      attributes(this.element, {
        "aria-label": this.element.textContent + " progress"
      });
    };
    ProgressButton2.prototype.wireEvents = function() {
      EventHandler.add(this.element, "click", this.clickHandler, this);
    };
    ProgressButton2.prototype.unWireEvents = function() {
      EventHandler.remove(this.element, "click", this.clickHandler);
    };
    ProgressButton2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var ele = this.element;
      var isSpinning = false;
      var clsList = this.element.querySelector(".e-spinner-pane").classList;
      if (clsList.contains("e-spin-show")) {
        isSpinning = true;
      }
      _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "content":
            this.setContent();
            this.createSpinner();
            if (isSpinning) {
              showSpinner(this.element.querySelector(".e-spinner"));
              isSpinning = false;
            }
            if (this.enableProgress) {
              this.createProgress();
            }
            ele.setAttribute("aria-label", ele.textContent + " progress");
            break;
          case "iconCss":
            if (!oldProp.iconCss) {
              this.setIconSpan();
            }
            break;
          case "iconPosition":
            this.setIconSpan();
            break;
          case "enableProgress":
            if (newProp.enableProgress) {
              this.createProgress();
            } else {
              remove(this.getProgress());
            }
            break;
          case "spinSettings":
            if (newProp.spinSettings.position) {
              ele.classList.remove("e-spin-" + oldProp.spinSettings.position.toLowerCase());
              this.setSpinPosition(this.getSpinner());
            }
            if (newProp.spinSettings.template || newProp.spinSettings.width) {
              ele.removeChild(this.getSpinner());
              this.createSpinner();
            }
            break;
        }
      }
    };
    ProgressButton2.prototype.focusIn = function() {
      this.element.focus();
    };
    __decorate4([
      Property(false)
    ], ProgressButton2.prototype, "enableProgress", void 0);
    __decorate4([
      Property(2e3)
    ], ProgressButton2.prototype, "duration", void 0);
    __decorate4([
      Property("Left")
    ], ProgressButton2.prototype, "iconPosition", void 0);
    __decorate4([
      Property("")
    ], ProgressButton2.prototype, "iconCss", void 0);
    __decorate4([
      Property(false)
    ], ProgressButton2.prototype, "disabled", void 0);
    __decorate4([
      Property(false)
    ], ProgressButton2.prototype, "isPrimary", void 0);
    __decorate4([
      Property("")
    ], ProgressButton2.prototype, "cssClass", void 0);
    __decorate4([
      Property("")
    ], ProgressButton2.prototype, "content", void 0);
    __decorate4([
      Property(false)
    ], ProgressButton2.prototype, "isToggle", void 0);
    __decorate4([
      Property(true)
    ], ProgressButton2.prototype, "enableHtmlSanitizer", void 0);
    __decorate4([
      Complex({}, SpinSettings)
    ], ProgressButton2.prototype, "spinSettings", void 0);
    __decorate4([
      Complex({}, AnimationSettings)
    ], ProgressButton2.prototype, "animationSettings", void 0);
    __decorate4([
      Event()
    ], ProgressButton2.prototype, "created", void 0);
    __decorate4([
      Event()
    ], ProgressButton2.prototype, "begin", void 0);
    __decorate4([
      Event()
    ], ProgressButton2.prototype, "progress", void 0);
    __decorate4([
      Event()
    ], ProgressButton2.prototype, "end", void 0);
    __decorate4([
      Event()
    ], ProgressButton2.prototype, "fail", void 0);
    ProgressButton2 = __decorate4([
      NotifyPropertyChanges
    ], ProgressButton2);
    return ProgressButton2;
  }(Button)
);

export {
  getModel,
  upDownKeyHandler,
  setBlankIconStyle,
  Item,
  DropDownButton,
  SplitButton,
  Deferred,
  createButtonGroup,
  SpinSettings,
  AnimationSettings,
  ProgressButton
};
//# sourceMappingURL=chunk-AS5YIVX4.js.map
