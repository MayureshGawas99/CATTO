import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, Check, RotateCcw, SwitchCamera, X, Zap } from "lucide-react";

type CameraState = "starting" | "camera" | "preview" | "scanning" | "success";
type FacingMode = "environment" | "user";

export default function DiscoverPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const requestIdRef = useRef(0);
  const facingModeRef = useRef<FacingMode>("environment");

  const [state, setState] = useState<CameraState>("starting");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);

  const stopCamera = useCallback(() => {
    requestIdRef.current += 1;
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
    setStream(null);
  }, []);

  const startCamera = useCallback(
    async (facingMode: FacingMode) => {
      stopCamera();
      const requestId = requestIdRef.current;
      setState("starting");

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: false,
        });

        if (requestId !== requestIdRef.current) {
          mediaStream.getTracks().forEach((track) => track.stop());
          return;
        }

        streamRef.current = mediaStream;
        setStream(mediaStream);
        setState("camera");
      } catch (error) {
        console.error("Camera error:", error);
        setState("starting");
      }
    },
    [stopCamera],
  );

  useEffect(() => {
    void startCamera(facingModeRef.current);

    return stopCamera;
  }, [startCamera, stopCamera]);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopCamera();
      } else if (state === "camera" && !streamRef.current) {
        void startCamera(facingModeRef.current);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [startCamera, state, stopCamera]);

  function takePhoto() {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const context = canvas.getContext("2d");

    if (!context) return;

    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const image = canvas.toDataURL("image/jpeg", 0.9);

    setPhoto(image);
    setState("preview");

    stopCamera();
  }

  function retake() {
    setPhoto(null);
    void startCamera(facingModeRef.current);
  }

  function changeCamera() {
    const nextFacingMode: FacingMode =
      facingModeRef.current === "environment" ? "user" : "environment";

    facingModeRef.current = nextFacingMode;
    void startCamera(nextFacingMode);
  }

  function scanForCat() {
    setState("scanning");

    // Temporary fake AI detection
    setTimeout(() => {
      setState("success");
    }, 2000);
  }

  return (
    <main className="h-full w-full overflow-hidden bg-black">
      {/* Camera */}
      <div className="relative h-full overflow-hidden">
        {state === "camera" && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="h-full w-full object-cover"
          />
        )}

        {state === "preview" || state === "scanning" || state === "success"
          ? photo && (
              <img
                src={photo}
                alt="Captured cat"
                className="h-full w-full object-cover"
              />
            )
          : null}

        {/* Starting */}
        {state === "starting" && (
          <div className="flex h-full items-center justify-center text-white">
            <div className="text-center">
              <Camera size={42} className="mx-auto mb-4" />

              <p className="font-semibold">Starting camera...</p>

              <p className="mt-2 text-sm text-zinc-400">
                Please allow camera access.
              </p>
            </div>
          </div>
        )}

        {/* Top bar */}
        <div className="absolute left-0 right-0 top-0 flex items-center justify-between p-5">
          <button
            onClick={() => window.history.back()}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur"
          >
            <X size={20} />
          </button>

          <div className="flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 text-sm font-semibold text-white backdrop-blur">
            <Zap size={15} />
            Cat Hunt
          </div>

          <button
            onClick={changeCamera}
            disabled={state !== "camera"}
            aria-label="Change camera"
            title="Change camera"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition hover:bg-black/60 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SwitchCamera size={20} />
          </button>
        </div>

        {/* Scanning overlay */}
        {state === "scanning" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
            <div className="text-center text-white">
              <div className="mx-auto mb-5 h-20 w-20 animate-spin rounded-full border-4 border-white/20 border-t-white" />

              <h2 className="text-xl font-bold">Looking for a cat...</h2>

              <p className="mt-2 text-sm text-white/70">Analyzing your photo</p>
            </div>
          </div>
        )}

        {/* Camera targeting */}
        {state === "camera" && (
          <>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="relative h-64 w-64">
                <div className="absolute left-0 top-0 h-8 w-8 border-l-4 border-t-4 border-white" />

                <div className="absolute right-0 top-0 h-8 w-8 border-r-4 border-t-4 border-white" />

                <div className="absolute bottom-0 left-0 h-8 w-8 border-b-4 border-l-4 border-white" />

                <div className="absolute bottom-0 right-0 h-8 w-8 border-b-4 border-r-4 border-white" />
              </div>
            </div>

            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 text-center text-white">
              <p className="font-semibold">Point your camera at a cat</p>

              <p className="mt-1 text-xs text-white/70">
                Get the cat clearly in frame
              </p>
            </div>
          </>
        )}

        {/* Capture button */}
        {state === "camera" && (
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <button
              onClick={takePhoto}
              className="flex h-20 w-20 items-center justify-center rounded-full border-[6px] border-white/80 bg-white transition active:scale-90"
            >
              <div className="h-14 w-14 rounded-full bg-white ring-2 ring-zinc-300" />
            </button>
          </div>
        )}

        {/* Preview controls */}
        {state === "preview" && (
          <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-4">
            <button
              onClick={retake}
              className="flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 font-bold text-zinc-800 backdrop-blur"
            >
              <RotateCcw size={18} />
              Retake
            </button>

            <button
              onClick={scanForCat}
              className="flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 font-bold text-white shadow-xl"
            >
              <Check size={18} />
              Scan Cat
            </button>
          </div>
        )}

        {/* Success */}
        {state === "success" && <SuccessOverlay />}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </main>
  );
}

function SuccessOverlay() {
  return (
    <div className="absolute inset-0 flex items-end justify-center bg-black/20">
      <div className="w-full max-w-md rounded-t-4xl bg-white p-7 text-center shadow-2xl">
        <div className="mx-auto -mt-20 mb-4 flex h-24 w-24 items-center justify-center rounded-full border-8 border-white bg-orange-500 text-5xl shadow-xl">
          🐈
        </div>

        <div className="mb-2 text-sm font-bold uppercase tracking-widest text-orange-500">
          Cat found!
        </div>

        <h1 className="text-3xl font-black text-zinc-900">Mochi</h1>

        <p className="mt-1 font-semibold capitalize text-zinc-500">
          Common Cat
        </p>

        <div className="my-6 rounded-2xl bg-orange-50 p-4">
          <p className="text-3xl font-black text-orange-500">+100 XP</p>

          <p className="mt-1 text-sm text-orange-700">
            Cat added to your collection
          </p>
        </div>

        <button
          onClick={() => {
            window.location.href = "/collection";
          }}
          className="w-full rounded-2xl bg-orange-500 py-4 font-bold text-white transition hover:bg-orange-600"
        >
          View My Cats
        </button>
      </div>
    </div>
  );
}
