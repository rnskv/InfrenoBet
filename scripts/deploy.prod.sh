SCRIPTS_DIRECTORY="$PWD/scripts"
PROJECT_DIRECTORY="~/inferno";
USER="root"
SSH="ssh -i $PWD/deploy_key $USER@$SERVER_IP_ADDRESS"
URL="$USER@$SERVER_IP_ADDRESS"
COPY_DOCKER_COMPOSE="scp -i $PWD/deploy_key $PWD/prod.docker-compose.yml $USER@$SERVER_IP_ADDRESS:~/inferno/docker-compose.yml"
DEPLOY="cd $PROJECT_DIRECTORY && docker-compose pull && docker-compose stop && docker-compose run -d --rm -f && exit"

echo "URL => $URL"

$COPY_DOCKER_COMPOSE
$SSH $DEPLOY
