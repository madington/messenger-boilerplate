import "../styles/main.scss";
const adWrapper = document.querySelector(".ad-wrapper");

const M = new MESSenger({
  data: {
    backgroundColor: "#0e0e0e",
    background:
      "https://delivered-by-madington.com/mess/client-content/uploads/GQYIirL6jQKIRyGcGmYi/media/dad09b31-64e9-4c8f-8e99-60e45e699bae.jpeg",
    logo: "https://delivered-by-madington.com/mess/client-content/uploads/YQd4ePSGBJGJZLBTec26/media/d0f2d2a2-e532-456d-bc1f-a7456a9f0727.png",
    videoFitType: "cover",
    headerColor: "#fff",
    headerText: "DYNAMIC CREATIVE",
    headerSize: {
      __default__: "2em",
      __300x600__: "1.5em",
    },
    subHeader: "Hello",
    country: "Norway",
    subHeaderColor: "#f7f7f7",
    cta: "Learn more",
    ctaBgColor: "#00FFC6",
    ctaColor: "#141414",
    logo: "https://delivered-by-madington.com/mess/client-content/uploads/YQd4ePSGBJGJZLBTec26/media/d0f2d2a2-e532-456d-bc1f-a7456a9f0727.png",
  },

  methods: {
    exit() {
      window.open("https://studio.madington.com");
    },
  },
  computed: {
    // Example of a computed property. This one combines two different strings into one
    geoSubheader() {
      return `${M.data.subHeader} ${M.data.country}!`;
    },
  },
  mounted() {
    // MESSenger is mounted.
    adWrapper.classList.add("show");
  },
});
