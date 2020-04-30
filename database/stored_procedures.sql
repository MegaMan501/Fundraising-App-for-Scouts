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