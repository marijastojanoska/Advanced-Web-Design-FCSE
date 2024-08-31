import React from "react";

const Home = (props) => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>
            <section className="bsb-hero-5 px-3 bsb-overlay" style={{backgroundColor: '#fff', padding: '3rem'}}>
                <div className="container">
                    <div className="row justify-content-md-center align-items-center">
                        <div className="col-12 col-md-11 col-lg-9 col-xl-8 col-xxl-7">
                            <h2 className="display-1 text-center fw-bold mb-4" style={{fontSize: '2.5rem'}}>WELCOME</h2>
                            <h2 className="display-1 text-center fw-bold mb-4" style={{fontSize: '2.5rem'}}>to Our
                                Booking App</h2>
                            <p className="lead text-center mb-5 d-flex justify-content-sm-center">
                                <span className="col-12 col-sm-10 col-md-8 col-xxl-7" style={{fontSize: '1.25rem'}}>
                                    Plan your next adventure with us! Our app helps you find the best places to stay, explore local attractions, and more.
                                </span>
                            </p>
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <a href="/resources" className="btn rounded-5 p-3"
                                   style={{backgroundColor: "#D4A373", color: "white"}}>Explore Resources</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section style={{flex: '1', padding: '3rem'}}>
                <h1 style={{
                    fontSize: '2.3rem',
                    color: '#fff',
                    marginBottom: '1.5rem',
                    fontWeight: "700",
                    textAlign: "center"
                }}>Top 10 Greatest Deals</h1>
                <div className="properties-container">
                    {props.resources.map((resource) => (
                        <a key={resource.id} href={`/resource/${resource.id}`} className="property-card">
                            <img
                                src={!resource.imageUrl.startsWith('http') ? `${process.env.PUBLIC_URL}/images/${resource.imageUrl}` : resource.imageUrl}
                                alt={resource.name} className="property-image"/>
                            <div className="property-name">{resource.name} <span>{resource.pricePerNight}$</span></div>
                        </a>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default Home;
