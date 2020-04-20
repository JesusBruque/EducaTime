export default class ScrollComponent{
    private readonly htmlElement;
    private scrollElement;
    private animations;
    constructor(element){
        this.htmlElement = document.querySelector(element);
        this.animations = [];
    }

    getScrollElement = async() => {
        let src = await import('locomotive-scroll');
        this.scrollElement = new src.default({
            el:this.htmlElement,
            smoothMobile:true,
            smooth:true,
            scrollbarClass:'csr-scrollbar'
        });
    };
    addAnimation(animation){
        this.animations.push(animation);
    }

    runAnimations(){
        try{
            this.scrollElement.on('scroll', (obj) => {
                this.animations.forEach((animation) => {
                    if((!animation.start || animation.start === 'top') &&  obj.scroll.y >= animation.el.offsetTop ||
                        (animation.start && animation.start === 'bottom') && animation.el.getBoundingClientRect().top <= window.innerHeight ){
                        let tween = animation.tween;
                        if(obj.speed === 0){
                            tween.pause();
                        }
                        let perc = animation.start === 'bottom' ? (window.innerHeight - animation.el.getBoundingClientRect().top) / animation.duration : (obj.scroll.y - animation.el.offsetTop) / animation.duration;
                        tween.progress(perc);
                        tween.timeScale(obj.speed);
                    } else if(animation.tween.progress() !== 0){
                        animation.tween.progress(0);
                    }
                });
            });
        }catch(err){
            console.error('Se está produciendo un error en las animaciones del scroll. Autodrestrucción de su portátil en 3... 2... 1... BOOOM!')
        }
    }
}
