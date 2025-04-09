import Footer from "../components/Footer"

const GuestLayout = ({ children }) => {
    return (
        <>
            {children}
            <Footer></Footer>
        </>
    )
}

export default GuestLayout