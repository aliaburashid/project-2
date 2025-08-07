# 📸 FlickGallery - REST API Social Media Platform

> **A modern, full-stack web application demonstrating REST API concepts with Node.js, Express, MongoDB, and JSX View Engine**

![FlickGallery Logo](https://img.shields.io/badge/FlickGallery-REST--API-blue?style=for-the-badge&logo=nodejs)

## 🚀 Project Overview

FlickGallery is a REST API demonstration project that showcases modern web development concepts with an Instagram-inspired interface. The project focuses on demonstrating RESTful API design, CRUD operations, authentication, and MVC architecture patterns.

### 📋 Wireframe & Design
- **Wireframe Documentation**: [View Wireframe](https://docs.google.com/document/d/1QBZTRSbJG-Ua9X5c4dpJdOj92AUkLNowKYgllVb4d2o/edit?tab=t.0#heading=h.ywd8tfo28l0j)

###  Key Features

- **User Authentication** - Secure JWT-based login/signup system
- **Instagram-like UI/UX** - Modern, responsive design with smooth animations
- **Photo Sharing** - Upload, process, and display images with captions
- **Comment System** - Add comments to posts with user interactions
- **User Profiles** - Customizable profiles with bio and profile pictures
- **REST API Design** - Demonstrates proper HTTP methods and status codes
- **Mobile Responsive** - Optimized for all device sizes

---

## 🛠️ Technology Stack

### **Backend Technologies**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing and security

### **Frontend Technologies**
- **JSX View Engine** - Server-side rendering with JSX syntax
- **CSS3** - Modern styling with animations and transitions
- **Font Awesome** - Icon library for UI elements
- **Google Fonts** - Custom typography (Dancing Script)

### **Development Tools**
- **Nodemon** - Auto-restart server during development
- **Morgan** - HTTP request logger
- **Method Override** - Support for PUT/DELETE requests
- **Jest** - Testing framework with coverage reporting



---

## 📋 Route Table

### Authentication Routes (`/authors`)

| Method | Route | Description | View |
|--------|-------|-------------|------|
| `GET` | `/authors` | Sign up form | `SignUp.jsx` |
| `POST` | `/authors` | Create new user | Redirect to login |
| `GET` | `/authors/login` | Login form | `SignIn.jsx` |
| `POST` | `/authors/login` | Authenticate user | Redirect to feed |
| `GET` | `/authors/profile` | User's profile page | `Profile.jsx` |
| `GET` | `/authors/edit` | Edit profile form | `EditProfile.jsx` |
| `PUT` | `/authors/profile` | Update profile | Redirect to profile |
| `POST` | `/authors/logout` | Logout user | Redirect to login |

### Post Routes (`/posts`)

| Method | Route | Description | View |
|--------|-------|-------------|------|
| `GET` | `/posts` | Feed page (all posts) | `Feed.jsx` |
| `GET` | `/posts/new` | Create new post form | `NewPost.jsx` |
| `POST` | `/posts` | Create new post | Redirect to post |
| `GET` | `/posts/:id` | Show single post | `ShowPost.jsx` |
| `POST` | `/posts/:postId/comments` | Add comment to post | Stay on page |
| `DELETE` | `/posts/:id` | Delete post | Redirect to profile |


---

## 🏗️ Project Structure

```
project-2/
├── 📁 controllers/
│   ├── 📁 auth/
│   │   ├── apiController.js      # API endpoints for auth
│   │   ├── dataController.js     # Auth business logic
│   │   ├── routeController.js    # Auth web routes
│   │   └── viewController.js     # Auth view rendering
│   └── 📁 posts/
│       ├── apiController.js      # API endpoints for posts
│       ├── dataController.js     # Post business logic
│       ├── routeController.js    # Post web routes
│       └── viewController.js     # Post view rendering
├── 📁 middleware/
│   ├── auth.js                  # Authentication middleware
│   └── upload.js                # File upload processing
├── 📁 models/
│   ├── author.js                # User model schema
│   ├── comment.js               # Comment model schema
│   ├── db.js                    # Database connection
│   └── post.js                  # Post model schema
├── 📁 public/
│   ├── styles.css               # Main stylesheet
│   ├── images/                  # Static images
│   └── uploads/                 # User uploaded content
├── 📁 routes/
│   └── apiRoutes.js             # API route definitions
├── 📁 tests/
│   ├── author.test.js           # User tests
│   ├── integration.test.js      # Integration tests
│   └── post.test.js             # Post tests
├── 📁 views/
│   ├── 📁 auth/
│   │   ├── EditProfile.jsx      # Profile editing view
│   │   ├── SignIn.jsx           # Login form
│   │   └── SignUp.jsx           # Registration form
│   ├── 📁 layouts/
│   │   └── Layout.jsx           # Main layout component
│   └── 📁 posts/
│       ├── Feed.jsx             # Main feed view
│       ├── NewPost.jsx          # Post creation form
│       ├── Profile.jsx          # User profile view
│       └── ShowPost.jsx         # Single post view
├── app.js                       # Express app configuration
├── server.js                    # Server entry point
└── package.json                 # Dependencies and scripts
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **Git** (for version control)

### 1. Clone the Repository
```bash
git clone <repository-url>
cd project-2
```

### 2. Install Dependencies
```bash
npm install
```

This will install all required dependencies including:

**Production Dependencies:**
- `bcrypt` - Password hashing
- `dotenv` - Environment variables
- `express` - Web framework
- `jsonwebtoken` - JWT authentication
- `jsx-view-engine` - JSX rendering
- `method-override` - PUT/DELETE support
- `mongoose` - MongoDB ODM
- `morgan` - HTTP logging

**Development Dependencies:**
- `jest` - Testing framework
- `mongodb-memory-server` - In-memory MongoDB for tests
- `supertest` - HTTP testing

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
MONGODB_URI=mongodb://localhost:27017/flickgallery
JWT_SECRET=your-secret-key-here
PORT=3000
```

### 4. Start the Application

```bash
nodemon server.js
```

### 5. Access the Application
Open your browser and navigate to:
```
http://localhost:3000/authors
```

## 🔧 Key Features Explained

### **REST API Design**
- **HTTP Methods**: Proper use of GET, POST, PUT, DELETE
- **Status Codes**: Appropriate HTTP response codes
- **Resource-based URLs**: RESTful endpoint design
- **Authentication**: JWT-based route protection

### **Authentication System**
- **JWT Tokens**: Secure, stateless authentication
- **Password Hashing**: bcrypt for secure password storage
- **Session Management**: Token-based user sessions
- **Route Protection**: Middleware for protected routes

### **Image Processing**
- **File Upload**: Multer middleware for file handling
- **Image Optimization**: Automatic resizing and compression
- **Multiple Formats**: Support for JPG, PNG, HEIC formats
- **Storage Management**: Organized file structure

### **User Experience**
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: CSS transitions and hover effects
- **Server-side Rendering**: JSX templates with dynamic data
- **Instagram-like UI**: Familiar social media interface

### **Database Design**
- **MongoDB**: NoSQL database for flexible data structure
- **Mongoose ODM**: Object modeling for MongoDB
- **Relationships**: User posts and comments
- **Indexing**: Optimized queries for performance


---

## 👨‍💻 Author

**Alia Burashid** - *Software Engineering Student at General Assembly*

*REST API demonstration project*

---