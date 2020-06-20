#!/bin/sh
kubectl delete svc --all
kubectl delete deploy --all
kubectl delete pods --all
kubectl delete pvc --all
kubectl delete configmap --all
kubectl delete secret --all

kubectl get all

cd backend
docker build -t pluszak95/final-backend .
docker push pluszak95/final-backend
cd ..

cd frontend
docker build -t pluszak95/final-frontend .
docker push pluszak95/final-frontend
cd ..

cd k8s

kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud/deploy.yaml
kubectl apply -f .