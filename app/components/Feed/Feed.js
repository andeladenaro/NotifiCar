import React, { Component } from 'react';
import { View, ListView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import ActionButton from 'react-native-action-button';
import _ from 'lodash';

import styles from './styles';
import {
    showDialog,
    fetchOcurrencesOfTheDay,
} from '../../redux/actions/FeedActions';
import OcurrenceModal from '../OccurrenceModal/OcurrenceModal';
import OcurrenceItem from '../OcurrenceItem/OcurrenceItem';
import { Images } from '../../commom';

class Feed extends Component {
    componentWillMount() {
        this.props.fetchOcurrencesOfTheDay();
        this._createOcurrenceList(this.props.ocurrencesOfTheDay);
    }

    componentWillReceiveProps(nextProps) {
        this._createOcurrenceList(nextProps.ocurrencesOfTheDay);
    }

    _createOcurrenceList(ocurrencesOfTheDay) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(ocurrencesOfTheDay);
    }

    _renderRow(ocurrenceData) {
        let icon;

        if (ocurrenceData.typeOcurrence === 'Farol Aceso') {
            icon = Images.ICON_LIGHTS;
        } else if (ocurrenceData.typeOcurrence === 'Vidro Aberto') {
            icon = Images.ICON_WINDOW;
        } else if (ocurrenceData.typeOcurrence === 'Alarme Disparado') {
            icon = Images.ICON_ALARM;
        } else {
            icon = Images.ICON_WARNING;
        }

        return (
            <OcurrenceItem ocurrence={ocurrenceData} image={icon} />
        );
    }

    _renderListOfOcurrences() {
        if (this.props.isLoadingListOfOcurrences) {
            return (
                <ActivityIndicator style={styles.indicator} size='large' />
            );
        }

        return (
            <ListView
                style={styles.ocurrenceList}
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this._renderRow}
            />
        );
    }

    render() {
        return (
            <View style={styles.screen}>
                <OcurrenceModal />

                {this._renderListOfOcurrences()}

                <ActionButton
                    buttonColor='rgba(231,76,60,1)'
                    onPress={() => this.props.showDialog(true)}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    let ocurrencesOfTheDay;

    if (state.FeedReducer.ocurrencesOfTheDay === null) {
        ocurrencesOfTheDay = [];
    } else {
        ocurrencesOfTheDay = _.map(state.FeedReducer.ocurrencesOfTheDay, 
            (val, uid) => ({ ...val, uid }));
    }

    return {
        ocurrencesOfTheDay,
        isLoadingListOfOcurrences: state.FeedReducer.isLoadingListOfOcurrences
    };
};

export default connect(mapStateToProps, {
    showDialog, fetchOcurrencesOfTheDay
})(Feed);