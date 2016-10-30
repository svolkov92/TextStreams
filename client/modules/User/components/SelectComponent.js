/**
 * Created by Volkov on 30.10.2016.
 */
import React, { Component, PropTypes } from 'react';

export class SelectComponent extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    return (
      <div>
        <label>{this.props.label}</label>
        <select onChange={this.props.onChange} name={this.props.name} >
          {
            this.props.options.map(function(item) {
              var extraProps = {};

              if (item.isSelected)
                extraProps.selected = {};

              return <option key={item.value} {...extraProps}>{item.name}</option>;
            })
          }
        </select>
      </div>
    )
  }
}
