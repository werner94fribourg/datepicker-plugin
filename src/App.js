import InputDate from './InputDate/InputDate';
import InputDateProvider from './InputDate/InputDateProvider';

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
