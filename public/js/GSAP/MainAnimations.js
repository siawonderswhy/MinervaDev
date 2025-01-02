// Registration of GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

// Scroll Smoother for all Pages
document.addEventListener("astro:page-load", () => {
  const content = document.getElementById("smooth-content")
  gsap.set(document.body, { height: content.clientHeight })
  ScrollSmoother.create({
    smooth: 0.86,
    smoothTouch: 0,
  })
})

var lineSplitElements = document.querySelectorAll("#LineSplit")
var split = new SplitText(lineSplitElements, {
  type: "words",
})
gsap.from(split.words, {
  duration: 0.86,
  y: "100%",
  ease: "power4",
  stagger: 0.086, //Time between each word
})

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
const duration = 0.86
const staggerDelay = 0.086

let lastStaggerLength = null
const anim = gsap.timeline({
  repeat: -1,
  delay: 1.5,
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
        y: "-110%",
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
        y: "150%",
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
        y: "150%",
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
        y: "-110%",
        duration: duration,
        ease: "expo.out",
        stagger: staggerDelay,
      },
      `break${i}`
    )

    lastStaggerLength = splitted.chars.length
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
        start: "top top",
        end: () => `+=${totalScrollWidth}`, // Matches horizontal scroll length
        scrub: true,
        pin: true, // Pins the section
        anticipatePin: 1,
      },
    });
  } else {
    console.log("Screen width is below 1000px. GSAP animation disabled.");
  }
}

// Initialize the GSAP animation on page load
initGSAPAnimation();

// Re-check and apply animations when the window is resized
window.addEventListener("resize", initGSAPAnimation);
