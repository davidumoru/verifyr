<div align = "center">
# staffVerify
#####  Building trust, one verification at a time: staffVerify, the app that brings certainty to your professional connections
</div>

## Installation

To install and set up the project, follow these steps:

1. Clone the repository to your local machine: `git clone https://github.com/davidumoru/staffVerify.git`
2. Navigate to the project directory `cd your-repository`
3. Run `npm install` to install the project dependencies.

## Usage

To start the project, run the following command:

`npm start`

This will start the Express server, and the project will be accessible at the specified port.

## Endpoints

The project includes the following endpoints:

- **POST** `/create-admin` - Create a new admin user for the company.
- **POST** `/create-staff` - Create a new staff user for the company.
- **POST** `/create-account` - Create a new company account.
- **POST** `/login` - Authenticate a user (admin) and generate an access token.
- **POST** `/forgot-password` - Send a password reset email to the user's email address.
- **GET** `/` - Get a list of all companies.

## Technologies

The project includes the following technologies:

- Node.js
- Express.js
- MongoDB
- bcrypt
- jsonwebtoken
- SendGrid

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature-name`
3. Make changes and Commit them: `git commit -m "Add some feature"`
4. Push the branch to your forked repository: `git push origin feature-name`
5. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/git/git-scm.com/blob/main/MIT-LICENSE.txt) file for more information.
