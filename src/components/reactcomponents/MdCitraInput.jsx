import React, { useRef, useState } from "react";

const CitraInput = () => {
  const [recording, setRecording] = useState(false);
  const [audioURL, setAudioURL] = useState("");
  const [stream, setStream] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const startRecording = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setStream(userStream);
      mediaRecorderRef.current = new MediaRecorder(userStream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        audioChunksRef.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        // Stop all tracks after recording
        userStream.getTracks().forEach((track) => track.stop());
        setStream(null);
      };

      mediaRecorderRef.current.start();
      setRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start h-full w-full gap-2">
      <div className="flex flex-col justify-between w-full gap-2">
        {/* Foto */}
        <div className="flex flex-col">
          <h4 className="text-start ps-2 pb-1">Foto</h4>
          <div className="flex flex-row gap-1 p-2 border border-info/20 rounded-md bg-base-100 w-full">
            <div className="flex gap-4 justify-center items-center w-full px-4">
              <div className="btn btn-soft h-full aspect-square rounded-full btn-info"></div>
              <label className="btn btn-soft btn-info flex-2 rounded-sm cursor-pointer">
                <span>Ketuk untuk upload</span>
                {/* Hidden input */}
                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>
          </div>
        </div>

        {/* Tombol rekam suara */}
        <div className="flex flex-col">
          <h4 className="text-start ps-2 pb-1">Memo Suara</h4>
          <div className="flex flex-row gap-1 p-2 border border-info/20 rounded-md bg-base-100 w-full">
            <div className="flex gap-4 justify-center items-center w-full px-4">
              <div className="btn btn-soft h-full aspect-square rounded-full btn-info"></div>
              {!recording ? (
                <button
                  onClick={startRecording}
                  className="btn btn-soft btn-info flex-2 rounded-md cursor-pointer"
                >
                  Ketuk untuk rekam
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="btn btn-soft btn-error rounded-md"
                >
                  Stop Rekaman
                </button>
              )}
            </div>

            {audioURL && (
              <audio controls className="mt-2">
                <source src={audioURL} type="audio/webm" />
                Your browser does not support the audio element.
              </audio>
            )}
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col h-full">
          <h4 className="text-start ps-2 pb-1">Memo Singkat</h4>
          <textarea
            name=""
            id=""
            className="bg-base-100 border border-info/20 rounded-md w-full h-[210px] resize-none focus:outline-none px-2 py-3 "
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CitraInput;
