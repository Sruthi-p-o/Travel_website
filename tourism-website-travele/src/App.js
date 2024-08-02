import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./Context/AuthProvider";
import Header from "./Pages/Header/Header";
import Home from "./Pages/Home/Home/Home";
import AllReviews from "./Pages/AllReviews/AllReviews";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Success from "./Pages/Success/Success";
import Empty from "./Pages/Empty/Empty";
import Footer from "./Pages/Footer/Footer";
import AllTours from "./Pages/AllTours/AllTours";
import TourBooking from "./Pages/Home/TourBooking/TourBooking";
import MyBookings from "./Pages/MyBookinngs/MyBookinngs";
import ManageBookings from "./Pages/MangeBookings/ManageBookings";
import AddTours from "./Pages/AddTours/AddTours";
import About from "./Pages/About/About";
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminDashboard from "./Pages/Admin/AdminDashboard";
import PrivateRoute from "./Pages/Login/PrivateRoute/PrivateRoute";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>



            <Route path="/AllReviews">
              <AllReviews />
            </Route>


            
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <PrivateRoute path="/allTours">
              <AllTours />
            </PrivateRoute>
            <PrivateRoute path="/tour/:tourId">
              <TourBooking />
            </PrivateRoute>
            <PrivateRoute path="/myBookings">
              <MyBookings />
            </PrivateRoute>
            <PrivateRoute path="/manageBookings">
              <ManageBookings />
            </PrivateRoute>
            <PrivateRoute path="/addTours">
              <AddTours />
            </PrivateRoute>
            <PrivateRoute path="/success">
              <Success />
            </PrivateRoute>
            <Route path="/admin/login">
              <AdminLogin />
            </Route>
            <Route path="/admin/dashboard">
              <AdminDashboard />
            </Route>
            <Route path="*">
              <Empty />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
