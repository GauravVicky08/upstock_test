import { Text, View } from "react-native";
import stocksStyle from "../assets/stocks_style";

const Stocks = (props) => {

    let item = props.data;
    let currentPrice = item.ltp * item.quantity;
    let investmentValue = item.avgPrice * item.quantity;
    let pl = Number((currentPrice - investmentValue).toFixed(2));
    //console.log("Inside stocks", JSON.stringify(item))
    return (
        <View style={{ backgroundColor: "#fff", }}>
            <View style={[stocksStyle.rowflexDirection, stocksStyle.padding_16]}>
                <View>
                    <Text style={stocksStyle.title_font_16}>{item.symbol}</Text>
                    <Text style={[stocksStyle.black_font, stocksStyle.margin_top_8]}>{item.quantity}</Text>
                </View>

                <View style={stocksStyle.right_end}>
                    <Text style={stocksStyle.black_font}>LTP: ₹
                        <Text style={stocksStyle.bold_font}>{item.ltp}</Text>
                    </Text>
                    <Text style={[stocksStyle.black_font, stocksStyle.margin_top_8]}>P/L: ₹
                        <Text style={stocksStyle.bold_font}>{pl}</Text>
                    </Text>
                </View>
            </View>

            <View style={stocksStyle.divider} />
        </View>
    );
}

export default Stocks
