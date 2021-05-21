import "../styles/main.scss";
const adWrapper = document.querySelector(".ad-wrapper");

if (!window.MESSengerLoaded) {
  window.onMESSengerLoad = startCreative;
} else {
  startCreative();
}

function startCreative() {
  const M = new MESSenger({
    data: {
      backgroundColor: "#0e0e0e",
      background:
        "https://delivered-by-madington.com/mess/client-content/uploads/GQYIirL6jQKIRyGcGmYi/media/dad09b31-64e9-4c8f-8e99-60e45e699bae.jpeg",
      logo:
        "https://delivered-by-madington.com/mess/client-content/uploads/YQd4ePSGBJGJZLBTec26/media/d0f2d2a2-e532-456d-bc1f-a7456a9f0727.png",
      streamID: "1613998830989-ib4uxp ",
      videoFitType: "cover",
      headerColor: "#fff",
      headerText: "DYNAMIC CREATIVE",
      headerSize: {
        __default__: "2em",
        __300x600__: "1.5em",
      },
      subHeader: "Unleash your creativity",
      subHeaderColor: "#f7f7f7",
      cta: "Learn more",
      ctaBgColor: "#00FFC6",
      ctaColor: "#141414",
      logo:
        "https://delivered-by-madington.com/mess/client-content/uploads/YQd4ePSGBJGJZLBTec26/media/d0f2d2a2-e532-456d-bc1f-a7456a9f0727.png",
    },

    watch: {
      streamID(newStream, oldStream) {
        if (newStream !== oldStream) {
          adWrapper.classList.remove("show");
          MadingtonStreamedby({
            videoElem: ".video",
            stream: newStream,
            streamedbyCallback: () => adWrapper.classList.add("show"),
          });
        }
      },
    },

    methods: {
      exit() {
        window.open("https://studio.madington.com");
      },
    },

    mounted() {
      MadingtonStreamedby({
        videoElem: ".video",
        stream: M.data.streamID,
        streamedbyCallback: () => adWrapper.classList.add("show"),
      });
      setTimeout(() => {
        M.data.streamID = "1613998401486-3o6097";
      }, 8000);
    },
  });
}
