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

            <h1 className="text-center text-4xl font-medium mt-6">
                Terms and Conditions{" "}
            </h1>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Welcome to Dam Good Fish!</h1>
                <div>
                    By accessing or using our website, you agree to adhere to the
                    following terms and conditions. Please review them carefully.
                </div>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Ordering and Payment</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>All orders are subject to availability and acceptance.</li>
                    <li>Full payment is required prior to or at the time of delivery.</li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Product Information</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        We aim to provide accurate and up-to-date details about our raw fish
                        products.
                    </li>
                    <li>
                        However, we cannot guarantee the completeness or accuracy of all
                        information provided.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Shipping and Delivery</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Delivery times are estimates and may vary due to unforeseen
                        circumstances.
                    </li>
                    <li>Dam Good Fish is not liable for delays beyond our control.</li>
                    <li>For more details, please refer to our Shipping Policy.</li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Returns and Refunds</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Our return and refund process is detailed in our Refund Policy.
                    </li>
                    <li>
                        Please review the policy to understand the applicable conditions.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Quality Assurance</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>We take pride in offering high-quality raw fish.</li>
                    <li>
                        If you are dissatisfied with your purchase, please contact us within{" "}
                        <span className="font-semibold">1 day</span> of receipt for
                        resolution.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Privacy Policy</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Your personal information is handled in accordance with our Privacy
                        Policy.
                    </li>
                    <li>
                        By using this website, you consent to the practices described in
                        that policy.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">User Accounts</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Creating an account may be required to place an order.</li>
                    <li>
                        You are responsible for safeguarding your account credentials and
                        ensuring their confidentiality.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Prohibited Conduct</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        Users are prohibited from engaging in any unlawful, fraudulent, or
                        harmful activities while using our website.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Intellectual Property</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        All content on this website, including text, images, and designs, is
                        the property of Dam Good Fish and is protected by applicable
                        intellectual property laws.
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-6 mt-6 font-light">
                <h1 className="text-2xl font-medium mt-6">Changes to Terms</h1>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        We reserve the right to update or modify these terms at any time.
                    </li>

                    <li>
                        Any changes will take effect immediately upon being posted on the
                        website.
                    </li>
                </ul>
            </div>

            <div className="font-light mt-6">
                By using this website, you acknowledge and agree to these terms and conditions. If you have any questions or concerns, please don’t hesitate to reach out to us at <span className="font-semibold">hello@damgoodfish.com</span> .
            </div>

            <hr className="my-4" />
            <div className="mt-2 font-semibold">
                Offers Terms & Conditions:
            </div>

            <div className="mt-6">
                1. Promo code HUNGRY150 provides a flat ₹150 discount on a minimum cart value of ₹799.

                This offer is exclusively applicable on orders placed through the Damgoodfish mobile app.

                The promo code is valid for a limited period only. Damgoodfish reserves the right to withdraw, modify, or cancel the offer at its sole discretion without prior notice.

                Offer cannot be combined with any other discounts, promotions, or loyalty rewards.

                Cash on Delivery (COD) may or may not be eligible for this promotion (as per business discretion).

                If an order placed using this promo code is canceled (by the customer or Damgoodfish), the discount benefit will not be reinstated or transferred.

                Damgoodfish is not liable for any technical glitches leading to promo code failure; in such cases, customer support may be contacted.

            </div>
        </div>
    );
};

export default page;
