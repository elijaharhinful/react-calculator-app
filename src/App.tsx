import { useState } from 'react';
import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState<string>('0');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      // Evaluate the expression
      try {
        const result = eval(displayValue);
        setDisplayValue(result.toString());
      } catch (error) {
        setDisplayValue('Error');
      }
    } else if (value === 'CE') {
      // Clear everything
      setDisplayValue('0');
    } else if (value === 'C') {
      // Clear the last character (backspace)
      setDisplayValue(prevValue =>
        prevValue.length > 1 ? prevValue.slice(0, -1) : '0'
      );
    } else {
      // Update the display with the clicked value
      setDisplayValue(prevValue => {
        // Prevent starting with multiple zeros (e.g., '000123')
        if (prevValue === '0') {
          return value;
        } else {
          return prevValue + value;
        }
      });
    }
  };

  const gridItems = [
    '7', '8', '9', '+',
    '4', '5', '6', '-',
    '1', '2', '3', '8',
    '0', '.', '/', '=', 'CE', 'C'
  ];

  return (
    <div className='bg-gray-300 min-h-screen flex justify-center items-center'>
      <div className='max-w-md w-full md:w-2/5 p-4 rounded-lg shadow-lg bg-white'>
        <div className='bg-red-500 text-white text-right text-6xl p-6 rounded-t-md -mt-4 -mr-4 -ml-4'>
          {displayValue}
        </div>
        <div className='grid grid-cols-4 gap-2 p-4 hover:cursor-pointer'>
          {gridItems.map((item, index) => (
            <div
              key={index}
              className={`flex justify-center items-center text-4xl bg-gray-200 rounded-full p-6 hover:bg-red-100 hover:text-black ${item === 'CE' || item === 'C' ? 'text-red-500' : ''
                } ${item === '=' ? 'bg-red-600 text-white' : ''}`}
              onClick={() => handleButtonClick(item)}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
