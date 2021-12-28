# SNS Application

> fork from [ens-app](git@github.com:ensdomains/ens-app.git)

## Installation

### Manual

Expects Node.js version >=14.17.0

```shell
$> https://github.com/Link-Key/sns-app.git
$> cd sns-app
$> yarn install
$> yarn start
```

Open your browser at localhost:3000 and open metamask.

To start the ipfs-enabled build:

```bash
yarn start:ipfs
```

The main difference of the ipfs-build is that it uses HashRouter instead of BrowserRouter and makes sure all links are relative.

## Unit Testing

All tests are run with Jest for both the front-end application and testing blockchain functionality. For blockchain based tests it uses `ganache-cli` by default. If you want to see the transactions in the Ganache GUI, you can change the environment in the test file from `GANACHE_CLI` to `GANACHE`. Then you can open Ganache on your computer and test manually after the test runner deploys the contracts.

To run the tests:

```
npm test
```

To speed up the tests, the contracts are compiled before the tests. If you need to update the solidity code, you can run `npm run compile` to recompile the code. Alternatively you can uncomment the code that compiles the contracts in the tests, which will slow down the tests considerably.

## Coding Style and Contribution Guide

### Importing and Exporting

Global modules will be imported first regardless, e.g. React, ReactDOM and any other libraries that are installed via NPM. Imports thereafter will be separated by type with line separating each type. Generally React components will only have one export, unless there are multiple versions of that component, or it's a collection of related styled components. Since there are generally only one export, we will use `export default` to allow more flexibility.

```js
import React from 'react'
import ReactDOM from 'react'
import styled from '@emotion/styled/macro'

import util from '../utils'

import ComponentA from '../components/ComponentA'
import ComponentB from '../components/ComponentB'

export
```

### React Style

We use a functional components, using hooks instead of class based components. For basic state we use `useState` and for more complicated state `useReducer`. If they reusable, then you can abstract them to the `hooks` file, which can additionally by split up into a folder once we have enough hooks.

```js
import React, { useState } from 'react'

export default function Component({ someProp }) {
  const [state, setState] = useState(null)
  return <div>...</div>
}
```

### CSS/Styling

Styling in this app is done with Emotion, with `styled` components style CSS. We do not use `css` or classNames, unless we are [passing through the styles to a component](https://emotion.sh/docs/styled#styling-any-component). We use the babel plugin macros import as this enables labels and source mapping for our components. We also use parentheses for all styled components to keep consistency when we create components that compose with each other.

```js
import styled from '@emotion/styled/macro'

const Component = styled('div')`
  display: flex;
`
```

### Media Queries

The main way to use media queries is with the helper function `mq` located in the root at `mediaQuery`. We have absolute URL support, so you can just import it directly as `mediaQuery`. It has properties for all the breakpoints supported by our app. We also have a `useMediaMin` hook, which we plan to roll out to replace the render prop version when we can convert all our components to functional components.

Currently supported breakpoints:

```js
const breakpoints = {
  small: 576,
  medium: 768,
  large: 992,
  xLarge: 1200
}
```

You can use it as follows:

```js
import styled from '@emotion/styled/macro'
import mq from 'mediaQuery'

const SomeComponent = styled('div')`
  font-size: 14px;
  ${mq.small`
    font-size: 22px;
  `}
`
```

The second way is using hooks, which uses `useEffect` and `useState` underneath. This must be used with functional components.

```js
import { useMediaMin } from './mediaQuery'

function Component(){
  const mediumBP = useMediaMin('medium')
  return <>
    {mediumBP ? <LargeComponent /> : <SmallComponent />}
  <>
}
```

### Cypress testing best practice.

Cypress end 2 end testing tends to be very flakey when ran on CI environment.

- Assert the existence before assert the non existence = Cypress waits until the default timeout (set to 12 sec) to make sure that the element does not exist whereas asserting the existence of an element completes as soon as the element becomes visible. Try to assert existing element with default timeout, then try to assert non-existing element with `timeout:0` to speed up.
- Fix warnings = Sometimes React elements render in the strange way very subtly which may not be visible by human but can be detected by automated test. If some assertion is failing, check if there are warning and try to fix them first.
- Make use of testid rather than asserting with css attributes (such as color) = Asserting to change if button becomes clickable tends to be flakey as you have to manually loop and check the css attribute rather than allowing cypress to wait with built-in timeout feature. Try to set testid such as `button-${ canClick ? 'enabled' : 'disabled' }` so that you can set assertion against enabled/disabled condition.
- Consolidate tests where applicable = Even though it's discouraged in unit testing, doing so will save time for setup/teardown. If test is slow because it's doing lots of setup/teardown for each test cast, try to consolidate them.

## Internationalisation

We use the `i18next` and `react-i18next` package for internationlisation.

Currently we use `/public/locales/[language].json` for translation. Each property should be a page or reusable component. The only exception to this is `c` which is a namespace we are using for `common` language throughout the app that will have to be reused over and over.

### Adding a new language

To add a new language, copy the `public/locals/en.json` file, and name it [language].js and then you can begin to translate each label one by one.

The other thing that needs to be changed is `LanguageSwitcher.js`, which has a list of currently supported languages, and the `i18n.js` init file. This will add the language to our dropdown menu.

Once this has been done, please create a pull request for us to review and check it has been done correctly.

## Bundle size

If you add a new package or make a change to the way files are being imported
(e.g. adding an import statement to a file), you should run `yarn build` before and
after the changes and you will see how your changes have impacted the bundle sizes on the
second run.

if the bundle size has changed significantly (100kb+) you probably want to consider taking
steps to mitigate this:

- Code splitting: https://reactjs.org/docs/code-splitting.html

- Dynamic imports: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import

- Importing only what you need: If you can only import the exact files you need from a module, you
  can avoid bundling the whole modlue which can be quite large. Typically you can do this by going into
  the library in your `node_modules` folder and finding the file exact file you need. For example
  if you find the file you need is at `node_modules/@module/src/helpers/index.js` you can do
  `import helper from '@module/src/helpers/index'`.
