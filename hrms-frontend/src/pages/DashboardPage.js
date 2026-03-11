import { useEffect, useState } from "react";
import { getReservations } from "../services/reservationService";

function DashboardPage() {

  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const data = await getReservations(0, 100);
      setReservations(data.content || data);
    } catch (error) {
      console.error("Error loading reservations", error);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  const totalReservations = reservations.length;

  const activeReservations = reservations.filter(
    (r) => r.checkOutDate >= today
  ).length;

  const upcomingCheckIns = reservations.filter(
    (r) => r.checkInDate >= today
  ).length;

  return (
    <div>

      <h2>Dashboard</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          flexWrap: "wrap",
          justifyContent: "space-between"
        }}
      >

        <div style={cardStyle}>
          <h3>Total Reservations</h3>
          <p>{totalReservations}</p>
        </div>

        <div style={cardStyle}>
          <h3>Active Reservations</h3>
          <p>{activeReservations}</p>
        </div>

        <div style={cardStyle}>
          <h3>Upcoming Check-ins</h3>
          <p>{upcomingCheckIns}</p>
        </div>

      </div>

    </div>
  );
}

const cardStyle = {
  background: "#ecf0f1",
  padding: "20px",
  width: "220px",
  borderRadius: "8px",
  textAlign: "center",
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)"
};

export default DashboardPage;