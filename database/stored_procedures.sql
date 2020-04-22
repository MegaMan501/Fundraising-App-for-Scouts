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
    FROM user WHERE user_id = userId; 
    
    # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId;
	
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
    SELECT COUNT(*) 
    INTO isAdmin
    FROM user WHERE user_id = userId; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId;
	    
    # if admin get groups
    IF isAdmin >= 1 THEN
		SELECT group_id,group_name,location,group_desc 
        FROM groups;
	END IF; 
	IF isLeader >= 1 THEN
		SELECT group_id,group_name,location,group_desc 
        FROM groups WHERE user_id = userId;
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
    SELECT COUNT(*) 
    INTO isAdmin
    FROM user WHERE user_id = userId; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId;
	    
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
    SELECT COUNT(*) 
    INTO isAdmin
    FROM user WHERE user_id = userId; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId;
	    
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
CREATE PROCEDURE addLeaders (
	IN userId INT,
	IN full_name varchar(100),
	IN email varchar(255),
	IN hash_pass varchar(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin 
    FROM user WHERE user_id = userId; 

    IF isAdmin >= 1 THEN
		# insert in to groups
		INSERT INTO user (`full_name`, `email`, `hash_pass`, `leader_flag`, `admin_flag`, `verified`) 
        VALUES (full_name, email, hash_pass, 1, 0, 0);
        
        # return updated list of leaders
        SELECT user_id,full_name,email
        FROM user Where leader_flag = 1; 
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
    SELECT COUNT(*) INTO isAdmin
    FROM user WHERE user_id = userId; 
    
    # if admin get groups
    IF isAdmin = 1 THEN
		SELECT user_id,full_name,email
        FROM user;
	END IF;
END//
DELIMITER ;

-- SCOUTS -- IN PROGRESS
/*
# Add Scouts
DELIMITER //
CREATE PROCEDURE addScouts (
	IN userId INT,
    IN groupId INT,
	IN full_name varchar(100),
	IN email varchar(255),
	IN hash_pass varchar(255)
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(admin_flag) 
    INTO isAdmin 
    FROM user WHERE user_id = userId; 
    
    # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId;
	
    IF isAdmin >= 1 || isleader >=1 THEN
		# insert in to groups
		INSERT INTO groups (`group_id`, `user_id`, ``, `location`, `group_desc`) 
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

# Getting Scouts
DELIMITER //
CREATE PROCEDURE getScouts (
	IN userId INT
)
BEGIN
	DECLARE isAdmin INT DEFAULT 0;
    DECLARE isLeader INT DEFAULT 0;
	
    # get the status of admin
    SELECT COUNT(*) 
    INTO isAdmin
    FROM user WHERE user_id = userId; 
    
     # get the status of leader
	SELECT COUNT(leader_flag) 
    INTO isLeader 
    FROM user WHERE user_id = userId;
        
    # if admin get groups
    IF isAdmin = 1 || isLeader = 1 THEN
		SELECT user_id,full_name,email
        FROM user WHERE leader_flag = 0 AND admin_flag = 0;
	END IF;
END//
DELIMITER ;
*/

