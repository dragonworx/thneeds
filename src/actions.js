import Axial from 'react-axial'
import init from './actions/init'
import login from './actions/login'
import json from './actions/json'
import spinner from './actions/spinner'
import labelPicker from './actions/labelPicker'
import thneed from './actions/thneed'
import settings from './actions/settings'
import overlay from './actions/overlay'
import validation from './actions/validation'

Axial.define({
  init: init,
  login: login,
  json: json,
  spinner: spinner,
  labelPicker: labelPicker,
  thneed: thneed,
  settings: settings,
  overlay: overlay,
  validation: validation
});