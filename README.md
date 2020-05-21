# Website Health Checker

A System that are meant to fetch URLs from user and keep checking health of mentioned URLs based on the configuration.

# List of APIs!
  - Register websites by providing URL, interval to check status(in secs) and expected status code
    - Endpoint: /register
    - Method: POST
    - Request Body Format (JSON):
        - {"websites": [{
            "URL": "<url>", 
            "method": "<http Req Method>[Currently Supporting GET only]",
            "expectedStatusCode": "<http-status-code>",
            "checkInterval": <interval-To-Hit-URL-From-Backend(in sec)>
            }, .., ]}   

  - Get All register URLs
    - Endpoint: /websites
    - Method: GET

  - Get health status and its history of requested website
    - Endpoint: /website/{id}
    - Method: GET
    - Params: 
        id represents website-record-id

### Tech

Technology Used to develop the endpoints:
* ReactJs - For UI
* GoLang - For Website health check and REST API!
* SQLite - To store records
* Gorilla Mux - HTTP Router and dispatcher.
* Gorm - ORM library for GoLang
* robfig/cron - Cron library for GoLang
* Postman - To test the endpoints

### Installation

#### Setup Backend
```
1. Setup Go
For Linux: 
sudo apt install golang-go
[Set GOPATH/GOROOT if not set bydefault]
2. Clone Respository: https://github.com/SanghviChirag/website-health-check-with-react
3. cd server/
4. Run cmd to initiate server: go run *.go 
```
#### Setup UI
```
1. Setup React
Install Node.js (version must be greater than 8.0)
Install npm
2. Clone Respository: https://github.com/SanghviChirag/website-health-check-with-react
3. cd client/
4. npm i
5. Run cmd to build: npm run build
6. Run cmd to initiate server: serve -s build
```

### Postman
Postman collection has been attached with the repository, using which endpoints can be tested.
