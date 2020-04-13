SCRIPTS_DIRECTORY="$PWD/scripts"
PROJECT_DIRECTORY='$PWD/inferno';
USER="root"
SSH="ssh -i $PWD/deploy_key $USER:$SERVER_IP_ADDRESS"
URL="$SERVER_IP_ADDRESS:$USER"
COPY_DOCKER_COMPOSE="scp -i $PWD/deploy_key $PWD/docker-compose.yml $USER:$SERVER_IP_ADDRESS:~/inferno"
bash $SCRIPTS_DIRECTORY/docker-compose_push.sh

echo "URL => $URL"

DEPLOY="cd ~inferno && docker-compose pull && docker-compose stop && docker-compose up"

$COPY_DOCKER_COMPOSE
$SSH $DEPLOY