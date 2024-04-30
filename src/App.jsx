import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";

import { CitiesProvider } from "./contexts/CitiesContexts";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

// import Home from "./pages/Homepage";
// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import AppLayout from "./pages/AppLayout";
// import Login from "./pages/Login";
// import PageNotFound from "./pages/PageNotFound";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

//  I creates this for improved performance
const Home = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const Login = lazy(() => import("./pages/Login"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

/* "
1) to import react router do npm i react-router@6
2) and go to app file return <BrowserRouter =>  <Routes> => <Route path="/" element={<YourComponent/>} > and you can do same thing in another way like this <Route path="/" component={<YourComponent/>} > and this you can replace component method by render method but render method can write function and logic inside it 
3) to do page not found do path="*" and your component  and we can do same thing by without path this will catch any exist and by 
4) you can write code before browserRouter and return in page
5) nested list of routs in one route use <Route>
? in side here implement new Route and you can do default page when start  <Route index element={your component or jsx }/>
</Route>
6) link to any pages you want to must be like this <Link to={your pages or any things }> writing here some jsx if you click go to your pages
7) when you used some things like this <Route path="cities/:id"  element={jsx or component}></Route> (:id) will be in useParams() you can call id or any thing  
8) we have search params and set search params we used this for get search params (this means words after :id) the parameter we can get any parameters
9) we have use-navigate  function that allow them to move between urls easily
10) we used function lazy to improve performance
11) we used suspense component for get loading in when user navigates between pages
12) if we have navbar and don't need to repeat the navbar use you component navbar after browser router component
*/
function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage />}>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="Product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route
                path="app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                {/* //!this nested route   */}
                <Route index element={<Navigate replace to="cities" />} />
                <Route path="cities" element={<CityList />} />
                <Route path="cities/:id" element={<City />} />
                <Route path="countries" element={<CountryList />} />
                <Route path="form" element={<Form />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}

export default App;
