# Readme file for database

These are sql scripts that can be used to quickly generate the necessary sql tables
needed to support this project, as well as quickly drop tables during
development. (Note that these are only the tables, and as of this time the 
scripts do not form a database by itself)

## Opening Sql Files

These queries are compatible with MySQL, and the scripts can be executed in
interfaces such as MySQL Workbench or phpmyadmin. Additionally, the file can be
opened in a text editor, and the sql queries can be executed manually if
necessary.

## Important Explanations/Side Notes (will be added to as needed)

* int(11) unsigned is used to represent expiry dates in order to hold the epoch
standard representation of the expiration date
