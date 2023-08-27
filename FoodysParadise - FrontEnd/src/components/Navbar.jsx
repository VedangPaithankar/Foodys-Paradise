import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar(props) {
    return (
        <div className="flex align-items-center custom-font navbar">
            <div className="nav-brand ml-10 mt-3 w-20 h-20 mb-3 logoadjust">
                <img src="/Assets/Logo.svg" alt="" />
            </div>
            <div className="ml-2 mr-auto"> {/* Use mr-auto to push text to the right */}
                <Link className="text-black hidtitle" to="/">
                    {props.title}
                </Link>
            </div>
            <ul className="navcen nav nav-underline">
                <li className="nav-item">
                    <Link className="nav-link text-black" to="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link text-black" to="/search">
                        Search
                    </Link>
                </li>
                <li className="nav-item mr-10">
                    <Link className="nav-link text-black" to="/myfridge">
                        My Fridge
                    </Link>
                </li>
            </ul>
        </div>
    );
}

Navbar.propTypes = {
    title: PropTypes.string,
};