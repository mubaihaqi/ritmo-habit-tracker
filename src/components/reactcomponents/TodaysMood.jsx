import React, { useRef, useState } from "react";

export default function TodaysMood() {
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
    <div className="bg-info/5 rounded-md p-3 flex flex-col gap-2">
      {/* Header */}
      <div className="flex flex-col items-start justify-between">
        <h4 className="font-semibold tracking-tight text-start ps-2 text-base">
          Today's Mood
        </h4>
        <div className="bg-info h-[2px] w-[99%] mx-auto rounded-full animate-pulse my-2"></div>
      </div>
      {/* Statistics */}
      <div className="grid grid-cols-5 gap-2">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Emosi</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Tidur</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Kesehatan</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Hobi</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Emosi</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Tidur</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Kesehatan</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Hobi</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Emosi</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Tidur</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Kesehatan</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between p-2 rounded-md border border-info/20 bg-base-100 gap-1">
            <label htmlFor="">Hobi</label>
            <div className="flex flex-row gap-1 items-center justify-start">
              <div className="bg-success h-6 aspect-square rounded-full"></div>
              <div className="bg-primary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-warning/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-secondary/30 h-6 aspect-square rounded-full"></div>
              <div className="bg-error/30 h-6 aspect-square rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          {/* <div className="flex flex-row items-center justify-between gap-1 bg-base-100 rounded-md p-2">
            <label htmlFor="" className="text-success text-sm font-medium">
              Happy
            </label>
            <div className="bg-success h-6 aspect-video rounded-full"></div>
          </div> */}

          <div className="flex flex-col">
            <h4 className="text-start ps-2 pb-1">Foto</h4>
            <div className="flex flex-row gap-1 p-2 border border-info/20 rounded-md bg-base-100">
              <div className="flex gap-2 justify-center items-center">
                <div className="btn btn-soft h-full aspect-square rounded-full btn-info"></div>
                <label className="btn btn-soft btn-info flex-2">
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
            <div className="flex flex-row gap-1 p-2 border border-info/20 rounded-md bg-base-100">
              <div className="flex gap-2 justify-center items-center">
                <div className="btn btn-soft h-full aspect-square rounded-full btn-info"></div>
                {!recording ? (
                  <button
                    onClick={startRecording}
                    className="btn btn-soft btn-info text-info rounded-md"
                  >
                    Ketuk untuk rekam
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="btn btn-soft btn-error text-info rounded-md"
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
        </div>

        {/* Text Area */}
        <div className="flex flex-col">
          <h4 className="text-start ps-2 pb-1">Memo Singkat</h4>
          <textarea
            name=""
            id=""
            className="bg-base-100 rounded-md w-full h-full resize-none focus:outline-none px-2 py-3"
          ></textarea>
        </div>
      </div>
    </div>
  );
}
