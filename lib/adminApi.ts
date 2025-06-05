import axios from 'axios';

export interface DashboardStats {
    totalUsers: number;
    onlineToday: number;
    onlineYesterday: number;
    monthlyGrowth: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "";
    const { data } = await axios.get<DashboardStats>(`https://localhost:7082/api/Admin/dashboard/stats`);
    return data;
};
