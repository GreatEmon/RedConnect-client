# RedConnect - Blood Donation Application 🩸

RedConnect is a user-friendly platform built with the MERN stack (MongoDB, Express, React, Node.js) that connects blood donors with those in need. The application enables donors, volunteers, and admins to efficiently manage blood donation requests, user profiles, blogs, and funding contributions.

---

## 🌐 Front-End Live Site
[https://redconnect-c4616.web.app/](https://redconnect-c4616.web.app/)

## 📂 Client-Side Repository
[https://github.com/GreatEmon/RedConnect-client](https://github.com/GreatEmon/RedConnect-client)

## 📂 Server-Side Repository
[https://github.com/GreatEmon/RedConnect-backend](https://github.com/GreatEmon/RedConnect-backend)

---

## 🧩 Features

### 1. User Roles & Permissions
- **Admin**: Manage users, donation requests, blogs, and view total statistics.
- **Donor**: Register, create/view donation requests, manage profile.
- **Volunteer**: Manage donation requests and view content management.

### 2. Authentication
- User registration and login with Firebase Authentication.
- Role-based access control.
- JWT used for protecting private APIs.

### 3. Donor Dashboard
- View recent donation requests.
- Edit, delete, and track donation request status.
- Responsive design for desktop, tablet, and mobile.

### 4. Admin Dashboard
- View total users, total donations, and donation requests.
- Manage all donation requests.
- Content management for blogs (add, publish, delete).
- Pagination and filtering in tables.

### 5. Volunteer Dashboard
- Update donation request status.
- Limited permissions compared to admin.
- View donation requests and content management.

### 6. Public Pages
- Home page with banner, featured sections, contact form.
- Search donors by blood group, district, and upazila.
- View donation requests and blogs.
- Funding page with Stripe integration.

### 7. Blood Donation Requests
- Create and manage requests with recipient details.
- Track status: pending, in progress, done, canceled.
- Donor and admin can update status accordingly.

### 8. Funding System
- Users can give funds via Stripe integration.
- Admin and volunteers can see total funding statistics.
- Show donations in tabular format with pagination.

### 9. Blogs
- Admin can add, publish, unpublish, and delete blogs.
- Display all published blogs on public page.
- Rich text editor integrated using `jodit-react`.

### 10. Extra Features
- SweetAlert2 notifications for all CRUD operations.
- TanStack Query used for all GET requests.
- Fully responsive design for all devices.
- Optionally export search results to PDF.

---

## 💻 Tech Stack
- **Frontend**: React.js, Tailwind CSS, DaisyUI, Framer Motion/AOS (optional animations)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: Firebase Authentication
- **Payment Integration**: Stripe
- **PDF Export**: jsPDF, jsPDF-AutoTable
- **State Management & Data Fetching**: React Hooks, TanStack Query

---

## ⚙️ How to Run Locally

### 1. Clone Repositories
```bash
# Frontend
git clone https://github.com/GreatEmon/RedConnect-client.git

# Backend
git clone https://github.com/GreatEmon/RedConnect-backend.git

# Frontend
cd RedConnect-client
npm install

# Backend
cd RedConnect-backend
npm install


# Start Backend
cd RedConnect-backend
npm run dev

# Start Frontend
cd RedConnect-client
npm run dev
