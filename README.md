# Au Pied De Cochon Reporting Web App

### Project Resources

This project is using Firebase for the following:
- Users Database: Firebase Realtime DB
- Orders Database: Firebase Firestore DB
- Locations Database: Firebase Firestore DB
- Backend: Firebase Functions
- Reports Storage: Firebase Storage (working but not being used due to customer changing their mind)
- Hosting: Firebase Hosting
- User Authentication for Sign up/Sign in: Firebase Authentication

This Web App was created using Firebase as a back-end for authentication, user db, orders db, cloud functions, and hosting. The front-end was made in [React](https://reactjs.org/), along with [Semantic UI for React](https://react.semantic-ui.com/)

### Hosting

The web app was deployed using Firebase hosting.

The official reporting application for the live account (store ID: 648564) is available [here](https://au-pied-de-cochon.web.app/).

The reporting application for the sandbox account (store ID: 649413) (lots of test data) is available [here](https://ls-strategic-apis.web.app/).

### Documentation

Public documentation that was shared with the customer can be found [here](https://docs.google.com/document/d/17zrPIYwdgGASc8qpmKXxsTRKmZQr5n6aQxYrBcooDxY/edit?usp=sharing).

Internal documentation can be found [here](https://docs.google.com/document/d/183P8aQX4IN49a6kn74GqT35Yyzi8bQklcTWX4UC9d2g/edit?usp=sharing).

### Run Locally
To run the project locally, the following steps are needed:

1. ```npm run start```
2. Navigate to localhost:3000

### Deploy Changes
To deploy changes made, the following steps are needed:

Front-End

1. Navigate to the root of the project.
2. ```npm run build```
3. ```firebase deploy --only hosting:au-pied-de-cochon```

Back-End

1.  ```firebase deploy --only functions:apdc_api```

### Objective

Build custom order/delivery reports that can be generated by selecting various parameters.

### Scenarios

- To generate a report, a user will navigate to a website that will display all types of reports that are available to be generated.
- Once a report is selected, the user will select the parameters that are needed to generate the report.
- Once the parameters are selected, the report will be created, displayed to the user and saved.
