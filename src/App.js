import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";
import React, { useState, useEffect } from "react";
import styles from "./PlantCard.module.css";

const firebaseConfig = {
  apiKey: "AIzaSyC8f11gTf--50rqHhd-xwBRD_wsIpWhDmw",
  authDomain: "today21-cd8a4.firebaseapp.com",
  databaseURL:
    "https://today21-cd8a4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "today21-cd8a4",
  storageBucket: "today21-cd8a4.appspot.com",
  messagingSenderId: "695750320323",
  appId: "1:695750320323:web:c7328a0fd8319a0201c276",
  measurementId: "G-1PQF9X5EQ3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const App = () => {
  const [plantsData, setPlantsData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      const dbRef = ref(db, "data");
      onValue(dbRef, (snapshot) => {
        const fetchedData = snapshot.val();
        if (fetchedData) {
          // Transform data into an array of objects for easier handling
          const plantsArray = Object.entries(fetchedData).map(
            ([key, value]) => ({
              id: key,
              ...value,
            })
          );
          setPlantsData(plantsArray);
        }
      });
    };

    fetchData();

    return () => {
      off(ref(db, "data"));
    };
  }, []);

  const renderPlantCards = () => {
    // Define threshold values for analysis
    const humidityThreshold = 60; // Example threshold for humidity
    const temperatureThreshold = 25; // Example threshold for temperature
    const pressureThreshold = 1000; // Example threshold for pressure
    const soilmoistureno = 250;
    const UVhold = 75;

    <div className={styles.title}>
      <h2>dv</h2>
    </div>;
    return plantsData.map((plant) => (
      <div key={plant.id} className={styles.plantCard}>
        <div className={styles.cardRow}>
          <h2 className={styles.title}>
            Plant no <br></br> {plant.id}
          </h2>
        </div>
        <div className={styles.cardRow}>
          <p className={styles.attribute}>
            Plant altitude <br></br>
            {plant.altitudeM} M{" "}
          </p>
          <p className={styles.attribute}>
            Humidity <br></br>
            {plant.humidity} %
            <span className={styles.analysis}>
              <br></br>
              {plant.humidity > humidityThreshold ? "Good" : "Not Good"}
            </span>
          </p>
          <p className={styles.attribute}>
            Plant Soil moisture <br></br>
            {plant.moisture}
            <span className={styles.analysis}>
              <br></br>
              {plant.moisture > soilmoistureno ? "Not Good Dry" : "Good Wet"}
            </span>
          </p>
          <p className={styles.attribute}>
            Around Pressure: <br></br>
            {plant.pressurePa} Pa <br></br>
            <span className={styles.analysis}>
              {plant.pressurePa > pressureThreshold ? "Good" : "Not Good"}
            </span>
          </p>
          <p className={styles.attribute}>
            Pressure SeaLevel: <br></br>
            {plant.pressureSeaLevelPa} Pa
            {/* Add analysis logic for pressureSeaLevelPa */}
          </p>
          <p className={styles.attribute}>
            Temperature around the plant <br></br>
            {plant.temperatureBmpC} C
            {/* Add analysis logic for temperatureBmpC */}
          </p>
          <p className={styles.attribute}>
            Temperature around Garden <br></br>
            {plant.temperatureC} C <br></br>
            <span className={styles.analysis}>
              {plant.temperatureC > temperatureThreshold ? "Good" : "Not Good"}
            </span>
          </p>
          <p className={styles.attribute}>
            UV meter Level <br></br>
            {plant.uvOutMv} mV
          </p>
          <p className={styles.attribute}>
            UV SensorReading <br></br>
            {plant.uvSensorReading}
            <br></br>
            <span className={styles.analysis}>
              {plant.uvSensorReading > UVhold ? "Not Good" : "Good Sunlight"}
            </span>
          </p>
        </div>
      </div>
    ));
  };

  return <div className="plants-container">{renderPlantCards()}</div>;
};

export default App;
