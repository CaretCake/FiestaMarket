import React from 'react';

class PageFooter extends React.Component {
    render() {
        return (
            <div class="footer-container">
                <div class="footer-links">
                    <h3>Links</h3>
                    <button>Report a User</button>
                    <button>Contact Us/Report a Bug</button>
                </div>
                <div class="footer-disclaimer">
                    <h3>Disclaimer</h3>
                    <p>Gamigo, Fiesta Online and the logo Fiesta Online are registered trademarks. All rights are reserved worldwide. This site has no official link with Gamigo or Fiesta Online. All artwork, screenshots, characters or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of Gamigo.</p>
                </div>
            </div>
        );
    }
}

export default PageFooter;