import axios from 'axios';

export interface DashboardStats {
    totalUsers: number;
    onlineToday: number;
    onlineYesterday: number;
    monthlyGrowth: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
    const api = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    });
    const { data } = await api.get<DashboardStats>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/Admin/dashboard/stats`);
    return data;
};
