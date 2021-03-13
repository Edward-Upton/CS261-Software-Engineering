# Server

- [Server](#server)
  - [Setup](#setup)
  - [Config](#config)
  - [REST API](#rest-api)
    - [User Routes](#user-routes)
      - [GET '/api/user/'](#get-apiuser)
      - [GET '/api/user/:id'](#get-apiuserid)
      - [POST '/api/user/login'](#post-apiuserlogin)
      - [POST '/api/user/register'](#post-apiuserregister)
    - [Event Routes](#event-routes)
      - [GET '/api/event/'](#get-apievent)
      - [GET '/api/event/:id'](#get-apieventid)
      - [GET '/api/event/participating/:userId'](#get-apieventparticipatinguserid)
      - [GET '/api/event/hosting/:userId'](#get-apieventhostinguserid)
      - [POST '/api/event/join'](#post-apieventjoin)
      - [POST '/api/event/'](#post-apievent)
      - [POST '/api/event/submit-feedback'](#post-apieventsubmit-feedback)
  - [Websocket Server](#websocket-server)

## Setup

- Install dependencies with `yarn` or `npm i`.
- Run server using `yarn start` or `npm start`.
- Run development server using `yarn dev` or `npm run dev`.
- Compile typescript using `yarn build` or `npm run build`.

## Config

The [config.ts](src/config.ts) file contains the config for the server.

- The `PORT` constant contains the port the API server will listen to.
- The `DB_URI` constant contains the remote URI (with credentials) for the MongoDB database.
- The `DB_OPTIONS` constant contains the database config used by Mongoose.

## REST API

### User Routes

#### GET '/api/user/'

Returns a list of all the users

- URI: `/api/user/`
- Method: `GET`
- JSON Response:
  - `"count": int` - number of user objects retrieved.
  - `"users": [User]` - array of user objects.
- Example Response:

```
200 OK

{
  "count": 3,
  "users": [
    { "_id": ..., "email": ... },
    { "_id": ..., "email": ... },
    { "_id": ..., "email": ... }
  ]
}
```

#### GET '/api/user/:id'

Returns a user with the specified id in the url parameters.

- URI: `/api/user/:id`
- Method: `GET`
- Parameters:
  - `:id`: The user id to search for.
- JSON Response:
  - `"user": User` - user object.
- Example Request:

```
GET /api/user/123456789
```

- Example Response:

```
200 OK

{
  "user": {
    "_id": "123456789",
    "email": "user@email.com"
  }
}
```

#### POST '/api/user/login'

Login to an account and retrieve their user object.

- URI: `/api/user/login`
- Method: `POST`
- JSON Body:
  - `"email": string` - email of user account.
  - `"password": string` - password of user account.
- JSON Response:
  - `"user": User` - user object.
- Example Request:

```
POST /api/user/login
Body {
  "email": "user@mail.com",
  "password": "Password123"
}
```

- Example Response:

```
200 OK

{
  "user": {
    "_id": "123456789",
    "email": "user@email.com"
  }
}
```

#### POST '/api/user/register'

Register a new user account.

- URI: `/api/user/register`
- Method: `POST`
- JSON Body:
  - `"email": string` - email of user account.
  - `"password": string` - password of user account.
- JSON Response:
  - `"user": User` - user object.
- Example Request:

```
POST /api/user/register
Body {
  "email": "user@mail.com",
  "password": "Password123"
}
```

- Example Response:

```
201 Created

{
  "user": {
    "_id": "123456789",
    "email": "user@email.com"
  }
}
```

### Event Routes

#### GET '/api/event/'

Return a list of all registered events.

- URI: `/api/event`
- Method: `GET`
- JSON Response:
  - `"count": int` - number of user objects retrieved.
  - `"events": [object]` - array of event objects.
- Example Response:

```
200 OK

{
  "count": 3,
  "events": [
    { ... },
    { ... },
    { ... }
  ]
}
```

#### GET '/api/event/:id'

Returns an event with the specified id in the url parameters.

- URI: `/api/event/:id`
- Method: `GET`
- Parameters:
  - `:id`: The event id to search for.
- JSON Response:
  - `"event": Event` - event object.
    - `"name": string` - name of event.
    - `"eventType": string` - type of event.
    - `"start": Date` - starting time and data of event.
    - `"end": Date` - end time and data of event.
    - `"host": string | User` - host user of the event.
    - `"participants": [string] | [User]` - array of participant users in the event.
    - `"inviteCode": string` - invite code of the event.
    - `"feedback": [Field]` - feedback fields of event.
- Example Request:

```
GET /api/event/123456789
```

- Example Response:

```
200 OK

{
  "event": {
    ...
  }
}
```

#### GET '/api/event/participating/:userId'

Return all the events that a user is participating in.

- URI: `/api/event/participating/:userId`
- Method: `GET`
- Parameters:
  - `:userId`: The user id used to search for their participating events.
- JSON Response:
  - `"count": int` - number of user objects retrieved.
  - `"events": [Event]` - array of event objects.
- Example Request:

```
GET /api/event/participating/123456789
```

- Example Response:

```
200 OK

{
  "count": 3,
  "events": [
    { ... },
    { ... },
    { ... }
  ]
}
```

#### GET '/api/event/hosting/:userId'

Return all the events that a user is hosting.

- URI: `/api/event/hosting/:userId`
- Method: `GET`
- Parameters:
  - `:userId`: The user id used to search for events they are hosting.
- JSON Response:
  - `"count": int` - number of user objects retrieved.
  - `"events": [Event]` - array of event objects.
- Example Request:

```
GET /api/event/hosting/123456789
```

- Example Response:

```
200 OK

{
  "count": 3,
  "events": [
    { ... },
    { ... },
    { ... }
  ]
}
```

#### POST '/api/event/join'

Join an existing event.

- URI: `/api/event/join`
- Method: `POST`
- JSON Body:
  - `"userId": string` - user id of account to join event.
  - `"inviteCode": string` - invite code for the event.
- JSON Response:
  - `"event": Event` - the updated event object.
- Example Request:

```
POST /api/event/join
Body {
  "userId": "123456",
  "inviteCode": "ABC123"
}
```

- Example Response:

```
201 Created

{
  "event": {
    ...
  }
}
```

#### POST '/api/event/'

Create a new event.

- URI: `/api/event/`
- Method: `POST`
- JSON Body:
  - `"name": string` - name of event.
  - `"eventType": string` - type of event.
  - `"start": Date` - starting time and data of event.
  - `"end": Date` - end time and data of event.
  - `"host": string | User` - host user of the event.
  - `"participants": [string] | [User]` - array of participant users in the event.
  - `"feedback": [Field]` - feedback fields of event.
- JSON Response:
  - `"event": Event` - the new event object.
- Example Request:

```
POST /api/event/
Body {
  "name": "event name",
  "eventType": "type of event",
  "start": "2020-12-01T00:00:00.000Z",
  "start": "2020-12-10T00:00:00.000Z",
  "host": "123456789",
  "participants": ["123456789", ...],
  "feedback": [...]
}
```

- Example Response:

```
201 Created

{
  "name": "event name",
  "eventType": "type of event",
  "start": "2020-12-01T00:00:00.000Z",
  "start": "2020-12-10T00:00:00.000Z",
  "host": "123456789",
  "inviteCode": "ABC123"
  "participants": ["123456789", ...],
  "feedback": [...]
}
```

#### POST '/api/event/submit-feedback'

Submit feedback to an active event.

- URI: `/api/event/submit-feedback`
- Method: `POST`
- JSON Body:
  - `"eventId": string` - the id of event to submit feedback to.
  - `"userId": string` - the id of user submitting feedback.
  - `"fieldId": string` - the id of the field that data is being submitted to.
  - `"data": object` - the data being submitted.
- Example Request:

```
POST /api/event/submit-feedback
Body {
  "eventId": "123456789",
  "userId": "123456789",
  "fieldId": "123456789",
  "data": { ... }
}
```

- Example Response:

```
201 Created

{
  "message": "Feedback received."
}
```

## Websocket Server

Socket.IO server listening on index route '/'.

Sends event updates to hosts:

- Event name: `"eventUpdate"`
- Arguments: `{ event }` - the updated event object.
