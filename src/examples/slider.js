import "../styles/slider.scss";
import Glide, { Autoplay } from "@glidejs/glide/dist/glide.modular.esm";

let slider;

if (!window.MESSengerLoaded) {
  window.onMESSengerLoad = startCreative;
} else {
  startCreative();
}

function startCreative() {
  const M = new MESSenger({
    data: {
      showWhenLoaded: "1",
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
      slides() {
        destroySlider();
        setupSlider();
      },
    },

    methods: {
      exit() {
        window.open("https://mess.delivered-by-madington.com/");
      },
    },

    mounted() {
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
}
