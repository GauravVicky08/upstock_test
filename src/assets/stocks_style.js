import { Dimensions, StyleSheet } from "react-native";
import AppColors from "./AppColors";

let screenWidth = Dimensions.get('screen').width;
let screenHeight = Dimensions.get('screen').height;

const stocksStyle = StyleSheet.create({
    center: {
        alignItems: 'center'
    },
    flex_center: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    header: {
        backgroundColor: AppColors.purple, height: 60, width: screenWidth,
    },
    black_font: {
        color: AppColors.black,
    },
    bold_font: {
        color: AppColors.black,
        fontWeight: '500'
    },
    title_font_16_white: {
        fontSize: 16,
        color: AppColors.white,
        fontWeight: '500'
    },
    title_font_16: {
        fontSize: 16,
        color: AppColors.black,
        fontWeight: '500'
    },
    title_font_18: {
        fontSize: 18,
        color: AppColors.black,
        fontWeight: '500'
    },
    padding_16: {
        padding: 16
    },
    margin_top_8: {
        marginTop: 8
    },
    right_end: {
        position: 'absolute', right: 16, alignItems: 'flex-end'
    },
    rowflexDirection: {
        flexDirection: 'row', width: screenWidth, alignItems: 'center',
    },
    bottom_view: {
        position: 'absolute', bottom: 0, backgroundColor: AppColors.white,
    },
    divider: {
        width: screenWidth, borderBottomWidth: 0.5, borderColor: AppColors.grey,
    }
});

export default stocksStyle

