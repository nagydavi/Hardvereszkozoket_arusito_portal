FROM php:8.0-apache

# Engedélyezzük a szükséges Apache modulokat
RUN a2enmod rewrite
RUN a2enmod headers

# Telepítjük a mysqli PHP bővítményt
RUN docker-php-ext-install mysqli

# Állítsuk be a ServerName direktívát az Apache konfigurációjában
RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

# DirectoryIndex beállítása
RUN echo "DirectoryIndex index.php index.html" >> /etc/apache2/apache2.conf
