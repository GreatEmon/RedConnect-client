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

// // Dashboard – Admin


// // Dashboard – Volunteer
// import VolunteerHome from '../pages/Dashboard/Volunteer/DashboardHome';
// import VolunteerAllRequests from '../pages/Dashboard/Volunteer/AllDonationRequests';
// import VolunteerContent from '../pages/Dashboard/Volunteer/ContentManagement';


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
        element: <Login/>

      },
      { 
        path: 'register', 
        element: <Register/>
      },
      { path: 'blog', Component: BlogList },
      { path: 'blog/:id', Component: BlogDetails },
      { path: 'search', Component: SearchPage },
      { path: 'donation-requests', Component: DonationRequests },
      { path: 'donation/:id', Component: DonationDetails },
      { path: 'funding', Component: Funding },
      { path: 'about', Component: AboutUs },
      { path: 'contact', Component: Contact },
      { path: 'privacy', Component: PrivacyPolicy },
      { path: 'terms', Component: TermsOfService },
      { path: 'restricted', Component: RestrictedAccess },
    ],
  },
  {
    path: '/dashboard',
    Component: DashboardLayout,
    children: [
      // Shared
      { 
        index: true, 
        Component: DonorHome 
      },
      {
        path: 'profile',
        element: <PrivateRouteAll>
          <Profile/>
        </PrivateRouteAll>
      },

      // Donor
      { 
        path: 'my-donation-requests', 
        Component: MyDonationRequests 
      },
      { path: 'create-donation-request', Component: CreateDonationRequest },
      { path: 'donation-request/edit/:id', Component: UpdateDonation },

      //       // Admin
      { 
        path: 'admin', 
        element:<IsAdmin>
          <AdminDashboard></AdminDashboard>
        </IsAdmin>  
      },
      { path: 'all-users', Component: AllUsers },
      { path: 'all-blood-donation-request', Component: AllBloodDonationRequests },
      { path: 'content-management', Component: ContentManagement },
      { path: 'content-management/add-blog', Component: AddBlog },

      //       // Volunteer
      //       { path: 'volunteer', Component: VolunteerHome },
      //       { path: 'volunteer/all-blood-donation-request', Component: VolunteerAllRequests },
      //       { path: 'volunteer/content-management', Component: VolunteerContent },
    ],
  },
  { path: '*', Component: NotFound },
]);

export default AppRoutes;
