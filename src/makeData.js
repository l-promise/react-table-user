import namor from 'namor';

const range = len => {
  const arr = [];
  for (let i = 0; i < len; i++) {
    arr.push(i);
  }
  return arr;
};

const newPerson = () => {
  const statusChance = Math.random();
  return {
    file: 'client/Assets/Resources/Lua/Buff.lua.txt',
    line: Math.floor(Math.random() * 400),
    id: namor.generate({ words: 1, numbers: 0 }),
    subid: 'lua_UninitVar',
    severity: Math.floor(Math.random() * 100),
    msg: 'Variable [eff] is assigned nil or not initialize in all branch',
    identifier: '{"identify":"eff"}',
    web_identify: Math.floor(Math.random() * 100),
    func_info:
      statusChance > 0.66
        ? 'relationship'
        : statusChance > 0.33
        ? 'complicated'
        : 'single',
    content: `110:`
  };
};

export default function makeData(...lens) {
  const makeDataLevel = (depth = 0) => {
    const len = lens[depth];
    return range(len).map(d => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined
      };
    });
  };

  return makeDataLevel();
}
