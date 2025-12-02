# Project Requirement Document (PRD)
## Campus Lost & Found Portal

---

### Document Information
**Project Name:** Campus Lost & Found Portal  
**Version:** 1.0  
**Date:** December 2, 2025  
**Prepared By:** Development Team  
**Status:** Draft

---

## 1. Project Overview

The Campus Lost & Found Portal is a web-based system designed to streamline the process of reporting, searching, and claiming lost and found items within a campus environment. The platform aims to create a centralized, efficient, and secure solution that connects students, faculty, and staff who have lost items with those who have found them.

The system will provide an intuitive interface for users to post lost or found items, search through existing listings, and facilitate the claim verification process. By leveraging modern web technologies and optional AI-powered features, the portal will significantly reduce the time and effort required to reunite people with their lost belongings.

### Problem Statement

Currently, lost items on campus are managed through fragmented channels including physical lost & found offices, social media groups, bulletin boards, and word-of-mouth. This decentralized approach leads to:
- Inefficient communication between finders and losers
- Items remaining unclaimed for extended periods
- Difficulty in verifying legitimate ownership
- Limited visibility of lost/found items across campus
- Administrative burden on campus security and student services

### Solution

The Campus Lost & Found Portal addresses these challenges by providing a unified digital platform that:
- Centralizes all lost and found item listings
- Enables quick searching and filtering capabilities
- Implements secure claim verification mechanisms
- Provides location-based tagging for better item tracking
- Offers administrative oversight and moderation tools

---

## 2. Objectives


### Primary Objectives

1. **Centralize Lost & Found Operations**
   - Create a single, authoritative platform for all campus lost and found activities
   - Replace fragmented communication channels with a unified system

2. **Improve Item Recovery Rate**
   - Increase the percentage of lost items successfully returned to owners
   - Reduce the average time between item loss and recovery

3. **Enhance User Experience**
   - Provide an intuitive, user-friendly interface accessible to all campus community members
   - Enable quick posting and searching of items with minimal friction

4. **Ensure Security and Authenticity**
   - Implement robust claim verification to prevent fraudulent claims
   - Restrict access to verified campus community members only

5. **Reduce Administrative Overhead**
   - Automate routine tasks and notifications
   - Provide efficient moderation tools for administrators

### Success Metrics

- 80% user adoption rate within the first semester
- 60% increase in successful item returns compared to traditional methods
- Average claim verification time under 48 hours
- User satisfaction rating of 4.0/5.0 or higher
- 90% reduction in manual administrative processing time

---

## 3. Scope

### In Scope

**Core Features:**
- User authentication via campus email system
- Lost item posting with detailed descriptions and images
- Found item posting with detailed descriptions and images
- Advanced search and filtering capabilities
- Location tagging for items (building/area on campus)
- Claim verification system with security questions
- User dashboard for managing posts and claims
- Admin moderation panel
- Email notifications for critical events
- Responsive design for mobile and desktop access

**Optional Features:**
- AI-powered image matching for lost/found items
- Real-time push notifications
- Interactive campus map integration
- SMS notifications
- Multi-language support
- Analytics dashboard for administrators

### Out of Scope


The following features and functionalities are explicitly excluded from the current project scope:

- Physical item storage or tracking (system is digital only)
- Financial transactions or reward systems
- Integration with external lost & found services outside campus
- Shipping or delivery coordination
- Insurance claim processing
- Mobile native applications (iOS/Android apps)
- Blockchain-based ownership verification
- Video upload capabilities
- Social media platform integration
- Third-party marketplace features

---

## 4. User Roles

### 4.1 Student/Faculty/Staff (Standard User)

**Description:** Regular campus community members who can report lost items or post found items.

**Permissions:**
- Create account using campus email
- Post lost items with descriptions, images, and security questions
- Post found items with descriptions and images
- Search and browse all listings
- Claim found items by answering security questions
- Edit or delete their own posts
- View their posting and claim history
- Receive notifications about their items
- Contact other users through the system (anonymized)

**Access Level:** Basic authenticated access

### 4.2 Administrator

**Description:** Campus staff responsible for managing and moderating the portal.

**Permissions:**
- All standard user permissions
- Review and approve/reject item posts
- Remove inappropriate or fraudulent listings
- Manage user accounts (suspend/activate)
- View all user activities and claim attempts
- Access analytics and reporting dashboard
- Configure system settings
- Manage location tags and categories
- Resolve disputes between users
- Send system-wide announcements
- Export data for reporting purposes

**Access Level:** Full administrative access

### 4.3 Super Administrator (Optional)

**Description:** IT staff or system owners with technical access.

**Permissions:**
- All administrator permissions
- Manage administrator accounts
- Configure authentication settings
- Access system logs and audit trails
- Perform database maintenance
- Configure optional features (AI, notifications, etc.)

**Access Level:** System-level access

---

## 5. Functional Requirements


### 5.1 User Authentication and Authorization

**FR-1.1: Campus Email Login**
- System shall authenticate users exclusively through campus email addresses
- System shall support Single Sign-On (SSO) integration with campus identity provider
- System shall validate email domain to ensure only authorized campus members can register
- System shall implement secure password requirements (minimum 8 characters, mixed case, numbers, special characters)
- System shall provide password reset functionality via email verification

**FR-1.2: Session Management**
- System shall maintain secure user sessions with automatic timeout after 30 minutes of inactivity
- System shall allow users to log out manually
- System shall support "Remember Me" functionality for trusted devices

**FR-1.3: Role-Based Access Control**
- System shall enforce role-based permissions for all features
- System shall restrict administrative functions to authorized admin accounts only

### 5.2 Lost Item Management

**FR-2.1: Post Lost Item**
- Users shall be able to create lost item posts with the following fields:
  - Item name/title (required, max 100 characters)
  - Category selection from predefined list (required)
  - Detailed description (required, max 1000 characters)
  - Date lost (required)
  - Location lost (required, dropdown of campus locations)
  - Contact information (auto-populated from profile, editable)
  - Up to 5 images (optional, max 5MB each, formats: JPG, PNG, WEBP)
  - Security questions (minimum 2, maximum 5) with answers for claim verification

**FR-2.2: Security Questions**
- System shall require users to create at least 2 security questions when posting lost items
- Security questions shall be hidden from public view
- System shall store security answers in encrypted format
- Examples: "What color was the item?", "What brand is it?", "What's inside the wallet?"

**FR-2.3: Edit Lost Item Post**
- Users shall be able to edit their own lost item posts
- System shall maintain edit history with timestamps
- Users shall be able to mark items as "Found" or "Resolved"

**FR-2.4: Delete Lost Item Post**
- Users shall be able to delete their own lost item posts
- System shall implement soft delete (archive) for administrative records
- Deleted posts shall be removed from public view immediately

### 5.3 Found Item Management

**FR-3.1: Post Found Item**
- Users shall be able to create found item posts with the following fields:
  - Item name/title (required, max 100 characters)
  - Category selection from predefined list (required)
  - Detailed description (required, max 1000 characters)
  - Date found (required)
  - Location found (required, dropdown of campus locations)
  - Current location/storage (required)
  - Contact information (auto-populated from profile)
  - Up to 5 images (optional, max 5MB each, formats: JPG, PNG, WEBP)

**FR-3.2: Edit Found Item Post**
- Users shall be able to edit their own found item posts
- Users shall be able to mark items as "Claimed" or "Returned"

**FR-3.3: Delete Found Item Post**
- Users shall be able to delete their own found item posts
- System shall implement soft delete for administrative records


### 5.4 Search and Discovery

**FR-4.1: Search Functionality**
- System shall provide a search bar on the homepage
- System shall support keyword search across item titles and descriptions
- System shall display search results in real-time (as user types)
- System shall highlight matching keywords in search results

**FR-4.2: Advanced Filtering**
- Users shall be able to filter items by:
  - Category (Electronics, Clothing, Books, IDs/Cards, Keys, Bags, Accessories, Other)
  - Status (Lost, Found, Claimed, Resolved)
  - Date range (Last 24 hours, Last week, Last month, Custom range)
  - Location (specific buildings or areas)
  - Item type (Lost vs Found)
- System shall allow multiple filters to be applied simultaneously
- System shall display active filters with option to clear individual or all filters

**FR-4.3: Sorting Options**
- Users shall be able to sort results by:
  - Most recent (default)
  - Oldest first
  - Alphabetical (A-Z)
  - Location

**FR-4.4: Browse All Items**
- System shall display all active listings on the main page
- System shall implement pagination (20 items per page)
- System shall provide infinite scroll option as alternative to pagination

### 5.5 Claim Verification System

**FR-5.1: Initiate Claim**
- Users shall be able to click "Claim This Item" button on found item listings
- System shall present the security questions to the claimant
- System shall require answers to all security questions

**FR-5.2: Verify Claim**
- System shall compare submitted answers with stored answers
- System shall use fuzzy matching to account for minor spelling variations
- System shall notify the item poster if answers match (threshold: 80% similarity)
- System shall notify the claimant of successful verification
- System shall log all claim attempts with timestamps and user information

**FR-5.3: Failed Claim Attempts**
- System shall limit claim attempts to 3 per user per item
- System shall notify item poster of failed claim attempts after 2 failures
- System shall temporarily block user from claiming after 3 failed attempts (24-hour cooldown)
- System shall flag suspicious activity for admin review

**FR-5.4: Claim Communication**
- Upon successful verification, system shall:
  - Share contact information between both parties
  - Provide in-system messaging for coordination
  - Send email notifications to both parties
  - Update item status to "Claim Pending"

**FR-5.5: Confirm Return**
- Item poster shall be able to confirm item was returned
- System shall update item status to "Returned/Resolved"
- System shall archive the listing after confirmation

### 5.6 Location Tagging

**FR-6.1: Location Database**
- System shall maintain a database of campus locations including:
  - Academic buildings
  - Residence halls
  - Libraries
  - Dining facilities
  - Recreation centers
  - Parking lots
  - Outdoor areas (quads, paths, etc.)

**FR-6.2: Location Selection**
- Users shall select location from dropdown menu when posting items
- System shall support hierarchical location selection (Building > Floor > Room)
- System shall allow "Other" option with text input for unlisted locations

**FR-6.3: Location-Based Search**
- Users shall be able to filter items by specific locations
- System shall display location information prominently in listings


### 5.7 Image Management

**FR-7.1: Image Upload**
- System shall support image upload for both lost and found items
- System shall accept JPG, PNG, and WEBP formats
- System shall limit file size to 5MB per image
- System shall allow up to 5 images per post
- System shall compress images automatically to optimize storage and loading

**FR-7.2: Image Display**
- System shall display thumbnail images in listing views
- System shall provide full-size image viewing with gallery/lightbox functionality
- System shall support image zoom functionality
- System shall display images in carousel format when multiple images exist

**FR-7.3: Image Security**
- System shall scan uploaded images for inappropriate content
- System shall strip EXIF metadata from images for privacy
- System shall generate unique filenames to prevent conflicts

### 5.8 User Dashboard

**FR-8.1: Dashboard Overview**
- Users shall have access to a personal dashboard showing:
  - Active lost item posts
  - Active found item posts
  - Pending claims (incoming and outgoing)
  - Resolved items history
  - Account statistics (items posted, items claimed, success rate)

**FR-8.2: Notifications Center**
- Dashboard shall display recent notifications
- Users shall be able to mark notifications as read
- Users shall be able to configure notification preferences

**FR-8.3: Profile Management**
- Users shall be able to update their profile information:
  - Display name
  - Contact phone number (optional)
  - Preferred contact method
  - Notification preferences
- Users shall not be able to change their campus email address

### 5.9 Administrative Functions

**FR-9.1: Moderation Queue**
- Admins shall have access to a moderation dashboard showing:
  - Pending posts requiring approval (if approval workflow enabled)
  - Flagged posts reported by users
  - Suspicious claim attempts
  - User reports

**FR-9.2: Content Moderation**
- Admins shall be able to:
  - Approve or reject posts
  - Edit post content if necessary
  - Remove inappropriate posts
  - Add moderation notes visible only to admins

**FR-9.3: User Management**
- Admins shall be able to:
  - View all user accounts
  - Search users by name or email
  - Suspend user accounts temporarily
  - Ban users permanently
  - View user activity history
  - Reset user passwords

**FR-9.4: Reporting and Analytics**
- System shall provide analytics dashboard showing:
  - Total items posted (lost vs found)
  - Successful returns rate
  - Average time to resolution
  - Most common item categories
  - Most common locations
  - User engagement metrics
  - Peak usage times

**FR-9.5: System Configuration**
- Admins shall be able to configure:
  - Item categories
  - Location list
  - Notification templates
  - Auto-archive timeframe for old posts
  - Claim attempt limits
  - Image upload restrictions


### 5.10 Notification System

**FR-10.1: Email Notifications**
- System shall send email notifications for:
  - New claim attempt on user's found item
  - Successful claim verification
  - Failed claim attempts (after 2 failures)
  - Messages from other users
  - Item status updates
  - Admin actions on user's posts
  - Weekly digest of matching items (optional)

**FR-10.2: In-App Notifications**
- System shall display in-app notifications for all email notification events
- Notifications shall appear in real-time when user is logged in
- System shall maintain notification history for 30 days

**FR-10.3: Notification Preferences**
- Users shall be able to enable/disable specific notification types
- Users shall be able to choose notification frequency (immediate, daily digest, weekly digest)

### 5.11 Communication System

**FR-11.1: In-System Messaging**
- System shall provide secure messaging between users
- Messages shall be tied to specific item listings
- System shall maintain message history
- System shall notify users of new messages via email and in-app

**FR-11.2: Contact Information Sharing**
- System shall only share contact information after successful claim verification
- Users shall have option to hide phone number and use email only
- System shall provide option to report inappropriate communication

### 5.12 Reporting and Flagging

**FR-12.1: Report Post**
- Users shall be able to report inappropriate posts
- System shall provide predefined report reasons:
  - Spam or scam
  - Inappropriate content
  - Duplicate post
  - Fraudulent claim
  - Other (with text explanation)
- System shall notify admins of reported posts

**FR-12.2: Report User**
- Users shall be able to report other users for misconduct
- Reports shall be reviewed by administrators
- System shall track report history per user

---

## 6. Optional Requirements

### 6.1 AI-Powered Image Matching

**OR-1.1: Visual Similarity Search**
- System shall use computer vision AI to analyze uploaded images
- When user posts a lost item, system shall automatically search found items for visually similar images
- When user posts a found item, system shall automatically search lost items for visually similar images
- System shall display potential matches with similarity score
- System shall send notifications to users about potential matches

**OR-1.2: Image Recognition**
- System shall automatically detect and tag item categories from images
- System shall extract text from images (OCR) for better searchability
- System shall identify brand names and logos in images

**OR-1.3: Duplicate Detection**
- System shall detect potential duplicate posts using image similarity
- System shall alert users before posting if similar item already exists

### 6.2 Real-Time Push Notifications

**OR-2.1: Browser Push Notifications**
- System shall support browser push notifications for desktop and mobile browsers
- Users shall be able to enable push notifications with one click
- Push notifications shall work even when browser is closed (service workers)

**OR-2.2: Mobile Push Notifications**
- If mobile app is developed in future, system shall support native push notifications
- System shall provide API endpoints for mobile notification delivery

