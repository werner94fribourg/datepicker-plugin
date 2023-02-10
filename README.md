# Datepicker module conversion - from jQuery to React

This project is a conversion into a react component of a datepicker module that was implemented using jQuery (see [here](https://github.com/xdan/datetimepicker)).

It reuses its styling and only focuses on the date selector part.

The datepicker module was published as an npm package.

## Documentation

The available components in this library are documented in this [page](https://sensational-yeot-db94d1.netlify.app).

## Use the datepicker

### Pre-requisites

React should be installed on your project to use the module since it is a custom react component.

### Installation

Type the following command to install the module in your react project :

```sh
npm install @werner94fribourg/datepicker-plugin
```

### Example

To be able to use the InputDate component, you need to wrap your application with the InputDateProvider component. This component gives you the access to the store for input dates.

The example below gives an example of using the provider in the index.js file.

```js
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import InputDateProvider from './InputDate/InputDateProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <InputDateProvider>
    <App />
  </InputDateProvider>
);
```

After wrapping your application with the InputDateProvider, you'll be able to call the InputDate component in every other component that will need it.

The InputDate component accepts a className to customize the rendering of the input.

```js
import InputDate from './InputDate/InputDate';

const Dummy = () => {
  return <InputDate className="dummy-class" />;
};
```
