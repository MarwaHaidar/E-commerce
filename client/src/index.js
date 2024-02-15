import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import CategoryProvider from './Components/Admin/CategoryAdmin/CategoryProvider';
import SubCategoryProvider from './Components/Admin/SubCategoryAdmin/SubCategoryProvider';
import { TimerProvider } from './Components/Home/Sale/timer/contextTime';
//import { CartProvider} from './Components/Cart/cartContext';
// import { CartProvider } from './cartcontext'; ;
// import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
<TimerProvider>
 <CategoryProvider>
  <React.StrictMode>
   
  <SubCategoryProvider>
  <App />


  </SubCategoryProvider>
  
  </React.StrictMode>
  </CategoryProvider>
  </TimerProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
