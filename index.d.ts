interface ResponseTimestamp {
    createAt: number;
    updateAt: number;
}
interface Text extends ResponseTimestamp {
    id: string;
    text: string;
}
type Texts = Text[];