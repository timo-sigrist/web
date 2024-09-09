function scriptOfSample(input, scripts) {
    const charCode = input.codePointAt(0)

    for (const script of scripts) {
      const ranges = script.ranges;
      for (const range of ranges) {
        if (charCode >= range[0] && charCode <= range[1]) {
          return script.name;
        }
      }
    }
  
    return 'unknown';
}

module.exports = { scriptOfSample }