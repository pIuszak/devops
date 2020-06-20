## K8S notes
# Kubectl
```
Services
type: NodePort
type: ClusterIP to internal Kubernetes use 

kubectl get all
kubectl apply –f <yaml file>
kubectl apply –f .
kubectl describe pod <name of pod>

kubectl exec –it <pod name> <command>
kubectl get (pod | po | service | svc | rs | replicaset | deployment | deploy)
kubectl get po --show-labels
kubectl get po --show-labels -l {name}={value}
kubectl delete po <pod name>
kubectl delete po --all

kubectl describe svc 
kubectl logs -f pod <podname>
kubectl get pv
kubectl get all
kubectl apply -f first-pod.yaml 
kubectl describe pod webapp
kubectl exec webapp ls
kubectl -it exec webapp sh
```

# Minikube

```
minikube start
minikube stop
minikube delete
minikube env
minikube ip

```
