import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route   } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import Layout from './components/Layout/Layout.jsx';
import Home from './components/Home/Home.jsx';
import About from './components/About/About.jsx';
import User from './components/User/User.jsx';


// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Layout />,
//     children: [
//       {
//         path: '/',
//         element: <Home/>
//       },
//       {
//         path: '/about',
//         element: <About />

//       }
//     ]
//   }
// ])

const router = createBrowserRouter(
  createRoutesFromElements(
  <Route path ='/' element={<Layout />} >
    <Route  path='/about' element={<About />} />
    <Route path ='' element={<Home />} />
    <Route  path ='user/:userid' element={<User/>}/>

  </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>

   <RouterProvider router ={router}/>
  </StrictMode>,
)
