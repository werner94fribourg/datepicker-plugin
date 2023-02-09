To be able to use the InputDate component and its datepicker, the InputDate store should be passed to the root of the application, with the InputDateProvider component.

That's the reason why, in the code example below, the InputDate is wrapped by the InputDateProvider to make its behavior work correctly.

```js
<InputDateProvider>
  <InputDate className="input" />
</InputDateProvider>
```
