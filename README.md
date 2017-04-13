# microjoi
Swagger documentation tool for [microapi](https://www.npmjs.com/package/microapi)-based projects using Joi schemas.

## Usage
```
npm install -g microjoi
```

```
cd /path/to/your/project
microjoi [./api/directory]
```

Microjoi will look for `/schemas` and `/definitions` directories under your project's `/api` directory (or the supplied path), convert all found Joi schemas to Swagger objects, and create a `swagger.json` file within that directory.
