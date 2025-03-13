import React,{useState} from 'react'
import Showtimes from '../components/theaterView'
import BookingDetails from '../components/buyTickec';
import Navbar from '../components/Navbar'

const BookingPage = () => {
    const [selectedShowtime, setSelectedShowtime] = useState(null);
  
    return (
      <div>
        <Navbar />
        {selectedShowtime ? (
          <BookingDetails showtime={selectedShowtime} goBack={() => setSelectedShowtime(null)} />
        ) : (
          <Showtimes onShowtimeSelect={setSelectedShowtime} />
        )}
      </div>
    );
  };
  
  export default BookingPage;