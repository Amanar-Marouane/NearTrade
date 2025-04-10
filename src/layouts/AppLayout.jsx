import Footer from "../components/Footer";
import Header from "../components/Header";

const AppLayout = ({ children }) => {
    return (
        <>
            <Header></Header>
            {children}
            <Footer></Footer>
        </>
    )
}

export default AppLayout