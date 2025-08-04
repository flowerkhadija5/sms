# Student & Teacher Management System

A comprehensive web-based management system built with **Google Apps Script** and **Google Sheets** as the backend database. This system provides role-based authentication, student and teacher registration, list management, and comprehensive logging functionality.

## 🚀 Features

### 🔐 Authentication System
- **Login Page** with username and password validation
- **Role-based Access Control** (Admin/Teacher)
- **Session Management** with secure storage
- **Demo Credentials** for quick testing

### 📊 Dashboard
- **Summary Cards** showing total students, teachers, and subjects
- **Quick Action Buttons** for rapid navigation
- **Real-time Data** updates from Google Sheets
- **Role-based UI** (different views for Admin vs Teacher)

### 👨‍🎓 Student Management
- **Student Registration Form** with all required fields:
  - Name, DOB, Gender, Father's Name, Mother's Name
  - Contact, Email, Address, Admission Date, Class, WhatsApp, Subject
- **Auto-generated Student IDs** (format: STU + initials + subject + random number)
- **Student List View** with Edit/Delete functionality
- **Subject-based Filtering** for teachers

### 👩‍🏫 Teacher Management
- **Teacher Registration Form** with fields:
  - Name, Contact, Email, Subject, Date of Joining, Address
- **Auto-generated Teacher IDs** (format: TCH + initials + subject + random number)
- **Teacher List View** with Edit/Delete functionality
- **Admin-only Access** for teacher management

### 📝 Logging System
- **Comprehensive Action Logging** in dedicated logs sheet
- **Timestamp, Username, Role, Action Type, and Details**
- **Login/Registration/Delete Activity Tracking**

### 🎨 Modern UI/UX
- **TailwindCSS** for beautiful, responsive design
- **Lucide Icons** for consistent iconography
- **Mobile-responsive** layout with collapsible sidebar
- **Success/Error Alerts** with auto-dismiss
- **Loading States** for better user experience

## 📂 Google Sheets Structure

The system automatically creates 4 sheets in your Google Spreadsheet:

### 1. `login` Sheet
| Username | Password | Role | Subject |
|----------|----------|------|---------|
| admin | admin123 | Admin | All |
| teacher1 | teacher123 | Teacher | Mathematics |

### 2. `Students` Sheet
| Timestamp | Student ID | Name | DOB | Gender | Father Name | Mother Name | Contact | Email | Address | Admission Date | Class | WhatsApp | Subject |
|-----------|------------|------|-----|--------|-------------|-------------|---------|-------|---------|----------------|-------|----------|---------|

### 3. `Teachers` Sheet
| Teacher ID | Name | Contact | Email | Subject | Join Date | Address |
|------------|------|---------|-------|---------|-----------|---------|

### 4. `logs` Sheet
| Timestamp | Username | Role | Action Type | Details |
|-----------|----------|------|-------------|---------|

## 🛠️ Setup Instructions

### Step 1: Create Google Sheets
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new blank spreadsheet
3. Copy the **Spreadsheet ID** from the URL (between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/1ABC123.../edit`
   - Copy: `1ABC123...`

### Step 2: Create Google Apps Script Project
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default `Code.gs` content
4. Copy and paste the content from `Code.gs` file
5. **Replace `YOUR_SPREADSHEET_ID`** with your actual Spreadsheet ID

### Step 3: Add HTML Files
1. Click the "+" button next to "Files"
2. Select "HTML" file
3. Create the following HTML files:
   - `login.html` - Copy content from login.html
   - `dashboard.html` - Copy content from dashboard.html

### Step 4: Initialize the System
1. In the Apps Script editor, run the `initializeSheets()` function
2. This will create the required sheets and sample login data

### Step 5: Deploy as Web App
1. Click "Deploy" → "New deployment"
2. Choose "Web app" as type
3. Set execute as: "Me"
4. Set access: "Anyone" (or your preferred setting)
5. Click "Deploy"
6. Copy the web app URL

### Step 6: Set Permissions
1. When first accessed, Google will ask for permissions
2. Grant necessary permissions for Google Sheets access
3. Your system is now ready to use!

## 🔑 Default Login Credentials

### Admin Access
- **Username:** `admin`
- **Password:** `admin123`
- **Permissions:** Full access to all features

### Teacher Access
- **Username:** `teacher1`
- **Password:** `teacher123`
- **Permissions:** Limited to student viewing (filtered by subject)

## 📱 Role-based Features

### Admin Role
- ✅ View Dashboard Summary
- ✅ Register Students
- ✅ Register Teachers
- ✅ View/Edit/Delete Students
- ✅ View/Edit/Delete Teachers
- ✅ Access All Data

### Teacher Role
- ✅ View Dashboard Summary
- ✅ View Students (filtered by their subject)
- ❌ Register Students
- ❌ Register Teachers
- ❌ View/Manage Teachers
- ❌ Delete Students

## 🔧 Technical Stack

- **Frontend:** HTML5, TailwindCSS, JavaScript
- **Backend:** Google Apps Script
- **Database:** Google Sheets
- **Icons:** Lucide Icons
- **Authentication:** Session-based with localStorage
- **Deployment:** Google Apps Script Web App

## 🎯 Key Functions

### Backend Functions (Code.gs)
- `doGet()` - Main routing function
- `authenticateUser()` - Login validation
- `registerStudent()` - Student registration
- `registerTeacher()` - Teacher registration
- `getStudentsList()` - Fetch students with role filtering
- `getTeachersList()` - Fetch all teachers
- `deleteStudent()` / `deleteTeacher()` - Delete operations
- `getDashboardSummary()` - Dashboard statistics
- `logAction()` - Activity logging

### Frontend Functions
- `showView()` - Navigation between different views
- `loadStudentsList()` / `loadTeachersList()` - Load data tables
- `handleStudentRegistration()` / `handleTeacherRegistration()` - Form submissions
- `showAlert()` - Success/error notifications
- `checkAuthentication()` - Session validation

## 🔒 Security Features

- **Server-side Validation** for all operations
- **Role-based Access Control** in backend
- **Input Sanitization** and validation
- **Session Management** with automatic logout
- **Action Logging** for audit trail

## 🚦 Future Enhancements

- **Edit Functionality** for students and teachers
- **Advanced Search** and filtering
- **Data Export** to PDF/Excel
- **Email Notifications** for registrations
- **Profile Management** for users
- **Attendance Tracking** module
- **Grade Management** system

## 📞 Support

For setup assistance or feature requests, please refer to the Google Apps Script documentation or create an issue in the project repository.

## 📄 License

This project is open source and available under the MIT License.

---

**Built with ❤️ using Google Apps Script and Google Sheets**