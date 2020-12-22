# REST Container Template

![Header Logo](https://i.imgur.com/WR1l3CQ.png)

## Contents Overview
- Loader
- Express Routes 
- Controller
- Services
- Test Setup (mocha + chai)

### Loader
The loader should load and setup things, which should be available at start of the application.
- Express Server + Settings + Global Middleware
- Mongoose + MongoDB Connection
- Logging Service

## Usage

#### Setup
If you are using `gh` (https://cli.github.com/) then you can simply do
```bash
gh repo create my-own-custom-repo --template="turbopasi/rest-container-template"
```

If you are using vanilla `git` then you should clone and re-initialize for a new repo
```bash
git clone https://github.com/turbopasi/rest-container-template my-own-custom-repo
cd my-own-custom-repo
rm -r .git
git init .
```
#### Environment Variables
For you to be able to create a MongoDB Connection, add you secret variables to a `.env` file in the root directory
```env
#EXPRESS
PORT=20300
CONSOLE_DEBUG=true

#MONGODB
MONGODB_USERNAME=""
MONGODB_PASSWORD=""
MONGODB_DATABASENAME=""
```
#### Install & Run
```bash
cd my-own-custom-repo
npm install 
npm run dev
```
```bash
npm test
```