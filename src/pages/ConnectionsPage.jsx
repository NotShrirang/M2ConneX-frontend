import PeopleRecommendation from "../components/PeopleRecommendation";
import ConnectionInvitation from "../components/connections/ConnectionInvitation";
import NetworkPanel from "../components/connections/NetworkPanel";

const ConnectionPage = () => {
  return (
    <div className="w-full min-h-full flex justify-center items-start bg-[#f4f2ee]">
      <div className="w-full flex flex-row justify-center items-start gap-x-8 my-8 mx-8 lg:flex-row max-md:flex-col max-md:items-center max-md:gap-y-4">
        <div className="w-[25%] h-full flex flex-col justify-center items-center max-md:w-[95%]">
          <NetworkPanel />
        </div>
        <div className="w-[65%] h-full flex flex-col justify-center items-center gap-y-4 max-md:w-[95%]">
          <ConnectionInvitation />
          <PeopleRecommendation flex="wrap" />
        </div>
      </div>
    </div>
  );
};

export default ConnectionPage;
