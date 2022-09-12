1. Architecture
At the first stage of the application development the project skeleton
was created to follow Route-Controller-Service structure.
This architectural approach was chosen due to its scalability and ability to separate concerns 
of different program parts. 

2. General logic
There are two Routers used when a request to the apiPath is received. 
Each router uses corresponding controller's methods to process calls to specified urls.
Each controller deals with processing requests and sending responses. Third-party API call is also 
done from controller (bitcoin.controller) because services and lower level parts of the program should
not process it.
There is only email service as endpoint /rate needs only an external api call, but not any bussiness logic.
Email service is used for verification and uses email repository methods to work with the "database" (file).
Email repository only works with emails.txt, namely it reads file's contents and appends it with new emails.

3. Used external services
@sendgrid/mail is used to send emails from the verified by SendGrid email account. SendGrid uses user's 
SendGrid api key, which is stored in .env file in controllers folder as well as the verified email account.
CoinGecko api was used to get BTC rate in UAH.

4. Docker
Alpine doesn't go bundled with npm, so that it is needed to manually install it in an image. 
Multi-stage build was used for creating the image.
When the source code is changed the developer will need to rebuild the image and rerun the container. That's why
it would be essential to enable hot reload of the application using docker compose for the future perspective.

5. Graphical interface
This application only provides the API and no GUI.