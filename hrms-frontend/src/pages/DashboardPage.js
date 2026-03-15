import { useEffect, useState } from "react";
import { getReservations } from "../services/reservationService";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function DashboardPage() {

  const [reservations, setReservations] = useState([]);
  const [dateFilter, setDateFilter] = useState("ALL");

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {

      const data = await getReservations(0, 100);

      if (data && data.content) {
        setReservations(data.content);
      } else {
        setReservations([]);
      }

    } catch (error) {
      console.error("Error loading reservations", error);
      setReservations([]);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  /* -----------------------------
     FILTER LOGIC
  ----------------------------- */

  const filterReservations = () => {

    if (dateFilter === "ALL") return reservations;

    const now = new Date();

    let days = 0;

    if (dateFilter === "7D") days = 7;
    if (dateFilter === "30D") days = 30;
    if (dateFilter === "6M") days = 180;

    const cutoff = new Date();
    cutoff.setDate(now.getDate() - days);

    return reservations.filter((r) => {

      const checkIn = new Date(r.checkInDate);

      return checkIn >= cutoff;

    });

  };

  const filteredReservations = filterReservations();


  /* -----------------------------
     KPI CALCULATIONS
  ----------------------------- */

  const totalReservations = filteredReservations.length;

  const activeReservations = filteredReservations.filter(
    (r) => r.checkOutDate >= today
  ).length;

  const upcomingCheckIns = filteredReservations.filter(
    (r) => r.checkInDate >= today
  ).length;


  /* -----------------------------
     RESERVATION TRENDS
  ----------------------------- */

  const reservationsPerMonth = {};

  filteredReservations.forEach((reservation) => {

    const month = reservation.checkInDate.substring(0, 7);

    reservationsPerMonth[month] =
      (reservationsPerMonth[month] || 0) + 1;

  });

  const chartData = Object.keys(reservationsPerMonth).map((month) => ({
    month,
    reservations: reservationsPerMonth[month]
  }));


  /* -----------------------------
     REVENUE CALCULATION
  ----------------------------- */

  const revenuePerMonth = {};

  filteredReservations.forEach((reservation) => {

    const month = reservation.checkInDate.substring(0, 7);

    const pricePerNight = reservation.price || 2500;

    const checkIn = new Date(reservation.checkInDate);
    const checkOut = new Date(reservation.checkOutDate);

    const nights = Math.max(
      (checkOut - checkIn) / (1000 * 60 * 60 * 24),
      1
    );

    const revenue = nights * pricePerNight;

    revenuePerMonth[month] =
      (revenuePerMonth[month] || 0) + revenue;

  });

  const revenueChartData = Object.keys(revenuePerMonth).map((month) => ({
    month,
    revenue: revenuePerMonth[month]
  }));


  /* -----------------------------
     TOTAL REVENUE
  ----------------------------- */

  const totalRevenue = Object.values(revenuePerMonth).reduce(
    (sum, value) => sum + value,
    0
  );


  /* -----------------------------
     REVENUE GROWTH
  ----------------------------- */

  const months = Object.keys(revenuePerMonth).sort();

  let revenueGrowth = 0;

  if (months.length >= 2) {

    const currentMonth = revenuePerMonth[months[months.length - 1]];
    const previousMonth = revenuePerMonth[months[months.length - 2]];

    if (previousMonth > 0) {
      revenueGrowth =
        ((currentMonth - previousMonth) / previousMonth) * 100;
    }

  }

  revenueGrowth = Math.round(revenueGrowth);


  /* -----------------------------
     OCCUPANCY TREND
  ----------------------------- */

  const occupancyData = Object.keys(reservationsPerMonth).map((month) => ({
    month,
    occupancy: reservationsPerMonth[month]
  }));


  /* -----------------------------
     OCCUPANCY GAUGE
  ----------------------------- */

  const occupiedRooms = filteredReservations.length;

  const totalRooms = 20;

  const occupancyPercent = Math.min(
    Math.round((occupiedRooms / totalRooms) * 100),
    100
  );

  const gaugeData = [
    { name: "Occupied", value: occupancyPercent },
    { name: "Available", value: 100 - occupancyPercent }
  ];


  return (
    <div>

      <h2>Dashboard</h2>

      {/* DATE FILTER */}

      <div style={filterBar}>

        <button onClick={() => setDateFilter("ALL")}>All Time</button>
        <button onClick={() => setDateFilter("7D")}>Last 7 Days</button>
        <button onClick={() => setDateFilter("30D")}>Last 30 Days</button>
        <button onClick={() => setDateFilter("6M")}>Last 6 Months</button>

      </div>


      {/* KPI CARDS */}

      <div style={kpiContainer}>

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

        <div style={cardStyle}>
          <h3>Total Revenue</h3>
          <p>₹{totalRevenue.toLocaleString()}</p>
        </div>

        <div style={cardStyle}>
          <h3>Revenue Growth</h3>
          <p
            style={{
              color: revenueGrowth >= 0 ? "green" : "red",
              fontWeight: "bold"
            }}
          >
            {revenueGrowth >= 0 ? "↑" : "↓"} {Math.abs(revenueGrowth)}%
          </p>
        </div>

      </div>


      {/* CHART GRID */}

      <div style={chartGrid}>

        <div style={chartCard}>

          <h3>Reservation Trends</h3>

          <ResponsiveContainer width="100%" height={250}>

            <LineChart data={chartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="reservations"
                stroke="#3498db"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>


        <div style={chartCard}>

          <h3>Revenue Trend</h3>

          <ResponsiveContainer width="100%" height={250}>

            <BarChart data={revenueChartData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="revenue" fill="#27ae60" />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* OCCUPANCY TREND */}

      <div style={chartCardFull}>

        <h3>Occupancy Trend</h3>

        <ResponsiveContainer width="100%" height={250}>

          <LineChart data={occupancyData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="occupancy"
              stroke="#e74c3c"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>


      {/* OCCUPANCY GAUGE */}

      <div style={chartCardFull}>

        <h3>Room Occupancy</h3>

        <ResponsiveContainer width="100%" height={250}>

          <PieChart>

            <Pie
              data={gaugeData}
              dataKey="value"
              startAngle={180}
              endAngle={0}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={3}
            >

              <Cell fill="#e74c3c" />
              <Cell fill="#ecf0f1" />

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

        <h2 style={{ textAlign: "center", marginTop: "-30px" }}>
          {occupancyPercent}%
        </h2>

      </div>

    </div>
  );
}


/* -----------------------------
   STYLES
----------------------------- */

const filterBar = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
  marginBottom: "20px"
};

const kpiContainer = {
  display: "flex",
  gap: "20px",
  flexWrap: "wrap"
};

const cardStyle = {
  background: "#ecf0f1",
  padding: "20px",
  width: "220px",
  borderRadius: "10px",
  textAlign: "center",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)"
};

const chartGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "20px",
  marginTop: "30px"
};

const chartCard = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
};

const chartCardFull = {
  background: "white",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  marginTop: "20px"
};

export default DashboardPage;