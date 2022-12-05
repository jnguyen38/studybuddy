
# To Do
- [ ] Password strength checker or password requirements to SignUp.js page
- [x] Building Pages
- [ ] Dedicated SignIn.js page (ie, not just the modal that pops up in settings)
- [ ] Reviewing functionality
- [ ] Advanced Function 1
- [ ] Advanced Function 2
- [ ] Google maps integration on Location.js page
- [ ] Building hours integration on Location.js page
- [ ] User profiles and functionality (Liking, Disliking, Stats...)
- [ ] User profile pages

# StudyBuddy

Notre Dame's first study aid for students to find study spaces around Notre Dame’s campus.  StudyBuddy contains a hand collected database of all possible study spaces on campus, and recommends study spaces to users according to various filters selected. StudyBuddy aims to help students find new study spaces they may not have visited before, as well as find central study spaces for group projects or convenient locations for studying near food options. Verified users are able to submit new study spaces, leave reviews, favorite, dislike, and search study spaces across campus. 

StudyBuddy uses a MySQL, Express.js, ReactJS, Node.js (MySQL MERN variation) tech stack. The frontend ReactJS App is created with the Create React App Framework (CRA) and primarily use pure CSS for styling, and utilizes ReactJS functional components to render our frontend. Our backend is built on Node.js and our server consists of REST API endpoints written in Express.js. Our data storage needed to be a relational database and our focus w StudyBuddy is hosted on a Notre Dame student machine Apache server (db8.cse.nd.edu). Since our data is heavily row-transaction oriented, we decided to use MySQL as our data management system. 

Access our app at: http://db8.cse.nd.edu/cse30246/studybuddy/

## Running StudyBuddy Locally

In order to run our repository locally, you can clone our repository with the HTTPS clone url:
```
git clone https://github.com/jnguyen38/studybuddy.git
```

Once the repository has been cloned successfully you can run a local development server on localhost:3000 by running:
```
npm start
```

# Documentation

Below, you can find an extensive list of some of StudyBuddy's main technical functionalities. Additionally, we have taken time to document challenges we encountered along the way and how we resolved those issues. 

## React Routing on an Apache Server

One of the first main issues we ran into was figuring out how to route between React components on the Notre Dame student machine server. ReactJS's `react-router-dom` uses dynamic routing to render specific components on the user's screen. Using `BrowserRouter, Routes, Route` components, the dynamic routing functionality acts similar to a switch statement, taking the url path as a parameter and supplying a specified component as an output. The specified url path and the output component are determined by the `path` and `element` attributes of each `<Route/>` component, respectively.

```javascript
import {BrowserRouter, Route, Routes} from "react-router-dom";

<BrowserRouter>
    ...
        <Routes>
            <Route path={path + "/"} element={
                <Home user={user} UXMode={UXMode} path={path} basePath={basePath}/>}/>
            <Route path={path + "/devplan"} element={
                <Devplan/>}/>
            <Route path={path + "/overview"} element={
                <Overview/>}/>
            ...
        </Routes>
    ...
</BrowserRouter>
```

Unfortunately, this type of routing does not work on Notre Dame's Apache v2.4.37 server. This is because the server takes the path of the url and tries to locate the file specified at that folder. Since these files did not exist, the Apache server would return a 404 Not Found Error. In the example above, instead of rendering the `<Devplan/>` component at the url `db8.cse.nd.edu/devplan`, the server would try to find an index.html file in a devplan folder (both of which do not actually exist) and display a 404 Not Found Error.

Our solution to this was to access the Apache server configuration file located at `/etc/httpd/conf/http.conf` and allow overrides for the *server root directory*.
```
<Directory "/var/www/html">
    Options FollowSymLinks

    # AllowOverride controls what directives may be placed in .htaccess files.
    # It can be "All", "None", or any combination of the keywords:
    # Options FileInfo AuthConfig Limit
    
    AllowOverride All
    Require all granted
</Directory>
```

We then needed to redirect 404 errors in our *project's root directory* (`/var/www/html/cse30246/studybuddy/build`) because there are other students using hosting their apps on the same server and we don't want to redirect all 404 error files to our project. We accomplished this by creating a `.htaccess` file in our *project's root directory* and including the following line of code:
```
ErrorDocument 404 /cse30246/studybuddy/build/index.html
```

This allowed our app to redirect 404 errors back our index.html file so that React could work its dynamic routing magic.

## MySQL Querying in Express.js

In order to query our MySQL database in Express.js and send data back to our frontend, we decided to use the `mysql` node package. The package allowed us to make MySQL queries directly from our Express.js server, given a database configuration file:

```javascript
const mysql = require('mysql')
const db = mysql.createConnection({
    host: "localhost",
    user: "mysql_user",
    password: ********,
    database: "mysql_user"
})

module.exports = db;
```

In order to add an extra level of security against malicious SQL injection attacks, we used placeholders in our SQL queries. The placeholders, indicated below with the `?` symbols, tell the querier to treat the request parameters as a raw string rather than SQL code, thereby preventing most basic SQL injection attacks. 


```javascript
app.put("/api/put/edit", (req, res) => {
    db.query(`UPDATE study_spots \
                SET ${req.body.query} = ? \
                WHERE spot_id = ?`, [req.body.description, req.body.id], (err, result) => {
        if (err) console.log(err);
        res.send(result);
    });
});
```

We also used a variety of Input Validation techniques in order to make sure unwanted characters are not present in request parameters. For example, to only allow letters:

```javascript
const onlyLettersPattern = /^[A-Za-z]+$/;
...
if(!query.match(onlyLettersPattern)){
    handleInvalidChars();
}
```

## User Authentication Flow

Another main challenge we faced was designing a relatively secure and intuitive user authentication flow. This authentication flow includes user registration, user login, and admin authentication. We started with a useState hook containing the following user information:

```javascript
const [user, setUser] = useState({
    isSignedIn: false, isAdmin: false, firstName: "", lastName: "", username: ""
});
```

In order to keep the user logged in persistently after browser refresh, we utilized React useEffect hooks and the browser localStorage to automatically retrieve and store user information. The user state is defined in the top component of the DOM passed down to child components so that it can be easily accessed with `props.user.isSignedIn`.

```javascript
useEffect(() => {
    window.localStorage.setItem("user", JSON.stringify(user));
}, [user]);

useEffect(() => {
    setUXMode(JSON.parse(window.localStorage.getItem("UXMode")));
}, []);  
```

Passwords are stored in the database after being hashed on the client side with the SHA3-512 hashing algorithm. While this ensures that passwords cannot be accessed in plaintext directly, it would lead to potentially security risks if the database information was leaked. The code below demonstrates how we would send the hashed password as a PUT request parameter to a user sign in API endpoint. 

```javascript
function handleSubmit(event) {
    event.preventDefault();

    let hash = new SHA3(512);
    hash.update(event.target.password.value);

    Axios.put(props.basePath + "/api/put/signin", {
        "user": event.target.user.value,
        "password": hash.digest("hex").toString(),
        ...
    }).then(res => {
        if (res.data.isSignedIn)
            handleSignIn(res);
        else
            handleIncorrectSignIn();
    });
}
```


## Future Updates 
1. Sending hashed password through an encryption tunnel to the server to further protect password storage security
2. Integrating Postman API access/authorization tokens with an expiration time to ensure only authorized users are able to access our data via HTTP requests.



