type PitchDescription =
    // | {
    //       name: string;
    //   }
    // | {
    //       pitch: string;
    //       octave: number;
    //   }
    {
        midi: number;
    };
type VelocityDescription = {
    velocity: number;
    // noteOffVelocity?: number;
};
type TimeDescription = {
    time: number;
    duration: number;
};
// | {
//       ticks: number;
//       durationTicks: number;
//   };

export type NoteCreaterJSON = PitchDescription &
    VelocityDescription &
    TimeDescription;

export type TrackCreaterJSON = {
    channel: number;
    instrumentNumber: number;
    notes: NoteCreaterJSON[];
}

export type NoteJSON = {
    time: number;
    midi: number;
    name: string;
    velocity: number;
    duration: number;
    ticks: number;
    durationTicks: number;
}
