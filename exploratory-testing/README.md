# **Exploratory Testing Findings - Promotions Section**

This document provides a comprehensive summary of the exploratory testing performed on the Promotions Section of the website. The testing focused on verifying the correct behavior and functionality of the promotions, checking the responsiveness of the design, and validating key interactions such as the "Opt In" button and modal. This report outlines the results of the tests, highlighting areas where the application is functioning as expected and identifying issues that need attention.

## Testing Goals
The primary goal of this exploratory testing was to ensure the following:

* Promotions are displayed correctly, with accurate images, text, and button behavior.

* The promotions page is responsive across different devices, particularly on mobile screens.

* The core functionalities, such as "Opt In" buttons and modal interactions, are working as expected.

## **1️⃣ General `/promotions` Page Findings**

### ✅ Scenario 1: Ensure promotions load correctly  
- **Expected:** All promotions should display properly with images and texts.  
- **Actual:**  
  - ✅ Most images load.  
  - ❌ Some images are missing.  
  - ✅ Most text is correct.  
  - ❌ One typo found ("condicions" instead of "conditions").  
  - ❌ One "Opt In" button text is different from the others.  
- **Evidence:** 
![Missing images](https://i.ibb.co/NdR40r8V/missing-img.png)
![Incorrect texts](https://i.ibb.co/nMwZ12Hv/Incorrect-text.png)  

### ✅ Scenario 2: Check Responsive Design for Mobile  
- **Expected:** The promotions page should adapt properly to mobile screens.  
- **Actual (iPhone 14 Screen):**  
  - ✅ Page layout adjusts correctly.  
  - ✅ Sorting works correctly.  
  - ❌ Some images are missing (See Scenario 1 validation).  
- **Evidence:** ![Missing images](https://i.ibb.co/MyDLV0qT/missing-img-mobile.png)    

## **2️⃣ General Promotion Page `/promotions/230301_mar23_ca_to_rfs`**  

### ✅ Scenario 3: Validate Promotion Text & Formatting  
- **Expected:** All text should be **properly formatted, readable, and consistent.**  
- **Actual:**  
  - ✅ Most of the text is structured correctly.  
  - ❌ **Inconsistent button text:** One **"Opt In"** button does not match the others.  
  - ❌ **Symbol issue:** One cell in the turnover table displays `"50 x 0.50��"` (possible encoding issue).  
  - ❌ **Inconsistent competition slugs & progress tracking:**  
    - Some slugs use **underscores**, while others don’t (e.g., `230301_mar23_ca_to_rfs_deposit` vs. `230301mar23catorfsdeposit`).  
    - The last `<h1>` states all progress points **"SHOULD BE THE SAME"**, but different slugs might be causing separate tracking.  

- **Evidence:** ![Screenshot](https://i.ibb.co/5gzNfGHq/scenario-3-findings.png)  

### ✅ Scenario 4: Ensure "Opt In" button and modal functionality are working correctly  
- **Expected:**  
  - The "Opt In" button should be **visible and functional**, and when clicked, it should open the modal with options for account creation, email, and SMS password reset.  
  - The modal should allow the user to select an option and provide appropriate feedback for each method (e.g., confirmation message for email/SMS, error handling for failed methods).  
  
- **Actual:**  
  - ✅ "Opt In" button exists and is visible.  
  - ❌ **Account creation via modal** throws an error and does not work.  
  - ❌ **Email verification** sends confirmation, but the email does not arrive.  
  - ❌ **SMS verification** throws an error when attempting to send.  
  - ✅ **Opting in** works once logged in.

- **Evidence:** ![Account creation error](https://i.ibb.co/Jj81vtnz/account-creation-issue.png) ![Rest by SMS issue](https://i.ibb.co/rfXhQm25/rest-by-sms-issue.png)


# Key Observations & Areas for Improvement
* Missing Images: While most images load correctly, several promotions lack proper image display. This issue needs to be addressed to ensure that promotions are presented fully and correctly to users.

* Inconsistent Text & Button Labels: A few inconsistencies in text formatting and button labels (like the "Opt In" button) can create confusion. Standardizing these elements across the page would improve the overall user experience.

* Encoding Issues: The symbol issue in the turnover table should be reviewed to ensure proper encoding and data handling. This could impact the accuracy of displayed values.

* Inconsistent Slugs: The use of inconsistent slugs for tracking progress may lead to issues with backend processing, potentially causing inaccurate progress or rewards tracking.

* Modal and Verification Issues: The errors with the "Opt In" modal, email, and SMS verification processes are critical. These features should be fixed to ensure users can fully participate in promotions and account management tasks.

## Recommendations
* Image Loading: Investigate the source of missing images and ensure that all promotion-related media is properly loaded on all devices.

* Text Consistency: Review button labels and text to ensure consistency across the site.

* Backend Validation: Check the backend logic for slug generation and ensure that progress tracking is correctly unified across promotions.

* Modal Functionality: Fix errors related to account creation, email verification, and SMS verification to ensure smooth user interaction.