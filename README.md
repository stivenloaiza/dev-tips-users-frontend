#User and Subscription Register Form
#Description
In this project, we have developed a form that allows users to create their subscriptions. A user can register up to four subscriptions with one account, one for each type (email, bot, iframe, tv), and all this data is sent to the backend.

This form enables us to maintain a relationship with the user, providing access to a frontend flow for submitting their data.

Author: Thomas Restrepo
License: MIT
Installation

Prerequisites
React JS
Vite
#Steps to Install 

*Clone the repository:*
git clone https://github.com/stivenloaiza/dev-tips-users-frontend.git

*Navigate to the project directory:*
cd register-form 

*Install dependencies:*
npm install

*Run the project:*
npm run dev

The project runs on port 5173.
Usage
During the registration process, the user fills in their data and proceeds to the next step. For subscriptions, the user needs to press the "Add Subscription" button and then the "Next Step" button.

Example Usage
# Navigate to the local server running on port 5173
http://localhost:5173
Contributing
To contribute to the project, please follow these steps:

*Create a new branch for each task you want to add to the code:*
git checkout -b feature/your-feature-name

*Make your changes and commit them:*
git commit -m 'Add some feature'

*Push to the branch:*
git push origin feature/your-feature-name


Open a pull request to the main branch.

#Common Issues
- If you encounter issues with the process, the most common problem is that the backend endpoints do not correctly align with the frontend endpoints. Please ensure they are synchronized correctly and use the same in both places.

- In case of entering incorrect data, the user will receive a message with the issues found.

#Technologies Used
React JS
Vite
React Hook Form (library for handling forms)
Toastify (library for alerts)
License

This project is licensed under the MIT License - see the LICENSE file for details.
