import React, { useState } from "react";

const Modal = () => {
    
    return (
        <>
            <button
                className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Fill Details
            </button>
           
        </>
    );
};

export default Modal;