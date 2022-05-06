// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.
var common = require('./common.js');
var classCategory = 'class';
var namespaceCategory = 'ns';

exports.transform = function (model) {

  if (!model) return null;

  langs = model.langs;
  handleItem(model, model._gitContribute, model._gitUrlPattern);
  if (model.children) {
    model.children.forEach(function (item) {
      handleItem(item, model._gitContribute, model._gitUrlPattern);
    });
  }

  if (model.type) {
    switch (model.type.toLowerCase()) {
      case 'overview':
      case 'package':
      case 'namespace':
        model.isNamespace = true;
        if (model.children) groupChildren(model, namespaceCategory);
        model[getTypePropertyName(model.type)] = true;
        break;
      case 'exception':
      case 'class':
      case 'annotationtype':
      case 'interface':
      case 'struct':
      case 'delegate':
      case 'enum':
        model.isClass = true;
        if (model.children) groupChildren(model, classCategory);
        model[getTypePropertyName(model.type)] = true;
        break;
      default:
        break;
    }

    if (!model.title) {
      model.title = common.getTitleForTypeProperty(model.type, model.name, model.uid);
    }
  }

  return model;
}

exports.getBookmarks = function (model, ignoreChildren) {
  if (!model || !model.type || model.type.toLowerCase() === "namespace") return null;

  var bookmarks = {};

  if (typeof ignoreChildren == 'undefined' || ignoreChildren === false) {
    if (model.children) {
      for (var i = 0; i < model.children.length; i++) {
        var item = model.children[i]

        // skip adding anchors for inner classes
        if ((model.langs[0] === "java" || model.langs[0] === "python" || model.langs[0] === "ruby") && item.parent != model.uid) {
          continue;
        }

        bookmarks[item.uid] = common.getHtmlId(item.uid);
        if (item.overload && item.overload.uid) {
          bookmarks[item.overload.uid] = common.getHtmlId(item.overload.uid);
        }
      }
    }
  }

  // Reference's first level bookmark should have no anchor
  bookmarks[model.uid] = "";
  return bookmarks;
}

exports.groupChildren = groupChildren;
exports.getTypePropertyName = getTypePropertyName;
exports.getCategory = getCategory;

function groupChildren(model, category) {
  if (!model || !model.type) {
    return;
  }
  var typeChildrenItems = getDefinitions(category);
  var grouped = {};

  model.children.forEach(function (c) {
    if (c.isEii) {
      var type = "eii";
    } else {
      var type = c.type.toLowerCase();
    }
    if (!grouped.hasOwnProperty(type)) {
      grouped[type] = [];
    }
    // special handle for field
    if ((type === "field" || type === "static field") && c.syntax) {
      c.syntax.fieldValue = c.syntax.return;
      c.syntax.return = undefined;
    }
    // special handle for property
    if ((type === "property" || type === "attachedproperty") && c.syntax) {
      c.syntax.propertyValue = c.syntax.return;
      c.syntax.return = undefined;
    }
    // special handle for event
    if ((type === "event" || type === "attachedevent") && c.syntax) {
      c.syntax.eventType = c.syntax.return;
      c.syntax.return = undefined;
    }
    grouped[type].push(c);
  })

  var children = [];
  for (var key in typeChildrenItems) {
    if (typeChildrenItems.hasOwnProperty(key) && grouped.hasOwnProperty(key)) {
      var typeChildrenItem = typeChildrenItems[key];
      var items = grouped[key];
      if (items && items.length > 0) {
        var item = {};
        for (var itemKey in typeChildrenItem) {
          if (typeChildrenItem.hasOwnProperty(itemKey)) {
            item[itemKey] = typeChildrenItem[itemKey];
          }
        }
        item.children = items;
        children.push(item);
      }
    }
  }

  model.children = children;
}

function getTypePropertyName(type) {
  if (!type) {
    return undefined;
  }
  var loweredType = type.toLowerCase();
  var definition = getDefinition(loweredType);
  if (definition) {
    return definition.typePropertyName;
  }

  return undefined;
}

function getCategory(type) {
  var classItems = getDefinitions(classCategory);
  if (classItems.hasOwnProperty(type)) {
    return classCategory;
  }

  var namespaceItems = getDefinitions(namespaceCategory);
  if (namespaceItems.hasOwnProperty(type)) {
    return namespaceCategory;
  }
  return undefined;
}

function getDefinition(type) {
  var classItems = getDefinitions(classCategory);
  if (classItems.hasOwnProperty(type)) {
    return classItems[type];
  }
  var namespaceItems = getDefinitions(namespaceCategory);
  if (namespaceItems.hasOwnProperty(type)) {
    return namespaceItems[type];
  }
  return undefined;
}

function getDefinitions(category) {
  var namespaceItems = {
    "namespace":      { inNamespace: true,    typePropertyName: "inNamespace",    id: "namespaces" },
    "class":          { inClass: true,        typePropertyName: "inClass",        id: "classes" },
    "struct":         { inStruct: true,       typePropertyName: "inStruct",       id: "structs" },
    "interface":      { inInterface: true,    typePropertyName: "inInterface",    id: "interfaces" },
    "enum":           { inEnum: true,         typePropertyName: "inEnum",         id: "enums" },
    "delegate":       { inDelegate: true,     typePropertyName: "inDelegate",     id: "delegates" },
    "exception":      { inException: true,    typePropertyName: "inException",    id: "exceptions" },
    "annotationtype": { inAnnotation: true,   typePropertyName: "inAnnotation",   id: "annotationtypes" },
    "package":        { inPackage: true,      typePropertyName: "inPackage",      id: "packages" },
    "overview":       { inOverview: true,     typePropertyName: "inOverview",     id: "overviews" }
  };
  var classItems = {
    "static field":     { inStaticField: true,      typePropertyName: "inStaticField",      id: "staticFields" },
    "static method":    { inStaticMethod: true,     typePropertyName: "inStaticMethod",     id: "staticMethods" },
    "constructor":      { inConstructor: true,      typePropertyName: "inConstructor",      id: "constructors" },
    "field":            { inField: true,            typePropertyName: "inField",            id: "fields" },
    "property":         { inProperty: true,         typePropertyName: "inProperty",         id: "properties" },
    "attachedproperty": { inAttachedProperty: true, typePropertyName: "inAttachedProperty", id: "attachedProperties" },
    "method":           { inMethod: true,           typePropertyName: "inMethod",           id: "methods" },
    "event":            { inEvent: true,            typePropertyName: "inEvent",            id: "events" },
    "attachedevent":    { inAttachedEvent: true,    typePropertyName: "inAttachedEvent",    id: "attachedEvents" },
    "operator":         { inOperator: true,         typePropertyName: "inOperator",         id: "operators" },
    "eii":              { inEii: true,              typePropertyName: "inEii",              id: "eii" }
  };
  if (category === 'class') {
    return classItems;
  }
  if (category === 'ns') {
    return namespaceItems;
  }
  console.err("category '" + category + "' is not valid.");
  return undefined;
}

function handleItem(vm, gitContribute, gitUrlPattern) {
  // get contribution information
  vm.docurl = common.getImproveTheDocHref(vm, gitContribute, gitUrlPattern);
  vm.sourceurl = common.getViewSourceHref(vm, null, gitUrlPattern);

  // set to null incase mustache looks up
  vm.summary = vm.summary || null;
  vm.remarks = vm.remarks || null;
  vm.conceptual = vm.conceptual || null;
  vm.syntax = vm.syntax || null;
  vm.implements = vm.implements || null;
  vm.example = vm.example || null;
  vm.status = vm.status || null;
  common.processSeeAlso(vm);

  if (!common.isValidPackageVersion(vm._packageVersion)) {
    vm._packageVersion = null;
  }

  // id is used as default template's bookmark
  vm.id = common.getHtmlId(vm.uid);
  if (vm.overload && vm.overload.uid) {
    vm.overload.id = common.getHtmlId(vm.overload.uid);
  }

  if (vm.supported_platforms) {
    vm.supported_platforms = transformDictionaryToArray(vm.supported_platforms);
  }

  if (vm.requirements) {
    var type = vm.type.toLowerCase();
    if (type == "method") {
      vm.requirements_method = transformDictionaryToArray(vm.requirements);
    } else {
      vm.requirements = transformDictionaryToArray(vm.requirements);
    }
  }

  if (vm && langs) {
    if (shouldHideTitleType(vm)) {
      vm.hideTitleType = true;
    } else {
      vm.hideTitleType = false;
    }

    if (shouldHideSubtitle(vm)) {
      vm.hideSubtitle = true;
    } else {
      vm.hideSubtitle = false;
    }
  }

  function shouldHideTitleType(vm) {
    var type = vm.type.toLowerCase();
    return ((type === 'namespace' && langs.length == 1 && (langs[0] === 'objectivec' || langs[0] === 'java' || langs[0] === 'c'))
      || ((type === 'class' || type === 'enum') && langs.length == 1 && langs[0] === 'c'));
  }

  function shouldHideSubtitle(vm) {
    var type = vm.type.toLowerCase();
    return (type === 'class' || type === 'namespace') && langs.length == 1 && langs[0] === 'c';
  }

  function transformDictionaryToArray(dic) {
    var array = [];
    for (var key in dic) {
      if (dic.hasOwnProperty(key)) {
        array.push({ "name": key, "value": dic[key] })
      }
    }

    return array;
  }

  
  // handles where syntax return/parameters type doesn't include specName but includes uid
  if (vm.syntax && langs[0]) {

    if (vm.syntax.return && vm.syntax.return.type && !vm.syntax.return.type.specName && vm.syntax.return.type.uid) {
      vm.syntax.return.type.specName = [{
        "lang": langs[0],
        "value": "<xref uid=" + vm.syntax.return.type.uid + "\>"
      }];
    }

    if (vm.syntax.parameters) {
      for (var i = 0; i < vm.syntax.parameters.length; i++) {
        param = vm.syntax.parameters[i]
        if (param.type && !param.type.specName && param.type.uid) {
          vm.syntax.parameters[i].type.specName = [{
            "lang": langs[0],
            "value": "<xref uid=" + param.type.uid + "\>"
          }];
        }
      }
    }
  }

  if (vm.status) {
    // Set the status as a property so we can check it in the template.
    vm[vm.status] = true;
    // Set status_title to use in any preview disclaimers as needed.
    if (vm.status == "preview") {
      vm.status_title = "Preview"
    }
    else if (vm.status == "private_preview") {
      vm.status_title = "Private preview"
    }
    else if (vm.status == "experimental") {
      vm.status_title = "Experimental"
    }
    else if (vm.status == "alpha") {
      vm.status_title = "Alpha"
    }
    else if (vm.status == "beta") {
      vm.status_title = "Beta"
    }
    else if (vm.status == "eap") {
      vm.status_title = "Early access"
    }
  }

  if (vm.javaType) {
    // Resetting 'type' from added field 'javaType' field here 
    // because docfx cannot process custom types while using ManagedReference.
    // This allows Java to use custom types without rewriting for UniversalReference
    vm.type = vm.javaType;
  }
}
