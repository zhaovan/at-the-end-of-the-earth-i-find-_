function convertHeartRateBPMtoDuration(bpm) {
  return Math.floor(bpm / 40);
}

export function getHeartbeatData(data, startTime) {
  const currentTime = Date.now();

  if (data.length < 2)
    return {
      sensorOn: false,
      heartRate: 0,
    };

  const lastBeat = data[data.length - 1];
  const secondLastBeat = data[data.length - 2];

  const timestampLastBeat = parseInt(lastBeat.split(" ")[0]);
  const timestampSecondLastBeat = parseInt(secondLastBeat.split(" ")[0]);

  const bpm = parseInt(lastBeat.split(" ")[1]);
  const secondLastBPM = parseInt(secondLastBeat.split(" ")[1]);

  //   Need to do this calculatiuon to get add start time to how the browser treats time
  const arduinoTime = timestampLastBeat + startTime;
  console.log(arduinoTime, "arduinoTime");
  console.log(currentTime, "currentTime");
  console.log(startTime, "startTime");

  console.log(
    currentTime - arduinoTime < 5000,
    "currentTime - arduinoTime < 5000"
  );
  console.log(
    timestampLastBeat - timestampSecondLastBeat < 1500,
    "timestampLastBeat - timestampSecondLastBeat < 1500"
  );
  console.log(Math.abs(bpm - secondLastBPM) < 20);

  //   Timestamps are in milliseconds so we can just subtract them
  //  to get the difference in milliseconds (which is 1 second) here
  if (
    currentTime - arduinoTime < 5000 &&
    timestampLastBeat - timestampSecondLastBeat < 1500 &&
    Math.abs(bpm - secondLastBPM) < 20 &&
    bpm > 45 &&
    bpm < 200
  ) {
    return {
      sensorOn: true,
      heartRate: parseInt(lastBeat.split(" ")[1]),
      timestamp: currentTime,
    };
  } else {
    return {
      sensorOn: false,
      heartRate: 0,
      timestamp: currentTime,
    };
  }
}
