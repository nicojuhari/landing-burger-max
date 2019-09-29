createNav = (...items) => {
    
    //concate the arrays
        var [home, meals] = items;
        var allInOne = [...home, ...meals];
    
    //creates a virtual block/box
        let virtualBlock = document.createDocumentFragment();
    
    //creates the navigation items/list
        for(i in allInOne) {
            let liNav = document.createElement('li');
            if(i == 0) liNav.classList.add('active');
            liNav.setAttribute('data-nav', allInOne[i].id);
            liNav.innerHTML = `<a href="#${allInOne[i].id}" title="${allInOne[i].title}">${allInOne[i].title}</a>`;
            virtualBlock.appendChild(liNav);
        }
    //clone the nav for mobile    
        let mobileVirtualblock = virtualBlock.cloneNode(true);
    //adds the new navigation items into the page
        
        //mobile nav
        document.getElementById('main-nav-mobile').appendChild(mobileVirtualblock);
        
        //desktop nav
        document.getElementById('main-nav').appendChild(virtualBlock);
        
    //end
}

createSections = (...items) => {
    
    let [homePage, meals] = items;
    // creates a virtual block
        let virtualBlock = document.createDocumentFragment();
    
    //create the Home/Main page
        let sectionHome = document.createElement('section');
        homePage = homePage[0];
        sectionHome.classList.add(homePage.id);
        sectionHome.classList.add('active');
        sectionHome.setAttribute('id', homePage.id);
        sectionHome.style.backgroundImage = `url(./assets/images/bg/${homePage.bgImage})`;
        sectionHome.innerHTML = `
                                <div class="hero-banner container">
                                    <h1 class="hb-title">${homePage.pageTitle}</h1>
                                    <h3 class="hb-subtitle">${homePage.pageSubTitle}</h3>
                                </div>
                                <div class="hb-cta scroll-btn js-next-section" data-nav="${meals[0].id}"><span class="down-icon"></span></div>
                                `;
        sectionHome.querySelector('.steps-nr').innerHTML = meals.length;
        virtualBlock.appendChild(sectionHome);               
    
    //crate the Meal Sections
        for(meal of meals) {
            let sectionMeal = document.createElement('section');
            sectionMeal.classList.add(meal.id);
            sectionMeal.classList.add('meals');
            sectionMeal.setAttribute('id', meal.id);
            
            let content = `
                <div class="section-meal-header flex-between-center container">
                    <div class="smh-title">${meal.title} - £${meal.price.toFixed(2)}</div>
                    <div class="toggle-btn flex-center-center js-smh-toggle" data-section-id="${meal.id}" title="Collapse"></div>
                </div>
                <div class="section-meal-content container"> 
                    <div class="meal-info">
                        <h2 class="meal-title">${meal.title}</h2>
                        <div class="meal-desc">${meal.description}</div>
                        <div class="meal-order">
                            <div class="meal-price">£ ${meal.price.toFixed(2)}</div>
                            <button class="meal-cta order-btn" data-meal-id=${meal.id}>Order Now</button>
                        </div>
                    </div>
                    <div class="meal-image flex-center-center">
                        ${ meal.deal ? `<span class="meal-deal">Today's<br>Deal!</span>` : ''} 
                        <img  class="option-image" src="./assets/images/meals/${meal.image}"/>
                    </div>
                </div>
            `;
            sectionMeal.innerHTML = content;
            virtualBlock.appendChild(sectionMeal);
        }

    document.getElementById('page-sections').appendChild(virtualBlock);
}

document.addEventListener('DOMContentLoaded', () => {
    
    // generate the dynamic DOM (navigation and page sections) 
        createNav(homePage, meals);
        createSections(homePage, meals);

});