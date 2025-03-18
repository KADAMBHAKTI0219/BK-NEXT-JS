import { authMiddleware } from "@/middleware/authMiddleware";


function DashboardPage({ user }) {
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
    </div>
  );
}

export default authMiddleware(DashboardPage);