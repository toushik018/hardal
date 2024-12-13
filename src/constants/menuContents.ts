export interface MenuContent {
  name: string;
  count: number;
}

interface MenuContentsMap {
  [key: number]: {
    contents: MenuContent[];
  };
}

export const menuContents: MenuContentsMap = {
  1: {
    contents: [
      { name: "Salate", count: 2 },
      { name: "Dips", count: 1 },
      { name: "Desserts", count: 1 }
    ]
  },
  2: {
    contents: [
      { name: "Salate", count: 4 },
      { name: "Dips", count: 2 },
      { name: "Desserts", count: 2 }
    ]
  },
  3: {
    contents: [
      { name: "Salate", count: 6 },
      { name: "Dips", count: 2 },
      { name: "Desserts", count: 3 }
    ]
  },
  4: {
    contents: [
      { name: "Kanapees & Spieße", count: 3 }
    ]
  },
  5: {
    contents: [
      { name: "Kanapees & Spieße", count: 4 }
    ]
  },
  6: {
    contents: [
      { name: "Kanapees & Spieße", count: 6 }
    ]
  },
  7: {
    contents: [
      { name: "Halbe", count: 20 }
    ]
  },
  8: {
    contents: [
      { name: "Halbe", count: 30 },
      { name: "Wraps", count: 10 }
    ]
  },
  9: {
    contents: [
      { name: "Halbe", count: 40 },
      { name: "Ganze", count: 10 },
      { name: "Wraps", count: 15 }
    ]
  }
}; 