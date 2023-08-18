import React from 'react'
import { HiMiniShoppingCart } from "react-icons/hi2";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useCart } from './CartContext';
import { Skeleton } from '@mui/material';

function Cartnav({ loading }) {
    const { getTotalQuantity } = useCart();
    return (
        <div className="flex flex-col max-w-7xl m-auto py-5 px-4">
            <div className="flex flex-row justify-between items-center">
                <div className="flex flex-row items-center gap-3">
                    <AiOutlineArrowLeft
                        className="cursor-pointer md:hidden hover:text-gray-500"
                    />
                    <h3 className="font-semibold text-sm md:text-[1.3rem] text-gray-700">
                        {loading ? <Skeleton variant="text" width={120} height={20} /> : 'UNI Resto Cafe'}
                    </h3>
                </div>
                <div className="flex flex-row items-center gap-3">
                    <span className="text-bold text-sm md:text-lg">{loading ? <Skeleton variant="text" width={80} height={20} /> : 'My Orders'}</span>
                    {loading ? <Skeleton  variant="circular" width={30} height={30}/> : <div className="relative">
                        <HiMiniShoppingCart className="text-lg md:text-4xl" />
                        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-4 md:w-5 h-4 md:h-5 bg-red-500 rounded-full text-white text-xs">
                            {getTotalQuantity()}
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    )
}

export default Cartnav