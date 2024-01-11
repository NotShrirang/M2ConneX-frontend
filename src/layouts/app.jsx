import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const App_Layout = () => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default App_Layout;