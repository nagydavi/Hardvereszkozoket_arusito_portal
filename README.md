
## Ez a projekt egy szakdolgozat a címe Hardvereszközöket árusító portál.

A project-hez nem kell telípenti semmit csak a projekt mappában futassuk le a következő parancsot
``` docker-compose up -d ```

Miután ezzel megvagyunk az environment.ts -ben adjuk meg a php elérést és a chatgpt api kulcsunk, a chatgpt api kulcs nélkül minden működni fog kivéve a chatbot funkció

# Mysql ip
``` docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' <container_id_mysql> ```

Majd amikor ezt megkapjuk akkor írjuk be a connect.php  $servername = "";
helyére


