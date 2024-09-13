class Preset {
    id: number;
    on: boolean;
    bri: number;
    transition: number;
    mainseg: number;
    seg: any;
    n: string;
    playlist: any;

    constructor(obj: any) {
        this.id = obj.id;
        this.on = obj.on;
        this.bri = obj.bri;
        this.transition = obj.transition;
        this.mainseg = obj.mainseg;
        this.seg = obj.seg;
        this.n = obj.n;
        this.playlist = obj.playlist;
    }
}

export default Preset;
