import ScrollComponent from "./ScrollComponent";

export default class WebUtils{
    public scrollElement;
    public element;

    constructor(element){
        this.element =element;
    }

    initScroll = async () => {
        this.scrollElement = new ScrollComponent(this.element);
        if(document.querySelector('.csr-scrollbar')){
            document.querySelector('.csr-scrollbar').remove();
        }
        await this.scrollElement.getScrollElement();
        this.scrollElement.runAnimations();
    };
}
