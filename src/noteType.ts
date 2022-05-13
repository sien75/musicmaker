type PitchDescription =
    | {
          name: string;
      }
    | {
          pitch: string;
          octave: number;
      }
    | {
          midi: number;
      };
type VelocityDescription = {
    velocity?: number;
    noteOffVelocity?: number;
};
type TimeDescription =
    | {
          time: number;
          duration?: number;
      }
    | {
          ticks: number;
          durationTicks?: number;
      };

export type NoteJSON = PitchDescription & VelocityDescription & TimeDescription;
