![VMS application](https://github.com/erwindev/vendor-management-ui/workflows/VMS%20application/badge.svg)

# Vendor Management System UI

## Clone project
```
$ git clone https://github.com/erwindev/vendor-management-ui.git
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test

# lints and fix files
npm run lint
```

## Start JSON Server
```bash
cd dummy_data
json-server --watch software.json
```
Note: In order to test the UI application independent of the backend, we will fake the data using `json-server`.
