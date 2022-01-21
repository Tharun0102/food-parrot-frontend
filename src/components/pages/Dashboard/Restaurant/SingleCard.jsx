import { CardContent, Card } from '@mui/material';
import Typography from '@mui/material/Typography';
import './RestaurantDashboard.scss'

function SingleCard({ title, count }) {
  return (
    <Card className='card' sx={{ minWidth: 400, minHeight: 80 }} style={{ margin: "10px", borderRadius: "10px" }} >
      <CardContent className='card-content'>
        <Typography sx={{ fontSize: 20, fontWeight: 300 }} color="#000D6B" gutterBottom>
          {title}
        </Typography>
        <Typography sx={{ fontSize: 30, fontWeight: 600 }} color="#52057B" gutterBottom>
          {count}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default SingleCard;
