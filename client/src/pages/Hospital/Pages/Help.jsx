import "../HospitalAmbulanceDriver.css";
import React from "react";
import "./Help.css";
import cover from "../../../assets/Cover.png";
const Product = () => {
  return (
    <div className="hospital-help">
      <div className="container-1">
        <div className="sub_container-2">
          <h2 className="sub_container-2_hading">
            What is the primary goal here?
          </h2>
          <p className="sub_container-2_paragraph">
            Our primary focus is on people's lives. This is the answer if a
            citizen wants emergency medical care from the hospitals. If someone
            needs an ambulance, a hospital nearby can respond as soon as
            feasible. We all understand that because of the rapid population
            growth in our country, the next generational idea must be adopted.
            We are providing a better solution for our nation and city as a
            result.
          </p>
          <p className="sub_container-2_paragraph">
            This is just the beginning, We have much further to go in improving
            our lives. Currently, this implementation serves quite advanced
            purposes. But now is the time to adopt something even better for the
            future.
          </p>
        </div>

        {/* <div className="sub_container-1">
            <img className="sub_container-1_img" src="img/Untitled design.png" alt="sample_image">
        </div> */}
      </div>
      <div className="sub_container-1">
        <img className="sub_container-1_img" src={cover} alt="sample_image" />
      </div>
    </div>
  );
};

export default Product;
