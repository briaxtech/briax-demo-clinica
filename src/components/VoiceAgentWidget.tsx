'use client';

import { createElement } from "react";
import Script from "next/script";

const agentId = process.env.NEXT_PUBLIC_ELEVEN_AGENT_ID;

export const VoiceAgentWidget = () => {
  if (!agentId) {
    return null;
  }

  return (
    <>
      {/* Render the ElevenLabs web component once */}
      {createElement("elevenlabs-convai", { "agent-id": agentId })}

      {/* Load the ElevenLabs widget script after hydration */}
      <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" type="text/javascript" strategy="afterInteractive" />
    </>
  );
};

