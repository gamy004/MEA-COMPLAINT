FROM meacomplaintdockerhub/mea_workspace:prod

###########################################################################
# Copy directories
###########################################################################

USER root

WORKDIR /var/www

COPY . /var/www

COPY env.prod .env
###########################################################################
# Set owner www-data
###########################################################################

RUN chown -R www-data:www-data \
        /var/www/storage \
        /var/www/bootstrap/cache

###########################################################################
# Composer Install
###########################################################################

RUN composer install --no-dev --no-scripts

RUN composer dumpautoload

###########################################################################
# Npm Install
###########################################################################

RUN npm install

RUN npm run production

###########################################################################
# Php Artisan Optimize
###########################################################################

RUN php artisan optimize

RUN php artisan config:cache

WORKDIR /var/www