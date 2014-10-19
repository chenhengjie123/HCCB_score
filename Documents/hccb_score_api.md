# HCCB_score API(draft)

This is document of HCCB_score app. We mainly use RESTful api and each uri of GET/PUT/DELETE request should correspond to a table in database. Only POST correspond to an operation, not only a table.

references: 
[rest api tutorial](http://www.restapitutorial.com),
[http status codes](http://www.restapitutorial.com/httpstatuscodes.html)

## API uri list

All resource name in uri should be plurals(复数)

Request:

    GET api/configs
    
Response:

    {
        "apiVersion":"v1.0",
        "serverUrl":"http://abc.com/"
        "resources":[
            {"score":"api/scores"},
            {"activity":"api/activities"},
            {"user":"api/users"}
        ]
    }

## Error codes and related messages:

Every response from server should contain status codes as below.

#### 200 OK
General status code. Most common code used to indicate success.
#### 201 CREATED
Successful creation occurred (via either POST or PUT). Set the Location header to contain a link to the newly-created resource (on POST). Response body content may or may not be present.
#### 204 NO CONTENT
Indicates success but nothing is in the response body, often used for DELETE and UPDATE operations.
#### 400 BAD REQUEST
General error when fulfilling the request would cause an invalid state. Domain validation errors, missing data, etc. are some examples.
#### 401 UNAUTHORIZED
Error code response for missing or invalid authentication token.
#### 403 FORBIDDEN
Error code for user not authorized to perform the operation or the resource is unavailable for some reason (e.g. time constraints, etc.).
#### 404 NOT FOUND
Used when the requested resource is not found, whether it doesn't exist or if there was a 401 or 403 that, for security reasons, the service wants to mask.
#### 405 METHOD NOT ALLOWED
Used to indicate that the requested URL exists, but the requested HTTP method is not applicable. For example, POST /users/12345 where the API doesn't support creation of resources this way (with a provided ID). The Allow HTTP header must be set when returning a 405 to indicate the HTTP methods that are supported. In the previous case, the header would look like "Allow: GET, PUT, DELETE"
#### 409 CONFLICT
Whenever a resource conflict would be caused by fulfilling the request. Duplicate entries, such as trying to create two customers with the same information, and deleting root objects when cascade-delete is not supported are a couple of examples.
#### 500 INTERNAL SERVER ERROR
Never return this intentionally. The general catch-all error when the server-side throws an exception. Use this only for errors that the consumer cannot address from their end.

[http status codes](http://www.restapitutorial.com/httpstatuscodes.html)


## Entry

### Login and logout

When app send a request with user’s token in request header, it is treated as login. ONLY Register requests can be without this token, other features need to check token first.

### Check if user exist

Request:
    
    GET api/users?mobile=13123123123&isRegistered=true
    
Response:
    
user exist:    

    status code = 200
    
user not exist:

    status code = 404

ATTENTION: Since add record with mobile number would create user that didn't existed yet, so we check if user's password exist for isRegistered. If mobile didn't exist or password is null, it should be treated as unregistered.



### Register

Request:

	POST api/users
    
Post content(use form to post):

name|example value|detail
----|-----|------
mobile|"13245647584"|mobile number
password|"14240234"|password
nickname|"chj"|
    
Response:

**success**

    {
        "token": "53ea43ec4f3640e8220001e8",
        "userId": "123",
        "message":""
    }
    
**error**

    {
        "token":"",
        "userId": "",
        "message":"register error"
    }
    
name|example value|detail
----|-----|------
token|"53ea43ec4f3640e8220001e8"|if register fail, this value should be ""
userId|"123"|if register fail, this value should be ""
message|"errorMessage"|if register fail, this value represent error message


## Score

Score has total score of each user

### get all scores

Request:

    GET api/scores
    
Response:
    
    {
        "data": [
            {
                "nickname": "abc",
                "score": "123",
                "position":"1"
                "isCurrentUser":false
            },
            {
                "nickname": "bcd",
                "score": "234",
                "position":"2",
                "isCurrentUser":false
            },
            ...
            {
                "nickname":"aaa",
                "score":"",
                "position":"12312",
                "isCurrentUser":true
            }
        ]
    }

If user's position is in first ten, score should has 10 items, otherwise it should has 11 items and the last one is always current user's score.

name|example value|detail
----|-----|------
nickname|"abc"|user's nickname
score|"123"|user's score
position|"123"|user's position in score list, order from max to min
isCurrent|"true"|It's used to represent it's score for current user

### get someone's score

Request:

    GET api/scores/123
    
    123 is user id
    
Response:
    
    {
        "data": [
            {
                "nickname": "abc",
                "score": "123",
                "position":"1"
            }
        ]
    }

## Record

Record records each increase/decrease score, including attenders, scores and winer.

### Add record

Request:

    POST api/records
    
    post content:
    {
        "activityId":"123",
        "winner":{"members":[{"mobile":"123"},{"mobile":"123"}], "score":21},
        "loser":{"members":[{"mobile":"123"},{"mobile":"123"}], "score":10},
        "judger":{"mobile":"123"}
    }

If user doesn't exist in system yet, please use its mobile as nickname and add it into user table

Response:
**Success**:

    {
        "message":""
    }

**Error**

    {
        "message":"something is wrong"
    }

name|example value|detail
----|-----|------
message|"something is wrong"|if success, its value is "".

### Get someone's records

Request
    
    GET api/records?userId=123
    
Response

    {
        "data":[
            {
                "time":"2014/10/11 16:30",
                "activityName": "activity at Olympic statium",
                "winner":{"members":[{"nickname":"123"},{"nickname":"123"}], "score":21},
                "loser":{"members":[{"nickname":"123"},{"nickname":"123"}], "score":10},
                "judgement":[{"nickname":"cde"}]
            },{
                "time":"2014/10/11 16:30",
                "activityName": "activity at Olympic statium",
                "winner":{"members":[{"nickname":"123"},{"nickname":"123"}], "score":21},
                "loser":{"members":[{"nickname":"123"},{"nickname":"123"}], "score":10},
                "judger":[{"nickname":"cde"}]
            }
        ]
    }

name|example value|detail
----|-----|------
time|"2014/10/11 16:30"|Record upload time
activity|"activity at Olympic statium"|Activity name
winner.members|[{"nickname":"123"}]|members of winner team
winner.members.nickname|"name"|nickname of member
winner.score|21|score of winner
loser.members|[{"nickname":"123"}]|members of loser team
loser.members.nickname|"name"|nickname of member
loser.score|21|score of loser
judger.nickname|"abc"|Nick name of judger


## User

User has all functions about user, like add/edit user/user's friend

### get friends of current user

Request:

    GET api/users/123/friends
    
    123 is current user's id
    
Response:
**has some friends**

    {
        "data":[
            {"userId":"123", "nickname":"234", "mobile":"132940239485"},
            {"userId":"123", "nickname":"234", "mobile":"132940239485"},
            ...
        ]
    }

**no friends yet**

    {
        "data":[
        ]
    }

### add friend to current user

Request:

    POST api/users/123/friends
    
    123 is current user's id
    
    post content:
    {
        "userId":"123"
    }
    
Resposne:

    {
        "message":"error message"
    }
name|example value|detail
----|-----|------
message|"something is wrong"|if success, its value is "".


### get user info

Request:
    
    GET api/users/123
    
    123 is user id
    
Response:
    
    {
        "userId":"123",
        "nickname":"213",
        "mobile":"12382193923"
    }
    
### update user info(including password)

Request:

    PUT api/users/123
    
    123 is user id
    
Post content(use form to post):

name|example value|detail
----|-----|------
nickname|"nickname"|
mobile|"123123242342"|

Response:
    
    {
        "userId":"123",
        "nickname":"new nickname",
        "mobile":"12382193923"
    }

name|example value|detail
----|-----|------
nickname|"nickname"|new nickname
mobile|"123123242342"|new mobile number
password|"123123"|new password(if didn't change password, its value should be "")

### change user password

Request:
    
    PUT api/users/123/passwords
    
    123 is user id
    
    post content:
    {
        "old":"123123",
        "new":"123123123"
    }
    
name|example value|detail
----|-----|------
old|"12312"|old password
new|"123123"|new password

Response:
**success**
    
    status code: 204

**error**
    
    status code: 4xx
    
    content:
    {
        "message":"error message"
    }
    
name|example value|detail
----|-----|------   
message|"errorMessage"|if change password fail, this value represent error message. If success, the message should be ""


## Activity

### get current user's current activity

Request:
    
    GET api/activities?userId=123&time=current
    
Response:
    
    {
        "activityName": "123",
        "activityId": "123",
        "activityStartTime": "2014/10/11 16:30",
        "activityEndTime": "2014/10/11 18:30",
        "activityLocation": "some where"
    }
    
### get current user's activity history

Request
    
    GET api/activities?userId=123
    
    123 is user id
    
Response:
    
    {
        "data":[
            {
                "activityName": "123",
                "activityId": "123",
                "activityStartTime": "2014/10/11 16:30",
                "activityEndTime": "2014/10/11 18:30",
                "activityLocation": "some where"
            },{
                "activityName": "123",
                "activityId": "123",
                "activityStartTime": "2014/10/11 16:30",
                "activityEndTime": "2014/10/11 18:30",
                "activityLocation": "some where"
            },
            ...
        ]
    }

### current user attend activity

Request

    POST api/activities/123/users
    
    123 represents activity id
    
    post content:
    {"userId":"234"}
    
Post content(use form to post):

name|example value|detail
----|-----|------
userId|"123"|user id
    
Response

**success**

    status code: 201

**failed**
    
    status code: 4xx
    
    {
        "message": "something is wrong"
    }

name|example value|detail
----|-----|------   
message|"errorMessage"|if change password fail, this value represent error message. If success, the message should be ""


### get attender of specific activity

Request
    
    GET api/activity/123/users
    
    123 represents activity id
    
Response
    
    {
        "data":[
            {"nickname":"123"},
            {"nickname":"123"},
            ...
        ]
    }
    


