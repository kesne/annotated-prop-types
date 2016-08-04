const test = require('tape');
const React = require('react');

const OriginalPropTypes = React.PropTypes;
const annotatedPropTypes = require('./index');
const PropTypes = React.PropTypes;

test('overwrites Reacts PropTypes', function(t) {
  t.equal(PropTypes, annotatedPropTypes);
  t.end();
});

test('provides type information for basic types', function(t) {
  const basicTypes = [
    'array',
    'bool',
    'func',
    'number',
    'object',
    'string',
    'symbol',
    'element',
    'node',
    'any',
  ];
  basicTypes.forEach(function(type) {
    t.equal(PropTypes[type].typeName, type, type + " provides typeName");
    t.equal(PropTypes[type].typeRequired, false, type + " typeRequired false");
    t.equal(PropTypes[type].isRequired.typeName, type, type + ".isRequired provides typeName");
    t.equal(PropTypes[type].isRequired.typeRequired, true, type + ".isRequired typeRequired true");
  });
  t.end();
});

test('provides type information for of types', function(t) {
  const ofTypes = [
    'arrayOf',
    'instanceOf',
    'objectOf',
    'oneOf',
    'oneOfType',
    'shape',
  ];
  const typeChecker = ['yep'];
  ofTypes.forEach(function(type) {
    const propType = PropTypes[type](typeChecker);
    t.equal(propType.typeName, type, type + " provides typeName");
    t.equal(propType.typeRequired, false, type + " typeRequired false");
    t.equal(propType.typeChecker, typeChecker, type + " provides typeChecker");
    t.equal(propType.isRequired.typeName, type, type + ".isRequired provides typeName");
    t.equal(propType.isRequired.typeRequired, true, type + ".isRequired typeRequired true");
    t.equal(propType.isRequired.typeChecker, typeChecker, type + ".isRequired provides typeChecker");
  });
  t.end();
});
