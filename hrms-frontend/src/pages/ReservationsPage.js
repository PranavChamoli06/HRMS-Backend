import { useEffect, useState } from "react";
import {
  getReservations,
  createReservation,
  updateReservation
} from "../services/reservationService";

function ReservationsPage() {

  const [reservations, setReservations] = useState([]);
  const [username, setUsername] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [editingId, setEditingId] = useState(null);

  const fetchReservations = async () => {
    try {
      const data = await getReservations();
      setReservations(data.content || data);
    } catch (error) {
      console.error("Error fetching reservations", error);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleEdit = (reservation) => {
    setEditingId(reservation.id);
    setUsername(reservation.username);
    setRoomNumber(reservation.roomNumber);
    setCheckInDate(reservation.checkInDate);
    setCheckOutDate(reservation.checkOutDate);
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const reservationData = {
          username,
          roomId: Number(roomNumber),
          checkInDate,
          checkOutDate
        };

      if (editingId) {

        await updateReservation(editingId, reservationData);
        alert("Reservation updated successfully");
        setEditingId(null);

      } else {

        await createReservation(reservationData);
        alert("Reservation created successfully");

      }

      setUsername("");
      setRoomNumber("");
      setCheckInDate("");
      setCheckOutDate("");

      fetchReservations();

    } catch (error) {
      console.error("Error saving reservation", error);
    } 
};

  return (

    <div>

      <h2>Reservations</h2>

      <h3>{editingId ? "Edit Reservation" : "Create Reservation"}</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) => setRoomNumber(e.target.value)}
        />

        <br /><br />

        <input
          type="date"
          value={checkInDate}
          onChange={(e) => setCheckInDate(e.target.value)}
        />

        <br /><br />

        <input
          type="date"
          value={checkOutDate}
          onChange={(e) => setCheckOutDate(e.target.value)}
        />

        <br /><br />

        <button type="submit">
            {editingId ? "Update Reservation" : "Create Reservation"}
        </button>

      </form>

      <hr />

      <table border="1" style={{ width: "80%", marginTop: "20px", borderCollapse: "collapse" }}>

        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Room</th>
            <th>Check In</th>
            <th>Check Out</th>
            <th>Actions</th>
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
              <td>
                <button onClick={() => handleEdit(reservation)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  );
}

export default ReservationsPage;