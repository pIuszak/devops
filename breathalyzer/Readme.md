Notes:

build backend:
docker build -t backend -f backend/Dockerfile.dev backend

start postgres & redis:
docker-compose up redis postgres

start backend:
docker-compose up backend
