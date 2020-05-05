export default class Blog{
    public title:string;
    public subtitle:string;
    public description:string;
    public thumbnail:string;
    public urls:string[];
    public creation_date:number;
    public author:string;
    public active:boolean;
    public tags:string[];

    constructor(){
        this.title = '';
        this.description = '';
        this.subtitle = '';
        this.thumbnail = '';
        this.urls = [];
        this.author = '';
        this.active = true;
        this.creation_date = Date.now();
    }
}
