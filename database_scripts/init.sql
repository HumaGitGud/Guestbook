USE guestbook;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
	id INT AUTO_INCREMENT,
	firstName VARCHAR(255),
	lastName VARCHAR(255),
	email VARCHAR(255),
    howmeet VARCHAR(255),
	timestamp DATETIME DEFAULT NOW(),

	PRIMARY KEY (id)
);

INSERT INTO users (firstName, lastName, email, howmeet) VALUES ('Joe', 'Barbara', 'sample@entry.com', 'Public');
SELECT * FROM users;