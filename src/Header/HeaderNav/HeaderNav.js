import React from 'react';
import fiestaMarketLogo from './fiesta-market-logo.png';

class HeaderNav extends React.Component {

    displayStatusOptions() {
        console.log("hello!");
    }

    render() {
        return (
            <div class="header-container">
                <a href='/' class="logo"><img src={fiestaMarketLogo} alt="Logo"/></a>
                <ul class="nav-list">
                    <li><button onClick={this.displayStatusOptions} class="nav">Status: Online</button></li>
                    <li><button className="nav">Messages</button></li>
                    <li><button className="nav">Notifications</button></li>
                    <li><button className="nav">Account</button></li>
                    <li><button className="nav">Sign Out</button></li>
                </ul>
            </div>
        );
    }
}

export default HeaderNav;