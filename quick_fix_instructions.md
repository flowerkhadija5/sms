# 🚨 Blank Screen Fix - Step by Step

## Problem
Login successful but dashboard blank screen dikha rahi hai.

## 🔧 QUICK FIX - Follow in Order:

### Step 1: Test Page Check
```
YOUR_WEB_APP_URL?page=test
```
- Ye URL browser mein open karo
- Agar test page load hoti hai, to files correct hain
- Agar nahi, to deployment issue hai

### Step 2: Check Files in Google Apps Script
**Verify these files exist:**
- ✅ `Code.gs` 
- ✅ `login.html`
- ✅ `dashboard.html` 
- ✅ `minimal_test.html` (new file)

**Missing file hai to add karo**

### Step 3: SPREADSHEET_ID Fix
```javascript
// Code.gs line 4:
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // ❌ REPLACE THIS!
```

**Get Google Sheets ID:**
1. Google Sheets mein new spreadsheet banao
2. URL se ID copy karo: `https://docs.google.com/spreadsheets/d/[COPY_THIS]/edit`
3. Code.gs mein replace karo

### Step 4: Run Setup Functions
**Google Apps Script Editor mein:**
1. `checkSpreadsheetId()` - run karo
2. `initializeSheets()` - run karo
3. `testFunction()` - run karo

### Step 5: Re-deploy
1. **Deploy → Manage Deployments**
2. **Edit icon click karo**
3. **Version: New version**
4. **Deploy**

### Step 6: Clear Browser Cache
```javascript
// Browser console mein:
sessionStorage.clear();
localStorage.clear();
```

### Step 7: Test URLs (in order)
1. `YOUR_URL?page=test` - Test page
2. `YOUR_URL?page=login` - Login page  
3. Login karo, dashboard check karo

## 🔍 Debug Console Commands

**Browser console mein run karo:**
```javascript
// 1. Check session data
console.log(sessionStorage.getItem('userInfo'));

// 2. Check Google Script API
console.log(typeof google !== 'undefined' && google.script);

// 3. Check current page
console.log(window.location.href);

// 4. Check for errors
console.log('Any errors above?');
```

## 🚨 Common Issues & Fixes

### Issue 1: File Not Found
**Error:** Template file not found
**Fix:** Upload missing HTML file

### Issue 2: SPREADSHEET_ID
**Error:** Cannot access spreadsheet 
**Fix:** Replace with correct Google Sheets ID

### Issue 3: Deployment
**Error:** 404 or access denied
**Fix:** Re-deploy with new version

### Issue 4: Session Lost
**Error:** Redirect loop
**Fix:** Clear session storage

### Issue 5: JavaScript Error
**Error:** Script errors in console
**Fix:** Check browser console for specific errors

## 📞 If Still Blank:

**Send these details:**
1. Test page URL result (`?page=test`)
2. Browser console errors (F12)
3. Google Apps Script editor logs
4. SPREADSHEET_ID status (set or not?)

## ✅ Success Indicators:
- Test page loads ✅
- No console errors ✅  
- Session storage has user data ✅
- Google Script API available ✅
- Dashboard shows cards ✅

---
**90% issues SPREADSHEET_ID ki wajah se hain - pehle wo fix karo!**