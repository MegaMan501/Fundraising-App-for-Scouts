#drop tables in the correct order to prevent fk dependency issues
DROP TABLE IF EXISTS task;
DROP TABLE IF EXISTS sales_goal;
DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS event_attendee;
DROP TABLE IF EXISTS event;
DROP TABLE IF EXISTS sale_list;
DROP TABLE IF EXISTS sale;
DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS password_reset;
DROP TABLE IF EXISTS user_verification;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS groups;
DROP TABLE IF EXISTS user;