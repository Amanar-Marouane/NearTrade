const OAuth = () => {
    return (
        <section className="w-full flex flex-col justify-center items-center p-4 sm:p-8 md:p-12 gap-2 pb-0">
            <div className="border border-gray-300 px-6 sm:px-8 md:px-12 py-4 rounded-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] flex justify-center items-center gap-2">
                <img src="/google-icon.svg" alt="Google Icon" className="w-6 h-6 sm:w-8 sm:h-8" />
                <h3 className="text-black text-center font-bold text-sm sm:text-base">Continue With Google</h3>
            </div>
            <div className="border border-gray-300 px-6 sm:px-8 md:px-12 py-4 rounded-lg w-[90%] sm:w-[70%] md:w-[50%] lg:w-[40%] flex justify-center items-center gap-2">
                <img src="/facebook-icon.svg" alt="Facebook Icon" className="w-6 h-6 sm:w-8 sm:h-8" />
                <h3 className="text-black text-center font-bold text-sm sm:text-base">Continue With Facebook</h3>
            </div>
        </section>
    );
};

export default OAuth;