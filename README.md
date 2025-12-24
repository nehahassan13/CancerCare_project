

Cancer Care Connect: MERN Stack Medical Monitoring System (Dockerized)

Problem statement: Difficult-to-manage handwritten patient records and doctor's unavailability for prompt consultations 
Missed emergencies due to a lack of daily symptom tracking.Insufficient real-time patient data, lost or unintelligible medical records,
Patient safety is impacted by delayed treatment decisions. Poor coordination, a delayed emergency response, and higher treatment risks are the outcomes of these problems.



Cancer Care Connect is the answer.
A digital platform called Cancer Care Connect links patients, physicians, therapies, and symptoms in real time.

Important characteristics consist of:Patient's daily updates on their symptoms from any location,Instant notifications of severe symptoms to physicians,
Dashboard for remote doctors to track patients' progress,Digital medical records, prescription medications, and patient history,Monitoring the course of treatment (radiation, chemotherapy, surgery), JWT-based secure authentication for physicians and patients



System Design & Architecture: The project is containerised using Docker and has a MERN Stack architecture with an MVC design pattern.



MVC Back-end Architecture: 

Model: Mongoose-based MongoDB schemas for users,patient, doctors, and treatment and symptoms data management



Controller: Manages API operations, authentication, validation, and business logic



Routes: REST APIs endpoints that link controllers to client requests



Using REST APIs to communicate with the back-end, the React front-end serves as the View layer, giving physicians and patients an interactive user interface.



Deployment Using Docker: Docker containers that are distinct for the front-end and back-end. For multi-container orchestration, use Docker Compose.Local deployment that is independent of the environment.Utilising MongoDB Atlas as a cloud database.The application is fully prepared for the cloud, but it is currently deployed locally (Docker is running on my machine currently).



Frontend: React.js,Vite and Axios



Back-end: Node.js and Express.js



Database:MongoDB Atlas and Mongoose



Authentication: JWT (JSON Web Token)



 Deployment:Docker.Docker Compose













