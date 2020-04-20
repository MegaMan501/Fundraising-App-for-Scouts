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
	SELECT COUNT(*) 
    INTO isLeader 
    FROM user WHERE user_id = userId; 
	    
    # if admin get groups
    IF isAdmin = 1 THEN
		SELECT group_id,group_name,location,group_desc 
        FROM groups;
	END IF;
    
     IF isLeader = 1 THEN
		SELECT group_id,group_name,location,group_desc 
        FROM groups WHERE user_id = userId;
	END IF;
    
END//
 
DELIMITER ;

-- CALL addGroups(35,1,'pteam','plano','just something');
-- CALL getGroups(2);
-- DROP PROCEDURE addGroups;
-- DROP PROCEDURE getGroups;