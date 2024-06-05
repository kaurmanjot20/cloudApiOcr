
import Ocr from './Component/Ocr';
import { MantineProvider } from '@mantine/core';
import './App.css';


function App() {
  return (
    <MantineProvider>
      <div className="App">
        <Ocr />
      </div>
    </MantineProvider>
  );
}

export default App;
