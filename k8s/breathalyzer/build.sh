#!/bin/sh
  
cd backend
docker build -t pluszak95/breathalyzer-backend .
docker push pluszak95/breathalyzer-backend
cd ..

cd frontend
docker build -t pluszak95/kube-frontend .
docker push pluszak95/kube-frontend
cd ..