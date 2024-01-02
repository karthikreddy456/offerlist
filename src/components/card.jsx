// Card.jsx
import { FaAngleDown } from "react-icons/fa";
import React, { useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";

function Card({ data, onEdit, onDelete }) {
  {
    console.log(data.getOffer);
  }
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetailsVisibility = () => {
    setIsDetailsVisible(!isDetailsVisible);
  };

  const redirectToUrl = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="container-fluid p-2 conwidth m-2 mx-auto border border-1 border-secondary shadow-sm rounded">
      <div className="container-fluid conwidth1 d-flex flex-row p-0">
        <div className="left d-flex align-items-center justify-content-center">
          <div>
            <p
              style={{
                fontFamily: "Roboto",
                fontWeight: 900,
                fontSize: 50,
              }}
            >
              {data.offer}
            </p>
            <p
              style={{
                fontFamily: "Roboto",
                fontWeight: 900,
                fontSize: 25,
              }}
            >
              OFF
            </p>
          </div>
        </div>
        <div className="middle py-3 ">
          <div className="d-flex flex-column justify-content-around align-items-start gap-4">
            <p
              style={{
                fontFamily: "Roboto",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              Coupon Code: {data.couponcode}
            </p>
            <p
              style={{
                fontFamily: "Roboto",
                fontWeight: 600,
                fontSize: 15,
              }}
            >
              SALE
            </p>
            <p
              style={{
                fontFamily: "Roboto",
                fontWeight: 600,
                fontSize: 25,
              }}
            >
              {data.heading}
            </p>
            {/* <p>Verified: {data.verified + ""}</p> */}
            <p>
              Verified:
              {data.verified ? <AiFillCheckCircle /> : <AiFillCloseCircle />}
            </p>
          </div>
        </div>
        <div className="right d-flex flex-column">
          <button
            className="btn btn-danger w-50 mt-3 btn-xs"
            variant="primary"
            onClick={() => onEdit(data)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger w-50 mt-3 btn-xs"
            onClick={() => onDelete(data.offer)}
          >
            Delete
          </button>

          <button
            className="btn btn-danger w-50 mt-3 btn-xs"
            onClick={() => redirectToUrl(data.getOffer)}
          >
            Get Offer
          </button>
          <a
            href="#"
            className="text-end w-50 mt-3 btn-xs"
            onClick={toggleDetailsVisibility}
          >
            Details <FaAngleDown />
          </a>
        </div>
        <div className="bottom"></div>
      </div>
      <div style={{ display: isDetailsVisible ? "block" : "none" }}>
        <hr></hr>
        <p>{data.details}</p>
      </div>
    </div>
  );
}

export default Card;
