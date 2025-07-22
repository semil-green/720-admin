import React from 'react'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import PinCodeTable from './PinCodeTable';


const PincodeSlotForm = () => {

    const storePcCenter = [
        {
            name: "Surat Branch",
            code: "SB01",
            cityId: "Bengaluru",
        },
        {
            name: "South Surat Branch",
            code: "SSB02",
            cityId: "Bengaluru",
        }
    ]

    const pinCodes = [
        {
            name: "345464"
        },
        {
            name: "565464"
        },
        {
            name: "355558"
        },
        {
            name: "956753"
        },
        {
            name: "236344"
        },
    ]

    const pinCodeSLot = [
        {
            slot: "slot 1",
            from: "08:00 AM",
            to: "09:00 AM"
        },
        {
            slot: "slot 2",
            from: "10:00 AM",
            to: "11:00 AM"
        },
        {
            slot: "slot 3",
            from: "11:00 AM",
            to: "12:00 PM"
        },
        {
            slot: "slot 4",
            from: "01:00 PM",
            to: "02:00 PM"
        },
        {
            slot: "slot 5",
            from: "02:00 PM",
            to: "03:00 PM"
        },
    ]

    return (
        <div className='bg-white border rounded-md shadow px-4 py-4 '>

            <div className='flex gap-4  items-center'>
                <div  >
                    Store / PC
                </div>
                <div className='w-[50%]'>

                    <Select defaultValue={''}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a packagin store or Dark Store" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                storePcCenter?.map((item, index) => (
                                    <SelectItem key={index}>
                                        {item.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className='mt-4 flex  items-center gap-4'>
                <div className='w-20'>Pin Code</div>
                <div className='w-[50%]'>
                    <Select defaultValue={''}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Pin Code" />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                pinCodes?.map((item, index) => (
                                    <SelectItem key={index}>
                                        {item.name}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </Select>
                </div>
            </div>


            <h4 className='font-semibold text-lg mt-6'>Schedule Slots</h4>

            <div className='flex mt-4 gap-4'>
                <div >
                    <Label className='pb-1'>Slot Name</Label>
                    <Input name="" placeholder="Slot Name" />
                </div>
                <div >
                    <Label className='pb-1'>From</Label>
                    <Input name="" placeholder="Slot Name" type="time" />
                </div>
                <div >
                    <Label className='pb-1'>To</Label>
                    <Input name="" placeholder="Slot Name" type="time" />
                </div>
            </div>

            <div className='flex justify-center mt-4'>

                <Button className='cursor-pointer '>Add</Button>
            </div>

            <PinCodeTable pinCodeSLot={pinCodeSLot} />
        </div>
    )
}

export default PincodeSlotForm