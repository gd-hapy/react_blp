import react from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CustomButton } from './CustomButton';
import { getHomeRequestData } from '../services/homeService';
import CustomLoading from './CustomLoading';

export default class CustomHotSearch extends react.Component {

    state = {
        list: null,
        loadDataFinished: false,
    }

    constructor(props) {
        super(props)
    }
    componentDidMount() {
        getHomeRequestData().then((res) => {
            this.setState({
                list: res,
                loadDataFinished: true
            })
        });
    }

    onPress = (e) => {
        // this.props.navigation.navigate('two');
        // print(thi.props)
        console.log("CustomHotSearch->onPress:" + e)

        let type = 0;// type{ 0:搜索  1:排行榜 }
        if (e.includes("热门搜索")) {
            return
        }
        if (e.includes('更多')) {
            type = 1
        }
        debugger
        this.props.navigate('SearchResultsPage',
            { "type": type, "keyword": e },
        )
    }
    handleClick = () => {
        onButtonClick('子组件的数据!');
    };


    render() {
        return (
            <View style={styles.container}>
                <CustomLoading showSpinner={!this.state.loadDataFinished}></CustomLoading>

                {this.state.list != null ? this.state.list.map((item, index) => (
                    <CustomButton key={index} onPress={() => this.onPress(item)} text={item} borderStyle={0} style={styles.btn}></CustomButton>
                )) : <Text></Text>}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        height: 200
    },
    btn: {
        padding: 0,
        marginLeft: 20,
        marginTop: 20
    }
})