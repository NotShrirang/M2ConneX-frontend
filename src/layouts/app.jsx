import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import Nav from "../components/Nav";
const App_Layout = () => {
    return (
        <div className="h-screen">
            <Header />
            <Nav />
            <Outlet />
            <Footer />
        </div>
    );
};

export default App_Layout;