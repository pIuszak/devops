#!/bin/sh

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f k8s/myapp-configmap.yml
kubectl apply -f k8s/redis-deployment.yml
kubectl apply -f k8s/redis-service-clusterip.yml
kubectl apply -f k8s/postgres-secret.yml
kubectl apply -f k8s/postgres-pvc.yml
kubectl apply -f k8s/postgres-deployment.yml
kubectl apply -f k8s/postgres-service-clusterip.yml
kubectl apply -f k8s/mybackend-deployment.yml
kubectl apply -f k8s/mybackend-service-clusterip.yml
kubectl apply -f k8s/myfrontend-deployment.yml
kubectl apply -f k8s/myfrontend-service-clusterip.yml
kubectl apply -f k8s/ingress-service.yml