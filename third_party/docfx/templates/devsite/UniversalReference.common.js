// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.

var common = require('./common.js');;
var classCategory = 'class';
var namespaceCategory = 'ns';

exports.transform = function (model) {
  if (!model) return

  handleItem(model, model._gitContribute, model._gitUrlPattern);
  if (model.children) {
    normalizeLanguageValuePairs(model.children).forEach(function (item) {
      handleItem(item, model._gitContribute, model._gitUrlPattern);
    });
  };

  if (model.type) {
    model[getTypePropertyName(model.type)] = true;
    switch (model.type.toLowerCase()) {
      // packages and namespaces are both containers for other elements
      case 'package':
      case 'namespace':
      case 'subpackage':
        model.isNamespace = true;
        if (model.children) groupChildren(model, namespaceCategory);
        break;
      case 'module':
        if (model.langs && model.langs[0].toLowerCase() === "ruby" &&
            model.children && model.children.length > 0) {
          model.isClass = true;
          // Special handling for Ruby modules, which treat methods as embedded
          groupChildren(model, "rubyModule");
          break;
        }
      case 'class':
        if (model.langs && model.langs[0].toLowerCase() === "python" &&
            model.children && model.children.length > 0) {
          model.isClass = true;
          // Handle classes and modules differently for Python
          model.isPythonHeader = true;
          groupChildren(model, namespaceCategory);
          break;
        }
      case 'interface':
      case 'struct':
      case 'delegate':
        model.isClass = true;
        if (model.children) groupChildren(model, classCategory);
        break;
      case 'enum':
        model.isEnum = true;
        if (model.children) groupChildren(model, classCategory);
        break;
      default:
        break;
    }
  }
  
  // edit title based on type
  if (!model.title) {
    if (model.inPackage || model.inSubpackage) {
      model.title = "Package " + model.name;
    } else if (model.inNamespace) {
      model.title = "Namespace " + model.name;
    } else if (model.inModule) {
      model.title = "Module " + model.name;
    } else if (model.inClass) {
      model.title = "Class " + model.name;
    } else if (model.inStruct) {
      model.title = "Struct " + model.name;
    } else if (model.inInterface) {
      model.title = "Interface " + model.name;
    } else if (model.inEnum) {
      model.title = "Enum " + model.name;
    } else if (model.inDelegate) {
      model.title = "Delegate " + model.name;
    } else if (model.inStaticField) {
      model.title = "Static Field " + model.name;
    } else if (model.inStaticMethod) {
      model.title = "Static Method " + model.name;
    } else if (model.inConstructor) {
      model.title = "Constructor " + model.name;
    } else if (model.inField) {
      model.title = "Field " + model.name;
    } else if (model.inProperty) {
      model.title = "Property " + model.name;
    } else if (model.inMethod) {
      model.title = "Method " + model.name;
    } else if (model.inEvent) {
      model.title = "Event " + model.name;
    } else if (model.inOperator) {
      model.title = "Operator " + model.name;
    } else if (model.inEii) {
      model.title = "Explict Interface Implementation " + model.name;
    } else if (model.inVariable) {
      model.title = "Variable " + model.name;
    } else if (model.inTypeAlias) {
      model.title = "Type Alias " + model.name;
    } else if (model.inAnnotation) {
      model.title = "Annotation Type " = model.name;
    } else if (model.inException) {
      model.title = "Exception " + model.name;
    } else if (model.inOverview) {
      model.title = model.uid + " overview"
    }
  }

  return model;
}

exports.getBookmarks = function (model, ignoreChildren)  {
  if (!model || !model.type || model.type.toLowerCase() === "namespace") return null;

  var bookmarks = {};

  if (typeof ignoreChildren == 'undefined' || ignoreChildren === false) {
    if (model.children) {
      var children = normalizeLanguageValuePairs(model.children)
      for (var i = 0; i < children.length; i++) {
        var item = children[i]

        // skip adding anchors for inner classes
        if ((model.langs[0] === "java" || model.langs[0] === "python" || model.langs[0] === "ruby" || model.langs[0] === "typeScript") && item.parent != model.uid) {
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
  vm.inheritance = vm.inheritance || null;
  vm.children = vm.children || null;
  vm.status = vm.status || null;
  if (vm.inheritance) {
    normalizeLanguageValuePairs(vm.inheritance).forEach(handleInheritance);
  }

  // wrapdeclarationcode is used to automatically line break declaration code
  if (vm.langs && vm.langs[0] === "python") {
      vm.wrapdeclarationcode = true;
  }
  
  common.processSeeAlso(vm);

  // id is used as default template's bookmark
  vm.id = common.getHtmlId(vm.uid);
  if (vm.overload && vm.overload.uid) {
    vm.overload.id = common.getHtmlId(vm.overload.uid);
  }

  // concatenate multiple types with `|`
  if (vm.syntax) {
    var syntax = vm.syntax;
    if (syntax.parameters) {
      syntax.parameters = syntax.parameters.map(function (p) {
        return joinType(p);
      })
      syntax.parameters = groupParameters(syntax.parameters);
    }
    if (syntax.return) {
      syntax.return = joinType(syntax.return);
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
}

function handleInheritance(tree) {
  tree.type = tree.type || null;
  tree.inheritance = tree.inheritance || null;
  if (tree.inheritance) {
    tree.inheritance.forEach(handleInheritance);
  }
}

function joinType(parameter) {
  // change type in syntax from array to string
  var joinTypeProperty = function (type, key) {
    if (!type || !type[0] || !type[0][key]) return null;
    var value = type.map(function (t) {
      if (!t) return null;
      if (!t[key]) return t.uid;
      return t[key][0].value;
    }).join(' | ');
    return [{
      lang: type[0][key][0].lang,
      value: value
    }];
  };
  if (parameter.type) {
    parameter.type = {
      name: joinTypeProperty(parameter.type, "name"),
      nameWithType: joinTypeProperty(parameter.type, "nameWithType"),
      fullName: joinTypeProperty(parameter.type, "fullName"),
      specName: joinTypeProperty(parameter.type, "specName")
    }
  }
  return parameter;
}

function groupParameters(parameters) {
  // group parameter with properties
  if (!parameters || parameters.length == 0) return parameters;
  var groupedParameters = [];
  var stack = [];
  for (var i = 0; i < parameters.length; i++) {
    var parameter = parameters[i];
    parameter.properties = null;
    var prefixLength = 0;
    while (stack.length > 0) {
      var top = stack.pop();
      var prefix = top.id + '.';
      if (parameter.id.indexOf(prefix) == 0) {
        prefixLength = prefix.length;
        if (!top.parameter.properties) {
          top.parameter.properties = [];
        }
        top.parameter.properties.push(parameter);
        stack.push(top);
        break;
      }
      if (stack.length == 0) {
        groupedParameters.push(top.parameter);
      }
    }
    stack.push({ id: parameter.id, parameter: parameter });
    parameter.id = parameter.id.substring(prefixLength);
  }
  while (stack.length > 0) {
    top = stack.pop();
  }
  groupedParameters.push(top.parameter);
  return groupedParameters;
}

function groupChildren(model, category, typeChildrenItems, itemToModify) {
  if (!model || !model.type) {
    return;
  }
  if (!itemToModify) itemToModify = model;
  if (!typeChildrenItems) {
    var typeChildrenItems = getDefinitions(category);
  }
  var grouped = {};

  normalizeLanguageValuePairs(model.children).forEach(function (c) {
    if (c.langs && c.langs[0] === "go") {
      // Skip if this child has a different parent.
      if (c.parent && c.parent[0].value.uid != itemToModify.uid) return;

      // Group all of this child's children.
      if (c.uid !== model.uid) {
        groupChildren(model, category, typeChildrenItem, c);
      }
    }

    if (c.isEii) {
      var type = "eii";
    } else {
      var type = c.type.toLowerCase();
    }
    if (!grouped.hasOwnProperty(type)) {
      grouped[type] = [];
    }
    // special handle for field
    if (type === "field" && c.syntax) {
      c.syntax.fieldValue = c.syntax.return;
      c.syntax.return = undefined;
    }
    // special handle for property
    if (type === "property" && c.syntax) {
      c.syntax.propertyValue = c.syntax.return;
      c.syntax.return = undefined;
    }
    // special handle for event
    if (type === "event" && c.syntax) {
      c.syntax.eventType = c.syntax.return;
      c.syntax.return = undefined;
    }
    if (type === "variable" && c.syntax) {
      c.syntax.variableValue = c.syntax.return;
      c.syntax.return = undefined;
    }
    if (type === "typealias" && c.syntax) {
      c.syntax.typeAliasType = c.syntax.return;
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
          if (typeChildrenItem.hasOwnProperty(itemKey)){
            item[itemKey] = typeChildrenItem[itemKey];
          }
        }
        item.children = items;
        children.push(item);
      }
    }
  }

  itemToModify.children = children;
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

var namespaceItems = {
  "package":      { inPackage: true,      typePropertyName: "inPackage",      id: "packages" },
  "subpackage":   { inSubpackage: true,   typePropertyName: "inSubpackage",   id: "subPackages" },
  "namespace":    { inNamespace: true,    typePropertyName: "inNamespace",    id: "namespaces" },
  "class":        { inClass: true,        typePropertyName: "inClass",        id: "classes" },
  "module":       { inModule: true,       typePropertyName: "inModule",       id: "modules" },
  "struct":       { inStruct: true,       typePropertyName: "inStruct",       id: "structs" },
  "interface":    { inInterface: true,    typePropertyName: "inInterface",    id: "interfaces" },
  "enum":         { inEnum: true,         typePropertyName: "inEnum",         id: "enums" },
  "delegate":     { inDelegate: true,     typePropertyName: "inDelegate",     id: "delegates" },
  "const":        { inConst: true,        typePropertyName: "inConst",        id: "consts",       isEmbedded: true },
  "variable":     { inVariable: true,     typePropertyName: "inVariable",     id: "variables",    isEmbedded: true },
  "property":     { inProperty: true,     typePropertyName: "inProperty",     id: "properties",   isEmbedded: true },
  "function":     { inFunction: true,     typePropertyName: "inFunction",     id: "functions",    isEmbedded: true },
  "type":         { inTypes: true,        typePropertyName: "inTypes",        id: "types",        isEmbedded: true },
  "method":       { inMethod: true,       typePropertyName: "inMethod",       id: "methods",      isEmbedded: true },
  "typealias":    { inTypeAlias: true,    typePropertyName: "inTypeAlias",    id: "typealiases",  isEmbedded: true },
};
var classItems = {
  "constructor":  { inConstructor: true,  typePropertyName: "inConstructor",  id: "constructors" },
  "field":        { inField: true,        typePropertyName: "inField",        id: "fields" },
  "property":     { inProperty: true,     typePropertyName: "inProperty",     id: "properties" },
  "method":       { inMethod: true,       typePropertyName: "inMethod",       id: "methods" },
  "event":        { inEvent: true,        typePropertyName: "inEvent",        id: "events" },
  "operator":     { inOperator: true,     typePropertyName: "inOperator",     id: "operators" },
  "eii":          { inEii: true,          typePropertyName: "inEii",          id: "eii" },
  "member":       { inMember: true,       typePropertyName: "inMember",       id: "members"},
  "function":     { inFunction: true,     typePropertyName: "inFunction",     id: "functions" },
  "const":        { inConst: true,        typePropertyName: "inConst",        id: "consts", isEmbedded: true }
};
// Used for Ruby modules. Currently identical to classItems, except isEmbedded is true for methods.
var rubyModuleItems = {
  "constructor":  { inConstructor: true,  typePropertyName: "inConstructor",  id: "constructors" },
  "field":        { inField: true,        typePropertyName: "inField",        id: "fields" },
  "property":     { inProperty: true,     typePropertyName: "inProperty",     id: "properties" },
  "method":       { inMethod: true,       typePropertyName: "inMethod",       id: "methods", isEmbedded: true },
  "event":        { inEvent: true,        typePropertyName: "inEvent",        id: "events" },
  "operator":     { inOperator: true,     typePropertyName: "inOperator",     id: "operators" },
  "eii":          { inEii: true,          typePropertyName: "inEii",          id: "eii" },
  "member":       { inMember: true,       typePropertyName: "inMember",       id: "members"},
  "function":     { inFunction: true,     typePropertyName: "inFunction",     id: "functions" },
  "const":        { inConst: true,        typePropertyName: "inConst",        id: "consts", isEmbedded: true }
};

function getDefinitions(category) {
  if (category === "rubyModule") {
    return rubyModuleItems;
  }
  if (category === 'class' || category === 'type') {
    return classItems;
  }
  if (category === 'ns') {
    return namespaceItems;
  }
  console.err("category '" + category + "' is not valid.");
  return undefined;
}

function normalizeLanguageValuePairs(list) {
  if (list[0] && list[0].lang && list[0].value) {
    return list[0].value;
  }
  return list;
}
