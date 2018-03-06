/**
 * Visit every unit and apply callback
 * @param side
 * @param callback(unit)
 */
export function walkSide(side, callback) {
  function helper(currentUnit) {
    callback(currentUnit);
    if (currentUnit.subUnits) {
      for (const subUnit of currentUnit.subUnits) {
        helper(subUnit);
      }
    }
  }

  for (const unit of side.units) {
    helper(unit);
  }
}

export function prepareScenario(scenario) {
  // add state attributes
  for (const side of scenario.sides) {
    walkSide(side, (unit) => {
      if (!unit.state) {
        unit.state = [];
      }
      unit._state = null;
    });
  }
  return scenario;
}

export function stringifyScenario(scenario) {
  return JSON.stringify(scenario, (name, val) => {
    if (name === "_state") return undefined;
    return val;
  }, "  ");
}

export function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substr(0, index) + chr + str.substr(index + 1);
}
