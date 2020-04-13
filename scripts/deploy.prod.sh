CWD="$PWD/scripts"

bash $CWD/docker-compose_push.sh

USER="root"
SSH="ssh -i $PWD/deploy_key $USER:$SERVER_IP_ADDRESS"
URL="$SERVER_IP_ADDRESS:$USER"
echo "URL => $URL"

DEPLOY="docker-compose pull && docker-compose stop && docker-compose up"

$SSH $DEPLOY