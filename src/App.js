import React from 'react'
import WebRTCClient from 'freepbx-react-webrtc'
import EventEmitter from 'events'
import Button from 'react-bootstrap/Button'

import './App.css'

export default function NewApp() {
  const eventHandler = React.useMemo(() => new EventEmitter(), [])
  const [currentCallState, setCurrentCallState] = React.useState(null)
  const [currentConnectionState, setCurrentConnectionState] =
    React.useState(null)

  const eventHandlerEmit = (emit) => {
    eventHandler.emit(emit)
  }

  const updateCallState = (callState) => {
    setCurrentCallState(callState)
  }

  const updateConnectionState = (connectionState) => {
    setCurrentConnectionState(connectionState)
  }

  React.useEffect(() => {
    // Connected and Idle
    eventHandler.on('Idle', function () {
      // Do something...
    })

    // Outgoing call happening
    eventHandler.on('Calling', function () {
      // Do something...
    })

    // Incoming Call
    eventHandler.on('Alerting', function () {
      // Do something...
    })

    // Call started
    eventHandler.on('InCall', function () {
      // Do something...
    })
  }, [eventHandler])

  return (
    <div className="App">
      <header></header>
      <body>
        <video
          width="25%"
          height="25%"
          id="localVideo"
          autoPlay
          playsInline
          muted="muted"
        ></video>
        <video
          width="50%"
          height="50%"
          id="remoteVideo"
          autoPlay
          playsInline
        ></video>

        <Button onClick={() => this.eventHandlerEmit('answerCall')}>
          Accept Incoming Call
        </Button>
        <Button onClick={() => this.eventHandlerEmit('hangupCall')}>
          Hangup Call
        </Button>
        <Button onClick={() => this.eventHandlerEmit('placeCall')}>
          Start Call
        </Button>

        <WebRTCClient
          // enableVideo={true}
          enableSound={true}
          webSocketPort={'8089'} //default port for websocket is 8089 on sip server
          autoRegister={true}
          sipDomain={'sip.domain.de'} // Sip Domain
          sipServer={'123.123.2.12'} // Optional: Sip Server Adress, if not set domain is used instead
          sipUser={'1234'} // Username of caller
          sipPassword={'SIP_CALLER_PASS'} // Password of caller
          destination={'1234@destination.url'} // Destination, user@destination.domain
          metaData={{}} // Metadata
          alertVideoUrl={'alertUrl'}
          ringbackVideoUrl={'ringbackUrl'}
          localVideoTagId={'localVideo'} // ID of video tag for own video
          remoteVideoTagId={'remoteVideo'} // ID of video tag for incoming remote video
          skipStunServer={true} // True if Server is only reachable in local network and is not public
          eventHandler={eventHandler}
          eventHandlerEmit={eventHandlerEmit}
          updateCallState={updateCallState}
          updateConnectionState={updateConnectionState}
          traceSip={true}
        />
      </body>
    </div>
  )
}
