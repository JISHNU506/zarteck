import React from 'react';
import nonVeg from "../assets/icons8-non-vegetarian-food-symbol-48.png"
import Veg from "../assets/icons8-vegetarian-48.png"
import { useCart } from './CartContext';

const TabPanel = ({ value, index, selectedCategoryDishes }) => {
    const { cartItems, addToCart, removeFromCart } = useCart(); 
    return (
        <div
            className='w-full  items-center justify-center'
            role="tabpanel"
            hidden={value !== index}
            id={`tab-panel-${index}`}
            aria-labelledby={`tab-${index}`}
        >
            {value === index && (
                <div className='flex flex-col'>
                    {selectedCategoryDishes.map((dish, dishIndex) => (
                        <div
                            className={`flex flex-row items-center justify-between py-2 px-2 md:px-4 w-full border-t-2 border-gray-400 ${dishIndex === selectedCategoryDishes.length - 1 ? 'border-b-2' : ''}`}
                        >
                            <div className="flex flex-row w-[55%] md:w-[70%]">  <div className='flex items-start text-[10px] md:text-xl  w-full font-semibold gap-2 md:gap-4'>{dish.dish_Type === 2 ? <img src={Veg} alt="" className='w-[14px] md:w-[20px]' /> : <img src={nonVeg} alt="" className=' w-[14px] md:w-[20px]' />}
                                <div className="flex flex-col w-full">
                                    <span>{dish?.dish_name}</span>
                                    <span className='md:text-[14px] text-[8px] '>{dish?.dish_currency} &nbsp; {dish?.dish_price}</span>
                                    <p className='text-gray-500 pt-1 font-normal md:text-sm text-[8px] w-[95%] md:w-[90%]'>{dish?.dish_description}</p>
                                    {dish.dish_Availability ? (<div className='flex flex-row justify-start items-center pt-1'>
                                        <button variant="contained" size="small" className='!rounded-l-2xl py-[1px] md:py-[2px] px-2 md:px-3 !bg-green-500 text-[12px] md:text-sm text-white' onClick={() => removeFromCart(dishIndex)}>
                                            -
                                        </button>
                                        <button variant="contained" size="small" className='!rounded-none py-[1px] md:py-[2px] px-2 md:px-3 !bg-green-500 text-[12px] md:text-sm text-white'>
                                            {cartItems[dishIndex] || 0}
                                        </button>
                                        <button onClick={() => addToCart(dishIndex)} variant="contained" size="small" className='!rounded-r-2xl py-[1px] md:py-[2px] px-2 md:px-3 !bg-green-500 text-[12px] md:text-sm text-white'>
                                            +
                                        </button>

                                    </div>) : <p className='text-red-500 md:text-sm text-[12px] font-semibold md:my-2'>Not Avilable</p>}
                                    {dish.addonCat.length > 1 && (
                                        <p className="text-red-500 text-[10px] md:text-sm mt-1 ">Customization Available</p>
                                    )}
                                </div>
                            </div>
                            </div>
                            <div className="flex flex-row pl-2 items-center justify-end md:justify-between md:gap-10 gap-2 w-[46%] md:w-[30%] relative"><span className='text-[8px] md:text-lg font-semibold absolute left-0  md:static'>{dish?.dish_calories
                            } Calories</span><img src={dish?.dish_image} className='!h-[70px] w-[70px] md:!h-[80px] md:w-[95px] rounded-lg object-fill' alt="" /></div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TabPanel;
