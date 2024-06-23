const Footer = (props) => {
    return (
        <footer style={{ backgroundColor: '#95714D', color: '#fff', padding: '1rem', marginTop: 'auto' }}>
            <div style={{ textAlign: 'center', opacity: "0.8" }}>
                <ul style={{ display: 'flex', justifyContent: 'center', listStyle: 'none', padding: 0, margin: 0 }}>
                    <li style={{ margin: '0 10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Home</a></li>
                    <li style={{ margin: '0 10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Features</a></li>
                    <li style={{ margin: '0 10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>Pricing</a></li>
                    <li style={{ margin: '0 10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>FAQs</a></li>
                    <li style={{ margin: '0 10px' }}><a href="#" style={{ color: '#fff', textDecoration: 'none' }}>About</a></li>
                </ul>
                <p style={{ margin: '1rem 0 0', color: '#fff' }}>&copy; 2024 Company, Inc</p>
            </div>
        </footer>
    )
}

export default Footer;