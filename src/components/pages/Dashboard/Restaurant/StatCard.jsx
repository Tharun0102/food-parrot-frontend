import { CardContent, Card } from '@mui/material';
import Typography from '@mui/material/Typography';

function StatCard({ title, count }) {
  return (
    <Card className='stat-card' >
      <CardContent className='card-content'>
        <Typography className='title'>{title}</Typography>
        <Typography className='value'>{count}</Typography>
      </CardContent>
    </Card>
  )
}

export default StatCard;
