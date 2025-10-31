import React from 'react'
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

            <h1 className="text-center text-4xl font-medium mt-6">Refund Policy </h1>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <div>
                    Due to the perishable nature of our products, we do not accept returns. However, we guarantee the quality of our raw fish upon delivery. If you encounter any issues, contact our customer service team within 24 hours with photos and details.

                </div>
            </div>
        </div>
    )
}

export default page