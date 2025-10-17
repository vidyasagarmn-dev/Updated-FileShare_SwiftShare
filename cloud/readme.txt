Cloud Detour - LAN P2P Multimedia File Transfer (Final Version)
------------------------------------------------------------------

How to Run:

1. Install Node.js (on the server device).
2. Open terminal in this folder.
3. Install WebSocket dependency:
   npm install ws
4. Start the signaling server:
   node signaller.js
5. Serve the web client using:
   npx http-server . -p 8080
6. On any device in the same LAN, open:
   http://<server-ip>:8080/index.html
7. In the web page, set Signaler URL as:
   ws://<server-ip>:3000
8. Click Connect on both devices, select peers, and send any file.

Notes:
- Works offline after setup.
- Supports images, videos, audio, and documents.
- Always open via HTTP (not file://) for proper previews.
