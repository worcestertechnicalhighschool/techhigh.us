class Carousel {
    // Private field declarations
    #sliding = false;
    #next_sliding = false;
    #prev_sliding = false;
    
    constructor(element) {
      this.position = 0;
      this.interval = null;
      this.speed = 5000;
      this.slideshow = element;
      this.slideContainer = this.slideshow.querySelector('.slide-container');
      this.numSlides = this.slideContainer.children.length;
      
      this.current = this.slideContainer.children[0];
      this.next = this.slideContainer.children[1];
      
      this.controls = this.slideshow.querySelectorAll('.controls');
      this.indicators = this.slideshow.querySelector('.indicators');
      
      this.slideCallback = this.slideCallback.bind(this);
      this.nextSlide = this.nextSlide.bind(this);
      this.prevSlide = this.prevSlide.bind(this);
      
      if ( !this.next ) { // we need a min of three slides to begin
        this.next = this.current.cloneNode(true);
        this.slideContainer.append( this.next );
        this.slideContainer.append( this.next.cloneNode(true) );
      }
      
      const lastCopy = this.slideContainer.children[ this.slideContainer.children.length - 1 ].cloneNode(true);
      this.prev = lastCopy;
      this.slideContainer.prepend(this.prev);
      
      
      [...this.slideContainer.children].forEach( (s,i) => {
        s.addEventListener('transitionend', this.slideCallback);
        s.dataset.order = i;
        if (i < 1 ) {
          s.classList.add('prev');
        }else if (i === 1) {
          s.classList.add('current');
        } else {
          s.classList.add('next');
        }
      });
      
      // If Controls
      if (this.controls.length > 0) {
        this.controls[0].addEventListener('click', this.prevSlide);
        this.controls[1].addEventListener('click', this.nextSlide);
      }
      
      // If Indicators
      if (this.indicators) {
        for (let i=0; i<this.numSlides; i++) {
          const item = document.createElement("li");
          if (i == this.position) {
            item.classList.add('active');
          }
          this.indicators.append(item);
        }
      }
    } // constructor
    
    nextSlide() {
      if (this.#sliding) return;
      this.#sliding = true;
      this.#next_sliding = true;
      
      this.current.classList.add('sliding');
      this.next.classList.add('sliding');
      
      this.current.classList.add('prev');
      this.next.classList.remove('next');
      if (this.indicators) {
        this.indicators.children[this.position].classList.remove('active');
        this.position++;
        if (this.position >= this.numSlides){
          this.position=0;
        }
        this.indicators.children[this.position].classList.add('active');
      }
    }
    
    prevSlide() {
      if (this.#sliding) return;
      this.#sliding = true;
      this.#prev_sliding = true;
      
      this.current.classList.add('next');
      this.current.classList.add('sliding');
      
      this.prev.classList.remove('prev');
      this.prev.classList.add('sliding');
      if (this.indicators) {
        this.indicators.children[this.position].classList.remove('active');
        this.position--;
        if (this.position < 0 ){
          this.position = this.numSlides-1;
        }
        this.indicators.children[this.position].classList.add('active');
      }
    }
    
    run() {
      this.interval = setInterval(this.nextSlide, this.speed);
    }
    
    stop() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    }
    
    // this is where the complicated shuffling and state management takes place
    slideCallback(e) {
      if (e.propertyName == 'transform') {
        const s = e.target
        s.classList.remove('sliding'); // sliding is done;
        
        // nextSlide is running
        if (this.#next_sliding) {
           if (this.next.classList.contains('sliding') || 
               this.current.classList.contains('sliding')) {
             // console.log('not done sliding')
             return; // both slides are not done yet
           }
          // Both slides are done. Shuffle.
          // console.log('both done sliding!')
          
          // Current moved to Prev, Next moved to Current
          //   p <=== c <=== n
          
          // Remove old Prev
          this.prev.remove();
          
          
          // Make new Next
          this.next = this.slideContainer.children[2]; // this.current.nextElementSibling;
          
          // Make new Current
          this.current = this.slideContainer.children[1]; // this.next;
          this.current.classList.add('current');
         
          // Make new Prev
          this.prev = this.slideContainer.children[0]; // this.current;
          this.prev.classList.remove('current');
          
          // Move Copy of new Prev to end of list
          if (this.prev) {
            const prevCopy = this.prev.cloneNode(true); // copy prev
            prevCopy.classList.remove('prev'); // clean classList
            prevCopy.classList.add('next');
            prevCopy.addEventListener('transitionend', this.slideCallback);
            this.slideContainer.append(prevCopy); // copy to back of the line
          }
          
          this.#next_sliding = false; // report next_sliding is done
          this.#sliding = false // report sliding is done
          
        }
        
      
        // PrevSlide is running
        if (this.#prev_sliding) {
          // Current moved to Next, Prev moved to Current
          //   p ===> c ===> n
          if (this.prev.classList.contains('sliding') || 
                 this.current.classList.contains('sliding')) {
            // console.log('not ready')
             return; // both slides are not done yet
          }
          // Both slides are done. Shuffle.
          // console.log('ready')
          
          // Remove the old Last slide
          this.slideContainer.children[ this.slideContainer.children.length - 1 ].remove(); // remove last item;
          
          // Move Last to front of list
          const lastCopy = this.slideContainer.children[ this.slideContainer.children.length - 1 ].cloneNode(true); // copy last
          lastCopy.classList.remove('next'); // clean classList
          lastCopy.classList.add('prev');
          lastCopy.addEventListener('transitionend', this.slideCallback);
          this.slideContainer.prepend(lastCopy); // copy to front of the line
          
          // Make new Next
          this.next = this.slideContainer.children[2]; // this.current;
          
          // Make new Current
          this.current = this.slideContainer.children[1]; // this.next;
          this.current.classList.add('current');
          
          // Make new Prev
          this.prev = this.slideContainer.children[0]; // this.current;
  
          this.#prev_sliding = false; // report prev_sliding is done
          this.#sliding = false // report sliding is done
        }
      }
      
    } // slideCallback
    
}

const carousels = [...document.querySelectorAll('.carousel')].map( c => new Carousel(c) );
carousels.forEach( c => c.run() );
  
  