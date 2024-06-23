import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const ResourceDetails = (props) => {
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        props.getResource(id);
    }, [id]);

    const { resource } = props;

    const handleReserve = (id) => {
        navigate("/reserve", { state: { resourceId: id } });
    };

    if (!resource) {
        return (
            <div className="d-flex justify-content-center my-5">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="container my-5">
            <div className="card mb-3" style={{ maxWidth: '1100px', margin: '0 auto' }}>
                <div className="row no-gutters">
                    <div className="col-md-5">
                        <img src={`${process.env.PUBLIC_URL}/images/${resource.imageUrl}`}
                             className="card-img"
                            alt={resource.name}
                            style={{ objectFit: 'cover', height: '100%' }}
                        />
                    </div>
                    <div className="col-md-7">
                        <div className="card-body d-flex flex-column justify-content-center">
                            <h3 className="card-title" style={{ fontWeight: '700',color:"#D4A373"}}>{resource.name}</h3>
                            <p className="card-text">
                                <small style={{color:"#D4A373", opacity:"0.8"}}>{resource.city}, {resource.country}</small>
                            </p>
                            <p className="card-text" style={{color:"#D4A373"}}>
                                <strong>Price per night:</strong> ${resource.pricePerNight}
                            </p>
                            <p className="card-text" style={{color:"#D4A373"}}>
                                <strong>Category:</strong> {resource.category}
                            </p>
                            <p className="card-text" style={{color:"#D4A373"}}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita facilis molestias nobis unde. Dolore ea eaque hic id incidunt maiores nobis numquam obcaecati quod sequi. Accusamus atque aut consequuntur ea earum illo in incidunt ipsa laboriosam natus nobis non officiis perferendis placeat quaerat quam recusandae reprehenderit repudiandae sequi sint tempora temporibus velit veniam, veritatis voluptatibus.
                            </p>
                            <button type="button" className="btn me-2" onClick={() => handleReserve(resource.id)} style={{backgroundColor:"#D4A373",color:"white"}}>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ResourceDetails;
