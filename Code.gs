/**
 * Student & Teacher Management System
 * Google Apps Script Backend
 */

// Configuration
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // Replace with your Google Sheets ID
const SHEETS = {
  LOGIN: 'login',
  STUDENTS: 'Students',
  TEACHERS: 'Teachers',
  LOGS: 'logs'
};

/**
 * Main function to serve HTML pages
 */
function doGet(e) {
  const page = e.parameter.page || 'login';
  
  if (page === 'login') {
    return HtmlService.createTemplateFromFile('login')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  } else if (page === 'dashboard') {
    return HtmlService.createTemplateFromFile('dashboard')
      .evaluate()
      .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  }
  
  // Default to login
  return HtmlService.createTemplateFromFile('login')
    .evaluate()
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Include external files (CSS/JS)
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * Login Authentication
 */
function authenticateUser(username, password) {
  try {
    const sheet = getSheet(SHEETS.LOGIN);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === username && data[i][1] === password) {
        const userInfo = {
          username: data[i][0],
          role: data[i][2],
          subject: data[i][3]
        };
        
        // Log login action
        logAction(username, data[i][2], 'LOGIN', `User logged in successfully`);
        
        return { success: true, user: userInfo };
      }
    }
    
    return { success: false, message: 'Invalid username or password' };
  } catch (error) {
    Logger.log('Authentication error: ' + error.toString());
    return { success: false, message: 'Authentication failed' };
  }
}

/**
 * Get Dashboard Summary Data
 */
function getDashboardSummary() {
  try {
    const studentsSheet = getSheet(SHEETS.STUDENTS);
    const teachersSheet = getSheet(SHEETS.TEACHERS);
    
    const studentsData = studentsSheet.getDataRange().getValues();
    const teachersData = teachersSheet.getDataRange().getValues();
    
    // Calculate totals
    const totalStudents = studentsData.length > 1 ? studentsData.length - 1 : 0;
    const totalTeachers = teachersData.length > 1 ? teachersData.length - 1 : 0;
    
    // Get unique subjects from teachers
    const subjects = new Set();
    for (let i = 1; i < teachersData.length; i++) {
      if (teachersData[i][4]) { // Subject column
        subjects.add(teachersData[i][4]);
      }
    }
    const totalSubjects = subjects.size;
    
    return {
      totalStudents,
      totalTeachers,
      totalSubjects
    };
  } catch (error) {
    Logger.log('Dashboard summary error: ' + error.toString());
    return { totalStudents: 0, totalTeachers: 0, totalSubjects: 0 };
  }
}

/**
 * Register Student
 */
function registerStudent(studentData) {
  try {
    const sheet = getSheet(SHEETS.STUDENTS);
    const timestamp = new Date();
    const studentId = generateStudentId(studentData.name, studentData.subject);
    
    const rowData = [
      timestamp,
      studentId,
      studentData.name,
      studentData.dob,
      studentData.gender,
      studentData.fatherName,
      studentData.motherName,
      studentData.contact,
      studentData.email,
      studentData.address,
      studentData.admissionDate,
      studentData.class,
      studentData.whatsapp,
      studentData.subject
    ];
    
    sheet.appendRow(rowData);
    
    // Log action
    logAction(Session.getActiveUser().getEmail(), 'USER', 'REGISTER_STUDENT', 
             `Student registered: ${studentData.name} (ID: ${studentId})`);
    
    return { success: true, message: 'Student registered successfully!', studentId };
  } catch (error) {
    Logger.log('Student registration error: ' + error.toString());
    return { success: false, message: 'Failed to register student' };
  }
}

/**
 * Register Teacher
 */
function registerTeacher(teacherData) {
  try {
    const sheet = getSheet(SHEETS.TEACHERS);
    const teacherId = generateTeacherId(teacherData.name, teacherData.subject);
    
    const rowData = [
      teacherId,
      teacherData.name,
      teacherData.contact,
      teacherData.email,
      teacherData.subject,
      teacherData.joinDate,
      teacherData.address
    ];
    
    sheet.appendRow(rowData);
    
    // Log action
    logAction(Session.getActiveUser().getEmail(), 'USER', 'REGISTER_TEACHER', 
             `Teacher registered: ${teacherData.name} (ID: ${teacherId})`);
    
    return { success: true, message: 'Teacher registered successfully!', teacherId };
  } catch (error) {
    Logger.log('Teacher registration error: ' + error.toString());
    return { success: false, message: 'Failed to register teacher' };
  }
}

/**
 * Get Students List
 */
function getStudentsList(userRole, userSubject) {
  try {
    const sheet = getSheet(SHEETS.STUDENTS);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return [];
    }
    
    const students = [];
    for (let i = 1; i < data.length; i++) {
      // If user is teacher, filter by subject
      if (userRole === 'Teacher' && userSubject && data[i][13] !== userSubject) {
        continue;
      }
      
      students.push({
        timestamp: data[i][0],
        studentId: data[i][1],
        name: data[i][2],
        dob: data[i][3],
        gender: data[i][4],
        fatherName: data[i][5],
        motherName: data[i][6],
        contact: data[i][7],
        email: data[i][8],
        address: data[i][9],
        admissionDate: data[i][10],
        class: data[i][11],
        whatsapp: data[i][12],
        subject: data[i][13],
        rowIndex: i + 1
      });
    }
    
    return students;
  } catch (error) {
    Logger.log('Get students error: ' + error.toString());
    return [];
  }
}

/**
 * Get Teachers List
 */
function getTeachersList() {
  try {
    const sheet = getSheet(SHEETS.TEACHERS);
    const data = sheet.getDataRange().getValues();
    
    if (data.length <= 1) {
      return [];
    }
    
    const teachers = [];
    for (let i = 1; i < data.length; i++) {
      teachers.push({
        teacherId: data[i][0],
        name: data[i][1],
        contact: data[i][2],
        email: data[i][3],
        subject: data[i][4],
        joinDate: data[i][5],
        address: data[i][6],
        rowIndex: i + 1
      });
    }
    
    return teachers;
  } catch (error) {
    Logger.log('Get teachers error: ' + error.toString());
    return [];
  }
}

/**
 * Delete Student
 */
function deleteStudent(studentId) {
  try {
    const sheet = getSheet(SHEETS.STUDENTS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][1] === studentId) {
        sheet.deleteRow(i + 1);
        
        // Log action
        logAction(Session.getActiveUser().getEmail(), 'USER', 'DELETE_STUDENT', 
                 `Student deleted: ${data[i][2]} (ID: ${studentId})`);
        
        return { success: true, message: 'Student deleted successfully!' };
      }
    }
    
    return { success: false, message: 'Student not found' };
  } catch (error) {
    Logger.log('Delete student error: ' + error.toString());
    return { success: false, message: 'Failed to delete student' };
  }
}

/**
 * Delete Teacher
 */
function deleteTeacher(teacherId) {
  try {
    const sheet = getSheet(SHEETS.TEACHERS);
    const data = sheet.getDataRange().getValues();
    
    for (let i = 1; i < data.length; i++) {
      if (data[i][0] === teacherId) {
        sheet.deleteRow(i + 1);
        
        // Log action
        logAction(Session.getActiveUser().getEmail(), 'USER', 'DELETE_TEACHER', 
                 `Teacher deleted: ${data[i][1]} (ID: ${teacherId})`);
        
        return { success: true, message: 'Teacher deleted successfully!' };
      }
    }
    
    return { success: false, message: 'Teacher not found' };
  } catch (error) {
    Logger.log('Delete teacher error: ' + error.toString());
    return { success: false, message: 'Failed to delete teacher' };
  }
}

/**
 * Helper Functions
 */

function getSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    sheet = spreadsheet.insertSheet(sheetName);
    setupSheetHeaders(sheet, sheetName);
  }
  
  return sheet;
}

function setupSheetHeaders(sheet, sheetName) {
  switch (sheetName) {
    case SHEETS.LOGIN:
      sheet.getRange(1, 1, 1, 4).setValues([['Username', 'Password', 'Role', 'Subject']]);
      break;
    case SHEETS.STUDENTS:
      sheet.getRange(1, 1, 1, 14).setValues([[
        'Timestamp', 'Student ID', 'Name', 'DOB', 'Gender', 'Father Name', 
        'Mother Name', 'Contact', 'Email', 'Address', 'Admission Date', 
        'Class', 'WhatsApp', 'Subject'
      ]]);
      break;
    case SHEETS.TEACHERS:
      sheet.getRange(1, 1, 1, 7).setValues([[
        'Teacher ID', 'Name', 'Contact', 'Email', 'Subject', 'Join Date', 'Address'
      ]]);
      break;
    case SHEETS.LOGS:
      sheet.getRange(1, 1, 1, 5).setValues([['Timestamp', 'Username', 'Role', 'Action Type', 'Details']]);
      break;
  }
}

function generateStudentId(name, subject) {
  const nameInitials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  const subjectInitial = subject ? subject.charAt(0).toUpperCase() : 'X';
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `STU${nameInitials}${subjectInitial}${randomNum}`;
}

function generateTeacherId(name, subject) {
  const nameInitials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
  const subjectInitial = subject ? subject.charAt(0).toUpperCase() : 'X';
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `TCH${nameInitials}${subjectInitial}${randomNum}`;
}

function logAction(username, role, actionType, details) {
  try {
    const sheet = getSheet(SHEETS.LOGS);
    const timestamp = new Date();
    sheet.appendRow([timestamp, username, role, actionType, details]);
  } catch (error) {
    Logger.log('Logging error: ' + error.toString());
  }
}

/**
 * Initialize Sheets (Run this once to set up your sheets)
 */
function initializeSheets() {
  // Create sample login data
  const loginSheet = getSheet(SHEETS.LOGIN);
  loginSheet.appendRow(['admin', 'admin123', 'Admin', 'All']);
  loginSheet.appendRow(['teacher1', 'teacher123', 'Teacher', 'Mathematics']);
  loginSheet.appendRow(['teacher2', 'teacher123', 'Teacher', 'Science']);
  
  Logger.log('Sheets initialized successfully!');
}