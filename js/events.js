removeClassHide = el => el.classList.remove('hide');
addClassHide = el => el.classList.add('hide');

removeClassActive = el => el.classList.remove('active');
addClassActive = el => el.classList.add('active');

openSection = sectionId => removeClassHide(document.getElementById(sectionId));
closeSection = sectionId => addClassHide(document.getElementById(sectionId));

scrollToSection = sectionId => document.getElementById(sectionId).scrollIntoView({  behavior: 'smooth' });

setActiveNavItem = (sectionId) => {
    //main nav from header
    removeClassActive(document.querySelector('#main-nav li.active'));
    addClassActive(document.querySelector('#main-nav li[data-nav=' + sectionId + ']'));
    
    //mobile nav
    removeClassActive(document.querySelector('#main-nav-mobile li.active'));
    addClassActive(document.querySelector('#main-nav-mobile li[data-nav=' + sectionId + ']'));
}

toggleSection = (sectionId) => {
    const mealSection = document.getElementById(sectionId);
    
    if(mealSection.classList.contains('hide')) {
        openSection(sectionId);
        scrollToSection(sectionId);
    } else {
        closeSection(sectionId);
    }
}

document.addEventListener('DOMContentLoaded', () => {

    // get the DOM
    var headerBlock = document.querySelector('header');
    var mobileNavBlock = document.querySelector('.mobile-nav');
    var toTopBtn = document.getElementById('to-top');
    let heroBannerBtn = document.querySelector('.js-next-section');
    let mainNavLinks = document.querySelectorAll('ul[data-nav="main-nav"] a');
    let allSections = document.querySelectorAll('section');
    let toggleSectionBtns = document.querySelectorAll('.js-smh-toggle');
    

    // declare Variables;
    var pageScrolling, sectionScrolling;
    var windHeight = window.innerHeight;
    var halfOfwindHeight = windHeight / 2;

    // Event Listener: Click => Main Navigation / Mobile Nav
    mainNavLinks.forEach((link) => {

        link.addEventListener('click', (event) => {
            
            event.preventDefault();
            
            const sectionId = event.target.parentElement.dataset.nav;
            
            setActiveNavItem(sectionId);
            openSection(sectionId);
            scrollToSection(sectionId);
        });
    })
    

    // Event Listener: Click => Scroll To Top
    toTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Event Listener: Click => Scroll To Next Section from Home Page/Section
    heroBannerBtn.addEventListener('click', () => {
        const sectionId = heroBannerBtn.getAttribute('data-nav');
        openSection(sectionId);
        scrollToSection(sectionId);
    });

    // Event Listener: Click => Collapse and Expand the Burger Sections
    toggleSectionBtns.forEach((toggleBtn) => {
        toggleBtn.addEventListener('click', (event) =>{
            const sectionId = event.target.getAttribute('data-section-id');
            toggleSection(sectionId);
        });
    })

    // Event Listener: Scroll 
    document.addEventListener('scroll', () => {

        /* 1. Show and Hide the To-Top-Btn */
            
            // check if is scrolled more than the half of the first screen
            window.pageYOffset > halfOfwindHeight ? addClassHide(toTopBtn) : removeClassHide(toTopBtn);

        /* 2. Show and hide the navbar when the scrolling stopped */
            
            // show the nav/mobile nav while scroll
            removeClassHide(headerBlock);
            removeClassHide(mobileNavBlock);

            // clear out the timeout throughout the scroll
            window.clearTimeout( pageScrolling );

            // Set a timeout to run after scrolling ends
            pageScrolling = setTimeout(function() {
                
                // check if is scrolled more than the half of the first screen
                    if(window.pageYOffset > halfOfwindHeight){
                        
                        //hide both navs
                        addClassHide(headerBlock);
                        addClassHide(mobileNavBlock);
                    }
            }, 1400);

        /* 3. Change the active section on scroll */
            window.clearTimeout( sectionScrolling );

            sectionScrolling = setTimeout(() => {

                allSections.forEach((section) => {
                    
                    //get the section coordinates   
                    let sectionOffSet = section.getBoundingClientRect().top;
                    
                    if(sectionOffSet < (windHeight * 0.4) && sectionOffSet > (windHeight * -0.6)) {
                        
                        //change the active section
                        addClassActive(section);

                        //change active link in the navs;
                        setActiveNavItem(section.getAttribute('id'));
                    }
                    else {
                        removeClassActive(section);
                        
                    }
                })
            }, 50);
    });
   

}) //end DOMContentLoaded event