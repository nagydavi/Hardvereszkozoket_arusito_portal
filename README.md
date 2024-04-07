# Mysql ip
``` docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_id_mysql> ```

Majd amikor ezt megkapjuk akkor írjuk be a connect.php  $servername = "";
helyére


