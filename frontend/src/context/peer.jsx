import React, { useCallback, useEffect, useMemo, useState } from "react";

const PeerContext = React.createContext(null);

export const usePeer = () => React.useContext(PeerContext)

export const PeerProvider = (props) => {
  const [remoteStream,setRemoteStream] = useState(null)
  const peer = useMemo(
    () =>
      new RTCPeerConnection({
        iceServers: [
          { urls: "stun:stun.l.google.com:19302" },
          { urls: "stun:stun.services.mozilla.com" },
          
        ],
      }),
    []
  );

const createOffer = async () => {
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  return { type: offer.type, sdp: offer.sdp }; // ✅ return full object
};

const createAnswer = async () => {
  const answer = await peer.createAnswer();
  await peer.setLocalDescription(answer);
  return { type: answer.type, sdp: answer.sdp }; // ✅ full object
};

const setRemoteAnswer = async (ans) => {
  console.log("Setting remote answer:", ans); // debug
  await peer.setRemoteDescription(new RTCSessionDescription(ans));
};


  const sendStream = async(stream) =>{
    const tracks = stream.getTracks();
    for(const track of tracks){
      peer.addTrack(track,stream);
    }
  }
  const handleTrackEvent = useCallback((ev)=>{
    const streams = ev.streams;
      setRemoteStream(streams[0])
      
  },[])

  
  useEffect(()=>{
    peer.addEventListener('track',handleTrackEvent);
    
    return ()=>{
      peer.removeEventListener('track',handleTrackEvent)
      
    }
  },[peer,handleTrackEvent])
  return (
    <PeerContext.Provider value={{peer , createOffer, createAnswer,setRemoteAnswer,sendStream,remoteStream }}>{props.children}</PeerContext.Provider>
  );
};
