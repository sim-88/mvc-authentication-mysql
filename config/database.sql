CREATE TABLE Users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    profile_pic VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Teams (
    team_id INT PRIMARY KEY AUTO_INCREMENT,
    team_name VARCHAR(100) NOT NULL,
    created_by INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

CREATE TABLE Projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    due_date DATE,
    status ENUM('Not Started', 'In Progress', 'Completed', 'On Hold') DEFAULT 'Not Started',
    project_cover VARCHAR(255),  -- Path to the project cover image
    created_by INT,
    team_id INT,  -- Reference to the Teams table
    visibility ENUM('Private', 'Public', 'Team') DEFAULT 'Private',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(user_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id) ON DELETE SET NULL
);


CREATE TABLE Tasks (
    task_id INT PRIMARY KEY AUTO_INCREMENT,
    color VARCHAR(7) NOT NULL,  -- Hex color code
    task_assignment VARCHAR(255) NOT NULL,
    task_name VARCHAR(255) NOT NULL,
    task_category VARCHAR(255) NOT NULL,
    status ENUM('In Progress', 'Todo', 'Completed') NOT NULL,
    priority ENUM('Urgent', 'High', 'Normal', 'Low') NOT NULL,
    time_estimate DECIMAL(5, 2) NOT NULL,
    time_unit ENUM('hours', 'minutes') NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    task_description TEXT,
    created_by INT,  -- Reference to the Users table
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES Users(user_id)
);

CREATE TABLE Assignees (
    assignee_id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    email VARCHAR(255) NOT NULL,
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id)
);


CREATE TABLE TaskAttachments (
    attachment_id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT NOT NULL,
    file_path VARCHAR(255),
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id)
);


CREATE TABLE TaskAssignments (
    assignment_id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    project_id INT NULL,
    FOREIGN KEY (task_id) REFERENCES Tasks(task_id),
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);


CREATE TABLE ProjectTeams (
    project_team_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    team_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id),
    FOREIGN KEY (team_id) REFERENCES Teams(team_id)
);


CREATE TABLE TeamMembers (
    team_member_id INT PRIMARY KEY AUTO_INCREMENT,
    team_id INT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES Teams(team_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

