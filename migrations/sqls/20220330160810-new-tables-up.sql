/* UPUPUPUPUPUPUPUP */
/* Users Table */
CREATE TABLE users (id SERIAL PRIMARY KEY, username VARCHAR(50), password VARCHAR(75));
/* Books Table */
CREATE TABLE books (id SERIAL PRIMARY KEY,title VARCHAR(50), author VARCHAR(50),total_pages integer, summary text);