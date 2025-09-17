import React from "react";
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

            <h1 className="text-center text-4xl font-medium mt-6">About Us </h1>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <div>
                    Finding fresh fish, with good quality and natural taste shouldn’t be
                    this hard right? Yet it often is. We were frustrated with the lack of
                    options for fresh seafood in the market. Most fish delivery companies,
                    including well-known{" "}
                    <span className="font-semibold">fish delivery company</span> and local
                    vendors, rely on frozen stock that’s been stored for more than a
                    couple of days. The result? We get robbed of the real, rich, authentic
                    taste of fresh seafood.
                </div>
                <div>
                    Finally, tired of compromising, we decided to take the matter into our
                    own hands — and that’s how Dam Good Fish was brought to life. Our
                    mission, and vision was to make fresh{" "}
                    <span className="font-semibold">fish home delivery</span> accessible,
                    by bringing fresh seafood straight from the Dam to your plate!
                </div>

                <div>
                    We catch fresh fish from our own Dams that have the purest waters,
                    ensuring unmatched freshness. Once the fish is caught, we transport it
                    to our packing center on the same day where our staff follows strict
                    hygiene and quality control standards. They cut, clean, and pack it
                    with insulated bags to maintain the temperature.
                </div>
                <div>
                    As one of the{" "}
                    <span className="font-semibold">
                        best fish home delivery services
                    </span>{" "}
                    , we offer our customers the convenience of choosing their preferred
                    delivery time slots — so they get the freshest catch exactly when they
                    want it. That’s how we ensure that you get to taste fresh seafood
                    everyday. At Dam Good Fish, we want to create a revolution so that
                    people don’t have to compromise on the quality of the seafood they
                    consume.
                </div>
            </div>

            <div className="font-light mt-6">
                Our Values :
            </div>

            <div className="font-light mt-6">
                <ul className="list-disc pl-6 space-y-8">
                    <li>
                        Dedicated to Natural Seafood
                        <p className="mt-4">
                            At Dam Good Fish, we are dedicated to providing our customers with
                            completely natural seafood. To make this a reality, we source our fish
                            straight from the purest dam waters. We don’t use any chemicals,
                            antibiotics, and our fish are not force fed.
                        </p>
                    </li>

                    <li>
                        Customer Satisfaction
                        <p className="mt-4">
                            Customer care is one of the most critical aspects of our business. We
                            ensure that our customers are satisfied every time they order from our
                            website or app, by providing them with the <span className="font-semibold">best fish delivery service</span> .
                            In case they face any problem or queries, our in-house customer service
                            team is always available to answer.
                        </p>
                    </li>

                    <li>
                        Sustainability
                        <p className="mt-4">
                            A dam is a natural reservoir for the growth of a different variety of fish. Other ecosystems like ponds or lakes are stagnant and much smaller compared to the flowing Dam water and that is why they should be preserved.
                        </p>
                    </li>
                </ul>
            </div>


            <div className="font-light mt-6">
                On the other hand, fishing from a Dam is well regulated and doesn’t threaten smaller natural ecosystems. That’s why at Dam Good Fish, we source fish straight from the Dam in  a natural way and deliver it straight to you. We do this by keeping sustainability in mind.


            </div>

        </div>
    );
};

export default page;
