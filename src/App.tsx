import { RouterProvider } from 'react-router';
import { router } from './routes';
import { AppContentProvider } from './context/AppContentContext';

function App() {
  return (
    <AppContentProvider>
      <RouterProvider router={router} />
    </AppContentProvider>
  );
}

export default App;
