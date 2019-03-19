import React from 'react';
import fiestaMarketLogo from './fiesta-market-logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons'

class HeaderNav extends React.Component {

    displayStatusOptions() {
        console.log("hello!");
    }

    render() {
        return (
            <div class="header-container">
                <div class="background"></div>
                <a href='/' class="logo"><img src={fiestaMarketLogo} alt="Logo"/></a>
                <ul class="nav-list">
                    <li><button onClick={this.displayStatusOptions} class="nav">Status: Online</button></li>
                    <li><button className="nav"><FontAwesomeIcon icon={faEnvelope}/> Messages</button></li>
                    <li><button className="nav">Notifications</button></li>
                    <li><button className="nav">Account</button></li>
                    <li><button className="nav"><FontAwesomeIcon icon={faSignOutAlt} /> Sign Out</button></li>
                </ul>
            </div>
        );
    }
}

export default HeaderNav;