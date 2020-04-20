import gsap from "gsap";
import ScrollComponent from "./ScrollComponent";

export default class CursosUtilities{
    public scrollElement;
    constructor(element){
        this.scrollElement = new ScrollComponent(element);
    }

    initCursosScroll = async () => {
        if(document.querySelector('.csr-scrollbar')){
            document.querySelector('.csr-scrollbar').remove();
        }
        await this.scrollElement.getScrollElement();
        //this.scrollElement.runAnimations();
    };

    enterAnimations = () => {
        let initialMove = gsap.timeline();
        initialMove.fromTo('#casor-header>div:first-child',{opacity:0,x:-60},{duration:1.5,x:0,opacity:1,ease:'power2.out'},"sc");
        initialMove.fromTo('#casor-header>div:last-child',{opacity:0,x:'100%'},{duration:1,opacity:1,x:'0%',ease:'power3.out'},"sc");

        initialMove.fromTo('.curso-item',{opacity:0,alpha:0,scale:.5},{opacity:1,scale:1,stagger:{amount:2},ease:'power2.out'},"sc+=.5");
    };
}
