'use strict';

var PropTypes = require('prop-types');

// Stash the original PropTypes so that we can call them later:
var OriginalPropTypes = Object.assign({}, PropTypes);

function createAnnotatedPropType(name) {
  var propType = OriginalPropTypes[name];

  // Add the metadata we want on the propType:
  propType.typeName = name;
  propType.typeRequired = false;
  propType.isRequired.typeName = name;
  propType.isRequired.typeRequired = true;

  return propType;
}

function createOfProptype(name) {
  return function(typeChecker) {
    var propType = OriginalPropTypes[name](typeChecker);

    // Add the metadata we want on the PropType:
    propType.typeName = name;
    propType.typeRequired = false;
    propType.typeChecker = typeChecker;
    propType.isRequired.typeName = name;
    propType.isRequired.typeRequired = true;
    propType.isRequired.typeChecker = typeChecker;

    return propType;
  };
}

// Mirror the structure of PropTypes.
var annotatedPropTypes = {
  // These typecheckers are just used directly.
  array: createAnnotatedPropType('array'),
  bool: createAnnotatedPropType('bool'),
  func: createAnnotatedPropType('func'),
  number: createAnnotatedPropType('number'),
  object: createAnnotatedPropType('object'),
  string: createAnnotatedPropType('string'),
  symbol: createAnnotatedPropType('symbol'),
  element: createAnnotatedPropType('element'),
  node: createAnnotatedPropType('node'),
  any: createAnnotatedPropType('any'),

  // These typeCheckers are functions you call with a `typeChecker`.
  arrayOf: createOfProptype('arrayOf'),
  instanceOf: createOfProptype('instanceOf'),
  objectOf: createOfProptype('objectOf'),
  oneOf: createOfProptype('oneOf'),
  oneOfType: createOfProptype('oneOfType'),
  shape: createOfProptype('shape'),
};

// Overwrite the PropTypes:
const exportTypes = Object.assign(PropTypes, annotatedPropTypes);

// Export our new PropTypes:
module.exports = exportTypes;
