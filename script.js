gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});



// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();






const scroll = new LocomotiveScroll({
    el: document.querySelector('#main'),
    smooth: true
});
let cursor1=document.querySelector("#cursor1")

let page1=document.querySelector("#page1")

page1.addEventListener("mousemove",function(dets){
        cursor1.style.opacity=1
        gsap.to("#cursor1",{
            x:dets.x,
            y:dets.y,
        })
    })
    
 page1.addEventListener("mouseleave",function(){
        cursor1.style.opacity=0
    })


function hover(){
    let fixed = document.querySelector("#fixed");
    let elems = document.querySelector("#elems");
    
    elems.addEventListener("mouseenter", function () {
        fixed.style.display = "block";
    });
    
    elems.addEventListener("mouseleave", function (e) {
        // Check if the mouse has really left the #elems container
        if (!fixed.contains(e.relatedTarget)) {
            fixed.style.display = "none";
        }
    });
    
    fixed.addEventListener("mouseenter", function () {
        // If the mouse enters the fixed div, keep it displayed
        fixed.style.display = "block";
    });
    
    fixed.addEventListener("mouseleave", function (e) {
        // Check if the mouse has really left the #fixed container
        if (!elems.contains(e.relatedTarget)) {
            fixed.style.display = "none";
        }
    });
    
    var elemsList = document.querySelectorAll("#elem");
    
    elemsList.forEach(function (e) {
        e.addEventListener("mouseenter", function () {
            var vid = e.getAttribute("data-image");
            fixed.style.backgroundImage = `url(${vid})`;
        });
    });
}
hover()

function clickeffect()
{
    var pro=document.querySelector("#pro h1")
var des=document.querySelector("#des h1")
var exe=document.querySelector("#exe h1")
var line1=document.querySelector("#line1")
var line2=document.querySelector("#line2")
var line3=document.querySelector("#line3")
var right=document.querySelector("#right img")
var p=document.querySelector("#left-bot p")
pro.addEventListener("click",function(){
    pro.style.color="#EFEAE3"
    des.style.color="#504A45"
    exe.style.color="#504A45"
 line1.style.backgroundColor="#5b5959"
 line3.style.backgroundColor="#5b5959"
 line2.style.backgroundColor="#f95534"
 p.innerHTML="<p>Once we have a design, our production team <br> takes the lead in bringing it to life. We manage all <br> stages of the project, from build specifications and <br> technical drawings to site surveys, vendor <br> management, and 2D & 3D production. We have <br> an extensive network of partners to meet each <br> unique design and project need.</p>"

      right.setAttribute("src","./64d3dd9edfb41666c35b15e1_Project-p-1080.png")
})
exe.addEventListener("click",function(){
    exe.style.color="#EFEAE3"
    pro.style.color="#504A45"
    des.style.color="#504A45"
 line1.style.backgroundColor="#5b5959"
 line2.style.backgroundColor="#5b5959"
 line3.style.backgroundColor="#f95534"
p.innerHTML="<p>We’re with you every step of the way, from the <br> project initiation to launch day. Our production and <br> design teams are onsite to direct and guide the <br> process down to the last point of completion,<br> ensuring success across the built space and <br> experience.</p>"
      right.setAttribute("src","https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15cd_Execution-p-1080.jpg")
})
des.addEventListener("click",function(){
    des.style.color="#EFEAE3"
    pro.style.color="#504A45"
    exe.style.color="#504A45"
 line3.style.backgroundColor="#5b5959"
 line2.style.backgroundColor="#5b5959"
 line1.style.backgroundColor="#f95534"
p.innerHTML="<p>Our team works with our clients to refine an idea <br> and concept into an executable design. We create <br> a final design that encompasses the brand <br> narrative to bring stories to life and provide end <br>-to-end design solutions from concept, design, and <br> architectural drawings to 3D renderings.</p>"
      right.setAttribute("src","https://assets-global.website-files.com/64d3dd9edfb41666c35b15b7/64d3dd9edfb41666c35b15d0_Project.webp")
})
}
clickeffect()


var loader=document.querySelector("#loader")
var loadh1=document.querySelector("#loader h1")


 let h3=document.querySelector("#cen-left h3")
 let h3con=h3.textContent
 let splitted=h3con.split("")

 var clutter=""
 splitted.forEach(function(elem){
       clutter+=`<span>${elem}</span>`
 })
 h3.innerHTML=clutter;
 console.log(h3)

setTimeout(function(){
    loadh1.innerHTML="EXPRIENCES"

    setTimeout(function(){
      loadh1.innerHTML="CONTENT"
    },1000)

    setTimeout(function(){
 loadh1.style.opacity=0
    },2000)

    setTimeout(function(){
        loader.style.top="-100%"
        
        },3000)

       setTimeout(function(){
        gsap.from("#cen-left h3 span",{
            opacity:0,
            stagger:0.03,
            duration:0.5
         })
         gsap.from("#cen-right h1 span",{
            opacity:0,
            y:50,
            stagger:0.5,
            duration:2
            })

       },3000)

},1000)


var conh1 = document.querySelector("#contents h1");
var i = conh1.textContent;
var isplit = i.split("");
var clut = "";
isplit.forEach(function (ele) {
  clut += `<span>${ele}</span>`;
});
conh1.innerHTML = clut;


let pinState = false; // Track pin state

gsap.to("#contents h1 span", {
  color: "black",
  stagger: 0.2,
  scrollTrigger: {
    trigger: "#page-2",
    scroller: "#main",
    start: "top -20%",
    end: "top -80%",
    scrub: true,
  },
});

gsap.from("#img-part",{
    opacity:0,
    y:70,
    duration:3,
    delay:1,
    scrollTrigger:{
        scroller:"#main",
        trigger:"#page-2",
        start:"top 20%",
        end:"top 10%"
    }
})





function swipper(){
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: "auto",
        centeredSlides: false,
        spaceBetween: 20,
      });
}
swipper()


function page5cur(){
    var cur=document.querySelector("#cursor2")
var swip=document.querySelector(".swiper")
var page5=document.querySelector("#page-5")
    page5.addEventListener("mousemove",function(dets){
        cur.style.opacity=1
        cur.style.transform="translate(100%,-50%);"
        gsap.to("#cursor2",{
            x:dets.x,
            y:dets.y,
        })
    })
    page5.addEventListener("mouseleave",function(){
        cur.style.opacity=0
    })
}
page5cur()

function nav(){
    var full=document.querySelector("#full-sc")
var img=document.querySelector("nav img")
var nav=document.querySelector("#nav-part3")
var navi=document.querySelector("#nav-part3 i")
var navii=document.querySelector("#cross i")
var na=document.querySelector("nav")
var half=document.querySelector("#half")
let flag=true;
nav.addEventListener("click",function(){
    if(flag){
        full.style.top="0"
        img.style.opacity=0
        na.style.borderBottom="1px solid black"
        full.style.transition="all ease 2s"
        half.style.transition="all ease 2s"

        flag=false
    }
    else{
        full.style.top="-100%"
        img.style.opacity=1
        navi.style.display="block"
        na.style.borderBottom="0px solid black"
        flag=true
    }
    
})

}
nav()