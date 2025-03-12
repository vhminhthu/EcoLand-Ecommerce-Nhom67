
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext2.jsx';
import { SocketContextProvider } from './context/SocketContext.jsx';

import './index.css'
import App from './App.jsx'


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      refetchOnWindowFocus: false
    }
  }
})

createRoot(document.getElementById('root')).render(
  //<StrictMode>
  <BrowserRouter>
  <AuthContextProvider>
    <SocketContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    </SocketContextProvider>
    </AuthContextProvider>
    </BrowserRouter>
  //</StrictMode>,
)
