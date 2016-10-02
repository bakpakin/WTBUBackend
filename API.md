# WTBU App API

This is the API for the WTBU App backend server. To interact with the backend, send HTTP GET requests to https://gaiwtbubackend.herokuapp.com/, and the backend server 
will send back JSON objects containing the response. The backend mirrors the Spinpapi version 2, which can be found in a pdf form on the Spintiron website. All 
responses send back a json object which contains metadata about the response and a "results" field that contains the requested data.

## Example Usage

The following examples get the currently playing songs.

Todo.

Swift (Using Alamofire)
```swift

```

Java (Using )
```java

```

## API

### Spinpapi 

#### GET
* /song
* /songs
* /currentPlaylist
* /playlistInfo
* /playlistsInfo
* /showInfo
* /regularShowsInfo

All parameters to requests should be appended to the URL. For example, to get information about a specific song of ID 1234, send
an HTTP GET request to this url: 

https://gaiwtbubackend.herokuapp.com/song?SongID=1234

For more complete information about this part of the API, check out 
[SpinPapi-v2.pdf](https://bitbucket.org/spinitron/documentation/src/c35d4f6c311b2a3d3a778421d59e9be330f51ec0/SpinPapi-v2.pdf?at=master&fileviewer=file-view-default).

### Chat

Some of these features may not yet be implemented, or may change. I'm working on it. Unlike the Spinpapi, not all functionality is implemented in GET
requests; there are POST requests as well for requests that change data.

#### GET
* /chatEnabled: Returns a JSON object that contains one field, "enabled", that is a boolean indicating if chat functionality has been
    enabled by the current DJ.
* /getMessages: Get recent chat messages. Put the authorization token as a URL parameter, like "/getMessages?Token=XXXXMyTokenXXXXX. Will return a JSON object with
field, "messages", which is an array of chat messages. Each message is another JSON object with two fields: "timestamp" and "body". "timestamp" is an integer that	
indicates when the message was sent, and "body" is the message body.

#### POST
* /chatSession: Request a chat session with the current DJ. Will return A JSON object with the following fields:
    * "enabled": Boolean that indicates if chat is enabled for the current DJ.
    * "requiresCaptcha": Boolean that indicates if the user has to solve a captcha.
    * "captchaImage": URL of the captcha image to solve. (Only applicable if "requiresCaptcha" is true.)
    * "token": A String that serves as a password for all chat requests (will only be sent if captcha is not sent).
* /submitCaptcha: If a captcha had to be solved, let the user solve it and POST it to this url, with the solution as 
    the body of the POST. The server should then send back a JSON object response containing a 'token' field.
* /sendChatMessage: Sends a chat message to the server. Provide the token received from /chatSession in the URL as a parameter, just like /getMessages, and 
    put the chat message in the body of the request. The server will send back a response JSON object that contains two fields, "status", which is
    either "success" or "failure", as well as "timestamp", which contains when the message was received stored as an integer.
