# annotated-prop-types

Sometimes, you might find it useful to extract information from your React components on runtime using their `propTypes`. However, this can be tragically difficult to extract meaningful information from because `React.PropTypes` is just a collection of functions.

Using this module adds additional properties onto the PropType validators, which you can use to extract extra information about what the propTypes actually are.

## Exposed Properties

The following properties are exposed on every PropType:

- `typeName` - Matches the name of the validator on `React.PropTypes`, such as `string`, 'bool', 'oneOf', etc.
- `typeRequired` - If `.isRequired` was used in the propTypes definition, this is true. Otherwise, it is false.

For PropTypes that you pass an argument to (such as `shape` and `oneOf`), there's an additional property:

- `typeChecker` - The argument that you passed to the PropType function.

## Example

```js
import 'annotated-prop-types';
import { PropTypes } from 'react';

console.log(PropTypes.string.typeName); // 'string'
console.log(PropTypes.string.typeRequired); // false
console.log(PropTypes.string.isRequired.typeRequired); // true

console.log(PropTypes.oneOf(['hello', 'world']).typeName); // 'oneOf'
console.log(PropTypes.oneOf(['hello', 'world']).typeRequired); // false
console.log(PropTypes.oneOf(['hello', 'world']).typeChecker); // ['hello', 'world']
console.log(PropTypes.oneOf(['hello', 'world']).isRequired.typeRequired); // true
```
