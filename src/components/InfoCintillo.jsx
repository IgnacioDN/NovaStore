import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';


function InfoCintillo() {
  return (
    <section className="info-cintillo">
      <div className="row text-center">
        <div className="col-6 col-sm-3 info-item">    
          <i className="bi bi-shield-lock"></i>
          <p>Official Warranty</p>
        </div>
        <div className="col-6 col-sm-3 info-item">   
          <i className="bi bi-alarm"></i>
          <p>24/7 Support</p>
        </div>
        <div className="col-6 col-sm-3 info-item">  
          <i className="bi bi-truck"></i>
          <p>Nationwide Shipping</p>
        </div>
        <div className="col-6 col-sm-3 info-item"> 
          <i className="bi bi-credit-card"></i>
          <p>Card Discounts</p>
        </div>
      </div>
    </section>
  );
}
export default InfoCintillo;
