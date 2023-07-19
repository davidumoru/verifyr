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

`npm run dev`

This will start the Express server, and the project will be accessible at the specified port.

## API Endpoints

The project includes the following endpoints:

- **POST** `/create-admin` - Create a new admin user for the company.
**Request Body:**
```
{
  "email": "admin@example.com",
  "password": "password",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "1234567890"
}
```
**Response:**
```
{
  "message": "Staff created successfully",
  "statusCode": 201,
  "status": "success",
  "data": {
    "_id": "60f971e5b8a0a52774122bf1",
    "email": "admin@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "phone": "1234567890",
    "role": "admin",
    "createdAt": "2023-07-01T12:34:56.789Z",
    "updatedAt": "2023-07-01T12:34:56.789Z"
  }
}
```

- **POST** `/create-staff` - Create a new staff user for the company.
**Request Body:**
```
{
  "firstName": "John",
  "lastName": "Doe",
  "password": "password",
  "contactNo": "9876543210",
  "email": "john.doe@example.com",
  "staffId": "123456",
  "companyRole": "Software Engineer",
  "dateOfBirth": "1990-01-01",
  "company": "60f97236b8a0a52774122bf3",
  "role": "user"
}
```
**Response:**
```
{
  "message": "Staff member created successfully",
  "statusCode": 201,
  "status": "success",
  "data": {
    "_id": "60f97341b8a0a52774122bf5",
    "firstName": "John",
    "lastName": "Doe",
    "password": "$2b$10$41kjXOD87M19.1kGtph8g.kf3plcZC5PR7rXKdHW.RN6RcJ9nVgLO",  // Hashed password
    "contactNo": "9876543210",
    "email": "john.doe@example.com",
    "staffId": "123456",
    "companyRole": "Software Engineer",
    "dateOfBirth": "1990-01-01",
    "company": "60f97236b8a0a52774122bf3",
    "role": "user",
    "createdAt": "2023-07-01T12:34:56.789Z",
    "updatedAt": "2023-07-01T12:34:56.789Z"
  }
}
```

- **POST** `/create-account` - Create a new company account.
**Request Body:**
```
{
  "name": "Company Inc.",
  "address": "123 Main Street",
  "regNo": "1234567890",
  "contactEmail": "info@company.com",
  "website": "www.company.com",
  "contactPhone": "1234567890",
  "logo": "active"
}
```
**Response:**
```
{
  "message": "Company account created successfully",
  "statusCode": 201,
  "status": "success",
  "data": {
    "_id": "60f97236b8a0a52774122bf3",
    "name": "Company Inc.",
    "address": "123 Main Street",
    "regNo": "1234567890",
    "contactEmail": "info@company.com",
    "website": "www.company.com",
    "contactPhone": "1234567890",
    "logo": "active",
    "createdAt": "2023-07-01T12:34:56.789Z",
    "updatedAt": "2023-07-01T12:34:56.789Z"
  }
}
```

- **POST** `/login` - Authenticate a user (admin) and generate an access token.
**Request Body:**
```
{
  "email": "admin@example.com",
  "password": "password"
}
```
**Response:**
```
{
  "message": "Login successful",
  "statusCode": 200,
  "status": "success",
  "data": {
    "_id": "60f971e5b8a0a52774122bf1",
    "email": "admin@example.com",
    "firstName": "John",
    "role": "admin",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

- **POST** `/forgot-password` - Send a password reset email to the user's email address.
**Request Body:**
```
{
  "email": "user@example.com"
}
```
**Response:**
```
{
  "message": "Password reset email sent",
  "statusCode": 200,
  "status": "success"
}
```


- **GET** `/` - Get a list of all companies.
**Response:**
```
{
  "message": "Request successful",
  "statusCode": 200,
  "status": "success",
  "data": [
    {
      "_id": "60f97236b8a0a52774122bf3",
      "name": "Company Inc.",
      "contactEmail": "info@company.com",
      "regNo": "1234567890",
      "createdAt": "2023-07-01T12:34:56.789Z",
      "updatedAt": "2023-07-01T12:34:56.789Z"
    },
    {
      "_id": "60f97250b8a0a52774122bf4",
      "name": "Another Company",
      "contactEmail": "info@anothercompany.com",
      "regNo": "0987654321",
      "createdAt": "2023-07-01T12:34:56.789Z",
      "updatedAt": "2023-07-01T12:34:56.789Z"
    }
  ]
}
```

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
