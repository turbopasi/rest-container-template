# REST Container Template

![Header Logo](https://i.imgur.com/WR1l3CQ.png)

## Contents Overview
- Loader
- Express Routes : Controller + Middleware
- Models
- Services
- Injector
- EventEmitter
- Sample Tests

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
#### Install & run for development
```bash
cd my-own-custom-repo
npm install 
npm run dev
```
```bash
npm test
```

#### Build Docker image & run container
```bash
docker build -t <your username>/rest-container-template .
docker run -p 20300/8080 -d <your username>/rest-container-template
```

