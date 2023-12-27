import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NetworkPanel = () => {
  const navigate = useNavigate();
  const [network, setNetwork] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

  return (
    <div className="network-panel flex flex-col w-full border border-gray bg-white rounded-lg shadow-sm p-4">
      <div className="network-panel-header flex flex-row justify-between items-center">
        <p className="text-lg">Your Influence</p>
      </div>
    </div>
  );
};

export default NetworkPanel;
