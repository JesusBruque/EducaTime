import ScrollComponent from "./ScrollComponent";
import gsap from 'gsap';
export default class WebUtils{
    public scrollElement;
    public element;

    constructor(element){
        this.element = element;
    }

    initScroll = async () => {
        if(document.querySelector('.csr-scrollbar')){
            document.querySelector('.csr-scrollbar').remove();
        }
        if(document.querySelector(this.element).getBoundingClientRect().height > window.innerHeight){
            this.scrollElement = new ScrollComponent(this.element);
            await this.scrollElement.getScrollElement();
            this.scrollElement.runAnimations();
        }
    };
    initLoader = () => {
        if(!document.querySelector('#casor-loader')){
            let loader = document.createElement('div');
            loader.id='casor-loader';
            let loaderContainer = document.createElement('div');
            loaderContainer.id='casor-loader--container';
            let loaderObject = document.createElement('div');
            loaderObject.id = 'casor-loader--object';
            for(let i = 0;i<5;i++){
                let loaderBall = document.createElement('div');
                loaderBall.classList.add('loader-ball');
                loaderObject.appendChild(loaderBall);
            }

            loader.appendChild(loaderContainer);
            loader.appendChild(loaderObject);
            document.querySelector('body').appendChild(loader);
        }
    };
    startLoader = () => {
        let balls = document.querySelectorAll('#casor-loader--object .loader-ball');
        let timeline = gsap.timeline({repeat:-1});
        for(let i=0;i<5;i++){
            timeline.to(balls[i],{duration:.5,y:-15,ease:'power4.in',delay:i*.2},"init");
            timeline.to(balls[i],{duration:.5,y:0,ease:'power4.out',delay:i*.2 + .5},"init");
            // timeline.to(balls[i],{duration:.3,scaleY:.6,ease:'power4.out',delay:i*.3 + .5},"init");
            // timeline.to(balls[i],{duration:.3,scaleY:1,ease:'power4.in',delay:i*.3 + .8},"init");
        }
        // timeLoader.to(balls[3],{duration:1,y:'-50%',ease:'power4.inOut'},"-=1");
        // timeLoader.to(balls[3],{duration:.2,scaleY:.3,ease:'power4.out'});
        // timeLoader.to(balls[3],{duration:.2,scaleY:1,ease:'power4.in'});
    };
    removeLoader = () => {
        console.log('removing loader');
        if( document.querySelector('#casor-loader')){
            document.querySelector('#casor-loader').remove();
        }

    };
}
