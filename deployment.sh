#!/bin/bash

RESET=`tput sgr0`
declare -A sel
sel[1]='/bienchen.sejka-friends.de/frontend/' # FE
sel[2]='/public_html/production/frontend/app/' # PRODUCTION

printf "\n\n"
echo -e "\033[1mHello.${RESET}"

printf "\n\n"
echo -e "\033[1mYou need a .htaccess file which redirect all request to index.html. 
Because you building a SPA. Otherwise the JS routing dont will work.
If you have already on the server one then press: n.${RESET}"
printf "\n"
echo -n "${GREEN}Are you want generate new htaccess file?  (y/n)? ${RESET}"

read answer

if [ "$answer" == "${answer#[Nn]}" ] ;then
    echo -n "${GREEN}Create new .htaccess file and add to the dist folder ${RESET}"
    HTACCESS='<IfModule mod_negotiation.c>
    Options -MultiViews
    </IfModule>

    <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    </IfModule>
    '
    echo -n "${HTACCESS}" > dist/.htaccess
fi

scp  -r ./dist ssh-w019db1d@w019db1d.kasserver.com:/www/htdocs/w019db1d/bienchen.sejka-friends.de/frontend/
