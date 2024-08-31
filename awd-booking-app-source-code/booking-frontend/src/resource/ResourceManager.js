import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../app/App.css';

const ResourceManager = ({ mode, fetchResource, createResource, editResource }) => {
    const { resourceId } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        city: '',
        country: '',
        imageUrl: '',
        pricePerNight: '',
        category: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        if (mode === 'edit' && resourceId) {
            fetchResource(resourceId)
                .then((response) => {
                    setFormData(response.data);
                })
                .catch((error) => {
                    console.error('Error fetching resource:', error);
                    alert('Failed to fetch resource data.');
                });
        }
    }, [mode, resourceId, fetchResource]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { name, city, country, imageUrl, pricePerNight, category } = formData;

        if (mode === 'create') {
            createResource(name, city, country, imageUrl, pricePerNight, category)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error creating resource:', error);
                    alert('Failed to create resource.');
                });
        } else if (mode === 'edit') {
            editResource(resourceId, name, city, country, imageUrl, pricePerNight, category)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    console.error('Error updating resource:', error);
                    alert('Failed to update resource.');
                });
        }
    };

    return (
        <div className="resource-manager-container">
            <form onSubmit={handleSubmit} className="resource-manager-form">
                <div className="resource-manager-form-field">
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="resource-manager-form-field">
                    <label>City:</label>
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="resource-manager-form-field">
                    <label>Country:</label>
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="resource-manager-form-field">
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleChange}
                    />
                </div>
                <div className="resource-manager-form-field">
                    <label>Price Per Night:</label>
                    <input
                        type="number"
                        name="pricePerNight"
                        value={formData.pricePerNight}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="resource-manager-form-field">
                    <label>Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="resource-manager-submit-button">
                    {mode === 'edit' ? 'Edit Resource' : 'Create Resource'}
                </button>
            </form>
        </div>
    );
};

export default ResourceManager;
