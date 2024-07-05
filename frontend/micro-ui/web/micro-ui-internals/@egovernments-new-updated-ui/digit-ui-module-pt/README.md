
# digit-ui-module-pt

## Install

```bash
npm install --save @egovernments/digit-ui-module-pt
```

## Limitation

```bash
This Package is more specific to DIGIT-UI's can be used across mission's
```

## Usage

After adding the dependency make sure you have this dependency in

```bash
frontend/micro-ui/web/package.json
```

```json
"@egovernments/digit-ui-module-pt":"^1.5.0",
```

then navigate to App.js

```bash
 frontend/micro-ui/web/src/App.js
```


```jsx
/** add this import **/

import { initPTComponents } from "@egovernments/digit-ui-module-pt";

/** inside enabledModules add this new module key **/

const enabledModules = ["PT"];

/** inside init Function call this function **/

const initDigitUI = () => {
  initPTComponents();
};
```




### Changelog

```bash
1.7.1 UPYOG Base version
```

### Contributors

[jagankumar-egov] [Tulika-eGov]  [vamshikrishnakole-wtt-egov] 

## Documentation

Documentation Site (https://core.digit.org/guides/developer-guide/ui-developer-guide/digit-ui)

## Maintainer

- [jagankumar-egov](https://www.github.com/jagankumar-egov)


### Published from DIGIT Frontend 
DIGIT Frontend Repo (https://github.com/upyog/UPYOG/tree/develop)


![Logo](https://s3.ap-south-1.amazonaws.com/works-dev-asset/mseva-white-logo.png)