export default class ScrollComponent{
    private readonly htmlElement;
    private scrollElement;
    constructor(element){
        this.htmlElement = document.querySelector(element);
    }

    getScrollElement = async() => {
        let src = await import('locomotive-scroll');
        this.scrollElement = new src.default({
            el:this.htmlElement,
            smooth:true
        });
    };
}
