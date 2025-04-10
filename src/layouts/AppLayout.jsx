import Footer from "../components/Footer";
import Header from "../components/Header";
import UserContext from "../context/UserContext";

const AppLayout = ({ children }) => {
    return (
        <UserContext>
            <Header></Header>
            {children}
            <Footer></Footer>
        </UserContext>
    )
}

export default AppLayout