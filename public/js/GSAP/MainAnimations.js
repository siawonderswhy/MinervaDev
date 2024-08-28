// Registration of GSAP Plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

// Scroll Smoother for all Pages
document.addEventListener("astro:page-load", () => {
  const content = document.getElementById("smooth-content")
  gsap.set(document.body, { height: content.clientHeight })
  ScrollSmoother.create({
    smooth: 0.86,
    smoothTouch: 0.2,
  })
})

// Split Lines of text with ID of #Quote
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
