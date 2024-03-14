import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { StocksList } from './api_call/api_service';
import Stocks from './components/Stocks';
import AppColors from './assets/AppColors';
import stocksStyle from './assets/stocks_style';

const App = () => {

    const [loading, setLoading] = useState(false);
    const [stocksData, setStocksData] = useState(null);
    const [showTodaysStock, setShowTodaysStock] = useState(false);
    const [currentValue, setCurrentValue] = useState(0);
    const [totalInvestment, setTotalInvestment] = useState(0);
    const [todayPL, setTodayPL] = useState(0);
    const [pl, setPL] = useState(0);

    useEffect(() => {
        getStocksList();
    }, []);

    const getStocksList = async () => {
        setLoading(true);
        const stocksList = await StocksList();
        //console.log(JSON.stringify(stocksList));
        setStocksData(stocksList.userHolding);
        await calculateStock(stocksList.userHolding);
        setLoading(false);
    }

    const calculateStock = async (stocksData) => {
        let currentPrice = 0;
        let currentTotalValue = 0; // Current Value

        let investmentValue = 0;
        let investmentTotalValue = 0; // Total Investment

        let PNL = 0;
        let todaysPNL = 0; // Today's Profit & Loss

        let totalPL = 0; // Profit & Loss

        for (let i = 0; i < stocksData.length; i++) {
            currentPrice = Number((stocksData[i].ltp * stocksData[i].quantity).toFixed(2));
            currentTotalValue += currentPrice;
            //console.log(currentTotalValue)

            investmentValue = Number((stocksData[i].avgPrice * stocksData[i].quantity).toFixed(2));
            investmentTotalValue += investmentValue;

            PNL = Number(((stocksData[i].close - stocksData[i].ltp) * stocksData[i].quantity).toFixed(2));
            todaysPNL += PNL;

            totalPL = Number((currentTotalValue - investmentTotalValue).toFixed(2));
        }

        setCurrentValue(currentTotalValue);
        setTotalInvestment(investmentTotalValue);
        setTodayPL(todaysPNL);
        setPL(totalPL);
    }

    const setViewStock = (todaysStock) => {
        if (!todaysStock) {
            setShowTodaysStock(true);
        } else {
            setShowTodaysStock(false);
        }
        //console.log(showTodaysStock)
    }

    return (
        <View style={{ flex: 1, backgroundColor: AppColors.darkGrey }}>

            {/*Header*/}
            <View style={[stocksStyle.header, stocksStyle.padding_16]}>
                <Text style={stocksStyle.title_font_16_white}>Upstox Holding</Text>
            </View>

            {/*Stock List*/}
            {loading ?
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <ActivityIndicator size={'large'} color={AppColors.black} />
                </View>
                :
                <View>
                    {stocksData?.length == 0 ?
                        <View style={stocksStyle.flex}>
                            <Text style={styles.noData}>
                                No Data found!
                            </Text>
                        </View>
                        :
                        <FlatList
                            data={stocksData}
                            renderItem={({ item, index }) => (
                                <Stocks data={item} />
                            )}
                            onEndReachedThreshold={0.01}
                        />
                    }

                </View>
            }

            {/*Bottom View*/}
            {(!loading && stocksData?.length > 0) &&
                <TouchableOpacity
                    onPress={() => setViewStock(showTodaysStock)}
                    style={[stocksStyle.bottom_view, stocksStyle.padding_16, stocksStyle.center]}>

                    {!showTodaysStock ?
                        <Image source={require('./assets/images/up_arrow.png')} style={{ width: 24, height: 20, marginTop: -16, }} resizeMode='contain' />
                        :
                        <Image source={require('./assets/images/down_arrow.png')} style={{ width: 24, height: 20, marginTop: -16, }} resizeMode='contain' />
                    }

                    {showTodaysStock &&
                        <View>
                            <View style={[stocksStyle.rowflexDirection, stocksStyle.margin_top_8]}>
                                <Text style={stocksStyle.title_font_18}>Current Value:</Text>
                                <Text style={[stocksStyle.black_font, stocksStyle.right_end, stocksStyle.padding_16]}>₹{currentValue}</Text>
                            </View>

                            <View style={[stocksStyle.rowflexDirection, stocksStyle.margin_top_8]}>
                                <Text style={stocksStyle.title_font_18}>Total Investment:</Text>
                                <Text style={[stocksStyle.black_font, stocksStyle.right_end, stocksStyle.padding_16]}>₹{totalInvestment}</Text>
                            </View>

                            <View style={[stocksStyle.rowflexDirection, stocksStyle.margin_top_8]}>
                                <Text style={stocksStyle.title_font_18}>Today's Profit & Loss:</Text>
                                <Text style={[stocksStyle.black_font, stocksStyle.right_end, stocksStyle.padding_16]}>₹{todayPL}</Text>
                            </View>
                        </View>
                    }

                    <View style={[stocksStyle.rowflexDirection, stocksStyle.margin_top_8]}>
                        <Text style={stocksStyle.title_font_18}>Profit & Loss:</Text>
                        <Text style={[stocksStyle.black_font, stocksStyle.right_end, stocksStyle.padding_16]}>₹{pl}</Text>
                    </View>
                </TouchableOpacity>
            }

        </View >
    )
}

export default App