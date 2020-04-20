import gsap from "gsap";
import ScrollComponent from "./ScrollComponent";

export default class LandingUtilities{
    public scrollElement;
    constructor(element){
        this.scrollElement = new ScrollComponent(element);
    }

    initHomeScroll = async () => {
        if(document.querySelector('.csr-scrollbar')){
            document.querySelector('.csr-scrollbar').remove();
        }
        await this.scrollElement.getScrollElement();
        this.scrollElement.runAnimations();
    };

    enterAnimations = () => {
        let initialMove = gsap.timeline();
        let y = - document.querySelector('#main_field').getBoundingClientRect().height *0.43 ;
        let x = - document.querySelector('#main_field').getBoundingClientRect().width *0.76;
        initialMove.to('#main_field',{duration:.1,rotation:20,rotationY:-16,rotationX:34,x:x,y:y,z:-50,skewX:-3,skewY:5,ease:'power2.out',force3D:true});
        initialMove.to('.field_border',{duration:1.5,strokeDashoffset:0,ease:'power2.inOut'},"sc");

        initialMove.fromTo('#casor-header>div:first-child',{opacity:0,x:-60},{duration:1.5,x:0,opacity:1,ease:'power2.out'},"sc");
        initialMove.fromTo('#casor-header>div:last-child',{opacity:0,x:'100%'},{duration:1,opacity:1,x:'0%',ease:'power3.out'},"sc");
        initialMove.fromTo('#welcome-section .title',{opacity:0,y:-100},{duration:1.5,opacity:1,y:0,ease:'power2.out'},"sc");

        initialMove.to('#main_field .field_element',{duration:1.5,strokeDashoffset:0,ease:'power2.inOut'},"tr");
        initialMove.fromTo('#main_field .field_circle',{fill:'none'},{duration:1.5,fill:'#30bad6',ease:'power2.inOut'},"tr");
        initialMove.fromTo('#welcome-section .csr-btn',{opacity:0,y:-60},{duration:1,opacity:1,y:0,ease:'power3.out'},"tr");
        // initialMove.to('#welcome-section .csr-btn',{duration:1,rotateX:90,z:-50,y:-10,ease:'linear'},"-=.5");
    };

    initScrollAnimations = () => {

        /*--- ANIMACIONES DE LA PRIMERA SECCIÓN ---*/
        let tweenBtn = gsap.to('#welcome-section .csr-btn',{duration:1,rotateX:90,y:-10,z:-50,ease:'power3.out',paused: true});
        let tweenCampo = gsap.timeline({paused:true});
        tweenCampo.to('#main_field',{duration:1,rotation:44,rotationY:-15,rotationX:38,x:'-90%',y:'-45%',z:50,skewX:-3,skewY:10,ease:'power2.out',force3D:true},"tl");
        tweenCampo.to(`.element_bb`,{opacity:1,ease:'power3.inOut'},"tl");
        tweenCampo.to('.element_bb path',{opacity:1,ease:'power3.inOut'},"tl");

        this.scrollElement.addAnimation({tween:tweenBtn,duration:120,el:document.querySelector('main')});
        this.scrollElement.addAnimation({tween:tweenCampo,duration:window.innerHeight*2,el:document.querySelector('main')});


        /*--- ANIMACIONES DE LA SEGUNDA SECCION ---*/
        let tweenLevels = gsap.timeline({paused:true});
        let imgs = document.querySelectorAll('#secondSection>div>img');
        tweenLevels.to('#level-1>div',{duration:1,y:0,ease:'power2.out'});
        tweenLevels.to('#level-1>p',{duration:1,y:0,ease:'power2.out'},"-=.9");
        tweenLevels.to(imgs[0],{duration:.5,opacity:1});
        tweenLevels.to('#level-2>div',{duration:1,y:0,ease:'power2.out'});
        tweenLevels.to('#level-2>p',{duration:1,y:0,ease:'power2.out'},"-=.9");
        tweenLevels.to(imgs[1],{duration:.5,opacity:1});
        tweenLevels.to('#level-3>div',{duration:1,y:0,ease:'power2.out'});
        tweenLevels.to('#level-3>p',{duration:1,y:0,ease:'power2.out'},"-=.9");

        tweenLevels.to('#level-1>div',{duration:1,y:170,ease:'power2.out'});
        tweenLevels.to('#level-1>p',{duration:1,y:170,ease:'power2.out'},"-=.95");
        tweenLevels.to(imgs[0],{duration:.5,opacity:0});
        tweenLevels.to('#level-2>div',{duration:1,y:170,ease:'power2.out'});
        tweenLevels.to('#level-2>p',{duration:1,y:170,ease:'power2.out'},"-=.95");
        tweenLevels.to(imgs[1],{duration:.5,opacity:0});
        tweenLevels.to('#level-3>div',{duration:1,y:170,ease:'power2.out'});
        tweenLevels.to('#level-3>p',{duration:1,y:170,ease:'power2.out'},"-=.95");

        this.scrollElement.addAnimation({tween:tweenLevels,duration:window.innerHeight*2,el:document.querySelector('#secondSection')});


        /*--- ANIMACIONES DE LA TERCERA SECCION ---*/
        let tweenValores = gsap.timeline({paused:true});
        tweenValores.to('#main_field',{duration:1,rotation:19,rotationY:-19,rotationX:31,width:'50vw',x:'-50%',y:'-60%',z:-50,skewX:-3,skewY:5,ease:'power2.out',force3D:true},"tl");
        tweenValores.to(`.element_bb`,{duration:.5,opacity:0,ease:'power3.inOut'},"tl");
        tweenValores.to(`.element_bb path`,{duration:.5,opacity:0,ease:'power3.inOut'},"tl");
        tweenValores.to('#valorsGrid>img',{duration:.5,opacity:1},"tl+=.7");
        tweenValores.fromTo('#valorsGrid .val_right>div',{x:'100%'},{duration:.5,x:'0%'},"tl+=.9");
        tweenValores.fromTo('#valorsGrid .val_left>div',{x:'-100%'},{duration:.5,x:'0%'},"tl+=.9");
        tweenValores.fromTo('#valorsGrid .val_center>div',{y:-250},{duration:.5,y:'0%'},"tl+=.9");

        this.scrollElement.addAnimation({tween:tweenValores,duration:window.innerHeight*2,el:document.querySelector('#thirdSection'),start:'bottom'});
    }



}
