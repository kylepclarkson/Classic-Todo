# Classic-Todo (Updated)

## Update: 

This was initially a quick project to review using the Django Rest Framework package to create an api and to intereact with it using React. As such only a single user could interact with the app - anytime a user accessed it, all previous todos (by other users) could be accessed. 
 
I wanted to push the project further by including multipe user functionality. This required user authentication and the handling of tokens to identify them. Doing so in React required me to address one of my grievances with React: state management. My previous projects with React were small enough that I could get by (still with headaches) using React's local state, but when projects grew larger with several components I would run into issues handling the state (i.e. passing functions to set state in a parent component to a child component.)

I finally dove into using Redux with React to manage my app's state. There were some roadbumps getting it all to work, but after finally understanding the methodology behind Redux I really enjoyed how it interacts with React - definitely going to use it again!

The application uses Django's default user model to handle authentication and the Knox library to create and handle authentication tokens. Upon login, a token is generated and past to the the frontend to recognize the user and to ensure only they can access todo items that they have created.

### Login and Use:
![Login](./login.gif)

### Registration
![Registration](./registration.gif)


# Classic-Todo (Original)
A classic Todo application built with a Django backend and React frontend. A weekend project to brush up on my api design skills and making calls with Javascript. 

Allows for a user to create, edit, and delete todo items - a line of text.  

![Screenshot](./snippet.PNG)
