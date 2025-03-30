# voting-app

This application was created to simplify the voting process for [Serile Teatrului Studențesc](https://sts.sisc.ro/), a project organized by [SiSC](https://sisc.ro/). 

##  How it works
1. A voting session is enabled for a few minutes by an admin
2. Attendees access the voting page via a QR code or direct link
3. Votes are submitted anonymously — no accounts or extra steps are required

## Tech Stack
- Frontend: React, Sass, Firebase Authentication
- Backend: Node.js, Express, Sequelize
- Database: MySQL

## Features
### General Features
- **Anonymous Voting**: Firebase's Anonymous Authentication allows attendees to vote without creating accounts, ensuring a seamless experience
- **Responsive Design**: The interface is optimized mainly for mobile devices, but provides a consistent design across all screen sizes
### Admin-Specific Features
- **Dynamic Voting Control**: The admin panel provides full control over voting sessions, allowing activation, deactivation, and real-time result monitoring
- **JWT-Based Admin Login**: A secure token-based system keeps admins logged in while protecting sensitive operations
- **Real-Time Data Fetching**: All data is fetched dynamically, allowing organizers to view up-to-date results and manage events effortlessly

## Technical Insights
- Used a compound component for modals, ensuring consistent and easy integration throughout the codebase
- Implemented vote prevention by storing flags in cookies and localStorage
- Managed state with four React contexts, each of them providing a distinct piece of data
- Handled all API requests efficiently with a centralized Axios manager
- Developed a JSON-based seeding system to simplify adding and managing play data
