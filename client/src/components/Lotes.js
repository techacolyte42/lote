import React from 'react';
import { Redirect } from 'react-router';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class Lotes extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.history.push('/lotes/new');
  }

  render() {
    let lotesDisplayCount = 0;
    return (
      <div className="chatContainer">
        <h1>
          { this.props.activeContact.display ? this.props.activeContact.display : this.props.activeContact.email }
          { !this.props.activeContact.email && 'No Contact Selected'}
        </h1>
        <div className="chat">
          { (this.props.activeContact.id !== this.props.profile.id)
              ? this.props.lotes.map((lote, i) => {
                if (lote.sender_id === this.props.activeContact.id || lote.lotesReceived[0].receiver_id === this.props.activeContact.id) {
                  lotesDisplayCount++;
                  if (lote.sender_id === this.props.profile.id) {
                    return (<div className="senderStyle" key={lote.id}>{lote.lote.message}</div>);
                  } else if (lote.lotesReceived[0].receiver_id === this.props.profile.id) {
                    return (<div className="receiverStyle" key={lote.id}>{lote.lote.message}</div>);
                  }
                }
              })
              : this.props.lotes.map((lote, i) => {
                if (lote.sender_id === this.props.profile.id && lote.lotesReceived[0].receiver_id === this.props.profile.id) {
                  lotesDisplayCount++;
                  return (<div className="senderStyle" key={lote.id}>{lote.lote.message}</div>);
                }
              })
          }
        </div>
        { lotesDisplayCount === 0 && <div>No Lote History</div> }
        <div>
        { this.props.activeContact.email &&
          <form className="lote-message-form" ref="loteMessageForm" onSubmit={ this.handleSubmit }>
            <div>
              <label>
                <TextField multiLine={true} rows={1} className="lote-form-input-message" ref="message" type="text" name="message" onChange={ (event) => this.props.setActiveMessage(event.target.value) } />
              </label>
              <RaisedButton labelColor='white' backgroundColor='#48d09b' className="submitButton" label="Create New Lote" onTouchTap={ this.handleSubmit }/>
            </div>
          </form>
        }
        </div>
    </div>
    );
  }
}

export default Lotes;
