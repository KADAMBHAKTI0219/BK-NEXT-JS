const DASHBOARD_API_URL = "http://localhost:1337/api/combined-data";
import axios from "axios";

export const getDashboard = async () => {
  try {
    const getDashboardData = await axios.get(DASHBOARD_API_URL + '?populate=*', {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Dashboard data fetched successfully:", getDashboardData.data);
    return getDashboardData.data;
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    throw error;
  }
};
