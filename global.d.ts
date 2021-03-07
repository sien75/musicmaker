import Tone from 'src/_tone';

declare global {
    declare module '*.mp3' {
        const content: string;
        export default content;
    }
    interface Window {
        _musicmaker_current: Tone | null;
        _musicmaker_init: boolean;
    }
}
