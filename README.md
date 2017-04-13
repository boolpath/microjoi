# microjoi
Swagger documentation tool for [microapi](https://www.npmjs.com/package/microapi)-based projects using [joi](https://www.npmjs.com/package/joi) schemas.

## Usage
```
npm install -g microjoi
```

```
cd /path/to/your/project
microjoi [./api/directory]
```

Microjoi will look for a `/schemas` directory and a `definitions.js` file under your project's `/api` directory (or the supplied path), convert all found **joi** schemas to Swagger objects, and create a `swagger.json` file within that directory. If a `swagger.json` file already exists, Microjoi will load the file and update it with the new paths and definitions, thus preserving the remaining fields.

### ./api/definitions.js
``` js
const joi = require('joi')

module.exports = {
  'schema-name': joi...
}
```
