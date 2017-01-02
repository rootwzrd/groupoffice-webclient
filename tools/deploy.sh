#!/bin/bash

#change to script directory
cd "$(dirname "$0")"
cd ..

gulp build

cd build

tar czf groupoffice-webclient.tar.gz *

scp groupoffice-webclient.tar.gz root@amadeiro.intermesh.nl:/var/www/heineken/
#scp groupoffice-webclient.tar.gz root@amadeiro.intermesh.nl:/home/govhosts/go7demo.group-office.com/

#scp groupoffice-webclient.tar.gz root@houtwerf.group-office.eu:/home/groupoffice7/


