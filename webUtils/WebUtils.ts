import ScrollComponent from "./ScrollComponent";
import gsap from 'gsap';
export default class WebUtils{
    public scrollElement;
    public element;

    constructor(element){
        this.element = element;
    }
    removeScroll = () => {
        if(this.scrollElement && this.scrollElement.scrollElement){
            this.scrollElement.scrollElement.destroy();
        }
        if(document.querySelector('.csr-scrollbar')){
            document.querySelector('.csr-scrollbar').remove();
        }
        if(document.querySelector('html').classList.contains('has-scroll-init')){
            document.querySelector('html').classList.remove('has-scroll-init');
            document.querySelector('html').classList.remove('has-scroll-smooth');
        }
    };

    initScroll = async () => {
        this.removeScroll();
        if(document.querySelector(this.element) && document.querySelector(this.element).getBoundingClientRect().height > window.innerHeight){
            this.scrollElement = new ScrollComponent(this.element);
            await this.scrollElement.getScrollElement();
            this.scrollElement.runAnimations();
        }
    };
    initLoader = (text?:string) => {
        if(!document.querySelector('#casor-loader')){
            let loader = document.createElement('div');
            loader.id='casor-loader';
            let loaderContainer = document.createElement('div');
            loaderContainer.id='casor-loader--container';
            let loaderObject = document.createElement('div');
            loaderObject.id = 'casor-loader--object';
            for(let i = 0;i<2;i++){
                let loaderBall = document.createElement('div');
                loaderBall.classList.add('loader-circle');
                loaderObject.appendChild(loaderBall);
            }
            let loaderText;
            if(text){
                loaderText = document.createElement('p');
                loaderText.innerHTML = text;
                loaderText.id = 'casor-loader--text';
            }
            loader.appendChild(loaderContainer);
            loader.appendChild(loaderObject);
            if(text) loader.appendChild(loaderText);
            document.querySelector('body').appendChild(loader);
        }
    };
    changeTextLoader = (text:string)=>{
        if(document.getElementById('casor-loader--text')){
            document.getElementById('casor-loader--text').innerHTML = text;
        }
    };
    startLoader = () => {
        let balls = document.querySelectorAll('#casor-loader--object .loader-circle');
        let timeline = gsap.timeline({repeat:-1,repeatDelay:-.5,yoyo:true,smoothChildTiming:true});
        timeline.fromTo(balls[0],{scale:.2,z:-50},{duration:2,scale:1.1,z:0,ease:'power3.inOut'},"init");
        timeline.fromTo(balls[1],{z:0,scale:1.1},{duration:2,scale:.2,z:-50,ease:'power3.inOut'},"init");
    };
    removeLoader = () => {
        if( document && document.querySelector('#casor-loader')){
            document.querySelector('#casor-loader').remove();
        }

    };

    enterHomeAnimations = () => {
        let initialMove = gsap.timeline();

        initialMove.to('#main_field',{duration:.1,rotation:44,rotationY:-49,rotationX:45,x:0,y:0,z:0,skewX:0,skewY:5,ease:'power2.out',force3D:true});

        initialMove.to('.field_border',{duration:1.5,strokeDashoffset:0,ease:'power2.inOut'},"sc");
        initialMove.fromTo('#welcome-section .title',{opacity:0,y:-100},{duration:1.5,opacity:1,y:0,ease:'power2.out'},"sc");
        initialMove.fromTo('#welcome-claimer>p',{opacity:0,y:-100},{duration:1.5,opacity:1,y:0,ease:'power2.out'},"sc");
        initialMove.to('#main_field .field_element',{duration:1.5,strokeDashoffset:0,ease:'power2.inOut'},"tr");
        initialMove.fromTo('#main_field .field_circle',{fill:'none'},{duration:1.5,fill:'#30bad6',ease:'power2.inOut'},"tr");
        initialMove.fromTo('#welcome-start--btn>button',{opacity:0,y:60},{duration:1,opacity:1,y:0,ease:'power3.out'},"tr");
        initialMove.to(`.element_bb`,{duration:1,opacity:1,ease:'power3.inOut'},"tr");
        initialMove.to('.element_bb path',{duration:1,opacity:1,ease:'power3.inOut'},"tr");


    };

    initHomeScrollAnimations = () => {

        /*--- ANIMACIONES DE LA PRIMERA SECCIÓN ---*/
        let tweenBtn = gsap.to('#welcome-section .csr-btn',{duration:1,rotateX:90,y:-10,z:-50,ease:'power3.out',paused: true});
        let tweenCampo = gsap.timeline({paused:true});
        let durAnimation = window.innerHeight > 950 ? 1600 : window.innerHeight * 2;
        tweenCampo.to('#main_field',{duration:1,rotation:90,rotationY:-50,rotationX:0,x:-37,y:0,z:-650,skewX:-3,skewY:10,ease:'power2.out',force3D:true},"tl");
        this.scrollElement.addAnimation({tween:tweenBtn,duration:120,el:document.querySelector('main')});
        this.scrollElement.addAnimation({tween:tweenCampo,duration:durAnimation,el:document.querySelector('main')});


        // /*--- ANIMACIONES DE LA SEGUNDA SECCION ---*/
        let tweenCursos = gsap.timeline({paused:true});
        tweenCursos.to('#grid-cursos',{duration:1,scale:1,ease:'power2.out'});
        this.scrollElement.addAnimation({tween:tweenCursos,duration:window.innerHeight*2,el:document.querySelector('#cursos-section'),start:'bottom'});


    }
}
