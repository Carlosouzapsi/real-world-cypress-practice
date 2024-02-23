### What I'm testing?

Software Under Test (SUT) - Real World App - Banking Accounts:

https://github.com/Carlosouzapsi/cypress-realworld-app

#### e2e test section

## Login and logout tests

1. Should do login with valid credentials
2. Should not do login with a non existent username
3. Should not do login with a non existent password
4. Should not do login when using a blank username
5. Should not do login when using a blank password
6. Should display an input error when password doesn't has at least 4 characters
7. Should do login remembering a valid user
8. Should do logout with a valid logged user

## New user account tests

1. Should create a new user account using valid values
2. Should not create a new user account using blank values on firstname input
3. Should not create a new user account using blank values on lastname input
4. Should not create a new user account using blank values on username input
5. Should not create a new user account using blank values on password input
6. Should not create a new user account using blank values on confirm password input
7. Should not create a new user account using less than 4 characters on password field
8. Should not create a new user account using confirm password different than password

## Edit user account tests

1. Should edit user account first name using a valid value
2. Should not edit user account first name using blank values
3. Should edit user account last name using a valid value
4. Should not edit user account last name using blank values
5. Should edit user account email using a valid email value
6. Should not edit user account email using a blank value
7. Should not edit user account email using an invalid email format
8. Should edit user account phone number using a valid value
9. Should not edit user account phone using a blank value
10. Should not edit user phone number using a invalid phone number value

## new bank account tests

1. Should create a new bank account with valid values
2. Should not create a new bank account using blank values on Bank name input
3. Should not create a new bank account using blank values on Routing number input
4. Should not create a new bank account using blank values on Account number input
5. Should display an error message when Bank name has less than 5 characters
6. Should display an error message when routing number with an invalid value
7. Should display an error message when account number has less than 9 digits

## delete bank account tests

## create payment requests tests

## create payment pay tests

## notification tests

## transaction details list tests
