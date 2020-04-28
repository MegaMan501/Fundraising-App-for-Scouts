# Tables
CREATE TABLE IF NOT EXISTS user
(
  user_id int NOT NULL AUTO_INCREMENT UNIQUE,
  full_name varchar(100),
  email varchar(255) UNIQUE,
  hash_pass varchar(255),
  leader_flag bool,
  admin_flag bool,
  verified bool,
  PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS groups
(
  group_id int NOT NULL AUTO_INCREMENT UNIQUE,
  user_id int,
  group_name varchar(128),
  location varchar(64),
  group_desc varchar(255),
  PRIMARY KEY (group_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
	ON DELETE SET NULL
    ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS members
(
  member_id int NOT NULL AUTO_INCREMENT UNIQUE,
  group_id int,
  user_id int,
  PRIMARY KEY (member_id)
  /*,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
	ON DELETE SET NULL
    ON UPDATE CASCADE,
  FOREIGN KEY (group_id) REFERENCES groups(group_id)
	ON DELETE SET NULL
    ON UPDATE CASCADE
	*/
);

CREATE TABLE IF NOT EXISTS password_reset
(
  user_id int,
  token varchar(255),
  expiry_date int(11) UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS user_verification
(
  user_id int,
  token varchar(255),
  expiry_date int(11) UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS product 
(
  product_id int NOT NULL AUTO_INCREMENT UNIQUE,
  prod_name varchar(64),
  description varchar(255),
  weight float,
  cost float,
  sales_price float,
  group_id int,
  quantity int,
  PRIMARY KEY (product_id)
);

CREATE TABLE IF NOT EXISTS sale
(
  sale_id int,
  user_id int,
  PRIMARY KEY (sale_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS sale_list
(
  sale_id int,
  product_id int,
  quantity int,
  price float,
  sale_date date,
  FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE table IF NOT EXISTS event
(
  event_id int NOT NULL AUTO_INCREMENT UNIQUE,
  start_date date,
  end_date date,
  start_time time,
  end_time time,
  location varchar(64),
  event_desc varchar(255),
  notif_int int,
  PRIMARY KEY (event_id)
);

CREATE TABLE IF NOT EXISTS event_attendee
(
  event_id int,
  user_id int,
  FOREIGN KEY (event_id) REFERENCES event(event_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE IF NOT EXISTS inventory
(
  product_id int,
  group_id int,
  event_id int,
  quantity int,
  FOREIGN KEY (product_id) REFERENCES product(product_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (event_id) REFERENCES event(event_id)
);

CREATE TABLE IF NOT EXISTS sales_goal
(
  goal_id int NOT NULL AUTO_INCREMENT UNIQUE,
  user_id int,
  group_id int,
  sales_goal float,
  due_date date,
  due_time time,
  fin_goal float,
  notif_int int,
  PRIMARY KEY (goal_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id)
);

CREATE TABLE IF NOT EXISTS task 
(
  task_id int NOT NULL AUTO_INCREMENT UNIQUE,
  user_id int,
  group_id int,
  task_desc varchar(255),
  important bool,
  due_date date,
  due_time time,
  fin_goal float,
  notif_int int,
  PRIMARY KEY (task_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id)
);