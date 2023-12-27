import ConnectionInvitation from "../components/connections/ConnectionInvitation";
import NetworkPanel from "../components/connections/NetworkPanel";

const ConnectionPage = () => {
  return (
    <div className="w-full h-full flex justify-center items-start bg-[#f4f2ee]">
      <div className="w-full flex flex-row justify-start items-start gap-x-4 mt-8 mx-8 lg:flex-row max-md:flex-col-reverse max-md:items-center">
        <div className="w-[25%] h-full flex flex-col justify-center items-center max-md:w-[95%]">
          <NetworkPanel />
        </div>
        <div className="w-[75%] h-full flex flex-col justify-center items-center max-md:w-[95%]">
          <ConnectionInvitation />
        </div>
      </div>
    </div>
  );
};

export default ConnectionPage;
