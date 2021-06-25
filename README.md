# Top Tweet Challenge

A simple application that integrates with the Tritter API in order to provide an easy way to search Twitter for keywords and retrieve a listing of the top 5 tweets, ordered by most popular, so the trends and hashtags can be monitored.
#### Server 

Located in the Root directory (*index.js*) simple server build with  [expressJs](https://expressjs.com/) in order to Proxy the Twitter API as this API does not support CORS. 

#### Client

Located in the client directory and initialized in */src/index.js*. A single page application build on react and webpack. This application leverages the [Twitter API - Standard v1.1](https://developer.twitter.com/en/docs/api-reference-index#twitter-api-v1)

## Installation
### Server Installation
in the root directory run:
```bash
npm install
```
then cd into the client directory and run:
```bash
npm install
```

## Running the application 
***Important** -> the server leverages dotenv in order to not expose sensitive information to sorce control. 
please add a .env file to the root directory with REQUEST_URL and TOKEN

### client and server at the same time

```bash
npm run dev
```

### running server only

```bash
npm run server
```
### running client only

```bash
npm run client
```