# Weather Application Mockup

## Pre-requisites

- Docker
- Docker Compose
- Node.js
- pnpm

## Installation Ubuntu

### Docker

Follow the instructions on the official website [https://docs.docker.com/engine/install/ubuntu/]
Add Docker's official GPG key:

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

Install Docker packages

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

Verify

```bash
 sudo docker run hello-world
```

### Node and pnpm

Use nvm to manage node version [https://github.com/nvm-sh/nvm]

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
```

Add the following to the end of your .bashrc or .zshrc or .bash_profile

```bash
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm
```

Use nvm to install node version 20

```
nvm install 20
nvm use 20
```

### Install pnpm

```
npm install -g pnpm
```

## Build and Run application

```bash
./build_local.sh
```

# SQLite

Go into

```
docker exec -it weatherapplicationmockup-datebase-1 sh
```

Open SQLite

```
sqlite3 weatger.sb
```

DB Commands

```
.tables
.schema locations
```
