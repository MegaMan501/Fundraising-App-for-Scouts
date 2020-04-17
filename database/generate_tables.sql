CREATE TABLE groups
(
  group_id int NOT NULL AUTO_INCREMENT UNIQUE,
  group_name varchar(128),
  location varchar(64),
  group_desc varchar(255),
  PRIMARY KEY (group_id)
);

CREATE TABLE user
(
  user_id int NOT NULL AUTO_INCREMENT UNIQUE,
  group_id int,
  full_name varchar(100),
  email varchar(255) UNIQUE,
  hash_pass varchar(255),
  leader_flag bool,
  admin_flag bool,
  verified bool,
  PRIMARY KEY (user_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id)
);

CREATE TABLE password_reset
(
  user_id int,
  token varchar(255),
  expiry_date int(11) UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE user_verification
(
  user_id int,
  token varchar(255),
  expiry_date int(11) UNSIGNED,
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE product 
(
  product_id int NOT NULL AUTO_INCREMENT UNIQUE,
  prod_name varchar(64),
  description varchar(255),
  weight float,
  cost float,
  sales_price float,
  PRIMARY KEY (product_id)
);

CREATE TABLE sale
(
  sale_id int,
  user_id int,
  PRIMARY KEY (sale_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE sale_list
(
  sale_id int,
  product_id int,
  quantity int,
  price float,
  sale_date date,
  FOREIGN KEY (sale_id) REFERENCES sale(sale_id),
  FOREIGN KEY (product_id) REFERENCES product(product_id)
);

CREATE table event
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

CREATE TABLE event_attendee
(
  event_id int,
  user_id int,
  FOREIGN KEY (event_id) REFERENCES event(event_id),
  FOREIGN KEY (user_id) REFERENCES user(user_id)
);

CREATE TABLE inventory
(
  product_id int,
  group_id int,
  event_id int,
  quantity int,
  FOREIGN KEY (product_id) REFERENCES product(product_id),
  FOREIGN KEY (group_id) REFERENCES groups(group_id),
  FOREIGN KEY (event_id) REFERENCES event(event_id)
);

CREATE TABLE sales_goal
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

CREATE TABLE task 
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

