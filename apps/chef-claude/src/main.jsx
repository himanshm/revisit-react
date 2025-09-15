import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));

if (root) {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
} else {
  console.error('Root not found!');
}
