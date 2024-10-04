import {
  Button
} from "./chunk-2S3DOBG7.js";
import {
  Animation,
  Browser,
  ChildProperty,
  Collection,
  Complex,
  Component,
  Draggable,
  Event,
  EventHandler,
  L10n,
  NotifyPropertyChanges,
  Property,
  SanitizeHtmlHelper,
  Touch,
  addClass,
  animationMode,
  append,
  attributes,
  classList,
  closest,
  compile,
  createElement,
  detach,
  extend,
  formatUnit,
  getUniqueID,
  isBlazor,
  isNullOrUndefined,
  prepend,
  remove,
  removeClass,
  select,
  selectAll,
  setStyleAttribute
} from "./chunk-HEJJC6ZW.js";

// node_modules/@syncfusion/ej2-popups/src/common/position.js
var elementRect;
var popupRect;
var element;
var parentDocument;
var fixedParent = false;
function calculateRelativeBasedPosition(anchor, element2) {
  var fixedElement = false;
  var anchorPos = { left: 0, top: 0 };
  var tempAnchor = anchor;
  if (!anchor || !element2) {
    return anchorPos;
  }
  if (isNullOrUndefined(element2.offsetParent) && element2.style.position === "fixed") {
    fixedElement = true;
  }
  while ((element2.offsetParent || fixedElement) && anchor && element2.offsetParent !== anchor) {
    anchorPos.left += anchor.offsetLeft;
    anchorPos.top += anchor.offsetTop;
    anchor = anchor.offsetParent;
  }
  anchor = tempAnchor;
  while ((element2.offsetParent || fixedElement) && anchor && element2.offsetParent !== anchor) {
    anchorPos.left -= anchor.scrollLeft;
    anchorPos.top -= anchor.scrollTop;
    anchor = anchor.parentElement;
  }
  return anchorPos;
}
function calculatePosition(currentElement, positionX, positionY, parentElement, targetValues) {
  popupRect = void 0;
  popupRect = targetValues;
  fixedParent = parentElement ? true : false;
  if (!currentElement) {
    return { left: 0, top: 0 };
  }
  if (!positionX) {
    positionX = "left";
  }
  if (!positionY) {
    positionY = "top";
  }
  parentDocument = currentElement.ownerDocument;
  element = currentElement;
  var pos = { left: 0, top: 0 };
  return updatePosition(positionX.toLowerCase(), positionY.toLowerCase(), pos);
}
function setPosx(value, pos) {
  pos.left = value;
}
function setPosy(value, pos) {
  pos.top = value;
}
function updatePosition(posX, posY, pos) {
  elementRect = element.getBoundingClientRect();
  switch (posY + posX) {
    case "topcenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementTop(), pos);
      break;
    case "topright":
      setPosx(getElementRight(), pos);
      setPosy(getElementTop(), pos);
      break;
    case "centercenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "centerright":
      setPosx(getElementRight(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "centerleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementVCenter(), pos);
      break;
    case "bottomcenter":
      setPosx(getElementHCenter(), pos);
      setPosy(getElementBottom(), pos);
      break;
    case "bottomright":
      setPosx(getElementRight(), pos);
      setPosy(getElementBottom(), pos);
      break;
    case "bottomleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementBottom(), pos);
      break;
    default:
    case "topleft":
      setPosx(getElementLeft(), pos);
      setPosy(getElementTop(), pos);
      break;
  }
  element = null;
  return pos;
}
function getBodyScrollTop() {
  return parentDocument.documentElement.scrollTop || parentDocument.body.scrollTop;
}
function getBodyScrollLeft() {
  return parentDocument.documentElement.scrollLeft || parentDocument.body.scrollLeft;
}
function getElementBottom() {
  return fixedParent ? elementRect.bottom : elementRect.bottom + getBodyScrollTop();
}
function getElementVCenter() {
  return getElementTop() + elementRect.height / 2;
}
function getElementTop() {
  return fixedParent ? elementRect.top : elementRect.top + getBodyScrollTop();
}
function getElementLeft() {
  return elementRect.left + getBodyScrollLeft();
}
function getElementRight() {
  var popupWidth = element && (element.classList.contains("e-date-wrapper") || element.classList.contains("e-datetime-wrapper") || element.classList.contains("e-ddl") && element.classList.contains("e-rtl") || element.classList.contains("e-date-range-wrapper")) ? popupRect ? popupRect.width : 0 : popupRect && elementRect.width >= popupRect.width ? popupRect.width : 0;
  return elementRect.right + getBodyScrollLeft() - popupWidth;
}
function getElementHCenter() {
  return getElementLeft() + elementRect.width / 2;
}

// node_modules/@syncfusion/ej2-popups/src/common/collision.js
var parentDocument2;
var targetContainer;
function fit(element2, viewPortElement, axis, position) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  if (axis === void 0) {
    axis = { X: false, Y: false };
  }
  if (!axis.Y && !axis.X) {
    return { left: 0, top: 0 };
  }
  var elemData = element2.getBoundingClientRect();
  targetContainer = viewPortElement;
  parentDocument2 = element2.ownerDocument;
  if (!position) {
    position = calculatePosition(element2, "left", "top");
  }
  if (axis.X) {
    var containerWidth = targetContainer ? getTargetContainerWidth() : getViewPortWidth();
    var containerLeft = ContainerLeft();
    var containerRight = ContainerRight();
    var overLeft = containerLeft - position.left;
    var overRight = position.left + elemData.width - containerRight;
    if (elemData.width > containerWidth) {
      if (overLeft > 0 && overRight <= 0) {
        position.left = containerRight - elemData.width;
      } else if (overRight > 0 && overLeft <= 0) {
        position.left = containerLeft;
      } else {
        position.left = overLeft > overRight ? containerRight - elemData.width : containerLeft;
      }
    } else if (overLeft > 0) {
      position.left += overLeft;
    } else if (overRight > 0) {
      position.left -= overRight;
    }
  }
  if (axis.Y) {
    var containerHeight = targetContainer ? getTargetContainerHeight() : getViewPortHeight();
    var containerTop = ContainerTop();
    var containerBottom = ContainerBottom();
    var overTop = containerTop - position.top;
    var overBottom = position.top + elemData.height - containerBottom;
    if (elemData.height > containerHeight) {
      if (overTop > 0 && overBottom <= 0) {
        position.top = containerBottom - elemData.height;
      } else if (overBottom > 0 && overTop <= 0) {
        position.top = containerTop;
      } else {
        position.top = overTop > overBottom ? containerBottom - elemData.height : containerTop;
      }
    } else if (overTop > 0) {
      position.top += overTop;
    } else if (overBottom > 0) {
      position.top -= overBottom;
    }
  }
  return position;
}
function isCollide(element2, viewPortElement, x, y) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  var elemOffset = calculatePosition(element2, "left", "top");
  if (x) {
    elemOffset.left = x;
  }
  if (y) {
    elemOffset.top = y;
  }
  var data = [];
  targetContainer = viewPortElement;
  parentDocument2 = element2.ownerDocument;
  var elementRect2 = element2.getBoundingClientRect();
  var top = elemOffset.top;
  var left = elemOffset.left;
  var right = elemOffset.left + elementRect2.width;
  var bottom = elemOffset.top + elementRect2.height;
  var yAxis = topCollideCheck(top, bottom);
  var xAxis = leftCollideCheck(left, right);
  if (yAxis.topSide) {
    data.push("top");
  }
  if (xAxis.rightSide) {
    data.push("right");
  }
  if (xAxis.leftSide) {
    data.push("left");
  }
  if (yAxis.bottomSide) {
    data.push("bottom");
  }
  return data;
}
function flip(element2, target, offsetX, offsetY, positionX, positionY, viewPortElement, axis, fixedParent2) {
  if (viewPortElement === void 0) {
    viewPortElement = null;
  }
  if (axis === void 0) {
    axis = { X: true, Y: true };
  }
  if (!target || !element2 || !positionX || !positionY || !axis.X && !axis.Y) {
    return;
  }
  var tEdge = {
    TL: null,
    TR: null,
    BL: null,
    BR: null
  }, eEdge = {
    TL: null,
    TR: null,
    BL: null,
    BR: null
    /* eslint-enable */
  };
  var elementRect2;
  if (window.getComputedStyle(element2).display === "none") {
    var oldVisibility = element2.style.visibility;
    element2.style.visibility = "hidden";
    element2.style.display = "block";
    elementRect2 = element2.getBoundingClientRect();
    element2.style.removeProperty("display");
    element2.style.visibility = oldVisibility;
  } else {
    elementRect2 = element2.getBoundingClientRect();
  }
  var pos = {
    posX: positionX,
    posY: positionY,
    offsetX,
    offsetY,
    position: { left: 0, top: 0 }
  };
  targetContainer = viewPortElement;
  parentDocument2 = target.ownerDocument;
  updateElementData(target, tEdge, pos, fixedParent2, elementRect2);
  setPosition(eEdge, pos, elementRect2);
  if (axis.X) {
    leftFlip(target, eEdge, tEdge, pos, elementRect2, true);
  }
  if (axis.Y && tEdge.TL.top > -1) {
    topFlip(target, eEdge, tEdge, pos, elementRect2, true);
  }
  setPopup(element2, pos, elementRect2);
}
function setPopup(element2, pos, elementRect2) {
  var left = 0;
  var top = 0;
  if (element2.offsetParent != null && (getComputedStyle(element2.offsetParent).position === "absolute" || getComputedStyle(element2.offsetParent).position === "relative")) {
    var data = calculatePosition(element2.offsetParent, "left", "top", false, elementRect2);
    left = data.left;
    top = data.top;
  }
  var scaleX = 1;
  var scaleY = 1;
  var tranformElement = getTransformElement(element2);
  if (tranformElement) {
    var transformStyle = getComputedStyle(tranformElement).transform;
    if (transformStyle !== "none") {
      var matrix = new DOMMatrix(transformStyle);
      scaleX = matrix.a;
      scaleY = matrix.d;
    }
  }
  element2.style.top = pos.position.top / scaleY + pos.offsetY - top / scaleY + "px";
  element2.style.left = pos.position.left / scaleX + pos.offsetX - left / scaleX + "px";
}
function getTransformElement(element2) {
  while (element2) {
    var transform = window.getComputedStyle(element2).transform;
    if (transform && transform !== "none") {
      return element2;
    }
    if (element2 == document.body) {
      return null;
    }
    element2 = element2.offsetParent || element2.parentElement;
  }
  return null;
}
function updateElementData(target, edge, pos, fixedParent2, elementRect2) {
  pos.position = calculatePosition(target, pos.posX, pos.posY, fixedParent2, elementRect2);
  edge.TL = calculatePosition(target, "left", "top", fixedParent2, elementRect2);
  edge.TR = calculatePosition(target, "right", "top", fixedParent2, elementRect2);
  edge.BR = calculatePosition(target, "left", "bottom", fixedParent2, elementRect2);
  edge.BL = calculatePosition(target, "right", "bottom", fixedParent2, elementRect2);
}
function setPosition(eStatus, pos, elementRect2) {
  eStatus.TL = { top: pos.position.top + pos.offsetY, left: pos.position.left + pos.offsetX };
  eStatus.TR = { top: eStatus.TL.top, left: eStatus.TL.left + elementRect2.width };
  eStatus.BL = {
    top: eStatus.TL.top + elementRect2.height,
    left: eStatus.TL.left
  };
  eStatus.BR = {
    top: eStatus.TL.top + elementRect2.height,
    left: eStatus.TL.left + elementRect2.width
  };
}
function leftCollideCheck(left, right) {
  var leftSide = false, rightSide = false;
  if (left - getBodyScrollLeft2() < ContainerLeft()) {
    leftSide = true;
  }
  if (right > ContainerRight()) {
    rightSide = true;
  }
  return { leftSide, rightSide };
}
function leftFlip(target, edge, tEdge, pos, elementRect2, deepCheck) {
  var collideSide = leftCollideCheck(edge.TL.left, edge.TR.left);
  if (tEdge.TL.left - getBodyScrollLeft2() <= ContainerLeft()) {
    collideSide.leftSide = false;
  }
  if (tEdge.TR.left > ContainerRight()) {
    collideSide.rightSide = false;
  }
  if (collideSide.leftSide && !collideSide.rightSide || !collideSide.leftSide && collideSide.rightSide) {
    if (pos.posX === "right") {
      pos.posX = "left";
    } else {
      pos.posX = "right";
    }
    pos.offsetX = pos.offsetX + elementRect2.width;
    pos.offsetX = -1 * pos.offsetX;
    pos.position = calculatePosition(target, pos.posX, pos.posY, false);
    setPosition(edge, pos, elementRect2);
    if (deepCheck) {
      leftFlip(target, edge, tEdge, pos, elementRect2, false);
    }
  }
}
function topFlip(target, edge, tEdge, pos, elementRect2, deepCheck) {
  var collideSide = topCollideCheck(edge.TL.top, edge.BL.top);
  if (tEdge.TL.top - getBodyScrollTop2() <= ContainerTop()) {
    collideSide.topSide = false;
  }
  if (tEdge.BL.top >= ContainerBottom() && target.getBoundingClientRect().bottom < window.innerHeight) {
    collideSide.bottomSide = false;
  }
  if (collideSide.topSide && !collideSide.bottomSide || !collideSide.topSide && collideSide.bottomSide) {
    if (pos.posY === "top") {
      pos.posY = "bottom";
    } else {
      pos.posY = "top";
    }
    pos.offsetY = pos.offsetY + elementRect2.height;
    pos.offsetY = -1 * pos.offsetY;
    pos.position = calculatePosition(target, pos.posX, pos.posY, false, elementRect2);
    setPosition(edge, pos, elementRect2);
    if (deepCheck) {
      topFlip(target, edge, tEdge, pos, elementRect2, false);
    }
  }
}
function topCollideCheck(top, bottom) {
  var topSide = false, bottomSide = false;
  if (top - getBodyScrollTop2() < ContainerTop()) {
    topSide = true;
  }
  if (bottom > ContainerBottom()) {
    bottomSide = true;
  }
  return { topSide, bottomSide };
}
function getTargetContainerWidth() {
  return targetContainer.getBoundingClientRect().width;
}
function getTargetContainerHeight() {
  return targetContainer.getBoundingClientRect().height;
}
function getTargetContainerLeft() {
  return targetContainer.getBoundingClientRect().left;
}
function getTargetContainerTop() {
  return targetContainer.getBoundingClientRect().top;
}
function ContainerTop() {
  if (targetContainer) {
    return getTargetContainerTop();
  }
  return 0;
}
function ContainerLeft() {
  if (targetContainer) {
    return getTargetContainerLeft();
  }
  return 0;
}
function ContainerRight() {
  if (targetContainer) {
    return getBodyScrollLeft2() + getTargetContainerLeft() + getTargetContainerWidth();
  }
  return getBodyScrollLeft2() + getViewPortWidth();
}
function ContainerBottom() {
  if (targetContainer) {
    return getBodyScrollTop2() + getTargetContainerTop() + getTargetContainerHeight();
  }
  return getBodyScrollTop2() + getViewPortHeight();
}
function getBodyScrollTop2() {
  return parentDocument2.documentElement.scrollTop || parentDocument2.body.scrollTop;
}
function getBodyScrollLeft2() {
  return parentDocument2.documentElement.scrollLeft || parentDocument2.body.scrollLeft;
}
function getViewPortHeight() {
  return window.innerHeight;
}
function getViewPortWidth() {
  var windowWidth = window.innerWidth;
  var documentReact = document.documentElement.getBoundingClientRect();
  var offsetWidth = isNullOrUndefined(document.documentElement) ? 0 : documentReact.width;
  return windowWidth - (windowWidth - offsetWidth);
}
function destroy() {
  targetContainer = null;
  parentDocument2 = null;
}

// node_modules/@syncfusion/ej2-popups/src/popup/popup.js
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
var PositionData = (
  /** @class */
  function(_super) {
    __extends(PositionData2, _super);
    function PositionData2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
      Property("left")
    ], PositionData2.prototype, "X", void 0);
    __decorate([
      Property("top")
    ], PositionData2.prototype, "Y", void 0);
    return PositionData2;
  }(ChildProperty)
);
var CLASSNAMES = {
  ROOT: "e-popup",
  RTL: "e-rtl",
  OPEN: "e-popup-open",
  CLOSE: "e-popup-close"
};
var Popup = (
  /** @class */
  function(_super) {
    __extends(Popup2, _super);
    function Popup2(element2, options) {
      return _super.call(this, options, element2) || this;
    }
    Popup2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            setStyleAttribute(this.element, { "width": formatUnit(newProp.width) });
            break;
          case "height":
            setStyleAttribute(this.element, { "height": formatUnit(newProp.height) });
            break;
          case "zIndex":
            setStyleAttribute(this.element, { "zIndex": newProp.zIndex });
            break;
          case "enableRtl":
            this.setEnableRtl();
            break;
          case "position":
          case "relateTo":
            this.refreshPosition();
            break;
          case "offsetX": {
            var x = newProp.offsetX - oldProp.offsetX;
            this.element.style.left = (parseInt(this.element.style.left, 10) + x).toString() + "px";
            break;
          }
          case "offsetY": {
            var y = newProp.offsetY - oldProp.offsetY;
            this.element.style.top = (parseInt(this.element.style.top, 10) + y).toString() + "px";
            break;
          }
          case "content":
            this.setContent();
            break;
          case "actionOnScroll":
            if (newProp.actionOnScroll !== "none") {
              this.wireScrollEvents();
            } else {
              this.unwireScrollEvents();
            }
            break;
        }
      }
    };
    Popup2.prototype.getModuleName = function() {
      return "popup";
    };
    Popup2.prototype.resolveCollision = function() {
      this.checkCollision();
    };
    Popup2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Popup2.prototype.destroy = function() {
      if (this.element.classList.contains("e-popup-open")) {
        this.unwireEvents();
      }
      this.element.classList.remove(CLASSNAMES.ROOT, CLASSNAMES.RTL, CLASSNAMES.OPEN, CLASSNAMES.CLOSE);
      this.content = null;
      this.relateTo = null;
      destroy();
      _super.prototype.destroy.call(this);
    };
    Popup2.prototype.render = function() {
      this.element.classList.add(CLASSNAMES.ROOT);
      var styles = {};
      if (this.zIndex !== 1e3) {
        styles.zIndex = this.zIndex;
      }
      if (this.width !== "auto") {
        styles.width = formatUnit(this.width);
      }
      if (this.height !== "auto") {
        styles.height = formatUnit(this.height);
      }
      setStyleAttribute(this.element, styles);
      this.fixedParent = false;
      this.setEnableRtl();
      this.setContent();
    };
    Popup2.prototype.wireEvents = function() {
      if (Browser.isDevice) {
        EventHandler.add(window, "orientationchange", this.orientationOnChange, this);
      }
      if (this.actionOnScroll !== "none") {
        this.wireScrollEvents();
      }
    };
    Popup2.prototype.wireScrollEvents = function() {
      if (this.getRelateToElement()) {
        for (var _i = 0, _a = this.getScrollableParent(this.getRelateToElement()); _i < _a.length; _i++) {
          var parent_1 = _a[_i];
          EventHandler.add(parent_1, "scroll", this.scrollRefresh, this);
        }
      }
    };
    Popup2.prototype.unwireEvents = function() {
      if (Browser.isDevice) {
        EventHandler.remove(window, "orientationchange", this.orientationOnChange);
      }
      if (this.actionOnScroll !== "none") {
        this.unwireScrollEvents();
      }
    };
    Popup2.prototype.unwireScrollEvents = function() {
      if (this.getRelateToElement()) {
        for (var _i = 0, _a = this.getScrollableParent(this.getRelateToElement()); _i < _a.length; _i++) {
          var parent_2 = _a[_i];
          EventHandler.remove(parent_2, "scroll", this.scrollRefresh);
        }
      }
    };
    Popup2.prototype.getRelateToElement = function() {
      var relateToElement = this.relateTo === "" || isNullOrUndefined(this.relateTo) ? document.body : this.relateTo;
      this.setProperties({ relateTo: relateToElement }, true);
      return typeof this.relateTo === "string" ? document.querySelector(this.relateTo) : this.relateTo;
    };
    Popup2.prototype.scrollRefresh = function(e) {
      if (this.actionOnScroll === "reposition") {
        if (!isNullOrUndefined(this.element) && !(this.element.offsetParent === e.target || this.element.offsetParent && this.element.offsetParent.tagName === "BODY" && e.target.parentElement == null)) {
          this.refreshPosition();
        }
      } else if (this.actionOnScroll === "hide") {
        this.hide();
      }
      if (this.actionOnScroll !== "none") {
        if (this.getRelateToElement()) {
          var targetVisible = this.isElementOnViewport(this.getRelateToElement(), e.target);
          if (!targetVisible && !this.targetInvisibleStatus) {
            this.trigger("targetExitViewport");
            this.targetInvisibleStatus = true;
          } else if (targetVisible) {
            this.targetInvisibleStatus = false;
          }
        }
      }
    };
    Popup2.prototype.isElementOnViewport = function(relateToElement, scrollElement) {
      var scrollParents = this.getScrollableParent(relateToElement);
      for (var parent_3 = 0; parent_3 < scrollParents.length; parent_3++) {
        if (this.isElementVisible(relateToElement, scrollParents[parent_3])) {
          continue;
        } else {
          return false;
        }
      }
      return true;
    };
    Popup2.prototype.isElementVisible = function(relateToElement, scrollElement) {
      var rect = this.checkGetBoundingClientRect(relateToElement);
      if (!rect.height || !rect.width) {
        return false;
      }
      if (!isNullOrUndefined(this.checkGetBoundingClientRect(scrollElement))) {
        var parent_4 = scrollElement.getBoundingClientRect();
        return !(rect.bottom < parent_4.top) && (!(rect.bottom > parent_4.bottom) && (!(rect.right > parent_4.right) && !(rect.left < parent_4.left)));
      } else {
        var win = window;
        var windowView = {
          top: win.scrollY,
          left: win.scrollX,
          right: win.scrollX + win.outerWidth,
          bottom: win.scrollY + win.outerHeight
        };
        var off = calculatePosition(relateToElement);
        var ele = {
          top: off.top,
          left: off.left,
          right: off.left + rect.width,
          bottom: off.top + rect.height
        };
        var elementView = {
          top: windowView.bottom - ele.top,
          left: windowView.right - ele.left,
          bottom: ele.bottom - windowView.top,
          right: ele.right - windowView.left
        };
        return elementView.top > 0 && elementView.left > 0 && elementView.right > 0 && elementView.bottom > 0;
      }
    };
    Popup2.prototype.preRender = function() {
    };
    Popup2.prototype.setEnableRtl = function() {
      this.reposition();
      if (this.enableRtl) {
        this.element.classList.add(CLASSNAMES.RTL);
      } else {
        this.element.classList.remove(CLASSNAMES.RTL);
      }
    };
    Popup2.prototype.setContent = function() {
      if (!isNullOrUndefined(this.content)) {
        this.element.innerHTML = "";
        if (typeof this.content === "string") {
          this.element.textContent = this.content;
        } else {
          var relateToElem = this.getRelateToElement();
          var props = this.content.props;
          if (!relateToElem.classList.contains("e-dropdown-btn") || isNullOrUndefined(props)) {
            this.element.appendChild(this.content);
          }
        }
      }
    };
    Popup2.prototype.orientationOnChange = function() {
      var _this = this;
      setTimeout(function() {
        _this.refreshPosition();
      }, 200);
    };
    Popup2.prototype.refreshPosition = function(target, collision) {
      if (!isNullOrUndefined(target)) {
        this.checkFixedParent(target);
      }
      this.reposition();
      if (!collision) {
        this.checkCollision();
      }
    };
    Popup2.prototype.reposition = function() {
      var pos;
      var position;
      var relateToElement = this.getRelateToElement();
      if (typeof this.position.X === "number" && typeof this.position.Y === "number") {
        pos = { left: this.position.X, top: this.position.Y };
      } else if (typeof this.position.X === "string" && typeof this.position.Y === "number" || typeof this.position.X === "number" && typeof this.position.Y === "string") {
        var parentDisplay = void 0;
        var display = this.element.style.display;
        this.element.style.display = "block";
        if (this.element.classList.contains("e-dlg-modal")) {
          parentDisplay = this.element.parentElement.style.display;
          this.element.parentElement.style.display = "block";
        }
        position = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY);
        if (typeof this.position.X === "string") {
          pos = { left: position.left, top: this.position.Y };
        } else {
          pos = { left: this.position.X, top: position.top };
        }
        this.element.style.display = display;
        if (this.element.classList.contains("e-dlg-modal")) {
          this.element.parentElement.style.display = parentDisplay;
        }
      } else if (relateToElement) {
        var height = this.element.clientHeight;
        var display = this.element.style.display;
        this.element.style.display = "block";
        pos = this.getAnchorPosition(relateToElement, this.element, this.position, this.offsetX, this.offsetY, height);
        this.element.style.display = display;
      } else {
        pos = { left: 0, top: 0 };
      }
      if (!isNullOrUndefined(pos)) {
        this.element.style.left = pos.left + "px";
        this.element.style.top = pos.top + "px";
      }
    };
    Popup2.prototype.checkGetBoundingClientRect = function(ele) {
      var eleRect;
      try {
        eleRect = ele.getBoundingClientRect();
        return eleRect;
      } catch (error) {
        return null;
      }
    };
    Popup2.prototype.getAnchorPosition = function(anchorEle, ele, position, offsetX, offsetY, height) {
      if (height === void 0) {
        height = 0;
      }
      var eleRect = this.checkGetBoundingClientRect(ele);
      var anchorRect = this.checkGetBoundingClientRect(anchorEle);
      if (isNullOrUndefined(eleRect) || isNullOrUndefined(anchorRect)) {
        return null;
      }
      var anchor = anchorEle;
      var anchorPos = { left: 0, top: 0 };
      if (ele.offsetParent && ele.offsetParent.tagName === "BODY" && anchorEle.tagName === "BODY") {
        anchorPos = calculatePosition(anchorEle);
      } else {
        if (ele.classList.contains("e-dlg-modal") && anchor.tagName !== "BODY") {
          ele = ele.parentElement;
        }
        anchorPos = calculateRelativeBasedPosition(anchor, ele);
      }
      switch (position.X) {
        default:
        case "left":
          break;
        case "center":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.left += window.innerWidth / 2 - eleRect.width / 2;
          } else if (this.targetType === "container") {
            anchorPos.left += anchorRect.width / 2 - eleRect.width / 2;
          } else {
            anchorPos.left += anchorRect.width / 2;
          }
          break;
        case "right":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.left += window.innerWidth - eleRect.width;
          } else if (this.targetType === "container") {
            var scaleX = 1;
            var tranformElement = getTransformElement(ele);
            if (tranformElement) {
              var transformStyle = getComputedStyle(tranformElement).transform;
              if (transformStyle !== "none") {
                var matrix = new DOMMatrix(transformStyle);
                scaleX = matrix.a;
              }
            }
            anchorPos.left += (anchorRect.width - eleRect.width) / scaleX;
          } else {
            anchorPos.left += anchorRect.width;
          }
          break;
      }
      switch (position.Y) {
        default:
        case "top":
          break;
        case "center":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.top += window.innerHeight / 2 - eleRect.height / 2;
          } else if (this.targetType === "container") {
            anchorPos.top += anchorRect.height / 2 - eleRect.height / 2;
          } else {
            anchorPos.top += anchorRect.height / 2;
          }
          break;
        case "bottom":
          if (ele.classList.contains("e-dlg-modal") && anchor.tagName === "BODY" && this.targetType === "container") {
            anchorPos.top += window.innerHeight - eleRect.height;
          } else if (this.targetType === "container" && !ele.classList.contains("e-dialog")) {
            anchorPos.top += anchorRect.height - eleRect.height;
          } else if (this.targetType === "container" && ele.classList.contains("e-dialog")) {
            anchorPos.top += anchorRect.height - height;
          } else {
            anchorPos.top += anchorRect.height;
          }
          break;
      }
      anchorPos.left += offsetX;
      anchorPos.top += offsetY;
      return anchorPos;
    };
    Popup2.prototype.callFlip = function(param) {
      var relateToElement = this.getRelateToElement();
      flip(this.element, relateToElement, this.offsetX, this.offsetY, this.position.X, this.position.Y, this.viewPortElement, param, this.fixedParent);
    };
    Popup2.prototype.callFit = function(param) {
      if (isCollide(this.element, this.viewPortElement).length !== 0) {
        if (isNullOrUndefined(this.viewPortElement)) {
          var data = fit(this.element, this.viewPortElement, param);
          if (param.X) {
            this.element.style.left = data.left + "px";
          }
          if (param.Y) {
            this.element.style.top = data.top + "px";
          }
        } else {
          var elementRect2 = this.checkGetBoundingClientRect(this.element);
          var viewPortRect = this.checkGetBoundingClientRect(this.viewPortElement);
          if (isNullOrUndefined(elementRect2) || isNullOrUndefined(viewPortRect)) {
            return null;
          }
          if (param && param.Y === true) {
            if (viewPortRect.top > elementRect2.top) {
              this.element.style.top = "0px";
            } else if (viewPortRect.bottom < elementRect2.bottom) {
              this.element.style.top = parseInt(this.element.style.top, 10) - (elementRect2.bottom - viewPortRect.bottom) + "px";
            }
          }
          if (param && param.X === true) {
            if (viewPortRect.right < elementRect2.right) {
              this.element.style.left = parseInt(this.element.style.left, 10) - (elementRect2.right - viewPortRect.right) + "px";
            } else if (viewPortRect.left > elementRect2.left) {
              this.element.style.left = parseInt(this.element.style.left, 10) + (viewPortRect.left - elementRect2.left) + "px";
            }
          }
        }
      }
    };
    Popup2.prototype.checkCollision = function() {
      var horz = this.collision.X;
      var vert = this.collision.Y;
      if (horz === "none" && vert === "none") {
        return;
      }
      if (horz === "flip" && vert === "flip") {
        this.callFlip({ X: true, Y: true });
      } else if (horz === "fit" && vert === "fit") {
        this.callFit({ X: true, Y: true });
      } else {
        if (horz === "flip") {
          this.callFlip({ X: true, Y: false });
        } else if (vert === "flip") {
          this.callFlip({ Y: true, X: false });
        }
        if (horz === "fit") {
          this.callFit({ X: true, Y: false });
        } else if (vert === "fit") {
          this.callFit({ X: false, Y: true });
        }
      }
    };
    Popup2.prototype.show = function(animationOptions, relativeElement) {
      var _this = this;
      var relateToElement = this.getRelateToElement();
      if (relateToElement.classList.contains("e-filemanager")) {
        this.fmDialogContainer = this.element.getElementsByClassName("e-file-select-wrap")[0];
      }
      this.wireEvents();
      if (!isNullOrUndefined(this.fmDialogContainer) && Browser.isIos) {
        this.fmDialogContainer.style.display = "block";
      }
      if (this.zIndex === 1e3 || !isNullOrUndefined(relativeElement)) {
        var zIndexElement = isNullOrUndefined(relativeElement) ? this.element : relativeElement;
        this.zIndex = getZindexPartial(zIndexElement);
        setStyleAttribute(this.element, { "zIndex": this.zIndex });
      }
      animationOptions = !isNullOrUndefined(animationOptions) && typeof animationOptions === "object" ? animationOptions : this.showAnimation;
      if (this.collision.X !== "none" || this.collision.Y !== "none") {
        removeClass([this.element], CLASSNAMES.CLOSE);
        addClass([this.element], CLASSNAMES.OPEN);
        this.checkCollision();
        removeClass([this.element], CLASSNAMES.OPEN);
        addClass([this.element], CLASSNAMES.CLOSE);
      }
      if (!isNullOrUndefined(animationOptions)) {
        animationOptions.begin = function() {
          if (!_this.isDestroyed) {
            removeClass([_this.element], CLASSNAMES.CLOSE);
            addClass([_this.element], CLASSNAMES.OPEN);
          }
        };
        animationOptions.end = function() {
          if (!_this.isDestroyed) {
            _this.trigger("open");
          }
        };
        new Animation(animationOptions).animate(this.element);
      } else {
        removeClass([this.element], CLASSNAMES.CLOSE);
        addClass([this.element], CLASSNAMES.OPEN);
        this.trigger("open");
      }
    };
    Popup2.prototype.hide = function(animationOptions) {
      var _this = this;
      animationOptions = !isNullOrUndefined(animationOptions) && typeof animationOptions === "object" ? animationOptions : this.hideAnimation;
      if (!isNullOrUndefined(animationOptions)) {
        animationOptions.end = function() {
          if (!_this.isDestroyed) {
            removeClass([_this.element], CLASSNAMES.OPEN);
            addClass([_this.element], CLASSNAMES.CLOSE);
            _this.trigger("close");
          }
        };
        new Animation(animationOptions).animate(this.element);
      } else {
        removeClass([this.element], CLASSNAMES.OPEN);
        addClass([this.element], CLASSNAMES.CLOSE);
        this.trigger("close");
      }
      this.unwireEvents();
    };
    Popup2.prototype.getScrollableParent = function(element2) {
      this.checkFixedParent(element2);
      return getScrollableParent(element2, this.fixedParent);
    };
    Popup2.prototype.checkFixedParent = function(element2) {
      var parent = element2.parentElement;
      while (parent && parent.tagName !== "HTML") {
        var parentStyle = getComputedStyle(parent);
        if ((parentStyle.position === "fixed" || parentStyle.position === "sticky") && !isNullOrUndefined(this.element) && this.element.offsetParent && this.element.offsetParent.tagName === "BODY" && getComputedStyle(this.element.offsetParent).overflow !== "hidden") {
          this.element.style.top = window.scrollY > parseInt(this.element.style.top, 10) ? formatUnit(window.scrollY - parseInt(this.element.style.top, 10)) : formatUnit(parseInt(this.element.style.top, 10) - window.scrollY);
          this.element.style.position = "fixed";
          this.fixedParent = true;
        }
        parent = parent.parentElement;
        if (!isNullOrUndefined(this.element) && isNullOrUndefined(this.element.offsetParent) && parentStyle.position === "fixed" && this.element.style.position === "fixed") {
          this.fixedParent = true;
        }
      }
    };
    __decorate([
      Property("auto")
    ], Popup2.prototype, "height", void 0);
    __decorate([
      Property("auto")
    ], Popup2.prototype, "width", void 0);
    __decorate([
      Property(null)
    ], Popup2.prototype, "content", void 0);
    __decorate([
      Property("container")
    ], Popup2.prototype, "targetType", void 0);
    __decorate([
      Property(null)
    ], Popup2.prototype, "viewPortElement", void 0);
    __decorate([
      Property({ X: "none", Y: "none" })
    ], Popup2.prototype, "collision", void 0);
    __decorate([
      Property("")
    ], Popup2.prototype, "relateTo", void 0);
    __decorate([
      Complex({}, PositionData)
    ], Popup2.prototype, "position", void 0);
    __decorate([
      Property(0)
    ], Popup2.prototype, "offsetX", void 0);
    __decorate([
      Property(0)
    ], Popup2.prototype, "offsetY", void 0);
    __decorate([
      Property(1e3)
    ], Popup2.prototype, "zIndex", void 0);
    __decorate([
      Property(false)
    ], Popup2.prototype, "enableRtl", void 0);
    __decorate([
      Property("reposition")
    ], Popup2.prototype, "actionOnScroll", void 0);
    __decorate([
      Property(null)
    ], Popup2.prototype, "showAnimation", void 0);
    __decorate([
      Property(null)
    ], Popup2.prototype, "hideAnimation", void 0);
    __decorate([
      Event()
    ], Popup2.prototype, "open", void 0);
    __decorate([
      Event()
    ], Popup2.prototype, "close", void 0);
    __decorate([
      Event()
    ], Popup2.prototype, "targetExitViewport", void 0);
    Popup2 = __decorate([
      NotifyPropertyChanges
    ], Popup2);
    return Popup2;
  }(Component)
);
function getScrollableParent(element2, fixedParent2) {
  var eleStyle = getComputedStyle(element2);
  var scrollParents = [];
  var overflowRegex = /(auto|scroll)/;
  var parent = element2.parentElement;
  while (parent && parent.tagName !== "HTML") {
    var parentStyle = getComputedStyle(parent);
    if (!(eleStyle.position === "absolute" && parentStyle.position === "static") && overflowRegex.test(parentStyle.overflow + parentStyle.overflowY + parentStyle.overflowX)) {
      scrollParents.push(parent);
    }
    parent = parent.parentElement;
  }
  if (!fixedParent2) {
    scrollParents.push(document);
  }
  return scrollParents;
}
function getZindexPartial(element2) {
  var parent = element2.parentElement;
  var parentZindex = [];
  while (parent) {
    if (parent.tagName !== "BODY") {
      var index = document.defaultView.getComputedStyle(parent, null).getPropertyValue("z-index");
      var position = document.defaultView.getComputedStyle(parent, null).getPropertyValue("position");
      if (index !== "auto" && position !== "static") {
        parentZindex.push(index);
      }
      parent = parent.parentElement;
    } else {
      break;
    }
  }
  var childrenZindex = [];
  for (var i = 0; i < document.body.children.length; i++) {
    if (!element2.isEqualNode(document.body.children[i])) {
      var index = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue("z-index");
      var position = document.defaultView.getComputedStyle(document.body.children[i], null).getPropertyValue("position");
      if (index !== "auto" && position !== "static") {
        childrenZindex.push(index);
      }
    }
  }
  childrenZindex.push("999");
  var siblingsZindex = [];
  if (!isNullOrUndefined(element2.parentElement) && element2.parentElement.tagName !== "BODY") {
    var childNodes = [].slice.call(element2.parentElement.children);
    for (var i = 0; i < childNodes.length; i++) {
      if (!element2.isEqualNode(childNodes[i])) {
        var index = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue("z-index");
        var position = document.defaultView.getComputedStyle(childNodes[i], null).getPropertyValue("position");
        if (index !== "auto" && position !== "static") {
          siblingsZindex.push(index);
        }
      }
    }
  }
  var finalValue = parentZindex.concat(childrenZindex, siblingsZindex);
  var currentZindexValue = Math.max.apply(Math, finalValue) + 1;
  return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}
function getMaxZindex(tagName) {
  if (tagName === void 0) {
    tagName = ["*"];
  }
  var maxZindex = [];
  for (var i = 0; i < tagName.length; i++) {
    var elements = document.getElementsByTagName(tagName[i]);
    for (var i_1 = 0; i_1 < elements.length; i_1++) {
      var index = document.defaultView.getComputedStyle(elements[i_1], null).getPropertyValue("z-index");
      var position = document.defaultView.getComputedStyle(elements[i_1], null).getPropertyValue("position");
      if (index !== "auto" && position !== "static") {
        maxZindex.push(index);
      }
    }
  }
  var currentZindexValue = Math.max.apply(Math, maxZindex) + 1;
  return currentZindexValue > 2147483647 ? 2147483647 : currentZindexValue;
}

// node_modules/@syncfusion/ej2-popups/src/common/resize.js
var elementClass = ["north-west", "north", "north-east", "west", "east", "south-west", "south", "south-east"];
var RESIZE_HANDLER = "e-resize-handle";
var FOCUSED_HANDLER = "e-focused-handle";
var DIALOG_RESIZABLE = "e-dlg-resizable";
var RESTRICT_LEFT = ["e-restrict-left"];
var RESIZE_WITHIN_VIEWPORT = "e-resize-viewport";
var dialogBorderResize = ["north", "west", "east", "south"];
var targetElement;
var selectedHandler;
var originalWidth = 0;
var originalHeight = 0;
var originalX = 0;
var originalY = 0;
var originalMouseX = 0;
var originalMouseY = 0;
var minHeight;
var maxHeight;
var minWidth;
var maxWidth;
var containerElement;
var resizeStart = null;
var resize = null;
var resizeEnd = null;
var resizeWestWidth;
var setLeft = true;
var previousWidth = 0;
var setWidth = true;
function createResize(args) {
  resizeStart = args.resizeBegin;
  resize = args.resizing;
  resizeEnd = args.resizeComplete;
  targetElement = getDOMElement(args.element);
  containerElement = getDOMElement(args.boundary);
  var directions = args.direction.split(" ");
  for (var i = 0; i < directions.length; i++) {
    if (dialogBorderResize.indexOf(directions[i]) >= 0 && directions[i]) {
      setBorderResizeElm(directions[i]);
    } else if (directions[i].trim() !== "") {
      var resizeHandler = createElement("div", { className: "e-icons " + RESIZE_HANDLER + " e-" + directions[i] });
      targetElement.appendChild(resizeHandler);
    }
  }
  minHeight = args.minHeight;
  minWidth = args.minWidth;
  maxWidth = args.maxWidth;
  maxHeight = args.maxHeight;
  if (args.proxy && args.proxy.element && args.proxy.element.classList.contains("e-dialog")) {
    wireEvents(args.proxy);
  } else {
    wireEvents();
  }
}
function setBorderResizeElm(direction) {
  calculateValues();
  var borderBottom = createElement("span", {
    attrs: {
      "unselectable": "on",
      "contenteditable": "false"
    }
  });
  borderBottom.setAttribute("class", "e-dialog-border-resize e-" + direction);
  if (direction === "south") {
    borderBottom.style.height = "2px";
    borderBottom.style.width = "100%";
    borderBottom.style.bottom = "0px";
    borderBottom.style.left = "0px";
  }
  if (direction === "north") {
    borderBottom.style.height = "2px";
    borderBottom.style.width = "100%";
    borderBottom.style.top = "0px";
    borderBottom.style.left = "0px";
  }
  if (direction === "east") {
    borderBottom.style.height = "100%";
    borderBottom.style.width = "2px";
    borderBottom.style.right = "0px";
    borderBottom.style.top = "0px";
  }
  if (direction === "west") {
    borderBottom.style.height = "100%";
    borderBottom.style.width = "2px";
    borderBottom.style.left = "0px";
    borderBottom.style.top = "0px";
  }
  targetElement.appendChild(borderBottom);
}
function getDOMElement(element2) {
  var domElement;
  if (!isNullOrUndefined(element2)) {
    if (typeof element2 === "string") {
      domElement = document.querySelector(element2);
    } else {
      domElement = element2;
    }
  }
  return domElement;
}
function wireEvents(args) {
  var context = args || this;
  var resizers = targetElement.querySelectorAll("." + RESIZE_HANDLER);
  for (var i = 0; i < resizers.length; i++) {
    selectedHandler = resizers[i];
    EventHandler.add(selectedHandler, "mousedown", onMouseDown, context);
    var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
    EventHandler.add(selectedHandler, eventName, onTouchStart, context);
  }
  var borderResizers = targetElement.querySelectorAll(".e-dialog-border-resize");
  if (!isNullOrUndefined(borderResizers)) {
    for (var i = 0; i < borderResizers.length; i++) {
      selectedHandler = borderResizers[i];
      EventHandler.add(selectedHandler, "mousedown", onMouseDown, context);
      var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
      EventHandler.add(selectedHandler, eventName, onTouchStart, context);
    }
  }
}
function getEventType(e) {
  return e.indexOf("mouse") > -1 ? "mouse" : "touch";
}
function onMouseDown(e) {
  e.preventDefault();
  targetElement = e.target.parentElement;
  calculateValues();
  originalMouseX = e.pageX;
  originalMouseY = e.pageY;
  e.target.classList.add(FOCUSED_HANDLER);
  if (!isNullOrUndefined(resizeStart)) {
    var proxy_1 = this;
    if (resizeStart(e, proxy_1) === true) {
      return;
    }
  }
  if (this.targetEle && targetElement && targetElement.querySelector("." + DIALOG_RESIZABLE)) {
    containerElement = this.target === "body" ? null : this.targetEle;
    maxWidth = this.targetEle.clientWidth;
    maxHeight = this.targetEle.clientHeight;
  }
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  EventHandler.add(target, "mousemove", onMouseMove, this);
  EventHandler.add(document, "mouseup", onMouseUp, this);
  for (var i = 0; i < RESTRICT_LEFT.length; i++) {
    if (targetElement.classList.contains(RESTRICT_LEFT[i])) {
      setLeft = false;
    } else {
      setLeft = true;
    }
  }
}
function onMouseUp(e) {
  var touchMoveEvent = Browser.info.name === "msie" ? "pointermove" : "touchmove";
  var touchEndEvent = Browser.info.name === "msie" ? "pointerup" : "touchend";
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  var eventName = Browser.info.name === "msie" ? "pointerdown" : "touchstart";
  EventHandler.remove(target, "mousemove", onMouseMove);
  EventHandler.remove(target, touchMoveEvent, onMouseMove);
  EventHandler.remove(target, eventName, onMouseMove);
  if (!isNullOrUndefined(document.body.querySelector("." + FOCUSED_HANDLER))) {
    document.body.querySelector("." + FOCUSED_HANDLER).classList.remove(FOCUSED_HANDLER);
  }
  if (!isNullOrUndefined(resizeEnd)) {
    var proxy_2 = this;
    resizeEnd(e, proxy_2);
  }
  EventHandler.remove(document, "mouseup", onMouseUp);
  EventHandler.remove(document, touchEndEvent, onMouseUp);
}
function calculateValues() {
  originalWidth = parseFloat(getComputedStyle(targetElement, null).getPropertyValue("width").replace("px", ""));
  originalHeight = parseFloat(getComputedStyle(targetElement, null).getPropertyValue("height").replace("px", ""));
  originalX = targetElement.getBoundingClientRect().left;
  originalY = targetElement.getBoundingClientRect().top;
}
function onTouchStart(e) {
  targetElement = e.target.parentElement;
  calculateValues();
  var dialogResizeElement = targetElement.classList.contains("e-dialog");
  if ((e.target.classList.contains(RESIZE_HANDLER) || e.target.classList.contains("e-dialog-border-resize")) && dialogResizeElement) {
    e.target.classList.add(FOCUSED_HANDLER);
  }
  var coordinates = e.touches ? e.changedTouches[0] : e;
  originalMouseX = coordinates.pageX;
  originalMouseY = coordinates.pageY;
  if (!isNullOrUndefined(resizeStart)) {
    var proxy_3 = this;
    if (resizeStart(e, proxy_3) === true) {
      return;
    }
  }
  var touchMoveEvent = Browser.info.name === "msie" ? "pointermove" : "touchmove";
  var touchEndEvent = Browser.info.name === "msie" ? "pointerup" : "touchend";
  var target = isNullOrUndefined(containerElement) ? document : containerElement;
  EventHandler.add(target, touchMoveEvent, onMouseMove, this);
  EventHandler.add(document, touchEndEvent, onMouseUp, this);
}
function onMouseMove(e) {
  if (e.target.classList.contains(RESIZE_HANDLER) && e.target.classList.contains(FOCUSED_HANDLER)) {
    selectedHandler = e.target;
  } else if (!isNullOrUndefined(document.body.querySelector("." + FOCUSED_HANDLER))) {
    selectedHandler = document.body.querySelector("." + FOCUSED_HANDLER);
  }
  if (!isNullOrUndefined(selectedHandler)) {
    var resizeTowards = "";
    for (var i = 0; i < elementClass.length; i++) {
      if (selectedHandler.classList.contains("e-" + elementClass[i])) {
        resizeTowards = elementClass[i];
      }
    }
    if (!isNullOrUndefined(resize)) {
      var proxy_4 = this;
      resize(e, proxy_4);
    }
    switch (resizeTowards) {
      case "south":
        resizeSouth(e);
        break;
      case "north":
        resizeNorth(e);
        break;
      case "west":
        resizeWest(e);
        break;
      case "east":
        resizeEast(e);
        break;
      case "south-east":
        resizeSouth(e);
        resizeEast(e);
        break;
      case "south-west":
        resizeSouth(e);
        resizeWest(e);
        break;
      case "north-east":
        resizeNorth(e);
        resizeEast(e);
        break;
      case "north-west":
        resizeNorth(e);
        resizeWest(e);
        break;
      default:
        break;
    }
  }
}
function getClientRectValues(element2) {
  return element2.getBoundingClientRect();
}
function resizeSouth(e) {
  var documentHeight = document.documentElement.clientHeight;
  var calculateValue = false;
  var coordinates = e.touches ? e.changedTouches[0] : e;
  var currentpageY = coordinates.pageY;
  var targetRectValues = getClientRectValues(targetElement);
  var containerRectValues;
  if (!isNullOrUndefined(containerElement)) {
    containerRectValues = getClientRectValues(containerElement);
  }
  if (!isNullOrUndefined(containerElement)) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && (documentHeight - currentpageY >= 0 || targetRectValues.top < 0)) {
    calculateValue = true;
  }
  var calculatedHeight = originalHeight + (currentpageY - originalMouseY);
  calculatedHeight = calculatedHeight > minHeight ? calculatedHeight : minHeight;
  var containerTop = 0;
  if (!isNullOrUndefined(containerElement)) {
    containerTop = containerRectValues.top;
  }
  var borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetHeight - containerElement.clientHeight;
  var topWithoutborder = targetRectValues.top - containerTop - borderValue / 2;
  topWithoutborder = topWithoutborder < 0 ? 0 : topWithoutborder;
  if (targetRectValues.top > 0 && topWithoutborder + calculatedHeight > maxHeight) {
    calculateValue = false;
    if (targetElement.classList.contains(RESIZE_WITHIN_VIEWPORT)) {
      return;
    }
    targetElement.style.height = maxHeight - parseInt(topWithoutborder.toString(), 10) + "px";
    return;
  }
  var targetTop = 0;
  if (calculateValue) {
    if (targetRectValues.top < 0 && documentHeight + (targetRectValues.height + targetRectValues.top) > 0) {
      targetTop = targetRectValues.top;
      if (calculatedHeight + targetTop <= 30) {
        calculatedHeight = targetRectValues.height - (targetRectValues.height + targetRectValues.top) + 30;
      }
    }
    if (calculatedHeight + targetRectValues.top >= maxHeight) {
      targetElement.style.height = targetRectValues.height + (documentHeight - (targetRectValues.height + targetRectValues.top)) + "px";
    }
    var calculatedTop = isNullOrUndefined(containerElement) ? targetTop : topWithoutborder;
    if (calculatedHeight >= minHeight && calculatedHeight + calculatedTop <= maxHeight) {
      targetElement.style.height = calculatedHeight + "px";
    }
  }
}
function resizeNorth(e) {
  var calculateValue = false;
  var boundaryRectValues;
  var pageY = getEventType(e.type) === "mouse" ? e.pageY : e.touches[0].pageY;
  var targetRectValues = getClientRectValues(targetElement);
  if (!isNullOrUndefined(containerElement)) {
    boundaryRectValues = getClientRectValues(containerElement);
  }
  if (!isNullOrUndefined(containerElement) && targetRectValues.top - boundaryRectValues.top > 0) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && pageY > 0) {
    calculateValue = true;
  }
  var currentHeight = originalHeight - (pageY - originalMouseY);
  if (calculateValue) {
    if (currentHeight >= minHeight && currentHeight <= maxHeight) {
      var containerTop = 0;
      if (!isNullOrUndefined(containerElement)) {
        containerTop = boundaryRectValues.top;
      }
      var top_1 = originalY - containerTop + (pageY - originalMouseY);
      top_1 = top_1 > 0 ? top_1 : 1;
      targetElement.style.height = currentHeight + "px";
      targetElement.style.top = top_1 + "px";
    }
  }
}
function resizeWest(e) {
  var documentWidth = document.documentElement.clientWidth;
  var calculateValue = false;
  var rectValues;
  if (!isNullOrUndefined(containerElement)) {
    rectValues = getClientRectValues(containerElement);
  }
  var pageX = getEventType(e.type) === "mouse" ? e.pageX : e.touches[0].pageX;
  var targetRectValues = getClientRectValues(targetElement);
  var borderValue = isNullOrUndefined(containerElement) ? 0 : containerElement.offsetWidth - containerElement.clientWidth;
  var left = isNullOrUndefined(containerElement) ? 0 : rectValues.left;
  var containerWidth = isNullOrUndefined(containerElement) ? 0 : rectValues.width;
  if (isNullOrUndefined(resizeWestWidth)) {
    if (!isNullOrUndefined(containerElement)) {
      resizeWestWidth = targetRectValues.left - left - borderValue / 2 + targetRectValues.width;
      resizeWestWidth = resizeWestWidth + (containerWidth - borderValue - resizeWestWidth);
    } else {
      resizeWestWidth = documentWidth;
    }
  }
  if (!isNullOrUndefined(containerElement) && Math.floor(targetRectValues.left - rectValues.left + targetRectValues.width + (rectValues.right - targetRectValues.right)) - borderValue <= maxWidth) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && pageX >= 0) {
    calculateValue = true;
  }
  var calculatedWidth = originalWidth - (pageX - originalMouseX);
  if (setLeft) {
    calculatedWidth = calculatedWidth > resizeWestWidth ? resizeWestWidth : calculatedWidth;
  }
  if (calculateValue) {
    if (calculatedWidth >= minWidth && calculatedWidth <= maxWidth) {
      var containerLeft = 0;
      if (!isNullOrUndefined(containerElement)) {
        containerLeft = rectValues.left;
      }
      var left_1 = originalX - containerLeft + (pageX - originalMouseX);
      left_1 = left_1 > 0 ? left_1 : 1;
      if (calculatedWidth !== previousWidth && setWidth) {
        targetElement.style.width = calculatedWidth + "px";
      }
      if (setLeft) {
        targetElement.style.left = left_1 + "px";
        if (left_1 === 1) {
          setWidth = false;
        } else {
          setWidth = true;
        }
      }
    }
  }
  previousWidth = calculatedWidth;
}
function resizeEast(e) {
  var documentWidth = document.documentElement.clientWidth;
  var calculateValue = false;
  var containerRectValues;
  if (!isNullOrUndefined(containerElement)) {
    containerRectValues = getClientRectValues(containerElement);
  }
  var coordinates = e.touches ? e.changedTouches[0] : e;
  var pageX = coordinates.pageX;
  var targetRectValues = getClientRectValues(targetElement);
  if (!isNullOrUndefined(containerElement) && (targetRectValues.left - containerRectValues.left + targetRectValues.width <= maxWidth || targetRectValues.right - containerRectValues.left >= targetRectValues.width)) {
    calculateValue = true;
  } else if (isNullOrUndefined(containerElement) && documentWidth - pageX > 0) {
    calculateValue = true;
  }
  var calculatedWidth = originalWidth + (pageX - originalMouseX);
  var containerLeft = 0;
  if (!isNullOrUndefined(containerElement)) {
    containerLeft = containerRectValues.left;
  }
  if (targetRectValues.left - containerLeft + calculatedWidth > maxWidth) {
    calculateValue = false;
    if (targetElement.classList.contains(RESIZE_WITHIN_VIEWPORT)) {
      return;
    }
    targetElement.style.width = maxWidth - (targetRectValues.left - containerLeft) + "px";
  }
  if (calculateValue) {
    if (calculatedWidth >= minWidth && calculatedWidth <= maxWidth) {
      targetElement.style.width = calculatedWidth + "px";
    }
  }
}
function setMinHeight(minimumHeight) {
  minHeight = minimumHeight;
}
function setMaxWidth(value) {
  maxWidth = value;
}
function setMaxHeight(value) {
  maxHeight = value;
}
function removeResize() {
  var handlers = targetElement.querySelectorAll("." + RESIZE_HANDLER);
  for (var i = 0; i < handlers.length; i++) {
    detach(handlers[i]);
  }
  var borderResizers = targetElement.querySelectorAll(".e-dialog-border-resize");
  if (!isNullOrUndefined(borderResizers)) {
    for (var i = 0; i < borderResizers.length; i++) {
      detach(borderResizers[i]);
    }
  }
}

// node_modules/@syncfusion/ej2-popups/src/dialog/dialog.js
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
var ButtonProps = (
  /** @class */
  function(_super) {
    __extends2(ButtonProps2, _super);
    function ButtonProps2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate2([
      Property(true)
    ], ButtonProps2.prototype, "isFlat", void 0);
    __decorate2([
      Property()
    ], ButtonProps2.prototype, "buttonModel", void 0);
    __decorate2([
      Property("Button")
    ], ButtonProps2.prototype, "type", void 0);
    __decorate2([
      Event()
    ], ButtonProps2.prototype, "click", void 0);
    return ButtonProps2;
  }(ChildProperty)
);
var AnimationSettings = (
  /** @class */
  function(_super) {
    __extends2(AnimationSettings2, _super);
    function AnimationSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate2([
      Property("Fade")
    ], AnimationSettings2.prototype, "effect", void 0);
    __decorate2([
      Property(400)
    ], AnimationSettings2.prototype, "duration", void 0);
    __decorate2([
      Property(0)
    ], AnimationSettings2.prototype, "delay", void 0);
    return AnimationSettings2;
  }(ChildProperty)
);
var ROOT = "e-dialog";
var RTL = "e-rtl";
var DLG_HEADER_CONTENT = "e-dlg-header-content";
var DLG_HEADER = "e-dlg-header";
var DLG_FOOTER_CONTENT = "e-footer-content";
var MODAL_DLG = "e-dlg-modal";
var DLG_CONTENT = "e-dlg-content";
var DLG_CLOSE_ICON = "e-icon-dlg-close";
var DLG_OVERLAY = "e-dlg-overlay";
var DLG_TARGET = "e-dlg-target";
var DLG_CONTAINER = "e-dlg-container";
var SCROLL_DISABLED = "e-scroll-disabled";
var DLG_PRIMARY_BUTTON = "e-primary";
var ICON = "e-icons";
var POPUP_ROOT = "e-popup";
var DEVICE = "e-device";
var FULLSCREEN = "e-dlg-fullscreen";
var DLG_CLOSE_ICON_BTN = "e-dlg-closeicon-btn";
var DLG_HIDE = "e-popup-close";
var DLG_SHOW = "e-popup-open";
var DLG_UTIL_DEFAULT_TITLE = "Information";
var DLG_UTIL_ROOT = "e-scroll-disabled";
var DLG_UTIL_ALERT = "e-alert-dialog";
var DLG_UTIL_CONFIRM = "e-confirm-dialog";
var DLG_RESIZABLE = "e-dlg-resizable";
var DLG_RESTRICT_LEFT_VALUE = "e-restrict-left";
var DLG_RESTRICT_WIDTH_VALUE = "e-resize-viewport";
var DLG_REF_ELEMENT = "e-dlg-ref-element";
var DLG_USER_ACTION_CLOSED = "user action";
var DLG_CLOSE_ICON_CLOSED = "close icon";
var DLG_ESCAPE_CLOSED = "escape";
var DLG_OVERLAYCLICK_CLOSED = "overlayClick";
var DLG_DRAG = "e-draggable";
var Dialog = (
  /** @class */
  function(_super) {
    __extends2(Dialog2, _super);
    function Dialog2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.needsID = true;
      return _this;
    }
    Dialog2.prototype.render = function() {
      this.initialize();
      this.initRender();
      this.wireEvents();
      if (this.width === "100%") {
        this.element.style.width = "";
      }
      if (this.minHeight !== "") {
        this.element.style.minHeight = formatUnit(this.minHeight);
      }
      if (this.enableResize) {
        this.setResize();
        if (this.animationSettings.effect === "None") {
          this.getMinHeight();
        }
      }
      this.renderComplete();
    };
    Dialog2.prototype.initializeValue = function() {
      this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
    };
    Dialog2.prototype.preRender = function() {
      var _this = this;
      this.initializeValue();
      this.headerContent = null;
      this.allowMaxHeight = true;
      this.preventVisibility = true;
      this.clonedEle = this.element.cloneNode(true);
      this.closeIconClickEventHandler = function(event) {
        _this.dlgClosedBy = DLG_CLOSE_ICON_CLOSED;
        _this.hide(event);
      };
      this.dlgOverlayClickEventHandler = function(event) {
        _this.dlgClosedBy = DLG_OVERLAYCLICK_CLOSED;
        event.preventFocus = false;
        _this.trigger("overlayClick", event, function(overlayClickEventArgs) {
          if (!overlayClickEventArgs.preventFocus) {
            _this.focusContent();
          }
          _this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
        });
      };
      var localeText = { close: "Close" };
      this.l10n = new L10n("dialog", localeText, this.locale);
      this.checkPositionData();
      if (isNullOrUndefined(this.target)) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.target = document.body;
        this.isProtectedOnChange = prevOnChange;
      }
    };
    Dialog2.prototype.updatePersistData = function() {
      if (this.enablePersistence) {
        this.setProperties({
          width: parseFloat(this.element.style.width),
          height: parseFloat(this.element.style.height),
          position: { X: parseFloat(this.dragObj.element.style.left), Y: parseFloat(this.dragObj.element.style.top) }
        }, true);
      }
    };
    Dialog2.prototype.isNumberValue = function(value) {
      var isNumber = /^[-+]?\d*\.?\d+$/.test(value);
      return isNumber;
    };
    Dialog2.prototype.checkPositionData = function() {
      if (!isNullOrUndefined(this.position)) {
        if (!isNullOrUndefined(this.position.X) && typeof this.position.X !== "number") {
          var isNumber = this.isNumberValue(this.position.X);
          if (isNumber) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.position.X = parseFloat(this.position.X);
            this.isProtectedOnChange = prevOnChange;
          }
        }
        if (!isNullOrUndefined(this.position.Y) && typeof this.position.Y !== "number") {
          var isNumber = this.isNumberValue(this.position.Y);
          if (isNumber) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.position.Y = parseFloat(this.position.Y);
            this.isProtectedOnChange = prevOnChange;
          }
        }
      }
    };
    Dialog2.prototype.getEle = function(list, selector) {
      var element2 = void 0;
      for (var i = 0; i < list.length; i++) {
        if (list[i].classList.contains(selector)) {
          element2 = list[i];
          break;
        }
      }
      return element2;
    };
    Dialog2.prototype.getMinHeight = function() {
      var computedHeaderHeight = "0px";
      var computedFooterHeight = "0px";
      if (!isNullOrUndefined(this.element.querySelector("." + DLG_HEADER_CONTENT))) {
        computedHeaderHeight = getComputedStyle(this.headerContent).height;
      }
      var footerEle = this.getEle(this.element.children, DLG_FOOTER_CONTENT);
      if (!isNullOrUndefined(footerEle)) {
        computedFooterHeight = getComputedStyle(footerEle).height;
      }
      var headerHeight = parseInt(computedHeaderHeight.slice(0, computedHeaderHeight.indexOf("p")), 10);
      var footerHeight = parseInt(computedFooterHeight.slice(0, computedFooterHeight.indexOf("p")), 10);
      setMinHeight(headerHeight + 30 + (isNaN(footerHeight) ? 0 : footerHeight));
      return headerHeight + 30 + footerHeight;
    };
    Dialog2.prototype.onResizeStart = function(args, dialogObj) {
      dialogObj.trigger("resizeStart", args);
      return args.cancel;
    };
    Dialog2.prototype.onResizing = function(args, dialogObj) {
      dialogObj.trigger("resizing", args);
    };
    Dialog2.prototype.onResizeComplete = function(args, dialogObj) {
      dialogObj.trigger("resizeStop", args);
      this.updatePersistData();
    };
    Dialog2.prototype.setResize = function() {
      if (this.enableResize) {
        if (this.isBlazorServerRender() && !isNullOrUndefined(this.element.querySelector(".e-icons.e-resize-handle"))) {
          return;
        }
        this.element.classList.add(DLG_RESIZABLE);
        var computedHeight = getComputedStyle(this.element).minHeight;
        var computedWidth = getComputedStyle(this.element).minWidth;
        var direction = "";
        for (var i = 0; i < this.resizeHandles.length; i++) {
          if (this.resizeHandles[i] === "All") {
            direction = "south north east west north-east north-west south-east south-west";
            break;
          } else {
            var directionValue = "";
            switch (this.resizeHandles[i].toString()) {
              case "SouthEast":
                directionValue = "south-east";
                break;
              case "SouthWest":
                directionValue = "south-west";
                break;
              case "NorthEast":
                directionValue = "north-east";
                break;
              case "NorthWest":
                directionValue = "north-west";
                break;
              default:
                directionValue = this.resizeHandles[i].toString();
                break;
            }
            direction += directionValue.toLocaleLowerCase() + " ";
          }
        }
        if (this.enableRtl && direction.trim() === "south-east") {
          direction = "south-west";
        } else if (this.enableRtl && direction.trim() === "south-west") {
          direction = "south-east";
        }
        if (this.isModal && this.enableRtl) {
          this.element.classList.add(DLG_RESTRICT_LEFT_VALUE);
        } else if (this.isModal && this.target === document.body) {
          this.element.classList.add(DLG_RESTRICT_WIDTH_VALUE);
        }
        createResize({
          element: this.element,
          direction,
          minHeight: parseInt(computedHeight.slice(0, computedWidth.indexOf("p")), 10),
          maxHeight: this.targetEle.clientHeight,
          minWidth: parseInt(computedWidth.slice(0, computedWidth.indexOf("p")), 10),
          maxWidth: this.targetEle.clientWidth,
          boundary: this.target === document.body ? null : this.targetEle,
          resizeBegin: this.onResizeStart.bind(this),
          resizeComplete: this.onResizeComplete.bind(this),
          resizing: this.onResizing.bind(this),
          proxy: this
        });
        this.wireWindowResizeEvent();
      } else {
        removeResize();
        this.unWireWindowResizeEvent();
        if (this.isModal) {
          this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
        } else {
          this.element.classList.remove(DLG_RESTRICT_WIDTH_VALUE);
        }
        this.element.classList.remove(DLG_RESIZABLE);
      }
    };
    Dialog2.prototype.getFocusElement = function(target) {
      var value = 'input,select,textarea,button:enabled,a,[contenteditable="true"],[tabindex]';
      var items = target.querySelectorAll(value);
      return { element: items[items.length - 1] };
    };
    Dialog2.prototype.keyDown = function(event) {
      var _this = this;
      if (event.keyCode === 9) {
        if (this.isModal) {
          var buttonObj = void 0;
          if (!isNullOrUndefined(this.btnObj)) {
            buttonObj = this.btnObj[this.btnObj.length - 1];
          }
          if (isNullOrUndefined(this.btnObj) && !isNullOrUndefined(this.ftrTemplateContent)) {
            buttonObj = this.getFocusElement(this.ftrTemplateContent);
          }
          if (isNullOrUndefined(this.btnObj) && isNullOrUndefined(this.ftrTemplateContent) && !isNullOrUndefined(this.contentEle)) {
            buttonObj = this.getFocusElement(this.contentEle);
          }
          if (!isNullOrUndefined(buttonObj) && document.activeElement === buttonObj.element && !event.shiftKey) {
            event.preventDefault();
            this.focusableElements(this.element).focus();
          }
          if (document.activeElement === this.focusableElements(this.element) && event.shiftKey) {
            event.preventDefault();
            if (!isNullOrUndefined(buttonObj)) {
              buttonObj.element.focus();
            }
          }
        }
      }
      var element2 = document.activeElement;
      var isTagName = ["input", "textarea"].indexOf(element2.tagName.toLowerCase()) > -1;
      var isContentEdit = false;
      if (!isTagName) {
        isContentEdit = element2.hasAttribute("contenteditable") && element2.getAttribute("contenteditable") === "true";
      }
      if (event.keyCode === 27 && this.closeOnEscape) {
        this.dlgClosedBy = DLG_ESCAPE_CLOSED;
        var query = document.querySelector(".e-popup-open:not(.e-dialog)");
        if (!(!isNullOrUndefined(query) && !query.classList.contains("e-toolbar-pop"))) {
          this.hide(event);
        }
      }
      if (event.keyCode === 13 && !event.ctrlKey && element2.tagName.toLowerCase() !== "textarea" && isTagName && !isNullOrUndefined(this.primaryButtonEle) || event.keyCode === 13 && event.ctrlKey && (element2.tagName.toLowerCase() === "textarea" || isContentEdit) && !isNullOrUndefined(this.primaryButtonEle)) {
        var buttonIndex_1;
        var firstPrimary = this.buttons.some(function(data, index) {
          buttonIndex_1 = index;
          var buttonModel = data.buttonModel;
          return !isNullOrUndefined(buttonModel) && buttonModel.isPrimary === true;
        });
        if (firstPrimary && typeof this.buttons[buttonIndex_1].click === "function") {
          setTimeout(function() {
            _this.buttons[buttonIndex_1].click.call(_this, event);
          });
        }
      }
    };
    Dialog2.prototype.initialize = function() {
      if (!isNullOrUndefined(this.target)) {
        this.targetEle = typeof this.target === "string" ? document.querySelector(this.target) : this.target;
      }
      if (!this.isBlazorServerRender()) {
        addClass([this.element], ROOT);
      }
      if (Browser.isDevice) {
        addClass([this.element], DEVICE);
      }
      if (!this.isBlazorServerRender()) {
        this.setCSSClass();
      }
      this.setMaxHeight();
    };
    Dialog2.prototype.initRender = function() {
      var _this = this;
      this.initialRender = true;
      if (!this.isBlazorServerRender()) {
        attributes(this.element, { role: "dialog" });
      }
      if (this.zIndex === 1e3) {
        this.setzIndex(this.element, false);
        this.calculatezIndex = true;
      } else {
        this.calculatezIndex = false;
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.headerContent)) {
        this.headerContent = this.element.getElementsByClassName("e-dlg-header-content")[0];
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.contentEle)) {
        this.contentEle = this.element.querySelector("#" + this.element.id + "_dialog-content");
      }
      if (!this.isBlazorServerRender()) {
        this.setTargetContent();
        if (this.header !== "" && !isNullOrUndefined(this.header)) {
          this.setHeader();
        }
        this.renderCloseIcon();
        this.setContent();
        if (this.footerTemplate !== "" && !isNullOrUndefined(this.footerTemplate)) {
          this.setFooterTemplate();
        } else if (!isNullOrUndefined(this.buttons[0].buttonModel)) {
          this.setButton();
        }
      }
      if (this.isBlazorServerRender()) {
        if (!isNullOrUndefined(this.buttons[0].buttonModel) && this.footerTemplate === "") {
          this.setButton();
        }
      }
      if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
        this.setAllowDragging();
      }
      if (!this.isBlazorServerRender()) {
        attributes(this.element, { "aria-modal": this.isModal ? "true" : "false" });
        if (this.isModal) {
          this.setIsModal();
        }
      }
      if (this.isBlazorServerRender() && isNullOrUndefined(this.dlgContainer)) {
        this.dlgContainer = this.element.parentElement;
        for (var i = 0, childNodes = this.dlgContainer.children; i < childNodes.length; i++) {
          if (childNodes[i].classList.contains("e-dlg-overlay")) {
            this.dlgOverlay = childNodes[i];
          }
        }
      }
      if (this.element.classList.contains(DLG_UTIL_ALERT) !== true && this.element.classList.contains(DLG_UTIL_CONFIRM) !== true && !isNullOrUndefined(this.element.parentElement)) {
        var parentEle = this.isModal ? this.dlgContainer.parentElement : this.element.parentElement;
        this.refElement = this.createElement("div", { className: DLG_REF_ELEMENT });
        parentEle.insertBefore(this.refElement, this.isModal ? this.dlgContainer : this.element);
      }
      if (!isNullOrUndefined(this.targetEle)) {
        if (this.isModal) {
          this.targetEle.appendChild(this.dlgContainer);
        } else {
          this.targetEle.appendChild(this.element);
        }
      }
      this.popupObj = new Popup(this.element, {
        height: this.height,
        width: this.width,
        zIndex: this.zIndex,
        relateTo: this.target,
        actionOnScroll: "none",
        enableRtl: this.enableRtl,
        // eslint-disable-next-line
        open: function(event) {
          var eventArgs = {
            container: _this.isModal ? _this.dlgContainer : _this.element,
            element: _this.element,
            target: _this.target,
            preventFocus: false
          };
          if (_this.enableResize) {
            _this.resetResizeIcon();
          }
          _this.trigger("open", eventArgs, function(openEventArgs) {
            if (!openEventArgs.preventFocus) {
              _this.focusContent();
            }
          });
        },
        // eslint-disable-next-line
        close: function(event) {
          if (_this.isModal) {
            addClass([_this.dlgOverlay], "e-fade");
          }
          _this.unBindEvent(_this.element);
          if (_this.isModal) {
            _this.dlgContainer.style.display = "none";
          }
          _this.trigger("close", _this.closeArgs);
          var activeEle = document.activeElement;
          if (!isNullOrUndefined(activeEle) && !isNullOrUndefined(activeEle.blur)) {
            activeEle.blur();
          }
          if (!isNullOrUndefined(_this.storeActiveElement) && !isNullOrUndefined(_this.storeActiveElement.focus)) {
            _this.storeActiveElement.focus();
          }
        }
      });
      this.positionChange();
      this.setEnableRTL();
      if (!this.isBlazorServerRender()) {
        addClass([this.element], DLG_HIDE);
        if (this.isModal) {
          this.setOverlayZindex();
        }
      }
      if (this.visible) {
        this.show();
        if (this.isModal) {
          var targetType = this.getTargetContainer(this.target);
          if (targetType instanceof Element) {
            var computedStyle = window.getComputedStyle(targetType);
            if (computedStyle.getPropertyValue("direction") === "rtl") {
              this.setPopupPosition();
            }
          }
        }
      } else {
        if (this.isModal) {
          this.dlgOverlay.style.display = "none";
        }
      }
      this.initialRender = false;
    };
    Dialog2.prototype.getTargetContainer = function(targetValue) {
      var targetElement2 = null;
      if (typeof targetValue === "string") {
        if (targetValue.startsWith("#")) {
          targetElement2 = document.getElementById(targetValue.substring(1));
        } else if (targetValue.startsWith(".")) {
          var elements = document.getElementsByClassName(targetValue.substring(1));
          targetElement2 = elements.length > 0 ? elements[0] : null;
        } else {
          if (!(targetValue instanceof HTMLElement) && targetValue !== document.body) {
            targetElement2 = document.querySelector(targetValue);
          }
        }
      } else if (targetValue instanceof HTMLElement) {
        targetElement2 = targetValue;
      }
      return targetElement2;
    };
    Dialog2.prototype.resetResizeIcon = function() {
      var dialogConHeight = this.getMinHeight();
      if (this.targetEle.offsetHeight < dialogConHeight) {
        var className = this.enableRtl ? "e-south-west" : "e-south-east";
        var resizeIcon = this.element.querySelector("." + className);
        if (!isNullOrUndefined(resizeIcon)) {
          resizeIcon.style.bottom = "-" + dialogConHeight.toString() + "px";
        }
      }
    };
    Dialog2.prototype.setOverlayZindex = function(zIndexValue) {
      var zIndex;
      if (isNullOrUndefined(zIndexValue)) {
        zIndex = parseInt(this.element.style.zIndex, 10) ? parseInt(this.element.style.zIndex, 10) : this.zIndex;
      } else {
        zIndex = zIndexValue;
      }
      this.dlgOverlay.style.zIndex = (zIndex - 1).toString();
      this.dlgContainer.style.zIndex = zIndex.toString();
    };
    Dialog2.prototype.positionChange = function() {
      if (this.isModal) {
        if (!isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y))) {
          this.setPopupPosition();
        } else if (!isNaN(parseFloat(this.position.X)) && isNaN(parseFloat(this.position.Y)) || isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y))) {
          this.setPopupPosition();
        } else {
          this.element.style.top = "0px";
          this.element.style.left = "0px";
          this.dlgContainer.classList.add("e-dlg-" + this.position.X + "-" + this.position.Y);
        }
      } else {
        this.setPopupPosition();
      }
    };
    Dialog2.prototype.setPopupPosition = function() {
      this.popupObj.setProperties({
        position: {
          X: this.position.X,
          Y: this.position.Y
        }
      });
    };
    Dialog2.prototype.setAllowDragging = function() {
      var _this = this;
      var handleContent = "." + DLG_HEADER_CONTENT;
      if (!this.element.classList.contains(DLG_DRAG)) {
        this.dragObj = new Draggable(this.element, {
          clone: false,
          isDragScroll: true,
          abort: ".e-dlg-closeicon-btn",
          handle: handleContent,
          dragStart: function(event) {
            _this.trigger("dragStart", event, function(dragEventArgs) {
              if (isBlazor()) {
                dragEventArgs.bindEvents(event.dragElement);
              }
            });
          },
          dragStop: function(event) {
            if (_this.isModal) {
              _this.IsDragStop = true;
              if (!isNullOrUndefined(_this.position)) {
                _this.dlgContainer.classList.remove("e-dlg-" + _this.position.X + "-" + _this.position.Y);
              }
              var targetType = _this.getTargetContainer(_this.target);
              if (targetType instanceof Element) {
                var computedStyle = window.getComputedStyle(targetType);
                if (computedStyle.getPropertyValue("direction") === "rtl") {
                  _this.element.style.position = "absolute";
                } else {
                  _this.element.style.position = "relative";
                }
              } else {
                _this.element.style.position = "relative";
              }
            }
            _this.trigger("dragStop", event);
            _this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
            _this.updatePersistData();
          },
          drag: function(event) {
            _this.trigger("drag", event);
          }
        });
        if (!isNullOrUndefined(this.targetEle)) {
          this.dragObj.dragArea = this.targetEle;
        }
      }
    };
    Dialog2.prototype.setButton = function() {
      if (!this.isBlazorServerRender()) {
        this.buttonContent = [];
        this.btnObj = [];
        for (var i = 0; i < this.buttons.length; i++) {
          if (isNullOrUndefined(this.buttons[i].buttonModel)) {
            continue;
          }
          var buttonType = !isNullOrUndefined(this.buttons[i].type) ? this.buttons[i].type.toLowerCase() : "button";
          var btn = this.createElement("button", { className: this.cssClass, attrs: { type: buttonType } });
          this.buttonContent.push(btn.outerHTML);
        }
        this.setFooterTemplate();
      }
      var footerBtn;
      for (var i = 0, childNodes = this.element.children; i < childNodes.length; i++) {
        if (childNodes[i].classList.contains(DLG_FOOTER_CONTENT)) {
          footerBtn = childNodes[i].querySelectorAll("button");
        }
      }
      for (var i = 0; i < this.buttons.length; i++) {
        if (isNullOrUndefined(this.buttons[i].buttonModel)) {
          continue;
        }
        if (!this.isBlazorServerRender()) {
          this.btnObj[i] = new Button(this.buttons[i].buttonModel);
        }
        if (this.isBlazorServerRender()) {
          this.ftrTemplateContent = this.element.querySelector("." + DLG_FOOTER_CONTENT);
        }
        if (!isNullOrUndefined(this.ftrTemplateContent) && footerBtn.length > 0) {
          if (typeof this.buttons[i].click === "function") {
            EventHandler.add(footerBtn[i], "click", this.buttons[i].click, this);
          }
          if (typeof this.buttons[i].click === "object") {
            EventHandler.add(footerBtn[i], "click", this.buttonClickHandler.bind(this, i), this);
          }
        }
        if (!this.isBlazorServerRender() && !isNullOrUndefined(this.ftrTemplateContent)) {
          this.btnObj[i].appendTo(this.ftrTemplateContent.children[i]);
          if (this.buttons[i].isFlat) {
            this.btnObj[i].element.classList.add("e-flat");
          }
          this.primaryButtonEle = this.element.getElementsByClassName("e-primary")[0];
        }
      }
    };
    Dialog2.prototype.buttonClickHandler = function(index) {
      this.trigger("buttons[" + index + "].click", {});
    };
    Dialog2.prototype.setContent = function() {
      this.contentEle = this.createElement("div", { className: DLG_CONTENT, id: this.element.id + "_dialog-content" });
      if (this.headerEle) {
        attributes(this.element, { "aria-describedby": this.element.id + "_title " + this.element.id + "_dialog-content" });
      } else {
        attributes(this.element, { "aria-describedby": this.element.id + "_dialog-content" });
      }
      if (this.innerContentElement) {
        this.contentEle.appendChild(this.innerContentElement);
      } else if (!isNullOrUndefined(this.content) && this.content !== "" || !this.initialRender) {
        if (typeof this.content === "string" && !isBlazor()) {
          this.setTemplate(this.content, this.contentEle, "content");
        } else if (this.content instanceof HTMLElement) {
          this.contentEle.appendChild(this.content);
        } else {
          this.setTemplate(this.content, this.contentEle, "content");
        }
      }
      if (!isNullOrUndefined(this.headerContent)) {
        this.element.insertBefore(this.contentEle, this.element.children[1]);
      } else {
        this.element.insertBefore(this.contentEle, this.element.children[0]);
      }
      if (this.height === "auto") {
        if (!this.isBlazorServerRender() && Browser.isIE && this.element.style.width === "" && !isNullOrUndefined(this.width)) {
          this.element.style.width = formatUnit(this.width);
        }
        this.setMaxHeight();
      }
    };
    Dialog2.prototype.setTemplate = function(template, toElement, prop) {
      var templateFn;
      var templateProps;
      if (toElement.classList.contains(DLG_HEADER)) {
        templateProps = this.element.id + "header";
      } else if (toElement.classList.contains(DLG_FOOTER_CONTENT)) {
        templateProps = this.element.id + "footerTemplate";
      } else {
        templateProps = this.element.id + "content";
      }
      var templateValue;
      if (!isNullOrUndefined(template.outerHTML)) {
        toElement.appendChild(template);
      } else if (typeof template === "string" || typeof template !== "string" || isBlazor() && !this.isStringTemplate) {
        if (typeof template === "string") {
          template = this.sanitizeHelper(template);
        }
        if (this.isVue || typeof template !== "string") {
          templateFn = compile(template);
          templateValue = template;
        } else {
          toElement.innerHTML = template;
        }
      }
      var fromElements = [];
      if (!isNullOrUndefined(templateFn)) {
        var isString = isBlazor() && !this.isStringTemplate && templateValue.indexOf("<div>Blazor") === 0 ? this.isStringTemplate : true;
        for (var _i = 0, _a = templateFn({}, this, prop, templateProps, isString); _i < _a.length; _i++) {
          var item = _a[_i];
          fromElements.push(item);
        }
        append([].slice.call(fromElements), toElement);
      }
    };
    Dialog2.prototype.sanitizeHelper = function(value) {
      if (this.enableHtmlSanitizer) {
        var dialogItem = SanitizeHtmlHelper.beforeSanitize();
        var beforeEvent = {
          cancel: false,
          helper: null
        };
        extend(dialogItem, dialogItem, beforeEvent);
        this.trigger("beforeSanitizeHtml", dialogItem);
        if (dialogItem.cancel && !isNullOrUndefined(dialogItem.helper)) {
          value = dialogItem.helper(value);
        } else if (!dialogItem.cancel) {
          value = SanitizeHtmlHelper.serializeValue(dialogItem, value);
        }
      }
      return value;
    };
    Dialog2.prototype.setMaxHeight = function() {
      if (!this.allowMaxHeight) {
        return;
      }
      var display = this.element.style.display;
      this.element.style.display = "none";
      this.element.style.maxHeight = !isNullOrUndefined(this.target) && this.targetEle.offsetHeight < window.innerHeight ? this.targetEle.offsetHeight - 20 + "px" : window.innerHeight - 20 + "px";
      this.element.style.display = display;
      if (Browser.isIE && this.height === "auto" && !isNullOrUndefined(this.contentEle) && this.element.offsetHeight < this.contentEle.offsetHeight) {
        this.element.style.height = "inherit";
      }
    };
    Dialog2.prototype.setEnableRTL = function() {
      if (!this.isBlazorServerRender()) {
        if (this.enableRtl) {
          addClass([this.element], RTL);
        } else {
          removeClass([this.element], RTL);
        }
      }
      if (!isNullOrUndefined(this.element.querySelector(".e-resize-handle"))) {
        removeResize();
        this.setResize();
      }
    };
    Dialog2.prototype.setTargetContent = function() {
      var _this = this;
      if (isNullOrUndefined(this.content) || this.content === "") {
        var isContent = this.element.innerHTML.replace(/\s|<(\/?|\/?)(!--!--)>/g, "") !== "";
        if (this.element.children.length > 0 || isContent) {
          this.innerContentElement = document.createDocumentFragment();
          [].slice.call(this.element.childNodes).forEach(function(el) {
            if (el.nodeType !== 8) {
              _this.innerContentElement.appendChild(el);
            }
          });
        }
      }
    };
    Dialog2.prototype.setHeader = function() {
      if (this.headerEle) {
        this.headerEle.innerHTML = "";
      } else {
        this.headerEle = this.createElement("div", { id: this.element.id + "_title", className: DLG_HEADER });
      }
      this.createHeaderContent();
      this.headerContent.appendChild(this.headerEle);
      this.setTemplate(this.header, this.headerEle, "header");
      attributes(this.element, { "aria-describedby": this.element.id + "_title" });
      attributes(this.element, { "aria-label": "dialog" });
      this.element.insertBefore(this.headerContent, this.element.children[0]);
      if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
        this.setAllowDragging();
      }
    };
    Dialog2.prototype.setFooterTemplate = function() {
      if (this.ftrTemplateContent) {
        this.ftrTemplateContent.innerHTML = "";
      } else {
        this.ftrTemplateContent = this.createElement("div", {
          className: DLG_FOOTER_CONTENT
        });
      }
      if (this.footerTemplate !== "" && !isNullOrUndefined(this.footerTemplate)) {
        this.setTemplate(this.footerTemplate, this.ftrTemplateContent, "footerTemplate");
      } else {
        this.ftrTemplateContent.innerHTML = this.buttonContent.join("");
      }
      this.element.appendChild(this.ftrTemplateContent);
    };
    Dialog2.prototype.createHeaderContent = function() {
      if (isNullOrUndefined(this.headerContent)) {
        this.headerContent = this.createElement("div", { id: this.element.id + "_dialog-header", className: DLG_HEADER_CONTENT });
      }
    };
    Dialog2.prototype.renderCloseIcon = function() {
      if (this.showCloseIcon) {
        this.closeIcon = this.createElement("button", { className: DLG_CLOSE_ICON_BTN, attrs: { type: "button" } });
        this.closeIconBtnObj = new Button({ cssClass: "e-flat", iconCss: DLG_CLOSE_ICON + " " + ICON });
        this.closeIconTitle();
        if (!isNullOrUndefined(this.headerContent)) {
          prepend([this.closeIcon], this.headerContent);
        } else {
          this.createHeaderContent();
          prepend([this.closeIcon], this.headerContent);
          this.element.insertBefore(this.headerContent, this.element.children[0]);
        }
        this.closeIconBtnObj.appendTo(this.closeIcon);
      }
    };
    Dialog2.prototype.closeIconTitle = function() {
      this.l10n.setLocale(this.locale);
      var closeIconTitle = this.l10n.getConstant("close");
      this.closeIcon.setAttribute("title", closeIconTitle);
      this.closeIcon.setAttribute("aria-label", closeIconTitle);
    };
    Dialog2.prototype.setCSSClass = function(oldCSSClass) {
      if (oldCSSClass) {
        removeClass([this.element], oldCSSClass.split(" "));
        if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
          removeClass([this.dlgContainer], oldCSSClass.split(" "));
        }
      }
      if (this.cssClass) {
        addClass([this.element], this.cssClass.split(" "));
        if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
          addClass([this.dlgContainer], this.cssClass.split(" "));
        }
      }
    };
    Dialog2.prototype.setIsModal = function() {
      this.dlgContainer = this.createElement("div", { className: DLG_CONTAINER });
      this.setCSSClass();
      this.element.classList.remove(DLG_SHOW);
      this.element.parentNode.insertBefore(this.dlgContainer, this.element);
      this.dlgContainer.appendChild(this.element);
      addClass([this.element], MODAL_DLG);
      this.dlgOverlay = this.createElement("div", { className: DLG_OVERLAY });
      this.dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
      this.dlgContainer.appendChild(this.dlgOverlay);
    };
    Dialog2.prototype.getValidFocusNode = function(items) {
      var node;
      for (var u = 0; u < items.length; u++) {
        node = items[u];
        if ((node.clientHeight > 0 || node.tagName.toLowerCase() === "a" && node.hasAttribute("href")) && node.tabIndex > -1 && !node.disabled && !this.disableElement(node, '[disabled],[aria-disabled="true"],[type="hidden"]')) {
          return node;
        } else {
          node = null;
        }
      }
      return node;
    };
    Dialog2.prototype.focusableElements = function(content) {
      if (!isNullOrUndefined(content)) {
        var value = 'input,select,textarea,button,a,[contenteditable="true"],[tabindex]';
        var items = content.querySelectorAll(value);
        return this.getValidFocusNode(items);
      }
      return null;
    };
    Dialog2.prototype.getAutoFocusNode = function(container) {
      var node = container.querySelector("." + DLG_CLOSE_ICON_BTN);
      var value = "[autofocus]";
      var items = container.querySelectorAll(value);
      var validNode = this.getValidFocusNode(items);
      if (isBlazor()) {
        this.primaryButtonEle = this.element.getElementsByClassName("e-primary")[0];
      }
      if (!isNullOrUndefined(validNode)) {
        node = validNode;
      } else {
        validNode = this.focusableElements(this.contentEle);
        if (!isNullOrUndefined(validNode)) {
          return node = validNode;
        } else if (!isNullOrUndefined(this.primaryButtonEle)) {
          return this.element.querySelector("." + DLG_PRIMARY_BUTTON);
        }
      }
      return node;
    };
    Dialog2.prototype.disableElement = function(element2, t) {
      var elementMatch = element2 ? element2.matches || element2.webkitMatchesSelector || element2.msGetRegionContent : null;
      if (elementMatch) {
        for (; element2; element2 = element2.parentNode) {
          if (element2 instanceof Element && elementMatch.call(element2, t)) {
            return element2;
          }
        }
      }
      return null;
    };
    Dialog2.prototype.focusContent = function() {
      var element2 = this.getAutoFocusNode(this.element);
      var node = !isNullOrUndefined(element2) ? element2 : this.element;
      var userAgent = Browser.userAgent;
      if (userAgent.indexOf("MSIE ") > 0 || userAgent.indexOf("Trident/") > 0) {
        this.element.focus();
      }
      node.focus();
      this.unBindEvent(this.element);
      this.bindEvent(this.element);
    };
    Dialog2.prototype.bindEvent = function(element2) {
      EventHandler.add(element2, "keydown", this.keyDown, this);
    };
    Dialog2.prototype.unBindEvent = function(element2) {
      EventHandler.remove(element2, "keydown", this.keyDown);
    };
    Dialog2.prototype.updateSanitizeContent = function() {
      if (!this.isBlazorServerRender()) {
        this.contentEle.innerHTML = this.sanitizeHelper(this.content);
      }
    };
    Dialog2.prototype.isBlazorServerRender = function() {
      return isBlazor() && this.isServerRendered;
    };
    Dialog2.prototype.getModuleName = function() {
      return "dialog";
    };
    Dialog2.prototype.onPropertyChanged = function(newProp, oldProp) {
      if (!this.element.classList.contains(ROOT)) {
        return;
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "content":
            if (!isNullOrUndefined(this.content) && this.content !== "") {
              if (this.isBlazorServerRender()) {
                this.contentEle = this.element.querySelector(".e-dlg-content");
              }
              if (!isNullOrUndefined(this.contentEle) && this.contentEle.getAttribute("role") !== "dialog") {
                if (!this.isBlazorServerRender()) {
                  this.contentEle.innerHTML = "";
                }
                if (typeof this.content === "function") {
                  this.clearTemplate(["content"]);
                  detach(this.contentEle);
                  this.contentEle = null;
                  this.setContent();
                } else {
                  if (typeof this.content === "string") {
                    if (this.isBlazorServerRender() && this.contentEle.innerText === "") {
                      this.contentEle.insertAdjacentHTML("beforeend", this.sanitizeHelper(this.content));
                    } else {
                      this.updateSanitizeContent();
                    }
                  } else {
                    this.contentEle.appendChild(this.content);
                  }
                }
                this.setMaxHeight();
              } else {
                if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-dlg-content"))) {
                  this.setContent();
                }
              }
            } else if (!isNullOrUndefined(this.contentEle)) {
              detach(this.contentEle);
              this.contentEle = null;
            }
            break;
          case "header":
            if (this.header === "" || isNullOrUndefined(this.header)) {
              if (this.headerEle) {
                detach(this.headerEle);
                this.headerEle = null;
              }
            } else {
              if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-dlg-header-content"))) {
                this.setHeader();
              }
            }
            break;
          case "footerTemplate":
            if (this.footerTemplate === "" || isNullOrUndefined(this.footerTemplate)) {
              if (!this.ftrTemplateContent) {
                return;
              }
              detach(this.ftrTemplateContent);
              this.ftrTemplateContent = null;
              this.buttons = [{}];
            } else {
              if (!this.isBlazorServerRender() || isNullOrUndefined(this.element.querySelector(".e-footer-content"))) {
                this.setFooterTemplate();
              }
              this.buttons = [{}];
            }
            break;
          case "showCloseIcon":
            if (this.element.getElementsByClassName(DLG_CLOSE_ICON).length > 0) {
              if (!this.showCloseIcon && (this.header === "" || isNullOrUndefined(this.header))) {
                detach(this.headerContent);
                this.headerContent = null;
              } else if (!this.showCloseIcon) {
                detach(this.closeIcon);
              } else {
                if (this.isBlazorServerRender()) {
                  this.wireEvents();
                }
              }
            } else {
              if (!this.isBlazorServerRender()) {
                this.renderCloseIcon();
              }
              this.wireEvents();
            }
            break;
          case "locale":
            if (this.showCloseIcon) {
              this.closeIconTitle();
            }
            break;
          case "visible":
            if (this.visible) {
              this.show();
            } else {
              this.hide();
            }
            break;
          case "isModal":
            this.updateIsModal();
            break;
          case "height":
            setStyleAttribute(this.element, { "height": formatUnit(newProp.height) });
            this.updatePersistData();
            break;
          case "width":
            setStyleAttribute(this.element, { "width": formatUnit(newProp.width) });
            this.updatePersistData();
            break;
          case "zIndex":
            this.popupObj.zIndex = this.zIndex;
            if (this.isModal) {
              this.setOverlayZindex(this.zIndex);
            }
            if (this.element.style.zIndex !== this.zIndex.toString()) {
              this.calculatezIndex = false;
            }
            break;
          case "cssClass":
            this.setCSSClass(oldProp.cssClass);
            break;
          case "buttons": {
            this.unWireButtonEvents();
            this.destroyButtons();
            if (!isNullOrUndefined(this.ftrTemplateContent) && !this.isBlazorServerRender()) {
              detach(this.ftrTemplateContent);
              this.ftrTemplateContent = null;
            }
            this.footerTemplate = "";
            this.setButton();
            break;
          }
          case "allowDragging":
            if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
              this.setAllowDragging();
            } else {
              this.dragObj.destroy();
            }
            break;
          case "target":
            this.setTarget(newProp.target);
            break;
          case "position":
            this.checkPositionData();
            if (this.isModal) {
              var positionX = this.position.X;
              var positionY = this.position.Y;
              if (!isNullOrUndefined(oldProp.position)) {
                if (!isNullOrUndefined(oldProp.position.X)) {
                  positionX = oldProp.position.X;
                }
                if (!isNullOrUndefined(oldProp.position.Y)) {
                  positionY = oldProp.position.Y;
                }
              }
              if (this.dlgContainer.classList.contains("e-dlg-" + positionX + "-" + positionY)) {
                this.dlgContainer.classList.remove("e-dlg-" + positionX + "-" + positionY);
              }
            }
            this.positionChange();
            this.updatePersistData();
            break;
          case "enableRtl":
            this.setEnableRTL();
            break;
          case "enableResize":
            this.setResize();
            break;
          case "minHeight":
            if (this.minHeight !== "") {
              this.element.style.minHeight = formatUnit(this.minHeight);
            }
            break;
        }
      }
    };
    Dialog2.prototype.setTarget = function(target) {
      this.popupObj.relateTo = target;
      this.target = target;
      this.targetEle = typeof this.target === "string" ? document.querySelector(this.target) : this.target;
      if (this.dragObj) {
        this.dragObj.dragArea = this.targetEle;
      }
      this.setMaxHeight();
      if (this.isModal) {
        this.updateIsModal();
      }
      if (this.enableResize) {
        this.setResize();
      }
    };
    Dialog2.prototype.updateIsModal = function() {
      this.element.setAttribute("aria-modal", this.isModal ? "true" : "false");
      if (this.isModal) {
        if (isNullOrUndefined(this.dlgOverlay)) {
          this.setIsModal();
          this.element.style.top = "0px";
          this.element.style.left = "0px";
          if (!isNullOrUndefined(this.targetEle)) {
            this.targetEle.appendChild(this.dlgContainer);
          }
        }
      } else {
        removeClass([this.element], MODAL_DLG);
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        detach(this.dlgOverlay);
        while (this.dlgContainer.firstChild) {
          this.dlgContainer.parentElement.insertBefore(this.dlgContainer.firstChild, this.dlgContainer);
        }
        this.dlgContainer.parentElement.removeChild(this.dlgContainer);
      }
      if (this.visible) {
        this.show();
      }
      this.positionChange();
      if (this.isModal && this.dlgOverlay) {
        EventHandler.add(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler, this);
      }
    };
    Dialog2.prototype.setzIndex = function(zIndexElement, setPopupZindex) {
      var prevOnChange = this.isProtectedOnChange;
      this.isProtectedOnChange = true;
      var currentzIndex = getZindexPartial(zIndexElement);
      this.zIndex = currentzIndex > this.zIndex ? currentzIndex : this.zIndex;
      this.isProtectedOnChange = prevOnChange;
      if (setPopupZindex) {
        this.popupObj.zIndex = this.zIndex;
      }
    };
    Dialog2.prototype.windowResizeHandler = function() {
      setMaxWidth(this.targetEle.clientWidth);
      setMaxHeight(this.targetEle.clientHeight);
      this.setMaxHeight();
    };
    Dialog2.prototype.getPersistData = function() {
      return this.addOnPersist(["width", "height", "position"]);
    };
    Dialog2.prototype.removeAllChildren = function(element2) {
      while (element2.children[0]) {
        this.removeAllChildren(element2.children[0]);
        element2.removeChild(element2.children[0]);
      }
    };
    Dialog2.prototype.destroy = function() {
      if (this.isDestroyed) {
        return;
      }
      var classArray = [RTL, MODAL_DLG, DLG_RESIZABLE, DLG_RESTRICT_LEFT_VALUE, FULLSCREEN, DEVICE];
      var attrs = ["role", "aria-modal", "aria-labelledby", "aria-describedby", "aria-grabbed", "tabindex", "style"];
      removeClass([this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
      if (!isNullOrUndefined(this.element) && this.element.classList.contains(FULLSCREEN)) {
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
      }
      if (this.isModal) {
        removeClass([!isNullOrUndefined(this.targetEle) ? this.targetEle : document.body], SCROLL_DISABLED);
      }
      this.unWireEvents();
      this.unWireButtonEvents();
      this.destroyButtons();
      if (!isNullOrUndefined(this.closeIconBtnObj)) {
        this.closeIconBtnObj.destroy();
      }
      if (!isNullOrUndefined(this.dragObj)) {
        this.dragObj.destroy();
      }
      if (!isNullOrUndefined(this.popupObj.element) && this.popupObj.element.classList.contains(POPUP_ROOT)) {
        this.popupObj.destroy();
      }
      removeClass([this.element], classArray);
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        removeClass([this.element], this.cssClass.split(" "));
      }
      if (!isNullOrUndefined(this.refElement) && !isNullOrUndefined(this.refElement.parentElement)) {
        this.refElement.parentElement.insertBefore(this.isModal ? this.dlgContainer : this.element, this.refElement);
        detach(this.refElement);
        this.refElement = void 0;
      }
      if (this.isModal && !this.isBlazorServerRender()) {
        detach(this.dlgOverlay);
        this.dlgContainer.parentNode.insertBefore(this.element, this.dlgContainer);
        detach(this.dlgContainer);
      }
      if (!this.isBlazorServerRender()) {
        this.element.innerHTML = this.clonedEle.innerHTML;
      }
      if (this.isBlazorServerRender()) {
        if (!isNullOrUndefined(this.element.children)) {
          for (var i = 0; i <= this.element.children.length; i++) {
            i = i - i;
            detach(this.element.children[i]);
          }
        }
      }
      for (var i = 0; i < attrs.length; i++) {
        this.element.removeAttribute(attrs[i]);
      }
      this.ftrTemplateContent = null;
      this.headerContent = null;
      if (!this.isReact && !this.isVue && !isNullOrUndefined(this.contentEle)) {
        this.removeAllChildren(this.contentEle);
      }
      this.contentEle = null;
      if (!this.isBlazorServerRender()) {
        _super.prototype.destroy.call(this);
      } else {
        this.isDestroyed = true;
      }
      if (this.isReact) {
        this.clearTemplate();
      }
    };
    Dialog2.prototype.wireWindowResizeEvent = function() {
      this.boundWindowResizeHandler = this.windowResizeHandler.bind(this);
      window.addEventListener("resize", this.boundWindowResizeHandler);
    };
    Dialog2.prototype.unWireWindowResizeEvent = function() {
      window.removeEventListener("resize", this.boundWindowResizeHandler);
      this.boundWindowResizeHandler = null;
    };
    Dialog2.prototype.wireEvents = function() {
      if (this.isBlazorServerRender() && this.showCloseIcon) {
        this.closeIcon = this.element.getElementsByClassName("e-dlg-closeicon-btn")[0];
      }
      if (this.showCloseIcon) {
        EventHandler.add(this.closeIcon, "click", this.closeIconClickEventHandler, this);
      }
      if (this.isModal && this.dlgOverlay) {
        EventHandler.add(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler, this);
      }
    };
    Dialog2.prototype.unWireEvents = function() {
      if (this.showCloseIcon) {
        EventHandler.remove(this.closeIcon, "click", this.closeIconClickEventHandler);
      }
      if (this.isModal) {
        EventHandler.remove(this.dlgOverlay, "click", this.dlgOverlayClickEventHandler);
      }
    };
    Dialog2.prototype.unWireButtonEvents = function() {
      if (this.buttons.length > 0 && this.footerTemplate === "" && this.ftrTemplateContent) {
        for (var i = 0; i < this.buttons.length; i++) {
          if (this.buttons[i].click && typeof this.buttons[i].click === "function" && this.ftrTemplateContent.children[i]) {
            EventHandler.remove(this.ftrTemplateContent.children[i], "click", this.buttons[i].click);
          }
        }
      }
    };
    Dialog2.prototype.destroyButtons = function() {
      if (!isNullOrUndefined(this.btnObj)) {
        for (var i = 0; i < this.btnObj.length; i++) {
          if (this.btnObj[i] && !this.btnObj[i].isDestroyed) {
            this.btnObj[i].destroy();
          }
        }
      }
    };
    Dialog2.prototype.refreshPosition = function() {
      this.popupObj.refreshPosition();
      if (this.element.classList.contains(MODAL_DLG)) {
        this.positionChange();
      }
    };
    Dialog2.prototype.getDimension = function() {
      var dialogWidth = this.element.offsetWidth;
      var dialogHeight = this.element.offsetHeight;
      return { width: dialogWidth, height: dialogHeight };
    };
    Dialog2.prototype.show = function(isFullScreen) {
      var _this = this;
      if (!this.element.classList.contains(ROOT)) {
        return;
      }
      if (!this.element.classList.contains(DLG_SHOW) || !isNullOrUndefined(isFullScreen)) {
        if (!isNullOrUndefined(isFullScreen)) {
          this.fullScreen(isFullScreen);
        }
        var eventArgs_1 = isBlazor() ? {
          cancel: false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          maxHeight: this.element.style.maxHeight
        } : {
          cancel: false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          target: this.target,
          maxHeight: this.element.style.maxHeight
        };
        this.trigger("beforeOpen", eventArgs_1, function(beforeOpenArgs) {
          if (!beforeOpenArgs.cancel) {
            if (_this.element.style.maxHeight !== eventArgs_1.maxHeight) {
              _this.allowMaxHeight = false;
              _this.element.style.maxHeight = eventArgs_1.maxHeight;
            }
            if (_this.enableResize && _this.boundWindowResizeHandler == null && !_this.initialRender) {
              _this.wireWindowResizeEvent();
            }
            _this.storeActiveElement = document.activeElement;
            _this.element.tabIndex = -1;
            if (_this.isModal && !isNullOrUndefined(_this.dlgOverlay)) {
              _this.dlgOverlay.style.display = "block";
              _this.dlgContainer.style.display = "flex";
              removeClass([_this.dlgOverlay], "e-fade");
              if (!isNullOrUndefined(_this.targetEle)) {
                if (_this.targetEle === document.body) {
                  _this.dlgContainer.style.position = "fixed";
                } else {
                  _this.dlgContainer.style.position = "absolute";
                }
                _this.dlgOverlay.style.position = "absolute";
                var targetType = _this.getTargetContainer(_this.target);
                if (targetType instanceof Element) {
                  var computedStyle = window.getComputedStyle(targetType);
                  if (computedStyle.getPropertyValue("direction") === "rtl") {
                    _this.element.style.position = "absolute";
                  } else {
                    _this.element.style.position = "relative";
                  }
                } else {
                  _this.element.style.position = "relative";
                }
                addClass([_this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
              } else {
                addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
              }
            }
            var openAnimation = {
              name: _this.animationSettings.effect === "None" && animationMode === "Enable" ? "ZoomIn" : _this.animationSettings.effect + "In",
              duration: _this.animationSettings.duration,
              delay: _this.animationSettings.delay
            };
            var zIndexElement = _this.isModal ? _this.element.parentElement : _this.element;
            if (_this.calculatezIndex) {
              _this.setzIndex(zIndexElement, true);
              setStyleAttribute(_this.element, { "zIndex": _this.zIndex });
              if (_this.isModal) {
                _this.setOverlayZindex(_this.zIndex);
              }
            }
            _this.animationSettings.effect === "None" && animationMode === "Enable" ? _this.popupObj.show(openAnimation) : _this.animationSettings.effect === "None" ? _this.popupObj.show() : _this.popupObj.show(openAnimation);
            if (_this.isModal) {
              var targetType = _this.getTargetContainer(_this.target);
              if (targetType instanceof Element) {
                var computedStyle = window.getComputedStyle(targetType);
                if (computedStyle.getPropertyValue("direction") === "rtl" && !_this.IsDragStop) {
                  _this.setPopupPosition();
                }
              }
            }
            _this.dialogOpen = true;
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            _this.visible = true;
            _this.preventVisibility = true;
            _this.isProtectedOnChange = prevOnChange;
          }
        });
      }
      if (this.isReact) {
        this.renderReactTemplates();
      }
    };
    Dialog2.prototype.hide = function(event) {
      var _this = this;
      if (!this.element.classList.contains(ROOT)) {
        return;
      }
      if (this.preventVisibility) {
        var eventArgs = isBlazor() ? {
          cancel: false,
          isInteracted: event ? true : false,
          element: this.element,
          container: this.isModal ? this.dlgContainer : this.element,
          event
        } : {
          cancel: false,
          isInteracted: event ? true : false,
          element: this.element,
          target: this.target,
          container: this.isModal ? this.dlgContainer : this.element,
          event,
          closedBy: this.dlgClosedBy
        };
        this.closeArgs = eventArgs;
        this.trigger("beforeClose", eventArgs, function(beforeCloseArgs) {
          if (!beforeCloseArgs.cancel) {
            if (_this.isModal) {
              if (!isNullOrUndefined(_this.targetEle)) {
                removeClass([_this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
              }
            }
            if (_this.enableResize) {
              _this.unWireWindowResizeEvent();
            }
            if (document.body.classList.contains(DLG_TARGET) && document.body.classList.contains(SCROLL_DISABLED)) {
              removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            }
            var closeAnimation = {
              name: _this.animationSettings.effect === "None" && animationMode === "Enable" ? "ZoomOut" : _this.animationSettings.effect + "Out",
              duration: _this.animationSettings.duration,
              delay: _this.animationSettings.delay
            };
            if (_this.animationSettings.effect === "None" && animationMode === "Enable") {
              _this.popupObj.hide(closeAnimation);
            } else if (_this.animationSettings.effect === "None") {
              _this.popupObj.hide();
            } else {
              _this.popupObj.hide(closeAnimation);
            }
            _this.dialogOpen = false;
            var prevOnChange = _this.isProtectedOnChange;
            _this.isProtectedOnChange = true;
            _this.visible = false;
            _this.preventVisibility = false;
            _this.isProtectedOnChange = prevOnChange;
          }
          _this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
        });
      }
    };
    Dialog2.prototype.fullScreen = function(args) {
      var top = this.element.offsetTop;
      var left = this.element.offsetLeft;
      if (args) {
        if (!this.isModal) {
          this.element.style.top = document.scrollingElement.scrollTop + "px";
        }
        addClass([this.element], FULLSCREEN);
        var display = this.element.style.display;
        this.element.style.display = "none";
        this.element.style.maxHeight = !isNullOrUndefined(this.target) ? this.targetEle.offsetHeight + "px" : window.innerHeight + "px";
        this.element.style.display = display;
        addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        if (this.allowDragging && !isNullOrUndefined(this.dragObj)) {
          this.dragObj.destroy();
        }
      } else {
        removeClass([this.element], FULLSCREEN);
        removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        if (this.allowDragging && !isNullOrUndefined(this.headerContent)) {
          this.setAllowDragging();
        }
      }
      return args;
    };
    Dialog2.prototype.getButtons = function(index) {
      if (!isNullOrUndefined(index)) {
        return this.btnObj[index];
      }
      return this.btnObj;
    };
    __decorate2([
      Property("")
    ], Dialog2.prototype, "content", void 0);
    __decorate2([
      Property(true)
    ], Dialog2.prototype, "enableHtmlSanitizer", void 0);
    __decorate2([
      Property(false)
    ], Dialog2.prototype, "enablePersistence", void 0);
    __decorate2([
      Property(false)
    ], Dialog2.prototype, "showCloseIcon", void 0);
    __decorate2([
      Property(false)
    ], Dialog2.prototype, "isModal", void 0);
    __decorate2([
      Property("")
    ], Dialog2.prototype, "header", void 0);
    __decorate2([
      Property(true)
    ], Dialog2.prototype, "visible", void 0);
    __decorate2([
      Property(false)
    ], Dialog2.prototype, "enableResize", void 0);
    __decorate2([
      Property(["South-East"])
    ], Dialog2.prototype, "resizeHandles", void 0);
    __decorate2([
      Property("auto")
    ], Dialog2.prototype, "height", void 0);
    __decorate2([
      Property("")
    ], Dialog2.prototype, "minHeight", void 0);
    __decorate2([
      Property("100%")
    ], Dialog2.prototype, "width", void 0);
    __decorate2([
      Property("")
    ], Dialog2.prototype, "cssClass", void 0);
    __decorate2([
      Property(1e3)
    ], Dialog2.prototype, "zIndex", void 0);
    __decorate2([
      Property(null)
    ], Dialog2.prototype, "target", void 0);
    __decorate2([
      Property("")
    ], Dialog2.prototype, "footerTemplate", void 0);
    __decorate2([
      Property(false)
    ], Dialog2.prototype, "allowDragging", void 0);
    __decorate2([
      Collection([{}], ButtonProps)
    ], Dialog2.prototype, "buttons", void 0);
    __decorate2([
      Property(true)
    ], Dialog2.prototype, "closeOnEscape", void 0);
    __decorate2([
      Complex({}, AnimationSettings)
    ], Dialog2.prototype, "animationSettings", void 0);
    __decorate2([
      Complex({ X: "center", Y: "center" }, PositionData)
    ], Dialog2.prototype, "position", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "created", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "open", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "beforeSanitizeHtml", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "beforeOpen", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "close", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "beforeClose", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "dragStart", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "dragStop", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "drag", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "overlayClick", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "resizeStart", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "resizing", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "resizeStop", void 0);
    __decorate2([
      Event()
    ], Dialog2.prototype, "destroyed", void 0);
    Dialog2 = __decorate2([
      NotifyPropertyChanges
    ], Dialog2);
    return Dialog2;
  }(Component)
);
var DialogUtility;
(function(DialogUtility2) {
  function alert(args) {
    var dialogElement = createElement("div", { "className": DLG_UTIL_ALERT });
    document.body.appendChild(dialogElement);
    var alertDialogObj;
    var okButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }];
    if (typeof args === "string") {
      alertDialogObj = createDialog({
        content: args,
        position: { X: "center", Y: "top" },
        isModal: true,
        header: DLG_UTIL_DEFAULT_TITLE,
        buttons: okButtonModel
      }, dialogElement);
    } else {
      alertDialogObj = createDialog(alertOptions(args), dialogElement);
    }
    alertDialogObj.close = function() {
      if (args && args.close) {
        args.close.apply(alertDialogObj);
      }
      alertDialogObj.destroy();
      if (alertDialogObj.element.classList.contains("e-dlg-modal")) {
        alertDialogObj.element.parentElement.remove();
        alertDialogObj.target.classList.remove(DLG_UTIL_ROOT);
      } else {
        alertDialogObj.element.remove();
      }
    };
    return alertDialogObj;
  }
  DialogUtility2.alert = alert;
  function confirm(args) {
    var dialogElement = createElement("div", { "className": DLG_UTIL_CONFIRM });
    document.body.appendChild(dialogElement);
    var confirmDialogObj;
    var okCancelButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }, {
      buttonModel: { content: "Cancel" },
      click: function() {
        this.hide();
      }
    }];
    if (typeof args === "string") {
      confirmDialogObj = createDialog({
        position: { X: "center", Y: "top" },
        content: args,
        isModal: true,
        header: DLG_UTIL_DEFAULT_TITLE,
        buttons: okCancelButtonModel
      }, dialogElement);
    } else {
      confirmDialogObj = createDialog(confirmOptions(args), dialogElement);
    }
    confirmDialogObj.close = function() {
      if (args && args.close) {
        args.close.apply(confirmDialogObj);
      }
      confirmDialogObj.destroy();
      if (confirmDialogObj.element.classList.contains("e-dlg-modal")) {
        confirmDialogObj.element.parentElement.remove();
        confirmDialogObj.target.classList.remove(DLG_UTIL_ROOT);
      } else {
        confirmDialogObj.element.remove();
      }
    };
    return confirmDialogObj;
  }
  DialogUtility2.confirm = confirm;
  function createDialog(options, element2) {
    var dialogObject = new Dialog(options);
    dialogObject.appendTo(element2);
    return dialogObject;
  }
  function alertOptions(option) {
    var options = {};
    options.buttons = [];
    options = formOptions(options, option);
    options = setAlertButtonModel(options, option);
    return options;
  }
  function confirmOptions(option) {
    var options = {};
    options.buttons = [];
    options = formOptions(options, option);
    options = setConfirmButtonModel(options, option);
    return options;
  }
  function formOptions(options, option) {
    options.header = !isNullOrUndefined(option.title) ? option.title : null;
    options.content = !isNullOrUndefined(option.content) ? option.content : "";
    options.isModal = !isNullOrUndefined(option.isModal) ? option.isModal : true;
    options.showCloseIcon = !isNullOrUndefined(option.showCloseIcon) ? option.showCloseIcon : false;
    options.allowDragging = !isNullOrUndefined(option.isDraggable) ? option.isDraggable : false;
    options.closeOnEscape = !isNullOrUndefined(option.closeOnEscape) ? option.closeOnEscape : false;
    options.position = !isNullOrUndefined(option.position) ? option.position : { X: "center", Y: "top" };
    options.animationSettings = !isNullOrUndefined(option.animationSettings) ? option.animationSettings : { effect: "Fade", duration: 400, delay: 0 };
    options.cssClass = !isNullOrUndefined(option.cssClass) ? option.cssClass : "";
    options.zIndex = !isNullOrUndefined(option.zIndex) ? option.zIndex : 1e3;
    options.open = !isNullOrUndefined(option.open) ? option.open : null;
    options.width = !isNullOrUndefined(option.width) ? option.width : "auto";
    options.height = !isNullOrUndefined(option.height) ? option.height : "auto";
    return options;
  }
  function setAlertButtonModel(options, option) {
    var alertButtonModel = [{
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    }];
    if (!isNullOrUndefined(option.okButton)) {
      options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, alertButtonModel[0]);
    } else {
      options.buttons = alertButtonModel;
    }
    return options;
  }
  function setConfirmButtonModel(options, option) {
    var okButtonModel = {
      buttonModel: { isPrimary: true, content: "OK" },
      click: function() {
        this.hide();
      }
    };
    var cancelButtonModel = {
      buttonModel: { content: "Cancel" },
      click: function() {
        this.hide();
      }
    };
    if (!isNullOrUndefined(option.okButton)) {
      options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, okButtonModel);
    } else {
      options.buttons[0] = okButtonModel;
    }
    if (!isNullOrUndefined(option.cancelButton)) {
      options.buttons[1] = formButtonModel(options.buttons[1], option.cancelButton, cancelButtonModel);
    } else {
      options.buttons[1] = cancelButtonModel;
    }
    return options;
  }
  function formButtonModel(buttonModel, option, buttonPropModel) {
    var buttonProps = buttonPropModel;
    if (!isNullOrUndefined(option.text)) {
      buttonProps.buttonModel.content = option.text;
    }
    if (!isNullOrUndefined(option.icon)) {
      buttonProps.buttonModel.iconCss = option.icon;
    }
    if (!isNullOrUndefined(option.cssClass)) {
      buttonProps.buttonModel.cssClass = option.cssClass;
    }
    if (!isNullOrUndefined(option.click)) {
      buttonProps.click = option.click;
    }
    if (!isNullOrUndefined(option.isFlat)) {
      buttonProps.isFlat = option.isFlat;
    }
    return buttonProps;
  }
})(DialogUtility || (DialogUtility = {}));

// node_modules/@syncfusion/ej2-popups/src/tooltip/tooltip.js
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
var TOUCHEND_HIDE_DELAY = 1500;
var TAPHOLD_THRESHOLD = 500;
var SHOW_POINTER_TIP_GAP = 0;
var HIDE_POINTER_TIP_GAP = 8;
var MOUSE_TRAIL_GAP = 2;
var POINTER_ADJUST = 2;
var ROOT2 = "e-tooltip";
var RTL2 = "e-rtl";
var DEVICE2 = "e-bigger";
var ICON2 = "e-icons";
var CLOSE = "e-tooltip-close";
var TOOLTIP_WRAP = "e-tooltip-wrap";
var CONTENT = "e-tip-content";
var ARROW_TIP = "e-arrow-tip";
var ARROW_TIP_OUTER = "e-arrow-tip-outer";
var ARROW_TIP_INNER = "e-arrow-tip-inner";
var TIP_BOTTOM = "e-tip-bottom";
var TIP_TOP = "e-tip-top";
var TIP_LEFT = "e-tip-left";
var TIP_RIGHT = "e-tip-right";
var POPUP_ROOT2 = "e-popup";
var POPUP_OPEN = "e-popup-open";
var POPUP_CLOSE = "e-popup-close";
var POPUP_LIB = "e-lib";
var HIDE_POPUP = "e-hidden";
var POPUP_CONTAINER = "e-tooltip-popup-container";
var Animation2 = (
  /** @class */
  function(_super) {
    __extends3(Animation3, _super);
    function Animation3() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate3([
      Property({ effect: "FadeIn", duration: 150, delay: 0 })
    ], Animation3.prototype, "open", void 0);
    __decorate3([
      Property({ effect: "FadeOut", duration: 150, delay: 0 })
    ], Animation3.prototype, "close", void 0);
    return Animation3;
  }(ChildProperty)
);
var Tooltip = (
  /** @class */
  function(_super) {
    __extends3(Tooltip2, _super);
    function Tooltip2(options, element2) {
      var _this = _super.call(this, options, element2) || this;
      _this.mouseMoveEvent = null;
      _this.mouseMoveTarget = null;
      _this.containerElement = null;
      _this.isBodyContainer = true;
      return _this;
    }
    Tooltip2.prototype.initialize = function() {
      this.formatPosition();
      addClass([this.element], ROOT2);
    };
    Tooltip2.prototype.formatPosition = function() {
      var _a, _b;
      if (!this.position)
        return;
      if (this.position.indexOf("Top") === 0 || this.position.indexOf("Bottom") === 0) {
        _a = this.position.split(/(?=[A-Z])/), this.tooltipPositionY = _a[0], this.tooltipPositionX = _a[1];
      } else {
        _b = this.position.split(/(?=[A-Z])/), this.tooltipPositionX = _b[0], this.tooltipPositionY = _b[1];
      }
    };
    Tooltip2.prototype.renderArrow = function() {
      this.setTipClass(this.position);
      var tip = this.createElement("div", { className: ARROW_TIP + " " + this.tipClass });
      tip.appendChild(this.createElement("div", { className: ARROW_TIP_OUTER + " " + this.tipClass }));
      tip.appendChild(this.createElement("div", { className: ARROW_TIP_INNER + " " + this.tipClass }));
      this.tooltipEle.appendChild(tip);
    };
    Tooltip2.prototype.setTipClass = function(position) {
      if (position.indexOf("Right") === 0) {
        this.tipClass = TIP_LEFT;
      } else if (position.indexOf("Bottom") === 0) {
        this.tipClass = TIP_TOP;
      } else if (position.indexOf("Left") === 0) {
        this.tipClass = TIP_RIGHT;
      } else {
        this.tipClass = TIP_BOTTOM;
      }
    };
    Tooltip2.prototype.renderPopup = function(target) {
      var elePos = this.mouseTrail ? { top: 0, left: 0 } : this.getTooltipPosition(target);
      this.tooltipEle.classList.remove(POPUP_LIB);
      this.popupObj = new Popup(this.tooltipEle, {
        height: this.height,
        width: this.width,
        position: { X: elePos.left, Y: elePos.top },
        enableRtl: this.enableRtl,
        open: this.openPopupHandler.bind(this),
        close: this.closePopupHandler.bind(this)
      });
    };
    Tooltip2.prototype.getScalingFactor = function(target) {
      if (!target) {
        return { x: 1, y: 1 };
      }
      var scalingFactors = { x: 1, y: 1 };
      var elementsWithTransform = target.closest('[style*="transform: scale"]');
      if (elementsWithTransform && elementsWithTransform !== this.tooltipEle && elementsWithTransform.contains(this.tooltipEle)) {
        var computedStyle = window.getComputedStyle(elementsWithTransform);
        var transformValue = computedStyle.getPropertyValue("transform");
        var matrixValues = transformValue.match(/matrix\(([^)]+)\)/)[1].split(",").map(parseFloat);
        scalingFactors.x = matrixValues[0];
        scalingFactors.y = matrixValues[3];
      }
      return scalingFactors;
    };
    Tooltip2.prototype.getTooltipPosition = function(target) {
      this.tooltipEle.style.display = "block";
      var parentWithZoomStyle = this.element.closest('[style*="zoom"]');
      if (parentWithZoomStyle) {
        if (!parentWithZoomStyle.contains(this.tooltipEle)) {
          this.tooltipEle.style.zoom = getComputedStyle(parentWithZoomStyle).zoom;
        }
      }
      var pos = calculatePosition(target, this.tooltipPositionX, this.tooltipPositionY, !this.isBodyContainer, this.isBodyContainer ? null : this.containerElement.getBoundingClientRect());
      var scalingFactors = this.getScalingFactor(target);
      var offsetPos = this.calculateTooltipOffset(this.position, scalingFactors.x, scalingFactors.y);
      var collisionPosition = this.calculateElementPosition(pos, offsetPos);
      var collisionLeft = collisionPosition[0];
      var collisionTop = collisionPosition[1];
      var elePos = this.collisionFlipFit(target, collisionLeft, collisionTop);
      elePos.left = elePos.left / scalingFactors.x;
      elePos.top = elePos.top / scalingFactors.y;
      this.tooltipEle.style.display = "";
      return elePos;
    };
    Tooltip2.prototype.windowResize = function() {
      this.reposition(this.findTarget());
    };
    Tooltip2.prototype.reposition = function(target) {
      if (this.popupObj && target) {
        var elePos = this.getTooltipPosition(target);
        this.popupObj.position = { X: elePos.left, Y: elePos.top };
        this.popupObj.dataBind();
      }
    };
    Tooltip2.prototype.openPopupHandler = function() {
      if (!this.mouseTrail && this.needTemplateReposition()) {
        this.reposition(this.findTarget());
      }
      this.trigger("afterOpen", this.tooltipEventArgs);
      this.tooltipEventArgs = null;
    };
    Tooltip2.prototype.closePopupHandler = function() {
      if (this.isReact && !(this.opensOn === "Click" || typeof this.content === "function")) {
        this.clearTemplate(["content"]);
      }
      this.clear();
      var tooltipAfterCloseEventArgs = {
        type: this.tooltipEventArgs.event ? this.tooltipEventArgs.event.type : null,
        cancel: false,
        target: this.tooltipEventArgs.target,
        event: this.tooltipEventArgs.event ? this.tooltipEventArgs.event : null,
        element: this.tooltipEle,
        isInteracted: !isNullOrUndefined(this.tooltipEventArgs.event)
      };
      this.trigger("afterClose", tooltipAfterCloseEventArgs);
      tooltipAfterCloseEventArgs = null;
    };
    Tooltip2.prototype.calculateTooltipOffset = function(position, xScalingFactor, yScalingFactor) {
      if (xScalingFactor === void 0) {
        xScalingFactor = 1;
      }
      if (yScalingFactor === void 0) {
        yScalingFactor = 1;
      }
      var pos = { top: 0, left: 0 };
      var tipWidth;
      var tipHeight;
      var tooltipEleWidth;
      var tooltipEleHeight;
      var arrowEle;
      var tipAdjust;
      var tipHeightAdjust;
      var tipWidthAdjust;
      if (xScalingFactor !== 1 || yScalingFactor !== 1) {
        var tooltipEleRect = this.tooltipEle.getBoundingClientRect();
        var arrowEleRect = void 0;
        tooltipEleWidth = Math.round(tooltipEleRect.width);
        tooltipEleHeight = Math.round(tooltipEleRect.height);
        arrowEle = select("." + ARROW_TIP, this.tooltipEle);
        if (arrowEle) {
          arrowEleRect = arrowEle.getBoundingClientRect();
        }
        tipWidth = arrowEle ? Math.round(arrowEleRect.width) : 0;
        tipHeight = arrowEle ? Math.round(arrowEleRect.height) : 0;
        tipAdjust = this.showTipPointer ? SHOW_POINTER_TIP_GAP : HIDE_POINTER_TIP_GAP;
        tipHeightAdjust = tipHeight / 2 + POINTER_ADJUST + (tooltipEleHeight - this.tooltipEle.clientHeight * yScalingFactor);
        tipWidthAdjust = tipWidth / 2 + POINTER_ADJUST + (tooltipEleWidth - this.tooltipEle.clientWidth * xScalingFactor);
      } else {
        tooltipEleWidth = this.tooltipEle.offsetWidth;
        tooltipEleHeight = this.tooltipEle.offsetHeight;
        arrowEle = select("." + ARROW_TIP, this.tooltipEle);
        tipWidth = arrowEle ? arrowEle.offsetWidth : 0;
        tipHeight = arrowEle ? arrowEle.offsetHeight : 0;
        tipAdjust = this.showTipPointer ? SHOW_POINTER_TIP_GAP : HIDE_POINTER_TIP_GAP;
        tipHeightAdjust = tipHeight / 2 + POINTER_ADJUST + (this.tooltipEle.offsetHeight - this.tooltipEle.clientHeight);
        tipWidthAdjust = tipWidth / 2 + POINTER_ADJUST + (this.tooltipEle.offsetWidth - this.tooltipEle.clientWidth);
      }
      if (this.mouseTrail) {
        tipAdjust += MOUSE_TRAIL_GAP;
      }
      switch (position) {
        case "RightTop":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tooltipEleHeight - tipHeightAdjust;
          break;
        case "RightCenter":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tooltipEleHeight / 2;
          break;
        case "RightBottom":
          pos.left += tipWidth + tipAdjust;
          pos.top -= tipHeightAdjust;
          break;
        case "BottomRight":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tipWidthAdjust;
          break;
        case "BottomCenter":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth / 2;
          break;
        case "BottomLeft":
          pos.top += tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth - tipWidthAdjust;
          break;
        case "LeftBottom":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tipHeightAdjust;
          break;
        case "LeftCenter":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tooltipEleHeight / 2;
          break;
        case "LeftTop":
          pos.left -= tipWidth + tooltipEleWidth + tipAdjust;
          pos.top -= tooltipEleHeight - tipHeightAdjust;
          break;
        case "TopLeft":
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth - tipWidthAdjust;
          break;
        case "TopRight":
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tipWidthAdjust;
          break;
        default:
          pos.top -= tooltipEleHeight + tipHeight + tipAdjust;
          pos.left -= tooltipEleWidth / 2;
          break;
      }
      pos.left += this.offsetX;
      pos.top += this.offsetY;
      return pos;
    };
    Tooltip2.prototype.updateTipPosition = function(position) {
      var selEle = selectAll("." + ARROW_TIP + ",." + ARROW_TIP_OUTER + ",." + ARROW_TIP_INNER, this.tooltipEle);
      var removeList = [TIP_BOTTOM, TIP_TOP, TIP_LEFT, TIP_RIGHT];
      removeClass(selEle, removeList);
      this.setTipClass(position);
      addClass(selEle, this.tipClass);
    };
    Tooltip2.prototype.adjustArrow = function(target, position, tooltipPositionX, tooltipPositionY) {
      var arrowEle = select("." + ARROW_TIP, this.tooltipEle);
      if (this.showTipPointer === false || arrowEle === null) {
        return;
      }
      this.updateTipPosition(position);
      var leftValue;
      var topValue;
      this.tooltipEle.style.display = "block";
      var tooltipWidth = this.tooltipEle.clientWidth;
      var tooltipHeight = this.tooltipEle.clientHeight;
      var arrowInnerELe = select("." + ARROW_TIP_INNER, this.tooltipEle);
      var tipWidth = arrowEle.offsetWidth;
      var tipHeight = arrowEle.offsetHeight;
      this.tooltipEle.style.display = "";
      if (this.tipClass === TIP_BOTTOM || this.tipClass === TIP_TOP) {
        if (this.tipClass === TIP_BOTTOM) {
          topValue = "99.9%";
          arrowInnerELe.style.top = "-" + (tipHeight - 2) + "px";
        } else {
          topValue = -(tipHeight - 1) + "px";
          arrowInnerELe.style.top = "-" + (tipHeight - 6) + "px";
        }
        if (target) {
          var tipPosExclude = tooltipPositionX !== "Center" || tooltipWidth > target.offsetWidth || this.mouseTrail;
          if (tipPosExclude && tooltipPositionX === "Left" || !tipPosExclude && this.tipPointerPosition === "End") {
            leftValue = tooltipWidth - tipWidth - POINTER_ADJUST + "px";
          } else if (tipPosExclude && tooltipPositionX === "Right" || !tipPosExclude && this.tipPointerPosition === "Start") {
            leftValue = POINTER_ADJUST + "px";
          } else if (tipPosExclude && (this.tipPointerPosition === "End" || this.tipPointerPosition === "Start")) {
            leftValue = this.tipPointerPosition === "End" ? target.offsetWidth + (this.tooltipEle.offsetWidth - target.offsetWidth) / 2 - tipWidth / 2 - POINTER_ADJUST + "px" : (this.tooltipEle.offsetWidth - target.offsetWidth) / 2 - tipWidth / 2 + POINTER_ADJUST + "px";
          } else {
            leftValue = tooltipWidth / 2 - tipWidth / 2 + "px";
          }
        }
      } else {
        if (this.tipClass === TIP_RIGHT) {
          leftValue = "99.9%";
          arrowInnerELe.style.left = "-" + (tipWidth - 2) + "px";
        } else {
          leftValue = -(tipWidth - 1) + "px";
          arrowInnerELe.style.left = -tipWidth + (tipWidth - 2) + "px";
        }
        var tipPosExclude = tooltipPositionY !== "Center" || tooltipHeight > target.offsetHeight || this.mouseTrail;
        if (tipPosExclude && tooltipPositionY === "Top" || !tipPosExclude && this.tipPointerPosition === "End") {
          topValue = tooltipHeight - tipHeight - POINTER_ADJUST + "px";
        } else if (tipPosExclude && tooltipPositionY === "Bottom" || !tipPosExclude && this.tipPointerPosition === "Start") {
          topValue = POINTER_ADJUST + "px";
        } else {
          topValue = tooltipHeight / 2 - tipHeight / 2 + "px";
        }
      }
      arrowEle.style.top = topValue;
      arrowEle.style.left = leftValue;
    };
    Tooltip2.prototype.renderContent = function(target) {
      var _this = this;
      var tooltipContent = select("." + CONTENT, this.tooltipEle);
      if (this.cssClass) {
        addClass([this.tooltipEle], this.cssClass.split(" "));
      }
      if (target && !isNullOrUndefined(target.getAttribute("title"))) {
        target.setAttribute("data-content", target.getAttribute("title"));
        target.removeAttribute("title");
      }
      if (!isNullOrUndefined(this.content)) {
        tooltipContent.innerHTML = "";
        if (this.content instanceof HTMLElement) {
          tooltipContent.appendChild(this.content);
        } else if (typeof this.content === "string") {
          if (this.isAngular) {
            this.setProperties({ content: SanitizeHtmlHelper.sanitize(this.content) }, true);
          } else {
            this.content = this.enableHtmlSanitizer ? SanitizeHtmlHelper.sanitize(this.content) : this.content;
          }
          if (this.enableHtmlParse) {
            var tempFunction = compile(this.content);
            var tempArr = tempFunction({}, this, "content", this.element.id + "content", void 0, void 0, tooltipContent, this.root);
            if (tempArr) {
              append(tempArr, tooltipContent);
            }
          } else {
            tooltipContent["textContent"] = this.content;
          }
        } else {
          var templateFunction = compile(this.content);
          var tempArr = templateFunction({}, this, "content", this.element.id + "content", void 0, void 0, tooltipContent);
          if (tempArr) {
            if (this.isAngular) {
              setTimeout(function() {
                _this.reposition(target);
              }, 1);
            }
            append(tempArr, tooltipContent);
          }
          this.renderReactTemplates();
        }
      } else {
        if (target && !isNullOrUndefined(target.getAttribute("data-content"))) {
          tooltipContent.innerHTML = target.getAttribute("data-content");
        }
      }
    };
    Tooltip2.prototype.renderCloseIcon = function() {
      if (!this.isSticky) {
        var existingCloseIcon = this.tooltipEle.querySelector("." + ICON2 + "." + CLOSE);
        if (existingCloseIcon) {
          remove(existingCloseIcon);
        }
        return;
      }
      var tipClose = this.createElement("div", { className: ICON2 + " " + CLOSE });
      this.tooltipEle.appendChild(tipClose);
      EventHandler.add(tipClose, Browser.touchStartEvent, this.onStickyClose, this);
    };
    Tooltip2.prototype.addDescribedBy = function(target, id) {
      var describedby = (target.getAttribute("aria-describedby") || "").split(/\s+/);
      if (describedby.indexOf(id) < 0) {
        describedby.push(id);
      }
      attributes(target, { "aria-describedby": describedby.join(" ").trim(), "data-tooltip-id": id });
    };
    Tooltip2.prototype.removeDescribedBy = function(target) {
      var id = target.getAttribute("data-tooltip-id");
      var describedby = (target.getAttribute("aria-describedby") || "").split(/\s+/);
      var index = describedby.indexOf(id);
      if (index !== -1) {
        describedby.splice(index, 1);
      }
      target.removeAttribute("data-tooltip-id");
      var orgdescribedby = describedby.join(" ").trim();
      if (orgdescribedby) {
        target.setAttribute("aria-describedby", orgdescribedby);
      } else {
        target.removeAttribute("aria-describedby");
      }
    };
    Tooltip2.prototype.tapHoldHandler = function(evt) {
      clearTimeout(this.autoCloseTimer);
      this.targetHover(evt.originalEvent);
    };
    Tooltip2.prototype.touchEndHandler = function() {
      var _this = this;
      if (this.isSticky) {
        return;
      }
      var close = function() {
        _this.close();
      };
      this.autoCloseTimer = setTimeout(close, TOUCHEND_HIDE_DELAY);
    };
    Tooltip2.prototype.targetClick = function(e) {
      var target;
      if (this.target) {
        target = closest(e.target, this.target);
      } else {
        target = this.element;
      }
      if (isNullOrUndefined(target)) {
        return;
      }
      if (target.getAttribute("data-tooltip-id") === null) {
        this.targetHover(e);
      } else if (!this.isSticky) {
        this.hideTooltip(this.animation.close, e, target);
      }
    };
    Tooltip2.prototype.targetHover = function(e) {
      var target;
      if (this.target) {
        target = closest(e.target, this.target);
      } else {
        target = this.element;
      }
      if (isNullOrUndefined(target) || target.getAttribute("data-tooltip-id") !== null && this.closeDelay === 0) {
        return;
      }
      var targetList = [].slice.call(selectAll('[data-tooltip-id= "' + this.ctrlId + '_content"]', document));
      for (var _i = 0, targetList_1 = targetList; _i < targetList_1.length; _i++) {
        var target_1 = targetList_1[_i];
        this.restoreElement(target_1);
      }
      this.showTooltip(target, this.animation.open, e);
    };
    Tooltip2.prototype.mouseMoveBeforeOpen = function(e) {
      this.mouseMoveEvent = e;
    };
    Tooltip2.prototype.mouseMoveBeforeRemove = function() {
      if (this.mouseMoveTarget) {
        EventHandler.remove(this.mouseMoveTarget, "mousemove touchstart", this.mouseMoveBeforeOpen);
      }
    };
    Tooltip2.prototype.showTooltip = function(target, showAnimation, e) {
      var _this = this;
      clearTimeout(this.showTimer);
      clearTimeout(this.hideTimer);
      if (this.openDelay && this.mouseTrail) {
        this.mouseMoveBeforeRemove();
        this.mouseMoveTarget = target;
        EventHandler.add(this.mouseMoveTarget, "mousemove touchstart", this.mouseMoveBeforeOpen, this);
      }
      this.tooltipEventArgs = {
        type: e ? e.type : null,
        cancel: false,
        target,
        event: e ? e : null,
        element: this.tooltipEle,
        isInteracted: !isNullOrUndefined(e)
      };
      var observeCallback = function(beforeRenderArgs) {
        _this.beforeRenderCallback(beforeRenderArgs, target, e, showAnimation);
      };
      this.trigger("beforeRender", this.tooltipEventArgs, observeCallback.bind(this));
    };
    Tooltip2.prototype.beforeRenderCallback = function(beforeRenderArgs, target, e, showAnimation) {
      if (beforeRenderArgs.cancel) {
        this.isHidden = true;
        this.clear();
        this.mouseMoveBeforeRemove();
      } else {
        this.isHidden = false;
        if (isNullOrUndefined(this.tooltipEle)) {
          this.ctrlId = this.element.getAttribute("id") ? getUniqueID(this.element.getAttribute("id")) : getUniqueID("tooltip");
          this.tooltipEle = this.createElement("div", {
            className: TOOLTIP_WRAP + " " + POPUP_ROOT2 + " " + POPUP_LIB,
            attrs: {
              role: "tooltip",
              "aria-hidden": "false",
              "id": this.ctrlId + "_content"
            },
            styles: "width:" + formatUnit(this.width) + ";height:" + formatUnit(this.height) + ";position:absolute;"
          });
          this.tooltipBeforeRender(target, this);
          this.tooltipAfterRender(target, e, showAnimation, this);
        } else {
          if (target) {
            this.adjustArrow(target, this.position, this.tooltipPositionX, this.tooltipPositionY);
            this.addDescribedBy(target, this.ctrlId + "_content");
            this.renderContent(target);
            Animation.stop(this.tooltipEle);
            this.reposition(target);
            this.tooltipAfterRender(target, e, showAnimation, this);
          }
        }
      }
    };
    Tooltip2.prototype.appendContainer = function(ctrlObj) {
      if (typeof this.container == "string") {
        if (this.container === "body") {
          this.containerElement = document.body;
        } else {
          this.isBodyContainer = false;
          this.containerElement = select(this.container, document);
        }
      } else if (this.container instanceof HTMLElement) {
        this.containerElement = this.container;
        this.isBodyContainer = this.containerElement.tagName === "BODY";
      }
      if (!this.isBodyContainer) {
        addClass([this.containerElement], POPUP_CONTAINER);
      }
      this.containerElement.appendChild(ctrlObj.tooltipEle);
    };
    Tooltip2.prototype.tooltipBeforeRender = function(target, ctrlObj) {
      if (target) {
        if (Browser.isDevice) {
          addClass([ctrlObj.tooltipEle], DEVICE2);
        }
        if (ctrlObj.width !== "auto") {
          ctrlObj.tooltipEle.style.maxWidth = formatUnit(ctrlObj.width);
        }
        ctrlObj.tooltipEle.appendChild(ctrlObj.createElement("div", { className: CONTENT }));
        this.appendContainer(ctrlObj);
        removeClass([ctrlObj.tooltipEle], HIDE_POPUP);
        ctrlObj.addDescribedBy(target, ctrlObj.ctrlId + "_content");
        ctrlObj.renderContent(target);
        addClass([ctrlObj.tooltipEle], POPUP_OPEN);
        if (ctrlObj.showTipPointer) {
          ctrlObj.renderArrow();
        }
        ctrlObj.renderCloseIcon();
        ctrlObj.renderPopup(target);
        ctrlObj.adjustArrow(target, ctrlObj.position, ctrlObj.tooltipPositionX, ctrlObj.tooltipPositionY);
        Animation.stop(ctrlObj.tooltipEle);
        ctrlObj.reposition(target);
      }
    };
    Tooltip2.prototype.tooltipAfterRender = function(target, e, showAnimation, ctrlObj) {
      if (target) {
        removeClass([ctrlObj.tooltipEle], POPUP_OPEN);
        addClass([ctrlObj.tooltipEle], POPUP_CLOSE);
        ctrlObj.tooltipEventArgs = {
          type: e ? e.type : null,
          cancel: false,
          target,
          event: e ? e : null,
          element: ctrlObj.tooltipEle,
          isInteracted: !isNullOrUndefined(e)
        };
        if (ctrlObj.needTemplateReposition() && !ctrlObj.mouseTrail && (showAnimation.effect === "None" || showAnimation.effect == "FadeIn" || // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.isReact && typeof ctrlObj.content != "string")) {
          ctrlObj.tooltipEle.style.display = "none";
        }
        var observeCallback = function(observedArgs) {
          ctrlObj.beforeOpenCallback(observedArgs, target, showAnimation, e);
        };
        ctrlObj.trigger("beforeOpen", ctrlObj.tooltipEventArgs, observeCallback.bind(ctrlObj));
      }
    };
    Tooltip2.prototype.beforeOpenCallback = function(observedArgs, target, showAnimation, e) {
      var _this = this;
      if (observedArgs.cancel) {
        this.isHidden = true;
        this.clear();
        this.mouseMoveBeforeRemove();
        this.restoreElement(target);
      } else {
        var openAnimation_1 = {
          name: showAnimation.effect === "None" && animationMode === "Enable" ? "FadeIn" : this.animation.open.effect,
          duration: showAnimation.duration,
          delay: showAnimation.delay,
          timingFunction: "easeOut"
        };
        if (showAnimation.effect === "None") {
          openAnimation_1 = void 0;
        }
        if (this.openDelay > 0) {
          var show = function() {
            if (_this.mouseTrail) {
              EventHandler.add(target, "mousemove touchstart mouseenter", _this.onMouseMove, _this);
            }
            if (_this.popupObj) {
              _this.popupObj.show(openAnimation_1, target);
              if (_this.mouseMoveEvent && _this.mouseTrail) {
                _this.onMouseMove(_this.mouseMoveEvent);
              }
            }
          };
          this.showTimer = setTimeout(show, this.openDelay);
        } else {
          if (this.popupObj) {
            this.popupObj.show(openAnimation_1, target);
          }
        }
      }
      if (e) {
        this.wireMouseEvents(e, target);
      }
    };
    Tooltip2.prototype.needTemplateReposition = function() {
      var tooltip = this;
      return !isNullOrUndefined(tooltip.viewContainerRef) && typeof tooltip.viewContainerRef !== "string" || this.isReact;
    };
    Tooltip2.prototype.checkCollision = function(target, x, y) {
      var elePos = {
        left: x,
        top: y,
        position: this.position,
        horizontal: this.tooltipPositionX,
        vertical: this.tooltipPositionY
      };
      var affectedPos = isCollide(this.tooltipEle, this.checkCollideTarget(), x, y);
      if (affectedPos.length > 0) {
        elePos.horizontal = affectedPos.indexOf("left") >= 0 ? "Right" : affectedPos.indexOf("right") >= 0 ? "Left" : this.tooltipPositionX;
        elePos.vertical = affectedPos.indexOf("top") >= 0 ? "Bottom" : affectedPos.indexOf("bottom") >= 0 ? "Top" : this.tooltipPositionY;
      }
      return elePos;
    };
    Tooltip2.prototype.calculateElementPosition = function(pos, offsetPos) {
      return [
        this.isBodyContainer ? pos.left + offsetPos.left : pos.left - this.containerElement.getBoundingClientRect().left + offsetPos.left + window.pageXOffset + this.containerElement.scrollLeft,
        this.isBodyContainer ? pos.top + offsetPos.top : pos.top - this.containerElement.getBoundingClientRect().top + offsetPos.top + window.pageYOffset + this.containerElement.scrollTop
      ];
    };
    Tooltip2.prototype.collisionFlipFit = function(target, x, y) {
      var elePos = this.checkCollision(target, x, y);
      var newpos = elePos.position;
      if (this.tooltipPositionY !== elePos.vertical) {
        newpos = this.position.indexOf("Bottom") === 0 || this.position.indexOf("Top") === 0 ? elePos.vertical + this.tooltipPositionX : this.tooltipPositionX + elePos.vertical;
      }
      if (this.tooltipPositionX !== elePos.horizontal) {
        if (newpos.indexOf("Left") === 0) {
          elePos.vertical = newpos === "LeftTop" || newpos === "LeftCenter" ? "Top" : "Bottom";
          newpos = elePos.vertical + "Left";
        }
        if (newpos.indexOf("Right") === 0) {
          elePos.vertical = newpos === "RightTop" || newpos === "RightCenter" ? "Top" : "Bottom";
          newpos = elePos.vertical + "Right";
        }
        elePos.horizontal = this.tooltipPositionX;
      }
      this.tooltipEventArgs = {
        type: null,
        cancel: false,
        target,
        event: null,
        element: this.tooltipEle,
        collidedPosition: newpos
      };
      this.trigger("beforeCollision", this.tooltipEventArgs);
      if (this.tooltipEventArgs.cancel) {
        newpos = this.position;
      } else {
        var elePosVertical = elePos.vertical;
        var elePosHorizontal = elePos.horizontal;
        if (elePos.position !== newpos) {
          var pos = calculatePosition(target, elePosHorizontal, elePosVertical, !this.isBodyContainer, this.isBodyContainer ? null : this.containerElement.getBoundingClientRect());
          this.adjustArrow(target, newpos, elePosHorizontal, elePosVertical);
          var scalingFactors = this.getScalingFactor(target);
          var offsetPos = this.calculateTooltipOffset(newpos, scalingFactors.x, scalingFactors.y);
          offsetPos.top -= this.getOffSetPosition("TopBottom", newpos, this.offsetY);
          offsetPos.left -= this.getOffSetPosition("RightLeft", newpos, this.offsetX);
          elePos.position = newpos;
          var elePosition = this.calculateElementPosition(pos, offsetPos);
          elePos.left = elePosition[0];
          elePos.top = elePosition[1];
        } else {
          this.adjustArrow(target, newpos, elePosHorizontal, elePosVertical);
        }
      }
      var eleOffset = { left: elePos.left, top: elePos.top };
      var position = this.isBodyContainer ? fit(this.tooltipEle, this.checkCollideTarget(), { X: true, Y: this.windowCollision }, eleOffset) : eleOffset;
      this.tooltipEle.style.display = "block";
      var arrowEle = select("." + ARROW_TIP, this.tooltipEle);
      if (this.showTipPointer && arrowEle != null && (newpos.indexOf("Bottom") === 0 || newpos.indexOf("Top") === 0)) {
        var arrowleft = parseInt(arrowEle.style.left, 10) - (position.left - elePos.left);
        if (arrowleft < 0) {
          arrowleft = 0;
        } else if (arrowleft + arrowEle.offsetWidth > this.tooltipEle.clientWidth) {
          arrowleft = this.tooltipEle.clientWidth - arrowEle.offsetWidth;
        }
        arrowEle.style.left = arrowleft.toString() + "px";
      }
      this.tooltipEle.style.display = "";
      eleOffset.left = position.left;
      eleOffset.top = position.top;
      return eleOffset;
    };
    Tooltip2.prototype.getOffSetPosition = function(positionString, newPos, offsetType) {
      return positionString.indexOf(this.position.split(/(?=[A-Z])/)[0]) !== -1 && positionString.indexOf(newPos.split(/(?=[A-Z])/)[0]) !== -1 ? 2 * offsetType : 0;
    };
    Tooltip2.prototype.checkCollideTarget = function() {
      return !this.windowCollision && this.target ? this.element : null;
    };
    Tooltip2.prototype.hideTooltip = function(hideAnimation, e, targetElement2) {
      var _this = this;
      if (this.closeDelay > 0) {
        clearTimeout(this.hideTimer);
        clearTimeout(this.showTimer);
        var hide = function() {
          if (_this.closeDelay && _this.tooltipEle && _this.isTooltipOpen) {
            return;
          }
          _this.tooltipHide(hideAnimation, e, targetElement2);
        };
        this.hideTimer = setTimeout(hide, this.closeDelay);
      } else {
        this.tooltipHide(hideAnimation, e, targetElement2);
      }
    };
    Tooltip2.prototype.tooltipHide = function(hideAnimation, e, targetElement2) {
      var _this = this;
      var target;
      if (e) {
        target = this.target ? targetElement2 || e.target : this.element;
      } else {
        target = select('[data-tooltip-id= "' + this.ctrlId + '_content"]', document);
      }
      this.tooltipEventArgs = {
        type: e ? e.type : null,
        cancel: false,
        target,
        event: e ? e : null,
        element: this.tooltipEle,
        isInteracted: !isNullOrUndefined(e)
      };
      this.trigger("beforeClose", this.tooltipEventArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          _this.mouseMoveBeforeRemove();
          _this.popupHide(hideAnimation, target, e);
        } else {
          _this.isHidden = false;
        }
      });
    };
    Tooltip2.prototype.popupHide = function(hideAnimation, target, e) {
      if (target && e) {
        this.restoreElement(target);
      }
      this.isHidden = true;
      var closeAnimation = {
        name: hideAnimation.effect === "None" && animationMode === "Enable" ? "FadeOut" : this.animation.close.effect,
        duration: hideAnimation.duration,
        delay: hideAnimation.delay,
        timingFunction: "easeIn"
      };
      if (hideAnimation.effect === "None") {
        closeAnimation = void 0;
      }
      if (this.popupObj) {
        this.popupObj.hide(closeAnimation);
      }
    };
    Tooltip2.prototype.restoreElement = function(target) {
      this.unwireMouseEvents(target);
      if (!isNullOrUndefined(target.getAttribute("data-content"))) {
        target.setAttribute("title", target.getAttribute("data-content"));
        target.removeAttribute("data-content");
      }
      this.removeDescribedBy(target);
    };
    Tooltip2.prototype.clear = function() {
      var target = this.findTarget();
      if (target) {
        this.restoreElement(target);
      }
      if (this.tooltipEle) {
        removeClass([this.tooltipEle], POPUP_CLOSE);
        addClass([this.tooltipEle], POPUP_OPEN);
      }
      if (this.isHidden) {
        if (this.popupObj) {
          this.popupObj.destroy();
        }
        if (this.tooltipEle) {
          remove(this.tooltipEle);
        }
        this.tooltipEle = null;
        this.popupObj = null;
      }
    };
    Tooltip2.prototype.tooltipHover = function() {
      if (this.tooltipEle) {
        this.isTooltipOpen = true;
      }
    };
    Tooltip2.prototype.tooltipMouseOut = function(e) {
      this.isTooltipOpen = false;
      this.hideTooltip(this.animation.close, e, this.findTarget());
    };
    Tooltip2.prototype.onMouseOut = function(e) {
      var enteredElement = e.relatedTarget;
      if (enteredElement && !this.mouseTrail) {
        var checkForTooltipElement = closest(enteredElement, "." + TOOLTIP_WRAP + "." + POPUP_LIB + "." + POPUP_ROOT2);
        if (checkForTooltipElement) {
          EventHandler.add(checkForTooltipElement, "mouseleave", this.tooltipElementMouseOut, this);
        } else {
          this.hideTooltip(this.animation.close, e, this.findTarget());
          if (this.closeDelay === 0 && (this.animation.close.effect === "None" || this.isReact && typeof this.content != "string")) {
            this.clear();
          }
        }
      } else {
        this.hideTooltip(this.animation.close, e, this.findTarget());
        this.clear();
      }
      if (this.popupObj && !this.popupObj.element.classList.contains(POPUP_OPEN)) {
        this.clear();
      }
    };
    Tooltip2.prototype.tooltipElementMouseOut = function(e) {
      this.hideTooltip(this.animation.close, e, this.findTarget());
      EventHandler.remove(this.element, "mouseleave", this.tooltipElementMouseOut);
      this.clear();
    };
    Tooltip2.prototype.onStickyClose = function() {
      this.close();
    };
    Tooltip2.prototype.onMouseMove = function(event) {
      var eventPageX = 0;
      var eventPageY = 0;
      if (event.type.indexOf("touch") > -1) {
        event.preventDefault();
        eventPageX = event.touches[0].pageX;
        eventPageY = event.touches[0].pageY;
      } else {
        eventPageX = event.pageX;
        eventPageY = event.pageY;
      }
      Animation.stop(this.tooltipEle);
      removeClass([this.tooltipEle], POPUP_CLOSE);
      addClass([this.tooltipEle], POPUP_OPEN);
      this.adjustArrow(event.target, this.position, this.tooltipPositionX, this.tooltipPositionY);
      var scalingFactors = this.getScalingFactor(event.target);
      var pos = this.calculateTooltipOffset(this.position, scalingFactors.x, scalingFactors.y);
      var x = eventPageX + pos.left + this.offsetX;
      var y = eventPageY + pos.top + this.offsetY;
      var elePos = this.checkCollision(event.target, x, y);
      if (this.tooltipPositionX !== elePos.horizontal || this.tooltipPositionY !== elePos.vertical) {
        var newpos = this.position.indexOf("Bottom") === 0 || this.position.indexOf("Top") === 0 ? elePos.vertical + elePos.horizontal : elePos.horizontal + elePos.vertical;
        elePos.position = newpos;
        this.adjustArrow(event.target, elePos.position, elePos.horizontal, elePos.vertical);
        var colpos = this.calculateTooltipOffset(elePos.position, scalingFactors.x, scalingFactors.y);
        elePos.left = eventPageX + colpos.left - this.offsetX;
        elePos.top = eventPageY + colpos.top - this.offsetY;
      }
      this.tooltipEle.style.left = elePos.left + "px";
      this.tooltipEle.style.top = elePos.top + "px";
    };
    Tooltip2.prototype.keyDown = function(event) {
      if (this.tooltipEle && event.keyCode === 27) {
        this.close();
      }
    };
    Tooltip2.prototype.touchEnd = function(e) {
      if (this.tooltipEle && closest(e.target, "." + ROOT2) === null && !this.isSticky) {
        this.close();
      }
    };
    Tooltip2.prototype.scrollHandler = function(e) {
      if (this.tooltipEle && !this.isSticky) {
        if (!closest(e.target, "." + TOOLTIP_WRAP + "." + POPUP_LIB + "." + POPUP_ROOT2) && !this.isSticky) {
          this.close();
        }
      }
    };
    Tooltip2.prototype.render = function() {
      this.initialize();
      this.wireEvents(this.opensOn);
      this.renderComplete();
    };
    Tooltip2.prototype.preRender = function() {
      this.tipClass = TIP_BOTTOM;
      this.tooltipPositionX = "Center";
      this.tooltipPositionY = "Top";
      this.isHidden = true;
    };
    Tooltip2.prototype.wireEvents = function(trigger) {
      var triggerList = this.getTriggerList(trigger);
      for (var _i = 0, triggerList_1 = triggerList; _i < triggerList_1.length; _i++) {
        var opensOn = triggerList_1[_i];
        if (opensOn === "Custom") {
          return;
        }
        if (opensOn === "Focus") {
          this.wireFocusEvents();
        }
        if (opensOn === "Click") {
          EventHandler.add(this.element, Browser.touchStartEvent, this.targetClick, this);
        }
        if (opensOn === "Hover") {
          if (Browser.isDevice) {
            this.touchModule = new Touch(this.element, {
              tapHoldThreshold: TAPHOLD_THRESHOLD,
              tapHold: this.tapHoldHandler.bind(this)
            });
            EventHandler.add(this.element, Browser.touchEndEvent, this.touchEndHandler, this);
          } else {
            EventHandler.add(this.element, "mouseover", this.targetHover, this);
          }
        }
      }
      this.windowResizeBound = this.windowResize.bind(this);
      this.keyDownBound = this.keyDown.bind(this);
      this.touchEndBound = this.touchEnd.bind(this);
      this.scrollWheelBound = this.scrollHandler.bind(this);
      document.addEventListener("wheel", this.scrollWheelBound);
      document.addEventListener("scroll", this.scrollWheelBound);
      document.addEventListener("touchend", this.touchEndBound);
      document.addEventListener("keydown", this.keyDownBound);
      window.addEventListener("resize", this.windowResizeBound);
    };
    Tooltip2.prototype.getTriggerList = function(trigger) {
      if (!trigger)
        return [];
      if (trigger === "Auto") {
        trigger = Browser.isDevice ? "Hover" : "Hover Focus";
      }
      return trigger.split(" ");
    };
    Tooltip2.prototype.wireFocusEvents = function() {
      if (!isNullOrUndefined(this.target)) {
        var targetList = [].slice.call(selectAll(this.target, this.element));
        this.targetsList = targetList;
        if (!isNullOrUndefined(this.targetsList) && this.targetsList.length > 0) {
          for (var _i = 0, targetList_2 = targetList; _i < targetList_2.length; _i++) {
            var target = targetList_2[_i];
            EventHandler.add(target, "focus", this.targetHover, this);
          }
        } else {
          EventHandler.add(this.element, "focusin", this.targetHover, this);
        }
      } else {
        EventHandler.add(this.element, "focusin", this.targetHover, this);
      }
    };
    Tooltip2.prototype.wireMouseEvents = function(e, target) {
      if (this.tooltipEle) {
        if (!this.isSticky) {
          if (e.type === "focus") {
            EventHandler.add(target, "blur", this.onMouseOut, this);
          }
          if (e.type === "focusin") {
            EventHandler.add(target, "focusout", this.onMouseOut, this);
          }
          if (e.type === "mouseover") {
            EventHandler.add(target, "mouseleave", this.onMouseOut, this);
          }
          if (this.closeDelay) {
            EventHandler.add(this.tooltipEle, "mouseenter", this.tooltipHover, this);
            EventHandler.add(this.tooltipEle, "mouseleave", this.tooltipMouseOut, this);
          }
        }
        if (this.mouseTrail && this.openDelay === 0) {
          EventHandler.add(target, "mousemove touchstart mouseenter", this.onMouseMove, this);
        }
      }
    };
    Tooltip2.prototype.unwireEvents = function(trigger) {
      var triggerList = this.getTriggerList(trigger);
      for (var _i = 0, triggerList_2 = triggerList; _i < triggerList_2.length; _i++) {
        var opensOn = triggerList_2[_i];
        if (opensOn === "Custom") {
          return;
        }
        if (opensOn === "Focus") {
          this.unwireFocusEvents();
        }
        if (opensOn === "Click") {
          EventHandler.remove(this.element, Browser.touchStartEvent, this.targetClick);
        }
        if (opensOn === "Hover") {
          if (Browser.isDevice) {
            if (this.touchModule) {
              this.touchModule.destroy();
            }
            EventHandler.remove(this.element, Browser.touchEndEvent, this.touchEndHandler);
          } else {
            EventHandler.remove(this.element, "mouseover", this.targetHover);
          }
        }
      }
      document.removeEventListener("touchend", this.touchEndBound);
      this.touchEndBound = null;
      document.removeEventListener("wheel", this.scrollWheelBound);
      document.removeEventListener("scroll", this.scrollWheelBound);
      this.scrollWheelBound = null;
      window.removeEventListener("resize", this.windowResizeBound);
      this.windowResizeBound = null;
      document.removeEventListener("keydown", this.keyDownBound);
      this.keyDownBound = null;
    };
    Tooltip2.prototype.unwireFocusEvents = function() {
      if (!isNullOrUndefined(this.target)) {
        var targetList = [].slice.call(selectAll(this.target, this.element));
        if (!isNullOrUndefined(this.targetsList) && this.targetsList.length > 0) {
          for (var _i = 0, targetList_3 = targetList; _i < targetList_3.length; _i++) {
            var target = targetList_3[_i];
            EventHandler.remove(target, "focus", this.targetHover);
          }
        } else {
          EventHandler.remove(this.element, "focusin", this.targetHover);
        }
      } else {
        EventHandler.remove(this.element, "focusin", this.targetHover);
      }
    };
    Tooltip2.prototype.unwireMouseEvents = function(target) {
      if (!this.isSticky) {
        var triggerList = this.getTriggerList(this.opensOn);
        for (var _i = 0, triggerList_3 = triggerList; _i < triggerList_3.length; _i++) {
          var opensOn = triggerList_3[_i];
          if (opensOn === "Focus") {
            EventHandler.remove(target, "blur", this.onMouseOut);
            EventHandler.remove(target, "focusout", this.onMouseOut);
          }
          if (opensOn === "Hover" && !Browser.isDevice) {
            EventHandler.remove(target, "mouseleave", this.onMouseOut);
          }
        }
        if (this.closeDelay) {
          EventHandler.remove(target, "mouseenter", this.tooltipHover);
          EventHandler.remove(target, "mouseleave", this.tooltipMouseOut);
        }
      }
      if (this.mouseTrail) {
        EventHandler.remove(target, "mousemove touchstart mouseenter", this.onMouseMove);
      }
    };
    Tooltip2.prototype.findTarget = function() {
      var target = select('[data-tooltip-id= "' + this.ctrlId + '_content"]', document);
      return target;
    };
    Tooltip2.prototype.getModuleName = function() {
      return "tooltip";
    };
    Tooltip2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Tooltip2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var targetElement2 = this.findTarget();
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            if (this.tooltipEle && targetElement2) {
              this.tooltipEle.style.width = this.tooltipEle.style.maxWidth = formatUnit(newProp.width);
              this.reposition(targetElement2);
            }
            break;
          case "height":
            if (this.tooltipEle && targetElement2) {
              this.tooltipEle.style.height = formatUnit(newProp.height);
              this.reposition(targetElement2);
            }
            break;
          case "content":
            if (this.tooltipEle) {
              this.renderContent();
            }
            break;
          case "opensOn":
            this.unwireEvents(oldProp.opensOn);
            this.wireEvents(newProp.opensOn);
            break;
          case "position":
            this.formatPosition();
            if (this.tooltipEle && targetElement2) {
              var arrowInnerELe = select("." + ARROW_TIP_INNER, this.tooltipEle);
              if (arrowInnerELe) {
                arrowInnerELe.style.top = arrowInnerELe.style.left = null;
              }
              this.reposition(targetElement2);
            }
            break;
          case "tipPointerPosition":
            if (this.tooltipEle && targetElement2) {
              this.reposition(targetElement2);
            }
            break;
          case "offsetX":
            if (this.tooltipEle) {
              var x = newProp.offsetX - oldProp.offsetX;
              this.tooltipEle.style.left = (parseInt(this.tooltipEle.style.left, 10) + x).toString() + "px";
            }
            break;
          case "offsetY":
            if (this.tooltipEle) {
              var y = newProp.offsetY - oldProp.offsetY;
              this.tooltipEle.style.top = (parseInt(this.tooltipEle.style.top, 10) + y).toString() + "px";
            }
            break;
          case "cssClass":
            if (this.tooltipEle) {
              if (oldProp.cssClass) {
                removeClass([this.tooltipEle], oldProp.cssClass.split(" "));
              }
              if (newProp.cssClass) {
                addClass([this.tooltipEle], newProp.cssClass.split(" "));
              }
            }
            break;
          case "enableRtl":
            if (this.tooltipEle) {
              if (this.enableRtl) {
                addClass([this.tooltipEle], RTL2);
              } else {
                removeClass([this.tooltipEle], RTL2);
              }
            }
            break;
          case "isSticky":
            if (this.tooltipEle && targetElement2) {
              this.renderCloseIcon();
              this.reposition(targetElement2);
            }
            break;
          case "container":
            if (!isNullOrUndefined(this.containerElement)) {
              removeClass([this.containerElement], POPUP_CONTAINER);
            }
            this.container = newProp.container;
            if (this.tooltipEle && targetElement2) {
              this.appendContainer(this);
              this.reposition(targetElement2);
            }
        }
      }
    };
    Tooltip2.prototype.open = function(element2, animation) {
      if (isNullOrUndefined(animation)) {
        animation = this.animation.open;
      }
      if (isNullOrUndefined(element2)) {
        element2 = this.element;
      }
      if (element2.style.display === "none") {
        return;
      }
      this.showTooltip(element2, animation);
    };
    Tooltip2.prototype.close = function(animation) {
      if (!animation) {
        animation = this.animation.close;
      }
      this.hideTooltip(animation);
    };
    Tooltip2.prototype.refresh = function(target) {
      if (this.tooltipEle) {
        this.renderContent(target);
      }
      if (this.popupObj && target) {
        this.reposition(target);
      }
      if (!isNullOrUndefined(this.targetsList) && !isNullOrUndefined(this.target)) {
        var target_2 = selectAll(this.target, this.element);
        if (target_2.length !== this.targetsList.length) {
          this.unwireEvents(this.opensOn);
          this.wireEvents(this.opensOn);
        }
      }
    };
    Tooltip2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      if (this.tooltipEle) {
        remove(this.tooltipEle);
      }
      if (this.popupObj) {
        this.popupObj.destroy();
      }
      destroy();
      removeClass([this.element], ROOT2);
      this.unwireEvents(this.opensOn);
      this.unwireMouseEvents(this.element);
      this.tooltipEle = null;
      this.popupObj = null;
      var currentTarget = selectAll('[data-tooltip-id= "' + this.ctrlId + '_content"]', this.element);
      for (var _i = 0, currentTarget_1 = currentTarget; _i < currentTarget_1.length; _i++) {
        var target = currentTarget_1[_i];
        this.restoreElement(target);
      }
      this.containerElement = null;
      this.tipClass = null;
      this.tooltipPositionX = null;
      this.tooltipPositionY = null;
      this.ctrlId = null;
      this.tooltipEventArgs = null;
      this.touchModule = null;
      this.mouseMoveEvent = null;
      this.mouseMoveTarget = null;
      this.containerElement = null;
      this.targetsList = null;
    };
    __decorate3([
      Property("auto")
    ], Tooltip2.prototype, "width", void 0);
    __decorate3([
      Property("auto")
    ], Tooltip2.prototype, "height", void 0);
    __decorate3([
      Property()
    ], Tooltip2.prototype, "content", void 0);
    __decorate3([
      Property("body")
    ], Tooltip2.prototype, "container", void 0);
    __decorate3([
      Property()
    ], Tooltip2.prototype, "target", void 0);
    __decorate3([
      Property("TopCenter")
    ], Tooltip2.prototype, "position", void 0);
    __decorate3([
      Property(0)
    ], Tooltip2.prototype, "offsetX", void 0);
    __decorate3([
      Property(0)
    ], Tooltip2.prototype, "offsetY", void 0);
    __decorate3([
      Property(true)
    ], Tooltip2.prototype, "showTipPointer", void 0);
    __decorate3([
      Property(true)
    ], Tooltip2.prototype, "enableHtmlParse", void 0);
    __decorate3([
      Property(false)
    ], Tooltip2.prototype, "windowCollision", void 0);
    __decorate3([
      Property("Auto")
    ], Tooltip2.prototype, "tipPointerPosition", void 0);
    __decorate3([
      Property("Auto")
    ], Tooltip2.prototype, "opensOn", void 0);
    __decorate3([
      Property(false)
    ], Tooltip2.prototype, "mouseTrail", void 0);
    __decorate3([
      Property(false)
    ], Tooltip2.prototype, "isSticky", void 0);
    __decorate3([
      Complex({}, Animation2)
    ], Tooltip2.prototype, "animation", void 0);
    __decorate3([
      Property(0)
    ], Tooltip2.prototype, "openDelay", void 0);
    __decorate3([
      Property(0)
    ], Tooltip2.prototype, "closeDelay", void 0);
    __decorate3([
      Property()
    ], Tooltip2.prototype, "cssClass", void 0);
    __decorate3([
      Property(true)
    ], Tooltip2.prototype, "enableHtmlSanitizer", void 0);
    __decorate3([
      Property("")
    ], Tooltip2.prototype, "htmlAttributes", void 0);
    __decorate3([
      Event()
    ], Tooltip2.prototype, "beforeRender", void 0);
    __decorate3([
      Event()
    ], Tooltip2.prototype, "beforeOpen", void 0);
    __decorate3([
      Event()
    ], Tooltip2.prototype, "afterOpen", void 0);
    __decorate3([
      Event()
    ], Tooltip2.prototype, "beforeClose", void 0);
    __decorate3([
      Event()
    ], Tooltip2.prototype, "afterClose", void 0);
    __decorate3([
      Event()
    ], Tooltip2.prototype, "beforeCollision", void 0);
    __decorate3([
      Event()
    ], Tooltip2.prototype, "created", void 0);
    __decorate3([
      Event()
    ], Tooltip2.prototype, "destroyed", void 0);
    Tooltip2 = __decorate3([
      NotifyPropertyChanges
    ], Tooltip2);
    return Tooltip2;
  }(Component)
);

// node_modules/@syncfusion/ej2-popups/src/spinner/spinner.js
var globalTimeOut = {};
var DEFT_MAT_WIDTH = 30;
var DEFT_MAT3_WIDTH = 30;
var DEFT_FAB_WIDTH = 30;
var DEFT_FLUENT_WIDTH = 30;
var DEFT_FLUENT2_WIDTH = 30;
var DEFT_BOOT_WIDTH = 30;
var DEFT_BOOT4_WIDTH = 36;
var DEFT_BOOT5_WIDTH = 36;
var CLS_SHOWSPIN = "e-spin-show";
var CLS_HIDESPIN = "e-spin-hide";
var CLS_MATERIALSPIN = "e-spin-material";
var CLS_MATERIAL3SPIN = "e-spin-material3";
var CLS_FABRICSPIN = "e-spin-fabric";
var CLS_FLUENTSPIN = "e-spin-fluent";
var CLS_FLUENT2SPIN = "e-spin-fluent2";
var CLS_TAILWINDSPIN = "e-spin-tailwind";
var CLS_BOOTSPIN = "e-spin-bootstrap";
var CLS_BOOT4SPIN = "e-spin-bootstrap4";
var CLS_BOOT5SPIN = "e-spin-bootstrap5";
var CLS_HIGHCONTRASTSPIN = "e-spin-high-contrast";
var CLS_SPINWRAP = "e-spinner-pane";
var CLS_SPININWRAP = "e-spinner-inner";
var CLS_SPINCIRCLE = "e-path-circle";
var CLS_SPINARC = "e-path-arc";
var CLS_SPINLABEL = "e-spin-label";
var CLS_SPINTEMPLATE = "e-spin-template";
var spinTemplate = null;
var spinCSSClass = null;
function Spinner(action, options, target, type) {
  switch (action) {
    case "Create":
      var element2 = document.querySelector(options.target);
      var args = {
        type,
        target: element2,
        cssClass: options.cssClass,
        label: options.label,
        width: options.width
      };
      createSpinner(args);
      break;
    case "Show":
      showSpinner(document.querySelector(target));
      break;
    case "Hide":
      hideSpinner(document.querySelector(target));
      break;
    case "Set": {
      var setArgs = { cssClass: options.cssClass, type };
      setSpinner(setArgs);
      break;
    }
  }
}
function createSpinner(args, internalCreateElement) {
  var _a;
  if (!args.target) {
    return;
  }
  var radius;
  var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
  var container = create_spinner_container(args.target, makeElement);
  if (!isNullOrUndefined(args.cssClass)) {
    var classNames = args.cssClass.split(" ").filter(function(className) {
      return className.trim() !== "";
    });
    (_a = container.wrap.classList).add.apply(_a, classNames);
  }
  if (!isNullOrUndefined(args.template) || !isNullOrUndefined(spinTemplate)) {
    var template = !isNullOrUndefined(args.template) ? args.template : spinTemplate;
    container.wrap.classList.add(CLS_SPINTEMPLATE);
    replaceContent(container.wrap, template, spinCSSClass);
  } else {
    var theme = !isNullOrUndefined(args.type) ? args.type : getTheme(container.wrap);
    var width = !isNullOrUndefined(args.width) ? args.width : void 0;
    radius = calculateRadius(width, theme);
    setTheme(theme, container.wrap, radius, makeElement);
    if (!isNullOrUndefined(args.label)) {
      createLabel(container.inner_wrap, args.label, makeElement);
    }
  }
  container.wrap.classList.add(CLS_HIDESPIN);
  container = null;
}
function createLabel(container, label, makeElement) {
  var labelEle = makeElement("div", {});
  labelEle.classList.add(CLS_SPINLABEL);
  labelEle.innerHTML = label;
  container.appendChild(labelEle);
  return labelEle;
}
function createMaterialSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Material", radius };
  create_material_element(container, uniqueID, makeElement, CLS_MATERIALSPIN);
  mat_calculate_attributes(radius, container, "Material", CLS_MATERIALSPIN);
}
function createMaterial3Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Material3", radius };
  create_material_element(container, uniqueID, makeElement, CLS_MATERIAL3SPIN);
  mat_calculate_attributes(radius, container, "Material3", CLS_MATERIAL3SPIN);
}
function createBootstrap4Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap4", radius };
  create_material_element(container, uniqueID, makeElement, CLS_BOOT4SPIN);
  mat_calculate_attributes(radius, container, "Bootstrap4", CLS_BOOT4SPIN);
}
function createBootstrap5Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap5", radius };
  create_material_element(container, uniqueID, makeElement, CLS_BOOT5SPIN);
  mat_calculate_attributes(radius, container, "Bootstrap5", CLS_BOOT5SPIN);
}
function startMatAnimate(container, uniqueID, radius) {
  var globalObject = {};
  var timeOutVar = 0;
  globalTimeOut["" + uniqueID].timeOut = 0;
  globalObject["" + uniqueID] = globalVariables(uniqueID, radius, 0, 0);
  var spinnerInfo = { uniqueID, container, globalInfo: globalObject, timeOutVar };
  animateMaterial(spinnerInfo);
}
function createFabricSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Fabric", radius };
  create_fabric_element(container, uniqueID, CLS_FABRICSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_FABRICSPIN);
}
function createFluentSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Fluent", radius };
  create_fabric_element(container, uniqueID, CLS_FLUENTSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_FLUENTSPIN);
}
function createFluent2Spinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Fluent2", radius };
  create_fabric_element(container, uniqueID, CLS_FLUENT2SPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_FLUENT2SPIN);
}
function createTailwindSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Tailwind", radius };
  create_fabric_element(container, uniqueID, CLS_TAILWINDSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_TAILWINDSPIN);
}
function createHighContrastSpinner(container, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "HighContrast", radius };
  create_fabric_element(container, uniqueID, CLS_HIGHCONTRASTSPIN, makeElement);
  fb_calculate_attributes(radius, container, CLS_HIGHCONTRASTSPIN);
}
function getTheme(container) {
  var theme = window.getComputedStyle(container, ":after").getPropertyValue("content");
  return theme.replace(/['"]+/g, "");
}
function setTheme(theme, container, radius, makeElement) {
  var innerContainer = container.querySelector("." + CLS_SPININWRAP);
  var svg = innerContainer.querySelector("svg");
  if (!isNullOrUndefined(svg)) {
    innerContainer.removeChild(svg);
  }
  switch (theme) {
    case "Material":
      createMaterialSpinner(innerContainer, radius, makeElement);
      break;
    case "Material3":
      createMaterial3Spinner(innerContainer, radius, makeElement);
      break;
    case "Fabric":
      createFabricSpinner(innerContainer, radius, makeElement);
      break;
    case "Fluent":
      createFluentSpinner(innerContainer, radius, makeElement);
      break;
    case "Fluent2":
      createFluent2Spinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap":
      createBootstrapSpinner(innerContainer, radius, makeElement);
      break;
    case "HighContrast":
      createHighContrastSpinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap4":
      createBootstrap4Spinner(innerContainer, radius, makeElement);
      break;
    case "Bootstrap5":
      createBootstrap5Spinner(innerContainer, radius, makeElement);
      break;
    case "Tailwind":
    case "Tailwind-dark":
      createTailwindSpinner(innerContainer, radius, makeElement);
      break;
  }
}
function createBootstrapSpinner(innerContainer, radius, makeElement) {
  var uniqueID = random_generator();
  globalTimeOut["" + uniqueID] = { timeOut: 0, type: "Bootstrap", radius };
  create_bootstrap_element(innerContainer, uniqueID, makeElement);
  boot_calculate_attributes(innerContainer, radius);
}
function create_bootstrap_element(innerContainer, uniqueID, makeElement) {
  var svgBoot = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var viewBoxValue = 64;
  var trans = 32;
  var defaultRadius = 2;
  svgBoot.setAttribute("id", uniqueID);
  svgBoot.setAttribute("class", CLS_BOOTSPIN);
  svgBoot.setAttribute("viewBox", "0 0 " + viewBoxValue + " " + viewBoxValue);
  innerContainer.insertBefore(svgBoot, innerContainer.firstChild);
  for (var item = 0; item <= 7; item++) {
    var bootCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    bootCircle.setAttribute("class", CLS_SPINCIRCLE + "_" + item);
    bootCircle.setAttribute("r", defaultRadius + "");
    bootCircle.setAttribute("transform", "translate(" + trans + "," + trans + ")");
    svgBoot.appendChild(bootCircle);
  }
}
function boot_calculate_attributes(innerContainer, radius) {
  var svg = innerContainer.querySelector("svg.e-spin-bootstrap");
  var x = 0;
  var y = 0;
  var rad = 24;
  svg.style.width = svg.style.height = radius + "px";
  var startArc = 90;
  for (var item = 0; item <= 7; item++) {
    var start = defineArcPoints(x, y, rad, startArc);
    var circleEle = svg.querySelector("." + CLS_SPINCIRCLE + "_" + item);
    circleEle.setAttribute("cx", start.x + "");
    circleEle.setAttribute("cy", start.y + "");
    startArc = startArc >= 360 ? 0 : startArc;
    startArc = startArc + 45;
  }
}
function generateSeries(begin, stop) {
  var series = [];
  var start = begin;
  var end = stop;
  var increment = false;
  var count = 1;
  formSeries(start);
  function formSeries(i) {
    series.push(i);
    if (i !== end || count === 1) {
      if (i <= start && i > 1 && !increment) {
        i = parseFloat((i - 0.2).toFixed(2));
      } else if (i === 1) {
        i = 7;
        i = parseFloat((i + 0.2).toFixed(2));
        increment = true;
      } else if (i < 8 && increment) {
        i = parseFloat((i + 0.2).toFixed(2));
        if (i === 8) {
          increment = false;
        }
      } else if (i <= 8 && !increment) {
        i = parseFloat((i - 0.2).toFixed(2));
      }
      ++count;
      formSeries(i);
    }
  }
  return series;
}
function animateBootstrap(innerContainer) {
  var svg = innerContainer.querySelector("svg.e-spin-bootstrap");
  var id = svg.getAttribute("id");
  for (var i = 1; i <= 8; i++) {
    var circleEle = innerContainer.getElementsByClassName("e-path-circle_" + (i === 8 ? 0 : i))[0];
    rotation(circleEle, i, i, generateSeries(i, i), id);
  }
  function rotation(circle, start, end, series, id2) {
    var count = 0;
    boot_animate(start);
    function boot_animate(radius) {
      if (globalTimeOut["" + id2].isAnimate) {
        ++count;
        circle.setAttribute("r", radius + "");
        if (count >= series.length) {
          count = 0;
        }
        globalTimeOut[id2].timeOut = setTimeout(boot_animate.bind(null, series[count]), 18);
      }
    }
  }
}
function replaceContent(container, template, cssClass) {
  if (!isNullOrUndefined(cssClass)) {
    container.classList.add(cssClass);
  }
  var inner = container.querySelector(".e-spinner-inner");
  inner.innerHTML = template;
}
function calculateRadius(width, theme) {
  var defaultSize;
  switch (theme) {
    case "Material":
      defaultSize = DEFT_MAT_WIDTH;
      break;
    case "Material3":
      defaultSize = DEFT_MAT3_WIDTH;
      break;
    case "Fabric":
      defaultSize = DEFT_FAB_WIDTH;
      break;
    case "Tailwind":
    case "Tailwind-dark":
      defaultSize = DEFT_FAB_WIDTH;
      break;
    case "Fluent":
      defaultSize = DEFT_FLUENT_WIDTH;
      break;
    case "Fluent2":
      defaultSize = DEFT_FLUENT2_WIDTH;
      break;
    case "Bootstrap4":
      defaultSize = DEFT_BOOT4_WIDTH;
      break;
    case "Bootstrap5":
      defaultSize = DEFT_BOOT5_WIDTH;
      break;
    default:
      defaultSize = DEFT_BOOT_WIDTH;
  }
  width = width ? parseFloat(width + "") : defaultSize;
  return theme === "Bootstrap" ? width : width / 2;
}
function globalVariables(id, radius, count, previousId) {
  return {
    radius,
    count,
    previousId
  };
}
function random_generator() {
  var random = "";
  var combine = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < 5; i++) {
    random += combine.charAt(Math.floor(Math.random() * combine.length));
  }
  return random;
}
function create_fabric_element(innerCon, uniqueID, themeClass, makeElement) {
  var svgFabric = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svgFabric.setAttribute("id", uniqueID);
  svgFabric.setAttribute("class", themeClass);
  var fabricCirclePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  fabricCirclePath.setAttribute("class", CLS_SPINCIRCLE);
  var fabricCircleArc = document.createElementNS("http://www.w3.org/2000/svg", "path");
  fabricCircleArc.setAttribute("class", CLS_SPINARC);
  innerCon.insertBefore(svgFabric, innerCon.firstChild);
  svgFabric.appendChild(fabricCirclePath);
  svgFabric.appendChild(fabricCircleArc);
}
function create_material_element(innerContainer, uniqueID, makeElement, cls) {
  var svgMaterial = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var matCirclePath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  svgMaterial.setAttribute("class", cls);
  svgMaterial.setAttribute("id", uniqueID);
  matCirclePath.setAttribute("class", CLS_SPINCIRCLE);
  innerContainer.insertBefore(svgMaterial, innerContainer.firstChild);
  svgMaterial.appendChild(matCirclePath);
}
function create_spinner_container(target, makeElement) {
  var spinnerContainer = makeElement("div", {});
  var spinnerInnerContainer = makeElement("div", {});
  spinnerContainer.classList.add(CLS_SPINWRAP);
  spinnerInnerContainer.classList.add(CLS_SPININWRAP);
  spinnerInnerContainer.setAttribute("aria-disabled", "true");
  target.appendChild(spinnerContainer);
  spinnerContainer.appendChild(spinnerInnerContainer);
  return { wrap: spinnerContainer, inner_wrap: spinnerInnerContainer };
}
function animateMaterial(spinnerInfo) {
  var start = 1;
  var end = 149;
  var duration = 1333;
  var max = 75;
  createCircle(start, end, easeAnimation, duration, spinnerInfo.globalInfo[spinnerInfo.uniqueID].count, max, spinnerInfo);
  spinnerInfo.globalInfo[spinnerInfo.uniqueID].count = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].count % 4;
}
function createCircle(start, end, easing, duration, count, max, spinnerInfo) {
  var id = ++spinnerInfo.globalInfo[spinnerInfo.uniqueID].previousId;
  var startTime = (/* @__PURE__ */ new Date()).getTime();
  var change = end - start;
  var diameter = getSize(spinnerInfo.globalInfo[spinnerInfo.uniqueID].radius * 2 + "");
  var strokeSize = getStrokeSize(diameter);
  var rotate = -90 * (spinnerInfo.globalInfo[spinnerInfo.uniqueID].count || 0);
  mat_animation(spinnerInfo);
  function mat_animation(spinnerInfo2) {
    var currentTime = Math.max(0, Math.min((/* @__PURE__ */ new Date()).getTime() - startTime, duration));
    updatePath(easing(currentTime, start, change, duration), spinnerInfo2.container);
    if (id === spinnerInfo2.globalInfo[spinnerInfo2.uniqueID].previousId && currentTime < duration) {
      globalTimeOut[spinnerInfo2.uniqueID].timeOut = setTimeout(mat_animation.bind(null, spinnerInfo2), 1);
    } else {
      animateMaterial(spinnerInfo2);
    }
  }
  function updatePath(value, container) {
    if (!isNullOrUndefined(container.querySelector("svg.e-spin-material")) || !isNullOrUndefined(container.querySelector("svg.e-spin-material3"))) {
      var svg = void 0;
      if (!isNullOrUndefined(container.querySelector("svg.e-spin-material")) && !isNullOrUndefined(container.querySelector("svg.e-spin-material").querySelector("path.e-path-circle"))) {
        svg = container.querySelector("svg.e-spin-material");
      } else if (!isNullOrUndefined(container.querySelector("svg.e-spin-material3")) && !isNullOrUndefined(container.querySelector("svg.e-spin-material3").querySelector("path.e-path-circle"))) {
        svg = container.querySelector("svg.e-spin-material3");
      }
      if (!isNullOrUndefined(svg)) {
        var path = svg.querySelector("path.e-path-circle");
        path.setAttribute("stroke-dashoffset", getDashOffset(diameter, strokeSize, value, max) + "");
        path.setAttribute("transform", "rotate(" + rotate + " " + diameter / 2 + " " + diameter / 2 + ")");
      }
    }
  }
}
function mat_calculate_attributes(radius, container, type, cls) {
  var diameter = radius * 2;
  var svg = container.querySelector("svg." + cls);
  var path = svg.querySelector("path.e-path-circle");
  var strokeSize = getStrokeSize(diameter);
  var transformOrigin = diameter / 2 + "px";
  svg.setAttribute("viewBox", "0 0 " + diameter + " " + diameter);
  svg.style.width = svg.style.height = diameter + "px";
  svg.style.transformOrigin = transformOrigin + " " + transformOrigin + " " + transformOrigin;
  path.setAttribute("d", drawArc(diameter, strokeSize));
  if (type === "Material" || type === "Material3" || type === "Fluent2") {
    path.setAttribute("stroke-width", strokeSize + "");
    path.setAttribute("stroke-dasharray", (diameter - strokeSize) * Math.PI * 0.75 + "");
    path.setAttribute("stroke-dashoffset", getDashOffset(diameter, strokeSize, 1, 75) + "");
  }
}
function getSize(value) {
  var parsed = parseFloat(value);
  return parsed;
}
function drawArc(diameter, strokeSize) {
  var radius = diameter / 2;
  var offset = strokeSize / 2;
  return "M" + radius + "," + offset + "A" + (radius - offset) + "," + (radius - offset) + " 0 1 1 " + offset + "," + radius;
}
function getStrokeSize(diameter) {
  return 10 / 100 * diameter;
}
function getDashOffset(diameter, strokeSize, value, max) {
  return (diameter - strokeSize) * Math.PI * (3 * max / 100 - value / 100);
}
function easeAnimation(current, start, change, duration) {
  var timestamp = (current /= duration) * current;
  var timecount = timestamp * current;
  return start + change * (6 * timecount * timestamp + -15 * timestamp * timestamp + 10 * timecount);
}
function fb_calculate_attributes(radius, innerConainer, trgClass) {
  var centerX = radius;
  var centerY = radius;
  var diameter = radius * 2;
  var startArc = 315;
  var endArc = 45;
  var svg = innerConainer.querySelector("." + trgClass);
  var circle = svg.querySelector(".e-path-circle");
  var path = svg.querySelector(".e-path-arc");
  var transformOrigin = diameter / 2 + "px";
  circle.setAttribute("d", defineCircle(centerX, centerY, radius));
  path.setAttribute("d", defineArc(centerX, centerY, radius, startArc, endArc));
  svg.setAttribute("viewBox", "0 0 " + diameter + " " + diameter);
  svg.style.transformOrigin = transformOrigin + " " + transformOrigin + " " + transformOrigin;
  svg.style.width = svg.style.height = diameter + "px";
}
function defineArcPoints(centerX, centerY, radius, angle) {
  var radians = (angle - 90) * Math.PI / 180;
  return {
    x: centerX + radius * Math.cos(radians),
    y: centerY + radius * Math.sin(radians)
  };
}
function defineArc(x, y, radius, startArc, endArc) {
  var start = defineArcPoints(x, y, radius, endArc);
  var end = defineArcPoints(x, y, radius, startArc);
  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    0,
    0,
    end.x,
    end.y
  ].join(" ");
  return d;
}
function defineCircle(x, y, radius) {
  var d = [
    "M",
    x,
    y,
    "m",
    -radius,
    0,
    "a",
    radius,
    radius,
    0,
    1,
    0,
    radius * 2,
    0,
    "a",
    radius,
    radius,
    0,
    1,
    0,
    -radius * 2,
    0
  ].join(" ");
  return d;
}
function showSpinner(container) {
  showHideSpinner(container, false);
  container = null;
}
function showHideSpinner(container, isHide) {
  var spinnerWrap;
  if (container) {
    if (container.classList.contains(CLS_SPINWRAP)) {
      spinnerWrap = container;
    } else {
      var spinWrapCollection = container.querySelectorAll("." + CLS_SPINWRAP);
      if (Browser.isIE) {
        for (var i = 0; i < spinWrapCollection.length; i++) {
          if (spinWrapCollection[i].parentElement && spinWrapCollection[i].parentElement === container) {
            spinnerWrap = spinWrapCollection[i];
            break;
          }
        }
      } else {
        spinnerWrap = Array.from(spinWrapCollection).find(function(wrap) {
          return wrap.parentElement === container;
        }) || null;
      }
    }
  }
  if (container && spinnerWrap) {
    var inner = spinnerWrap.querySelector("." + CLS_SPININWRAP);
    var spinCheck = isHide ? !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) && !spinnerWrap.classList.contains(CLS_HIDESPIN) : !spinnerWrap.classList.contains(CLS_SPINTEMPLATE) && !spinnerWrap.classList.contains(CLS_SHOWSPIN);
    if (spinCheck) {
      var svgEle = spinnerWrap.querySelector("svg");
      if (isNullOrUndefined(svgEle)) {
        return;
      }
      var id = svgEle.getAttribute("id");
      globalTimeOut["" + id].isAnimate = !isHide;
      switch (globalTimeOut["" + id].type) {
        case "Material":
        case "Material3":
          if (isHide) {
            clearTimeout(globalTimeOut[id].timeOut);
          } else {
            startMatAnimate(inner, id, globalTimeOut[id].radius);
          }
          break;
        case "Bootstrap":
          if (isHide) {
            clearTimeout(globalTimeOut[id].timeOut);
          } else {
            animateBootstrap(inner);
          }
          break;
      }
    }
    if (isHide) {
      classList(spinnerWrap, [CLS_HIDESPIN], [CLS_SHOWSPIN]);
    } else {
      classList(spinnerWrap, [CLS_SHOWSPIN], [CLS_HIDESPIN]);
    }
    container = null;
  }
}
function hideSpinner(container) {
  showHideSpinner(container, true);
  container = null;
}
function setSpinner(args, internalCreateElement) {
  var makeElement = !isNullOrUndefined(internalCreateElement) ? internalCreateElement : createElement;
  if (args.template !== void 0) {
    spinTemplate = args.template;
    if (args.template !== void 0) {
      spinCSSClass = args.cssClass;
    }
  }
  var container = document.querySelectorAll("." + CLS_SPINWRAP);
  for (var index = 0; index < container.length; index++) {
    ensureTemplate(args.template, container[index], args.type, args.cssClass, makeElement);
  }
}
function ensureTemplate(template, container, theme, cssClass, makeEle) {
  if (isNullOrUndefined(template) && !container.classList.contains(CLS_SPINTEMPLATE)) {
    replaceTheme(container, theme, cssClass, makeEle);
    if (container.classList.contains(CLS_SHOWSPIN)) {
      container.classList.remove(CLS_SHOWSPIN);
      showSpinner(container);
    } else {
      container.classList.remove(CLS_HIDESPIN);
      hideSpinner(container);
    }
  } else {
    spinTemplate = template;
    if (!isNullOrUndefined(cssClass)) {
      spinCSSClass = cssClass;
    }
    if (!isNullOrUndefined(spinTemplate)) {
      replaceContent(container, spinTemplate, spinCSSClass);
    }
  }
}
function replaceTheme(container, theme, cssClass, makeEle) {
  if (!isNullOrUndefined(cssClass)) {
    container.classList.add(cssClass);
  }
  var svgElement = container.querySelector("svg");
  if (!isNullOrUndefined(svgElement)) {
    var radius = theme === "Bootstrap" ? parseFloat(svgElement.style.height) : parseFloat(svgElement.style.height) / 2;
    var classNames = svgElement.getAttribute("class");
    var svgClassList = classNames.split(/\s/);
    if (svgClassList.indexOf("e-spin-material") >= 0) {
      var id = svgElement.getAttribute("id");
      clearTimeout(globalTimeOut["" + id].timeOut);
    }
    setTheme(theme, container, radius, makeEle);
  }
}

export {
  calculateRelativeBasedPosition,
  calculatePosition,
  fit,
  isCollide,
  flip,
  getTransformElement,
  destroy,
  PositionData,
  Popup,
  getScrollableParent,
  getZindexPartial,
  getMaxZindex,
  ButtonProps,
  AnimationSettings,
  Dialog,
  DialogUtility,
  Animation2 as Animation,
  Tooltip,
  Spinner,
  createSpinner,
  showSpinner,
  hideSpinner,
  setSpinner
};
//# sourceMappingURL=chunk-2M5HFFVS.js.map
