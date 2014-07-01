#!/bin/bash

function pecho {
  echo "[Bootstrap] ${1}"
}
LOGFOLDER=/vagrant/.vagrant-conf/logs
LOGFILE=${LOGFOLDER}/install.log
mkdir -p ${LOGFOLDER}

echo "[Bootstrap] Provisioning Begin. See logs in .vagrant-conf/logs/install.log"

pecho "Update apt"
apt-get update > ${LOGFILE}

pecho "Install CURL"
apt-get install -y curl >> ${LOGFILE}

pecho "Install vim"
apt-get install -y vim >> ${LOGFILE}

debconf-set-selections <<< 'mysql-server mysql-server/root_password password root'
debconf-set-selections <<< 'mysql-server mysql-server/root_password_again password root'

pecho "Install MySQL server"
apt-get install -y mysql-server >> ${LOGFILE}

pecho "Install Apache and PHP5"
apt-get install -y apache2 php5 php5-mysql >> ${LOGFILE}
pecho "Install PHP5 modules"
apt-get install -y php5-curl php5-gd php5-xdebug php5-ldap php-apc php5-intl >> ${LOGFILE}

pecho "Activate mod rewrite"
a2enmod rewrite >> ${LOGFILE}

# Allow xdebug for IP 192.168.50.1
pecho "Configure xdebug"
cat /vagrant/.vagrant-conf/xdebug.conf >> /etc/php5/conf.d/xdebug.ini #attention APPEND!, est-ce necessaire?

pecho "Change Apache Document Root"
cp /vagrant/.vagrant-conf/apache.conf /etc/apache2/sites-available/default

# DooPHP needs to generate some files in views/. He must be allowed to write
pecho "Add vagrant user to ww-data group"
adduser www-data vagrant >> ${LOGFILE}

pecho "Restart Apache"
service apache2 restart

# If phpmyadmin does not exist
if [ ! -f /etc/phpmyadmin/config.inc.php ];
then

        # Used debconf-get-selections to find out what questions will be asked
        # This command needs debconf-utils

        # Handy for debugging. clear answers phpmyadmin: echo PURGE | debconf-communicate phpmyadmin

        echo 'phpmyadmin phpmyadmin/dbconfig-install boolean false' | debconf-set-selections
        echo 'phpmyadmin phpmyadmin/reconfigure-webserver multiselect apache2' | debconf-set-selections

        echo 'phpmyadmin phpmyadmin/app-password-confirm password vagrant' | debconf-set-selections
        echo 'phpmyadmin phpmyadmin/mysql/admin-pass password root' | debconf-set-selections
        echo 'phpmyadmin phpmyadmin/password-confirm password root' | debconf-set-selections
        echo 'phpmyadmin phpmyadmin/setup-password password root' | debconf-set-selections
        echo 'phpmyadmin phpmyadmin/database-type select mysql' | debconf-set-selections
        echo 'phpmyadmin phpmyadmin/mysql/app-pass password root' | debconf-set-selections
        
        echo 'dbconfig-common dbconfig-common/mysql/app-pass password root' | debconf-set-selections
        echo 'dbconfig-common dbconfig-common/mysql/app-pass root' | debconf-set-selections
        echo 'dbconfig-common dbconfig-common/password-confirm password root' | debconf-set-selections
        echo 'dbconfig-common dbconfig-common/app-password-confirm password root' | debconf-set-selections
        echo 'dbconfig-common dbconfig-common/app-password-confirm password root' | debconf-set-selections
        echo 'dbconfig-common dbconfig-common/password-confirm password root' | debconf-set-selections
        
        pecho "Install PhpMyAdmin"
        apt-get -y install phpmyadmin >> ${LOGFILE}
fi

pecho "Set Timezone into php.ini"
sed -i 's/;date.timezone =/date.timezone = Europe\/Paris/g' /etc/php5/apache2/php.ini
sed -i 's/;date.timezone =/date.timezone = Europe\/Paris/g' /etc/php5/cli/php.ini

pecho "PHP - Active display_errors"
sed -i 's/display_errors = Off/display_errors = On/g' /etc/php5/apache2/php.ini

pecho "Install composer"
curl -sS https://getcomposer.org/installer | php
mv composer.phar /usr/local/bin/composer

pecho "Composer install"
cd /var/www && composer install && cd -

pecho "Temp solution for /etc/hosts"
sed -i "s/127.0.1.1/127.0.0.1/g" /etc/hosts
