import MainLayout from '@/components/layout/mainLayout'
import React from 'react'
import { Users, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image';


const page = () => {
    return (
        <MainLayout>
            <div className='bg-sidebar'>
                <div className='flex justify-between items-end'>
                    <div className="flex items-center gap-2">
                        <Link href={"/orders"}>
                            <Users className="text-gray-700" />
                        </Link>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                        <h2 className="font-semibold text-xl">Create order</h2>
                    </div>
                </div>


                {/* left side content */}
                <div className='grid grid-cols-3 mt-6 gap-4'>
                    <div className='col-span-2  bg-white '>
                        <div className='border shadow rounded-md px-4 py-4'>
                            <div>
                                <h4 className='font-medium'>Products</h4>

                                <div className='grid grid-cols-4 gap-2 mt-2'>

                                    <div className='col-span-2'>
                                        <Input defaultValue="" placeholder='Search Products' className='' />
                                    </div>
                                    <div className='col-span-1 '>
                                        <Button className='cursor-pointer w-full border shadow  ' variant={'secondary'}>Browse</Button>
                                    </div>
                                    <div className='col-span-1'>
                                        <Button className='cursor-pointer border shadow' variant={'secondary'}>Add Custom item</Button>
                                    </div>
                                </div>
                            </div>

                            <div className='grid grid-cols-4 mt-4'>
                                <div className='col-span-2 font-semibold'>Product</div>
                                <div className='col-span-1 font-semibold px-2'>Quantity</div>
                                <div className='col-span-1 font-semibold px-2'> Total</div>
                            </div>

                            <div className='grid grid-cols-4 mt-4'>
                                <div className='col-span-2 font-semibold flex gap-2'>
                                    <Image src={"/images/fish-image.png"} height={20} width={50} />

                                    <p>Achari sole boneless cubes nt Wt 300g(7-9 pcs)</p>
                                </div>
                                <div className='col-span-1 font-semibold px-2'><Input defaultValue="" placeholder='2' className='' /></div>
                                <div className='col-span-1 font-semibold px-2 '>₹ 750.00</div>
                            </div>

                        </div>


                        <div className='mt-4 border shadow rounded-md px-4 py-4'>
                            <h4 className='font-medium'>Products</h4>

                            <div className='grid grid-cols-3 px-4 py-2 border rounded-md gap-2 mt-2'>

                                <div className='col-span-1'>Subtotal</div>
                                <div className='col-span-1'>1 item</div>
                                <div className='col-span-1'>₹ 750.00</div>

                                <div className='col-span-1'>Add Discount</div>
                                <div className='col-span-1'>-</div>
                                <div className='col-span-1'>-</div>

                                <div className='col-span-1'>Add Shipping or Delivery</div>
                                <div className='col-span-1'>-</div>
                                <div className='col-span-1'>₹  0.00</div>

                                <div className='col-span-1'>Estimated Tax</div>
                                <div className='col-span-1'>SGST + CGST 12% (included)</div>
                                <div className='col-span-1'>₹ 80.36</div>

                                <div className='col-span-1'>Total</div>
                                <div className='col-span-1'></div>
                                <div className='col-span-1'>₹ 750.00</div>

                            </div>
                        </div>

                        <div className='border shadow rounded-md px-4 py-4 mt-4'>
                            <div className="flex items-center space-x-4">
                                <input type="checkbox" name="example" value="2" className="form-radio text-blue-600" />
                                <span className='font-semibold'>Payment due later</span>
                            </div>

                            <div className='flex justify-end gap-4'>
                                <Button className='cursor-pointer  border shadow  ' variant={'secondary'}>Send Invoice</Button>
                                <Button className='cursor-pointer  border shadow  ' variant={'default'}>Mark as Paid</Button>
                            </div>

                        </div>


                    </div>

                    {/* right side content */}
                    <div className='col-span-1 bg-white'>

                        <div className='border shadow rounded-md px-4 py-4 '>
                            <span className='font-semibold'> Notes </span>
                            <p className='mt-4'>No Notes</p>
                        </div>

                        <div className='border shadow rounded-md px-4 py-4 mt-4 '>
                            <span className='font-semibold'>  Customer </span>
                            <Input defaultValue="" placeholder='Search or create a customer' className='mt-2' />
                        </div>

                        <div className='border shadow rounded-md px-4 py-4 mt-4 '>
                            <span className='font-semibold'>  Market </span>
                            <p className='mt-4'>Pricing</p>
                            <p className='mt-4'>India (INR ₹) </p>
                        </div>

                        <div className='border shadow rounded-md px-4 py-4 mt-4 '>
                            <span className='font-semibold'>  Tags </span>
                            <Input defaultValue="" placeholder='' className='mt-2' />
                        </div>

                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default page