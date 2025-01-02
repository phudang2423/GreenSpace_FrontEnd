import React, { Component } from "react";

class SlideShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentIndex: 0,
      isTransitioning: false, // For animation control
    };

    this.images = [
      "https://tools.dalathasfarm.com/assets/_file/2023/2023-03/Banner-Web7.png",
      "https://cdn-kvweb.kiotviet.vn/kiotviet-website/wp-content/uploads/2020/01/cay-phong-thuy-cover.png",
      "https://caycanhhanoi.vn/wp-content/uploads/2024/01/banner-caycanhhanoi.png",
    ];
  }

  componentDidMount() {
    // Set an interval to automatically change images every 5 seconds
    this.timer = setInterval(this.nextImage, 5000);
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted to avoid memory leaks
    clearInterval(this.timer);
  }

  // Handle the next image
  nextImage = () => {
    if (this.state.isTransitioning) return; // Prevent next image while transitioning

    this.setState({ isTransitioning: true }, () => {
      this.setState((prevState) => {
        const nextIndex =
          prevState.currentIndex === this.images.length - 1
            ? 0
            : prevState.currentIndex + 1;
        return { currentIndex: nextIndex };
      });
    });
  };

  // Handle the previous image
  prevImage = () => {
    if (this.state.isTransitioning) return; // Prevent prev image while transitioning

    this.setState({ isTransitioning: true }, () => {
      this.setState((prevState) => {
        const prevIndex =
          prevState.currentIndex === 0
            ? this.images.length - 1
            : prevState.currentIndex - 1;
        return { currentIndex: prevIndex };
      });
    });
  };

  // Reset the transition state after the animation duration (1 second)
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentIndex !== this.state.currentIndex) {
      setTimeout(() => {
        this.setState({ isTransitioning: false });
      }, 1000); // Duration of fade effect
    }
  }

  render() {
    const { currentIndex, isTransitioning } = this.state;

    return (
      <div className="relative w-full h-96 max-w-5xl mx-auto overflow-hidden rounded-sm mt-5">
        {/* Display Image */}
        <div className="relative w-full h-96">
          <img
            src={this.images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-500 ease-in ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          />
        </div>

        {/* Control buttons */}
        <button
          onClick={this.prevImage}
          className="opacity-45 hover:opacity-100 absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          ❮
        </button>
        <button
          onClick={this.nextImage}
          className="opacity-45 hover:opacity-100 absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-black p-2 rounded-full shadow-md hover:bg-gray-200"
        >
          ❯
        </button>

        {/* Image index */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-semibold">
          {currentIndex + 1} / {this.images.length}
        </div>
      </div>
    );
  }
}

export default SlideShow;
