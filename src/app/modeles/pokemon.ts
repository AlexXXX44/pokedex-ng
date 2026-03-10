export interface Pokemon {
  // name: string;
  image: string;
  // apiTypes: { name: string; image: string }[];
// }
  types: [
    {
      slot: number;
      type: {
        name: string;
      }
    }
  ]
  sprites: {
    other: {
      dream_world: {
        front_default: string;
      }
    }
  }
}
