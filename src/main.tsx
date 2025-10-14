import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { DrawerControllerProvider } from './context/DrawerControllerProvider.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <DrawerControllerProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </DrawerControllerProvider>
  </QueryClientProvider>,
)
