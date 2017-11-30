/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    ListView,
    TouchableOpacity,
    Image,
    AlertIOS
} from 'react-native';

const instructions = Platform.select({
    ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
    android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

let Car = require('./Car.json');

export default class App extends Component<{}> {

    constructor() {
        super();

        let getSelectionData = (dataBlob, sectionID) => {
            return dateBlob[sectionID];
        };

        let getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID]
        };

        this.state = {
            dataSource: new ListView.DataSource({
                getSelectionData: getSelectionData,// 获取组中的数据
                getRowData: getRowData,// 获取行中数据
                rowHasChanged: (r1, r2) => r1 !== r2,
                sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
            })
        }
    }

    componentDidMount() {
        // 调用json数据
        this.loadDataFromJson();
    }

    loadDataFromJson() {
        // 获取json数据
        let jsonData = Car.data;
        // 定义需要的变量
        let dataBlob = {},
            sectionIDs = [],
            rowIDs = [],
            cars = [];
        // 遍历
        for (let i = 0; i < jsonData.length; i++) {
            // 放置组号
            sectionIDs.push(i);
            // 放置组中的内容
            dataBlob[i] = jsonData[i].title;
            // 取出所有组的详细内容
            cars = jsonData[i].cars;
            rowIDs[i] = [];
            // 遍历所有详细内容
            for (let j = 0; j < cars.length; j++) {
                // 放入行号
                rowIDs[i].push(j)
                // 放入每一行的内容
                dataBlob[i + ':' + j] = cars[j];
            }
        }
        // 更新状态
        this.setState({
            dataSource: this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs)
        })
    }


    render() {
        return (
            <View>
                <View style={styles.titleStyle}>
                    <Text style={styles.titleTextStyle}>小码哥旗下品牌</Text>
                </View>

                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow}
                    renderSectionHeader={this.renderSectionHeader}
                />
            </View>

        );
    }

    // 每一行的数据
    renderRow(rowData) {
        return (
            <TouchableOpacity activeOpacity={0.5} onPress={() => App.itemClick(rowData)}>
                <View style={styles.rowStyle}>
                    <Image source={{uri: rowData.icon}} style={styles.imageStyle}/>
                    <Text style={styles.nameStyle}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    static itemClick(rowData) {
        AlertIOS.alert(rowData.name)
    }

    // 每一组的数据
    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.headerStyle}>
                <Text style={styles.headerTextStyle}>{sectionData}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleStyle: {
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        backgroundColor: 'orange'
    },
    titleTextStyle: {
        fontSize: 30
    },
    imageStyle: {
        width: 70,
        height: 70,

    },
    headerStyle: {
        backgroundColor: '#e8e8e8',
        paddingLeft: 10,
    },
    headerTextStyle: {
        fontSize: 15,
        paddingTop: 5,
        paddingBottom: 5
    },
    rowStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#e8e8e8'
    },
    nameStyle: {
        marginLeft: 10
    }
});
