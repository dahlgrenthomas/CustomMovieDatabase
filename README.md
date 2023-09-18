# CustomMovieDatabase
This is a movie database application that has a Spring Boot backend and an Angular front end. It allows users to log in with GitHub and save movies to a watchlist so they can keep track of what movies they've seen. It also has a search feature so users can find movies.

## Tools

- This project uses Java on the backend, which is supplemented by Spring Boot for server and API creation
- Spring Security Oauth is used to log in in with GitHub
- MySQL is used as the database for the project
- The front end of this project uses Angular, and features a number of different [Angular Materials](https://material.angular.io/) for improved user experience
- Typescript, JavaScript, HTML,and CSS were used to create the front end of the application
- Unit testing was done using SpringBootTest, JUnit, [Karma](https://karma-runner.github.io/latest/index.html), and [Jasmine](https://jasmine.github.io/)

## Running the project
To run you need to have a MySQL server connected to the Spring application more informotion on how to set that up can be found [here](https://spring.io/guides/gs/accessing-data-mysql/)

In order to log in with GitHUb you need to make a new GitHub app and add the client id and client secret to the `application.properties` file found in the project here: `MovieDatabase\src\main\resources\application.properties`

The front end of the project needs to be built before running the server since this project was developed as a singular app. You can run `ng serve` from the `angular-app` directory and use the search function of the app, but you can only log in on GitHub when the front end is built into the back end.

From the `angular-app` directory:

- `ng build` to build the client
- `ng test` to test the client

From the projects main directory:

- `./gradlew bootRun` to start the app
- `./gradlew clean test` to test the server

Once the server is up you can access the app at http:/Localhost:8080


