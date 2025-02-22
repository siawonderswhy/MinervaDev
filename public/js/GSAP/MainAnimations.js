
// Registration of GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrollToPlugin)


// Scroll Smoother for all Pages
  const content = document.getElementById("smooth-content")
  gsap.set(document.body, { height: content.clientHeight })
  ScrollSmoother.create({
    smooth: 1,
    smoothTouch: 0,
  })

  var lineSplitElements = document.querySelectorAll("#LineSplit")
  var split = new SplitText(lineSplitElements, {
    type: "words",
  })
  gsap.from(split.words, {
    duration: 0.86,
    y: "100%",
    ease: "expo.out",
    stagger: 0.1, //Time between each word
  })

  var lineSplitElementsOnView = document.querySelectorAll("#LineSplitOnView");
  lineSplitElementsOnView.forEach((el) => {
    var split = new SplitText(el, {
      type: "words",
    });

    gsap.from(split.words, {
      duration: 0.86,
      y: "100%",
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: el, // Ensure the correct trigger for each element
        start: "top 90%",
        end: "bottom 10%",
        toggleActions: "play none none reverse",
      },
    });
  });


  var lineSplitElementsScrub = document.querySelectorAll("#LineSplitScrub");
  lineSplitElementsScrub.forEach((el) => {
    var split = new SplitText(el, {
      type: "words",
    });

    gsap.from(split.words, {
      duration: 0.86,
      y: "100%",
      ease: "expo.out",
      stagger: 0.1,
      scrollTrigger: {
        trigger: el, // Ensure the correct trigger for each element
        start: "top 80%",
        end: "bottom 20%",
        scrub: true,
      },
    });
  });

  // // Wait for the DOM to load
  // document.addEventListener("DOMContentLoaded", () => {
  //   const lineSplitElements = document.querySelectorAll(".LineSplitOnView");

  //   lineSplitElements.forEach((lineSplitElement) => {
  //     const split = new SplitText(lineSplitElement, {
  //       type: "words",
  //     });

  //     gsap.from(split.words, {
  //       duration: 0.86,
  //       y: "100%",
  //       ease: "expo.out",
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: lineSplitElement,
  //         start: "top 80%", // Adjust as needed
  //         end: "bottom 20%", // Adjust as needed
  //         toggleActions: "play none none none", // Play animation once
  //       },
  //     });
  //   });
  // });

// var charSplitElements = document.querySelectorAll(".rotating-text")
// let tl = gsap.timeline({
//   repeat: -1,
//   defaults: { stagger: 0.086 },
// })
// let charSplit = new SplitText(charSplitElements, {
//   type: "words, chars",
//   tag: "span",
//   charsClass: "char-inline",
// })

// charSplit.words.forEach((word) => {
//   if (
//     word.parentElement.parentElement == document.querySelector(".rotating-text")
//   ) {
//     console.log(word)
//   }
//   console.log(word)
//   tl.from(
//     word.childNodes,
//     {
//       y: 100,
//       ease: "expo.out",
//     },
//     "<0.386"
//   )
//   tl.to(word.childNodes, {
//     delay: 0.086,
//     y: -110,
//     ease: "expo.in",
//   }),
//     "<0"
// })

const length = document.querySelectorAll(".word").length
const duration = 1
const staggerDelay = 0.1

let lastStaggerLength = null
const anim = gsap.timeline({
  repeat: -1,
  delay: 2,
})

for (let i = 0; i < length; i++) {
  const splitElem = document.querySelectorAll(".word")[i]
  const splitted = new SplitText(splitElem, {
    type: "lines, chars",
    charsClass: "char-inline",
    tag: "span",
  })

  if (i == 0) {
    anim.add(`break${i}`)

    // "Leave" animation with adjusted delay
    anim.to(
      splitted.chars,
      {
        y: "-200%",
        duration: duration,
        ease: "expo.out",
        stagger: staggerDelay,
      },
      `break${i}`
    )

    lastStaggerLength = splitted.chars.length
  } else if (i == length - 1) {
    anim.add(`break${i}`)

    // "Come in" animation
    anim.from(
      splitted.chars,
      {
        y: "200%",
        duration: duration,
        ease: "expo.out",
        stagger: staggerDelay,
      },
      `break${i}-=${duration + lastStaggerLength * staggerDelay}`
    )

    lastStaggerLength = splitted.chars.length
  } else {
    anim.add(`break${i}`)

    // "Come in" animation
    anim.from(
      splitted.chars,
      {
        y: "200%",
        duration: duration,
        ease: "expo.out",
        stagger: staggerDelay,
      },
      `break${i}-=${duration + lastStaggerLength * staggerDelay}`
    )

    // "Leave" animation with adjusted delay
    anim.to(
      splitted.chars,
      {
        y: "-200%",
        duration: duration,
        ease: "expo.out",
        stagger: staggerDelay,
      },
      `break${i}`
    )

    lastStaggerLength = splitted.chars.length
    console.log(lastStaggerLength)
  }
}

function initGSAPAnimation() {
  // Only run the animation if the screen width is greater than or equal to 1000px
  if (window.matchMedia("(min-width: 1000px)").matches) {
    const portfolioContainer = document.querySelector(".project-card-container");
    const totalScrollWidth =
      portfolioContainer.scrollWidth - window.innerWidth + window.innerWidth * 0.05;
    const projectCards = document.querySelectorAll(".project-card");
    const snapPoints = Array.from(projectCards).map(
      (_, index) => -index * window.innerWidth
    );

    gsap.to(portfolioContainer, {
      x: -totalScrollWidth, // Moves the container horizontally
      ease: "none",
      scrollTrigger: {
        trigger: ".portfolio",
        start: "top+=50 top",
        end: () => `+=${totalScrollWidth}`, // Matches horizontal scroll length
        scrub: true,
        pin: true, // Pins the section
        anticipatePin: 1,
      },
    });
  }
}


document.querySelectorAll("a[href^='#']").forEach(link => {
  link.addEventListener("click", function (e) {
      e.preventDefault(); // Prevent default anchor behavior

      const targetId = this.getAttribute("href"); // Get target ID
      const targetElement = document.querySelector(targetId); // Find target element

      if (targetElement) {
          gsap.to(window, {
              duration: 1, // Adjust duration as needed
              scrollTo: targetElement,
              ease: "power2.inOut"
          });
      }
  });
});

// Initialize the GSAP animation on page load
initGSAPAnimation();

// Re-check and apply animations when the window is resized
window.addEventListener("resize", initGSAPAnimation);
