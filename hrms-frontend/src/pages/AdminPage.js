import { useEffect, useState } from "react";
import {
  getUsers,
  updateUserRole,
  createUser
} from "../services/userService";

function AdminPage() {
  const [users, setUsers] = useState([]);
  const [loadingUserId, setLoadingUserId] = useState(null);

  // Create user state
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newRole, setNewRole] = useState("STAFF");

  // UX states
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [creating, setCreating] = useState(false);

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

  const handleRoleChange = async (userId, newRole) => {
    try {
      setLoadingUserId(userId);

      await updateUserRole(userId, newRole);

      await fetchUsers();
    } catch (error) {
      console.error("Error updating role", error);
    } finally {
      setLoadingUserId(null);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");

    // Validation
    if (!newUsername || !newPassword) {
      setErrorMessage("Username and password are required");
      return;
    }

    try {
      setCreating(true);

      const userData = {
        username: newUsername,
        password: newPassword,
        role: newRole
      };

      await createUser(userData);

      setSuccessMessage("User created successfully");

      setNewUsername("");
      setNewPassword("");
      setNewRole("STAFF");

      await fetchUsers();

    } catch (error) {
      console.error(error);
      setErrorMessage("Failed to create user");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>

      {/* Messages */}
      {successMessage && (
        <p style={{ color: "green" }}>{successMessage}</p>
      )}

      {errorMessage && (
        <p style={{ color: "red" }}>{errorMessage}</p>
      )}

      {/* Create User Form */}
      <h3>Create User</h3>

      <form onSubmit={handleCreateUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <br /><br />

        <select
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        >
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="STAFF">STAFF</option>
        </select>

        <br /><br />

        <button type="submit" disabled={creating}>
          {creating ? "Creating..." : "Create User"}
        </button>
      </form>

      <hr />

      {/* User Table */}
      {users.length === 0 ? (
        <p>No users found</p>
      ) : (
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

                <td>
                  <select
                    value={user.role}
                    disabled={
                      loadingUserId === user.id ||
                      user.username === "admin" // prevent self-demotion
                    }
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value)
                    }
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="STAFF">STAFF</option>
                  </select>

                  {loadingUserId === user.id && (
                    <span style={{ marginLeft: "10px" }}>
                      Updating...
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminPage;