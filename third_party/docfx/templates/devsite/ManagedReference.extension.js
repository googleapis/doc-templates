// Copyright (c) Microsoft. All rights reserved. Licensed under the MIT license. See LICENSE file in the project root for full license information.

/**
 * This method will be called at the start of exports.transform in ManagedReference.html.primary.js
 */
exports.preTransform = function (model) {
  return model;
}

/**
 * This method will be called at the end of exports.transform in ManagedReference.html.primary.js
 */
exports.postTransform = function (model) {
  // Set last field of last implements element so we can build a comma separated
  // list in the template. Otherwise, the final element would have a trailing
  // comma.
  if (model.implements) {
    model.implements[model.implements.length - 1].last = true;
  }
  return model;
}