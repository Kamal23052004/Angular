import {
  TreeView
} from "./chunk-35BNGUR5.js";
import {
  DataManager,
  DataUtil,
  JsonAdaptor,
  ListBase,
  Predicate,
  Query,
  Sortable,
  cssClass,
  moveTo
} from "./chunk-SSAM3KVE.js";
import {
  Input,
  TextBox
} from "./chunk-N5UY6QDA.js";
import {
  Popup,
  createSpinner,
  getZindexPartial,
  hideSpinner,
  isCollide,
  showSpinner
} from "./chunk-2M5HFFVS.js";
import {
  Button,
  createCheckBox
} from "./chunk-2S3DOBG7.js";
import {
  Animation,
  Browser,
  ChildProperty,
  Collection,
  Complex,
  Component,
  Event,
  EventHandler,
  KeyboardEvents,
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
  debounce,
  detach,
  extend,
  formatUnit,
  getComponent,
  getUniqueID,
  getValue,
  initializeCSPTemplate,
  isBlazor,
  isNullOrUndefined,
  isUndefined,
  matches,
  prepend,
  remove,
  removeClass,
  rippleEffect,
  select,
  selectAll,
  setStyleAttribute,
  setValue
} from "./chunk-HEJJC6ZW.js";

// node_modules/@syncfusion/ej2-dropdowns/src/common/incremental-search.js
var queryString = "";
var prevString = "";
var tempQueryString = "";
var matches2 = [];
var activeClass = "e-active";
var prevElementId = "";
function incrementalSearch(keyCode, items, selectedIndex, ignoreCase, elementId, queryStringUpdated, currentValue, isVirtual, refresh) {
  if (!queryStringUpdated || queryString === "") {
    if (tempQueryString != "") {
      queryString = tempQueryString + String.fromCharCode(keyCode);
      tempQueryString = "";
    } else {
      queryString += String.fromCharCode(keyCode);
    }
  } else if (queryString == prevString) {
    tempQueryString = String.fromCharCode(keyCode);
  }
  if (isVirtual) {
    setTimeout(function() {
      tempQueryString = "";
    }, 700);
    setTimeout(function() {
      queryString = "";
    }, 3e3);
  } else {
    setTimeout(function() {
      queryString = "";
    }, 1e3);
  }
  var index;
  queryString = ignoreCase ? queryString.toLowerCase() : queryString;
  if (prevElementId === elementId && prevString === queryString && !refresh) {
    for (var i = 0; i < matches2.length; i++) {
      if (matches2[i].classList.contains(activeClass)) {
        index = i;
        break;
      }
      if (currentValue && matches2[i].textContent.toLowerCase() === currentValue.toLowerCase()) {
        index = i;
        break;
      }
    }
    index = index + 1;
    if (isVirtual) {
      return matches2[index] && matches2.length - 1 != index ? matches2[index] : matches2[matches2.length];
    }
    return matches2[index] ? matches2[index] : matches2[0];
  } else {
    var listItems = items;
    var strLength = queryString.length;
    var text = void 0;
    var item = void 0;
    selectedIndex = selectedIndex ? selectedIndex + 1 : 0;
    var i = selectedIndex;
    matches2 = [];
    do {
      if (i === listItems.length) {
        i = -1;
      }
      if (i === -1) {
        index = 0;
      } else {
        index = i;
      }
      item = listItems[index];
      text = ignoreCase ? item.innerText.toLowerCase() : item.innerText;
      if (text.substr(0, strLength) === queryString) {
        matches2.push(listItems[index]);
      }
      i++;
    } while (i !== selectedIndex);
    prevString = queryString;
    prevElementId = elementId;
    if (isVirtual) {
      var indexUpdated = false;
      for (var i_1 = 0; i_1 < matches2.length; i_1++) {
        if (currentValue && matches2[i_1].textContent.toLowerCase() === currentValue.toLowerCase()) {
          index = i_1;
          indexUpdated = true;
          break;
        }
      }
      if (currentValue && indexUpdated) {
        index = index + 1;
      }
      return matches2[index] ? matches2[index] : matches2[0];
    }
    return matches2[0];
  }
}
function Search(inputVal, items, searchType, ignoreCase, dataSource, fields, type) {
  var listItems = items;
  ignoreCase = ignoreCase !== void 0 && ignoreCase !== null ? ignoreCase : true;
  var itemData = { item: null, index: null };
  if (inputVal && inputVal.length) {
    var strLength = inputVal.length;
    var queryStr = ignoreCase ? inputVal.toLocaleLowerCase() : inputVal;
    queryStr = escapeCharRegExp(queryStr);
    var _loop_1 = function(i2, itemsData2) {
      var item = itemsData2[i2];
      var text = void 0;
      var filterValue;
      if (items && dataSource) {
        var checkField_1 = item;
        var fieldValue_1 = fields.text.split(".");
        dataSource.filter(function(data) {
          Array.prototype.slice.call(fieldValue_1).forEach(function(value) {
            if (type === "object" && (!data.isHeader && checkField_1.textContent.toString().indexOf(data[value]) !== -1) && checkField_1.getAttribute("data-value") === data[fields.value].toString() || type === "string" && checkField_1.textContent.toString().indexOf(data) !== -1) {
              filterValue = type === "object" ? data[value] : data;
            }
          });
        });
      }
      text = dataSource && filterValue ? (ignoreCase ? filterValue.toString().toLocaleLowerCase() : filterValue).replace(/^\s+|\s+$/g, "") : (ignoreCase ? item.textContent.toLocaleLowerCase() : item.textContent).replace(/^\s+|\s+$/g, "");
      if (searchType === "Equal" && text === queryStr || searchType === "StartsWith" && text.substr(0, strLength) === queryStr || searchType === "EndsWith" && text.substr(text.length - queryStr.length) === queryStr || searchType === "Contains" && new RegExp(queryStr, "g").test(text)) {
        itemData.item = item;
        itemData.index = i2;
        return { value: { item, index: i2 } };
      }
    };
    for (var i = 0, itemsData = listItems; i < itemsData.length; i++) {
      var state_1 = _loop_1(i, itemsData);
      if (typeof state_1 === "object")
        return state_1.value;
    }
    return itemData;
  }
  return itemData;
}
function escapeCharRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function resetIncrementalSearchValues(elementId) {
  if (prevElementId === elementId) {
    prevElementId = "";
    prevString = "";
    queryString = "";
    matches2 = [];
  }
}

// node_modules/@syncfusion/ej2-dropdowns/src/common/highlight-search.js
function highlightSearch(element, query, ignoreCase, type) {
  var isHtmlElement = /<[^>]*>/g.test(element.innerText);
  if (isHtmlElement) {
    element.innerText = element.innerText.replace(/[\u00A0-\u9999<>&]/g, function(match) {
      return "&#" + match.charCodeAt(0) + ";";
    });
  }
  if (query === "") {
    return;
  } else {
    var ignoreRegex = ignoreCase ? "gim" : "gm";
    query = /^[a-zA-Z0-9- ]*$/.test(query) ? query : query.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    var replaceQuery = type === "StartsWith" ? "^(" + query + ")" : type === "EndsWith" ? "(" + query + ")$" : "(" + query + ")";
    findTextNode(element, new RegExp(replaceQuery, ignoreRegex));
  }
}
function findTextNode(element, pattern) {
  for (var index = 0; element.childNodes && index < element.childNodes.length; index++) {
    if (element.childNodes[index].nodeType === 3 && element.childNodes[index].textContent.trim() !== "") {
      var value = element.childNodes[index].nodeValue.trim().replace(pattern, '<span class="e-highlight">$1</span>');
      element.childNodes[index].nodeValue = "";
      element.innerHTML = element.innerHTML.trim() + value;
      break;
    } else {
      findTextNode(element.childNodes[index], pattern);
    }
  }
}
function revertHighlightSearch(content) {
  var contentElement = content.querySelectorAll(".e-highlight");
  for (var i = contentElement.length - 1; i >= 0; i--) {
    var parent_1 = contentElement[i].parentNode;
    var text = document.createTextNode(contentElement[i].textContent);
    parent_1.replaceChild(text, contentElement[i]);
  }
}

// node_modules/@syncfusion/ej2-dropdowns/src/common/virtual-scroll.js
var __assign = function() {
  __assign = Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s)
        if (Object.prototype.hasOwnProperty.call(s, p))
          t[p] = s[p];
    }
    return t;
  };
  return __assign.apply(this, arguments);
};
var __awaiter = function(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function(resolve2) {
        resolve2(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var __generator = function(thisArg, body) {
  var _ = { label: 0, sent: function() {
    if (t[0] & 1)
      throw t[1];
    return t[1];
  }, trys: [], ops: [] }, f, y, t, g;
  return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
    return this;
  }), g;
  function verb(n) {
    return function(v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f)
      throw new TypeError("Generator is already executing.");
    while (_)
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
          return t;
        if (y = 0, t)
          op = [op[0] & 2, t.value];
        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;
          case 4:
            _.label++;
            return { value: op[1], done: false };
          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;
          case 7:
            op = _.ops.pop();
            _.trys.pop();
            continue;
          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }
            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }
            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }
            if (t && _.label < t[2]) {
              _.label = t[2];
              _.ops.push(op);
              break;
            }
            if (t[2])
              _.ops.pop();
            _.trys.pop();
            continue;
        }
        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    if (op[0] & 5)
      throw op[1];
    return { value: op[0] ? op[1] : void 0, done: true };
  }
};
var VirtualScroll = (
  /** @class */
  function() {
    function VirtualScroll2(parent) {
      var _this = this;
      this.sentinelInfo = {
        "up": {
          check: function(rect, info) {
            var top = rect.top - _this.containerElementRect.top;
            info.entered = top >= 0;
            return top + _this.parent.listItemHeight * _this.parent.virtualItemCount / 2 >= 0;
          },
          axis: "Y"
        },
        "down": {
          check: function(rect, info) {
            var cHeight = _this.parent.popupContentElement.clientHeight;
            var top = rect.bottom;
            info.entered = rect.bottom <= _this.containerElementRect.bottom;
            return top - _this.parent.listItemHeight * _this.parent.virtualItemCount / 2 <= _this.parent.listItemHeight * _this.parent.virtualItemCount / 2;
          },
          axis: "Y"
        }
      };
      this.parent = parent;
      this.removeEventListener();
      this.addEventListener();
    }
    VirtualScroll2.prototype.addEventListener = function() {
      if (this.parent.isDestroyed) {
        return;
      }
      this.parent.on("observe", this.observe, this);
      this.parent.on("setGeneratedData", this.setGeneratedData, this);
      this.parent.on("dataProcessAsync", this.dataProcessAsync, this);
      this.parent.on("setCurrentViewDataAsync", this.setCurrentViewDataAsync, this);
      this.parent.on("bindScrollEvent", this.bindScrollEvent, this);
    };
    VirtualScroll2.prototype.removeEventListener = function() {
      if (this.parent.isDestroyed) {
        return;
      }
      this.parent.off("observe", this.observe);
      this.parent.off("setGeneratedData", this.setGeneratedData);
      this.parent.off("dataProcessAsync", this.dataProcessAsync);
      this.parent.off("setCurrentViewDataAsync", this.setCurrentViewDataAsync);
      this.parent.off("bindScrollEvent", this.bindScrollEvent);
    };
    VirtualScroll2.prototype.bindScrollEvent = function(component) {
      var _this = this;
      this.component = component.component;
      this.observe(function(scrollArgs) {
        return _this.scrollListener(scrollArgs);
      });
    };
    VirtualScroll2.prototype.observe = function(callback) {
      this.containerElementRect = this.parent.popupContentElement.getBoundingClientRect();
      EventHandler.add(this.parent.popupContentElement, "wheel mousedown", this.popupScrollHandler, this);
      this.touchModule = new Touch(this.parent.popupContentElement, {
        scroll: this.popupScrollHandler.bind(this)
      });
      EventHandler.add(this.parent.popupContentElement, "scroll", this.virtualScrollHandler(callback), this);
    };
    VirtualScroll2.prototype.getModuleName = function() {
      return "VirtualScroll";
    };
    VirtualScroll2.prototype.popupScrollHandler = function(e) {
      this.parent.isMouseScrollAction = true;
      this.parent.isPreventScrollAction = false;
    };
    VirtualScroll2.prototype.getPageQuery = function(query, virtualStartIndex, virtualEndIndex) {
      if (virtualEndIndex !== 0 && !this.parent.allowFiltering && this.component !== "autocomplete") {
        query = query.skip(virtualStartIndex);
      }
      return query;
    };
    VirtualScroll2.prototype.setGeneratedData = function(qStartIndex, recentlyGeneratedData) {
      var loopIteration = 0;
      var endIndex = this.parent.listData.length + this.parent.virtualItemStartIndex;
      for (var i = this.parent.virtualItemStartIndex; i < endIndex; i++) {
        var alreadyAddedData = this.parent.generatedDataObject[i];
        if (!alreadyAddedData) {
          if (recentlyGeneratedData !== null && this.parent.listData.slice(loopIteration, loopIteration + 1).length > 0) {
            var slicedData = this.parent.listData.slice(loopIteration, loopIteration + 1);
            if (slicedData.length > 0) {
              this.parent.generatedDataObject[i] = slicedData;
            }
          }
        }
        loopIteration++;
      }
    };
    VirtualScroll2.prototype.generateAndExecuteQueryAsync = function(query, virtualItemStartIndex, virtualItemEndIndex, isQueryGenerated) {
      if (virtualItemStartIndex === void 0) {
        virtualItemStartIndex = 0;
      }
      if (virtualItemEndIndex === void 0) {
        virtualItemEndIndex = 0;
      }
      if (isQueryGenerated === void 0) {
        isQueryGenerated = false;
      }
      var dataSource = this.parent.dataSource;
      if (!isQueryGenerated) {
        if (!isNullOrUndefined(this.parent.query)) {
          var newQuery = this.removeSkipAndTakeEvents(this.parent.query.clone());
          query = this.getPageQuery(newQuery, virtualItemStartIndex, virtualItemEndIndex);
        } else {
          query = this.getPageQuery(query, virtualItemStartIndex, virtualItemEndIndex);
        }
      }
      var tempCustomFilter = this.parent.isCustomFilter;
      if (this.component === "combobox") {
        var totalData = 0;
        if (this.parent.dataSource instanceof DataManager) {
          totalData = this.parent.dataSource.dataSource.json.length;
        } else if (this.parent.dataSource && this.parent.dataSource.length > 0) {
          totalData = this.parent.dataSource.length;
        }
        if (totalData > 0) {
          this.parent.isCustomFilter = totalData == this.parent.totalItemCount && this.parent.queryString != this.parent.typedString ? true : this.parent.isCustomFilter;
        }
      }
      this.parent.resetList(dataSource, this.parent.fields, query);
      this.parent.isCustomFilter = tempCustomFilter;
    };
    VirtualScroll2.prototype.removeSkipAndTakeEvents = function(query) {
      query.queries = query.queries.filter(function(event2) {
        return event2.fn !== "onSkip" && event2.fn !== "onTake";
      });
      return query;
    };
    VirtualScroll2.prototype.setCurrentViewDataAsync = function(component) {
      var currentData = [];
      var isResetListCalled = false;
      var isListUpdated = true;
      if (isNullOrUndefined(this.component)) {
        this.component = component.component;
      }
      var endIndex = this.parent.viewPortInfo.endIndex;
      if (this.component === "multiselect" && this.parent.mode === "CheckBox" && this.parent.value && Array.isArray(this.parent.value) && this.parent.value.length > 0 && this.parent.enableSelectionOrder) {
        if (this.parent.viewPortInfo.startIndex < this.parent.value.length) {
          endIndex = this.parent.viewPortInfo.endIndex - this.parent.value.length;
          if (this.parent.viewPortInfo.startIndex === 0) {
            this.parent.updateVirtualReOrderList(true);
            if (this.parent.value.length < this.parent.itemCount) {
              var oldUlElement = this.parent.list.querySelector(".e-list-parent:not(.e-reorder)");
              if (oldUlElement) {
                this.parent.list.querySelector(".e-virtual-ddl-content").removeChild(oldUlElement);
              }
              var query = this.parent.getForQuery(this.parent.value).clone();
              query = query.skip(0).take(this.parent.itemCount - (this.parent.value.length - this.parent.viewPortInfo.startIndex));
              this.parent.appendUncheckList = true;
              this.parent.setCurrentView = false;
              this.parent.resetList(this.parent.dataSource, this.parent.fields, query);
              isListUpdated = false;
              this.parent.appendUncheckList = this.parent.dataSource instanceof DataManager ? this.parent.appendUncheckList : false;
              isListUpdated = false;
            } else {
              var oldUlElement = this.parent.list.querySelector(".e-list-parent:not(.e-reorder)");
              if (oldUlElement) {
                this.parent.list.querySelector(".e-virtual-ddl-content").removeChild(oldUlElement);
              }
            }
            isListUpdated = false;
          } else if (this.parent.viewPortInfo.startIndex != 0) {
            this.parent.updateVirtualReOrderList(true);
            var oldUlElement = this.parent.list.querySelector(".e-list-parent:not(.e-reorder)");
            if (oldUlElement) {
              this.parent.list.querySelector(".e-virtual-ddl-content").removeChild(oldUlElement);
            }
            isListUpdated = false;
          }
          if (this.parent.viewPortInfo.startIndex != 0 && this.parent.viewPortInfo.startIndex - this.parent.value.length != this.parent.itemCount && this.parent.viewPortInfo.startIndex + this.parent.itemCount > this.parent.value.length) {
            var query = this.parent.getForQuery(this.parent.value).clone();
            query = query.skip(0).take(this.parent.itemCount - (this.parent.value.length - this.parent.viewPortInfo.startIndex));
            this.parent.appendUncheckList = true;
            this.parent.setCurrentView = false;
            this.parent.resetList(this.parent.dataSource, this.parent.fields, query);
            isListUpdated = false;
            this.parent.appendUncheckList = this.parent.dataSource instanceof DataManager ? this.parent.appendUncheckList : false;
          }
        } else {
          var reOrderList = this.parent.list.querySelectorAll(".e-reorder")[0];
          if (this.parent.list.querySelector(".e-virtual-ddl-content") && reOrderList) {
            this.parent.list.querySelector(".e-virtual-ddl-content").removeChild(reOrderList);
          }
          var query = this.parent.getForQuery(this.parent.value).clone();
          var skipvalue = this.parent.viewPortInfo.startIndex - this.parent.value.length >= 0 ? this.parent.viewPortInfo.startIndex - this.parent.value.length : 0;
          query = query.skip(skipvalue);
          this.parent.setCurrentView = false;
          this.parent.resetList(this.parent.dataSource, this.parent.fields, query);
          isListUpdated = false;
        }
        this.parent.totalItemsCount();
      }
      if (isListUpdated) {
        for (var i = this.parent.viewPortInfo.startIndex; i < endIndex; i++) {
          var index = i;
          var alreadyAddedData = this.parent.generatedDataObject[index];
          if (this.component === "multiselect" && this.parent.hideSelectedItem) {
            if (alreadyAddedData) {
              var value = getValue(this.parent.fields.value, alreadyAddedData[0]);
              if (this.parent.value && value != null && Array.isArray(this.parent.value) && this.parent.value.length > 0 && this.parent.value.indexOf(value) < 0) {
                var query = this.parent.getForQuery(this.parent.value).clone();
                if (this.parent.viewPortInfo.endIndex == this.parent.totalItemCount + this.parent.value.length && this.parent.hideSelectedItem) {
                  query = query.skip(this.parent.totalItemCount - this.parent.itemCount);
                } else {
                  query = query.skip(this.parent.viewPortInfo.startIndex);
                }
                this.parent.setCurrentView = false;
                this.parent.resetList(this.parent.dataSource, this.parent.fields, query);
                isResetListCalled = true;
                break;
              } else if (this.parent.value === null || this.parent.value && this.parent.value.length === 0) {
                currentData.push(alreadyAddedData[0]);
              }
            }
            if (index === endIndex - 1) {
              if (currentData.length != this.parent.itemCount) {
                if (this.parent.hideSelectedItem) {
                  var query = this.parent.getForQuery(this.parent.value).clone();
                  if (this.parent.viewPortInfo.endIndex == this.parent.totalItemCount + this.parent.value.length && this.parent.hideSelectedItem) {
                    query = query.skip(this.parent.totalItemCount - this.parent.itemCount);
                  } else {
                    query = query.skip(this.parent.viewPortInfo.startIndex);
                  }
                  this.parent.setCurrentView = false;
                  this.parent.resetList(this.parent.dataSource, this.parent.fields, query);
                  isResetListCalled = true;
                }
              }
            }
          } else {
            if (alreadyAddedData) {
              currentData.push(alreadyAddedData[0]);
            }
          }
          this.parent.setCurrentView = false;
        }
      }
      if (!isResetListCalled && isListUpdated) {
        if (this.component === "multiselect" && this.parent.allowCustomValue && this.parent.viewPortInfo.startIndex == 0 && this.parent.virtualCustomData) {
          currentData.splice(0, 0, this.parent.virtualCustomData);
        }
        var totalData = [];
        if (this.component === "multiselect" && this.parent.allowCustomValue && this.parent.viewPortInfo.endIndex == this.parent.totalItemCount) {
          if (this.parent.virtualCustomSelectData && this.parent.virtualCustomSelectData.length > 0) {
            totalData = currentData.concat(this.parent.virtualCustomSelectData);
            currentData = totalData;
          }
        }
        var ulElement = this.parent.renderItems(currentData, this.parent.fields, this.component === "multiselect" && this.parent.mode === "CheckBox");
      }
      if (this.component === "multiselect") {
        this.parent.updatevirtualizationList();
      }
      this.parent.getSkeletonCount();
      this.parent.skeletonCount = this.parent.totalItemCount != 0 && this.parent.totalItemCount < this.parent.itemCount * 2 ? 0 : this.parent.skeletonCount;
      var virtualTrackElement = this.parent.list.getElementsByClassName("e-virtual-ddl")[0];
      if (virtualTrackElement) {
        virtualTrackElement.style = this.parent.GetVirtualTrackHeight();
      } else if (!virtualTrackElement && this.parent.skeletonCount > 0 && this.parent.popupWrapper) {
        var virualElement = this.parent.createElement("div", {
          id: this.parent.element.id + "_popup",
          className: "e-virtual-ddl",
          styles: this.parent.GetVirtualTrackHeight()
        });
        this.parent.popupWrapper.querySelector(".e-dropdownbase").appendChild(virualElement);
      }
      this.parent.UpdateSkeleton();
      this.parent.liCollections = this.parent.list.querySelectorAll(".e-list-item");
      var virtualContentElement = this.parent.list.getElementsByClassName("e-virtual-ddl-content")[0];
      if (virtualContentElement) {
        virtualContentElement.style = this.parent.getTransformValues();
      }
      if (this.parent.fields.groupBy) {
        this.parent.scrollStop();
      }
      if (this.parent.keyCode == 40 && this.parent.isScrollChanged && this.parent.hideSelectedItem && !isNullOrUndefined(this.parent.currentFocuedListElement)) {
        var currentSelectElem = this.parent.getElementByValue(this.parent.currentFocuedListElement.getAttribute("data-value"));
        this.parent.addListFocus(currentSelectElem);
        this.parent.isScrollChanged = false;
      }
    };
    VirtualScroll2.prototype.generateQueryAndSetQueryIndexAsync = function(query, isPopupOpen) {
      var isStartIndexInitialised = false;
      var queryStartIndex = 0;
      var queryEndIndex = 0;
      var vEndIndex = this.parent.viewPortInfo.endIndex;
      if (!isPopupOpen && vEndIndex !== 0) {
        for (var i = this.parent.viewPortInfo.startIndex; i <= vEndIndex; i++) {
          if (!(i in this.parent.generatedDataObject)) {
            if (!isStartIndexInitialised) {
              isStartIndexInitialised = true;
              queryStartIndex = queryEndIndex = i;
            } else {
              queryEndIndex = i === vEndIndex ? i : i + 1;
            }
          }
        }
      }
      if (isStartIndexInitialised && !(this.parent.totalItemCount == queryStartIndex && this.parent.totalItemCount == queryEndIndex)) {
        this.parent.virtualItemStartIndex = queryStartIndex;
        this.parent.virtualItemEndIndex = queryEndIndex;
        this.parent.setCurrentView = true;
        this.generateAndExecuteQueryAsync(query, queryStartIndex, queryEndIndex);
        if (this.component === "multiselect" && this.parent.hideSelectedItem && this.parent.value && Array.isArray(this.parent.value) && this.parent.value.length > 0) {
          this.parent.totalItemsCount();
        }
        if (this.component === "multiselect" && this.parent.virtualItemStartIndex === this.parent.virtualItemEndIndex) {
          this.parent.virtualItemStartIndex = this.parent.viewPortInfo.startIndex;
          this.parent.virtualItemEndIndex = this.parent.viewPortInfo.endIndex;
        }
      }
      if (!(this.parent.dataSource instanceof DataManager) || this.parent.dataSource instanceof DataManager && !this.parent.isRequesting) {
        this.setCurrentViewDataAsync();
      }
    };
    VirtualScroll2.prototype.dataProcessAsync = function(isOpenPopup) {
      this.parent.selectedValueInfo = null;
      this.parent.virtualItemStartIndex = this.parent.viewPortInfo.startIndex;
      this.parent.virtualItemEndIndex = this.parent.viewPortInfo.endIndex;
      this.generateQueryAndSetQueryIndexAsync(new Query(), isOpenPopup);
    };
    VirtualScroll2.prototype.virtualScrollRefreshAsync = function() {
      return __awaiter(this, void 0, void 0, function() {
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              this.parent.isCustomFilter = !(this.parent.isTyped || this.component === "combobox" && this.parent.allowFiltering && this.parent.queryString != this.parent.typedString || !isNullOrUndefined(this.parent.filterInput) && !isNullOrUndefined(this.parent.filterInput.value) && this.parent.filterInput.value !== "" && this.component !== "combobox") && !(this.component === "autocomplete" && this.parent.value != null) || this.parent.isCustomFilter;
              if (this.parent.allowFiltering || this.component === "autocomplete") {
                if (!isNullOrUndefined(this.parent.typedString) && !(this.component === "combobox" && !isNullOrUndefined(this.parent.typedString) && this.parent.allowFiltering)) {
                  if (this.parent.viewPortInfo.endIndex >= this.parent.dataCount) {
                    this.parent.viewPortInfo.endIndex = this.parent.dataCount;
                  }
                  if (this.parent.viewPortInfo.startIndex >= this.parent.dataCount) {
                    this.parent.viewPortInfo.startIndex = this.parent.dataCount - this.parent.itemCount;
                  }
                } else {
                  this.parent.getSkeletonCount(true);
                  if (this.component === "combobox") {
                    this.parent.skeletonCount = this.parent.totalItemCount != 0 && this.parent.totalItemCount < this.parent.itemCount * 2 ? 0 : this.parent.skeletonCount;
                  }
                }
              }
              return [4, this.dataProcessAsync()];
            case 1:
              _a.sent();
              if (this.parent.keyboardEvent != null && (!(this.parent.dataSource instanceof DataManager) || this.parent.dataSource instanceof DataManager && !this.parent.isRequesting)) {
                this.parent.handleVirtualKeyboardActions(this.parent.keyboardEvent, this.parent.pageCount);
              }
              if (!this.parent.customFilterQuery) {
                this.parent.isCustomFilter = false;
              }
              return [
                2
                /*return*/
              ];
          }
        });
      });
    };
    VirtualScroll2.prototype.scrollListener = function(scrollArgs) {
      var _this = this;
      if (!this.parent.isPreventScrollAction && !this.parent.isVirtualTrackHeight) {
        this.parent.preventSetCurrentData = false;
        var info = scrollArgs.sentinel;
        var pStartIndex = this.parent.previousStartIndex;
        this.parent.viewPortInfo = this.getInfoFromView(scrollArgs.direction, info, scrollArgs.offset, false);
        this.parent.isUpwardScrolling = false;
        if (this.parent.previousStartIndex !== pStartIndex && !this.parent.isKeyBoardAction) {
          this.parent.isScrollActionTriggered = false;
          this.parent.currentPageNumber = this.parent.viewPortInfo.currentPageNumber;
          this.parent.virtualListInfo = __assign({}, this.parent.viewPortInfo);
          this.parent.isPreventKeyAction = true;
          this.parent.isVirtualScrolling = true;
          setTimeout(function() {
            _this.parent.pageCount = _this.parent.getPageCount();
            _this.virtualScrollRefreshAsync().then(function() {
              if (_this.parent.popupObj) {
                _this.parent.list = _this.parent.popupObj.element.querySelector(".e-content") || select(".e-content");
                _this.parent.updateSelectionList();
                _this.parent.liCollections = _this.parent.getItems();
              }
              _this.parent.isKeyBoardAction = false;
              _this.parent.isVirtualScrolling = false;
              _this.parent.isPreventKeyAction = false;
            });
          }, 5);
        } else if (this.parent.isScrollActionTriggered) {
          this.parent.isPreventKeyAction = false;
          this.parent.isScrollActionTriggered = false;
          this.parent.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.parent.getTransformValues();
        }
        this.parent.previousInfo = this.parent.viewPortInfo;
      }
    };
    VirtualScroll2.prototype.getInfoFromView = function(direction, info, e, isscrollAction) {
      var infoType = {
        direction,
        sentinelInfo: info,
        offsets: e,
        startIndex: this.parent.previousStartIndex,
        endIndex: this.parent.previousEndIndex
      };
      var vHeight = this.parent.popupContentElement.getBoundingClientRect().height;
      var rowHeight = this.parent.listItemHeight;
      var exactTopIndex = e.top / rowHeight;
      var infoViewIndices = vHeight / rowHeight;
      var exactEndIndex = exactTopIndex + infoViewIndices;
      var pageSizeBy4 = this.parent.virtualItemCount / 4;
      var totalItemCount = this.parent.totalItemCount;
      if (infoType.direction === "down") {
        var sIndex = Math.round(exactEndIndex) - Math.round(pageSizeBy4);
        if (isNullOrUndefined(infoType.startIndex) || exactEndIndex > infoType.startIndex + Math.round(this.parent.virtualItemCount / 2 + pageSizeBy4) && infoType.endIndex !== totalItemCount) {
          infoType.startIndex = sIndex >= 0 ? Math.round(sIndex) : 0;
          infoType.startIndex = infoType.startIndex > exactTopIndex ? Math.floor(exactTopIndex) : infoType.startIndex;
          var eIndex = infoType.startIndex + this.parent.virtualItemCount;
          infoType.startIndex = eIndex < exactEndIndex ? Math.ceil(exactEndIndex) - this.parent.virtualItemCount : infoType.startIndex;
          infoType.endIndex = eIndex < totalItemCount ? eIndex : totalItemCount;
          infoType.startIndex = eIndex >= totalItemCount ? infoType.endIndex - this.parent.virtualItemCount > 0 ? infoType.endIndex - this.parent.virtualItemCount : 0 : infoType.startIndex;
          infoType.currentPageNumber = Math.ceil(infoType.endIndex / this.parent.virtualItemCount);
        }
      } else if (infoType.direction === "up") {
        if (infoType.startIndex && infoType.endIndex || Math.ceil(exactTopIndex) > this.parent.previousStartIndex) {
          var loadAtIndex = Math.round((infoType.startIndex * rowHeight + pageSizeBy4 * rowHeight) / rowHeight);
          if (exactTopIndex < loadAtIndex || Math.ceil(exactTopIndex) > this.parent.previousStartIndex) {
            var idxAddedToExactTop = pageSizeBy4 > infoViewIndices ? pageSizeBy4 : infoViewIndices + infoViewIndices / 4;
            var eIndex = Math.round(exactTopIndex + idxAddedToExactTop);
            infoType.endIndex = eIndex < totalItemCount ? eIndex : totalItemCount;
            var sIndex = infoType.endIndex - this.parent.virtualItemCount;
            infoType.startIndex = sIndex > 0 ? sIndex : 0;
            infoType.endIndex = sIndex < 0 ? this.parent.virtualItemCount : infoType.endIndex;
            infoType.currentPageNumber = Math.ceil(infoType.startIndex / this.parent.virtualItemCount);
          }
        }
      }
      if (!isscrollAction) {
        this.parent.previousStartIndex = infoType.startIndex;
        this.parent.startIndex = infoType.startIndex;
        this.parent.previousEndIndex = infoType.endIndex;
      } else {
        this.parent.scrollPreStartIndex = infoType.startIndex;
      }
      return infoType;
    };
    VirtualScroll2.prototype.virtualScrollHandler = function(callback) {
      var _this = this;
      var delay = Browser.info.name === "chrome" ? 200 : 100;
      var prevTop = 0;
      var debounced100 = debounce(callback, delay);
      var debounced50 = debounce(callback, 50);
      return function(e) {
        var top = e.target.scrollTop;
        var left = e.target.scrollLeft;
        var direction = prevTop < top && !_this.parent.isUpwardScrolling ? "down" : "up";
        prevTop = top;
        var current = _this.sentinelInfo[direction];
        var pstartIndex = _this.parent.scrollPreStartIndex;
        var scrollOffsetargs = {
          top,
          left
        };
        if (_this.parent.list && _this.parent.list.querySelectorAll(".e-virtual-list").length > 0) {
          var infoview = _this.getInfoFromView(direction, current, scrollOffsetargs, true);
          if (_this.parent.scrollPreStartIndex != pstartIndex && !_this.parent.isPreventScrollAction) {
            _this.parent.isScrollActionTriggered = true;
            var virtualPoup = _this.parent.list.querySelector(".e-virtual-ddl-content");
            virtualPoup.style.transform = "translate(0px," + top + "px)";
          }
        }
        var debounceFunction = debounced100;
        if (current.axis === "X") {
          debounceFunction = debounced50;
        }
        debounceFunction({
          direction,
          sentinel: current,
          offset: { top, left },
          focusElement: document.activeElement
        });
      };
    };
    VirtualScroll2.prototype.destroy = function() {
      this.removeEventListener();
    };
    return VirtualScroll2;
  }()
);

// node_modules/@syncfusion/ej2-notifications/src/toast/toast.js
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
var ROOT = "e-toast";
var CONTAINER = "e-toast-container";
var TITLE = "e-toast-title";
var WIDTHFULL = "e-toast-full-width";
var CONTENT = "e-toast-content";
var MESSAGE = "e-toast-message";
var ICON = "e-toast-icon";
var PROGRESS = "e-toast-progress";
var ACTIOBUTTONS = "e-toast-actions";
var CLOSEBTN = "e-toast-close-icon";
var RTL = "e-rtl";
var TOAST_BLAZOR_HIDDEN = "e-blazor-toast-hidden";
var ToastPosition = (
  /** @class */
  function(_super) {
    __extends(ToastPosition2, _super);
    function ToastPosition2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
      Property("Left")
    ], ToastPosition2.prototype, "X", void 0);
    __decorate([
      Property("Top")
    ], ToastPosition2.prototype, "Y", void 0);
    return ToastPosition2;
  }(ChildProperty)
);
var ButtonModelProps = (
  /** @class */
  function(_super) {
    __extends(ButtonModelProps2, _super);
    function ButtonModelProps2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
      Property(null)
    ], ButtonModelProps2.prototype, "model", void 0);
    __decorate([
      Property(null)
    ], ButtonModelProps2.prototype, "click", void 0);
    return ButtonModelProps2;
  }(ChildProperty)
);
var ToastAnimations = (
  /** @class */
  function(_super) {
    __extends(ToastAnimations2, _super);
    function ToastAnimations2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
      Property("FadeIn")
    ], ToastAnimations2.prototype, "effect", void 0);
    __decorate([
      Property(600)
    ], ToastAnimations2.prototype, "duration", void 0);
    __decorate([
      Property("ease")
    ], ToastAnimations2.prototype, "easing", void 0);
    return ToastAnimations2;
  }(ChildProperty)
);
var ToastAnimationSettings = (
  /** @class */
  function(_super) {
    __extends(ToastAnimationSettings2, _super);
    function ToastAnimationSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
      Complex({ effect: "FadeIn", duration: 600, easing: "ease" }, ToastAnimations)
    ], ToastAnimationSettings2.prototype, "show", void 0);
    __decorate([
      Complex({ effect: "FadeOut", duration: 600, easing: "ease" }, ToastAnimations)
    ], ToastAnimationSettings2.prototype, "hide", void 0);
    return ToastAnimationSettings2;
  }(ChildProperty)
);
var Toast = (
  /** @class */
  function(_super) {
    __extends(Toast2, _super);
    function Toast2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.toastCollection = [];
      _this.needsID = true;
      return _this;
    }
    Toast2.prototype.getModuleName = function() {
      return "toast";
    };
    Toast2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Toast2.prototype.destroy = function() {
      this.hide("All");
      this.element.classList.remove(CONTAINER);
      setStyleAttribute(this.element, { "position": "", "z-index": "" });
      if (!isNullOrUndefined(this.refElement) && !isNullOrUndefined(this.refElement.parentElement)) {
        this.refElement.parentElement.insertBefore(this.element, this.refElement);
        detach(this.refElement);
        this.refElement = void 0;
      }
      if (!this.isBlazorServer()) {
        _super.prototype.destroy.call(this);
      }
    };
    Toast2.prototype.preRender = function() {
      this.isDevice = Browser.isDevice;
      if (this.width === "300px") {
        this.width = this.isDevice && screen.width < 768 ? "100%" : "300px";
      }
      if (isNullOrUndefined(this.target)) {
        this.target = document.body;
      }
      if (this.enableRtl && !this.isBlazorServer()) {
        this.element.classList.add(RTL);
      }
    };
    Toast2.prototype.render = function() {
      this.progressObj = [];
      this.intervalId = [];
      this.contentTemplate = null;
      this.toastTemplate = null;
      this.renderComplete();
      this.initRenderClass = this.element.className;
    };
    Toast2.prototype.show = function(toastObj) {
      var collectionObj;
      if (!isNullOrUndefined(toastObj)) {
        this.templateChanges(toastObj);
        collectionObj = JSON.parse(JSON.stringify(toastObj));
        extend(this, this, toastObj);
      }
      if (isNullOrUndefined(this.toastContainer)) {
        this.toastContainer = this.getContainer();
        var target = typeof this.target === "string" ? document.querySelector(this.target) : typeof this.target === "object" ? this.target : document.body;
        if (isNullOrUndefined(target)) {
          return;
        }
        if (target.tagName === "BODY") {
          this.toastContainer.style.position = "fixed";
        } else {
          this.toastContainer.style.position = "absolute";
          target.style.position = "relative";
        }
        this.setPositioning(this.position);
        target.appendChild(this.toastContainer);
      }
      if (this.isBlazorServer() && this.element.classList.contains("e-control")) {
        this.isToastModel(toastObj);
        return;
      }
      this.toastEle = this.createElement("div", { className: ROOT, id: getUniqueID("toast") });
      this.setWidthHeight();
      this.setCSSClass(this.cssClass);
      if (isNullOrUndefined(this.template) || this.template === "") {
        this.personalizeToast();
      } else {
        this.templateRendering();
      }
      this.setProgress();
      this.setCloseButton();
      this.setAria();
      this.appendToTarget(toastObj);
      if (this.isDevice && screen.width < 768) {
        new Touch(this.toastEle, { swipe: this.swipeHandler.bind(this) });
      }
      if (!isNullOrUndefined(collectionObj)) {
        extend(collectionObj, { element: [this.toastEle] }, true);
        this.toastCollection.push(collectionObj);
      }
      if (this.isReact) {
        this.renderReactTemplates();
      }
    };
    Toast2.prototype.showToast = function(id, toastObj) {
      this.toastEle = this.element.querySelector("#" + id);
      this.show(toastObj);
    };
    Toast2.prototype.isToastModel = function(toastObj) {
      this.toastContainer = this.element;
      this.setPositioning(this.position);
      var proxy = this;
      if (!isNullOrUndefined(proxy.element.lastElementChild)) {
        this.setProgress();
      }
      this.setAria();
      this.appendToTarget(toastObj);
    };
    Toast2.prototype.swipeHandler = function(e) {
      var toastEle = closest(e.originalEvent.target, "." + ROOT + ":not(." + CONTAINER + ")");
      var hideAnimation = this.animation.hide.effect;
      if (!isNullOrUndefined(toastEle)) {
        if (e.swipeDirection === "Right") {
          this.animation.hide.effect = "SlideRightOut";
          this.hideToast("swipe", toastEle);
        } else if (e.swipeDirection === "Left") {
          this.animation.hide.effect = "SlideLeftOut";
          this.hideToast("swipe", toastEle);
        }
        this.animation.hide.effect = hideAnimation;
      }
    };
    Toast2.prototype.templateChanges = function(toastObj) {
      if (!isUndefined(toastObj.content) && !isNullOrUndefined(this.contentTemplate) && this.content !== toastObj.content) {
        this.clearContentTemplate();
      }
      if (!isUndefined(toastObj.template) && !isNullOrUndefined(this.toastTemplate) && this.template !== toastObj.template) {
        this.clearToastTemplate();
      }
    };
    Toast2.prototype.setCSSClass = function(cssClass2) {
      if (cssClass2) {
        var split = cssClass2.indexOf(",") !== -1 ? "," : " ";
        classList(this.toastEle, cssClass2.split(split), []);
        if (this.toastContainer) {
          classList(this.toastContainer, cssClass2.split(split), []);
        }
      }
    };
    Toast2.prototype.setWidthHeight = function() {
      if (this.width === "300px") {
        this.toastEle.style.width = formatUnit(this.width);
      } else if (this.width === "100%") {
        this.toastContainer.classList.add(WIDTHFULL);
      } else {
        this.toastEle.style.width = formatUnit(this.width);
        this.toastContainer.classList.remove(WIDTHFULL);
      }
      this.toastEle.style.height = formatUnit(this.height);
    };
    Toast2.prototype.templateRendering = function() {
      this.fetchEle(this.toastEle, this.template, "template");
    };
    Toast2.prototype.sanitizeHelper = function(value) {
      if (this.enableHtmlSanitizer) {
        var item = SanitizeHtmlHelper.beforeSanitize();
        var beforeEvent = {
          cancel: false,
          helper: null
        };
        extend(item, item, beforeEvent);
        this.trigger("beforeSanitizeHtml", item);
        if (item.cancel && !isNullOrUndefined(item.helper)) {
          value = item.helper(value);
        } else if (!item.cancel) {
          value = SanitizeHtmlHelper.serializeValue(item, value);
        }
      }
      return value;
    };
    Toast2.prototype.hide = function(element) {
      this.hideToast("", element);
    };
    Toast2.prototype.hideToast = function(interactionType, element) {
      if (isNullOrUndefined(this.toastContainer) || this.toastContainer.childElementCount === 0) {
        return;
      }
      if (typeof element === "string" && element === "All") {
        for (var i = 0; i < this.toastContainer.childElementCount; i++) {
          this.destroyToast(this.toastContainer.children[i], interactionType);
        }
        return;
      }
      if (isNullOrUndefined(element)) {
        element = this.newestOnTop ? this.toastContainer.lastElementChild : this.toastContainer.firstElementChild;
      }
      this.destroyToast(element, interactionType);
    };
    Toast2.prototype.fetchEle = function(ele, value, prob) {
      value = typeof value === "string" ? this.sanitizeHelper(value) : value;
      var templateFn;
      var tempVar;
      var tmpArray;
      var templateProps;
      if (ele.classList.contains(TITLE)) {
        templateProps = this.element.id + "title";
      } else if (ele.classList.contains(CONTENT)) {
        templateProps = this.element.id + "content";
      } else {
        templateProps = this.element.id + "template";
      }
      if (prob === "content") {
        tempVar = this.contentTemplate;
      } else {
        tempVar = this.toastTemplate;
      }
      if (!isNullOrUndefined(tempVar)) {
        ele.appendChild(tempVar.cloneNode(true));
        return ele;
      }
      try {
        if (typeof value !== "function" && document.querySelectorAll(value).length > 0) {
          var elem = null;
          if (prob !== "title") {
            elem = document.querySelector(value);
            ele.appendChild(elem);
            elem.style.display = "";
          }
          var clo = isNullOrUndefined(elem) ? tempVar : elem.cloneNode(true);
          if (prob === "content") {
            this.contentTemplate = clo;
          } else {
            this.toastTemplate = clo;
          }
        } else {
          templateFn = compile(value);
        }
      } catch (e) {
        templateFn = typeof value == "object" ? compile(value) : compile(initializeCSPTemplate(function() {
          return value;
        }));
      }
      if (!isNullOrUndefined(templateFn)) {
        if (!this.isBlazorServer()) {
          tmpArray = templateFn({}, this, prob, null, true);
        } else {
          var isString = true;
          tmpArray = templateFn({}, this, prob, templateProps, isString);
        }
      }
      if (!isNullOrUndefined(tmpArray) && tmpArray.length > 0 && !(isNullOrUndefined(tmpArray[0].tagName) && tmpArray.length === 1)) {
        [].slice.call(tmpArray).forEach(function(el) {
          if (!isNullOrUndefined(el.tagName)) {
            el.style.display = "";
          }
          ele.appendChild(el);
        });
      } else if (typeof value !== "function" && ele.childElementCount === 0) {
        ele.innerHTML = value;
      }
      return ele;
    };
    Toast2.prototype.clearProgress = function(intervalId) {
      if (!isNullOrUndefined(this.intervalId[intervalId])) {
        clearInterval(this.intervalId[intervalId]);
        delete this.intervalId[intervalId];
      }
      if (!isNullOrUndefined(this.progressObj[intervalId])) {
        clearInterval(this.progressObj[intervalId].intervalId);
        delete this.progressObj[intervalId];
      }
    };
    Toast2.prototype.removeToastContainer = function(isClosed) {
      if (isClosed && this.toastContainer.classList.contains("e-toast-util")) {
        detach(this.toastContainer);
      }
    };
    Toast2.prototype.clearContainerPos = function(isClosed) {
      var _this = this;
      if (this.isBlazorServer()) {
        this.toastContainer = null;
        return;
      }
      if (this.customPosition) {
        setStyleAttribute(this.toastContainer, { "left": "", "top": "" });
        this.removeToastContainer(isClosed);
        this.toastContainer = null;
        this.customPosition = false;
      } else {
        [
          ROOT + "-top-left",
          ROOT + "-top-right",
          ROOT + "-bottom-left",
          ROOT + "-bottom-right",
          ROOT + "-bottom-center",
          ROOT + "-top-center",
          ROOT + "-full-width"
        ].forEach(function(pos) {
          if (!isNullOrUndefined(_this.toastContainer) && _this.toastContainer.classList.contains(pos)) {
            _this.toastContainer.classList.remove(pos);
          }
        });
        this.removeToastContainer(isClosed);
        this.toastContainer = null;
      }
      if (!isNullOrUndefined(this.contentTemplate)) {
        this.clearContentTemplate();
      }
      if (!isNullOrUndefined(this.toastTemplate)) {
        this.clearToastTemplate();
      }
    };
    Toast2.prototype.clearContentTemplate = function() {
      this.contentTemplate.style.display = "none";
      document.body.appendChild(this.contentTemplate);
      this.contentTemplate = null;
    };
    Toast2.prototype.clearToastTemplate = function() {
      this.toastTemplate.style.display = "none";
      document.body.appendChild(this.toastTemplate);
      this.toastTemplate = null;
    };
    Toast2.prototype.isBlazorServer = function() {
      return isBlazor() && this.isServerRendered;
    };
    Toast2.prototype.destroyToast = function(toastEle, interactionType) {
      var _this = this;
      var toastObj;
      for (var i = 0; i < this.toastCollection.length; i++) {
        if (this.toastCollection[i].element[0] === toastEle) {
          toastObj = this.toastCollection[i];
          this.toastCollection.splice(i, 1);
        }
      }
      var toastBeforeClose = {
        options: this,
        cancel: false,
        type: interactionType,
        element: toastEle,
        toastContainer: this.toastContainer
      };
      var hideAnimate = this.animation.hide;
      var animate = {
        duration: hideAnimate.duration,
        name: hideAnimate.effect === "None" && animationMode === "Enable" ? "FadeOut" : hideAnimate.effect,
        timingFunction: hideAnimate.easing
      };
      var intervalId = parseInt(toastEle.id.split("toast_")[1], 10);
      var toastClose = this.isBlazorServer() ? {
        options: toastObj,
        toastContainer: this.toastContainer
      } : {
        options: toastObj,
        toastContainer: this.toastContainer,
        toastObj: this
      };
      this.trigger("beforeClose", toastBeforeClose, function(toastBeforeCloseArgs) {
        if (!toastBeforeCloseArgs.cancel) {
          if (!isNullOrUndefined(_this.progressObj[intervalId]) && !isNullOrUndefined(toastEle.querySelector("." + PROGRESS))) {
            _this.progressObj[intervalId].progressEle.style.width = "0%";
          }
          animate.end = function() {
            _this.clearProgress(intervalId);
            if (!_this.isBlazorServer() || isNullOrUndefined(toastObj)) {
              detach(toastEle);
            }
            _this.trigger("close", toastClose);
            if (_this.toastContainer.childElementCount === 0) {
              _this.clearContainerPos(true);
            }
            hideAnimate = null;
            animate = null;
          };
          new Animation(animate).animate(toastEle);
        }
      });
    };
    Toast2.prototype.personalizeToast = function() {
      this.setIcon();
      this.setTitle();
      this.setContent();
      this.actionButtons();
    };
    Toast2.prototype.setAria = function() {
      attributes(this.toastEle, { "role": "alert" });
    };
    Toast2.prototype.setPositioning = function(pos) {
      if (this.isBlazorServer()) {
        return;
      }
      if (!isNaN(parseFloat(pos.X)) || !isNaN(parseFloat(pos.Y))) {
        this.customPosition = true;
        setStyleAttribute(this.toastContainer, { "left": formatUnit(pos.X), "top": formatUnit(pos.Y) });
      } else {
        this.toastContainer.classList.add(ROOT + "-" + pos.Y.toString().toLowerCase() + "-" + pos.X.toString().toLowerCase());
      }
    };
    Toast2.prototype.setCloseButton = function() {
      if (!this.showCloseButton) {
        return;
      }
      var localeText = { close: "Close" };
      this.l10n = new L10n("toast", localeText, this.locale);
      this.l10n.setLocale(this.locale);
      var closeIconTitle = this.l10n.getConstant("close");
      var closeBtn = this.createElement("div", { className: CLOSEBTN + " e-icons ", attrs: { tabindex: "0", "aria-label": closeIconTitle, "role": "button" } });
      this.toastEle.classList.add("e-toast-header-close-icon");
      this.toastEle.appendChild(closeBtn);
    };
    Toast2.prototype.setProgress = function() {
      if (this.timeOut > 0) {
        var id = parseInt(this.toastEle.id.split("toast_")[1], 10);
        this.intervalId[id] = window.setTimeout(this.destroyToast.bind(this, this.toastEle), this.timeOut);
        this.progressObj[id] = {
          hideEta: null,
          intervalId: null,
          maxHideTime: null,
          element: null,
          timeOutId: null,
          progressEle: null
        };
        this.progressObj[id].maxHideTime = parseFloat(this.timeOut + "");
        this.progressObj[id].hideEta = (/* @__PURE__ */ new Date()).getTime() + this.progressObj[id].maxHideTime;
        this.progressObj[id].element = this.toastEle;
        if (this.extendedTimeout > 0) {
          EventHandler.add(this.toastEle, "mouseover", this.toastHoverAction.bind(this, id));
          EventHandler.add(this.toastEle, "mouseleave", this.delayedToastProgress.bind(this, id));
          this.progressObj[id].timeOutId = this.intervalId[id];
        }
        if (this.showProgressBar) {
          this.progressBarEle = this.createElement("div", { className: PROGRESS });
          this.toastEle.insertBefore(this.progressBarEle, this.toastEle.children[0]);
          this.progressObj[id].intervalId = setInterval(this.updateProgressBar.bind(this, this.progressObj[id]), 10);
          this.progressObj[id].progressEle = this.progressBarEle;
        }
      }
    };
    Toast2.prototype.toastHoverAction = function(id) {
      clearTimeout(this.progressObj[id].timeOutId);
      clearInterval(this.progressObj[id].intervalId);
      this.progressObj[id].hideEta = 0;
      var toastEle = this.progressObj[id].element;
      if (!isNullOrUndefined(toastEle.querySelector("." + PROGRESS))) {
        this.progressObj[id].progressEle.style.width = "0%";
      }
    };
    Toast2.prototype.delayedToastProgress = function(id) {
      var progress = this.progressObj[id];
      var toastEle = progress.element;
      progress.timeOutId = window.setTimeout(this.destroyToast.bind(this, toastEle), this.extendedTimeout);
      progress.maxHideTime = parseFloat(this.extendedTimeout + "");
      progress.hideEta = (/* @__PURE__ */ new Date()).getTime() + progress.maxHideTime;
      if (!isNullOrUndefined(toastEle.querySelector("." + PROGRESS))) {
        progress.intervalId = setInterval(this.updateProgressBar.bind(this, progress), 10);
      }
    };
    Toast2.prototype.updateProgressBar = function(progressObj) {
      var percentage = (progressObj.hideEta - (/* @__PURE__ */ new Date()).getTime()) / progressObj.maxHideTime * 100;
      percentage = this.progressDirection === "Ltr" ? 100 - percentage : percentage;
      progressObj.progressEle.style.width = percentage + "%";
    };
    Toast2.prototype.setIcon = function() {
      if (isNullOrUndefined(this.icon) || this.icon.length === 0) {
        return;
      }
      var iconEle = this.createElement("div", { className: ICON + " e-icons " + this.icon });
      this.toastEle.classList.add("e-toast-header-icon");
      this.toastEle.appendChild(iconEle);
    };
    Toast2.prototype.setTitle = function() {
      if (isNullOrUndefined(this.title)) {
        return;
      }
      var titleEle = this.createElement("div", { className: TITLE });
      titleEle = this.fetchEle(titleEle, this.title, "title");
      var msgContainer = this.createElement("div", { className: MESSAGE });
      msgContainer.appendChild(titleEle);
      this.toastEle.appendChild(msgContainer);
    };
    Toast2.prototype.setContent = function() {
      var contentEle = this.createElement("div", { className: CONTENT });
      var ele = this.element;
      if (isNullOrUndefined(this.content) || this.content === "") {
        var isContent = this.element.innerHTML.replace(/\s/g, "") !== "";
        if ((ele.children.length > 0 || isContent) && !(ele.firstElementChild && ele.firstElementChild.classList.contains(ROOT))) {
          this.innerEle = document.createDocumentFragment();
          var tempEle_1 = this.createElement("div");
          while (ele.childNodes.length !== 0) {
            this.innerEle.appendChild(this.element.childNodes[0]);
          }
          contentEle.appendChild(this.innerEle);
          [].slice.call(contentEle.children).forEach(function(ele2) {
            tempEle_1.appendChild(ele2.cloneNode(true));
          });
          this.content = tempEle_1;
          this.appendMessageContainer(contentEle);
        }
      } else {
        if (typeof this.content === "object" && !isNullOrUndefined(this.content.tagName)) {
          contentEle.appendChild(this.content);
          this.content = this.content.cloneNode(true);
          this.appendMessageContainer(contentEle);
        } else {
          contentEle = this.fetchEle(contentEle, this.content, "content");
          this.appendMessageContainer(contentEle);
        }
      }
    };
    Toast2.prototype.appendMessageContainer = function(element) {
      if (this.toastEle.querySelectorAll("." + MESSAGE).length > 0) {
        this.toastEle.querySelector("." + MESSAGE).appendChild(element);
      } else {
        var msgContainer = this.createElement("div", { className: MESSAGE });
        msgContainer.appendChild(element);
        this.toastEle.appendChild(msgContainer);
      }
    };
    Toast2.prototype.actionButtons = function() {
      var _this = this;
      var actionBtnContainer = this.createElement("div", { className: ACTIOBUTTONS });
      [].slice.call(this.buttons).forEach(function(actionBtn) {
        if (isNullOrUndefined(actionBtn.model)) {
          return;
        }
        var btnDom = _this.createElement("button");
        btnDom.setAttribute("type", "button");
        if (isNullOrUndefined(actionBtn.model.cssClass) || actionBtn.model.cssClass.length === 0) {
          actionBtn.model.cssClass = "e-primary " + _this.cssClass;
        }
        btnDom.classList.add("e-small");
        new Button(actionBtn.model, btnDom);
        if (!isNullOrUndefined(actionBtn.click) && typeof actionBtn.click === "function") {
          EventHandler.add(btnDom, "click", actionBtn.click);
        }
        actionBtnContainer.appendChild(btnDom);
      });
      if (actionBtnContainer.childElementCount > 0) {
        this.appendMessageContainer(actionBtnContainer);
      }
    };
    Toast2.prototype.appendToTarget = function(toastObj) {
      var _this = this;
      var toastBeforeOpen = this.isBlazorServer() ? {
        options: toastObj,
        element: this.toastEle,
        cancel: false
      } : {
        options: toastObj,
        toastObj: this,
        element: this.toastEle,
        cancel: false
      };
      this.trigger("beforeOpen", toastBeforeOpen, function(toastBeforeOpenArgs) {
        if (!toastBeforeOpenArgs.cancel) {
          if (!_this.isBlazorServer()) {
            _this.toastEle.style.display = "none";
          }
          if (_this.newestOnTop && _this.toastContainer.childElementCount !== 0) {
            _this.toastContainer.insertBefore(_this.toastEle, _this.toastContainer.children[0]);
          } else if (!_this.isBlazorServer()) {
            _this.toastContainer.appendChild(_this.toastEle);
          }
          removeClass([_this.toastEle], TOAST_BLAZOR_HIDDEN);
          EventHandler.add(_this.toastEle, "click", _this.clickHandler, _this);
          EventHandler.add(_this.toastEle, "keydown", _this.keyDownHandler, _this);
          _this.toastContainer.style.zIndex = getZindexPartial(_this.toastContainer) + "";
          _this.displayToast(_this.toastEle, toastObj);
        } else if (_this.isBlazorServer()) {
          var intervalId = parseInt(_this.toastEle.id.split("toast_")[1], 10);
          _this.clearProgress(intervalId);
          detach(_this.toastEle);
          if (_this.toastContainer.childElementCount === 0) {
            _this.clearContainerPos();
          }
        }
      });
    };
    Toast2.prototype.clickHandler = function(e) {
      var _this = this;
      if (!this.isBlazorServer()) {
        e.stopPropagation();
      }
      var target = e.target;
      var toastEle = closest(target, "." + ROOT);
      var clickArgs = this.isBlazorServer() ? {
        element: toastEle,
        cancel: false,
        clickToClose: false,
        originalEvent: e
      } : {
        element: toastEle,
        cancel: false,
        clickToClose: false,
        originalEvent: e,
        toastObj: this
      };
      var isCloseIcon = target.classList.contains(CLOSEBTN);
      this.trigger("click", clickArgs, function(toastClickArgs) {
        if (isCloseIcon && !toastClickArgs.cancel || toastClickArgs.clickToClose) {
          _this.destroyToast(toastEle, "click");
        }
      });
    };
    Toast2.prototype.keyDownHandler = function(e) {
      if (e.target.classList.contains(CLOSEBTN) && (e.keyCode === 13 || e.keyCode === 32)) {
        var target = e.target;
        var toastEle = closest(target, "." + ROOT);
        this.destroyToast(toastEle, "key");
      }
    };
    Toast2.prototype.displayToast = function(toastEle, toastObj) {
      var _this = this;
      var showAnimate = this.animation.show;
      var animate = {
        duration: showAnimate.duration,
        name: showAnimate.effect === "None" && animationMode === "Enable" ? "FadeIn" : showAnimate.effect,
        timingFunction: showAnimate.easing
      };
      var toastOpen = this.isBlazorServer() ? {
        options: toastObj,
        element: this.toastEle
      } : {
        options: toastObj,
        toastObj: this,
        element: this.toastEle
      };
      animate.begin = function() {
        toastEle.style.display = "";
      };
      animate.end = function() {
        _this.trigger("open", toastOpen);
      };
      new Animation(animate).animate(toastEle);
    };
    Toast2.prototype.getContainer = function() {
      this.element.classList.add(CONTAINER);
      return this.element;
    };
    Toast2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var container = this.element;
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "enableRtl":
            if (newProp.enableRtl) {
              container.classList.add(RTL);
            } else {
              container.classList.remove(RTL);
            }
            break;
        }
      }
    };
    __decorate([
      Property("300px")
    ], Toast2.prototype, "width", void 0);
    __decorate([
      Property("auto")
    ], Toast2.prototype, "height", void 0);
    __decorate([
      Property(null)
    ], Toast2.prototype, "title", void 0);
    __decorate([
      Property(null)
    ], Toast2.prototype, "content", void 0);
    __decorate([
      Property(true)
    ], Toast2.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
      Property(null)
    ], Toast2.prototype, "icon", void 0);
    __decorate([
      Property(null)
    ], Toast2.prototype, "cssClass", void 0);
    __decorate([
      Property(null)
    ], Toast2.prototype, "template", void 0);
    __decorate([
      Property(true)
    ], Toast2.prototype, "newestOnTop", void 0);
    __decorate([
      Property(false)
    ], Toast2.prototype, "showCloseButton", void 0);
    __decorate([
      Property(false)
    ], Toast2.prototype, "showProgressBar", void 0);
    __decorate([
      Property(5e3)
    ], Toast2.prototype, "timeOut", void 0);
    __decorate([
      Property("Rtl")
    ], Toast2.prototype, "progressDirection", void 0);
    __decorate([
      Property(1e3)
    ], Toast2.prototype, "extendedTimeout", void 0);
    __decorate([
      Complex({}, ToastAnimationSettings)
    ], Toast2.prototype, "animation", void 0);
    __decorate([
      Complex({}, ToastPosition)
    ], Toast2.prototype, "position", void 0);
    __decorate([
      Collection([{}], ButtonModelProps)
    ], Toast2.prototype, "buttons", void 0);
    __decorate([
      Property(null)
    ], Toast2.prototype, "target", void 0);
    __decorate([
      Event()
    ], Toast2.prototype, "created", void 0);
    __decorate([
      Event()
    ], Toast2.prototype, "beforeSanitizeHtml", void 0);
    __decorate([
      Event()
    ], Toast2.prototype, "destroyed", void 0);
    __decorate([
      Event()
    ], Toast2.prototype, "open", void 0);
    __decorate([
      Event()
    ], Toast2.prototype, "beforeOpen", void 0);
    __decorate([
      Event()
    ], Toast2.prototype, "beforeClose", void 0);
    __decorate([
      Event()
    ], Toast2.prototype, "close", void 0);
    __decorate([
      Event()
    ], Toast2.prototype, "click", void 0);
    Toast2 = __decorate([
      NotifyPropertyChanges
    ], Toast2);
    return Toast2;
  }(Component)
);
var ToastUtility;
(function(ToastUtility2) {
  function show(content, type, timeOut) {
    var toastContainerElement;
    if (document.querySelector("." + CONTAINER)) {
      toastContainerElement = document.querySelector("." + CONTAINER);
    } else {
      toastContainerElement = createElement("div", { "className": ROOT + " " + CONTAINER + " e-toast-util" });
      document.body.appendChild(toastContainerElement);
    }
    var untilToastsModel;
    if (typeof content === "string") {
      var cssClass2 = void 0;
      var icon = void 0;
      if (!isNullOrUndefined(type)) {
        switch (type) {
          case "Warning":
            cssClass2 = "e-toast-warning";
            icon = "e-toast-warning-icon";
            break;
          case "Success":
            cssClass2 = "e-toast-success";
            icon = "e-toast-success-icon";
            break;
          case "Error":
            cssClass2 = "e-toast-danger";
            icon = "e-toast-error-icon";
            break;
          case "Information":
            cssClass2 = "e-toast-info";
            icon = "e-toast-info-icon";
            break;
        }
      } else {
        cssClass2 = "";
        icon = "";
      }
      untilToastsModel = {
        content,
        cssClass: cssClass2,
        icon,
        timeOut: !isNullOrUndefined(timeOut) ? timeOut : 5e3
      };
    } else {
      untilToastsModel = content;
    }
    var toastObj = new Toast(untilToastsModel);
    toastObj.appendTo(toastContainerElement);
    toastObj.show();
    return toastObj;
  }
  ToastUtility2.show = show;
})(ToastUtility || (ToastUtility = {}));

// node_modules/@syncfusion/ej2-notifications/src/message/message.js
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
var Severity;
(function(Severity2) {
  Severity2["Normal"] = "Normal";
  Severity2["Success"] = "Success";
  Severity2["Info"] = "Info";
  Severity2["Warning"] = "Warning";
  Severity2["Error"] = "Error";
})(Severity || (Severity = {}));
var Variant;
(function(Variant2) {
  Variant2["Text"] = "Text";
  Variant2["Outlined"] = "Outlined";
  Variant2["Filled"] = "Filled";
})(Variant || (Variant = {}));
var MSG_ICON = "e-msg-icon";
var MSG_CLOSE_ICON = "e-msg-close-icon";
var MSG_CONTENT = "e-msg-content";
var MSG_CONTENT_CENTER = "e-content-center";
var RTL2 = "e-rtl";
var SUCCESS = "e-success";
var WARNING = "e-warning";
var INFO = "e-info";
var ERROR = "e-error";
var OUTLINED = "e-outlined";
var FILLED = "e-filled";
var HIDE = "e-hidden";
var Message = (
  /** @class */
  function(_super) {
    __extends2(Message2, _super);
    function Message2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.initialRender = true;
      return _this;
    }
    Message2.prototype.getModuleName = function() {
      return "message";
    };
    Message2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Message2.prototype.preRender = function() {
      var localeText = { close: "Close" };
      this.l10n = new L10n("message", localeText, this.locale);
    };
    Message2.prototype.render = function() {
      this.innerContent = this.element.innerHTML;
      this.element.innerHTML = "";
      this.msgElement = this.createElement("div", { className: "e-msg-content-wrap" });
      this.initialize();
      this.wireEvents();
      this.renderComplete();
      this.renderReactTemplates();
      this.initialRender = false;
    };
    Message2.prototype.initialize = function() {
      this.element.setAttribute("role", "alert");
      this.setCssClass();
      this.setIcon();
      this.setContent();
      this.setCloseIcon();
      this.setSeverity();
      this.setVariant();
      this.setVisible();
      if (this.enableRtl) {
        this.element.classList.add(RTL2);
      }
    };
    Message2.prototype.setIcon = function() {
      if (this.showIcon) {
        this.iconElement = this.createElement("span", { className: MSG_ICON });
        if (this.element.classList.contains(MSG_CONTENT_CENTER)) {
          this.msgElement.appendChild(this.iconElement);
        } else {
          this.element.appendChild(this.iconElement);
        }
      }
    };
    Message2.prototype.setCloseIcon = function() {
      if (this.showCloseIcon) {
        this.closeIcon = this.createElement("button", { attrs: { type: "button", class: MSG_CLOSE_ICON } });
        this.element.appendChild(this.closeIcon);
        this.setTitle();
      }
    };
    Message2.prototype.setTitle = function() {
      this.l10n.setLocale(this.locale);
      var closeIconTitle = this.l10n.getConstant("close");
      this.closeIcon.setAttribute("title", closeIconTitle);
      this.closeIcon.setAttribute("aria-label", closeIconTitle);
    };
    Message2.prototype.setContent = function() {
      this.txtElement = this.createElement("div", { className: MSG_CONTENT });
      if (this.element.classList.contains(MSG_CONTENT_CENTER)) {
        this.msgElement.appendChild(this.txtElement);
        this.element.appendChild(this.msgElement);
      } else {
        this.element.appendChild(this.txtElement);
      }
      this.setTemplate();
    };
    Message2.prototype.setTemplate = function() {
      var templateFn;
      if (isNullOrUndefined(this.content) || this.content === "") {
        this.txtElement.innerHTML = this.innerContent;
      } else if (!isNullOrUndefined(this.content) && this.content !== "") {
        if (typeof this.content === "string" || typeof this.content !== "string") {
          if (this.isVue || typeof this.content !== "string") {
            templateFn = compile(this.content);
            if (!isNullOrUndefined(templateFn)) {
              var tempArr = templateFn({}, this, "content", this.element.id + "content", true);
              if (tempArr) {
                tempArr = Array.prototype.slice.call(tempArr);
                append(tempArr, this.txtElement);
                this.renderReactTemplates();
              }
            }
          } else {
            this.txtElement.innerHTML = this.content;
          }
        }
      }
    };
    Message2.prototype.setSeverity = function() {
      var classList2 = [SUCCESS, WARNING, INFO, ERROR];
      removeClass([this.element], classList2);
      if (this.severity === "Success") {
        addClass([this.element], SUCCESS);
      } else if (this.severity === "Warning") {
        addClass([this.element], WARNING);
      } else if (this.severity === "Error") {
        addClass([this.element], ERROR);
      } else if (this.severity === "Info") {
        addClass([this.element], INFO);
      }
    };
    Message2.prototype.setVariant = function() {
      var classList2 = [FILLED, OUTLINED];
      removeClass([this.element], classList2);
      if (this.variant === "Outlined") {
        addClass([this.element], OUTLINED);
      } else if (this.variant === "Filled") {
        addClass([this.element], FILLED);
      }
    };
    Message2.prototype.setCssClass = function(oldCssClass) {
      if (oldCssClass) {
        removeClass([this.element], oldCssClass.split(" "));
      }
      if (this.cssClass) {
        addClass([this.element], this.cssClass.split(" "));
      }
    };
    Message2.prototype.setVisible = function() {
      if (!this.visible) {
        addClass([this.element], HIDE);
        if (!this.initialRender) {
          this.trigger("closed", { event, isInteracted: false, element: this.element });
        }
      } else {
        removeClass([this.element], HIDE);
      }
    };
    Message2.prototype.clickHandler = function(event2) {
      this.closeMessage(event2);
    };
    Message2.prototype.keyboardHandler = function(event2) {
      if (event2.keyCode === 32 || event2.keyCode === 13) {
        this.closeMessage(event2);
      }
    };
    Message2.prototype.closeMessage = function(event2) {
      addClass([this.element], HIDE);
      this.setProperties({ visible: false }, true);
      var eventArgs = { event: event2, isInteracted: true, element: this.element };
      this.trigger("closed", eventArgs);
    };
    Message2.prototype.wireEvents = function() {
      if (this.showCloseIcon) {
        EventHandler.add(this.closeIcon, "click", this.clickHandler, this);
        EventHandler.add(this.closeIcon, "keydown", this.keyboardHandler, this);
      }
    };
    Message2.prototype.unWireEvents = function() {
      if (this.showCloseIcon) {
        EventHandler.remove(this.closeIcon, "click", this.clickHandler);
        EventHandler.remove(this.closeIcon, "keydown", this.keyboardHandler);
      }
    };
    Message2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "cssClass":
            this.setCssClass(oldProp.cssClass);
            break;
          case "content":
            this.txtElement.innerHTML = "";
            this.setTemplate();
            break;
          case "enableRtl":
            if (!this.enableRtl) {
              this.element.classList.remove(RTL2);
            } else {
              this.element.classList.add(RTL2);
            }
            break;
          case "locale":
            if (this.showCloseIcon) {
              this.setTitle();
            }
            break;
          case "showIcon":
            if (!this.showIcon && this.element.getElementsByClassName(MSG_ICON).length > 0) {
              detach(this.iconElement);
            }
            if (this.showIcon) {
              this.iconElement = this.createElement("span", { className: MSG_ICON });
              this.element.insertBefore(this.iconElement, this.txtElement);
            }
            break;
          case "showCloseIcon":
            if (!this.showCloseIcon && !isNullOrUndefined(this.closeIcon)) {
              this.unWireEvents();
              detach(this.closeIcon);
            } else {
              this.setCloseIcon();
              this.wireEvents();
            }
            break;
          case "severity":
            this.setSeverity();
            break;
          case "variant":
            this.setVariant();
            break;
          case "visible":
            this.setVisible();
            break;
        }
      }
    };
    Message2.prototype.destroy = function() {
      var cssClass2 = isNullOrUndefined(this.cssClass) ? [""] : this.cssClass.split(" ");
      var className = [SUCCESS, WARNING, INFO, ERROR, RTL2, HIDE, OUTLINED, FILLED];
      var classList2 = cssClass2.length === 1 && cssClass2[0] === "" ? className : className.concat(cssClass2);
      removeClass([this.element], classList2);
      this.element.removeAttribute("role");
      this.unWireEvents();
      if (!isNullOrUndefined(this.iconElement)) {
        detach(this.iconElement);
      }
      detach(this.txtElement);
      if (!isNullOrUndefined(this.closeIcon)) {
        detach(this.closeIcon);
      }
      _super.prototype.destroy.call(this);
    };
    __decorate2([
      Property(null)
    ], Message2.prototype, "content", void 0);
    __decorate2([
      Property("")
    ], Message2.prototype, "cssClass", void 0);
    __decorate2([
      Property(true)
    ], Message2.prototype, "showIcon", void 0);
    __decorate2([
      Property(false)
    ], Message2.prototype, "showCloseIcon", void 0);
    __decorate2([
      Property("Normal")
    ], Message2.prototype, "severity", void 0);
    __decorate2([
      Property("Text")
    ], Message2.prototype, "variant", void 0);
    __decorate2([
      Property(true)
    ], Message2.prototype, "visible", void 0);
    __decorate2([
      Event()
    ], Message2.prototype, "created", void 0);
    __decorate2([
      Event()
    ], Message2.prototype, "destroyed", void 0);
    __decorate2([
      Event()
    ], Message2.prototype, "closed", void 0);
    Message2 = __decorate2([
      NotifyPropertyChanges
    ], Message2);
    return Message2;
  }(Component)
);

// node_modules/@syncfusion/ej2-notifications/src/skeleton/skeleton.js
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
var cssClassName = {
  TEXTSHAPE: "e-skeleton-text",
  CIRCLESHAPE: "e-skeleton-circle",
  SQUARESHAPE: "e-skeleton-square",
  RECTANGLESHAPE: "e-skeleton-rectangle",
  WAVEEFFECT: "e-shimmer-wave",
  PULSEEFFECT: "e-shimmer-pulse",
  FADEEFFECT: "e-shimmer-fade",
  VISIBLENONE: "e-visible-none"
};
var SkeletonType;
(function(SkeletonType2) {
  SkeletonType2["Text"] = "Text";
  SkeletonType2["Circle"] = "Circle";
  SkeletonType2["Square"] = "Square";
  SkeletonType2["Rectangle"] = "Rectangle";
})(SkeletonType || (SkeletonType = {}));
var ShimmerEffect;
(function(ShimmerEffect2) {
  ShimmerEffect2["Wave"] = "Wave";
  ShimmerEffect2["Fade"] = "Fade";
  ShimmerEffect2["Pulse"] = "Pulse";
  ShimmerEffect2["None"] = "None";
})(ShimmerEffect || (ShimmerEffect = {}));
var Skeleton = (
  /** @class */
  function(_super) {
    __extends3(Skeleton2, _super);
    function Skeleton2(options, element) {
      return _super.call(this, options, element) || this;
    }
    Skeleton2.prototype.getModuleName = function() {
      return "skeleton";
    };
    Skeleton2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    Skeleton2.prototype.preRender = function() {
      if (!this.element.id) {
        this.element.id = getUniqueID("e-" + this.getModuleName());
      }
      this.updateCssClass();
      attributes(this.element, { role: "alert", "aria-busy": "true", "aria-live": "polite", "aria-label": this.label });
    };
    Skeleton2.prototype.render = function() {
      this.initialize();
    };
    Skeleton2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
          case "height":
            this.updateDimension();
            break;
          case "shape":
            this.updateShape();
            break;
          case "shimmerEffect":
            this.updateEffect();
            break;
          case "visible":
            this.updateVisibility();
            break;
          case "label":
            this.element.setAttribute("aria-label", this.label);
            break;
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([this.element], oldProp.cssClass.split(" "));
            }
            this.updateCssClass();
            break;
        }
      }
    };
    Skeleton2.prototype.destroy = function() {
      _super.prototype.destroy.call(this);
      var attrs = ["role", "aria-live", "aria-busy", "aria-label"];
      var cssClass2 = [];
      if (this.cssClass) {
        cssClass2 = cssClass2.concat(this.cssClass.split(" "));
      }
      for (var i = 0; i < attrs.length; i++) {
        this.element.removeAttribute(attrs[parseInt(i.toString(), 10)]);
      }
      cssClass2 = cssClass2.concat(this.element.classList.value.match(/(e-skeleton-[^\s]+)/g) || []);
      cssClass2 = cssClass2.concat(this.element.classList.value.match(/(e-shimmer-[^\s]+)/g) || []);
      removeClass([this.element], cssClass2);
    };
    Skeleton2.prototype.initialize = function() {
      this.updateShape();
      this.updateEffect();
      this.updateVisibility();
    };
    Skeleton2.prototype.updateShape = function() {
      if (!isNullOrUndefined(this.shape)) {
        var shapeCss = cssClassName[this.shape.toUpperCase() + "SHAPE"];
        var removeCss = this.element.classList.value.match(/(e-skeleton-[^\s]+)/g) || [];
        this.updateDimension();
        if (removeCss) {
          removeClass([this.element], removeCss);
        }
        addClass([this.element], [shapeCss]);
      }
    };
    Skeleton2.prototype.updateDimension = function() {
      var width = !this.width && ["Text", "Rectangle"].indexOf(this.shape) > -1 ? "100%" : formatUnit(this.width);
      var height = ["Circle", "Square"].indexOf(this.shape) > -1 ? width : formatUnit(this.height);
      this.element.style.width = width;
      this.element.style.height = height;
    };
    Skeleton2.prototype.updateEffect = function() {
      var removeCss = this.element.classList.value.match(/(e-shimmer-[^\s]+)/g) || [];
      if (removeCss) {
        removeClass([this.element], removeCss);
      }
      if (!isNullOrUndefined(this.shimmerEffect)) {
        addClass([this.element], [cssClassName[this.shimmerEffect.toUpperCase() + "EFFECT"]]);
      }
    };
    Skeleton2.prototype.updateVisibility = function() {
      this.element.classList[this.visible ? "remove" : "add"](cssClassName.VISIBLENONE);
    };
    Skeleton2.prototype.updateCssClass = function() {
      if (this.cssClass) {
        addClass([this.element], this.cssClass.split(" "));
      }
    };
    __decorate3([
      Property("")
    ], Skeleton2.prototype, "width", void 0);
    __decorate3([
      Property("")
    ], Skeleton2.prototype, "height", void 0);
    __decorate3([
      Property(true)
    ], Skeleton2.prototype, "visible", void 0);
    __decorate3([
      Property("Text")
    ], Skeleton2.prototype, "shape", void 0);
    __decorate3([
      Property("Wave")
    ], Skeleton2.prototype, "shimmerEffect", void 0);
    __decorate3([
      Property("Loading...")
    ], Skeleton2.prototype, "label", void 0);
    __decorate3([
      Property("")
    ], Skeleton2.prototype, "cssClass", void 0);
    Skeleton2 = __decorate3([
      NotifyPropertyChanges
    ], Skeleton2);
    return Skeleton2;
  }(Component)
);

// node_modules/@syncfusion/ej2-dropdowns/src/drop-down-base/drop-down-base.js
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
var FieldSettings = (
  /** @class */
  function(_super) {
    __extends4(FieldSettings2, _super);
    function FieldSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate4([
      Property()
    ], FieldSettings2.prototype, "text", void 0);
    __decorate4([
      Property()
    ], FieldSettings2.prototype, "value", void 0);
    __decorate4([
      Property()
    ], FieldSettings2.prototype, "iconCss", void 0);
    __decorate4([
      Property()
    ], FieldSettings2.prototype, "groupBy", void 0);
    __decorate4([
      Property()
    ], FieldSettings2.prototype, "htmlAttributes", void 0);
    __decorate4([
      Property()
    ], FieldSettings2.prototype, "disabled", void 0);
    return FieldSettings2;
  }(ChildProperty)
);
var dropDownBaseClasses = {
  root: "e-dropdownbase",
  rtl: "e-rtl",
  content: "e-content",
  selected: "e-active",
  hover: "e-hover",
  noData: "e-nodata",
  fixedHead: "e-fixed-head",
  focus: "e-item-focus",
  li: "e-list-item",
  group: "e-list-group-item",
  disabled: "e-disabled",
  grouping: "e-dd-group",
  virtualList: "e-list-item e-virtual-list"
};
var ITEMTEMPLATE_PROPERTY = "ItemTemplate";
var DISPLAYTEMPLATE_PROPERTY = "DisplayTemplate";
var SPINNERTEMPLATE_PROPERTY = "SpinnerTemplate";
var VALUETEMPLATE_PROPERTY = "ValueTemplate";
var GROUPTEMPLATE_PROPERTY = "GroupTemplate";
var HEADERTEMPLATE_PROPERTY = "HeaderTemplate";
var FOOTERTEMPLATE_PROPERTY = "FooterTemplate";
var NORECORDSTEMPLATE_PROPERTY = "NoRecordsTemplate";
var ACTIONFAILURETEMPLATE_PROPERTY = "ActionFailureTemplate";
var HIDE_GROUPLIST = "e-hide-group-header";
var DropDownBase = (
  /** @class */
  function(_super) {
    __extends4(DropDownBase2, _super);
    function DropDownBase2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.preventChange = false;
      _this.isPreventChange = false;
      _this.isDynamicDataChange = false;
      _this.addedNewItem = false;
      _this.isAddNewItemTemplate = false;
      _this.isRequesting = false;
      _this.isVirtualizationEnabled = false;
      _this.isCustomDataUpdated = false;
      _this.isAllowFiltering = false;
      _this.virtualizedItemsCount = 0;
      _this.isCheckBoxSelection = false;
      _this.totalItemCount = 0;
      _this.dataCount = 0;
      _this.remoteDataCount = -1;
      _this.isRemoteDataUpdated = false;
      _this.isIncrementalRequest = false;
      _this.itemCount = 30;
      _this.virtualListHeight = 0;
      _this.isVirtualScrolling = false;
      _this.isPreventScrollAction = false;
      _this.scrollPreStartIndex = 0;
      _this.isScrollActionTriggered = false;
      _this.previousStartIndex = 0;
      _this.isMouseScrollAction = false;
      _this.isKeyBoardAction = false;
      _this.isScrollChanged = false;
      _this.isUpwardScrolling = false;
      _this.startIndex = 0;
      _this.currentPageNumber = 0;
      _this.pageCount = 0;
      _this.isPreventKeyAction = false;
      _this.generatedDataObject = {};
      _this.skeletonCount = 32;
      _this.isVirtualTrackHeight = false;
      _this.virtualSelectAll = false;
      _this.incrementalQueryString = "";
      _this.incrementalEndIndex = 0;
      _this.incrementalStartIndex = 0;
      _this.incrementalPreQueryString = "";
      _this.isObjectCustomValue = false;
      _this.appendUncheckList = false;
      _this.getInitialData = false;
      _this.preventPopupOpen = true;
      _this.virtualSelectAllState = false;
      _this.CurrentEvent = null;
      _this.virtualListInfo = {
        currentPageNumber: null,
        direction: null,
        sentinelInfo: {},
        offsets: {},
        startIndex: 0,
        endIndex: 0
      };
      _this.viewPortInfo = {
        currentPageNumber: null,
        direction: null,
        sentinelInfo: {},
        offsets: {},
        startIndex: 0,
        endIndex: 0
      };
      _this.selectedValueInfo = {
        currentPageNumber: null,
        direction: null,
        sentinelInfo: {},
        offsets: {},
        startIndex: 0,
        endIndex: 0
      };
      return _this;
    }
    DropDownBase2.prototype.getPropObject = function(prop, newProp, oldProp) {
      var newProperty = new Object();
      var oldProperty = new Object();
      var propName = function(prop2) {
        return prop2;
      };
      newProperty[propName(prop)] = newProp[propName(prop)];
      oldProperty[propName(prop)] = oldProp[propName(prop)];
      var data = new Object();
      data.newProperty = newProperty;
      data.oldProperty = oldProperty;
      return data;
    };
    DropDownBase2.prototype.getValueByText = function(text, ignoreCase, ignoreAccent) {
      var value = null;
      if (!isNullOrUndefined(this.listData)) {
        if (ignoreCase) {
          value = this.checkValueCase(text, true, ignoreAccent);
        } else {
          value = this.checkValueCase(text, false, ignoreAccent);
        }
      }
      return value;
    };
    DropDownBase2.prototype.checkValueCase = function(text, ignoreCase, ignoreAccent, isTextByValue) {
      var _this = this;
      var value = null;
      if (isTextByValue) {
        value = text;
      }
      var dataSource = this.listData;
      var fields = this.fields;
      var type = this.typeOfData(dataSource).typeof;
      if (type === "string" || type === "number" || type === "boolean") {
        for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
          var item = dataSource_1[_i];
          if (!isNullOrUndefined(item)) {
            if (ignoreAccent) {
              value = this.checkingAccent(String(item), text, ignoreCase);
            } else {
              if (ignoreCase) {
                if (this.checkIgnoreCase(String(item), text)) {
                  value = this.getItemValue(String(item), text, ignoreCase);
                }
              } else {
                if (this.checkNonIgnoreCase(String(item), text)) {
                  value = this.getItemValue(String(item), text, ignoreCase, isTextByValue);
                }
              }
            }
          }
        }
      } else {
        if (ignoreCase) {
          dataSource.filter(function(item2) {
            var itemValue = getValue(fields.value, item2);
            if (!isNullOrUndefined(itemValue) && _this.checkIgnoreCase(getValue(fields.text, item2).toString(), text)) {
              value = getValue(fields.value, item2);
            }
          });
        } else {
          if (isTextByValue) {
            var compareValue_1 = null;
            compareValue_1 = value;
            dataSource.filter(function(item2) {
              var itemValue = getValue(fields.value, item2);
              if (!isNullOrUndefined(itemValue) && !isNullOrUndefined(value) && itemValue.toString() === compareValue_1.toString()) {
                value = getValue(fields.text, item2);
              }
            });
          } else {
            dataSource.filter(function(item2) {
              if (_this.checkNonIgnoreCase(getValue(fields.text, item2), text)) {
                value = getValue(fields.value, item2);
              }
            });
          }
        }
      }
      return value;
    };
    DropDownBase2.prototype.checkingAccent = function(item, text, ignoreCase) {
      var dataItem = DataUtil.ignoreDiacritics(String(item));
      var textItem = DataUtil.ignoreDiacritics(text.toString());
      var value = null;
      if (ignoreCase) {
        if (this.checkIgnoreCase(dataItem, textItem)) {
          value = this.getItemValue(String(item), text, ignoreCase);
        }
      } else {
        if (this.checkNonIgnoreCase(String(item), text)) {
          value = this.getItemValue(String(item), text, ignoreCase);
        }
      }
      return value;
    };
    DropDownBase2.prototype.checkIgnoreCase = function(item, text) {
      return String(item).toLowerCase() === text.toString().toLowerCase() ? true : false;
    };
    DropDownBase2.prototype.checkNonIgnoreCase = function(item, text) {
      return String(item) === text.toString() ? true : false;
    };
    DropDownBase2.prototype.getItemValue = function(dataItem, typedText, ignoreCase, isTextByValue) {
      var value = null;
      var dataSource = this.listData;
      var type = this.typeOfData(dataSource).typeof;
      if (isTextByValue) {
        value = dataItem.toString();
      } else {
        if (ignoreCase) {
          value = type === "string" ? String(dataItem) : this.getFormattedValue(String(dataItem));
        } else {
          value = type === "string" ? typedText : this.getFormattedValue(typedText);
        }
      }
      return value;
    };
    DropDownBase2.prototype.templateCompiler = function(baseTemplate) {
      var checkTemplate = false;
      if (typeof baseTemplate !== "function" && baseTemplate) {
        try {
          checkTemplate = selectAll(baseTemplate, document).length ? true : false;
        } catch (exception) {
          checkTemplate = false;
        }
      }
      return checkTemplate;
    };
    DropDownBase2.prototype.l10nUpdate = function(actionFailure) {
      var ele = this.getModuleName() === "listbox" ? this.ulElement : this.list;
      if (!isNullOrUndefined(this.noRecordsTemplate) && this.noRecordsTemplate !== "No records found" || this.actionFailureTemplate !== "Request failed") {
        var template = actionFailure ? this.actionFailureTemplate : this.noRecordsTemplate;
        var compiledString = void 0;
        var templateId = actionFailure ? this.actionFailureTemplateId : this.noRecordsTemplateId;
        ele.innerHTML = "";
        var tempaltecheck = this.templateCompiler(template);
        if (typeof template !== "function" && tempaltecheck) {
          compiledString = compile(select(template, document).innerHTML.trim());
        } else {
          compiledString = compile(template);
        }
        var templateName = actionFailure ? "actionFailureTemplate" : "noRecordsTemplate";
        var noDataElement = void 0;
        if (this.isReact && typeof template === "function") {
          noDataElement = compiledString({}, this, templateName, templateId, this.isStringTemplate, null);
        } else {
          noDataElement = compiledString({}, this, templateName, templateId, this.isStringTemplate, null, ele);
        }
        if (noDataElement && noDataElement.length > 0) {
          for (var i = 0; i < noDataElement.length; i++) {
            if (this.getModuleName() === "listbox" && templateName === "noRecordsTemplate") {
              if (noDataElement[i].nodeName === "#text") {
                var liElem = this.createElement("li");
                liElem.textContent = noDataElement[i].textContent;
                liElem.classList.add("e-list-nrt");
                liElem.setAttribute("role", "option");
                ele.appendChild(liElem);
              } else {
                noDataElement[i].classList.add("e-list-nr-template");
                ele.appendChild(noDataElement[i]);
              }
            } else {
              if (noDataElement[i] instanceof HTMLElement || noDataElement[i] instanceof Text && noDataElement[i].textContent !== "") {
                ele.appendChild(noDataElement[i]);
              }
            }
          }
        }
        this.renderReactTemplates();
      } else {
        var l10nLocale = { noRecordsTemplate: "No records found", actionFailureTemplate: "Request failed" };
        var componentLocale = new L10n(this.getLocaleName(), {}, this.locale);
        if (componentLocale.getConstant("actionFailureTemplate") !== "" || componentLocale.getConstant("noRecordsTemplate") !== "") {
          this.l10n = componentLocale;
        } else {
          this.l10n = new L10n(this.getModuleName() === "listbox" ? "listbox" : this.getModuleName() === "mention" ? "mention" : "dropdowns", l10nLocale, this.locale);
        }
        var content = actionFailure ? this.l10n.getConstant("actionFailureTemplate") : this.l10n.getConstant("noRecordsTemplate");
        if (this.getModuleName() === "listbox") {
          var liElem = this.createElement("li");
          liElem.textContent = content;
          ele.appendChild(liElem);
          liElem.classList.add("e-list-nrt");
          liElem.setAttribute("role", "option");
        } else {
          if (!isNullOrUndefined(ele)) {
            ele.innerHTML = content;
          }
        }
      }
    };
    DropDownBase2.prototype.checkAndResetCache = function() {
      if (this.isVirtualizationEnabled) {
        this.generatedDataObject = {};
        this.virtualItemStartIndex = this.virtualItemEndIndex = 0;
        this.viewPortInfo = {
          currentPageNumber: null,
          direction: null,
          sentinelInfo: {},
          offsets: {},
          startIndex: 0,
          endIndex: this.itemCount
        };
        this.selectedValueInfo = null;
      }
    };
    DropDownBase2.prototype.updateIncrementalInfo = function(startIndex, endIndex) {
      this.viewPortInfo.startIndex = startIndex;
      this.viewPortInfo.endIndex = endIndex;
      this.updateVirtualItemIndex();
      this.isIncrementalRequest = true;
      this.resetList(this.dataSource, this.fields, this.query);
      this.isIncrementalRequest = false;
    };
    DropDownBase2.prototype.updateIncrementalView = function(startIndex, endIndex) {
      this.viewPortInfo.startIndex = startIndex;
      this.viewPortInfo.endIndex = endIndex;
      this.updateVirtualItemIndex();
      this.resetList(this.dataSource, this.fields, this.query);
      this.UpdateSkeleton();
      this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
      this.ulElement = this.list.querySelector("ul");
    };
    DropDownBase2.prototype.updateVirtualItemIndex = function() {
      this.virtualItemStartIndex = this.viewPortInfo.startIndex;
      this.virtualItemEndIndex = this.viewPortInfo.endIndex;
      this.virtualListInfo = this.viewPortInfo;
    };
    DropDownBase2.prototype.getFilteringSkeletonCount = function() {
      var currentSkeletonCount = this.skeletonCount;
      this.getSkeletonCount(true);
      this.skeletonCount = this.dataCount > this.itemCount * 2 ? this.skeletonCount : 0;
      var skeletonUpdated = true;
      if ((this.getModuleName() === "autocomplete" || this.getModuleName() === "multiselect") && this.totalItemCount < this.itemCount * 2) {
        this.skeletonCount = 0;
        skeletonUpdated = false;
      }
      if (!this.list.classList.contains(dropDownBaseClasses.noData)) {
        var isSkeletonCountChange = currentSkeletonCount !== this.skeletonCount;
        if (currentSkeletonCount !== this.skeletonCount && skeletonUpdated) {
          this.UpdateSkeleton(true, Math.abs(currentSkeletonCount - this.skeletonCount));
        } else {
          this.UpdateSkeleton();
        }
        this.liCollections = this.list.querySelectorAll(".e-list-item");
        if (this.list.getElementsByClassName("e-virtual-ddl").length > 0) {
          this.list.getElementsByClassName("e-virtual-ddl")[0].style = this.GetVirtualTrackHeight();
        } else if (!this.list.querySelector(".e-virtual-ddl") && this.skeletonCount > 0 && this.list.querySelector(".e-dropdownbase")) {
          var virualElement = this.createElement("div", {
            id: this.element.id + "_popup",
            className: "e-virtual-ddl",
            styles: this.GetVirtualTrackHeight()
          });
          this.list.querySelector(".e-dropdownbase").appendChild(virualElement);
        }
        if (this.list.getElementsByClassName("e-virtual-ddl-content").length > 0) {
          this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
        }
      }
    };
    DropDownBase2.prototype.getSkeletonCount = function(retainSkeleton) {
      this.virtualListHeight = this.listContainerHeight != null ? parseInt(this.listContainerHeight, 10) : this.virtualListHeight;
      var actualCount = this.virtualListHeight > 0 ? Math.floor(this.virtualListHeight / this.listItemHeight) : 0;
      this.skeletonCount = actualCount * 4 < this.itemCount ? this.itemCount : actualCount * 4;
      this.itemCount = retainSkeleton ? this.itemCount : this.skeletonCount;
      this.virtualItemCount = this.itemCount;
      this.skeletonCount = Math.floor(this.skeletonCount / 2);
    };
    DropDownBase2.prototype.GetVirtualTrackHeight = function() {
      var height = this.totalItemCount === this.viewPortInfo.endIndex ? this.totalItemCount * this.listItemHeight - this.itemCount * this.listItemHeight : this.totalItemCount * this.listItemHeight;
      height = this.isVirtualTrackHeight ? 0 : height;
      var heightDimension = "height: " + (height - this.itemCount * this.listItemHeight) + "px;";
      if ((this.getModuleName() === "autocomplete" || this.getModuleName() === "multiselect") && this.skeletonCount === 0) {
        return "height: 0px;";
      }
      return heightDimension;
    };
    DropDownBase2.prototype.getTransformValues = function() {
      var translateY = this.viewPortInfo.startIndex * this.listItemHeight;
      translateY = translateY - this.skeletonCount * this.listItemHeight;
      translateY = this.viewPortInfo.startIndex === 0 && this.listData && this.listData.length === 0 || this.skeletonCount === 0 ? 0 : translateY;
      var styleText = "transform: translate(0px, " + translateY + "px);";
      return styleText;
    };
    DropDownBase2.prototype.UpdateSkeleton = function(isSkeletonCountChange, skeletonCount) {
      var isContainSkeleton = this.list.querySelector(".e-virtual-ddl-content");
      var isContainVirtualList = this.list.querySelector(".e-virtual-list");
      if (isContainSkeleton && (!isContainVirtualList || isSkeletonCountChange) && this.isVirtualizationEnabled) {
        var totalSkeletonCount = isSkeletonCountChange ? skeletonCount : this.skeletonCount;
        for (var i = 0; i < totalSkeletonCount; i++) {
          var liElement = this.createElement("li", { className: dropDownBaseClasses.virtualList, styles: "overflow: inherit" });
          if (this.isVirtualizationEnabled && this.itemTemplate) {
            liElement.style.height = this.listItemHeight + "px";
          }
          var skeleton = new Skeleton({
            shape: "Text",
            height: "10px",
            width: "95%",
            cssClass: "e-skeleton-text"
          });
          skeleton.appendTo(this.createElement("div"));
          liElement.appendChild(skeleton.element);
          isContainSkeleton.firstChild && isContainSkeleton.firstChild.insertBefore(liElement, isContainSkeleton.firstChild.children[0]);
        }
      }
    };
    DropDownBase2.prototype.getLocaleName = function() {
      return "drop-down-base";
    };
    DropDownBase2.prototype.getTextByValue = function(value) {
      var text = this.checkValueCase(value, false, false, true);
      return text;
    };
    DropDownBase2.prototype.getFormattedValue = function(value) {
      if (this.listData && this.listData.length) {
        var item = void 0;
        if (this.properties.allowCustomValue && this.properties.value && this.properties.value instanceof Array && this.properties.value.length > 0) {
          item = this.typeOfData(this.properties.value);
        } else {
          item = this.typeOfData(this.listData);
        }
        if (typeof getValue(this.fields.value ? this.fields.value : "value", item.item) === "number" || item.typeof === "number") {
          return parseFloat(value);
        }
        if (typeof getValue(this.fields.value ? this.fields.value : "value", item.item) === "boolean" || item.typeof === "boolean") {
          return value === "true" || "" + value === "true";
        }
      }
      return value;
    };
    DropDownBase2.prototype.setEnableRtl = function() {
      if (!isNullOrUndefined(this.enableRtlElements)) {
        if (this.list) {
          this.enableRtlElements.push(this.list);
        }
        if (this.enableRtl) {
          addClass(this.enableRtlElements, dropDownBaseClasses.rtl);
        } else {
          removeClass(this.enableRtlElements, dropDownBaseClasses.rtl);
        }
      }
    };
    DropDownBase2.prototype.initialize = function(e) {
      this.bindEvent = true;
      this.preventPopupOpen = true;
      this.actionFailureTemplateId = "" + this.element.id + ACTIONFAILURETEMPLATE_PROPERTY;
      if (this.element.tagName === "UL") {
        var jsonElement = ListBase.createJsonFromElement(this.element);
        this.setProperties({ fields: { text: "text", value: "text" } }, true);
        this.resetList(jsonElement, this.fields);
      } else if (this.element.tagName === "SELECT") {
        var dataSource = this.dataSource instanceof Array ? this.dataSource.length > 0 ? true : false : !isNullOrUndefined(this.dataSource) ? true : false;
        if (!dataSource) {
          this.renderItemsBySelect();
        } else if (this.isDynamicDataChange) {
          this.setListData(this.dataSource, this.fields, this.query);
        }
      } else {
        this.setListData(this.dataSource, this.fields, this.query, e);
      }
    };
    DropDownBase2.prototype.getPersistData = function() {
      return this.addOnPersist([]);
    };
    DropDownBase2.prototype.updateDataAttribute = function(value) {
      var invalidAttr = ["class", "style", "id", "type", "aria-expanded", "aria-autocomplete", "aria-readonly"];
      var attr = {};
      for (var a = 0; a < this.element.attributes.length; a++) {
        if (invalidAttr.indexOf(this.element.attributes[a].name) === -1 && !(this.getModuleName() === "dropdownlist" && this.element.attributes[a].name === "readonly")) {
          attr[this.element.attributes[a].name] = this.element.getAttribute(this.element.attributes[a].name);
        }
      }
      extend(attr, value, attr);
      this.setProperties({ htmlAttributes: attr }, true);
    };
    DropDownBase2.prototype.renderItemsBySelect = function() {
      var element = this.element;
      var fields = { value: "value", text: "text" };
      var jsonElement = [];
      var group = element.querySelectorAll("select>optgroup");
      var option = element.querySelectorAll("select>option");
      this.getJSONfromOption(jsonElement, option, fields);
      if (group.length) {
        for (var i = 0; i < group.length; i++) {
          var item = group[i];
          var optionGroup = {};
          optionGroup[fields.text] = item.label;
          optionGroup.isHeader = true;
          var child = item.querySelectorAll("option");
          jsonElement.push(optionGroup);
          this.getJSONfromOption(jsonElement, child, fields);
        }
        element.querySelectorAll("select>option");
      }
      this.updateFields(fields.text, fields.value, this.fields.groupBy, this.fields.htmlAttributes, this.fields.iconCss, this.fields.disabled);
      this.resetList(jsonElement, fields);
    };
    DropDownBase2.prototype.updateFields = function(text, value, groupBy, htmlAttributes, iconCss, disabled) {
      var field = {
        "fields": {
          text,
          value,
          groupBy: !isNullOrUndefined(groupBy) ? groupBy : this.fields && this.fields.groupBy,
          htmlAttributes: !isNullOrUndefined(htmlAttributes) ? htmlAttributes : this.fields && this.fields.htmlAttributes,
          iconCss: !isNullOrUndefined(iconCss) ? iconCss : this.fields && this.fields.iconCss,
          disabled: !isNullOrUndefined(disabled) ? disabled : this.fields && this.fields.disabled
        }
      };
      this.setProperties(field, true);
    };
    DropDownBase2.prototype.getJSONfromOption = function(items, options, fields) {
      for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        var json = {};
        json[fields.text] = option.innerText;
        json[fields.value] = !isNullOrUndefined(option.getAttribute(fields.value)) ? option.getAttribute(fields.value) : option.innerText;
        items.push(json);
      }
    };
    DropDownBase2.prototype.preRender = function() {
      this.scrollTimer = -1;
      this.enableRtlElements = [];
      this.isRequested = false;
      this.isDataFetched = false;
      this.itemTemplateId = "" + this.element.id + ITEMTEMPLATE_PROPERTY;
      this.displayTemplateId = "" + this.element.id + DISPLAYTEMPLATE_PROPERTY;
      this.spinnerTemplateId = "" + this.element.id + SPINNERTEMPLATE_PROPERTY;
      this.valueTemplateId = "" + this.element.id + VALUETEMPLATE_PROPERTY;
      this.groupTemplateId = "" + this.element.id + GROUPTEMPLATE_PROPERTY;
      this.headerTemplateId = "" + this.element.id + HEADERTEMPLATE_PROPERTY;
      this.footerTemplateId = "" + this.element.id + FOOTERTEMPLATE_PROPERTY;
      this.noRecordsTemplateId = "" + this.element.id + NORECORDSTEMPLATE_PROPERTY;
    };
    DropDownBase2.prototype.setListData = function(dataSource, fields, query, event2) {
      var _this = this;
      fields = fields ? fields : this.fields;
      var ulElement;
      this.isActive = true;
      var eventArgs = { cancel: false, data: dataSource, query };
      this.isPreventChange = this.isAngular && this.preventChange ? true : this.isPreventChange;
      if (!this.isRequesting) {
        this.trigger("actionBegin", eventArgs, function(eventArgs2) {
          if (!eventArgs2.cancel) {
            _this.isRequesting = true;
            _this.showSpinner();
            if (dataSource instanceof DataManager) {
              _this.isRequested = true;
              var isWhereExist_1 = false;
              if (_this.isDataFetched) {
                _this.emptyDataRequest(fields);
                return;
              }
              eventArgs2.data.executeQuery(_this.getQuery(eventArgs2.query)).then(function(e) {
                _this.isPreventChange = _this.isAngular && _this.preventChange ? true : _this.isPreventChange;
                var isReOrder2 = true;
                if (!_this.virtualSelectAll) {
                  var newQuery2 = _this.getQuery(eventArgs2.query);
                  for (var queryElements2 = 0; queryElements2 < newQuery2.queries.length; queryElements2++) {
                    if (newQuery2.queries[queryElements2].fn === "onWhere") {
                      isWhereExist_1 = true;
                    }
                  }
                  if (_this.isVirtualizationEnabled && (e.count != 0 && e.count < _this.itemCount * 2)) {
                    if (newQuery2) {
                      for (var queryElements2 = 0; queryElements2 < newQuery2.queries.length; queryElements2++) {
                        if (newQuery2.queries[queryElements2].fn === "onTake") {
                          newQuery2.queries[queryElements2].e.nos = e.count;
                        }
                        if (_this.getModuleName() === "multiselect" && (newQuery2.queries[queryElements2].e.condition == "or" || newQuery2.queries[queryElements2].e.operator == "equal")) {
                          isReOrder2 = false;
                        }
                      }
                    }
                  } else {
                    _this.isVirtualTrackHeight = false;
                    if (newQuery2) {
                      for (var queryElements2 = 0; queryElements2 < newQuery2.queries.length; queryElements2++) {
                        if (_this.getModuleName() === "multiselect" && (newQuery2.queries[queryElements2].e && newQuery2.queries[queryElements2].e.condition == "or" || newQuery2.queries[queryElements2].e && newQuery2.queries[queryElements2].e.operator == "equal")) {
                          isReOrder2 = false;
                        }
                      }
                    }
                  }
                }
                if (isReOrder2) {
                  _this.dataCount = _this.totalItemCount = e.count;
                }
                _this.trigger("actionComplete", e, function(e2) {
                  if (!e2.cancel) {
                    _this.isRequesting = false;
                    var listItems2 = e2.result;
                    if (_this.isIncrementalRequest) {
                      ulElement = _this.renderItems(listItems2, fields);
                      return;
                    }
                    if (!_this.isVirtualizationEnabled && listItems2.length === 0 || _this.isVirtualizationEnabled && listItems2.length === 0 && !isWhereExist_1) {
                      _this.isDataFetched = true;
                    }
                    if (!isWhereExist_1) {
                      _this.remoteDataCount = e2.count;
                    }
                    _this.dataCount = !_this.virtualSelectAll ? e2.count : _this.dataCount;
                    _this.totalItemCount = !_this.virtualSelectAll ? e2.count : _this.totalItemCount;
                    ulElement = _this.renderItems(listItems2, fields);
                    _this.appendUncheckList = false;
                    _this.onActionComplete(ulElement, listItems2, e2);
                    if (_this.groupTemplate) {
                      _this.renderGroupTemplate(ulElement);
                    }
                    _this.isRequested = false;
                    _this.bindChildItems(listItems2, ulElement, fields, e2);
                    if (_this.getInitialData) {
                      _this.setListData(dataSource, fields, query, event2);
                      _this.getInitialData = false;
                      _this.preventPopupOpen = false;
                      return;
                    }
                    if (_this.isVirtualizationEnabled && _this.setCurrentView) {
                      _this.notify("setCurrentViewDataAsync", {
                        module: "VirtualScroll"
                      });
                    }
                    if (_this.keyboardEvent != null) {
                      _this.handleVirtualKeyboardActions(_this.keyboardEvent, _this.pageCount);
                    }
                    if (_this.isVirtualizationEnabled) {
                      _this.getFilteringSkeletonCount();
                    }
                    if (_this.virtualSelectAll && _this.virtualSelectAllData) {
                      _this.virtualSelectionAll(_this.virtualSelectAllState, _this.liCollections, _this.CurrentEvent);
                      _this.virtualSelectAllState = false;
                      _this.CurrentEvent = null;
                      _this.virtualSelectAll = false;
                    }
                  }
                });
              }).catch(function(e) {
                _this.isRequested = false;
                _this.isRequesting = false;
                _this.onActionFailure(e);
                _this.hideSpinner();
              });
            } else {
              _this.isRequesting = false;
              var isReOrder = true;
              var listItems = void 0;
              if (_this.isVirtualizationEnabled && !_this.virtualGroupDataSource && _this.fields.groupBy) {
                var data = new DataManager(_this.dataSource).executeLocal(new Query().group(_this.fields.groupBy));
                _this.virtualGroupDataSource = data.records;
              }
              var dataManager = _this.isVirtualizationEnabled && _this.virtualGroupDataSource && !_this.isCustomDataUpdated ? new DataManager(_this.virtualGroupDataSource) : new DataManager(eventArgs2.data);
              listItems = _this.getQuery(eventArgs2.query).executeLocal(dataManager);
              if (!_this.virtualSelectAll) {
                var newQuery = _this.getQuery(eventArgs2.query);
                if (_this.isVirtualizationEnabled && (listItems.count != 0 && listItems.count < _this.itemCount * 2)) {
                  if (newQuery) {
                    for (var queryElements = 0; queryElements < newQuery.queries.length; queryElements++) {
                      if (newQuery.queries[queryElements].fn === "onTake") {
                        newQuery.queries[queryElements].e.nos = listItems.count;
                        listItems = newQuery.executeLocal(dataManager);
                      }
                      if (_this.getModuleName() === "multiselect" && (newQuery.queries[queryElements].e.condition == "or" || newQuery.queries[queryElements].e.operator == "equal")) {
                        isReOrder = false;
                      }
                    }
                    if (isReOrder) {
                      listItems = newQuery.executeLocal(dataManager);
                      _this.isVirtualTrackHeight = !(_this.dataSource instanceof DataManager) && !_this.isCustomDataUpdated ? true : false;
                    }
                  }
                } else {
                  _this.isVirtualTrackHeight = false;
                  if (newQuery) {
                    for (var queryElements = 0; queryElements < newQuery.queries.length; queryElements++) {
                      if (_this.getModuleName() === "multiselect" && (newQuery.queries[queryElements].e && newQuery.queries[queryElements].e.condition == "or" || newQuery.queries[queryElements].e && newQuery.queries[queryElements].e.operator == "equal")) {
                        isReOrder = false;
                      }
                    }
                  }
                }
              }
              if (isReOrder && (!(_this.dataSource instanceof DataManager) && !_this.isCustomDataUpdated) && !_this.virtualSelectAll) {
                _this.dataCount = _this.totalItemCount = _this.virtualSelectAll ? listItems.length : listItems.count;
              }
              listItems = _this.isVirtualizationEnabled ? listItems.result : listItems;
              var localDataArgs = { cancel: false, result: listItems };
              _this.isPreventChange = _this.isAngular && _this.preventChange ? true : _this.isPreventChange;
              _this.trigger("actionComplete", localDataArgs, function(localDataArgs2) {
                if (_this.isIncrementalRequest) {
                  ulElement = _this.renderItems(localDataArgs2.result, fields);
                  return;
                }
                if (!localDataArgs2.cancel) {
                  ulElement = _this.renderItems(localDataArgs2.result, fields);
                  _this.onActionComplete(ulElement, localDataArgs2.result, event2);
                  if (_this.groupTemplate) {
                    _this.renderGroupTemplate(ulElement);
                  }
                  _this.bindChildItems(localDataArgs2.result, ulElement, fields);
                  if (_this.getInitialData) {
                    _this.getInitialData = false;
                    _this.preventPopupOpen = false;
                    return;
                  }
                  setTimeout(function() {
                    if (_this.getModuleName() === "multiselect" && _this.itemTemplate != null && (ulElement.childElementCount > 0 && (ulElement.children[0].childElementCount > 0 || _this.fields.groupBy && ulElement.children[1] && ulElement.children[1].childElementCount > 0))) {
                      _this.updateDataList();
                    }
                  });
                }
              });
            }
          }
        });
      }
    };
    DropDownBase2.prototype.handleVirtualKeyboardActions = function(e, pageCount) {
    };
    DropDownBase2.prototype.updatePopupState = function() {
    };
    DropDownBase2.prototype.virtualSelectionAll = function(state, li, event2) {
    };
    DropDownBase2.prototype.updateRemoteData = function() {
      this.setListData(this.dataSource, this.fields, this.query);
    };
    DropDownBase2.prototype.bindChildItems = function(listItems, ulElement, fields, e) {
      var _this = this;
      if (listItems.length >= 100 && this.getModuleName() === "autocomplete") {
        setTimeout(function() {
          var childNode = _this.remainingItems(_this.sortedData, fields);
          append(childNode, ulElement);
          _this.liCollections = _this.list.querySelectorAll("." + dropDownBaseClasses.li);
          _this.updateListValues();
          _this.raiseDataBound(listItems, e);
        }, 0);
      } else {
        this.raiseDataBound(listItems, e);
      }
    };
    DropDownBase2.prototype.isObjectInArray = function(objectToFind, array) {
      return array.some(function(item) {
        return Object.keys(objectToFind).every(function(key) {
          return item.hasOwnProperty(key) && item[key] === objectToFind[key];
        });
      });
    };
    DropDownBase2.prototype.updateListValues = function() {
    };
    DropDownBase2.prototype.findListElement = function(list, findNode, attribute, value) {
      var liElement = null;
      if (list) {
        var listArr = [].slice.call(list.querySelectorAll(findNode));
        for (var index = 0; index < listArr.length; index++) {
          if (listArr[index].getAttribute(attribute) === value + "") {
            liElement = listArr[index];
            break;
          }
        }
      }
      return liElement;
    };
    DropDownBase2.prototype.raiseDataBound = function(listItems, e) {
      this.hideSpinner();
      var dataBoundEventArgs = {
        items: listItems,
        e
      };
      this.trigger("dataBound", dataBoundEventArgs);
    };
    DropDownBase2.prototype.remainingItems = function(dataSource, fields) {
      var spliceData = new DataManager(dataSource).executeLocal(new Query().skip(100));
      if (this.itemTemplate) {
        var listElements = this.templateListItem(spliceData, fields);
        return [].slice.call(listElements.childNodes);
      }
      var type = this.typeOfData(spliceData).typeof;
      if (type === "string" || type === "number" || type === "boolean") {
        return ListBase.createListItemFromArray(this.createElement, spliceData, true, this.listOption(spliceData, fields), this);
      }
      return ListBase.createListItemFromJson(this.createElement, spliceData, this.listOption(spliceData, fields), 1, true, this);
    };
    DropDownBase2.prototype.emptyDataRequest = function(fields) {
      var listItems = [];
      this.onActionComplete(this.renderItems(listItems, fields), listItems);
      this.isRequested = false;
      this.isRequesting = false;
      this.hideSpinner();
    };
    DropDownBase2.prototype.showSpinner = function() {
    };
    DropDownBase2.prototype.hideSpinner = function() {
    };
    DropDownBase2.prototype.onActionFailure = function(e) {
      this.liCollections = [];
      this.trigger("actionFailure", e);
      this.l10nUpdate(true);
      if (!isNullOrUndefined(this.list)) {
        addClass([this.list], dropDownBaseClasses.noData);
      }
    };
    DropDownBase2.prototype.onActionComplete = function(ulElement, list, e) {
      this.listData = list;
      if (this.isVirtualizationEnabled && !this.isCustomDataUpdated && !this.virtualSelectAll) {
        this.notify("setGeneratedData", {
          module: "VirtualScroll"
        });
      }
      if (this.getModuleName() !== "listbox") {
        ulElement.setAttribute("tabindex", "0");
      }
      if (this.isReact) {
        this.clearTemplate(["itemTemplate", "groupTemplate", "actionFailureTemplate", "noRecordsTemplate"]);
      }
      if (!this.isVirtualizationEnabled) {
        this.fixedHeaderElement = isNullOrUndefined(this.fixedHeaderElement) ? this.fixedHeaderElement : null;
      }
      if (this.getModuleName() === "multiselect" && this.properties.allowCustomValue && this.fields.groupBy) {
        for (var i = 0; i < ulElement.childElementCount; i++) {
          if (ulElement.children[i].classList.contains("e-list-group-item")) {
            if (isNullOrUndefined(ulElement.children[i].innerHTML) || ulElement.children[i].innerHTML == "") {
              addClass([ulElement.children[i]], HIDE_GROUPLIST);
            }
          }
          if (ulElement.children[0].classList.contains("e-hide-group-header")) {
            setStyleAttribute(ulElement.children[1], { zIndex: 11 });
          }
        }
      }
      if (!isNullOrUndefined(this.list)) {
        if (!this.isVirtualizationEnabled) {
          this.list.innerHTML = "";
          this.list.appendChild(ulElement);
          this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
          this.ulElement = this.list.querySelector("ul");
          this.postRender(this.list, list, this.bindEvent);
        }
      }
    };
    DropDownBase2.prototype.postRender = function(listElement, list, bindEvent) {
      if (this.fields.disabled) {
        var liCollections = listElement.querySelectorAll("." + dropDownBaseClasses.li);
        for (var index = 0; index < liCollections.length; index++) {
          if (JSON.parse(JSON.stringify(this.listData[index]))[this.fields.disabled]) {
            this.disableListItem(liCollections[index]);
          }
        }
      }
      var focusItem = this.fields.disabled ? listElement.querySelector("." + dropDownBaseClasses.li + ":not(.e-disabled") : listElement.querySelector("." + dropDownBaseClasses.li);
      var selectedItem = listElement.querySelector("." + dropDownBaseClasses.selected);
      if (focusItem && !selectedItem) {
        focusItem.classList.add(dropDownBaseClasses.focus);
      }
      if (list.length <= 0) {
        this.l10nUpdate();
        addClass([listElement], dropDownBaseClasses.noData);
      } else {
        listElement.classList.remove(dropDownBaseClasses.noData);
      }
    };
    DropDownBase2.prototype.getQuery = function(query) {
      return query ? query : this.query ? this.query : new Query();
    };
    DropDownBase2.prototype.updateVirtualizationProperties = function(itemCount, filtering, isCheckbox) {
      this.isVirtualizationEnabled = true;
      this.virtualizedItemsCount = itemCount;
      this.isAllowFiltering = filtering;
      this.isCheckBoxSelection = isCheckbox;
    };
    DropDownBase2.prototype.renderGroupTemplate = function(listEle) {
      if (this.fields.groupBy !== null && this.dataSource || this.element.querySelector("." + dropDownBaseClasses.group)) {
        var dataSource = this.dataSource;
        var option = { groupTemplateID: this.groupTemplateId, isStringTemplate: this.isStringTemplate };
        var headerItems = listEle.querySelectorAll("." + dropDownBaseClasses.group);
        var groupcheck = this.templateCompiler(this.groupTemplate);
        if (typeof this.groupTemplate !== "function" && groupcheck) {
          var groupValue = select(this.groupTemplate, document).innerHTML.trim();
          var tempHeaders = ListBase.renderGroupTemplate(groupValue, dataSource, this.fields.properties, headerItems, option, this);
          if (this.isGroupChecking) {
            for (var i = 0; i < tempHeaders.length; i++) {
              this.notify("addItem", { module: "CheckBoxSelection", item: tempHeaders[i] });
            }
          }
        } else {
          var tempHeaders = ListBase.renderGroupTemplate(this.groupTemplate, dataSource, this.fields.properties, headerItems, option, this);
          if (this.isGroupChecking) {
            for (var i = 0; i < tempHeaders.length; i++) {
              this.notify("addItem", { module: "CheckBoxSelection", item: tempHeaders[i] });
            }
          }
        }
        this.renderReactTemplates();
      }
    };
    DropDownBase2.prototype.createListItems = function(dataSource, fields) {
      if (dataSource) {
        if (fields.groupBy || this.element.querySelector("optgroup")) {
          if (fields.groupBy) {
            if (this.sortOrder !== "None") {
              dataSource = this.getSortedDataSource(dataSource);
            }
            dataSource = ListBase.groupDataSource(dataSource, fields.properties, this.sortOrder);
          }
          addClass([this.list], dropDownBaseClasses.grouping);
        } else {
          dataSource = this.getSortedDataSource(dataSource);
        }
        var options = this.listOption(dataSource, fields);
        var spliceData = dataSource.length > 100 ? new DataManager(dataSource).executeLocal(new Query().take(100)) : dataSource;
        this.sortedData = dataSource;
        return ListBase.createList(this.createElement, this.getModuleName() === "autocomplete" ? spliceData : dataSource, options, true, this);
      }
      return null;
    };
    DropDownBase2.prototype.listOption = function(dataSource, fields) {
      var iconCss = isNullOrUndefined(fields.iconCss) ? false : true;
      var fieldValues = !isNullOrUndefined(fields.properties) ? fields.properties : fields;
      var options = fields.text !== null || fields.value !== null ? {
        fields: fieldValues,
        showIcon: iconCss,
        ariaAttributes: { groupItemRole: "presentation" }
      } : { fields: { value: "text" } };
      return extend({}, options, fields, true);
    };
    DropDownBase2.prototype.setFloatingHeader = function(e) {
      if (!isNullOrUndefined(this.list) && !this.list.classList.contains(dropDownBaseClasses.noData)) {
        if (isNullOrUndefined(this.fixedHeaderElement)) {
          this.fixedHeaderElement = this.createElement("div", { className: dropDownBaseClasses.fixedHead });
          if (!isNullOrUndefined(this.list) && !this.list.querySelector("li").classList.contains(dropDownBaseClasses.group)) {
            this.fixedHeaderElement.style.display = "none";
          }
          if (!isNullOrUndefined(this.fixedHeaderElement) && !isNullOrUndefined(this.list)) {
            prepend([this.fixedHeaderElement], this.list);
          }
          this.setFixedHeader();
        }
        if (!isNullOrUndefined(this.fixedHeaderElement) && this.fixedHeaderElement.style.zIndex === "0") {
          this.setFixedHeader();
        }
        this.scrollStop(e);
      }
    };
    DropDownBase2.prototype.scrollStop = function(e, isDownkey) {
      var target = !isNullOrUndefined(e) ? e.target : this.list;
      var liHeight = parseInt(getComputedStyle(this.getValidLi(), null).getPropertyValue("height"), 10);
      var topIndex = Math.round(target.scrollTop / liHeight);
      var liCollections = this.list.querySelectorAll("li:not(.e-hide-listitem)");
      var virtualListCount = this.list.querySelectorAll(".e-virtual-list").length;
      var count = 0;
      var isCount = false;
      for (var i = topIndex; i > -1; i--) {
        var index = this.isVirtualizationEnabled ? i + virtualListCount : i;
        if (this.isVirtualizationEnabled) {
          if (isCount) {
            count++;
          }
          if (this.fixedHeaderElement && this.updateGroupHeader(index, liCollections, target)) {
            break;
          }
          if (isDownkey) {
            if (!isNullOrUndefined(liCollections[index]) && liCollections[index].classList.contains(dropDownBaseClasses.selected) && this.getModuleName() !== "autocomplete" || !isNullOrUndefined(liCollections[index]) && liCollections[index].classList.contains(dropDownBaseClasses.focus) && this.getModuleName() === "autocomplete") {
              count++;
              isCount = true;
            }
          }
        } else {
          if (this.updateGroupHeader(index, liCollections, target)) {
            break;
          }
        }
      }
    };
    DropDownBase2.prototype.getPageCount = function(returnExactCount) {
      if (this.list) {
        var liHeight = this.list.classList.contains(dropDownBaseClasses.noData) ? null : getComputedStyle(this.getItems()[0], null).getPropertyValue("height");
        var pageCount = Math.round(this.list.getBoundingClientRect().height / parseInt(liHeight, 10));
        return returnExactCount ? pageCount : Math.round(pageCount);
      } else {
        return 0;
      }
    };
    DropDownBase2.prototype.updateGroupHeader = function(index, liCollections, target) {
      if (!isNullOrUndefined(liCollections[index]) && liCollections[index].classList.contains(dropDownBaseClasses.group)) {
        this.updateGroupFixedHeader(liCollections[index], target);
        return true;
      } else {
        this.fixedHeaderElement.style.display = "none";
        this.fixedHeaderElement.style.top = "none";
        return false;
      }
    };
    DropDownBase2.prototype.updateGroupFixedHeader = function(element, target) {
      if (this.fixedHeaderElement) {
        if (!isNullOrUndefined(element.innerHTML)) {
          this.fixedHeaderElement.innerHTML = element.innerHTML;
        }
        this.fixedHeaderElement.style.position = "fixed";
        this.fixedHeaderElement.style.top = this.list.parentElement.offsetTop + this.list.offsetTop - window.scrollY + "px";
        this.fixedHeaderElement.style.display = "block";
      }
    };
    DropDownBase2.prototype.getValidLi = function() {
      if (this.isVirtualizationEnabled) {
        return this.liCollections[0].classList.contains("e-virtual-list") ? this.liCollections[this.skeletonCount] : this.liCollections[0];
      }
      return this.liCollections[0];
    };
    DropDownBase2.prototype.renderItems = function(listData, fields, isCheckBoxUpdate) {
      var ulElement;
      if (this.itemTemplate && listData) {
        var dataSource = listData;
        if (dataSource && fields.groupBy) {
          if (this.sortOrder !== "None") {
            dataSource = this.getSortedDataSource(dataSource);
          }
          dataSource = ListBase.groupDataSource(dataSource, fields.properties, this.sortOrder);
        } else {
          dataSource = this.getSortedDataSource(dataSource);
        }
        this.sortedData = dataSource;
        var spliceData = dataSource.length > 100 ? new DataManager(dataSource).executeLocal(new Query().take(100)) : dataSource;
        ulElement = this.templateListItem(this.getModuleName() === "autocomplete" ? spliceData : dataSource, fields);
        if (this.isVirtualizationEnabled) {
          var oldUlElement = this.list.querySelector(".e-list-parent");
          var virtualUlElement = this.list.querySelector(".e-virtual-ddl-content");
          if (listData.length >= this.virtualizedItemsCount && oldUlElement && virtualUlElement || oldUlElement && virtualUlElement && this.isAllowFiltering || oldUlElement && virtualUlElement && this.getModuleName() === "autocomplete") {
            virtualUlElement.replaceChild(ulElement, oldUlElement);
            var reOrderList = this.list.querySelectorAll(".e-reorder");
            if (this.list.querySelector(".e-virtual-ddl-content") && reOrderList && reOrderList.length > 0 && !isCheckBoxUpdate) {
              this.list.querySelector(".e-virtual-ddl-content").removeChild(reOrderList[0]);
            }
            this.updateListElements(listData);
          } else if (!virtualUlElement) {
            this.list.innerHTML = "";
            this.createVirtualContent();
            this.list.querySelector(".e-virtual-ddl-content").appendChild(ulElement);
            this.updateListElements(listData);
          }
        }
      } else {
        if (this.getModuleName() === "multiselect" && this.virtualSelectAll) {
          this.virtualSelectAllData = listData;
          listData = listData.slice(this.virtualItemStartIndex, this.virtualItemEndIndex);
        }
        ulElement = this.createListItems(listData, fields);
        if (this.isIncrementalRequest) {
          this.incrementalLiCollections = ulElement.querySelectorAll("." + dropDownBaseClasses.li);
          this.incrementalUlElement = ulElement;
          this.incrementalListData = listData;
          return ulElement;
        }
        if (this.isVirtualizationEnabled) {
          var oldUlElement = this.list.querySelector(".e-list-parent:not(.e-reorder)");
          var virtualUlElement = this.list.querySelector(".e-virtual-ddl-content");
          var isRemovedUlelement = false;
          if (!oldUlElement && this.list.querySelector(".e-list-parent.e-reorder")) {
            oldUlElement = this.list.querySelector(".e-list-parent.e-reorder");
          }
          if (listData.length >= this.virtualizedItemsCount && oldUlElement && virtualUlElement || oldUlElement && virtualUlElement && this.isAllowFiltering || oldUlElement && virtualUlElement && (this.getModuleName() === "autocomplete" || this.getModuleName() === "multiselect") || isRemovedUlelement) {
            if (!this.appendUncheckList) {
              virtualUlElement.replaceChild(ulElement, oldUlElement);
            } else {
              virtualUlElement.appendChild(ulElement);
            }
            this.updateListElements(listData);
          } else if (!virtualUlElement || !virtualUlElement.firstChild) {
            this.list.innerHTML = "";
            this.createVirtualContent();
            this.list.querySelector(".e-virtual-ddl-content").appendChild(ulElement);
            this.updateListElements(listData);
          }
        }
      }
      return ulElement;
    };
    DropDownBase2.prototype.createVirtualContent = function() {
      if (!this.list.querySelector(".e-virtual-ddl-content")) {
        this.list.appendChild(this.createElement("div", {
          className: "e-virtual-ddl-content"
        }));
      }
    };
    DropDownBase2.prototype.updateListElements = function(listData) {
      this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
      this.ulElement = this.list.querySelector("ul");
      this.listData = listData;
      this.postRender(this.list, listData, this.bindEvent);
    };
    DropDownBase2.prototype.templateListItem = function(dataSource, fields) {
      var option = this.listOption(dataSource, fields);
      option.templateID = this.itemTemplateId;
      option.isStringTemplate = this.isStringTemplate;
      var itemcheck = this.templateCompiler(this.itemTemplate);
      var ulElement;
      if (typeof this.itemTemplate !== "function" && itemcheck) {
        var itemValue = select(this.itemTemplate, document).innerHTML.trim();
        ulElement = ListBase.renderContentTemplate(this.createElement, itemValue, dataSource, fields.properties, option, this);
        if (this.isVirtualizationEnabled && this.isReact) {
          this.renderReactTemplates();
        }
        return ulElement;
      } else {
        ulElement = ListBase.renderContentTemplate(this.createElement, this.itemTemplate, dataSource, fields.properties, option, this);
        if (this.isVirtualizationEnabled && this.isReact) {
          this.renderReactTemplates();
        }
        return ulElement;
      }
    };
    DropDownBase2.prototype.typeOfData = function(items) {
      var item = { typeof: null, item: null };
      for (var i = 0; !isNullOrUndefined(items) && i < items.length; i++) {
        if (!isNullOrUndefined(items[i])) {
          var listDataType = typeof items[i] === "string" || typeof items[i] === "number" || typeof items[i] === "boolean";
          var isNullData = listDataType ? isNullOrUndefined(items[i]) : isNullOrUndefined(getValue(this.fields.value ? this.fields.value : "value", items[i]));
          if (!isNullData) {
            return item = { typeof: typeof items[i], item: items[i] };
          }
        }
      }
      return item;
    };
    DropDownBase2.prototype.setFixedHeader = function() {
      if (!isNullOrUndefined(this.list)) {
        this.list.parentElement.style.display = "block";
      }
      var borderWidth = 0;
      if (this.list && this.list.parentElement) {
        borderWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue("border-width"), 10);
        if (isNaN(borderWidth)) {
          var borderTopWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue("border-top-width"), 10);
          var borderBottomWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue("border-bottom-width"), 10);
          var borderLeftWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue("border-left-width"), 10);
          var borderRightWidth = parseInt(document.defaultView.getComputedStyle(this.list.parentElement, null).getPropertyValue("border-right-width"), 10);
          borderWidth = borderTopWidth + borderBottomWidth + borderLeftWidth + borderRightWidth;
        }
      }
      if (!isNullOrUndefined(this.liCollections)) {
        var liWidth = this.getValidLi().offsetWidth - borderWidth;
        this.fixedHeaderElement.style.width = liWidth.toString() + "px";
      }
      setStyleAttribute(this.fixedHeaderElement, { zIndex: 10 });
      var firstLi = this.ulElement.querySelector("." + dropDownBaseClasses.group + ":not(.e-hide-listitem)");
      this.fixedHeaderElement.innerHTML = firstLi.innerHTML;
    };
    DropDownBase2.prototype.getSortedDataSource = function(dataSource) {
      if (dataSource && this.sortOrder !== "None") {
        var textField = this.fields.text ? this.fields.text : "text";
        if (this.typeOfData(dataSource).typeof === "string" || this.typeOfData(dataSource).typeof === "number" || this.typeOfData(dataSource).typeof === "boolean") {
          textField = "";
        }
        dataSource = ListBase.getDataSource(dataSource, ListBase.addSorting(this.sortOrder, textField));
      }
      return dataSource;
    };
    DropDownBase2.prototype.getIndexByValue = function(value) {
      var index;
      var listItems = [];
      if (this.fields.disabled && this.getModuleName() === "multiselect" && this.liCollections) {
        listItems = this.liCollections;
      } else {
        listItems = this.getItems();
      }
      for (var i = 0; i < listItems.length; i++) {
        if (!isNullOrUndefined(value) && listItems[i].getAttribute("data-value") === value.toString()) {
          index = i;
          break;
        }
      }
      return index;
    };
    DropDownBase2.prototype.getIndexByValueFilter = function(value, ulElement) {
      var index;
      if (!ulElement) {
        return null;
      }
      var listItems = ulElement.querySelectorAll("li:not(.e-list-group-item)");
      if (listItems) {
        for (var i = 0; i < listItems.length; i++) {
          if (!isNullOrUndefined(value) && listItems[i].getAttribute("data-value") === value.toString()) {
            index = i;
            break;
          }
        }
      }
      return index;
    };
    DropDownBase2.prototype.dispatchEvent = function(element, type) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent(type, false, true);
      if (element) {
        element.dispatchEvent(evt);
      }
    };
    DropDownBase2.prototype.setFields = function() {
      if (this.fields.value && !this.fields.text) {
        this.updateFields(this.fields.value, this.fields.value);
      } else if (!this.fields.value && this.fields.text) {
        this.updateFields(this.fields.text, this.fields.text);
      } else if (!this.fields.value && !this.fields.text) {
        this.updateFields("text", "text");
      }
    };
    DropDownBase2.prototype.resetList = function(dataSource, fields, query, e) {
      if (this.list) {
        if (this.element.tagName === "SELECT" && this.element.options.length > 0 || this.element.tagName === "UL" && this.element.childNodes.length > 0) {
          var data = dataSource instanceof Array ? dataSource.length > 0 : !isNullOrUndefined(dataSource);
          if (!data && this.selectData && this.selectData.length > 0) {
            dataSource = this.selectData;
          }
        }
        dataSource = this.getModuleName() === "combobox" && this.selectData && dataSource instanceof Array && dataSource.length < this.selectData.length && this.addedNewItem ? this.selectData : dataSource;
        this.addedNewItem = false;
        this.setListData(dataSource, fields, query, e);
      }
    };
    DropDownBase2.prototype.updateSelectElementData = function(isFiltering) {
      if ((isFiltering || this.isVirtualizationEnabled) && isNullOrUndefined(this.selectData) && this.listData && this.listData.length > 0) {
        this.selectData = this.listData;
      }
    };
    DropDownBase2.prototype.updateSelection = function() {
    };
    DropDownBase2.prototype.renderList = function() {
      this.render();
    };
    DropDownBase2.prototype.updateDataSource = function(props, oldProps) {
      this.resetList(this.dataSource);
      this.totalItemCount = this.dataSource instanceof DataManager ? this.dataSource.dataSource.json.length : 0;
    };
    DropDownBase2.prototype.setUpdateInitial = function(props, newProp, oldProp) {
      this.isDataFetched = false;
      var updateData = {};
      for (var j = 0; props.length > j; j++) {
        if (newProp[props[j]] && props[j] === "fields") {
          this.setFields();
          updateData[props[j]] = newProp[props[j]];
        } else if (newProp[props[j]]) {
          updateData[props[j]] = newProp[props[j]];
        }
      }
      if (Object.keys(updateData).length > 0) {
        if (Object.keys(updateData).indexOf("dataSource") === -1) {
          updateData.dataSource = this.dataSource;
        }
        this.updateDataSource(updateData, oldProp);
      }
    };
    DropDownBase2.prototype.onPropertyChanged = function(newProp, oldProp) {
      if (this.getModuleName() === "dropdownbase") {
        this.setUpdateInitial(["fields", "query", "dataSource"], newProp);
      }
      this.setUpdateInitial(["sortOrder", "itemTemplate"], newProp);
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "query":
          case "sortOrder":
          case "dataSource":
          case "itemTemplate":
            break;
          case "enableRtl":
            this.setEnableRtl();
            break;
          case "groupTemplate":
            this.renderGroupTemplate(this.list);
            if (this.ulElement && this.fixedHeaderElement) {
              var firstLi = this.ulElement.querySelector("." + dropDownBaseClasses.group);
              this.fixedHeaderElement.innerHTML = firstLi.innerHTML;
            }
            break;
          case "locale":
            if (this.list && (!isNullOrUndefined(this.liCollections) && this.liCollections.length === 0)) {
              this.l10nUpdate();
            }
            break;
          case "zIndex":
            this.setProperties({ zIndex: newProp.zIndex }, true);
            this.setZIndex();
            break;
        }
      }
    };
    DropDownBase2.prototype.render = function(e, isEmptyData) {
      if (this.getModuleName() === "listbox") {
        this.list = this.createElement("div", { className: dropDownBaseClasses.content, attrs: { "tabindex": "0" } });
      } else {
        this.list = this.createElement("div", { className: dropDownBaseClasses.content });
      }
      this.list.classList.add(dropDownBaseClasses.root);
      this.setFields();
      var rippleModel = { duration: 300, selector: "." + dropDownBaseClasses.li };
      this.rippleFun = rippleEffect(this.list, rippleModel);
      var group = this.element.querySelector("select>optgroup");
      if ((this.fields.groupBy || !isNullOrUndefined(group)) && !this.isGroupChecking) {
        EventHandler.add(this.list, "scroll", this.setFloatingHeader, this);
        EventHandler.add(document, "scroll", this.updateGroupFixedHeader, this);
      }
      if (this.getModuleName() === "dropdownbase") {
        if (this.element.getAttribute("tabindex")) {
          this.list.setAttribute("tabindex", this.element.getAttribute("tabindex"));
        }
        removeClass([this.element], dropDownBaseClasses.root);
        this.element.style.display = "none";
        var wrapperElement = this.createElement("div");
        this.element.parentElement.insertBefore(wrapperElement, this.element);
        wrapperElement.appendChild(this.element);
        wrapperElement.appendChild(this.list);
      }
      this.setEnableRtl();
      if (!isEmptyData) {
        this.initialize(e);
      }
    };
    DropDownBase2.prototype.removeScrollEvent = function() {
      if (this.list) {
        EventHandler.remove(this.list, "scroll", this.setFloatingHeader);
      }
    };
    DropDownBase2.prototype.getModuleName = function() {
      return "dropdownbase";
    };
    DropDownBase2.prototype.getItems = function() {
      return this.ulElement.querySelectorAll("." + dropDownBaseClasses.li);
    };
    DropDownBase2.prototype.addItem = function(items, itemIndex) {
      if (!this.list || this.list.textContent === this.noRecordsTemplate && this.getModuleName() !== "listbox") {
        this.renderList();
      }
      if (this.sortOrder !== "None" && isNullOrUndefined(itemIndex)) {
        var newList = [].slice.call(this.listData);
        newList.push(items);
        newList = this.getSortedDataSource(newList);
        if (this.fields.groupBy) {
          newList = ListBase.groupDataSource(newList, this.fields.properties, this.sortOrder);
          itemIndex = newList.indexOf(items);
        } else {
          itemIndex = newList.indexOf(items);
        }
      }
      var itemsCount = this.getItems().length;
      var isListboxEmpty = itemsCount === 0;
      var selectedItemValue = this.list.querySelector("." + dropDownBaseClasses.selected);
      items = items instanceof Array ? items : [items];
      var index;
      index = isNullOrUndefined(itemIndex) || itemIndex < 0 || itemIndex > itemsCount - 1 ? itemsCount : itemIndex;
      var fields = this.fields;
      if (items && fields.groupBy) {
        items = ListBase.groupDataSource(items, fields.properties);
      }
      var liCollections = [];
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
        var isHeader = item.isHeader;
        var li = this.createElement("li", { className: isHeader ? dropDownBaseClasses.group : dropDownBaseClasses.li, id: "option-add-" + i });
        var itemText = item instanceof Object ? getValue(fields.text, item) : item;
        if (isHeader) {
          li.innerText = itemText;
        }
        if (this.itemTemplate && !isHeader) {
          var itemCheck = this.templateCompiler(this.itemTemplate);
          var compiledString = typeof this.itemTemplate !== "function" && itemCheck ? compile(select(this.itemTemplate, document).innerHTML.trim()) : compile(this.itemTemplate);
          var addItemTemplate = compiledString(item, this, "itemTemplate", this.itemTemplateId, this.isStringTemplate, null, li);
          if (addItemTemplate) {
            append(addItemTemplate, li);
          }
        } else if (!isHeader) {
          li.appendChild(document.createTextNode(itemText));
        }
        li.setAttribute("data-value", item instanceof Object ? getValue(fields.value, item) : item);
        li.setAttribute("role", "option");
        this.notify("addItem", { module: "CheckBoxSelection", item: li });
        liCollections.push(li);
        if (this.getModuleName() === "listbox") {
          if (item.disabled) {
            li.classList.add("e-disabled");
          }
          this.listData.splice(isListboxEmpty ? this.listData.length : index, 0, item);
          if (this.listData.length !== this.sortedData.length) {
            this.sortedData = this.listData;
          }
        } else {
          this.listData.push(item);
        }
        if (this.sortOrder === "None" && isNullOrUndefined(itemIndex) && index === 0) {
          index = null;
        }
        if (this.getModuleName() === "listbox") {
          this.updateActionCompleteData(li, item, isListboxEmpty ? null : index);
          isListboxEmpty = true;
        } else {
          this.updateActionCompleteData(li, item, index);
        }
        this.trigger("beforeItemRender", { element: li, item });
      }
      if (itemsCount === 0 && isNullOrUndefined(this.list.querySelector("ul"))) {
        if (!isNullOrUndefined(this.list)) {
          this.list.innerHTML = "";
          this.list.classList.remove(dropDownBaseClasses.noData);
          this.isAddNewItemTemplate = true;
          if (!isNullOrUndefined(this.ulElement)) {
            this.list.appendChild(this.ulElement);
          }
        }
        this.liCollections = liCollections;
        if (!isNullOrUndefined(liCollections) && !isNullOrUndefined(this.ulElement)) {
          append(liCollections, this.ulElement);
        }
        this.updateAddItemList(this.list, itemsCount);
      } else {
        if (this.getModuleName() === "listbox" && itemsCount === 0) {
          this.ulElement.innerHTML = "";
        }
        var attr = [];
        for (var i = 0; i < items.length; i++) {
          var listGroupItem = this.ulElement.querySelectorAll(".e-list-group-item");
          for (var j = 0; j < listGroupItem.length; j++) {
            attr[j] = listGroupItem[j].innerText;
          }
          if (attr.indexOf(liCollections[i].innerText) > -1 && fields.groupBy) {
            for (var j = 0; j < listGroupItem.length; j++) {
              if (attr[j] === liCollections[i].innerText) {
                if (this.sortOrder === "None") {
                  this.ulElement.insertBefore(liCollections[i + 1], listGroupItem[j + 1]);
                } else {
                  this.ulElement.insertBefore(liCollections[i + 1], this.ulElement.childNodes[itemIndex]);
                }
                i = i + 1;
                break;
              }
            }
          } else {
            if (this.liCollections[index] && this.liCollections[index].parentNode) {
              this.liCollections[index].parentNode.insertBefore(liCollections[i], this.liCollections[index]);
            } else {
              this.ulElement.appendChild(liCollections[i]);
            }
          }
          var tempLi = [].slice.call(this.liCollections);
          tempLi.splice(index, 0, liCollections[i]);
          this.liCollections = tempLi;
          index += 1;
          if (this.getModuleName() === "multiselect") {
            this.updateDataList();
          }
        }
      }
      if (this.getModuleName() === "listbox" && this.isReact) {
        this.renderReactTemplates();
      }
      if (selectedItemValue || itemIndex === 0) {
        this.updateSelection();
      }
      this.addedNewItem = true;
    };
    DropDownBase2.prototype.isDisabledElement = function(li) {
      if (li && li.classList.contains("e-disabled")) {
        return true;
      }
      return false;
    };
    DropDownBase2.prototype.isDisabledItemByIndex = function(index) {
      if (this.fields.disabled && this.liCollections) {
        return this.isDisabledElement(this.liCollections[index]);
      }
      return false;
    };
    DropDownBase2.prototype.disableListItem = function(li) {
      li.classList.add("e-disabled");
      li.setAttribute("aria-disabled", "true");
      li.setAttribute("aria-selected", "false");
    };
    DropDownBase2.prototype.validationAttribute = function(target, hidden) {
      var name = target.getAttribute("name") ? target.getAttribute("name") : target.getAttribute("id");
      hidden.setAttribute("name", name);
      target.removeAttribute("name");
      var attributes2 = ["required", "aria-required", "form"];
      for (var i = 0; i < attributes2.length; i++) {
        if (!target.getAttribute(attributes2[i])) {
          continue;
        }
        var attr = target.getAttribute(attributes2[i]);
        hidden.setAttribute(attributes2[i], attr);
        target.removeAttribute(attributes2[i]);
      }
    };
    DropDownBase2.prototype.setZIndex = function() {
    };
    DropDownBase2.prototype.updateActionCompleteData = function(li, item, index) {
    };
    DropDownBase2.prototype.updateAddItemList = function(list, itemCount) {
    };
    DropDownBase2.prototype.updateDataList = function() {
    };
    DropDownBase2.prototype.getDataByValue = function(value) {
      if (!isNullOrUndefined(this.listData)) {
        var type = this.typeOfData(this.listData).typeof;
        if (type === "string" || type === "number" || type === "boolean") {
          for (var _i = 0, _a = this.listData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!isNullOrUndefined(item) && item === value) {
              return item;
            }
          }
        } else {
          for (var _b = 0, _c = this.listData; _b < _c.length; _b++) {
            var item = _c[_b];
            if (!isNullOrUndefined(item) && getValue(this.fields.value ? this.fields.value : "value", item) === value) {
              return item;
            }
          }
        }
      }
      return null;
    };
    DropDownBase2.prototype.destroy = function() {
      if (document) {
        EventHandler.remove(document, "scroll", this.updateGroupFixedHeader);
        if (document.body.contains(this.list)) {
          EventHandler.remove(this.list, "scroll", this.setFloatingHeader);
          if (!isNullOrUndefined(this.rippleFun)) {
            this.rippleFun();
          }
          detach(this.list);
        }
      }
      this.liCollections = null;
      this.ulElement = null;
      this.list = null;
      this.enableRtlElements = null;
      this.rippleFun = null;
      _super.prototype.destroy.call(this);
    };
    __decorate4([
      Complex({ text: null, value: null, iconCss: null, groupBy: null, disabled: null }, FieldSettings)
    ], DropDownBase2.prototype, "fields", void 0);
    __decorate4([
      Property(null)
    ], DropDownBase2.prototype, "itemTemplate", void 0);
    __decorate4([
      Property(null)
    ], DropDownBase2.prototype, "groupTemplate", void 0);
    __decorate4([
      Property("No records found")
    ], DropDownBase2.prototype, "noRecordsTemplate", void 0);
    __decorate4([
      Property("Request failed")
    ], DropDownBase2.prototype, "actionFailureTemplate", void 0);
    __decorate4([
      Property("None")
    ], DropDownBase2.prototype, "sortOrder", void 0);
    __decorate4([
      Property([])
    ], DropDownBase2.prototype, "dataSource", void 0);
    __decorate4([
      Property(null)
    ], DropDownBase2.prototype, "query", void 0);
    __decorate4([
      Property("StartsWith")
    ], DropDownBase2.prototype, "filterType", void 0);
    __decorate4([
      Property(true)
    ], DropDownBase2.prototype, "ignoreCase", void 0);
    __decorate4([
      Property(1e3)
    ], DropDownBase2.prototype, "zIndex", void 0);
    __decorate4([
      Property(false)
    ], DropDownBase2.prototype, "ignoreAccent", void 0);
    __decorate4([
      Property()
    ], DropDownBase2.prototype, "locale", void 0);
    __decorate4([
      Event()
    ], DropDownBase2.prototype, "actionBegin", void 0);
    __decorate4([
      Event()
    ], DropDownBase2.prototype, "actionComplete", void 0);
    __decorate4([
      Event()
    ], DropDownBase2.prototype, "actionFailure", void 0);
    __decorate4([
      Event()
    ], DropDownBase2.prototype, "select", void 0);
    __decorate4([
      Event()
    ], DropDownBase2.prototype, "dataBound", void 0);
    __decorate4([
      Event()
    ], DropDownBase2.prototype, "created", void 0);
    __decorate4([
      Event()
    ], DropDownBase2.prototype, "destroyed", void 0);
    DropDownBase2 = __decorate4([
      NotifyPropertyChanges
    ], DropDownBase2);
    return DropDownBase2;
  }(Component)
);

// node_modules/@syncfusion/ej2-dropdowns/src/drop-down-list/drop-down-list.js
var __extends5 = /* @__PURE__ */ function() {
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
var __decorate5 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var dropDownListClasses = {
  root: "e-dropdownlist",
  hover: dropDownBaseClasses.hover,
  selected: dropDownBaseClasses.selected,
  rtl: dropDownBaseClasses.rtl,
  li: dropDownBaseClasses.li,
  disable: dropDownBaseClasses.disabled,
  base: dropDownBaseClasses.root,
  focus: dropDownBaseClasses.focus,
  content: dropDownBaseClasses.content,
  input: "e-input-group",
  inputFocus: "e-input-focus",
  icon: "e-input-group-icon e-ddl-icon",
  iconAnimation: "e-icon-anim",
  value: "e-input-value",
  device: "e-ddl-device",
  backIcon: "e-input-group-icon e-back-icon e-icons",
  filterBarClearIcon: "e-input-group-icon e-clear-icon e-icons",
  filterInput: "e-input-filter",
  filterParent: "e-filter-parent",
  mobileFilter: "e-ddl-device-filter",
  footer: "e-ddl-footer",
  header: "e-ddl-header",
  clearIcon: "e-clear-icon",
  clearIconHide: "e-clear-icon-hide",
  popupFullScreen: "e-popup-full-page",
  disableIcon: "e-ddl-disable-icon",
  hiddenElement: "e-ddl-hidden",
  virtualList: "e-list-item e-virtual-list"
};
var inputObject = {
  container: null,
  buttons: []
};
var DropDownList = (
  /** @class */
  function(_super) {
    __extends5(DropDownList2, _super);
    function DropDownList2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.isListSearched = false;
      _this.preventChange = false;
      _this.isTouched = false;
      _this.isFocused = false;
      _this.IsScrollerAtEnd = function() {
        return this.list && this.list.scrollTop + this.list.clientHeight >= this.list.scrollHeight;
      };
      return _this;
    }
    DropDownList2.prototype.preRender = function() {
      this.valueTempElement = null;
      this.element.style.opacity = "0";
      this.initializeData();
      _super.prototype.preRender.call(this);
      this.activeIndex = this.index;
      this.queryString = "";
    };
    DropDownList2.prototype.initializeData = function() {
      this.isPopupOpen = false;
      this.isDocumentClick = false;
      this.isInteracted = false;
      this.isFilterFocus = false;
      this.beforePopupOpen = false;
      this.initial = true;
      this.initialRemoteRender = false;
      this.isNotSearchList = false;
      this.isTyped = false;
      this.isSelected = false;
      this.preventFocus = false;
      this.preventAutoFill = false;
      this.isValidKey = false;
      this.typedString = "";
      this.isEscapeKey = false;
      this.isPreventBlur = false;
      this.isTabKey = false;
      this.actionCompleteData = { isUpdated: false };
      this.actionData = { isUpdated: false };
      this.prevSelectPoints = {};
      this.isSelectCustom = false;
      this.isDropDownClick = false;
      this.preventAltUp = false;
      this.isCustomFilter = false;
      this.isSecondClick = false;
      this.previousValue = null;
      this.keyConfigure = {
        tab: "tab",
        enter: "13",
        escape: "27",
        end: "35",
        home: "36",
        down: "40",
        up: "38",
        pageUp: "33",
        pageDown: "34",
        open: "alt+40",
        close: "shift+tab",
        hide: "alt+38",
        space: "32"
      };
      this.viewPortInfo = {
        currentPageNumber: null,
        direction: null,
        sentinelInfo: {},
        offsets: {},
        startIndex: 0,
        endIndex: this.itemCount
      };
    };
    DropDownList2.prototype.setZIndex = function() {
      if (this.popupObj) {
        this.popupObj.setProperties({ "zIndex": this.zIndex });
      }
    };
    DropDownList2.prototype.requiredModules = function() {
      var modules = [];
      if (this.enableVirtualization) {
        modules.push({ args: [this], member: "VirtualScroll" });
      }
      return modules;
    };
    DropDownList2.prototype.renderList = function(e, isEmptyData) {
      _super.prototype.render.call(this, e, isEmptyData);
      if (!(this.dataSource instanceof DataManager)) {
        this.totalItemCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
      }
      if (this.enableVirtualization && this.isFiltering() && this.getModuleName() === "combobox") {
        this.UpdateSkeleton();
        this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
        this.ulElement = this.list.querySelector("ul");
      }
      this.unWireListEvents();
      this.wireListEvents();
    };
    DropDownList2.prototype.floatLabelChange = function() {
      if (this.getModuleName() === "dropdownlist" && this.floatLabelType === "Auto") {
        var floatElement = this.inputWrapper.container.querySelector(".e-float-text");
        if (this.inputElement.value !== "" || this.isInteracted) {
          classList(floatElement, ["e-label-top"], ["e-label-bottom"]);
        } else {
          classList(floatElement, ["e-label-bottom"], ["e-label-top"]);
        }
      }
    };
    DropDownList2.prototype.resetHandler = function(e) {
      e.preventDefault();
      this.clearAll(e);
      if (this.enableVirtualization) {
        this.list.scrollTop = 0;
        this.virtualListInfo = null;
        this.previousStartIndex = 0;
        this.previousEndIndex = 0;
      }
    };
    DropDownList2.prototype.resetFocusElement = function() {
      this.removeHover();
      this.removeSelection();
      this.removeFocus();
      this.list.scrollTop = 0;
      if (this.getModuleName() !== "autocomplete" && !isNullOrUndefined(this.ulElement)) {
        var li = this.fields.disabled ? this.ulElement.querySelector("." + dropDownListClasses.li + ":not(.e-disabled)") : this.ulElement.querySelector("." + dropDownListClasses.li);
        if (this.enableVirtualization) {
          li = this.liCollections[this.skeletonCount];
        }
        if (li) {
          li.classList.add(dropDownListClasses.focus);
        }
      }
    };
    DropDownList2.prototype.clearAll = function(e, properties) {
      this.previousItemData = !isNullOrUndefined(this.itemData) ? this.itemData : null;
      if (isNullOrUndefined(properties) || !isNullOrUndefined(properties) && (isNullOrUndefined(properties.dataSource) || !(properties.dataSource instanceof DataManager) && properties.dataSource.length === 0)) {
        this.isActive = true;
        this.resetSelection(properties);
      }
      var dataItem = this.getItemData();
      if (!this.allowObjectBinding && this.previousValue === dataItem.value || this.allowObjectBinding && this.previousValue && this.isObjectInArray(this.previousValue, [this.allowCustom ? this.value ? this.value : dataItem : dataItem.value ? this.getDataByValue(dataItem.value) : dataItem])) {
        return;
      }
      this.onChangeEvent(e);
      this.checkAndResetCache();
      if (this.enableVirtualization) {
        this.updateInitialData();
      }
    };
    DropDownList2.prototype.resetSelection = function(properties) {
      if (this.list) {
        if (!isNullOrUndefined(properties) && (isNullOrUndefined(properties.dataSource) || !(properties.dataSource instanceof DataManager) && properties.dataSource.length === 0)) {
          this.selectedLI = null;
          this.actionCompleteData.isUpdated = false;
          this.actionCompleteData.ulElement = null;
          this.actionCompleteData.list = null;
          this.resetList(properties.dataSource);
        } else {
          if (this.allowFiltering && this.getModuleName() !== "autocomplete" && !isNullOrUndefined(this.actionCompleteData.ulElement) && !isNullOrUndefined(this.actionCompleteData.list) && this.actionCompleteData.list.length > 0) {
            this.onActionComplete(this.actionCompleteData.ulElement.cloneNode(true), this.actionCompleteData.list);
          }
          this.resetFocusElement();
        }
      }
      if (!isNullOrUndefined(this.hiddenElement)) {
        this.hiddenElement.innerHTML = "";
      }
      if (!isNullOrUndefined(this.inputElement)) {
        this.inputElement.value = "";
      }
      this.value = null;
      this.itemData = null;
      this.text = null;
      this.index = null;
      this.activeIndex = null;
      this.item = null;
      this.queryString = "";
      if (this.valueTempElement) {
        detach(this.valueTempElement);
        this.inputElement.style.display = "block";
        this.valueTempElement = null;
      }
      this.setSelection(null, null);
      this.isSelectCustom = false;
      this.updateIconState();
      this.cloneElements();
    };
    DropDownList2.prototype.setHTMLAttributes = function() {
      if (Object.keys(this.htmlAttributes).length) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var htmlAttr = _a[_i];
          if (htmlAttr === "class") {
            var updatedClassValue = this.htmlAttributes["" + htmlAttr].replace(/\s+/g, " ").trim();
            if (updatedClassValue !== "") {
              addClass([this.inputWrapper.container], updatedClassValue.split(" "));
            }
          } else if (htmlAttr === "disabled" && this.htmlAttributes["" + htmlAttr] === "disabled") {
            this.enabled = false;
            this.setEnable();
          } else if (htmlAttr === "readonly" && !isNullOrUndefined(this.htmlAttributes["" + htmlAttr])) {
            this.readonly = true;
            this.dataBind();
          } else if (htmlAttr === "style") {
            this.inputWrapper.container.setAttribute("style", this.htmlAttributes["" + htmlAttr]);
          } else if (htmlAttr === "aria-label") {
            if ((this.getModuleName() === "autocomplete" || this.getModuleName() === "combobox") && !this.readonly) {
              this.inputElement.setAttribute("aria-label", this.htmlAttributes["" + htmlAttr]);
            } else if (this.getModuleName() === "dropdownlist") {
              this.inputWrapper.container.setAttribute("aria-label", this.htmlAttributes["" + htmlAttr]);
            }
          } else {
            var defaultAttr = [
              "title",
              "id",
              "placeholder",
              "role",
              "autocomplete",
              "autocapitalize",
              "spellcheck",
              "minlength",
              "maxlength"
            ];
            var validateAttr = ["name", "required"];
            if (this.getModuleName() === "autocomplete" || this.getModuleName() === "combobox") {
              defaultAttr.push("tabindex");
            }
            if (validateAttr.indexOf(htmlAttr) > -1 || htmlAttr.indexOf("data") === 0) {
              this.hiddenElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
            } else if (defaultAttr.indexOf(htmlAttr) > -1) {
              if (htmlAttr === "placeholder") {
                Input.setPlaceholder(this.htmlAttributes["" + htmlAttr], this.inputElement);
              } else {
                this.inputElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
              }
            } else {
              this.inputWrapper.container.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
            }
          }
        }
      }
      if (this.getModuleName() === "autocomplete" || this.getModuleName() === "combobox") {
        this.inputWrapper.container.removeAttribute("tabindex");
      }
    };
    DropDownList2.prototype.getAriaAttributes = function() {
      return {
        "aria-disabled": "false",
        "role": "combobox",
        "aria-expanded": "false",
        "aria-live": "polite",
        "aria-labelledby": this.hiddenElement.id
      };
    };
    DropDownList2.prototype.setEnableRtl = function() {
      Input.setEnableRtl(this.enableRtl, [this.inputElement.parentElement]);
      if (this.popupObj) {
        this.popupObj.enableRtl = this.enableRtl;
        this.popupObj.dataBind();
      }
    };
    DropDownList2.prototype.setEnable = function() {
      Input.setEnabled(this.enabled, this.inputElement);
      if (this.enabled) {
        removeClass([this.inputWrapper.container], dropDownListClasses.disable);
        this.inputElement.setAttribute("aria-disabled", "false");
        this.targetElement().setAttribute("tabindex", this.tabIndex);
      } else {
        this.hidePopup();
        addClass([this.inputWrapper.container], dropDownListClasses.disable);
        this.inputElement.setAttribute("aria-disabled", "true");
        this.targetElement().tabIndex = -1;
      }
    };
    DropDownList2.prototype.getPersistData = function() {
      return this.addOnPersist(["value"]);
    };
    DropDownList2.prototype.getLocaleName = function() {
      return "drop-down-list";
    };
    DropDownList2.prototype.preventTabIndex = function(element) {
      if (this.getModuleName() === "dropdownlist") {
        element.tabIndex = -1;
      }
    };
    DropDownList2.prototype.targetElement = function() {
      return !isNullOrUndefined(this.inputWrapper) ? this.inputWrapper.container : null;
    };
    DropDownList2.prototype.getNgDirective = function() {
      return "EJS-DROPDOWNLIST";
    };
    DropDownList2.prototype.getElementByText = function(text) {
      return this.getElementByValue(this.getValueByText(text));
    };
    DropDownList2.prototype.getElementByValue = function(value) {
      var item;
      var listItems = this.getItems();
      for (var _i = 0, listItems_1 = listItems; _i < listItems_1.length; _i++) {
        var liItem = listItems_1[_i];
        if (this.getFormattedValue(liItem.getAttribute("data-value")) === value) {
          item = liItem;
          break;
        }
      }
      return item;
    };
    DropDownList2.prototype.initValue = function() {
      this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
      this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.itemCount;
      this.renderList();
      if (this.dataSource instanceof DataManager) {
        this.initialRemoteRender = true;
      } else {
        this.updateValues();
      }
    };
    DropDownList2.prototype.isDisableItemValue = function(value) {
      if (typeof value === "object") {
        var objectValue = JSON.parse(JSON.stringify(value))[this.fields.value];
        return this.isDisabledItemByIndex(this.getIndexByValue(objectValue));
      }
      return this.isDisabledItemByIndex(this.getIndexByValue(value));
    };
    DropDownList2.prototype.updateValues = function() {
      if (this.fields.disabled) {
        if (this.value != null) {
          this.value = !this.isDisableItemValue(this.value) ? this.value : null;
        }
        if (this.text != null) {
          this.text = !this.isDisabledItemByIndex(this.getIndexByValue(this.getValueByText(this.text))) ? this.text : null;
        }
        if (this.index != null) {
          this.index = !this.isDisabledItemByIndex(this.index) ? this.index : null;
          this.activeIndex = this.index;
        }
      }
      this.selectedValueInfo = this.viewPortInfo;
      if (!isNullOrUndefined(this.value)) {
        var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
        this.setSelection(this.getElementByValue(value), null);
      } else if (this.text && isNullOrUndefined(this.value)) {
        var element = this.getElementByText(this.text);
        if (isNullOrUndefined(element)) {
          this.setProperties({ text: null });
          return;
        } else {
          this.setSelection(element, null);
        }
      } else {
        this.setSelection(this.liCollections[this.activeIndex], null);
      }
      this.setHiddenValue();
      Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
    };
    DropDownList2.prototype.onBlurHandler = function(e) {
      if (!this.enabled) {
        return;
      }
      var target = e.relatedTarget;
      var currentTarget = e.target;
      var isPreventBlur = this.isPreventBlur;
      this.isPreventBlur = false;
      if (isPreventBlur && !this.isDocumentClick && this.isPopupOpen && (!isNullOrUndefined(currentTarget) || !this.isFilterLayout() && isNullOrUndefined(target))) {
        if (this.getModuleName() === "dropdownlist" && this.allowFiltering && this.isPopupOpen) {
          this.filterInput.focus();
        } else {
          this.targetElement().focus();
        }
        return;
      }
      if (this.isDocumentClick || !isNullOrUndefined(this.popupObj) && document.body.contains(this.popupObj.element) && this.popupObj.element.classList.contains(dropDownListClasses.mobileFilter)) {
        if (!this.beforePopupOpen) {
          this.isDocumentClick = false;
        }
        return;
      }
      if (this.getModuleName() === "dropdownlist" && !this.isFilterFocus && target !== this.inputElement && (document.activeElement !== target || document.activeElement === target && currentTarget.classList.contains(dropDownListClasses.inputFocus)) || isNullOrUndefined(target) && this.getModuleName() === "dropdownlist" && this.allowFiltering && currentTarget !== this.inputWrapper.container || this.getModuleName() !== "dropdownlist" && !this.inputWrapper.container.contains(target) || this.isTabKey) {
        this.isDocumentClick = this.isPopupOpen ? true : false;
        this.focusOutAction(e);
        this.isTabKey = false;
      }
      if (this.isRequested && !this.isPopupOpen && !this.isPreventBlur) {
        this.isActive = false;
        this.beforePopupOpen = false;
      }
      this.isFocused = false;
    };
    DropDownList2.prototype.focusOutAction = function(e) {
      this.isInteracted = false;
      this.focusOut(e);
      this.onFocusOut(e);
    };
    DropDownList2.prototype.onFocusOut = function(e) {
      if (!this.enabled) {
        return;
      }
      if (this.isSelected) {
        this.isSelectCustom = false;
        this.onChangeEvent(e);
      }
      this.floatLabelChange();
      this.dispatchEvent(this.hiddenElement, "change");
      if (this.getModuleName() === "dropdownlist" && this.element.tagName !== "INPUT") {
        this.dispatchEvent(this.inputElement, "blur");
      }
      if (this.inputWrapper.clearButton) {
        addClass([this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
      }
      this.trigger("blur");
    };
    DropDownList2.prototype.onFocus = function(e) {
      if (!this.isInteracted) {
        this.isInteracted = true;
        var args = { isInteracted: e ? true : false, event: e };
        this.trigger("focus", args);
      }
      this.updateIconState();
      this.isFocused = true;
    };
    DropDownList2.prototype.resetValueHandler = function(e) {
      var formElement = closest(this.inputElement, "form");
      if (formElement && e.target === formElement) {
        var val = this.element.tagName === this.getNgDirective() ? null : this.inputElement.getAttribute("value");
        this.text = val;
      }
    };
    DropDownList2.prototype.wireEvent = function() {
      EventHandler.add(this.inputWrapper.container, "mousedown", this.dropDownClick, this);
      EventHandler.add(this.inputWrapper.container, "focus", this.focusIn, this);
      EventHandler.add(this.inputWrapper.container, "keypress", this.onSearch, this);
      EventHandler.add(window, "resize", this.windowResize, this);
      this.bindCommonEvent();
    };
    DropDownList2.prototype.bindCommonEvent = function() {
      EventHandler.add(this.targetElement(), "blur", this.onBlurHandler, this);
      var formElement = closest(this.inputElement, "form");
      if (formElement) {
        EventHandler.add(formElement, "reset", this.resetValueHandler, this);
      }
      if (!Browser.isDevice) {
        this.keyboardModule = new KeyboardEvents(this.targetElement(), {
          keyAction: this.keyActionHandler.bind(this),
          keyConfigs: this.keyConfigure,
          eventName: "keydown"
        });
      } else {
        this.keyboardModule = new KeyboardEvents(this.targetElement(), {
          keyAction: this.mobileKeyActionHandler.bind(this),
          keyConfigs: this.keyConfigure,
          eventName: "keydown"
        });
      }
      this.bindClearEvent();
    };
    DropDownList2.prototype.windowResize = function() {
      if (this.isPopupOpen) {
        this.popupObj.refreshPosition(this.inputWrapper.container);
      }
    };
    DropDownList2.prototype.bindClearEvent = function() {
      if (this.showClearButton) {
        EventHandler.add(this.inputWrapper.clearButton, "mousedown", this.resetHandler, this);
      }
    };
    DropDownList2.prototype.unBindCommonEvent = function() {
      if (!isNullOrUndefined(this.inputWrapper) && this.targetElement()) {
        EventHandler.remove(this.targetElement(), "blur", this.onBlurHandler);
      }
      var formElement = this.inputElement && closest(this.inputElement, "form");
      if (formElement) {
        EventHandler.remove(formElement, "reset", this.resetValueHandler);
      }
      if (!Browser.isDevice) {
        this.keyboardModule.destroy();
      }
      if (this.showClearButton) {
        EventHandler.remove(this.inputWrapper.clearButton, "mousedown", this.resetHandler);
      }
    };
    DropDownList2.prototype.updateIconState = function() {
      if (this.showClearButton) {
        if (this.inputElement.value !== "" && !this.readonly) {
          removeClass([this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
        } else {
          addClass([this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
        }
      }
    };
    DropDownList2.prototype.wireListEvents = function() {
      if (!isNullOrUndefined(this.list)) {
        EventHandler.add(this.list, "click", this.onMouseClick, this);
        EventHandler.add(this.list, "mouseover", this.onMouseOver, this);
        EventHandler.add(this.list, "mouseout", this.onMouseLeave, this);
      }
    };
    DropDownList2.prototype.onSearch = function(e) {
      if (e.charCode !== 32 && e.charCode !== 13) {
        if (this.list === void 0) {
          this.renderList();
        }
        this.searchKeyEvent = e;
        this.onServerIncrementalSearch(e);
      }
    };
    DropDownList2.prototype.onServerIncrementalSearch = function(e) {
      if (!this.isRequested && !isNullOrUndefined(this.list) && !isNullOrUndefined(this.list.querySelector("li")) && this.enabled && !this.readonly) {
        this.incrementalSearch(e);
      }
    };
    DropDownList2.prototype.onMouseClick = function(e) {
      var target = e.target;
      this.keyboardEvent = null;
      var li = closest(target, "." + dropDownBaseClasses.li);
      if (!this.isValidLI(li) || this.isDisabledElement(li)) {
        return;
      }
      this.setSelection(li, e);
      if (Browser.isDevice && this.isFilterLayout()) {
        history.back();
      } else {
        var delay = 100;
        this.closePopup(delay, e);
      }
    };
    DropDownList2.prototype.onMouseOver = function(e) {
      var currentLi = closest(e.target, "." + dropDownBaseClasses.li);
      this.setHover(currentLi);
    };
    DropDownList2.prototype.setHover = function(li) {
      if (this.enabled && this.isValidLI(li) && !li.classList.contains(dropDownBaseClasses.hover)) {
        this.removeHover();
        addClass([li], dropDownBaseClasses.hover);
      }
    };
    DropDownList2.prototype.onMouseLeave = function() {
      this.removeHover();
    };
    DropDownList2.prototype.removeHover = function() {
      if (this.list) {
        var hoveredItem = this.list.querySelectorAll("." + dropDownBaseClasses.hover);
        if (hoveredItem && hoveredItem.length) {
          removeClass(hoveredItem, dropDownBaseClasses.hover);
        }
      }
    };
    DropDownList2.prototype.isValidLI = function(li) {
      return li && li.hasAttribute("role") && li.getAttribute("role") === "option";
    };
    DropDownList2.prototype.updateIncrementalItemIndex = function(startIndex, endIndex) {
      this.incrementalStartIndex = startIndex;
      this.incrementalEndIndex = endIndex;
    };
    DropDownList2.prototype.incrementalSearch = function(e) {
      if (this.liCollections.length > 0) {
        if (this.enableVirtualization) {
          var updatingincrementalindex = false;
          var queryStringUpdated = false;
          var activeElement = this.ulElement.getElementsByClassName("e-active")[0];
          var currentValue = activeElement ? activeElement.textContent : null;
          if (this.incrementalQueryString == "") {
            this.incrementalQueryString = String.fromCharCode(e.charCode);
            this.incrementalPreQueryString = this.incrementalQueryString;
          } else if (String.fromCharCode(e.charCode).toLocaleLowerCase() == this.incrementalPreQueryString.toLocaleLowerCase()) {
            queryStringUpdated = true;
          } else {
            this.incrementalQueryString = String.fromCharCode(e.charCode);
          }
          if (this.viewPortInfo.endIndex >= this.incrementalEndIndex && this.incrementalEndIndex <= this.totalItemCount || this.incrementalEndIndex == 0) {
            updatingincrementalindex = true;
            this.incrementalStartIndex = this.incrementalEndIndex;
            if (this.incrementalEndIndex == 0) {
              this.incrementalEndIndex = 100 > this.totalItemCount ? this.totalItemCount : 100;
            } else {
              this.incrementalEndIndex = this.incrementalEndIndex + 100 > this.totalItemCount ? this.totalItemCount : this.incrementalEndIndex + 100;
            }
            this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
            updatingincrementalindex = true;
          }
          if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
            this.updateIncrementalView(0, this.itemCount);
          }
          var li = incrementalSearch(e.charCode, this.incrementalLiCollections, this.activeIndex, true, this.element.id, queryStringUpdated, currentValue, true);
          while (isNullOrUndefined(li) && this.incrementalEndIndex < this.totalItemCount) {
            this.updateIncrementalItemIndex(this.incrementalEndIndex, this.incrementalEndIndex + 100 > this.totalItemCount ? this.totalItemCount : this.incrementalEndIndex + 100);
            this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
            updatingincrementalindex = true;
            if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
              this.updateIncrementalView(0, this.itemCount);
            }
            li = incrementalSearch(e.charCode, this.incrementalLiCollections, 0, true, this.element.id, queryStringUpdated, currentValue, true, true);
            if (!isNullOrUndefined(li)) {
              break;
            }
            if (isNullOrUndefined(li) && this.incrementalEndIndex >= this.totalItemCount) {
              this.updateIncrementalItemIndex(0, 100 > this.totalItemCount ? this.totalItemCount : 100);
              break;
            }
          }
          if (isNullOrUndefined(li) && this.incrementalEndIndex >= this.totalItemCount) {
            this.updateIncrementalItemIndex(0, 100 > this.totalItemCount ? this.totalItemCount : 100);
            this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
            updatingincrementalindex = true;
            if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
              this.updateIncrementalView(0, this.itemCount);
            }
            li = incrementalSearch(e.charCode, this.incrementalLiCollections, 0, true, this.element.id, queryStringUpdated, currentValue, true, true);
          }
          var index = li && this.getIndexByValue(li.getAttribute("data-value"));
          if (!index) {
            for (var i = 0; i < this.incrementalLiCollections.length; i++) {
              if (!isNullOrUndefined(li) && !isNullOrUndefined(li.getAttribute("data-value")) && this.incrementalLiCollections[i].getAttribute("data-value") === li.getAttribute("data-value").toString()) {
                index = i;
                index = this.incrementalStartIndex + index;
                break;
              }
            }
          } else {
            index = index - this.skeletonCount;
          }
          if (index) {
            if (!(this.viewPortInfo.startIndex >= index) || !(index >= this.viewPortInfo.endIndex)) {
              var startIndex = index - (this.itemCount / 2 - 2) > 0 ? index - (this.itemCount / 2 - 2) : 0;
              var endIndex = this.viewPortInfo.startIndex + this.itemCount > this.totalItemCount ? this.totalItemCount : this.viewPortInfo.startIndex + this.itemCount;
              this.updateIncrementalView(startIndex, endIndex);
            }
          }
          if (!isNullOrUndefined(li)) {
            var index_1 = this.getIndexByValue(li.getAttribute("data-value")) - this.skeletonCount;
            if (index_1 > this.itemCount / 2) {
              var startIndex = this.viewPortInfo.startIndex + (this.itemCount / 2 - 2) < this.totalItemCount ? this.viewPortInfo.startIndex + (this.itemCount / 2 - 2) : this.totalItemCount;
              var endIndex = this.viewPortInfo.startIndex + this.itemCount > this.totalItemCount ? this.totalItemCount : this.viewPortInfo.startIndex + this.itemCount;
              this.updateIncrementalView(startIndex, endIndex);
            }
            li = this.getElementByValue(li.getAttribute("data-value"));
            this.setSelection(li, e);
            this.setScrollPosition();
            this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
            if (this.enableVirtualization && !this.fields.groupBy) {
              var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? this.selectedLI.offsetTop + this.virtualListInfo.startIndex * this.selectedLI.offsetHeight : this.selectedLI.offsetTop;
              this.list.scrollTop = selectedLiOffsetTop - this.list.querySelectorAll(".e-virtual-list").length * this.selectedLI.offsetHeight;
            }
            this.incrementalPreQueryString = this.incrementalQueryString;
          } else {
            this.updateIncrementalView(0, this.itemCount);
            this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
            this.list.scrollTop = 0;
          }
        } else {
          var li = void 0;
          if (this.fields.disabled) {
            var enableLiCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li + ":not(.e-disabled)");
            li = incrementalSearch(e.charCode, enableLiCollections, this.activeIndex, true, this.element.id);
          } else {
            li = incrementalSearch(e.charCode, this.liCollections, this.activeIndex, true, this.element.id);
          }
          if (!isNullOrUndefined(li)) {
            this.setSelection(li, e);
            this.setScrollPosition();
          }
        }
      }
    };
    DropDownList2.prototype.hideSpinner = function() {
      if (!isNullOrUndefined(this.spinnerElement)) {
        hideSpinner(this.spinnerElement);
        removeClass([this.spinnerElement], dropDownListClasses.disableIcon);
        this.spinnerElement.innerHTML = "";
        this.spinnerElement = null;
      }
    };
    DropDownList2.prototype.showSpinner = function() {
      if (isNullOrUndefined(this.spinnerElement)) {
        this.spinnerElement = Browser.isDevice && !isNullOrUndefined(this.filterInputObj) && this.filterInputObj.buttons[1] || !isNullOrUndefined(this.filterInputObj) && this.filterInputObj.buttons[0] || this.inputWrapper.buttons[0];
        addClass([this.spinnerElement], dropDownListClasses.disableIcon);
        createSpinner({
          target: this.spinnerElement,
          width: Browser.isDevice ? "16px" : "14px"
        }, this.createElement);
        showSpinner(this.spinnerElement);
      }
    };
    DropDownList2.prototype.keyActionHandler = function(e) {
      if (!this.enabled) {
        return;
      }
      this.keyboardEvent = e;
      if (this.isPreventKeyAction && this.enableVirtualization) {
        e.preventDefault();
      }
      var preventAction = e.action === "pageUp" || e.action === "pageDown";
      var preventHomeEnd = this.getModuleName() !== "dropdownlist" && (e.action === "home" || e.action === "end");
      this.isEscapeKey = e.action === "escape";
      this.isTabKey = !this.isPopupOpen && e.action === "tab";
      var isNavigation = e.action === "down" || e.action === "up" || e.action === "pageUp" || e.action === "pageDown" || e.action === "home" || e.action === "end";
      if ((this.isEditTextBox() || preventAction || preventHomeEnd) && !this.isPopupOpen) {
        return;
      }
      if (!this.readonly) {
        var isTabAction = e.action === "tab" || e.action === "close";
        if (isNullOrUndefined(this.list) && !this.isRequested && !isTabAction && e.action !== "escape") {
          this.searchKeyEvent = e;
          if (!this.enableVirtualization || this.enableVirtualization && this.getModuleName() !== "autocomplete" && e.type !== "mousedown" && (e.keyCode === 40 || e.keyCode === 38)) {
            this.renderList(e);
            this.UpdateSkeleton();
            this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
            this.ulElement = this.list.querySelector("ul");
          }
        }
        if (isNullOrUndefined(this.list) || !isNullOrUndefined(this.liCollections) && isNavigation && this.liCollections.length === 0 || this.isRequested) {
          return;
        }
        if (isTabAction && this.getModuleName() !== "autocomplete" && this.isPopupOpen || e.action === "escape") {
          e.preventDefault();
        }
        this.isSelected = e.action === "escape" ? false : this.isSelected;
        this.isTyped = isNavigation || e.action === "escape" ? false : this.isTyped;
        switch (e.action) {
          case "down":
          case "up":
            this.updateUpDownAction(e);
            break;
          case "pageUp":
            this.pageUpSelection(this.activeIndex - this.getPageCount(), e);
            e.preventDefault();
            break;
          case "pageDown":
            this.pageDownSelection(this.activeIndex + this.getPageCount(), e);
            e.preventDefault();
            break;
          case "home":
            this.isMouseScrollAction = true;
            this.updateHomeEndAction(e);
            break;
          case "end":
            this.isMouseScrollAction = true;
            this.updateHomeEndAction(e);
            break;
          case "space":
            if (this.getModuleName() === "dropdownlist") {
              if (!this.beforePopupOpen) {
                this.showPopup();
                e.preventDefault();
              }
            }
            break;
          case "open":
            this.showPopup(e);
            break;
          case "hide":
            this.preventAltUp = this.isPopupOpen;
            this.hidePopup(e);
            this.focusDropDown(e);
            break;
          case "enter":
            this.selectCurrentItem(e);
            break;
          case "tab":
            this.selectCurrentValueOnTab(e);
            break;
          case "escape":
          case "close":
            if (this.isPopupOpen) {
              this.hidePopup(e);
              this.focusDropDown(e);
            }
            break;
        }
      }
    };
    DropDownList2.prototype.updateUpDownAction = function(e, isVirtualKeyAction) {
      if (this.fields.disabled && this.list && this.list.querySelectorAll(".e-list-item:not(.e-disabled)").length === 0) {
        return;
      }
      if (this.allowFiltering && !this.enableVirtualization && this.getModuleName() !== "autocomplete") {
        var value_1 = this.getItemData().value;
        if (isNullOrUndefined(value_1)) {
          value_1 = "null";
        }
        var filterIndex = this.getIndexByValue(value_1);
        if (!isNullOrUndefined(filterIndex)) {
          this.activeIndex = filterIndex;
        }
      }
      var focusEle = this.list.querySelector("." + dropDownListClasses.focus);
      if (this.isSelectFocusItem(focusEle) && !isVirtualKeyAction) {
        this.setSelection(focusEle, e);
        if (this.enableVirtualization) {
          var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? this.selectedLI.offsetTop + this.virtualListInfo.startIndex * this.selectedLI.offsetHeight : this.selectedLI.offsetTop;
          if (this.fields.groupBy) {
            selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex == 0 ? this.selectedLI.offsetHeight - selectedLiOffsetTop : selectedLiOffsetTop - this.selectedLI.offsetHeight;
          }
          this.list.scrollTop = selectedLiOffsetTop - this.list.querySelectorAll(".e-virtual-list").length * this.selectedLI.offsetHeight;
        }
      } else if (!isNullOrUndefined(this.liCollections)) {
        var virtualIndex = this.activeIndex;
        var index = e.action === "down" ? this.activeIndex + 1 : this.activeIndex - 1;
        index = isVirtualKeyAction ? virtualIndex : index;
        var startIndex = 0;
        if (this.getModuleName() === "autocomplete") {
          startIndex = e.action === "down" && isNullOrUndefined(this.activeIndex) ? 0 : this.liCollections.length - 1;
          index = index < 0 ? this.liCollections.length - 1 : index === this.liCollections.length ? 0 : index;
        }
        var nextItem = void 0;
        if (this.getModuleName() !== "autocomplete" || this.getModuleName() === "autocomplete" && this.isPopupOpen) {
          if (!this.enableVirtualization) {
            nextItem = isNullOrUndefined(this.activeIndex) ? this.liCollections[startIndex] : this.liCollections[index];
          } else {
            if (!isVirtualKeyAction) {
              nextItem = isNullOrUndefined(this.activeIndex) ? this.liCollections[this.skeletonCount] : this.liCollections[index];
              nextItem = !isNullOrUndefined(nextItem) && !nextItem.classList.contains("e-virtual-list") ? nextItem : null;
            } else {
              if (this.getModuleName() === "autocomplete") {
                var value = this.getFormattedValue(this.selectedLI.getAttribute("data-value"));
                nextItem = this.getElementByValue(value);
              } else {
                nextItem = this.getElementByValue(this.getItemData().value);
              }
            }
          }
        }
        if (!isNullOrUndefined(nextItem)) {
          var focusAtFirstElement = this.liCollections[this.skeletonCount] && this.liCollections[this.skeletonCount].classList.contains("e-item-focus");
          this.setSelection(nextItem, e);
          if (focusAtFirstElement && this.enableVirtualization && this.getModuleName() === "autocomplete" && !isVirtualKeyAction) {
            var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? this.selectedLI.offsetTop + this.virtualListInfo.startIndex * this.selectedLI.offsetHeight : this.selectedLI.offsetTop;
            selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex == 0 && this.fields.groupBy ? this.selectedLI.offsetHeight - selectedLiOffsetTop : selectedLiOffsetTop - this.selectedLI.offsetHeight;
            this.list.scrollTop = selectedLiOffsetTop - this.list.querySelectorAll(".e-virtual-list").length * this.selectedLI.offsetHeight;
          }
        } else if (this.enableVirtualization && !this.isPopupOpen && this.getModuleName() !== "autocomplete" && (this.viewPortInfo.endIndex !== this.totalItemCount && e.action === "down" || this.viewPortInfo.startIndex !== 0 && e.action === "up")) {
          if (e.action === "down") {
            this.viewPortInfo.startIndex = this.viewPortInfo.startIndex + this.itemCount < this.totalItemCount - this.itemCount ? this.viewPortInfo.startIndex + this.itemCount : this.totalItemCount - this.itemCount;
            this.viewPortInfo.endIndex = this.viewPortInfo.startIndex + this.itemCount;
            this.updateVirtualItemIndex();
            this.isCustomFilter = this.getModuleName() === "combobox" ? true : this.isCustomFilter;
            this.resetList(this.dataSource, this.fields, this.query);
            this.isCustomFilter = this.getModuleName() === "combobox" ? false : this.isCustomFilter;
            var value_2 = this.liCollections[0].getAttribute("data-value") !== "null" ? this.getFormattedValue(this.liCollections[0].getAttribute("data-value")) : null;
            var selectedData = this.getDataByValue(value_2);
            if (selectedData) {
              this.itemData = selectedData;
            }
          } else if (e.action === "up") {
            this.viewPortInfo.startIndex = this.viewPortInfo.startIndex - this.itemCount > 0 ? this.viewPortInfo.startIndex - this.itemCount : 0;
            this.viewPortInfo.endIndex = this.viewPortInfo.startIndex + this.itemCount;
            this.updateVirtualItemIndex();
            this.isCustomFilter = this.getModuleName() === "combobox" ? true : this.isCustomFilter;
            this.resetList(this.dataSource, this.fields, this.query);
            this.isCustomFilter = this.getModuleName() === "combobox" ? false : this.isCustomFilter;
            var value_3 = this.liCollections[this.liCollections.length - 1].getAttribute("data-value") !== "null" ? this.getFormattedValue(this.liCollections[this.liCollections.length - 1].getAttribute("data-value")) : null;
            var selectedData = this.getDataByValue(value_3);
            if (selectedData) {
              this.itemData = selectedData;
            }
          }
          this.UpdateSkeleton();
          this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
          this.ulElement = this.list.querySelector("ul");
          this.handleVirtualKeyboardActions(e, this.pageCount);
        }
      }
      if (this.allowFiltering && !this.enableVirtualization && this.getModuleName() !== "autocomplete") {
        var value_4 = this.getItemData().value;
        var filterIndex = this.getIndexByValueFilter(value_4, this.actionCompleteData.ulElement);
        if (!isNullOrUndefined(filterIndex)) {
          this.activeIndex = filterIndex;
        }
      }
      if (this.allowFiltering && this.getModuleName() === "dropdownlist" && this.filterInput) {
        if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-item-focus")[0])) {
          attributes(this.filterInput, { "aria-activedescendant": this.ulElement.getElementsByClassName("e-item-focus")[0].id });
        } else if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-active")[0])) {
          attributes(this.filterInput, { "aria-activedescendant": this.ulElement.getElementsByClassName("e-active")[0].id });
        }
      }
      var itemIndex;
      for (var index = 0; index < this.liCollections.length; index++) {
        if (this.liCollections[index].classList.contains(dropDownListClasses.focus) || this.liCollections[index].classList.contains(dropDownListClasses.selected)) {
          itemIndex = index;
          break;
        }
      }
      if (itemIndex != null && this.isDisabledElement(this.liCollections[itemIndex])) {
        if (this.getModuleName() !== "autocomplete") {
          if (this.liCollections.length - 1 === itemIndex && e.action === "down") {
            e.action = "up";
          }
          if (itemIndex === 0 && e.action === "up") {
            e.action = "down";
          }
        }
        this.updateUpDownAction(e);
      }
      e.preventDefault();
    };
    DropDownList2.prototype.updateHomeEndAction = function(e, isVirtualKeyAction) {
      if (this.getModuleName() === "dropdownlist") {
        var findLi = 0;
        if (e.action === "home") {
          findLi = 0;
          if (this.enableVirtualization && this.isPopupOpen) {
            findLi = this.skeletonCount;
          } else if (this.enableVirtualization && !this.isPopupOpen && this.viewPortInfo.startIndex !== 0) {
            this.viewPortInfo.startIndex = 0;
            this.viewPortInfo.endIndex = this.itemCount;
            this.updateVirtualItemIndex();
            this.resetList(this.dataSource, this.fields, this.query);
          }
        } else {
          if (this.enableVirtualization && !this.isPopupOpen && this.viewPortInfo.endIndex !== this.totalItemCount) {
            this.viewPortInfo.startIndex = this.totalItemCount - this.itemCount;
            this.viewPortInfo.endIndex = this.totalItemCount;
            this.updateVirtualItemIndex();
            this.resetList(this.dataSource, this.fields, this.query);
          }
          findLi = this.getItems().length - 1;
        }
        e.preventDefault();
        if (this.activeIndex === findLi) {
          if (isVirtualKeyAction) {
            this.setSelection(this.liCollections[findLi], e);
          }
          return;
        }
        this.setSelection(this.liCollections[findLi], e);
      }
    };
    DropDownList2.prototype.selectCurrentValueOnTab = function(e) {
      if (this.getModuleName() === "autocomplete") {
        this.selectCurrentItem(e);
      } else {
        if (this.isPopupOpen) {
          this.hidePopup(e);
          this.focusDropDown(e);
        }
      }
    };
    DropDownList2.prototype.mobileKeyActionHandler = function(e) {
      if (!this.enabled) {
        return;
      }
      if (this.isEditTextBox() && !this.isPopupOpen) {
        return;
      }
      if (!this.readonly) {
        if (this.list === void 0 && !this.isRequested) {
          this.searchKeyEvent = e;
          this.renderList();
        }
        if (isNullOrUndefined(this.list) || !isNullOrUndefined(this.liCollections) && this.liCollections.length === 0 || this.isRequested) {
          return;
        }
        if (e.action === "enter") {
          this.selectCurrentItem(e);
        }
      }
    };
    DropDownList2.prototype.handleVirtualKeyboardActions = function(e, pageCount) {
      switch (e.action) {
        case "down":
        case "up":
          if (this.itemData != null || this.getModuleName() === "autocomplete") {
            this.updateUpDownAction(e, true);
          }
          break;
        case "pageUp":
          this.activeIndex = this.getModuleName() === "autocomplete" ? this.getIndexByValue(this.selectedLI.getAttribute("data-value")) + this.getPageCount() - 1 : this.getIndexByValue(this.previousValue);
          this.pageUpSelection(this.activeIndex - this.getPageCount(), e, true);
          e.preventDefault();
          break;
        case "pageDown":
          this.activeIndex = this.getModuleName() === "autocomplete" ? this.getIndexByValue(this.selectedLI.getAttribute("data-value")) - this.getPageCount() : this.getIndexByValue(this.previousValue);
          this.pageDownSelection(!isNullOrUndefined(this.activeIndex) ? this.activeIndex + this.getPageCount() : 2 * this.getPageCount(), e, true);
          e.preventDefault();
          break;
        case "home":
          this.isMouseScrollAction = true;
          this.updateHomeEndAction(e, true);
          break;
        case "end":
          this.isMouseScrollAction = true;
          this.updateHomeEndAction(e, true);
          break;
      }
      this.keyboardEvent = null;
    };
    DropDownList2.prototype.selectCurrentItem = function(e) {
      if (this.isPopupOpen) {
        var li = this.list.querySelector("." + dropDownListClasses.focus);
        if (this.isDisabledElement(li)) {
          return;
        }
        if (li) {
          this.setSelection(li, e);
          this.isTyped = false;
        }
        if (this.isSelected) {
          this.isSelectCustom = false;
          this.onChangeEvent(e);
        }
        this.hidePopup(e);
        this.focusDropDown(e);
      } else {
        this.showPopup();
      }
    };
    DropDownList2.prototype.isSelectFocusItem = function(element) {
      return !isNullOrUndefined(element);
    };
    DropDownList2.prototype.pageUpSelection = function(steps, event2, isVirtualKeyAction) {
      var previousItem = steps >= 0 ? this.liCollections[steps + 1] : this.liCollections[0];
      if (this.enableVirtualization && this.activeIndex == null) {
        previousItem = this.liCollections.length >= steps && steps >= 0 ? this.liCollections[steps + this.skeletonCount + 1] : this.liCollections[0];
      }
      if (!isNullOrUndefined(previousItem) && previousItem.classList.contains("e-virtual-list")) {
        previousItem = this.liCollections[this.skeletonCount];
      }
      this.PageUpDownSelection(previousItem, event2);
      if (this.allowFiltering && this.getModuleName() === "dropdownlist") {
        if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-item-focus")[0])) {
          attributes(this.filterInput, { "aria-activedescendant": this.ulElement.getElementsByClassName("e-item-focus")[0].id });
        } else if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-active")[0])) {
          attributes(this.filterInput, { "aria-activedescendant": this.ulElement.getElementsByClassName("e-active")[0].id });
        }
      }
    };
    DropDownList2.prototype.PageUpDownSelection = function(previousItem, event2) {
      if (this.enableVirtualization) {
        if (!isNullOrUndefined(previousItem) && (this.getModuleName() !== "autocomplete" && !previousItem.classList.contains("e-active") || this.getModuleName() === "autocomplete" && !previousItem.classList.contains("e-item-focus"))) {
          this.setSelection(previousItem, event2);
        }
      } else {
        this.setSelection(previousItem, event2);
      }
    };
    DropDownList2.prototype.pageDownSelection = function(steps, event2, isVirtualKeyAction) {
      var list = this.getItems();
      var previousItem = steps <= list.length ? this.liCollections[steps - 1] : this.liCollections[list.length - 1];
      if (this.enableVirtualization && this.skeletonCount > 0) {
        steps = this.getModuleName() === "dropdownlist" && this.allowFiltering ? steps + 1 : steps;
        previousItem = steps < list.length ? this.liCollections[steps] : this.liCollections[list.length - 1];
      }
      if (this.enableVirtualization && this.activeIndex == null) {
        previousItem = steps <= list.length ? this.liCollections[steps + this.skeletonCount - 1] : this.liCollections[list.length - 1];
      }
      this.PageUpDownSelection(previousItem, event2);
      if (this.allowFiltering && this.getModuleName() === "dropdownlist") {
        if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-item-focus")[0])) {
          attributes(this.filterInput, { "aria-activedescendant": this.ulElement.getElementsByClassName("e-item-focus")[0].id });
        } else if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-active")[0])) {
          attributes(this.filterInput, { "aria-activedescendant": this.ulElement.getElementsByClassName("e-active")[0].id });
        }
      }
    };
    DropDownList2.prototype.unWireEvent = function() {
      if (!isNullOrUndefined(this.inputWrapper)) {
        EventHandler.remove(this.inputWrapper.container, "mousedown", this.dropDownClick);
        EventHandler.remove(this.inputWrapper.container, "keypress", this.onSearch);
        EventHandler.remove(this.inputWrapper.container, "focus", this.focusIn);
        EventHandler.remove(window, "resize", this.windowResize);
      }
      this.unBindCommonEvent();
    };
    DropDownList2.prototype.unWireListEvents = function() {
      if (this.list) {
        EventHandler.remove(this.list, "click", this.onMouseClick);
        EventHandler.remove(this.list, "mouseover", this.onMouseOver);
        EventHandler.remove(this.list, "mouseout", this.onMouseLeave);
      }
    };
    DropDownList2.prototype.checkSelector = function(id) {
      return '[id="' + id.replace(/(:|\.|\[|\]|,|=|@|\\|\/|#)/g, "\\$1") + '"]';
    };
    DropDownList2.prototype.onDocumentClick = function(e) {
      var target = e.target;
      if (!(!isNullOrUndefined(this.popupObj) && closest(target, this.checkSelector(this.popupObj.element.id))) && !isNullOrUndefined(this.inputWrapper) && !this.inputWrapper.container.contains(e.target)) {
        if (this.inputWrapper.container.classList.contains(dropDownListClasses.inputFocus) || this.isPopupOpen) {
          this.isDocumentClick = true;
          var isActive = this.isRequested;
          if (this.getModuleName() === "combobox" && this.isTyped) {
            this.isInteracted = false;
          }
          this.hidePopup(e);
          this.isInteracted = false;
          if (!isActive) {
            this.onFocusOut(e);
            this.inputWrapper.container.classList.remove(dropDownListClasses.inputFocus);
          }
        }
      } else if (target !== this.inputElement && !(this.allowFiltering && target === this.filterInput) && !(this.getModuleName() === "combobox" && !this.allowFiltering && Browser.isDevice && target === this.inputWrapper.buttons[0])) {
        this.isPreventBlur = (Browser.isIE || Browser.info.name === "edge") && (document.activeElement === this.targetElement() || document.activeElement === this.filterInput);
        e.preventDefault();
      }
    };
    DropDownList2.prototype.activeStateChange = function() {
      if (this.isDocumentClick) {
        this.hidePopup();
        this.onFocusOut();
        this.inputWrapper.container.classList.remove(dropDownListClasses.inputFocus);
      }
    };
    DropDownList2.prototype.focusDropDown = function(e) {
      if (!this.initial && this.isFilterLayout()) {
        this.focusIn(e);
      }
    };
    DropDownList2.prototype.dropDownClick = function(e) {
      if (e.which === 3 || e.button === 2) {
        return;
      }
      this.keyboardEvent = null;
      if (this.targetElement().classList.contains(dropDownListClasses.disable) || this.inputWrapper.clearButton === e.target) {
        return;
      }
      var target = e.target;
      if (target !== this.inputElement && !(this.allowFiltering && target === this.filterInput) && this.getModuleName() !== "combobox") {
        e.preventDefault();
      }
      if (!this.readonly) {
        if (this.isPopupOpen) {
          this.hidePopup(e);
          if (this.isFilterLayout()) {
            this.focusDropDown(e);
          }
        } else {
          this.focusIn(e);
          this.floatLabelChange();
          this.queryString = this.inputElement.value.trim() === "" ? null : this.inputElement.value;
          this.isDropDownClick = true;
          this.showPopup(e);
        }
        var proxy_1 = this;
        var duration = this.element.tagName === this.getNgDirective() && this.itemTemplate ? 500 : 100;
        if (!this.isSecondClick) {
          setTimeout(function() {
            proxy_1.cloneElements();
            proxy_1.isSecondClick = true;
          }, duration);
        }
      } else {
        this.focusIn(e);
      }
    };
    DropDownList2.prototype.cloneElements = function() {
      if (this.list) {
        var ulElement = this.list.querySelector("ul");
        if (ulElement) {
          ulElement = ulElement.cloneNode ? ulElement.cloneNode(true) : ulElement;
          this.actionCompleteData.ulElement = ulElement;
        }
      }
    };
    DropDownList2.prototype.updateSelectedItem = function(li, e, preventSelect, isSelection) {
      var _this = this;
      this.removeSelection();
      li.classList.add(dropDownBaseClasses.selected);
      this.removeHover();
      var value = li.getAttribute("data-value") !== null ? this.getFormattedValue(li.getAttribute("data-value")) : null;
      var selectedData = this.getDataByValue(value);
      if (!this.initial && !preventSelect && !isNullOrUndefined(e)) {
        var items = this.detachChanges(selectedData);
        this.isSelected = true;
        var eventArgs = {
          e,
          item: li,
          itemData: items,
          isInteracted: e ? true : false,
          cancel: false
        };
        this.trigger("select", eventArgs, function(eventArgs2) {
          if (eventArgs2.cancel) {
            li.classList.remove(dropDownBaseClasses.selected);
          } else {
            _this.selectEventCallback(li, e, preventSelect, selectedData, value);
            if (isSelection) {
              _this.setSelectOptions(li, e);
            }
          }
        });
      } else {
        this.selectEventCallback(li, e, preventSelect, selectedData, value);
        if (isSelection) {
          this.setSelectOptions(li, e);
        }
      }
    };
    DropDownList2.prototype.selectEventCallback = function(li, e, preventSelect, selectedData, value) {
      this.previousItemData = !isNullOrUndefined(this.itemData) ? this.itemData : null;
      if (this.itemData != selectedData) {
        this.previousValue = !isNullOrUndefined(this.itemData) ? typeof this.itemData == "object" && !this.allowObjectBinding ? this.checkFieldValue(this.itemData, this.fields.value.split(".")) : this.itemData : null;
      }
      this.item = li;
      this.itemData = selectedData;
      var focusedItem = this.list.querySelector("." + dropDownBaseClasses.focus);
      if (focusedItem) {
        removeClass([focusedItem], dropDownBaseClasses.focus);
      }
      li.setAttribute("aria-selected", "true");
      if (isNullOrUndefined(value)) {
        value = "null";
      }
      if (this.allowFiltering && !this.enableVirtualization && this.getModuleName() !== "autocomplete") {
        var filterIndex = this.getIndexByValueFilter(value, this.actionCompleteData.ulElement);
        if (!isNullOrUndefined(filterIndex)) {
          this.activeIndex = filterIndex;
        } else {
          this.activeIndex = this.getIndexByValue(value);
        }
      } else {
        if (this.enableVirtualization && this.activeIndex == null && this.dataSource instanceof DataManager) {
          this.UpdateSkeleton();
          this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
          this.ulElement = this.list.querySelector("ul");
        }
        this.activeIndex = this.getIndexByValue(value);
      }
    };
    DropDownList2.prototype.activeItem = function(li) {
      if (this.isValidLI(li) && !li.classList.contains(dropDownBaseClasses.selected)) {
        this.removeSelection();
        li.classList.add(dropDownBaseClasses.selected);
        this.removeHover();
        li.setAttribute("aria-selected", "true");
      }
    };
    DropDownList2.prototype.setValue = function(e) {
      var dataItem = this.getItemData();
      this.isTouched = !isNullOrUndefined(e);
      if (dataItem.value === null) {
        Input.setValue(null, this.inputElement, this.floatLabelType, this.showClearButton);
      } else {
        Input.setValue(dataItem.text, this.inputElement, this.floatLabelType, this.showClearButton);
      }
      if (this.valueTemplate && this.itemData !== null) {
        this.setValueTemplate();
      } else if (!isNullOrUndefined(this.valueTempElement) && this.inputElement.previousSibling === this.valueTempElement) {
        detach(this.valueTempElement);
        this.inputElement.style.display = "block";
      }
      if (!isNullOrUndefined(dataItem.value) && !this.enableVirtualization && this.allowFiltering) {
        this.activeIndex = this.getIndexByValueFilter(dataItem.value, this.actionCompleteData.ulElement);
      }
      var clearIcon2 = dropDownListClasses.clearIcon;
      var isFilterElement = this.isFiltering() && this.filterInput && this.getModuleName() === "combobox";
      var clearElement = isFilterElement && this.filterInput.parentElement.querySelector("." + clearIcon2);
      if (this.isFiltering() && clearElement) {
        clearElement.style.removeProperty("visibility");
      }
      if (!this.allowObjectBinding && this.previousValue === dataItem.value || this.allowObjectBinding && (this.previousValue != null && this.isObjectInArray(this.previousValue, [this.allowCustom && this.isObjectCustomValue ? this.value ? this.value : dataItem : dataItem.value ? this.getDataByValue(dataItem.value) : dataItem]))) {
        this.isSelected = false;
        return true;
      } else {
        this.isSelected = !this.initial ? true : false;
        this.isSelectCustom = false;
        if (this.getModuleName() === "dropdownlist") {
          this.updateIconState();
        }
        return false;
      }
    };
    DropDownList2.prototype.setSelection = function(li, e) {
      if (this.isValidLI(li) && (!li.classList.contains(dropDownBaseClasses.selected) || this.isPopupOpen && this.isSelected && li.classList.contains(dropDownBaseClasses.selected))) {
        this.updateSelectedItem(li, e, false, true);
      } else {
        this.setSelectOptions(li, e);
        if (this.enableVirtualization && this.value) {
          var fields = this.fields.value ? this.fields.value : "";
          var currentValue = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
          if (this.dataSource instanceof DataManager) {
            var getItem = new DataManager(this.virtualGroupDataSource).executeLocal(new Query().where(new Predicate(fields, "equal", currentValue)));
            if (getItem && getItem.length > 0) {
              this.itemData = getItem[0];
              var dataItem = this.getItemData();
              var value = this.allowObjectBinding ? this.getDataByValue(dataItem.value) : dataItem.value;
              if (this.value === dataItem.value && this.text !== dataItem.text || this.value !== dataItem.value && this.text === dataItem.text) {
                this.setProperties({ "text": dataItem.text, "value": value });
              }
            }
          } else {
            var getItem = new DataManager(this.dataSource).executeLocal(new Query().where(new Predicate(fields, "equal", currentValue)));
            if (getItem && getItem.length > 0) {
              this.itemData = getItem[0];
              var dataItem = this.getItemData();
              var value = this.allowObjectBinding ? this.getDataByValue(dataItem.value) : dataItem.value;
              if (this.value === dataItem.value && this.text !== dataItem.text || this.value !== dataItem.value && this.text === dataItem.text) {
                this.setProperties({ "text": dataItem.text, "value": value });
              }
            }
          }
        }
      }
    };
    DropDownList2.prototype.setSelectOptions = function(li, e) {
      if (this.list) {
        this.removeHover();
      }
      this.previousSelectedLI = !isNullOrUndefined(this.selectedLI) ? this.selectedLI : null;
      this.selectedLI = li;
      if (this.setValue(e)) {
        return;
      }
      if (!this.isPopupOpen && !isNullOrUndefined(li) || this.isPopupOpen && !isNullOrUndefined(e) && (e.type !== "keydown" || e.type === "keydown" && e.action === "enter")) {
        this.isSelectCustom = false;
        this.onChangeEvent(e);
      }
      if (this.isPopupOpen && !isNullOrUndefined(this.selectedLI) && this.itemData !== null && (!e || e.type !== "click")) {
        this.setScrollPosition(e);
      }
      if (Browser.info.name !== "mozilla") {
        if (this.targetElement()) {
          attributes(this.targetElement(), { "aria-describedby": this.inputElement.id !== "" ? this.inputElement.id : this.element.id });
          this.targetElement().removeAttribute("aria-live");
        }
      }
      if (this.isPopupOpen && !isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-item-focus")[0])) {
        attributes(this.targetElement(), { "aria-activedescendant": this.ulElement.getElementsByClassName("e-item-focus")[0].id });
      } else if (this.isPopupOpen && !isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-active")[0])) {
        attributes(this.targetElement(), { "aria-activedescendant": this.ulElement.getElementsByClassName("e-active")[0].id });
      }
    };
    DropDownList2.prototype.dropdownCompiler = function(dropdownTemplate) {
      var checkTemplate = false;
      if (typeof dropdownTemplate !== "function" && dropdownTemplate) {
        try {
          checkTemplate = document.querySelectorAll(dropdownTemplate).length ? true : false;
        } catch (exception) {
          checkTemplate = false;
        }
      }
      return checkTemplate;
    };
    DropDownList2.prototype.setValueTemplate = function() {
      var compiledString;
      if (this.isReact) {
        this.clearTemplate(["valueTemplate"]);
        if (this.valueTempElement) {
          detach(this.valueTempElement);
          this.inputElement.style.display = "block";
          this.valueTempElement = null;
        }
      }
      if (!this.valueTempElement) {
        this.valueTempElement = this.createElement("span", { className: dropDownListClasses.value });
        this.inputElement.parentElement.insertBefore(this.valueTempElement, this.inputElement);
        this.inputElement.style.display = "none";
      }
      if (!this.isReact) {
        this.valueTempElement.innerHTML = "";
      }
      var valuecheck = this.dropdownCompiler(this.valueTemplate);
      if (typeof this.valueTemplate !== "function" && valuecheck) {
        compiledString = compile(document.querySelector(this.valueTemplate).innerHTML.trim());
      } else {
        compiledString = compile(this.valueTemplate);
      }
      var valueCompTemp = compiledString(this.itemData, this, "valueTemplate", this.valueTemplateId, this.isStringTemplate, null, this.valueTempElement);
      if (valueCompTemp && valueCompTemp.length > 0) {
        append(valueCompTemp, this.valueTempElement);
      }
      this.renderReactTemplates();
    };
    DropDownList2.prototype.removeSelection = function() {
      if (this.list) {
        var selectedItems = this.list.querySelectorAll("." + dropDownBaseClasses.selected);
        if (selectedItems.length) {
          removeClass(selectedItems, dropDownBaseClasses.selected);
          selectedItems[0].removeAttribute("aria-selected");
        }
      }
    };
    DropDownList2.prototype.getItemData = function() {
      var fields = this.fields;
      var dataItem = null;
      dataItem = this.itemData;
      var dataValue;
      var dataText;
      if (!isNullOrUndefined(dataItem)) {
        dataValue = getValue(fields.value, dataItem);
        dataText = getValue(fields.text, dataItem);
      }
      var value = !isNullOrUndefined(dataItem) && !isUndefined(dataValue) ? dataValue : dataItem;
      var text = !isNullOrUndefined(dataItem) && !isUndefined(dataValue) ? dataText : dataItem;
      return { value, text };
    };
    DropDownList2.prototype.onChangeEvent = function(eve, isCustomValue) {
      var _this = this;
      var dataItem = this.getItemData();
      var index = this.isSelectCustom ? null : this.activeIndex;
      if (this.enableVirtualization) {
        var datas = this.dataSource instanceof DataManager ? this.virtualGroupDataSource : this.dataSource;
        if (dataItem.value && datas && datas.length > 0) {
          var foundIndex = datas.findIndex(function(data) {
            return !isNullOrUndefined(dataItem.value) && getValue(_this.fields.value, data) === dataItem.value;
          });
          if (foundIndex !== -1) {
            index = foundIndex;
          }
        }
      }
      var value = this.allowObjectBinding ? isCustomValue ? this.value : this.getDataByValue(dataItem.value) : dataItem.value;
      this.setProperties({ "index": index, "text": dataItem.text, "value": value }, true);
      this.detachChangeEvent(eve);
    };
    DropDownList2.prototype.detachChanges = function(value) {
      var items;
      if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
        items = Object.defineProperties({}, {
          value: {
            value,
            enumerable: true
          },
          text: {
            value,
            enumerable: true
          }
        });
      } else {
        items = value;
      }
      return items;
    };
    DropDownList2.prototype.detachChangeEvent = function(eve) {
      this.isSelected = false;
      this.previousValue = this.value;
      this.activeIndex = this.enableVirtualization ? this.getIndexByValue(this.value) : this.index;
      this.typedString = !isNullOrUndefined(this.text) ? this.text : "";
      if (!this.initial) {
        var items = this.detachChanges(this.itemData);
        var preItems = void 0;
        if (typeof this.previousItemData === "string" || typeof this.previousItemData === "boolean" || typeof this.previousItemData === "number") {
          preItems = Object.defineProperties({}, {
            value: {
              value: this.previousItemData,
              enumerable: true
            },
            text: {
              value: this.previousItemData,
              enumerable: true
            }
          });
        } else {
          preItems = this.previousItemData;
        }
        this.setHiddenValue();
        var eventArgs = {
          e: eve,
          item: this.item,
          itemData: items,
          previousItem: this.previousSelectedLI,
          previousItemData: preItems,
          isInteracted: eve ? true : false,
          value: this.value,
          element: this.element,
          event: eve
        };
        if (this.isAngular && this.preventChange) {
          this.preventChange = false;
        } else {
          this.trigger("change", eventArgs);
        }
      }
      if ((isNullOrUndefined(this.value) || this.value === "") && this.floatLabelType !== "Always") {
        removeClass([this.inputWrapper.container], "e-valid-input");
      }
    };
    DropDownList2.prototype.setHiddenValue = function() {
      if (!isNullOrUndefined(this.value)) {
        var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
        if (this.hiddenElement.querySelector("option")) {
          var selectedElement = this.hiddenElement.querySelector("option");
          selectedElement.textContent = this.text;
          selectedElement.setAttribute("value", value.toString());
        } else {
          if (!isNullOrUndefined(this.hiddenElement)) {
            this.hiddenElement.innerHTML = "<option selected>" + this.text + "</option>";
            var selectedElement = this.hiddenElement.querySelector("option");
            selectedElement.setAttribute("value", value.toString());
          }
        }
      } else {
        this.hiddenElement.innerHTML = "";
      }
    };
    DropDownList2.prototype.onFilterUp = function(e) {
      if (!(e.ctrlKey && e.keyCode === 86) && (this.isValidKey || e.keyCode === 40 || e.keyCode === 38)) {
        this.isValidKey = false;
        this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
        switch (e.keyCode) {
          case 38:
          case 40:
            if (this.getModuleName() === "autocomplete" && !this.isPopupOpen && !this.preventAltUp && !this.isRequested) {
              this.preventAutoFill = true;
              this.searchLists(e);
            } else {
              this.preventAutoFill = false;
            }
            this.preventAltUp = false;
            if (this.getModuleName() === "autocomplete" && !isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-item-focus")[0])) {
              attributes(this.targetElement(), { "aria-activedescendant": this.ulElement.getElementsByClassName("e-item-focus")[0].id });
            }
            e.preventDefault();
            break;
          case 46:
          case 8:
            this.typedString = this.filterInput.value;
            if (!this.isPopupOpen && this.typedString !== "" || this.isPopupOpen && this.queryString.length > 0) {
              this.preventAutoFill = true;
              this.searchLists(e);
            } else if (this.typedString === "" && this.queryString === "" && this.getModuleName() !== "autocomplete") {
              this.preventAutoFill = true;
              this.searchLists(e);
            } else if (this.typedString === "") {
              if (this.list) {
                this.resetFocusElement();
              }
              this.activeIndex = null;
              if (this.getModuleName() !== "dropdownlist") {
                this.preventAutoFill = true;
                this.searchLists(e);
                if (this.getModuleName() === "autocomplete") {
                  this.hidePopup();
                }
              }
            }
            e.preventDefault();
            break;
          default:
            if (this.isFiltering() && this.getModuleName() === "combobox" && isNullOrUndefined(this.list)) {
              this.getInitialData = true;
              this.renderList();
            }
            this.typedString = this.filterInput.value;
            this.preventAutoFill = false;
            this.searchLists(e);
            if (this.enableVirtualization && this.getModuleName() !== "autocomplete" || this.getModuleName() === "autocomplete" && !(this.dataSource instanceof DataManager) || this.getModuleName() === "autocomplete" && this.dataSource instanceof DataManager && this.totalItemCount != 0) {
              this.getFilteringSkeletonCount();
            }
            break;
        }
      } else {
        this.isValidKey = false;
      }
    };
    DropDownList2.prototype.onFilterDown = function(e) {
      switch (e.keyCode) {
        case 13:
          break;
        case 40:
        case 38:
          this.queryString = this.filterInput.value;
          e.preventDefault();
          break;
        case 9:
          if (this.isPopupOpen && this.getModuleName() !== "autocomplete") {
            e.preventDefault();
          }
          break;
        default:
          this.prevSelectPoints = this.getSelectionPoints();
          this.queryString = this.filterInput.value;
          break;
      }
    };
    DropDownList2.prototype.removeFillSelection = function() {
      if (this.isInteracted) {
        var selection = this.getSelectionPoints();
        this.inputElement.setSelectionRange(selection.end, selection.end);
      }
    };
    DropDownList2.prototype.getQuery = function(query) {
      var filterQuery;
      if (!this.isCustomFilter && this.allowFiltering && this.filterInput) {
        filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
        var filterType = this.typedString === "" ? "contains" : this.filterType;
        var dataType = this.typeOfData(this.dataSource).typeof;
        if (!(this.dataSource instanceof DataManager) && dataType === "string" || dataType === "number") {
          filterQuery.where("", filterType, this.typedString, this.ignoreCase, this.ignoreAccent);
        } else if (this.getModuleName() !== "combobox" || this.isFiltering() && this.getModuleName() === "combobox" && this.typedString !== "") {
          var fields = this.fields.text ? this.fields.text : "";
          filterQuery.where(fields, filterType, this.typedString, this.ignoreCase, this.ignoreAccent);
        }
      } else {
        filterQuery = this.enableVirtualization && !isNullOrUndefined(this.customFilterQuery) ? this.customFilterQuery.clone() : query ? query.clone() : this.query ? this.query.clone() : new Query();
      }
      if (this.enableVirtualization && this.viewPortInfo.endIndex != 0) {
        var takeValue = this.getTakeValue();
        var alreadySkipAdded = false;
        if (filterQuery) {
          for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
            if (filterQuery.queries[queryElements].fn === "onSkip") {
              alreadySkipAdded = true;
              break;
            }
          }
        }
        var queryTakeValue = 0;
        var querySkipValue = 0;
        if (filterQuery && filterQuery.queries.length > 0) {
          for (var queryElements_1 = 0; queryElements_1 < filterQuery.queries.length; queryElements_1++) {
            if (filterQuery.queries[queryElements_1].fn === "onSkip") {
              querySkipValue = filterQuery.queries[queryElements_1].e.nos;
            }
            if (filterQuery.queries[queryElements_1].fn === "onTake") {
              queryTakeValue = takeValue <= filterQuery.queries[queryElements_1].e.nos ? filterQuery.queries[queryElements_1].e.nos : takeValue;
            }
          }
        }
        if (queryTakeValue <= 0 && this.query && this.query.queries.length > 0) {
          for (var queryElements_2 = 0; queryElements_2 < this.query.queries.length; queryElements_2++) {
            if (this.query.queries[queryElements_2].fn === "onTake") {
              queryTakeValue = takeValue <= this.query.queries[queryElements_2].e.nos ? this.query.queries[queryElements_2].e.nos : takeValue;
            }
          }
        }
        var skipExists = false;
        if (filterQuery && filterQuery.queries.length > 0) {
          for (var queryElements_3 = 0; queryElements_3 < filterQuery.queries.length; queryElements_3++) {
            if (filterQuery.queries[queryElements_3].fn === "onSkip") {
              querySkipValue = filterQuery.queries[queryElements_3].e.nos;
              filterQuery.queries.splice(queryElements_3, 1);
              --queryElements_3;
              continue;
            }
            if (filterQuery.queries[queryElements_3].fn === "onTake") {
              queryTakeValue = filterQuery.queries[queryElements_3].e.nos <= queryTakeValue ? queryTakeValue : filterQuery.queries[queryElements_3].e.nos;
              filterQuery.queries.splice(queryElements_3, 1);
              --queryElements_3;
            }
          }
        }
        if (!skipExists && (this.allowFiltering || !this.isPopupOpen || !alreadySkipAdded)) {
          if (querySkipValue > 0) {
            filterQuery.skip(querySkipValue);
          } else {
            filterQuery.skip(this.virtualItemStartIndex);
          }
        }
        if (this.isIncrementalRequest) {
          filterQuery.take(this.incrementalEndIndex);
        } else {
          if (queryTakeValue > 0) {
            filterQuery.take(queryTakeValue);
          } else {
            filterQuery.take(takeValue);
          }
        }
        filterQuery.requiresCount();
      }
      return filterQuery;
    };
    DropDownList2.prototype.getSelectionPoints = function() {
      var input = this.inputElement;
      return { start: Math.abs(input.selectionStart), end: Math.abs(input.selectionEnd) };
    };
    DropDownList2.prototype.searchLists = function(e) {
      var _this = this;
      this.isTyped = true;
      this.activeIndex = null;
      this.isListSearched = true;
      if (this.filterInput.parentElement.querySelector("." + dropDownListClasses.clearIcon)) {
        var clearElement = this.filterInput.parentElement.querySelector("." + dropDownListClasses.clearIcon);
        clearElement.style.visibility = this.filterInput.value === "" ? "hidden" : "visible";
      }
      this.isDataFetched = false;
      if (this.isFiltering()) {
        this.checkAndResetCache();
        this.isRequesting = false;
        var eventArgs_1 = {
          preventDefaultAction: false,
          text: this.filterInput.value,
          updateData: function(dataSource, query, fields) {
            if (eventArgs_1.cancel) {
              return;
            }
            _this.isCustomFilter = true;
            _this.customFilterQuery = query ? query.clone() : query;
            _this.filteringAction(dataSource, query, fields);
          },
          baseEventArgs: e,
          cancel: false
        };
        this.trigger("filtering", eventArgs_1, function(eventArgs) {
          if (!eventArgs.cancel && !_this.isCustomFilter && !eventArgs.preventDefaultAction) {
            _this.filteringAction(_this.dataSource, null, _this.fields);
          }
        });
      }
    };
    DropDownList2.prototype.filter = function(dataSource, query, fields) {
      this.isCustomFilter = true;
      this.filteringAction(dataSource, query, fields);
    };
    DropDownList2.prototype.filteringAction = function(dataSource, query, fields) {
      if (!isNullOrUndefined(this.filterInput)) {
        this.beforePopupOpen = !this.isPopupOpen && this.getModuleName() === "combobox" && this.filterInput.value === "" || this.getInitialData ? false : true;
        var isNoData = this.list.classList.contains(dropDownBaseClasses.noData);
        if (this.filterInput.value.trim() === "" && !this.itemTemplate) {
          this.actionCompleteData.isUpdated = false;
          this.isTyped = false;
          if (!isNullOrUndefined(this.actionCompleteData.ulElement) && !isNullOrUndefined(this.actionCompleteData.list)) {
            if (this.enableVirtualization) {
              if (this.isFiltering()) {
                this.isPreventScrollAction = true;
                this.list.scrollTop = 0;
                this.previousStartIndex = 0;
                this.virtualListInfo = null;
              }
              this.totalItemCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
              this.resetList(dataSource, fields, query);
              if (isNoData && !this.list.classList.contains(dropDownBaseClasses.noData)) {
                if (!this.list.querySelector(".e-virtual-ddl-content")) {
                  this.list.appendChild(this.createElement("div", {
                    className: "e-virtual-ddl-content",
                    styles: this.getTransformValues()
                  })).appendChild(this.list.querySelector(".e-list-parent"));
                }
                if (!this.list.querySelector(".e-virtual-ddl")) {
                  var virualElement = this.createElement("div", {
                    id: this.element.id + "_popup",
                    className: "e-virtual-ddl",
                    styles: this.GetVirtualTrackHeight()
                  });
                  document.getElementsByClassName("e-popup")[0].querySelector(".e-dropdownbase").appendChild(virualElement);
                }
              }
            }
            this.onActionComplete(this.actionCompleteData.ulElement, this.actionCompleteData.list);
          }
          this.isTyped = true;
          if (!isNullOrUndefined(this.itemData) && this.getModuleName() === "dropdownlist") {
            this.focusIndexItem();
            this.setScrollPosition();
          }
          this.isNotSearchList = true;
        } else {
          this.isNotSearchList = false;
          query = this.filterInput.value.trim() === "" ? null : query;
          if (this.enableVirtualization && this.isFiltering() && this.isTyped) {
            this.isPreventScrollAction = true;
            this.list.scrollTop = 0;
            this.previousStartIndex = 0;
            this.virtualListInfo = null;
          }
          this.resetList(dataSource, fields, query);
          if (this.getModuleName() === "dropdownlist" && this.list.classList.contains(dropDownBaseClasses.noData)) {
            this.popupContentElement.setAttribute("role", "status");
            this.popupContentElement.setAttribute("id", "no-record");
            attributes(this.filterInputObj.container, { "aria-activedescendant": "no-record" });
          }
          if (this.enableVirtualization && isNoData && !this.list.classList.contains(dropDownBaseClasses.noData)) {
            if (!this.list.querySelector(".e-virtual-ddl-content")) {
              this.list.appendChild(this.createElement("div", {
                className: "e-virtual-ddl-content",
                styles: this.getTransformValues()
              })).appendChild(this.list.querySelector(".e-list-parent"));
            }
            if (!this.list.querySelector(".e-virtual-ddl")) {
              var virualElement = this.createElement("div", {
                id: this.element.id + "_popup",
                className: "e-virtual-ddl",
                styles: this.GetVirtualTrackHeight()
              });
              document.getElementsByClassName("e-popup")[0].querySelector(".e-dropdownbase").appendChild(virualElement);
            }
          }
        }
        if (this.enableVirtualization) {
          this.getFilteringSkeletonCount();
        }
        this.renderReactTemplates();
      }
    };
    DropDownList2.prototype.setSearchBox = function(popupElement) {
      if (this.isFiltering()) {
        var parentElement = popupElement.querySelector("." + dropDownListClasses.filterParent) ? popupElement.querySelector("." + dropDownListClasses.filterParent) : this.createElement("span", {
          className: dropDownListClasses.filterParent
        });
        this.filterInput = this.createElement("input", {
          attrs: { type: "text" },
          className: dropDownListClasses.filterInput
        });
        this.element.parentNode.insertBefore(this.filterInput, this.element);
        var backIcon = false;
        if (Browser.isDevice) {
          backIcon = true;
        }
        this.filterInputObj = Input.createInput({
          element: this.filterInput,
          buttons: backIcon ? [dropDownListClasses.backIcon, dropDownListClasses.filterBarClearIcon] : [dropDownListClasses.filterBarClearIcon],
          properties: { placeholder: this.filterBarPlaceholder }
        }, this.createElement);
        if (!isNullOrUndefined(this.cssClass)) {
          if (this.cssClass.split(" ").indexOf("e-outline") !== -1) {
            addClass([this.filterInputObj.container], "e-outline");
          } else if (this.cssClass.split(" ").indexOf("e-filled") !== -1) {
            addClass([this.filterInputObj.container], "e-filled");
          }
        }
        append([this.filterInputObj.container], parentElement);
        prepend([parentElement], popupElement);
        attributes(this.filterInput, {
          "aria-disabled": "false",
          "role": "combobox",
          "autocomplete": "off",
          "autocapitalize": "off",
          "spellcheck": "false"
        });
        this.clearIconElement = this.filterInput.parentElement.querySelector("." + dropDownListClasses.clearIcon);
        if (!Browser.isDevice && this.clearIconElement) {
          EventHandler.add(this.clearIconElement, "click", this.clearText, this);
          this.clearIconElement.style.visibility = "hidden";
        }
        if (!Browser.isDevice) {
          this.searchKeyModule = new KeyboardEvents(this.filterInput, {
            keyAction: this.keyActionHandler.bind(this),
            keyConfigs: this.keyConfigure,
            eventName: "keydown"
          });
        } else {
          this.searchKeyModule = new KeyboardEvents(this.filterInput, {
            keyAction: this.mobileKeyActionHandler.bind(this),
            keyConfigs: this.keyConfigure,
            eventName: "keydown"
          });
        }
        EventHandler.add(this.filterInput, "input", this.onInput, this);
        EventHandler.add(this.filterInput, "keyup", this.onFilterUp, this);
        EventHandler.add(this.filterInput, "keydown", this.onFilterDown, this);
        EventHandler.add(this.filterInput, "blur", this.onBlurHandler, this);
        EventHandler.add(this.filterInput, "paste", this.pasteHandler, this);
        return this.filterInputObj;
      } else {
        return inputObject;
      }
    };
    DropDownList2.prototype.onInput = function(e) {
      this.isValidKey = true;
      if (this.getModuleName() === "combobox") {
        this.updateIconState();
      }
      if (Browser.isDevice && Browser.info.name === "mozilla") {
        this.typedString = this.filterInput.value;
        this.preventAutoFill = true;
        this.searchLists(e);
      }
    };
    DropDownList2.prototype.pasteHandler = function(e) {
      var _this = this;
      setTimeout(function() {
        _this.typedString = _this.filterInput.value;
        _this.searchLists(e);
      });
    };
    DropDownList2.prototype.onActionFailure = function(e) {
      _super.prototype.onActionFailure.call(this, e);
      if (this.beforePopupOpen) {
        this.renderPopup();
      }
    };
    DropDownList2.prototype.getTakeValue = function() {
      return this.allowFiltering && this.getModuleName() === "dropdownlist" && Browser.isDevice ? Math.round(window.outerHeight / this.listItemHeight) : this.itemCount;
    };
    DropDownList2.prototype.onActionComplete = function(ulElement, list, e, isUpdated) {
      var _this = this;
      if (this.dataSource instanceof DataManager && !isNullOrUndefined(e) && !this.virtualGroupDataSource) {
        this.totalItemCount = e.count;
      }
      if (this.isNotSearchList && !this.enableVirtualization) {
        this.isNotSearchList = false;
        return;
      }
      if (this.getInitialData) {
        this.updateActionCompleteDataValues(ulElement, list);
      }
      if (!this.preventPopupOpen && this.getModuleName() === "combobox") {
        this.beforePopupOpen = true;
        this.preventPopupOpen = true;
      }
      var tempItemCount = this.itemCount;
      if (this.isActive || !isNullOrUndefined(ulElement)) {
        var selectedItem = this.selectedLI ? this.selectedLI.cloneNode(true) : null;
        _super.prototype.onActionComplete.call(this, ulElement, list, e);
        this.skeletonCount = this.totalItemCount != 0 && this.totalItemCount < this.itemCount * 2 ? 0 : this.skeletonCount;
        this.updateSelectElementData(this.allowFiltering);
        if (this.isRequested && !isNullOrUndefined(this.searchKeyEvent) && this.searchKeyEvent.type === "keydown") {
          this.isRequested = false;
          this.keyActionHandler(this.searchKeyEvent);
          this.searchKeyEvent = null;
        }
        if (this.isRequested && !isNullOrUndefined(this.searchKeyEvent)) {
          this.incrementalSearch(this.searchKeyEvent);
          this.searchKeyEvent = null;
        }
        if (!this.enableVirtualization) {
          this.list.scrollTop = 0;
        }
        if (!isNullOrUndefined(ulElement)) {
          attributes(ulElement, { "id": this.element.id + "_options", "role": "listbox", "aria-hidden": "false", "aria-label": "listbox" });
        }
        if (this.initialRemoteRender) {
          this.initial = true;
          this.activeIndex = this.index;
          this.initialRemoteRender = false;
          if (this.value && this.dataSource instanceof DataManager) {
            var checkField_1 = isNullOrUndefined(this.fields.value) ? this.fields.text : this.fields.value;
            var value_5 = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(checkField_1, this.value) : this.value;
            var fieldValue_1 = this.fields.value.split(".");
            var checkVal = list.some(function(x) {
              return isNullOrUndefined(x[checkField_1]) && fieldValue_1.length > 1 ? _this.checkFieldValue(x, fieldValue_1) === value_5 : x[checkField_1] === value_5;
            });
            if (this.enableVirtualization && this.virtualGroupDataSource) {
              checkVal = this.virtualGroupDataSource.some(function(x) {
                return isNullOrUndefined(x[checkField_1]) && fieldValue_1.length > 1 ? _this.checkFieldValue(x, fieldValue_1) === value_5 : x[checkField_1] === value_5;
              });
            }
            if (!checkVal) {
              this.dataSource.executeQuery(this.getQuery(this.query).where(new Predicate(checkField_1, "equal", value_5))).then(function(e2) {
                if (e2.result.length > 0) {
                  _this.addItem(e2.result, list.length);
                  _this.updateValues();
                } else {
                  _this.updateValues();
                }
              });
            } else {
              this.updateValues();
            }
          } else {
            this.updateValues();
          }
          this.initial = false;
        } else if (this.getModuleName() === "autocomplete" && this.value) {
          this.setInputValue();
        }
        if (this.getModuleName() !== "autocomplete" && this.isFiltering() && !this.isTyped) {
          if (!this.actionCompleteData.isUpdated || (!this.isCustomFilter && !this.isFilterFocus || isNullOrUndefined(this.itemData) && this.allowFiltering && (this.dataSource instanceof DataManager || !isNullOrUndefined(this.dataSource) && !isNullOrUndefined(this.dataSource.length) && this.dataSource.length !== 0))) {
            if (this.itemTemplate && this.element.tagName === "EJS-COMBOBOX" && this.allowFiltering) {
              setTimeout(function() {
                _this.updateActionCompleteDataValues(ulElement, list);
              }, 0);
            } else {
              this.updateActionCompleteDataValues(ulElement, list);
            }
          }
          if ((this.allowCustom || this.allowFiltering && !this.isValueInList(list, this.value) && this.dataSource instanceof DataManager) && !this.enableVirtualization) {
            this.addNewItem(list, selectedItem);
          } else if ((this.allowCustom || this.allowFiltering && this.isValueInList(list, this.value)) && !this.enableVirtualization) {
            this.addNewItem(list, selectedItem);
          }
          if (!isNullOrUndefined(this.itemData) || isNullOrUndefined(this.itemData) && this.enableVirtualization) {
            this.getSkeletonCount();
            this.skeletonCount = this.totalItemCount != 0 && this.totalItemCount < this.itemCount * 2 ? 0 : this.skeletonCount;
            this.UpdateSkeleton();
            this.focusIndexItem();
          }
          if (this.enableVirtualization) {
            this.updateActionCompleteDataValues(ulElement, list);
          }
        } else if (this.enableVirtualization && this.getModuleName() !== "autocomplete" && !this.isFiltering()) {
          var value = this.getItemData().value;
          this.activeIndex = this.getIndexByValue(value);
          var element = this.findListElement(this.list, "li", "data-value", value);
          this.selectedLI = element;
        } else if (this.enableVirtualization && this.getModuleName() === "autocomplete") {
          this.activeIndex = this.skeletonCount;
        }
        if (this.beforePopupOpen) {
          this.renderPopup(e);
          if (this.enableVirtualization) {
            if (!this.list.querySelector(".e-virtual-list")) {
              this.UpdateSkeleton();
              this.liCollections = this.list.querySelectorAll(".e-list-item");
            }
          }
          if (this.enableVirtualization && tempItemCount != this.itemCount) {
            this.resetList(this.dataSource, this.fields);
          }
        }
      }
    };
    DropDownList2.prototype.isValueInList = function(list, valueToFind) {
      if (Array.isArray(list)) {
        for (var i = 0; i < list.length; i++) {
          if (list[i] === valueToFind) {
            return true;
          }
        }
      } else if (typeof list === "object" && list !== null) {
        for (var key in list) {
          if (Object.prototype.hasOwnProperty.call(list, key) && list[key] === valueToFind) {
            return true;
          }
        }
      }
      return false;
    };
    DropDownList2.prototype.checkFieldValue = function(list, fieldValue) {
      var checkField = list;
      fieldValue.forEach(function(value) {
        checkField = checkField[value];
      });
      return checkField;
    };
    DropDownList2.prototype.updateActionCompleteDataValues = function(ulElement, list) {
      this.actionCompleteData = { ulElement: ulElement.cloneNode(true), list, isUpdated: true };
      if (this.actionData.list !== this.actionCompleteData.list && this.actionCompleteData.ulElement && this.actionCompleteData.list) {
        this.actionData = this.actionCompleteData;
      }
    };
    DropDownList2.prototype.addNewItem = function(listData, newElement) {
      var _this = this;
      if (!isNullOrUndefined(this.itemData) && !isNullOrUndefined(newElement)) {
        var value_6 = this.getItemData().value;
        var isExist = listData.some(function(data) {
          return (typeof data === "string" || typeof data === "number") && data === value_6 || getValue(_this.fields.value, data) === value_6;
        });
        if (!isExist) {
          this.addItem(this.itemData);
        }
      }
    };
    DropDownList2.prototype.updateActionCompleteData = function(li, item, index) {
      var _this = this;
      if (this.getModuleName() !== "autocomplete" && this.actionCompleteData.ulElement) {
        if (this.itemTemplate && this.element.tagName === "EJS-COMBOBOX" && this.allowFiltering) {
          setTimeout(function() {
            _this.actionCompleteDataUpdate(li, item, index);
          }, 0);
        } else {
          this.actionCompleteDataUpdate(li, item, index);
        }
      }
    };
    DropDownList2.prototype.actionCompleteDataUpdate = function(li, item, index) {
      if (index !== null) {
        this.actionCompleteData.ulElement.insertBefore(li.cloneNode(true), this.actionCompleteData.ulElement.childNodes[index]);
      } else {
        this.actionCompleteData.ulElement.appendChild(li.cloneNode(true));
      }
      if (this.isFiltering() && this.actionCompleteData.list && this.actionCompleteData.list.indexOf(item) < 0) {
        this.actionCompleteData.list.push(item);
      }
    };
    DropDownList2.prototype.focusIndexItem = function() {
      var value = this.getItemData().value;
      this.activeIndex = this.enableVirtualization && !isNullOrUndefined(value) || !this.enableVirtualization ? this.getIndexByValue(value) : this.activeIndex;
      var element = this.findListElement(this.list, "li", "data-value", value);
      this.selectedLI = element;
      this.activeItem(element);
      if (!(this.enableVirtualization && isNullOrUndefined(element))) {
        this.removeFocus();
      }
    };
    DropDownList2.prototype.updateSelection = function() {
      var selectedItem = this.list.querySelector("." + dropDownBaseClasses.selected);
      if (selectedItem) {
        this.setProperties({ "index": this.getIndexByValue(selectedItem.getAttribute("data-value")) });
        this.activeIndex = this.index;
      } else {
        this.removeFocus();
        this.list.querySelector("." + dropDownBaseClasses.li).classList.add(dropDownListClasses.focus);
      }
    };
    DropDownList2.prototype.updateSelectionList = function() {
      var selectedItem = this.list && this.list.querySelector(".e-active");
      if (!selectedItem && !isNullOrUndefined(this.value)) {
        var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
        var findEle = this.findListElement(this.list, "li", "data-value", value);
        if (findEle) {
          findEle.classList.add("e-active");
        }
      }
    };
    DropDownList2.prototype.removeFocus = function() {
      var highlightedItem = this.list.querySelectorAll("." + dropDownListClasses.focus);
      if (highlightedItem && highlightedItem.length) {
        removeClass(highlightedItem, dropDownListClasses.focus);
      }
    };
    DropDownList2.prototype.renderPopup = function(e) {
      var _this = this;
      if (this.popupObj && document.body.contains(this.popupObj.element)) {
        this.refreshPopup();
        return;
      }
      var args = { cancel: false };
      this.trigger("beforeOpen", args, function(args2) {
        if (!args2.cancel) {
          var popupEle = _this.createElement("div", {
            id: _this.element.id + "_popup",
            className: "e-ddl e-popup " + (_this.cssClass !== null ? _this.cssClass : "")
          });
          popupEle.setAttribute("aria-label", _this.element.id);
          popupEle.setAttribute("role", "dialog");
          var searchBox = _this.setSearchBox(popupEle);
          _this.listContainerHeight = _this.allowFiltering && _this.getModuleName() === "dropdownlist" && Browser.isDevice ? formatUnit(Math.round(window.outerHeight).toString() + "px") : formatUnit(_this.popupHeight);
          if (_this.headerTemplate) {
            _this.setHeaderTemplate(popupEle);
          }
          append([_this.list], popupEle);
          if (_this.footerTemplate) {
            _this.setFooterTemplate(popupEle);
          }
          document.body.appendChild(popupEle);
          popupEle.style.top = "0px";
          if (_this.enableVirtualization && _this.itemTemplate) {
            var listitems = popupEle.querySelectorAll("li.e-list-item:not(.e-virtual-list)");
            _this.listItemHeight = listitems.length > 0 ? Math.ceil(listitems[0].getBoundingClientRect().height) : 0;
          }
          if (_this.enableVirtualization && !_this.list.classList.contains(dropDownBaseClasses.noData)) {
            _this.getSkeletonCount();
            _this.skeletonCount = _this.totalItemCount < _this.itemCount * 2 ? 0 : _this.skeletonCount;
            if (!_this.list.querySelector(".e-virtual-ddl-content")) {
              _this.list.appendChild(_this.createElement("div", {
                className: "e-virtual-ddl-content",
                styles: _this.getTransformValues()
              })).appendChild(_this.list.querySelector(".e-list-parent"));
            } else {
              _this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = _this.getTransformValues();
            }
            _this.UpdateSkeleton();
            _this.liCollections = _this.list.querySelectorAll("." + dropDownBaseClasses.li);
            _this.virtualItemCount = _this.itemCount;
            if (!_this.list.querySelector(".e-virtual-ddl")) {
              var virualElement = _this.createElement("div", {
                id: _this.element.id + "_popup",
                className: "e-virtual-ddl",
                styles: _this.GetVirtualTrackHeight()
              });
              popupEle.querySelector(".e-dropdownbase").appendChild(virualElement);
            } else {
              _this.list.getElementsByClassName("e-virtual-ddl")[0].style = _this.GetVirtualTrackHeight();
            }
          }
          popupEle.style.visibility = "hidden";
          if (_this.popupHeight !== "auto") {
            _this.searchBoxHeight = 0;
            if (!isNullOrUndefined(searchBox.container) && _this.getModuleName() !== "combobox" && _this.getModuleName() !== "autocomplete") {
              _this.searchBoxHeight = searchBox.container.parentElement.getBoundingClientRect().height;
              _this.listContainerHeight = (parseInt(_this.listContainerHeight, 10) - _this.searchBoxHeight).toString() + "px";
            }
            if (_this.headerTemplate) {
              _this.header = _this.header ? _this.header : popupEle.querySelector(".e-ddl-header");
              var height = Math.round(_this.header.getBoundingClientRect().height);
              _this.listContainerHeight = (parseInt(_this.listContainerHeight, 10) - (height + _this.searchBoxHeight)).toString() + "px";
            }
            if (_this.footerTemplate) {
              _this.footer = _this.footer ? _this.footer : popupEle.querySelector(".e-ddl-footer");
              var height = Math.round(_this.footer.getBoundingClientRect().height);
              _this.listContainerHeight = (parseInt(_this.listContainerHeight, 10) - (height + _this.searchBoxHeight)).toString() + "px";
            }
            _this.list.style.maxHeight = (parseInt(_this.listContainerHeight, 10) - 2).toString() + "px";
            popupEle.style.maxHeight = formatUnit(_this.popupHeight);
          } else {
            popupEle.style.height = "auto";
          }
          var offsetValue = 0;
          var left = void 0;
          _this.isPreventScrollAction = true;
          if (!isNullOrUndefined(_this.selectedLI) && (!isNullOrUndefined(_this.activeIndex) && _this.activeIndex >= 0)) {
            _this.setScrollPosition();
          } else if (_this.enableVirtualization) {
            _this.setScrollPosition();
          } else {
            _this.list.scrollTop = 0;
          }
          if (Browser.isDevice && (!_this.allowFiltering && (_this.getModuleName() === "dropdownlist" || _this.isDropDownClick && _this.getModuleName() === "combobox"))) {
            offsetValue = _this.getOffsetValue(popupEle);
            var firstItem = _this.isEmptyList() ? _this.list : _this.liCollections[0];
            if (!isNullOrUndefined(_this.inputElement)) {
              left = -(parseInt(getComputedStyle(firstItem).textIndent, 10) - parseInt(getComputedStyle(_this.inputElement).paddingLeft, 10) + parseInt(getComputedStyle(_this.inputElement.parentElement).borderLeftWidth, 10));
            }
          }
          _this.createPopup(popupEle, offsetValue, left);
          _this.popupContentElement = _this.popupObj.element.querySelector(".e-content");
          _this.getFocusElement();
          _this.checkCollision(popupEle);
          if (Browser.isDevice) {
            if (parseInt(_this.popupWidth.toString(), 10) > window.outerWidth && !(_this.getModuleName() === "dropdownlist" && _this.allowFiltering)) {
              _this.popupObj.element.classList.add("e-wide-popup");
            }
            _this.popupObj.element.classList.add(dropDownListClasses.device);
            if (_this.getModuleName() === "dropdownlist" || _this.getModuleName() === "combobox" && !_this.allowFiltering && _this.isDropDownClick) {
              _this.popupObj.collision = { X: "fit", Y: "fit" };
            }
            if (_this.isFilterLayout()) {
              _this.popupObj.element.classList.add(dropDownListClasses.mobileFilter);
              _this.popupObj.position = { X: 0, Y: 0 };
              _this.popupObj.dataBind();
              attributes(_this.popupObj.element, { style: "left:0px;right:0px;top:0px;bottom:0px;" });
              addClass([document.body, _this.popupObj.element], dropDownListClasses.popupFullScreen);
              _this.setSearchBoxPosition();
              _this.backIconElement = searchBox.container.querySelector(".e-back-icon");
              _this.clearIconElement = searchBox.container.querySelector("." + dropDownListClasses.clearIcon);
              EventHandler.add(_this.backIconElement, "click", _this.clickOnBackIcon, _this);
              EventHandler.add(_this.clearIconElement, "click", _this.clearText, _this);
            }
          }
          popupEle.style.visibility = "visible";
          addClass([popupEle], "e-popup-close");
          var scrollParentElements = _this.popupObj.getScrollableParent(_this.inputWrapper.container);
          for (var _i = 0, scrollParentElements_1 = scrollParentElements; _i < scrollParentElements_1.length; _i++) {
            var element = scrollParentElements_1[_i];
            EventHandler.add(element, "scroll", _this.scrollHandler, _this);
          }
          if (!isNullOrUndefined(_this.list)) {
            _this.unWireListEvents();
            _this.wireListEvents();
          }
          _this.selectedElementID = _this.selectedLI ? _this.selectedLI.id : null;
          if (_this.enableVirtualization) {
            _this.notify("bindScrollEvent", {
              module: "VirtualScroll",
              component: _this.getModuleName(),
              enable: _this.enableVirtualization
            });
            setTimeout(function() {
              if (_this.value || _this.list.querySelector(".e-active")) {
                _this.updateSelectionList();
                if (_this.selectedValueInfo && _this.viewPortInfo && _this.viewPortInfo.offsets.top) {
                  _this.list.scrollTop = _this.viewPortInfo.offsets.top;
                } else {
                  _this.scrollBottom(true, true);
                }
              }
            }, 5);
          }
          attributes(_this.targetElement(), { "aria-expanded": "true", "aria-owns": _this.element.id + "_popup", "aria-controls": _this.element.id });
          if (_this.getModuleName() !== "dropdownlist" && _this.list.classList.contains("e-nodata")) {
            attributes(_this.targetElement(), { "aria-activedescendant": "no-record" });
            _this.popupContentElement.setAttribute("role", "status");
            _this.popupContentElement.setAttribute("id", "no-record");
          }
          _this.inputElement.setAttribute("aria-expanded", "true");
          _this.inputElement.setAttribute("aria-controls", _this.element.id + "_popup");
          var inputParent = _this.isFiltering() ? _this.filterInput.parentElement : _this.inputWrapper.container;
          addClass([inputParent], [dropDownListClasses.inputFocus]);
          var animModel = { name: "FadeIn", duration: 100 };
          _this.beforePopupOpen = true;
          var popupInstance = _this.popupObj;
          var eventArgs = { popup: popupInstance, event: e, cancel: false, animation: animModel };
          _this.trigger("open", eventArgs, function(eventArgs2) {
            if (!eventArgs2.cancel) {
              if (!isNullOrUndefined(_this.inputWrapper)) {
                addClass([_this.inputWrapper.container], [dropDownListClasses.iconAnimation]);
              }
              _this.renderReactTemplates();
              if (!isNullOrUndefined(_this.popupObj)) {
                _this.popupObj.show(new Animation(eventArgs2.animation), _this.zIndex === 1e3 ? _this.element : null);
              }
            } else {
              _this.beforePopupOpen = false;
              _this.destroyPopup();
            }
          });
        } else {
          _this.beforePopupOpen = false;
        }
      });
    };
    DropDownList2.prototype.checkCollision = function(popupEle) {
      if (!Browser.isDevice || Browser.isDevice && !(this.getModuleName() === "dropdownlist" || this.isDropDownClick)) {
        var collision = isCollide(popupEle);
        if (collision.length > 0) {
          popupEle.style.marginTop = -parseInt(getComputedStyle(popupEle).marginTop, 10) + "px";
        }
        this.popupObj.resolveCollision();
      }
    };
    DropDownList2.prototype.getOffsetValue = function(popupEle) {
      var popupStyles = getComputedStyle(popupEle);
      var borderTop = parseInt(popupStyles.borderTopWidth, 10);
      var borderBottom = parseInt(popupStyles.borderBottomWidth, 10);
      return this.setPopupPosition(borderTop + borderBottom);
    };
    DropDownList2.prototype.createPopup = function(element, offsetValue, left) {
      var _this = this;
      this.popupObj = new Popup(element, {
        width: this.setWidth(),
        targetType: "relative",
        relateTo: this.inputWrapper.container,
        collision: this.enableRtl ? { X: "fit", Y: "flip" } : { X: "flip", Y: "flip" },
        offsetY: offsetValue,
        enableRtl: this.enableRtl,
        offsetX: left,
        position: this.enableRtl ? { X: "right", Y: "bottom" } : { X: "left", Y: "bottom" },
        zIndex: this.zIndex,
        close: function() {
          if (!_this.isDocumentClick) {
            _this.focusDropDown();
          }
          if (_this.isReact) {
            _this.clearTemplate(["headerTemplate", "footerTemplate"]);
          }
          _this.isNotSearchList = false;
          _this.isDocumentClick = false;
          _this.destroyPopup();
          if (_this.isFiltering() && _this.actionCompleteData.list && _this.actionCompleteData.list[0]) {
            _this.isActive = true;
            if (_this.enableVirtualization) {
              _this.onActionComplete(_this.ulElement, _this.listData, null, true);
            } else {
              _this.onActionComplete(_this.actionCompleteData.ulElement, _this.actionCompleteData.list, null, true);
            }
          }
        },
        open: function() {
          EventHandler.add(document, "mousedown", _this.onDocumentClick, _this);
          _this.isPopupOpen = true;
          var actionList = _this.actionCompleteData && _this.actionCompleteData.ulElement && _this.actionCompleteData.ulElement.querySelector("li");
          var ulElement = _this.list.querySelector("ul li");
          if (!isNullOrUndefined(_this.ulElement) && !isNullOrUndefined(_this.ulElement.getElementsByClassName("e-item-focus")[0])) {
            attributes(_this.targetElement(), { "aria-activedescendant": _this.ulElement.getElementsByClassName("e-item-focus")[0].id });
          } else if (!isNullOrUndefined(_this.ulElement) && !isNullOrUndefined(_this.ulElement.getElementsByClassName("e-active")[0])) {
            attributes(_this.targetElement(), { "aria-activedescendant": _this.ulElement.getElementsByClassName("e-active")[0].id });
          }
          if (_this.isFiltering() && _this.itemTemplate && _this.element.tagName === _this.getNgDirective() && (actionList && ulElement && actionList.textContent !== ulElement.textContent) && _this.element.tagName !== "EJS-COMBOBOX") {
            _this.cloneElements();
          }
          if (_this.isFilterLayout()) {
            removeClass([_this.inputWrapper.container], [dropDownListClasses.inputFocus]);
            _this.isFilterFocus = true;
            _this.filterInput.focus();
            if (_this.inputWrapper.clearButton) {
              addClass([_this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
            }
          }
          _this.activeStateChange();
        },
        targetExitViewport: function() {
          if (!Browser.isDevice) {
            _this.hidePopup();
          }
        }
      });
    };
    DropDownList2.prototype.isEmptyList = function() {
      return !isNullOrUndefined(this.liCollections) && this.liCollections.length === 0;
    };
    DropDownList2.prototype.getFocusElement = function() {
    };
    DropDownList2.prototype.isFilterLayout = function() {
      return this.getModuleName() === "dropdownlist" && this.allowFiltering;
    };
    DropDownList2.prototype.scrollHandler = function() {
      if (Browser.isDevice && (this.getModuleName() === "dropdownlist" && !this.isFilterLayout() || this.getModuleName() === "combobox" && !this.allowFiltering && this.isDropDownClick)) {
        if (this.element && !this.isElementInViewport(this.element)) {
          this.hidePopup();
        }
      }
    };
    DropDownList2.prototype.isElementInViewport = function(element) {
      var elementRect = element.getBoundingClientRect();
      return elementRect.top >= 0 && elementRect.left >= 0 && elementRect.bottom <= window.innerHeight && elementRect.right <= window.innerWidth;
    };
    ;
    DropDownList2.prototype.setSearchBoxPosition = function() {
      var searchBoxHeight = this.filterInput.parentElement.getBoundingClientRect().height;
      this.popupObj.element.style.maxHeight = "100%";
      this.popupObj.element.style.width = "100%";
      this.list.style.maxHeight = window.innerHeight - searchBoxHeight + "px";
      this.list.style.height = window.innerHeight - searchBoxHeight + "px";
      var clearElement = this.filterInput.parentElement.querySelector("." + dropDownListClasses.clearIcon);
      detach(this.filterInput);
      clearElement.parentElement.insertBefore(this.filterInput, clearElement);
    };
    DropDownList2.prototype.setPopupPosition = function(border) {
      var offsetValue;
      var popupOffset = border;
      var selectedLI = this.list.querySelector("." + dropDownListClasses.focus) || this.selectedLI;
      var firstItem = this.isEmptyList() ? this.list : this.liCollections[0];
      var lastItem = this.isEmptyList() ? this.list : this.liCollections[this.getItems().length - 1];
      var liHeight = firstItem.getBoundingClientRect().height;
      this.listItemHeight = liHeight;
      var listHeight = this.list.offsetHeight / 2;
      var height = isNullOrUndefined(selectedLI) ? firstItem.offsetTop : selectedLI.offsetTop;
      var lastItemOffsetValue = lastItem.offsetTop;
      if (lastItemOffsetValue - listHeight < height && !isNullOrUndefined(this.liCollections) && this.liCollections.length > 0 && !isNullOrUndefined(selectedLI)) {
        var count = this.list.offsetHeight / liHeight;
        var paddingBottom = parseInt(getComputedStyle(this.list).paddingBottom, 10);
        offsetValue = (count - (this.liCollections.length - this.activeIndex)) * liHeight - popupOffset + paddingBottom;
        this.list.scrollTop = selectedLI.offsetTop;
      } else if (height > listHeight && !this.enableVirtualization) {
        offsetValue = listHeight - liHeight / 2;
        this.list.scrollTop = height - listHeight + liHeight / 2;
      } else {
        offsetValue = height;
      }
      var inputHeight = this.inputWrapper.container.offsetHeight;
      offsetValue = offsetValue + liHeight + popupOffset - (liHeight - inputHeight) / 2;
      return -offsetValue;
    };
    DropDownList2.prototype.setWidth = function() {
      var width = formatUnit(this.popupWidth);
      if (width.indexOf("%") > -1) {
        var inputWidth = this.inputWrapper.container.offsetWidth * parseFloat(width) / 100;
        width = inputWidth.toString() + "px";
      }
      if (Browser.isDevice && width.indexOf("px") > -1 && (!this.allowFiltering && (this.getModuleName() === "dropdownlist" || this.isDropDownClick && this.getModuleName() === "combobox"))) {
        var firstItem = this.isEmptyList() ? this.list : this.liCollections[0];
        width = parseInt(width, 10) + (parseInt(getComputedStyle(firstItem).textIndent, 10) - parseInt(getComputedStyle(this.inputElement).paddingLeft, 10) + parseInt(getComputedStyle(this.inputElement.parentElement).borderLeftWidth, 10)) * 2 + "px";
      }
      return width;
    };
    DropDownList2.prototype.scrollBottom = function(isInitial, isInitialSelection, keyAction) {
      var _this = this;
      if (isInitialSelection === void 0) {
        isInitialSelection = false;
      }
      if (keyAction === void 0) {
        keyAction = null;
      }
      if (isNullOrUndefined(this.selectedLI) && this.enableVirtualization) {
        this.selectedLI = this.list.querySelector("." + dropDownBaseClasses.li);
        if (!isNullOrUndefined(this.selectedLI) && this.selectedLI.classList.contains("e-virtual-list")) {
          this.selectedLI = this.liCollections[this.skeletonCount];
        }
      }
      if (!isNullOrUndefined(this.selectedLI)) {
        this.isUpwardScrolling = false;
        var virtualListCount = this.list.querySelectorAll(".e-virtual-list").length;
        var lastElementValue = this.list.querySelector("li:last-of-type") ? this.list.querySelector("li:last-of-type").getAttribute("data-value") : null;
        var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? this.selectedLI.offsetTop + this.virtualListInfo.startIndex * this.selectedLI.offsetHeight : this.selectedLI.offsetTop;
        var currentOffset = this.list.offsetHeight;
        var nextBottom = selectedLiOffsetTop - virtualListCount * this.selectedLI.offsetHeight + this.selectedLI.offsetHeight - this.list.scrollTop;
        var nextOffset = this.list.scrollTop + nextBottom - currentOffset;
        var isScrollerCHanged = false;
        var isScrollTopChanged = false;
        nextOffset = isInitial ? nextOffset + parseInt(getComputedStyle(this.list).paddingTop, 10) * 2 : nextOffset + parseInt(getComputedStyle(this.list).paddingTop, 10);
        var boxRange = selectedLiOffsetTop - virtualListCount * this.selectedLI.offsetHeight + this.selectedLI.offsetHeight - this.list.scrollTop;
        boxRange = this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ? boxRange - this.fixedHeaderElement.offsetHeight : boxRange;
        if (this.activeIndex === 0 && !this.enableVirtualization) {
          this.list.scrollTop = 0;
          isScrollerCHanged = this.isKeyBoardAction;
        } else if (nextBottom > currentOffset || !(boxRange > 0 && this.list.offsetHeight > boxRange)) {
          var currentElementValue = this.selectedLI ? this.selectedLI.getAttribute("data-value") : null;
          var liCount = keyAction == "pageDown" ? this.getPageCount() - 2 : 1;
          if (!this.enableVirtualization || this.isKeyBoardAction || isInitialSelection) {
            if (this.isKeyBoardAction && this.enableVirtualization && lastElementValue && currentElementValue === lastElementValue && keyAction != "end" && !this.isVirtualScrolling) {
              this.isPreventKeyAction = true;
              if (this.enableVirtualization && this.itemTemplate) {
                this.list.scrollTop += nextOffset;
              } else {
                if (this.enableVirtualization) {
                  liCount = keyAction == "pageDown" ? this.getPageCount() + 1 : liCount;
                }
                this.list.scrollTop += this.selectedLI.offsetHeight * liCount;
              }
              this.isPreventKeyAction = this.IsScrollerAtEnd() ? false : this.isPreventKeyAction;
              this.isKeyBoardAction = false;
              this.isPreventScrollAction = false;
            } else if (this.enableVirtualization && keyAction == "end") {
              this.isPreventKeyAction = false;
              this.isKeyBoardAction = false;
              this.isPreventScrollAction = false;
              this.list.scrollTop = this.list.scrollHeight;
            } else {
              if (keyAction == "pageDown" && this.enableVirtualization && !this.isVirtualScrolling) {
                this.isPreventKeyAction = false;
                this.isKeyBoardAction = false;
                this.isPreventScrollAction = false;
              }
              this.list.scrollTop = nextOffset;
            }
          } else {
            this.list.scrollTop = this.virtualListInfo && this.virtualListInfo.startIndex ? this.virtualListInfo.startIndex * this.listItemHeight : 0;
          }
          isScrollerCHanged = this.isKeyBoardAction;
          isScrollTopChanged = true;
        }
        this.isKeyBoardAction = isScrollerCHanged;
        if (this.enableVirtualization && this.fields.groupBy && this.fixedHeaderElement && keyAction == "down") {
          setTimeout(function() {
            _this.scrollStop(null, true);
          }, 100);
        }
      }
    };
    DropDownList2.prototype.scrollTop = function(keyAction) {
      if (keyAction === void 0) {
        keyAction = null;
      }
      if (!isNullOrUndefined(this.selectedLI)) {
        var virtualListCount = this.list.querySelectorAll(".e-virtual-list").length;
        var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? this.selectedLI.offsetTop + this.virtualListInfo.startIndex * this.selectedLI.offsetHeight : this.selectedLI.offsetTop;
        var nextOffset = selectedLiOffsetTop - virtualListCount * this.selectedLI.offsetHeight - this.list.scrollTop;
        var firstElementValue = this.list.querySelector("li.e-list-item:not(.e-virtual-list)") ? this.list.querySelector("li.e-list-item:not(.e-virtual-list)").getAttribute("data-value") : null;
        nextOffset = this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ? nextOffset - this.fixedHeaderElement.offsetHeight : nextOffset;
        var boxRange = selectedLiOffsetTop - virtualListCount * this.selectedLI.offsetHeight + this.selectedLI.offsetHeight - this.list.scrollTop;
        var isPageUpKeyAction = this.enableVirtualization && this.getModuleName() === "autocomplete" && nextOffset <= 0;
        if (this.activeIndex === 0 && !this.enableVirtualization) {
          this.list.scrollTop = 0;
        } else if (nextOffset < 0 || isPageUpKeyAction) {
          var currentElementValue = this.selectedLI ? this.selectedLI.getAttribute("data-value") : null;
          var liCount = keyAction == "pageUp" ? this.getPageCount() - 2 : 1;
          if (this.enableVirtualization) {
            liCount = keyAction == "pageUp" ? this.getPageCount() : liCount;
          }
          if (this.enableVirtualization && this.isKeyBoardAction && firstElementValue && currentElementValue === firstElementValue && keyAction != "home" && !this.isVirtualScrolling) {
            this.isUpwardScrolling = true;
            this.isPreventKeyAction = true;
            this.list.scrollTop -= this.selectedLI.offsetHeight * liCount;
            this.isPreventKeyAction = this.list.scrollTop != 0 ? this.isPreventKeyAction : false;
            this.isKeyBoardAction = false;
            this.isPreventScrollAction = false;
          } else if (this.enableVirtualization && keyAction == "home") {
            this.isPreventScrollAction = false;
            this.isPreventKeyAction = true;
            this.isKeyBoardAction = false;
            this.list.scrollTo(0, 0);
          } else {
            if (keyAction == "pageUp" && this.enableVirtualization && !this.isVirtualScrolling) {
              this.isPreventKeyAction = false;
              this.isKeyBoardAction = false;
              this.isPreventScrollAction = false;
            }
            this.list.scrollTop = this.list.scrollTop + nextOffset;
          }
        } else if (!(boxRange > 0 && this.list.offsetHeight > boxRange)) {
          this.list.scrollTop = this.selectedLI.offsetTop - (this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ? this.fixedHeaderElement.offsetHeight : 0);
        }
      }
    };
    DropDownList2.prototype.isEditTextBox = function() {
      return false;
    };
    DropDownList2.prototype.isFiltering = function() {
      return this.allowFiltering;
    };
    DropDownList2.prototype.isPopupButton = function() {
      return true;
    };
    DropDownList2.prototype.setScrollPosition = function(e) {
      this.isPreventScrollAction = true;
      if (!isNullOrUndefined(e)) {
        switch (e.action) {
          case "pageDown":
          case "down":
          case "end":
            this.isKeyBoardAction = true;
            this.scrollBottom(false, false, e.action);
            break;
          default:
            this.isKeyBoardAction = e.action == "up" || e.action == "pageUp" || e.action == "open";
            this.scrollTop(e.action);
            break;
        }
      } else {
        this.scrollBottom(true);
      }
      this.isKeyBoardAction = false;
    };
    DropDownList2.prototype.clearText = function() {
      this.filterInput.value = this.typedString = "";
      this.searchLists(null);
      if (this.enableVirtualization) {
        this.list.scrollTop = 0;
        this.totalItemCount = this.dataCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
        if (this.list.getElementsByClassName("e-virtual-ddl")[0]) {
          this.list.getElementsByClassName("e-virtual-ddl")[0].style = this.GetVirtualTrackHeight();
        }
        this.getSkeletonCount();
        this.UpdateSkeleton();
        this.liCollections = this.list.querySelectorAll(".e-list-item");
        if (this.list.getElementsByClassName("e-virtual-ddl-content")[0]) {
          this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
        }
      }
    };
    DropDownList2.prototype.setEleWidth = function(width) {
      if (!isNullOrUndefined(width)) {
        if (typeof width === "number") {
          this.inputWrapper.container.style.width = formatUnit(width);
        } else if (typeof width === "string") {
          this.inputWrapper.container.style.width = width.match(/px|%|em/) ? width : formatUnit(width);
        }
      }
    };
    DropDownList2.prototype.closePopup = function(delay, e) {
      var _this = this;
      var isFilterValue = !isNullOrUndefined(this.filterInput) && !isNullOrUndefined(this.filterInput.value) && this.filterInput.value !== "";
      var typedString = this.getModuleName() === "combobox" ? this.typedString : null;
      this.isTyped = false;
      this.isVirtualTrackHeight = false;
      if (!(this.popupObj && document.body.contains(this.popupObj.element) && this.beforePopupOpen)) {
        return;
      }
      this.keyboardEvent = null;
      EventHandler.remove(document, "mousedown", this.onDocumentClick);
      this.isActive = false;
      if (this.getModuleName() === "dropdownlist") {
        Input.destroy({
          element: this.filterInput,
          floatLabelType: this.floatLabelType,
          properties: { placeholder: this.filterBarPlaceholder },
          buttons: this.clearIconElement
        }, this.clearIconElement);
      }
      this.filterInputObj = null;
      this.isDropDownClick = false;
      this.preventAutoFill = false;
      var scrollableParentElements = this.popupObj.getScrollableParent(this.inputWrapper.container);
      for (var _i = 0, scrollableParentElements_1 = scrollableParentElements; _i < scrollableParentElements_1.length; _i++) {
        var element = scrollableParentElements_1[_i];
        EventHandler.remove(element, "scroll", this.scrollHandler);
      }
      if (Browser.isDevice && this.isFilterLayout()) {
        removeClass([document.body, this.popupObj.element], dropDownListClasses.popupFullScreen);
      }
      if (this.isFilterLayout()) {
        if (!Browser.isDevice) {
          this.searchKeyModule.destroy();
          if (this.clearIconElement) {
            EventHandler.remove(this.clearIconElement, "click", this.clearText);
          }
        }
        if (this.backIconElement) {
          EventHandler.remove(this.backIconElement, "click", this.clickOnBackIcon);
          EventHandler.remove(this.clearIconElement, "click", this.clearText);
        }
        if (!isNullOrUndefined(this.filterInput)) {
          EventHandler.remove(this.filterInput, "input", this.onInput);
          EventHandler.remove(this.filterInput, "keyup", this.onFilterUp);
          EventHandler.remove(this.filterInput, "keydown", this.onFilterDown);
          EventHandler.remove(this.filterInput, "blur", this.onBlurHandler);
          EventHandler.remove(this.filterInput, "paste", this.pasteHandler);
        }
        if (this.allowFiltering && this.getModuleName() === "dropdownlist") {
          this.filterInput.removeAttribute("aria-activedescendant");
          this.filterInput.removeAttribute("aria-disabled");
          this.filterInput.removeAttribute("role");
          this.filterInput.removeAttribute("autocomplete");
          this.filterInput.removeAttribute("autocapitalize");
          this.filterInput.removeAttribute("spellcheck");
        }
        this.filterInput = null;
      }
      attributes(this.targetElement(), { "aria-expanded": "false" });
      this.inputElement.setAttribute("aria-expanded", "false");
      this.targetElement().removeAttribute("aria-owns");
      this.targetElement().removeAttribute("aria-activedescendant");
      this.inputWrapper.container.classList.remove(dropDownListClasses.iconAnimation);
      if (this.isFiltering()) {
        this.actionCompleteData.isUpdated = false;
      }
      if (this.enableVirtualization) {
        if (this.value == null || this.isTyped) {
          this.viewPortInfo.endIndex = this.viewPortInfo && this.viewPortInfo.endIndex > 0 ? this.viewPortInfo.endIndex : this.itemCount;
          if (this.getModuleName() === "autocomplete" || this.getModuleName() === "dropdownlist" && !isNullOrUndefined(this.typedString) && this.typedString != "" || this.getModuleName() === "combobox" && this.allowFiltering && !isNullOrUndefined(this.typedString) && this.typedString != "") {
            this.checkAndResetCache();
          }
        } else if (this.getModuleName() === "autocomplete") {
          this.checkAndResetCache();
        }
        if ((this.getModuleName() === "dropdownlist" || this.getModuleName() === "combobox") && !(this.skeletonCount == 0)) {
          this.getSkeletonCount(true);
        }
      }
      this.beforePopupOpen = false;
      var animModel = {
        name: "FadeOut",
        duration: 100,
        delay: delay ? delay : 0
      };
      var popupInstance = this.popupObj;
      var eventArgs = { popup: popupInstance, cancel: false, animation: animModel, event: e || null };
      this.trigger("close", eventArgs, function(eventArgs2) {
        if (!isNullOrUndefined(_this.popupObj) && !isNullOrUndefined(_this.popupObj.element.querySelector(".e-fixed-head"))) {
          var fixedHeader = _this.popupObj.element.querySelector(".e-fixed-head");
          fixedHeader.parentNode.removeChild(fixedHeader);
          _this.fixedHeaderElement = null;
        }
        if (!eventArgs2.cancel) {
          if (_this.getModuleName() === "autocomplete") {
            _this.rippleFun();
          }
          if (_this.isPopupOpen) {
            _this.popupObj.hide(new Animation(eventArgs2.animation));
          } else {
            _this.destroyPopup();
          }
        }
      });
      if (Browser.isDevice && !eventArgs.cancel && this.popupObj.element.classList.contains("e-wide-popup")) {
        this.popupObj.element.classList.remove("e-wide-popup");
      }
      var dataSourceCount;
      if (this.dataSource instanceof DataManager) {
        dataSourceCount = this.virtualGroupDataSource && this.virtualGroupDataSource.length ? this.virtualGroupDataSource.length : 0;
      } else {
        dataSourceCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
      }
      if (this.enableVirtualization && this.isFiltering() && isFilterValue && this.totalItemCount !== dataSourceCount) {
        this.updateInitialData();
        this.checkAndResetCache();
      }
    };
    DropDownList2.prototype.updateInitialData = function() {
      var currentData = this.selectData;
      var ulElement = this.renderItems(currentData, this.fields);
      this.list.scrollTop = 0;
      this.virtualListInfo = {
        currentPageNumber: null,
        direction: null,
        sentinelInfo: {},
        offsets: {},
        startIndex: 0,
        endIndex: this.itemCount
      };
      if (this.getModuleName() === "combobox") {
        this.typedString = "";
      }
      this.previousStartIndex = 0;
      this.previousEndIndex = 0;
      if (this.dataSource instanceof DataManager) {
        if (this.remoteDataCount >= 0) {
          this.totalItemCount = this.dataCount = this.remoteDataCount;
        } else {
          this.resetList(this.dataSource);
        }
      } else {
        this.totalItemCount = this.dataCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
      }
      if (this.list.getElementsByClassName("e-virtual-ddl")[0]) {
        this.list.getElementsByClassName("e-virtual-ddl")[0].style = this.GetVirtualTrackHeight();
      }
      if (this.getModuleName() !== "autocomplete" && this.totalItemCount != 0 && this.totalItemCount > this.itemCount * 2) {
        this.getSkeletonCount();
      }
      this.UpdateSkeleton();
      this.listData = currentData;
      this.updateActionCompleteDataValues(ulElement, currentData);
      this.liCollections = this.list.querySelectorAll(".e-list-item");
      if (this.list.getElementsByClassName("e-virtual-ddl-content")[0]) {
        this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
      }
    };
    DropDownList2.prototype.destroyPopup = function() {
      this.isPopupOpen = false;
      this.isFilterFocus = false;
      this.inputElement.removeAttribute("aria-controls");
      if (this.popupObj) {
        this.popupObj.destroy();
        detach(this.popupObj.element);
      }
    };
    DropDownList2.prototype.clickOnBackIcon = function() {
      this.hidePopup();
      this.focusIn();
    };
    DropDownList2.prototype.render = function() {
      this.preselectedIndex = !isNullOrUndefined(this.index) ? this.index : null;
      if (this.element.tagName === "INPUT") {
        this.inputElement = this.element;
        if (isNullOrUndefined(this.inputElement.getAttribute("role"))) {
          this.inputElement.setAttribute("role", "combobox");
        }
        if (isNullOrUndefined(this.inputElement.getAttribute("type"))) {
          this.inputElement.setAttribute("type", "text");
        }
        this.inputElement.setAttribute("aria-expanded", "false");
      } else {
        this.inputElement = this.createElement("input", { attrs: { role: "combobox", type: "text" } });
        if (this.element.tagName !== this.getNgDirective()) {
          this.element.style.display = "none";
        }
        this.element.parentElement.insertBefore(this.inputElement, this.element);
        this.preventTabIndex(this.inputElement);
      }
      var updatedCssClassValues = this.cssClass;
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        updatedCssClassValues = this.cssClass.replace(/\s+/g, " ").trim();
      }
      if (!isNullOrUndefined(closest(this.element, "fieldset")) && closest(this.element, "fieldset").disabled) {
        this.enabled = false;
      }
      this.inputWrapper = Input.createInput({
        element: this.inputElement,
        buttons: this.isPopupButton() ? [dropDownListClasses.icon] : null,
        floatLabelType: this.floatLabelType,
        properties: {
          readonly: this.getModuleName() === "dropdownlist" ? true : this.readonly,
          placeholder: this.placeholder,
          cssClass: updatedCssClassValues,
          enabled: this.enabled,
          enableRtl: this.enableRtl,
          showClearButton: this.showClearButton
        }
      }, this.createElement);
      if (this.element.tagName === this.getNgDirective()) {
        this.element.appendChild(this.inputWrapper.container);
      } else {
        this.inputElement.parentElement.insertBefore(this.element, this.inputElement);
      }
      this.hiddenElement = this.createElement("select", {
        attrs: { "aria-hidden": "true", "aria-label": this.getModuleName(), "tabindex": "-1", "class": dropDownListClasses.hiddenElement }
      });
      prepend([this.hiddenElement], this.inputWrapper.container);
      this.validationAttribute(this.element, this.hiddenElement);
      this.setReadOnly();
      this.setFields();
      this.inputWrapper.container.style.width = formatUnit(this.width);
      this.inputWrapper.container.classList.add("e-ddl");
      if (this.floatLabelType !== "Never") {
        Input.calculateWidth(this.inputElement, this.inputWrapper.container);
      }
      if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && this.inputWrapper.container.getElementsByClassName("e-float-text-content")[0] && this.floatLabelType !== "Never") {
        this.inputWrapper.container.getElementsByClassName("e-float-text-content")[0].classList.add("e-icon");
      }
      this.wireEvent();
      this.tabIndex = this.element.hasAttribute("tabindex") ? this.element.getAttribute("tabindex") : "0";
      this.element.removeAttribute("tabindex");
      var id = this.element.getAttribute("id") ? this.element.getAttribute("id") : getUniqueID("ej2_dropdownlist");
      this.element.id = id;
      this.hiddenElement.id = id + "_hidden";
      this.targetElement().setAttribute("tabindex", this.tabIndex);
      if ((this.getModuleName() === "autocomplete" || this.getModuleName() === "combobox") && !this.readonly) {
        this.inputElement.setAttribute("aria-label", this.getModuleName());
      } else if (this.getModuleName() === "dropdownlist") {
        attributes(this.targetElement(), { "aria-label": this.getModuleName() });
        this.inputElement.setAttribute("aria-label", this.getModuleName());
        this.inputElement.setAttribute("aria-expanded", "false");
      }
      attributes(this.targetElement(), this.getAriaAttributes());
      this.updateDataAttribute(this.htmlAttributes);
      this.setHTMLAttributes();
      if (this.targetElement() === this.inputElement) {
        this.inputElement.removeAttribute("aria-labelledby");
      }
      if (this.value !== null || this.activeIndex !== null || this.text !== null) {
        if (this.enableVirtualization) {
          this.listItemHeight = this.getListHeight();
          this.getSkeletonCount();
          this.updateVirtualizationProperties(this.itemCount, this.allowFiltering);
          if (this.index !== null) {
            this.activeIndex = this.index + this.skeletonCount;
          }
        }
        this.initValue();
        this.selectedValueInfo = this.viewPortInfo;
        if (this.enableVirtualization) {
          this.activeIndex = this.activeIndex + this.skeletonCount;
        }
      } else if (this.element.tagName === "SELECT" && this.element.options[0]) {
        var selectElement = this.element;
        this.value = this.allowObjectBinding ? this.getDataByValue(selectElement.options[selectElement.selectedIndex].value) : selectElement.options[selectElement.selectedIndex].value;
        this.text = isNullOrUndefined(this.value) ? null : selectElement.options[selectElement.selectedIndex].textContent;
        this.initValue();
      }
      this.setEnabled();
      this.preventTabIndex(this.element);
      if (!this.enabled) {
        this.targetElement().tabIndex = -1;
      }
      this.initial = false;
      this.element.style.opacity = "";
      this.inputElement.onselect = function(e) {
        e.stopImmediatePropagation();
      };
      this.inputElement.onchange = function(e) {
        e.stopImmediatePropagation();
      };
      if (this.element.hasAttribute("autofocus")) {
        this.focusIn();
      }
      if (!isNullOrUndefined(this.text)) {
        this.inputElement.setAttribute("value", this.text);
      }
      if (this.element.hasAttribute("data-val")) {
        this.element.setAttribute("data-val", "false");
      }
      var floatLabelElement = this.inputWrapper.container.getElementsByClassName("e-float-text")[0];
      if (!isNullOrUndefined(this.element.id) && this.element.id !== "" && !isNullOrUndefined(floatLabelElement)) {
        floatLabelElement.id = "label_" + this.element.id.replace(/ /g, "_");
        attributes(this.inputElement, { "aria-labelledby": floatLabelElement.id });
      }
      this.renderComplete();
      this.listItemHeight = this.getListHeight();
      this.getSkeletonCount();
      if (this.enableVirtualization) {
        this.updateVirtualizationProperties(this.itemCount, this.allowFiltering);
      }
      this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
      this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.viewPortInfo.startIndex > 0 ? this.viewPortInfo.endIndex : this.itemCount;
    };
    DropDownList2.prototype.getListHeight = function() {
      var listParent = this.createElement("div", {
        className: "e-dropdownbase"
      });
      var item = this.createElement("li", {
        className: "e-list-item"
      });
      var listParentHeight = formatUnit(this.popupHeight);
      listParent.style.height = parseInt(listParentHeight, 10).toString() + "px";
      listParent.appendChild(item);
      document.body.appendChild(listParent);
      this.virtualListHeight = listParent.getBoundingClientRect().height;
      var listItemHeight = Math.ceil(item.getBoundingClientRect().height);
      listParent.remove();
      return listItemHeight;
    };
    DropDownList2.prototype.setFooterTemplate = function(popupEle) {
      var compiledString;
      if (this.footer) {
        if (this.isReact && typeof this.footerTemplate === "function") {
          this.clearTemplate(["footerTemplate"]);
        } else {
          this.footer.innerHTML = "";
        }
      } else {
        this.footer = this.createElement("div");
        addClass([this.footer], dropDownListClasses.footer);
      }
      var footercheck = this.dropdownCompiler(this.footerTemplate);
      if (typeof this.footerTemplate !== "function" && footercheck) {
        compiledString = compile(select(this.footerTemplate, document).innerHTML.trim());
      } else {
        compiledString = compile(this.footerTemplate);
      }
      var footerCompTemp = compiledString({}, this, "footerTemplate", this.footerTemplateId, this.isStringTemplate, null, this.footer);
      if (footerCompTemp && footerCompTemp.length > 0) {
        append(footerCompTemp, this.footer);
      }
      append([this.footer], popupEle);
    };
    DropDownList2.prototype.setHeaderTemplate = function(popupEle) {
      var compiledString;
      if (this.header) {
        this.header.innerHTML = "";
      } else {
        this.header = this.createElement("div");
        addClass([this.header], dropDownListClasses.header);
      }
      var headercheck = this.dropdownCompiler(this.headerTemplate);
      if (typeof this.headerTemplate !== "function" && headercheck) {
        compiledString = compile(select(this.headerTemplate, document).innerHTML.trim());
      } else {
        compiledString = compile(this.headerTemplate);
      }
      var headerCompTemp = compiledString({}, this, "headerTemplate", this.headerTemplateId, this.isStringTemplate, null, this.header);
      if (headerCompTemp && headerCompTemp.length) {
        append(headerCompTemp, this.header);
      }
      var contentEle = popupEle.querySelector("div.e-content");
      popupEle.insertBefore(this.header, contentEle);
    };
    DropDownList2.prototype.setEnabled = function() {
      this.element.setAttribute("aria-disabled", this.enabled ? "false" : "true");
    };
    DropDownList2.prototype.setOldText = function(text) {
      this.text = text;
    };
    DropDownList2.prototype.setOldValue = function(value) {
      this.value = value;
    };
    DropDownList2.prototype.refreshPopup = function() {
      if (!isNullOrUndefined(this.popupObj) && document.body.contains(this.popupObj.element) && (this.allowFiltering && !(Browser.isDevice && this.isFilterLayout()) || this.getModuleName() === "autocomplete")) {
        removeClass([this.popupObj.element], "e-popup-close");
        this.popupObj.refreshPosition(this.inputWrapper.container);
        this.popupObj.resolveCollision();
      }
    };
    DropDownList2.prototype.checkData = function(newProp) {
      if (newProp.dataSource && !isNullOrUndefined(Object.keys(newProp.dataSource)) && this.itemTemplate && this.allowFiltering && !(this.isListSearched && newProp.dataSource instanceof DataManager)) {
        if (this.list && !this.isReact) {
          this.list.innerHTML = "";
        } else {
          this.list = null;
        }
        this.actionCompleteData = { ulElement: null, list: null, isUpdated: false };
      }
      this.isListSearched = false;
      var isChangeValue = Object.keys(newProp).indexOf("value") !== -1 && isNullOrUndefined(newProp.value);
      var isChangeText = Object.keys(newProp).indexOf("text") !== -1 && isNullOrUndefined(newProp.text);
      if (this.getModuleName() !== "autocomplete" && this.allowFiltering && (isChangeValue || isChangeText)) {
        this.itemData = null;
      }
      if (this.allowFiltering && newProp.dataSource && !isNullOrUndefined(Object.keys(newProp.dataSource))) {
        this.actionCompleteData = { ulElement: null, list: null, isUpdated: false };
        this.actionData = this.actionCompleteData;
      } else if (this.allowFiltering && newProp.query && !isNullOrUndefined(Object.keys(newProp.query))) {
        this.actionCompleteData = this.getModuleName() === "combobox" ? { ulElement: null, list: null, isUpdated: false } : this.actionCompleteData;
        this.actionData = this.actionCompleteData;
      }
    };
    DropDownList2.prototype.updateDataSource = function(props, oldProps) {
      if (this.inputElement.value !== "" || !isNullOrUndefined(props) && (isNullOrUndefined(props.dataSource) || !(props.dataSource instanceof DataManager) && props.dataSource.length === 0)) {
        this.clearAll(null, props);
      }
      if (this.fields.groupBy && props.fields && !this.isGroupChecking && this.list) {
        EventHandler.remove(this.list, "scroll", this.setFloatingHeader);
        EventHandler.add(this.list, "scroll", this.setFloatingHeader, this);
      }
      if (!(!isNullOrUndefined(props) && (isNullOrUndefined(props.dataSource) || !(props.dataSource instanceof DataManager) && props.dataSource.length === 0)) || (props.dataSource instanceof DataManager || !isNullOrUndefined(props) && Array.isArray(props.dataSource) && !isNullOrUndefined(oldProps) && Array.isArray(oldProps.dataSource) && props.dataSource.length !== oldProps.dataSource.length)) {
        this.typedString = "";
        this.resetList(this.dataSource);
      }
      if (!this.isCustomFilter && !this.isFilterFocus && document.activeElement !== this.filterInput) {
        this.checkCustomValue();
      }
    };
    DropDownList2.prototype.checkCustomValue = function() {
      var currentValue = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
      this.itemData = this.getDataByValue(currentValue);
      var dataItem = this.getItemData();
      var value = this.allowObjectBinding ? this.itemData : dataItem.value;
      var index = isNullOrUndefined(value) ? null : this.index;
      if (isNullOrUndefined(index) && currentValue == value) {
        this.setProperties({ "text": dataItem.text, "value": value });
      } else {
        this.setProperties({ "text": dataItem.text, "index": index, "value": value });
      }
    };
    DropDownList2.prototype.updateInputFields = function() {
      if (this.getModuleName() === "dropdownlist") {
        Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
      }
    };
    DropDownList2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var _this = this;
      if (!isNullOrUndefined(newProp.dataSource) && !this.isTouched && (isNullOrUndefined(newProp.value) && isNullOrUndefined(newProp.index)) && !isNullOrUndefined(this.preselectedIndex) && !isNullOrUndefined(this.index)) {
        newProp.index = this.index;
      }
      if (!isNullOrUndefined(newProp.value) || !isNullOrUndefined(newProp.index)) {
        this.isTouched = true;
      }
      if (this.getModuleName() === "dropdownlist") {
        this.checkData(newProp);
        this.setUpdateInitial(["fields", "query", "dataSource"], newProp);
      }
      var _loop_1 = function(prop2) {
        switch (prop2) {
          case "query":
          case "dataSource":
            this_1.getSkeletonCount();
            this_1.checkAndResetCache();
            break;
          case "htmlAttributes":
            this_1.setHTMLAttributes();
            break;
          case "width":
            this_1.setEleWidth(newProp.width);
            Input.calculateWidth(this_1.inputElement, this_1.inputWrapper.container);
            break;
          case "placeholder":
            Input.setPlaceholder(newProp.placeholder, this_1.inputElement);
            break;
          case "filterBarPlaceholder":
            if (this_1.filterInput) {
              Input.setPlaceholder(newProp.filterBarPlaceholder, this_1.filterInput);
            }
            break;
          case "readonly":
            if (this_1.getModuleName() !== "dropdownlist") {
              Input.setReadonly(newProp.readonly, this_1.inputElement);
            }
            this_1.setReadOnly();
            break;
          case "cssClass":
            this_1.setCssClass(newProp.cssClass, oldProp.cssClass);
            Input.calculateWidth(this_1.inputElement, this_1.inputWrapper.container);
            break;
          case "enableRtl":
            this_1.setEnableRtl();
            break;
          case "enabled":
            this_1.setEnable();
            break;
          case "text":
            if (this_1.fields.disabled) {
              newProp.text = newProp.text && !this_1.isDisabledItemByIndex(this_1.getIndexByValue(this_1.getValueByText(newProp.text))) ? newProp.text : null;
            }
            if (newProp.text === null) {
              this_1.clearAll();
              break;
            }
            if (this_1.enableVirtualization) {
              this_1.updateValues();
              this_1.updateInputFields();
              this_1.notify("setCurrentViewDataAsync", {
                module: "VirtualScroll"
              });
              break;
            }
            if (!this_1.list) {
              if (this_1.dataSource instanceof DataManager) {
                this_1.initialRemoteRender = true;
              }
              this_1.renderList();
            }
            if (!this_1.initialRemoteRender) {
              var li = this_1.getElementByText(newProp.text);
              if (!this_1.checkValidLi(li)) {
                if (this_1.liCollections && this_1.liCollections.length === 100 && this_1.getModuleName() === "autocomplete" && this_1.listData.length > 100) {
                  this_1.setSelectionData(newProp.text, oldProp.text, "text");
                } else if (newProp.text && this_1.dataSource instanceof DataManager) {
                  var listLength_1 = this_1.getItems().length;
                  var checkField = isNullOrUndefined(this_1.fields.text) ? this_1.fields.value : this_1.fields.text;
                  this_1.typedString = "";
                  this_1.dataSource.executeQuery(this_1.getQuery(this_1.query).where(new Predicate(checkField, "equal", newProp.text))).then(function(e) {
                    if (e.result.length > 0) {
                      _this.addItem(e.result, listLength_1);
                      _this.updateValues();
                    } else {
                      _this.setOldText(oldProp.text);
                    }
                  });
                } else if (this_1.getModuleName() === "autocomplete") {
                  this_1.setInputValue(newProp, oldProp);
                } else {
                  this_1.setOldText(oldProp.text);
                }
              }
              this_1.updateInputFields();
            }
            break;
          case "value":
            if (this_1.fields.disabled) {
              newProp.value = newProp.value != null && !this_1.isDisableItemValue(newProp.value) ? newProp.value : null;
            }
            if (newProp.value === null) {
              this_1.clearAll();
              break;
            }
            if (this_1.allowObjectBinding && !isNullOrUndefined(newProp.value) && !isNullOrUndefined(oldProp.value) && this_1.isObjectInArray(newProp.value, [oldProp.value])) {
              return { value: void 0 };
            }
            if (this_1.enableVirtualization) {
              this_1.updateValues();
              this_1.updateInputFields();
              this_1.notify("setCurrentViewDataAsync", {
                module: "VirtualScroll"
              });
              this_1.preventChange = this_1.isAngular && this_1.preventChange ? !this_1.preventChange : this_1.preventChange;
              break;
            }
            this_1.notify("beforeValueChange", { newProp });
            if (!this_1.list) {
              if (this_1.dataSource instanceof DataManager) {
                this_1.initialRemoteRender = true;
              }
              this_1.renderList();
            }
            if (!this_1.initialRemoteRender) {
              var value = this_1.allowObjectBinding && !isNullOrUndefined(newProp.value) ? getValue(this_1.fields.value ? this_1.fields.value : "", newProp.value) : newProp.value;
              var item = this_1.getElementByValue(value);
              if (!this_1.checkValidLi(item)) {
                if (this_1.liCollections && this_1.liCollections.length === 100 && this_1.getModuleName() === "autocomplete" && this_1.listData.length > 100) {
                  this_1.setSelectionData(newProp.value, oldProp.value, "value");
                } else if (newProp.value && this_1.dataSource instanceof DataManager) {
                  var listLength_2 = this_1.getItems().length;
                  var checkField = isNullOrUndefined(this_1.fields.value) ? this_1.fields.text : this_1.fields.value;
                  this_1.typedString = "";
                  var value_7 = this_1.allowObjectBinding && !isNullOrUndefined(newProp.value) ? getValue(checkField, newProp.value) : newProp.value;
                  this_1.dataSource.executeQuery(this_1.getQuery(this_1.query).where(new Predicate(checkField, "equal", value_7))).then(function(e) {
                    if (e.result.length > 0) {
                      _this.addItem(e.result, listLength_2);
                      _this.updateValues();
                    } else {
                      _this.setOldValue(oldProp.value);
                    }
                  });
                } else if (this_1.getModuleName() === "autocomplete") {
                  this_1.setInputValue(newProp, oldProp);
                } else {
                  this_1.setOldValue(oldProp.value);
                }
              }
              this_1.updateInputFields();
              this_1.preventChange = this_1.isAngular && this_1.preventChange ? !this_1.preventChange : this_1.preventChange;
            }
            break;
          case "index":
            if (this_1.fields.disabled) {
              newProp.index = newProp.index != null && !this_1.isDisabledItemByIndex(newProp.index) ? newProp.index : null;
            }
            if (newProp.index === null) {
              this_1.clearAll();
              break;
            }
            if (!this_1.list) {
              if (this_1.dataSource instanceof DataManager) {
                this_1.initialRemoteRender = true;
              }
              this_1.renderList();
            }
            if (!this_1.initialRemoteRender && this_1.liCollections) {
              var element = this_1.liCollections[newProp.index];
              if (!this_1.checkValidLi(element)) {
                if (this_1.liCollections && this_1.liCollections.length === 100 && this_1.getModuleName() === "autocomplete" && this_1.listData.length > 100) {
                  this_1.setSelectionData(newProp.index, oldProp.index, "index");
                } else {
                  this_1.index = oldProp.index;
                }
              }
              this_1.updateInputFields();
            }
            break;
          case "footerTemplate":
            if (this_1.popupObj) {
              this_1.setFooterTemplate(this_1.popupObj.element);
            }
            break;
          case "headerTemplate":
            if (this_1.popupObj) {
              this_1.setHeaderTemplate(this_1.popupObj.element);
            }
            break;
          case "valueTemplate":
            if (!isNullOrUndefined(this_1.itemData) && this_1.valueTemplate !== null) {
              this_1.setValueTemplate();
            }
            break;
          case "allowFiltering":
            if (this_1.allowFiltering) {
              this_1.actionCompleteData = {
                ulElement: this_1.ulElement,
                list: this_1.listData,
                isUpdated: true
              };
              this_1.actionData = this_1.actionCompleteData;
              this_1.updateSelectElementData(this_1.allowFiltering);
            }
            break;
          case "floatLabelType":
            Input.removeFloating(this_1.inputWrapper);
            Input.addFloating(this_1.inputElement, newProp.floatLabelType, this_1.placeholder, this_1.createElement);
            if (!isNullOrUndefined(this_1.inputWrapper.buttons[0]) && this_1.inputWrapper.container.getElementsByClassName("e-float-text-overflow")[0] && this_1.floatLabelType !== "Never") {
              this_1.inputWrapper.container.getElementsByClassName("e-float-text-overflow")[0].classList.add("e-icon");
            }
            break;
          case "showClearButton":
            if (!this_1.inputWrapper.clearButton) {
              Input.setClearButton(newProp.showClearButton, this_1.inputElement, this_1.inputWrapper, null, this_1.createElement);
              this_1.bindClearEvent();
            }
            break;
          default:
            {
              var ddlProps = this_1.getPropObject(prop2, newProp, oldProp);
              _super.prototype.onPropertyChanged.call(this_1, ddlProps.newProperty, ddlProps.oldProperty);
            }
            break;
        }
      };
      var this_1 = this;
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        var state_1 = _loop_1(prop);
        if (typeof state_1 === "object")
          return state_1.value;
      }
    };
    DropDownList2.prototype.checkValidLi = function(element) {
      if (this.isValidLI(element)) {
        this.setSelection(element, null);
        return true;
      }
      return false;
    };
    DropDownList2.prototype.setSelectionData = function(newProp, oldProp, prop) {
      var _this = this;
      var li;
      this.updateListValues = function() {
        if (prop === "text") {
          li = _this.getElementByText(newProp);
          if (!_this.checkValidLi(li)) {
            _this.setOldText(oldProp);
          }
        } else if (prop === "value") {
          var fields = _this.fields.value ? _this.fields.value : "";
          var value = _this.allowObjectBinding && !isNullOrUndefined(newProp) ? getValue(fields, newProp) : newProp;
          li = _this.getElementByValue(newProp);
          if (!_this.checkValidLi(li)) {
            _this.setOldValue(oldProp);
          }
        } else if (prop === "index") {
          li = _this.liCollections[newProp];
          if (!_this.checkValidLi(li)) {
            _this.index = oldProp;
          }
        }
      };
    };
    DropDownList2.prototype.updatePopupState = function() {
      if (this.beforePopupOpen) {
        this.beforePopupOpen = false;
        this.showPopup();
      }
    };
    DropDownList2.prototype.setReadOnly = function() {
      if (this.readonly) {
        addClass([this.inputWrapper.container], ["e-readonly"]);
      } else {
        removeClass([this.inputWrapper.container], ["e-readonly"]);
      }
    };
    DropDownList2.prototype.setInputValue = function(newProp, oldProp) {
    };
    DropDownList2.prototype.setCssClass = function(newClass, oldClass) {
      if (!isNullOrUndefined(oldClass)) {
        oldClass = oldClass.replace(/\s+/g, " ").trim();
      }
      if (!isNullOrUndefined(newClass)) {
        newClass = newClass.replace(/\s+/g, " ").trim();
      }
      Input.setCssClass(newClass, [this.inputWrapper.container], oldClass);
      if (this.popupObj) {
        Input.setCssClass(newClass, [this.popupObj.element], oldClass);
      }
    };
    DropDownList2.prototype.getModuleName = function() {
      return "dropdownlist";
    };
    DropDownList2.prototype.showPopup = function(e) {
      if (!this.enabled) {
        return;
      }
      this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
      if (this.isReact && this.getModuleName() === "combobox" && this.itemTemplate && this.isCustomFilter && this.isAddNewItemTemplate) {
        this.renderList();
        this.isAddNewItemTemplate = false;
      }
      if (this.isFiltering() && this.dataSource instanceof DataManager && this.actionData.list !== this.actionCompleteData.list && this.actionData.list && this.actionData.ulElement) {
        this.actionCompleteData = this.actionData;
        this.onActionComplete(this.actionCompleteData.ulElement, this.actionCompleteData.list, null, true);
      }
      if (this.beforePopupOpen) {
        this.refreshPopup();
        return;
      }
      this.beforePopupOpen = true;
      if (this.isFiltering() && !this.isActive && this.actionCompleteData.list && this.actionCompleteData.list[0]) {
        this.isActive = true;
        this.onActionComplete(this.actionCompleteData.ulElement, this.actionCompleteData.list, null, true);
      } else if (isNullOrUndefined(this.list) || !isUndefined(this.list) && (this.list.classList.contains(dropDownBaseClasses.noData) || this.list.querySelectorAll("." + dropDownBaseClasses.li).length <= 0)) {
        if (this.isReact && this.isFiltering() && this.itemTemplate != null) {
          this.isSecondClick = false;
        }
        this.renderList(e);
      }
      if (this.enableVirtualization && this.listData && this.listData.length) {
        if (!isNullOrUndefined(this.value) && (this.getModuleName() === "dropdownlist" || this.getModuleName() === "combobox")) {
          this.removeHover();
        }
        if (!this.beforePopupOpen) {
          this.notify("setCurrentViewDataAsync", {
            module: "VirtualScroll"
          });
        }
      }
      if (this.beforePopupOpen) {
        this.invokeRenderPopup(e);
      }
      if (this.enableVirtualization && !this.allowFiltering && this.selectedValueInfo != null && this.selectedValueInfo.startIndex > 0 && this.value != null) {
        this.notify("dataProcessAsync", {
          module: "VirtualScroll",
          isOpen: true
        });
      }
    };
    DropDownList2.prototype.invokeRenderPopup = function(e) {
      if (Browser.isDevice && this.isFilterLayout()) {
        var proxy_2 = this;
        window.onpopstate = function() {
          proxy_2.hidePopup();
        };
        history.pushState({}, "");
      }
      if (!isNullOrUndefined(this.list) && (!isNullOrUndefined(this.list.children[0]) || this.list.classList.contains(dropDownBaseClasses.noData))) {
        this.renderPopup(e);
      }
    };
    DropDownList2.prototype.renderHightSearch = function() {
    };
    DropDownList2.prototype.hidePopup = function(e) {
      if (this.isEscapeKey && this.getModuleName() === "dropdownlist") {
        if (!isNullOrUndefined(this.inputElement)) {
          Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
        }
        this.isEscapeKey = false;
        if (!isNullOrUndefined(this.index)) {
          var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
          var element = this.findListElement(this.ulElement, "li", "data-value", value);
          this.selectedLI = this.liCollections[this.index] || element;
          if (this.selectedLI) {
            this.updateSelectedItem(this.selectedLI, null, true);
            if (this.valueTemplate && this.itemData !== null) {
              this.setValueTemplate();
            }
          }
        } else {
          this.resetSelection();
        }
      }
      this.isVirtualTrackHeight = false;
      this.customFilterQuery = null;
      this.closePopup(0, e);
      var dataItem = this.getItemData();
      var isSelectVal = !isNullOrUndefined(this.selectedLI);
      if (isSelectVal && this.enableVirtualization && this.selectedLI.classList) {
        isSelectVal = this.selectedLI.classList.contains("e-active");
      }
      if (this.inputElement && this.inputElement.value.trim() === "" && !this.isInteracted && (this.isSelectCustom || isSelectVal && this.inputElement.value !== dataItem.text)) {
        this.isSelectCustom = false;
        this.clearAll(e);
      }
    };
    DropDownList2.prototype.focusIn = function(e) {
      if (!this.enabled) {
        return;
      }
      if (this.targetElement().classList.contains(dropDownListClasses.disable)) {
        return;
      }
      var isFocused = false;
      if (this.preventFocus && Browser.isDevice) {
        this.inputWrapper.container.tabIndex = 1;
        this.inputWrapper.container.focus();
        this.preventFocus = false;
        isFocused = true;
      }
      if (!isFocused) {
        this.targetElement().focus();
      }
      addClass([this.inputWrapper.container], [dropDownListClasses.inputFocus]);
      this.onFocus(e);
      if (this.floatLabelType !== "Never") {
        Input.calculateWidth(this.inputElement, this.inputWrapper.container);
      }
    };
    DropDownList2.prototype.focusOut = function(e) {
      if (!this.enabled) {
        return;
      }
      if (!this.enableVirtualization && (this.getModuleName() === "combobox" || this.getModuleName() === "autocomplete")) {
        this.isTyped = true;
      }
      this.hidePopup(e);
      if (this.targetElement()) {
        this.targetElement().blur();
      }
      removeClass([this.inputWrapper.container], [dropDownListClasses.inputFocus]);
      if (this.floatLabelType !== "Never") {
        Input.calculateWidth(this.inputElement, this.inputWrapper.container);
      }
    };
    DropDownList2.prototype.disableItem = function(item) {
      if (this.fields.disabled) {
        if (!this.list) {
          this.renderList();
        }
        var itemIndex = -1;
        if (this.liCollections && this.liCollections.length > 0 && this.listData && this.fields.disabled) {
          if (typeof item === "string") {
            itemIndex = this.getIndexByValue(item);
          } else if (typeof item === "object") {
            if (item instanceof HTMLLIElement) {
              for (var index = 0; index < this.liCollections.length; index++) {
                if (this.liCollections[index] === item) {
                  itemIndex = this.getIndexByValue(item.getAttribute("data-value"));
                  break;
                }
              }
            } else {
              var value = JSON.parse(JSON.stringify(item))[this.fields.value];
              for (var index = 0; index < this.listData.length; index++) {
                if (JSON.parse(JSON.stringify(this.listData[index]))[this.fields.value] === value) {
                  itemIndex = this.getIndexByValue(value);
                  break;
                }
              }
            }
          } else {
            itemIndex = item;
          }
          var isValidIndex = itemIndex < this.liCollections.length && itemIndex > -1;
          if (isValidIndex && !JSON.parse(JSON.stringify(this.listData[itemIndex]))[this.fields.disabled]) {
            var li = this.liCollections[itemIndex];
            if (li) {
              this.disableListItem(li);
              var parsedData = JSON.parse(JSON.stringify(this.listData[itemIndex]));
              parsedData[this.fields.disabled] = true;
              this.listData[itemIndex] = parsedData;
              this.dataSource = this.listData;
              if (li.classList.contains(dropDownListClasses.focus)) {
                this.removeFocus();
              }
              if (li.classList.contains(dropDownListClasses.selected)) {
                this.clear();
              }
            }
          }
        }
      }
    };
    DropDownList2.prototype.destroy = function() {
      this.isActive = false;
      if (this.showClearButton) {
        this.clearButton = document.getElementsByClassName("e-clear-icon")[0];
      }
      resetIncrementalSearchValues(this.element.id);
      if (this.isReact) {
        this.clearTemplate();
      }
      this.hidePopup();
      if (this.popupObj) {
        this.popupObj.hide();
      }
      this.unWireEvent();
      if (this.list) {
        this.unWireListEvents();
      }
      if (this.element && !this.element.classList.contains("e-" + this.getModuleName())) {
        return;
      }
      if (this.inputElement) {
        var attrArray = [
          "readonly",
          "aria-disabled",
          "placeholder",
          "aria-labelledby",
          "aria-expanded",
          "autocomplete",
          "aria-readonly",
          "autocapitalize",
          "spellcheck",
          "aria-autocomplete",
          "aria-live",
          "aria-describedby",
          "aria-label"
        ];
        for (var i = 0; i < attrArray.length; i++) {
          this.inputElement.removeAttribute(attrArray[i]);
        }
        this.inputElement.setAttribute("tabindex", this.tabIndex);
        this.inputElement.classList.remove("e-input");
        Input.setValue("", this.inputElement, this.floatLabelType, this.showClearButton);
      }
      this.element.style.display = "block";
      if (this.inputWrapper.container && this.inputWrapper.container.parentElement) {
        if (this.inputWrapper.container.parentElement.tagName === this.getNgDirective()) {
          detach(this.inputWrapper.container);
        } else {
          this.inputWrapper.container.parentElement.insertBefore(this.element, this.inputWrapper.container);
          detach(this.inputWrapper.container);
        }
      }
      delete this.hiddenElement;
      this.filterInput = null;
      this.keyboardModule = null;
      this.ulElement = null;
      this.list = null;
      this.clearIconElement = null;
      this.popupObj = null;
      this.popupContentElement = null;
      this.rippleFun = null;
      this.selectedLI = null;
      this.liCollections = null;
      this.item = null;
      this.footer = null;
      this.header = null;
      this.previousSelectedLI = null;
      this.valueTempElement = null;
      this.actionData.ulElement = null;
      if (this.inputElement && !isNullOrUndefined(this.inputElement.onchange)) {
        this.inputElement.onchange = null;
      }
      if (this.inputElement && !isNullOrUndefined(this.inputElement.onselect)) {
        this.inputElement.onselect = null;
      }
      Input.destroy({
        element: this.inputElement,
        floatLabelType: this.floatLabelType,
        properties: this.properties,
        buttons: this.inputWrapper.container.querySelectorAll(".e-input-group-icon")[0]
      }, this.clearButton);
      this.clearButton = null;
      this.inputElement = null;
      this.inputWrapper = null;
      _super.prototype.destroy.call(this);
    };
    DropDownList2.prototype.getItems = function() {
      if (!this.list) {
        if (this.dataSource instanceof DataManager) {
          this.initialRemoteRender = true;
        }
        this.renderList();
      }
      return this.ulElement ? _super.prototype.getItems.call(this) : [];
    };
    DropDownList2.prototype.getDataByValue = function(value) {
      return _super.prototype.getDataByValue.call(this, value);
    };
    DropDownList2.prototype.clear = function() {
      this.value = null;
    };
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "cssClass", void 0);
    __decorate5([
      Property("100%")
    ], DropDownList2.prototype, "width", void 0);
    __decorate5([
      Property(true)
    ], DropDownList2.prototype, "enabled", void 0);
    __decorate5([
      Property(false)
    ], DropDownList2.prototype, "enablePersistence", void 0);
    __decorate5([
      Property("300px")
    ], DropDownList2.prototype, "popupHeight", void 0);
    __decorate5([
      Property("100%")
    ], DropDownList2.prototype, "popupWidth", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "placeholder", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "filterBarPlaceholder", void 0);
    __decorate5([
      Property({})
    ], DropDownList2.prototype, "htmlAttributes", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "query", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "valueTemplate", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "headerTemplate", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "footerTemplate", void 0);
    __decorate5([
      Property(false)
    ], DropDownList2.prototype, "allowFiltering", void 0);
    __decorate5([
      Property(false)
    ], DropDownList2.prototype, "readonly", void 0);
    __decorate5([
      Property(false)
    ], DropDownList2.prototype, "enableVirtualization", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "text", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "value", void 0);
    __decorate5([
      Property(false)
    ], DropDownList2.prototype, "allowObjectBinding", void 0);
    __decorate5([
      Property(null)
    ], DropDownList2.prototype, "index", void 0);
    __decorate5([
      Property("Never")
    ], DropDownList2.prototype, "floatLabelType", void 0);
    __decorate5([
      Property(false)
    ], DropDownList2.prototype, "showClearButton", void 0);
    __decorate5([
      Event()
    ], DropDownList2.prototype, "filtering", void 0);
    __decorate5([
      Event()
    ], DropDownList2.prototype, "change", void 0);
    __decorate5([
      Event()
    ], DropDownList2.prototype, "beforeOpen", void 0);
    __decorate5([
      Event()
    ], DropDownList2.prototype, "open", void 0);
    __decorate5([
      Event()
    ], DropDownList2.prototype, "close", void 0);
    __decorate5([
      Event()
    ], DropDownList2.prototype, "blur", void 0);
    __decorate5([
      Event()
    ], DropDownList2.prototype, "focus", void 0);
    DropDownList2 = __decorate5([
      NotifyPropertyChanges
    ], DropDownList2);
    return DropDownList2;
  }(DropDownBase)
);

// node_modules/@syncfusion/ej2-dropdowns/src/drop-down-tree/drop-down-tree.js
var __extends6 = /* @__PURE__ */ function() {
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
var __decorate6 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RTL3 = "e-rtl";
var DROPDOWNTREE = "e-ddt";
var HIDDENELEMENT = "e-ddt-hidden";
var DROPDOWNICON = "e-input-group-icon e-ddt-icon e-icons";
var SHOW_CHIP = "e-show-chip";
var SHOW_CLEAR = "e-show-clear";
var SHOW_DD_ICON = "e-show-dd-icon";
var CHIP_INPUT = "e-chip-input";
var INPUTFOCUS = "e-input-focus";
var INPUTGROUP = "e-input-group";
var ICONANIMATION = "e-icon-anim";
var CLOSEICON_CLASS = "e-clear-icon e-icons";
var CHIP_WRAPPER = "e-chips-wrapper";
var CHIP_COLLECTION = "e-chips-collection";
var CHIP = "e-chips";
var CHIP_CONTENT = "e-chipcontent";
var CHIP_CLOSE = "e-chips-close";
var HIDEICON = "e-icon-hide";
var DDTHIDEICON = "e-ddt-icon-hide";
var POPUP_CLASS = "e-ddt e-popup";
var PARENTITEM = "e-list-parent";
var CONTENT2 = "e-popup-content";
var DROPDOWN = "e-dropdown";
var DISABLED = "e-disabled";
var ICONS = "e-icons";
var CHECKALLPARENT = "e-selectall-parent";
var CHECKALLHIDE = "e-hide-selectall";
var BIGGER = "e-bigger";
var SMALL = "e-small";
var ALLTEXT = "e-all-text";
var CHECKBOXFRAME = "e-frame";
var CHECK = "e-check";
var CHECKBOXWRAP = "e-checkbox-wrapper";
var FILTERWRAP = "e-filter-wrap";
var DDTICON = "e-ddt-icon";
var FOOTER = "e-ddt-footer";
var HEADER = "e-ddt-header";
var NODATACONTAINER = "e-ddt-nodata";
var NODATA = "e-no-data";
var HEADERTEMPLATE = "HeaderTemplate";
var FOOTERTEMPLATE = "FooterTemplate";
var NORECORDSTEMPLATE = "NoRecordsTemplate";
var ACTIONFAILURETEMPLATE = "ActionFailureTemplate";
var CUSTOMTEMPLATE = "CustomTemplate";
var REMAIN_WRAPPER = "e-remain";
var OVERFLOW_VIEW = "e-overflow";
var SHOW_TEXT = "e-show-text";
var TOTAL_COUNT_WRAPPER = "e-total-count";
var REMAIN_COUNT = "e-wrap-count";
var Fields = (
  /** @class */
  function(_super) {
    __extends6(Fields2, _super);
    function Fields2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate6([
      Property("child")
    ], Fields2.prototype, "child", void 0);
    __decorate6([
      Property([])
    ], Fields2.prototype, "dataSource", void 0);
    __decorate6([
      Property("expanded")
    ], Fields2.prototype, "expanded", void 0);
    __decorate6([
      Property("hasChildren")
    ], Fields2.prototype, "hasChildren", void 0);
    __decorate6([
      Property("htmlAttributes")
    ], Fields2.prototype, "htmlAttributes", void 0);
    __decorate6([
      Property("iconCss")
    ], Fields2.prototype, "iconCss", void 0);
    __decorate6([
      Property("imageUrl")
    ], Fields2.prototype, "imageUrl", void 0);
    __decorate6([
      Property("parentValue")
    ], Fields2.prototype, "parentValue", void 0);
    __decorate6([
      Property(null)
    ], Fields2.prototype, "query", void 0);
    __decorate6([
      Property("selectable")
    ], Fields2.prototype, "selectable", void 0);
    __decorate6([
      Property("selected")
    ], Fields2.prototype, "selected", void 0);
    __decorate6([
      Property(null)
    ], Fields2.prototype, "tableName", void 0);
    __decorate6([
      Property("text")
    ], Fields2.prototype, "text", void 0);
    __decorate6([
      Property("tooltip")
    ], Fields2.prototype, "tooltip", void 0);
    __decorate6([
      Property("value")
    ], Fields2.prototype, "value", void 0);
    return Fields2;
  }(ChildProperty)
);
var TreeSettings = (
  /** @class */
  function(_super) {
    __extends6(TreeSettings2, _super);
    function TreeSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate6([
      Property(false)
    ], TreeSettings2.prototype, "autoCheck", void 0);
    __decorate6([
      Property("Auto")
    ], TreeSettings2.prototype, "expandOn", void 0);
    __decorate6([
      Property(false)
    ], TreeSettings2.prototype, "loadOnDemand", void 0);
    return TreeSettings2;
  }(ChildProperty)
);
var DropDownTree = (
  /** @class */
  function(_super) {
    __extends6(DropDownTree2, _super);
    function DropDownTree2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.filterTimer = null;
      _this.isFilteredData = false;
      _this.isFilterRestore = false;
      _this.selectedData = [];
      _this.filterDelayTime = 300;
      _this.isClicked = false;
      _this.isCheckAllCalled = false;
      _this.isFromFilterChange = false;
      return _this;
    }
    DropDownTree2.prototype.getPersistData = function() {
      var keyEntity = ["value"];
      return this.addOnPersist(keyEntity);
    };
    DropDownTree2.prototype.getLocaleName = function() {
      return "drop-down-tree";
    };
    DropDownTree2.prototype.preRender = function() {
      this.inputFocus = false;
      this.isPopupOpen = false;
      this.isFirstRender = true;
      this.isInitialized = false;
      this.currentText = null;
      this.currentValue = null;
      this.oldValue = null;
      this.removeValue = false;
      this.selectedText = [];
      this.treeItems = [];
      this.dataValue = null;
      this.isNodeSelected = false;
      this.isDynamicChange = false;
      this.clearIconWidth = 0;
      this.headerTemplateId = "" + this.element.id + HEADERTEMPLATE;
      this.footerTemplateId = "" + this.element.id + FOOTERTEMPLATE;
      this.actionFailureTemplateId = "" + this.element.id + ACTIONFAILURETEMPLATE;
      this.noRecordsTemplateId = "" + this.element.id + NORECORDSTEMPLATE;
      this.customTemplateId = "" + this.element.id + CUSTOMTEMPLATE;
      this.keyConfigs = {
        escape: "escape",
        altUp: "alt+uparrow",
        altDown: "alt+downarrow",
        tab: "tab",
        shiftTab: "shift+tab",
        end: "end",
        enter: "enter",
        home: "home",
        moveDown: "downarrow",
        moveLeft: "leftarrow",
        moveRight: "rightarrow",
        moveUp: "uparrow",
        ctrlDown: "ctrl+downarrow",
        ctrlUp: "ctrl+uparrow",
        ctrlEnter: "ctrl+enter",
        ctrlHome: "ctrl+home",
        ctrlEnd: "ctrl+end",
        shiftDown: "shift+downarrow",
        shiftUp: "shift+uparrow",
        shiftEnter: "shift+enter",
        shiftHome: "shift+home",
        shiftEnd: "shift+end",
        csDown: "ctrl+shift+downarrow",
        csUp: "ctrl+shift+uparrow",
        csEnter: "ctrl+shift+enter",
        csHome: "ctrl+shift+home",
        csEnd: "ctrl+shift+end",
        space: "space",
        ctrlA: "ctrl+A"
      };
    };
    DropDownTree2.prototype.render = function() {
      var isTree = select("#" + this.element.id + "_tree", document);
      if (isTree) {
        var popupDiv = select("#" + this.element.id + "_options", document);
        detach(popupDiv ? popupDiv : isTree.parentElement);
      }
      if (this.element.tagName === "INPUT") {
        this.inputEle = this.element;
        if (isNullOrUndefined(this.inputEle.getAttribute("role"))) {
          this.inputEle.setAttribute("aria-expanded", "false");
          this.inputEle.setAttribute("role", "combobox");
          this.inputEle.setAttribute("aria-haspopup", "tree");
          this.inputEle.setAttribute("aria-controls", this.element.id + "_options");
        }
        if (isNullOrUndefined(this.inputEle.getAttribute("type"))) {
          this.inputEle.setAttribute("type", "text");
        }
      } else {
        if (!isNullOrUndefined(this.element.id)) {
          this.inputEle = this.createElement("input", { attrs: { role: "textbox", type: "text", id: this.element.id } });
        } else {
          this.inputEle = this.createElement("input", { attrs: { role: "textbox", type: "text" } });
        }
        this.element.parentElement.insertBefore(this.inputEle, this.element);
      }
      this.inputObj = Input.createInput({
        element: this.inputEle,
        floatLabelType: this.floatLabelType,
        buttons: this.showDropDownIcon ? [DROPDOWNICON] : null,
        properties: {
          readonly: true,
          placeholder: this.placeholder,
          enabled: this.enabled,
          cssClass: this.cssClass,
          enableRtl: this.enableRtl
        }
      }, this.createElement);
      this.inputWrapper = this.inputObj.container;
      if (!this.inputWrapper.classList.contains(INPUTGROUP)) {
        this.inputWrapper.classList.add(INPUTGROUP);
      }
      if (this.showDropDownIcon) {
        this.inputWrapper.classList.add(SHOW_DD_ICON);
      }
      if (this.element.tagName === this.getDirective()) {
        this.element.appendChild(this.inputWrapper);
      }
      this.createHiddenElement();
      this.createClearIcon();
      this.inputWrapper.classList.add(DROPDOWNTREE);
      this.setElementWidth(this.width);
      this.updateDataAttribute();
      this.setHTMLAttributes();
      this.setAttributes();
      this.popupDiv = this.createElement("div", { className: CONTENT2 });
      this.popupDiv.classList.add(DROPDOWN);
      this.tree = this.createElement("div", { id: this.element.id + "_tree" });
      this.popupDiv.appendChild(this.tree);
      if (!this.destroyPopupOnHide) {
        document.body.appendChild(this.popupDiv);
      }
      this.wireTreeEvents();
      addClass([this.popupDiv], DDTHIDEICON);
      this.renderTree();
      this.isRemoteData = this.fields.dataSource instanceof DataManager;
      if (this.allowMultiSelection || this.showCheckBox) {
        if (this.mode !== "Delimiter") {
          this.createChip();
        }
        if (!this.wrapText && this.mode !== "Custom") {
          this.overFlowWrapper = this.createElement("span", { className: OVERFLOW_VIEW + " " + HIDEICON });
          this.inputWrapper.insertBefore(this.overFlowWrapper, this.hiddenElement);
          if (this.mode !== "Box") {
            addClass([this.overFlowWrapper], SHOW_TEXT);
          }
        }
      }
      if (!this.isRemoteData) {
        this.setTreeValue();
        this.setTreeText();
        this.updateHiddenValue();
        this.setSelectedValue();
        if (!this.wrapText) {
          this.updateView();
        }
      }
      this.wireEvents();
      var firstUl = select("." + PARENTITEM, this.treeObj.element);
      if (firstUl && firstUl.getAttribute("aria-multiselectable")) {
        firstUl.removeAttribute("aria-multiselectable");
      }
      this.oldValue = this.value;
      this.isInitialized = true;
      this.hasTemplate = this.itemTemplate || this.headerTemplate || this.footerTemplate || this.actionFailureTemplate || this.noRecordsTemplate || this.customTemplate;
      this.renderComplete();
    };
    DropDownTree2.prototype.hideCheckAll = function(flag) {
      var checkAllEle = !isNullOrUndefined(this.popupEle) ? this.popupEle.querySelector("." + CHECKALLPARENT) : null;
      if (!isNullOrUndefined(checkAllEle)) {
        if (flag && !checkAllEle.classList.contains(CHECKALLHIDE)) {
          addClass([checkAllEle], CHECKALLHIDE);
        } else if (!flag && checkAllEle.classList.contains(CHECKALLHIDE)) {
          removeClass([checkAllEle], CHECKALLHIDE);
        }
      }
    };
    DropDownTree2.prototype.renderFilter = function() {
      this.filterContainer = this.createElement("div", {
        id: this.element.id + "_filter_wrap",
        className: FILTERWRAP
      });
      var filterInput2 = this.createElement("input", {
        id: this.element.id + "_filter",
        attrs: { autocomplete: "off", "aria-label": this.filterBarPlaceholder }
      });
      this.filterContainer.appendChild(filterInput2);
      prepend([this.filterContainer], this.popupEle);
      this.filterObj = new TextBox({
        value: "",
        showClearButton: true,
        placeholder: this.filterBarPlaceholder,
        input: this.filterChangeHandler.bind(this)
      });
      this.filterObj.appendTo("#" + this.element.id + "_filter");
      this.keyboardModule = new KeyboardEvents(this.filterObj.element, {
        keyAction: this.filterKeyAction.bind(this),
        keyConfigs: this.keyConfigs,
        eventName: "keydown"
      });
    };
    DropDownTree2.prototype.filterKeyAction = function(e) {
      var _this = this;
      var eventArgs = {
        cancel: false,
        event: e
      };
      this.trigger("keyPress", eventArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          switch (e.action) {
            case "altUp":
              if (_this.isPopupOpen) {
                _this.hidePopup();
              }
              break;
            case "shiftTab":
              addClass([_this.inputWrapper], [INPUTFOCUS]);
              break;
            case "moveDown":
              e.preventDefault();
              _this.filterObj.element.blur();
              var focusedElement = _this.treeObj.element.querySelector("li");
              if (focusedElement) {
                focusedElement.focus();
              }
              break;
          }
        }
      });
    };
    DropDownTree2.prototype.filterChangeHandler = function(args) {
      var _this = this;
      if (!isNullOrUndefined(args.value)) {
        window.clearTimeout(this.filterTimer);
        this.filterTimer = window.setTimeout(function() {
          _this.filterHandler(args.value, args.event);
        }, this.filterDelayTime);
      }
    };
    DropDownTree2.prototype.isChildObject = function() {
      if (typeof this.treeObj.fields.child === "object") {
        return true;
      } else {
        return false;
      }
    };
    DropDownTree2.prototype.filterHandler = function(value, event2) {
      var _this = this;
      this.isFromFilterChange = true;
      if (!this.isFilteredData) {
        if (this.isRemoteData) {
          this.treeObj.expandedNodes = [];
        }
        this.treeData = this.treeObj.getTreeData();
      }
      var filterFields = this.cloneFields(this.fields);
      var args = {
        cancel: false,
        preventDefaultAction: false,
        event: event2,
        text: value.trim(),
        fields: filterFields
      };
      this.trigger("filtering", args, function(args2) {
        if (!args2.cancel) {
          var flag = false;
          var fields = void 0;
          _this.isFilteredData = true;
          if (args2.text === "") {
            _this.isFilteredData = false;
            _this.isFilterRestore = true;
            fields = _this.cloneFields(_this.fields);
            _this.treeObj.element.classList.remove("e-filtering");
          } else if (args2.preventDefaultAction) {
            fields = args2.fields;
          } else {
            if (_this.treeDataType === 1) {
              fields = _this.selfReferencefilter(args2.text, args2.fields);
            } else {
              if (_this.fields.dataSource instanceof DataManager) {
                fields = _this.remoteDataFilter(args2.text, args2.fields);
                fields.child = _this.fields.child;
                _this.treeObj.fields = _this.getTreeFields(args2.fields);
                _this.treeObj.dataBind();
                flag = true;
              } else {
                fields = _this.nestedFilter(args2.text, args2.fields);
              }
            }
            _this.treeObj.element.classList.add("e-filtering");
          }
          _this.hideCheckAll(_this.isFilteredData);
          if (flag) {
            return;
          }
          if (_this.isRemoteData) {
            if (_this.isChildObject()) {
              fields.child = _this.fields.child;
            } else {
              fields = args2.fields;
            }
          }
          _this.treeObj.fields = _this.getTreeFields(fields);
          _this.treeObj.dataBind();
          if (_this.hasTemplate && _this.portals && _this.treeObj.portals) {
            for (var i = 0; i < _this.treeObj.portals.length; i++) {
              if (_this.portals.indexOf(_this.treeObj.portals[i]) === -1) {
                _this.portals.push(_this.treeObj.portals[i]);
              }
            }
            if (_this.isReact) {
              _this.renderReactTemplates();
            }
          }
        }
      });
    };
    DropDownTree2.prototype.remoteDataFilter = function(value, filteredFields) {
      var _this = this;
      filteredFields.dataSource = this.treeData.map(function(item) {
        return _this.remoteChildFilter(value, item);
      }).filter(function(filteredChild) {
        return !isNullOrUndefined(filteredChild);
      });
      return filteredFields;
    };
    DropDownTree2.prototype.remoteChildFilter = function(value, node, isChild, isChildFiltering) {
      var children = this.isChildObject() ? node["child"] : node[this.fields.child];
      if (isNullOrUndefined(children)) {
        return this.isMatchedNode(value, node, isChild, isChildFiltering) ? node : null;
      }
      var matchedChildren = [];
      for (var i = 0; i < children.length; i++) {
        var filteredChild = this.remoteChildFilter(value, children[i], true, true);
        if (!isNullOrUndefined(filteredChild)) {
          matchedChildren.push(filteredChild);
        }
      }
      var filteredItems = Object.assign({}, node);
      isChildFiltering = false;
      if (matchedChildren.length !== 0) {
        filteredItems.child = matchedChildren;
      } else {
        filteredItems.child = null;
        filteredItems = this.isMatchedNode(value, filteredItems) ? filteredItems : null;
      }
      return filteredItems;
    };
    DropDownTree2.prototype.nestedFilter = function(value, filteredFields) {
      var matchedDataSource = [];
      for (var i = 0; i < this.treeData.length; i++) {
        var filteredChild = this.nestedChildFilter(value, this.treeData[parseInt(i.toString(), 10)]);
        if (!isNullOrUndefined(filteredChild)) {
          matchedDataSource.push(filteredChild);
        }
      }
      filteredFields.dataSource = matchedDataSource;
      return filteredFields;
    };
    DropDownTree2.prototype.nestedChildFilter = function(value, node) {
      var children = node[this.fields.child];
      if (isNullOrUndefined(children)) {
        return this.isMatchedNode(value, node) ? node : null;
      } else {
        var matchedChildren = [];
        for (var i = 0; i < children.length; i++) {
          var filteredChild = this.nestedChildFilter(value, children[parseInt(i.toString(), 10)]);
          if (!isNullOrUndefined(filteredChild)) {
            matchedChildren.push(filteredChild);
          }
        }
        var filteredItems = Object.assign({}, node);
        if (matchedChildren.length !== 0) {
          filteredItems[this.fields.child] = matchedChildren;
          return filteredItems;
        } else {
          filteredItems[this.fields.child] = null;
          return this.isMatchedNode(value, filteredItems) ? filteredItems : null;
        }
      }
    };
    DropDownTree2.prototype.selfReferencefilter = function(value, filteredFields) {
      var matchedData = [];
      var matchedDataSource = [];
      for (var i = 0; i < this.treeData.length; i++) {
        if (this.isMatchedNode(value, this.treeData[i])) {
          matchedData.push(this.treeData[i]);
        }
      }
      for (var i = 0; i < matchedData.length; i++) {
        if (matchedDataSource.indexOf(matchedData[i]) === -1) {
          matchedDataSource.push(matchedData[i]);
          var parentId = matchedData[parseInt(i.toString(), 10)][this.fields.parentValue];
          while (!isNullOrUndefined(parentId)) {
            var parent_1 = null;
            for (var j = 0; j < this.treeData.length; j++) {
              var value_1 = this.treeData[parseInt(j.toString(), 10)][this.fields.value];
              if (!isNullOrUndefined(value_1) && value_1 === parentId) {
                parent_1 = this.treeData[j];
                break;
              }
            }
            if (!isNullOrUndefined(parent_1) && matchedDataSource.indexOf(parent_1) === -1) {
              matchedDataSource.push(parent_1);
              parentId = parent_1[this.fields.parentValue];
            } else {
              break;
            }
          }
        }
      }
      filteredFields.dataSource = matchedDataSource;
      return filteredFields;
    };
    DropDownTree2.prototype.isMatchedNode = function(value, node, isChild, isChildFiltering) {
      var checkValue;
      var isObjectValue = isChild && isChildFiltering && this.isChildObject();
      checkValue = isObjectValue ? node[this.fields.child.text] : node[this.fields.text];
      if (!checkValue && !isNullOrUndefined(this.fields.child.text)) {
        var tempChild = this.fields.child;
        while (!node[tempChild.text]) {
          tempChild = tempChild.child;
        }
        checkValue = node[tempChild.text];
      }
      if (this.ignoreCase) {
        checkValue = checkValue.toLowerCase();
        value = value.toLowerCase();
      }
      if (this.ignoreAccent) {
        checkValue = DataUtil.ignoreDiacritics(checkValue);
        value = DataUtil.ignoreDiacritics(value);
      }
      if (this.filterType === "StartsWith") {
        return checkValue.slice(0, value.length) === value;
      } else if (this.filterType === "EndsWith") {
        return checkValue.slice(-value.length) === value;
      } else {
        return checkValue.indexOf(value) !== -1;
      }
    };
    DropDownTree2.prototype.wireEvents = function() {
      EventHandler.add(this.inputWrapper, "mouseup", this.dropDownClick, this);
      EventHandler.add(this.inputWrapper, "focus", this.focusIn, this);
      EventHandler.add(this.inputWrapper, "blur", this.focusOut, this);
      EventHandler.add(this.inputWrapper, "mousemove", this.mouseIn, this);
      EventHandler.add(this.inputWrapper, "mouseout", this.onMouseLeave, this);
      EventHandler.add(this.overAllClear, "mousedown", this.clearAll, this);
      EventHandler.add(window, "resize", this.windowResize, this);
      var formElement = closest(this.inputWrapper, "form");
      if (formElement) {
        EventHandler.add(formElement, "reset", this.resetValueHandler, this);
      }
      this.keyboardModule = new KeyboardEvents(this.inputWrapper, {
        keyAction: this.keyActionHandler.bind(this),
        keyConfigs: this.keyConfigs,
        eventName: "keydown"
      });
    };
    DropDownTree2.prototype.wireTreeEvents = function() {
      this.keyboardModule = new KeyboardEvents(this.tree, {
        keyAction: this.treeAction.bind(this),
        keyConfigs: this.keyConfigs,
        eventName: "keydown"
      });
    };
    DropDownTree2.prototype.wireCheckAllWrapperEvents = function() {
      this.keyboardModule = new KeyboardEvents(this.checkAllParent, {
        keyAction: this.checkAllAction.bind(this),
        keyConfigs: this.keyConfigs,
        eventName: "keydown"
      });
    };
    DropDownTree2.prototype.unWireEvents = function() {
      EventHandler.remove(this.inputWrapper, "mouseup", this.dropDownClick);
      EventHandler.remove(this.inputWrapper, "focus", this.focusIn);
      EventHandler.remove(this.inputWrapper, "blur", this.focusOut);
      EventHandler.remove(this.inputWrapper, "mousemove", this.mouseIn);
      EventHandler.remove(this.inputWrapper, "mouseout", this.onMouseLeave);
      EventHandler.remove(this.overAllClear, "mousedown", this.clearAll);
      EventHandler.remove(window, "resize", this.windowResize);
      var formElement = closest(this.inputWrapper, "form");
      if (formElement) {
        EventHandler.remove(formElement, "reset", this.resetValueHandler);
      }
      this.keyboardModule.destroy();
      if (this.showSelectAll && this.checkAllParent) {
        EventHandler.remove(this.checkAllParent, "mouseup", this.clickHandler);
      }
      EventHandler.remove(document, "mousedown", this.onDocumentClick);
    };
    DropDownTree2.prototype.dropDownClick = function(e) {
      if (!this.enabled || this.readonly) {
        return;
      }
      if (this.isClearButtonClick) {
        this.isClearButtonClick = false;
        return;
      }
      if (this.isPopupOpen) {
        this.hidePopup();
      } else {
        this.focusIn(e);
        this.renderPopup();
      }
      this.showOverAllClear();
    };
    DropDownTree2.prototype.mouseIn = function() {
      if (this.enabled || !this.readonly) {
        this.showOverAllClear();
      }
    };
    DropDownTree2.prototype.onMouseLeave = function() {
      if (!this.inputFocus) {
        addClass([this.overAllClear], HIDEICON);
        removeClass([this.inputWrapper], SHOW_CLEAR);
      }
    };
    DropDownTree2.prototype.getDirective = function() {
      return "EJS-DROPDOWNTREE";
    };
    DropDownTree2.prototype.focusOut = function(e) {
      if (!this.enabled || this.readonly || !this.inputFocus) {
        return;
      }
      if ((Browser.isIE || Browser.info.name === "edge") && e.target === this.inputWrapper) {
        return;
      }
      var target = e.relatedTarget;
      if (target !== this.inputEle && isNullOrUndefined(target) && (e.target !== this.inputWrapper || !this.isPopupOpen)) {
        this.onFocusOut(e);
      }
    };
    DropDownTree2.prototype.onFocusOut = function(event2) {
      this.inputFocus = false;
      if (this.isPopupOpen) {
        this.hidePopup();
      }
      if (this.isClearButtonClick) {
        this.isClearButtonClick = false;
      }
      if (this.showClearButton) {
        this.clearIconWidth = select(".e-clear-icon", this.inputWrapper).offsetWidth;
        addClass([this.overAllClear], HIDEICON);
        removeClass([this.inputWrapper], SHOW_CLEAR);
      }
      removeClass([this.inputWrapper], [INPUTFOCUS]);
      if (this.allowMultiSelection || this.showCheckBox) {
        var isValue = this.value ? this.value.length ? true : false : false;
        if (this.mode !== "Delimiter" && this.mode !== "Custom") {
          if (this.chipWrapper && this.mode === "Default") {
            addClass([this.chipWrapper], HIDEICON);
            removeClass([this.inputWrapper], SHOW_CHIP);
            removeClass([this.inputEle], CHIP_INPUT);
          }
        }
        if (!this.wrapText && isValue) {
          this.updateView();
        }
      }
      if (this.changeOnBlur) {
        this.triggerChangeEvent(event2);
      }
      this.removeValue = false;
      this.oldValue = this.value;
      this.trigger("blur");
    };
    DropDownTree2.prototype.updateView = function() {
      if (!this.showCheckBox && !this.allowMultiSelection || this.mode === "Custom" || this.inputFocus) {
        return;
      }
      if (this.mode !== "Box") {
        addClass([this.inputWrapper, this.overFlowWrapper], SHOW_TEXT);
      } else {
        addClass([this.inputWrapper], SHOW_CHIP);
      }
      if (this.value && this.value.length !== 0) {
        if (this.inputWrapper.contains(this.chipWrapper)) {
          addClass([this.chipWrapper], HIDEICON);
        }
        addClass([this.inputEle], CHIP_INPUT);
        this.updateOverFlowView();
        this.ensurePlaceHolder();
      }
    };
    DropDownTree2.prototype.triggerChangeEvent = function(event2) {
      var isEqual = this.ddtCompareValues(this.oldValue, this.value);
      if ((!isEqual || this.isChipDelete) && !this.removeValue) {
        var eventArgs = {
          e: event2,
          oldValue: this.oldValue,
          value: this.value,
          isInteracted: event2 ? true : false,
          element: this.element
        };
        this.trigger("change", eventArgs);
        this.oldValue = this.value;
      }
    };
    DropDownTree2.prototype.ddtCompareValues = function(oldValue, newValue) {
      if (oldValue === null || newValue === null) {
        var isValid = oldValue === null ? newValue === oldValue ? true : false : oldValue.length === 0 ? newValue === oldValue : false;
        return isValid;
      } else if (oldValue.length !== newValue.length) {
        return false;
      }
      for (var i = 0; i < oldValue.length; i++) {
        if (oldValue[i] !== newValue[i]) {
          return false;
        }
      }
      return true;
    };
    DropDownTree2.prototype.focusIn = function(e) {
      if (!this.enabled || this.readonly || this.inputFocus) {
        return;
      }
      this.showOverAllClear();
      this.inputFocus = true;
      addClass([this.inputWrapper], [INPUTFOCUS]);
      if (this.allowMultiSelection || this.showCheckBox) {
        if (this.mode !== "Delimiter" && this.inputFocus) {
          if (this.chipWrapper && (this.value && this.value.length !== 0)) {
            removeClass([this.chipWrapper], HIDEICON);
            addClass([this.inputEle], CHIP_INPUT);
          }
          addClass([this.inputWrapper], SHOW_CHIP);
          if (this.popupObj) {
            this.popupObj.refreshPosition();
          }
        }
        if (!this.wrapText && this.mode !== "Custom") {
          if (this.inputWrapper.contains(this.overFlowWrapper)) {
            addClass([this.overFlowWrapper], HIDEICON);
          }
          if (this.mode === "Delimiter") {
            removeClass([this.inputWrapper], SHOW_CHIP);
            removeClass([this.inputEle], CHIP_INPUT);
          } else {
            addClass([this.inputWrapper], SHOW_CHIP);
          }
          removeClass([this.inputWrapper], SHOW_TEXT);
          this.ensurePlaceHolder();
        }
      }
      var args = { isInteracted: e ? true : false, event: e };
      this.trigger("focus", args);
    };
    DropDownTree2.prototype.treeAction = function(e) {
      var _this = this;
      var eventArgs = {
        cancel: false,
        event: e
      };
      this.trigger("keyPress", eventArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          switch (e.action) {
            case "escape":
            case "altUp":
              _this.inputWrapper.focus();
              e.preventDefault();
              if (_this.isPopupOpen) {
                _this.hidePopup();
              }
              break;
            case "tab":
              if (_this.isPopupOpen) {
                _this.hidePopup();
              }
              break;
            case "enter":
            case "ctrlEnter":
            case "shiftEnter":
            case "csEnter":
              if (!_this.showCheckBox) {
                _this.isValueChange = true;
                _this.keyEventArgs = e;
              }
              break;
            case "space":
              _this.isValueChange = true;
              _this.keyEventArgs = e;
              break;
            case "ctrlA":
              if (_this.allowMultiSelection) {
                _this.selectAll(true);
              }
              break;
            case "moveRight":
            case "moveLeft":
            case "shiftDown":
            case "moveDown":
            case "ctrlDown":
            case "csDown":
            case "shiftUp":
            case "moveUp":
            case "ctrlUp":
            case "csUp":
            case "home":
            case "shiftHome":
            case "ctrlHome":
            case "csHome":
            case "end":
            case "shiftEnd":
            case "ctrlEnd":
            case "csEnd":
          }
        } else {
          e.stopImmediatePropagation();
        }
      });
    };
    DropDownTree2.prototype.keyActionHandler = function(e) {
      var _this = this;
      var eventArgs = {
        cancel: false,
        event: e
      };
      this.trigger("keyPress", eventArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          switch (e.action) {
            case "escape":
            case "altUp":
              if (_this.isPopupOpen) {
                _this.hidePopup();
              }
              break;
            case "shiftTab":
              if (_this.isPopupOpen) {
                _this.hidePopup();
              }
              if (_this.inputFocus) {
                _this.onFocusOut();
              }
              break;
            case "altDown":
              if (!_this.isPopupOpen) {
                _this.showPopup();
                e.preventDefault();
              }
              break;
            case "moveDown":
              if (_this.showSelectAll && _this.showCheckBox) {
                _this.checkAllParent.focus();
              }
              break;
          }
        }
      });
    };
    DropDownTree2.prototype.checkAllAction = function(e) {
      var _this = this;
      var eventArgs = {
        cancel: false,
        event: e
      };
      var focusedElement;
      this.trigger("keyPress", eventArgs, function(observedArgs) {
        if (!observedArgs.cancel) {
          switch (e.action) {
            case "space":
              _this.clickHandler(e);
              break;
            case "moveDown":
              focusedElement = _this.treeObj.element.querySelector("li");
              focusedElement.focus();
              addClass([focusedElement], ["e-node-focus"]);
              break;
          }
        }
      });
    };
    DropDownTree2.prototype.windowResize = function() {
      if (this.popupObj) {
        this.popupObj.setProperties({ width: this.setWidth() });
        this.popupObj.refreshPosition();
      }
    };
    DropDownTree2.prototype.resetValueHandler = function(e) {
      var formElement = closest(this.inputWrapper, "form");
      if (formElement && e.target === formElement) {
        this.isDynamicChange = true;
        this.setProperties({ value: null }, true);
        this.resetValue(true);
        this.isDynamicChange = false;
      }
    };
    DropDownTree2.prototype.getAriaAttributes = function() {
      return {};
    };
    DropDownTree2.prototype.updateOverFlowView = function() {
      this.overFlowWrapper.classList.remove(TOTAL_COUNT_WRAPPER);
      removeClass([this.overFlowWrapper], HIDEICON);
      if (this.value && this.value.length) {
        var data = "";
        var overAllContainer = void 0;
        var temp = void 0;
        var tempData = void 0;
        var tempIndex = 1;
        var wrapperleng = void 0;
        var remaining = void 0;
        var downIconWidth = 0;
        this.overFlowWrapper.innerHTML = "";
        var l10nLocale = { overflowCountTemplate: "+${count} more..", totalCountTemplate: "${count} selected" };
        this.l10n = new L10n(this.getLocaleName(), l10nLocale, this.locale);
        var remainContent = this.l10n.getConstant("overflowCountTemplate");
        var totalContent = this.l10n.getConstant("totalCountTemplate");
        var remainElement = this.createElement("span", { className: REMAIN_WRAPPER });
        this.overFlowWrapper.appendChild(remainElement);
        remainElement.innerText = remainContent.replace("${count}", this.value.length.toString());
        var remainSize = remainElement.offsetWidth;
        remove(remainElement);
        if (this.showDropDownIcon) {
          downIconWidth = select("." + DDTICON, this.inputWrapper).offsetWidth;
        }
        if (!isNullOrUndefined(this.value)) {
          if (this.mode !== "Box") {
            for (var index = 0; !isNullOrUndefined(this.value[index]); index++) {
              data += index === 0 ? "" : this.delimiterChar + " ";
              temp = this.getOverflowVal(index);
              data += temp;
              temp = this.overFlowWrapper.innerHTML;
              if (this.enableHtmlSanitizer) {
                this.overFlowWrapper.innerText = SanitizeHtmlHelper.sanitize(data);
              } else {
                this.overFlowWrapper.innerHTML = data;
              }
              wrapperleng = this.overFlowWrapper.offsetWidth;
              overAllContainer = this.inputWrapper.offsetWidth;
              if (wrapperleng + downIconWidth + this.clearIconWidth > overAllContainer) {
                if (tempData !== void 0 && tempData !== "") {
                  temp = tempData;
                  index = tempIndex + 1;
                }
                this.overFlowWrapper.innerHTML = temp;
                remaining = this.value.length - index;
                wrapperleng = this.overFlowWrapper.offsetWidth;
                while (wrapperleng + remainSize + downIconWidth + this.clearIconWidth >= overAllContainer && wrapperleng !== 0 && this.overFlowWrapper.innerHTML !== "") {
                  var textArr = this.overFlowWrapper.innerHTML.split(this.delimiterChar);
                  textArr.pop();
                  this.overFlowWrapper.innerHTML = textArr.join(this.delimiterChar);
                  remaining++;
                  wrapperleng = this.overFlowWrapper.offsetWidth;
                }
                break;
              } else if (wrapperleng + remainSize + downIconWidth + this.clearIconWidth <= overAllContainer) {
                tempData = data;
                tempIndex = index;
              } else if (index === 0) {
                tempData = "";
                tempIndex = -1;
              }
            }
          } else {
            addClass([this.chipWrapper], HIDEICON);
            var ele = this.chipWrapper.cloneNode(true);
            var chips = selectAll("." + CHIP, ele);
            for (var i = 0; i < chips.length; i++) {
              temp = this.overFlowWrapper.innerHTML;
              this.overFlowWrapper.appendChild(chips[i]);
              data = this.overFlowWrapper.innerHTML;
              wrapperleng = this.overFlowWrapper.offsetWidth;
              overAllContainer = this.inputWrapper.offsetWidth;
              if (wrapperleng + downIconWidth + this.clearIconWidth > overAllContainer) {
                if (tempData !== void 0 && tempData !== "") {
                  temp = tempData;
                  i = tempIndex + 1;
                }
                this.overFlowWrapper.innerHTML = temp;
                remaining = this.value.length - i;
                wrapperleng = this.overFlowWrapper.offsetWidth;
                while (wrapperleng + remainSize + downIconWidth + this.clearIconWidth >= overAllContainer && wrapperleng !== 0 && this.overFlowWrapper.innerHTML !== "") {
                  this.overFlowWrapper.removeChild(this.overFlowWrapper.lastChild);
                  remaining++;
                  wrapperleng = this.overFlowWrapper.offsetWidth;
                }
                break;
              } else if (wrapperleng + remainSize + downIconWidth + this.clearIconWidth <= overAllContainer) {
                tempData = data;
                tempIndex = i;
              } else if (i === 0) {
                tempData = "";
                tempIndex = -1;
              }
            }
          }
        }
        if (remaining > 0) {
          this.overFlowWrapper.appendChild(this.updateRemainTemplate(remainElement, remaining, remainContent, totalContent));
        }
        if (this.mode === "Box" && !this.overFlowWrapper.classList.contains(TOTAL_COUNT_WRAPPER)) {
          addClass([remainElement], REMAIN_COUNT);
        }
      } else {
        this.overFlowWrapper.innerHTML = "";
        addClass([this.overFlowWrapper], HIDEICON);
      }
      this.updateDelimMode();
    };
    DropDownTree2.prototype.updateRemainTemplate = function(remainElement, remaining, remainContent, totalContent) {
      if (this.overFlowWrapper.firstChild && this.overFlowWrapper.firstChild.nodeType === 3 && this.overFlowWrapper.firstChild.nodeValue === "") {
        this.overFlowWrapper.removeChild(this.overFlowWrapper.firstChild);
      }
      remainElement.innerHTML = "";
      remainElement.innerText = this.overFlowWrapper.firstChild && (this.overFlowWrapper.firstChild.nodeType === 3 || this.mode === "Box") ? remainContent.replace("${count}", remaining.toString()) : totalContent.replace("${count}", remaining.toString());
      if (this.overFlowWrapper.firstChild && (this.overFlowWrapper.firstChild.nodeType === 3 || this.mode === "Box")) {
        removeClass([this.overFlowWrapper], TOTAL_COUNT_WRAPPER);
      } else {
        addClass([this.overFlowWrapper], TOTAL_COUNT_WRAPPER);
        removeClass([this.overFlowWrapper], REMAIN_COUNT);
      }
      return remainElement;
    };
    DropDownTree2.prototype.getOverflowVal = function(index) {
      var selectedData = this.getSelectedData(this.value[parseInt(index.toString(), 10)]);
      return getValue(this.treeSettings.loadOnDemand ? this.fields.text : "text", selectedData);
    };
    DropDownTree2.prototype.updateDelimMode = function() {
      if (this.mode !== "Box") {
        if (select("." + REMAIN_WRAPPER, this.overFlowWrapper) && !this.overFlowWrapper.classList.contains(TOTAL_COUNT_WRAPPER)) {
          addClass([this.overFlowWrapper], REMAIN_COUNT);
          addClass([this.overFlowWrapper], SHOW_TEXT);
        } else {
          this.overFlowWrapper.classList.remove(REMAIN_COUNT);
          removeClass([this.overFlowWrapper], REMAIN_COUNT);
        }
      } else if (select("." + REMAIN_WRAPPER, this.overFlowWrapper)) {
        this.overFlowWrapper.classList.remove(REMAIN_COUNT);
      }
    };
    DropDownTree2.prototype.createHiddenElement = function() {
      if (this.allowMultiSelection || this.showCheckBox) {
        this.hiddenElement = this.createElement("select", {
          attrs: { "aria-hidden": "true", "class": HIDDENELEMENT, "tabindex": "-1", "multiple": "", "aria-label": this.getModuleName() }
        });
      } else {
        this.hiddenElement = this.createElement("select", {
          attrs: { "aria-hidden": "true", "tabindex": "-1", "class": HIDDENELEMENT, "aria-label": this.getModuleName() }
        });
      }
      prepend([this.hiddenElement], this.inputWrapper);
      this.validationAttribute();
    };
    DropDownTree2.prototype.createClearIcon = function() {
      this.overAllClear = this.createElement("span", {
        className: CLOSEICON_CLASS
      });
      addClass([this.overAllClear], HIDEICON);
      removeClass([this.inputWrapper], SHOW_CLEAR);
      if (this.showClearButton) {
        this.inputWrapper.insertBefore(this.overAllClear, this.inputObj.buttons[0]);
      }
    };
    DropDownTree2.prototype.validationAttribute = function() {
      var name = this.inputEle.getAttribute("name") ? this.inputEle.getAttribute("name") : this.inputEle.getAttribute("id");
      this.hiddenElement.setAttribute("name", name);
      this.inputEle.removeAttribute("name");
      var attributes2 = ["required", "aria-required", "form"];
      for (var i = 0; i < attributes2.length; i++) {
        var attr = this.inputEle.getAttribute(attributes2[i]);
        if (attr) {
          this.hiddenElement.setAttribute(attributes2[i], attr);
          this.inputEle.removeAttribute(attributes2[i]);
        }
      }
    };
    DropDownTree2.prototype.createChip = function() {
      if (!this.inputWrapper.contains(this.chipWrapper)) {
        this.chipWrapper = this.createElement("span", {
          className: CHIP_WRAPPER
        });
        this.chipCollection = this.createElement("span", {
          className: CHIP_COLLECTION
        });
        this.chipWrapper.appendChild(this.chipCollection);
        this.inputWrapper.insertBefore(this.chipWrapper, this.hiddenElement);
        addClass([this.inputWrapper], SHOW_CHIP);
        var isValid = this.getValidMode();
        if (isValid && this.value !== null && (this.value && this.value.length !== 0)) {
          addClass([this.inputEle], CHIP_INPUT);
        } else if (this.value === null || this.value && this.value.length === 0 || this.checkWrapper) {
          addClass([this.chipWrapper], HIDEICON);
        }
      }
    };
    DropDownTree2.prototype.getValidMode = function() {
      if (this.allowMultiSelection || this.showCheckBox) {
        return this.mode === "Box" ? true : this.mode === "Default" && this.inputFocus ? true : false;
      } else {
        return false;
      }
    };
    DropDownTree2.prototype.createSelectAllWrapper = function() {
      this.checkAllParent = this.createElement("div", {
        className: CHECKALLPARENT,
        attrs: { "tabindex": "0" }
      });
      this.selectAllSpan = this.createElement("span", {
        className: ALLTEXT
      });
      this.selectAllSpan.textContent = "";
      var ele = closest(this.element, "." + BIGGER);
      var touchClass = isNullOrUndefined(ele) ? "" : SMALL;
      this.checkBoxElement = createCheckBox(this.createElement, true, { cssClass: touchClass });
      this.checkBoxElement.setAttribute("role", "checkbox");
      this.checkAllParent.appendChild(this.checkBoxElement);
      this.checkAllParent.appendChild(this.selectAllSpan);
      this.setLocale();
      EventHandler.add(this.checkAllParent, "mouseup", this.clickHandler, this);
      this.wireCheckAllWrapperEvents();
    };
    DropDownTree2.prototype.clickHandler = function(e) {
      var target;
      if (e.currentTarget && e.currentTarget.classList.contains(CHECKALLPARENT)) {
        target = e.currentTarget.firstElementChild.lastElementChild;
      } else {
        target = e.target;
      }
      this.checkWrapper = closest(target, "." + CHECKBOXWRAP);
      if (!isNullOrUndefined(this.checkWrapper)) {
        this.isClicked = true;
        var checkElement = select("." + CHECKBOXFRAME, this.checkWrapper);
        this.changeState(this.checkWrapper, checkElement.classList.contains(CHECK) ? "uncheck" : "check", e);
        this.isClicked = false;
      }
      e.preventDefault();
    };
    DropDownTree2.prototype.changeState = function(wrapper, state, e) {
      var ariaState;
      var frameSpan = wrapper.getElementsByClassName(CHECKBOXFRAME)[0];
      if (state === "check" && !frameSpan.classList.contains(CHECK)) {
        frameSpan.classList.add(CHECK);
        ariaState = "true";
        if (!this.isReverseUpdate) {
          this.isCheckAllCalled = true;
          this.treeObj.checkAll();
          if (!this.changeOnBlur) {
            this.triggerChangeEvent(e);
          }
        }
        this.setLocale(true);
      } else if (state === "uncheck" && frameSpan.classList.contains(CHECK)) {
        frameSpan.classList.remove(CHECK);
        ariaState = "false";
        if (!this.isReverseUpdate) {
          this.treeObj.uncheckAll();
          if (!this.changeOnBlur) {
            this.triggerChangeEvent(e);
          }
        }
        this.setLocale(false);
      }
      this.setMultiSelect();
      this.ensurePlaceHolder();
      ariaState = state === "check" ? "true" : "false";
      if (!isNullOrUndefined(ariaState)) {
        wrapper.parentElement.setAttribute("aria-checked", ariaState);
      }
    };
    DropDownTree2.prototype.setLocale = function(unSelect) {
      if (!this.selectAllSpan) {
        return;
      }
      if (this.selectAllText !== "Select All" || this.unSelectAllText !== "Unselect All") {
        var template = unSelect ? this.unSelectAllText : this.selectAllText;
        this.selectAllSpan.textContent = "";
        var compiledString = compile(template);
        var templateName = unSelect ? "unSelectAllText" : "selectAllText";
        for (var _i = 0, _a = compiledString({}, this, templateName, null, !this.isStringTemplate); _i < _a.length; _i++) {
          var item = _a[_i];
          this.selectAllSpan.textContent = item.textContent;
        }
      } else {
        this.selectAllSpan.textContent = unSelect ? this.unSelectAllText : this.selectAllText;
      }
    };
    DropDownTree2.prototype.setAttributes = function() {
      this.inputEle.setAttribute("tabindex", "-1");
      this.inputEle.setAttribute("aria-label", this.getModuleName());
      var id = this.element.getAttribute("id");
      this.hiddenElement.id = id + "_hidden";
      this.inputWrapper.setAttribute("tabindex", "0");
      this.inputWrapper.setAttribute("aria-label", this.getModuleName());
      attributes(this.inputWrapper, this.getAriaAttributes());
    };
    DropDownTree2.prototype.setHTMLAttributes = function() {
      if (Object.keys(this.htmlAttributes).length) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var htmlAttr = _a[_i];
          if (htmlAttr === "class") {
            this.inputWrapper.classList.add(this.htmlAttributes["" + htmlAttr]);
          } else if (htmlAttr === "disabled") {
            this.setProperties({ enabled: false }, true);
            this.setEnable();
          } else if (htmlAttr === "readonly") {
            this.setProperties({ readonly: true }, true);
            this.dataBind();
          } else if (htmlAttr === "style") {
            this.inputWrapper.setAttribute("style", this.htmlAttributes["" + htmlAttr]);
          } else {
            var defaultAttr = [
              "title",
              "id",
              "placeholder",
              "aria-placeholder",
              "role",
              "autocorrect",
              "autocomplete",
              "autocapitalize",
              "spellcheck",
              "minlength",
              "maxlength"
            ];
            var validateAttr = ["name", "required"];
            if (htmlAttr.indexOf("data") === 0 || validateAttr.indexOf(htmlAttr) > -1) {
              this.hiddenElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
            } else if (defaultAttr.indexOf(htmlAttr) > -1) {
              if (htmlAttr === "placeholder") {
                Input.setPlaceholder(this.htmlAttributes["" + htmlAttr], this.inputEle);
              } else {
                this.inputEle.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
              }
            } else {
              this.inputEle.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
            }
          }
        }
      }
    };
    DropDownTree2.prototype.updateDataAttribute = function() {
      var value = this.htmlAttributes;
      var invalidAttr = ["class", "style", "id", "type"];
      var attr = {};
      for (var a = 0; a < this.element.attributes.length; a++) {
        if (invalidAttr.indexOf(this.element.attributes[a].name) === -1 && !(this.element.attributes[a].name === "readonly")) {
          attr[this.element.attributes[a].name] = this.element.getAttribute(this.element.attributes[a].name);
        }
      }
      extend(attr, value, attr);
      this.setProperties({ htmlAttributes: attr }, true);
    };
    DropDownTree2.prototype.showOverAllClear = function() {
      if (!this.enabled || this.readonly) {
        return;
      }
      if (this.overAllClear) {
        var isValue = this.value ? this.value.length ? true : false : false;
        if (isValue && this.showClearButton) {
          removeClass([this.overAllClear], HIDEICON);
          addClass([this.inputWrapper], SHOW_CLEAR);
        } else {
          addClass([this.overAllClear], HIDEICON);
          removeClass([this.inputWrapper], SHOW_CLEAR);
        }
      }
    };
    DropDownTree2.prototype.setTreeValue = function() {
      if (this.value !== null && this.value.length !== 0) {
        var data = void 0;
        if (this.showCheckBox || this.allowMultiSelection) {
          for (var i = 0; i < this.value.length; i++) {
            data = this.treeObj.getTreeData(this.value[i])[0];
            if (isNullOrUndefined(data)) {
              this.value.splice(this.value.indexOf(this.value[i]), 1);
            }
          }
          if (this.value.length !== 0) {
            this.setValidValue();
          }
        } else {
          data = this.treeObj.getTreeData(this.value[0])[0];
          if (!isNullOrUndefined(data)) {
            this.setProperties({ text: data[this.fields.text] }, true);
            this.setValidValue();
          } else {
            this.setProperties({ value: this.currentValue }, true);
          }
        }
      }
    };
    DropDownTree2.prototype.setTreeText = function() {
      if (this.value !== null && !this.isInitialized) {
        return;
      }
      if (this.text !== null) {
        var data = void 0;
        var valArr = [];
        if (this.showCheckBox || this.allowMultiSelection) {
          var textArr = this.text.split(this.delimiterChar);
          for (var i = 0; i < textArr.length; i++) {
            data = this.getItems(textArr[i]);
            if (!isNullOrUndefined(data)) {
              valArr.push(data[this.fields.value].toString());
            }
          }
          if (valArr.length !== 0) {
            this.oldValue = this.value;
            this.setProperties({ value: valArr }, true);
            this.setValidValue();
          } else {
            this.setProperties({ text: this.currentText }, true);
          }
        } else {
          data = this.getItems(this.text);
          if (!isNullOrUndefined(data)) {
            this.oldValue = this.value;
            this.setProperties({ value: [data[this.fields.value].toString()] }, true);
            this.setValidValue();
          } else {
            this.setProperties({ text: this.currentText }, true);
          }
        }
      }
    };
    DropDownTree2.prototype.setSelectedValue = function() {
      if (this.value != null) {
        return;
      }
      if (!this.isInitialized) {
        this.oldValue = this.value;
        if (this.treeObj.selectedNodes.length > 0 && !this.showCheckBox) {
          this.setProperties({ value: this.treeObj.selectedNodes }, true);
          if (this.allowMultiSelection) {
            this.updateMode();
          }
        } else if (this.showCheckBox && this.treeObj.checkedNodes) {
          if (this.treeObj.checkedNodes.length > 0) {
            this.setProperties({ value: this.treeObj.checkedNodes }, true);
            setValue("selectedNodes", [], this.treeObj);
            this.treeObj.dataBind();
            this.updateMode();
          }
        }
        this.updateSelectedValues();
        this.currentText = this.text;
        this.currentValue = this.value;
      }
    };
    DropDownTree2.prototype.setValidValue = function() {
      var _this = this;
      if (!this.showCheckBox && !this.allowMultiSelection) {
        Input.setValue(this.text, this.inputEle, this.floatLabelType);
        var id = this.value[0].toString();
        if (this.treeObj.selectedNodes[0] !== id) {
          setValue("selectedNodes", [id], this.treeObj);
        }
      } else {
        if (this.showCheckBox) {
          var difference = this.value.length !== this.treeObj.checkedNodes.length || this.value.filter(function(e) {
            return _this.treeObj.checkedNodes.indexOf(e) === -1;
          }).length > 0;
          if (difference || this.treeSettings.autoCheck) {
            this.treeObj.checkedNodes = this.value.slice();
            this.treeObj.dataBind();
            this.setMultiSelect();
          }
        } else {
          this.treeObj.selectedNodes = this.value.slice();
          this.selectedText = [];
          this.updateSelectedValues();
        }
        this.treeObj.dataBind();
      }
      this.currentText = this.text;
      this.currentValue = this.value;
      if (!isNullOrUndefined(this.value) && this.value.length > 0 && !isNullOrUndefined(this.currentText)) {
        this.inputWrapper.setAttribute("aria-label", this.currentText.replace(/,/g, ", "));
      }
      if (this.isInitialized) {
        this.triggerChangeEvent();
      }
    };
    DropDownTree2.prototype.getItems = function(givenText) {
      var data;
      if (this.treeDataType === 1) {
        for (var i = 0; i < this.treeItems.length; i++) {
          var text = getValue(this.fields.text, this.treeItems[parseInt(i.toString(), 10)]);
          if (!isNullOrUndefined(this.treeItems[i]) && !isNullOrUndefined(text) && text === givenText) {
            data = this.treeItems[i];
            break;
          }
        }
      } else {
        data = this.getNestedItems(this.treeItems, this.fields, givenText);
      }
      return data;
    };
    DropDownTree2.prototype.getNestedItems = function(data, field, givenText) {
      var newData;
      for (var i = 0, objlen = data.length; i < objlen; i++) {
        var dataId = getValue(this.fields.text, data[parseInt(i.toString(), 10)]);
        if (data[i] && dataId && dataId.toString() === givenText) {
          return data[i];
        } else if (typeof field.child === "string" && !isNullOrUndefined(getValue(field.child, data[i]))) {
          var childData = getValue(field.child, data[parseInt(i.toString(), 10)]);
          newData = this.getNestedItems(childData, this.getChildType(field), givenText);
          if (newData !== void 0) {
            break;
          }
        } else if (this.fields.dataSource instanceof DataManager && !isNullOrUndefined(getValue("child", data[i]))) {
          var child = "child";
          newData = this.getNestedItems(getValue(child, data[parseInt(i.toString(), 10)]), this.getChildType(field), givenText);
          if (newData !== void 0) {
            break;
          }
        }
      }
      return newData;
    };
    DropDownTree2.prototype.getChildType = function(mapper) {
      return typeof mapper.child === "string" || isNullOrUndefined(mapper.child) ? mapper : mapper.child;
    };
    DropDownTree2.prototype.renderTree = function() {
      this.treeObj = new TreeView({
        fields: this.getTreeFields(this.fields),
        enableRtl: this.enableRtl,
        nodeSelected: this.onNodeSelected.bind(this),
        nodeChecked: this.onNodeChecked.bind(this),
        nodeChecking: this.beforeCheck.bind(this),
        nodeExpanded: this.onNodeExpanded.bind(this),
        actionFailure: this.onActionFailure.bind(this),
        nodeClicked: this.onNodeClicked.bind(this),
        dataBound: this.OnDataBound.bind(this),
        allowMultiSelection: this.allowMultiSelection,
        enableHtmlSanitizer: this.enableHtmlSanitizer,
        showCheckBox: this.showCheckBox,
        autoCheck: this.treeSettings.autoCheck,
        sortOrder: this.sortOrder,
        expandOn: this.treeSettings.expandOn,
        loadOnDemand: this.treeSettings.loadOnDemand,
        nodeSelecting: this.onBeforeSelect.bind(this),
        nodeTemplate: this.itemTemplate
      });
      this.treeObj.root = this.root ? this.root : this;
      this.treeObj.appendTo(this.tree);
    };
    DropDownTree2.prototype.renderPopup = function() {
      var _this = this;
      if (this.isFilteredData) {
        this.treeObj.element.classList.remove("e-filtering");
        this.filterObj.value = "";
        this.treeObj.fields = this.getTreeFields(this.fields);
        this.isFilterRestore = true;
        this.isFilteredData = false;
        this.hideCheckAll(false);
      }
      var isCancelled = false;
      var args = { cancel: false };
      this.trigger("beforeOpen", args, function(args2) {
        if (!args2.cancel) {
          addClass([_this.inputWrapper], [ICONANIMATION]);
          if (_this.isFirstRender) {
            _this.popupEle = _this.createElement("div", {
              id: _this.element.id + "_options",
              className: POPUP_CLASS + " " + (_this.cssClass != null ? _this.cssClass : "")
            });
            _this.popupEle.setAttribute("role", "region");
            _this.popupEle.setAttribute("aria-label", _this.element.id);
            document.body.appendChild(_this.popupEle);
            _this.createPopup(_this.popupEle);
          } else {
            _this.popupEle = _this.popupObj.element;
            if (_this.isReact && _this.isFilterRestore) {
              _this.treeObj.refresh();
              _this.isFilteredData = true;
              _this.popupEle.removeChild(_this.filterContainer);
            }
          }
        } else {
          isCancelled = true;
        }
        if (_this.isFirstRender && !isCancelled || _this.isFilteredData) {
          _this.isFilteredData = false;
          prepend([_this.popupDiv], _this.popupEle);
          removeClass([_this.popupDiv], DDTHIDEICON);
          if (_this.allowFiltering) {
            _this.renderFilter();
          }
          if (_this.showCheckBox && _this.showSelectAll && !_this.popupDiv.classList.contains(NODATA)) {
            _this.createSelectAllWrapper();
            _this.popupEle.insertBefore(_this.checkAllParent, _this.popupDiv);
          }
          if (_this.headerTemplate) {
            _this.setHeaderTemplate();
          }
          if (_this.footerTemplate) {
            _this.setFooterTemplate();
          }
          _this.isFirstRender = false;
          if (_this.hasTemplate && _this.portals) {
            if (_this.treeObj.portals) {
              _this.portals = _this.portals.concat(_this.treeObj.portals.filter(function(item) {
                return !_this.portals.includes(item);
              }));
            }
            if (_this.isReact) {
              _this.renderReactTemplates(_this.reactCallBack);
            }
          }
        }
        if (!isCancelled) {
          attributes(_this.inputEle, { "aria-expanded": "true" });
          _this.popupObj.show(null, _this.zIndex === 1e3 ? _this.inputEle : null);
          removeClass([_this.popupEle], DDTHIDEICON);
          _this.updatePopupHeight();
          _this.popupObj.refreshPosition();
          if (!(_this.showCheckBox && _this.showSelectAll) && (!_this.popupDiv.classList.contains(NODATA) && _this.treeItems.length > 0)) {
            var focusedElement = _this.value != null && _this.text != null ? _this.treeObj.element.querySelector('[data-uid="' + _this.value[0] + '"]') : null;
            if (focusedElement) {
              _this.treeObj.element.querySelector("li").setAttribute("tabindex", "-1");
              focusedElement.setAttribute("tabindex", "0");
            } else {
              var oldFocussedNode = _this.treeObj.element.querySelector(".e-node-focus");
              focusedElement = _this.treeObj.element.querySelector('li[tabindex="0"]:not(.e-disable):not(.e-prevent)') || _this.treeObj.element.querySelector("li:not(.e-disable):not(.e-prevent)");
              if (oldFocussedNode && oldFocussedNode !== focusedElement) {
                oldFocussedNode.setAttribute("tabindex", "-1");
                removeClass([oldFocussedNode], "e-node-focus");
              }
            }
            if (!_this.allowFiltering) {
              focusedElement.focus();
            }
            addClass([focusedElement], ["e-node-focus"]);
          }
          if (_this.treeObj.checkedNodes.length > 0) {
            var nodes = _this.treeObj.element.querySelectorAll("li");
            var checkedNodes = _this.treeObj.element.querySelectorAll("li[aria-checked=true]");
            if ((checkedNodes.length === nodes.length || _this.checkSelectAll) && _this.checkBoxElement) {
              var wrap = closest(_this.checkBoxElement, "." + CHECKBOXWRAP);
              _this.changeState(wrap, "check");
              _this.checkSelectAll = false;
            }
          }
          if (_this.allowFiltering) {
            removeClass([_this.inputWrapper], [INPUTFOCUS]);
            _this.filterObj.element.focus();
          }
          var eventArgs = { popup: _this.popupObj };
          _this.trigger("open", eventArgs);
        }
      });
    };
    DropDownTree2.prototype.reactCallBack = function() {
      this.updatePopupHeight();
      this.popupObj.refreshPosition();
    };
    DropDownTree2.prototype.updatePopupHeight = function() {
      if (this.isFirstRender) {
        return;
      }
      var popupHeight = this.getHeight();
      this.popupEle.style.maxHeight = popupHeight;
      if (this.allowFiltering) {
        var height = Math.round(this.filterContainer.getBoundingClientRect().height);
        popupHeight = formatUnit(parseInt(popupHeight, 10) - height + "px");
      }
      if (this.headerTemplate) {
        var height = Math.round(this.header.getBoundingClientRect().height);
        popupHeight = formatUnit(parseInt(popupHeight, 10) - height + "px");
      }
      if (this.showCheckBox && this.showSelectAll && !this.popupDiv.classList.contains(NODATA)) {
        var height = Math.round(this.checkAllParent.getBoundingClientRect().height);
        popupHeight = formatUnit(parseInt(popupHeight, 10) - height + "px");
      }
      if (this.footerTemplate) {
        var height = Math.round(this.footer.getBoundingClientRect().height);
        popupHeight = formatUnit(parseInt(popupHeight, 10) - height + "px");
      }
      var border = parseInt(window.getComputedStyle(this.popupEle).borderTopWidth, 10);
      border = border + parseInt(window.getComputedStyle(this.popupEle).borderBottomWidth, 10);
      popupHeight = formatUnit(parseInt(popupHeight, 10) - border + "px");
      this.popupDiv.style.maxHeight = popupHeight;
    };
    DropDownTree2.prototype.createPopup = function(element) {
      var _this = this;
      if (this.isFirstRender) {
        this.popupObj = new Popup(element, {
          width: this.setWidth(),
          targetType: "relative",
          collision: { X: "flip", Y: "flip" },
          relateTo: this.inputWrapper,
          zIndex: this.zIndex,
          enableRtl: this.enableRtl,
          position: { X: "left", Y: "bottom" },
          close: function() {
            _this.isPopupOpen = false;
          },
          open: function() {
            EventHandler.add(document, "mousedown", _this.onDocumentClick, _this);
            _this.isPopupOpen = true;
          },
          targetExitViewport: function() {
            if (!Browser.isDevice) {
              _this.hidePopup();
            }
          }
        });
      }
    };
    DropDownTree2.prototype.setElementWidth = function(inputWidth) {
      var ddElement = this.inputWrapper;
      if (!isNullOrUndefined(inputWidth)) {
        if (typeof inputWidth === "number") {
          ddElement.style.width = formatUnit(inputWidth);
        } else if (typeof inputWidth === "string") {
          ddElement.style.width = inputWidth.match(/px|%|em/) ? inputWidth : formatUnit(inputWidth);
        }
      }
    };
    DropDownTree2.prototype.setWidth = function() {
      var width = formatUnit(this.popupWidth);
      if (width.indexOf("%") > -1) {
        width = (this.inputWrapper.offsetWidth * parseFloat(width) / 100).toString() + "px";
      } else if (typeof this.popupWidth === "string") {
        width = this.popupWidth.match(/px|em/) ? this.popupWidth : width;
      }
      return width;
    };
    DropDownTree2.prototype.getHeight = function() {
      var height = formatUnit(this.popupHeight);
      if (height.indexOf("%") > -1) {
        height = (document.documentElement.clientHeight * parseFloat(height) / 100).toString() + "px";
      } else if (typeof this.popupHeight === "string") {
        height = this.popupHeight.match(/px|em/) ? this.popupHeight : height;
      }
      return height;
    };
    DropDownTree2.prototype.onDocumentClick = function(e) {
      var target = e.target;
      var isTree = closest(target, "." + PARENTITEM);
      var isFilter = closest(target, "." + FILTERWRAP);
      var isHeader = closest(target, "." + HEADER);
      var isFooter = closest(target, "." + FOOTER);
      var isScroller = target.classList.contains(DROPDOWN) ? true : matches(target, ".e-ddt .e-popup") || matches(target, ".e-ddt .e-treeview");
      if (this.isPopupOpen && (!isNullOrUndefined(this.inputWrapper) && this.inputWrapper.contains(target) || isTree || isScroller || isHeader || isFooter) || (this.allowMultiSelection || this.showCheckBox) && (this.isPopupOpen && target.classList.contains(CHIP_CLOSE) || this.isPopupOpen && (target.classList.contains(CHECKALLPARENT) || target.classList.contains(ALLTEXT) || target.classList.contains(CHECKBOXFRAME)))) {
        this.isDocumentClick = false;
        e.preventDefault();
      } else if (!isNullOrUndefined(this.inputWrapper) && !this.inputWrapper.contains(target) && this.inputFocus && !isFilter) {
        this.focusOut(e);
      }
    };
    DropDownTree2.prototype.onActionFailure = function(e) {
      this.trigger("actionFailure", e);
      this.l10nUpdate(true);
      addClass([this.popupDiv], NODATA);
    };
    DropDownTree2.prototype.OnDataBound = function(args) {
      this.treeItems = args.data;
      if (this.treeItems.length <= 0) {
        this.l10nUpdate();
        addClass([this.popupDiv], NODATA);
        this.hideCheckAll(true);
      } else if (this.popupDiv.classList.contains(NODATA) && this.treeItems.length >= 1) {
        removeClass([this.popupDiv], NODATA);
        this.hideCheckAll(false);
      }
      if (!this.isFilteredData) {
        this.treeDataType = this.getTreeDataType(this.treeItems, this.fields);
      }
      if (this.isFirstRender && this.isRemoteData) {
        this.setTreeValue();
        this.setTreeText();
        this.updateHiddenValue();
        this.setSelectedValue();
        if (!this.wrapText) {
          this.updateView();
        }
        this.treeObj.element.focus();
      }
      var eventArgs = { data: args.data };
      this.trigger("dataBound", eventArgs);
      if (this.filterObj === null) {
        this.isFilteredData = false;
      }
      if (this.isFilteredData) {
        this.treeObj.expandAll();
      }
      if (this.isFilterRestore) {
        this.restoreFilterSelection();
        this.isFilterRestore = false;
      }
    };
    DropDownTree2.prototype.restoreFilterSelection = function() {
      if (this.showCheckBox) {
        this.treeObj.checkedNodes = this.value ? this.value : [];
      } else {
        this.treeObj.selectedNodes = this.value ? this.value : [];
      }
    };
    DropDownTree2.prototype.setCssClass = function(newClass, oldClass) {
      var elements = this.popupObj ? [this.inputWrapper, this.popupObj.element] : [this.inputWrapper];
      if (!isNullOrUndefined(oldClass) && oldClass !== "") {
        removeClass(elements, oldClass.split(" "));
      }
      if (!isNullOrUndefined(newClass) && newClass !== "") {
        addClass(elements, newClass.split(" "));
      }
    };
    DropDownTree2.prototype.setEnableRTL = function(state) {
      if (state) {
        this.inputWrapper.classList.add(RTL3);
      } else {
        this.inputWrapper.classList.remove(RTL3);
      }
      if (this.popupObj) {
        this.popupObj.enableRtl = state;
        this.popupObj.dataBind();
      }
      if (this.treeObj) {
        this.treeObj.enableRtl = state;
        this.treeObj.dataBind();
      }
    };
    DropDownTree2.prototype.setEnable = function() {
      Input.setEnabled(this.enabled, this.inputEle);
      if (this.enabled) {
        removeClass([this.inputWrapper], DISABLED);
        this.inputEle.setAttribute("aria-disabled", "false");
        this.inputWrapper.setAttribute("aria-disabled", "false");
      } else {
        if (this.isPopupOpen) {
          this.hidePopup();
        }
        addClass([this.inputWrapper], DISABLED);
        if (this.inputWrapper && this.inputWrapper.classList.contains(INPUTFOCUS)) {
          removeClass([this.inputWrapper], [INPUTFOCUS]);
        }
        this.inputEle.setAttribute("aria-disabled", "true");
        this.inputWrapper.setAttribute("aria-disabled", "true");
      }
    };
    DropDownTree2.prototype.cloneFields = function(fields) {
      var clonedField = {
        dataSource: fields.dataSource,
        value: fields.value,
        text: fields.text,
        parentValue: fields.parentValue,
        child: this.cloneChildField(fields.child),
        hasChildren: fields.hasChildren,
        expanded: fields.expanded,
        iconCss: fields.iconCss,
        imageUrl: fields.imageUrl,
        htmlAttributes: fields.htmlAttributes,
        query: fields.query,
        selected: fields.selected,
        selectable: fields.selectable,
        tableName: fields.tableName,
        tooltip: fields.tooltip
      };
      return clonedField;
    };
    DropDownTree2.prototype.cloneChildField = function(fields) {
      if (typeof fields === "string") {
        return fields;
      } else {
        var clonedField = {
          dataSource: fields.dataSource,
          value: fields.value,
          text: fields.text,
          parentValue: fields.parentValue,
          child: fields.child ? this.cloneChildField(fields.child) : null,
          hasChildren: fields.hasChildren,
          expanded: fields.expanded,
          iconCss: fields.iconCss,
          imageUrl: fields.imageUrl,
          htmlAttributes: fields.htmlAttributes,
          query: fields.query,
          selected: fields.selected,
          selectable: fields.selectable,
          tableName: fields.tableName,
          tooltip: fields.tooltip
        };
        return clonedField;
      }
    };
    DropDownTree2.prototype.getTreeFields = function(fields) {
      var treeFields = {
        dataSource: fields.dataSource,
        id: fields.value,
        text: fields.text,
        parentID: fields.parentValue,
        child: this.getTreeChildren(fields.child),
        hasChildren: fields.hasChildren,
        expanded: fields.expanded,
        iconCss: fields.iconCss,
        imageUrl: fields.imageUrl,
        isChecked: fields.selected,
        htmlAttributes: fields.htmlAttributes,
        query: fields.query,
        selectable: fields.selectable,
        selected: fields.selected,
        tableName: fields.tableName,
        tooltip: fields.tooltip
      };
      return treeFields;
    };
    DropDownTree2.prototype.getTreeChildren = function(mapper) {
      if (typeof mapper === "string") {
        return mapper;
      } else if (!isNullOrUndefined(mapper)) {
        mapper = this.getActualProperties(mapper);
        var childFields = mapper;
        if (mapper.value) {
          childFields.id = mapper.value;
        }
        if (mapper.parentValue) {
          childFields.parentID = mapper.parentValue;
        }
        if (mapper.child) {
          childFields.child = this.getTreeChildren(mapper.child);
        }
        if (mapper.selected && this.showCheckBox) {
          childFields.isChecked = mapper.selected;
        }
        return childFields;
      }
      return null;
    };
    DropDownTree2.prototype.getTreeDataType = function(ds, field) {
      if (this.fields.dataSource instanceof DataManager) {
        for (var i = 0; i < ds.length; i++) {
          if (typeof field.child === "string" && isNullOrUndefined(getValue(field.child, ds[i]))) {
            return 1;
          }
        }
        return 2;
      }
      if (isNullOrUndefined(this.fields.dataSource)) {
        this.fields.dataSource = [];
      }
      for (var i = 0, len = this.fields.dataSource.length; i < len; i++) {
        if (typeof field.child === "string" && !isNullOrUndefined(getValue(field.child, this.fields.dataSource[i]))) {
          return 2;
        }
        if (!isNullOrUndefined(getValue(field.parentValue, this.fields.dataSource[i])) || !isNullOrUndefined(getValue(field.hasChildren, this.fields.dataSource[i]))) {
          return 1;
        }
      }
      return 1;
    };
    DropDownTree2.prototype.setFields = function() {
      this.resetValue();
      if (this.hasTemplate) {
        this.updateTemplate();
      }
      this.treeObj.fields = this.getTreeFields(this.fields);
      this.treeObj.dataBind();
    };
    DropDownTree2.prototype.getEventArgs = function(args) {
      var checkData = args.data;
      var selectData = args.nodeData;
      var state;
      if (this.showCheckBox) {
        if (args.action === "check") {
          state = "select";
        } else if (args.action === "uncheck") {
          state = "un-select";
        }
      }
      var eventArgs = {
        action: this.showCheckBox ? state : args.action,
        isInteracted: this.isClicked ? true : args.isInteracted,
        item: args.node,
        itemData: this.showCheckBox ? checkData[0] : selectData
      };
      return eventArgs;
    };
    DropDownTree2.prototype.onBeforeSelect = function(args) {
      if (args.isInteracted) {
        this.oldValue = this.value ? this.value.slice() : this.value;
        if (this.value === null) {
          this.setProperties({ value: [] }, true);
        }
      }
    };
    DropDownTree2.prototype.updateHiddenValue = function() {
      if (this.allowMultiSelection || this.showCheckBox) {
        return;
      }
      if (this.value && this.value.length) {
        this.hiddenElement.innerHTML = '<option selected value ="' + this.value[0] + '">' + this.text + "</option>";
      } else {
        this.hiddenElement.innerHTML = "";
      }
    };
    DropDownTree2.prototype.onNodeSelected = function(args) {
      if (this.showCheckBox) {
        return;
      }
      var eventArgs = this.getEventArgs(args);
      this.trigger("select", eventArgs);
      var selectedText;
      if (args.isInteracted) {
        var id = getValue("id", args.nodeData).toString();
        if (!this.allowMultiSelection) {
          this.hiddenElement.innerHTML = "";
          this.setProperties({ value: [id] }, true);
          if (this.itemTemplate) {
            selectedText = getValue("text", this.treeObj.getNode(id));
          } else {
            selectedText = getValue("text", args.nodeData).toString();
          }
          Input.setValue(selectedText, this.inputEle, this.floatLabelType);
          this.setProperties({ text: selectedText }, true);
          this.currentText = this.text;
          this.currentValue = this.value;
          if (!isNullOrUndefined(this.value) && this.value.length > 0) {
            this.inputWrapper.setAttribute("aria-label", args.nodeData.text.toString());
          }
          attributes(this.inputWrapper, { "aria-describedby": this.element.id });
          attributes(this.inputWrapper, { "aria-activedescendant": id.toString() });
          this.updateHiddenValue();
          this.showOverAllClear();
          this.hidePopup();
          this.isNodeSelected = true;
        } else if (this.allowMultiSelection) {
          this.setMultiSelect();
        }
      }
      if (this.isValueChange && !this.changeOnBlur) {
        this.triggerChangeEvent(this.keyEventArgs);
        this.isValueChange = false;
      }
    };
    DropDownTree2.prototype.onNodeClicked = function(args) {
      if (!this.changeOnBlur && this.isNodeSelected) {
        this.triggerChangeEvent(args.event);
        this.isNodeSelected = false;
      }
      var target = args.event.target;
      if ((target.classList.contains("e-fullrow") || target.classList.contains("e-list-text")) && this.showCheckBox) {
        this.isClicked = true;
        var getNodeDetails = this.treeObj.getNode(args.node);
        if (getNodeDetails.isChecked === "true") {
          this.treeObj.uncheckAll([args.node]);
        } else {
          this.treeObj.checkAll([args.node]);
        }
        this.isClicked = false;
        this.setMultiSelect();
        this.ensurePlaceHolder();
      }
      if (!this.changeOnBlur && (this.allowMultiSelection || this.showCheckBox)) {
        this.triggerChangeEvent(args.event);
      }
    };
    DropDownTree2.prototype.onNodeChecked = function(args) {
      var eventArgs = this.getEventArgs(args);
      this.trigger("select", eventArgs);
      if (this.isFilteredData && args.action === "uncheck") {
        var id = getValue("id", args.data[0]).toString();
        this.removeSelectedData(id, true);
      }
      if (!this.isChipDelete && args.isInteracted) {
        this.setMultiSelect();
        this.ensurePlaceHolder();
      }
      if (this.showSelectAll && this.checkBoxElement) {
        var checkedNodes = this.treeObj.element.querySelectorAll("li[aria-checked=true]");
        var wrap = closest(this.checkBoxElement, "." + CHECKBOXWRAP);
        if (wrap && args.action === "uncheck" && (args.isInteracted || checkedNodes.length === 0 || !isNullOrUndefined(args.data[0]) && args.data[0].isChecked === "false")) {
          this.isReverseUpdate = true;
          this.changeState(wrap, "uncheck");
          this.isReverseUpdate = false;
        } else if (wrap && args.action === "check" && checkedNodes.length === this.fields.dataSource.length && (args.isInteracted || this.isCheckAllCalled || !isNullOrUndefined(args.data[0]) && args.data[0].isChecked === "true")) {
          this.isReverseUpdate = true;
          this.isCheckAllCalled = false;
          this.changeState(wrap, "check");
          this.isReverseUpdate = false;
        }
      }
      if (this.isValueChange && !this.changeOnBlur) {
        this.triggerChangeEvent(this.keyEventArgs);
        this.isValueChange = false;
      }
    };
    DropDownTree2.prototype.beforeCheck = function(args) {
      if (args.isInteracted) {
        this.oldValue = this.value ? this.value.slice() : this.value;
      }
    };
    DropDownTree2.prototype.onNodeExpanded = function() {
      if (this.hasTemplate && this.portals && this.treeObj.portals) {
        for (var i = 0; i < this.treeObj.portals.length; i++) {
          if (this.portals.indexOf(this.treeObj.portals[i]) === -1) {
            this.portals.push(this.treeObj.portals[i]);
          }
        }
        this.renderReactTemplates();
      }
    };
    DropDownTree2.prototype.updateClearButton = function(state) {
      if (state) {
        if (!this.inputWrapper.contains(this.overAllClear)) {
          this.inputEle.parentElement.insertBefore(this.overAllClear, this.inputEle.nextSibling);
        } else {
          removeClass([this.overAllClear], HIDEICON);
          addClass([this.inputWrapper], SHOW_CLEAR);
        }
      } else {
        addClass([this.overAllClear], HIDEICON);
        removeClass([this.inputWrapper], SHOW_CLEAR);
      }
      if ((this.allowMultiSelection || this.showCheckBox) && this.chipWrapper) {
        var chipClose = selectAll("." + CHIP_CLOSE, this.chipWrapper);
        for (var i = 0; i < chipClose.length; i++) {
          if (!state) {
            addClass([chipClose[i]], HIDEICON);
          } else {
            removeClass([chipClose[i]], HIDEICON);
          }
        }
      }
    };
    DropDownTree2.prototype.updateDropDownIconState = function(state) {
      var spinIcon = select("." + DDTICON, this.inputWrapper);
      if (state) {
        if (!spinIcon) {
          Input.appendSpan(DROPDOWNICON, this.inputWrapper, this.createElement);
        } else {
          removeClass([spinIcon], HIDEICON);
        }
        addClass([this.inputWrapper], SHOW_DD_ICON);
      } else {
        addClass([spinIcon], HIDEICON);
        removeClass([this.inputWrapper], SHOW_DD_ICON);
      }
    };
    DropDownTree2.prototype.updateMode = function() {
      if (this.mode === "Custom") {
        return;
      }
      if (this.mode !== "Delimiter") {
        if (!this.inputWrapper.contains(this.chipWrapper)) {
          this.createChip();
        }
        var isValid = this.getValidMode();
        if (this.chipWrapper.classList.contains(HIDEICON) && isValid) {
          removeClass([this.chipWrapper], HIDEICON);
          addClass([this.inputWrapper], SHOW_CHIP);
        } else if (!isValid) {
          addClass([this.chipWrapper], HIDEICON);
          removeClass([this.inputWrapper], SHOW_CHIP);
        }
        var isValue = this.value !== null ? this.value.length !== 0 ? true : false : false;
        if (isValid && isValue) {
          addClass([this.inputEle], CHIP_INPUT);
        } else {
          removeClass([this.inputEle], CHIP_INPUT);
        }
      } else if (this.inputEle.classList.contains(CHIP_INPUT)) {
        removeClass([this.inputEle], CHIP_INPUT);
        if (this.chipWrapper) {
          addClass([this.chipWrapper], HIDEICON);
          removeClass([this.inputWrapper], SHOW_CHIP);
        }
      }
    };
    DropDownTree2.prototype.ensurePlaceHolder = function() {
      if (isNullOrUndefined(this.value) || this.value && this.value.length === 0) {
        removeClass([this.inputEle], CHIP_INPUT);
        if (this.chipWrapper) {
          addClass([this.chipWrapper], HIDEICON);
        }
      }
    };
    DropDownTree2.prototype.ensureClearIconPosition = function(floatLabelType) {
      if (floatLabelType !== "Never") {
        this.inputWrapper.insertBefore(this.overAllClear, this.inputObj.buttons[0]);
      }
    };
    DropDownTree2.prototype.setMultiSelectValue = function(newValues) {
      if (!this.isFilteredData) {
        this.setProperties({ value: this.isFromFilterChange && newValues && newValues.length === 0 ? this.value : newValues }, true);
        this.isFromFilterChange = false;
        if (newValues && newValues.length !== 0 && !this.showCheckBox && !this.ddtCompareValues(this.treeObj.selectedNodes, this.value.slice())) {
          this.treeObj.selectedNodes = this.value.slice();
          this.treeObj.dataBind();
        }
      } else {
        var selectedValues = isNullOrUndefined(this.value) ? [] : this.value;
        for (var i = 0; i < newValues.length; i++) {
          if (isNullOrUndefined(this.value) || this.value.indexOf(newValues[i]) === -1) {
            selectedValues.push(newValues[i]);
          }
        }
        this.setProperties({ value: selectedValues }, true);
      }
    };
    DropDownTree2.prototype.setMultiSelect = function() {
      if (this.showCheckBox && !this.isDynamicChange) {
        this.setMultiSelectValue(this.treeObj.checkedNodes.slice());
      } else {
        var ddtValue = this.allowMultiSelection ? this.showCheckBox ? this.treeObj.checkedNodes : this.treeObj.selectedNodes : this.value ? this.showCheckBox ? this.value : [this.value[0]] : null;
        this.setMultiSelectValue(ddtValue);
        if (this.showCheckBox && this.value !== null) {
          this.treeObj.checkedNodes = this.value;
          this.treeObj.dataBind();
        }
      }
      this.selectedText = [];
      var checkSelection = this.allowMultiSelection ? true : this.showCheckBox ? true : false;
      if (this.inputWrapper.contains(this.chipWrapper) && !checkSelection) {
        removeClass([this.inputEle], CHIP_INPUT);
        detach(this.chipWrapper);
      }
      var isValid = this.getValidMode();
      if (isValid && this.value !== null) {
        addClass([this.inputEle], CHIP_INPUT);
        if (this.chipWrapper) {
          removeClass([this.chipWrapper], HIDEICON);
        }
      }
      var isValue = this.value ? this.value.length ? true : false : false;
      if (this.chipWrapper && (this.mode === "Box" && !isValue)) {
        addClass([this.chipWrapper], HIDEICON);
        removeClass([this.inputEle], CHIP_INPUT);
      }
      this.updateSelectedValues();
    };
    DropDownTree2.prototype.getSelectedData = function(value) {
      var data = null;
      if (this.isFilteredData) {
        for (var i = 0; i < this.selectedData.length; i++) {
          if (getValue(this.treeSettings.loadOnDemand ? this.fields.value : "id", this.selectedData[i]).toString() === value) {
            data = this.selectedData[i];
            break;
          }
        }
      }
      if (isNullOrUndefined(data)) {
        if (this.treeSettings.loadOnDemand) {
          data = this.getNodeData(value);
        } else {
          data = this.treeObj.getNode(value);
        }
        if (!isNullOrUndefined(data)) {
          this.selectedData.push(data);
        }
      }
      return data;
    };
    DropDownTree2.prototype.getNodeData = function(id) {
      var childItems;
      if (isNullOrUndefined(id)) {
        return childItems;
      } else if (this.treeDataType === 1) {
        for (var i = 0, objlen = this.treeItems.length; i < objlen; i++) {
          var dataId = getValue(this.fields.value, this.treeItems[i]);
          if (!isNullOrUndefined(this.treeItems[i]) && !isNullOrUndefined(dataId) && dataId.toString() === id) {
            return this.treeItems[i];
          }
        }
      } else {
        return this.getChildNodeData(this.treeItems, this.fields, id);
      }
      return childItems;
    };
    DropDownTree2.prototype.getChildNodeData = function(obj, mapper, id) {
      var newChildItems;
      if (isNullOrUndefined(obj)) {
        return newChildItems;
      }
      for (var i = 0, objlen = obj.length; i < objlen; i++) {
        var dataValue = getValue(mapper.value, obj[i]);
        if (obj[i] && dataValue && dataValue.toString() === id) {
          return obj[i];
        } else if (typeof mapper.child === "string" && !isNullOrUndefined(getValue(mapper.child, obj[i]))) {
          var childNodeData = getValue(mapper.child, obj[i]);
          newChildItems = this.getChildNodeData(childNodeData, this.getChildMapperFields(mapper), id);
          if (newChildItems !== void 0) {
            break;
          }
        } else if (this.fields.dataSource instanceof DataManager && !isNullOrUndefined(getValue("child", obj[i]))) {
          var child = "child";
          newChildItems = this.getChildNodeData(getValue(child, obj[i]), this.getChildMapperFields(mapper), id);
          if (newChildItems !== void 0) {
            break;
          }
        }
      }
      return newChildItems;
    };
    DropDownTree2.prototype.getChildMapperFields = function(mapper) {
      return typeof mapper.child === "string" || isNullOrUndefined(mapper.child) ? mapper : mapper.child;
    };
    DropDownTree2.prototype.removeSelectedData = function(value, muteOnChange) {
      var selectedValues = isNullOrUndefined(this.value) ? [] : this.value.slice();
      selectedValues.splice(selectedValues.indexOf(value), 1);
      this.setProperties({ value: selectedValues }, muteOnChange);
      for (var i = 0; i < this.selectedData.length; i++) {
        if (getValue(this.treeSettings.loadOnDemand ? this.fields.value : "id", this.selectedData[i]).toString() === value) {
          this.selectedData.splice(i, 1);
          break;
        }
      }
    };
    DropDownTree2.prototype.updateSelectedValues = function() {
      this.dataValue = "";
      var temp;
      var text;
      var textValue = "";
      var selectedData;
      this.hiddenElement.innerHTML = "";
      var hiddenInputValue = "";
      if ((!this.isChipDelete || this.treeSettings.autoCheck) && this.inputWrapper.contains(this.chipWrapper)) {
        this.chipCollection.innerHTML = "";
      }
      if (!this.isFilteredData) {
        this.selectedData = [];
      }
      if (!isNullOrUndefined(this.value)) {
        for (var i = 0, len = this.value.length; i < len; i++) {
          selectedData = this.getSelectedData(this.value[i]);
          text = getValue(this.treeSettings.loadOnDemand ? this.fields.text : "text", selectedData);
          this.selectedText.push(text);
          temp = this.selectedText[this.selectedText.length - 1];
          if (this.selectedText.length > 1) {
            this.dataValue += this.delimiterChar + " " + temp;
            textValue += "," + temp;
          } else {
            this.dataValue += temp;
            textValue += temp;
          }
          if (this.mode !== "Custom" && this.mode !== "Delimiter" && (!this.isChipDelete || this.treeSettings.autoCheck) && (this.allowMultiSelection || this.showCheckBox)) {
            this.setChipValues(temp, this.value[i]);
          }
          hiddenInputValue += '<option selected value ="' + this.value[i] + '">' + this.selectedText[this.selectedText.length - 1] + "</option>";
        }
        if (this.selectedText.length >= 1) {
          this.setProperties({ text: textValue }, true);
        }
        this.hiddenElement.innerHTML = hiddenInputValue;
        if (this.mode === "Custom" && (this.allowMultiSelection || this.showCheckBox)) {
          this.setTagValues();
        }
      }
      var isValid = this.getValidMode();
      if (this.mode !== "Custom" && this.mode !== "Box" && (this.allowMultiSelection || this.showCheckBox) && !isValid) {
        if (this.chipWrapper) {
          addClass([this.chipWrapper], HIDEICON);
          removeClass([this.inputWrapper], SHOW_CHIP);
        }
      }
      Input.setValue(this.dataValue, this.inputEle, this.floatLabelType);
      if (textValue === "") {
        this.setProperties({ text: null }, true);
      } else {
        this.setProperties({ text: textValue }, true);
      }
      if (this.showClearButton && this.inputFocus) {
        this.showOverAllClear();
      }
      if ((this.allowMultiSelection || this.showCheckBox) && this.popupObj) {
        this.popupObj.refreshPosition();
      }
      this.currentText = this.text;
      this.currentValue = this.value;
      if (!isNullOrUndefined(this.value) && this.value.length > 0 && !isNullOrUndefined(this.currentText)) {
        this.inputWrapper.setAttribute("aria-label", this.currentText.replace(/,/g, ", "));
      } else {
        this.inputWrapper.setAttribute("aria-label", this.getModuleName());
      }
    };
    DropDownTree2.prototype.setChipValues = function(text, value) {
      if (!this.inputWrapper.contains(this.chipWrapper)) {
        this.createChip();
      }
      var chip = this.createElement("span", {
        className: CHIP,
        attrs: { "data-value": value }
      });
      var chipContent = this.createElement("span", { className: CHIP_CONTENT });
      var chipClose = this.createElement("span", { className: CHIP_CLOSE + " " + ICONS });
      if (this.enableHtmlSanitizer) {
        chipContent.innerText = SanitizeHtmlHelper.sanitize(text);
      } else {
        chipContent.innerHTML = text;
      }
      chip.appendChild(chipContent);
      this.chipCollection.appendChild(chip);
      if (this.showClearButton) {
        chip.appendChild(chipClose);
        EventHandler.add(chipClose, "mousedown", this.removeChip, this);
      }
    };
    DropDownTree2.prototype.setTagValues = function() {
      if (this.value === null || this.text == null) {
        return;
      }
      if (!this.inputWrapper.contains(this.chipWrapper)) {
        this.createChip();
      }
      if (!this.inputWrapper.classList.contains(SHOW_CHIP)) {
        addClass([this.inputWrapper], SHOW_CHIP);
      }
      var chip = this.createElement("span", {
        className: CHIP
      });
      if (!this.inputEle.classList.contains(CHIP_INPUT)) {
        addClass([this.inputEle], CHIP_INPUT);
      }
      if (this.chipWrapper.classList.contains(HIDEICON)) {
        removeClass([this.chipWrapper], HIDEICON);
      }
      var chipContent = this.createElement("span", { className: CHIP_CONTENT });
      var template = this.customTemplate;
      var templateId = this.customTemplateId;
      var templatestring = "customTemplate";
      var compiledString = this.templateComplier(template);
      var tempArr = compiledString({ "value": this.value, "text": this.text }, this, templatestring, templateId, this.isStringTemplate, void 0, chipContent);
      if (tempArr) {
        tempArr = Array.prototype.slice.call(tempArr);
        append(tempArr, chipContent);
      }
      chip.appendChild(chipContent);
      this.chipCollection.appendChild(chip);
    };
    DropDownTree2.prototype.setSelectAllWrapper = function(state) {
      if (this.isFirstRender) {
        return;
      }
      if (state && !this.popupEle.contains(this.checkAllParent) && this.showCheckBox) {
        this.createSelectAllWrapper();
        this.popupEle.insertBefore(this.checkAllParent, this.popupDiv);
      } else if (this.popupEle.contains(this.checkAllParent)) {
        detach(this.checkAllParent);
        this.checkAllParent = null;
      }
    };
    DropDownTree2.prototype.setHeaderTemplate = function() {
      if (this.header) {
        this.header.innerHTML = "";
      } else {
        this.header = this.createElement("div");
        addClass([this.header], HEADER);
      }
      var compiledString = this.templateComplier(this.headerTemplate);
      var tempArr = compiledString({}, this, "headerTemplate", this.headerTemplateId, this.isStringTemplate, void 0, this.header);
      if (tempArr) {
        tempArr = Array.prototype.slice.call(tempArr);
        append(tempArr, this.header);
      }
      this.popupEle.insertBefore(this.header, this.checkAllParent ? this.checkAllParent : this.popupDiv);
    };
    DropDownTree2.prototype.templateComplier = function(template) {
      if (template) {
        try {
          if (typeof template !== "function" && document.querySelectorAll(template).length) {
            return compile(document.querySelector(template).innerHTML.trim());
          } else {
            return compile(template);
          }
        } catch (e) {
          return compile(template);
        }
      }
      return compile(template);
    };
    DropDownTree2.prototype.setFooterTemplate = function() {
      if (this.footer) {
        if (this.isReact && typeof this.footerTemplate === "function") {
          this.clearTemplate(["footerTemplate"]);
        } else {
          this.footer.innerHTML = "";
        }
      } else {
        this.footer = this.createElement("div");
        addClass([this.footer], FOOTER);
      }
      var compiledString = this.templateComplier(this.footerTemplate);
      var tempArr = compiledString({}, this, "footerTemplate", this.footerTemplateId, this.isStringTemplate, void 0, this.footer);
      if (tempArr) {
        tempArr = Array.prototype.slice.call(tempArr);
        append(tempArr, this.footer);
      }
      append([this.footer], this.popupEle);
    };
    DropDownTree2.prototype.clearAll = function(e) {
      if (!this.enabled || this.readonly) {
        return;
      }
      this.resetValue();
      this.showOverAllClear();
      if (this.allowMultiSelection || this.showCheckBox) {
        if (this.popupObj) {
          this.popupObj.refreshPosition();
        }
        if (!this.wrapText) {
          this.updateOverflowWrapper(true);
        }
      }
      if (e) {
        this.isClearButtonClick = true;
      }
      if (!this.changeOnBlur) {
        this.triggerChangeEvent(e);
      }
    };
    DropDownTree2.prototype.removeChip = function(e) {
      if (!this.enabled || this.readonly) {
        return;
      }
      var element = e.target.parentElement;
      var value = element.getAttribute("data-value");
      if (this.chipCollection) {
        if (element) {
          remove(element);
        }
      }
      this.isChipDelete = true;
      this.isClearButtonClick = true;
      this.removeSelectedData(value, true);
      this.selectedText = [];
      if (this.allowMultiSelection) {
        this.treeObj.selectedNodes = this.value.slice();
        this.updateSelectedValues();
      }
      if (this.showCheckBox) {
        this.treeObj.uncheckAll([value]);
        this.clearCheckAll();
        this.setMultiSelect();
      }
      this.triggerChangeEvent(e);
      this.isChipDelete = false;
      this.ensurePlaceHolder();
    };
    DropDownTree2.prototype.resetValue = function(isDynamicChange) {
      if (Array.isArray(this.value) && this.value.length === 0 && this.text == null) {
        return;
      }
      Input.setValue(null, this.inputEle, this.floatLabelType);
      if (!isDynamicChange) {
        this.oldValue = this.value;
        this.setProperties({ value: [] }, true);
      }
      if (isNullOrUndefined(this.value) || this.value.length === 0) {
        this.inputWrapper.setAttribute("aria-label", this.getModuleName());
      }
      this.dataValue = null;
      this.setProperties({ text: null }, true);
      this.selectedData = [];
      setValue("selectedNodes", [], this.treeObj);
      this.hiddenElement.innerHTML = "";
      if (this.showCheckBox) {
        this.treeObj.uncheckAll();
        this.setMultiSelect();
        this.clearCheckAll();
      }
      if (this.oldValue === null && !isDynamicChange) {
        this.removeValue = true;
      } else if (isDynamicChange) {
        this.triggerChangeEvent();
      }
      if ((this.allowMultiSelection || this.showCheckBox) && this.chipWrapper) {
        this.chipCollection.innerHTML = "";
        if (!this.wrapText) {
          this.updateOverflowWrapper(true);
        }
        this.ensurePlaceHolder();
      }
    };
    DropDownTree2.prototype.clearCheckAll = function() {
      if (this.showSelectAll && this.value && this.value.length === 0) {
        this.setLocale(false);
      }
    };
    DropDownTree2.prototype.selectAllItems = function(state) {
      if (this.showCheckBox) {
        if (state) {
          this.isCheckAllCalled = true;
          this.treeObj.checkAll();
        } else {
          this.treeObj.uncheckAll();
        }
        this.checkSelectAll = state;
      } else if (this.allowMultiSelection) {
        if (!state) {
          this.treeObj.selectedNodes = [];
        } else {
          var li = selectAll("li", this.treeObj.element);
          var id = void 0;
          var arr = [];
          for (var i = 0; i < li.length; i++) {
            id = li[i].getAttribute("data-uid").toString();
            arr.push(id);
          }
          this.treeObj.selectedNodes = arr;
        }
      }
      this.updateMode();
      this.setMultiSelect();
      if (!this.wrapText) {
        if (state) {
          this.updateView();
        } else {
          this.updateOverflowWrapper(true);
        }
      }
    };
    DropDownTree2.prototype.updateTreeSettings = function(prop) {
      var value = Object.keys(prop.treeSettings)[0];
      if (value === "autoCheck") {
        this.treeObj.autoCheck = this.treeSettings.autoCheck;
      } else if (value === "loadOnDemand") {
        this.treeObj.loadOnDemand = this.treeSettings.loadOnDemand;
      } else if (value === "expandOn") {
        this.treeObj.expandOn = this.treeSettings.expandOn;
        this.treeObj.dataBind();
        return;
      }
      this.treeObj.dataBind();
      this.setMultiSelect();
      this.updateValue(this.value);
    };
    DropDownTree2.prototype.updateCheckBoxState = function(checkBox) {
      if (this.hasTemplate) {
        this.updateTemplate();
      }
      if (!this.wrapText) {
        this.updateOverflowWrapper(false);
      }
      this.treeObj.showCheckBox = checkBox;
      this.treeObj.dataBind();
      this.isDynamicChange = true;
      this.setSelectAllWrapper(this.showSelectAll);
      if (this.showSelectAll) {
        this.setLocale();
      }
      if (this.showCheckBox) {
        this.updateMode();
      }
      this.setMultiSelect();
      this.isDynamicChange = false;
    };
    DropDownTree2.prototype.updateTemplate = function() {
      if (this.popupObj) {
        this.clearTemplate();
        this.portals = [];
        this.popupObj.destroy();
        if (this.isPopupOpen) {
          this.hidePopup();
          this.isFirstRender = true;
          this.renderPopup();
        } else {
          this.isFirstRender = true;
        }
      }
    };
    DropDownTree2.prototype.l10nUpdate = function(actionFailure) {
      if (this.noRecord) {
        this.noRecord.innerHTML = "";
      } else {
        this.noRecord = this.createElement("div");
      }
      if (this.noRecordsTemplate !== "No Records Found" || this.actionFailureTemplate !== "The Request Failed") {
        var template = actionFailure ? this.actionFailureTemplate : this.noRecordsTemplate;
        var templateId = actionFailure ? this.actionFailureTemplateId : this.noRecordsTemplateId;
        var templatestring = actionFailure ? "actionFailureTemplate" : "noRecordsTemplate";
        var compiledString = this.templateComplier(template);
        var tempArr = compiledString({}, this, templatestring, templateId, this.isStringTemplate, void 0, this.noRecord);
        if (tempArr) {
          tempArr = Array.prototype.slice.call(tempArr);
          append(tempArr, this.noRecord);
        }
      } else {
        var l10nLocale = { noRecordsTemplate: "No Records Found", actionFailureTemplate: "The Request Failed" };
        this.l10n = new L10n(this.getLocaleName(), l10nLocale, this.locale);
        this.noRecord.innerHTML = actionFailure ? this.l10n.getConstant("actionFailureTemplate") : this.l10n.getConstant("noRecordsTemplate");
      }
      addClass([this.noRecord], NODATACONTAINER);
      prepend([this.noRecord], this.popupDiv);
    };
    DropDownTree2.prototype.updateRecordTemplate = function(action) {
      if (this.treeItems && this.treeItems.length <= 0) {
        this.l10nUpdate(action);
        if (this.hasTemplate) {
          this.updateTemplate();
        }
      }
    };
    DropDownTree2.prototype.updateOverflowWrapper = function(state) {
      if (!state) {
        if (!this.inputWrapper.contains(this.overFlowWrapper)) {
          this.overFlowWrapper = this.createElement("span", { className: OVERFLOW_VIEW + " " + HIDEICON });
          this.inputWrapper.insertBefore(this.overFlowWrapper, this.hiddenElement);
        }
      } else if (this.inputWrapper.contains(this.overFlowWrapper) && state) {
        this.overFlowWrapper.innerHTML = "";
      }
    };
    DropDownTree2.prototype.updateMultiSelection = function(state) {
      if (!this.wrapText) {
        this.updateOverflowWrapper(false);
      }
      this.treeObj.allowMultiSelection = state;
      this.treeObj.dataBind();
      this.updateOption();
      if (this.allowMultiSelection) {
        this.updateMode();
      }
      this.setMultiSelect();
    };
    DropDownTree2.prototype.updateAllowFiltering = function(state) {
      if (!this.isFirstRender) {
        if (state) {
          this.renderFilter();
        } else {
          this.destroyFilter();
        }
      }
    };
    DropDownTree2.prototype.updateFilterPlaceHolder = function() {
      if (this.filterObj) {
        this.filterObj.placeholder = this.filterBarPlaceholder;
        this.filterObj.element.setAttribute("aria-label", this.filterBarPlaceholder);
      }
    };
    DropDownTree2.prototype.updateValue = function(value) {
      this.isDynamicChange = true;
      if (isNullOrUndefined(value) || value.length === 0) {
        this.resetValue(true);
      } else {
        this.setTreeValue();
        if ((this.allowMultiSelection || this.showCheckBox) && !this.wrapText) {
          this.updateOverflowWrapper(false);
          this.updateView();
        }
      }
      this.updateHiddenValue();
      this.isDynamicChange = false;
    };
    DropDownTree2.prototype.updateText = function(text) {
      if (isNullOrUndefined(text)) {
        this.resetValue();
      } else {
        this.setTreeText();
        if ((this.allowMultiSelection || this.showCheckBox) && !this.wrapText) {
          this.updateOverflowWrapper(false);
          this.updateView();
        }
      }
      this.updateHiddenValue();
    };
    DropDownTree2.prototype.updateModelMode = function() {
      var validMode = this.allowMultiSelection ? true : this.showCheckBox ? true : false;
      if (!validMode) {
        return;
      }
      if (!this.wrapText) {
        var overFlow = select("." + OVERFLOW_VIEW, this.inputWrapper);
        if (overFlow) {
          overFlow.innerHTML = "";
        }
      }
      this.updateMode();
      this.setMultiSelect();
      if (!this.wrapText && (this.value && this.value.length !== 0)) {
        this.updateOverFlowView();
        addClass([this.inputEle], CHIP_INPUT);
        if (this.mode === "Box") {
          removeClass([this.overFlowWrapper, this.inputWrapper], SHOW_TEXT);
        } else {
          addClass([this.overFlowWrapper, this.inputWrapper], SHOW_TEXT);
        }
      }
    };
    DropDownTree2.prototype.updateOption = function() {
      if (!this.hiddenElement.hasAttribute("multiple") && (this.allowMultiSelection || this.showCheckBox)) {
        this.hiddenElement.setAttribute("multiple", "");
      } else if (this.hiddenElement.hasAttribute("multiple") && (!this.allowMultiSelection && !this.showCheckBox)) {
        this.hiddenElement.removeAttribute("multiple");
      }
    };
    DropDownTree2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "width":
            this.setElementWidth(newProp.width);
            if (this.popupObj) {
              this.popupObj.element.style.width = this.setWidth();
            }
            break;
          case "placeholder":
            Input.setPlaceholder(newProp.placeholder, this.inputEle);
            break;
          case "cssClass":
            this.setCssClass(newProp.cssClass, oldProp.cssClass);
            break;
          case "enableRtl":
            this.setEnableRTL(this.enableRtl);
            break;
          case "fields":
            this.setFields();
            break;
          case "readonly":
            Input.setReadonly(newProp.readonly, this.inputEle);
            break;
          case "enabled":
            this.setEnable();
            break;
          case "floatLabelType":
            Input.removeFloating(this.inputObj);
            Input.addFloating(this.inputEle, newProp.floatLabelType, this.placeholder, this.createElement);
            this.ensureClearIconPosition(newProp.floatLabelType);
            break;
          case "showClearButton":
            this.updateClearButton(newProp.showClearButton);
            break;
          case "allowFiltering":
            this.updateAllowFiltering(newProp.allowFiltering);
            break;
          case "filterBarPlaceholder":
            this.updateFilterPlaceHolder();
            break;
          case "value":
            this.oldValue = oldProp.value;
            this.updateValue(newProp.value);
            break;
          case "text":
            this.updateText(newProp.text);
            break;
          case "allowMultiSelection":
            this.updateMultiSelection(newProp.allowMultiSelection);
            break;
          case "mode":
            if (!this.showCheckBox && !this.allowMultiSelection) {
              return;
            }
            if (this.mode === "Custom") {
              if (this.overFlowWrapper) {
                detach(this.overFlowWrapper);
              }
              if (this.chipWrapper) {
                detach(this.chipWrapper);
              }
              this.setTagValues();
            } else {
              if (oldProp.mode === "Custom") {
                this.updateOverflowWrapper(this.wrapText);
              }
              this.updateModelMode();
            }
            break;
          case "delimiterChar":
            if (this.mode === "Box") {
              return;
            }
            if (this.showCheckBox || this.allowMultiSelection) {
              this.setMultiSelect();
            }
            break;
          case "selectAllText":
            if (this.showCheckBox && this.showSelectAll) {
              this.setLocale();
            }
            break;
          case "unSelectAllText":
            if (this.showCheckBox && this.showSelectAll) {
              this.setLocale(false);
            }
            break;
          case "showSelectAll":
            if (this.showCheckBox) {
              this.setSelectAllWrapper(newProp.showSelectAll);
              this.updatePopupHeight();
            }
            break;
          case "showCheckBox":
            this.updateCheckBoxState(newProp.showCheckBox);
            if (!this.wrapText) {
              this.updateOverflowWrapper(true);
            }
            this.updatePopupHeight();
            this.updateOption();
            break;
          case "treeSettings":
            this.updateTreeSettings(newProp);
            break;
          case "customTemplate":
            if (this.mode !== "Custom") {
              return;
            }
            this.chipCollection.innerHTML = "";
            this.setTagValues();
            break;
          case "sortOrder":
            if (this.hasTemplate) {
              this.updateTemplate();
            }
            this.treeObj.sortOrder = newProp.sortOrder;
            this.treeObj.dataBind();
            this.updateValue(this.value);
            break;
          case "showDropDownIcon":
            this.updateDropDownIconState(newProp.showDropDownIcon);
            break;
          case "popupWidth":
            if (this.popupObj) {
              this.popupObj.element.style.width = this.setWidth();
            }
            break;
          case "popupHeight":
            if (this.popupObj) {
              this.updatePopupHeight();
            }
            break;
          case "zIndex":
            if (this.popupObj) {
              this.popupObj.zIndex = newProp.zIndex;
              this.popupObj.dataBind();
            }
            break;
          case "headerTemplate":
            this.updateTemplate();
            break;
          case "footerTemplate":
            this.updateTemplate();
            break;
          case "itemTemplate":
            this.updateTemplate();
            this.treeObj.nodeTemplate = newProp.itemTemplate;
            this.treeObj.dataBind();
            break;
          case "noRecordsTemplate":
            this.updateRecordTemplate();
            break;
          case "actionFailureTemplate":
            this.updateRecordTemplate(true);
            break;
          case "htmlAttributes":
            this.setHTMLAttributes();
            break;
          case "wrapText":
            this.updateOverflowWrapper(this.wrapText);
            if ((this.allowMultiSelection || this.showCheckBox) && !this.wrapText) {
              this.updateView();
            } else {
              addClass([this.overFlowWrapper], HIDEICON);
              if (this.chipWrapper && this.mode === "Box") {
                removeClass([this.chipWrapper], HIDEICON);
              } else {
                removeClass([this.inputWrapper], SHOW_CHIP);
                removeClass([this.inputEle], CHIP_INPUT);
              }
              this.ensurePlaceHolder();
            }
            break;
        }
      }
    };
    DropDownTree2.prototype.clear = function() {
      this.clearAll();
      if (this.inputFocus) {
        this.onFocusOut();
      } else {
        if (this.changeOnBlur) {
          this.triggerChangeEvent();
        }
        this.removeValue = false;
      }
    };
    DropDownTree2.prototype.destroy = function() {
      this.clearTemplate();
      this.unWireEvents();
      this.setCssClass(null, this.cssClass);
      this.setProperties({ text: null }, true);
      this.treeObj.destroy();
      this.destroyFilter();
      if (this.popupObj) {
        this.popupObj.destroy();
        detach(this.popupObj.element);
      }
      if (this.element.tagName !== this.getDirective()) {
        this.inputWrapper.parentElement.insertBefore(this.element, this.inputWrapper);
      }
      Input.setValue(null, this.inputEle, this.floatLabelType);
      detach(this.inputWrapper);
      detach(this.popupDiv);
      detach(this.hiddenElement);
      Input.setRipple(false, [this.inputObj]);
      this.element.classList.remove("e-input");
      if (this.showCheckBox || this.allowMultiSelection) {
        this.element.classList.remove(CHIP_INPUT);
      }
      detach(this.inputObj.container);
      if (this.inputObj.buttons.length) {
        detach(this.inputObj.buttons[0]);
      }
      this.inputObj = null;
      while (this.hiddenElement.options.length > 0) {
        this.hiddenElement.remove(0);
      }
      this.hiddenElement.innerHTML = "";
      this.hiddenElement = null;
      this.inputWrapper.innerHTML = "";
      this.inputWrapper = null;
      this.popupDiv = null;
      this.tree = null;
      this.popupObj = null;
      this.treeObj = null;
      this.overAllClear = null;
      if (this.chipCollection) {
        var chipsIcons = selectAll(".e-chips-close", this.chipCollection);
        for (var _i = 0, chipsIcons_1 = chipsIcons; _i < chipsIcons_1.length; _i++) {
          var element = chipsIcons_1[_i];
          EventHandler.remove(element, "mousedown", this.removeChip);
        }
      }
      this.chipWrapper = null;
      this.chipCollection = null;
      this.checkAllParent = null;
      this.selectAllSpan = null;
      this.checkBoxElement = null;
      this.checkWrapper = null;
      this.popupEle = null;
      this.header = null;
      this.footer = null;
      this.overFlowWrapper = null;
      this.keyboardModule = null;
      _super.prototype.destroy.call(this);
      this.setProperties({ value: [] }, true);
    };
    DropDownTree2.prototype.destroyFilter = function() {
      if (this.filterObj) {
        this.filterObj.destroy();
        detach(this.filterObj.element);
        detach(this.filterContainer);
        this.filterObj = null;
      }
    };
    DropDownTree2.prototype.destroyPopup = function() {
      this.isPopupOpen = false;
      if (this.isReact) {
        this.clearTemplate();
      }
      if (this.popupObj) {
        this.popupObj.destroy();
        detach(this.popupObj.element);
      }
    };
    DropDownTree2.prototype.ensureVisible = function(item) {
      this.treeObj.ensureVisible(item);
    };
    DropDownTree2.prototype.getData = function(item) {
      return this.treeObj.getTreeData(item);
    };
    DropDownTree2.prototype.hidePopup = function() {
      var eventArgs = { popup: this.popupObj, cancel: false };
      this.trigger("close", eventArgs);
      if (eventArgs.cancel) {
        return;
      }
      this.inputWrapper.classList.remove(ICONANIMATION);
      if (this.popupEle) {
        addClass([this.popupEle], DDTHIDEICON);
      }
      attributes(this.inputEle, { "aria-expanded": "false" });
      if (this.popupObj && this.isPopupOpen) {
        this.popupObj.hide();
        if (this.inputFocus) {
          this.inputWrapper.focus();
          if (this.allowFiltering) {
            addClass([this.inputWrapper], [INPUTFOCUS]);
          }
        }
        if (this.destroyPopupOnHide) {
          this.isFirstRender = true;
          this.destroyPopup();
        }
      }
    };
    DropDownTree2.prototype.selectAll = function(state) {
      this.selectAllItems(state);
    };
    DropDownTree2.prototype.showPopup = function() {
      if (!this.enabled || this.readonly || this.isPopupOpen) {
        return;
      }
      this.renderPopup();
      this.focusIn();
    };
    DropDownTree2.prototype.getModuleName = function() {
      return "dropdowntree";
    };
    __decorate6([
      Property("The Request Failed")
    ], DropDownTree2.prototype, "actionFailureTemplate", void 0);
    __decorate6([
      Property(false)
    ], DropDownTree2.prototype, "allowFiltering", void 0);
    __decorate6([
      Property(false)
    ], DropDownTree2.prototype, "allowMultiSelection", void 0);
    __decorate6([
      Property(true)
    ], DropDownTree2.prototype, "changeOnBlur", void 0);
    __decorate6([
      Property("")
    ], DropDownTree2.prototype, "cssClass", void 0);
    __decorate6([
      Property("${value.length} item(s) selected")
    ], DropDownTree2.prototype, "customTemplate", void 0);
    __decorate6([
      Property(",")
    ], DropDownTree2.prototype, "delimiterChar", void 0);
    __decorate6([
      Property(true)
    ], DropDownTree2.prototype, "enabled", void 0);
    __decorate6([
      Complex({}, Fields)
    ], DropDownTree2.prototype, "fields", void 0);
    __decorate6([
      Property(null)
    ], DropDownTree2.prototype, "filterBarPlaceholder", void 0);
    __decorate6([
      Property("StartsWith")
    ], DropDownTree2.prototype, "filterType", void 0);
    __decorate6([
      Property("Never")
    ], DropDownTree2.prototype, "floatLabelType", void 0);
    __decorate6([
      Property(null)
    ], DropDownTree2.prototype, "footerTemplate", void 0);
    __decorate6([
      Property(false)
    ], DropDownTree2.prototype, "ignoreAccent", void 0);
    __decorate6([
      Property(true)
    ], DropDownTree2.prototype, "ignoreCase", void 0);
    __decorate6([
      Property(null)
    ], DropDownTree2.prototype, "headerTemplate", void 0);
    __decorate6([
      Property({})
    ], DropDownTree2.prototype, "htmlAttributes", void 0);
    __decorate6([
      Property(null)
    ], DropDownTree2.prototype, "itemTemplate", void 0);
    __decorate6([
      Property("Default")
    ], DropDownTree2.prototype, "mode", void 0);
    __decorate6([
      Property("No Records Found")
    ], DropDownTree2.prototype, "noRecordsTemplate", void 0);
    __decorate6([
      Property(null)
    ], DropDownTree2.prototype, "placeholder", void 0);
    __decorate6([
      Property("300px")
    ], DropDownTree2.prototype, "popupHeight", void 0);
    __decorate6([
      Property("100%")
    ], DropDownTree2.prototype, "popupWidth", void 0);
    __decorate6([
      Property(false)
    ], DropDownTree2.prototype, "readonly", void 0);
    __decorate6([
      Property(false)
    ], DropDownTree2.prototype, "showSelectAll", void 0);
    __decorate6([
      Property("Select All")
    ], DropDownTree2.prototype, "selectAllText", void 0);
    __decorate6([
      Property(false)
    ], DropDownTree2.prototype, "showCheckBox", void 0);
    __decorate6([
      Property(true)
    ], DropDownTree2.prototype, "destroyPopupOnHide", void 0);
    __decorate6([
      Property(true)
    ], DropDownTree2.prototype, "enableHtmlSanitizer", void 0);
    __decorate6([
      Property(true)
    ], DropDownTree2.prototype, "showClearButton", void 0);
    __decorate6([
      Property(true)
    ], DropDownTree2.prototype, "showDropDownIcon", void 0);
    __decorate6([
      Property("None")
    ], DropDownTree2.prototype, "sortOrder", void 0);
    __decorate6([
      Property(null)
    ], DropDownTree2.prototype, "text", void 0);
    __decorate6([
      Complex({}, TreeSettings)
    ], DropDownTree2.prototype, "treeSettings", void 0);
    __decorate6([
      Property("Unselect All")
    ], DropDownTree2.prototype, "unSelectAllText", void 0);
    __decorate6([
      Property(null)
    ], DropDownTree2.prototype, "value", void 0);
    __decorate6([
      Property("100%")
    ], DropDownTree2.prototype, "width", void 0);
    __decorate6([
      Property(1e3)
    ], DropDownTree2.prototype, "zIndex", void 0);
    __decorate6([
      Property(false)
    ], DropDownTree2.prototype, "wrapText", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "actionFailure", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "beforeOpen", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "change", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "close", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "blur", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "created", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "dataBound", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "destroyed", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "filtering", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "focus", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "keyPress", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "open", void 0);
    __decorate6([
      Event()
    ], DropDownTree2.prototype, "select", void 0);
    DropDownTree2 = __decorate6([
      NotifyPropertyChanges
    ], DropDownTree2);
    return DropDownTree2;
  }(Component)
);

// node_modules/@syncfusion/ej2-dropdowns/src/combo-box/combo-box.js
var __extends7 = /* @__PURE__ */ function() {
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
var __decorate7 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SPINNER_CLASS = "e-atc-spinner-icon";
dropDownListClasses.root = "e-combobox";
var inputObject2 = {
  container: null,
  buttons: []
};
var ComboBox = (
  /** @class */
  function(_super) {
    __extends7(ComboBox2, _super);
    function ComboBox2(options, element) {
      return _super.call(this, options, element) || this;
    }
    ComboBox2.prototype.preRender = function() {
      _super.prototype.preRender.call(this);
    };
    ComboBox2.prototype.getLocaleName = function() {
      return "combo-box";
    };
    ComboBox2.prototype.wireEvent = function() {
      if (this.getModuleName() === "combobox") {
        EventHandler.add(this.inputWrapper.buttons[0], "mousedown", this.preventBlur, this);
        EventHandler.add(this.inputWrapper.container, "blur", this.onBlurHandler, this);
      }
      if (!isNullOrUndefined(this.inputWrapper.buttons[0])) {
        EventHandler.add(this.inputWrapper.buttons[0], "mousedown", this.dropDownClick, this);
      }
      EventHandler.add(this.inputElement, "focus", this.targetFocus, this);
      if (!this.readonly) {
        EventHandler.add(this.inputElement, "input", this.onInput, this);
        EventHandler.add(this.inputElement, "keyup", this.onFilterUp, this);
        EventHandler.add(this.inputElement, "keydown", this.onFilterDown, this);
        EventHandler.add(this.inputElement, "paste", this.pasteHandler, this);
        EventHandler.add(window, "resize", this.windowResize, this);
      }
      this.bindCommonEvent();
    };
    ComboBox2.prototype.preventBlur = function(e) {
      if (!this.allowFiltering && document.activeElement !== this.inputElement && !document.activeElement.classList.contains(dropDownListClasses.input) && Browser.isDevice || !Browser.isDevice) {
        e.preventDefault();
      }
    };
    ComboBox2.prototype.onBlurHandler = function(e) {
      var inputValue = this.inputElement && this.inputElement.value === "" ? null : this.inputElement && this.inputElement.value;
      if (!isNullOrUndefined(this.listData) && !isNullOrUndefined(inputValue) && inputValue !== this.text) {
        this.customValue(e);
      }
      _super.prototype.onBlurHandler.call(this, e);
    };
    ComboBox2.prototype.targetElement = function() {
      return this.inputElement;
    };
    ComboBox2.prototype.setOldText = function(text) {
      Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
      this.customValue();
      this.removeSelection();
    };
    ComboBox2.prototype.setOldValue = function(value) {
      if (this.allowCustom) {
        this.valueMuteChange(this.value);
      } else {
        this.valueMuteChange(null);
      }
      this.removeSelection();
      this.setHiddenValue();
    };
    ComboBox2.prototype.valueMuteChange = function(value) {
      value = this.allowObjectBinding && !isNullOrUndefined(value) ? getValue(this.fields.value ? this.fields.value : "", value) : value;
      var inputValue = isNullOrUndefined(value) ? null : value.toString();
      Input.setValue(inputValue, this.inputElement, this.floatLabelType, this.showClearButton);
      var changeData = {};
      if (this.allowObjectBinding) {
        value = this.getDataByValue(value);
        if (isNullOrUndefined(value)) {
          var fields_1 = this.fields;
          var isvalidTextField_1 = false;
          var isValidValue_1 = false;
          if (this.allowObjectBinding) {
            var keys = Object.keys(this.value);
            keys.forEach(function(key) {
              if (key === fields_1.value) {
                isValidValue_1 = true;
                return;
              }
            });
            keys.forEach(function(key) {
              if (key === fields_1.text) {
                isvalidTextField_1 = true;
                return;
              }
            });
          }
          changeData = {
            text: isValidValue_1 ? isvalidTextField_1 ? getValue(fields_1.text, this.value) : getValue(fields_1.value, this.value) : null,
            value: isValidValue_1 ? this.value : null,
            index: null
          };
        }
      }
      if (this.allowObjectBinding) {
        this.setProperties(changeData, true);
      } else {
        this.setProperties({ value, text: value, index: null }, true);
      }
      this.activeIndex = this.index;
      var fields = this.fields;
      var dataItem = {};
      dataItem[fields.text] = isNullOrUndefined(value) ? null : value.toString();
      dataItem[fields.value] = isNullOrUndefined(value) ? null : value.toString();
      this.itemData = dataItem;
      this.item = null;
      if (!this.allowObjectBinding && this.previousValue !== this.value || this.allowObjectBinding && this.previousValue && this.value && !this.isObjectInArray(this.previousValue, [this.value])) {
        this.detachChangeEvent(null);
      }
    };
    ComboBox2.prototype.updateValues = function() {
      if (this.fields.disabled) {
        if (this.value != null) {
          this.value = !this.isDisableItemValue(this.value) ? this.value : null;
        }
        if (this.text != null) {
          this.text = !this.isDisabledItemByIndex(this.getIndexByValue(this.getValueByText(this.text))) ? this.text : null;
        }
        if (this.index != null) {
          this.index = !this.isDisabledItemByIndex(this.index) ? this.index : null;
          this.activeIndex = this.index;
        }
      }
      if (!isNullOrUndefined(this.value)) {
        var currentValue = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
        var li = this.getElementByValue(currentValue);
        var doesItemExist = !isNullOrUndefined(li) ? true : false;
        if (this.enableVirtualization && this.value) {
          var fields = this.fields.value ? this.fields.value : "";
          var currentValue_1 = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
          if (this.dataSource instanceof DataManager) {
            var getItem = new DataManager(this.virtualGroupDataSource).executeLocal(new Query().where(new Predicate(fields, "equal", currentValue_1)));
            if (getItem && getItem.length > 0) {
              this.itemData = getItem[0];
              doesItemExist = true;
              var dataItem = this.getItemData();
              var value = this.allowObjectBinding ? this.getDataByValue(dataItem.value) : dataItem.value;
              if (this.value === dataItem.value && this.text !== dataItem.text || this.value !== dataItem.value && this.text === dataItem.text) {
                this.setProperties({ "text": dataItem.text, "value": value });
              }
            }
          } else {
            var getItem = new DataManager(this.dataSource).executeLocal(new Query().where(new Predicate(fields, "equal", currentValue_1)));
            if (getItem && getItem.length > 0) {
              this.itemData = getItem[0];
              doesItemExist = true;
              var dataItem = this.getItemData();
              var value = this.allowObjectBinding ? this.getDataByValue(dataItem.value) : dataItem.value;
              if (this.value === dataItem.value && this.text !== dataItem.text || this.value !== dataItem.value && this.text === dataItem.text) {
                this.setProperties({ "text": dataItem.text, "value": value });
              }
            }
          }
        }
        if (li) {
          this.setSelection(li, null);
        } else if (!this.enableVirtualization && this.allowCustom || this.allowCustom && this.enableVirtualization && !doesItemExist) {
          this.valueMuteChange(this.value);
        } else if (!this.enableVirtualization || this.enableVirtualization && !doesItemExist) {
          this.valueMuteChange(null);
        }
      } else if (this.text && isNullOrUndefined(this.value)) {
        var li = this.getElementByText(this.text);
        if (li) {
          this.setSelection(li, null);
        } else {
          Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
          this.customValue();
        }
      } else {
        this.setSelection(this.liCollections[this.activeIndex], null);
      }
      this.setHiddenValue();
      Input.setValue(this.text, this.inputElement, this.floatLabelType, this.showClearButton);
    };
    ComboBox2.prototype.updateIconState = function() {
      if (this.showClearButton) {
        if (this.inputElement && this.inputElement.value !== "" && !this.readonly) {
          removeClass([this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
        } else {
          addClass([this.inputWrapper.clearButton], dropDownListClasses.clearIconHide);
        }
      }
    };
    ComboBox2.prototype.getAriaAttributes = function() {
      var ariaAttributes = {
        "role": "combobox",
        "aria-autocomplete": "both",
        "aria-labelledby": this.hiddenElement.id,
        "aria-expanded": "false",
        "aria-readonly": this.readonly.toString(),
        "autocomplete": "off",
        "autocapitalize": "off",
        "spellcheck": "false"
      };
      return ariaAttributes;
    };
    ComboBox2.prototype.searchLists = function(e) {
      this.isTyped = true;
      if (this.isFiltering()) {
        _super.prototype.searchLists.call(this, e);
        if (this.ulElement && this.filterInput.value.trim() === "") {
          this.setHoverList(this.ulElement.querySelector("." + dropDownListClasses.li));
        }
      } else {
        if (this.ulElement && this.inputElement.value === "" && this.preventAutoFill) {
          this.setHoverList(this.ulElement.querySelector("." + dropDownListClasses.li));
        }
        this.incrementalSearch(e);
      }
    };
    ComboBox2.prototype.getNgDirective = function() {
      return "EJS-COMBOBOX";
    };
    ComboBox2.prototype.setSearchBox = function() {
      this.filterInput = this.inputElement;
      var searchBoxContainer = this.isFiltering() || this.isReact && this.getModuleName() === "combobox" ? this.inputWrapper : inputObject2;
      return searchBoxContainer;
    };
    ComboBox2.prototype.onActionComplete = function(ulElement, list, e, isUpdated) {
      var _this = this;
      _super.prototype.onActionComplete.call(this, ulElement, list, e);
      if (this.isSelectCustom) {
        this.removeSelection();
      }
      if (!this.preventAutoFill && this.getModuleName() === "combobox" && this.isTyped && !this.enableVirtualization) {
        setTimeout(function() {
          _this.inlineSearch();
        });
      }
    };
    ComboBox2.prototype.getFocusElement = function() {
      var dataItem = this.isSelectCustom ? { text: "" } : this.getItemData();
      var selected = !isNullOrUndefined(this.list) ? this.list.querySelector("." + dropDownListClasses.selected) : this.list;
      var isSelected = dataItem.text && dataItem.text.toString() === this.inputElement.value && !isNullOrUndefined(selected);
      if (isSelected) {
        return selected;
      }
      if ((Browser.isDevice && !this.isDropDownClick || !Browser.isDevice) && !isNullOrUndefined(this.liCollections) && this.liCollections.length > 0) {
        var inputValue = this.inputElement.value;
        var dataSource = this.sortedData;
        var type = this.typeOfData(dataSource).typeof;
        var activeItem = Search(inputValue, this.liCollections, this.filterType, true, dataSource, this.fields, type);
        if (this.enableVirtualization && inputValue !== "" && this.getModuleName() !== "autocomplete" && this.isTyped && !this.allowFiltering) {
          var updatingincrementalindex = false;
          if (this.viewPortInfo.endIndex >= this.incrementalEndIndex && this.incrementalEndIndex <= this.totalItemCount || this.incrementalEndIndex == 0) {
            updatingincrementalindex = true;
            this.incrementalStartIndex = this.incrementalEndIndex;
            if (this.incrementalEndIndex == 0) {
              this.incrementalEndIndex = 100 > this.totalItemCount ? this.totalItemCount : 100;
            } else {
              this.incrementalEndIndex = this.incrementalEndIndex + 100 > this.totalItemCount ? this.totalItemCount : this.incrementalEndIndex + 100;
            }
            this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
            updatingincrementalindex = true;
          }
          if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
            this.updateIncrementalView(0, this.itemCount);
          }
          activeItem = Search(inputValue, this.incrementalLiCollections, this.filterType, true, dataSource, this.fields, type);
          while (isNullOrUndefined(activeItem.item) && this.incrementalEndIndex < this.totalItemCount) {
            this.incrementalStartIndex = this.incrementalEndIndex;
            this.incrementalEndIndex = this.incrementalEndIndex + 100 > this.totalItemCount ? this.totalItemCount : this.incrementalEndIndex + 100;
            this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
            updatingincrementalindex = true;
            if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
              this.updateIncrementalView(0, this.itemCount);
            }
            activeItem = Search(inputValue, this.incrementalLiCollections, this.filterType, true, dataSource, this.fields, type);
            if (!isNullOrUndefined(activeItem)) {
              activeItem.index = activeItem.index + this.incrementalStartIndex;
              break;
            }
            if (isNullOrUndefined(activeItem) && this.incrementalEndIndex >= this.totalItemCount) {
              this.incrementalStartIndex = 0;
              this.incrementalEndIndex = 100 > this.totalItemCount ? this.totalItemCount : 100;
              break;
            }
          }
          if (activeItem.index) {
            if (!(this.viewPortInfo.startIndex >= activeItem.index) || !(activeItem.index >= this.viewPortInfo.endIndex)) {
              var startIndex = activeItem.index - (this.itemCount / 2 - 2) > 0 ? activeItem.index - (this.itemCount / 2 - 2) : 0;
              var endIndex = this.viewPortInfo.startIndex + this.itemCount > this.totalItemCount ? this.totalItemCount : this.viewPortInfo.startIndex + this.itemCount;
              if (startIndex != this.viewPortInfo.startIndex) {
                this.updateIncrementalView(startIndex, endIndex);
              }
            }
          }
          if (!isNullOrUndefined(activeItem.item)) {
            var index_1 = this.getIndexByValue(activeItem.item.getAttribute("data-value")) - this.skeletonCount;
            if (index_1 > this.itemCount / 2) {
              var startIndex = this.viewPortInfo.startIndex + (this.itemCount / 2 - 2) < this.totalItemCount ? this.viewPortInfo.startIndex + (this.itemCount / 2 - 2) : this.totalItemCount;
              var endIndex = this.viewPortInfo.startIndex + this.itemCount > this.totalItemCount ? this.totalItemCount : this.viewPortInfo.startIndex + this.itemCount;
              this.updateIncrementalView(startIndex, endIndex);
            }
            activeItem.item = this.getElementByValue(activeItem.item.getAttribute("data-value"));
          } else {
            this.updateIncrementalView(0, this.itemCount);
            this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
            this.list.scrollTop = 0;
          }
          if (activeItem && activeItem.item) {
            activeItem.item = this.getElementByValue(activeItem.item.getAttribute("data-value"));
          }
        }
        var activeElement = activeItem.item;
        if (!isNullOrUndefined(activeElement)) {
          var count = this.getIndexByValue(activeElement.getAttribute("data-value")) - 1;
          var height = parseInt(getComputedStyle(this.liCollections[0], null).getPropertyValue("height"), 10);
          if (!isNaN(height) && this.getModuleName() !== "autocomplete") {
            this.removeFocus();
            var fixedHead = this.fields.groupBy ? this.liCollections[0].offsetHeight : 0;
            if (!this.enableVirtualization) {
              this.list.scrollTop = count * height + fixedHead;
            } else {
              this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
              if (this.enableVirtualization && !this.fields.groupBy) {
                var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? activeElement.offsetTop + this.virtualListInfo.startIndex * activeElement.offsetHeight : activeElement.offsetTop;
                this.list.scrollTop = selectedLiOffsetTop - this.list.querySelectorAll(".e-virtual-list").length * activeElement.offsetHeight;
              }
            }
            addClass([activeElement], dropDownListClasses.focus);
          }
        } else {
          if (this.isSelectCustom && this.inputElement.value.trim() !== "") {
            this.removeFocus();
            if (!this.enableVirtualization) {
              this.list.scrollTop = 0;
            }
          }
        }
        return activeElement;
      } else {
        return null;
      }
    };
    ComboBox2.prototype.setValue = function(e) {
      if (e && e.type === "keydown" && e.action === "enter" || e && e.type === "click") {
        this.removeFillSelection();
      }
      if (this.autofill && this.getModuleName() === "combobox" && e && e.type === "keydown" && e.action !== "enter") {
        this.preventAutoFill = false;
        this.inlineSearch(e);
        return false;
      } else {
        return _super.prototype.setValue.call(this, e);
      }
    };
    ComboBox2.prototype.checkCustomValue = function() {
      var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
      this.itemData = this.getDataByValue(value);
      var dataItem = this.getItemData();
      var setValue2 = this.allowObjectBinding ? this.itemData : dataItem.value;
      if (!(this.allowCustom && isNullOrUndefined(dataItem.value) && isNullOrUndefined(dataItem.text))) {
        this.setProperties({ "value": setValue2 }, !this.allowCustom);
      }
    };
    ComboBox2.prototype.showSpinner = function() {
      if (isNullOrUndefined(this.spinnerElement)) {
        this.spinnerElement = this.getModuleName() === "autocomplete" ? this.inputWrapper.buttons[0] || this.inputWrapper.clearButton || Input.appendSpan("e-input-group-icon " + SPINNER_CLASS, this.inputWrapper.container, this.createElement) : this.inputWrapper.buttons[0] || this.inputWrapper.clearButton;
        addClass([this.spinnerElement], dropDownListClasses.disableIcon);
        createSpinner({
          target: this.spinnerElement,
          width: Browser.isDevice ? "16px" : "14px"
        }, this.createElement);
        showSpinner(this.spinnerElement);
      }
    };
    ComboBox2.prototype.hideSpinner = function() {
      if (!isNullOrUndefined(this.spinnerElement)) {
        hideSpinner(this.spinnerElement);
        removeClass([this.spinnerElement], dropDownListClasses.disableIcon);
        if (this.spinnerElement.classList.contains(SPINNER_CLASS)) {
          detach(this.spinnerElement);
        } else {
          this.spinnerElement.innerHTML = "";
        }
        this.spinnerElement = null;
      }
    };
    ComboBox2.prototype.setAutoFill = function(activeElement, isHover) {
      if (!isHover) {
        this.setHoverList(activeElement);
      }
      if (this.autofill && !this.preventAutoFill) {
        var currentValue = this.getTextByValue(activeElement.getAttribute("data-value")).toString();
        var currentFillValue = this.getFormattedValue(activeElement.getAttribute("data-value"));
        if (this.getModuleName() === "combobox") {
          if (!this.isSelected && (!this.allowObjectBinding && this.previousValue !== currentFillValue) || this.allowObjectBinding && this.previousValue && currentFillValue && !this.isObjectInArray(this.previousValue, [this.getDataByValue(currentFillValue)])) {
            this.updateSelectedItem(activeElement, null);
            this.isSelected = true;
            this.previousValue = this.allowObjectBinding ? this.getDataByValue(this.getFormattedValue(activeElement.getAttribute("data-value"))) : this.getFormattedValue(activeElement.getAttribute("data-value"));
          } else {
            this.updateSelectedItem(activeElement, null, true);
          }
        }
        if (!this.isAndroidAutoFill(currentValue)) {
          this.setAutoFillSelection(currentValue, isHover);
        }
      }
    };
    ComboBox2.prototype.isAndroidAutoFill = function(value) {
      if (Browser.isAndroid) {
        var currentPoints = this.getSelectionPoints();
        var prevEnd = this.prevSelectPoints.end;
        var curEnd = currentPoints.end;
        var prevStart = this.prevSelectPoints.start;
        var curStart = currentPoints.start;
        if (prevEnd !== 0 && (prevEnd === value.length && prevStart === value.length || prevStart > curStart && prevEnd > curEnd || prevEnd === curEnd && prevStart === curStart)) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    };
    ComboBox2.prototype.clearAll = function(e, property) {
      if (isNullOrUndefined(property) || !isNullOrUndefined(property) && isNullOrUndefined(property.dataSource)) {
        _super.prototype.clearAll.call(this, e);
      }
      if (this.isFiltering() && !isNullOrUndefined(e) && e.target === this.inputWrapper.clearButton) {
        this.searchLists(e);
      }
    };
    ComboBox2.prototype.isSelectFocusItem = function(element) {
      return !isNullOrUndefined(element);
    };
    ComboBox2.prototype.inlineSearch = function(e) {
      var isKeyNavigate = e && (e.action === "down" || e.action === "up" || e.action === "home" || e.action === "end" || e.action === "pageUp" || e.action === "pageDown");
      var activeElement = isKeyNavigate ? this.liCollections[this.activeIndex] : this.getFocusElement();
      if (!isNullOrUndefined(activeElement)) {
        if (!isKeyNavigate) {
          var value = this.getFormattedValue(activeElement.getAttribute("data-value"));
          this.activeIndex = this.getIndexByValue(value);
          this.activeIndex = !isNullOrUndefined(this.activeIndex) ? this.activeIndex : null;
        }
        this.preventAutoFill = this.inputElement.value === "" ? false : this.preventAutoFill;
        this.setAutoFill(activeElement, isKeyNavigate);
      } else if (!isNullOrUndefined(this.inputElement) && this.inputElement.value === "") {
        this.activeIndex = null;
        if (!isNullOrUndefined(this.list)) {
          if (!this.enableVirtualization) {
            this.list.scrollTop = 0;
          }
          var focusItem = this.list.querySelector("." + dropDownListClasses.li);
          this.setHoverList(focusItem);
        }
      } else {
        this.activeIndex = null;
        this.removeSelection();
        if (this.liCollections && this.liCollections.length > 0 && !this.isCustomFilter) {
          this.removeFocus();
        }
      }
    };
    ComboBox2.prototype.incrementalSearch = function(e) {
      this.showPopup(e);
      if (!isNullOrUndefined(this.listData)) {
        this.inlineSearch(e);
        e.preventDefault();
      }
    };
    ComboBox2.prototype.setAutoFillSelection = function(currentValue, isKeyNavigate) {
      if (isKeyNavigate === void 0) {
        isKeyNavigate = false;
      }
      var selection = this.getSelectionPoints();
      var value = this.inputElement.value.substr(0, selection.start);
      if (value && value.toLowerCase() === currentValue.substr(0, selection.start).toLowerCase()) {
        var inputValue = value + currentValue.substr(value.length, currentValue.length);
        Input.setValue(inputValue, this.inputElement, this.floatLabelType, this.showClearButton);
        this.inputElement.setSelectionRange(selection.start, this.inputElement.value.length);
      } else if (isKeyNavigate) {
        Input.setValue(currentValue, this.inputElement, this.floatLabelType, this.showClearButton);
        this.inputElement.setSelectionRange(0, this.inputElement.value.length);
      }
    };
    ComboBox2.prototype.getValueByText = function(text) {
      return _super.prototype.getValueByText.call(this, text, true, this.ignoreAccent);
    };
    ComboBox2.prototype.unWireEvent = function() {
      if (this.getModuleName() === "combobox") {
        EventHandler.remove(this.inputWrapper.buttons[0], "mousedown", this.preventBlur);
        EventHandler.remove(this.inputWrapper.container, "blur", this.onBlurHandler);
      }
      if (!isNullOrUndefined(this.inputWrapper.buttons[0])) {
        EventHandler.remove(this.inputWrapper.buttons[0], "mousedown", this.dropDownClick);
      }
      if (this.inputElement) {
        EventHandler.remove(this.inputElement, "focus", this.targetFocus);
        if (!this.readonly) {
          EventHandler.remove(this.inputElement, "input", this.onInput);
          EventHandler.remove(this.inputElement, "keyup", this.onFilterUp);
          EventHandler.remove(this.inputElement, "keydown", this.onFilterDown);
          EventHandler.remove(this.inputElement, "paste", this.pasteHandler);
          EventHandler.remove(window, "resize", this.windowResize);
        }
      }
      this.unBindCommonEvent();
    };
    ComboBox2.prototype.setSelection = function(li, e) {
      _super.prototype.setSelection.call(this, li, e);
      if (!isNullOrUndefined(li) && !this.autofill && !this.isDropDownClick) {
        this.removeFocus();
      }
    };
    ComboBox2.prototype.selectCurrentItem = function(e) {
      var li;
      if (this.isPopupOpen) {
        if (this.isSelected) {
          li = this.list.querySelector("." + dropDownListClasses.selected);
        } else {
          li = this.list.querySelector("." + dropDownListClasses.focus);
        }
        if (this.isDisabledElement(li)) {
          return;
        }
        if (li) {
          this.setSelection(li, e);
          this.isTyped = false;
        }
        if (this.isSelected) {
          this.isSelectCustom = false;
          this.onChangeEvent(e);
        }
      }
      if (e.action === "enter" && this.inputElement.value.trim() === "") {
        this.clearAll(e);
      } else if (this.isTyped && !this.isSelected && isNullOrUndefined(li)) {
        this.customValue(e);
      }
      this.hidePopup(e);
    };
    ComboBox2.prototype.setHoverList = function(li) {
      this.removeSelection();
      if (this.isValidLI(li) && !li.classList.contains(dropDownListClasses.selected)) {
        this.removeFocus();
        li.classList.add(dropDownListClasses.focus);
      }
    };
    ComboBox2.prototype.targetFocus = function(e) {
      if (Browser.isDevice && !this.allowFiltering) {
        this.preventFocus = false;
      }
      this.onFocus(e);
      Input.calculateWidth(this.inputElement, this.inputWrapper.container);
    };
    ComboBox2.prototype.dropDownClick = function(e) {
      e.preventDefault();
      if (Browser.isDevice && !this.isFiltering()) {
        this.preventFocus = true;
      }
      _super.prototype.dropDownClick.call(this, e);
    };
    ComboBox2.prototype.customValue = function(e) {
      var _this = this;
      var value = this.getValueByText(this.inputElement.value);
      if (!this.allowCustom && this.inputElement.value !== "") {
        var previousValue = this.previousValue;
        var currentValue = this.value;
        value = this.allowObjectBinding ? this.getDataByValue(value) : value;
        this.setProperties({ value });
        if (isNullOrUndefined(this.value)) {
          Input.setValue("", this.inputElement, this.floatLabelType, this.showClearButton);
        }
        var newValue = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
        if (this.autofill && (!this.allowObjectBinding && previousValue === this.value || this.allowObjectBinding && previousValue && this.isObjectInArray(previousValue, [this.value])) && (!this.allowObjectBinding && currentValue !== this.value || this.allowObjectBinding && currentValue && !this.isObjectInArray(currentValue, [this.value]))) {
          this.onChangeEvent(null);
        }
      } else if (this.inputElement.value.trim() !== "") {
        var previousValue_1 = this.value;
        if (isNullOrUndefined(value)) {
          var value_1 = this.inputElement.value === "" ? null : this.inputElement.value;
          var eventArgs = { text: value_1, item: {} };
          this.isObjectCustomValue = true;
          if (!this.initial) {
            this.trigger("customValueSpecifier", eventArgs, function(eventArgs2) {
              _this.updateCustomValueCallback(value_1, eventArgs2, previousValue_1, e);
            });
          } else {
            this.updateCustomValueCallback(value_1, eventArgs, previousValue_1);
          }
        } else {
          this.isSelectCustom = false;
          value = this.allowObjectBinding ? this.getDataByValue(value) : value;
          this.setProperties({ value });
          if (!this.allowObjectBinding && previousValue_1 !== this.value || this.allowObjectBinding && previousValue_1 && this.value && !this.isObjectInArray(previousValue_1, [this.value])) {
            this.onChangeEvent(e);
          }
        }
      } else if (this.allowCustom && this.isFocused) {
        this.isSelectCustom = true;
      }
    };
    ComboBox2.prototype.updateCustomValueCallback = function(value, eventArgs, previousValue, e) {
      var _this = this;
      var fields = this.fields;
      var item = eventArgs.item;
      var dataItem = {};
      if (item && getValue(fields.text, item) && getValue(fields.value, item)) {
        dataItem = item;
      } else {
        setValue(fields.text, value, dataItem);
        setValue(fields.value, value, dataItem);
      }
      this.itemData = dataItem;
      var emptyObject = {};
      if (this.allowObjectBinding) {
        var keys = this.listData && this.listData.length > 0 ? Object.keys(this.listData[0]) : Object.keys(this.itemData);
        if (!(this.listData && this.listData.length > 0) && (this.getModuleName() === "autocomplete" || this.getModuleName() === "combobox" && this.allowFiltering)) {
          keys = this.firstItem ? Object.keys(this.firstItem) : Object.keys(this.itemData);
        }
        keys.forEach(function(key) {
          emptyObject[key] = key === fields.value || key === fields.text ? getValue(fields.value, _this.itemData) : null;
        });
      }
      var changeData = {
        text: getValue(fields.text, this.itemData),
        value: this.allowObjectBinding ? emptyObject : getValue(fields.value, this.itemData),
        index: null
      };
      this.setProperties(changeData, true);
      this.setSelection(null, null);
      this.isSelectCustom = true;
      this.isObjectCustomValue = false;
      if (!this.allowObjectBinding && previousValue !== this.value || this.allowObjectBinding && (previousValue == null && this.value !== null || previousValue && !this.isObjectInArray(previousValue, [this.value]))) {
        this.onChangeEvent(e, true);
      }
    };
    ComboBox2.prototype.onPropertyChanged = function(newProp, oldProp) {
      if (this.getModuleName() === "combobox") {
        this.checkData(newProp);
        this.setUpdateInitial(["fields", "query", "dataSource"], newProp, oldProp);
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "readonly":
            Input.setReadonly(this.readonly, this.inputElement);
            if (this.readonly) {
              EventHandler.remove(this.inputElement, "input", this.onInput);
              EventHandler.remove(this.inputElement, "keyup", this.onFilterUp);
              EventHandler.remove(this.inputElement, "keydown", this.onFilterDown);
            } else {
              EventHandler.add(this.inputElement, "input", this.onInput, this);
              EventHandler.add(this.inputElement, "keyup", this.onFilterUp, this);
              EventHandler.add(this.inputElement, "keydown", this.onFilterDown, this);
            }
            this.setReadOnly();
            break;
          case "allowFiltering":
            this.setSearchBox();
            if (this.isFiltering() && this.getModuleName() === "combobox" && isNullOrUndefined(this.list)) {
              _super.prototype.renderList.call(this);
            }
            break;
          case "allowCustom":
            break;
          default: {
            var comboProps = this.getPropObject(prop, newProp, oldProp);
            _super.prototype.onPropertyChanged.call(this, comboProps.newProperty, comboProps.oldProperty);
            if (this.isFiltering() && prop === "dataSource" && isNullOrUndefined(this.list) && this.itemTemplate && this.getModuleName() === "combobox") {
              _super.prototype.renderList.call(this);
            }
            break;
          }
        }
      }
    };
    ComboBox2.prototype.render = function() {
      _super.prototype.render.call(this);
      this.setSearchBox();
      this.renderComplete();
    };
    ComboBox2.prototype.getModuleName = function() {
      return "combobox";
    };
    ComboBox2.prototype.addItem = function(items, itemIndex) {
      _super.prototype.addItem.call(this, items, itemIndex);
    };
    ComboBox2.prototype.filter = function(dataSource, query, fields) {
      _super.prototype.filter.call(this, dataSource, query, fields);
    };
    ComboBox2.prototype.showPopup = function(e) {
      _super.prototype.showPopup.call(this, e);
    };
    ComboBox2.prototype.hidePopup = function(e) {
      var inputValue = this.inputElement && this.inputElement.value === "" ? null : this.inputElement && this.inputElement.value;
      if (!isNullOrUndefined(this.listData)) {
        var isEscape = this.isEscapeKey;
        if (this.isEscapeKey) {
          Input.setValue(this.typedString, this.inputElement, this.floatLabelType, this.showClearButton);
          this.isEscapeKey = false;
        }
        if (this.autofill) {
          this.removeFillSelection();
        }
        var dataItem = this.isSelectCustom ? { text: "" } : this.getItemData();
        var selected = !isNullOrUndefined(this.list) ? this.list.querySelector("." + dropDownListClasses.selected) : null;
        if (this.inputElement && dataItem.text === this.inputElement.value && !isNullOrUndefined(selected)) {
          if (this.isSelected) {
            this.onChangeEvent(e);
            this.isSelectCustom = false;
          }
          _super.prototype.hidePopup.call(this, e);
          return;
        }
        if (this.getModuleName() === "combobox" && this.inputElement.value.trim() !== "") {
          var dataSource = this.sortedData;
          var type = this.typeOfData(dataSource).typeof;
          var searchItem = Search(this.inputElement.value, this.liCollections, "Equal", true, dataSource, this.fields, type);
          this.selectedLI = searchItem.item;
          if (isNullOrUndefined(searchItem.index)) {
            searchItem.index = Search(this.inputElement.value, this.liCollections, "StartsWith", true, dataSource, this.fields, type).index;
          }
          this.activeIndex = searchItem.index;
          if (!isNullOrUndefined(this.selectedLI)) {
            this.updateSelectedItem(this.selectedLI, null, true);
          } else if (isEscape) {
            this.isSelectCustom = true;
            this.removeSelection();
          }
        }
        if (!this.isEscapeKey && this.isTyped && !this.isInteracted) {
          this.customValue(e);
        }
      }
      var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
      if (isNullOrUndefined(this.listData) && this.allowCustom && !isNullOrUndefined(inputValue) && inputValue !== value) {
        this.customValue();
      }
      _super.prototype.hidePopup.call(this, e);
    };
    ComboBox2.prototype.focusIn = function() {
      if (!this.enabled) {
        return;
      }
      if (Browser.isDevice && !this.isFiltering()) {
        this.preventFocus = true;
      }
      _super.prototype.focusIn.call(this);
    };
    ComboBox2.prototype.clear = function() {
      this.value = null;
    };
    ComboBox2.prototype.focusOut = function(e) {
      _super.prototype.focusOut.call(this, e);
    };
    ComboBox2.prototype.getItems = function() {
      return _super.prototype.getItems.call(this);
    };
    ComboBox2.prototype.getDataByValue = function(value) {
      return _super.prototype.getDataByValue.call(this, value);
    };
    ComboBox2.prototype.renderHightSearch = function() {
    };
    __decorate7([
      Property(false)
    ], ComboBox2.prototype, "autofill", void 0);
    __decorate7([
      Property(true)
    ], ComboBox2.prototype, "allowCustom", void 0);
    __decorate7([
      Property({})
    ], ComboBox2.prototype, "htmlAttributes", void 0);
    __decorate7([
      Property(false)
    ], ComboBox2.prototype, "allowFiltering", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "query", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "index", void 0);
    __decorate7([
      Property(true)
    ], ComboBox2.prototype, "showClearButton", void 0);
    __decorate7([
      Property(false)
    ], ComboBox2.prototype, "enableRtl", void 0);
    __decorate7([
      Event()
    ], ComboBox2.prototype, "customValueSpecifier", void 0);
    __decorate7([
      Event()
    ], ComboBox2.prototype, "filtering", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "valueTemplate", void 0);
    __decorate7([
      Property("Never")
    ], ComboBox2.prototype, "floatLabelType", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "filterBarPlaceholder", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "cssClass", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "headerTemplate", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "footerTemplate", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "placeholder", void 0);
    __decorate7([
      Property("100%")
    ], ComboBox2.prototype, "width", void 0);
    __decorate7([
      Property("300px")
    ], ComboBox2.prototype, "popupHeight", void 0);
    __decorate7([
      Property("100%")
    ], ComboBox2.prototype, "popupWidth", void 0);
    __decorate7([
      Property(false)
    ], ComboBox2.prototype, "readonly", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "text", void 0);
    __decorate7([
      Property(null)
    ], ComboBox2.prototype, "value", void 0);
    __decorate7([
      Property(false)
    ], ComboBox2.prototype, "allowObjectBinding", void 0);
    ComboBox2 = __decorate7([
      NotifyPropertyChanges
    ], ComboBox2);
    return ComboBox2;
  }(DropDownList)
);

// node_modules/@syncfusion/ej2-dropdowns/src/auto-complete/auto-complete.js
var __extends8 = /* @__PURE__ */ function() {
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
var __decorate8 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
dropDownListClasses.root = "e-autocomplete";
dropDownListClasses.icon = "e-input-group-icon e-ddl-icon e-search-icon";
var AutoComplete = (
  /** @class */
  function(_super) {
    __extends8(AutoComplete2, _super);
    function AutoComplete2(options, element) {
      var _this_1 = _super.call(this, options, element) || this;
      _this_1.isFiltered = false;
      _this_1.searchList = false;
      return _this_1;
    }
    AutoComplete2.prototype.preRender = function() {
      _super.prototype.preRender.call(this);
    };
    AutoComplete2.prototype.getLocaleName = function() {
      return "auto-complete";
    };
    AutoComplete2.prototype.getNgDirective = function() {
      return "EJS-AUTOCOMPLETE";
    };
    AutoComplete2.prototype.getQuery = function(query) {
      var filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
      var value = this.allowObjectBinding && !isNullOrUndefined(this.value) ? getValue(this.fields.value ? this.fields.value : "", this.value) : this.value;
      var filterType = this.queryString === "" && !isNullOrUndefined(value) ? "equal" : this.filterType;
      var queryString2 = this.queryString === "" && !isNullOrUndefined(value) ? value : this.queryString;
      if (this.isFiltered) {
        if (this.enableVirtualization && !isNullOrUndefined(this.customFilterQuery)) {
          filterQuery = this.customFilterQuery.clone();
        } else if (!this.enableVirtualization) {
          return filterQuery;
        }
      }
      if (this.queryString !== null && this.queryString !== "") {
        var dataType = this.typeOfData(this.dataSource).typeof;
        if (!(this.dataSource instanceof DataManager) && dataType === "string" || dataType === "number") {
          filterQuery.where("", filterType, queryString2, this.ignoreCase, this.ignoreAccent);
        } else {
          var mapping = !isNullOrUndefined(this.fields.value) ? this.fields.value : "";
          filterQuery.where(mapping, filterType, queryString2, this.ignoreCase, this.ignoreAccent);
        }
      }
      if (!isNullOrUndefined(this.suggestionCount) && !this.enableVirtualization) {
        if (this.suggestionCount !== 20) {
          for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
            if (filterQuery.queries[queryElements].fn === "onTake") {
              filterQuery.queries.splice(queryElements, 1);
            }
          }
        }
        filterQuery.take(this.suggestionCount);
      }
      if (this.enableVirtualization) {
        var queryTakeValue = 0;
        var querySkipValue = 0;
        var takeValue = this.getTakeValue();
        if (filterQuery && filterQuery.queries.length > 0) {
          for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
            if (filterQuery.queries[queryElements].fn === "onSkip") {
              querySkipValue = filterQuery.queries[queryElements].e.nos;
            }
            if (filterQuery.queries[queryElements].fn === "onTake") {
              queryTakeValue = takeValue <= filterQuery.queries[queryElements].e.nos ? filterQuery.queries[queryElements].e.nos : takeValue;
            }
          }
        }
        if (queryTakeValue <= 0 && this.query && this.query.queries.length > 0) {
          for (var queryElements = 0; queryElements < this.query.queries.length; queryElements++) {
            if (this.query.queries[queryElements].fn === "onTake") {
              queryTakeValue = takeValue <= this.query.queries[queryElements].e.nos ? this.query.queries[queryElements].e.nos : takeValue;
            }
          }
        }
        if (filterQuery && filterQuery.queries.length > 0) {
          for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
            if (filterQuery.queries[queryElements].fn === "onSkip") {
              querySkipValue = filterQuery.queries[queryElements].e.nos;
              filterQuery.queries.splice(queryElements, 1);
              --queryElements;
              continue;
            }
            if (filterQuery.queries[queryElements].fn === "onTake") {
              queryTakeValue = filterQuery.queries[queryElements].e.nos <= queryTakeValue ? queryTakeValue : filterQuery.queries[queryElements].e.nos;
              filterQuery.queries.splice(queryElements, 1);
              --queryElements;
            }
          }
        }
        if (querySkipValue > 0 && this.virtualItemStartIndex <= querySkipValue) {
          filterQuery.skip(querySkipValue);
        } else {
          filterQuery.skip(this.virtualItemStartIndex);
        }
        if (queryTakeValue > 0 && takeValue <= queryTakeValue) {
          filterQuery.take(queryTakeValue);
        } else {
          filterQuery.take(takeValue);
        }
        filterQuery.requiresCount();
      }
      return filterQuery;
    };
    AutoComplete2.prototype.searchLists = function(e) {
      var _this_1 = this;
      this.isTyped = true;
      this.isDataFetched = this.isSelectCustom = false;
      this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
      this.checkAndResetCache();
      if (isNullOrUndefined(this.list)) {
        _super.prototype.renderList.call(this, e, true);
      }
      this.queryString = this.filterInput.value;
      if (e.type !== "mousedown" && (e.keyCode === 40 || e.keyCode === 38)) {
        this.queryString = this.queryString === "" ? null : this.queryString;
        this.beforePopupOpen = true;
        this.resetList(this.dataSource, this.fields, null, e);
        return;
      }
      this.isSelected = false;
      this.activeIndex = null;
      this.isRequesting = false;
      var eventArgs = {
        preventDefaultAction: false,
        text: this.filterInput.value,
        updateData: function(dataSource, query, fields) {
          if (eventArgs.cancel) {
            return;
          }
          _this_1.isFiltered = true;
          _this_1.customFilterQuery = query;
          _this_1.filterAction(dataSource, query, fields);
        },
        cancel: false
      };
      this.trigger("filtering", eventArgs, function(eventArgs2) {
        if (!eventArgs2.cancel && !_this_1.isFiltered && !eventArgs2.preventDefaultAction) {
          _this_1.searchList = true;
          _this_1.filterAction(_this_1.dataSource, null, _this_1.fields, e);
        }
      });
    };
    AutoComplete2.prototype.filter = function(dataSource, query, fields) {
      this.isFiltered = true;
      this.filterAction(dataSource, query, fields);
    };
    AutoComplete2.prototype.filterAction = function(dataSource, query, fields, e) {
      this.beforePopupOpen = true;
      var isNoDataElement = this.list.classList.contains("e-nodata");
      if (this.queryString !== "" && this.queryString.length >= this.minLength) {
        if (this.enableVirtualization && this.isFiltering() && this.isTyped) {
          this.isPreventScrollAction = true;
          this.list.scrollTop = 0;
          this.previousStartIndex = 0;
          this.virtualListInfo = null;
        }
        this.resetList(dataSource, fields, query, e);
        if (this.enableVirtualization && isNoDataElement && !this.list.classList.contains("e-nodata")) {
          if (!this.list.querySelector(".e-virtual-ddl-content")) {
            this.list.appendChild(this.createElement("div", {
              className: "e-virtual-ddl-content",
              styles: this.getTransformValues()
            })).appendChild(this.list.querySelector(".e-list-parent"));
          }
          if (!this.list.querySelector(".e-virtual-ddl")) {
            var virualElement = this.createElement("div", {
              id: this.element.id + "_popup",
              className: "e-virtual-ddl",
              styles: this.GetVirtualTrackHeight()
            });
            document.getElementsByClassName("e-popup")[0].querySelector(".e-dropdownbase").appendChild(virualElement);
          }
        }
        if (this.getModuleName() === "autocomplete" && !(this.dataSource instanceof DataManager) || this.getModuleName() === "autocomplete" && this.dataSource instanceof DataManager && this.totalItemCount != 0) {
          this.getFilteringSkeletonCount();
        }
      } else {
        this.hidePopup(e);
        this.beforePopupOpen = false;
      }
      this.renderReactTemplates();
    };
    AutoComplete2.prototype.clearAll = function(e, property) {
      if (isNullOrUndefined(property) || !isNullOrUndefined(property) && isNullOrUndefined(property.dataSource)) {
        _super.prototype.clearAll.call(this, e);
        this.checkAndResetCache();
      }
      if (this.beforePopupOpen) {
        this.hidePopup();
      }
    };
    AutoComplete2.prototype.onActionComplete = function(ulElement, list, e, isUpdated) {
      if (!this.enableVirtualization) {
        this.fixedHeaderElement = null;
      }
      if (this.getModuleName() === "autocomplete" && !(this.dataSource instanceof DataManager) || this.getModuleName() === "autocomplete" && this.dataSource instanceof DataManager && this.totalItemCount != 0) {
        this.getFilteringSkeletonCount();
      }
      _super.prototype.onActionComplete.call(this, ulElement, list, e);
      var item = this.list.querySelector("." + dropDownListClasses.li);
      if (!isNullOrUndefined(item)) {
        removeClass([item], dropDownListClasses.focus);
      }
      this.postBackAction();
    };
    AutoComplete2.prototype.postBackAction = function() {
      if (this.autofill && !isNullOrUndefined(this.liCollections[0]) && this.searchList) {
        var items = [this.liCollections[0]];
        var dataSource = this.listData;
        var type = this.typeOfData(dataSource).typeof;
        var searchItem = Search(this.inputElement.value, items, "StartsWith", this.ignoreCase, dataSource, this.fields, type);
        this.searchList = false;
        if (!isNullOrUndefined(searchItem.item)) {
          _super.prototype.setAutoFill.call(this, this.liCollections[0], true);
        }
      }
    };
    AutoComplete2.prototype.setSelection = function(li, e) {
      if (!this.isValidLI(li)) {
        this.selectedLI = li;
        return;
      }
      if (!isNullOrUndefined(e) && e.type === "keydown" && e.action !== "enter" && e.action !== "tab" && this.isValidLI(li)) {
        var value = this.getFormattedValue(li.getAttribute("data-value"));
        this.activeIndex = this.getIndexByValue(value);
        this.setHoverList(li);
        this.selectedLI = li;
        this.setScrollPosition(e);
        if (this.autofill && this.isPopupOpen) {
          this.preventAutoFill = false;
          var isKeyNavigate = e && e.action === "down" || e.action === "up" || e.action === "home" || e.action === "end" || e.action === "pageUp" || e.action === "pageDown";
          _super.prototype.setAutoFill.call(this, li, isKeyNavigate);
        }
      } else {
        _super.prototype.setSelection.call(this, li, e);
      }
    };
    AutoComplete2.prototype.listOption = function(dataSource, fieldsSettings) {
      var _this_1 = this;
      var fields = _super.prototype.listOption.call(this, dataSource, fieldsSettings);
      if (isNullOrUndefined(fields.itemCreated)) {
        fields.itemCreated = function(e) {
          if (_this_1.highlight) {
            if (_this_1.element.tagName === _this_1.getNgDirective() && _this_1.itemTemplate) {
              setTimeout(function() {
                highlightSearch(e.item, _this_1.queryString, _this_1.ignoreCase, _this_1.filterType);
              }, 0);
            } else {
              highlightSearch(e.item, _this_1.queryString, _this_1.ignoreCase, _this_1.filterType);
            }
          }
        };
      } else {
        var itemCreated_1 = fields.itemCreated;
        fields.itemCreated = function(e) {
          if (_this_1.highlight) {
            highlightSearch(e.item, _this_1.queryString, _this_1.ignoreCase, _this_1.filterType);
          }
          itemCreated_1.apply(_this_1, [e]);
        };
      }
      return fields;
    };
    AutoComplete2.prototype.isFiltering = function() {
      return true;
    };
    AutoComplete2.prototype.renderPopup = function(e) {
      if (!this.enableVirtualization) {
        this.list.scrollTop = 0;
      }
      _super.prototype.renderPopup.call(this, e);
    };
    AutoComplete2.prototype.isEditTextBox = function() {
      return false;
    };
    AutoComplete2.prototype.isPopupButton = function() {
      return this.showPopupButton;
    };
    AutoComplete2.prototype.isSelectFocusItem = function(element) {
      return false;
    };
    AutoComplete2.prototype.setInputValue = function(newProp, oldProp) {
      var oldValue = oldProp && oldProp.text ? oldProp.text : oldProp ? oldProp.value : oldProp;
      var value = newProp && newProp.text ? newProp.text : newProp && newProp.value ? newProp.value : this.value;
      if (this.allowObjectBinding) {
        oldValue = !isNullOrUndefined(oldValue) ? getValue(this.fields.value ? this.fields.value : "", oldValue) : oldValue;
        value = !isNullOrUndefined(value) ? getValue(this.fields.value ? this.fields.value : "", value) : value;
      }
      if (value && this.typedString === "" && !this.allowCustom && !(this.dataSource instanceof DataManager)) {
        var checkFields_1_1 = this.typeOfData(this.dataSource).typeof === "string" ? "" : this.fields.value;
        var listLength_1 = this.getItems().length;
        var query = new Query();
        var _this_2 = this;
        new DataManager(this.dataSource).executeQuery(query.where(new Predicate(checkFields_1_1, "equal", value))).then(function(e) {
          if (e.result.length > 0) {
            _this_2.value = checkFields_1_1 !== "" ? _this_2.allowObjectBinding ? e.result[0] : e.result[0][_this_2.fields.value].toString() : e.result[0].toString();
            _this_2.addItem(e.result, listLength_1);
            _this_2.updateValues();
          } else {
            newProp && newProp.text ? _this_2.setOldText(oldValue) : newProp && newProp.value ? _this_2.setOldValue(oldValue) : _this_2.updateValues();
          }
        });
      } else if (newProp) {
        newProp.text ? this.setOldText(oldValue) : this.setOldValue(oldValue);
      }
    };
    AutoComplete2.prototype.showPopup = function(e) {
      if (!this.enabled) {
        return;
      }
      if (this.beforePopupOpen) {
        this.refreshPopup();
        return;
      }
      this.beforePopupOpen = true;
      this.preventAutoFill = true;
      if (isNullOrUndefined(this.list)) {
        this.renderList(e);
      } else {
        this.resetList(this.dataSource, this.fields, null, e);
      }
    };
    AutoComplete2.prototype.hidePopup = function(e) {
      _super.prototype.hidePopup.call(this, e);
      this.activeIndex = null;
      this.virtualListInfo = this.viewPortInfo;
      this.previousStartIndex = this.viewPortInfo.startIndex;
      this.startIndex = this.viewPortInfo.startIndex;
      this.previousEndIndex = this.viewPortInfo.endIndex;
    };
    AutoComplete2.prototype.onPropertyChanged = function(newProp, oldProp) {
      if (this.getModuleName() === "autocomplete") {
        this.setUpdateInitial(["fields", "query", "dataSource"], newProp);
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "showPopupButton":
            if (this.showPopupButton) {
              var button = Input.appendSpan(dropDownListClasses.icon, this.inputWrapper.container, this.createElement);
              this.inputWrapper.buttons[0] = button;
              Input.calculateWidth(this.inputElement, this.inputWrapper.container);
              if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName("e-float-text-overflow")[0]) && this.floatLabelType !== "Never") {
                this.inputWrapper.container.getElementsByClassName("e-float-text-overflow")[0].classList.add("e-icon");
              }
              if (this.inputWrapper && this.inputWrapper.buttons && this.inputWrapper.buttons[0]) {
                EventHandler.add(this.inputWrapper.buttons[0], "click", this.dropDownClick, this);
              }
            } else {
              detach(this.inputWrapper.buttons[0]);
              this.inputWrapper.buttons[0] = null;
            }
            break;
          default: {
            var atcProps = this.getPropObject(prop, newProp, oldProp);
            _super.prototype.onPropertyChanged.call(this, atcProps.newProperty, atcProps.oldProperty);
            break;
          }
        }
      }
    };
    AutoComplete2.prototype.renderHightSearch = function() {
      if (this.highlight) {
        for (var i = 0; i < this.liCollections.length; i++) {
          var isHighlight = this.ulElement.querySelector(".e-active");
          if (!isHighlight) {
            revertHighlightSearch(this.liCollections[i]);
            highlightSearch(this.liCollections[i], this.queryString, this.ignoreCase, this.filterType);
          }
          isHighlight = null;
        }
      }
    };
    AutoComplete2.prototype.getModuleName = function() {
      return "autocomplete";
    };
    AutoComplete2.prototype.render = function() {
      _super.prototype.render.call(this);
    };
    __decorate8([
      Complex({ value: null, iconCss: null, groupBy: null, disabled: null }, FieldSettings)
    ], AutoComplete2.prototype, "fields", void 0);
    __decorate8([
      Property(true)
    ], AutoComplete2.prototype, "ignoreCase", void 0);
    __decorate8([
      Property(false)
    ], AutoComplete2.prototype, "showPopupButton", void 0);
    __decorate8([
      Property(false)
    ], AutoComplete2.prototype, "highlight", void 0);
    __decorate8([
      Property(20)
    ], AutoComplete2.prototype, "suggestionCount", void 0);
    __decorate8([
      Property({})
    ], AutoComplete2.prototype, "htmlAttributes", void 0);
    __decorate8([
      Property(null)
    ], AutoComplete2.prototype, "query", void 0);
    __decorate8([
      Property(1)
    ], AutoComplete2.prototype, "minLength", void 0);
    __decorate8([
      Property("Contains")
    ], AutoComplete2.prototype, "filterType", void 0);
    __decorate8([
      Event()
    ], AutoComplete2.prototype, "filtering", void 0);
    __decorate8([
      Property(null)
    ], AutoComplete2.prototype, "index", void 0);
    __decorate8([
      Property("Never")
    ], AutoComplete2.prototype, "floatLabelType", void 0);
    __decorate8([
      Property(null)
    ], AutoComplete2.prototype, "valueTemplate", void 0);
    __decorate8([
      Property(null)
    ], AutoComplete2.prototype, "filterBarPlaceholder", void 0);
    __decorate8([
      Property(false)
    ], AutoComplete2.prototype, "allowFiltering", void 0);
    __decorate8([
      Property(null)
    ], AutoComplete2.prototype, "text", void 0);
    AutoComplete2 = __decorate8([
      NotifyPropertyChanges
    ], AutoComplete2);
    return AutoComplete2;
  }(ComboBox)
);

// node_modules/@syncfusion/ej2-dropdowns/src/multi-select/float-label.js
var FLOATLINE = "e-float-line";
var FLOATTEXT = "e-float-text";
var LABELTOP = "e-label-top";
var LABELBOTTOM = "e-label-bottom";
function createFloatLabel(overAllWrapper, searchWrapper, element, inputElement, value, floatLabelType, placeholder) {
  var floatLinelement = createElement("span", { className: FLOATLINE });
  var floatLabelElement = createElement("label", { className: FLOATTEXT });
  var id = element.getAttribute("id") ? element.getAttribute("id") : getUniqueID("ej2_multiselect");
  element.id = id;
  if (!isNullOrUndefined(element.id) && element.id !== "") {
    floatLabelElement.id = "label_" + element.id.replace(/ /g, "_");
    floatLabelElement.setAttribute("for", element.id);
    attributes(inputElement, { "aria-labelledby": floatLabelElement.id });
  }
  if (!isNullOrUndefined(inputElement.placeholder) && inputElement.placeholder !== "") {
    floatLabelElement.innerText = encodePlaceholder(inputElement.placeholder);
    inputElement.removeAttribute("placeholder");
  }
  floatLabelElement.innerText = encodePlaceholder(placeholder);
  searchWrapper.appendChild(floatLinelement);
  searchWrapper.appendChild(floatLabelElement);
  overAllWrapper.classList.add("e-float-input");
  updateFloatLabelState(value, floatLabelElement);
  if (floatLabelType === "Always") {
    if (floatLabelElement.classList.contains(LABELBOTTOM)) {
      removeClass([floatLabelElement], LABELBOTTOM);
    }
    addClass([floatLabelElement], LABELTOP);
  }
}
function updateFloatLabelState(value, label) {
  if (value && value.length > 0) {
    addClass([label], LABELTOP);
    removeClass([label], LABELBOTTOM);
  } else {
    removeClass([label], LABELTOP);
    addClass([label], LABELBOTTOM);
  }
}
function removeFloating(overAllWrapper, componentWrapper, searchWrapper, inputElement, value, floatLabelType, placeholder) {
  var placeholderElement = componentWrapper.querySelector("." + FLOATTEXT);
  var floatLine = componentWrapper.querySelector("." + FLOATLINE);
  var placeholderText;
  if (!isNullOrUndefined(placeholderElement)) {
    placeholderText = placeholderElement.innerText;
    detach(searchWrapper.querySelector("." + FLOATTEXT));
    setPlaceHolder(value, inputElement, placeholderText);
    if (!isNullOrUndefined(floatLine)) {
      detach(searchWrapper.querySelector("." + FLOATLINE));
    }
  } else {
    placeholderText = placeholder !== null ? placeholder : "";
    setPlaceHolder(value, inputElement, placeholderText);
  }
  overAllWrapper.classList.remove("e-float-input");
}
function setPlaceHolder(value, inputElement, placeholder) {
  if (value && value.length) {
    inputElement.placeholder = "";
  } else {
    inputElement.placeholder = placeholder;
  }
}
function floatLabelFocus(overAllWrapper, componentWrapper) {
  overAllWrapper.classList.add("e-input-focus");
  var label = componentWrapper.querySelector("." + FLOATTEXT);
  if (!isNullOrUndefined(label)) {
    addClass([label], LABELTOP);
    if (label.classList.contains(LABELBOTTOM)) {
      removeClass([label], LABELBOTTOM);
    }
  }
}
function floatLabelBlur(overAllWrapper, componentWrapper, value, floatLabelType, placeholder) {
  overAllWrapper.classList.remove("e-input-focus");
  var label = componentWrapper.querySelector("." + FLOATTEXT);
  if (value && value.length <= 0 && floatLabelType === "Auto" && !isNullOrUndefined(label)) {
    if (label.classList.contains(LABELTOP)) {
      removeClass([label], LABELTOP);
    }
    addClass([label], LABELBOTTOM);
  }
}
function encodePlaceholder(placeholder) {
  var result = "";
  if (!isNullOrUndefined(placeholder) && placeholder !== "") {
    var spanElement = document.createElement("span");
    spanElement.innerHTML = '<input  placeholder="' + placeholder + '"/>';
    var hiddenInput = spanElement.children[0];
    result = hiddenInput.placeholder;
  }
  return result;
}

// node_modules/@syncfusion/ej2-dropdowns/src/multi-select/multi-select.js
var __extends9 = /* @__PURE__ */ function() {
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
var __decorate9 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var FOCUS = "e-input-focus";
var DISABLED2 = "e-disabled";
var OVER_ALL_WRAPPER = "e-multiselect e-input-group e-control-wrapper";
var ELEMENT_WRAPPER = "e-multi-select-wrapper";
var ELEMENT_MOBILE_WRAPPER = "e-mob-wrapper";
var HIDE_LIST = "e-hide-listitem";
var DELIMITER_VIEW = "e-delim-view";
var CHIP_WRAPPER2 = "e-chips-collection";
var CHIP2 = "e-chips";
var CHIP_CONTENT2 = "e-chipcontent";
var CHIP_CLOSE2 = "e-chips-close";
var CHIP_SELECTED = "e-chip-selected";
var SEARCHBOX_WRAPPER = "e-searcher";
var DELIMITER_VIEW_WRAPPER = "e-delimiter";
var ZERO_SIZE = "e-zero-size";
var REMAIN_WRAPPER2 = "e-remain";
var CLOSEICON_CLASS2 = "e-chips-close e-close-hooker";
var DELIMITER_WRAPPER = "e-delim-values";
var POPUP_WRAPPER = "e-ddl e-popup e-multi-select-list-wrapper";
var INPUT_ELEMENT = "e-dropdownbase";
var RTL_CLASS = "e-rtl";
var CLOSE_ICON_HIDE = "e-close-icon-hide";
var MOBILE_CHIP = "e-mob-chip";
var FOOTER2 = "e-ddl-footer";
var HEADER2 = "e-ddl-header";
var DISABLE_ICON = "e-ddl-disable-icon";
var SPINNER_CLASS2 = "e-ms-spinner-icon";
var HIDDEN_ELEMENT = "e-multi-hidden";
var destroy = "destroy";
var dropdownIcon = "e-input-group-icon e-ddl-icon";
var iconAnimation = "e-icon-anim";
var TOTAL_COUNT_WRAPPER2 = "e-delim-total";
var BOX_ELEMENT = "e-multiselect-box";
var FILTERPARENT = "e-filter-parent";
var CUSTOM_WIDTH = "e-search-custom-width";
var FILTERINPUT = "e-input-filter";
var MultiSelect = (
  /** @class */
  function(_super) {
    __extends9(MultiSelect2, _super);
    function MultiSelect2(option, element) {
      var _this = _super.call(this, option, element) || this;
      _this.clearIconWidth = 0;
      _this.previousFilterText = "";
      _this.isValidKey = false;
      _this.selectAllEventData = [];
      _this.selectAllEventEle = [];
      _this.resetMainList = null;
      _this.resetFilteredData = false;
      _this.preventSetCurrentData = false;
      _this.isSelectAllLoop = false;
      _this.scrollFocusStatus = false;
      _this.keyDownStatus = false;
      _this.IsScrollerAtEnd = function() {
        return this.list && this.list.scrollTop + this.list.clientHeight >= this.list.scrollHeight;
      };
      return _this;
    }
    MultiSelect2.prototype.enableRTL = function(state) {
      if (state) {
        this.overAllWrapper.classList.add(RTL_CLASS);
      } else {
        this.overAllWrapper.classList.remove(RTL_CLASS);
      }
      if (this.popupObj) {
        this.popupObj.enableRtl = state;
        this.popupObj.dataBind();
      }
    };
    MultiSelect2.prototype.requiredModules = function() {
      var modules = [];
      if (this.enableVirtualization) {
        modules.push({ args: [this], member: "VirtualScroll" });
      }
      if (this.mode === "CheckBox") {
        this.isGroupChecking = this.enableGroupCheckBox;
        if (this.enableGroupCheckBox) {
          var prevOnChange = this.isProtectedOnChange;
          this.isProtectedOnChange = true;
          this.enableSelectionOrder = false;
          this.isProtectedOnChange = prevOnChange;
        }
        this.allowCustomValue = false;
        this.hideSelectedItem = false;
        this.closePopupOnSelect = false;
        modules.push({
          member: "CheckBoxSelection",
          args: [this]
        });
      }
      return modules;
    };
    MultiSelect2.prototype.updateHTMLAttribute = function() {
      if (Object.keys(this.htmlAttributes).length) {
        for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
          var htmlAttr = _a[_i];
          switch (htmlAttr) {
            case "class": {
              var updatedClassValue = this.htmlAttributes["" + htmlAttr].replace(/\s+/g, " ").trim();
              if (updatedClassValue !== "") {
                addClass([this.overAllWrapper], updatedClassValue.split(" "));
                addClass([this.popupWrapper], updatedClassValue.split(" "));
              }
              break;
            }
            case "disabled":
              this.enable(false);
              break;
            case "placeholder":
              if (!this.placeholder) {
                this.inputElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
                this.setProperties({ placeholder: this.inputElement.placeholder }, true);
                this.refreshPlaceHolder();
              }
              break;
            default: {
              var defaultAttr = ["id"];
              var validateAttr = ["name", "required", "aria-required", "form"];
              var containerAttr = ["title", "role", "style", "class"];
              if (defaultAttr.indexOf(htmlAttr) > -1) {
                this.element.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
              } else if (htmlAttr.indexOf("data") === 0 || validateAttr.indexOf(htmlAttr) > -1) {
                this.hiddenElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
              } else if (containerAttr.indexOf(htmlAttr) > -1) {
                this.overAllWrapper.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
              } else if (htmlAttr !== "size" && !isNullOrUndefined(this.inputElement)) {
                this.inputElement.setAttribute(htmlAttr, this.htmlAttributes["" + htmlAttr]);
              }
              break;
            }
          }
        }
      }
    };
    MultiSelect2.prototype.updateReadonly = function(state) {
      if (!isNullOrUndefined(this.inputElement)) {
        if (state || this.mode === "CheckBox") {
          this.inputElement.setAttribute("readonly", "true");
        } else {
          this.inputElement.removeAttribute("readonly");
        }
      }
    };
    MultiSelect2.prototype.updateClearButton = function(state) {
      if (state) {
        if (this.overAllClear.parentNode) {
          this.overAllClear.style.display = "";
        } else {
          this.componentWrapper.appendChild(this.overAllClear);
        }
        this.componentWrapper.classList.remove(CLOSE_ICON_HIDE);
      } else {
        this.overAllClear.style.display = "none";
        this.componentWrapper.classList.add(CLOSE_ICON_HIDE);
      }
    };
    MultiSelect2.prototype.updateCssClass = function() {
      if (!isNullOrUndefined(this.cssClass) && this.cssClass !== "") {
        var updatedCssClassValues = this.cssClass;
        updatedCssClassValues = this.cssClass.replace(/\s+/g, " ").trim();
        if (updatedCssClassValues !== "") {
          addClass([this.overAllWrapper], updatedCssClassValues.split(" "));
          addClass([this.popupWrapper], updatedCssClassValues.split(" "));
        }
      }
    };
    MultiSelect2.prototype.updateOldPropCssClass = function(oldClass) {
      if (!isNullOrUndefined(oldClass) && oldClass !== "") {
        oldClass = oldClass.replace(/\s+/g, " ").trim();
        if (oldClass !== "") {
          removeClass([this.overAllWrapper], oldClass.split(" "));
          removeClass([this.popupWrapper], oldClass.split(" "));
        }
      }
    };
    MultiSelect2.prototype.onPopupShown = function(e) {
      var _this = this;
      if (Browser.isDevice && (this.mode === "CheckBox" && this.allowFiltering)) {
        var proxy_1 = this;
        window.onpopstate = function() {
          proxy_1.hidePopup();
          proxy_1.inputElement.focus();
        };
        history.pushState({}, "");
      }
      var animModel = { name: "FadeIn", duration: 100 };
      var eventArgs = { popup: this.popupObj, event: e, cancel: false, animation: animModel };
      this.trigger("open", eventArgs, function(eventArgs2) {
        if (!eventArgs2.cancel) {
          _this.focusAtFirstListItem();
          if (_this.popupObj) {
            document.body.appendChild(_this.popupObj.element);
          }
          if (_this.mode === "CheckBox" && _this.enableGroupCheckBox && !isNullOrUndefined(_this.fields.groupBy)) {
            _this.updateListItems(_this.list.querySelectorAll("li.e-list-item"), _this.mainList.querySelectorAll("li.e-list-item"));
          }
          if (_this.mode === "CheckBox" || _this.showDropDownIcon) {
            addClass([_this.overAllWrapper], [iconAnimation]);
          }
          _this.refreshPopup();
          _this.renderReactTemplates();
          if (_this.popupObj) {
            _this.popupObj.show(eventArgs2.animation, _this.zIndex === 1e3 ? _this.element : null);
          }
          attributes(_this.inputElement, { "aria-expanded": "true", "aria-owns": _this.element.id + "_popup", "aria-controls": _this.element.id });
          _this.updateAriaActiveDescendant();
          if (_this.isFirstClick) {
            if (!_this.enableVirtualization) {
              _this.loadTemplate();
            }
          }
          if (_this.mode === "CheckBox" && _this.showSelectAll) {
            EventHandler.add(_this.popupObj.element, "click", _this.clickHandler, _this);
          }
        }
      });
    };
    MultiSelect2.prototype.updateVirtualReOrderList = function(isCheckBoxUpdate) {
      var query = this.getForQuery(this.value, true).clone();
      if (this.enableVirtualization && this.dataSource instanceof DataManager) {
        this.resetList(this.selectedListData, this.fields, query);
      } else {
        this.resetList(this.dataSource, this.fields, query);
      }
      this.UpdateSkeleton();
      this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
      this.virtualItemCount = this.itemCount;
      if (this.mode !== "CheckBox") {
        this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length : this.totalItemCount;
      }
      if (!this.list.querySelector(".e-virtual-ddl")) {
        var virualElement = this.createElement("div", {
          id: this.element.id + "_popup",
          className: "e-virtual-ddl",
          styles: this.GetVirtualTrackHeight()
        });
        this.popupWrapper.querySelector(".e-dropdownbase").appendChild(virualElement);
      } else {
        this.list.getElementsByClassName("e-virtual-ddl")[0].style = this.GetVirtualTrackHeight();
      }
      if (this.list.querySelector(".e-virtual-ddl-content")) {
        this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
      }
      if (isCheckBoxUpdate) {
        this.loadTemplate();
      }
    };
    MultiSelect2.prototype.updateListItems = function(listItems, mainListItems) {
      for (var i = 0; i < listItems.length; i++) {
        this.findGroupStart(listItems[i]);
        this.findGroupStart(mainListItems[i]);
      }
      this.deselectHeader();
    };
    MultiSelect2.prototype.loadTemplate = function() {
      this.refreshListItems(null);
      if (this.enableVirtualization && this.list && this.mode === "CheckBox") {
        var reOrderList = this.list.querySelectorAll(".e-reorder")[0];
        if (this.list.querySelector(".e-virtual-ddl-content") && reOrderList) {
          this.list.querySelector(".e-virtual-ddl-content").removeChild(reOrderList);
        }
      }
      if (this.mode === "CheckBox") {
        this.removeFocus();
      }
      this.notify("reOrder", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", e: this });
      this.isPreventScrollAction = true;
    };
    MultiSelect2.prototype.setScrollPosition = function() {
      if ((!this.hideSelectedItem && this.mode !== "CheckBox" || this.mode === "CheckBox" && !this.enableSelectionOrder) && (!isNullOrUndefined(this.value) && this.value.length > 0)) {
        var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[this.value.length - 1]) : this.value[this.value.length - 1];
        var valueEle = this.findListElement(this.hideSelectedItem ? this.ulElement : this.list, "li", "data-value", value);
        if (!isNullOrUndefined(valueEle)) {
          this.scrollBottom(valueEle);
        }
      }
      if (this.enableVirtualization) {
        var focusedItem = this.list.querySelector("." + dropDownBaseClasses.focus);
        this.isKeyBoardAction = false;
        this.scrollBottom(focusedItem);
      }
    };
    MultiSelect2.prototype.focusAtFirstListItem = function() {
      if (this.ulElement && this.ulElement.querySelector("li." + dropDownBaseClasses.li)) {
        var element = void 0;
        if (this.mode === "CheckBox") {
          this.removeFocus();
          return;
        } else {
          if (this.enableVirtualization) {
            if (this.fields.disabled) {
              element = this.ulElement.querySelector("li." + dropDownBaseClasses.li + ":not(.e-virtual-list):not(.e-hide-listitem):not(." + DISABLED2 + ")");
            } else {
              element = this.ulElement.querySelector("li." + dropDownBaseClasses.li + ":not(.e-virtual-list):not(.e-hide-listitem)");
            }
          } else {
            if (this.fields.disabled) {
              element = this.ulElement.querySelector("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + "):not(." + DISABLED2 + ")");
            } else {
              element = this.ulElement.querySelector("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + ")");
            }
          }
        }
        if (element !== null) {
          this.removeFocus();
          this.addListFocus(element);
        }
      }
    };
    MultiSelect2.prototype.focusAtLastListItem = function(data) {
      var activeElement;
      if (data) {
        activeElement = Search(data, this.liCollections, "StartsWith", this.ignoreCase);
      } else {
        if (this.value && this.value.length) {
          var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[this.value.length - 1]) : this.value[this.value.length - 1];
          Search(value, this.liCollections, "StartsWith", this.ignoreCase);
        } else {
          activeElement = null;
        }
      }
      if (activeElement && activeElement.item !== null) {
        this.addListFocus(activeElement.item);
        if ((this.allowCustomValue || this.allowFiltering) && this.isPopupOpen() && this.closePopupOnSelect && !this.enableVirtualization || this.closePopupOnSelect && !this.enableVirtualization) {
          this.scrollBottom(activeElement.item, activeElement.index);
        }
      }
    };
    MultiSelect2.prototype.getAriaAttributes = function() {
      var ariaAttributes = {
        "aria-disabled": "false",
        "role": "combobox",
        "aria-expanded": "false"
      };
      return ariaAttributes;
    };
    MultiSelect2.prototype.updateListARIA = function() {
      if (!isNullOrUndefined(this.ulElement)) {
        attributes(this.ulElement, { "id": this.element.id + "_options", "role": "listbox", "aria-hidden": "false", "aria-label": "list" });
      }
      var disableStatus = !isNullOrUndefined(this.inputElement) && this.inputElement.disabled ? true : false;
      if (!this.isPopupOpen() && !isNullOrUndefined(this.inputElement)) {
        attributes(this.inputElement, this.getAriaAttributes());
      }
      if (disableStatus) {
        attributes(this.inputElement, { "aria-disabled": "true" });
      }
      this.ensureAriaDisabled(disableStatus ? "true" : "false");
    };
    MultiSelect2.prototype.ensureAriaDisabled = function(status) {
      if (this.htmlAttributes && this.htmlAttributes["aria-disabled"]) {
        var attr = this.htmlAttributes;
        extend(attr, { "aria-disabled": status }, attr);
        this.setProperties({ htmlAttributes: attr }, true);
      }
    };
    MultiSelect2.prototype.removelastSelection = function(e) {
      var selectedElem = this.chipCollectionWrapper.querySelector("span." + CHIP_SELECTED);
      if (selectedElem !== null) {
        this.removeSelectedChip(e);
        return;
      }
      var elements = this.chipCollectionWrapper.querySelectorAll("span." + CHIP2);
      var value = elements[elements.length - 1].getAttribute("data-value");
      if (!isNullOrUndefined(this.value)) {
        this.tempValues = this.allowObjectBinding ? this.value.slice() : this.value.slice();
      }
      var customValue = this.allowObjectBinding ? this.getDataByValue(this.getFormattedValue(value)) : this.getFormattedValue(value);
      if (this.allowCustomValue && (value !== "false" && customValue === false || !isNullOrUndefined(customValue) && customValue.toString() === "NaN")) {
        customValue = value;
      }
      this.removeValue(customValue, e);
      this.removeChipSelection();
      this.updateDelimeter(this.delimiterChar, e);
      this.makeTextBoxEmpty();
      if (this.mainList && this.listData) {
        this.refreshSelection();
      }
      this.checkPlaceholderSize();
    };
    MultiSelect2.prototype.onActionFailure = function(e) {
      _super.prototype.onActionFailure.call(this, e);
      this.renderPopup();
      this.onPopupShown();
    };
    MultiSelect2.prototype.targetElement = function() {
      this.targetInputElement = this.inputElement;
      if (this.mode === "CheckBox" && this.allowFiltering) {
        this.notify("targetElement", { module: "CheckBoxSelection", enable: this.mode === "CheckBox" });
      }
      return this.targetInputElement.value;
    };
    MultiSelect2.prototype.getForQuery = function(valuecheck, isCheckbox) {
      var predicate;
      var field = isNullOrUndefined(this.fields.value) ? this.fields.text : this.fields.value;
      if (this.enableVirtualization && valuecheck) {
        if (isCheckbox) {
          for (var i = 0; i < valuecheck.length; i++) {
            var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", valuecheck[i]) : valuecheck[i];
            if (i === 0) {
              predicate = new Predicate(field, "equal", value);
            } else {
              predicate = predicate.or(field, "equal", value);
            }
          }
          return new Query().where(predicate);
        } else {
          for (var i = 0; i < valuecheck.length; i++) {
            var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", valuecheck[i]) : valuecheck[i];
            if (i === 0) {
              predicate = new Predicate(field, "notequal", value);
            } else {
              predicate = predicate.and(field, "notequal", value);
            }
          }
          return new Query().where(predicate);
        }
      } else {
        for (var i = 0; i < valuecheck.length; i++) {
          if (i === 0) {
            predicate = new Predicate(field, "equal", valuecheck[i]);
          } else {
            predicate = predicate.or(field, "equal", valuecheck[i]);
          }
        }
      }
      if (this.dataSource instanceof DataManager && this.dataSource.adaptor instanceof JsonAdaptor) {
        return new Query().where(predicate);
      } else {
        return this.getQuery(this.query).clone().where(predicate);
      }
    };
    MultiSelect2.prototype.onActionComplete = function(ulElement, list, e, isUpdated) {
      if (this.dataSource instanceof DataManager && !isNullOrUndefined(e) && !this.virtualGroupDataSource) {
        this.totalItemCount = e.count;
      }
      _super.prototype.onActionComplete.call(this, ulElement, list, e);
      this.skeletonCount = this.totalItemCount != 0 && this.totalItemCount < this.itemCount * 2 ? 0 : this.skeletonCount;
      this.updateSelectElementData(this.allowFiltering);
      var proxy = this;
      if (!isNullOrUndefined(this.value) && !this.allowCustomValue && !this.enableVirtualization && this.listData && this.listData.length > 0) {
        for (var i = 0; i < this.value.length; i++) {
          var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", proxy.value[i]) : proxy.value[i];
          var checkEle = this.findListElement(this.allowFiltering && !isNullOrUndefined(this.mainList) ? this.mainList : ulElement, "li", "data-value", value);
          if (!checkEle && !(this.dataSource instanceof DataManager)) {
            this.value.splice(i, 1);
            i -= 1;
          }
        }
      }
      var valuecheck = [];
      if (!isNullOrUndefined(this.value)) {
        valuecheck = this.presentItemValue(this.ulElement);
      }
      if (valuecheck.length > 0 && this.dataSource instanceof DataManager && !isNullOrUndefined(this.value) && this.listData != null && !this.enableVirtualization) {
        this.addNonPresentItems(valuecheck, this.ulElement, this.listData);
      } else {
        this.updateActionList(ulElement, list, e);
      }
      if (this.dataSource instanceof DataManager && this.allowCustomValue && !this.isCustomRendered && this.inputElement.value && this.inputElement.value !== "") {
        var query = new Query();
        query = this.allowFiltering ? query.where(this.fields.text, "startswith", this.inputElement.value, this.ignoreCase, this.ignoreAccent) : query;
        this.checkForCustomValue(query, this.fields);
        this.isCustomRendered = true;
        this.remoteCustomValue = this.enableVirtualization ? false : this.remoteCustomValue;
      }
      if (this.mode === "CheckBox" && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy) && !isNullOrUndefined(this.fields.disabled)) {
        this.disableGroupHeader();
      }
      if (this.dataSource instanceof DataManager && this.mode === "CheckBox" && this.allowFiltering) {
        this.removeFocus();
      }
    };
    MultiSelect2.prototype.updateActionList = function(ulElement, list, e, isUpdated) {
      if (this.mode === "CheckBox" && this.showSelectAll) {
        this.notify("selectAll", { module: "CheckBoxSelection", enable: this.mode === "CheckBox" });
      }
      if (!this.mainList && !this.mainData) {
        this.mainList = ulElement.cloneNode ? ulElement.cloneNode(true) : ulElement;
        this.mainData = list;
        this.mainListCollection = this.liCollections;
      } else if (isNullOrUndefined(this.mainData) || this.mainData.length === 0) {
        this.mainData = list;
      }
      if ((this.remoteCustomValue || list.length <= 0) && this.allowCustomValue && this.inputFocus && this.allowFiltering && this.inputElement.value && this.inputElement.value !== "") {
        this.checkForCustomValue(this.tempQuery, this.fields);
        if (this.isCustomRendered) {
          return;
        }
      }
      if (this.value && this.value.length && (this.mode !== "CheckBox" && !isNullOrUndefined(this.inputElement) && this.inputElement.value.trim() !== "" || this.mode === "CheckBox" || (this.keyCode === 8 || this.keyCode === 46) && this.allowFiltering && this.allowCustomValue && this.dataSource instanceof DataManager && this.inputElement.value === "")) {
        this.refreshSelection();
      }
      this.updateListARIA();
      this.unwireListEvents();
      this.wireListEvents();
      if (!isNullOrUndefined(this.setInitialValue)) {
        this.setInitialValue();
      }
      if (!isNullOrUndefined(this.selectAllAction)) {
        this.selectAllAction();
      }
      if (this.setDynValue) {
        if (!isNullOrUndefined(this.text) && (isNullOrUndefined(this.value) || this.value.length === 0)) {
          this.initialTextUpdate();
        }
        if (!this.enableVirtualization || this.enableVirtualization && !(this.dataSource instanceof DataManager)) {
          this.initialValueUpdate();
        }
        this.initialUpdate();
        this.refreshPlaceHolder();
        if (this.mode !== "CheckBox" && this.changeOnBlur) {
          this.updateValueState(null, this.value, null);
        }
      }
      this.renderPopup();
      if (this.beforePopupOpen) {
        this.beforePopupOpen = false;
        this.onPopupShown(e);
      }
    };
    MultiSelect2.prototype.refreshSelection = function() {
      var value;
      var element;
      var className = this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected;
      if (!isNullOrUndefined(this.value)) {
        for (var index = 0; !isNullOrUndefined(this.value[index]); index++) {
          value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[index]) : this.value[index];
          element = this.findListElement(this.list, "li", "data-value", value);
          if (element) {
            addClass([element], className);
            if (this.hideSelectedItem && element.previousSibling && element.previousElementSibling.classList.contains(dropDownBaseClasses.group) && (!element.nextElementSibling || element.nextElementSibling.classList.contains(dropDownBaseClasses.group))) {
              addClass([element.previousElementSibling], className);
            }
            if (this.hideSelectedItem && this.fields.groupBy && !element.previousElementSibling.classList.contains(HIDE_LIST)) {
              this.hideGroupItem(value);
            }
            if (this.hideSelectedItem && element.classList.contains(dropDownBaseClasses.focus)) {
              removeClass([element], dropDownBaseClasses.focus);
              var listEle = element.parentElement.querySelectorAll("." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + ")");
              if (listEle.length > 0) {
                addClass([listEle[0]], dropDownBaseClasses.focus);
                this.updateAriaActiveDescendant();
              } else {
                if (!(this.list && this.list.querySelectorAll("." + dropDownBaseClasses.li).length > 0)) {
                  this.l10nUpdate();
                  addClass([this.list], dropDownBaseClasses.noData);
                }
              }
            }
            element.setAttribute("aria-selected", "true");
            if (this.mode === "CheckBox" && element.classList.contains("e-active")) {
              var ariaValue = element.getElementsByClassName("e-check").length;
              if (ariaValue === 0) {
                var args = {
                  module: "CheckBoxSelection",
                  enable: this.mode === "CheckBox",
                  li: element,
                  e: null
                };
                this.notify("updatelist", args);
              }
            }
          }
        }
      }
      this.checkSelectAll();
      this.checkMaxSelection();
    };
    MultiSelect2.prototype.hideGroupItem = function(value) {
      var element;
      var element1;
      var className = this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected;
      element1 = element = this.findListElement(this.ulElement, "li", "data-value", value);
      var i = 0;
      var j = 0;
      var temp = true;
      var temp1 = true;
      do {
        if (element && element.previousElementSibling && (!element.previousElementSibling.classList.contains(HIDE_LIST) && element.previousElementSibling.classList.contains(dropDownBaseClasses.li))) {
          temp = false;
        }
        if (!temp || !element || element.previousElementSibling && element.previousElementSibling.classList.contains(dropDownBaseClasses.group)) {
          i = 10;
        } else {
          element = element.previousElementSibling;
        }
        if (element1 && element1.nextElementSibling && (!element1.nextElementSibling.classList.contains(HIDE_LIST) && element1.nextElementSibling.classList.contains(dropDownBaseClasses.li))) {
          temp1 = false;
        }
        if (!temp1 || !element1 || element1.nextElementSibling && element1.nextElementSibling.classList.contains(dropDownBaseClasses.group)) {
          j = 10;
        } else {
          element1 = element1.nextElementSibling;
        }
      } while (i < 10 || j < 10);
      if (temp && temp1 && !element.previousElementSibling.classList.contains(HIDE_LIST)) {
        addClass([element.previousElementSibling], className);
      } else if (temp && temp1 && element.previousElementSibling.classList.contains(HIDE_LIST)) {
        removeClass([element.previousElementSibling], className);
      }
    };
    MultiSelect2.prototype.getValidLi = function() {
      var liElement = this.ulElement.querySelector("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + ")");
      return !isNullOrUndefined(liElement) ? liElement : this.liCollections[0];
    };
    MultiSelect2.prototype.checkSelectAll = function() {
      var groupItemLength = !isNullOrUndefined(this.fields.disabled) ? this.list.querySelectorAll("li.e-list-group-item.e-active:not(.e-disabled)").length : this.list.querySelectorAll("li.e-list-group-item.e-active").length;
      var listItem = this.list.querySelectorAll("li.e-list-item");
      var searchCount = this.enableVirtualization ? this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(.e-virtual-list)").length : !isNullOrUndefined(this.fields.disabled) ? this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(.e-disabled)").length : this.list.querySelectorAll("li." + dropDownBaseClasses.li).length;
      var searchActiveCount = this.list.querySelectorAll("li." + dropDownBaseClasses.selected).length;
      if (this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
        searchActiveCount = searchActiveCount - groupItemLength;
      }
      if (!this.enableVirtualization && ((searchCount === searchActiveCount || searchActiveCount === this.maximumSelectionLength) && (this.mode === "CheckBox" && this.showSelectAll)) || this.enableVirtualization && this.mode === "CheckBox" && this.showSelectAll && this.virtualSelectAll && this.value && this.value.length === this.totalItemCount) {
        this.notify("checkSelectAll", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", value: "check" });
      } else if (searchCount !== searchActiveCount && (this.mode === "CheckBox" && this.showSelectAll) && (!this.enableVirtualization || this.enableVirtualization && !this.virtualSelectAll)) {
        this.notify("checkSelectAll", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", value: "uncheck" });
      }
      if (this.enableGroupCheckBox && this.fields.groupBy && !this.enableSelectionOrder) {
        for (var i = 0; i < listItem.length; i++) {
          this.findGroupStart(listItem[i]);
        }
        this.deselectHeader();
      }
    };
    MultiSelect2.prototype.openClick = function(e) {
      if (!this.openOnClick && this.mode !== "CheckBox" && !this.isPopupOpen()) {
        if (this.targetElement() !== "") {
          this.showPopup();
        } else {
          this.hidePopup(e);
        }
      } else if (!this.openOnClick && this.mode === "CheckBox" && !this.isPopupOpen()) {
        this.showPopup();
      }
    };
    MultiSelect2.prototype.keyUp = function(e) {
      if (this.mode === "CheckBox" && !this.openOnClick) {
        var char = String.fromCharCode(e.keyCode);
        var isWordCharacter = char.match(/\w/);
        if (!isNullOrUndefined(isWordCharacter)) {
          this.isValidKey = true;
        }
      }
      this.isValidKey = this.isPopupOpen() && e.keyCode === 8 || this.isValidKey;
      this.isValidKey = e.ctrlKey && e.keyCode === 86 ? false : this.isValidKey;
      if (this.isValidKey && this.inputElement) {
        this.isValidKey = false;
        this.expandTextbox();
        this.showOverAllClear();
        switch (e.keyCode) {
          default:
            this.search(e);
        }
      }
    };
    MultiSelect2.prototype.filter = function(dataSource, query, fields) {
      this.isFiltered = true;
      this.remoteFilterAction = true;
      this.dataUpdater(dataSource, query, fields);
    };
    MultiSelect2.prototype.getQuery = function(query) {
      var filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
      if (this.isFiltered) {
        if (this.enableVirtualization && !isNullOrUndefined(this.customFilterQuery)) {
          filterQuery = this.customFilterQuery.clone();
        } else if (!this.enableVirtualization) {
          return filterQuery;
        }
      }
      if (this.filterAction) {
        if (this.targetElement() !== null && !this.enableVirtualization || this.enableVirtualization && this.targetElement() !== null && this.targetElement().trim() !== "") {
          var dataType = this.typeOfData(this.dataSource).typeof;
          if (!(this.dataSource instanceof DataManager) && dataType === "string" || dataType === "number") {
            filterQuery.where("", this.filterType, this.targetElement(), this.ignoreCase, this.ignoreAccent);
          } else if (this.enableVirtualization && this.targetElement() !== "" || !this.enableVirtualization) {
            var fields = this.fields;
            filterQuery.where(!isNullOrUndefined(fields.text) ? fields.text : "", this.filterType, this.targetElement(), this.ignoreCase, this.ignoreAccent);
          }
        }
        if (this.enableVirtualization && this.viewPortInfo.endIndex != 0 && !this.virtualSelectAll) {
          return this.virtualFilterQuery(filterQuery);
        }
        return filterQuery;
      } else {
        if (this.enableVirtualization && this.viewPortInfo.endIndex != 0 && !this.virtualSelectAll) {
          return this.virtualFilterQuery(filterQuery);
        }
        if (this.virtualSelectAll) {
          return query ? query.take(this.maximumSelectionLength).requiresCount() : this.query ? this.query.take(this.maximumSelectionLength).requiresCount() : new Query().take(this.maximumSelectionLength).requiresCount();
        }
        return query ? query : this.query ? this.query : new Query();
      }
    };
    MultiSelect2.prototype.virtualFilterQuery = function(filterQuery) {
      var takeValue = this.getTakeValue();
      var isReOrder = true;
      var isSkip = true;
      var isTake = true;
      for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
        if (this.getModuleName() === "multiselect" && (filterQuery.queries[queryElements].e && filterQuery.queries[queryElements].e.condition == "or" || filterQuery.queries[queryElements].e && filterQuery.queries[queryElements].e.operator == "equal")) {
          isReOrder = false;
        }
        if (filterQuery.queries[queryElements].fn === "onSkip") {
          isSkip = false;
        }
        if (filterQuery.queries[queryElements].fn === "onTake") {
          isTake = false;
        }
      }
      var queryTakeValue = 0;
      if (filterQuery && filterQuery.queries.length > 0) {
        for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
          if (filterQuery.queries[queryElements].fn === "onTake") {
            queryTakeValue = takeValue <= filterQuery.queries[queryElements].e.nos ? filterQuery.queries[queryElements].e.nos : takeValue;
          }
        }
      }
      if (queryTakeValue <= 0 && this.query && this.query.queries.length > 0) {
        for (var queryElements = 0; queryElements < this.query.queries.length; queryElements++) {
          if (this.query.queries[queryElements].fn === "onTake") {
            queryTakeValue = takeValue <= this.query.queries[queryElements].e.nos ? this.query.queries[queryElements].e.nos : takeValue;
          }
        }
      }
      if (filterQuery && filterQuery.queries.length > 0) {
        for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
          if (filterQuery.queries[queryElements].fn === "onTake") {
            queryTakeValue = filterQuery.queries[queryElements].e.nos <= queryTakeValue ? queryTakeValue : filterQuery.queries[queryElements].e.nos;
            filterQuery.queries.splice(queryElements, 1);
            --queryElements;
          }
        }
      }
      if (this.allowFiltering && isSkip || !isReOrder || !this.allowFiltering && isSkip) {
        if (!isReOrder) {
          filterQuery.skip(this.viewPortInfo.startIndex);
        } else {
          filterQuery.skip(this.virtualItemStartIndex);
        }
      }
      if (this.isIncrementalRequest) {
        filterQuery.take(this.incrementalEndIndex);
      } else if (queryTakeValue > 0) {
        filterQuery.take(queryTakeValue);
      } else {
        filterQuery.take(takeValue);
      }
      filterQuery.requiresCount();
      return filterQuery;
    };
    MultiSelect2.prototype.getTakeValue = function() {
      return this.allowFiltering && Browser.isDevice ? Math.round(window.outerHeight / this.listItemHeight) : this.itemCount;
    };
    MultiSelect2.prototype.dataUpdater = function(dataSource, query, fields) {
      this.isDataFetched = false;
      var isNoData = this.list.classList.contains(dropDownBaseClasses.noData);
      if (this.targetElement().trim() === "") {
        var list = this.enableVirtualization ? this.list.cloneNode(true) : this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
        if (this.backCommand) {
          this.remoteCustomValue = false;
          if (this.allowCustomValue && list.querySelectorAll("li").length == 0 && this.mainData.length > 0) {
            this.mainData = [];
          }
          if (this.enableVirtualization) {
            this.totalItemCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
            this.resetList(dataSource, fields, query);
            if (this.mode !== "CheckBox") {
              this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length : this.totalItemCount;
            }
            this.UpdateSkeleton();
            if ((isNoData || this.allowCustomValue) && !this.list.classList.contains(dropDownBaseClasses.noData)) {
              if (!this.list.querySelector(".e-virtual-ddl-content")) {
                this.list.appendChild(this.createElement("div", {
                  className: "e-virtual-ddl-content",
                  styles: this.getTransformValues()
                })).appendChild(this.list.querySelector(".e-list-parent"));
              }
              if (!this.list.querySelector(".e-virtual-ddl")) {
                var virualElement = this.createElement("div", {
                  id: this.element.id + "_popup",
                  className: "e-virtual-ddl",
                  styles: this.GetVirtualTrackHeight()
                });
                document.getElementsByClassName("e-popup")[0].querySelector(".e-dropdownbase").appendChild(virualElement);
              }
            }
          }
          this.onActionComplete(list, this.mainData);
          if (this.value && this.value.length) {
            this.refreshSelection();
          }
          if (this.keyCode !== 8) {
            this.focusAtFirstListItem();
          }
          this.notify("reOrder", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", e: this });
        }
      } else {
        if (this.enableVirtualization && this.allowFiltering) {
          this.isPreventScrollAction = true;
          this.list.scrollTop = 0;
          this.previousStartIndex = 0;
          this.virtualListInfo = null;
        }
        this.resetList(dataSource, fields, query);
        if (this.enableVirtualization && (isNoData || this.allowCustomValue) && !this.list.classList.contains(dropDownBaseClasses.noData)) {
          if (!this.list.querySelector(".e-virtual-ddl-content")) {
            this.list.appendChild(this.createElement("div", {
              className: "e-virtual-ddl-content",
              styles: this.getTransformValues()
            })).appendChild(this.list.querySelector(".e-list-parent"));
          }
          if (this.mode !== "CheckBox") {
            this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length : this.totalItemCount;
          }
          if (!this.list.querySelector(".e-virtual-ddl")) {
            var virualElement = this.createElement("div", {
              id: this.element.id + "_popup",
              className: "e-virtual-ddl",
              styles: this.GetVirtualTrackHeight()
            });
            document.getElementsByClassName("e-popup")[0].querySelector(".e-dropdownbase").appendChild(virualElement);
          }
        }
        if (this.allowCustomValue) {
          if (!(dataSource instanceof DataManager)) {
            this.checkForCustomValue(query, fields);
          } else {
            this.remoteCustomValue = true;
            this.tempQuery = query;
          }
        }
      }
      if (this.enableVirtualization && this.allowFiltering) {
        this.getFilteringSkeletonCount();
      }
      this.refreshPopup();
      if (this.mode === "CheckBox") {
        this.removeFocus();
      }
    };
    MultiSelect2.prototype.checkForCustomValue = function(query, fields) {
      var dataChecks = !this.getValueByText(this.inputElement.value, this.ignoreCase);
      var field = fields ? fields : this.fields;
      if (this.allowCustomValue && dataChecks) {
        var value = this.inputElement.value;
        var customData = !isNullOrUndefined(this.mainData) && this.mainData.length > 0 ? this.mainData[0] : this.mainData;
        if (customData && typeof customData !== "string" && typeof customData !== "number" && typeof customData !== "boolean") {
          var dataItem_1 = {};
          setValue(field.text, value, dataItem_1);
          if (typeof getValue(this.fields.value ? this.fields.value : "value", customData) === "number" && this.fields.value !== this.fields.text) {
            setValue(field.value, Math.random(), dataItem_1);
          } else {
            setValue(field.value, value, dataItem_1);
          }
          var emptyObject_1 = {};
          if (this.allowObjectBinding) {
            var keys = this.listData && this.listData.length > 0 ? Object.keys(this.listData[0]) : this.firstItem ? Object.keys(this.firstItem) : Object.keys(dataItem_1);
            keys.forEach(function(key) {
              emptyObject_1[key] = key === fields.value || key === fields.text ? getValue(fields.value, dataItem_1) : null;
            });
          }
          dataItem_1 = this.allowObjectBinding ? emptyObject_1 : dataItem_1;
          if (this.enableVirtualization) {
            this.virtualCustomData = dataItem_1;
            var tempData = this.dataSource instanceof DataManager ? JSON.parse(JSON.stringify(this.listData)) : JSON.parse(JSON.stringify(this.dataSource));
            var totalData = [];
            if (this.virtualCustomSelectData && this.virtualCustomSelectData.length > 0) {
              totalData = tempData.concat(this.virtualCustomSelectData);
            }
            tempData.splice(0, 0, dataItem_1);
            this.isCustomDataUpdated = true;
            var tempCount = this.totalItemCount;
            this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
            this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.itemCount;
            this.resetList(tempData, field, query);
            this.isCustomDataUpdated = false;
            this.totalItemCount = this.enableVirtualization && this.dataSource instanceof DataManager ? tempCount : this.totalItemCount;
          } else {
            if (this.dataSource instanceof DataManager && this.allowCustomValue && this.allowFiltering) {
              this.remoteCustomValue = false;
            }
            var tempData = JSON.parse(JSON.stringify(this.listData));
            tempData.splice(0, 0, dataItem_1);
            this.resetList(tempData, field, query);
          }
        } else if (this.listData) {
          var tempData = JSON.parse(JSON.stringify(this.listData));
          tempData.splice(0, 0, this.inputElement.value);
          tempData[0] = typeof customData === "number" && !isNaN(parseFloat(tempData[0])) ? parseFloat(tempData[0]) : tempData[0];
          tempData[0] = typeof customData === "boolean" ? tempData[0] === "true" ? true : tempData[0] === "false" ? false : tempData[0] : tempData[0];
          this.resetList(tempData, field);
        }
      } else if (this.listData && this.mainData && !dataChecks && this.allowCustomValue) {
        if (this.allowFiltering && this.isRemoteSelection && this.remoteCustomValue) {
          this.isRemoteSelection = false;
          if (!this.enableVirtualization) {
            this.resetList(this.listData, field, query);
          }
        } else if (!this.allowFiltering && this.list) {
          var liCollections = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(.e-hide-listitem)");
          var activeElement = Search(this.targetElement(), liCollections, "StartsWith", this.ignoreCase);
          if (activeElement && activeElement.item !== null) {
            this.addListFocus(activeElement.item);
          }
        }
      }
      if (this.value && this.value.length) {
        this.refreshSelection();
      }
    };
    MultiSelect2.prototype.getNgDirective = function() {
      return "EJS-MULTISELECT";
    };
    MultiSelect2.prototype.wrapperClick = function(e) {
      this.setDynValue = false;
      this.keyboardEvent = null;
      this.isKeyBoardAction = false;
      if (!this.enabled) {
        return;
      }
      if (e.target === this.overAllClear) {
        e.preventDefault();
        return;
      }
      if (!this.inputFocus) {
        this.inputElement.focus();
      }
      if (!this.readonly) {
        if (e.target && e.target.classList.toString().indexOf(CHIP_CLOSE2) !== -1) {
          if (this.isPopupOpen()) {
            this.refreshPopup();
          }
          return;
        }
        if (!this.isPopupOpen() && (this.openOnClick || this.showDropDownIcon && e.target && e.target.className === dropdownIcon)) {
          this.showPopup(e);
        } else {
          this.hidePopup(e);
          if (this.mode === "CheckBox") {
            this.showOverAllClear();
            this.inputFocus = true;
            if (!this.overAllWrapper.classList.contains(FOCUS)) {
              this.overAllWrapper.classList.add(FOCUS);
            }
          }
        }
      }
      if (!(this.targetElement() && this.targetElement() !== "")) {
        e.preventDefault();
      }
    };
    MultiSelect2.prototype.enable = function(state) {
      if (state) {
        this.overAllWrapper.classList.remove(DISABLED2);
        this.inputElement.removeAttribute("disabled");
        attributes(this.inputElement, { "aria-disabled": "false" });
        this.ensureAriaDisabled("false");
      } else {
        this.overAllWrapper.classList.add(DISABLED2);
        this.inputElement.setAttribute("disabled", "true");
        attributes(this.inputElement, { "aria-disabled": "true" });
        this.ensureAriaDisabled("true");
      }
      if (this.enabled !== state) {
        this.enabled = state;
      }
      this.hidePopup();
    };
    MultiSelect2.prototype.onBlurHandler = function(eve, isDocClickFromCheck) {
      var target;
      if (!isNullOrUndefined(eve)) {
        target = eve.relatedTarget;
      }
      if (this.popupObj && document.body.contains(this.popupObj.element) && this.popupObj.element.contains(target)) {
        if (this.mode !== "CheckBox") {
          this.inputElement.focus();
        } else if (this.floatLabelType === "Auto" && (this.overAllWrapper.classList.contains("e-outline") || this.overAllWrapper.classList.contains("e-filled"))) {
          addClass([this.overAllWrapper], "e-valid-input");
        }
        return;
      }
      if (this.floatLabelType === "Auto" && this.overAllWrapper.classList.contains("e-outline") && this.mode === "CheckBox" && (isNullOrUndefined(this.value) || this.value.length === 0)) {
        removeClass([this.overAllWrapper], "e-valid-input");
      }
      if (this.mode === "CheckBox" && Browser.isIE && !isNullOrUndefined(eve) && !isDocClickFromCheck) {
        this.inputFocus = false;
        this.overAllWrapper.classList.remove(FOCUS);
        return;
      }
      if (this.scrollFocusStatus) {
        if (!isNullOrUndefined(eve)) {
          eve.preventDefault();
        }
        this.inputElement.focus();
        this.scrollFocusStatus = false;
        return;
      }
      this.inputFocus = false;
      this.overAllWrapper.classList.remove(FOCUS);
      if (this.addTagOnBlur) {
        var dataChecks = this.getValueByText(this.inputElement.value, this.ignoreCase, this.ignoreAccent);
        var listLiElement = this.findListElement(this.list, "li", "data-value", dataChecks);
        var className = this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected;
        var allowChipAddition = listLiElement && !listLiElement.classList.contains(className) ? true : false;
        if (allowChipAddition) {
          this.updateListSelection(listLiElement, eve);
          if (this.mode === "Delimiter") {
            this.updateDelimeter(this.delimiterChar);
          }
        }
      }
      this.updateDataList();
      if (this.resetMainList) {
        this.mainList = this.resetMainList;
        this.resetMainList = null;
      }
      this.refreshListItems(null);
      if (this.mode !== "Box" && this.mode !== "CheckBox") {
        this.updateDelimView();
      }
      if (this.changeOnBlur) {
        this.updateValueState(eve, this.value, this.tempValues);
        this.dispatchEvent(this.hiddenElement, "change");
      }
      this.overAllClear.style.display = "none";
      if (this.isPopupOpen()) {
        this.hidePopup(eve);
      }
      this.makeTextBoxEmpty();
      this.trigger("blur");
      this.focused = true;
      if (Browser.isDevice && this.mode !== "Delimiter" && this.mode !== "CheckBox") {
        this.removeChipFocus();
      }
      this.removeChipSelection();
      this.refreshInputHight();
      floatLabelBlur(this.overAllWrapper, this.componentWrapper, this.value, this.floatLabelType, this.placeholder);
      this.refreshPlaceHolder();
      if ((this.allowFiltering || this.enableSelectionOrder === true && this.mode === "CheckBox") && !isNullOrUndefined(this.mainList)) {
        this.ulElement = this.mainList;
      }
      this.checkPlaceholderSize();
      Input.createSpanElement(this.overAllWrapper, this.createElement);
      this.calculateWidth();
      if (!isNullOrUndefined(this.overAllWrapper) && !isNullOrUndefined(this.overAllWrapper.getElementsByClassName("e-ddl-icon")[0] && this.overAllWrapper.getElementsByClassName("e-float-text-content")[0] && this.floatLabelType !== "Never")) {
        this.overAllWrapper.getElementsByClassName("e-float-text-content")[0].classList.add("e-icon");
      }
    };
    MultiSelect2.prototype.calculateWidth = function() {
      var elementWidth;
      if (this.overAllWrapper) {
        if (!this.showDropDownIcon || this.overAllWrapper.querySelector(".e-label-top")) {
          elementWidth = this.overAllWrapper.clientWidth - 2 * parseInt(getComputedStyle(this.inputElement).paddingRight);
        } else {
          var downIconWidth = this.dropIcon.offsetWidth + parseInt(getComputedStyle(this.dropIcon).marginRight);
          elementWidth = this.overAllWrapper.clientWidth - (downIconWidth + 2 * parseInt(getComputedStyle(this.inputElement).paddingRight));
        }
        if (this.floatLabelType !== "Never") {
          Input.calculateWidth(elementWidth, this.overAllWrapper, this.getModuleName());
        }
      }
    };
    MultiSelect2.prototype.checkPlaceholderSize = function() {
      if (this.showDropDownIcon) {
        var downIconWidth = this.dropIcon.offsetWidth + parseInt(window.getComputedStyle(this.dropIcon).marginRight, 10);
        this.setPlaceholderSize(downIconWidth);
      } else {
        if (!isNullOrUndefined(this.dropIcon)) {
          this.setPlaceholderSize(this.showDropDownIcon ? this.dropIcon.offsetWidth : 0);
        }
      }
    };
    MultiSelect2.prototype.setPlaceholderSize = function(downIconWidth) {
      if (isNullOrUndefined(this.value) || this.value.length === 0) {
        if (this.dropIcon.offsetWidth !== 0) {
          this.searchWrapper.style.width = "calc(100% - " + (downIconWidth + 10) + "px";
        } else {
          addClass([this.searchWrapper], CUSTOM_WIDTH);
        }
      } else if (!isNullOrUndefined(this.value)) {
        this.searchWrapper.removeAttribute("style");
        removeClass([this.searchWrapper], CUSTOM_WIDTH);
      }
    };
    MultiSelect2.prototype.refreshInputHight = function() {
      if (!isNullOrUndefined(this.searchWrapper)) {
        if ((!this.value || !this.value.length) && (isNullOrUndefined(this.text) || this.text === "")) {
          this.searchWrapper.classList.remove(ZERO_SIZE);
        } else {
          this.searchWrapper.classList.add(ZERO_SIZE);
        }
      }
    };
    MultiSelect2.prototype.validateValues = function(newValue, oldValue) {
      return JSON.stringify(newValue.slice().sort()) !== JSON.stringify(oldValue.slice().sort());
    };
    MultiSelect2.prototype.updateValueState = function(event2, newVal, oldVal) {
      var newValue = newVal ? newVal : [];
      var oldValue = oldVal ? oldVal : [];
      if (this.initStatus && this.validateValues(newValue, oldValue)) {
        var eventArgs = {
          e: event2,
          oldValue: this.allowObjectBinding ? oldVal : oldVal,
          value: this.allowObjectBinding ? newVal : newVal,
          isInteracted: event2 ? true : false,
          element: this.element,
          event: event2
        };
        if (this.isAngular && this.preventChange) {
          this.preventChange = false;
        } else {
          this.trigger("change", eventArgs);
        }
        this.updateTempValue();
        if (!this.changeOnBlur) {
          this.dispatchEvent(this.hiddenElement, "change");
        }
      }
      this.selectedValueInfo = this.viewPortInfo;
    };
    MultiSelect2.prototype.updateTempValue = function() {
      if (!this.value) {
        this.tempValues = this.value;
      } else {
        this.tempValues = this.allowObjectBinding ? this.value.slice() : this.value.slice();
      }
    };
    MultiSelect2.prototype.updateAriaActiveDescendant = function() {
      if (!isNullOrUndefined(this.ulElement) && !isNullOrUndefined(this.ulElement.getElementsByClassName("e-item-focus")[0])) {
        attributes(this.inputElement, { "aria-activedescendant": this.ulElement.getElementsByClassName("e-item-focus")[0].id });
      }
    };
    MultiSelect2.prototype.pageUpSelection = function(steps, isVirtualKeyAction) {
      var collection = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + "):not(.e-reorder-hide)");
      var previousItem = steps >= 0 ? collection[steps + 1] : collection[0];
      if (this.enableVirtualization && isVirtualKeyAction) {
        previousItem = this.liCollections.length >= steps && steps >= 0 ? this.liCollections[steps] : this.liCollections[this.skeletonCount];
      }
      if (!isNullOrUndefined(previousItem) && previousItem.classList.contains("e-virtual-list")) {
        previousItem = this.liCollections[this.skeletonCount];
      }
      if (this.enableVirtualization) {
        if (!isNullOrUndefined(previousItem) && !previousItem.classList.contains("e-item-focus")) {
          this.isKeyBoardAction = true;
          this.addListFocus(previousItem);
          this.scrollTop(previousItem, this.getIndexByValue(previousItem.getAttribute("data-value")), this.keyboardEvent.keyCode);
        } else if (this.viewPortInfo.startIndex == 0) {
          this.isKeyBoardAction = true;
          this.scrollTop(previousItem, this.getIndexByValue(previousItem.getAttribute("data-value")), this.keyboardEvent.keyCode);
        }
        this.previousFocusItem = previousItem;
      } else {
        this.isKeyBoardAction = true;
        this.addListFocus(previousItem);
        this.scrollTop(previousItem, this.getIndexByValue(previousItem.getAttribute("data-value")), this.keyboardEvent.keyCode);
      }
    };
    MultiSelect2.prototype.pageDownSelection = function(steps, isVirtualKeyAction) {
      var list = this.getItems();
      var collection = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + "):not(.e-reorder-hide)");
      var previousItem = steps <= collection.length ? collection[steps - 1] : collection[collection.length - 1];
      if (this.enableVirtualization && this.skeletonCount > 0) {
        previousItem = steps < list.length ? this.liCollections[steps] : this.liCollections[list.length - 1];
      }
      if (this.enableVirtualization && isVirtualKeyAction) {
        previousItem = steps <= list.length ? this.liCollections[steps] : this.liCollections[list.length - 1];
      }
      this.isKeyBoardAction = true;
      this.addListFocus(previousItem);
      this.previousFocusItem = previousItem;
      this.scrollBottom(previousItem, this.getIndexByValue(previousItem.getAttribute("data-value")), false, this.keyboardEvent.keyCode);
    };
    MultiSelect2.prototype.getItems = function() {
      if (!this.list) {
        _super.prototype.render.call(this);
      }
      return this.ulElement && this.ulElement.querySelectorAll("." + dropDownBaseClasses.li).length > 0 ? this.ulElement.querySelectorAll("." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + ")") : [];
    };
    MultiSelect2.prototype.focusInHandler = function(e) {
      var _this = this;
      if (this.enabled) {
        this.showOverAllClear();
        this.inputFocus = true;
        if (this.value && this.value.length) {
          if (this.mode !== "Delimiter" && this.mode !== "CheckBox") {
            this.chipCollectionWrapper.style.display = "";
          } else {
            this.showDelimWrapper();
          }
          if (this.mode !== "CheckBox") {
            this.viewWrapper.style.display = "none";
          }
        }
        if (this.mode !== "CheckBox") {
          this.searchWrapper.classList.remove(ZERO_SIZE);
        }
        this.checkPlaceholderSize();
        if (this.focused) {
          var args = { isInteracted: e ? true : false, event: e };
          this.trigger("focus", args);
          this.focused = false;
        }
        if (!this.overAllWrapper.classList.contains(FOCUS)) {
          this.overAllWrapper.classList.add(FOCUS);
        }
        floatLabelFocus(this.overAllWrapper, this.componentWrapper);
        if (this.isPopupOpen()) {
          this.refreshPopup();
        }
        setTimeout(function() {
          _this.calculateWidth();
        }, 150);
        return true;
      } else {
        return false;
      }
    };
    MultiSelect2.prototype.showDelimWrapper = function() {
      if (this.mode === "CheckBox") {
        this.viewWrapper.style.display = "";
      } else {
        this.delimiterWrapper.style.display = "";
      }
      this.componentWrapper.classList.add(DELIMITER_VIEW_WRAPPER);
    };
    MultiSelect2.prototype.hideDelimWrapper = function() {
      this.delimiterWrapper.style.display = "none";
      this.componentWrapper.classList.remove(DELIMITER_VIEW_WRAPPER);
    };
    MultiSelect2.prototype.expandTextbox = function() {
      var size = 5;
      if (this.placeholder) {
        var codePoint = this.placeholder.charCodeAt(0);
        var sizeMultiplier = 44032 <= codePoint && codePoint <= 55215 ? 1.5 : 19968 <= codePoint && codePoint <= 40959 ? 2 : 1;
        size = size > this.inputElement.placeholder.length ? size : this.inputElement.placeholder.length * sizeMultiplier;
      }
      if (this.inputElement.value.length > size) {
        this.inputElement.size = this.inputElement.value.length;
      } else {
        this.inputElement.size = size;
      }
    };
    MultiSelect2.prototype.isPopupOpen = function() {
      return this.popupWrapper !== null && this.popupWrapper.parentElement !== null;
    };
    MultiSelect2.prototype.refreshPopup = function() {
      if (this.popupObj && this.mobFilter) {
        this.popupObj.setProperties({ width: this.calcPopupWidth() });
        this.popupObj.refreshPosition(this.overAllWrapper);
        this.popupObj.resolveCollision();
      }
    };
    MultiSelect2.prototype.checkTextLength = function() {
      return this.targetElement().length < 1;
    };
    MultiSelect2.prototype.popupKeyActions = function(e) {
      switch (e.keyCode) {
        case 38:
          this.hidePopup(e);
          if (this.mode === "CheckBox") {
            this.inputElement.focus();
          }
          e.preventDefault();
          break;
        case 40:
          if (!this.isPopupOpen()) {
            this.showPopup(e);
            e.preventDefault();
          }
          break;
      }
    };
    MultiSelect2.prototype.updateAriaAttribute = function() {
      var focusedItem = this.list.querySelector("." + dropDownBaseClasses.focus);
      if (!isNullOrUndefined(focusedItem)) {
        this.inputElement.setAttribute("aria-activedescendant", focusedItem.id);
        if (this.allowFiltering) {
          var filterInput2 = this.popupWrapper.querySelector("." + FILTERINPUT);
          filterInput2 && filterInput2.setAttribute("aria-activedescendant", focusedItem.id);
        } else if (this.mode == "CheckBox") {
          this.overAllWrapper.setAttribute("aria-activedescendant", focusedItem.id);
        }
      }
    };
    MultiSelect2.prototype.homeNavigation = function(isHome, isVirtualKeyAction) {
      this.removeFocus();
      if (this.enableVirtualization) {
        if (isHome) {
          if (this.enableVirtualization && this.viewPortInfo.startIndex !== 0) {
            this.viewPortInfo.startIndex = 0;
            this.viewPortInfo.endIndex = this.itemCount;
            this.updateVirtualItemIndex();
            this.resetList(this.dataSource, this.fields, this.query);
          }
        } else {
          if (this.enableVirtualization && (!this.value && this.viewPortInfo.endIndex !== this.totalItemCount || this.value && this.value.length > 0 && this.viewPortInfo.endIndex !== this.totalItemCount + this.value.length)) {
            this.viewPortInfo.startIndex = this.totalItemCount - this.itemCount;
            this.viewPortInfo.endIndex = this.totalItemCount;
            this.updateVirtualItemIndex();
            var query = new Query().clone();
            if (this.value && this.value.length > 0) {
              query = this.getForQuery(this.value).clone();
              query = query.skip(this.totalItemCount - this.itemCount);
            }
            this.resetList(this.dataSource, this.fields, query);
          }
        }
      }
      this.UpdateSkeleton();
      var scrollEle = this.ulElement.querySelectorAll("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + "):not(.e-reorder-hide)");
      if (scrollEle.length > 0) {
        var element = scrollEle[isHome ? 0 : scrollEle.length - 1];
        if (this.enableVirtualization && isHome) {
          element = scrollEle[this.skeletonCount];
        }
        this.removeFocus();
        element.classList.add(dropDownBaseClasses.focus);
        if (this.enableVirtualization && isHome) {
          this.scrollTop(element, void 0, this.keyboardEvent.keyCode);
        } else if (!isVirtualKeyAction) {
          this.scrollBottom(element, void 0, false, this.keyboardEvent.keyCode);
        }
        this.updateAriaActiveDescendant();
      }
    };
    MultiSelect2.prototype.updateSelectionList = function() {
      if (!isNullOrUndefined(this.value) && this.value.length) {
        for (var index = 0; index < this.value.length; index++) {
          var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[index]) : this.value[index];
          var selectedItem = this.getElementByValue(value);
          if (selectedItem && !selectedItem.classList.contains(dropDownBaseClasses.selected)) {
            selectedItem.classList.add("e-active");
          }
        }
      }
    };
    MultiSelect2.prototype.handleVirtualKeyboardActions = function(e, pageCount) {
      var focusedItem = this.list.querySelector("." + dropDownBaseClasses.focus);
      var activeIndex;
      this.isKeyBoardAction = true;
      switch (e.keyCode) {
        case 40:
          this.arrowDown(e, true);
          break;
        case 38:
          this.arrowUp(e, true);
          break;
        case 33:
          e.preventDefault();
          if (focusedItem) {
            activeIndex = this.getIndexByValue(this.previousFocusItem.getAttribute("data-value")) - 1;
            this.pageUpSelection(activeIndex, true);
            this.updateAriaAttribute();
          }
          break;
        case 34:
          e.preventDefault();
          if (focusedItem) {
            activeIndex = this.getIndexByValue(this.previousFocusItem.getAttribute("data-value"));
            this.pageDownSelection(activeIndex, true);
            this.updateAriaAttribute();
          }
          break;
        case 35:
        case 36:
          this.isMouseScrollAction = true;
          this.homeNavigation(e.keyCode === 36 ? true : false, true);
          this.isPreventScrollAction = true;
          break;
      }
      this.keyboardEvent = null;
      this.isScrollChanged = true;
      this.isKeyBoardAction = false;
    };
    MultiSelect2.prototype.onKeyDown = function(e) {
      if (this.readonly || !this.enabled && this.mode !== "CheckBox") {
        return;
      }
      this.preventSetCurrentData = false;
      this.keyboardEvent = e;
      if (this.isPreventKeyAction && this.enableVirtualization) {
        e.preventDefault();
      }
      this.keyCode = e.keyCode;
      this.keyDownStatus = true;
      if (e.keyCode > 111 && e.keyCode < 124) {
        return;
      }
      if (e.altKey) {
        this.popupKeyActions(e);
        return;
      } else if (this.isPopupOpen()) {
        var focusedItem = this.list.querySelector("." + dropDownBaseClasses.focus);
        var activeIndex = void 0;
        switch (e.keyCode) {
          case 36:
          case 35:
            this.isMouseScrollAction = true;
            this.isKeyBoardAction = true;
            this.homeNavigation(e.keyCode === 36 ? true : false);
            break;
          case 33:
            e.preventDefault();
            if (focusedItem) {
              activeIndex = this.getIndexByValue(focusedItem.getAttribute("data-value"));
              this.pageUpSelection(activeIndex - this.getPageCount() - 1);
              this.updateAriaAttribute();
            }
            return;
          case 34:
            e.preventDefault();
            if (focusedItem) {
              activeIndex = this.getIndexByValue(focusedItem.getAttribute("data-value"));
              this.pageDownSelection(activeIndex + this.getPageCount());
              this.updateAriaAttribute();
            }
            return;
          case 38:
            this.isKeyBoardAction = true;
            this.arrowUp(e);
            break;
          case 40:
            this.isKeyBoardAction = true;
            this.arrowDown(e);
            break;
          case 27:
            e.preventDefault();
            this.isKeyBoardAction = true;
            this.hidePopup(e);
            if (this.mode === "CheckBox") {
              this.inputElement.focus();
            }
            return;
          case 13:
            e.preventDefault();
            this.isKeyBoardAction = true;
            if (this.mode !== "CheckBox") {
              this.selectByKey(e);
            }
            this.checkPlaceholderSize();
            return;
          case 32:
            this.isKeyBoardAction = true;
            this.spaceKeySelection(e);
            return;
          case 9:
            e.preventDefault();
            this.isKeyBoardAction = true;
            this.hidePopup(e);
            this.inputElement.focus();
            this.overAllWrapper.classList.add(FOCUS);
        }
      } else {
        switch (e.keyCode) {
          case 13:
          case 9:
          case 16:
          case 17:
          case 20:
            return;
          case 40:
            if (this.openOnClick) {
              this.showPopup();
            }
            break;
          case 27:
            e.preventDefault();
            this.escapeAction();
            return;
        }
      }
      if (this.checkTextLength()) {
        this.keyNavigation(e);
      }
      if (this.mode === "CheckBox" && this.enableSelectionOrder) {
        if (this.allowFiltering) {
          this.previousFilterText = this.targetElement();
        }
        this.checkBackCommand(e);
      }
      this.expandTextbox();
      if (!(this.mode === "CheckBox" && this.showSelectAll)) {
        this.refreshPopup();
      }
      this.isKeyBoardAction = false;
    };
    MultiSelect2.prototype.arrowDown = function(e, isVirtualKeyAction) {
      e.preventDefault();
      this.moveByList(1, isVirtualKeyAction);
      this.keyAction = true;
      if (document.activeElement.classList.contains(FILTERINPUT) || this.mode === "CheckBox" && !this.allowFiltering && document.activeElement !== this.list) {
        EventHandler.add(this.list, "keydown", this.onKeyDown, this);
      }
      this.updateAriaAttribute();
    };
    MultiSelect2.prototype.arrowUp = function(e, isVirtualKeyAction) {
      e.preventDefault();
      this.keyAction = true;
      var list = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + "):not(.e-reorder-hide)");
      if (this.enableGroupCheckBox && this.mode === "CheckBox" && !isNullOrUndefined(this.fields.groupBy)) {
        list = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ",li." + dropDownBaseClasses.group + ":not(." + HIDE_LIST + "):not(.e-reorder-hide)");
      }
      var focuseElem = this.list.querySelector("li." + dropDownBaseClasses.focus);
      this.focusFirstListItem = !isNullOrUndefined(this.liCollections[0]) ? this.liCollections[0].classList.contains("e-item-focus") : false;
      var index = Array.prototype.slice.call(list).indexOf(focuseElem);
      if (index <= 0 && (this.mode === "CheckBox" && this.allowFiltering)) {
        this.keyAction = false;
        this.notify("inputFocus", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", value: "focus" });
      }
      this.moveByList(-1, isVirtualKeyAction);
      this.updateAriaAttribute();
    };
    MultiSelect2.prototype.spaceKeySelection = function(e) {
      if (this.mode === "CheckBox") {
        var li = this.list.querySelector("li." + dropDownBaseClasses.focus);
        var selectAllParent = document.getElementsByClassName("e-selectall-parent")[0];
        if (!isNullOrUndefined(li) || selectAllParent && selectAllParent.classList.contains("e-item-focus")) {
          e.preventDefault();
          this.keyAction = true;
        }
        this.selectByKey(e);
        if (this.keyAction) {
          var li_1 = this.list.querySelector("li." + dropDownBaseClasses.focus);
          if (!isNullOrUndefined(li_1) && selectAllParent && selectAllParent.classList.contains("e-item-focus")) {
            li_1.classList.remove("e-item-focus");
          }
        }
      }
      this.checkPlaceholderSize();
    };
    MultiSelect2.prototype.checkBackCommand = function(e) {
      if (e.keyCode === 8 && this.allowFiltering ? this.targetElement() !== this.previousFilterText : this.targetElement() === "") {
        this.backCommand = false;
      } else {
        this.backCommand = true;
      }
    };
    MultiSelect2.prototype.keyNavigation = function(e) {
      if (this.mode !== "Delimiter" && this.mode !== "CheckBox" && this.value && this.value.length) {
        switch (e.keyCode) {
          case 37:
            e.preventDefault();
            this.moveBy(-1, e);
            break;
          case 39:
            e.preventDefault();
            this.moveBy(1, e);
            break;
          case 8:
            this.removelastSelection(e);
            break;
          case 46:
            this.removeSelectedChip(e);
            break;
        }
      } else if (e.keyCode === 8 && this.mode === "Delimiter") {
        if (this.value && this.value.length) {
          e.preventDefault();
          var temp = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[this.value.length - 1]) : this.value[this.value.length - 1];
          this.removeValue(this.value[this.value.length - 1], e);
          this.updateDelimeter(this.delimiterChar, e);
          this.focusAtLastListItem(temp);
        }
      }
    };
    MultiSelect2.prototype.selectByKey = function(e) {
      this.removeChipSelection();
      this.selectListByKey(e);
      if (this.hideSelectedItem) {
        this.focusAtFirstListItem();
      }
    };
    MultiSelect2.prototype.escapeAction = function() {
      var temp = this.tempValues ? this.tempValues.slice() : [];
      if (this.allowObjectBinding) {
        temp = this.tempValues ? this.tempValues.slice() : [];
      }
      if (this.value && this.validateValues(this.value, temp)) {
        if (this.mode !== "CheckBox") {
          this.value = temp;
          this.initialValueUpdate();
        }
        if (this.mode !== "Delimiter" && this.mode !== "CheckBox") {
          this.chipCollectionWrapper.style.display = "";
        } else {
          this.showDelimWrapper();
        }
        this.refreshPlaceHolder();
        if (this.value.length) {
          this.showOverAllClear();
        } else {
          this.hideOverAllClear();
        }
      }
      this.makeTextBoxEmpty();
    };
    MultiSelect2.prototype.scrollBottom = function(selectedLI, activeIndex, isInitialSelection, keyCode) {
      if (isInitialSelection === void 0) {
        isInitialSelection = false;
      }
      if (keyCode === void 0) {
        keyCode = null;
      }
      if (!isNullOrUndefined(selectedLI) && selectedLI.classList.contains("e-virtual-list") || this.enableVirtualization && isNullOrUndefined(selectedLI)) {
        selectedLI = this.liCollections[this.skeletonCount];
      }
      this.isUpwardScrolling = false;
      var virtualListCount = this.list.querySelectorAll(".e-virtual-list").length;
      var lastElementValue = this.list.querySelector("li:last-of-type") ? this.list.querySelector("li:last-of-type").getAttribute("data-value") : null;
      var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? selectedLI.offsetTop + this.virtualListInfo.startIndex * selectedLI.offsetHeight : selectedLI.offsetTop;
      var currentOffset = this.list.offsetHeight;
      var nextBottom = selectedLiOffsetTop - virtualListCount * selectedLI.offsetHeight + selectedLI.offsetHeight - this.list.scrollTop;
      var nextOffset = this.list.scrollTop + nextBottom - currentOffset;
      var isScrollerCHanged = false;
      var isScrollTopChanged = false;
      var boxRange = selectedLiOffsetTop - virtualListCount * selectedLI.offsetHeight + selectedLI.offsetHeight - this.list.scrollTop;
      boxRange = this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ? boxRange - this.fixedHeaderElement.offsetHeight : boxRange;
      if (activeIndex === 0 && !this.enableVirtualization) {
        this.list.scrollTop = 0;
      } else if (nextBottom > currentOffset || !(boxRange > 0 && this.list.offsetHeight > boxRange)) {
        var currentElementValue = selectedLI ? selectedLI.getAttribute("data-value") : null;
        var liCount = keyCode == 34 ? this.getPageCount() - 1 : 1;
        if (!this.enableVirtualization || this.isKeyBoardAction || isInitialSelection) {
          if (this.isKeyBoardAction && this.enableVirtualization && lastElementValue && currentElementValue === lastElementValue && keyCode != 35 && !this.isVirtualScrolling) {
            this.isPreventKeyAction = true;
            this.list.scrollTop += selectedLI.offsetHeight * liCount;
            this.isPreventKeyAction = this.IsScrollerAtEnd() ? false : this.isPreventKeyAction;
            this.isKeyBoardAction = false;
            this.isPreventScrollAction = false;
          } else if (this.enableVirtualization && keyCode == 35) {
            this.isPreventKeyAction = false;
            this.isKeyBoardAction = false;
            this.isPreventScrollAction = false;
            this.list.scrollTop = this.list.scrollHeight;
          } else {
            if (keyCode == 34 && this.enableVirtualization && !this.isVirtualScrolling) {
              this.isPreventKeyAction = false;
              this.isKeyBoardAction = false;
              this.isPreventScrollAction = false;
            }
            this.list.scrollTop = nextOffset;
          }
        } else {
          this.list.scrollTop = this.virtualListInfo && this.virtualListInfo.startIndex ? this.virtualListInfo.startIndex * this.listItemHeight : 0;
        }
        isScrollerCHanged = this.isKeyBoardAction;
        isScrollTopChanged = true;
      }
      this.isKeyBoardAction = isScrollerCHanged;
    };
    MultiSelect2.prototype.scrollTop = function(selectedLI, activeIndex, keyCode) {
      if (keyCode === void 0) {
        keyCode = null;
      }
      var virtualListCount = this.list.querySelectorAll(".e-virtual-list").length;
      var selectedLiOffsetTop = this.virtualListInfo && this.virtualListInfo.startIndex ? selectedLI.offsetTop + this.virtualListInfo.startIndex * selectedLI.offsetHeight : selectedLI.offsetTop;
      var nextOffset = selectedLiOffsetTop - virtualListCount * selectedLI.offsetHeight - this.list.scrollTop;
      var firstElementValue = this.list.querySelector("li.e-list-item:not(.e-virtual-list)") ? this.list.querySelector("li.e-list-item:not(.e-virtual-list)").getAttribute("data-value") : null;
      nextOffset = this.fields.groupBy && !isUndefined(this.fixedHeaderElement) ? nextOffset - this.fixedHeaderElement.offsetHeight : nextOffset;
      var boxRange = selectedLiOffsetTop - virtualListCount * selectedLI.offsetHeight + selectedLI.offsetHeight - this.list.scrollTop;
      var isPageUpKeyAction = this.enableVirtualization && this.getModuleName() === "autocomplete" && nextOffset <= 0;
      if (activeIndex === 0 && !this.enableVirtualization) {
        this.list.scrollTop = 0;
      } else if (nextOffset < 0 || isPageUpKeyAction) {
        var currentElementValue = selectedLI ? selectedLI.getAttribute("data-value") : null;
        var liCount = keyCode == 33 ? this.getPageCount() - 2 : 1;
        if (this.enableVirtualization && this.isKeyBoardAction && firstElementValue && currentElementValue === firstElementValue && keyCode != 36 && !this.isVirtualScrolling) {
          this.isUpwardScrolling = true;
          this.isPreventKeyAction = true;
          this.isKeyBoardAction = false;
          this.list.scrollTop -= selectedLI.offsetHeight * liCount;
          this.isPreventKeyAction = this.list.scrollTop != 0 ? this.isPreventKeyAction : false;
          this.isPreventScrollAction = false;
        } else if (this.enableVirtualization && keyCode == 36) {
          this.isPreventScrollAction = false;
          this.isPreventKeyAction = true;
          this.isKeyBoardAction = false;
          this.list.scrollTo(0, 0);
        } else {
          if (keyCode == 33 && this.enableVirtualization && !this.isVirtualScrolling) {
            this.isPreventKeyAction = false;
            this.isKeyBoardAction = false;
            this.isPreventScrollAction = false;
          }
          this.list.scrollTop = this.list.scrollTop + nextOffset;
        }
      } else if (!(boxRange > 0 && this.list.offsetHeight > boxRange)) {
        this.list.scrollTop = selectedLI.offsetTop - (this.fields.groupBy && !isNullOrUndefined(this.fixedHeaderElement) ? this.fixedHeaderElement.offsetHeight : 0);
      }
    };
    MultiSelect2.prototype.selectListByKey = function(e) {
      var li = this.list.querySelector("li." + dropDownBaseClasses.focus);
      var limit = this.value && this.value.length ? this.value.length : 0;
      var target;
      if (li !== null) {
        e.preventDefault();
        if (li.classList.contains("e-active")) {
          limit = limit - 1;
        }
        if (this.isValidLI(li) && limit < this.maximumSelectionLength) {
          this.updateListSelection(li, e);
          this.addListFocus(li);
          if (this.mode === "CheckBox") {
            this.updateDelimView();
            this.updateDelimeter(this.delimiterChar, e);
            this.refreshInputHight();
            this.checkPlaceholderSize();
            if (this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
              target = li.firstElementChild.lastElementChild;
              this.findGroupStart(target);
              this.deselectHeader();
            }
          } else {
            this.updateDelimeter(this.delimiterChar, e);
          }
          this.makeTextBoxEmpty();
          if (this.mode !== "CheckBox") {
            this.refreshListItems(li.textContent);
          }
          if (!this.changeOnBlur) {
            this.updateValueState(e, this.value, this.tempValues);
          }
          this.refreshPopup();
        } else {
          if (!this.isValidLI(li) && limit < this.maximumSelectionLength) {
            target = li.firstElementChild.lastElementChild;
            if (target.classList.contains("e-check")) {
              this.selectAllItem(false, e, li);
            } else {
              this.selectAllItem(true, e, li);
            }
          }
        }
        this.refreshSelection();
        if (this.closePopupOnSelect) {
          this.hidePopup(e);
        }
      }
      var selectAllParent = document.getElementsByClassName("e-selectall-parent")[0];
      if (selectAllParent && selectAllParent.classList.contains("e-item-focus")) {
        var selectAllCheckBox = selectAllParent.childNodes[0];
        if (!selectAllCheckBox.classList.contains("e-check")) {
          selectAllCheckBox.classList.add("e-check");
          var args = {
            module: "CheckBoxSelection",
            enable: this.mode === "CheckBox",
            value: "check",
            name: "checkSelectAll"
          };
          this.notify("checkSelectAll", args);
          this.selectAllItem(true, e, li);
        } else {
          selectAllCheckBox.classList.remove("e-check");
          var args = {
            module: "CheckBoxSelection",
            enable: this.mode === "CheckBox",
            value: "check",
            name: "checkSelectAll"
          };
          this.notify("checkSelectAll", args);
          this.selectAllItem(false, e, li);
        }
      }
      this.refreshPlaceHolder();
    };
    MultiSelect2.prototype.refreshListItems = function(data) {
      if ((this.allowFiltering || this.mode === "CheckBox" && this.enableSelectionOrder === true || this.allowCustomValue) && this.mainList && this.listData) {
        var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
        if (this.enableVirtualization) {
          if (this.allowCustomValue && this.virtualCustomData && data == null && this.virtualCustomData && this.viewPortInfo && this.viewPortInfo.startIndex === 0 && this.viewPortInfo.endIndex === this.itemCount) {
            this.virtualCustomData = null;
            this.renderItems(this.mainData, this.fields);
          } else {
            this.onActionComplete(this.list, this.listData);
          }
        } else {
          this.onActionComplete(list, this.mainData);
        }
        this.focusAtLastListItem(data);
        if (this.value && this.value.length) {
          this.refreshSelection();
        }
      } else if (!isNullOrUndefined(this.fields.groupBy) && this.value && this.value.length) {
        this.refreshSelection();
      }
    };
    MultiSelect2.prototype.removeSelectedChip = function(e) {
      var selectedElem = this.chipCollectionWrapper.querySelector("span." + CHIP_SELECTED);
      var temp;
      if (selectedElem !== null) {
        if (!isNullOrUndefined(this.value)) {
          this.tempValues = this.allowObjectBinding ? this.value.slice() : this.value.slice();
        }
        temp = selectedElem.nextElementSibling;
        if (temp !== null) {
          this.removeChipSelection();
          this.addChipSelection(temp, e);
        }
        var currentChip = this.allowObjectBinding ? this.getDataByValue(this.getFormattedValue(selectedElem.getAttribute("data-value"))) : selectedElem.getAttribute("data-value");
        this.removeValue(currentChip, e);
        this.makeTextBoxEmpty();
      }
      if (this.closePopupOnSelect) {
        this.hidePopup(e);
      }
      this.checkPlaceholderSize();
    };
    MultiSelect2.prototype.moveByTop = function(state) {
      var elements = this.list.querySelectorAll("li." + dropDownBaseClasses.li);
      var index;
      if (elements.length > 1) {
        this.removeFocus();
        index = state ? 0 : elements.length - 1;
        this.addListFocus(elements[index]);
        this.scrollBottom(elements[index], index);
      }
      this.updateAriaAttribute();
    };
    MultiSelect2.prototype.clickHandler = function(e) {
      var targetElement = e.target;
      var filterInputClassName = targetElement.className;
      var selectAllParent = document.getElementsByClassName("e-selectall-parent")[0];
      if ((filterInputClassName === "e-input-filter e-input" || filterInputClassName === "e-input-group e-control-wrapper e-input-focus") && selectAllParent.classList.contains("e-item-focus")) {
        selectAllParent.classList.remove("e-item-focus");
      }
    };
    MultiSelect2.prototype.moveByList = function(position, isVirtualKeyAction) {
      if (this.list) {
        var elements = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + "):not(.e-reorder-hide)");
        if (this.mode === "CheckBox" && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
          elements = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ",li." + dropDownBaseClasses.group + ":not(." + HIDE_LIST + "):not(.e-reorder-hide)");
        }
        var selectedElem = this.list.querySelector("li." + dropDownBaseClasses.focus);
        if (this.enableVirtualization && isVirtualKeyAction && !isNullOrUndefined(this.currentFocuedListElement)) {
          selectedElem = this.getElementByValue(this.getFormattedValue(this.currentFocuedListElement.getAttribute("data-value")));
        }
        var temp = -1;
        var selectAllParent = document.getElementsByClassName("e-selectall-parent")[0];
        if (this.mode === "CheckBox" && this.showSelectAll && position == 1 && !isNullOrUndefined(selectAllParent) && !selectAllParent.classList.contains("e-item-focus") && this.list.getElementsByClassName("e-item-focus").length == 0 && this.liCollections.length > 1) {
          if (!this.focusFirstListItem && selectAllParent.classList.contains("e-item-focus")) {
            selectAllParent.classList.remove("e-item-focus");
          } else if (!selectAllParent.classList.contains("e-item-focus")) {
            selectAllParent.classList.add("e-item-focus");
          }
        } else if (elements.length) {
          if (this.mode === "CheckBox" && this.showSelectAll && !isNullOrUndefined(selectAllParent && position == -1)) {
            if (!this.focusFirstListItem && selectAllParent.classList.contains("e-item-focus")) {
              selectAllParent.classList.remove("e-item-focus");
            } else if (this.focusFirstListItem && !selectAllParent.classList.contains("e-item-focus")) {
              selectAllParent.classList.add("e-item-focus");
            }
          }
          for (var index = 0; index < elements.length; index++) {
            if (elements[index] === selectedElem) {
              temp = index;
              break;
            }
          }
          if (position > 0) {
            if (temp < elements.length - 1) {
              this.removeFocus();
              if (this.enableVirtualization && isVirtualKeyAction) {
                this.addListFocus(elements[temp]);
              } else {
                if (this.enableVirtualization && elements[temp + 1].classList.contains("e-virtual-list")) {
                  this.addListFocus(elements[this.skeletonCount]);
                } else {
                  this.addListFocus(elements[++temp]);
                }
              }
              if (temp > -1) {
                this.updateCheck(elements[temp]);
                this.scrollBottom(elements[temp], temp);
                this.currentFocuedListElement = elements[temp];
              }
            }
          } else {
            if (temp > 0) {
              if (this.enableVirtualization) {
                var isVirtualElement = elements[temp - 1].classList.contains("e-virtual-list");
                var elementIndex = isVirtualKeyAction ? temp : temp - 1;
                if (isVirtualKeyAction || !isVirtualElement) {
                  this.removeFocus();
                }
                if (isVirtualKeyAction || !isVirtualElement) {
                  this.addListFocus(elements[elementIndex]);
                  this.updateCheck(elements[elementIndex]);
                  this.scrollTop(elements[elementIndex], temp);
                  this.currentFocuedListElement = elements[elementIndex];
                }
              } else {
                this.removeFocus();
                this.addListFocus(elements[--temp]);
                this.updateCheck(elements[temp]);
                this.scrollTop(elements[temp], temp);
              }
            }
          }
        }
      }
      var focusedLi = this.list ? this.list.querySelector(".e-item-focus") : null;
      if (this.isDisabledElement(focusedLi)) {
        if (this.list.querySelectorAll(".e-list-item:not(.e-hide-listitem):not(.e-disabled)").length === 0 || this.keyCode === 38 && this.mode === "CheckBox" && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy) && focusedLi === this.list.querySelector("li.e-list-group-item")) {
          this.removeFocus();
          return;
        }
        var index = this.getIndexByValue(focusedLi.getAttribute("data-value"));
        if (index === 0 && this.mode !== "CheckBox") {
          position = 1;
        }
        if (index === this.list.querySelectorAll(".e-list-item:not(.e-hide-listitem)").length - 1) {
          position = -1;
        }
        this.moveByList(position);
      }
    };
    MultiSelect2.prototype.getElementByValue = function(value) {
      var item;
      var listItems = this.getItems();
      for (var _i = 0, listItems_1 = listItems; _i < listItems_1.length; _i++) {
        var liItem = listItems_1[_i];
        if (this.getFormattedValue(liItem.getAttribute("data-value")) === value) {
          item = liItem;
          break;
        }
      }
      return item;
    };
    MultiSelect2.prototype.updateCheck = function(element) {
      if (this.mode === "CheckBox" && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
        var checkElement = element.firstElementChild.lastElementChild;
        if (checkElement.classList.contains("e-check")) {
          element.classList.add("e-active");
        } else {
          element.classList.remove("e-active");
        }
      }
    };
    MultiSelect2.prototype.moveBy = function(position, e) {
      var temp;
      var elements = this.chipCollectionWrapper.querySelectorAll("span." + CHIP2);
      var selectedElem = this.chipCollectionWrapper.querySelector("span." + CHIP_SELECTED);
      if (selectedElem === null) {
        if (position < 0) {
          this.addChipSelection(elements[elements.length - 1], e);
        }
      } else {
        if (position < 0) {
          temp = selectedElem.previousElementSibling;
          if (temp !== null) {
            this.removeChipSelection();
            this.addChipSelection(temp, e);
          }
        } else {
          temp = selectedElem.nextElementSibling;
          this.removeChipSelection();
          if (temp !== null) {
            this.addChipSelection(temp, e);
          }
        }
      }
    };
    MultiSelect2.prototype.chipClick = function(e) {
      if (this.enabled) {
        var elem = closest(e.target, "." + CHIP2);
        this.removeChipSelection();
        this.addChipSelection(elem, e);
      }
    };
    MultiSelect2.prototype.removeChipSelection = function() {
      if (this.chipCollectionWrapper) {
        this.removeChipFocus();
      }
    };
    MultiSelect2.prototype.addChipSelection = function(element, e) {
      addClass([element], CHIP_SELECTED);
      this.trigger("chipSelection", e);
    };
    MultiSelect2.prototype.onChipRemove = function(e) {
      if (e.which === 3 || e.button === 2) {
        return;
      }
      if (this.enabled && !this.readonly) {
        var element = e.target.parentElement;
        var customVal = element.getAttribute("data-value");
        var value = this.allowObjectBinding ? this.getDataByValue(this.getFormattedValue(customVal)) : this.getFormattedValue(customVal);
        if (this.allowCustomValue && (customVal !== "false" && value === false || !isNullOrUndefined(value) && value.toString() === "NaN")) {
          value = customVal;
        }
        if (this.isPopupOpen() && this.mode !== "CheckBox") {
          this.hidePopup(e);
        }
        if (!this.inputFocus) {
          this.inputElement.focus();
        }
        this.removeValue(value, e);
        value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", value) : value;
        if (isNullOrUndefined(this.findListElement(this.list, "li", "data-value", value)) && this.mainList && this.listData) {
          var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
          this.onActionComplete(list, this.mainData);
        }
        this.updateDelimeter(this.delimiterChar, e);
        if (this.placeholder && this.floatLabelType === "Never") {
          this.makeTextBoxEmpty();
          this.checkPlaceholderSize();
        } else {
          this.inputElement.value = "";
        }
        e.preventDefault();
      }
    };
    MultiSelect2.prototype.makeTextBoxEmpty = function() {
      this.inputElement.value = "";
      this.refreshPlaceHolder();
    };
    MultiSelect2.prototype.refreshPlaceHolder = function() {
      if (this.placeholder && this.floatLabelType === "Never") {
        if (this.value && this.value.length || !isNullOrUndefined(this.text) && this.text !== "") {
          this.inputElement.placeholder = "";
        } else {
          this.inputElement.placeholder = encodePlaceholder(this.placeholder);
        }
      } else {
        this.setFloatLabelType();
      }
      this.expandTextbox();
    };
    MultiSelect2.prototype.removeAllItems = function(value, eve, isClearAll, element, mainElement) {
      var index = this.allowObjectBinding ? this.indexOfObjectInArray(value, this.value) : this.value.indexOf(value);
      var removeVal = this.value.slice(0);
      removeVal.splice(index, 1);
      this.setProperties({ value: [].concat([], removeVal) }, true);
      element.setAttribute("aria-selected", "false");
      var className = this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected;
      removeClass([element], className);
      this.notify("activeList", {
        module: "CheckBoxSelection",
        enable: this.mode === "CheckBox",
        li: element,
        e: this,
        index
      });
      this.invokeCheckboxSelection(element, eve, isClearAll);
      var currentValue = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", value) : value;
      this.updateMainList(true, currentValue, mainElement);
      this.updateChipStatus();
    };
    MultiSelect2.prototype.invokeCheckboxSelection = function(element, eve, isClearAll) {
      this.notify("updatelist", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", li: element, e: eve });
      this.updateAriaActiveDescendant();
      if (this.value && this.value.length !== this.mainData.length && (this.mode === "CheckBox" && this.showSelectAll && !(this.isSelectAll || isClearAll))) {
        this.notify("checkSelectAll", {
          module: "CheckBoxSelection",
          enable: this.mode === "CheckBox",
          value: "uncheck"
        });
      }
    };
    MultiSelect2.prototype.removeValue = function(value, eve, length, isClearAll) {
      var _this = this;
      var index = this.allowObjectBinding ? this.indexOfObjectInArray(value, this.value) : this.value.indexOf(this.getFormattedValue(value));
      if (index === -1 && this.allowCustomValue && !isNullOrUndefined(value)) {
        index = this.allowObjectBinding ? this.indexOfObjectInArray(value, this.value) : this.value.indexOf(value.toString());
      }
      var targetEle = eve && eve.target;
      isClearAll = isClearAll || targetEle && targetEle.classList.contains("e-close-hooker") ? true : null;
      var className = this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected;
      if (index !== -1) {
        var currentValue = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", value) : value;
        var element_1 = this.virtualSelectAll ? null : this.findListElement(this.list, "li", "data-value", currentValue);
        var val_1 = this.allowObjectBinding ? value : this.getDataByValue(value);
        var eventArgs = {
          e: eve,
          item: element_1,
          itemData: val_1,
          isInteracted: eve ? true : false,
          cancel: false
        };
        this.trigger("removing", eventArgs, function(eventArgs2) {
          if (eventArgs2.cancel) {
            _this.removeIndex++;
          } else {
            _this.virtualSelectAll = false;
            var removeVal = _this.value.slice(0);
            if (_this.enableVirtualization && isClearAll) {
              removeVal = [];
            }
            removeVal.splice(index, 1);
            if (_this.enableVirtualization && _this.mode === "CheckBox") {
              _this.selectedListData.splice(index, 1);
            }
            _this.setProperties({ value: [].concat([], removeVal) }, true);
            if (_this.enableVirtualization) {
              var currentText = index == 0 && _this.text.split(_this.delimiterChar) && _this.text.split(_this.delimiterChar).length == 1 ? _this.text.replace(_this.text.split(_this.delimiterChar)[index], "") : index == 0 ? _this.text.replace(_this.text.split(_this.delimiterChar)[index] + _this.delimiterChar, "") : _this.text.replace(_this.delimiterChar + _this.text.split(_this.delimiterChar)[index], "");
              _this.setProperties({ text: currentText.toString() }, true);
            }
            if (element_1 !== null) {
              var currentValue_1 = _this.allowObjectBinding ? getValue(_this.fields.value ? _this.fields.value : "", value) : value;
              var hideElement = _this.findListElement(_this.mainList, "li", "data-value", currentValue_1);
              element_1.setAttribute("aria-selected", "false");
              removeClass([element_1], className);
              if (hideElement) {
                hideElement.setAttribute("aria-selected", "false");
                removeClass([element_1, hideElement], className);
              }
              _this.notify("activeList", {
                module: "CheckBoxSelection",
                enable: _this.mode === "CheckBox",
                li: element_1,
                e: _this,
                index
              });
              _this.invokeCheckboxSelection(element_1, eve, isClearAll);
            }
            var currentValue_2 = _this.allowObjectBinding ? getValue(_this.fields.value ? _this.fields.value : "", value) : value;
            if (_this.hideSelectedItem && _this.fields.groupBy && element_1) {
              _this.hideGroupItem(currentValue_2);
            }
            if (_this.hideSelectedItem && _this.fixedHeaderElement && _this.fields.groupBy && _this.mode !== "CheckBox" && _this.isPopupOpen()) {
              _super.prototype.scrollStop.call(_this);
            }
            _this.updateMainList(true, currentValue_2);
            _this.removeChip(currentValue_2, isClearAll);
            _this.updateChipStatus();
            var limit = _this.value && _this.value.length ? _this.value.length : 0;
            if (limit < _this.maximumSelectionLength) {
              var collection = _this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(.e-active)");
              removeClass(collection, "e-disable");
            }
            _this.trigger("removed", eventArgs2);
            var targetEle_1 = eve && eve.currentTarget;
            var isSelectAll = targetEle_1 && targetEle_1.classList.contains("e-selectall-parent") ? true : null;
            if (!_this.changeOnBlur && !isClearAll && (eve && length && !isSelectAll && _this.isSelectAllTarget)) {
              _this.updateValueState(eve, _this.value, _this.tempValues);
            }
            if (length) {
              _this.selectAllEventData.push(val_1);
              _this.selectAllEventEle.push(element_1);
            }
            if (length === 1) {
              if (!_this.changeOnBlur) {
                _this.updateValueState(eve, _this.value, _this.tempValues);
              }
              var args = {
                event: eve,
                items: _this.selectAllEventEle,
                itemData: _this.selectAllEventData,
                isInteracted: eve ? true : false,
                isChecked: false
              };
              _this.trigger("selectedAll", args);
              _this.selectAllEventData = [];
              _this.selectAllEventEle = [];
            }
            if (isClearAll && (length === 1 || length === null)) {
              _this.clearAllCallback(eve, isClearAll);
            }
            if (_this.isPopupOpen() && element_1 && element_1.parentElement.classList.contains("e-reorder")) {
              if (_this.hideSelectedItem && _this.value && Array.isArray(_this.value) && _this.value.length > 0) {
                _this.totalItemsCount();
              }
              _this.notify("setCurrentViewDataAsync", {
                module: "VirtualScroll"
              });
            }
          }
        });
      }
    };
    MultiSelect2.prototype.updateMainList = function(state, value, mainElement) {
      if (this.allowFiltering || this.mode === "CheckBox") {
        var element2 = mainElement ? mainElement : this.findListElement(this.mainList, "li", "data-value", value);
        if (element2) {
          if (state) {
            element2.setAttribute("aria-selected", "false");
            removeClass([element2], this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected);
            if (this.mode === "CheckBox") {
              removeClass([element2.firstElementChild.lastElementChild], "e-check");
            }
          } else {
            element2.setAttribute("aria-selected", "true");
            addClass([element2], this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected);
            if (this.mode === "CheckBox") {
              addClass([element2.firstElementChild.lastElementChild], "e-check");
            }
          }
        }
      }
    };
    MultiSelect2.prototype.removeChip = function(value, isClearAll) {
      if (this.chipCollectionWrapper) {
        if (this.enableVirtualization && isClearAll) {
          var childElements = this.chipCollectionWrapper.querySelectorAll(".e-chips");
        } else {
          var element = this.findListElement(this.chipCollectionWrapper, "span", "data-value", value);
          if (element) {
            remove(element);
          }
        }
      }
    };
    MultiSelect2.prototype.setWidth = function(width) {
      if (!isNullOrUndefined(width)) {
        if (typeof width === "number") {
          this.overAllWrapper.style.width = formatUnit(width);
        } else if (typeof width === "string") {
          this.overAllWrapper.style.width = width.match(/px|%|em/) ? width : formatUnit(width);
        }
      }
    };
    MultiSelect2.prototype.updateChipStatus = function() {
      if (this.value && this.value.length) {
        if (!isNullOrUndefined(this.chipCollectionWrapper)) {
          this.chipCollectionWrapper.style.display = "";
        }
        if (this.mode === "Delimiter" || this.mode === "CheckBox") {
          this.showDelimWrapper();
        }
        this.showOverAllClear();
      } else {
        if (!isNullOrUndefined(this.chipCollectionWrapper)) {
          this.chipCollectionWrapper.style.display = "none";
        }
        if (!isNullOrUndefined(this.delimiterWrapper)) {
          this.delimiterWrapper.style.display = "none";
        }
        this.hideOverAllClear();
      }
    };
    MultiSelect2.prototype.indexOfObjectInArray = function(objectToFind, array) {
      var _loop_1 = function(i2) {
        var item = array[i2];
        if (Object.keys(objectToFind).every(function(key) {
          return item.hasOwnProperty(key) && item[key] === objectToFind[key];
        })) {
          return { value: i2 };
        }
      };
      for (var i = 0; i < array.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
          return state_1.value;
      }
      return -1;
    };
    MultiSelect2.prototype.addValue = function(value, text, eve) {
      if (!this.value) {
        this.value = [];
      }
      var currentValue = this.allowObjectBinding ? this.getDataByValue(value) : value;
      if (this.allowObjectBinding && !this.isObjectInArray(this.getDataByValue(value), this.value) || !this.allowObjectBinding && this.value.indexOf(currentValue) < 0) {
        this.setProperties({ value: [].concat([], this.value, [currentValue]) }, true);
        if (this.enableVirtualization && !this.isSelectAllLoop) {
          var data = this.viewWrapper.innerHTML;
          var temp = void 0;
          data += this.value.length === 1 ? "" : this.delimiterChar + " ";
          temp = this.getOverflowVal(this.value.length - 1);
          data += temp;
          temp = this.viewWrapper.innerHTML;
          this.updateWrapperText(this.viewWrapper, data);
        }
        if (this.enableVirtualization && this.mode === "CheckBox") {
          var temp = void 0;
          var currentText = [];
          var value_1 = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[this.value.length - 1]) : this.value[this.value.length - 1];
          temp = this.getTextByValue(value_1);
          var textValues = this.text != null && this.text != "" ? this.text + "," + temp : temp;
          currentText.push(textValues);
          this.setProperties({ text: currentText.toString() }, true);
        }
      }
      var element = this.findListElement(this.list, "li", "data-value", value);
      this.removeFocus();
      if (element) {
        this.addListFocus(element);
        this.addListSelection(element);
      }
      if (this.mode !== "Delimiter" && this.mode !== "CheckBox") {
        this.addChip(text, value, eve);
      }
      if (this.hideSelectedItem && this.fields.groupBy) {
        this.hideGroupItem(value);
      }
      this.updateChipStatus();
      this.checkMaxSelection();
    };
    MultiSelect2.prototype.checkMaxSelection = function() {
      var limit = this.value && this.value.length ? this.value.length : 0;
      if (limit === this.maximumSelectionLength) {
        var activeItems = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ".e-active");
        removeClass(activeItems, "e-disable");
        var inactiveItems = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(.e-active)");
        addClass(inactiveItems, "e-disable");
      }
      if (limit < this.maximumSelectionLength) {
        var collection = this.list.querySelectorAll("li." + dropDownBaseClasses.li);
        removeClass(collection, "e-disable");
      }
    };
    MultiSelect2.prototype.dispatchSelect = function(value, eve, element, isNotTrigger, length) {
      var _this = this;
      var list = this.listData;
      if (this.initStatus && !isNotTrigger) {
        value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", value) : value;
        var val_2 = this.getDataByValue(value);
        var eventArgs = {
          e: eve,
          item: element,
          itemData: val_2,
          isInteracted: eve ? true : false,
          cancel: false
        };
        this.trigger("select", eventArgs, function(eventArgs2) {
          if (!eventArgs2.cancel) {
            if (length) {
              _this.selectAllEventData.push(val_2);
              _this.selectAllEventEle.push(element);
            }
            if (length === 1) {
              var args = {
                event: eve,
                items: _this.selectAllEventEle,
                itemData: _this.selectAllEventData,
                isInteracted: eve ? true : false,
                isChecked: true
              };
              _this.trigger("selectedAll", args);
              _this.selectAllEventData = [];
            }
            if (_this.allowCustomValue && _this.isServerRendered && _this.listData !== list) {
              _this.listData = list;
            }
            value = _this.allowObjectBinding ? _this.getDataByValue(value) : value;
            if (_this.enableVirtualization) {
              if (isNullOrUndefined(_this.selectedListData)) {
                _this.selectedListData = [_this.getDataByValue(value)];
              } else {
                if (Array.isArray(_this.selectedListData)) {
                  _this.selectedListData.push(_this.getDataByValue(value));
                } else {
                  _this.selectedListData = [_this.selectedListData, _this.getDataByValue(value)];
                }
              }
            }
            if (_this.enableVirtualization && value || !_this.enableVirtualization) {
              _this.updateListSelectEventCallback(value, element, eve);
            }
            if (_this.hideSelectedItem && _this.fixedHeaderElement && _this.fields.groupBy && _this.mode !== "CheckBox") {
              _super.prototype.scrollStop.call(_this);
            }
          }
        });
      }
    };
    MultiSelect2.prototype.addChip = function(text, value, e) {
      if (this.chipCollectionWrapper) {
        this.getChip(text, value, e);
      }
    };
    MultiSelect2.prototype.removeChipFocus = function() {
      var elements = this.chipCollectionWrapper.querySelectorAll("span." + CHIP2 + "." + CHIP_SELECTED);
      removeClass(elements, CHIP_SELECTED);
      if (Browser.isDevice) {
        var closeElements = this.chipCollectionWrapper.querySelectorAll("span." + CHIP_CLOSE2.split(" ")[0]);
        for (var index = 0; index < closeElements.length; index++) {
          closeElements[index].style.display = "none";
        }
      }
    };
    MultiSelect2.prototype.onMobileChipInteraction = function(e) {
      var chipElem = closest(e.target, "." + CHIP2);
      var chipClose = chipElem.querySelector("span." + CHIP_CLOSE2.split(" ")[0]);
      if (this.enabled && !this.readonly) {
        if (!chipElem.classList.contains(CHIP_SELECTED)) {
          this.removeChipFocus();
          chipClose.style.display = "";
          chipElem.classList.add(CHIP_SELECTED);
        }
        this.refreshPopup();
        e.preventDefault();
      }
    };
    MultiSelect2.prototype.multiCompiler = function(multiselectTemplate) {
      var checkTemplate = false;
      if (typeof multiselectTemplate !== "function" && multiselectTemplate) {
        try {
          checkTemplate = selectAll(multiselectTemplate, document).length ? true : false;
        } catch (exception) {
          checkTemplate = false;
        }
      }
      return checkTemplate;
    };
    MultiSelect2.prototype.encodeHtmlEntities = function(input) {
      return input.replace(/[\u00A0-\u9999<>&]/g, function(match) {
        return "&#" + match.charCodeAt(0) + ";";
      });
    };
    MultiSelect2.prototype.getChip = function(data, value, e) {
      var _this = this;
      var itemData = { text: value, value };
      var chip = this.createElement("span", {
        className: CHIP2,
        attrs: { "data-value": value, "title": data }
      });
      var compiledString;
      var chipContent = this.createElement("span", { className: CHIP_CONTENT2 });
      var chipClose = this.createElement("span", { className: CHIP_CLOSE2 });
      if (this.mainData) {
        itemData = this.getDataByValue(value);
      }
      if (this.valueTemplate && !isNullOrUndefined(itemData)) {
        var valuecheck = this.multiCompiler(this.valueTemplate);
        if (typeof this.valueTemplate !== "function" && valuecheck) {
          compiledString = compile(select(this.valueTemplate, document).innerHTML.trim());
        } else {
          compiledString = compile(this.valueTemplate);
        }
        var valueCompTemp = compiledString(itemData, this, "valueTemplate", this.valueTemplateId, this.isStringTemplate, null, chipContent);
        if (valueCompTemp && valueCompTemp.length > 0) {
          append(valueCompTemp, chipContent);
        }
        this.renderReactTemplates();
      } else if (this.enableHtmlSanitizer) {
        chipContent.innerText = data;
      } else {
        chipContent.innerHTML = this.encodeHtmlEntities(data.toString());
      }
      chip.appendChild(chipContent);
      var eventArgs = {
        isInteracted: e ? true : false,
        itemData,
        e,
        setClass: function(classes) {
          addClass([chip], classes);
        },
        cancel: false
      };
      this.isPreventChange = this.isAngular && this.preventChange;
      this.trigger("tagging", eventArgs, function(eventArgs2) {
        if (!eventArgs2.cancel) {
          if (Browser.isDevice) {
            chip.classList.add(MOBILE_CHIP);
            append([chipClose], chip);
            chipClose.style.display = "none";
            EventHandler.add(chip, "click", _this.onMobileChipInteraction, _this);
          } else {
            EventHandler.add(chip, "mousedown", _this.chipClick, _this);
            if (_this.showClearButton) {
              chip.appendChild(chipClose);
            }
          }
          EventHandler.add(chipClose, "mousedown", _this.onChipRemove, _this);
          _this.chipCollectionWrapper.appendChild(chip);
          if (!_this.changeOnBlur && e) {
            _this.updateValueState(e, _this.value, _this.tempValues);
          }
        }
      });
    };
    MultiSelect2.prototype.calcPopupWidth = function() {
      var width = formatUnit(this.popupWidth);
      if (width.indexOf("%") > -1) {
        var inputWidth = this.componentWrapper.offsetWidth * parseFloat(width) / 100;
        width = inputWidth.toString() + "px";
      }
      return width;
    };
    MultiSelect2.prototype.mouseIn = function() {
      if (this.enabled && !this.readonly) {
        this.showOverAllClear();
      }
    };
    MultiSelect2.prototype.mouseOut = function() {
      if (!this.inputFocus) {
        this.overAllClear.style.display = "none";
      }
    };
    MultiSelect2.prototype.listOption = function(dataSource, fields) {
      var iconCss = isNullOrUndefined(fields.iconCss) ? false : true;
      var fieldProperty = isNullOrUndefined(fields.properties) ? fields : fields.properties;
      this.listCurrentOptions = fields.text !== null || fields.value !== null ? {
        fields: fieldProperty,
        showIcon: iconCss,
        ariaAttributes: { groupItemRole: "presentation" }
      } : { fields: { value: "text" } };
      extend(this.listCurrentOptions, this.listCurrentOptions, fields, true);
      if (this.mode === "CheckBox") {
        this.notify("listoption", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", dataSource, fieldProperty });
      }
      return this.listCurrentOptions;
    };
    MultiSelect2.prototype.renderPopup = function() {
      var _this = this;
      if (!this.list) {
        _super.prototype.render.call(this);
      }
      if (!this.popupObj) {
        if (!isNullOrUndefined(this.popupWrapper)) {
          document.body.appendChild(this.popupWrapper);
          var checkboxFilter = this.popupWrapper.querySelector("." + FILTERPARENT);
          if (this.mode === "CheckBox" && !this.allowFiltering && checkboxFilter && this.filterParent) {
            checkboxFilter.remove();
            this.filterParent = null;
          }
          var overAllHeight = parseInt(this.popupHeight, 10);
          this.popupWrapper.style.visibility = "hidden";
          if (this.headerTemplate) {
            this.setHeaderTemplate();
            overAllHeight -= this.header.offsetHeight;
          }
          append([this.list], this.popupWrapper);
          if (!this.list.classList.contains(dropDownBaseClasses.noData) && this.getItems()[1]) {
            this.listItemHeight = this.getItems()[1].offsetHeight;
          }
          if (this.enableVirtualization && !this.list.classList.contains(dropDownBaseClasses.noData)) {
            if (!this.list.querySelector(".e-virtual-ddl-content") && this.list.querySelector(".e-list-parent")) {
              this.list.appendChild(this.createElement("div", {
                className: "e-virtual-ddl-content",
                styles: this.getTransformValues()
              })).appendChild(this.list.querySelector(".e-list-parent"));
            } else if (this.list.querySelector(".e-virtual-ddl-content")) {
              this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
            }
            this.UpdateSkeleton();
            this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
            this.virtualItemCount = this.itemCount;
            if (this.mode !== "CheckBox") {
              this.totalItemsCount();
            }
            if (!this.list.querySelector(".e-virtual-ddl")) {
              var virualElement = this.createElement("div", {
                id: this.element.id + "_popup",
                className: "e-virtual-ddl",
                styles: this.GetVirtualTrackHeight()
              });
              this.popupWrapper.querySelector(".e-dropdownbase").appendChild(virualElement);
            } else {
              this.list.getElementsByClassName("e-virtual-ddl")[0].style = this.GetVirtualTrackHeight();
            }
          }
          if (this.footerTemplate) {
            this.setFooterTemplate();
            overAllHeight -= this.footer.offsetHeight;
          }
          if (this.mode === "CheckBox" && this.showSelectAll) {
            this.notify("selectAll", { module: "CheckBoxSelection", enable: this.mode === "CheckBox" });
            overAllHeight -= this.selectAllHeight;
          } else if (this.mode === "CheckBox" && !this.showSelectAll && (!this.headerTemplate && !this.footerTemplate)) {
            this.notify("selectAll", { module: "CheckBoxSelection", enable: this.mode === "CheckBox" });
            overAllHeight = parseInt(this.popupHeight, 10);
          } else if (this.mode === "CheckBox" && !this.showSelectAll) {
            this.notify("selectAll", { module: "CheckBoxSelection", enable: this.mode === "CheckBox" });
            overAllHeight = parseInt(this.popupHeight, 10);
            if (this.headerTemplate && this.header) {
              overAllHeight -= this.header.offsetHeight;
            }
            if (this.footerTemplate && this.footer) {
              overAllHeight -= this.footer.offsetHeight;
            }
          }
          if (this.mode === "CheckBox") {
            var args = {
              module: "CheckBoxSelection",
              enable: this.mode === "CheckBox",
              popupElement: this.popupWrapper
            };
            if (this.allowFiltering) {
              this.notify("searchBox", args);
              overAllHeight -= this.searchBoxHeight;
            }
            addClass([this.popupWrapper], "e-checkbox");
          }
          if (this.popupHeight !== "auto") {
            this.list.style.maxHeight = formatUnit(overAllHeight);
            this.popupWrapper.style.maxHeight = formatUnit(this.popupHeight);
          } else {
            this.list.style.maxHeight = formatUnit(this.popupHeight);
          }
          this.popupObj = new Popup(this.popupWrapper, {
            width: this.calcPopupWidth(),
            targetType: "relative",
            position: this.enableRtl ? { X: "right", Y: "bottom" } : { X: "left", Y: "bottom" },
            relateTo: this.overAllWrapper,
            collision: this.enableRtl ? { X: "fit", Y: "flip" } : { X: "flip", Y: "flip" },
            offsetY: 1,
            enableRtl: this.enableRtl,
            zIndex: this.zIndex,
            close: function() {
              if (_this.popupObj.element.parentElement) {
                _this.popupObj.unwireScrollEvents();
                var checkboxFilterInput = _this.popupWrapper.querySelector("." + FILTERINPUT);
                if (_this.mode === "CheckBox" && checkboxFilterInput && document.activeElement === checkboxFilterInput) {
                  checkboxFilterInput.blur();
                }
                detach(_this.popupObj.element);
              }
            },
            open: function() {
              _this.popupObj.resolveCollision();
              if (!_this.isFirstClick) {
                var ulElement = _this.list.querySelector("ul");
                if (ulElement) {
                  if (!(_this.mode !== "CheckBox" && (_this.allowFiltering || _this.allowCustomValue) && _this.targetElement().trim() !== "")) {
                    _this.mainList = ulElement.cloneNode ? ulElement.cloneNode(true) : ulElement;
                  }
                }
                _this.isFirstClick = true;
              }
              _this.popupObj.wireScrollEvents();
              if (!(_this.mode !== "CheckBox" && (_this.allowFiltering || _this.allowCustomValue) && _this.targetElement().trim() !== "") && !_this.enableVirtualization) {
                _this.loadTemplate();
                if (_this.enableVirtualization && _this.mode === "CheckBox") {
                  _this.UpdateSkeleton();
                }
              }
              _this.isPreventScrollAction = true;
              _this.setScrollPosition();
              if (!_this.list.classList.contains(dropDownBaseClasses.noData) && _this.getItems()[1] && _this.getItems()[1].offsetHeight !== 0) {
                _this.listItemHeight = _this.getItems()[1].offsetHeight;
                if (_this.list.getElementsByClassName("e-virtual-ddl-content")[0]) {
                  _this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = _this.getTransformValues();
                }
              }
              if (_this.allowFiltering) {
                _this.notify("inputFocus", {
                  module: "CheckBoxSelection",
                  enable: _this.mode === "CheckBox",
                  value: "focus"
                });
              }
              if (_this.enableVirtualization) {
                _this.notify("bindScrollEvent", {
                  module: "VirtualScroll",
                  component: _this.getModuleName(),
                  enable: _this.enableVirtualization
                });
                setTimeout(function() {
                  if (_this.value) {
                    _this.updateSelectionList();
                  } else if (_this.viewPortInfo && _this.viewPortInfo.offsets.top) {
                    _this.list.scrollTop = _this.viewPortInfo.offsets.top;
                  }
                }, 5);
              }
            },
            targetExitViewport: function() {
              if (!Browser.isDevice) {
                _this.hidePopup();
              }
            }
          });
          this.checkCollision(this.popupWrapper);
          this.popupContentElement = this.popupObj.element.querySelector(".e-content");
          if (this.mode === "CheckBox" && Browser.isDevice && this.allowFiltering) {
            this.notify("deviceSearchBox", { module: "CheckBoxSelection", enable: this.mode === "CheckBox" });
          }
          this.popupObj.close();
          this.popupWrapper.style.visibility = "";
        }
      }
    };
    MultiSelect2.prototype.checkCollision = function(popupEle) {
      if (!(this.mode === "CheckBox" && Browser.isDevice && this.allowFiltering)) {
        var collision = isCollide(popupEle);
        if (collision.length > 0) {
          popupEle.style.marginTop = -parseInt(getComputedStyle(popupEle).marginTop, 10) + "px";
        }
        this.popupObj.resolveCollision();
      }
    };
    MultiSelect2.prototype.setHeaderTemplate = function() {
      var compiledString;
      if (this.header) {
        this.header.remove();
      }
      this.header = this.createElement("div");
      addClass([this.header], HEADER2);
      var headercheck = this.multiCompiler(this.headerTemplate);
      if (typeof this.headerTemplate !== "function" && headercheck) {
        compiledString = compile(select(this.headerTemplate, document).innerHTML.trim());
      } else {
        compiledString = compile(this.headerTemplate);
      }
      var elements = compiledString({}, this, "headerTemplate", this.headerTemplateId, this.isStringTemplate, null, this.header);
      if (elements && elements.length > 0) {
        append(elements, this.header);
      }
      if (this.mode === "CheckBox" && this.showSelectAll) {
        prepend([this.header], this.popupWrapper);
      } else {
        append([this.header], this.popupWrapper);
      }
      EventHandler.add(this.header, "mousedown", this.onListMouseDown, this);
    };
    MultiSelect2.prototype.setFooterTemplate = function() {
      var compiledString;
      if (this.footer) {
        this.footer.remove();
      }
      this.footer = this.createElement("div");
      addClass([this.footer], FOOTER2);
      var footercheck = this.multiCompiler(this.footerTemplate);
      if (typeof this.footerTemplate !== "function" && footercheck) {
        compiledString = compile(select(this.footerTemplate, document).innerHTML.trim());
      } else {
        compiledString = compile(this.footerTemplate);
      }
      var elements = compiledString({}, this, "footerTemplate", this.footerTemplateId, this.isStringTemplate, null, this.footer);
      if (elements && elements.length > 0) {
        append(elements, this.footer);
      }
      append([this.footer], this.popupWrapper);
      EventHandler.add(this.footer, "mousedown", this.onListMouseDown, this);
    };
    MultiSelect2.prototype.updateInitialData = function() {
      var currentData = this.selectData;
      var ulElement = this.renderItems(currentData, this.fields);
      this.list.scrollTop = 0;
      this.virtualListInfo = {
        currentPageNumber: null,
        direction: null,
        sentinelInfo: {},
        offsets: {},
        startIndex: 0,
        endIndex: this.itemCount
      };
      this.previousStartIndex = 0;
      this.previousEndIndex = 0;
      if (this.dataSource instanceof DataManager) {
        if (this.remoteDataCount >= 0) {
          this.totalItemCount = this.dataCount = this.remoteDataCount;
        } else {
          this.resetList(this.dataSource);
        }
      } else {
        this.totalItemCount = this.dataCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
      }
      if (this.mode !== "CheckBox") {
        this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length : this.totalItemCount;
      }
      this.getSkeletonCount();
      this.UpdateSkeleton();
      if (this.list.getElementsByClassName("e-virtual-ddl")[0]) {
        this.list.getElementsByClassName("e-virtual-ddl")[0].style = this.GetVirtualTrackHeight();
      } else if (!this.list.querySelector(".e-virtual-ddl") && this.skeletonCount > 0) {
        var virualElement = this.createElement("div", {
          id: this.element.id + "_popup",
          className: "e-virtual-ddl",
          styles: this.GetVirtualTrackHeight()
        });
        this.popupWrapper.querySelector(".e-dropdownbase").appendChild(virualElement);
      }
      this.listData = currentData;
      this.liCollections = this.list.querySelectorAll(".e-list-item");
      if (this.list.getElementsByClassName("e-virtual-ddl-content")[0]) {
        this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
      }
    };
    MultiSelect2.prototype.clearAll = function(e) {
      if (this.enabled && !this.readonly) {
        var temp = void 0;
        if (this.value && this.value.length > 0) {
          if (this.allowFiltering) {
            this.refreshListItems(null);
            if (this.mode === "CheckBox" && this.targetInputElement) {
              this.targetInputElement.value = "";
            }
          }
          var liElement = this.list && this.list.querySelectorAll("li.e-list-item");
          if (liElement && liElement.length > 0) {
            this.selectAllItems(false, e);
          } else {
            this.removeIndex = 0;
            for (temp = this.value[this.removeIndex]; this.removeIndex < this.value.length; temp = this.value[this.removeIndex]) {
              this.removeValue(temp, e, null, true);
            }
          }
          this.selectedElementID = null;
          this.inputElement.removeAttribute("aria-activedescendant");
        } else {
          this.clearAllCallback(e);
        }
        this.checkAndResetCache();
        Input.createSpanElement(this.overAllWrapper, this.createElement);
        this.calculateWidth();
        if (!isNullOrUndefined(this.overAllWrapper) && !isNullOrUndefined(this.overAllWrapper.getElementsByClassName("e-ddl-icon")[0] && this.overAllWrapper.getElementsByClassName("e-float-text-content")[0] && this.floatLabelType !== "Never")) {
          this.overAllWrapper.getElementsByClassName("e-float-text-content")[0].classList.add("e-icon");
        }
        if (this.enableVirtualization) {
          this.updateInitialData();
          if (this.chipCollectionWrapper) {
            this.chipCollectionWrapper.innerHTML = "";
          }
          if (!this.isCustomDataUpdated) {
            this.notify("setGeneratedData", {
              module: "VirtualScroll"
            });
          }
        }
        if (this.enableVirtualization) {
          this.list.scrollTop = 0;
          this.virtualListInfo = null;
          this.previousStartIndex = 0;
          this.previousEndIndex = 0;
        }
      }
    };
    MultiSelect2.prototype.clearAllCallback = function(e, isClearAll) {
      var tempValues = this.value ? this.value.slice() : [];
      if (this.mainList && this.listData && (this.allowFiltering && this.mode !== "CheckBox" || this.allowCustomValue)) {
        var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
        this.onActionComplete(list, this.mainData);
      }
      this.focusAtFirstListItem();
      this.updateDelimeter(this.delimiterChar, e);
      if (this.mode !== "Box" && (!this.inputFocus || this.mode === "CheckBox")) {
        this.updateDelimView();
      }
      if (this.inputElement.value !== "") {
        this.makeTextBoxEmpty();
        this.search(null);
      }
      this.checkPlaceholderSize();
      if (this.isPopupOpen()) {
        this.refreshPopup();
      }
      if (!this.inputFocus) {
        if (this.changeOnBlur) {
          this.updateValueState(e, this.value, tempValues);
        }
        if (this.mode !== "CheckBox") {
          this.inputElement.focus();
        }
      }
      if (this.mode === "CheckBox") {
        this.refreshPlaceHolder();
        this.refreshInputHight();
        if (this.changeOnBlur && isClearAll && (isNullOrUndefined(this.value) || this.value.length === 0)) {
          this.updateValueState(e, this.value, this.tempValues);
        }
      }
      if (!this.changeOnBlur && isClearAll && (isNullOrUndefined(this.value) || this.value.length === 0)) {
        this.updateValueState(e, this.value, this.tempValues);
      }
      if (this.mode === "CheckBox" && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
        this.updateListItems(this.list.querySelectorAll("li.e-list-item"), this.mainList.querySelectorAll("li.e-list-item"));
      }
      e.preventDefault();
    };
    MultiSelect2.prototype.windowResize = function() {
      this.refreshPopup();
      if ((!this.inputFocus || this.mode === "CheckBox") && this.viewWrapper && this.viewWrapper.parentElement) {
        this.updateDelimView();
      }
    };
    MultiSelect2.prototype.resetValueHandler = function(e) {
      if (!isNullOrUndefined(this.inputElement)) {
        var formElement = closest(this.inputElement, "form");
        if (formElement && e.target === formElement) {
          var textVal = this.element.tagName === this.getNgDirective() ? null : this.element.getAttribute("data-initial-value");
          this.text = textVal;
        }
      }
    };
    MultiSelect2.prototype.wireEvent = function() {
      EventHandler.add(this.componentWrapper, "mousedown", this.wrapperClick, this);
      EventHandler.add(window, "resize", this.windowResize, this);
      EventHandler.add(this.inputElement, "focus", this.focusInHandler, this);
      EventHandler.add(this.inputElement, "keydown", this.onKeyDown, this);
      EventHandler.add(this.inputElement, "keyup", this.keyUp, this);
      if (this.mode !== "CheckBox") {
        EventHandler.add(this.inputElement, "input", this.onInput, this);
      }
      EventHandler.add(this.inputElement, "blur", this.onBlurHandler, this);
      EventHandler.add(this.componentWrapper, "mouseover", this.mouseIn, this);
      var formElement = closest(this.inputElement, "form");
      if (formElement) {
        EventHandler.add(formElement, "reset", this.resetValueHandler, this);
      }
      EventHandler.add(this.componentWrapper, "mouseout", this.mouseOut, this);
      EventHandler.add(this.overAllClear, "mousedown", this.clearAll, this);
      EventHandler.add(this.inputElement, "paste", this.pasteHandler, this);
    };
    MultiSelect2.prototype.onInput = function(e) {
      if (this.keyDownStatus) {
        this.isValidKey = true;
      } else {
        this.isValidKey = false;
      }
      this.keyDownStatus = false;
      if (Browser.isDevice && Browser.info.name === "mozilla") {
        this.search(e);
      }
    };
    MultiSelect2.prototype.pasteHandler = function(event2) {
      var _this = this;
      setTimeout(function() {
        _this.expandTextbox();
        _this.search(event2);
      });
    };
    MultiSelect2.prototype.search = function(e) {
      var _this = this;
      this.resetFilteredData = true;
      this.preventSetCurrentData = false;
      this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
      if (!isNullOrUndefined(e)) {
        this.keyCode = e.keyCode;
      }
      if (!this.isPopupOpen() && this.openOnClick) {
        this.showPopup(e);
      }
      this.openClick(e);
      if (this.checkTextLength() && !this.allowFiltering && !isNullOrUndefined(e) && e.keyCode !== 8) {
        this.focusAtFirstListItem();
      } else {
        var text = this.targetElement();
        if (this.allowFiltering) {
          if (this.allowCustomValue) {
            this.isRemoteSelection = true;
          }
          this.checkAndResetCache();
          this.isRequesting = false;
          var eventArgs_1 = {
            preventDefaultAction: false,
            text: this.targetElement(),
            updateData: function(dataSource, query2, fields) {
              if (eventArgs_1.cancel) {
                return;
              }
              _this.isFiltered = true;
              _this.customFilterQuery = query2;
              _this.remoteFilterAction = true;
              _this.dataUpdater(dataSource, query2, fields);
            },
            event: e,
            cancel: false
          };
          this.trigger("filtering", eventArgs_1, function(eventArgs) {
            if (!eventArgs.cancel) {
              if (!_this.isFiltered && !eventArgs.preventDefaultAction) {
                _this.filterAction = true;
                if (_this.dataSource instanceof DataManager && _this.allowCustomValue) {
                  _this.isCustomRendered = false;
                }
                _this.dataUpdater(_this.dataSource, null, _this.fields);
              }
            }
          });
        } else if (this.allowCustomValue) {
          var query = new Query();
          query = this.allowFiltering && text !== "" ? query.where(this.fields.text, "startswith", text, this.ignoreCase, this.ignoreAccent) : query;
          if (this.enableVirtualization) {
            this.dataUpdater(this.dataSource, query, this.fields);
          } else {
            this.dataUpdater(this.mainData, query, this.fields);
          }
          this.UpdateSkeleton();
        } else {
          var liCollections = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(.e-hide-listitem)");
          var type = this.typeOfData(this.listData).typeof;
          var activeElement = Search(this.targetElement(), liCollections, "StartsWith", this.ignoreCase);
          if (this.enableVirtualization && this.targetElement().trim() !== "" && !this.allowFiltering) {
            var updatingincrementalindex = false;
            if (this.viewPortInfo.endIndex >= this.incrementalEndIndex && this.incrementalEndIndex <= this.totalItemCount || this.incrementalEndIndex == 0) {
              updatingincrementalindex = true;
              this.incrementalStartIndex = 0;
              this.incrementalEndIndex = 100 > this.totalItemCount ? this.totalItemCount : 100;
              this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
              updatingincrementalindex = false;
            }
            if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
              this.updateIncrementalView(0, this.itemCount);
            }
            activeElement = Search(this.targetElement(), this.incrementalLiCollections, this.filterType, true, this.listData, this.fields, type);
            while (isNullOrUndefined(activeElement) && this.incrementalEndIndex < this.totalItemCount) {
              this.incrementalStartIndex = this.incrementalEndIndex;
              this.incrementalEndIndex = this.incrementalEndIndex + 100 > this.totalItemCount ? this.totalItemCount : this.incrementalEndIndex + 100;
              this.updateIncrementalInfo(this.incrementalStartIndex, this.incrementalEndIndex);
              updatingincrementalindex = true;
              if (this.viewPortInfo.startIndex !== 0 || updatingincrementalindex) {
                this.updateIncrementalView(0, this.itemCount);
              }
              activeElement = Search(this.targetElement(), this.incrementalLiCollections, this.filterType, true, this.listData, this.fields, type);
              if (!isNullOrUndefined(activeElement)) {
                break;
              }
              if (isNullOrUndefined(activeElement) && this.incrementalEndIndex >= this.totalItemCount) {
                this.incrementalStartIndex = 0;
                this.incrementalEndIndex = 100 > this.totalItemCount ? this.totalItemCount : 100;
                break;
              }
            }
            if (activeElement.index) {
              if (!(this.viewPortInfo.startIndex >= activeElement.index) || !(activeElement.index >= this.viewPortInfo.endIndex)) {
                var startIndex = activeElement.index - (this.itemCount / 2 - 2) > 0 ? activeElement.index - (this.itemCount / 2 - 2) : 0;
                var endIndex = startIndex + this.itemCount > this.totalItemCount ? this.totalItemCount : startIndex + this.itemCount;
                if (startIndex != this.viewPortInfo.startIndex) {
                  this.updateIncrementalView(startIndex, endIndex);
                }
              }
            }
            if (!isNullOrUndefined(activeElement.item)) {
              var index_1 = this.getIndexByValue(activeElement.item.getAttribute("data-value")) - this.skeletonCount;
              if (index_1 > this.itemCount / 2) {
                var startIndex = this.viewPortInfo.startIndex + (this.itemCount / 2 - 2) < this.totalItemCount ? this.viewPortInfo.startIndex + (this.itemCount / 2 - 2) : this.totalItemCount;
                var endIndex = this.viewPortInfo.startIndex + this.itemCount > this.totalItemCount ? this.totalItemCount : this.viewPortInfo.startIndex + this.itemCount;
                this.updateIncrementalView(startIndex, endIndex);
              }
              activeElement.item = this.getElementByValue(activeElement.item.getAttribute("data-value"));
            } else {
              this.updateIncrementalView(0, this.itemCount);
              this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
              this.list.scrollTop = 0;
            }
            if (activeElement && activeElement.item) {
              activeElement.item = this.getElementByValue(activeElement.item.getAttribute("data-value"));
            }
          }
          if (activeElement && activeElement.item) {
            this.addListFocus(activeElement.item);
            this.list.scrollTop = activeElement.item.offsetHeight * activeElement.index;
          } else if (this.targetElement() !== "") {
            this.removeFocus();
          } else {
            this.focusAtFirstListItem();
          }
        }
      }
      if (this.enableVirtualization && this.allowFiltering) {
        this.getFilteringSkeletonCount();
      }
    };
    MultiSelect2.prototype.preRender = function() {
      if (this.allowFiltering === null) {
        this.allowFiltering = this.mode === "CheckBox" ? true : false;
      }
      this.preventSetCurrentData = false;
      this.initializeData();
      this.updateDataAttribute(this.htmlAttributes);
      _super.prototype.preRender.call(this);
    };
    MultiSelect2.prototype.getLocaleName = function() {
      return "multi-select";
    };
    MultiSelect2.prototype.initializeData = function() {
      this.mainListCollection = [];
      this.beforePopupOpen = false;
      this.filterAction = false;
      this.remoteFilterAction = false;
      this.isFirstClick = false;
      this.mobFilter = true;
      this.isFiltered = false;
      this.focused = true;
      this.initial = true;
      this.backCommand = true;
      this.isCustomRendered = false;
      this.isRemoteSelection = false;
      this.isSelectAllTarget = true;
      this.viewPortInfo = {
        currentPageNumber: null,
        direction: null,
        sentinelInfo: {},
        offsets: {},
        startIndex: 0,
        endIndex: this.itemCount
      };
    };
    MultiSelect2.prototype.updateData = function(delimiterChar, e) {
      var data = "";
      var delim = this.mode === "Delimiter" || this.mode === "CheckBox";
      var text = [];
      var temp;
      var tempData = this.listData;
      if (!this.enableVirtualization) {
        this.listData = this.mainData;
      }
      if (!isNullOrUndefined(this.hiddenElement) && !this.enableVirtualization) {
        this.hiddenElement.innerHTML = "";
      }
      if (!isNullOrUndefined(this.value)) {
        var valueLength = this.value.length;
        var hiddenElementContent = "";
        for (var index = 0; index < valueLength; index++) {
          var valueItem = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[index]) : this.value[index];
          var listValue = this.findListElement(!isNullOrUndefined(this.mainList) ? this.mainList : this.ulElement, "li", "data-value", valueItem);
          if (this.enableVirtualization) {
            listValue = this.findListElement(!isNullOrUndefined(this.list) ? this.list : this.ulElement, "li", "data-value", valueItem);
          }
          if (isNullOrUndefined(listValue) && !this.allowCustomValue && !this.enableVirtualization && this.listData && this.listData.length > 0) {
            this.value.splice(index, 1);
            index -= 1;
            valueLength -= 1;
          } else {
            if (this.listData) {
              if (this.enableVirtualization) {
                if (delim) {
                  data = this.delimiterWrapper && this.delimiterWrapper.innerHTML == "" ? data : this.delimiterWrapper.innerHTML;
                }
                var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[this.value.length - 1]) : this.value[this.value.length - 1];
                temp = this.getTextByValue(value);
                var textValues = this.text != null && this.text != "" ? this.text + "," + temp : temp;
                data += temp + delimiterChar + " ";
                text.push(textValues);
                hiddenElementContent = this.hiddenElement.innerHTML;
                if (e && e.currentTarget && e.currentTarget.classList.contains("e-chips-close") || e && e.key === "Backspace") {
                  var item = e.target.parentElement.getAttribute("data-value");
                  if (e.key === "Backspace") {
                    var lastChild = this.hiddenElement.lastChild;
                    if (lastChild) {
                      this.hiddenElement.removeChild(lastChild);
                    }
                  } else {
                    this.hiddenElement.childNodes.forEach(function(option) {
                      if (option.value === item) {
                        option.parentNode.removeChild(option);
                      }
                    });
                  }
                  hiddenElementContent = this.hiddenElement.innerHTML;
                } else {
                  hiddenElementContent += '<option selected value="' + value + '">' + index + "</option>";
                }
                break;
              } else {
                temp = this.getTextByValue(valueItem);
              }
            } else {
              temp = valueItem;
            }
            data += temp + delimiterChar + " ";
            text.push(temp);
          }
          hiddenElementContent += '<option selected value="' + valueItem + '">' + index + "</option>";
        }
        if (!isNullOrUndefined(this.hiddenElement)) {
          this.hiddenElement.innerHTML = hiddenElementContent;
        }
      }
      var isChipRemove = e && e.target && e.target.classList.contains("e-chips-close");
      if (!this.enableVirtualization || this.enableVirtualization && this.mode !== "CheckBox" && !isChipRemove) {
        this.setProperties({ text: text.toString() }, true);
      }
      if (delim) {
        this.updateWrapperText(this.delimiterWrapper, data);
        this.delimiterWrapper.setAttribute("id", getUniqueID("delim_val"));
        this.inputElement.setAttribute("aria-describedby", this.delimiterWrapper.id);
      }
      var targetEle = e && e.target;
      var isClearAll = targetEle && targetEle.classList.contains("e-close-hooker") ? true : null;
      if (!this.changeOnBlur && (e && !isClearAll) || this.isSelectAll) {
        this.isSelectAll = false;
        this.updateValueState(e, this.value, this.tempValues);
      }
      this.listData = tempData;
      this.addValidInputClass();
    };
    MultiSelect2.prototype.initialTextUpdate = function() {
      if (!isNullOrUndefined(this.text)) {
        var textArr = this.text.split(this.delimiterChar);
        var textVal = [];
        for (var index = 0; textArr.length > index; index++) {
          var val = this.getValueByText(textArr[index]);
          if (!isNullOrUndefined(val)) {
            textVal.push(val);
          } else if (this.allowCustomValue) {
            textVal.push(textArr[index]);
          }
        }
        if (textVal && textVal.length) {
          var value = this.allowObjectBinding ? this.getDataByValue(textVal) : textVal;
          this.setProperties({ value }, true);
        }
      } else {
        this.setProperties({ value: null }, true);
      }
    };
    MultiSelect2.prototype.renderList = function(isEmptyData) {
      if (!isEmptyData && this.allowCustomValue && this.list && (this.list.textContent === this.noRecordsTemplate || this.list.querySelector(".e-ul") && this.list.querySelector(".e-ul").childElementCount === 0)) {
        isEmptyData = true;
      }
      _super.prototype.render.call(this, null, isEmptyData);
      this.totalItemCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
      this.unwireListEvents();
      this.wireListEvents();
    };
    MultiSelect2.prototype.initialValueUpdate = function(listItems, isInitialVirtualData) {
      if (this.list) {
        var text = void 0;
        var element = void 0;
        var value = void 0;
        if (this.chipCollectionWrapper) {
          this.chipCollectionWrapper.innerHTML = "";
        }
        this.removeListSelection();
        if (!isNullOrUndefined(this.value)) {
          for (var index = 0; !isNullOrUndefined(this.value[index]); index++) {
            value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[index]) : this.value[index];
            element = this.findListElement(this.hideSelectedItem ? this.ulElement : this.list, "li", "data-value", value);
            var isCustomData = false;
            if (this.enableVirtualization) {
              text = null;
              if (listItems != null && listItems.length > 0) {
                for (var i = 0; i < listItems.length; i++) {
                  if (getValue(this.fields.value ? this.fields.value : "value", listItems[i]) === value) {
                    text = getValue(this.fields.text, listItems[i]);
                    if (this.enableVirtualization) {
                      if (isNullOrUndefined(this.selectedListData)) {
                        this.selectedListData = [listItems[i]];
                      } else {
                        if (Array.isArray(this.selectedListData)) {
                          this.selectedListData.push(listItems[i]);
                        } else {
                          this.selectedListData = [this.selectedListData, listItems[i]];
                        }
                      }
                    }
                    break;
                  }
                }
              }
              if (isNullOrUndefined(text) && this.allowCustomValue && (!(this.dataSource instanceof DataManager) || this.dataSource instanceof DataManager && isInitialVirtualData)) {
                text = this.getTextByValue(value);
                isCustomData = true;
              }
            } else {
              text = this.getTextByValue(value);
            }
            if (element && element.getAttribute("aria-selected") !== "true" || element && (element.getAttribute("aria-selected") === "true" && this.hideSelectedItem) && (this.mode === "Box" || this.mode === "Default") || this.enableVirtualization && value != null && text != null && !isCustomData) {
              var currentText = [];
              var textValues = this.text != null && this.text != "" ? this.text + "," + text : text;
              currentText.push(textValues);
              this.setProperties({ text: currentText.toString() }, true);
              this.addChip(text, value);
              this.addListSelection(element);
            } else if (!this.enableVirtualization && value && this.allowCustomValue || this.enableVirtualization && value && this.allowCustomValue && (!(this.dataSource instanceof DataManager) || this.dataSource instanceof DataManager && isInitialVirtualData)) {
              var indexItem = this.listData.length;
              var newValue = {};
              setValue(this.fields.text, value, newValue);
              setValue(this.fields.value, value, newValue);
              var noDataEle = this.popupWrapper.querySelector("." + dropDownBaseClasses.noData);
              if (!this.enableVirtualization) {
                this.addItem(newValue, indexItem);
              }
              if (this.enableVirtualization) {
                if (this.virtualCustomSelectData && this.virtualCustomSelectData.length >= 0) {
                  this.virtualCustomSelectData.push(newValue);
                } else {
                  this.virtualCustomSelectData = [newValue];
                }
              }
              element = element ? element : this.findListElement(this.hideSelectedItem ? this.ulElement : this.list, "li", "data-value", value);
              if (this.popupWrapper.contains(noDataEle)) {
                this.list.setAttribute("style", noDataEle.getAttribute("style"));
                this.popupWrapper.replaceChild(this.list, noDataEle);
                this.wireListEvents();
              }
              var currentText = [];
              var textValues = this.text != null && this.text != "" ? this.text + "," + text : text;
              currentText.push(textValues);
              this.setProperties({ text: currentText.toString() }, true);
              this.addChip(text, value);
              this.addListSelection(element);
            }
          }
        }
        if (this.mode === "CheckBox") {
          this.updateDelimView();
          if (this.changeOnBlur) {
            this.updateValueState(null, this.value, this.tempValues);
          }
          this.updateDelimeter(this.delimiterChar);
          this.refreshInputHight();
        } else {
          this.updateDelimeter(this.delimiterChar);
        }
        if (this.mode === "CheckBox" && this.showSelectAll && (isNullOrUndefined(this.value) || !this.value.length)) {
          this.notify("checkSelectAll", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", value: "uncheck" });
        }
        if (this.mode === "Box" || this.mode === "Default" && this.inputFocus) {
          this.chipCollectionWrapper.style.display = "";
        } else if (this.mode === "Delimiter" || this.mode === "CheckBox") {
          this.showDelimWrapper();
        }
      }
    };
    MultiSelect2.prototype.updateActionCompleteData = function(li, item) {
      if (this.value && (!this.allowObjectBinding && this.value.indexOf(li.getAttribute("data-value")) > -1 || this.allowObjectBinding && this.isObjectInArray(this.getDataByValue(li.getAttribute("data-value")), this.value))) {
        this.mainList = this.ulElement;
        if (this.hideSelectedItem) {
          addClass([li], HIDE_LIST);
        }
      }
    };
    MultiSelect2.prototype.updateAddItemList = function(list, itemCount) {
      if (this.popupObj && this.popupObj.element && this.popupObj.element.querySelector("." + dropDownBaseClasses.noData) && list) {
        this.list = list;
        this.mainList = this.ulElement = list.querySelector("ul");
        remove(this.popupWrapper.querySelector(".e-content"));
        this.popupObj = null;
        this.renderPopup();
      } else if (this.allowCustomValue) {
        this.list = list;
        this.mainList = this.ulElement = list.querySelector("ul");
      }
    };
    MultiSelect2.prototype.updateDataList = function() {
      if (this.mainList && this.ulElement && !(this.isFiltered || this.filterAction || this.targetElement().trim())) {
        var isDynamicGroupItemUpdate = this.mainList.childElementCount < this.ulElement.childElementCount;
        var isReactTemplateUpdate = this.ulElement.childElementCount > 0 && this.ulElement.children[0].childElementCount > 0 && (this.mainList.children[0] && this.mainList.children[0].childElementCount < this.ulElement.children[0].childElementCount);
        var isAngularTemplateUpdate = this.itemTemplate && this.ulElement.childElementCount > 0 && !(this.ulElement.childElementCount < this.mainList.childElementCount) && (this.ulElement.children[0].childElementCount > 0 || this.fields.groupBy && this.ulElement.children[1] && this.ulElement.children[1].childElementCount > 0);
        if (isDynamicGroupItemUpdate || isReactTemplateUpdate || isAngularTemplateUpdate) {
          this.mainList = this.ulElement;
        }
      }
    };
    MultiSelect2.prototype.isValidLI = function(li) {
      return li && !li.classList.contains(dropDownBaseClasses.disabled) && !li.classList.contains(dropDownBaseClasses.group) && li.classList.contains(dropDownBaseClasses.li);
    };
    MultiSelect2.prototype.updateListSelection = function(li, e, length) {
      var customVal = li.getAttribute("data-value");
      var value = this.allowObjectBinding ? this.getDataByValue(this.getFormattedValue(customVal)) : this.getFormattedValue(customVal);
      if (this.allowCustomValue && (customVal !== "false" && value === false || !isNullOrUndefined(value) && value.toString() === "NaN")) {
        value = customVal;
      }
      this.removeHover();
      if (!this.value || (!this.allowObjectBinding && this.value.indexOf(value) === -1 || this.allowObjectBinding && this.indexOfObjectInArray(value, this.value) === -1)) {
        this.dispatchSelect(value, e, li, li.getAttribute("aria-selected") === "true", length);
      } else {
        this.removeValue(value, e, length);
      }
    };
    MultiSelect2.prototype.updateListSelectEventCallback = function(value, li, e) {
      var _this = this;
      value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", value) : value;
      var text = this.getTextByValue(value);
      if ((this.allowCustomValue || this.allowFiltering) && !this.findListElement(this.mainList, "li", "data-value", value) && (!this.enableVirtualization || this.enableVirtualization && this.virtualCustomData)) {
        var temp_1 = li ? li.cloneNode(true) : li;
        var fieldValue = this.fields.value ? this.fields.value : "value";
        if (this.allowCustomValue && this.mainData.length && typeof getValue(fieldValue, this.mainData[0]) === "number") {
          value = !isNaN(parseFloat(value.toString())) ? parseFloat(value.toString()) : value;
        }
        var data_1 = this.getDataByValue(value);
        var eventArgs = {
          newData: data_1,
          cancel: false
        };
        this.trigger("customValueSelection", eventArgs, function(eventArgs2) {
          if (!eventArgs2.cancel) {
            if (_this.enableVirtualization && _this.virtualCustomData) {
              if (_this.virtualCustomSelectData && _this.virtualCustomSelectData.length >= 0) {
                _this.virtualCustomSelectData.push(data_1);
              } else {
                _this.virtualCustomSelectData = [data_1];
              }
              _this.remoteCustomValue = false;
              _this.addValue(value, text, e);
            } else {
              append([temp_1], _this.mainList);
              _this.mainData.push(data_1);
              _this.remoteCustomValue = false;
              _this.addValue(value, text, e);
            }
          }
        });
      } else {
        this.remoteCustomValue = false;
        this.addValue(value, text, e);
      }
    };
    MultiSelect2.prototype.removeListSelection = function() {
      var className = this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected;
      var selectedItems = this.list.querySelectorAll("." + className);
      var temp = selectedItems.length;
      if (selectedItems && selectedItems.length) {
        removeClass(selectedItems, className);
        while (temp > 0) {
          selectedItems[temp - 1].setAttribute("aria-selected", "false");
          temp--;
        }
      }
      if (!isNullOrUndefined(this.mainList)) {
        var selectItems = this.mainList.querySelectorAll("." + className);
        var temp1 = selectItems.length;
        if (selectItems && selectItems.length) {
          removeClass(selectItems, className);
          while (temp1 > 0) {
            selectItems[temp1 - 1].setAttribute("aria-selected", "false");
            if (this.mode === "CheckBox") {
              if (selectedItems && selectedItems.length > temp1 - 1) {
                removeClass([selectedItems[temp1 - 1].firstElementChild.lastElementChild], "e-check");
              }
              removeClass([selectItems[temp1 - 1].firstElementChild.lastElementChild], "e-check");
            }
            temp1--;
          }
        }
      }
    };
    MultiSelect2.prototype.removeHover = function() {
      var hoveredItem = this.list.querySelectorAll("." + dropDownBaseClasses.hover);
      if (hoveredItem && hoveredItem.length) {
        removeClass(hoveredItem, dropDownBaseClasses.hover);
      }
    };
    MultiSelect2.prototype.removeFocus = function() {
      if (this.list && this.mainList) {
        var hoveredItem = this.list.querySelectorAll("." + dropDownBaseClasses.focus);
        var mainlist = this.mainList.querySelectorAll("." + dropDownBaseClasses.focus);
        if (hoveredItem && hoveredItem.length) {
          removeClass(hoveredItem, dropDownBaseClasses.focus);
          removeClass(mainlist, dropDownBaseClasses.focus);
        }
      }
    };
    MultiSelect2.prototype.addListHover = function(li) {
      if (this.enabled && this.isValidLI(li)) {
        this.removeHover();
        addClass([li], dropDownBaseClasses.hover);
      } else {
        if (li !== null && li.classList.contains("e-list-group-item") && this.enableGroupCheckBox && this.mode === "CheckBox" && !isNullOrUndefined(this.fields.groupBy)) {
          this.removeHover();
          addClass([li], dropDownBaseClasses.hover);
        }
      }
    };
    MultiSelect2.prototype.addListFocus = function(element) {
      if (this.enabled && (this.isValidLI(element) || this.fields.disabled && this.isDisabledElement(element))) {
        this.removeFocus();
        addClass([element], dropDownBaseClasses.focus);
        this.updateAriaActiveDescendant();
      } else {
        if (this.enableGroupCheckBox && this.mode === "CheckBox" && !isNullOrUndefined(this.fields.groupBy)) {
          addClass([element], dropDownBaseClasses.focus);
          this.updateAriaActiveDescendant();
        }
      }
    };
    MultiSelect2.prototype.addListSelection = function(element, mainElement) {
      var className = this.hideSelectedItem ? HIDE_LIST : dropDownBaseClasses.selected;
      if (this.isValidLI(element) && !element.classList.contains(dropDownBaseClasses.hover)) {
        addClass([element], className);
        this.updateMainList(false, element.getAttribute("data-value"), mainElement);
        element.setAttribute("aria-selected", "true");
        if (this.mode === "CheckBox" && element.classList.contains("e-active")) {
          var ariaCheck = element.getElementsByClassName("e-check").length;
          if (ariaCheck === 0) {
            this.notify("updatelist", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", li: element, e: this });
          }
        }
        this.notify("activeList", { module: "CheckBoxSelection", enable: this.mode === "CheckBox", li: element, e: this });
        if (this.chipCollectionWrapper) {
          this.removeChipSelection();
        }
        this.selectedElementID = element.id;
      }
    };
    MultiSelect2.prototype.updateDelimeter = function(delimChar, e) {
      this.updateData(delimChar, e);
    };
    MultiSelect2.prototype.onMouseClick = function(e) {
      var _this = this;
      this.keyCode = null;
      this.scrollFocusStatus = false;
      this.keyboardEvent = null;
      var target = e.target;
      var li = closest(target, "." + dropDownBaseClasses.li);
      if (this.enableVirtualization && li && li.classList.contains("e-virtual-list")) {
        return;
      }
      var headerLi = closest(target, "." + dropDownBaseClasses.group);
      if (headerLi && this.enableGroupCheckBox && this.mode === "CheckBox" && this.fields.groupBy) {
        target = target.classList.contains("e-list-group-item") ? target.firstElementChild.lastElementChild : e.target;
        if (target.classList.contains("e-check")) {
          this.selectAllItem(false, e);
          target.classList.remove("e-check");
          target.classList.remove("e-stop");
          closest(target, ".e-list-group-item").classList.remove("e-active");
          target.setAttribute("aria-selected", "false");
        } else {
          this.selectAllItem(true, e);
          target.classList.remove("e-stop");
          target.classList.add("e-check");
          closest(target, ".e-list-group-item").classList.add("e-active");
          target.setAttribute("aria-selected", "true");
        }
        this.refreshSelection();
        this.checkSelectAll();
      } else {
        if (this.isValidLI(li)) {
          var limit = this.value && this.value.length ? this.value.length : 0;
          if (li.classList.contains("e-active")) {
            limit = limit - 1;
          }
          if (limit < this.maximumSelectionLength) {
            this.updateListSelection(li, e);
            this.checkPlaceholderSize();
            this.addListFocus(li);
            if ((this.allowCustomValue || this.allowFiltering) && this.mainList && this.listData) {
              if (this.mode !== "CheckBox") {
                this.focusAtLastListItem(li.getAttribute("data-value"));
                this.refreshSelection();
              }
            } else {
              this.makeTextBoxEmpty();
            }
          }
          if (this.mode === "CheckBox") {
            this.updateDelimView();
            if (this.value && this.value.length > 50) {
              setTimeout(function() {
                _this.updateDelimeter(_this.delimiterChar, e);
              }, 0);
            } else {
              this.updateDelimeter(this.delimiterChar, e);
            }
            this.refreshInputHight();
          } else {
            this.updateDelimeter(this.delimiterChar, e);
          }
          this.checkSelectAll();
          this.refreshPopup();
          if (this.hideSelectedItem) {
            this.focusAtFirstListItem();
          }
          if (this.closePopupOnSelect) {
            this.hidePopup(e);
          } else {
            e.preventDefault();
          }
          this.makeTextBoxEmpty();
          this.findGroupStart(target);
          if (this.mode !== "CheckBox") {
            this.refreshListItems(isNullOrUndefined(li) ? null : li.textContent);
          }
        } else {
          e.preventDefault();
        }
        if (this.enableVirtualization && this.hideSelectedItem) {
          var visibleListElements = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + "):not(.e-reorder-hide):not(.e-virtual-list)");
          if (visibleListElements.length) {
            var actualCount = this.virtualListHeight > 0 ? Math.floor(this.virtualListHeight / this.listItemHeight) : 0;
            if (visibleListElements.length < actualCount + 2) {
              var query = this.getForQuery(this.value).clone();
              query = query.skip(this.virtualItemStartIndex);
              this.resetList(this.dataSource, this.fields, query);
              this.UpdateSkeleton();
              this.liCollections = this.list.querySelectorAll("." + dropDownBaseClasses.li);
              this.virtualItemCount = this.itemCount;
              if (this.mode !== "CheckBox") {
                this.totalItemCount = this.value && this.value.length ? this.totalItemCount - this.value.length : this.totalItemCount;
              }
              if (!this.list.querySelector(".e-virtual-ddl")) {
                var virualElement = this.createElement("div", {
                  id: this.element.id + "_popup",
                  className: "e-virtual-ddl",
                  styles: this.GetVirtualTrackHeight()
                });
                this.popupWrapper.querySelector(".e-dropdownbase").appendChild(virualElement);
              } else {
                this.list.getElementsByClassName("e-virtual-ddl")[0].style = this.GetVirtualTrackHeight();
              }
              if (this.list.querySelector(".e-virtual-ddl-content")) {
                this.list.getElementsByClassName("e-virtual-ddl-content")[0].style = this.getTransformValues();
              }
            }
          }
        }
        this.refreshPlaceHolder();
        this.deselectHeader();
      }
    };
    MultiSelect2.prototype.findGroupStart = function(target) {
      if (this.enableGroupCheckBox && this.mode === "CheckBox" && !isNullOrUndefined(this.fields.groupBy)) {
        var count = 0;
        var liChecked = 0;
        var liUnchecked = 0;
        var groupValues = void 0;
        if (this.itemTemplate && !target.getElementsByClassName("e-frame").length) {
          while (!target.getElementsByClassName("e-frame").length) {
            target = target.parentElement;
          }
        }
        if (target.classList.contains("e-frame")) {
          target = target.parentElement.parentElement;
        }
        groupValues = this.findGroupAttrtibutes(target, liChecked, liUnchecked, count, 0);
        groupValues = this.findGroupAttrtibutes(target, groupValues[0], groupValues[1], groupValues[2], 1);
        while (!target.classList.contains("e-list-group-item")) {
          if (target.classList.contains("e-list-icon")) {
            target = target.parentElement;
          }
          target = target.previousElementSibling;
          if (target == null) {
            break;
          }
        }
        this.updateCheckBox(target, groupValues[0], groupValues[1], groupValues[2]);
      }
    };
    MultiSelect2.prototype.findGroupAttrtibutes = function(listElement, checked, unChecked, count, position) {
      while (!listElement.classList.contains("e-list-group-item")) {
        if (!(this.fields.disabled && this.isDisabledElement(listElement))) {
          if (listElement.classList.contains("e-list-icon")) {
            listElement = listElement.parentElement;
          }
          if (listElement.getElementsByClassName("e-frame")[0].classList.contains("e-check") && listElement.classList.contains("e-list-item")) {
            checked++;
          } else if (listElement.classList.contains("e-list-item")) {
            unChecked++;
          }
          count++;
        }
        listElement = position ? listElement.nextElementSibling : listElement.previousElementSibling;
        if (listElement == null) {
          break;
        }
      }
      return [checked, unChecked, count];
    };
    MultiSelect2.prototype.updateCheckBox = function(groupHeader, checked, unChecked, count) {
      if (groupHeader === null || !isNullOrUndefined(this.fields.disabled) && count === 0) {
        return;
      }
      var checkBoxElement = groupHeader.getElementsByClassName("e-frame")[0];
      if (count === checked) {
        checkBoxElement.classList.remove("e-stop");
        checkBoxElement.classList.add("e-check");
        closest(checkBoxElement, ".e-list-group-item").classList.add("e-active");
        groupHeader.setAttribute("aria-selected", "true");
      } else if (count === unChecked) {
        checkBoxElement.classList.remove("e-check");
        checkBoxElement.classList.remove("e-stop");
        closest(checkBoxElement, ".e-list-group-item").classList.remove("e-active");
        groupHeader.setAttribute("aria-selected", "false");
      } else if (this.maximumSelectionLength === checked - 1) {
        checkBoxElement.classList.remove("e-stop");
        groupHeader.setAttribute("aria-selected", "true");
        closest(checkBoxElement, ".e-list-group-item").classList.add("e-active");
        checkBoxElement.classList.add("e-check");
      } else {
        checkBoxElement.classList.remove("e-check");
        checkBoxElement.classList.add("e-stop");
        closest(checkBoxElement, ".e-list-group-item").classList.add("e-active");
        groupHeader.setAttribute("aria-selected", "false");
      }
    };
    MultiSelect2.prototype.disableGroupHeader = function() {
      var collection = this.list.querySelectorAll("li.e-list-group-item");
      if (collection) {
        for (var index = 0; index < collection.length; index++) {
          var isDisabled = true;
          var target = collection[index].nextElementSibling;
          while (!target.classList.contains("e-list-group-item")) {
            if (!this.isDisabledElement(target)) {
              isDisabled = false;
              break;
            }
            target = target.nextElementSibling;
            if (target == null) {
              break;
            }
          }
          if (isDisabled) {
            this.disableListItem(collection[index]);
          }
        }
      }
    };
    MultiSelect2.prototype.deselectHeader = function() {
      var limit = this.value && this.value.length ? this.value.length : 0;
      var collection = this.list.querySelectorAll("li.e-list-group-item:not(.e-active)");
      if (limit < this.maximumSelectionLength) {
        removeClass(collection, "e-disable");
      }
      if (limit === this.maximumSelectionLength) {
        addClass(collection, "e-disable");
      }
    };
    MultiSelect2.prototype.onMouseOver = function(e) {
      var currentLi = closest(e.target, "." + dropDownBaseClasses.li);
      if (currentLi === null && this.mode === "CheckBox" && !isNullOrUndefined(this.fields.groupBy) && this.enableGroupCheckBox) {
        currentLi = closest(e.target, "." + dropDownBaseClasses.group);
      }
      this.addListHover(currentLi);
    };
    MultiSelect2.prototype.onMouseLeave = function() {
      this.removeHover();
    };
    MultiSelect2.prototype.onListMouseDown = function(e) {
      e.preventDefault();
      this.scrollFocusStatus = true;
    };
    MultiSelect2.prototype.onDocumentClick = function(e) {
      if (this.mode !== "CheckBox") {
        var target = e.target;
        if (!(!isNullOrUndefined(this.popupObj) && closest(target, '[id="' + this.popupObj.element.id + '"]')) && !this.overAllWrapper.contains(e.target)) {
          this.scrollFocusStatus = false;
        } else {
          this.scrollFocusStatus = (Browser.isIE || Browser.info.name === "edge") && document.activeElement === this.inputElement;
        }
      }
    };
    MultiSelect2.prototype.wireListEvents = function() {
      if (!isNullOrUndefined(this.list)) {
        EventHandler.add(document, "mousedown", this.onDocumentClick, this);
        EventHandler.add(this.list, "mousedown", this.onListMouseDown, this);
        EventHandler.add(this.list, "mouseup", this.onMouseClick, this);
        EventHandler.add(this.list, "mouseover", this.onMouseOver, this);
        EventHandler.add(this.list, "mouseout", this.onMouseLeave, this);
      }
    };
    MultiSelect2.prototype.unwireListEvents = function() {
      EventHandler.remove(document, "mousedown", this.onDocumentClick);
      if (this.list) {
        EventHandler.remove(this.list, "mousedown", this.onListMouseDown);
        EventHandler.remove(this.list, "mouseup", this.onMouseClick);
        EventHandler.remove(this.list, "mouseover", this.onMouseOver);
        EventHandler.remove(this.list, "mouseout", this.onMouseLeave);
      }
    };
    MultiSelect2.prototype.hideOverAllClear = function() {
      if (!this.value || !this.value.length || this.inputElement.value === "") {
        this.overAllClear.style.display = "none";
      }
    };
    MultiSelect2.prototype.showOverAllClear = function() {
      if ((this.value && this.value.length || this.inputElement.value !== "") && this.showClearButton && this.readonly !== true) {
        this.overAllClear.style.display = "";
      } else {
        this.overAllClear.style.display = "none";
      }
    };
    MultiSelect2.prototype.focusIn = function() {
      if (document.activeElement !== this.inputElement && this.enabled) {
        this.inputElement.focus();
      }
    };
    MultiSelect2.prototype.focusOut = function() {
      if (document.activeElement === this.inputElement && this.enabled) {
        this.inputElement.blur();
      }
    };
    MultiSelect2.prototype.showSpinner = function() {
      if (isNullOrUndefined(this.spinnerElement)) {
        var filterClear = this.filterParent && this.filterParent.querySelector(".e-clear-icon.e-icons");
        if (this.overAllClear.style.display !== "none" || filterClear) {
          this.spinnerElement = filterClear ? filterClear : this.overAllClear;
        } else {
          this.spinnerElement = this.createElement("span", { className: CLOSEICON_CLASS2 + " " + SPINNER_CLASS2 });
          this.componentWrapper.appendChild(this.spinnerElement);
        }
        createSpinner({ target: this.spinnerElement, width: Browser.isDevice ? "16px" : "14px" }, this.createElement);
        addClass([this.spinnerElement], DISABLE_ICON);
        showSpinner(this.spinnerElement);
      }
    };
    MultiSelect2.prototype.hideSpinner = function() {
      if (!isNullOrUndefined(this.spinnerElement)) {
        hideSpinner(this.spinnerElement);
        removeClass([this.spinnerElement], DISABLE_ICON);
        if (this.spinnerElement.classList.contains(SPINNER_CLASS2)) {
          detach(this.spinnerElement);
        } else {
          this.spinnerElement.innerHTML = "";
        }
        this.spinnerElement = null;
      }
    };
    MultiSelect2.prototype.updateWrapperText = function(wrapperType, wrapperData) {
      if (this.valueTemplate || !this.enableHtmlSanitizer) {
        wrapperType.innerHTML = this.encodeHtmlEntities(wrapperData);
      } else {
        wrapperType.innerText = wrapperData;
      }
    };
    MultiSelect2.prototype.updateDelimView = function() {
      if (this.delimiterWrapper) {
        this.hideDelimWrapper();
      }
      if (this.chipCollectionWrapper) {
        this.chipCollectionWrapper.style.display = "none";
      }
      if (!isNullOrUndefined(this.viewWrapper)) {
        this.viewWrapper.style.display = "";
        this.viewWrapper.style.width = "";
        this.viewWrapper.classList.remove(TOTAL_COUNT_WRAPPER2);
      }
      if (this.value && this.value.length) {
        var data = "";
        var temp = void 0;
        var tempData = void 0;
        var tempIndex = 1;
        var wrapperleng = void 0;
        var remaining = void 0;
        var downIconWidth = 0;
        var overAllContainer = void 0;
        if (!this.enableVirtualization) {
          this.updateWrapperText(this.viewWrapper, data);
        }
        var l10nLocale = {
          noRecordsTemplate: "No records found",
          actionFailureTemplate: "Request failed",
          overflowCountTemplate: "+${count} more..",
          totalCountTemplate: "${count} selected"
        };
        var l10n = new L10n(this.getLocaleName(), l10nLocale, this.locale);
        if (l10n.getConstant("actionFailureTemplate") === "") {
          l10n = new L10n("dropdowns", l10nLocale, this.locale);
        }
        if (l10n.getConstant("noRecordsTemplate") === "") {
          l10n = new L10n("dropdowns", l10nLocale, this.locale);
        }
        var remainContent = l10n.getConstant("overflowCountTemplate");
        var totalContent = l10n.getConstant("totalCountTemplate");
        var raminElement = this.createElement("span", {
          className: REMAIN_WRAPPER2
        });
        var remainCompildTemp = remainContent.replace("${count}", this.value.length.toString());
        raminElement.innerText = remainCompildTemp;
        this.viewWrapper.appendChild(raminElement);
        this.renderReactTemplates();
        var remainSize = raminElement.offsetWidth;
        remove(raminElement);
        if (this.showDropDownIcon) {
          downIconWidth = this.dropIcon.offsetWidth + parseInt(window.getComputedStyle(this.dropIcon).marginRight, 10);
        }
        this.checkClearIconWidth();
        if (!isNullOrUndefined(this.value) && (this.allowCustomValue || this.listData && this.listData.length > 0)) {
          for (var index = 0; !isNullOrUndefined(this.value[index]); index++) {
            var items = this.text && this.text.split(this.delimiterChar);
            if (!this.enableVirtualization) {
              data += index === 0 ? "" : this.delimiterChar + " ";
              temp = this.getOverflowVal(index);
              data += temp;
              temp = this.viewWrapper.innerHTML;
              this.updateWrapperText(this.viewWrapper, data);
            } else if (items) {
              data += index === 0 ? "" : this.delimiterChar + " ";
              temp = items[index];
              data += temp;
              temp = this.viewWrapper.innerHTML;
              this.updateWrapperText(this.viewWrapper, data);
            }
            wrapperleng = this.viewWrapper.offsetWidth + parseInt(window.getComputedStyle(this.viewWrapper).paddingRight, 10);
            overAllContainer = this.componentWrapper.offsetWidth - parseInt(window.getComputedStyle(this.componentWrapper).paddingLeft, 10) - parseInt(window.getComputedStyle(this.componentWrapper).paddingRight, 10);
            if (wrapperleng + downIconWidth + this.clearIconWidth > overAllContainer) {
              if (tempData !== void 0 && tempData !== "") {
                temp = tempData;
                index = tempIndex + 1;
              }
              this.updateWrapperText(this.viewWrapper, temp);
              remaining = this.value.length - index;
              wrapperleng = this.viewWrapper.offsetWidth + parseInt(window.getComputedStyle(this.viewWrapper).paddingRight, 10);
              while (wrapperleng + remainSize + downIconWidth + this.clearIconWidth > overAllContainer && wrapperleng !== 0 && this.viewWrapper.innerHTML !== "") {
                var textArr = [];
                this.viewWrapper.innerHTML = textArr.join(this.delimiterChar);
                remaining = this.value.length;
                wrapperleng = this.viewWrapper.offsetWidth + parseInt(window.getComputedStyle(this.viewWrapper).paddingRight, 10);
              }
              break;
            } else if (wrapperleng + remainSize + downIconWidth + this.clearIconWidth <= overAllContainer) {
              tempData = data;
              tempIndex = index;
            } else if (index === 0) {
              tempData = "";
              tempIndex = -1;
            }
          }
        }
        if (remaining > 0) {
          var totalWidth = overAllContainer - downIconWidth - this.clearIconWidth;
          this.viewWrapper.appendChild(this.updateRemainTemplate(raminElement, this.viewWrapper, remaining, remainContent, totalContent, totalWidth));
          this.updateRemainWidth(this.viewWrapper, totalWidth);
          this.updateRemainingText(raminElement, downIconWidth, remaining, remainContent, totalContent);
        }
      } else {
        if (!isNullOrUndefined(this.viewWrapper)) {
          this.viewWrapper.innerHTML = "";
          this.viewWrapper.style.display = "none";
        }
      }
    };
    MultiSelect2.prototype.checkClearIconWidth = function() {
      if (this.showClearButton) {
        this.clearIconWidth = this.overAllClear.offsetWidth;
      }
    };
    MultiSelect2.prototype.updateRemainWidth = function(viewWrapper, totalWidth) {
      if (viewWrapper.classList.contains(TOTAL_COUNT_WRAPPER2) && totalWidth < viewWrapper.offsetWidth + parseInt(window.getComputedStyle(viewWrapper).paddingLeft, 10) + parseInt(window.getComputedStyle(viewWrapper).paddingLeft, 10)) {
        viewWrapper.style.width = totalWidth + "px";
      }
    };
    MultiSelect2.prototype.updateRemainTemplate = function(raminElement, viewWrapper, remaining, remainContent, totalContent, totalWidth) {
      if (viewWrapper.firstChild && viewWrapper.firstChild.nodeType === 3 && viewWrapper.firstChild.nodeValue === "") {
        viewWrapper.removeChild(viewWrapper.firstChild);
      }
      raminElement.innerHTML = "";
      var remainTemp = remainContent.replace("${count}", remaining.toString());
      var totalTemp = totalContent.replace("${count}", remaining.toString());
      raminElement.innerText = viewWrapper.firstChild && viewWrapper.firstChild.nodeType === 3 ? remainTemp : totalTemp;
      if (viewWrapper.firstChild && viewWrapper.firstChild.nodeType === 3) {
        viewWrapper.classList.remove(TOTAL_COUNT_WRAPPER2);
      } else {
        viewWrapper.classList.add(TOTAL_COUNT_WRAPPER2);
        this.updateRemainWidth(viewWrapper, totalWidth);
      }
      return raminElement;
    };
    MultiSelect2.prototype.updateRemainingText = function(raminElement, downIconWidth, remaining, remainContent, totalContent) {
      var overAllContainer = this.componentWrapper.offsetWidth - parseInt(window.getComputedStyle(this.componentWrapper).paddingLeft, 10) - parseInt(window.getComputedStyle(this.componentWrapper).paddingRight, 10);
      var wrapperleng = this.viewWrapper.offsetWidth + parseInt(window.getComputedStyle(this.viewWrapper).paddingRight, 10);
      if (wrapperleng + downIconWidth >= overAllContainer && wrapperleng !== 0 && this.viewWrapper.firstChild && this.viewWrapper.firstChild.nodeType === 3) {
        while (wrapperleng + downIconWidth > overAllContainer && wrapperleng !== 0 && this.viewWrapper.firstChild && this.viewWrapper.firstChild.nodeType === 3) {
          var textArr = this.viewWrapper.firstChild.nodeValue.split(this.delimiterChar);
          textArr.pop();
          this.viewWrapper.firstChild.nodeValue = textArr.join(this.delimiterChar);
          if (this.viewWrapper.firstChild.nodeValue === "") {
            this.viewWrapper.removeChild(this.viewWrapper.firstChild);
          }
          remaining++;
          wrapperleng = this.viewWrapper.offsetWidth;
        }
        var totalWidth = overAllContainer - downIconWidth;
        this.updateRemainTemplate(raminElement, this.viewWrapper, remaining, remainContent, totalContent, totalWidth);
      }
    };
    MultiSelect2.prototype.getOverflowVal = function(index) {
      var temp;
      if (this.mainData && this.mainData.length) {
        var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[index]) : this.value[index];
        if (this.mode === "CheckBox") {
          var newTemp = this.listData;
          this.listData = this.mainData;
          temp = this.getTextByValue(value);
          this.listData = newTemp;
        } else {
          temp = this.getTextByValue(value);
        }
      } else {
        temp = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[index]) : this.value[index];
      }
      return temp;
    };
    MultiSelect2.prototype.unWireEvent = function() {
      if (!isNullOrUndefined(this.componentWrapper)) {
        EventHandler.remove(this.componentWrapper, "mousedown", this.wrapperClick);
      }
      EventHandler.remove(window, "resize", this.windowResize);
      if (!isNullOrUndefined(this.inputElement)) {
        EventHandler.remove(this.inputElement, "focus", this.focusInHandler);
        EventHandler.remove(this.inputElement, "keydown", this.onKeyDown);
        if (this.mode !== "CheckBox") {
          EventHandler.remove(this.inputElement, "input", this.onInput);
        }
        EventHandler.remove(this.inputElement, "keyup", this.keyUp);
        var formElement = closest(this.inputElement, "form");
        if (formElement) {
          EventHandler.remove(formElement, "reset", this.resetValueHandler);
        }
        EventHandler.remove(this.inputElement, "blur", this.onBlurHandler);
      }
      if (!isNullOrUndefined(this.componentWrapper)) {
        EventHandler.remove(this.componentWrapper, "mouseover", this.mouseIn);
        EventHandler.remove(this.componentWrapper, "mouseout", this.mouseOut);
      }
      if (!isNullOrUndefined(this.overAllClear)) {
        EventHandler.remove(this.overAllClear, "mousedown", this.clearAll);
      }
      if (!isNullOrUndefined(this.inputElement)) {
        EventHandler.remove(this.inputElement, "paste", this.pasteHandler);
      }
    };
    MultiSelect2.prototype.selectAllItem = function(state, event2, list) {
      var li;
      if (!isNullOrUndefined(this.list)) {
        li = this.list.querySelectorAll(state ? 'li.e-list-item:not([aria-selected="true"]):not(.e-reorder-hide):not(.e-disabled):not(.e-virtual-list)' : 'li.e-list-item[aria-selected="true"]:not(.e-reorder-hide):not(.e-disabled):not(.e-virtual-list)');
      }
      if (this.value && this.value.length && event2 && event2.target && closest(event2.target, ".e-close-hooker") && this.allowFiltering) {
        li = this.mainList.querySelectorAll(state ? 'li.e-list-item:not([aria-selected="true"]):not(.e-reorder-hide):not(.e-disabled):not(.e-virtual-list)' : 'li.e-list-item[aria-selected="true"]:not(.e-reorder-hide):not(.e-disabled):not(.e-virtual-list)');
      }
      if (this.enableGroupCheckBox && this.mode === "CheckBox" && !isNullOrUndefined(this.fields.groupBy)) {
        var target = event2 ? this.groupTemplate ? closest(event2.target, ".e-list-group-item") : event2.target : null;
        target = event2 && event2.keyCode === 32 ? list : target;
        target = target && target.classList.contains("e-frame") ? target.parentElement.parentElement : target;
        if (target && target.classList.contains("e-list-group-item")) {
          var listElement = target.nextElementSibling;
          if (isNullOrUndefined(listElement)) {
            return;
          }
          while (listElement.classList.contains("e-list-item")) {
            if (!(this.fields.disabled && this.isDisabledElement(listElement))) {
              if (state) {
                if (!listElement.firstElementChild.lastElementChild.classList.contains("e-check")) {
                  var selectionLimit = this.value && this.value.length ? this.value.length : 0;
                  if (listElement.classList.contains("e-active")) {
                    selectionLimit -= 1;
                  }
                  if (selectionLimit < this.maximumSelectionLength) {
                    this.updateListSelection(listElement, event2);
                  }
                }
              } else {
                if (listElement.firstElementChild.lastElementChild.classList.contains("e-check")) {
                  this.updateListSelection(listElement, event2);
                }
              }
            }
            listElement = listElement.nextElementSibling;
            if (listElement == null) {
              break;
            }
          }
          if (target.classList.contains("e-list-group-item")) {
            var focusedElement = this.list.getElementsByClassName("e-item-focus")[0];
            if (focusedElement) {
              focusedElement.classList.remove("e-item-focus");
            }
            if (state) {
              target.classList.add("e-active");
            } else {
              target.classList.remove("e-active");
            }
            target.classList.add("e-item-focus");
            this.updateAriaActiveDescendant();
          }
          this.textboxValueUpdate();
          this.checkPlaceholderSize();
          if (!this.changeOnBlur && event2) {
            this.updateValueState(event2, this.value, this.tempValues);
          }
        } else {
          this.updateValue(event2, li, state);
        }
      } else {
        this.updateValue(event2, li, state);
      }
      this.addValidInputClass();
    };
    MultiSelect2.prototype.virtualSelectionAll = function(state, li, event2) {
      var _this = this;
      var index = 0;
      var length = li.length;
      var count = this.maximumSelectionLength;
      if (state) {
        length = this.virtualSelectAllData && this.virtualSelectAllData.length != 0 ? this.virtualSelectAllData.length : length;
        this.listData = this.virtualSelectAllData;
        var ulElement = this.createListItems(this.virtualSelectAllData.slice(0, 30), this.fields);
        var firstItems = ulElement.querySelectorAll("li");
        var fragment_1 = document.createDocumentFragment();
        firstItems.forEach(function(node) {
          fragment_1.appendChild(node.cloneNode(true));
        });
        li.forEach(function(node) {
          fragment_1.appendChild(node.cloneNode(true));
        });
        var concatenatedNodeList = fragment_1.childNodes;
        if (this.virtualSelectAllData instanceof Array) {
          while (index < length && index <= 50 && index < count) {
            this.isSelectAllTarget = length === index + 1;
            if (concatenatedNodeList[index]) {
              var value = this.allowObjectBinding ? this.getDataByValue(concatenatedNodeList[index].getAttribute("data-value")) : this.getFormattedValue(concatenatedNodeList[index].getAttribute("data-value"));
              if (!this.allowObjectBinding && this.value && this.value.indexOf(value) >= 0 || this.allowObjectBinding && this.indexOfObjectInArray(value, this.value) >= 0) {
                index++;
                continue;
              }
              this.updateListSelection(concatenatedNodeList[index], event2, length - index);
            } else {
              var value = getValue(this.fields.value ? this.fields.value : "", this.virtualSelectAllData[index]);
              value = this.allowObjectBinding ? this.getDataByValue(value) : value;
              if (!this.allowObjectBinding && this.value && this.value.indexOf(value) >= 0 || this.allowObjectBinding && this.indexOfObjectInArray(value, this.value) >= 0) {
                index++;
                continue;
              }
              if (this.value && value != null && Array.isArray(this.value) && (!this.allowObjectBinding && this.value.indexOf(value) < 0 || this.allowObjectBinding && !this.isObjectInArray(value, this.value))) {
                this.dispatchSelect(value, event2, null, false, length);
              }
            }
            index++;
          }
          if (length > 50) {
            setTimeout(function() {
              if (_this.virtualSelectAllData && _this.virtualSelectAllData.length > 0) {
                _this.virtualSelectAllData.map(function(obj) {
                  if (_this.value && obj[_this.fields.value] != null && Array.isArray(_this.value) && (!_this.allowObjectBinding && _this.value.indexOf(obj[_this.fields.value]) < 0 || _this.allowObjectBinding && !_this.isObjectInArray(obj[_this.fields.value], _this.value))) {
                    _this.dispatchSelect(obj[_this.fields.value], event2, null, false, length);
                  }
                });
              }
              _this.updatedataValueItems(event2);
              _this.isSelectAllLoop = false;
              if (!_this.changeOnBlur) {
                _this.updateValueState(event2, _this.value, _this.tempValues);
                _this.isSelectAll = _this.isSelectAll ? !_this.isSelectAll : _this.isSelectAll;
              }
              _this.updateHiddenElement();
              if (_this.popupWrapper && li[index - 1] && li[index - 1].classList.contains("e-item-focus")) {
                var selectAllParent = document.getElementsByClassName("e-selectall-parent")[0];
                if (selectAllParent && selectAllParent.classList.contains("e-item-focus")) {
                  li[index - 1].classList.remove("e-item-focus");
                }
              }
            }, 0);
          }
        }
      } else {
        if (this.virtualSelectAllData && this.virtualSelectAllData.length > 0) {
          this.virtualSelectAllData.map(function(obj) {
            _this.virtualSelectAll = true;
            _this.removeValue(_this.value[index], event2, _this.value.length - index);
          });
        }
        this.updatedataValueItems(event2);
        if (!this.changeOnBlur) {
          this.updateValueState(event2, this.value, this.tempValues);
          this.isSelectAll = this.isSelectAll ? !this.isSelectAll : this.isSelectAll;
        }
        this.updateHiddenElement();
        this.value = [];
        this.virtualSelectAll = false;
        if (!isNullOrUndefined(this.viewPortInfo.startIndex) && !isNullOrUndefined(this.viewPortInfo.endIndex)) {
          this.notify("setCurrentViewDataAsync", {
            component: this.getModuleName(),
            module: "VirtualScroll"
          });
        }
      }
      var virtualTrackElement = this.list.getElementsByClassName("e-virtual-ddl")[0];
      if (virtualTrackElement) {
        virtualTrackElement.style = this.GetVirtualTrackHeight();
      }
      this.UpdateSkeleton();
      var virtualContentElement = this.list.getElementsByClassName("e-virtual-ddl-content")[0];
      if (virtualContentElement) {
        virtualContentElement.style = this.getTransformValues();
      }
    };
    MultiSelect2.prototype.updateValue = function(event2, li, state) {
      var _this = this;
      var length = li.length;
      var beforeSelectArgs = {
        event: event2,
        items: state ? li : [],
        itemData: state ? this.listData : [],
        isInteracted: event2 ? true : false,
        isChecked: state,
        preventSelectEvent: false
      };
      this.trigger("beforeSelectAll", beforeSelectArgs);
      if (li && li.length || this.enableVirtualization && !state) {
        var index_2 = 0;
        var count_1 = 0;
        if (this.enableGroupCheckBox) {
          count_1 = state ? this.maximumSelectionLength - (this.value ? this.value.length : 0) : li.length;
        } else {
          count_1 = state ? this.maximumSelectionLength - (this.value ? this.value.length : 0) : this.maximumSelectionLength;
        }
        if (!beforeSelectArgs.preventSelectEvent) {
          if (this.enableVirtualization) {
            this.virtualSelectAll = true;
            this.virtualSelectAllState = state;
            this.CurrentEvent = event2;
            if (!this.virtualSelectAllData) {
              this.resetList(this.dataSource, this.fields, new Query());
            }
            if (this.virtualSelectAllData) {
              this.virtualSelectionAll(state, li, event2);
            }
          } else {
            while (index_2 < length && index_2 <= 50 && index_2 < count_1) {
              this.isSelectAllTarget = length === index_2 + 1;
              this.updateListSelection(li[index_2], event2, length - index_2);
              if (this.enableGroupCheckBox) {
                this.findGroupStart(li[index_2]);
              }
              index_2++;
            }
            if (length > 50) {
              setTimeout(function() {
                while (index_2 < length && index_2 < count_1) {
                  _this.isSelectAllTarget = length === index_2 + 1;
                  _this.updateListSelection(li[index_2], event2, length - index_2);
                  if (_this.enableGroupCheckBox) {
                    _this.findGroupStart(li[index_2]);
                  }
                  index_2++;
                }
                _this.updatedataValueItems(event2);
                if (!_this.changeOnBlur) {
                  _this.updateValueState(event2, _this.value, _this.tempValues);
                  _this.isSelectAll = _this.isSelectAll ? !_this.isSelectAll : _this.isSelectAll;
                }
                _this.updateHiddenElement();
                if (_this.popupWrapper && li[index_2 - 1].classList.contains("e-item-focus")) {
                  var selectAllParent = document.getElementsByClassName("e-selectall-parent")[0];
                  if (selectAllParent && selectAllParent.classList.contains("e-item-focus")) {
                    li[index_2 - 1].classList.remove("e-item-focus");
                  }
                }
              }, 0);
            }
          }
        } else {
          for (var i = 0; i < li.length && i < count_1; i++) {
            this.removeHover();
            var customVal = li[i].getAttribute("data-value");
            var value = this.getFormattedValue(customVal);
            value = this.allowObjectBinding ? this.getDataByValue(value) : value;
            var mainElement = this.mainList ? this.mainList.querySelectorAll(state ? 'li.e-list-item:not([aria-selected="true"]):not(.e-reorder-hide)' : 'li.e-list-item[aria-selected="true"]:not(.e-reorder-hide)')[i] : null;
            if (state) {
              this.value = !this.value ? [] : this.value;
              if (!this.allowObjectBinding && this.value.indexOf(value) < 0 || this.allowObjectBinding && !this.isObjectInArray(value, this.value)) {
                this.setProperties({ value: [].concat([], this.value, [value]) }, true);
              }
              this.removeFocus();
              this.addListSelection(li[i], mainElement);
              this.updateChipStatus();
              this.checkMaxSelection();
            } else {
              this.removeAllItems(value, event2, false, li[i], mainElement);
            }
            if (this.enableGroupCheckBox) {
              this.findGroupStart(li[i]);
            }
          }
          if (!state) {
            var limit = this.value && this.value.length ? this.value.length : 0;
            if (limit < this.maximumSelectionLength) {
              var collection = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(.e-active)");
              removeClass(collection, "e-disable");
            }
          }
          var args = {
            event: event2,
            items: state ? li : [],
            itemData: state ? this.listData : [],
            isInteracted: event2 ? true : false,
            isChecked: state
          };
          this.trigger("selectedAll", args);
        }
      }
      this.updatedataValueItems(event2);
      this.checkPlaceholderSize();
      if (length <= 50 && !beforeSelectArgs.preventSelectEvent) {
        if (!this.changeOnBlur) {
          this.updateValueState(event2, this.value, this.tempValues);
          this.isSelectAll = this.isSelectAll ? !this.isSelectAll : this.isSelectAll;
        }
        if (this.enableVirtualization && this.value && this.value.length > 0 || !this.enableVirtualization) {
          this.updateHiddenElement();
        }
      }
    };
    MultiSelect2.prototype.updateHiddenElement = function() {
      var _this = this;
      var hiddenValue = "";
      var wrapperText = "";
      var data = "";
      var text = [];
      if (this.mode === "CheckBox") {
        this.value.map(function(value, index) {
          hiddenValue += '<option selected value ="' + value + '">' + index + "</option>";
          if (_this.listData) {
            data = _this.getTextByValue(value);
          } else {
            data = value;
          }
          wrapperText += data + _this.delimiterChar + " ";
          text.push(data);
        });
        this.hiddenElement.innerHTML = hiddenValue;
        this.updateWrapperText(this.delimiterWrapper, wrapperText);
        this.delimiterWrapper.setAttribute("id", getUniqueID("delim_val"));
        this.inputElement.setAttribute("aria-describedby", this.delimiterWrapper.id);
        this.setProperties({ text: text.toString() }, true);
        this.refreshInputHight();
        this.refreshPlaceHolder();
      }
    };
    MultiSelect2.prototype.updatedataValueItems = function(event2) {
      this.deselectHeader();
      this.textboxValueUpdate(event2);
    };
    MultiSelect2.prototype.textboxValueUpdate = function(event2) {
      var isRemoveAll = event2 && event2.target && (closest(event2.target, ".e-selectall-parent") || closest(event2.target, ".e-close-hooker"));
      if (this.mode !== "Box" && !this.isPopupOpen() && !(this.mode === "CheckBox" && (this.isSelectAll || isRemoveAll))) {
        this.updateDelimView();
      } else {
        this.searchWrapper.classList.remove(ZERO_SIZE);
      }
      if (this.mode === "CheckBox") {
        this.updateDelimView();
        if (!(isRemoveAll || this.isSelectAll) && this.isSelectAllTarget || this.isSelectAll && this.isSelectAllTarget) {
          this.updateDelimeter(this.delimiterChar, event2);
        }
        this.refreshInputHight();
      } else {
        this.updateDelimeter(this.delimiterChar, event2);
      }
      this.refreshPlaceHolder();
    };
    MultiSelect2.prototype.setZIndex = function() {
      if (this.popupObj) {
        this.popupObj.setProperties({ "zIndex": this.zIndex });
      }
    };
    MultiSelect2.prototype.updateDataSource = function(prop) {
      if (isNullOrUndefined(this.list)) {
        this.renderPopup();
      } else {
        this.resetList(this.dataSource);
      }
      if (this.value && this.value.length) {
        this.setProperties({ "value": this.value });
        this.refreshSelection();
      }
    };
    MultiSelect2.prototype.onLoadSelect = function() {
      this.setDynValue = true;
      this.renderPopup();
    };
    MultiSelect2.prototype.selectAllItems = function(state, event2) {
      var _this = this;
      if (isNullOrUndefined(this.list)) {
        this.selectAllAction = function() {
          if (_this.mode === "CheckBox" && _this.showSelectAll) {
            var args2 = {
              module: "CheckBoxSelection",
              enable: _this.mode === "CheckBox",
              value: state ? "check" : "uncheck"
            };
            _this.notify("checkSelectAll", args2);
          }
          _this.selectAllItem(state, event2);
          _this.selectAllAction = null;
        };
        _super.prototype.render.call(this);
      } else {
        this.selectAllAction = null;
        if (this.mode === "CheckBox" && this.showSelectAll) {
          var args = {
            value: state ? "check" : "uncheck",
            enable: this.mode === "CheckBox",
            module: "CheckBoxSelection"
          };
          this.notify("checkSelectAll", args);
        }
        this.selectAllItem(state, event2);
      }
      if (!(this.dataSource instanceof DataManager) || this.dataSource instanceof DataManager && this.virtualSelectAllData) {
        this.virtualSelectAll = false;
      }
    };
    MultiSelect2.prototype.getPersistData = function() {
      return this.addOnPersist(["value"]);
    };
    MultiSelect2.prototype.onPropertyChanged = function(newProp, oldProp) {
      if (newProp.dataSource && !isNullOrUndefined(Object.keys(newProp.dataSource)) || newProp.query && !isNullOrUndefined(Object.keys(newProp.query))) {
        if (this.resetFilteredData) {
          this.resetMainList = !this.resetMainList ? this.mainList : this.resetMainList;
          this.resetFilteredData = false;
        }
        this.mainList = null;
        this.mainData = null;
        this.isFirstClick = false;
        this.isDynamicDataChange = true;
      }
      if (this.getModuleName() === "multiselect") {
        this.filterAction = false;
        this.setUpdateInitial(["fields", "query", "dataSource"], newProp);
      }
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "query":
          case "dataSource":
            if (this.mode === "CheckBox" && this.showSelectAll) {
              if (!isNullOrUndefined(this.popupObj)) {
                this.popupObj.destroy();
                this.popupObj = null;
              }
              this.renderPopup();
            }
            break;
          case "htmlAttributes":
            this.updateHTMLAttribute();
            break;
          case "showClearButton":
            this.updateClearButton(newProp.showClearButton);
            break;
          case "text":
            if (this.fields.disabled) {
              this.text = this.text && !this.isDisabledItemByIndex(this.getIndexByValue(this.getValueByText(this.text))) ? this.text : null;
            }
            this.updateVal(this.value, this.value, "text");
            break;
          case "value":
            if (this.fields.disabled) {
              this.removeDisabledItemsValue(this.value);
            }
            this.updateVal(this.value, oldProp.value, "value");
            this.addValidInputClass();
            if (!this.closePopupOnSelect && this.isPopupOpen()) {
              this.refreshPopup();
            }
            if (this.isPopupOpen() && this.mode === "CheckBox" && this.list && this.list.querySelector(".e-active.e-disable")) {
              var activeItems = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ".e-active.e-disable");
              removeClass(activeItems, "e-disable");
            }
            this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
            break;
          case "width":
            this.setWidth(newProp.width);
            this.popupObj.setProperties({ width: this.calcPopupWidth() });
            break;
          case "placeholder":
            this.refreshPlaceHolder();
            break;
          case "filterBarPlaceholder":
            if (this.allowFiltering) {
              this.notify("filterBarPlaceholder", { filterBarPlaceholder: newProp.filterBarPlaceholder });
            }
            break;
          case "delimiterChar":
            if (this.mode !== "Box") {
              this.updateDelimView();
            }
            this.updateData(newProp.delimiterChar);
            break;
          case "cssClass":
            this.updateOldPropCssClass(oldProp.cssClass);
            this.updateCssClass();
            this.calculateWidth();
            break;
          case "enableRtl":
            this.enableRTL(newProp.enableRtl);
            _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
            break;
          case "readonly":
            this.updateReadonly(newProp.readonly);
            this.hidePopup();
            break;
          case "enabled":
            this.hidePopup();
            this.enable(newProp.enabled);
            break;
          case "showSelectAll":
            if (this.popupObj) {
              this.popupObj.destroy();
              this.popupObj = null;
            }
            this.renderPopup();
            break;
          case "showDropDownIcon":
            this.dropDownIcon();
            break;
          case "floatLabelType":
            this.setFloatLabelType();
            this.addValidInputClass();
            Input.createSpanElement(this.overAllWrapper, this.createElement);
            this.calculateWidth();
            if (!isNullOrUndefined(this.overAllWrapper) && !isNullOrUndefined(this.overAllWrapper.getElementsByClassName("e-ddl-icon")[0] && this.overAllWrapper.getElementsByClassName("e-float-text-content")[0] && this.floatLabelType !== "Never")) {
              this.overAllWrapper.getElementsByClassName("e-float-text-content")[0].classList.add("e-icon");
            }
            break;
          case "enableSelectionOrder":
            break;
          case "selectAllText":
            this.notify("selectAllText", false);
            break;
          case "popupHeight":
            if (this.popupObj) {
              var overAllHeight = parseInt(this.popupHeight, 10);
              if (this.popupHeight !== "auto") {
                this.list.style.maxHeight = formatUnit(overAllHeight);
                this.popupWrapper.style.maxHeight = formatUnit(this.popupHeight);
              } else {
                this.list.style.maxHeight = formatUnit(this.popupHeight);
              }
            }
            break;
          case "headerTemplate":
          case "footerTemplate":
            this.reInitializePoup();
            break;
          case "allowFiltering":
            if (this.mode === "CheckBox" && this.popupObj) {
              this.reInitializePoup();
            }
            this.updateSelectElementData(this.allowFiltering);
            break;
          case "fields":
            if (isNullOrUndefined(this.fields.groupBy)) {
              this.removeScrollEvent();
            }
            break;
          default:
            {
              var msProps = this.getPropObject(prop, newProp, oldProp);
              _super.prototype.onPropertyChanged.call(this, msProps.newProperty, msProps.oldProperty);
            }
            break;
        }
      }
    };
    MultiSelect2.prototype.reInitializePoup = function() {
      if (this.popupObj) {
        this.popupObj.destroy();
        this.popupObj = null;
      }
      this.renderPopup();
    };
    MultiSelect2.prototype.totalItemsCount = function() {
      var dataSourceCount;
      if (this.dataSource instanceof DataManager) {
        if (this.remoteDataCount >= 0) {
          dataSourceCount = this.totalItemCount = this.dataCount = this.remoteDataCount;
        } else {
          this.resetList(this.dataSource);
        }
      } else {
        dataSourceCount = this.dataSource && this.dataSource.length ? this.dataSource.length : 0;
      }
      if (this.mode === "CheckBox") {
        this.totalItemCount = dataSourceCount != 0 ? dataSourceCount : this.totalItemCount;
      } else {
        if (this.hideSelectedItem) {
          this.totalItemCount = dataSourceCount != 0 && this.value ? dataSourceCount - this.value.length : this.totalItemCount;
          if (this.allowCustomValue && this.virtualCustomSelectData && this.virtualCustomSelectData.length > 0) {
            for (var i = 0; i < this.virtualCustomSelectData.length; i++) {
              for (var j = 0; j < this.value.length; j++) {
                var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[j]) : this.value[j];
                var customValue = getValue(this.fields.value ? this.fields.value : "", this.virtualCustomSelectData[i]);
                if (value === customValue) {
                  this.totalItemCount += 1;
                }
              }
            }
          }
        } else {
          this.totalItemCount = dataSourceCount != 0 ? dataSourceCount : this.totalItemCount;
          if (this.allowCustomValue && this.virtualCustomSelectData && this.virtualCustomSelectData.length > 0) {
            this.totalItemCount += this.virtualCustomSelectData.length;
          }
        }
      }
    };
    MultiSelect2.prototype.presentItemValue = function(ulElement) {
      var valuecheck = [];
      for (var i = 0; i < this.value.length; i++) {
        var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[i]) : this.value[i];
        var checkEle = this.findListElement(this.allowFiltering && !isNullOrUndefined(this.mainList) ? this.mainList : ulElement, "li", "data-value", value);
        if (!checkEle) {
          var checkvalue = this.allowObjectBinding ? this.getDataByValue(this.value[i]) : this.value[i];
          valuecheck.push(checkvalue);
        }
      }
      return valuecheck;
    };
    ;
    MultiSelect2.prototype.addNonPresentItems = function(valuecheck, ulElement, list, event2) {
      var _this = this;
      this.dataSource.executeQuery(this.getForQuery(valuecheck)).then(function(e) {
        if (e.result.length > 0) {
          _this.addItem(e.result, list.length);
        }
        _this.updateActionList(ulElement, list, event2);
      });
    };
    ;
    MultiSelect2.prototype.updateVal = function(newProp, oldProp, prop) {
      if (!this.list) {
        this.onLoadSelect();
      } else if (this.dataSource instanceof DataManager && (!this.listData || !(this.mainList && this.mainData))) {
        this.onLoadSelect();
      } else {
        var valuecheck = [];
        if (!isNullOrUndefined(this.value) && !this.allowCustomValue) {
          valuecheck = this.presentItemValue(this.ulElement);
        }
        if (prop == "value" && valuecheck.length > 0 && this.dataSource instanceof DataManager && !isNullOrUndefined(this.value) && this.listData != null && !this.enableVirtualization) {
          this.mainData = null;
          this.setDynValue = true;
          this.addNonPresentItems(valuecheck, this.ulElement, this.listData);
        } else {
          if (prop === "text") {
            this.initialTextUpdate();
            newProp = this.value;
          }
          if (isNullOrUndefined(this.value) || this.value.length === 0) {
            this.tempValues = oldProp;
          }
          if (this.allowCustomValue && (this.mode === "Default" || this.mode === "Box") && this.isReact && this.inputFocus && this.isPopupOpen() && this.mainData !== this.listData) {
            var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
            this.onActionComplete(list, this.mainData);
          }
          if (!this.enableVirtualization || this.enableVirtualization && !(this.dataSource instanceof DataManager)) {
            this.initialValueUpdate();
          }
          if (this.mode !== "Box" && !this.inputFocus) {
            this.updateDelimView();
          }
          if (!this.inputFocus) {
            this.refreshInputHight();
          }
          this.refreshPlaceHolder();
          if (this.mode !== "CheckBox" && this.changeOnBlur) {
            this.updateValueState(null, newProp, oldProp);
          }
          this.checkPlaceholderSize();
        }
      }
      if (!this.changeOnBlur) {
        this.updateValueState(null, newProp, oldProp);
      }
    };
    MultiSelect2.prototype.addItem = function(items, itemIndex) {
      _super.prototype.addItem.call(this, items, itemIndex);
    };
    MultiSelect2.prototype.hidePopup = function(e) {
      var _this = this;
      var delay = 100;
      if (this.isPopupOpen()) {
        var animModel = {
          name: "FadeOut",
          duration: 100,
          delay: delay ? delay : 0
        };
        this.customFilterQuery = null;
        var eventArgs = { popup: this.popupObj, cancel: false, animation: animModel, event: e || null };
        this.trigger("close", eventArgs, function(eventArgs2) {
          if (!eventArgs2.cancel) {
            if (_this.fields.groupBy && _this.mode !== "CheckBox" && _this.fixedHeaderElement) {
              remove(_this.fixedHeaderElement);
              _this.fixedHeaderElement = null;
            }
            _this.beforePopupOpen = false;
            _this.overAllWrapper.classList.remove(iconAnimation);
            var typedValue = _this.mode == "CheckBox" ? _this.targetElement() : null;
            _this.popupObj.hide(new Animation(eventArgs2.animation));
            attributes(_this.inputElement, { "aria-expanded": "false" });
            _this.inputElement.removeAttribute("aria-owns");
            _this.inputElement.removeAttribute("aria-activedescendant");
            if (_this.allowFiltering) {
              _this.notify("inputFocus", { module: "CheckBoxSelection", enable: _this.mode === "CheckBox", value: "clear" });
            }
            _this.popupObj.hide();
            removeClass([document.body, _this.popupObj.element], "e-popup-full-page");
            EventHandler.remove(_this.list, "keydown", _this.onKeyDown);
            if (_this.mode === "CheckBox" && _this.showSelectAll) {
              EventHandler.remove(_this.popupObj.element, "click", _this.clickHandler);
            }
            if (_this.enableVirtualization && _this.mode === "CheckBox" && _this.value && _this.value.length > 0 && _this.enableSelectionOrder) {
              _this.viewPortInfo.startIndex = _this.virtualItemStartIndex = 0;
              _this.viewPortInfo.endIndex = _this.virtualItemEndIndex = _this.viewPortInfo.startIndex > 0 ? _this.viewPortInfo.endIndex : _this.itemCount;
              _this.virtualListInfo = _this.viewPortInfo;
              _this.previousStartIndex = 0;
              _this.previousEndIndex = 0;
            }
            var dataSourceCount = void 0;
            if (_this.dataSource instanceof DataManager) {
              if (_this.remoteDataCount >= 0) {
                _this.totalItemCount = _this.dataCount = _this.remoteDataCount;
              } else {
                _this.resetList(_this.dataSource);
              }
            } else {
              dataSourceCount = _this.dataSource && _this.dataSource.length ? _this.dataSource.length : 0;
            }
            if (_this.enableVirtualization && (_this.allowFiltering || _this.allowCustomValue) && (_this.targetElement() || typedValue) && _this.totalItemCount !== dataSourceCount) {
              _this.updateInitialData();
              _this.checkAndResetCache();
            }
            if (_this.virtualCustomData && _this.viewPortInfo && _this.viewPortInfo.startIndex === 0 && _this.viewPortInfo.endIndex === _this.itemCount) {
              _this.renderItems(_this.mainData, _this.fields);
            }
            _this.virtualCustomData = null;
            _this.isVirtualTrackHeight = false;
          }
        });
      }
    };
    MultiSelect2.prototype.showPopup = function(e) {
      var _this = this;
      if (!this.enabled) {
        return;
      }
      this.firstItem = this.dataSource && this.dataSource.length > 0 ? this.dataSource[0] : null;
      var args = { cancel: false };
      this.trigger("beforeOpen", args, function(args2) {
        if (!args2.cancel) {
          if (!_this.ulElement) {
            _this.beforePopupOpen = true;
            if (_this.mode === "CheckBox" && Browser.isDevice && _this.allowFiltering) {
              _this.notify("popupFullScreen", { module: "CheckBoxSelection", enable: _this.mode === "CheckBox" });
            }
            _super.prototype.render.call(_this, e);
            return;
          }
          if (_this.mode === "CheckBox" && Browser.isDevice && _this.allowFiltering) {
            _this.notify("popupFullScreen", { module: "CheckBoxSelection", enable: _this.mode === "CheckBox" });
          }
          var mainLiLength = _this.ulElement.querySelectorAll("li.e-list-item").length;
          var liLength = _this.ulElement.querySelectorAll("li." + dropDownBaseClasses.li + "." + HIDE_LIST).length;
          if (mainLiLength > 0 && mainLiLength === liLength && liLength === _this.mainData.length && !(_this.targetElement() !== "" && _this.allowCustomValue)) {
            _this.beforePopupOpen = false;
            return;
          }
          _this.onPopupShown(e);
          if (_this.enableVirtualization && _this.listData && _this.listData.length) {
            if (!isNullOrUndefined(_this.value) && (_this.getModuleName() === "dropdownlist" || _this.getModuleName() === "combobox")) {
              _this.removeHover();
            }
            if (!_this.beforePopupOpen) {
              if (_this.hideSelectedItem && _this.value && Array.isArray(_this.value) && _this.value.length > 0) {
                _this.totalItemsCount();
              }
              if (!_this.preventSetCurrentData && !isNullOrUndefined(_this.viewPortInfo.startIndex) && !isNullOrUndefined(_this.viewPortInfo.endIndex)) {
                _this.notify("setCurrentViewDataAsync", {
                  component: _this.getModuleName(),
                  module: "VirtualScroll"
                });
              }
            }
          }
          if (_this.enableVirtualization && !_this.allowFiltering && _this.selectedValueInfo != null && _this.selectedValueInfo.startIndex > 0 && _this.value != null) {
            _this.notify("dataProcessAsync", {
              module: "VirtualScroll",
              isOpen: true
            });
          }
          if (_this.enableVirtualization) {
            _this.updatevirtualizationList();
          } else {
            if (_this.value && _this.value.length) {
              var element = void 0;
              var listItems = _this.getItems();
              for (var _i = 0, _a = _this.value; _i < _a.length; _i++) {
                var value = _a[_i];
                var checkValue = _this.allowObjectBinding ? getValue(_this.fields.value ? _this.fields.value : "", value) : value;
                element = _this.getElementByValue(checkValue);
                if (element) {
                  _this.addListSelection(element);
                }
              }
            }
          }
          _this.preventSetCurrentData = true;
        }
      });
    };
    MultiSelect2.prototype.selectAll = function(state) {
      this.isSelectAll = true;
      this.selectAllItems(state);
    };
    MultiSelect2.prototype.getModuleName = function() {
      return "multiselect";
    };
    MultiSelect2.prototype.clear = function() {
      var _this = this;
      this.selectAll(false);
      if (this.value && this.value.length) {
        setTimeout(function() {
          _this.setProperties({ value: null }, true);
        }, 0);
      } else {
        this.setProperties({ value: null }, true);
      }
    };
    MultiSelect2.prototype.render = function() {
      if (!isNullOrUndefined(this.value) && this.value.length > 0) {
        this.value = this.value.slice();
      }
      this.setDynValue = this.initStatus = false;
      this.isSelectAll = false;
      this.selectAllEventEle = [];
      this.searchWrapper = this.createElement("span", { className: SEARCHBOX_WRAPPER + " " + (this.mode === "Box" ? BOX_ELEMENT : "") });
      this.viewWrapper = this.createElement("span", { className: DELIMITER_VIEW + " " + DELIMITER_WRAPPER, styles: "display:none;" });
      this.overAllClear = this.createElement("span", {
        className: CLOSEICON_CLASS2,
        styles: "display:none;"
      });
      this.componentWrapper = this.createElement("div", { className: ELEMENT_WRAPPER });
      this.overAllWrapper = this.createElement("div", { className: OVER_ALL_WRAPPER });
      if (this.mode === "CheckBox") {
        addClass([this.overAllWrapper], "e-checkbox");
      }
      if (Browser.isDevice) {
        this.componentWrapper.classList.add(ELEMENT_MOBILE_WRAPPER);
      }
      this.setWidth(this.width);
      this.overAllWrapper.appendChild(this.componentWrapper);
      this.popupWrapper = this.createElement("div", { id: this.element.id + "_popup", className: POPUP_WRAPPER });
      this.popupWrapper.setAttribute("aria-label", this.element.id);
      this.popupWrapper.setAttribute("role", "dialog");
      if (this.mode === "Delimiter" || this.mode === "CheckBox") {
        this.delimiterWrapper = this.createElement("span", { className: DELIMITER_WRAPPER, styles: "display:none" });
        this.componentWrapper.appendChild(this.delimiterWrapper);
      } else {
        this.chipCollectionWrapper = this.createElement("span", {
          className: CHIP_WRAPPER2,
          styles: "display:none"
        });
        if (this.mode === "Default") {
          this.chipCollectionWrapper.setAttribute("id", getUniqueID("chip_default"));
        } else if (this.mode === "Box") {
          this.chipCollectionWrapper.setAttribute("id", getUniqueID("chip_box"));
        }
        this.componentWrapper.appendChild(this.chipCollectionWrapper);
      }
      if (this.mode !== "Box") {
        this.componentWrapper.appendChild(this.viewWrapper);
      }
      this.componentWrapper.appendChild(this.searchWrapper);
      if (this.showClearButton && !Browser.isDevice) {
        this.componentWrapper.appendChild(this.overAllClear);
      } else {
        this.componentWrapper.classList.add(CLOSE_ICON_HIDE);
      }
      this.dropDownIcon();
      this.inputElement = this.createElement("input", {
        className: INPUT_ELEMENT,
        attrs: {
          spellcheck: "false",
          type: "text",
          autocomplete: "off",
          tabindex: "0",
          role: "combobox"
        }
      });
      if (this.mode === "Default" || this.mode === "Box") {
        this.inputElement.setAttribute("aria-describedby", this.chipCollectionWrapper.id);
      }
      if (!isNullOrUndefined(this.inputElement)) {
        attributes(this.inputElement, { "aria-expanded": "false", "aria-label": this.getModuleName() });
      }
      if (this.element.tagName !== this.getNgDirective()) {
        this.element.style.display = "none";
      }
      if (this.element.tagName === this.getNgDirective()) {
        this.element.appendChild(this.overAllWrapper);
        this.searchWrapper.appendChild(this.inputElement);
      } else {
        this.element.parentElement.insertBefore(this.overAllWrapper, this.element);
        this.searchWrapper.appendChild(this.inputElement);
        this.searchWrapper.appendChild(this.element);
        this.element.removeAttribute("tabindex");
      }
      if (this.floatLabelType !== "Never") {
        createFloatLabel(this.overAllWrapper, this.searchWrapper, this.element, this.inputElement, this.value, this.floatLabelType, this.placeholder);
      } else if (this.floatLabelType === "Never") {
        this.refreshPlaceHolder();
      }
      this.addValidInputClass();
      this.element.style.opacity = "";
      var id = this.element.getAttribute("id") ? this.element.getAttribute("id") : getUniqueID("ej2_dropdownlist");
      this.element.id = id;
      this.hiddenElement = this.createElement("select", {
        attrs: { "aria-hidden": "true", "class": HIDDEN_ELEMENT, "tabindex": "-1", "multiple": "" }
      });
      this.componentWrapper.appendChild(this.hiddenElement);
      this.validationAttribute(this.element, this.hiddenElement);
      if (this.mode !== "CheckBox") {
        this.hideOverAllClear();
      }
      if (!isNullOrUndefined(closest(this.element, "fieldset")) && closest(this.element, "fieldset").disabled) {
        this.enabled = false;
      }
      this.wireEvent();
      this.enable(this.enabled);
      this.enableRTL(this.enableRtl);
      if (this.enableVirtualization) {
        this.updateVirtualizationProperties(this.itemCount, this.allowFiltering, this.mode === "CheckBox");
      }
      this.listItemHeight = this.getListHeight();
      this.getSkeletonCount();
      this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
      this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.viewPortInfo.startIndex > 0 ? this.viewPortInfo.endIndex : this.itemCount;
      this.checkInitialValue();
      if (this.element.hasAttribute("data-val")) {
        this.element.setAttribute("data-val", "false");
      }
      Input.createSpanElement(this.overAllWrapper, this.createElement);
      this.calculateWidth();
      if (!isNullOrUndefined(this.overAllWrapper) && !isNullOrUndefined(this.overAllWrapper.getElementsByClassName("e-ddl-icon")[0] && this.overAllWrapper.getElementsByClassName("e-float-text-content")[0] && this.floatLabelType !== "Never")) {
        this.overAllWrapper.getElementsByClassName("e-float-text-content")[0].classList.add("e-icon");
      }
      this.renderComplete();
    };
    MultiSelect2.prototype.getListHeight = function() {
      var listParent = this.createElement("div", {
        className: "e-dropdownbase"
      });
      var item = this.createElement("li", {
        className: "e-list-item"
      });
      var listParentHeight = formatUnit(this.popupHeight);
      listParent.style.height = parseInt(listParentHeight, 10).toString() + "px";
      listParent.appendChild(item);
      document.body.appendChild(listParent);
      this.virtualListHeight = listParent.getBoundingClientRect().height;
      var listItemHeight = Math.ceil(item.getBoundingClientRect().height);
      listParent.remove();
      return listItemHeight;
    };
    MultiSelect2.prototype.removeDisabledItemsValue = function(value) {
      if (value) {
        var data = [];
        var dataIndex = 0;
        for (var index = 0; index < value.length; index++) {
          var indexValue = value[index];
          if (typeof indexValue === "object") {
            indexValue = JSON.parse(JSON.stringify(indexValue))[this.fields.value];
          }
          if (indexValue != null && !this.isDisabledItemByIndex(this.getIndexByValue(indexValue))) {
            data[dataIndex++] = value[index];
          }
        }
        this.value = data.length > 0 ? data : null;
      }
    };
    MultiSelect2.prototype.checkInitialValue = function() {
      var _this = this;
      if (this.fields.disabled) {
        this.removeDisabledItemsValue(this.value);
      }
      var isData = this.dataSource instanceof Array ? this.dataSource.length > 0 : !isNullOrUndefined(this.dataSource);
      if (!(this.value && this.value.length) && isNullOrUndefined(this.text) && !isData && this.element.tagName === "SELECT" && this.element.options.length > 0) {
        var optionsElement = this.element.options;
        var valueCol = [];
        var textCol = "";
        for (var index = 0, optionsLen = optionsElement.length; index < optionsLen; index++) {
          var opt = optionsElement[index];
          if (!isNullOrUndefined(opt.getAttribute("selected"))) {
            if (opt.getAttribute("value")) {
              var value = this.allowObjectBinding ? this.getDataByValue(opt.getAttribute("value")) : opt.getAttribute("value");
              valueCol.push(value);
            } else {
              textCol += opt.text + this.delimiterChar;
            }
          }
        }
        if (valueCol.length > 0) {
          this.setProperties({ value: valueCol }, true);
        } else if (textCol !== "") {
          this.setProperties({ text: textCol }, true);
        }
        if (valueCol.length > 0 || textCol !== "") {
          this.refreshInputHight();
          this.refreshPlaceHolder();
        }
      }
      if (this.value && this.value.length || !isNullOrUndefined(this.text)) {
        if (!this.list) {
          _super.prototype.render.call(this);
        }
      }
      if (this.fields.disabled) {
        this.text = this.text && !this.isDisabledItemByIndex(this.getIndexByValue(this.getValueByText(this.text))) ? this.text : null;
      }
      if (!isNullOrUndefined(this.text) && (isNullOrUndefined(this.value) || this.value.length === 0)) {
        this.initialTextUpdate();
      }
      if (this.value && this.value.length) {
        var listItems_2;
        if (this.enableVirtualization) {
          var fields = this.fields.value ? this.fields.value : "";
          var predicate = void 0;
          for (var i = 0; i < this.value.length; i++) {
            var value = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", this.value[i]) : this.value[i];
            if (i === 0) {
              predicate = new Predicate(fields, "equal", value);
            } else {
              predicate = predicate.or(fields, "equal", value);
            }
          }
          if (this.dataSource instanceof DataManager) {
            this.dataSource.executeQuery(new Query().where(predicate)).then(function(e) {
              if (e.result.length > 0) {
                listItems_2 = e.result;
                _this.initStatus = false;
                setTimeout(function() {
                  _this.initialValueUpdate(listItems_2, true);
                  _this.initialUpdate();
                }, 100);
                _this.initStatus = true;
              }
            });
          } else {
            listItems_2 = new DataManager(this.dataSource).executeLocal(new Query().where(predicate));
          }
        }
        if (!(this.dataSource instanceof DataManager)) {
          this.initialValueUpdate(listItems_2);
          this.initialUpdate();
        } else {
          this.setInitialValue = function() {
            _this.initStatus = false;
            if (!_this.enableVirtualization || _this.enableVirtualization && !(_this.dataSource instanceof DataManager)) {
              _this.initialValueUpdate(listItems_2);
            }
            _this.initialUpdate();
            _this.setInitialValue = null;
            _this.initStatus = true;
          };
        }
        this.updateTempValue();
      } else {
        this.initialUpdate();
      }
      this.initStatus = true;
      this.checkAutoFocus();
      if (!isNullOrUndefined(this.text)) {
        this.element.setAttribute("data-initial-value", this.text);
      }
    };
    MultiSelect2.prototype.checkAutoFocus = function() {
      if (this.element.hasAttribute("autofocus")) {
        this.inputElement.focus();
      }
    };
    MultiSelect2.prototype.updatevirtualizationList = function() {
      if (this.value && this.value.length) {
        var element = void 0;
        var listItems = this.getItems();
        for (var _i = 0, _a = this.value; _i < _a.length; _i++) {
          var value = _a[_i];
          var checkValue = this.allowObjectBinding ? getValue(this.fields.value ? this.fields.value : "", value) : value;
          element = this.getElementByValue(checkValue);
          if (element) {
            this.addListSelection(element);
          }
        }
        if (this.enableVirtualization && this.hideSelectedItem) {
          var visibleListElements = this.list.querySelectorAll("li." + dropDownBaseClasses.li + ":not(." + HIDE_LIST + "):not(.e-reorder-hide):not(.e-virtual-list)");
          if (visibleListElements.length) {
            var actualCount = this.virtualListHeight > 0 ? Math.floor(this.virtualListHeight / this.listItemHeight) : 0;
            if (visibleListElements.length < actualCount + 2) {
              var query = this.getForQuery(this.value).clone();
              query = query.skip(this.viewPortInfo.startIndex);
              this.resetList(this.dataSource, this.fields, query);
            }
          }
        }
      }
    };
    MultiSelect2.prototype.setFloatLabelType = function() {
      removeFloating(this.overAllWrapper, this.componentWrapper, this.searchWrapper, this.inputElement, this.value, this.floatLabelType, this.placeholder);
      if (this.floatLabelType !== "Never") {
        createFloatLabel(this.overAllWrapper, this.searchWrapper, this.element, this.inputElement, this.value, this.floatLabelType, this.placeholder);
      }
    };
    MultiSelect2.prototype.addValidInputClass = function() {
      if (!isNullOrUndefined(this.overAllWrapper)) {
        if (!isNullOrUndefined(this.value) && this.value.length || this.floatLabelType === "Always") {
          addClass([this.overAllWrapper], "e-valid-input");
        } else {
          removeClass([this.overAllWrapper], "e-valid-input");
        }
      }
    };
    MultiSelect2.prototype.dropDownIcon = function() {
      if (this.showDropDownIcon) {
        this.dropIcon = this.createElement("span", { className: dropdownIcon });
        this.componentWrapper.appendChild(this.dropIcon);
        addClass([this.componentWrapper], ["e-down-icon"]);
      } else {
        if (!isNullOrUndefined(this.dropIcon)) {
          this.dropIcon.parentElement.removeChild(this.dropIcon);
          removeClass([this.componentWrapper], ["e-down-icon"]);
        }
      }
    };
    MultiSelect2.prototype.initialUpdate = function() {
      if (this.mode !== "Box" && !(this.setDynValue && this.mode === "Default" && this.inputFocus)) {
        this.updateDelimView();
      }
      this.viewPortInfo.startIndex = this.virtualItemStartIndex = 0;
      this.viewPortInfo.endIndex = this.virtualItemEndIndex = this.itemCount;
      this.updateCssClass();
      this.updateHTMLAttribute();
      this.updateReadonly(this.readonly);
      this.refreshInputHight();
      this.checkPlaceholderSize();
    };
    MultiSelect2.prototype.disableItem = function(item) {
      if (this.fields.disabled) {
        if (!this.list) {
          this.renderList();
        }
        var itemIndex = -1;
        if (this.liCollections && this.liCollections.length > 0 && this.listData && this.fields.disabled) {
          if (typeof item === "string") {
            itemIndex = this.getIndexByValue(item);
          } else if (typeof item === "object") {
            if (item instanceof HTMLLIElement) {
              for (var index = 0; index < this.liCollections.length; index++) {
                if (this.liCollections[index] === item) {
                  itemIndex = this.getIndexByValue(item.getAttribute("data-value"));
                  break;
                }
              }
            } else {
              var value = JSON.parse(JSON.stringify(item))[this.fields.value];
              for (var index = 0; index < this.listData.length; index++) {
                if (JSON.parse(JSON.stringify(this.listData[index]))[this.fields.value] === value) {
                  itemIndex = this.getIndexByValue(value);
                  break;
                }
              }
            }
          } else {
            itemIndex = item;
          }
          var isValidIndex = itemIndex < this.liCollections.length && itemIndex > -1;
          if (isValidIndex && !JSON.parse(JSON.stringify(this.listData[itemIndex]))[this.fields.disabled]) {
            var li = this.liCollections[itemIndex];
            if (li) {
              this.disableListItem(li);
              var parsedData = JSON.parse(JSON.stringify(this.listData[itemIndex]));
              parsedData[this.fields.disabled] = true;
              this.listData[itemIndex] = parsedData;
              if (li.classList.contains(dropDownBaseClasses.focus)) {
                this.removeFocus();
              }
              if (li.classList.contains(HIDE_LIST) || li.classList.contains(dropDownBaseClasses.selected)) {
                var oldValue = this.value;
                this.removeDisabledItemsValue(this.value);
                this.updateVal(this.value, oldValue, "value");
              }
              if (this.mode === "CheckBox" && this.enableGroupCheckBox && !isNullOrUndefined(this.fields.groupBy)) {
                this.disableGroupHeader();
              }
            }
          }
        }
      }
    };
    MultiSelect2.prototype.destroy = function() {
      if (this.isReact) {
        this.clearTemplate();
      }
      if (this.popupObj) {
        this.popupObj.hide();
      }
      this.notify(destroy, {});
      this.unwireListEvents();
      this.unWireEvent();
      this.list = null;
      this.popupObj = null;
      this.mainList = null;
      this.mainData = null;
      this.filterParent = null;
      this.ulElement = null;
      this.mainListCollection = null;
      _super.prototype.destroy.call(this);
      var temp = ["readonly", "aria-disabled", "placeholder", "aria-label", "aria-expanded"];
      var length = temp.length;
      if (!isNullOrUndefined(this.inputElement)) {
        while (length > 0) {
          this.inputElement.removeAttribute(temp[length - 1]);
          length--;
        }
      }
      if (!isNullOrUndefined(this.element)) {
        this.element.removeAttribute("data-initial-value");
        this.element.style.display = "block";
      }
      if (this.overAllWrapper && this.overAllWrapper.parentElement) {
        if (this.overAllWrapper.parentElement.tagName === this.getNgDirective()) {
          remove(this.overAllWrapper);
        } else {
          this.overAllWrapper.parentElement.insertBefore(this.element, this.overAllWrapper);
          remove(this.overAllWrapper);
        }
      }
      this.componentWrapper = null;
      this.overAllClear = null;
      this.overAllWrapper = null;
      this.hiddenElement = null;
      this.searchWrapper = null;
      this.viewWrapper = null;
      this.chipCollectionWrapper = null;
      this.targetInputElement = null;
      this.popupWrapper = null;
      this.inputElement = null;
      this.delimiterWrapper = null;
      this.popupObj = null;
      this.popupWrapper = null;
      this.liCollections = null;
      this.header = null;
      this.mainList = null;
      this.mainListCollection = null;
      this.footer = null;
      this.selectAllEventEle = null;
    };
    __decorate9([
      Complex({ text: null, value: null, iconCss: null, groupBy: null, disabled: null }, FieldSettings)
    ], MultiSelect2.prototype, "fields", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "enablePersistence", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "groupTemplate", void 0);
    __decorate9([
      Property("No records found")
    ], MultiSelect2.prototype, "noRecordsTemplate", void 0);
    __decorate9([
      Property("Request failed")
    ], MultiSelect2.prototype, "actionFailureTemplate", void 0);
    __decorate9([
      Property("None")
    ], MultiSelect2.prototype, "sortOrder", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "enabled", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "enableHtmlSanitizer", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "enableVirtualization", void 0);
    __decorate9([
      Property([])
    ], MultiSelect2.prototype, "dataSource", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "query", void 0);
    __decorate9([
      Property("StartsWith")
    ], MultiSelect2.prototype, "filterType", void 0);
    __decorate9([
      Property(1e3)
    ], MultiSelect2.prototype, "zIndex", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "ignoreAccent", void 0);
    __decorate9([
      Property()
    ], MultiSelect2.prototype, "locale", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "enableGroupCheckBox", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "cssClass", void 0);
    __decorate9([
      Property("100%")
    ], MultiSelect2.prototype, "width", void 0);
    __decorate9([
      Property("300px")
    ], MultiSelect2.prototype, "popupHeight", void 0);
    __decorate9([
      Property("100%")
    ], MultiSelect2.prototype, "popupWidth", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "placeholder", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "filterBarPlaceholder", void 0);
    __decorate9([
      Property({})
    ], MultiSelect2.prototype, "htmlAttributes", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "valueTemplate", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "headerTemplate", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "footerTemplate", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "itemTemplate", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "allowFiltering", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "changeOnBlur", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "allowCustomValue", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "showClearButton", void 0);
    __decorate9([
      Property(1e3)
    ], MultiSelect2.prototype, "maximumSelectionLength", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "readonly", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "text", void 0);
    __decorate9([
      Property(null)
    ], MultiSelect2.prototype, "value", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "allowObjectBinding", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "hideSelectedItem", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "closePopupOnSelect", void 0);
    __decorate9([
      Property("Default")
    ], MultiSelect2.prototype, "mode", void 0);
    __decorate9([
      Property(",")
    ], MultiSelect2.prototype, "delimiterChar", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "ignoreCase", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "showDropDownIcon", void 0);
    __decorate9([
      Property("Never")
    ], MultiSelect2.prototype, "floatLabelType", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "showSelectAll", void 0);
    __decorate9([
      Property("Select All")
    ], MultiSelect2.prototype, "selectAllText", void 0);
    __decorate9([
      Property("Unselect All")
    ], MultiSelect2.prototype, "unSelectAllText", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "enableSelectionOrder", void 0);
    __decorate9([
      Property(true)
    ], MultiSelect2.prototype, "openOnClick", void 0);
    __decorate9([
      Property(false)
    ], MultiSelect2.prototype, "addTagOnBlur", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "change", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "removing", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "removed", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "beforeSelectAll", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "selectedAll", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "beforeOpen", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "open", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "close", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "blur", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "focus", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "chipSelection", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "filtering", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "tagging", void 0);
    __decorate9([
      Event()
    ], MultiSelect2.prototype, "customValueSelection", void 0);
    MultiSelect2 = __decorate9([
      NotifyPropertyChanges
    ], MultiSelect2);
    return MultiSelect2;
  }(DropDownBase)
);

// node_modules/@syncfusion/ej2-dropdowns/src/multi-select/checkbox-selection.js
var ICON2 = "e-icons";
var CHECKBOXFRAME2 = "e-frame";
var CHECK2 = "e-check";
var CHECKBOXWRAP2 = "e-checkbox-wrapper";
var INDETERMINATE = "e-stop";
var checkAllParent = "e-selectall-parent";
var searchBackIcon = "e-input-group-icon e-back-icon e-icons";
var filterBarClearIcon = "e-input-group-icon e-clear-icon e-icons";
var filterInput = "e-input-filter";
var filterParent = "e-filter-parent";
var mobileFilter = "e-ddl-device-filter";
var clearIcon = "e-clear-icon";
var popupFullScreen = "e-popup-full-page";
var device = "e-ddl-device";
var FOCUS2 = "e-input-focus";
var CheckBoxSelection = (
  /** @class */
  function() {
    function CheckBoxSelection2(parent) {
      this.activeLi = [];
      this.activeEle = [];
      this.parent = parent;
      this.removeEventListener();
      this.addEventListener();
    }
    CheckBoxSelection2.prototype.getModuleName = function() {
      return "CheckBoxSelection";
    };
    CheckBoxSelection2.prototype.addEventListener = function() {
      if (this.parent.isDestroyed) {
        return;
      }
      this.parent.on("updatelist", this.listSelection, this);
      this.parent.on("listoption", this.listOption, this);
      this.parent.on("selectAll", this.setSelectAll, this);
      this.parent.on("checkSelectAll", this.checkSelectAll, this);
      this.parent.on("searchBox", this.setSearchBox, this);
      this.parent.on("blur", this.onBlurHandler, this);
      this.parent.on("targetElement", this.targetElement, this);
      this.parent.on("deviceSearchBox", this.setDeviceSearchBox, this);
      this.parent.on("inputFocus", this.getFocus, this);
      this.parent.on("reOrder", this.setReorder, this);
      this.parent.on("activeList", this.getActiveList, this);
      this.parent.on("selectAllText", this.setLocale, this);
      this.parent.on("filterBarPlaceholder", this.setPlaceholder, this);
      EventHandler.add(document, "mousedown", this.onDocumentClick, this);
      this.parent.on("addItem", this.checboxCreate, this);
      this.parent.on("popupFullScreen", this.setPopupFullScreen, this);
    };
    CheckBoxSelection2.prototype.removeEventListener = function() {
      if (this.parent.isDestroyed) {
        return;
      }
      this.parent.off("updatelist", this.listSelection);
      this.parent.off("listoption", this.listOption);
      this.parent.off("selectAll", this.setSelectAll);
      this.parent.off("checkSelectAll", this.checkSelectAll);
      this.parent.off("searchBox", this.setSearchBox);
      this.parent.off("blur", this.onBlurHandler);
      this.parent.off("targetElement", this.targetElement);
      this.parent.off("deviceSearchBox", this.setDeviceSearchBox);
      this.parent.off("inputFocus", this.getFocus);
      this.parent.off("reOrder", this.setReorder);
      this.parent.off("activeList", this.getActiveList);
      this.parent.off("selectAllText", this.setLocale);
      this.parent.off("filterBarPlaceholder", this.setPlaceholder);
      this.parent.off("addItem", this.checboxCreate);
      this.parent.off("popupFullScreen", this.setPopupFullScreen);
    };
    CheckBoxSelection2.prototype.listOption = function(args) {
      var _this = this;
      if (isNullOrUndefined(this.parent.listCurrentOptions.itemCreated)) {
        this.parent.listCurrentOptions.itemCreated = function(e) {
          _this.checboxCreate(e);
        };
      } else {
        var itemCreated_1 = this.parent.listCurrentOptions.itemCreated;
        this.parent.listCurrentOptions.itemCreated = function(e) {
          _this.checboxCreate(e);
          itemCreated_1.apply(_this, [e]);
        };
      }
    };
    CheckBoxSelection2.prototype.setPlaceholder = function(props) {
      Input.setPlaceholder(props.filterBarPlaceholder, this.filterInput);
    };
    CheckBoxSelection2.prototype.checboxCreate = function(e) {
      var item;
      if (!isNullOrUndefined(e.item)) {
        item = e.item;
      } else {
        item = e;
      }
      if (this.parent.enableGroupCheckBox || item.className !== "e-list-group-item " && item.className !== "e-list-group-item") {
        var checkboxEle = createCheckBox(this.parent.createElement, true);
        var icon = select("div." + ICON2, item);
        item.insertBefore(checkboxEle, item.childNodes[isNullOrUndefined(icon) ? 0 : 1]);
        select("." + CHECKBOXFRAME2, checkboxEle);
        if (this.parent.enableGroupCheckBox) {
          this.parent.popupWrapper.classList.add("e-multiselect-group");
        }
        return item;
      } else {
        return item;
      }
    };
    CheckBoxSelection2.prototype.setSelectAll = function() {
      if (this.parent.showSelectAll) {
        if (isNullOrUndefined(this.checkAllParent)) {
          this.checkAllParent = this.parent.createElement("div", {
            className: checkAllParent
          });
          this.selectAllSpan = this.parent.createElement("span", {
            className: "e-all-text"
          });
          this.selectAllSpan.textContent = "";
          this.checkAllParent.appendChild(this.selectAllSpan);
          this.setLocale();
          this.checboxCreate(this.checkAllParent);
          if (this.parent.headerTemplate) {
            if (!isNullOrUndefined(this.parent.filterParent)) {
              append([this.checkAllParent], this.parent.filterParent);
            } else {
              append([this.checkAllParent], this.parent.popupWrapper);
            }
          }
          if (!this.parent.headerTemplate) {
            if (!isNullOrUndefined(this.parent.filterParent)) {
              this.parent.filterParent.parentNode.insertBefore(this.checkAllParent, this.parent.filterParent.nextSibling);
            } else {
              prepend([this.checkAllParent], this.parent.popupWrapper);
            }
          }
          EventHandler.add(this.checkAllParent, "mousedown", this.clickHandler, this);
        }
        if (this.parent.list.classList.contains("e-nodata") || this.parent.listData && this.parent.listData.length <= 1 && !this.parent.enableVirtualization && !this.parent.isDynamicDataChange || this.parent.isDynamicDataChange && this.parent.listData && this.parent.listData.length <= 1) {
          this.checkAllParent.style.display = "none";
        } else {
          this.checkAllParent.style.display = "block";
        }
        this.parent.selectAllHeight = this.checkAllParent.getBoundingClientRect().height;
      } else if (!isNullOrUndefined(this.checkAllParent)) {
        this.checkAllParent.parentElement.removeChild(this.checkAllParent);
        this.checkAllParent = null;
      }
    };
    CheckBoxSelection2.prototype.destroy = function() {
      this.removeEventListener();
      EventHandler.remove(document, "mousedown", this.onDocumentClick);
      this.checkAllParent = null;
      this.clearIconElement = null;
      this.filterInput = null;
      this.filterInputObj = null;
      this.checkWrapper = null;
      this.selectAllSpan = null;
    };
    CheckBoxSelection2.prototype.listSelection = function(args) {
      var target;
      if (!isNullOrUndefined(args.e)) {
        var frameElm = args.li.querySelector(".e-checkbox-wrapper .e-frame");
        target = !isNullOrUndefined(args.e.target) ? args.e.target.classList.contains("e-frame") && (!this.parent.showSelectAll || this.checkAllParent && !this.checkAllParent.contains(args.e.target)) ? args.e.target : args.li.querySelector(".e-checkbox-wrapper").childNodes[1] : args.li.querySelector(".e-checkbox-wrapper").childNodes[1];
      } else {
        var checkboxWrapper = args.li.querySelector(".e-checkbox-wrapper");
        target = checkboxWrapper ? checkboxWrapper.childNodes[1] : args.li.lastElementChild.childNodes[1];
      }
      if (this.parent.itemTemplate || this.parent.enableGroupCheckBox) {
        target = args.li.firstElementChild.childNodes[1];
      }
      if (!isNullOrUndefined(target)) {
        this.checkWrapper = closest(target, "." + CHECKBOXWRAP2);
      }
      if (!isNullOrUndefined(this.checkWrapper)) {
        var checkElement = select("." + CHECKBOXFRAME2, this.checkWrapper);
        var selectAll2 = false;
        this.validateCheckNode(this.checkWrapper, checkElement.classList.contains(CHECK2), args.li, args.e, selectAll2);
      }
    };
    CheckBoxSelection2.prototype.validateCheckNode = function(checkWrap, isCheck, li, e, selectAll2) {
      this.changeState(checkWrap, isCheck ? "uncheck" : "check", e, true, selectAll2);
    };
    CheckBoxSelection2.prototype.clickHandler = function(e) {
      var target;
      if (e.currentTarget.classList.contains(this.checkAllParent.className) || e.currentTarget.classList.value === this.checkAllParent.className) {
        target = e.currentTarget.firstElementChild.lastElementChild;
      } else {
        target = e.currentTarget;
      }
      this.checkWrapper = closest(target, "." + CHECKBOXWRAP2);
      var selectAll2 = true;
      if (!isNullOrUndefined(this.checkWrapper)) {
        var checkElement = select("." + CHECKBOXFRAME2, this.checkWrapper);
        this.validateCheckNode(this.checkWrapper, checkElement.classList.contains(CHECK2), null, e, selectAll2);
      }
      e.preventDefault();
    };
    CheckBoxSelection2.prototype.changeState = function(wrapper, state, e, isPrevent, selectAll2) {
      var ariaState;
      var frameSpan = wrapper.getElementsByClassName(CHECKBOXFRAME2)[0];
      if (state === "check" && !frameSpan.classList.contains(CHECK2)) {
        frameSpan.classList.remove(INDETERMINATE);
        frameSpan.classList.add(CHECK2);
        ariaState = "true";
        if (selectAll2) {
          this.parent.selectAllItems(true, e);
          this.setLocale(true);
        }
      } else if (state === "uncheck" && (frameSpan.classList.contains(CHECK2) || frameSpan.classList.contains(INDETERMINATE))) {
        removeClass([frameSpan], [CHECK2, INDETERMINATE]);
        ariaState = "false";
        if (selectAll2) {
          this.parent.selectAllItems(false, e);
          this.setLocale();
        }
      } else if (state === "indeterminate" && !frameSpan.classList.contains(INDETERMINATE)) {
        removeClass([frameSpan], [CHECK2]);
        frameSpan.classList.add(INDETERMINATE);
        ariaState = "false";
        if (selectAll2) {
          this.parent.selectAllItems(false, e);
          this.setLocale();
        }
      }
    };
    CheckBoxSelection2.prototype.setSearchBox = function(args) {
      if (isNullOrUndefined(this.parent.filterParent)) {
        this.parent.filterParent = this.parent.createElement("span", {
          className: filterParent
        });
        this.filterInput = this.parent.createElement("input", {
          attrs: { type: "text" },
          className: filterInput
        });
        this.parent.element.parentNode.insertBefore(this.filterInput, this.parent.element);
        var backIcon = false;
        if (Browser.isDevice) {
          backIcon = true;
          this.parent.mobFilter = false;
        }
        this.filterInputObj = Input.createInput({
          element: this.filterInput,
          buttons: backIcon ? [searchBackIcon, filterBarClearIcon] : [filterBarClearIcon],
          properties: { placeholder: this.parent.filterBarPlaceholder }
        }, this.parent.createElement);
        if (!isNullOrUndefined(this.parent.cssClass)) {
          if (this.parent.cssClass.split(" ").indexOf("e-outline") !== -1) {
            addClass([this.filterInputObj.container], "e-outline");
          } else if (this.parent.cssClass.split(" ").indexOf("e-filled") !== -1) {
            addClass([this.filterInputObj.container], "e-filled");
          }
        }
        append([this.filterInputObj.container], this.parent.filterParent);
        prepend([this.parent.filterParent], args.popupElement);
        attributes(this.filterInput, {
          "aria-disabled": "false",
          "role": "combobox",
          "autocomplete": "off",
          "autocapitalize": "off",
          "spellcheck": "false",
          "aria-label": "multiselect",
          "aria-expanded": "true",
          "aria-controls": args.popupElement.id
        });
        this.clearIconElement = this.filterInput.parentElement.querySelector("." + clearIcon);
        if (!Browser.isDevice && this.clearIconElement) {
          EventHandler.add(this.clearIconElement, "mousedown", this.clearText, this);
          this.clearIconElement.style.visibility = "hidden";
        }
        EventHandler.add(this.filterInput, "input", this.parent.onInput, this.parent);
        EventHandler.add(this.filterInput, "keyup", this.parent.keyUp, this.parent);
        EventHandler.add(this.filterInput, "keydown", this.parent.onKeyDown, this.parent);
        EventHandler.add(this.filterInput, "blur", this.onBlurHandler, this);
        EventHandler.add(this.filterInput, "paste", this.parent.pasteHandler, this.parent);
        this.parent.searchBoxHeight = this.filterInputObj.container.parentElement.getBoundingClientRect().height;
        return this.filterInputObj;
      }
    };
    CheckBoxSelection2.prototype.clickOnBackIcon = function(e) {
      this.parent.hidePopup();
      removeClass([document.body, this.parent.popupObj.element], popupFullScreen);
      this.parent.inputElement.focus();
    };
    CheckBoxSelection2.prototype.clearText = function(e) {
      this.parent.targetInputElement.value = "";
      if (this.parent.allowFiltering && this.parent.targetInputElement.value === "") {
        this.parent.search(null);
      }
      this.parent.refreshListItems(null);
      this.parent.refreshPopup();
      this.clearIconElement.style.visibility = "hidden";
      this.filterInput.focus();
      this.setReorder(e);
      this.boundPreventListSelection = this.preventListSelection.bind(this);
      this.parent.popupWrapper.addEventListener("mouseup", this.boundPreventListSelection, true);
      e.preventDefault();
    };
    CheckBoxSelection2.prototype.preventListSelection = function(e) {
      e.stopPropagation();
      this.parent.popupWrapper.removeEventListener("mouseup", this.boundPreventListSelection, true);
      this.boundPreventListSelection = null;
    };
    CheckBoxSelection2.prototype.setDeviceSearchBox = function() {
      this.parent.popupObj.element.classList.add(device);
      this.parent.popupObj.element.classList.add(mobileFilter);
      this.parent.popupObj.position = { X: 0, Y: 0 };
      this.parent.popupObj.dataBind();
      this.setSearchBoxPosition();
      this.backIconElement = this.filterInputObj.container.querySelector(".e-back-icon");
      this.clearIconElement = this.filterInputObj.container.querySelector("." + clearIcon);
      this.clearIconElement.style.visibility = "hidden";
      EventHandler.add(this.backIconElement, "click", this.clickOnBackIcon, this);
      EventHandler.add(this.clearIconElement, "click", this.clearText, this);
    };
    CheckBoxSelection2.prototype.setSearchBoxPosition = function() {
      var searchBoxHeight = this.filterInput.parentElement.getBoundingClientRect().height;
      var selectAllHeight = 0;
      var footerHeight = 0;
      var headerHeight = 0;
      if (this.checkAllParent) {
        selectAllHeight = this.checkAllParent.getBoundingClientRect().height;
      }
      if (this.parent.header) {
        headerHeight = this.parent.header.getBoundingClientRect().height;
      }
      if (this.parent.footer) {
        footerHeight = this.parent.footer.getBoundingClientRect().height;
      }
      this.parent.popupObj.element.style.maxHeight = "100%";
      this.parent.popupObj.element.style.width = "100%";
      this.parent.list.style.maxHeight = window.innerHeight - searchBoxHeight - selectAllHeight - headerHeight - footerHeight + "px";
      this.parent.list.style.height = window.innerHeight - searchBoxHeight - selectAllHeight - headerHeight - footerHeight + "px";
      var clearElement = this.filterInput.parentElement.querySelector("." + clearIcon);
      detach(this.filterInput);
      clearElement.parentElement.insertBefore(this.filterInput, clearElement);
    };
    CheckBoxSelection2.prototype.setPopupFullScreen = function() {
      if (this.parent && this.parent.popupObj) {
        attributes(this.parent.popupObj.element, { style: "left:0px;right:0px;top:0px;bottom:0px;" });
        addClass([document.body, this.parent.popupObj.element], popupFullScreen);
        this.parent.popupObj.element.style.maxHeight = "100%";
        this.parent.popupObj.element.style.width = "100%";
      }
    };
    CheckBoxSelection2.prototype.targetElement = function() {
      if (!isNullOrUndefined(this.clearIconElement)) {
        this.parent.targetInputElement = this.filterInput;
        this.clearIconElement.style.visibility = this.parent.targetInputElement.value === "" ? "hidden" : "visible";
      }
      return this.parent.targetInputElement.value;
    };
    CheckBoxSelection2.prototype.onBlurHandler = function(e) {
      if (!this.parent.element.classList.contains("e-listbox")) {
        var target = void 0;
        if (this.parent.keyAction) {
          return;
        }
        if (Browser.isIE) {
          target = !isNullOrUndefined(e) && e.target;
        }
        if (!Browser.isIE) {
          target = !isNullOrUndefined(e) && e.relatedTarget;
        }
        if (this.parent.popupObj && document.body.contains(this.parent.popupObj.element) && this.parent.popupObj.element.contains(target) && !Browser.isIE && this.filterInput) {
          this.filterInput.focus();
          return;
        }
        if (this.parent.scrollFocusStatus && this.filterInput) {
          e.preventDefault();
          this.filterInput.focus();
          this.parent.scrollFocusStatus = false;
          return;
        }
        if (this.parent.popupObj && document.body.contains(this.parent.popupObj.element) && !this.parent.popupObj.element.classList.contains("e-popup-close")) {
          this.parent.inputFocus = false;
          this.parent.updateValueState(e, this.parent.value, this.parent.tempValues);
          this.parent.dispatchEvent(this.parent.hiddenElement, "change");
        }
        if (this.parent.popupObj && document.body.contains(this.parent.popupObj.element) && !this.parent.popupObj.element.classList.contains("e-popup-close")) {
          this.parent.inputFocus = false;
          this.parent.overAllWrapper.classList.remove(FOCUS2);
          this.parent.trigger("blur");
          this.parent.focused = true;
        }
        if (this.parent.popupObj && document.body.contains(this.parent.popupObj.element) && !this.parent.popupObj.element.classList.contains("e-popup-close") && !Browser.isDevice) {
          this.parent.hidePopup();
        }
      }
    };
    CheckBoxSelection2.prototype.onDocumentClick = function(e) {
      if (this.parent.getLocaleName() !== "listbox") {
        var target = e.target;
        if (!isNullOrUndefined(this.parent.popupObj) && closest(target, '[id="' + this.parent.popupObj.element.id + '"]')) {
          if (!(this.filterInput && this.filterInput.value !== "")) {
            e.preventDefault();
          }
        }
        if (!(!isNullOrUndefined(this.parent.popupObj) && closest(target, '[id="' + this.parent.popupObj.element.id + '"]')) && !isNullOrUndefined(this.parent.overAllWrapper) && !this.parent.overAllWrapper.contains(e.target)) {
          if (this.parent.overAllWrapper.classList.contains(dropDownBaseClasses.focus) || this.parent.isPopupOpen()) {
            this.parent.inputFocus = false;
            this.parent.scrollFocusStatus = false;
            this.parent.hidePopup();
            this.parent.onBlurHandler(e, true);
            this.parent.focused = true;
          }
        } else {
          this.parent.scrollFocusStatus = (Browser.isIE || Browser.info.name === "edge") && document.activeElement === this.filterInput;
        }
        if (!isNullOrUndefined(this.parent.overAllWrapper) && !this.parent.overAllWrapper.contains(e.target) && this.parent.overAllWrapper.classList.contains("e-input-focus") && !this.parent.isPopupOpen()) {
          if (Browser.isIE) {
            this.parent.onBlurHandler();
          } else {
            this.parent.onBlurHandler(e);
          }
        }
        if (this.filterInput === target) {
          this.filterInput.focus();
        }
      }
    };
    CheckBoxSelection2.prototype.getFocus = function(e) {
      this.parent.overAllWrapper.classList.remove(FOCUS2);
      if (this.parent.keyAction && e.value !== "clear" && e.value !== "focus") {
        this.parent.keyAction = false;
        return;
      }
      if (e.value === "focus") {
        this.filterInput.focus();
        this.parent.removeFocus();
        EventHandler.remove(this.parent.list, "keydown", this.parent.onKeyDown);
      }
      if (e.value === "clear") {
        this.filterInput.value = "";
        this.clearIconElement.style.visibility = "hidden";
      }
    };
    CheckBoxSelection2.prototype.checkSelectAll = function(e) {
      if (e.value === "check") {
        this.changeState(this.checkAllParent, e.value, null, null, false);
        this.setLocale(true);
      }
      if (e.value === "uncheck") {
        this.changeState(this.checkAllParent, e.value, null, null, false);
        this.setLocale();
      }
      if (e.value === "indeterminate") {
        this.changeState(this.checkAllParent, e.value, null, null, false);
        this.setLocale();
      }
    };
    CheckBoxSelection2.prototype.setLocale = function(unSelect) {
      if (this.parent.selectAllText !== "Select All" || this.parent.unSelectAllText !== "Unselect All") {
        var template = unSelect ? this.parent.unSelectAllText : this.parent.selectAllText;
        this.selectAllSpan.textContent = "";
        var compiledString = compile(template);
        var templateName = unSelect ? "unSelectAllText" : "selectAllText";
        for (var _i = 0, _a = compiledString({}, this.parent, templateName, null, !this.parent.isStringTemplate); _i < _a.length; _i++) {
          var item = _a[_i];
          this.selectAllSpan.textContent = item.textContent;
        }
      } else {
        var l10nLocale = { selectAllText: "Select All", unSelectAllText: "Unselect All" };
        var l10n = new L10n(this.parent.getLocaleName(), {}, this.parent.locale);
        if (l10n.getConstant("selectAllText") === "") {
          l10n = new L10n("dropdowns", l10nLocale, this.parent.locale);
        }
        if (!isNullOrUndefined(this.selectAllSpan)) {
          this.selectAllSpan.textContent = unSelect ? l10n.getConstant("unSelectAllText") : l10n.getConstant("selectAllText");
        }
      }
    };
    CheckBoxSelection2.prototype.getActiveList = function(args) {
      if (args.li.classList.contains("e-active")) {
        this.activeLi.push(args.li.cloneNode(true));
      } else {
        this.activeLi.splice(args.index, 1);
      }
    };
    CheckBoxSelection2.prototype.setReorder = function(args) {
      if (this.parent.enableSelectionOrder && !isNullOrUndefined(this.parent.value)) {
        var activeLiCount = this.parent.ulElement.querySelectorAll("li.e-active").length;
        var remLi = void 0;
        var ulEle_1 = this.parent.createElement("ul", {
          className: "e-list-parent e-ul e-reorder"
        });
        if (activeLiCount > 0) {
          var activeListItems = this.parent.ulElement.querySelectorAll("li.e-active");
          activeListItems.forEach(function(item) {
            ulEle_1.appendChild(item);
          });
          remLi = this.parent.ulElement.querySelectorAll("li.e-active");
          addClass(remLi, "e-reorder-hide");
          if (this.parent.enableVirtualization) {
            var virtualUlElement = this.parent.list.querySelector(".e-virtual-ddl-content");
            prepend([ulEle_1], virtualUlElement);
          } else {
            prepend([ulEle_1], this.parent.list);
          }
        }
        this.parent.focusAtFirstListItem();
      }
    };
    return CheckBoxSelection2;
  }()
);

// node_modules/@syncfusion/ej2-dropdowns/src/list-box/list-box.js
var __extends10 = /* @__PURE__ */ function() {
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
var __decorate10 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SelectionSettings = (
  /** @class */
  function(_super) {
    __extends10(SelectionSettings2, _super);
    function SelectionSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate10([
      Property("Multiple")
    ], SelectionSettings2.prototype, "mode", void 0);
    __decorate10([
      Property(false)
    ], SelectionSettings2.prototype, "showCheckbox", void 0);
    __decorate10([
      Property(false)
    ], SelectionSettings2.prototype, "showSelectAll", void 0);
    __decorate10([
      Property("Left")
    ], SelectionSettings2.prototype, "checkboxPosition", void 0);
    return SelectionSettings2;
  }(ChildProperty)
);
var ToolbarSettings = (
  /** @class */
  function(_super) {
    __extends10(ToolbarSettings2, _super);
    function ToolbarSettings2() {
      return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate10([
      Property([])
    ], ToolbarSettings2.prototype, "items", void 0);
    __decorate10([
      Property("Right")
    ], ToolbarSettings2.prototype, "position", void 0);
    return ToolbarSettings2;
  }(ChildProperty)
);
var ListBox = (
  /** @class */
  function(_super) {
    __extends10(ListBox2, _super);
    function ListBox2(options, element) {
      var _this = _super.call(this, options, element) || this;
      _this.isValidKey = false;
      _this.isDataSourceUpdate = false;
      _this.keyDownStatus = false;
      return _this;
    }
    ListBox_1 = ListBox2;
    ListBox2.prototype.addItem = function(items, itemIndex) {
      _super.prototype.addItem.call(this, items, itemIndex);
      if (this.allowFiltering && this.filterInput.value !== "") {
        this.filteringAction(this.jsonData, new Query(), this.fields);
      }
    };
    ListBox2.prototype.render = function() {
      if (this.isAngular && this.allowFiltering) {
        var originalElement = this.element;
        var clonedElement = originalElement.cloneNode(true);
        originalElement.parentNode.replaceChild(clonedElement, originalElement);
        this.element = clonedElement;
        setValue("ej2_instances", [this], this.element);
      }
      this.inputString = "";
      this.initLoad = true;
      this.isCustomFiltering = false;
      this.initialSelectedOptions = this.value;
      this.inputFormName = this.element.getAttribute("name");
      _super.prototype.render.call(this);
      this.setEnabled();
      this.renderComplete();
    };
    ListBox2.prototype.initWrapper = function() {
      var hiddenSelect = this.createElement("select", { className: "e-hidden-select", attrs: { "multiple": "" } });
      hiddenSelect.style.visibility = "hidden";
      this.list.classList.add("e-listbox-wrapper");
      this.list.querySelector(".e-list-parent").setAttribute("role", "presentation");
      var groupHdrs = this.list.querySelectorAll(".e-list-group-item");
      for (var i = 0; i < groupHdrs.length; i++) {
        groupHdrs[i].removeAttribute("tabindex");
        groupHdrs[i].setAttribute("role", "option");
      }
      if (this.itemTemplate) {
        this.list.classList.add("e-list-template");
      }
      this.list.classList.add("e-wrapper");
      this.list.classList.add("e-lib");
      if (this.element.tagName === "EJS-LISTBOX") {
        this.element.setAttribute("tabindex", "0");
        if (this.initLoad) {
          this.element.appendChild(this.list);
        }
      } else {
        if (this.initLoad && this.element.parentElement) {
          this.element.parentElement.insertBefore(this.list, this.element);
        }
        this.list.insertBefore(this.element, this.list.firstChild);
        this.element.style.display = "none";
      }
      this.list.insertBefore(hiddenSelect, this.list.firstChild);
      if (this.list.getElementsByClassName("e-list-item")[0]) {
        this.list.getElementsByClassName("e-list-item")[0].classList.remove(dropDownBaseClasses.focus);
      }
      if (this.itemTemplate) {
        this.renderReactTemplates();
      }
      removeClass([this.list], [dropDownBaseClasses.content, dropDownBaseClasses.root]);
      this.validationAttribute(this.element, hiddenSelect);
      this.list.setAttribute("role", "listbox");
      attributes(this.list, { "role": "listbox", "aria-label": "listbox", "aria-multiselectable": this.selectionSettings.mode === "Multiple" ? "true" : "false" });
      this.updateSelectionSettings();
    };
    ListBox2.prototype.updateSelectionSettings = function() {
      if (this.selectionSettings.showCheckbox && this.selectionSettings.showSelectAll && this.liCollections.length) {
        var l10nSelect = new L10n(this.getModuleName(), { selectAllText: "Select All", unSelectAllText: "Unselect All" }, this.locale);
        this.showSelectAll = true;
        this.selectAllText = l10nSelect.getConstant("selectAllText");
        this.unSelectAllText = l10nSelect.getConstant("unSelectAllText");
        this.popupWrapper = this.list;
        this.checkBoxSelectionModule.checkAllParent = null;
        this.notify("selectAll", {});
      }
    };
    ListBox2.prototype.initDraggable = function() {
      var _this = this;
      if (this.ulElement) {
        this.ulElement.id = this.element.id + "_parent";
      }
      if (this.allowDragAndDrop) {
        new Sortable(this.ulElement, {
          scope: this.scope,
          itemClass: "e-list-item",
          dragStart: this.triggerDragStart.bind(this),
          drag: this.triggerDrag.bind(this),
          beforeDrop: this.beforeDragEnd.bind(this),
          drop: this.dragEnd.bind(this),
          placeHolder: function() {
            return _this.createElement("span", { className: "e-placeholder" });
          },
          helper: function(e) {
            var wrapper = _this.list.cloneNode();
            var ele = e.sender.cloneNode(true);
            wrapper.appendChild(ele);
            var refEle = _this.getItems()[0];
            wrapper.style.width = refEle.offsetWidth + "px";
            wrapper.style.height = refEle.offsetHeight + "px";
            if ((_this.value && _this.value.length) > 1 && _this.isSelected(ele)) {
              ele.appendChild(_this.createElement("span", {
                className: "e-list-badge",
                innerHTML: _this.value.length + ""
              }));
            }
            wrapper.style.zIndex = getZindexPartial(_this.element) + "";
            return wrapper;
          }
        });
      }
    };
    ListBox2.prototype.updateActionCompleteData = function(li, item, index) {
      this.jsonData.splice(index === null ? this.jsonData.length : index, 0, item);
    };
    ListBox2.prototype.initToolbar = function() {
      var pos = this.toolbarSettings.position;
      var prevScope = this.element.getAttribute("data-value");
      this.toolbarSettings.items = isNullOrUndefined(this.toolbarSettings.items) ? [] : this.toolbarSettings.items;
      if (this.toolbarSettings.items.length) {
        var toolElem = this.createElement("div", { className: "e-listbox-tool", attrs: { "role": "toolbar" } });
        var wrapper = this.createElement("div", {
          className: "e-listboxtool-wrapper e-lib e-" + pos.toLowerCase()
        });
        this.list.parentElement.insertBefore(wrapper, this.list);
        wrapper.appendChild(pos === "Right" ? this.list : toolElem);
        wrapper.appendChild(pos === "Right" ? toolElem : this.list);
        this.createButtons(toolElem);
        if (!this.element.id) {
          this.element.id = getUniqueID("e-" + this.getModuleName());
        }
        if (this.scope) {
          document.querySelector(this.scope).setAttribute("data-value", this.element.id);
        } else {
          this.updateToolBarState();
        }
      }
      var scope = this.element.getAttribute("data-value");
      if (prevScope && scope && prevScope !== scope) {
        this.tBListBox = getComponent(document.getElementById(prevScope), this.getModuleName());
        this.tBListBox.updateToolBarState();
      } else if (scope) {
        this.tBListBox = getComponent(document.getElementById(scope), this.getModuleName());
        this.tBListBox.updateToolBarState();
      }
    };
    ListBox2.prototype.createButtons = function(toolElem) {
      var _this = this;
      var btn;
      var ele;
      var title;
      var l10n = new L10n(this.getModuleName(), {
        moveUp: "Move Up",
        moveDown: "Move Down",
        moveTo: "Move To",
        moveFrom: "Move From",
        moveAllTo: "Move All To",
        moveAllFrom: "Move All From"
      }, this.locale);
      this.toolbarSettings.items.forEach(function(value) {
        title = l10n.getConstant(value);
        ele = _this.createElement("button", {
          attrs: {
            "type": "button",
            "data-value": value,
            "title": title,
            "aria-label": title
          }
        });
        toolElem.appendChild(ele);
        btn = new Button({ iconCss: "e-icons e-" + value.toLowerCase() }, ele);
        btn.createElement = _this.createElement;
      });
    };
    ListBox2.prototype.validationAttribute = function(input, hiddenSelect) {
      if (this.inputFormName) {
        input.setAttribute("name", this.inputFormName);
      }
      _super.prototype.validationAttribute.call(this, input, hiddenSelect);
      hiddenSelect.required = input.required;
      input.required = false;
    };
    ListBox2.prototype.setHeight = function() {
      var ele = this.toolbarSettings.items.length ? this.list.parentElement : this.list;
      ele.style.height = formatUnit(this.height);
      if (this.allowFiltering && this.height.toString().indexOf("%") < 0) {
        addClass([this.list], "e-filter-list");
      } else {
        removeClass([this.list], "e-filter-list");
      }
    };
    ListBox2.prototype.setCssClass = function() {
      var wrap = this.toolbarSettings.items.length ? this.list.parentElement : this.list;
      if (this.cssClass) {
        addClass([wrap], this.cssClass.replace(/\s+/g, " ").trim().split(" "));
      }
      if (this.enableRtl) {
        addClass([this.list], "e-rtl");
      }
    };
    ListBox2.prototype.setEnable = function() {
      var ele = this.toolbarSettings.items.length ? this.list.parentElement : this.list;
      if (this.enabled) {
        removeClass([ele], cssClass.disabled);
      } else {
        addClass([ele], cssClass.disabled);
      }
    };
    ListBox2.prototype.showSpinner = function() {
      if (!this.spinner) {
        this.spinner = this.createElement("div", { className: "e-listbox-wrapper" });
      }
      this.spinner.style.height = formatUnit(this.height);
      if (this.element.parentElement) {
        this.element.parentElement.insertBefore(this.spinner, this.element.nextSibling);
      }
      createSpinner({ target: this.spinner }, this.createElement);
      showSpinner(this.spinner);
    };
    ListBox2.prototype.hideSpinner = function() {
      if (this.spinner.querySelector(".e-spinner-pane")) {
        hideSpinner(this.spinner);
      }
      if (this.spinner.parentElement) {
        detach(this.spinner);
      }
    };
    ListBox2.prototype.onInput = function() {
      this.isDataSourceUpdate = false;
      if (this.keyDownStatus) {
        this.isValidKey = true;
      } else {
        this.isValidKey = false;
      }
      this.keyDownStatus = false;
      this.refreshClearIcon();
    };
    ListBox2.prototype.clearText = function() {
      this.filterInput.value = "";
      this.refreshClearIcon();
      var event2 = document.createEvent("KeyboardEvent");
      this.isValidKey = true;
      this.KeyUp(event2);
    };
    ListBox2.prototype.refreshClearIcon = function() {
      if (this.filterInput.parentElement.querySelector("." + listBoxClasses.clearIcon)) {
        var clearElement = this.filterInput.parentElement.querySelector("." + listBoxClasses.clearIcon);
        clearElement.style.visibility = this.filterInput.value === "" ? "hidden" : "visible";
      }
    };
    ListBox2.prototype.onActionComplete = function(ulElement, list, e) {
      var searchEle;
      var filterElem;
      var txtLength;
      if (this.allowFiltering && this.list.getElementsByClassName("e-filter-parent")[0]) {
        searchEle = this.list.getElementsByClassName("e-filter-parent")[0].cloneNode(true);
      }
      if (list.length === 0) {
        var noRecElem = ulElement.childNodes[0];
        if (noRecElem) {
          ulElement.removeChild(noRecElem);
        }
      }
      if (this.allowFiltering) {
        filterElem = this.list.getElementsByClassName("e-input-filter")[0];
        if (filterElem) {
          txtLength = filterElem.selectionStart;
        }
      }
      _super.prototype.onActionComplete.call(this, ulElement, list, e);
      if (this.allowFiltering && !isNullOrUndefined(searchEle)) {
        this.list.insertBefore(searchEle, this.list.firstElementChild);
        this.filterParent = this.list.getElementsByClassName("e-filter-parent")[0];
        this.filterWireEvents(searchEle);
        var inputSearch = searchEle.querySelector(".e-input-filter");
        if (inputSearch) {
          inputSearch.addEventListener("focus", function() {
            if (!searchEle.childNodes[0].classList.contains("e-input-focus")) {
              searchEle.childNodes[0].classList.add("e-input-focus");
            }
          });
          inputSearch.addEventListener("blur", function() {
            if (searchEle.childNodes[0].classList.contains("e-input-focus")) {
              searchEle.childNodes[0].classList.remove("e-input-focus");
            }
          });
        }
      }
      this.initWrapper();
      this.setSelection(this.value, true, false, !this.isRendered);
      this.initDraggable();
      this.mainList = this.ulElement;
      if (this.initLoad) {
        this.jsonData = [];
        extend(this.jsonData, list, []);
        this.initToolbarAndStyles();
        this.wireEvents();
        if (this.showCheckbox) {
          this.setCheckboxPosition();
        }
        if (this.allowFiltering) {
          this.setFiltering();
        }
      } else {
        if (this.isDataSourceUpdate) {
          this.jsonData = [];
          extend(this.jsonData, list, []);
          this.isDataSourceUpdate = false;
        }
        if (this.allowFiltering) {
          filterElem = this.list.getElementsByClassName("e-input-filter")[0];
          filterElem.selectionStart = txtLength;
          filterElem.selectionEnd = txtLength;
          if (filterElem.value !== "") {
            filterElem.focus();
          }
        }
      }
      if (this.toolbarSettings.items.length && this.scope && this.scope.indexOf("#") > -1 && !isNullOrUndefined(e)) {
        var scope = this.scope.replace("#", "");
        var scopedLB = getComponent(document.getElementById(scope), this.getModuleName());
        scopedLB.initToolbar();
      }
      this.initLoad = false;
    };
    ListBox2.prototype.initToolbarAndStyles = function() {
      this.initToolbar();
      this.setCssClass();
      this.setEnable();
      this.setHeight();
    };
    ListBox2.prototype.triggerDragStart = function(args) {
      var _this = this;
      var badge;
      args = extend(this.getDragArgs(args), { dragSelected: true });
      if (Browser.isIos) {
        this.list.style.overflow = "hidden";
      }
      this.trigger("dragStart", args, function(dragEventArgs) {
        _this.allowDragAll = dragEventArgs.dragSelected;
        if (!_this.allowDragAll) {
          badge = _this.ulElement.getElementsByClassName("e-list-badge")[0];
          if (badge) {
            detach(badge);
          }
        }
      });
    };
    ListBox2.prototype.triggerDrag = function(args) {
      var _this = this;
      var scrollParent;
      var boundRect;
      var scrollMoved = 36;
      var scrollHeight = 10;
      if (this.itemTemplate && args.target) {
        if (args.target && args.target.closest(".e-list-item")) {
          scrollHeight = args.target.closest(".e-list-item").scrollHeight;
        } else {
          var listItem = args.element.querySelector(".e-list-item");
          if (listItem) {
            scrollHeight = listItem.scrollHeight;
          }
        }
      }
      var event2 = args.event;
      var wrapper;
      this.stopTimer();
      if (args.target && (args.target.classList.contains("e-listbox-wrapper") || args.target.classList.contains("e-list-item") || args.target.classList.contains("e-filter-parent") || args.target.classList.contains("e-input-group") || args.target.closest(".e-list-item"))) {
        if (args.target.classList.contains("e-list-item") || args.target.classList.contains("e-filter-parent") || args.target.classList.contains("e-input-group") || args.target.closest(".e-list-item")) {
          wrapper = args.target.closest(".e-listbox-wrapper");
        } else {
          wrapper = args.target;
        }
        if (this.allowFiltering) {
          scrollParent = wrapper.querySelector(".e-list-parent");
        } else {
          scrollParent = wrapper;
        }
        if (scrollParent) {
          boundRect = scrollParent.getBoundingClientRect();
          if (boundRect.y + scrollParent.offsetHeight - (event2.clientY + scrollMoved) < 1) {
            this.timer = window.setInterval(function() {
              _this.setScrollDown(scrollParent, scrollHeight, true);
            }, 70);
          } else if (event2.clientY - scrollMoved - boundRect.y < 1) {
            this.timer = window.setInterval(function() {
              _this.setScrollDown(scrollParent, scrollHeight, false);
            }, 70);
          }
        }
      }
      if (args.target === null) {
        return;
      }
      this.trigger("drag", this.getDragArgs(args));
    };
    ListBox2.prototype.setScrollDown = function(scrollElem, scrollPixel, isScrollDown) {
      if (isScrollDown) {
        scrollElem.scrollTop = scrollElem.scrollTop + scrollPixel;
      } else {
        scrollElem.scrollTop = scrollElem.scrollTop - scrollPixel;
      }
    };
    ListBox2.prototype.stopTimer = function() {
      window.clearInterval(this.timer);
    };
    ListBox2.prototype.beforeDragEnd = function(args) {
      this.stopTimer();
      var items = [];
      this.dragValue = this.getFormattedValue(args.droppedElement.getAttribute("data-value"));
      if (this.value.indexOf(this.dragValue) > -1) {
        args.items = this.getDataByValues(this.value);
      } else {
        args.items = this.getDataByValues([this.dragValue]);
      }
      extend(items, args.items);
      this.trigger("beforeDrop", args);
      if (args.items !== items) {
        this.customDraggedItem = args.items;
      }
    };
    ListBox2.prototype.dragEnd = function(args) {
      var _this = this;
      var listData;
      var liColl;
      var jsonData;
      var droppedData;
      var selectedOptions;
      var sortedData;
      var dropValue = this.getFormattedValue(args.droppedElement.getAttribute("data-value"));
      var listObj = this.getComponent(args.droppedElement);
      var getArgs = this.getDragArgs({ target: args.droppedElement }, true);
      var sourceArgs = { previousData: this.dataSource };
      var destArgs = { previousData: listObj.dataSource };
      var dragArgs = extend({}, getArgs, {
        target: args.target,
        source: { previousData: this.dataSource },
        previousIndex: args.previousIndex,
        currentIndex: args.currentIndex
      });
      if (listObj !== this) {
        var sourceArgs1 = extend(sourceArgs, { currentData: this.listData });
        dragArgs = extend(dragArgs, { source: sourceArgs1, destination: destArgs });
      }
      if (Browser.isIos) {
        this.list.style.overflow = "";
      }
      var targetListObj = this.getComponent(args.target);
      if (targetListObj && targetListObj.listData.length === 0) {
        var noRecElem = targetListObj.ulElement.childNodes[0];
        if (noRecElem) {
          targetListObj.ulElement.removeChild(noRecElem);
        }
      }
      if (listObj === this) {
        var ul_1 = this.ulElement;
        listData = [].slice.call(this.listData);
        liColl = [].slice.call(this.liCollections);
        jsonData = [].slice.call(this.jsonData);
        sortedData = [].slice.call(this.sortedData);
        var toSortIdx_1 = args.currentIndex;
        var toIdx_1 = args.currentIndex = this.getCurIdx(this, args.currentIndex);
        var rIdx = listData.indexOf(this.getDataByValue(dropValue));
        var jsonIdx = jsonData.indexOf(this.getDataByValue(dropValue));
        var sIdx = sortedData.indexOf(this.getDataByValue(dropValue));
        listData.splice(toIdx_1, 0, listData.splice(rIdx, 1)[0]);
        sortedData.splice(toSortIdx_1, 0, sortedData.splice(sIdx, 1)[0]);
        jsonData.splice(toIdx_1, 0, jsonData.splice(jsonIdx, 1)[0]);
        liColl.splice(toIdx_1, 0, liColl.splice(rIdx, 1)[0]);
        if (this.allowDragAll) {
          selectedOptions = this.value && Array.prototype.indexOf.call(this.value, dropValue) > -1 ? this.value : [dropValue];
          if (!isNullOrUndefined(this.customDraggedItem)) {
            selectedOptions = [];
            this.customDraggedItem.forEach(function(item) {
              selectedOptions.push(getValue(_this.fields.value, item));
            });
          }
          selectedOptions.forEach(function(value) {
            if (value !== dropValue) {
              var idx = listData.indexOf(_this.getDataByValue(value));
              var jsonIdx_1 = jsonData.indexOf(_this.getDataByValue(value));
              var sIdx_1 = sortedData.indexOf(_this.getDataByValue(value));
              if (idx > toIdx_1) {
                toIdx_1++;
              }
              jsonData.splice(toIdx_1, 0, jsonData.splice(jsonIdx_1, 1)[0]);
              listData.splice(toIdx_1, 0, listData.splice(idx, 1)[0]);
              sortedData.splice(toSortIdx_1, 0, sortedData.splice(sIdx_1, 1)[0]);
              liColl.splice(toIdx_1, 0, liColl.splice(idx, 1)[0]);
              ul_1.insertBefore(_this.getItems()[_this.getIndexByValue(value)], ul_1.getElementsByClassName("e-placeholder")[0]);
            }
          });
        }
        this.listData = listData;
        this.jsonData = jsonData;
        this.sortedData = sortedData;
        this.liCollections = liColl;
      } else {
        var li_1;
        var fLiColl_1 = [].slice.call(this.liCollections);
        var currIdx_1 = args.currentIndex = this.getCurIdx(listObj, args.currentIndex);
        var ul_2 = listObj.ulElement;
        listData = [].slice.call(listObj.listData);
        liColl = [].slice.call(listObj.liCollections);
        jsonData = [].slice.call(listObj.jsonData);
        sortedData = [].slice.call(listObj.sortedData);
        selectedOptions = this.value && Array.prototype.indexOf.call(this.value, dropValue) > -1 && this.allowDragAll ? this.value : [dropValue];
        if (!isNullOrUndefined(this.customDraggedItem)) {
          selectedOptions = [];
          this.customDraggedItem.forEach(function(item) {
            selectedOptions.push(getValue(_this.fields.value, item));
          });
        }
        var fListData_1 = [].slice.call(this.listData);
        var fSortData_1 = [].slice.call(this.sortedData);
        selectedOptions.forEach(function(value) {
          droppedData = _this.getDataByValue(value);
          var srcIdx = _this.listData.indexOf(droppedData);
          var jsonSrcIdx = _this.jsonData.indexOf(droppedData);
          var sortIdx = _this.sortedData.indexOf(droppedData);
          fListData_1.splice(srcIdx, 1);
          _this.jsonData.splice(jsonSrcIdx, 1);
          fSortData_1.splice(sortIdx, 1);
          _this.listData = fListData_1;
          _this.sortedData = fSortData_1;
          var destIdx = value === dropValue ? args.currentIndex : currIdx_1;
          listData.splice(destIdx, 0, droppedData);
          jsonData.splice(destIdx, 0, droppedData);
          sortedData.splice(destIdx, 0, droppedData);
          liColl.splice(destIdx, 0, fLiColl_1.splice(srcIdx, 1)[0]);
          if (!value) {
            var liCollElem_1 = _this.getItems();
            for (var i2 = 0; i2 < liCollElem_1.length; i2++) {
              if (liCollElem_1[i2].getAttribute("data-value") === null && liCollElem_1[i2].classList.contains("e-list-item")) {
                li_1 = liCollElem_1[i2];
                break;
              }
            }
          } else {
            li_1 = _this.getItems()[_this.getIndexByValue(value)];
          }
          if (!li_1) {
            li_1 = args.helper;
          }
          _this.removeSelected(_this, value === dropValue ? [args.droppedElement] : [li_1]);
          ul_2.insertBefore(li_1, ul_2.getElementsByClassName("e-placeholder")[0]);
          currIdx_1++;
        });
        if (this.fields.groupBy) {
          var sourceElem = this.renderItems(this.listData, this.fields);
          this.updateListItems(sourceElem, this.ulElement);
          this.setSelection();
        }
        if (listObj.sortOrder !== "None" || this.selectionSettings.showCheckbox !== listObj.selectionSettings.showCheckbox || listObj.fields.groupBy || listObj.itemTemplate || this.itemTemplate) {
          var sortable = getComponent(ul_2, "sortable");
          var sourceElem = listObj.renderItems(listData, listObj.fields);
          listObj.updateListItems(sourceElem, ul_2);
          this.setSelection();
          if (sortable.placeHolderElement) {
            ul_2.appendChild(sortable.placeHolderElement);
          }
          ul_2.appendChild(args.helper);
          listObj.setSelection();
        }
        this.liCollections = fLiColl_1;
        listObj.liCollections = liColl;
        listObj.jsonData = extend([], [], jsonData, false);
        listObj.listData = extend([], [], listData, false);
        listObj.sortedData = extend([], [], sortedData, false);
        if (this.listData.length === 0) {
          this.l10nUpdate();
        }
      }
      if (this === listObj) {
        var sourceArgs1 = extend(sourceArgs, { currentData: listData });
        dragArgs = extend(dragArgs, { source: sourceArgs1 });
      } else {
        var dragArgs1 = extend(destArgs, { currentData: listData });
        dragArgs = extend(dragArgs, { destination: dragArgs1 });
      }
      if (!isNullOrUndefined(this.customDraggedItem)) {
        dragArgs.items = this.customDraggedItem;
      }
      this.trigger("drop", dragArgs);
      var liCollElem = dragArgs.elements;
      if (liCollElem.length) {
        for (var i = 0; i < liCollElem.length; i++) {
          liCollElem[i].classList.remove("e-grabbed");
        }
      }
    };
    ListBox2.prototype.updateListItems = function(sourceElem, destElem) {
      destElem.innerHTML = "";
      destElem.append.apply(destElem, sourceElem.childNodes);
    };
    ListBox2.prototype.removeSelected = function(listObj, elems) {
      if (listObj.selectionSettings.showCheckbox) {
        elems.forEach(function(ele) {
          ele.getElementsByClassName("e-frame")[0].classList.remove("e-check");
        });
      } else {
        removeClass(elems, cssClass.selected);
      }
    };
    ListBox2.prototype.getCurIdx = function(listObj, idx) {
      if (listObj.fields.groupBy) {
        idx -= [].slice.call(listObj.ulElement.children).slice(0, idx).filter(function(ele) {
          return ele.classList.contains(cssClass.group);
        }).length;
      }
      return idx;
    };
    ListBox2.prototype.getComponent = function(li) {
      var listObj;
      var ele = this.element.tagName === "EJS-LISTBOX" ? closest(li, ".e-listbox") : closest(li, ".e-listbox-wrapper") && closest(li, ".e-listbox-wrapper").querySelector(".e-listbox");
      if (ele) {
        listObj = getComponent(ele, this.getModuleName());
      }
      return listObj;
    };
    ListBox2.prototype.setEnabled = function() {
      this.element.setAttribute("aria-disabled", this.enabled ? "false" : "true");
    };
    ListBox2.prototype.listOption = function(dataSource, fields) {
      this.listCurrentOptions = _super.prototype.listOption.call(this, dataSource, fields);
      this.listCurrentOptions = extend({}, this.listCurrentOptions, { itemCreated: this.triggerBeforeItemRender.bind(this) }, true);
      this.notify("listoption", { module: "CheckBoxSelection" });
      return this.listCurrentOptions;
    };
    ListBox2.prototype.triggerBeforeItemRender = function(e) {
      e.item.setAttribute("tabindex", "-1");
      this.trigger("beforeItemRender", { element: e.item, item: e.curData });
    };
    ListBox2.prototype.requiredModules = function() {
      var modules = [];
      if (this.selectionSettings.showCheckbox) {
        modules.push({
          member: "CheckBoxSelection",
          args: [this]
        });
      }
      return modules;
    };
    ListBox2.prototype.enableItems = function(items, enable, isValue) {
      var _this = this;
      if (enable === void 0) {
        enable = true;
      }
      var li;
      items.forEach(function(item) {
        var text = item;
        li = _this.findListElement(_this.list, "li", "data-value", isValue ? text : _this.getValueByText(text));
        if (!li) {
          return;
        }
        if (enable) {
          removeClass([li], cssClass.disabled);
          li.removeAttribute("aria-disabled");
        } else {
          addClass([li], cssClass.disabled);
          li.setAttribute("aria-disabled", "true");
        }
      });
    };
    ListBox2.prototype.selectItems = function(items, state, isValue) {
      if (state === void 0) {
        state = true;
      }
      if (state && !this.selectionSettings.showCheckbox && this.selectionSettings.mode === "Single") {
        this.getSelectedItems().forEach(function(li) {
          li.classList.remove("e-active");
          li.removeAttribute("aria-selected");
          removeClass([li], cssClass.selected);
        });
      }
      this.setSelection(items, state, !isValue);
      this.updateSelectedOptions();
      var selElems = [];
      for (var i = 0; i < items.length; i++) {
        var liColl = this.list.querySelectorAll('[aria-selected="true"]');
        for (var j = 0; j < liColl.length; j++) {
          if (items[i] === this.getFormattedValue(liColl[j].getAttribute("data-value"))) {
            selElems.push(liColl[j]);
          }
        }
      }
      this.triggerChange(selElems, null);
    };
    ListBox2.prototype.selectAll = function(state) {
      if (state === void 0) {
        state = true;
      }
      this.selectAllItems(state);
    };
    ListBox2.prototype.addItems = function(items, itemIndex) {
      _super.prototype.addItem.call(this, items, itemIndex);
      if (this.allowFiltering && this.filterInput.value !== "") {
        this.filteringAction(this.jsonData, new Query(), this.fields);
      }
    };
    ListBox2.prototype.removeItems = function(items, itemIndex) {
      this.removeItem(items, itemIndex);
    };
    ListBox2.prototype.removeItem = function(items, itemIndex) {
      var liCollections = [];
      var liElement = this.list.querySelectorAll("." + dropDownBaseClasses.li);
      if (items) {
        items = items instanceof Array ? items : [items];
        var fields = this.fields;
        var dataValue = void 0;
        var objValue = {};
        var dupData = [];
        extend(dupData, [], this.jsonData);
        var removeIdxes = [];
        var removeLiIdxes = [];
        for (var i = 0; i < dupData.length; i++) {
          var value = dupData[i] instanceof Object ? dupData[i][fields.value] : dupData[i].toString();
          objValue[value] = i;
        }
        for (var j = 0; j < items.length; j++) {
          dataValue = items[j] instanceof Object ? items[j][fields.value] : items[j].toString();
          if (objValue.hasOwnProperty(dataValue)) {
            var idx = objValue[dataValue];
            liCollections.push(liElement[idx]);
            removeIdxes.push(idx);
            removeLiIdxes.push(idx);
          }
        }
        for (var k = removeIdxes.length - 1; k >= 0; k--) {
          this.listData.splice(removeIdxes[k], 1);
        }
        for (var k = removeIdxes.length - 1; k >= 0; k--) {
          this.jsonData.splice(removeIdxes[k], 1);
        }
        for (var k = removeLiIdxes.length - 1; k >= 0; k--) {
          this.updateLiCollection(removeLiIdxes[k]);
        }
      } else {
        itemIndex = itemIndex ? itemIndex : 0;
        liCollections.push(liElement[itemIndex]);
        this.listData.splice(itemIndex, 1);
        this.jsonData.splice(itemIndex, 1);
        this.updateLiCollection(itemIndex);
      }
      for (var i = 0; i < liCollections.length; i++) {
        this.ulElement.removeChild(liCollections[i]);
      }
      if (this.listData.length === 0) {
        this.l10nUpdate();
      }
      if (this.listData.length !== this.sortedData.length) {
        this.sortedData = this.listData;
      }
      this.value = [];
      this.updateToolBarState();
    };
    ListBox2.prototype.getDataByValues = function(value) {
      var data = [];
      for (var i = 0; i < value.length; i++) {
        data.push(this.getDataByValue(value[i]));
      }
      return data;
    };
    ListBox2.prototype.moveUp = function(value) {
      var elem = value ? this.getElemByValue(value) : this.getSelectedItems();
      this.moveUpDown(true, false, elem);
    };
    ListBox2.prototype.moveDown = function(value) {
      var elem = value ? this.getElemByValue(value) : this.getSelectedItems();
      this.moveUpDown(false, false, elem);
    };
    ListBox2.prototype.moveTop = function(value) {
      var elem = value ? this.getElemByValue(value) : this.getSelectedItems();
      this.moveUpDown(null, false, elem, true);
    };
    ListBox2.prototype.moveBottom = function(value) {
      var elem = value ? this.getElemByValue(value) : this.getSelectedItems();
      this.moveUpDown(true, false, elem, false, true);
    };
    ListBox2.prototype.moveTo = function(value, index, targetId) {
      var elem = value ? this.getElemByValue(value) : this.getSelectedItems();
      var tlistbox = targetId ? getComponent(targetId, ListBox_1) : this.getScopedListBox();
      this.moveData(this, tlistbox, false, elem, index);
    };
    ListBox2.prototype.moveAllTo = function(targetId, index) {
      if (this.listData.length > 0) {
        var tlistbox = targetId ? getComponent(targetId, ListBox_1) : this.getScopedListBox();
        this.moveAllData(this, tlistbox, false, index);
      }
    };
    ListBox2.prototype.getDataList = function() {
      return this.jsonData;
    };
    ListBox2.prototype.getSortedList = function() {
      var sortData;
      var tempData;
      sortData = tempData = this.sortedData;
      if (this.fields.groupBy) {
        sortData = [];
        for (var i = 0; i < tempData.length; i++) {
          if (tempData[i].isHeader) {
            continue;
          }
          sortData.push(tempData[i]);
        }
      }
      return sortData;
    };
    ListBox2.prototype.getElemByValue = function(value) {
      var elem = [];
      for (var i = 0; i < value.length; i++) {
        elem.push(this.ulElement.querySelector('[data-value ="' + value[i] + '"]'));
      }
      return elem;
    };
    ListBox2.prototype.updateLiCollection = function(index) {
      var tempLi = [].slice.call(this.liCollections);
      tempLi.splice(index, 1);
      this.liCollections = tempLi;
    };
    ListBox2.prototype.selectAllItems = function(state, event2) {
      var _this = this;
      [].slice.call(this.getItems()).forEach(function(li) {
        if (!li.classList.contains(cssClass.disabled)) {
          if (_this.selectionSettings.showCheckbox) {
            var ele = li.getElementsByClassName("e-check")[0];
            if (!ele && state || ele && !state) {
              _this.notify("updatelist", { li, module: "listbox" });
              if (_this.maximumSelectionLength >= _this.list.querySelectorAll(".e-list-item span.e-check").length) {
                _this.checkMaxSelection();
              }
            }
          } else {
            if (state) {
              li.classList.add(cssClass.selected);
            } else {
              li.classList.remove(cssClass.selected);
            }
          }
        }
      });
      this.updateSelectedOptions();
      if (this.allowFiltering && this.selectionSettings.showCheckbox) {
        var liEle = this.list.getElementsByTagName("li");
        var index = 0;
        if (state) {
          var _loop_1 = function() {
            var dataValue1 = this_1.getFormattedValue(liEle[index].getAttribute("data-value"));
            if (!this_1.value.some(function(e) {
              return e === dataValue1;
            })) {
              this_1.value.push(this_1.getFormattedValue(liEle[index].getAttribute("data-value")));
            }
          };
          var this_1 = this;
          for (index = 0; index < liEle.length; index++) {
            _loop_1();
          }
        } else {
          var _loop_2 = function() {
            var dataValue2 = this_2.getFormattedValue(liEle[index].getAttribute("data-value"));
            this_2.value = this_2.value.filter(function(e) {
              return e !== dataValue2;
            });
          };
          var this_2 = this;
          for (index = 0; index < liEle.length; index++) {
            _loop_2();
          }
        }
        if (document.querySelectorAll("ul").length < 2) {
          this.updateMainList();
        }
      }
      this.triggerChange(this.getSelectedItems(), event2);
    };
    ListBox2.prototype.updateMainList = function() {
      var mainList = this.mainList.querySelectorAll(".e-list-item");
      var ulList = this.ulElement.querySelectorAll(".e-list-item");
      var mainCount = mainList.length;
      var ulEleCount = ulList.length;
      if (this.selectionSettings.showCheckbox || (document.querySelectorAll("ul").length > 1 || mainCount !== ulEleCount)) {
        var listindex = 0;
        var valueindex = 0;
        var count = 0;
        for (listindex; listindex < mainCount; ) {
          if (this.value) {
            for (valueindex; valueindex < this.value.length; valueindex++) {
              if (mainList[listindex].getAttribute("data-value") === this.value[valueindex]) {
                count++;
              }
            }
          }
          if (!count && this.selectionSettings.showCheckbox) {
            mainList[listindex].getElementsByClassName("e-frame")[0].classList.remove("e-check");
          }
          if (document.querySelectorAll("ul").length > 1 && count && mainCount !== ulEleCount) {
            this.mainList.removeChild(this.mainList.getElementsByTagName("li")[listindex]);
            listindex = 0;
          } else {
            listindex++;
          }
          count = 0;
          valueindex = 0;
        }
      }
    };
    ListBox2.prototype.wireEvents = function() {
      var form = closest(this.element, "form");
      var wrapper = this.element.tagName === "EJS-LISTBOX" ? this.element : this.list;
      EventHandler.add(this.list, "click", this.clickHandler, this);
      EventHandler.add(wrapper, "keydown", this.keyDownHandler, this);
      EventHandler.add(wrapper, "focusout", this.focusOutHandler, this);
      this.wireToolbarEvent();
      if (this.selectionSettings.showCheckbox) {
        EventHandler.remove(document, "mousedown", this.checkBoxSelectionModule.onDocumentClick);
      }
      if (this.fields.groupBy || this.element.querySelector("select>optgroup")) {
        EventHandler.remove(this.list, "scroll", this.setFloatingHeader);
      }
      if (form) {
        EventHandler.add(form, "reset", this.formResetHandler, this);
      }
      window.addEventListener("resize", this.resizeHandler.bind(this));
    };
    ListBox2.prototype.wireToolbarEvent = function() {
      if (this.toolbarSettings.items.length) {
        EventHandler.add(this.getToolElem(), "click", this.toolbarClickHandler, this);
      }
    };
    ListBox2.prototype.unwireEvents = function() {
      var form = closest(this.element, "form");
      var wrapper = this.element.tagName === "EJS-LISTBOX" ? this.element : this.list;
      EventHandler.remove(this.list, "click", this.clickHandler);
      EventHandler.remove(wrapper, "keydown", this.keyDownHandler);
      EventHandler.remove(wrapper, "focusout", this.focusOutHandler);
      if (this.allowFiltering && this.clearFilterIconElem) {
        EventHandler.remove(this.clearFilterIconElem, "click", this.clearText);
      }
      if (this.toolbarSettings.items.length) {
        EventHandler.remove(this.getToolElem(), "click", this.toolbarClickHandler);
      }
      if (form) {
        EventHandler.remove(form, "reset", this.formResetHandler);
      }
      window.removeEventListener("resize", this.resizeHandler.bind(this));
    };
    ListBox2.prototype.clickHandler = function(e) {
      var li = closest(e.target, ".e-list-item");
      if (isNullOrUndefined(li)) {
        return;
      }
      this.selectHandler(e);
    };
    ListBox2.prototype.checkSelectAll = function() {
      var searchCount = 0;
      var liItems = this.list.querySelectorAll("li." + dropDownBaseClasses.li);
      for (var i = 0; i < liItems.length; i++) {
        if (!liItems[i].classList.contains("e-disabled")) {
          searchCount++;
        }
      }
      var len = this.getSelectedItems().length;
      if (this.showSelectAll && searchCount) {
        this.notify("checkSelectAll", {
          module: "CheckBoxSelection",
          value: searchCount === len ? "check" : len === 0 ? "uncheck" : "indeterminate"
        });
      }
    };
    ListBox2.prototype.getQuery = function(query) {
      var filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
      if (this.allowFiltering) {
        var filterType = this.inputString === "" ? "contains" : this.filterType;
        var dataType = this.typeOfData(this.dataSource).typeof;
        if (dataType === null) {
          dataType = this.typeOfData(this.jsonData).typeof;
        }
        if (!(this.dataSource instanceof DataManager) && dataType === "string" || dataType === "number") {
          filterQuery.where("", filterType, this.inputString, this.ignoreCase, this.ignoreAccent);
        } else {
          var fields = this.fields.text ? this.fields.text : "";
          filterQuery.where(fields, filterType, this.inputString, this.ignoreCase, this.ignoreAccent);
        }
      } else {
        filterQuery = query ? query : this.query ? this.query : new Query();
      }
      return filterQuery;
    };
    ListBox2.prototype.setFiltering = function() {
      var filterInputObj;
      if (this.initLoad || isNullOrUndefined(this.filterParent)) {
        this.filterParent = this.createElement("span", {
          className: listBoxClasses.filterParent
        });
        this.filterInput = this.createElement("input", {
          attrs: { type: "text" },
          className: listBoxClasses.filterInput
        });
        this.element.parentNode.insertBefore(this.filterInput, this.element);
        filterInputObj = Input.createInput({
          element: this.filterInput,
          buttons: [listBoxClasses.filterBarClearIcon],
          properties: { placeholder: this.filterBarPlaceholder }
        }, this.createElement);
        append([filterInputObj.container], this.filterParent);
        prepend([this.filterParent], this.list);
        attributes(this.filterInput, {
          "aria-disabled": "false",
          "aria-label": "search list item",
          "autocomplete": "off",
          "autocorrect": "off",
          "autocapitalize": "off",
          "spellcheck": "false",
          "role": "textbox"
        });
        if (this.height.toString().indexOf("%") < 0) {
          addClass([this.list], "e-filter-list");
        } else if (this.height.toString().indexOf("%") > 0) {
          this.ulElement.style.height = this.ulElement.offsetHeight - this.filterParent.offsetHeight + "px";
        }
        this.inputString = this.filterInput.value;
        this.filterWireEvents();
        this.ulElement.style.setProperty("height", "calc(100% - " + this.filterParent.offsetHeight + "px)", "important");
        return filterInputObj;
      }
    };
    ListBox2.prototype.filterWireEvents = function(filterElem) {
      if (filterElem) {
        this.filterInput = filterElem.querySelector(".e-input-filter");
      }
      this.clearFilterIconElem = this.filterInput.parentElement.querySelector("." + listBoxClasses.clearIcon);
      if (this.clearFilterIconElem) {
        EventHandler.add(this.clearFilterIconElem, "click", this.clearText, this);
        if (!filterElem) {
          this.clearFilterIconElem.style.visibility = "hidden";
        }
      }
      EventHandler.add(this.filterInput, "input", this.onInput, this);
      EventHandler.add(this.filterInput, "keyup", this.KeyUp, this);
      EventHandler.add(this.filterInput, "keydown", this.onKeyDown, this);
    };
    ListBox2.prototype.selectHandler = function(e, isKey) {
      var isSelect = true;
      var currSelIdx;
      var li = closest(e.target, ".e-list-item");
      var selectedLi = [li];
      if (li && li.parentElement) {
        currSelIdx = [].slice.call(li.parentElement.children).indexOf(li);
        if (!this.selectionSettings.showCheckbox) {
          if ((e.ctrlKey || e.metaKey || Browser.isDevice) && this.isSelected(li)) {
            li.classList.remove(cssClass.selected);
            li.removeAttribute("aria-selected");
            isSelect = false;
          } else if (!(this.selectionSettings.mode === "Multiple" && (e.ctrlKey || e.metaKey || Browser.isDevice))) {
            this.getSelectedItems().forEach(function(ele) {
              ele.removeAttribute("aria-selected");
            });
            removeClass(this.getSelectedItems(), cssClass.selected);
          }
        } else {
          isSelect = !li.getElementsByClassName("e-frame")[0].classList.contains("e-check");
        }
        if (e.shiftKey && !this.selectionSettings.showCheckbox && this.selectionSettings.mode !== "Single") {
          selectedLi = [].slice.call(li.parentElement.children).slice(Math.min(currSelIdx, this.prevSelIdx), Math.max(currSelIdx, this.prevSelIdx) + 1).filter(function(ele) {
            return ele.classList.contains("e-list-item");
          });
        } else {
          this.prevSelIdx = [].slice.call(li.parentElement.children).indexOf(li);
        }
        if (isSelect) {
          if (!this.selectionSettings.showCheckbox) {
            addClass(selectedLi, cssClass.selected);
          }
          selectedLi.forEach(function(ele) {
            ele.setAttribute("aria-selected", "true");
          });
          this.list.setAttribute("aria-activedescendant", li.id);
        } else {
          selectedLi.forEach(function(ele) {
            ele.setAttribute("aria-selected", "false");
          });
        }
        if (!isKey && (this.maximumSelectionLength > (this.value && this.value.length) || !isSelect) && (this.maximumSelectionLength >= (this.value && this.value.length) || !isSelect) && !(this.maximumSelectionLength < (this.value && this.value.length))) {
          this.notify("updatelist", { li, e, module: "listbox" });
        }
        if (this.allowFiltering && !isKey) {
          var liDataValue_1 = this.getFormattedValue(li.getAttribute("data-value"));
          if (!isSelect) {
            this.value = this.value.filter(function(value1) {
              return value1 !== liDataValue_1;
            });
          } else {
            var values = [];
            extend(values, this.value);
            values.push(liDataValue_1);
            this.value = values;
          }
          if (document.querySelectorAll("ul").length < 2) {
            this.updateMainList();
          }
        }
        this.updateSelectedOptions();
        this.triggerChange(this.getSelectedItems(), e);
        if (this.list) {
          this.checkMaxSelection();
        }
      }
    };
    ListBox2.prototype.triggerChange = function(selectedLis, event2) {
      this.trigger("change", { elements: selectedLis, items: this.getDataByElements(selectedLis), value: this.value, event: event2 });
    };
    ListBox2.prototype.getDataByElems = function(elems) {
      var data = [];
      var len = elems.length;
      for (var i = 0; i < len; i++) {
        var elem = elems[i];
        var value = elem.getAttribute("data-value");
        var formattedValue = this.getFormattedValue(value);
        data.push(this.getDataByValue(formattedValue));
      }
      return data;
    };
    ListBox2.prototype.getDataByElements = function(elems) {
      var data = [];
      var value;
      var sIdx = 0;
      if (!isNullOrUndefined(this.listData)) {
        var type = this.typeOfData(this.listData).typeof;
        if (type === "string" || type === "number" || type === "boolean") {
          for (var _i = 0, _a = this.listData; _i < _a.length; _i++) {
            var item = _a[_i];
            for (var i = sIdx, len = elems.length; i < len; i++) {
              value = this.getFormattedValue(elems[i].getAttribute("data-value"));
              if (!isNullOrUndefined(item) && item === value) {
                sIdx = i;
                data.push(item);
                break;
              }
            }
            if (elems.length === data.length) {
              break;
            }
          }
        } else {
          for (var _b = 0, _c = this.listData; _b < _c.length; _b++) {
            var item = _c[_b];
            for (var i = sIdx, len = elems.length; i < len; i++) {
              value = this.getFormattedValue(elems[i].getAttribute("data-value"));
              if (!isNullOrUndefined(item) && getValue(this.fields.value ? this.fields.value : "value", item) === value) {
                sIdx = i;
                data.push(item);
                break;
              }
            }
            if (elems.length === data.length) {
              break;
            }
          }
        }
        return data;
      }
      return null;
    };
    ListBox2.prototype.checkMaxSelection = function() {
      var limit = this.list.querySelectorAll(".e-list-item span.e-check").length;
      if (this.selectionSettings.showCheckbox) {
        var index = 0;
        var liCollElem = this.list.getElementsByClassName("e-list-item");
        for (index; index < liCollElem.length; index++) {
          if (!liCollElem[index].querySelector(".e-frame.e-check")) {
            if (limit === this.maximumSelectionLength) {
              liCollElem[index].classList.add("e-disable");
            } else if (liCollElem[index].classList.contains("e-disable")) {
              liCollElem[index].classList.remove("e-disable");
            }
          }
        }
      }
    };
    ListBox2.prototype.toolbarClickHandler = function(e) {
      var btn = closest(e.target, "button");
      if (btn) {
        this.toolbarAction = btn.getAttribute("data-value");
        if (btn.disabled) {
          return;
        }
        switch (this.toolbarAction) {
          case "moveUp":
            this.moveUpDown(true);
            break;
          case "moveDown":
            this.moveUpDown();
            break;
          case "moveTo":
            this.moveItemTo();
            break;
          case "moveFrom":
            this.moveItemFrom();
            break;
          case "moveAllTo":
            this.moveAllItemTo();
            break;
          case "moveAllFrom":
            this.moveAllItemFrom();
            break;
          default:
            this.trigger("actionBegin", {
              cancel: false,
              items: this.getDataByElems(this.getSelectedItems()),
              eventName: this.toolbarAction
            });
            break;
        }
      }
    };
    ListBox2.prototype.moveUpDown = function(isUp, isKey, value, isTop, isBottom) {
      var _this = this;
      var elems = this.getSelectedItems();
      if (value) {
        elems = value;
      }
      if ((isUp && this.isSelected(this.ulElement.firstElementChild) || !isUp && this.isSelected(this.ulElement.lastElementChild)) && !value) {
        return;
      }
      var tempItems = this.getDataByElems(elems);
      var localDataArgs = { cancel: false, items: tempItems, eventName: this.toolbarAction };
      this.trigger("actionBegin", localDataArgs);
      if (localDataArgs.cancel) {
        return;
      }
      (isUp ? elems : elems.reverse()).forEach(function(ele) {
        var jsonToIdx = Array.prototype.indexOf.call(_this.ulElement.querySelectorAll(".e-list-item"), ele);
        var idx = Array.prototype.indexOf.call(_this.ulElement.children, ele);
        if (isTop) {
          moveTo(_this.ulElement, _this.ulElement, [idx], 0);
          _this.changeData(idx, 0, jsonToIdx, ele);
        } else if (isBottom) {
          moveTo(_this.ulElement, _this.ulElement, [idx], _this.ulElement.querySelectorAll(".e-list-item").length);
          _this.changeData(idx, _this.ulElement.querySelectorAll(".e-list-item").length, jsonToIdx, ele);
        } else {
          moveTo(_this.ulElement, _this.ulElement, [idx], isUp ? idx - 1 : idx + 2);
          _this.changeData(idx, isUp ? idx - 1 : idx + 1, isUp ? jsonToIdx - 1 : jsonToIdx + 1, ele);
        }
      });
      this.trigger("actionComplete", { items: tempItems, eventName: this.toolbarAction });
      elems[0].focus();
      if (!isKey && this.toolbarSettings.items.length) {
        this.getToolElem().querySelector("[data-value=" + (isUp ? "moveUp" : "moveDown") + "]").focus();
      }
      this.updateToolBarState();
    };
    ListBox2.prototype.moveItemTo = function() {
      this.moveData(this, this.getScopedListBox());
    };
    ListBox2.prototype.moveItemFrom = function() {
      this.moveData(this.getScopedListBox(), this);
    };
    ListBox2.prototype.moveData = function(fListBox, tListBox, isKey, value, index) {
      var idx = [];
      var dataIdx = [];
      var jsonIdx = [];
      var sortIdx = [];
      var listData = [].slice.call(fListBox.listData);
      var tListData = [].slice.call(tListBox.listData);
      var sortData = [].slice.call(fListBox.sortedData);
      var tSortData = [].slice.call(tListBox.sortedData);
      var fliCollections = [].slice.call(fListBox.liCollections);
      var dataLiIdx = [];
      var tliCollections = [].slice.call(tListBox.liCollections);
      var tempItems = [];
      var data = [];
      var elems = fListBox.getSelectedItems();
      if (value) {
        elems = value;
      }
      var isRefresh = tListBox.sortOrder !== "None" || tListBox.selectionSettings.showCheckbox !== fListBox.selectionSettings.showCheckbox || tListBox.fields.groupBy || tListBox.itemTemplate || fListBox.itemTemplate;
      fListBox.value = [];
      if (elems.length) {
        this.removeSelected(fListBox, elems);
        var ulChildren_1 = Array.prototype.slice.call(fListBox.ulElement.children);
        var listItems_1 = Array.prototype.slice.call(fListBox.ulElement.querySelectorAll(".e-list-item"));
        var lData_1 = fListBox.listData;
        var sData_1 = fListBox.sortedData;
        var jData_1 = fListBox.jsonData;
        var eData_1;
        var listDataMap_1 = {};
        if (elems.length > 199) {
          for (var _i = 0, _a = fListBox.listData; _i < _a.length; _i++) {
            var item = _a[_i];
            if (!isNullOrUndefined(item)) {
              var key = fListBox.getFormattedValue(getValue(fListBox.fields.value ? fListBox.fields.value : "value", item));
              listDataMap_1[key] = item;
            }
          }
        }
        elems.forEach(function(ele) {
          if (elems.length < 200) {
            eData_1 = fListBox.getDataByElems([ele])[0];
          } else {
            var value_1 = ele.getAttribute("data-value");
            var formattedValue = fListBox.getFormattedValue(value_1);
            eData_1 = listDataMap_1[formattedValue];
          }
          idx.push(ulChildren_1.indexOf(ele));
          dataLiIdx.push(listItems_1.indexOf(ele));
          dataIdx.push(lData_1.indexOf(eData_1));
          sortIdx.push(sData_1.indexOf(eData_1));
          jsonIdx.push(jData_1.indexOf(eData_1));
        });
        if (this.sortOrder !== "None") {
          sortIdx.forEach(function(i2) {
            tempItems.push(fListBox.sortedData[i2]);
          });
        } else {
          jsonIdx.forEach(function(i2) {
            tempItems.push(fListBox.jsonData[i2]);
          });
        }
        var localDataArgs = { cancel: false, items: tempItems, eventName: this.toolbarAction };
        fListBox.trigger("actionBegin", localDataArgs);
        if (localDataArgs.cancel) {
          return;
        }
        var rLiCollection_1 = [];
        dataLiIdx.sort(function(n1, n2) {
          return n1 - n2;
        }).reverse().forEach(function(i2) {
          rLiCollection_1.push(fliCollections.splice(i2, 1)[0]);
        });
        fListBox.liCollections = fliCollections;
        if (index) {
          var toColl = tliCollections.splice(0, index);
          tListBox.liCollections = toColl.concat(rLiCollection_1.reverse()).concat(tliCollections);
        } else {
          tListBox.liCollections = tliCollections.concat(rLiCollection_1.reverse());
        }
        if (tListBox.listData.length === 0) {
          var noRecElem = tListBox.ulElement.childNodes[0];
          if (noRecElem) {
            tListBox.ulElement.removeChild(noRecElem);
          }
        }
        dataIdx.sort(function(n1, n2) {
          return n2 - n1;
        }).forEach(function(i2) {
          listData.splice(i2, 1)[0];
        });
        sortIdx.sort(function(n1, n2) {
          return n2 - n1;
        }).forEach(function(i2) {
          sortData.splice(i2, 1)[0];
        });
        jsonIdx.slice().reverse().forEach(function(i2) {
          data.push(fListBox.jsonData.splice(i2, 1)[0]);
        });
        if (isRefresh) {
          if (fListBox.fields.groupBy) {
            var sourceElem = fListBox.renderItems(listData, fListBox.fields);
            fListBox.updateListItems(sourceElem, fListBox.ulElement);
          } else {
            elems.forEach(function(ele) {
              detach(ele);
            });
          }
        } else {
          moveTo(fListBox.ulElement, tListBox.ulElement, idx, index);
          fListBox.trigger("actionComplete", { items: tempItems, eventName: this.toolbarAction });
        }
        if (tListBox.mainList.childElementCount !== tListBox.jsonData.length) {
          tListBox.mainList = tListBox.ulElement;
        }
        var tJsonData = [].slice.call(tListBox.jsonData);
        tSortData = [].slice.call(tListBox.sortedData);
        this.selectNextList(elems, dataLiIdx, dataIdx, fListBox);
        if (isKey) {
          this.list.focus();
        }
        fListBox.listData = listData;
        fListBox.sortedData = sortData;
        index = index ? index : tListData.length;
        for (var i = tempItems.length - 1; i >= 0; i--) {
          tListData.splice(index, 0, tempItems[i]);
          tJsonData.splice(index, 0, tempItems[i]);
          tSortData.splice(index, 0, tempItems[i]);
        }
        tListBox.listData = tListData;
        tListBox.jsonData = tJsonData;
        tListBox.sortedData = tSortData;
        if (isRefresh) {
          var sourceElem = tListBox.renderItems(tListData, tListBox.fields);
          tListBox.updateListItems(sourceElem, tListBox.ulElement);
          tListBox.setSelection();
          fListBox.trigger("actionComplete", { items: tempItems, eventName: this.toolbarAction });
        }
        fListBox.updateSelectedOptions();
        if (fListBox.listData.length === 0) {
          fListBox.l10nUpdate();
        }
      }
      if (fListBox.value.length === 1 && fListBox.getSelectedItems().length) {
        fListBox.value[0] = fListBox.getFormattedValue(fListBox.getSelectedItems()[0].getAttribute("data-value"));
      }
    };
    ListBox2.prototype.selectNextList = function(elems, dataLiIdx, dataIdx, inst) {
      var childCnt = inst.ulElement.querySelectorAll(".e-list-item").length;
      var ele;
      var liIdx;
      var validIdx = -1;
      if (elems.length === 1 && childCnt && !inst.selectionSettings.showCheckbox) {
        liIdx = childCnt <= dataLiIdx[0] ? childCnt - 1 : dataLiIdx[0];
        ele = inst.ulElement.querySelectorAll(".e-list-item")[liIdx];
        validIdx = inst.getValidIndex(ele, liIdx, childCnt === dataIdx[0] ? 38 : 40);
        if (validIdx > -1) {
          inst.ulElement.querySelectorAll(".e-list-item")[validIdx].classList.add(cssClass.selected);
        }
      }
    };
    ListBox2.prototype.moveAllItemTo = function() {
      this.moveAllData(this, this.getScopedListBox());
    };
    ListBox2.prototype.moveAllItemFrom = function() {
      this.moveAllData(this.getScopedListBox(), this);
    };
    ListBox2.prototype.moveAllData = function(fListBox, tListBox, isKey, index) {
      var listData = [].slice.call(tListBox.listData);
      var jsonData = [].slice.call(tListBox.jsonData);
      var isRefresh = tListBox.sortOrder !== "None" || tListBox.selectionSettings.showCheckbox !== fListBox.selectionSettings.showCheckbox || tListBox.fields.groupBy || tListBox.itemTemplate || fListBox.itemTemplate;
      var tempLiColl = [];
      var tempData = [];
      var flistboxarray = [];
      this.removeSelected(fListBox, fListBox.getSelectedItems());
      var tempItems = [].slice.call(fListBox.listData);
      var localDataArgs = { cancel: false, items: tempItems, eventName: this.toolbarAction };
      fListBox.trigger("actionBegin", localDataArgs);
      if (localDataArgs.cancel) {
        return;
      }
      if (tListBox.listData.length === 0) {
        var noRecElem = tListBox.ulElement.childNodes[0];
        if (noRecElem) {
          tListBox.ulElement.removeChild(noRecElem);
        }
      }
      if (fListBox.listData.length > 0) {
        flistboxarray = Array.apply(null, { length: fListBox.ulElement.childElementCount }).map(Number.call, Number);
      }
      var childNodes = fListBox.ulElement.childNodes;
      var childElementCount = fListBox.ulElement.childElementCount;
      var newFlistboxArray = [];
      for (var i = 0; i < childElementCount; i++) {
        var childNode = childNodes[i];
        if (childNode.classList.contains("e-disabled")) {
          tempLiColl.push(childNode);
          tempData.push(fListBox.listData[i]);
        } else {
          newFlistboxArray.push(i);
        }
      }
      flistboxarray = newFlistboxArray;
      if (!isRefresh) {
        moveTo(fListBox.ulElement, tListBox.ulElement, flistboxarray, index);
        fListBox.trigger("actionComplete", { items: tempItems, eventName: this.toolbarAction });
      }
      if (isKey) {
        this.list.focus();
      }
      index = index ? index : listData.length;
      for (var i = 0; i < flistboxarray.length; i++) {
        listData.splice(index + i, 0, fListBox.listData[flistboxarray[i]]);
      }
      for (var i = 0; i < flistboxarray.length; i++) {
        jsonData.splice(index + i, 0, fListBox.jsonData[flistboxarray[i]]);
      }
      var fliCollections = [];
      if (tempLiColl.length > 0) {
        fListBox.liCollections = tempLiColl;
        fliCollections = [].slice.call(fListBox.liCollections);
      } else {
        fliCollections = [].slice.call(fListBox.liCollections);
        fListBox.liCollections = [];
      }
      var tliCollections = [].slice.call(tListBox.liCollections);
      if (index) {
        var toColl = tliCollections.splice(0, index);
        tListBox.liCollections = toColl.concat(fliCollections).concat(tliCollections);
      } else {
        tListBox.liCollections = tliCollections.concat(fliCollections);
      }
      fListBox.value = [];
      listData = listData.filter(function(data) {
        return data !== void 0;
      });
      listData = listData.filter(function(data) {
        return data.isHeader !== true;
      });
      var sortedData = listData.filter(function(val) {
        return tListBox.jsonData.indexOf(val) === -1;
      });
      for (var i = 0; i < sortedData.length; i++) {
        tListBox.jsonData.splice(index + i, 0, sortedData[i]);
      }
      tListBox.listData = listData;
      if (fListBox.listData.length === fListBox.jsonData.length) {
        fListBox.listData = fListBox.sortedData = fListBox.jsonData = tempData;
      } else if (fListBox.allowFiltering) {
        for (var i = 0; i < fListBox.listData.length; i++) {
          for (var j = 0; j < fListBox.jsonData.length; j++) {
            if (fListBox.listData[i] === fListBox.jsonData[j]) {
              fListBox.jsonData.splice(j, 1);
            }
          }
        }
        fListBox.listData = fListBox.sortedData = [];
      }
      if (isRefresh) {
        var sourceElem = tListBox.renderItems(listData, tListBox.fields);
        tListBox.updateListItems(sourceElem, tListBox.ulElement);
        fListBox.trigger("actionComplete", { items: tempItems, eventName: this.toolbarAction });
      } else {
        tListBox.sortedData = listData;
      }
      fListBox.updateSelectedOptions();
      if (tempLiColl.length > 0) {
        var wrap = this.list.parentElement.getElementsByClassName("e-listbox-tool")[0];
        var btn = wrap.querySelector('[data-value="' + this.toolbarAction + '"]');
        btn.disabled = true;
      }
      if (fListBox.listData.length === 0) {
        fListBox.l10nUpdate();
      }
    };
    ListBox2.prototype.changeData = function(fromIdx, toIdx, jsonToIdx, ele) {
      var listData = [].slice.call(this.listData);
      var jsonData = [].slice.call(this.jsonData);
      var sortData = [].slice.call(this.sortedData);
      var jsonIdx = Array.prototype.indexOf.call(this.jsonData, this.getDataByElems([ele])[0]);
      var sortIdx = Array.prototype.indexOf.call(this.sortedData, this.getDataByElems([ele])[0]);
      var liColl = [].slice.call(this.liCollections);
      listData.splice(toIdx, 0, listData.splice(fromIdx, 1)[0]);
      jsonData.splice(jsonToIdx, 0, jsonData.splice(jsonIdx, 1)[0]);
      sortData.splice(toIdx, 0, sortData.splice(sortIdx, 1)[0]);
      liColl.splice(toIdx, 0, liColl.splice(fromIdx, 1)[0]);
      this.listData = listData;
      this.jsonData = jsonData;
      this.liCollections = liColl;
      this.sortedData = sortData;
    };
    ListBox2.prototype.getSelectedItems = function() {
      var ele = [];
      if (this.selectionSettings.showCheckbox) {
        [].slice.call(this.ulElement.getElementsByClassName("e-check")).forEach(function(cbox) {
          ele.push(closest(cbox, ".e-list-item"));
        });
      } else {
        ele = [].slice.call(this.ulElement.getElementsByClassName(cssClass.selected));
      }
      return ele;
    };
    ListBox2.prototype.getScopedListBox = function() {
      var _this = this;
      var listObj;
      if (this.scope) {
        [].slice.call(document.querySelectorAll(this.scope)).forEach(function(ele) {
          if (getComponent(ele, _this.getModuleName())) {
            listObj = getComponent(ele, _this.getModuleName());
          }
        });
      }
      return listObj;
    };
    ListBox2.prototype.getGrabbedItems = function(args) {
      var grabbItems = false;
      for (var i = 0; i < this.value.length; i++) {
        if (this.value[i] === this.getFormattedValue(args.target.getAttribute("data-value"))) {
          grabbItems = true;
          break;
        }
      }
      if (grabbItems) {
        for (var i = 0; i < this.value.length; i++) {
          var liColl = this.list.querySelectorAll('[aria-selected="true"]');
          for (var j = 0; j < liColl.length; j++) {
            if (this.value[i] === this.getFormattedValue(liColl[j].getAttribute("data-value"))) {
              liColl[j].classList.add("e-grabbed");
            }
          }
        }
      }
      var elems;
      if (this.isAngular) {
        elems = Array.prototype.slice.call(this.element.getElementsByClassName("e-list-parent")[0].querySelectorAll(".e-grabbed"));
      } else {
        elems = Array.prototype.slice.call(this.element.nextElementSibling.querySelectorAll(".e-grabbed"));
      }
      return elems;
    };
    ListBox2.prototype.getDragArgs = function(args, isDragEnd) {
      var elems = this.getGrabbedItems(args);
      if (elems.length) {
        if (isDragEnd) {
          elems.push(args.target);
        }
      } else {
        elems = [args.target];
      }
      return { elements: elems, event: args.event, items: this.getDataByElems(elems) };
    };
    ListBox2.prototype.onKeyDown = function(e) {
      this.keyDownHandler(e);
      e.stopPropagation();
    };
    ListBox2.prototype.keyDownHandler = function(e) {
      if ([32, 35, 36, 37, 38, 39, 40, 65].indexOf(e.keyCode) > -1 && (!this.allowFiltering || this.allowFiltering && e.target !== this.filterInput)) {
        if (e.target && e.target.className.indexOf("e-edit-template") > -1) {
          return;
        }
        e.preventDefault();
        if (e.keyCode === 32 && this.ulElement.children.length) {
          this.selectHandler({
            target: this.ulElement.getElementsByClassName("e-focused")[0],
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey
          });
        } else if (e.keyCode === 65 && e.ctrlKey) {
          this.selectAll();
        } else if ((e.keyCode === 38 || e.keyCode === 40) && e.ctrlKey && e.shiftKey) {
          this.moveUpDown(e.keyCode === 38 ? true : false, true);
        } else if ((this.toolbarSettings.items.length || this.tBListBox) && (e.keyCode === 39 || e.keyCode === 37) && e.ctrlKey) {
          var listObj = this.tBListBox || this.getScopedListBox();
          if (e.keyCode === 39) {
            if (e.shiftKey) {
              this.moveAllData(this, listObj, true);
            } else {
              this.moveData(this, listObj, true);
            }
          } else {
            if (e.shiftKey) {
              this.moveAllData(listObj, this, true);
            } else {
              this.moveData(listObj, this, true);
            }
          }
        } else if (e.keyCode !== 37 && e.keyCode !== 39 && e.code !== "KeyA") {
          this.upDownKeyHandler(e);
        }
      } else if (this.allowFiltering) {
        if (e.keyCode === 40 || e.keyCode === 38) {
          this.upDownKeyHandler(e);
        }
      }
    };
    ListBox2.prototype.upDownKeyHandler = function(e) {
      var ul = this.ulElement;
      var defaultIdx = e.keyCode === 40 || e.keyCode === 36 ? 0 : ul.childElementCount - 1;
      var fliIdx = defaultIdx;
      var fli = ul.getElementsByClassName("e-focused")[0] || ul.getElementsByClassName(cssClass.selected)[0];
      if (fli) {
        if (e.keyCode !== 35 && e.keyCode !== 36) {
          fliIdx = Array.prototype.indexOf.call(ul.children, fli);
          if (e.keyCode === 40) {
            fliIdx++;
          } else {
            fliIdx--;
          }
          if (fliIdx < 0 || fliIdx > ul.childElementCount - 1) {
            return;
          }
        }
        removeClass([fli], "e-focused");
      }
      var cli = ul.children[fliIdx];
      if (cli) {
        fliIdx = this.getValidIndex(cli, fliIdx, e.keyCode);
        if (fliIdx === -1) {
          addClass([fli], "e-focused");
          return;
        }
        ul.children[fliIdx].focus();
        ul.children[fliIdx].classList.add("e-focused");
        if (!e.ctrlKey || !this.selectionSettings.showCheckbox && e.shiftKey && (e.keyCode === 36 || e.keyCode === 35)) {
          this.selectHandler({ target: ul.children[fliIdx], ctrlKey: e.ctrlKey, shiftKey: e.shiftKey }, true);
        }
        if (this.selectionSettings.showCheckbox && e.ctrlKey && e.shiftKey && (e.keyCode === 36 || e.keyCode === 35)) {
          var selectedidx = Array.prototype.indexOf.call(ul.children, fli);
          var sidx = e.code === "Home" ? 0 : selectedidx;
          var eidx = e.code === "Home" ? selectedidx : ul.children.length - 1;
          for (var i = sidx; i <= eidx; i++) {
            var item = ul.children[i];
            this.notify("updatelist", { li: item, e: {
              target: this.ulElement.getElementsByClassName("e-focused")[0],
              ctrlKey: e.ctrlKey,
              shiftKey: e.shiftKey
            }, module: "listbox" });
          }
        }
      }
    };
    ListBox2.prototype.KeyUp = function(e) {
      var _this = this;
      if (this.allowFiltering && e.ctrlKey && e.keyCode === 65) {
        e.preventDefault();
        return;
      }
      var char = String.fromCharCode(e.keyCode);
      var isWordCharacter = char.match(/\w/);
      if (!isNullOrUndefined(isWordCharacter)) {
        this.isValidKey = true;
      }
      this.isValidKey = e.keyCode === 8 || e.keyCode === 46 || this.isValidKey;
      if (this.isValidKey) {
        this.isValidKey = false;
        switch (e.keyCode) {
          default:
            if (this.allowFiltering) {
              var eventArgsData_1 = {
                preventDefaultAction: false,
                text: this.targetElement(),
                updateData: function(dataSource, query, fields) {
                  if (eventArgsData_1.cancel) {
                    return;
                  }
                  _this.isFiltered = true;
                  _this.remoteFilterAction = true;
                  _this.dataUpdater(dataSource, query, fields);
                },
                event: e,
                cancel: false
              };
              this.trigger("filtering", eventArgsData_1, function(args) {
                _this.isDataFetched = false;
                if (args.cancel || _this.filterInput.value !== "" && _this.isFiltered) {
                  return;
                }
                if (!args.cancel && !_this.isCustomFiltering && !args.preventDefaultAction) {
                  _this.inputString = _this.filterInput.value;
                  _this.filteringAction(_this.jsonData, new Query(), _this.fields);
                  if (_this.toolbarSettings.items.length > 0) {
                    _this.updateToolBarState();
                  }
                }
                if (!_this.isFiltered && !_this.isCustomFiltering && !args.preventDefaultAction) {
                  _this.dataUpdater(_this.jsonData, new Query(), _this.fields);
                }
              });
            }
        }
      }
    };
    ListBox2.prototype.filter = function(dataSource, query, fields) {
      this.isCustomFiltering = true;
      this.filteringAction(dataSource, query, fields);
    };
    ListBox2.prototype.filteringAction = function(dataSource, query, fields) {
      this.resetList(dataSource, fields, query);
    };
    ListBox2.prototype.targetElement = function() {
      this.targetInputElement = this.list.getElementsByClassName("e-input-filter")[0];
      return this.targetInputElement.value;
    };
    ListBox2.prototype.dataUpdater = function(dataSource, query, fields) {
      this.isDataFetched = false;
      var backCommand = true;
      if (this.targetElement().trim() === "") {
        var list = this.mainList.cloneNode ? this.mainList.cloneNode(true) : this.mainList;
        if (backCommand) {
          this.remoteCustomValue = false;
          if (this.isAngular && this.itemTemplate) {
            list = this.renderItems(this.listData, fields);
          }
          this.onActionComplete(list, this.jsonData);
          this.notify("reOrder", { module: "CheckBoxSelection", enable: this.selectionSettings.showCheckbox, e: this });
        }
      } else {
        this.resetList(dataSource, fields, query);
      }
    };
    ListBox2.prototype.focusOutHandler = function() {
      var ele = this.list.getElementsByClassName("e-focused")[0];
      if (ele) {
        ele.classList.remove("e-focused");
      }
      if (this.allowFiltering) {
        this.refreshClearIcon();
      }
    };
    ListBox2.prototype.resizeHandler = function() {
      if (this.list && !(this.cssClass && this.cssClass.indexOf("e-horizontal-listbox") > -1)) {
        if (this.list.getElementsByClassName("e-filter-parent").length > 0 && this.allowFiltering) {
          this.ulElement.style.setProperty("height", "calc(100% - " + this.filterParent.offsetHeight + "px)", "important");
        }
      }
    };
    ListBox2.prototype.getValidIndex = function(cli, index, keyCode) {
      var cul = this.ulElement;
      if (cli.classList.contains("e-disabled") || cli.classList.contains(cssClass.group)) {
        if (keyCode === 40 || keyCode === 36) {
          index++;
        } else {
          index--;
        }
      }
      if (index < 0 || index === cul.childElementCount) {
        return -1;
      }
      cli = cul.childNodes[index];
      if (cli.classList.contains("e-disabled") || cli.classList.contains(cssClass.group)) {
        index = this.getValidIndex(cli, index, keyCode);
      }
      return index;
    };
    ListBox2.prototype.updateSelectedOptions = function() {
      var _this = this;
      var selectedOptions = [];
      var values = [];
      extend(values, this.value);
      this.getSelectedItems().forEach(function(ele) {
        if (!ele.classList.contains("e-grabbed")) {
          selectedOptions.push(_this.getFormattedValue(ele.getAttribute("data-value")));
        }
      });
      if (this.mainList.childElementCount === this.ulElement.childElementCount) {
        if (this.allowFiltering && this.selectionSettings.showCheckbox) {
          for (var i = 0; i < selectedOptions.length; i++) {
            if (values.indexOf(selectedOptions[i]) > -1) {
              continue;
            } else {
              values.push(selectedOptions[i]);
            }
          }
          this.setProperties({ value: values }, true);
        } else {
          this.setProperties({ value: selectedOptions }, true);
        }
      }
      this.updateSelectTag();
      this.updateToolBarState();
      if (this.tBListBox) {
        this.tBListBox.updateToolBarState();
      }
    };
    ListBox2.prototype.clearSelection = function(values) {
      var _this = this;
      if (values === void 0) {
        values = this.value;
      }
      if (this.selectionSettings.showCheckbox) {
        var dvalue_1;
        this.getSelectedItems().forEach(function(li) {
          dvalue_1 = _this.getFormattedValue(li.getAttribute("data-value"));
          if (values.indexOf(dvalue_1) < 0) {
            li.getElementsByClassName("e-check")[0].classList.remove("e-check");
            li.removeAttribute("aria-selected");
          }
        });
      }
    };
    ListBox2.prototype.setSelection = function(values, isSelect, isText, canFocus) {
      var _this = this;
      if (values === void 0) {
        values = this.value;
      }
      if (isSelect === void 0) {
        isSelect = true;
      }
      if (isText === void 0) {
        isText = false;
      }
      if (canFocus === void 0) {
        canFocus = true;
      }
      var li;
      var liselect;
      if (values) {
        values.forEach(function(value) {
          var text;
          if (isText) {
            text = _this.getValueByText(value);
          } else {
            text = value;
          }
          if (typeof text === "string") {
            text = text.split("\\").join("\\\\");
            li = _this.list.querySelector('[data-value="' + text.replace(/"/g, '\\"') + '"]');
          } else {
            li = _this.list.querySelector('[data-value="' + text + '"]');
          }
          if (li) {
            if (_this.selectionSettings.showCheckbox && !li.classList.contains("e-disabled")) {
              liselect = li.getElementsByClassName("e-frame")[0].classList.contains("e-check");
            } else {
              liselect = li.classList.contains("e-selected");
            }
            if (!isSelect && liselect || isSelect && !liselect && li) {
              if (_this.selectionSettings.showCheckbox && !li.classList.contains("e-disabled")) {
                _this.notify("updatelist", { li, module: "listbox" });
                if (canFocus) {
                  li.focus();
                }
              } else {
                if (isSelect && !li.classList.contains("e-disabled")) {
                  li.classList.add(cssClass.selected);
                  li.setAttribute("aria-selected", "true");
                  if (canFocus) {
                    li.focus();
                  }
                } else {
                  li.classList.remove(cssClass.selected);
                  li.removeAttribute("aria-selected");
                }
              }
            }
          }
        });
      }
      this.updateSelectTag();
    };
    ListBox2.prototype.updateSelectTag = function() {
      var ele = this.getSelectTag();
      var innerHTML = "";
      ele.innerHTML = "";
      if (this.value) {
        for (var i = 0, len = this.value.length; i < len; i++) {
          innerHTML += "<option selected>" + this.value[i] + "</option>";
        }
        ele.innerHTML += innerHTML;
        for (var i = 0, len = ele.childNodes.length; i < len; i++) {
          ele.childNodes[i].setAttribute("value", this.value[i].toString());
        }
      }
      this.checkSelectAll();
    };
    ListBox2.prototype.checkDisabledState = function(inst) {
      if (isNullOrUndefined(inst.ulElement)) {
        if (!isNullOrUndefined(this.dataSource) && isNullOrUndefined(this.dataSource.length)) {
          return false;
        } else {
          return true;
        }
      } else {
        return inst.ulElement.querySelectorAll("." + cssClass.li).length === 0;
      }
    };
    ListBox2.prototype.updateToolBarState = function() {
      var _this = this;
      if (this.toolbarSettings.items.length) {
        var listObj_1 = this.getScopedListBox();
        var wrap_1 = this.list.parentElement.getElementsByClassName("e-listbox-tool")[0];
        this.toolbarSettings.items.forEach(function(value) {
          var btn = wrap_1.querySelector('[data-value="' + value + '"]');
          switch (value) {
            case "moveAllTo":
              btn.disabled = _this.checkDisabledState(_this);
              break;
            case "moveAllFrom":
              btn.disabled = _this.checkDisabledState(listObj_1);
              break;
            case "moveFrom":
              btn.disabled = listObj_1.value && listObj_1.value.length ? false : true;
              break;
            case "moveUp":
              btn.disabled = _this.value && _this.value.length && !_this.isSelected(_this.ulElement.children[0]) ? false : true;
              break;
            case "moveDown":
              btn.disabled = _this.value && _this.value.length && !_this.isSelected(_this.ulElement.children[_this.ulElement.childElementCount - 1]) ? false : true;
              break;
            default:
              btn.disabled = _this.value && _this.value.length ? false : true;
              break;
          }
        });
      }
    };
    ListBox2.prototype.setCheckboxPosition = function() {
      var listWrap = this.list;
      if (!this.initLoad && this.selectionSettings.checkboxPosition === "Left") {
        listWrap.classList.remove("e-right");
      }
      if (this.selectionSettings.checkboxPosition === "Right") {
        listWrap.classList.add("e-right");
      }
    };
    ListBox2.prototype.showCheckbox = function(showCheckbox) {
      var index = 0;
      var liColl = this.list.lastElementChild.querySelectorAll("li");
      var liCollLen = this.list.lastElementChild.getElementsByClassName("e-list-item").length;
      if (showCheckbox) {
        this.ulElement = this.renderItems(this.listData, this.fields);
        this.mainList = this.ulElement;
        this.list.removeChild(this.list.getElementsByTagName("ul")[0]);
        this.list.appendChild(this.ulElement);
        if (this.selectionSettings.showSelectAll && !this.list.getElementsByClassName("e-selectall-parent")[0]) {
          var l10nShow = new L10n(this.getModuleName(), { selectAllText: "Select All", unSelectAllText: "Unselect All" }, this.locale);
          this.showSelectAll = true;
          this.selectAllText = l10nShow.getConstant("selectAllText");
          this.unSelectAllText = l10nShow.getConstant("unSelectAllText");
          this.popupWrapper = this.list;
          this.checkBoxSelectionModule.checkAllParent = null;
          this.notify("selectAll", {});
          this.checkSelectAll();
        }
      } else {
        if (this.list.getElementsByClassName("e-selectall-parent")[0]) {
          this.list.removeChild(this.list.getElementsByClassName("e-selectall-parent")[0]);
        }
        for (index; index < liCollLen; index++) {
          if (liColl[index].classList.contains("e-list-item")) {
            liColl[index].removeChild(liColl[index].getElementsByClassName("e-checkbox-wrapper")[0]);
          }
          if (liColl[index].hasAttribute("aria-selected")) {
            liColl[index].removeAttribute("aria-selected");
          }
        }
        this.mainList = this.ulElement;
      }
      this.value = [];
    };
    ListBox2.prototype.isSelected = function(ele) {
      if (!isNullOrUndefined(ele)) {
        return ele.classList.contains(cssClass.selected) || ele.querySelector(".e-check") !== null;
      } else {
        return false;
      }
    };
    ListBox2.prototype.getSelectTag = function() {
      return this.list.getElementsByClassName("e-hidden-select")[0];
    };
    ListBox2.prototype.getToolElem = function() {
      return this.list.parentElement.getElementsByClassName("e-listbox-tool")[0];
    };
    ListBox2.prototype.formResetHandler = function() {
      this.value = this.initialSelectedOptions;
    };
    ListBox2.prototype.getModuleName = function() {
      return "listbox";
    };
    ListBox2.prototype.getPersistData = function() {
      return this.addOnPersist(["value"]);
    };
    ListBox2.prototype.getLocaleName = function() {
      return "listbox";
    };
    ListBox2.prototype.destroy = function() {
      this.unwireEvents();
      if (this.element.tagName === "EJS-LISTBOX") {
        this.element.innerHTML = "";
      } else {
        this.element.style.display = "inline-block";
        if (this.toolbarSettings.items.length) {
          this.list.parentElement.parentElement.insertBefore(this.list, this.list.parentElement);
          detach(this.list.nextElementSibling);
        }
        this.list.parentElement.insertBefore(this.element, this.list);
      }
      _super.prototype.destroy.call(this);
      this.enableRtlElements = [];
      this.liCollections = null;
      this.list = null;
      this.ulElement = null;
      this.mainList = null;
      this.spinner = null;
      this.rippleFun = null;
      if (this.itemTemplate) {
        this.clearTemplate();
      }
    };
    ListBox2.prototype.onPropertyChanged = function(newProp, oldProp) {
      var wrap = this.toolbarSettings.items.length ? this.list.parentElement : this.list;
      _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
      this.setUpdateInitial(["fields", "query", "dataSource"], newProp);
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "cssClass":
            if (oldProp.cssClass) {
              removeClass([wrap], oldProp.cssClass.split(" "));
            }
            if (newProp.cssClass) {
              addClass([wrap], newProp.cssClass.replace(/\s+/g, " ").trim().split(" "));
            }
            break;
          case "enableRtl":
            if (newProp.enableRtl) {
              this.list.classList.add("e-rtl");
            } else {
              this.list.classList.remove("e-rtl");
            }
            break;
          case "value":
            removeClass(this.list.querySelectorAll("." + cssClass.selected), cssClass.selected);
            this.clearSelection(this.value);
            this.setSelection();
            break;
          case "height":
            this.setHeight();
            break;
          case "enabled":
            this.setEnable();
            break;
          case "allowDragAndDrop":
            if (newProp.allowDragAndDrop) {
              this.initDraggable();
            } else {
              if (this.ulElement.classList.contains("e-sortable")) {
                getComponent(this.ulElement, "sortable").destroy();
              }
            }
            break;
          case "allowFiltering":
            if (this.allowFiltering) {
              this.setFiltering();
            } else {
              this.list.removeChild(this.list.getElementsByClassName("e-filter-parent")[0]);
              this.filterParent = null;
              removeClass([this.list], "e-filter-list");
            }
            break;
          case "filterBarPlaceholder":
            if (this.allowFiltering) {
              if (this.filterInput) {
                Input.setPlaceholder(newProp.filterBarPlaceholder, this.filterInput);
              }
            }
            break;
          case "scope":
            if (this.allowDragAndDrop) {
              getComponent(this.ulElement, "sortable").scope = newProp.scope;
            }
            if (this.toolbarSettings.items.length) {
              if (oldProp.scope) {
                getComponent(document.querySelector(oldProp.scope), this.getModuleName()).tBListBox = null;
              }
              if (newProp.scope) {
                getComponent(document.querySelector(newProp.scope), this.getModuleName()).tBListBox = this;
              }
            }
            break;
          case "toolbarSettings": {
            var ele = void 0;
            var pos = newProp.toolbarSettings.position;
            var toolElem = this.getToolElem();
            if (pos) {
              removeClass([wrap], ["e-right", "e-left"]);
              wrap.classList.add("e-" + pos.toLowerCase());
              if (pos === "Left") {
                wrap.insertBefore(toolElem, this.list);
              } else {
                wrap.appendChild(toolElem);
              }
            }
            if (newProp.toolbarSettings.items) {
              oldProp.toolbarSettings.items = isNullOrUndefined(oldProp.toolbarSettings.items) ? [] : oldProp.toolbarSettings.items;
              if (oldProp.toolbarSettings && oldProp.toolbarSettings.items.length) {
                ele = this.list.parentElement;
                ele.parentElement.insertBefore(this.list, ele);
                detach(ele);
              }
              this.initToolbarAndStyles();
              this.wireToolbarEvent();
            }
            break;
          }
          case "selectionSettings": {
            var showSelectAll = newProp.selectionSettings.showSelectAll;
            var showCheckbox = newProp.selectionSettings.showCheckbox;
            if (!isNullOrUndefined(showSelectAll)) {
              this.showSelectAll = showSelectAll;
              if (this.showSelectAll) {
                var l10nSel = new L10n(this.getModuleName(), { selectAllText: "Select All", unSelectAllText: "Unselect All" }, this.locale);
                this.checkBoxSelectionModule.checkAllParent = null;
                this.showSelectAll = true;
                this.selectAllText = l10nSel.getConstant("selectAllText");
                this.unSelectAllText = l10nSel.getConstant("selectAllText");
                this.popupWrapper = this.list;
              }
              this.notify("selectAll", {});
              this.checkSelectAll();
            }
            if (!isNullOrUndefined(showCheckbox)) {
              this.showCheckbox(showCheckbox);
            }
            if (this.selectionSettings.showCheckbox) {
              this.setCheckboxPosition();
            }
            break;
          }
          case "dataSource":
            this.isDataSourceUpdate = true;
            this.jsonData = [].slice.call(this.dataSource);
            break;
        }
      }
    };
    var ListBox_1;
    __decorate10([
      Property("")
    ], ListBox2.prototype, "cssClass", void 0);
    __decorate10([
      Property([])
    ], ListBox2.prototype, "value", void 0);
    __decorate10([
      Property("")
    ], ListBox2.prototype, "height", void 0);
    __decorate10([
      Property(true)
    ], ListBox2.prototype, "enabled", void 0);
    __decorate10([
      Property(false)
    ], ListBox2.prototype, "enablePersistence", void 0);
    __decorate10([
      Property(false)
    ], ListBox2.prototype, "allowDragAndDrop", void 0);
    __decorate10([
      Property(1e3)
    ], ListBox2.prototype, "maximumSelectionLength", void 0);
    __decorate10([
      Property(false)
    ], ListBox2.prototype, "allowFiltering", void 0);
    __decorate10([
      Property("")
    ], ListBox2.prototype, "scope", void 0);
    __decorate10([
      Property(true)
    ], ListBox2.prototype, "ignoreCase", void 0);
    __decorate10([
      Property(null)
    ], ListBox2.prototype, "filterBarPlaceholder", void 0);
    __decorate10([
      Property("None")
    ], ListBox2.prototype, "sortOrder", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "beforeItemRender", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "filtering", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "select", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "change", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "beforeDrop", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "dragStart", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "drag", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "drop", void 0);
    __decorate10([
      Event()
    ], ListBox2.prototype, "dataBound", void 0);
    __decorate10([
      Property(null)
    ], ListBox2.prototype, "groupTemplate", void 0);
    __decorate10([
      Property("Request failed")
    ], ListBox2.prototype, "actionFailureTemplate", void 0);
    __decorate10([
      Property(1e3)
    ], ListBox2.prototype, "zIndex", void 0);
    __decorate10([
      Property(false)
    ], ListBox2.prototype, "ignoreAccent", void 0);
    __decorate10([
      Complex({}, ToolbarSettings)
    ], ListBox2.prototype, "toolbarSettings", void 0);
    __decorate10([
      Complex({}, SelectionSettings)
    ], ListBox2.prototype, "selectionSettings", void 0);
    ListBox2 = ListBox_1 = __decorate10([
      NotifyPropertyChanges
    ], ListBox2);
    return ListBox2;
  }(DropDownBase)
);
var listBoxClasses = {
  backIcon: "e-input-group-icon e-back-icon e-icons",
  filterBarClearIcon: "e-input-group-icon e-clear-icon e-icons",
  filterInput: "e-input-filter",
  filterParent: "e-filter-parent",
  clearIcon: "e-clear-icon"
};

// node_modules/@syncfusion/ej2-dropdowns/src/mention/mention.js
var __extends11 = /* @__PURE__ */ function() {
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
var __decorate11 = function(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    r = Reflect.decorate(decorators, target, key, desc);
  else
    for (var i = decorators.length - 1; i >= 0; i--)
      if (d = decorators[i])
        r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var Mention = (
  /** @class */
  function(_super) {
    __extends11(Mention2, _super);
    function Mention2(options, element) {
      return _super.call(this, options, element) || this;
    }
    Mention2.prototype.onPropertyChanged = function(newProp, oldProp) {
      for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
        var prop = _a[_i];
        switch (prop) {
          case "minLength":
            this.minLength = newProp.minLength;
            break;
          case "suffixText":
            this.suffixText = newProp.suffixText;
            break;
          case "allowSpaces":
            this.allowSpaces = newProp.allowSpaces;
            break;
          case "mentionChar":
            this.mentionChar = newProp.mentionChar;
            break;
          case "showMentionChar":
            this.showMentionChar = newProp.showMentionChar;
            break;
          case "cssClass":
            this.updateCssClass(newProp.cssClass, oldProp.cssClass);
            break;
        }
      }
    };
    Mention2.prototype.updateCssClass = function(newClass, oldClass) {
      if (!isNullOrUndefined(oldClass)) {
        oldClass = oldClass.replace(/\s+/g, " ").trim();
      }
      if (!isNullOrUndefined(newClass)) {
        newClass = newClass.replace(/\s+/g, " ").trim();
      }
      this.setCssClass(newClass, [this.inputElement], oldClass);
      if (this.popupObj) {
        this.setCssClass(newClass, [this.popupObj.element], oldClass);
      }
    };
    Mention2.prototype.setCssClass = function(cssClass2, elements, oldClass) {
      if (!isNullOrUndefined(oldClass) && oldClass !== "") {
        removeClass(elements, oldClass.split(" "));
      }
      if (!isNullOrUndefined(cssClass2) && cssClass2 !== "") {
        addClass(elements, cssClass2.split(" "));
      }
    };
    Mention2.prototype.initializeData = function() {
      this.isSelected = false;
      this.isFiltered = false;
      this.beforePopupOpen = false;
      this.initRemoteRender = false;
      this.isListResetted = false;
      this.isPopupOpen = false;
      this.isCollided = false;
      this.lineBreak = false;
      this.isRTE = false;
      this.keyEventName = "mousedown";
    };
    Mention2.prototype.preRender = function() {
      this.initializeData();
      _super.prototype.preRender.call(this);
    };
    Mention2.prototype.render = function() {
      var isSelector = typeof this.target === "string";
      this.inputElement = !isNullOrUndefined(this.target) ? this.checkAndUpdateInternalComponent(isSelector ? document.querySelector(this.target) : this.target) : this.element;
      if (this.isContentEditable(this.inputElement)) {
        this.inputElement.setAttribute("contenteditable", "true");
        addClass([this.inputElement], ["e-mention"]);
        if (isNullOrUndefined(this.target)) {
          addClass([this.inputElement], ["e-editable-element"]);
        }
      }
      this.inputElement.setAttribute("role", "textbox");
      this.inputElement.setAttribute("aria-label", "mention");
      this.queryString = this.elementValue();
      this.wireEvent();
    };
    Mention2.prototype.wireEvent = function() {
      EventHandler.add(this.inputElement, "keyup", this.onKeyUp, this);
      this.bindCommonEvent();
    };
    Mention2.prototype.unWireEvent = function() {
      EventHandler.remove(this.inputElement, "keyup", this.onKeyUp);
      this.unBindCommonEvent();
    };
    Mention2.prototype.bindCommonEvent = function() {
      if (!Browser.isDevice) {
        this.inputElement.addEventListener("keydown", this.keyDownHandler.bind(this), !this.isRTE);
      }
    };
    Mention2.prototype.hideSpinner = function() {
      this.hideWaitingSpinner();
    };
    Mention2.prototype.hideWaitingSpinner = function() {
      if (!isNullOrUndefined(this.spinnerElement)) {
        hideSpinner(this.spinnerElement);
      }
      if (!isNullOrUndefined(this.spinnerTemplate) && !isNullOrUndefined(this.spinnerTemplateElement)) {
        detach(this.spinnerTemplateElement);
      }
    };
    Mention2.prototype.checkAndUpdateInternalComponent = function(targetElement) {
      if (!this.isVue && targetElement.classList.contains("e-richtexteditor")) {
        return targetElement.querySelector(".e-content");
      }
      if (this.isVue && targetElement.nodeName === "TEXTAREA" && targetElement.classList.contains("e-rte-hidden")) {
        var parentElement = targetElement.parentElement;
        if (parentElement && parentElement.classList.contains("e-richtexteditor")) {
          return parentElement.querySelector(".e-content");
        }
      }
      if (targetElement && targetElement.parentElement && targetElement.parentElement.classList.contains("e-rte-content")) {
        this.isRTE = true;
        this.keyEventName = "click";
      }
      return targetElement;
    };
    Mention2.prototype.showWaitingSpinner = function() {
      if (!isNullOrUndefined(this.popupObj)) {
        if (isNullOrUndefined(this.spinnerTemplate) && isNullOrUndefined(this.spinnerElement)) {
          this.spinnerElement = this.popupObj.element;
          createSpinner({
            target: this.spinnerElement,
            width: Browser.isDevice ? "16px" : "14px"
          }, this.createElement);
          showSpinner(this.spinnerElement);
        }
        if (!isNullOrUndefined(this.spinnerTemplate)) {
          this.setSpinnerTemplate();
        }
      }
    };
    Mention2.prototype.keyDownHandler = function(e) {
      var isKeyAction = true;
      switch (e.keyCode) {
        case 38:
          e.action = e.altKey ? "hide" : "up";
          break;
        case 40:
          e.action = e.altKey ? "open" : "down";
          break;
        case 33:
          e.action = "pageUp";
          break;
        case 34:
          e.action = "pageDown";
          break;
        case 36:
          e.action = "home";
          break;
        case 35:
          e.action = "end";
          break;
        case 9:
          e.action = e.shiftKey ? "close" : "tab";
          break;
        case 27:
          e.action = "escape";
          break;
        case 32:
          e.action = "space";
          break;
        case 13:
          e.action = "enter";
          break;
        default:
          isKeyAction = false;
          break;
      }
      if (isKeyAction) {
        this.keyActionHandler(e);
      }
    };
    Mention2.prototype.keyActionHandler = function(e) {
      var isNavigation = e.action === "down" || e.action === "up" || e.action === "pageUp" || e.action === "pageDown" || e.action === "home" || e.action === "end";
      var isTabAction = e.action === "tab" || e.action === "close";
      if (this.list === void 0 && !this.isRequested && !isTabAction && e.action !== "escape" && e.action !== "space" && this.mentionChar.charCodeAt(0) === this.getLastLetter(this.getTextRange()).charCodeAt(0)) {
        this.renderList();
      }
      if (isNullOrUndefined(this.list) || !isNullOrUndefined(this.liCollections) && isNavigation && this.liCollections.length === 0 || this.isRequested) {
        return;
      }
      if (e.action === "escape") {
        e.preventDefault();
      }
      this.isSelected = e.action === "escape" ? false : this.isSelected;
      switch (e.action) {
        case "down":
        case "up":
          this.isUpDownKey = true;
          this.updateUpDownAction(e);
          break;
        case "tab":
          if (this.isPopupOpen) {
            e.preventDefault();
            var li = this.list.querySelector("." + dropDownBaseClasses.selected);
            if (li) {
              this.setSelection(li, e);
            }
            if (this.isPopupOpen) {
              this.hidePopup(e);
            }
          }
          break;
        case "enter":
          if (this.isPopupOpen) {
            e.preventDefault();
            if (this.popupObj && this.popupObj.element.contains(this.selectedLI)) {
              this.updateSelectedItem(this.selectedLI, e, false, true);
            }
          }
          break;
        case "escape":
          if (this.isPopupOpen) {
            this.hidePopup(e);
          }
          break;
      }
    };
    Mention2.prototype.updateUpDownAction = function(e) {
      if (this.fields.disabled && this.list && this.list.querySelectorAll(".e-list-item:not(.e-disabled)").length === 0) {
        return;
      }
      var focusEle = this.list.querySelector("." + dropDownBaseClasses.focus);
      if (this.isSelectFocusItem(focusEle)) {
        this.setSelection(focusEle, e);
      } else if (!isNullOrUndefined(this.liCollections)) {
        var li = this.list.querySelector("." + dropDownBaseClasses.selected);
        if (!isNullOrUndefined(li)) {
          var value = this.getFormattedValue(li.getAttribute("data-value"));
          this.activeIndex = this.getIndexByValue(value);
        }
        var index = e.action === "down" ? this.activeIndex + 1 : this.activeIndex - 1;
        var startIndex = 0;
        startIndex = e.action === "down" && isNullOrUndefined(this.activeIndex) ? 0 : this.liCollections.length - 1;
        index = index < 0 ? this.liCollections.length - 1 : index === this.liCollections.length ? 0 : index;
        var nextItem = isNullOrUndefined(this.activeIndex) ? this.liCollections[startIndex] : this.liCollections[index];
        if (!isNullOrUndefined(nextItem)) {
          this.setSelection(nextItem, e);
        }
      }
      var itemIndex;
      for (var index = 0; index < this.liCollections.length; index++) {
        if (this.liCollections[index].classList.contains(dropDownBaseClasses.focus) || this.liCollections[index].classList.contains(dropDownBaseClasses.selected)) {
          itemIndex = index;
          break;
        }
      }
      if (itemIndex != null && this.isDisabledElement(this.liCollections[itemIndex])) {
        this.updateUpDownAction(e);
      }
      if (this.isPopupOpen) {
        e.preventDefault();
      }
    };
    Mention2.prototype.isSelectFocusItem = function(element) {
      return !isNullOrUndefined(element);
    };
    Mention2.prototype.unBindCommonEvent = function() {
      if (!Browser.isDevice) {
        this.inputElement.removeEventListener("keydown", this.keyDownHandler.bind(this), !this.isRTE);
      }
    };
    Mention2.prototype.onKeyUp = function(e) {
      var rangetextContent;
      if (this.isUpDownKey && this.isPopupOpen && e.keyCode === 229) {
        this.isUpDownKey = false;
        return;
      }
      this.isTyped = e.code !== "Enter" && e.code !== "Space" && e.code !== "ArrowDown" && e.code !== "ArrowUp" ? true : false;
      var isRteImage = document.activeElement.parentElement && document.activeElement.parentElement.querySelector(".e-rte-image") ? true : false;
      if (document.activeElement != this.inputElement && !isRteImage) {
        this.inputElement.focus();
      }
      if (this.isContentEditable(this.inputElement)) {
        this.range = this.getCurrentRange();
        rangetextContent = this.range.startContainer.textContent.split("");
      }
      var currentRange = this.getTextRange();
      var lastWordRange = this.getLastLetter(currentRange);
      var lastTwoLetters = this.mentionChar.toString() + this.mentionChar.toString();
      var Regex = new RegExp(this.mentionChar.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"), "g");
      var charRegex = new RegExp("[a-zA-Z]", "g");
      if (e.key === "Shift" || e.keyCode === 37 || e.keyCode === 39) {
        return;
      }
      if (this.beforePopupOpen && this.isPopupOpen && lastWordRange == lastTwoLetters) {
        this.hidePopup();
        return;
      }
      if (!currentRange || !lastWordRange || e.code === "Enter" || e.keyCode === 27 || lastWordRange.match(Regex) && lastWordRange.match(Regex).length > 1 || this.isContentEditable(this.inputElement) && this.range.startContainer && this.range.startContainer.previousElementSibling && this.range.startContainer.previousElementSibling.tagName !== "BR" && this.range.startContainer.textContent.split("").length > 0 && (rangetextContent.length === 1 || rangetextContent[rangetextContent.length - 2].indexOf("") === -1 || this.range.startContainer.nodeType === 1)) {
        if (this.isPopupOpen && this.allowSpaces && currentRange && currentRange.trim() !== "" && charRegex.test(currentRange) && currentRange.indexOf(this.mentionChar) !== -1 && !this.isMatchedText() && (currentRange.length > 1 && currentRange.replace(/\u00A0/g, " ").charAt(currentRange.length - 2) !== " ") && (this.list && this.list.querySelectorAll("ul").length > 0) && e.code !== "Enter") {
          this.queryString = currentRange.substring(currentRange.lastIndexOf(this.mentionChar) + 1).replace(" ", " ");
          this.searchLists(e);
        } else if (this.isPopupOpen && (!this.allowSpaces || !lastWordRange) && (e.code !== "ArrowDown" && e.code !== "ArrowUp")) {
          this.hidePopup();
          this.lineBreak = true;
        }
        return;
      }
      if (lastWordRange.includes(this.mentionChar)) {
        this.queryString = lastWordRange.replace(this.mentionChar, "");
      }
      if (this.mentionChar.charCodeAt(0) === lastWordRange.charCodeAt(0) && this.queryString !== "" && e.keyCode !== 38 && e.keyCode !== 40 && !this.lineBreak) {
        this.searchLists(e);
        if (!this.isPopupOpen && this.queryString.length >= this.minLength) {
          if (!this.isContentEditable(this.inputElement)) {
            this.showPopup();
          } else if (this.isContentEditable(this.inputElement) && this.range && this.range.startContainer !== this.inputElement && e.keyCode !== 9) {
            this.showPopup();
          }
        }
      } else if (lastWordRange.indexOf(this.mentionChar) === 0 && !this.isPopupOpen && e.keyCode !== 8 && (!this.popupObj || (isNullOrUndefined(this.target) && !document.body.contains(this.popupObj.element) || !isNullOrUndefined(this.target) && document.body.contains(this.popupObj.element)))) {
        if (this.initRemoteRender && this.list && this.list.classList.contains("e-nodata")) {
          this.searchLists(e);
        }
        this.resetList(this.dataSource, this.fields);
        if (isNullOrUndefined(this.list)) {
          this.initValue();
        }
        if (!this.isPopupOpen && e.keyCode !== 38 && e.keyCode !== 40 && this.queryString.length >= this.minLength) {
          this.didPopupOpenByTypingInitialChar = true;
          this.showPopup();
          if (this.initRemoteRender && this.list.querySelectorAll("li").length === 0) {
            this.showWaitingSpinner();
          }
          this.lineBreak = false;
        }
      } else if (this.allowSpaces && this.queryString !== "" && currentRange && currentRange.trim() !== "" && currentRange.replace(" ", " ").lastIndexOf(" ") < currentRange.length - 1 && e.keyCode !== 38 && e.keyCode !== 40 && e.keyCode !== 8 && (this.mentionChar.charCodeAt(0) === lastWordRange.charCodeAt(0) || this.liCollections && this.liCollections.length > 0)) {
        this.queryString = currentRange.substring(currentRange.lastIndexOf(this.mentionChar) + 1).replace(" ", " ");
        this.searchLists(e);
      } else if (this.queryString === "" && this.isPopupOpen && e.keyCode !== 38 && e.keyCode !== 40 && this.mentionChar.charCodeAt(0) === lastWordRange.charCodeAt(0)) {
        this.searchLists(e);
        if (!this.isListResetted) {
          this.resetList(this.dataSource, this.fields);
        }
      }
      this.isListResetted = false;
    };
    Mention2.prototype.isMatchedText = function() {
      var isMatched = false;
      for (var i = 0; i < (this.liCollections && this.liCollections.length); i++) {
        if (this.getTextRange() && this.getTextRange().substring(this.getTextRange().lastIndexOf(this.mentionChar) + 1).replace(" ", " ").trim() === this.liCollections[i].getAttribute("data-value").toLowerCase()) {
          isMatched = true;
        }
      }
      return isMatched;
    };
    Mention2.prototype.getCurrentRange = function() {
      this.range = this.inputElement.ownerDocument.getSelection().getRangeAt(0);
      return this.range;
    };
    Mention2.prototype.searchLists = function(e) {
      var _this = this;
      this.isDataFetched = false;
      if (isNullOrUndefined(this.list)) {
        _super.prototype.render.call(this);
        this.unWireListEvents();
        this.wireListEvents();
      }
      if (e.type !== "mousedown" && (e.keyCode === 40 || e.keyCode === 38)) {
        this.queryString = this.queryString === "" ? null : this.queryString;
        this.beforePopupOpen = true;
        this.resetList(this.dataSource, this.fields);
        return;
      }
      this.isSelected = false;
      this.activeIndex = null;
      var eventArgs = {
        preventDefaultAction: false,
        text: this.queryString,
        updateData: function(dataSource, query, fields) {
          if (eventArgs.cancel) {
            return;
          }
          _this.isFiltered = true;
          _this.filterAction(dataSource, query, fields);
        },
        cancel: false
      };
      this.trigger("filtering", eventArgs, function(eventArgs2) {
        if (!eventArgs2.cancel && !_this.isFiltered && !eventArgs2.preventDefaultAction) {
          _this.filterAction(_this.dataSource, null, _this.fields);
        }
      });
    };
    Mention2.prototype.filterAction = function(dataSource, query, fields) {
      this.beforePopupOpen = true;
      if (this.queryString.length >= this.minLength) {
        this.resetList(dataSource, fields, query);
        this.isListResetted = true;
      } else {
        if (this.isPopupOpen) {
          this.hidePopup();
        }
        this.beforePopupOpen = false;
      }
      this.setDataIndex();
      this.renderReactTemplates();
    };
    Mention2.prototype.onActionComplete = function(ulElement, list, e, isUpdated) {
      _super.prototype.onActionComplete.call(this, ulElement, list, e);
      if (this.isActive) {
        if (!isNullOrUndefined(ulElement)) {
          attributes(ulElement, { "id": this.inputElement.id + "_options", "role": "listbox", "aria-hidden": "false" });
        }
        var focusItem = this.fields.disabled ? ulElement.querySelector("." + dropDownBaseClasses.li + ":not(.e-disabled)") : ulElement.querySelector("." + dropDownBaseClasses.li);
        if (focusItem) {
          focusItem.classList.add(dropDownBaseClasses.selected);
          this.selectedLI = focusItem;
          var value = this.getFormattedValue(focusItem.getAttribute("data-value"));
          this.selectEventCallback(focusItem, this.getDataByValue(value), value, true);
        }
        if (this.beforePopupOpen && this.isPopupOpen) {
          if (!isNullOrUndefined(this.popupObj.element)) {
            this.popupObj.element.remove();
          }
          this.renderPopup();
        }
      }
    };
    Mention2.prototype.setDataIndex = function() {
      for (var i = 0; this.liCollections && i < this.liCollections.length; i++) {
        this.liCollections[i].setAttribute("data-index", i.toString());
      }
    };
    Mention2.prototype.listOption = function(dataSource, fieldsSettings) {
      var _this = this;
      var fields = _super.prototype.listOption.call(this, dataSource, fieldsSettings);
      if (isNullOrUndefined(fields.itemCreated)) {
        fields.itemCreated = function(e) {
          if (_this.highlight) {
            if (_this.inputElement.tagName === _this.getNgDirective() && _this.itemTemplate) {
              setTimeout(function() {
                highlightSearch(e.item, _this.queryString, _this.ignoreCase, _this.filterType);
              }, 0);
            } else {
              highlightSearch(e.item, _this.queryString, _this.ignoreCase, _this.filterType);
            }
          }
        };
      } else {
        var itemCreated_1 = fields.itemCreated;
        fields.itemCreated = function(e) {
          if (_this.highlight) {
            highlightSearch(e.item, _this.queryString, _this.ignoreCase, _this.filterType);
          }
          itemCreated_1.apply(_this, [e]);
        };
      }
      return fields;
    };
    Mention2.prototype.elementValue = function() {
      if (!this.isContentEditable(this.inputElement)) {
        return this.inputElement.value.replace(this.mentionChar, "");
      } else {
        return this.inputElement.textContent.replace(this.mentionChar, "");
      }
    };
    Mention2.prototype.getQuery = function(query) {
      var filterQuery = query ? query.clone() : this.query ? this.query.clone() : new Query();
      var filterType = this.queryString === "" && !isNullOrUndefined(this.elementValue()) ? "equal" : this.filterType;
      var queryString2 = this.queryString === "" && !isNullOrUndefined(this.elementValue()) ? this.elementValue() : this.queryString;
      if (this.isFiltered) {
        return filterQuery;
      }
      if (this.queryString !== null && this.queryString !== "") {
        var dataType = this.typeOfData(this.dataSource).typeof;
        if (!(this.dataSource instanceof DataManager) && dataType === "string" || dataType === "number") {
          filterQuery.where("", filterType, queryString2, this.ignoreCase, this.ignoreAccent);
        } else {
          var mapping = !isNullOrUndefined(this.fields.text) ? this.fields.text : "";
          filterQuery.where(mapping, filterType, queryString2, this.ignoreCase, this.ignoreAccent);
        }
      }
      if (!isNullOrUndefined(this.suggestionCount)) {
        if (this.suggestionCount !== 25) {
          for (var queryElements = 0; queryElements < filterQuery.queries.length; queryElements++) {
            if (filterQuery.queries[queryElements].fn === "onTake") {
              filterQuery.queries.splice(queryElements, 1);
            }
          }
        }
        filterQuery.take(this.suggestionCount);
      }
      return filterQuery;
    };
    Mention2.prototype.renderHightSearch = function() {
      if (this.highlight) {
        for (var i = 0; i < this.liCollections.length; i++) {
          var isHighlight = this.ulElement.querySelector(".e-active");
          if (!isHighlight) {
            revertHighlightSearch(this.liCollections[i]);
            highlightSearch(this.liCollections[i], this.queryString, this.ignoreCase, this.filterType);
          }
        }
      }
    };
    Mention2.prototype.getTextRange = function() {
      var text;
      if (!this.isContentEditable(this.inputElement)) {
        var component = this.inputElement;
        if (!isNullOrUndefined(component)) {
          var startPos = component.selectionStart;
          if (component.value && startPos >= 0) {
            text = component.value.substring(0, startPos);
          }
        }
      } else {
        if (this.range) {
          var selectedElem = this.range.startContainer;
          if (!isNullOrUndefined(selectedElem)) {
            var workingNodeContent = selectedElem.textContent;
            var selectStartOffset = this.range.startOffset;
            if (workingNodeContent && selectStartOffset >= 0) {
              text = workingNodeContent.substring(0, selectStartOffset);
            }
          }
        }
      }
      return text;
    };
    Mention2.prototype.getLastLetter = function(text) {
      if (isNullOrUndefined(text)) {
        return "";
      }
      var textValue = text.indexOf("​") > -1 ? text.replace(/\u200B/g, "").replace(/\u00A0/g, " ") : text.replace(/\u00A0/g, " ");
      var words = textValue.split(/\s+/);
      var wordCnt = words.length - 1;
      return words[wordCnt].trim();
    };
    Mention2.prototype.isContentEditable = function(element) {
      return element && element.nodeName !== "INPUT" && element.nodeName !== "TEXTAREA";
    };
    Mention2.prototype.showPopup = function() {
      this.beforePopupOpen = true;
      if (document.activeElement != this.inputElement) {
        this.inputElement.focus();
      }
      this.queryString = this.didPopupOpenByTypingInitialChar ? this.queryString : "";
      this.didPopupOpenByTypingInitialChar = false;
      if (this.isContentEditable(this.inputElement)) {
        this.range = this.getCurrentRange();
      }
      if (!this.isTyped) {
        this.resetList(this.dataSource, this.fields);
      }
      if (isNullOrUndefined(this.list)) {
        this.initValue();
      }
      this.renderPopup();
      attributes(this.inputElement, { "aria-activedescendant": this.selectedElementID });
      if (this.selectedElementID == null) {
        this.inputElement.removeAttribute("aria-activedescendant");
      }
    };
    Mention2.prototype.hidePopup = function(e) {
      this.removeSelection();
      this.closePopup(0, e);
    };
    Mention2.prototype.closePopup = function(delay, e) {
      var _this = this;
      if (!(this.popupObj && document.body.contains(this.popupObj.element) && this.beforePopupOpen)) {
        return;
      }
      EventHandler.remove(document, "mousedown", this.onDocumentClick);
      this.inputElement.removeAttribute("aria-owns");
      this.inputElement.removeAttribute("aria-activedescendant");
      this.beforePopupOpen = false;
      var animModel = {
        name: "FadeOut",
        duration: 100,
        delay: delay ? delay : 0
      };
      var popupInstance = this.popupObj;
      var eventArgs = { popup: popupInstance, cancel: false, animation: animModel, event: e || null };
      this.trigger("closed", eventArgs, function(eventArgs2) {
        if (!eventArgs2.cancel && _this.popupObj) {
          if (_this.isPopupOpen) {
            _this.popupObj.hide(new Animation(eventArgs2.animation));
          } else {
            _this.destroyPopup();
          }
        }
      });
    };
    Mention2.prototype.renderPopup = function() {
      var _this = this;
      var args = { cancel: false };
      this.trigger("beforeOpen", args, function(args2) {
        if (!args2.cancel) {
          var popupEle_1;
          if (isNullOrUndefined(_this.target)) {
            popupEle_1 = _this.createElement("div", {
              id: _this.inputElement.id + "_popup",
              className: "e-mention e-popup " + (_this.cssClass != null ? _this.cssClass : "")
            });
          } else {
            popupEle_1 = _this.element;
            if (_this.cssClass != null) {
              addClass([popupEle_1], _this.cssClass.split(" "));
            }
          }
          if (!isNullOrUndefined(_this.target)) {
            popupEle_1.id = _this.inputElement.id + "_popup";
          }
          _this.listHeight = formatUnit(_this.popupHeight);
          if (!isNullOrUndefined(_this.list.querySelector("li")) && !_this.initRemoteRender) {
            var li = _this.list.querySelector("." + dropDownBaseClasses.focus);
            if (!isNullOrUndefined(li)) {
              _this.selectedLI = li;
              var value = _this.getFormattedValue(li.getAttribute("data-value"));
              _this.selectEventCallback(li, _this.getDataByValue(value), value, true);
            }
          }
          append([_this.list], popupEle_1);
          if (_this.inputElement.parentElement) {
            var rteRootElement = _this.inputElement.parentElement.closest(".e-richtexteditor");
            if (rteRootElement && popupEle_1.firstElementChild && popupEle_1.firstElementChild.childElementCount > 0) {
              popupEle_1.firstElementChild.setAttribute("aria-owns", rteRootElement.id);
              addClass([popupEle_1], "e-rte-elements");
            }
          }
          if (!_this.popupObj || !document.body.contains(_this.popupObj.element) || !document.contains(popupEle_1) && isNullOrUndefined(_this.target)) {
            document.body.appendChild(popupEle_1);
          }
          var coordinates_1;
          popupEle_1.style.visibility = "hidden";
          _this.setHeight(popupEle_1);
          var offsetValue = 0;
          var left = 0;
          _this.initializePopup(popupEle_1, offsetValue, left);
          _this.checkCollision(popupEle_1);
          popupEle_1.style.visibility = "visible";
          var popupLeft_1 = popupEle_1.parentElement.offsetWidth - popupEle_1.offsetWidth;
          var popupHeight_1 = popupEle_1.offsetHeight;
          addClass([popupEle_1], ["e-mention", "e-popup", "e-popup-close"]);
          if (!isNullOrUndefined(_this.list)) {
            _this.unWireListEvents();
            _this.wireListEvents();
          }
          _this.selectedElementID = _this.selectedLI ? _this.selectedLI.id : null;
          attributes(_this.inputElement, { "aria-owns": _this.inputElement.id + "_options", "aria-activedescendant": _this.selectedElementID });
          if (_this.selectedElementID == null) {
            _this.inputElement.removeAttribute("aria-activedescendant");
          }
          var animModel = { name: "FadeIn", duration: 100 };
          _this.beforePopupOpen = true;
          var popupInstance = _this.popupObj;
          var eventArgs = { popup: popupInstance, cancel: false, animation: animModel };
          _this.trigger("opened", eventArgs, function(eventArgs2) {
            if (!eventArgs2.cancel) {
              _this.renderReactTemplates();
              if (_this.popupObj) {
                _this.popupObj.show(new Animation(eventArgs2.animation), _this.zIndex === 1e3 ? _this.inputElement : null);
              }
              if (isNullOrUndefined(_this.getTriggerCharPosition())) {
                return;
              }
              coordinates_1 = _this.getCoordinates(_this.inputElement, _this.getTriggerCharPosition());
              if (!_this.isCollided) {
                popupEle_1.style.cssText = "top: ".concat(coordinates_1.top.toString(), "px;\n left: ").concat(coordinates_1.left.toString(), "px;\nposition: absolute;\n display: block;");
              } else {
                if (_this.collision.length > 0 && _this.collision.indexOf("right") > -1 && _this.collision.indexOf("bottom") === -1) {
                  popupEle_1.style.cssText = "top: ".concat(coordinates_1.top.toString(), "px;\n left: ").concat(popupLeft_1.toString(), "px;\nposition: absolute;\n display: block;");
                } else if (_this.collision && _this.collision.length > 0 && _this.collision.indexOf("bottom") > -1 && _this.collision.indexOf("right") === -1) {
                  popupEle_1.style.left = formatUnit(coordinates_1.left);
                  popupEle_1.style.top = formatUnit(coordinates_1.top - parseInt(popupHeight_1.toString()));
                } else if (_this.collision && _this.collision.length > 0 && _this.collision.indexOf("bottom") > -1 && _this.collision.indexOf("right") > -1) {
                  popupEle_1.style.left = formatUnit(popupLeft_1);
                  popupEle_1.style.top = formatUnit(coordinates_1.top - parseInt(popupHeight_1.toString()));
                } else {
                  popupEle_1.style.left = formatUnit(coordinates_1.left);
                  popupEle_1.style.top = formatUnit(coordinates_1.top - parseInt(_this.popupHeight.toString()));
                }
                _this.isCollided = false;
                _this.collision = [];
              }
              popupEle_1.style.width = _this.popupWidth !== "100%" && !isNullOrUndefined(_this.popupWidth) ? formatUnit(_this.popupWidth) : "auto";
              _this.setHeight(popupEle_1);
              popupEle_1.style.zIndex = _this.zIndex === 1e3 ? getZindexPartial(popupEle_1).toString() : _this.zIndex.toString();
            } else {
              _this.beforePopupOpen = false;
              _this.destroyPopup();
            }
          });
        } else {
          _this.beforePopupOpen = false;
        }
      });
    };
    Mention2.prototype.setHeight = function(popupEle) {
      if (this.popupHeight !== "auto" && this.list) {
        this.list.style.maxHeight = (parseInt(this.listHeight, 10) - 2).toString() + "px";
        popupEle.style.maxHeight = formatUnit(this.popupHeight);
      } else {
        popupEle.style.height = "auto";
      }
    };
    Mention2.prototype.checkCollision = function(popupEle) {
      if (!Browser.isDevice || Browser.isDevice && !(this.getModuleName() === "mention")) {
        var coordinates = this.getCoordinates(this.inputElement, this.getTriggerCharPosition());
        this.collision = isCollide(popupEle, null, coordinates.left, coordinates.top);
        if (this.collision.length > 0) {
          popupEle.style.marginTop = -parseInt(getComputedStyle(popupEle).marginTop, 10) + "px";
          this.isCollided = true;
        }
        this.popupObj.resolveCollision();
      }
    };
    Mention2.prototype.getTriggerCharPosition = function() {
      var mostRecentTriggerCharPos;
      var currentRange = this.getTextRange();
      if (currentRange !== void 0 && currentRange !== null) {
        mostRecentTriggerCharPos = 0;
        var idx = currentRange.lastIndexOf(this.mentionChar);
        if (idx >= mostRecentTriggerCharPos) {
          mostRecentTriggerCharPos = idx;
        }
      }
      return mostRecentTriggerCharPos ? mostRecentTriggerCharPos : 0;
    };
    Mention2.prototype.initializePopup = function(element, offsetValue, left) {
      var _this = this;
      this.popupObj = new Popup(element, {
        width: this.setWidth(),
        targetType: "relative",
        relateTo: this.inputElement,
        collision: { X: "flip", Y: "flip" },
        offsetY: offsetValue,
        enableRtl: this.enableRtl,
        offsetX: left,
        position: { X: "left", Y: "bottom" },
        actionOnScroll: "hide",
        zIndex: this.zIndex,
        close: function() {
          _this.destroyPopup();
        },
        open: function() {
          EventHandler.add(document, "mousedown", _this.onDocumentClick, _this);
          _this.isPopupOpen = true;
          _this.setDataIndex();
        }
      });
    };
    Mention2.prototype.setWidth = function() {
      var width = formatUnit(this.popupWidth);
      if (width.indexOf("%") > -1) {
        var inputWidth = this.inputElement.offsetWidth * parseFloat(width) / 100;
        width = inputWidth.toString() + "px";
      }
      return width;
    };
    Mention2.prototype.destroyPopup = function() {
      this.isPopupOpen = false;
      this.popupObj.destroy();
      if (isNullOrUndefined(this.target)) {
        detach(this.popupObj.element);
      } else {
        this.popupObj.element.innerHTML = "";
        this.popupObj.element.removeAttribute("style");
        this.popupObj.element.removeAttribute("aria-disabled");
      }
      if (this.list.classList.contains("e-nodata")) {
        this.list = null;
      }
    };
    Mention2.prototype.onDocumentClick = function(e) {
      var target = e.target;
      if (!(!isNullOrUndefined(this.popupObj) && closest(target, "#" + this.popupObj.element.id))) {
        this.hidePopup(e);
      }
    };
    Mention2.prototype.getCoordinates = function(element, position) {
      var properties = ["direction", "boxSizing", "width", "height", "overflowX", "overflowY", "borderTopWidth", "borderRightWidth", "borderBottomWidth", "borderLeftWidth", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "fontStyle", "fontVariant", "fontWeight", "fontStretch", "fontSize", "fontSizeAdjust", "lineHeight", "fontFamily", "textAlign", "textTransform", "textIndent", "textDecoration", "letterSpacing", "wordSpacing"];
      var div;
      var span;
      var range;
      var globalRange;
      var coordinates;
      var computed;
      var rect;
      if (!this.isContentEditable(this.inputElement)) {
        div = this.createElement("div", { className: "e-form-mirror-div" });
        document.body.appendChild(div);
        computed = getComputedStyle(element);
        div.style.position = "absolute";
        div.style.visibility = "hidden";
        properties.forEach(function(prop) {
          div.style[prop] = computed[prop];
        });
        div.textContent = element.value.substring(0, position);
        if (this.inputElement.nodeName === "INPUT") {
          div.textContent = div.textContent.replace(/\s/g, " ");
        }
        span = this.createElement("span");
        span.textContent = element.value.substring(position) || ".";
        div.appendChild(span);
        rect = element.getBoundingClientRect();
      } else {
        var selectedNodePosition = this.getTriggerCharPosition();
        globalRange = this.range;
        range = document.createRange();
        if (this.getTextRange() && this.getTextRange().lastIndexOf(this.mentionChar) !== -1) {
          range.setStart(globalRange.startContainer, selectedNodePosition);
          range.setEnd(globalRange.startContainer, selectedNodePosition);
        } else {
          range.setStart(globalRange.startContainer, globalRange.startOffset);
          range.setEnd(globalRange.startContainer, globalRange.endOffset);
        }
        this.isTyped = false;
        range.collapse(false);
        rect = range.getBoundingClientRect().top === 0 ? range.startContainer.getClientRects()[0] : range.getBoundingClientRect();
      }
      var rectTop = rect.top;
      var rectLeft = rect.left;
      var iframes = document.querySelectorAll("iframe");
      if (iframes.length > 0) {
        for (var i = 0; i < iframes.length; i++) {
          var iframe = iframes[i];
          if (iframe.contentDocument && iframe.contentDocument.contains(element)) {
            var iframeRect = iframe.getBoundingClientRect();
            rectTop += iframeRect.top;
            rectLeft += iframeRect.left;
          }
        }
      }
      var doc = document.documentElement;
      var windowLeft = (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
      var windowTop = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
      var width = 0;
      if (!isNullOrUndefined(range) && range.getBoundingClientRect().top === 0) {
        for (var i = 0; i < this.range.startContainer.childNodes.length; i++) {
          if (this.range.startContainer.childNodes[i].nodeType !== Node.TEXT_NODE && this.range.startContainer.childNodes[i].textContent.trim() !== "") {
            width += this.range.startContainer.childNodes[i].getClientRects()[0].width;
          } else if (this.range.startContainer.childNodes[i].textContent !== "") {
            var span_1 = document.createElement("span");
            span_1.innerHTML = this.range.startContainer.childNodes[i].nodeValue;
            document.body.appendChild(span_1);
            var textNodeWidth = span_1.offsetWidth;
            document.body.removeChild(span_1);
            width += textNodeWidth;
          }
        }
      }
      if (!this.isContentEditable(this.inputElement)) {
        coordinates = {
          top: rectTop + windowTop + span.offsetTop + parseInt(computed.borderTopWidth, 10) + parseInt(computed.fontSize, 10) + 3 - element.scrollTop - (this.isCollided ? 10 : 0),
          left: rectLeft + windowLeft + span.offsetLeft + parseInt(computed.borderLeftWidth, 10)
        };
        document.body.removeChild(div);
      } else {
        if (this.collision && this.collision.length > 0 && this.collision.indexOf("right") > -1 && this.collision.indexOf("bottom") === -1) {
          coordinates = {
            top: rectTop + windowTop + parseInt(getComputedStyle(this.inputElement).fontSize, 10),
            left: rectLeft + windowLeft + width
          };
        } else {
          coordinates = {
            top: rectTop + windowTop + parseInt(getComputedStyle(this.inputElement).fontSize, 10) - (this.isCollided ? 10 : 0),
            left: rectLeft + windowLeft + width
          };
        }
      }
      return coordinates;
    };
    Mention2.prototype.initValue = function() {
      this.isDataFetched = false;
      this.renderList();
      if (this.dataSource instanceof DataManager) {
        this.initRemoteRender = true;
      } else {
        this.updateValues();
      }
    };
    Mention2.prototype.updateValues = function() {
      var li = this.list.querySelector("." + dropDownBaseClasses.focus);
      if (!isNullOrUndefined(li)) {
        this.setSelection(li, null);
      }
    };
    Mention2.prototype.renderList = function() {
      _super.prototype.render.call(this);
      this.unWireListEvents();
      this.wireListEvents();
    };
    Mention2.prototype.wireListEvents = function() {
      EventHandler.add(this.list, this.keyEventName, this.onMouseClick, this);
      EventHandler.add(this.list, "mouseover", this.onMouseOver, this);
      EventHandler.add(this.list, "mouseout", this.onMouseLeave, this);
    };
    Mention2.prototype.unWireListEvents = function() {
      EventHandler.remove(this.list, this.keyEventName, this.onMouseClick);
      EventHandler.remove(this.list, "mouseover", this.onMouseOver);
      EventHandler.remove(this.list, "mouseout", this.onMouseLeave);
    };
    Mention2.prototype.onMouseClick = function(e) {
      var target = e.target;
      var li = closest(target, "." + dropDownBaseClasses.li);
      if (!this.isValidLI(li) || this.isDisabledElement(li)) {
        return;
      }
      this.isSelected = true;
      this.setSelection(li, e);
      var delay = 100;
      this.closePopup(delay, e);
      this.inputElement.focus();
      if (!this.isRTE) {
        e.preventDefault();
      }
    };
    Mention2.prototype.updateSelectedItem = function(li, e, preventSelect, isSelection) {
      var _this = this;
      this.removeSelection();
      li.classList.add(dropDownBaseClasses.selected);
      this.removeHover();
      var value = this.getFormattedValue(li.getAttribute("data-value"));
      var selectedData = this.getDataByValue(value);
      if (!preventSelect && !isNullOrUndefined(e) && !(e.action === "down" || e.action === "up")) {
        var items = this.detachChanges(selectedData);
        this.isSelected = true;
        var eventArgs = {
          e,
          item: li,
          itemData: items,
          isInteracted: e ? true : false,
          cancel: false
        };
        this.trigger("select", eventArgs, function(eventArgs2) {
          if (eventArgs2.cancel) {
            li.classList.remove(dropDownBaseClasses.selected);
            _this.isSelected = false;
            _this.isSelectCancel = true;
          } else {
            _this.selectEventCallback(li, selectedData, value);
            if (isSelection) {
              _this.setSelectOptions(li, e);
            }
          }
        });
      } else {
        this.selectEventCallback(li, selectedData, value);
        if (isSelection) {
          this.setSelectOptions(li, e);
        }
      }
    };
    Mention2.prototype.setSelection = function(li, e) {
      if (this.isValidLI(li) && (!li.classList.contains(dropDownBaseClasses.selected) || this.isPopupOpen && this.isSelected && li.classList.contains(dropDownBaseClasses.selected))) {
        this.updateSelectedItem(li, e, false, true);
      } else {
        this.setSelectOptions(li, e);
      }
    };
    Mention2.prototype.setSelectOptions = function(li, e) {
      if (this.list) {
        this.removeHover();
      }
      this.previousSelectedLI = !isNullOrUndefined(this.selectedLI) ? this.selectedLI : null;
      this.selectedLI = li;
      if (this.isPopupOpen && !isNullOrUndefined(this.selectedLI)) {
        this.setScrollPosition(e);
      }
      if (e && (e.keyCode === 38 || e.keyCode === 40)) {
        return;
      }
      if (isNullOrUndefined(e) || this.setValue(e)) {
        return;
      }
    };
    Mention2.prototype.setScrollPosition = function(e) {
      if (!isNullOrUndefined(e)) {
        switch (e.action) {
          case "pageDown":
          case "down":
          case "end":
            this.scrollBottom();
            break;
          default:
            this.scrollTop();
            break;
        }
      } else {
        this.scrollBottom(true);
      }
    };
    Mention2.prototype.scrollBottom = function(isInitial) {
      if (!isNullOrUndefined(this.selectedLI)) {
        var currentOffset = this.list.offsetHeight;
        var nextBottom = this.selectedLI.offsetTop + this.selectedLI.offsetHeight - this.list.scrollTop;
        var nextOffset = this.list.scrollTop + nextBottom - currentOffset;
        nextOffset = isInitial ? nextOffset + parseInt(getComputedStyle(this.list).paddingTop, 10) * 2 : nextOffset;
        var boxRange = this.selectedLI.offsetTop + this.selectedLI.offsetHeight - this.list.scrollTop;
        if (this.activeIndex === 0) {
          this.list.scrollTop = 0;
        } else if (nextBottom > currentOffset || !(boxRange > 0 && this.list.offsetHeight > boxRange)) {
          this.list.scrollTop = nextOffset;
        }
      }
    };
    Mention2.prototype.scrollTop = function() {
      if (!isNullOrUndefined(this.selectedLI)) {
        var nextOffset = this.selectedLI.offsetTop - this.list.scrollTop;
        nextOffset = this.fields.groupBy && nextOffset;
        var boxRange = this.selectedLI.offsetTop + this.selectedLI.offsetHeight - this.list.scrollTop;
        if (this.activeIndex === 0) {
          this.list.scrollTop = 0;
        } else if (nextOffset < 0) {
          this.list.scrollTop = this.list.scrollTop + nextOffset;
        } else if (!(boxRange > 0 && this.list.offsetHeight > boxRange)) {
          this.list.scrollTop = this.selectedLI.offsetTop;
        }
      }
    };
    Mention2.prototype.selectEventCallback = function(li, selectedData, value, selectLi) {
      this.previousItemData = !isNullOrUndefined(this.itemData) ? this.itemData : null;
      this.item = li;
      this.itemData = selectedData;
      var focusedItem = this.list.querySelector("." + dropDownBaseClasses.focus);
      if (focusedItem) {
        removeClass([focusedItem], dropDownBaseClasses.focus);
      }
      if (selectLi) {
        addClass([li], dropDownBaseClasses.selected);
      }
      li.setAttribute("aria-selected", "true");
      this.activeIndex = this.getIndexByValue(value);
    };
    Mention2.prototype.detachChanges = function(value) {
      var items;
      if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
        items = Object.defineProperties({}, {
          value: {
            value,
            enumerable: true
          },
          text: {
            value,
            enumerable: true
          }
        });
      } else {
        items = value;
      }
      return items;
    };
    Mention2.prototype.setValue = function(e) {
      if (!this.isReact) {
        if (!isNullOrUndefined(this.displayTemplate)) {
          this.setDisplayTemplate();
        }
        this.updateMentionValue(e);
        return true;
      } else {
        if (!isNullOrUndefined(this.displayTemplate)) {
          this.setDisplayTemplate(e);
        } else {
          this.updateMentionValue(e);
        }
        return true;
      }
    };
    Mention2.prototype.updateMentionValue = function(e) {
      var dataItem = this.getItemData();
      var textSuffix;
      var value;
      var endPos;
      var range;
      var globalRange;
      var selection = this.inputElement.ownerDocument.getSelection();
      var startPos = this.getTriggerCharPosition();
      textSuffix = typeof this.suffixText === "string" ? this.suffixText : "";
      if (this.isSelectCancel) {
        this.isSelectCancel = false;
        return;
      }
      if (dataItem.text !== null) {
        value = this.mentionVal(dataItem.text);
      }
      if (!this.isContentEditable(this.inputElement)) {
        var myField = this.inputElement;
        var currentTriggerSnippet = this.getTextRange().substring(startPos + this.mentionChar.length, this.getTextRange().length);
        value += textSuffix;
        endPos = startPos + this.mentionChar.length;
        endPos += currentTriggerSnippet.length;
        myField.value = myField.value.substring(0, startPos) + value + myField.value.substring(endPos, myField.value.length);
        myField.selectionStart = startPos + value.length;
        myField.selectionEnd = startPos + value.length;
        if (this.isPopupOpen) {
          this.hidePopup();
        }
        this.onChangeEvent(e);
      } else {
        endPos = this.getTriggerCharPosition() + this.mentionChar.length;
        if (this.range && this.range.startContainer.textContent.trim() !== this.mentionChar) {
          endPos = this.range.endOffset;
        }
        globalRange = this.range;
        range = document.createRange();
        if (this.getTextRange() && this.getTextRange().lastIndexOf(this.mentionChar) !== -1 || this.getTextRange() && this.getTextRange().trim() === this.mentionChar) {
          range.setStart(globalRange.startContainer, startPos);
          range.setEnd(globalRange.startContainer, endPos);
        } else {
          if (globalRange.commonAncestorContainer.textContent.trim() !== "" && !isNullOrUndefined(globalRange.commonAncestorContainer.textContent.trim()) && this.getTextRange() && this.getTextRange().lastIndexOf(this.mentionChar) !== -1) {
            range.setStart(globalRange.startContainer, globalRange.startOffset - 1);
            range.setEnd(globalRange.startContainer, globalRange.endOffset - 1);
          } else {
            range.setStart(globalRange.startContainer, globalRange.startOffset);
            range.setEnd(globalRange.startContainer, globalRange.endOffset);
          }
        }
        this.isTyped = false;
        range.deleteContents();
        range.startContainer.parentElement.normalize();
        var element = this.createElement("div");
        element.innerHTML = value;
        var frag = document.createDocumentFragment();
        var node = void 0;
        var lastNode = void 0;
        while (node = element.firstChild) {
          lastNode = frag.appendChild(node);
        }
        range.insertNode(frag);
        if (lastNode) {
          range = range.cloneRange();
          if (this.isRTE) {
            range.setStart(lastNode, 0);
            range.setEnd(lastNode, lastNode.textContent.length);
          } else {
            range.setStartAfter(lastNode);
          }
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        }
        if (this.isPopupOpen) {
          this.hidePopup();
        }
        if (!isNullOrUndefined(e.pointerType) && e.pointerType === "mouse") {
          var event_1 = new CustomEvent("content-changed", { detail: { click: true } });
          this.inputElement.dispatchEvent(event_1);
        }
        ;
        this.onChangeEvent(e);
      }
    };
    Mention2.prototype.mentionVal = function(value) {
      var showChar = this.showMentionChar ? this.mentionChar : "";
      if (!isNullOrUndefined(this.displayTemplate) && !isNullOrUndefined(this.displayTempElement)) {
        value = this.displayTempElement.innerHTML;
      }
      if (this.isContentEditable(this.inputElement)) {
        if (Browser.isAndroid) {
          return '<span contenteditable="true" class="e-mention-chip">' + showChar + value + "</span>".concat(typeof this.suffixText === "string" ? this.suffixText : "&#8203;");
        } else {
          return '<span contenteditable="false" class="e-mention-chip">' + showChar + value + "</span>".concat(typeof this.suffixText === "string" ? this.suffixText : "&#8203;");
        }
      } else {
        return showChar + value;
      }
    };
    Mention2.prototype.setDisplayTemplate = function(e) {
      var _this = this;
      var compiledString;
      if (this.isReact) {
        this.clearTemplate(["displayTemplate"]);
        if (this.displayTempElement) {
          detach(this.displayTempElement);
          this.displayTempElement = null;
        }
      }
      if (!this.displayTempElement) {
        this.displayTempElement = this.createElement("div");
      }
      if (!this.isReact) {
        this.displayTempElement.innerHTML = "";
      }
      compiledString = compile(this.displayTemplate);
      var displayCompTemp = compiledString(this.itemData, this, "displayTemplate", this.displayTemplateId, this.isStringTemplate, null, this.displayTempElement);
      if (displayCompTemp && displayCompTemp.length > 0) {
        append(displayCompTemp, this.displayTempElement);
      }
      if (!this.isReact) {
        this.renderTemplates();
      } else {
        this.renderTemplates(function() {
          _this.updateMentionValue(e);
        });
      }
    };
    Mention2.prototype.renderTemplates = function(callBack) {
      this.renderReactTemplates(callBack);
    };
    Mention2.prototype.setSpinnerTemplate = function() {
      var _this = this;
      var compiledString;
      if (this.isReact) {
        this.clearTemplate(["spinnerTemplate"]);
        if (this.spinnerTemplateElement) {
          detach(this.spinnerTemplateElement);
          this.spinnerTemplateElement = null;
        }
      }
      if (!this.spinnerTemplateElement) {
        this.spinnerTemplateElement = this.createElement("div");
      }
      if (!this.isReact) {
        this.spinnerTemplateElement.innerHTML = "";
      }
      compiledString = compile(this.spinnerTemplate);
      var spinnerCompTemp = compiledString(null, this, "spinnerTemplate", this.spinnerTemplateId, this.isStringTemplate, null, this.spinnerTemplateElement);
      if (spinnerCompTemp && spinnerCompTemp.length > 0) {
        for (var i = 0; i < spinnerCompTemp.length; i++) {
          this.spinnerTemplateElement.appendChild(spinnerCompTemp[i]);
        }
      }
      if (!this.isReact) {
        this.renderTemplates();
        this.popupObj.element.appendChild(this.spinnerTemplateElement);
      } else {
        this.renderTemplates(function() {
          _this.popupObj.element.appendChild(_this.spinnerTemplateElement);
        });
      }
    };
    Mention2.prototype.onChangeEvent = function(eve) {
      this.isSelected = false;
      var items = this.detachMentionChanges(this.itemData);
      var preItems;
      if (typeof this.previousItemData === "string" || typeof this.previousItemData === "boolean" || typeof this.previousItemData === "number") {
        preItems = Object.defineProperties({}, {
          value: {
            value: this.previousItemData,
            enumerable: true
          },
          text: {
            value: this.previousItemData,
            enumerable: true
          }
        });
      } else {
        preItems = this.previousItemData;
      }
      var eventArgs = {
        e: eve,
        item: this.item,
        itemData: items,
        previousItem: this.previousSelectedLI,
        previousItemData: preItems,
        isInteracted: eve ? true : false,
        value: this.item.innerHTML,
        element: this.inputElement
      };
      this.trigger("change", eventArgs);
    };
    Mention2.prototype.detachMentionChanges = function(value) {
      var items;
      if (typeof value === "string" || typeof value === "boolean" || typeof value === "number") {
        items = Object.defineProperties({}, {
          value: {
            value,
            enumerable: true
          },
          text: {
            value,
            enumerable: true
          }
        });
      } else {
        items = value;
      }
      return items;
    };
    Mention2.prototype.getItemData = function() {
      var fields = this.fields;
      var dataItem = null;
      dataItem = this.itemData;
      var dataValue;
      var dataText;
      if (!isNullOrUndefined(dataItem)) {
        dataValue = getValue(fields.value, dataItem);
        dataText = getValue(fields.text, dataItem);
      }
      var value = !isNullOrUndefined(dataItem) && !isUndefined(dataValue) ? dataValue : dataItem;
      var text = !isNullOrUndefined(dataItem) && !isUndefined(dataValue) ? dataText : dataItem;
      return { value, text };
    };
    Mention2.prototype.removeSelection = function() {
      if (this.list) {
        var selectedItems = this.list.querySelectorAll("." + dropDownBaseClasses.selected);
        if (selectedItems.length) {
          removeClass(selectedItems, dropDownBaseClasses.selected);
          selectedItems[0].removeAttribute("aria-selected");
        }
      }
    };
    Mention2.prototype.onMouseOver = function(e) {
      var currentLi = closest(e.target, "." + dropDownBaseClasses.li);
      this.setHover(currentLi);
    };
    Mention2.prototype.setHover = function(li) {
      if (this.isValidLI(li) && !li.classList.contains(dropDownBaseClasses.hover)) {
        this.removeHover();
        addClass([li], dropDownBaseClasses.hover);
      }
    };
    Mention2.prototype.removeHover = function() {
      if (this.list) {
        var hoveredItem = this.list.querySelectorAll("." + dropDownBaseClasses.hover);
        if (hoveredItem && hoveredItem.length) {
          removeClass(hoveredItem, dropDownBaseClasses.hover);
        }
      }
    };
    Mention2.prototype.isValidLI = function(li) {
      return li && li.hasAttribute("role") && li.getAttribute("role") === "option";
    };
    Mention2.prototype.onMouseLeave = function() {
      this.removeHover();
    };
    Mention2.prototype.search = function(text, positionX, positionY) {
      if (this.isContentEditable(this.inputElement)) {
        this.range = this.getCurrentRange();
      }
      var currentRange = this.getTextRange();
      var lastWordRange = this.getLastLetter(currentRange);
      if (this.ignoreCase && (text === lastWordRange || text === lastWordRange.toLowerCase()) || !this.ignoreCase && text === lastWordRange) {
        this.resetList(this.dataSource, this.fields);
      } else {
        if (this.isPopupOpen) {
          this.hidePopup();
        }
        return;
      }
      if (isNullOrUndefined(this.list)) {
        this.renderList();
        this.renderPopup();
      } else {
        this.showPopup();
      }
      this.popupObj.element.style.left = formatUnit(positionX);
      this.popupObj.element.style.top = formatUnit(positionY);
    };
    Mention2.prototype.destroy = function() {
      this.hidePopup();
      this.unWireEvent();
      if (this.list) {
        this.unWireListEvents();
      }
      if (this.inputElement && !this.inputElement.classList.contains("e-" + this.getModuleName())) {
        return;
      }
      this.previousSelectedLI = null;
      this.item = null;
      this.selectedLI = null;
      this.popupObj = null;
      _super.prototype.destroy.call(this);
    };
    Mention2.prototype.getLocaleName = function() {
      return "mention";
    };
    Mention2.prototype.getNgDirective = function() {
      return "EJS-MENTION";
    };
    Mention2.prototype.getModuleName = function() {
      return "mention";
    };
    __decorate11([
      Property(null)
    ], Mention2.prototype, "cssClass", void 0);
    __decorate11([
      Property("@")
    ], Mention2.prototype, "mentionChar", void 0);
    __decorate11([
      Property(false)
    ], Mention2.prototype, "showMentionChar", void 0);
    __decorate11([
      Property(false)
    ], Mention2.prototype, "allowSpaces", void 0);
    __decorate11([
      Property(null)
    ], Mention2.prototype, "suffixText", void 0);
    __decorate11([
      Property(25)
    ], Mention2.prototype, "suggestionCount", void 0);
    __decorate11([
      Property(0)
    ], Mention2.prototype, "minLength", void 0);
    __decorate11([
      Property("None")
    ], Mention2.prototype, "sortOrder", void 0);
    __decorate11([
      Property(true)
    ], Mention2.prototype, "ignoreCase", void 0);
    __decorate11([
      Property(false)
    ], Mention2.prototype, "highlight", void 0);
    __decorate11([
      Property()
    ], Mention2.prototype, "locale", void 0);
    __decorate11([
      Property("auto")
    ], Mention2.prototype, "popupWidth", void 0);
    __decorate11([
      Property("300px")
    ], Mention2.prototype, "popupHeight", void 0);
    __decorate11([
      Property(null)
    ], Mention2.prototype, "displayTemplate", void 0);
    __decorate11([
      Property(null)
    ], Mention2.prototype, "itemTemplate", void 0);
    __decorate11([
      Property("No records found")
    ], Mention2.prototype, "noRecordsTemplate", void 0);
    __decorate11([
      Property(null)
    ], Mention2.prototype, "spinnerTemplate", void 0);
    __decorate11([
      Property()
    ], Mention2.prototype, "target", void 0);
    __decorate11([
      Property([])
    ], Mention2.prototype, "dataSource", void 0);
    __decorate11([
      Property(null)
    ], Mention2.prototype, "query", void 0);
    __decorate11([
      Property("Contains")
    ], Mention2.prototype, "filterType", void 0);
    __decorate11([
      Complex({ text: null, value: null, iconCss: null, groupBy: null }, FieldSettings)
    ], Mention2.prototype, "fields", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "actionBegin", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "actionComplete", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "actionFailure", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "change", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "beforeOpen", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "opened", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "closed", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "select", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "filtering", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "created", void 0);
    __decorate11([
      Event()
    ], Mention2.prototype, "destroyed", void 0);
    Mention2 = __decorate11([
      NotifyPropertyChanges
    ], Mention2);
    return Mention2;
  }(DropDownBase)
);

export {
  incrementalSearch,
  Search,
  escapeCharRegExp,
  resetIncrementalSearchValues,
  highlightSearch,
  revertHighlightSearch,
  VirtualScroll,
  FieldSettings,
  dropDownBaseClasses,
  DropDownBase,
  dropDownListClasses,
  DropDownList,
  Fields,
  TreeSettings,
  DropDownTree,
  ComboBox,
  AutoComplete,
  createFloatLabel,
  updateFloatLabelState,
  removeFloating,
  setPlaceHolder,
  floatLabelFocus,
  floatLabelBlur,
  encodePlaceholder,
  MultiSelect,
  CheckBoxSelection,
  SelectionSettings,
  ToolbarSettings,
  ListBox,
  Mention
};
//# sourceMappingURL=chunk-BN7JGLEB.js.map
