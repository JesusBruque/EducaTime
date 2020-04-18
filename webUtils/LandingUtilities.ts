import gsap from "gsap";

export default class LandingUtilities{
    private scrollElement;
    private readonly htmlElement;
    constructor(element){
        this.htmlElement = document.querySelector(element);
    }

    getScrollElement = async() => {
        let src = await import('locomotive-scroll');
        this.scrollElement = new src.default({
            el:this.htmlElement,
            smooth:true
        });
    }

    enterAnimations = () => {
        let initialMove = gsap.timeline();
        let y = - document.querySelector('#main_field').getBoundingClientRect().height *0.43 ;
        let x = - document.querySelector('#main_field').getBoundingClientRect().width *0.76;
        initialMove.to('#main_field',{duration:.1,rotation:9,rotationY:-18,rotationX:54,x:x,y:y,skewX:3,skewY:5,ease:'power2.out',force3D:true},);
        initialMove.to('.field_border',{duration:1.5,strokeDashoffset:0,ease:'power2.inOut'},"sc");

        initialMove.fromTo('#casor-header>div:first-child',{opacity:0,x:-60},{duration:1.5,x:0,opacity:1,ease:'power2.out'},"sc");
        initialMove.fromTo('#casor-header>div:last-child',{opacity:0,x:'100%'},{duration:1,opacity:1,x:'0%',ease:'power3.out'},"sc");
        initialMove.fromTo('#welcome-section .title',{opacity:0,y:-100},{duration:1.5,opacity:1,y:0,ease:'power2.out'},"sc");

        initialMove.to('#main_field .field_element',{duration:1.5,strokeDashoffset:0,ease:'power2.inOut'},"tr");
        initialMove.fromTo('#welcome-section .csr-btn',{opacity:0,y:-60},{duration:1,opacity:1,y:0,ease:'power3.out'},"tr");
    }
}
