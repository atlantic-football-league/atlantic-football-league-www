const theme = {
  maxWidth: 1200,
  colors: {
    primary: "#223b9f",
    black: "black",
    white: "white",
    background: "#f8f8fa"
  },
  grayscale: alpha => `rgba(0, 0, 0, ${alpha})`,
  grayscale_i: alpha => `rgba(255, 255, 255, ${alpha})`,
  team: {
    dal: {
      primary: "gold",
      text: "black"
    },
    hc: {
      primary: "maroon",
      text: "white"
    },
    fr: {
      primary: "red",
      text: "white"
    },
    sj: {
      primary: "darkblue",
      text: "white"
    }
  }
};

export default theme;
