import React from 'react';

const usePreviousValue = (track) => {
  const ref = React.useRef(track);
  React.useEffect(() => {
    ref.current = track;
  });
  return ref.current;
}

export default usePreviousValue;
