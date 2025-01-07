Movie Studio - React App
Description
Movie Studio is an interactive movie app built with React. It allows users to search, explore, rate, and track movies they've watched. The app fetches movie details from the OMDB API and provides a custom rating system for each movie.

Features
Dynamic Movie Search: Search for movies by name, dynamically filtered based on user input.
Movie Details: Fetches detailed information about movies from the OMDB API and displays it to the user.
Rating System: Custom star-rating component for users to rate movies.
Watched Movies List: Add movies to a personal watched list with ratings, average ratings, and runtime.
Tech Stack
React: A JavaScript library for building user interfaces.
CSS: For styling the components and ensuring a responsive design.
OMDB API: Provides movie data for the application.
Installation
Follow the steps below to run the project locally:

Clone the repository:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install dependencies:

bash
Copy code
npm install
Run the app:

bash
Copy code
npm start
This will start the React development server and you can view the app in your browser at http://localhost:5173.

Components
Movie: The main component that handles movie search, fetching data, and displaying movie details.
Usage
Once the app is running, you can search for movies by typing in the search bar.
After selecting a movie, you can view its details, add a personal rating, and add it to your watched list.
Each movie in the watched list can be rated and viewed for additional details such as runtime and average ratings.
Contributing
Feel free to fork the repository, create a branch, and submit pull requests with improvements or bug fixes!

License
This project is open-source and available under the MIT License.