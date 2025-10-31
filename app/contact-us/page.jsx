import React from "react";
import Image from "next/image";

const page = () => {
    return (
        <div className=" mx-4 lg:mx-44 my-8 lg:my-12">
            <div className="flex justify-center ">
                <Image
                    src={"/new-logo.png"}
                    height={150}
                    width={150}
                    alt="logo"
                />
            </div>

            <h1 className="text-center text-4xl font-medium mt-6">Contact Us </h1>

            <div className="flex flex-col gap-6 mt-10 font-semibold px-0 lg:px-48">
                <div>Whatsapp: +91 9899783300</div>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-semibold px-0 lg:px-48">
                <div>Mail us at: hello@damgoodfish.com</div>
            </div>

            <div className="flex flex-col gap-2 mt-6 font-semibold px-0 lg:px-48">
                <div>Headquarter: Dam Good Fish Pvt. Ltd.</div>
                <div>
                    BLM Tower, 7th Floor, Plot No. 63, Sector 44 Rd, Kanhai Colony,
                    Gurugram, Haryana 122003
                </div>
            </div>
        </div>
    );
};

export default page;
