SCRIPTS_DIRECTORY="$PWD/scripts"
PROJECT_DIRECTORY="$PWD/inferno";
USER="root"
SSH="ssh -i $PWD/deploy_key $SERVER_IP_ADDRESS@$USER"
URL="$SERVER_IP_ADDRESS@$USER"
COPY_DOCKER_COMPOSE="scp -i $PWD/deploy_key $PWD/docker-compose.yml $SERVER_IP_ADDRESS@$USER:~/inferno"
DEPLOY="cd ~inferno && docker-compose pull && docker-compose stop && docker-compose up"

bash $SCRIPTS_DIRECTORY/docker-compose_push.sh

echo "URL => $URL"

$COPY_DOCKER_COMPOSE
$SSH $DEPLOY
