import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
const App_Layout = () => {
    return (
        <div className="h-screen">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default App_Layout;