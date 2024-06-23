import React from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

const ReservationsForUser = (props) => {
    const { reservations } = props;

    const getHighlightedDates = () => {
        const dates = [];
        reservations.forEach(reservation => {
            let currentDate = new Date(reservation.dateFrom);
            const endDate = new Date(reservation.dateTo);
            while (currentDate <= endDate) {
                dates.push({
                    date: format(currentDate, 'yyyy-MM-dd'),
                    resourceName: reservation.resourceName
                });
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return dates;
    };

    const highlightedDates = getHighlightedDates();

    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = format(date, 'yyyy-MM-dd');
            if (highlightedDates.some(d => d.date === formattedDate)) {
                return 'react-calendar__tile--active';
            }
        }
        return null;
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '20px',
    };

    const calculateTotalAmount = (dateFrom, dateTo, pricePerNight) => {
        const fromDate = new Date(dateFrom);
        const toDate = new Date(dateTo);
        const days = Math.round((toDate - fromDate) / (1000 * 60 * 60 * 24)) ;
        return days * pricePerNight;
    };

    return (
        <div className="container mt-4" style={containerStyle}>
            {reservations.length === 0 ? (
                <p className="text-center">You have no reservations.</p>
            ) : (
                <>
                    <Calendar
                        tileClassName={tileClassName}
                        className="reservation-calendar"
                    />
                    <div className="reservations-list mt-4">
                        {reservations.map((reservation, index) => (
                            <div key={index} className="reservation-card">
                                <img src={`${process.env.PUBLIC_URL}/images/${reservation.resource.imageUrl}`} alt={reservation.resourceName} className="reservation-image" />
                                <div className="reservation-info">
                                    <h5>{reservation.resource.name}</h5>
                                    <p>From: {format(new Date(reservation.dateFrom), 'MM/dd/yyyy')}</p>
                                    <p>To: {format(new Date(reservation.dateTo), 'MM/dd/yyyy')}</p>
                                    <p>Total Amount: ${calculateTotalAmount(reservation.dateFrom, reservation.dateTo, reservation.resource.pricePerNight)}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default ReservationsForUser;
