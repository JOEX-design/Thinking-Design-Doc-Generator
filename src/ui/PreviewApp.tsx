import * as React from "react";
import { useState, useEffect, useRef } from "react";
import { App } from "./App";

const PREVIEW_ENV = process.env.PREVIEW_ENV

function PreviewApp() {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef(null);

  const onWindowMsg = msg => {
    if (msg.data.pluginMessage) {
      const message = JSON.stringify(msg.data.pluginMessage);
      if (ws.current.readyState === 1) {
        ws.current.send(message);
      } else {
        setTimeout(() => {
          onWindowMsg(msg);
        }, 1000);
      }
    }
  };

  const startWebSocket = () => {
    ws.current = new WebSocket("ws://localhost:9021/ws");
    ws.current.onopen = () => {
      console.log("ws opened");
      setIsConnected(true);
    };
    ws.current.onclose = () => {
      console.log("ws closed");
      setIsConnected(false);

      setTimeout(() => {
        startWebSocket();
      }, 3000);
    };

    ws.current.onmessage = event => {
      try {
        let msg = JSON.parse(event.data);
        if (msg.src === "server") {
          let temp = JSON.parse(msg.message);
          window.parent.postMessage({ pluginMessage: temp }, '*')
        }
      } catch (err) {
        console.error("not a valid message", err);
      }
    };

    window.addEventListener("message", onWindowMsg);

    return () => {
      ws.current.close();
      window.removeEventListener("message", onWindowMsg);
    };
  };

  useEffect(() => {
    startWebSocket();
  }, []);

  return (
    <div className="bg-slate-300 w-screen h-screen font-sans flex flex-col items-center p-5 overflow-clip">
      <h3 className="text-2xl font-semibold text-slate-700">Preview App</h3>
      <div className="flex items-center mb-2">
        <strong className="text-base font-medium text-slate-500">Connection Status:</strong>
        <div className={`rounded-full m-2 w-3 h-3 transition-all ${isConnected ? 'bg-green-600' : 'bg-red-600'}`}/>
      </div>


      {PREVIEW_ENV === 'browser' && setIsConnected && (
        <div className="w-full h-full flex justify-center pb-24">
          <App/>
        </div>
      )}
    </div>
  );
}

export default PreviewApp;