#!/bin/sh
  
cd backend
docker build -t pluszak95/final-backend .
docker push pluszak95/final-backend
cd ..

cd frontend
docker build -t pluszak95/final-frontend .
docker push pluszak95/final-frontend
cd ..