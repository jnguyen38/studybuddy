# StudyBuddy

Notre Dame's first study aid for students to find study spaces around Notre Dame’s campus.  StudyBuddy contains a hand collected database of all possible study spaces on campus, and recommends study spaces to users according to various filters selected. StudyBuddy aims to help students find new study spaces they may not have visited before, as well as find central study spaces for group projects or convenient locations for studying near food options. Verified users are able to submit new study spaces, leave reviews, favorite, dislike, and search study spaces across campus. 

StudyBuddy uses a MySQL, Express.js, ReactJS, Node.js (MySQL MERN variation) tech stack. The frontend ReactJS App is created with the Create React App Framework (CRA) and primarily use pure CSS for styling, and utilizes ReactJS functional components to render our frontend. Our backend is built on Node.js and our server consists of REST API endpoints written in Express.js. Our data storage needed to be a relational database and our focus w StudyBuddy is hosted on a Notre Dame student machine Apache server (db8.cse.nd.edu). Since our data is heavily row-transaction oriented, we decided to use MySQL as our data management system. 

## User Authentication Flow

```javascript
const [user, setUser] = useState({
  isSignedIn: false, isAdmin: false, firstName: "", lastName: "", username: ""
});
```
