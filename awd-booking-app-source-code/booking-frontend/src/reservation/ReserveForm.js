import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ReserveForm = (props) => {
    const location = useLocation();
    const navigate = useNavigate();
    const { resourceId } = location.state;
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [error, setError] = useState(null);

    const handleReserve = () => {
        props.reserve(resourceId, dateFrom, dateTo, () => {
            navigate("/reservations/user");
        }, (errorMessage) => {
            setError(errorMessage);
        });
    };

    return (
        <div className="container mb-5">
            <div className="row justify-content-center">
                <div className="col-4 mt-5">
                    {error && <div className="alert alert-danger" role="alert">{error}</div>}
                    <form>
                        <div className="mb-3">
                            <label htmlFor="dateFrom" className="form-label">Date From</label>
                            <input type="date" className="form-control" id="dateFrom" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="dateTo" className="form-label">Date To</label>
                            <input type="date" className="form-control" id="dateTo" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
                        </div>
                        <button type="button" className="btn" style={{backgroundColor:"#D4A373",color:"white"}} onClick={handleReserve}>Reserve</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ReserveForm;
