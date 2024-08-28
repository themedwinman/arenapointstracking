const HOUSES = [
    "Braddock",
    "Cook",
    "Darby",
    "Youngman",
  ];
  
  export const houses = (config: any) => {
    const cfg = config || {};
    const count = cfg.count || 4;
    const section = cfg.section;
    const values = [];
    let i, value;
  
    for (i = 0; i < count; ++i) {
      value = HOUSES[Math.ceil(i) % 4];
      values.push(value.substring(0, section));
    }
  
    return values;
  };