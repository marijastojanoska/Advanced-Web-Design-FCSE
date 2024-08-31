import React, {useState, useEffect} from "react";
import {useNavigate, Link} from "react-router-dom";
import Select from 'react-select';
import Service from '../service/service';
import ResourceManager from "./ResourceManager";

const Resources = ({currentUser, setResources}) => {
    const navigate = useNavigate();
    const [city, setCity] = useState("");
    const [dateFrom, setDateFrom] = useState("");
    const [dateTo, setDateTo] = useState("");
    const [resources, setResourceList] = useState([]);
    const [error, setError] = useState(null);

    const handleReserve = (id) => {
        navigate("/reserve", {state: {resourceId: id}});
    };

    useEffect(() => {
        const fetchFilteredResources = async () => {
            try {
                const response = await Service.fetchResources(city, dateFrom, dateTo);
                setResourceList(response.data);
                if (response.data.length === 0 && city && dateFrom && dateTo) {
                    setError(`No available properties for ${city} at these dates.`);
                } else {
                    setError(null);
                }
            } catch (error) {
                console.error("Error fetching resources:", error);
                setError("Error fetching resources");
                setResourceList([]);
            }
        };

        const startDate = new Date(dateFrom);
        const endDate = new Date(dateTo);
        if (dateFrom && dateTo && startDate >= endDate) {
            setError("Start date must be before end date.");
            setResourceList([]);
        } else {
            setError(null);
            fetchFilteredResources();
        }
    }, [city, dateFrom, dateTo]);

    const handleDateChange = (setter) => (e) => {
        setError(null);
        setter(e.target.value);
    };

    const handleCityChange = (selectedOption) => {
        setCity(selectedOption ? selectedOption.value : "");
    };

    const cities = [
        // Capitals of the World
        "Kabul", "Tirana", "Algiers", "Andorra la Vella", "Luanda", "Saint John's", "Buenos Aires",
        "Yerevan", "Canberra", "Vienna", "Baku", "Nassau", "Manama", "Dhaka", "Bridgetown", "Minsk",
        "Brussels", "Belmopan", "Porto-Novo", "Thimphu", "Sucre", "Sarajevo", "Gaborone", "Brasília",
        "Bandar Seri Begawan", "Sofia", "Ouagadougou", "Gitega", "Praia", "Phnom Penh", "Yaoundé",
        "Ottawa", "Bangui", "N'Djamena", "Santiago", "Beijing", "Bogotá", "Moroni", "Kinshasa",
        "Brazzaville", "San José", "Zagreb", "Havana", "Nicosia", "Prague", "Copenhagen", "Djibouti",
        "Roseau", "Santo Domingo", "Quito", "Cairo", "San Salvador", "Malabo", "Asmara", "Tallinn",
        "Mbabane", "Addis Ababa", "Palikir", "Suva", "Helsinki", "Paris", "Libreville", "Banjul",
        "Tbilisi", "Berlin", "Accra", "Athens", "Saint George's", "Guatemala City", "Conakry", "Bissau",
        "Georgetown", "Port-au-Prince", "Tegucigalpa", "Budapest", "Reykjavik", "New Delhi", "Jakarta",
        "Tehran", "Baghdad", "Dublin", "Jerusalem", "Rome", "Kingston", "Tokyo", "Amman", "Nur-Sultan",
        "Nairobi", "Tarawa", "Pyongyang", "Seoul", "Pristina", "Kuwait City", "Bishkek", "Vientiane",
        "Riga", "Beirut", "Maseru", "Monrovia", "Tripoli", "Vaduz", "Vilnius", "Luxembourg", "Antananarivo",
        "Lilongwe", "Kuala Lumpur", "Malé", "Bamako", "Valletta", "Majuro", "Nouakchott", "Port Louis",
        "Mexico City", "Palau", "Chisinau", "Monaco", "Ulaanbaatar", "Podgorica", "Rabat", "Maputo",
        "Naypyidaw", "Windhoek", "Yaren", "Kathmandu", "Amsterdam", "Wellington", "Managua", "Niamey",
        "Abuja", "Skopje", "Oslo", "Muscat", "Islamabad", "Ngerulmud", "Panama City", "Port Moresby",
        "Asunción", "Lima", "Manila", "Warsaw", "Lisbon", "Doha", "Bucharest", "Moscow", "Kigali",
        "Basseterre", "Castries", "Kingstown", "Apia", "San Marino", "São Tomé", "Riyadh", "Dakar",
        "Belgrade", "Victoria", "Freetown", "Singapore", "Bratislava", "Ljubljana", "Honiara", "Mogadishu",
        "Pretoria", "Juba", "Madrid", "Colombo", "Khartoum", "Paramaribo", "Stockholm", "Bern", "Damascus",
        "Taipei", "Dushanbe", "Dodoma", "Bangkok", "Dili", "Lomé", "Nuku'alofa", "Port of Spain", "Tunis",
        "Ankara", "Ashgabat", "Funafuti", "Kampala", "Kyiv", "Abu Dhabi", "London", "Washington, D.C.",
        "Montevideo", "Tashkent", "Port Vila", "Vatican City", "Caracas", "Hanoi", "Sana'a", "Lusaka", "Harare",

        // Capitals of U.S. States
        "Montgomery", "Juneau", "Phoenix", "Little Rock", "Sacramento", "Denver", "Hartford", "Dover",
        "Tallahassee", "Atlanta", "Honolulu", "Boise", "Springfield", "Indianapolis", "Des Moines",
        "Topeka", "Frankfort", "Baton Rouge", "Augusta", "Annapolis", "Boston", "Lansing", "Saint Paul",
        "Jackson", "Jefferson City", "Helena", "Lincoln", "Carson City", "Concord", "Trenton", "Santa Fe",
        "Albany", "Raleigh", "Bismarck", "Columbus", "Oklahoma City", "Salem", "Harrisburg", "Providence",
        "Columbia", "Pierre", "Nashville", "Austin", "Salt Lake City", "Montpelier", "Richmond",
        "Olympia", "Charleston", "Madison", "Cheyenne", "New York", "Miami",

        // Famous and Largest Cities in Europe
        "Barcelona", "Birmingham", "Brussels", "Budapest", "Cologne", "Dublin", "Edinburgh", "Frankfurt",
        "Glasgow", "Hamburg", "Istanbul", "Krakow", "Leeds", "Lisbon", "Liverpool", "London", "Lyon",
        "Madrid", "Manchester", "Marseille", "Milan", "Munich", "Naples", "Oslo", "Paris", "Porto",
        "Prague", "Rome", "Rotterdam", "Saint Petersburg", "Seville", "Stockholm", "Stuttgart", "Turin",
        "Valencia", "Venice", "Vienna", "Warsaw", "Zurich", "San Francisco", "Chicago", "Los Angeles",
        "Denver", "Toronto", "Vancouver", "Sydney", "Tokyo", "Paris", "Athens", "Rome", "Berlin",
        "Geneva", "Nassau"
    ];

    const uniqueCities = [...new Set(cities)].sort((a, b) => a.localeCompare(b));

    const cityOptions = uniqueCities.map((cityName) => ({
        value: cityName,
        label: cityName,
    }));

    const handleCreateClick = () => {
        navigate('/create-resource');
    };

    const handleEditClick = (resourceId) => {
        navigate(`/edit-resource/${resourceId}`);
    };

    return (
        <div className="container-fluid mt-3">
            <div className="row mb-3">
                <div className="col">
                    {currentUser && (
                        <button
                            className="btn bg-white"
                            onClick={handleCreateClick}>
                            Create New Resource
                        </button>
                    )}
                </div>
            </div>
            <div className="row justify-content-center mb-3">
                <div className="col-lg-2 col-md-8 col-sm-10 position-relative">
                    <label htmlFor="cityInput" className="form-label">City</label>
                    <Select
                        id="cityInput"
                        options={cityOptions}
                        onChange={handleCityChange}
                        isClearable
                        placeholder="Enter city name"
                    />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6"> {/* Adjust column sizes as needed */}
                    <label htmlFor="startDateInput" className="form-label">Start Date</label>
                    <input
                        id="startDateInput"
                        type="date"
                        className="form-control"
                        value={dateFrom}
                        onChange={handleDateChange(setDateFrom)}
                    />
                </div>
                <div className="col-lg-2 col-md-4 col-sm-6"> {/* Adjust column sizes as needed */}
                    <label htmlFor="endDateInput" className="form-label">End Date</label>
                    <input
                        id="endDateInput"
                        type="date"
                        className="form-control"
                        value={dateTo}
                        onChange={handleDateChange(setDateTo)}
                    />
                </div>
            </div>

            {error && <div className="row justify-content-center mb-3">
                <div className="col-12">
                    <div className="alert alert-danger">{error}</div>
                </div>
            </div>}

            <div className="row justify-content-center">
                {resources.map((resource) => (
                    <div className="col-3 p-3 m-3 rounded-3" style={{backgroundColor: "#fff"}}
                         key={resource.id}>
                        <img
                            src={!resource.imageUrl.startsWith('http') ? `${process.env.PUBLIC_URL}/images/${resource.imageUrl}` : resource.imageUrl}
                            alt={resource.name}
                            className="w-100" style={{height: "200px"}}/>
                        <h3 className="resource-title">{resource.name}</h3>
                        <p><strong>Price:</strong> {resource.pricePerNight}$</p>
                        <p><strong>City:</strong> {resource.city}</p>
                        <p><strong>Country:</strong> {resource.country}</p>
                        <p><strong>Category:</strong> {resource.category}</p>

                        <a href={`/resource/${resource.id}`} className="btn text-decoration-none me-1"
                           style={{backgroundColor: "#D4A373", color: "white"}}>Details</a>

                        {currentUser && (
                            <button type="button" className="btn me-2"
                                    onClick={() => handleReserve(resource.id)}
                                    style={{backgroundColor: "#D4A373", color: "white"}}>Reserve</button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;
