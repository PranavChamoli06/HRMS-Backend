import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

function AdminPage() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>

      <h2>User Management</h2>

      <table border="1" style={{ marginTop: "20px", width: "60%" }}>

        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
}

export default AdminPage;