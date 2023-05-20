const hamburger = document.querySelector(".header__menu-icon");
const navMenu = document.querySelector(".nav-inner");
const navItem = document.querySelectorAll(".nav__item-link");
const mediaQuery = window.matchMedia("(max-width: 65rem)");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("cMenu");
  navMenu.classList.toggle("appear");
});

if (mediaQuery.matches) {
  navItem.forEach((item) => {
    item.addEventListener("click", () => {
      setTimeout(() => {
        hamburger.classList.remove("cMenu");
        navMenu.classList.remove("appear");
      }, 300);
    });
  });
}

// ======================= SCROLL ========================

document.addEventListener("DOMContentLoaded", function () {
  // FOR HERO WRAPPER
  if (window.pageYOffset / 3.1 <= 250) {
    updateImg();
    updateTitle();
  }

  if (window.pageYOffset > 760) {
    // IMAGE COLUMN
    updateImgColumn();

    // FOR NUMBERS IN ABOUT SECTION
    updateNumbers();
    // SCROLL NAVIGATION
    scrollActive();
  }
  updateSectionTitle();
});

window.addEventListener("scroll", () => {
  // FOR HERO WRAPPER
  if (window.pageYOffset / 3.1 <= 250) {
    updateImg();
    updateTitle();
  }

  if (window.pageYOffset > 760) {
    // IMAGE COLUMN
    updateImgColumn();

    // FOR NUMBERS IN ABOUT SECTION
    updateNumbers();
    // SCROLL NAVIGATION
    scrollActive();
    //SKILLS
    if (window.pageYOffset < 4500) {
      skillsProgress();
      updateBars();
    }
  }
  updateSectionTitle();
});
// ============ HERO WRAPPER  =============
const container = document.querySelector(".scrollable");
const imgElement = document.querySelectorAll(".carousel-item");
const elementTitle = document.querySelectorAll(".hero-scroll");

function updateImg() {
  const scrollContainer = window.pageYOffset / 3.1;
  const scrollImg = window.pageYOffset / 10.2;
  container.style.transform = `translateY(${scrollContainer}px)`;
  setTimeout(() => {
    imgElement.forEach(
      (img) => (img.style.transform = `translateY(${scrollImg}px)`)
    );
  }, 200);
}

function updateTitle() {
  const scrollTitle = -window.pageYOffset / 3;
  elementTitle.forEach(
    (title) => (title.style.transform = `translateY(${scrollTitle}px)`)
  );
}

// === OWL LIBRARY  ===

$(".owl-carousel").owlCarousel({
  ltr: true,
  nav: true,
  navText: [
    "<i class='fa fa-angle-left'></i>",
    "<i class='fa fa-angle-right'></i>",
  ],
  navContainer: ".custom-nav",

  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 1,
    },
  },
});

//===  SLICK LIBRARY  ===
$(".project__slider").slick({
  prevArrow: ".projects__arrow.prev",
  nextArrow: ".projects__arrow.next",
  dots: true,
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      },
    },
    {
      breakpoint: 1400,
      settings: {
        slidesToShow: 2,
      },
    },
  ],
});

$(".project__slider").on("afterChange", function (event, slick, currentSlide) {
  var totalSlides = slick.slideCount;
  var currentSlideNumber = currentSlide + 1;
  var slideCounter = currentSlideNumber + "/" + totalSlides;
  $(".slide-counter").text(slideCounter);
});

// ============= IMAGE COLUMN ==============
const projectsSec = document.getElementById("projects");
const aboutSec = document.getElementById("about");
const skillSSec = document.getElementById("skills");
const contactSSec = document.getElementById("contacts");
const bgImage = document.querySelector(".wrapper__column-img");
const bgTitle = document.querySelector(".wrapper__column-title");

function updateImgColumn() {
  if (
    window.scrollY >= aboutSec.offsetTop - 100 &&
    window.scrollY < projectsSec.offsetTop - 100
  ) {
    bgImage.setAttribute(
      "style",
      "background-image:url(./assets/img/myImg.jpg);"
    );
    bgTitle.textContent = "About Me";
  } else if (
    window.scrollY >= projectsSec.offsetTop - 100 &&
    window.scrollY < skillSSec.offsetTop - 100
  ) {
    bgImage.setAttribute(
      "style",
      "background-image:url(https://webredox.net/demo/wp/bionick/demo1/wp-content/uploads/2015/07/7.jpg);"
    );
    bgTitle.textContent = "My Projects";
  } else if (
    window.scrollY >= skillSSec.offsetTop - 100 &&
    window.scrollY < contactSSec.offsetTop - 100
  ) {
    bgImage.setAttribute(
      "style",
      "background-image:url(https://webredox.net/demo/wp/bionick/demo1/wp-content/uploads/2015/07/8.jpg);"
    );
    bgTitle.textContent = "My Skills";
  } else {
    bgImage.setAttribute(
      "style",
      "background-image:url(https://webredox.net/demo/wp/bionick/demo1/wp-content/uploads/2015/07/9.jpg);"
    );
    bgTitle.textContent = "Contact Me";
  }
}

// ============= SCROLL PAGE NAVIGATION  ==============
const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 150;
    const sectionBottom = sectionHeight + sectionTop;
    if (scrollY >= sectionTop && scrollY <= sectionBottom) {
      document
        .querySelector(`.scroll__nav-item a[href*='${section.id}']`)
        .classList.add("active-link");
    } else {
      document
        .querySelector(`.scroll__nav-item a[href*='${section.id}']`)
        .classList.remove("active-link");
    }
  });
}

function updateSectionTitle() {
  let scrollY = window.pageYOffset;
  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = Math.floor(section.offsetTop) - 500;
    const sectionBottom = Math.floor(sectionHeight + sectionTop);

    if (scrollY > sectionTop && scrollY < sectionBottom) {
      let scrollTitle = scrollY - section.offsetTop;
      if (scrollTitle <= 300) {
        document.querySelector(
          `#${section.id} .section__title-background`
        ).style.transform = `translateY(${-scrollTitle - 300}px)`;
      }
    }
  });
}

// ============= ABOUT SECTION  ==============
const numbers = document.querySelectorAll(".num");
let startCounter = false;

function updateNumbers() {
  if (!startCounter) {
    if (window.scrollY > aboutSec.offsetTop) {
      numAnimation();
      startCounter = true;
    }
  }
}

const numAnimation = () =>
  numbers.forEach((valueDisplay) => {
    let startNum = 0;
    const endNum = +valueDisplay.getAttribute("data-goal");
    let duration = Math.floor(2000 / endNum);

    let counter = setInterval(() => {
      startNum += 1;
      valueDisplay.textContent = startNum;
      if (startNum == endNum) {
        clearInterval(counter);
      }
    }, duration);
  });

// ====== IMAGE OVERLAY IN PROJECTS ========
const modalViews = document.querySelectorAll(".projects__modal");
const modalBtns = document.querySelectorAll(".project__btn-search");

modalBtns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    modalViews[index - 2].classList.add("active-modal");
  });
});

modalViews.forEach((close, index) => {
  close.addEventListener("click", () => {
    modalViews[index].classList.remove("active-modal");
  });
});

// ============= SKILLS SECTION  ==============
const skillsSec = document.querySelector(".skills");
const progressCircle = document.querySelectorAll(".progress");
let skillsCounter = false;

function skillsProgress() {
  if (window.scrollY > skillsSec.offsetTop - 150) {
    progressCircle.forEach((circle) => {
      let radius = circle.r.baseVal.value;
      let circumFerence = radius * 2 * Math.PI;
      let percent = circle.dataset.prog;
      let duration = Math.floor(3000 / percent);

      setInterval(() => {
        circle.style.strokeDasharray = circumFerence;
        circle.style.strokeDashoffset =
          circumFerence - (percent / 100) * circumFerence;
      }, duration);
    });
    updateCirclePercent();
  }
}

function updateCirclePercent() {
  if (!skillsCounter) {
    progressCircle.forEach((circle, index) => {
      let percent = circle.dataset.prog;
      let startNum = 0;
      let duration = Math.floor(3000 / percent);
      let counter = setInterval(() => {
        startNum += 1;
        document.querySelectorAll(".circle-inner")[index].innerHTML =
          startNum + "%";
        if (startNum == parseInt(percent)) {
          clearInterval(counter);
        }
      }, duration);
    });
    skillsCounter = true;
  }
}

const skillsItems = document.querySelectorAll(".skills__progress-item");
const bar = document.querySelector(".bar__prog-item");
const skillsItem1 = document.querySelector(".skills-item1");
const skillsItem2 = document.querySelector(".skills-item2");
const skillsItem3 = document.querySelector(".skills-item3");

let buttonItem1 = false;
let buttonItem2 = false;

function updateBars() {
  const sectionHeight = skillsItem3.offsetHeight;
  const sectionTop = Math.floor(skillsItem3.offsetTop);
  const sectionBottom = Math.floor(sectionHeight + sectionTop);

  if (
    window.scrollY - (skillsSec.offsetTop - 450) > skillsItem1.offsetTop &&
    !buttonItem1
  ) {
    document
      .querySelectorAll(".skills-item1 .bar__prog-item")
      .forEach((bar) => {
        bar.style.width = bar.dataset.prog;
      });
    buttonItem1 = true;
  } else if (
    window.scrollY - (skillsSec.offsetTop - 450) > skillsItem2.offsetTop &&
    !buttonItem2
  ) {
    document
      .querySelectorAll(".skills-item2 .bar__prog-item")
      .forEach((bar) => {
        bar.style.width = bar.dataset.prog;
      });
    buttonItem2 = true;
  } else if (
    window.scrollY - (skillsSec.offsetTop - 450) > skillsItem3.offsetTop &&
    window.scrollY - (skillsSec.offsetTop - 450) - 500 < sectionBottom
  ) {
    document
      .querySelectorAll(".skills-item3 .bar__prog-item")
      .forEach((bar) => {
        bar.style.width = bar.dataset.prog;
      });
  }
}

// ============= TO TOP BUTTON  ==============
const up = document.querySelector(".to-top");

up.onclick = function () {
  window.scrollTo({
    top: 0,
  });
};
