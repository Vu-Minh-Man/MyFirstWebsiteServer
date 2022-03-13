This is a Node.js + Express.js project.

The server is located at [http://localhost:8080]. To change the port, you can set the PORT in the terminal like "PORT=1234".

This project is a mess :), in which you can add any of your crazy ideas to the project. How about coding some new servers with other languages like Golang, Django, Spring, ASP.NET,... and connect to the client. I leave the game tab on the navbar which is the list of routes so I (or you) can add new modules to implement them in the future.

In this project I use Mongodb for the database, JSONWebToken to create token (and I use local storage to store the token for simplicity, next time I will try to use cookies and OAuth), and bcrypt for salting and hashing password.

The reason I choose a NoSQL database like Mongodb instead of a SQL database is not too ambiguous. In the future, if I add more new features or fields or even change the structure of the database, I can easily do it by changing the schema, add some refs, it's very flexible. In contrast, I don't have much experience with either of those database or how to design a good database, thus I could be wrong, but I really willing to learn more.

I still have a problem in the database that I let the "users" collection in the same database (which's name "discussion") with other collections. I could fix it by changing the database's name or add new connection to mongoose. I think it not the problem (for now).

Thank you for viewing my project. Hope this project helps you also.
