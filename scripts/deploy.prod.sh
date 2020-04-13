[[ $1 = '' ]] && BRANCH="master" || BRANCH=$1

SSH_KEY_PATH="key.pem"
SERVER="remote_username@remote_host"
DEST_FOLDER="path_to_project_folder"
PARAMS="BRANCH=\"$BRANCH\" DEST_FOLDER=\"$DEST_FOLDER\""

echo ===================================================
echo Autodeploy server
echo selected barcn $BRANCH
chmod 400 $SSH_KEY_PATH
echo ===================================================
echo Connecting to remote server...
ssh -i $SSH_KEY_PATH $SERVER $PARAMS 'bash -i'  <<-'ENDSSH'
    #Connected

    cd $DEST_FOLDER

    docker-compose pull
    docker-compose stop
    docker-compose up

    exit
ENDSSH