import ERDiagram from "../media/initial-ER.jpg"

export default function Overview() {
    return (
        <main id={"overview-container"}>
            <h1>Study Buddy</h1>
            <p><b>Description:</b> Our project will rely on a database of study spaces around Notre Dame’s campus.  Our application will allow users to search for study spaces using various filters, including proximity to a window/natural light, availability of printers, the loudness level of the location, whether or not there is desk space available, how many seats there are, and many more options.  Our application will also allow users to find a study space near a particular restaurant, find a central study space for working with group members or friends, or find a location that is on the way between classes or activities.
            </p>

            <p><b>Development Plan:</b>
                <a href="http://db8.cse.nd.edu/cse30246/studybuddy/devplan.html">http://db8.cse.nd.edu/cse30246/studybuddy/devplan.html</a>

                <p><b>Usefulness:</b> Our application will be useful to all Notre Dame students who study in public places. With the combination of options regarding noise level, location, and food availability, our application will filter down from our population of study spots to the best available options for the user to go to. We do not believe there is an app with the functionality of ours available right now outside of a system used in 2020 during COVID with QR codes in the library, which users scanned to mark that they were studying there. Ours should be much more robust than that, with many pieces of information about each study spot and other advanced functionality that makes for a positive user experience. Our application will provide a useful tool for students who are just checking if their favorite study spot is open as well as those who are looking to branch out and find a new perfect nook.
                </p>

                <p><b>Realness:</b> In order to acquire data, our group will need to manually enter items into the database, and this presents the largest difficulty of the project. Manual entry will require a significant portion of our time, as we need to first record the data while visiting each location and then utilize SQL to upload the data. While recording the data, I believe that using an Excel sheet will streamline the process, as we will be able to visualize how the final database will be structured. Also, hopefully, we could utilize a Python script to read from the Excel sheet and automatically upload the data to the database, which will be much more efficient. The other source of data we will utilize is Google Maps. We will use this data to find a study spots’ proximity to food, your friends, your dorm, and from your path to your next class. Combining these sources will ensure that we have a robust datasets for our project.
                </p>

                <p><b>Functionality:</b><ul>

                    <li><b>Basic Functions:</b> The basic functionality of our app will be to provide study spot location recommendations to users based on their preferences. Filtering options will include proximity to windows or printers, the operating hours of each building, the loudness/quietness level of the location, the number of seats available, what type of seating options available, if the seat includes desk space, and many more filters. Based on the requirements of the user, the app will list a bunch of study spot options, including a picture of the spot, how to get there from your current location, and previous users’ reviews of the spot.
                    </li>
                    <li><b>Advanced Functions:</b> <ol><li>Location recommendation based on type of work or previous activity: One of our advanced functions will allow location recommendation based on your previously used spots and the type of work you expect to work on. For example, if you often indicate that you are studying the Hesburgh Library on week nights, then the app will record this user history and continue to recommend spots within Hesburgh Library on weeknights with fewer recommendations at other locations. This functionality can be turned off, however, if you would like your search to be independent of previously used locations. An example of how the location could be recommended based on type of work you need to accomplish would be, if you expect to work on an essay, then the app would recommend a quiet, solitary location with access to printers.
                    </li>
                        <li>Proximity to food, friends, and your intended path: Our second advanced function requires integration with the Google Maps API. We will utilize this data to give study spots recommendations to a user based on if they want to study close to on-campus restaurants, to meet up with a friend or teammate in between your current location and theirs, or to find a study location based on a path you intend to take (i.e. going to a class, your dorm, or another on-campus location, but you want to study in between).
                        </li></ol>
                    </li>
                </ul>

                    <p><b>E.R. Diagram:</b> In our E.R. diagram, we assume that the entity sets are buildings, study spaces, users, tables, desks, and seating.  We assume that buildings have many study spaces, and that study spaces are a weak entity set, meaning that they are defined by their building.
                    </p>
                    <img src={ERDiagram} alt={""} style={{width: 600, margin:50}}/>
                </p>
            </p>

        </main>
    );
}