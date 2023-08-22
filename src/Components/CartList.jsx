import React, { useState, useEffect } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Cartnav from './Cartnav';
import axios from 'axios';
import TabPanel from './TabPanel';
import { Skeleton } from '@mui/material';

const theme = createTheme({
    typography: {
        fontFamily: "'Lora', sans-serif",
    },
    palette: {
        primary: {
            main: '#FF0000',
        },
    },
});

function CartList() {
    const [value, setValue] = useState(0);
    const [apiResponse, setApiResponse] = useState(null);
    const [selectedCategoryDishes, setSelectedCategoryDishes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('https://run.mocky.io/v3/a67edc87-49c7-4822-9cb4-e2ef94cb3099')
            .then(response => {
                setApiResponse(response.data);
                setSelectedCategoryDishes(response.data[0].table_menu_list[0].category_dishes);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching API:', error);
                setLoading(false);
            });
    }, []);

    const handleCategoryChange = (newValue, categoryDishes) => {
        setValue(newValue);
        setSelectedCategoryDishes(categoryDishes);
    };

    return (
        <>
            <Cartnav loading={loading} />
            <div className="flex flex-col max-w-7xl m-auto md:py-3 px-0">
                <ThemeProvider theme={theme}>
                    {loading ? (
                        Array.from({ length: 8 }).map((_, index) => (
                            <div className="px-2"> <Skeleton key={index} variant="rectangular" width="100%" height={50} animation="wave" className='my-5 rounded-xl ' /></div>

                        ))
                    ) : (
                        <div className='bg-white'>

                            <Tabs
                                value={value}
                                onChange={(event, newValue) => handleCategoryChange(newValue, apiResponse[0].table_menu_list[newValue].category_dishes)}
                                variant="scrollable"
                                textColor="primary"
                                indicatorColor="primary"
                                scrollButtons={false}
                                aria-label="scrollable prevent tabs example"
                                className="bg-white "
                            >

                                {apiResponse && apiResponse.length > 0 &&
                                    apiResponse[0].table_menu_list.map((category, index) => (
                                        <Tab
                                            key={index}
                                            label={category.menu_category}
                                            className=" !font-bold text-xs md:text-base 
                                            py-2 px-3 md:px-4 whitespace-nowrap  sm:px-2 sm:py-1 
                                            sm:text- lg:px-4 lg:py-2
                                            lg:whitespace-normal lg:truncate lg:w-1/4"
                                        />
                                    ))}
                            </Tabs>
                            {apiResponse && apiResponse.length > 0 &&
                                apiResponse[0].table_menu_list.map((category, index) => (
                                    <TabPanel
                                        key={index}
                                        value={value}
                                        index={index}
                                        selectedCategoryDishes={selectedCategoryDishes}
                                        
                                    />
                                ))}

                        </div>
                    )}

                </ThemeProvider>
            </div>
        </>
    );
}

export default CartList;
