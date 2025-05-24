function convertHeartRateBPMtoDuration(bpm) {
  return Math.floor(bpm / 60) | 1;
}

export function getHeartbeatData(data, startTime) {
  const currentTime = Date.now();

  if (data.length < 2)
    return {
      sensorOn: false,
      heartRateDuration: 0,
    };

  const lastBeat = data[data.length - 1];
  const secondLastBeat = data[data.length - 2];

  const timestampLastBeat = parseInt(lastBeat.split(" ")[0]);
  const timestampSecondLastBeat = parseInt(secondLastBeat.split(" ")[0]);

  const bpm = parseInt(lastBeat.split(" ")[1]);
  const secondLastBPM = parseInt(secondLastBeat.split(" ")[1]);

  //   Need to do this calculatiuon to get add start time to how the browser treats time
  const arduinoTime = timestampLastBeat + startTime;
  console.log(arduinoTime);
  console.log(currentTime);
  console.log(startTime);

  //   Timestamps are in milliseconds so we can just subtract them
  //  to get the difference in milliseconds (which is 1 second) here
  if (
    currentTime - arduinoTime < 400000 &&
    timestampLastBeat - timestampSecondLastBeat < 1500 &&
    Math.abs(bpm - secondLastBPM) < 15 &&
    bpm > 50 &&
    bpm < 200
  ) {
    return {
      sensorOn: true,
      heartRateDuration: convertHeartRateBPMtoDuration(
        parseInt(lastBeat.split(" ")[1])
      ),
    };
  } else {
    return {
      sensorOn: false,
      heartRateDuration: 0,
    };
  }
}
