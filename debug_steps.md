# 🔧 Blank Screen Issue - Debugging Steps

## Problem
Login successful hai but dashboard blank screen show kar rahi hai.

## Quick Fixes

### Step 1: Check SPREADSHEET_ID
```javascript
// Code.gs mein line 4 par:
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID'; // ⚠️ REPLACE THIS!
```

**Action Required:**
1. Google Sheets kholo
2. New spreadsheet banao
3. URL se ID copy karo: `https://docs.google.com/spreadsheets/d/[COPY_THIS_ID]/edit`
4. Code.gs mein `YOUR_SPREADSHEET_ID` ko replace karo

### Step 2: Test Functions
Google Apps Script editor mein ye functions run karo:

1. **checkSpreadsheetId()** - Spreadsheet connection check karne ke liye
2. **initializeSheets()** - Sheets setup karne ke liye
3. **testFunction()** - Overall system test karne ke liye

### Step 3: Browser Console Check
1. Login ke baad F12 dabao
2. Console tab check karo
3. Red errors dekho aur report karo

### Step 4: Session Storage Check
Browser console mein type karo:
```javascript
console.log(sessionStorage.getItem('userInfo'));
```

### Step 5: Force Refresh
Dashboard URL manually try karo:
```
https://script.google.com/macros/s/[YOUR_SCRIPT_ID]/exec?page=dashboard
```

## Common Issues

### ❌ Issue 1: SPREADSHEET_ID not set
**Error:** "Please replace YOUR_SPREADSHEET_ID"
**Fix:** Replace with actual Google Sheets ID

### ❌ Issue 2: Permission denied
**Error:** "Cannot access spreadsheet"
**Fix:** Run initializeSheets() function manually

### ❌ Issue 3: Session not saved
**Error:** Redirect loop
**Fix:** Clear browser cache/cookies

### ❌ Issue 4: Script not deployed
**Error:** 404 or access denied
**Fix:** Deploy as web app with correct permissions

## Test Credentials
- **Admin:** admin / admin123
- **Teacher:** teacher1 / teacher123

## Quick Test
1. Open browser console
2. Type: `sessionStorage.clear()`
3. Refresh and login again
4. Check console for errors

---
**Report any console errors for faster debugging!**