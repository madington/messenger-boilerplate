import "../styles/slider.scss";
import Glide, { Autoplay } from "@glidejs/glide/dist/glide.modular.esm";

let slider;

const M = new MESSenger({
  data: {
    // This sets the opacity of the wrap element to 1 when the ad is loaded
    showWhenLoaded: "1",
    // An array of "slides"
    slides: [
      {
        imageUrl: "http://placekitten.com/580/400",
        text: "Cat 1",
      },
      {
        imageUrl: "http://placekitten.com/600/500",
        text: "Cat 2",
      },
      {
        imageUrl: "http://placekitten.com/800/700",
        text: "Cat 3",
      },
      {
        imageUrl: "http://placekitten.com/700/300",
        text: "Cat 4",
      },
      {
        imageUrl: "http://placekitten.com/800/300",
        text: "Cat 5",
      },
    ],
  },
  watch: {
    // Whenever the array of slides changes, destroy the slider and restart it.
    slides() {
      destroySlider();
      setupSlider();
    },
  },
  methods: {
    // A method that runs at click
    exit() {
      window.open("https://mess.delivered-by-madington.com/");
    },
  },

  mounted() {
    // Messenger is mounted and we can run other logic
    setupSlider();
  },
});

function setupSlider() {
  slider = new Glide(".glide", {
    autoplay: 4000,
  }).mount({ Autoplay });
}

function destroySlider() {
  slider.destroy();
}
