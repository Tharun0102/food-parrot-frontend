import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import StatCard from './StatCard';
import Header from '../../../utill/Header/Header';
import NavBar from '../../../utill/NavBar/NavBar';
import './RestaurantDashboard.scss'
import { Typography } from '@mui/material';
import { getRestaurantStats } from '../../../../api/Restaurant';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify'

const RestaurantDashboard = () => {
  const user = useSelector(state => state.user);
  const [stats, setStats] = useState({
    total: 0,
    totalToday: 0,
    totalMonthly: 0,
    completed: 0,
    completedToday: 0,
    completedMonthly: 0,
    cancelled: 0,
    cancelledToday: 0,
    cancelledMonthly: 0
  });

  useEffect(() => {
    fetchStats();
  }, [])

  const fetchStats = async () => {
    try {
      const stats = await getRestaurantStats(user._id);
      setStats(stats);
    } catch (err) {
      toast.error(err.message || "couldn't fetch stats");
    }
  }

  return (
    <Header page='dashboard'>
      <NavBar tab='dashboard'>
        <Box display="flex" flexDirection="column" gap="30px" className='dashboard-wrapper'>
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap="20px" className='stat-section-wrapper'>
            <Typography className='section-title'>Total Orders:</Typography>
            <Box display="flex" alignItems="center" gap="15px" flexWrap="wrap">
              <StatCard title="Total Orders" count={stats.total} />
              <StatCard title="Total Orders today" count={stats.totalToday} />
              <StatCard title="Total Orders this month" count={stats.totalMonthly} />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap="20px" className='stat-section-wrapper'>
            <Typography className='section-title'>Completed Orders:</Typography>
            <Box display="flex" alignItems="center" gap="15px" flexWrap="wrap">
              <StatCard title="Total Completed Orders" count={stats.completed} />
              <StatCard title="Total Completed Orders today" count={stats.completedToday} />
              <StatCard title="Total Completed Orders this month" count={stats.completedMonthly} />
            </Box>
          </Box>
          <Box display="flex" flexDirection="column" alignItems="flex-start" gap="20px" className='stat-section-wrapper'>
            <Typography className='section-title'>Cancelled Orders:</Typography>
            <Box display="flex" alignItems="center" gap="15px" flexWrap="wrap">
              <StatCard title="Total Cancelled Orders" count={stats.cancelled} />
              <StatCard title="Total Cancelled Orders today" count={stats.cancelledToday} />
              <StatCard title="Total Cancelled Orders this month" count={stats.cancelledMonthly} />
            </Box>
          </Box>
        </Box>
      </NavBar>
    </Header>
  )
}

export default RestaurantDashboard;
