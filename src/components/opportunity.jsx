import { useState } from "react";

export default function Opportunity({
  opportunity,
  setShowModal,
  setOpportunity,
  showApplyButton = true,
}) {
  const [isApplied, setIsApplied] = useState(opportunity.hasApplied);

  const getDuration = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.ceil(diffDays / 30);
    return diffMonths;
  };

  return (
    <div
      className="flex flex-col items-center justify-center w-[95%] p-4 bg-white border border-gray rounded-lg shadow-sm drop-shadow-sm z-1"
      key={opportunity.id}
    >
      <div className="company-details flex flex-row w-full">
        <div className="company-image border border-gray rounded-lg w-14 h-14 flex flex-row justify-center items-center">
          {opportunity.companyLogo ? (
            <img
              src={opportunity.companyLogo}
              className="w-14 h-14"
              alt="company"
            />
          ) : (
            <i className="fas fa-building fa-3x"></i>
          )}
        </div>
        <div className="flex flex-col pl-4 justify-center">
          <p className="text-xl font-bold">{opportunity.name}</p>
          <p className="text-md font-md">{opportunity.companyName}</p>
        </div>
        {/* Match Score */}
        {opportunity.matchRatio > 0 && (
          <div className="flex flex-col justify-center items-center ml-auto">
            <p className="text-xl font-bold">Match Score</p>
            <p className="text-md font-md">
              {Math.fround(opportunity.matchRatio * 100).toFixed(2) + "%"}
            </p>
          </div>
        )}
      </div>
      <div className="flex flex-col pl-[70px] pt-2 w-full">
        <p className="text-sm font-bold text-[#9e9e9e]">{opportunity.type}</p>
        <p className="text-sm font-bold ">
          Skills Required:{" "}
          {opportunity.requiredSkills
            .map((skill) => skill.skillName)
            .sort()
            .join(", ")}
        </p>
        <p className="text-sm font-bold ">Location: {opportunity.location}</p>
        <p className="text-sm font-bold ">Work Mode: {opportunity.workMode}</p>
        <p className="text-sm font-bold ">
          Duration: {opportunity.startDate} to {opportunity.endDate} (
          {getDuration(opportunity.startDate, opportunity.endDate)} months)
        </p>
        <p className="text-base w-full rounded-lg border border-gray p-4 mt-2 mb-4">
          Description:
          <br />
          {opportunity.description}
        </p>
      </div>
      {showApplyButton && (
        <div className="flex flex-row w-full justify-end">
          {!isApplied ? (
            <button
              className="w-32 h-10 bg-[#ff3d00] text-white rounded-lg"
              onClick={() => {
                setShowModal(true);
                setOpportunity(opportunity);
              }}
            >
              Apply
            </button>
          ) : (
            <button
              className="w-32 h-10 bg-gray text-white rounded-lg"
              disabled
            >
              Applied
            </button>
          )}
        </div>
      )}
    </div>
  );
}
