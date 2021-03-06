import React from 'react';

import Settings from './tabs/Settings';
import Addons from './tabs/Addons';
import Marketplace from './tabs/Marketplace';

export default class MainModal extends React.PureComponent {
    constructor(...args) {
        super(...args);
        this.state = {
            tab: <Settings language={this.props.language.settings} toastLanguage={this.props.language.toasts} />,
            settingsActive: 'active',
            addonsActive: '',
            marketplaceActive: ''
        };
    }

  componentDidMount() {
    document.getElementById('backgroundImage').classList.toggle('backgroundEffects');
    document.getElementById('center').classList.toggle('backgroundEffects');
  }

  componentWillUnmount() {
    document.getElementById('backgroundImage').classList.toggle('backgroundEffects');
    document.getElementById('center').classList.toggle('backgroundEffects');
  }

  changeEnabled(input) {
      switch (input) {
          case 'addons':
              this.setState({
                  tab: <Addons language={this.props.language.addons} marketplaceLanguage={this.props.language.marketplace} toastLanguage={this.props.language.toasts} openMarketplace={() => this.changeEnabled('marketplace')}/>,
                  addonsActive: 'active',
                  settingsActive: '',
                  marketplaceActive: ''
              });
              break;
          case 'settings':
              this.setState({
                  tab: <Settings language={this.props.language.settings} toastLanguage={this.props.language.toasts}/>,
                  settingsActive: 'active',
                  addonsActive: '',
                  marketplaceActive: ''
              });
              break;
          case 'marketplace':
              this.setState({
                  tab: <Marketplace language={this.props.language.marketplace} toastLanguage={this.props.language.toasts} updateLanguage={this.props.language.update}/>,
                  marketplaceActive: 'active',
                  addonsActive: '',
                  settingsActive: ''
              });
              break;
            default:
                break;
      }
  }

  render() {
    return (
      <div className='content'>
        <span className='closeModal' onClick={this.props.modalClose}>&times;</span>
        <h1>{this.props.language.modals.title}</h1>
        <div className='tab'>
          <button className='tablinks' id={this.state.marketplaceActive} onClick={() => this.changeEnabled('marketplace')}>{this.props.language.modals.marketplace}</button>
          <button className='tablinks' id={this.state.addonsActive} onClick={() => this.changeEnabled('addons')}>{this.props.language.modals.addons}</button>
          <button className='tablinks' id={this.state.settingsActive} onClick={() => this.changeEnabled('settings')}>{this.props.language.modals.settings}</button>
        </div>
        <br/>
        {this.state.tab}
      </div>
    )
  }
}