import { useEffect, useState } from "react";
import { getReservations } from "../services/reservationService";

function ReservationsPage() {

  const [reservations, setReservations] = useState([]);

  useEffect(() => {

    const fetchReservations = async () => {
      try {
        const data = await getReservations();
        setReservations(data.content || data);
      } catch (error) {
        console.error("Error fetching reservations", error);
      }
    };

    fetchReservations();

  }, []);

  return (

    <div>

      <h2>Reservations</h2>

      <table border="1" style={{ width: "80%", marginTop: "20px", borderCollapse: "collapse" }}>

        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Room</th>
            <th>Check In</th>
            <th>Check Out</th>
          </tr>
        </thead>

        <tbody>

          {reservations.map((reservation) => (
            <tr key={reservation.id}>

              <td>{reservation.id}</td>
              <td>{reservation.username}</td>
              <td>{reservation.roomNumber}</td>
              <td>{reservation.checkInDate}</td>
              <td>{reservation.checkOutDate}</td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ReservationsPage;