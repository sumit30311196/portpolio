var typed = new Typed('.name', {
  strings: ['Designer', 'Developer'],
  typeSpeed: 150,
  backSpeed: 150,
  loop: true
})

//--------owl-carousel-Start-----------//
$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    autoplay: true,
    smartSpeed: 1000,
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 2
      }
    }
  })
});
//--------owl-carousel-End-----------//

// Form Validation Start //
function validateForm() {
  let nm = document.getElementById('fname').value;
  let eml = document.getElementById('Email').value;
  let mob = document.getElementById('tel').value;
  let sub = document.getElementById('subject').value;
  let msg = document.getElementById('Massage').value;


  if (nm == "") {
    // modal.style.display = "block";
    // info.innerHTML = "Name must be filled out";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Name must be filled out"
    });
    return false;
  }
  else if (nm.length < 3) {
    // modal.style.display = "block";
    // info.innerHTML = "Name must be between Three characters";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Name must be between Three characters"
    });
    return false;
  }
  if (eml == "") {
    // modal.style.display = "block";
    // info.innerHTML = "Email ID must be filled out";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Email ID must be filled out"
    });
    return false;
  }
  if (!eml.match(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/)) {
    // modal.style.display = "block";
    // info.innerHTML = "Please Enter Validate Email ID"; 
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please Enter Validate Email ID"
    });
    return false;
  }
  if (mob == "") {
    // modal.style.display = "block";
    // info.innerHTML = "Mobile No must be filled out";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Mobile No must be filled out"
    });
    return false;
  }
  if (isNaN(mob)) {
    // modal.style.display = "block";
    // info.innerHTML = "Please Enter Only Number";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please Enter Only Number"
    });
    return false;
  }
  if (!mob.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
    // modal.style.display = "block";
    // info.innerHTML = "Please Enter Validate Mobile Number"; 
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Please Enter Validate Mobile Number"
    });
    return false;
  }
  if (sub == "") {
    // modal.style.display = "block";
    // info.innerHTML = "Subject must be filled out";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Subject must be filled out"
    });
    return false;
  }
  if (msg == "") {
    // modal.style.display = "block";
    // info.innerHTML = "Message must be filled out";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Message must be filled out"
    });
    return false;
  } else {
    // modal.style.display = "block";
    // info.innerHTML = "Your message has been sent successfully";

    Swal.fire({
      title: "Thank You.....!",
      text: "Your message has been sent successfully",
      icon: "success"
    });

    nm.value = "";
    eml.value = "";
    mob.value = "";
    sub.value = "";
    msg.value = "";
    return true;
  }

}
// Form Validation End //

var year = new Date().getFullYear();
//  year.getFullYear();
document.getElementById("yr").innerHTML = year;


const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];

let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;

// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
  carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");

// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
  });
});

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  // Records the initial cursor and scroll position of the carousel
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
  if (!isDragging) return; // if isDragging is false return from here
  // Updates the scroll position of the carousel based on the cursor movement
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}

const infiniteScroll = () => {
  // If the carousel is at the beginning, scroll to the end
  if (carousel.scrollLeft === 0) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
    carousel.classList.remove("no-transition");
  }
  // If the carousel is at the end, scroll to the beginning
  else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
    carousel.classList.add("no-transition");
    carousel.scrollLeft = carousel.offsetWidth;
    carousel.classList.remove("no-transition");
  }

  // Clear existing timeout & start autoplay if mouse is not hovering over carousel
  clearTimeout(timeoutId);
  if (!wrapper.matches(":hover")) autoPlay();
}

const autoPlay = () => {
  if (window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
  // Autoplay the carousel after every 2500 ms
  timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

