import React from 'react'
import WebRTCClient from 'iotcomms-react-webrtc'
import { Button } from 'reactstrap'
import EventEmitter from 'events'

export function Iotcomms() {
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
    <div>
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
        webSocketPort={'8088'} //default port for websocket is 8089 on sip server
        autoRegister={true}
        sipDomain={process.env.REACT_APP_SIP_DOMAIN} // Sip Domain
        sipServer={process.env.REACT_APP_SIP_SERVER} // Optional: Sip Server Adress, if not set domain is used instead
        sipUser={process.env.REACT_APP_SIP_USER} // Username of caller
        sipPassword={process.env.REACT_APP_SIP_PASSWORD} // Password of caller
        destination={'1234@destination.url'} // Destination, user@destination.domain
        metaData={{}} // Metadata
        // alertVideoUrl={'alertUrl'}
        // ringbackVideoUrl={'ringbackUrl'}
        // localVideoTagId={'localVideo'} // ID of video tag for own video
        // remoteVideoTagId={'remoteVideo'} // ID of video tag for incoming remote video
        skipStunServer={true} // True if Server is only reachable in local network and is not public
        eventHandler={eventHandler}
        eventHandlerEmit={eventHandlerEmit}
        updateCallState={updateCallState}
        updateConnectionState={updateConnectionState}
        traceSip={false}
      />
    </div>
  )
}
