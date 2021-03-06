-- Login --
DELIMITER //
CREATE PROCEDURE login (
	IN userEmail VARCHAR(255)
)
BEGIN
	SELECT user_id,full_name,email,hash_pass,leader_flag,admin_flag,verified 
    FROM user WHERE email=userEmail;
END//
DELIMITER ;

CALL login('janedoe@gmail.com');

-- Groups --
# Adding Groups
DELIMITER //
CREATE PROCEDURE addGroups (
	IN groupId INT,
	IN userId INT,
	IN groupName VARCHAR(128), 
    IN groupLoc VARCHAR(64), 
    IN groupDesc VARCHAR(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	
    IF isAdmin >= 1 || isleader >=1 THEN
		# insert in to groups
		INSERT INTO groups (`group_id`, `user_id`, `group_name`, `location`, `group_desc`) 
		VALUES (groupId,userId,groupName,groupLoc,groupDesc);
	END IF;
    
    # if admin insert
    IF isAdmin >= 1 THEN
		SELECT group_id,group_name,location,group_desc FROM groups;
	END IF;
    
    #if leader insert 
    IF isLeader >= 1 THEN
        # return updated list of groups
    	SELECT group_id,group_name,location,group_desc 
        FROM groups WHERE user_id = userId;
	END IF;
END//
DELIMITER ;

# Getting Groups
DELIMITER //
CREATE PROCEDURE getGroups (
	IN userId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	    
    IF isAdmin >= 1 THEN
		# if admin get all groups
		SELECT group_id,group_name,location,group_desc 
        FROM groups;
	ELSEIF isLeader >= 1 THEN
		# if leader get all groups that leader owns
		SELECT group_id,group_name,location,group_desc 
        FROM groups WHERE user_id = userId;
	ELSE 
		# if scout get only the group that they belong to
		SELECT g.group_id, g.group_name, g.location, g.group_desc 
        FROM groups as g
        INNER JOIN members as m
        ON g.group_id = m.group_id
        WHERE m.user_id = userId;
	END IF;   
END//
DELIMITER ;

# Delete Groups
DELIMITER //
CREATE PROCEDURE deleteGroups (
	IN userId INT,
    IN groupId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
	# get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	    
    # if admin get groups
    IF isAdmin >= 1 THEN
		DELETE FROM groups 
        WHERE group_id = groupId;
	END IF; 
	IF isLeader >= 1 THEN
		DELETE FROM groups 
        WHERE group_id = groupId AND user_id = userId;
	END IF;    
END//
DELIMITER ;

# Update Group
DELIMITER //
CREATE PROCEDURE updateGroups (
	IN userId INT,
    IN prevGroupId INT,
    IN groupId INT,
	IN groupName VARCHAR(128), 
    IN groupLoc VARCHAR(64), 
    IN groupDesc VARCHAR(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
    # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	    
    # if admin get groups
    IF isAdmin >= 1 THEN
		UPDATE groups 
        SET `group_id` = groupId,
            `group_name` = groupName,
            `location` = groupLoc,
            `group_desc` = groupDesc
        WHERE group_id = prevGroupId;
	END IF; 
	IF isLeader >= 1 THEN
		UPDATE groups 
        SET `group_id` = groupId,
            `group_name` = groupName,
            `location` = groupLoc,
            `group_desc` = groupDesc
        WHERE group_id = prevGroupId AND user_id = userId;
	END IF;    
END//
DELIMITER ;

-- Leaders --
# Adding Leaders
DELIMITER //
CREATE PROCEDURE addLeaders(
	IN userId INT,
	IN fullName varchar(100),
	IN emailVal varchar(255),
	IN hashPass varchar(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    
	# get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 

    IF isAdmin >= 1 THEN
		# insert in to groups
		INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) 
        VALUES (fullName, emailVal, hashPass, 1, 0, 0);
	END IF;
    
    IF isAdmin >= 1 THEN	   
        # return updated list of leaders
        SELECT user_id, full_name, email
        FROM user WHERE user_id != userId AND leader_flag=1; 
	END IF;
    
END//
DELIMITER ;

# Getting Leaders
DELIMITER //
CREATE PROCEDURE getLeaders (
	IN userId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
	
     # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
    # if admin get groups
    IF isAdmin = 1 THEN
		SELECT user_id,full_name,email
        FROM user WHERE leader_flag = 1;
	END IF;
END//
DELIMITER ;

# Update Leaders
DELIMITER //
CREATE PROCEDURE updateLeaders(
	IN userId INT,
    IN toUserId INT,
	IN fullName varchar(100),
	IN emailVal varchar(255),
	IN hashPass varchar(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
    IF hashPass IS NOT NULL OR hashPass != '' THEN
		IF isAdmin >= 1 THEN
			UPDATE user 
			SET `full_name`=fullName, 
				`email`=emailVal, 
				`hash_pass`=hashPass
			WHERE user_id = toUserId;
		END IF;
	ELSE 
		IF isAdmin >= 1 THEN
			UPDATE user 
			SET `full_name`=fullName, 
				`email`=emailVal
			WHERE user_id = toUserId;
		END IF;
    END IF;
END//
DELIMITER ;

# Delete Leader
DELIMITER //
CREATE PROCEDURE deleteLeaders (
	IN userId INT,
    IN deleteId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
	
     # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
	    
    # if admin get groups
    IF isAdmin >= 1 THEN
		DELETE FROM user 
        WHERE user_id = deleteId;
	END IF; 
END//
DELIMITER ;

-- SCOUTS
# Add Scouts
DELIMITER //
CREATE PROCEDURE addScouts (
	IN userId INT,
    IN groupId INT,
	IN fullName varchar(100),
	IN emailVal varchar(255),
	IN hashPass varchar(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
    DECLARE scoutUID INT DEFAULT NULL;
	
	# get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	
    # insert in to users
    IF isAdmin >= 1 THEN
		INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) 
        VALUES (fullName, emailVal, hashPass, 0, 0, 0);
        
        # Get the newly created UID
        SELECT user_id 
        INTO scoutUID
        FROM user WHERE email=emailVal;
        
        # Then add user to join table
        IF scoutUID IS NOT NULL THEN
			INSERT INTO members (`group_id`,`user_id`)
			VALUES (groupId, scoutUID);
        END IF;
        
        # return the list of scouts to admin
        SELECT 
			DISTINCT g.group_id,
			u.user_id,
			u.full_name,
			u.email
		FROM user as u
		INNER JOIN members as m 
		INNER JOIN groups as g
		ON u.user_id = m.user_id
		WHERE g.group_id = m.group_id; 
	END IF;
    
    # add scout to users and join table
    IF isleader >=1 THEN
		INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) 
        VALUES (fullName, emailVal, hashPass, 0, 0, 0);
        
        # Get the newly created UID
        SELECT user_id 
        INTO scoutUID
        FROM user WHERE email=emailVal;
        
        # Then add user to join table
        IF scoutUID IS NOT NULL THEN
			INSERT INTO members (`group_id`,`user_id`)
			VALUES (groupId, scoutUID);
        END IF;
        
        # return the list of scouts to 
        SELECT 
		DISTINCT g.group_id,
			u.user_id,
			u.full_name,
			u.email
		FROM user as u
		INNER JOIN members as m 
		INNER JOIN groups as g
		ON u.user_id = m.user_id
		WHERE g.group_id = m.group_id 
		AND g.user_id = userId;
	END IF;
END//
DELIMITER ;

# Getting Scouts
DELIMITER //
CREATE PROCEDURE getScouts (
	IN userId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
     # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
        
    # if admin get 
    IF isAdmin >= 1 THEN
		SELECT 
			DISTINCT g.group_id,
			u.user_id,
			u.full_name,
			u.email
		FROM user as u
		INNER JOIN members as m 
		INNER JOIN groups as g
		ON u.user_id = m.user_id
		WHERE g.group_id = m.group_id; 
	END IF;
    
    IF isLeader >= 1 THEN
		SELECT 
		DISTINCT g.group_id,
			u.user_id,
			u.full_name,
			u.email
		FROM user as u
		INNER JOIN members as m 
		INNER JOIN groups as g
		ON u.user_id = m.user_id
		WHERE g.group_id = m.group_id 
		AND g.user_id = userId;
    END IF;
END//
DELIMITER ;

# Delete Scout
DELIMITER //
CREATE PROCEDURE deleteScouts (
	IN userId INT,
    IN deleteId INT,
    IN groupId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
	# get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	
    # insert in to users
    IF isAdmin >= 1 || isleader >= 1 THEN
		# Delete from users
        DELETE FROM user
        WHERE user_id = deleteId;
        
        # Delete from members
		DELETE FROM members
        WHERE user_id = deleteId AND group_id = groupId;
	END IF;
END//
DELIMITER ;

# Update scouts
DELIMITER //
CREATE PROCEDURE updateScouts(
	IN userId INT,
    IN toUserId INT,
    IN groupId INT,
    IN prevGroupId INT,
	IN fullName varchar(100),
	IN emailVal varchar(255),
	IN hashPass varchar(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
    DECLARE memberId INT DEFAULT NULL;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
	# get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
    
    SELECT member_id 
    INTO memberId
    From members
    WHERE user_id = toUserId;
    
    IF hashPass IS NOT NULL OR hashPass != '' THEN
		IF isAdmin >= 1 || isLeader >= 1 THEN
			UPDATE user 
			SET `full_name`=fullName, 
				`email`=emailVal, 
				`hash_pass`=hashPass
			WHERE user_id =toUserId;
            
            IF memberId IS NOT NULL OR memberId != 0 THEN
				UPDATE members
				SET `group_id`=groupId
				WHERE member_id=memberId;
            END IF;
		END IF;
	ELSE 
		IF isAdmin >= 1 || isLeader >= 1 THEN
			UPDATE user 
			SET `full_name`=fullName, 
				`email`=emailVal
			WHERE user_id=toUserId;
            
			IF memberId IS NOT NULL OR memberId != 0 THEN
				UPDATE members
				SET `group_id`=groupId
				WHERE member_id=memberId;
            END IF;
		END IF;
    END IF;
END//
DELIMITER ;

-- Inventory --
# Adding Groups
DELIMITER //
CREATE PROCEDURE addInventory (
	IN userId INT,
    IN groupId INT,
	IN prodName varchar(64),
	IN prodDesc varchar(255),
	IN prodWeight float,
	IN prodCost float,
    IN prodQuantity int,
	IN prodSalePrice float
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
	# get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	
    IF isAdmin >= 1 || isleader >=1 THEN
		# insert in to groups
		INSERT INTO product 
        (`prod_name`,`description`,`weight`,`cost`,`sales_price`, `quantity`, `group_id`) 
		VALUES (prodName, prodDesc, prodWeight, prodCost, prodSalePrice,prodQuantity,groupId);
	END IF;
    
    # if admin insert
    IF isAdmin >= 1 THEN
		# return all products
		SELECT * FROM product;
	END IF;
    
    #if leader insert 
    IF isLeader >= 1 THEN
        # return updated list of products per group
    	SELECT 
			p.product_id,
			p.group_id,
			p.prod_name,
			p.description,
			p.weight,
			p.cost,
			p.sales_price,
			p.quantity
		FROM product as p
		INNER JOIN groups as g
		ON p.group_id = g.group_id
		WHERE g.user_id = userId;
	END IF;
END//
DELIMITER ;

# Get Inventory
DELIMITER //
CREATE PROCEDURE getInventory (
	IN userId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
	# get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	
    # Get Products from different roles
    IF isAdmin >= 1 THEN
		# return all products
		SELECT * FROM product;
	ELSEIF isLeader >= 1 THEN
        # return updated list of products per group
    	SELECT 
			p.product_id,
			p.group_id,
			p.prod_name,
			p.description,
			p.weight,
			p.cost,
			p.sales_price,
			p.quantity
		FROM product as p
		INNER JOIN groups as g
		ON p.group_id = g.group_id
		WHERE g.user_id = userId;
	ELSE 
		SELECT 
			p.product_id,
			p.group_id,
			p.prod_name,
			p.description,
			p.weight,
			p.cost,
			p.sales_price,
			p.quantity
		FROM product as p
        INNER JOIN members as m
		ON p.group_id = m.group_id
		WHERE m.user_id = userId;
	END IF;
END//
DELIMITER ;

# Delete Inventory
DELIMITER //
CREATE PROCEDURE deleteInventory (
	IN userId INT,
    IN productId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
	# get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	
    # insert in to users
    IF isAdmin >= 1 || isleader >= 1 THEN
		# Delete from users
        DELETE FROM product
        WHERE product_id = productId;
	END IF;
END//
DELIMITER ;

# Update the Inventory
DELIMITER //
CREATE PROCEDURE updateInventory (
	IN userId INT,
    IN productId INT,
    IN groupId INT,
	IN prodName varchar(64),
	IN prodDesc varchar(255),
	IN prodWeight float,
	IN prodCost float,
    IN prodQuantity int,
	IN prodSalePrice float
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
	# get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
    
    # Update the product
	IF isAdmin >= 1 || isleader >= 1 THEN
		UPDATE product 
        SET `prod_name` = prodName,
			`description` = prodDesc,
            `weight` = prodWeight,
            `cost` = prodCost,
            `sales_price` = prodSalePrice,
            `quantity` = prodQuantity,
            `group_id` = groupId
		WHERE (`product_id` = productId);
	END IF;
END//
DELIMITER ;


-- Notifications --
# get all notifications
DELIMITER //
CREATE PROCEDURE getNotifications (
	IN userId INT,
    IN now DATETIME
)
BEGIN
	#get personal messages
    SELECT u2.full_name, n.message, n.start_time
    FROM user as u
    INNER JOIN notification as n
    ON n.receiver_user_id = u.user_id
    INNER JOIN user as u2
    WHERE (u.user_id = userId AND u2.user_id = n.notifier_user_id AND now <= n.expiration)
    
    #combine results
    UNION
    
    #get group messages where you are a member
	SELECT u.full_name, n.message, n.start_time
    FROM notification AS n
	INNER JOIN members AS m
	ON m.group_id=n.group_id
	INNER JOIN user AS u
	ON u.user_id=n.notifier_user_id
	WHERE (m.user_id=userId)
    
	#combine results again
    UNION
    
    #get group messages where you are a leader
    SELECT u.full_name, n.message, n.start_time
    FROM notification AS n
	INNER JOIN groups AS g
	ON g.group_id=n.group_id
	INNER JOIN user AS u
	ON u.user_id=n.notifier_user_id
	WHERE (g.user_id=userId)
    
    #combine results again
    UNION
    
    #get global notifications

    SELECT u.full_name, n.message, n.start_time
    FROM notification AS n
    INNER JOIN user AS u
    WHERE (n.group_id IS NULL AND n.receiver_user_id IS NULL AND u.user_id = n.notifier_user_id AND now <= n.expiration);
END//
DELIMITER ;


-- Notifications --
# add notification
DELIMITER //
CREATE PROCEDURE getNotifications (
	IN nUserId INT,
    IN rUserId INT,
    IN groupId INT,
    IN nMessage varchar(255),
    IN sTime DATE,
    IN eTime DATE

)
BEGIN
    IF rUserId < 0 && groupID < 0 THEN
        INSERT INTO notification (notifier_user_id, message, start_time, expiration)
        VALUES (nUserId, nMessage, sTime, eTime);    
    END IF;

    IF rUserId < 0 && groupID > 0 THEN
        INSERT INTO notification (notifier_user_id, group_id, message, start_time, expiration)
        VALUES (nUserId, groupId, nMessage, sTime, eTime);    
    END IF;

    IF rUserId > 0 && groupID < 0 THEN
        INSERT INTO notification (notifier_user_id, receiver_user_id, message, start_time, expiration)
        VALUES (nUserId, rUserId, nMessage, sTime, eTime);    
    END IF;

    SELECT receiver_user_id, group_id, message, start_time, expiration FROM notification WHERE notifier_user_id=nUserId;


END//
DELIMITER ;

# get all notifications
DELIMITER //
CREATE PROCEDURE getNotifications (
	IN userId INT,
    IN now datetime
)
BEGIN
     #get personal messages
    SELECT u2.full_name, n.message
    FROM user as u
    INNER JOIN notification as n
    ON n.receiver_user_id = u.user_id
    INNER JOIN user as u2
    WHERE (u.user_id = userId AND u2.user_id = n.notifier_user_id AND now <= n.expiration)
    
    #combine results
    UNION
    
    #get group messages
    SELECT u2.full_name, n.message
    FROM members as m
    INNER JOIN user as u
		ON m.user_id=u.user_id
	INNER JOIN notification as n
		ON m.group_id=n.group_id
	INNER JOIN user as u2
	WHERE (u.user_id = userId AND u2.user_id = n.notifier_user_id AND now <= n.expiration)
    
    #combine results again
    UNION
    
    #get global notifications

    SELECT u.full_name, n.message
    FROM notification AS n
    INNER JOIN user AS u
    WHERE (n.group_id IS NULL AND n.receiver_user_id IS NULL AND u.user_id = n.notifier_user_id AND now <= n.expiration);
END//
DELIMITER ;

# get notifications that a user has sent
DELIMITER //
CREATE PROCEDURE getSentNotifications (
    IN userId INT
)
BEGIN
    SELECT receiver_user_id, group_id, message, start_time, expiration FROM notification WHERE notifier_user_id=userId;
END//
DELIMITER ;

-- Sales --
# get a sale from the database
DELIMITER //
CREATE PROCEDURE getSale (
    IN userId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
    DECLARE groupId INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
	# get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
    
    IF isAdmin >= 1 || isLeader >= 1 THEN
		# return all products
		SELECT s.sale_id, p.prod_name, s.quantity, s.price, s.sale_date 
		FROM sale AS s 
		INNER JOIN product AS p 
		ON s.product_id=p.product_id;
	ELSE
		SELECT s.sale_id, p.prod_name, s.quantity, s.price, s.sale_date 
		FROM sale AS s 
		INNER JOIN product AS p 
		ON s.product_id=p.product_id 
		WHERE s.user_id=userId;
	END IF;
    
END//
DELIMITER ;

# add a sale to the database
DELIMITER //
CREATE PROCEDURE addSale (
	IN userId INT,
    IN productId INT,
    IN quantity INT,
    IN sale_date DATE
)
BEGIN
    DECLARE productPrice float DEFAULT 0.0;

    SELECT sales_price
    INTO productPrice
    FROM product
    WHERE product_id = productId; 

    INSERT INTO sale (user_id, product_id, quantity, price, sale_date)
    VALUES (userId, productId, quantity, productPrice, sale_date);
    
    SELECT s.sale_id, p.prod_name, s.quantity, s.price, s.sale_date FROM sale AS s INNER JOIN product AS p ON s.product_id=p.product_id WHERE userId=s.user_id;
END//
DELIMITER ;

# delete a sale from the database
DELIMITER //
CREATE PROCEDURE deleteSale (
	IN saleId INT
)
BEGIN
    DELETE FROM sale 
    WHERE (saleId=sale.sale_id);
END//
DELIMITER ;

# delete a sale from the database
DELIMITER //
CREATE PROCEDURE updateSale (
	IN saleId INT,
    IN userId INT,
    IN productId INT,
    IN quantity INT,
    IN price float,
    IN sale_date DATE
)
BEGIN
    UPDATE sale 
    SET user_id=userId, product_id=productId, quantity=quantity, price=price, sale_date=sale_date
    WHERE sale.sale_id=saleId;
END//
DELIMITER ;

# get group sales from the database
DELIMITER //
CREATE PROCEDURE getGroupSales (
	IN userId INT
)
BEGIN

	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
	# get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
    
    
    IF isAdmin >= 1 THEN
		SELECT m.group_id, u.full_name, p.prod_name, s.quantity, s.price, s.sale_date
		FROM members AS m
		INNER JOIN user AS u
		ON u.user_id=m.user_id
		INNER JOIN sale AS s
		ON u.user_id=s.user_id
		INNER JOIN product AS p
		ON s.product_id=p.product_id
		INNER JOIN groups AS g
		ON g.group_id=m.group_id;
	END IF;
    
    IF isLeader >= 1 THEN
		SELECT m.group_id, u.full_name, p.prod_name, s.quantity, s.price, s.sale_date
		FROM members AS m
		INNER JOIN user AS u
		ON u.user_id=m.user_id
		INNER JOIN sale AS s
		ON u.user_id=s.user_id
		INNER JOIN product AS p
		ON s.product_id=p.product_id
		INNER JOIN groups AS g
		ON g.group_id=m.group_id
		WHERE (g.user_id = userId);
	END IF;
END//
DELIMITER ;

-- Events
# Get Events
DELIMITER //
CREATE PROCEDURE getEvents ()
BEGIN
	SELECT * FROM event;
END//
DELIMITER ;

# Add Event
DELIMITER //
CREATE PROCEDURE addEvent (
	IN userId INT,
    IN evnTitle VARCHAR(64),
	IN evnStartDate DATETIME,
	IN evnEndDate DATETIME,
	IN evnLoc VARCHAR(64),
	IN evnDesc VARCHAR(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
	# get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	    
    IF isAdmin >= 1 || isLeader >= 1 THEN
		INSERT INTO event 
        (`start_date`, `end_date`, `event_loc`, `event_desc`, `event_title`) 
        VALUES (evnStartDate, evnEndDate, evnLoc, evnDesc, evnTitle);
        
        SELECT * FROM event;
	END IF;
    
END//
DELIMITER ;

# Delete Event
DELIMITER //
CREATE PROCEDURE deleteEvent (
	IN userId INT, 
    IN eventId INT
)
BEGIN
    DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin
    FROM user 
    WHERE user_id = userId AND admin_flag = 1; 
    
	# get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId AND leader_flag = 1;
	    
    IF isAdmin >= 1 || isLeader >= 1 THEN
		DELETE FROM event 
		WHERE event_id = eventId;
	END IF;
	
END//
DELIMITER ;