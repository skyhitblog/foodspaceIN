/**
 * Created by InspireUI on 03/03/2017.
 */
import React from 'react';
import PropTypes from 'prop-types'
import {View, Text, StyleSheet, Modal, Platform, ListView} from 'react-native';
import {connect} from 'react-redux';

import {Button} from '@components';
import {Styles, Color} from "@common";
import CategoryRow from './CategoryRow';

class SubCategoryPicker extends React.Component {
    constructor(props) {
        super(props);
        const {selectedCategory} = this.props;
        this.state = {tempCategory: selectedCategory};

        this.renderRow = this.renderRow.bind(this);
        this.onSelectPressHandle = this.onSelectPressHandle.bind(this);
        this.dataSource = new ListView.DataSource({rowHasChanged: (cate1, cate2) => cate1.id !== cate2.id});
        this.onShow = () => this.setState({selectId: selectedCategory});
    }

    render() {
        //const {} = this.state;
        const {visible, closeModal, subCategories} = this.props;
        return (
            <Modal
                animationType={'fade'}
                transparent={true}
                visible={visible}
                onRequestClose={closeModal}
                onShow={this.onShow}
            >
                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <View style={styles.titleWrap}>
                            <Text style={styles.title}>Categories</Text>
                        </View>
                        <View style={styles.listViewWrap}>
                            <ListView
                                dataSource={this.dataSource.cloneWithRows(subCategories)}
                                renderRow={this.renderRow}
                                enableEmptySections={true}
                            />
                        </View>
                        <View style={styles.row}>
                            <Button text={'Cancel'}
                                    style={styles.cancelContainer}
                                    textStyle={styles.cancelText}
                                    onPress={closeModal}/>  
                            <Button text={'Select'}
                                    style={styles.selectContainer}
                                    textStyle={styles.selectText}
                                    onPress={this.onSelectPressHandle}/>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }

    renderRow(category) {
        const {tempCategory} = this.state;
        const {mainCategory} = this.props;
        const onPress = () => this.setState({tempCategory: category});

        return (<CategoryRow
            category={category}
            isSelect={tempCategory.id === category.id}
            isFirst={mainCategory.id === category.id}
            onPress={onPress}/>);
    }

    onSelectPressHandle() {
        const {closeModal, setSelectedCategory, selectedCategory} = this.props;
        const {tempCategory} = this.state;
        if (tempCategory.id !== selectedCategory.id) {
            setSelectedCategory(tempCategory);
        }
        closeModal();
    }
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: Styles.width / 10,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    subContainer: {
        backgroundColor: Color.background,
        borderRadius: 10,
        ...Platform.select({
            ios: {},
            android: {
                elevation: 4,
            },
        }),
    },
    titleWrap: {
        ...Styles.Common.ColumnCenter,
        padding: 20,
        backgroundColor: Color.navigationBarColor,
        borderTopLeftRadius: 10, borderTopRightRadius: 10
    },
    title: {
        fontWeight: '500',
        color: Color.black,
        fontSize: Styles.FontSize.medium,
    },
    listViewWrap: {
        maxHeight: Styles.height / 2,
        paddingHorizontal: 3,
    },
    selectContainer: {
        padding: 15,
        backgroundColor: "rgba(0,145,234,1)",
        borderWidth: 0.5,
        borderColor: "#FFF",
        flex: 1,
        borderBottomRightRadius: 10,
    },
    selectText: {
        color: "white",
        fontSize: 14,
    },
    cancelContainer: {    
        padding: 15,
        backgroundColor: "#eee",
        flex: 1,
        borderBottomLeftRadius: 10,
    },
    cancelText: {
        color: "rgba(0,0,0,1)",
        fontSize: 14,
    },
    row: {
        flexDirection : 'row',
    }
});

SubCategoryPicker.propTypes = {
    visible: PropTypes.bool,
    closeModal: PropTypes.func,
    mainCategory: PropTypes.object,
    subCategories: PropTypes.array,
};
SubCategoryPicker.defaultProps = {
    visible: false,
};

const mapStateToProps = (state) => {
    return {
        categories: state.categories,
        selectedCategory: state.categories.selectedCategory
    };
};

function mergeProps(stateProps, dispatchProps, ownProps) {
    const {categories} = stateProps;
    const {dispatch} = dispatchProps;
    const {mainCategory} = ownProps;
    const {actions} = require('./../../redux/CategoryRedux');

    return {
        ...ownProps,
        ...stateProps,
        subCategories: [mainCategory, ...categories.list.filter(category => category.parent === mainCategory.id)],
        setSelectedCategory: (category) => dispatch(actions.setSelectedCategory(category)),
    };
}

export default connect(mapStateToProps, undefined, mergeProps)(SubCategoryPicker);
