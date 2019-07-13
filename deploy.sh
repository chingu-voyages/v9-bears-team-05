docker build -t sherondale/aphrodite-client:latest -t sherondale/aphrodite-client:$SHA -f ./client/Dockerfile ./client
docker build -t sherondale/aphrodite-server:latest -t sherondale/aphrodite-server:$SHA -f ./server/Dockerfile ./server
docker push sherondale/aphrodite-client:latest
docker push sherondale/aphrodite-server:latest

docker push sherondale/aphrodite-client:$SHA
docker push sherondale/aphrodite-server:$SHA

kubectl apply -f k8s
kubectl set image deployments/server-deployment server=sherondale/aphrodite-server:$SHA
kubectl set image deployments/client-deployment client=sherondale/aphrodite-client:$SHA
