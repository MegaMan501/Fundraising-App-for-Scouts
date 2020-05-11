# Readme file for backend
Follow these instructions to get up and running quickly.

## Setup for `.env` file
Replace **< some variable >** with respective values.

```
PORT="<port number>"
MYSQL_HOST="<ip address>"
MYSQL_PORT="3306"
MYSQL_USER="<database user>"
MYSQL_PWD="<user password>"
MYSQL_DB="<database name>"
MYSQL_CA="/path/to/server-ca.pem"
MYSQL_KEY="/path/to/client-key.pem"
MYSQL_CERT="/path/to/client-cert.pem"
OAUTH2_CLIENT_ID="given_oauth2_client_id"
OAUTH2_CLIENT_SECRET="given_oauth2_secret"
OAUTH2_REFRESH_TOKEN="given_oauth2_refresh_token"
EMAIL_USER="email_account_used_for_nodemailer"
JWT_KEY="<very very long secret password>"
```

# How to install dependences? 
`> npm i`

# How to Run Backend Node Server? 
`> npm run dev-backend`
