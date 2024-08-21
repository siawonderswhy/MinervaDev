gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

document.addEventListener("astro:page-load", () => {
  const content = document.getElementById("smooth-content")
  gsap.set(document.body, { height: content.clientHeight })
  ScrollSmoother.create({
    smooth: 1.5,
  })
})
