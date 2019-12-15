import React, { Component } from 'react';
import './filters.css';
import { connect } from 'react-redux';
import { FILTER_CHANGE } from '../../constants/actionTypes';
import { FILTER_TYPES } from './../../constants/filterTypes';

const mapStateToProps = state => ({ filters: state.filters });
const mapDispatchToProps = dispatch => ({
    onFiltersChanges: filters =>
        dispatch({ type: FILTER_CHANGE, payload: filters })
});

class Filters extends Component {
    constructor() {
        super();

        this.checkboxChange = (filterType) => (event) => {
            var filters = { ...this.props.filters };
            filters[filterType.key] = { ...filters[filterType.key], isOn: event.target.checked };
            this.props.onFiltersChanges(filters);
        }

        this.sliderChange = (filterType) => (event) => {
            var filters = { ...this.props.filters };
            filters[filterType.key] = { ...filters[filterType.key], intensity: parseFloat(event.target.value) };
            this.props.onFiltersChanges(filters);
        }
    }

    render() {
        return (
            <div>
                {FILTER_TYPES.map(filterType =>
                    <div key={filterType.id} className="filters-container">
                        <div className="filters-row">
                            <label htmlFor={`filters-${filterType.key}`}>{filterType.name} Filter:</label>
                            <input name={`filters-${filterType.key}`} id={`filters-${filterType.key}`} type="checkbox" checked={this.props.filters[filterType.key].isOn} onChange={this.checkboxChange(filterType)} />
                        </div>
                        <div className="filters-row">
                            {filterType.hasIntensity ?
                                (<div>
                                    <label htmlFor={`filters-${filterType.key}-intensity`}>{filterType.name} Intensity:</label>
                                    <input name={`filters-${filterType.key}-intensity`} id={`filters-${filterType.key}-intensity`} type="range" min="0" max="1" step="0.01" value={this.props.filters[filterType.key].intensity} onChange={this.sliderChange(filterType)} />
                                </div>
                                ) : ""
                            }
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);;
