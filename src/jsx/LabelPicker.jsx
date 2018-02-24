import React from 'react'
import Axial from 'react-axial'

class LabelPicker extends Axial.Component {
  render() {
    return (
      <Axial.Div when={this.visible} id="labelPicker">
        {
          ['default', 'red', 'green', 'blue'].map(label => {
            return <div key={`label${label}`} className={`label ${label}`} onClick={() => this.call.labelPicker.select(label)}></div>
          })
        }
      </Axial.Div>
    );
  }
}

LabelPicker.bind({path: 'visible.labelPicker', alias: 'visible'});

export default LabelPicker;