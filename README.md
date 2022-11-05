# oliver-blog-api
A CRUD blog API assignment from Altschool Africa

## My Fuctionalities
- A user is able to signup and create a profile with an Email, First name, Last name and password
- User password is hashed
- User is able to login and get token for unauthorized route
- All users are able to get all blogs and a single blog
- Users can add, post, update and delete their blogs
- Blogs are in two states, Draft and Published with Draft as default
- Authentication is carried out with JsonWebToken
- Add, update and update routes are protected

## Setup
- Install NodeJS, mongodb
- pull this repo
- update env with example.env
- run npm run start:dev

## Base URL
https://oliver-blog-api.herokuapp.com/

## Models
### Users
- first_name: {
        type: String,
        required: true, 
        min: 6,
        max: 255
    }
- last_name: {
        type: String,
        required: true, 
        min: 6,
        max: 255
    }
- email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    }
- password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    }

### Blogs
- title: {
      type: String,
      required: true,
      unique: true,
    }
- description: {
      type: String,
      required: true,
    }
- tag: {
      type: String,
      required: true,
      unique: true,
    }
- author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }
- body: {
      type: String,
      required: true,
    }
- state: {
      type: String,
      default: "draft",
      enum: ["draft", "published"],
    },
- readTime: {
      type: String,
      default: 0,
    },
  },
- timestamps: true 

## API
### Signup User
- Route: api/auth/register
- Method: POST
- Body:

          {
            "email": "doe@example.com",
            "password": "Password1",
            "firstname": "jon",
            "lastname": "doe",
            "username": 'jon_doe",
          }

### Login User
- Route: api/auth/login
- Method: POST
- Body:

         {
            "email": "doe@example.com",
            "password": "Password1",
            "firstname": "jon",
            "lastname": "doe",
            "username": 'jon_doe",
          }

### Get all posts
- Route: api/post/
- Method: GET

### Get single post by Id
- Route: api/post/:id
- Method: GET

### Create a blog
- Route: api/post/
- Method: POST
- Body: 
        {
            "title": " ",
            "description": " ",
            "tag": " ",
            "body": " ",
            "author": " ",
          }
          
### Update blog
- Route: api/post/:id
- Method: PUT

### Delete blog
- Route: api/post/:id
- Method: DELETE

## Contributor
OLIVER IKEGAH





