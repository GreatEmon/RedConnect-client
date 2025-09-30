import { createBrowserRouter } from 'react-router';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/Home/Home';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import DonationRequests from '../pages/BloodDonation/DonationRequests ';
import BlogList from '../pages/Blog/BlogList';
import Funding from '../pages/Funding/Funding';


// Dashboard Common
import Profile from '../pages/Dashboard/Profile';
import DonorHome from '../pages/Dashboard/Donor/DonorHome';
import UpdateDonation from '../pages/Dashboard/UpdateDonation'
import CreateDonationRequest from '../pages/Dashboard/CreateDonationRequest';
import DonationDetails from '../pages/BloodDonation/DonationDetails';
import MyDonationRequests from '../pages/Dashboard/Donor/MyDonationRequests';
import AdminDashboard from '../pages/Dashboard/Admin/AdminDashboard';
import AllUsers from '../pages/Dashboard/Admin/AllUsers';
import AllBloodDonationRequests from '../pages/Dashboard/Admin/AllBloodDonationRequests';
import ContentManagement from '../pages/Dashboard/Admin/ContentManagement';
import SearchPage from '../pages/Search/SearchPage';
import BlogDetails from '../pages/Blog/BlogDetails';
import NotFound from '../pages/NotFound/NotFound';
import RestrictedAccess from '../pages/RestrictedAccess/RestrictedAccess';
import AboutUs from '../pages/public/About';
import Contact from '../pages/public/Contact';
import PrivacyPolicy from '../pages/public/Privacy';
import TermsOfService from '../pages/public/TermsofService';
import PrivateRouteAll from '../PrivateRoute/PrivateRouteAll';
import IsAdmin from '../PrivateRoute/IsAdmin';
import AddBlog from '../pages/Blog/Addblog';
import OnlyAdmin from '../PrivateRoute/OnlyAdmin';


const AppRoutes = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'login',
        element: <Login />

      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'search',
        Component: SearchPage

      },
      {
        path: 'blog',
        Component: BlogList
      },
      {
        path: 'blog/:id',
        Component: BlogDetails
      },
      {
        path: 'donation-requests',
        Component: DonationRequests
      },
      {
        path: 'about',
        Component: AboutUs
      },
      {
        path: 'contact',
        Component: Contact
      },
      {
        path: 'privacy',
        Component: PrivacyPolicy
      },
      {
        path: 'terms',
        Component: TermsOfService
      },
      {
        path: 'restricted',
        Component: RestrictedAccess
      },


      // Private Route
      {
        path: 'donation/:id',
        element: <PrivateRouteAll>
          <DonationDetails></DonationDetails>
        </PrivateRouteAll>
      },
      {
        path: 'funding',
        element: <PrivateRouteAll>
          <Funding></Funding>
        </PrivateRouteAll>
      }
    ],
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      // // Donor
      {
        index: true,
        element: <PrivateRouteAll>
          <DonorHome></DonorHome>
        </PrivateRouteAll>
      },
      {
        path: 'donation-request/edit/:id',
        element: <PrivateRouteAll>
          <UpdateDonation></UpdateDonation>
        </PrivateRouteAll>
      },

      {
        path: 'profile',
        element: <PrivateRouteAll>
          <Profile />
        </PrivateRouteAll>
      },
      {
        path: 'create-donation-request',
        element: <PrivateRouteAll>
          <CreateDonationRequest />
        </PrivateRouteAll>
      },

      {
        path: 'my-donation-requests',
        element: <PrivateRouteAll>
          <MyDonationRequests />
        </PrivateRouteAll>
      },


      // Admin

      {
        path: 'stat',
        element: <IsAdmin>
          <AdminDashboard></AdminDashboard>
        </IsAdmin>
      },
      {
        path: 'all-users',
        element: <OnlyAdmin>
          <AllUsers></AllUsers>
        </OnlyAdmin>
      },
      {
        path: 'all-blood-donation-request',
        element: <IsAdmin>
          <AllBloodDonationRequests></AllBloodDonationRequests>
        </IsAdmin>
      },
      {
        path: 'content-management',
        element: <IsAdmin>
          <ContentManagement></ContentManagement>
        </IsAdmin>
      },
      {
        path: 'content-management/add-blog',
        element: <IsAdmin>
          <AddBlog></AddBlog>
        </IsAdmin>
      },
    ],
  },
  { path: '*', Component: NotFound },
]);

export default AppRoutes;
