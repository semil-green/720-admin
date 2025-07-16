"use client"
import MainLayout from '@/components/layout/mainLayout'
import { Button } from '@/components/ui/button'
import React from 'react'
import { Users } from 'lucide-react';
import CustomerTable from '@/components/customers/CustomerTable';

const page = () => {
    return (
        <MainLayout>

            {/* <div>customer page</div> */}
            <div className="space-y-4">
                <div className="flex justify-between items-end ">
                    <div className='flex  gap-3'>
                        <Users />
                        <h1 className='font-semibold text-xl'>Customers</h1>
                    </div>
                    <div className='flex gap-3'>
                        <Button className='cursor-pointer' variant={'secondary'}>Export</Button>
                        <Button className='cursor-pointer' variant={'secondary'}>Import</Button>
                        <Button className='cursor-pointer' variant={'secondary'}>More Actions</Button>
                        <Button className='cursor-pointer'>Add Customer</Button>
                    </div>
                </div>

                <div className=' flex justify-between items-end px-2 py-2 rounded border shadow	'>

                    <div className=' flex gap-4'>
                        <div><span className='font-semibold text-base'>6528</span><span className='pl-2 text-sm'>customers</span> </div>
                        <div><span className='font-semibold text-base'>100%</span> <span className='pl-2 text-sm'>of your customer base</span> </div>
                    </div>
                    <div>
                        <div className="relative inline-block group">
                            <button
                                className="h-8 px-4 py-2 has-[>svg]:px-3 bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 inline-flex items-center rounded-md"
                            >
                                Menu
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            <div
                                className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all origin-top duration-200 pointer-events-none group-hover:pointer-events-auto"
                            >
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 1</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 2</a>
                                <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Option 3</a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <UserTable data={users} onDelete={handleDelete} /> */}

                <CustomerTable />
            </div>
        </MainLayout>
    )
}

export default page