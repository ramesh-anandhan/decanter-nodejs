dockerpath=`which docker`

 if [ -z != $dockerpath ]
 then
 		echo "docker already installed"
 else
 		echo "please install docker and continue, exiting "
 		exit
 fi

echo "**********************************************************************************"
file="docker.pid"
        if [ -f "$file" ]
        then
            docker stop `cat docker.pid`
        fi
cp /dev/null docker.pid

echo "**********************************************************************************"
echo "deleting dangling images from docker engine"

docker rmi -f `docker images --filter 'dangling=true' -q --no-trunc`

echo "**********************************************************************************"
echo "building docker image"

docker build -t ape-decanter-nodejs:latest .

echo "docker image build successful "
echo "**********************************************************************************"
echo "starting docker "

 if [[ $OSTYPE == darwin* ]];
 then
    docker run -d -p 8091:8091 -v /private/var/log:/logs -e SQL_SECRET_KEY="${SQL_SECRET_KEY}" -e NODE_ENV="${NODE_ENV}" -e PORT="${PORT}" ape-decanter-nodejs:latest > docker.pid
 else
    docker run -d -p 8091:8091 -v /var/log:/logs -e SQL_SECRET_KEY="${SQL_SECRET_KEY}" -e NODE_ENV="${NODE_ENV}" -e PORT="${PORT}" ape-decanter-nodejs:latest > docker.pid
 fi

echo "started docker successfully, image id : " `cat docker.pid`