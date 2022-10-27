function Names() {
    return (
        <section>
            <h1>Study Buddy</h1>
            <h2>Stage 2: Development Plan</h2>
            <h3>Team Members:</h3>

            <ul>
                <li>Andrea Turner (aturne22)</li>
                <li>Brooke Mackey (bmackey)</li>
                <li>Thomas Mercurio (tmercuri)</li>
                <li>Jon Nguyen (jngyen5)</li>
            </ul>

        </section>
    );
}

export default function Devplan() {
    return (
        <div id="devplan-container">
          <Names/>

          <h3>Relational Schema</h3>
          <p>
                <b>users</b>(<u>user_id</u>, name, latitude, longitude, current_time, day_of_week, current_task)<br/>
                &emsp;   user_id → name, latitude, longitude<br/>
                <br/>
                <b>closeToPeople</b>(<u>user_id</u>, user_friend_id, distance)<br/>
                &emsp;   user_id, friend_id → distance<br/>
                <br/>
                <b>restaurants</b>(<u>rest_id</u>, name, latitude, longitude, opening_time, closing_time)<br/>
                &emsp;   rest_id → name, latitude, longitude<br/>
                <br/>
                <b>buildings</b>(<u>building_id</u>, name, latitude, longitude, opening_time, closing_time)<br/>
                &emsp;   building_id → name, latitude, longitude<br/>
                <br/>
                <b>studySpaces</b>(<u>study_space_id</u>, building_id_fk, natural_light, printer, loudness, average_rating)<br/>
                &emsp;   study_space_id → building_id_fk<br/>
                <br/>
                <b>closeToRestaurant</b>(<u>user_id_fk</u>, study_space_id_fk, distance)<br/>
                &emsp;   user_id_fk, study_space_id_fk → distance<br/>
                <br/>
                <b>tables</b>(<u>table_id</u>, study_space_id_fk, number_of_chairs)<br/>
                &emsp;   table_id → study_space_id_fk<br/>
                <br/>
                <b>desks</b>(<u>desk_id</u>, study_space_id_fk, size)<br/>
                &emsp;   desk_id → study_space_id_fk<br/>
                <br/>
                <b>seating</b>(<u>seating_id</u>, study_space_id_fk, comfort_rating)<br/>
                &emsp;   seating_id → study_space_id_fk<br/>
          </p>

          <h3>Tech Stack</h3>
          <p>
              For our project tech stack, our team will be using a variation of the MERN stack. Essentially, instead of using MongoDB,
              we will continue to use the SQL databases provided on the db8 machine to organize and store the data we collect.
              Besides our backend database, we will use Express.js for any necessary API calls HTTP requests we may need to make.
              Additionally, we will also use React JS for most frontend development because the layout of our app will mostly be based
              on reusable components that we intend to create moving forward. Our team is also more familiar with React than any of the
              other major js frameworks. Finally, we will be using node.js and npm for server side JavaScript requirements and
              installations. Since our team is also well versed in Python, we may also use Python for backend scripting or testing purposes.

          </p>

          <h3>Data Sourcing</h3>
          <p>We will need to collect all of our data for our project.  This will likely be one of the most intensive parts of the project.  We will need to walk around campus and record data for all of the study spaces across campus.  We will probably divide and conquer to reach more study spaces in a shorter period of time.</p>

          <h3>Labor Division</h3>
          <p>Data Collection: All group members will assist in manual data collection and entry, as this aspect of the project may be the most time consuming.

              Front-End: Jon will likely lead the front-end development because he has the most experience with the area of the project. However, all team members will assist once they have learned more about the web development frameworks.

              Back-End & Database Management: Andrea, Brooke, and Thomas will all work together on both the back-end and database management aspects of the project. Jon will assist, but it will not be his main priority.
          </p>

          <h3>Project Timeline</h3>
          <table>
              <tr>
                  <th>Deadline</th>
                  <th>Goal</th>
              </tr>
              <tr>
                  <td><b>Sunday, October 2nd</b></td>
                  <td>Begin manually collecting data for the database.</td>
              </tr>
              <tr>
                  <td><b>Sunday, October 9th</b></td>
                  <td>Finished collecting data for the database of study spots, and have investigated and begun use of the Google Maps API.</td>
              </tr>
              <tr>
                  <td><b>Sunday, October 16th</b></td>
                  <td>Completed a working database for our data. Begin working on back-end interactions with the databases and continue working on scripts to interact with the Google Maps API.</td>
              </tr>
              <tr>
                  <td><b>Sunday, October 23rd</b></td>
                  <td>Continue working on front-to-back-end interactions and scripts that interact with the Google Maps API.</td>
              </tr>
              <tr>
                  <td><b>Sunday, October 30th</b></td>
                  <td>We will have our basic functionalities implemented, and we will have an initial stage of our website completed. We will also plan and practice for the presentation on Wednesday.</td>
              </tr>
              <tr>
                  <td><b>Wednesday, November 2nd</b></td>
                  <td>Demo initial project functionality.</td>
              </tr>
              <tr>
                  <td><b>Sunday, November 6th</b></td>
                  <td>Continue to troubleshoot and debug basic functions as needed, but they should be largely finished at this point. Begin working on advanced functions and brainstorm additional improvements as necessary.</td>
              </tr>
              <tr>
                  <td><b>Sunday, November 13th</b></td>
                  <td>Continue working on advanced functions.</td>
              </tr>
              <tr>
                  <td><b>Sunday, November 20th</b></td>
                  <td>At this point, the advanced functions should be almost complete. Shift gears to focusing on the front-end aspect of the project to ensure best user experience.</td>
              </tr>
              <tr>
                  <td><b>Sunday, November 27th</b></td>
                  <td>Final touches to the code, front-end, etc. This week will be used mostly for debugging.</td>
              </tr>
              <tr>
                  <td><b>Sunday, December 4th</b></td>
                  <td>Film video demonstration and submit project. Final meeting!</td>
              </tr>
          </table>
      </div>  
    );
}