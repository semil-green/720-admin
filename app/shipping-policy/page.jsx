import React from 'react'
import Image from "next/image";

const page = () => {
    return (
        <div className=" mx-4 lg:mx-44 my-8 lg:my-12">
            <div className="flex justify-center ">
                <Image
                    src={"/images/dgf-full-logo.webp"}
                    height={150}
                    width={150}
                    alt="logo"
                />
            </div>

            <h1 className="text-center text-4xl font-medium mt-6">Shipping policy</h1>

            <div className="font-semibold    mt-6">
                Order Processing:
            </div>
            <div className="font-light mt-6">
                <ul className="list-disc pl-10 space-y-4">
                    <li className=''>
                        Orders are processed as soon as you place an order and delivered on your preferred date and slot.
                    </li>
                    <li>
                        Cut-off time for same-day processing is 6PM.  Orders placed after this time will be processed the next business day.
                    </li>
                </ul>
            </div>



            <div className="font-semibold    mt-6">
                Packaging:
            </div>
            <div className="font-light mt-6">
                <ul className="list-disc pl-10 space-y-4">
                    <li>
                        Our products are vacuum sealed and optimal temperature is maintained during the transit.
                    </li>
                    <li>
                        Each order is carefully packed to prevent leaks and ensure freshness.
                    </li>
                </ul>
            </div>

            <div className="font-semibold    mt-6">
                Delivery:
            </div>
            <div className="font-light mt-6">
                <ul className="list-disc pl-10 space-y-4">
                    <li>
                        <span className='font-semibold'>Express Delivery:</span>  Enjoy prompt and reliable service, with our team dedicated to getting your order to you swiftly.
                    </li>
                    <li>
                        <span className='font-semibold'>Cold Chain Assurance: </span> Our specialized packaging guarantees the freshness of your raw fish, maintaining the perfect temperature throughout the journey.

                    </li>
                </ul>
            </div>

        </div>
    )
}

export default page