# Simple chat project

This is a simple chat project with [Socket.io](https://socket.io/) and [React Native](https://facebook.github.io/react-native/) . This demo app has made following this: [Building a Persistent React Native Chat ](https://medium.com/@gabrielrumbaut/building-a-persistent-react-native-chat-app-part-i-database-ae9de470ebff)

**Database - Docker config**

In root folder run
```sh
cd chat-app-docker 
```
```sh
sudo docker-compose up -d
```

After the database start up create the database

```sql
  CREATE DATABASE chat-app-postgres;
```
The database schema will be create by the server code

**Server setup**