#/bin/bash

# get env variables
. ./setup.env

# install tools
echo "apt-get updating"
sudo apt-get update
echo "installing tools..."
sudo apt-get install -y \
	curl \
	git \
	jq 

echo " ******* installing docker ******* "
sudo curl -sSL https://get.docker.com/ | sh
echo " ******* installing docker-compose ******* "
sudo curl -L "https://github.com/docker/compose/releases/download/1.25.5/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo docker-compose --version

sudo gpasswd -a $USER docker

echo " ******* installing node ******* "

sudo apt update -y
sudo apt install -y ca-certificates curl gnupg

sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update -y
sudo apt install -y nodejs

node --version
npm --version

sudo apt install -y build-essential

echo " ******* get note-app repo ******* "

cd $HOME
sudo git clone  https://github.com/estib/notes-app.git

echo " ******* overwrite docker-compose.yaml with local version ******* "
sudo cp ./data/docker-compose.yaml ./notes-app/docker-compose.yaml

echo " ******* install npm dependencies ******* "

cd $HOME/notes-app/backend/ 
echo y | npm install --silent

cd $HOME/notes-app/frontend/ 
echo y | npm install --silent

echo " ******* run app ******* "
cd $HOME/notes-app/
sudo docker-compose up -d
