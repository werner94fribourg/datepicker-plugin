import InputDate, { InputDateProvider } from './InputDate/InputDate';

function App() {
  return (
    <div>
      <InputDateProvider>
        <InputDate />
        <InputDate />
      </InputDateProvider>
    </div>
  );
}

export default App;
