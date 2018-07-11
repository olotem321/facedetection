import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({url, boxes}) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img id="inputImage" src={url} alt="" width="500px" height="auto" />
        {boxes.map(box => {
          return (
            <div
              key={box.topRow}
              style={{
                top: box.topRow,
                left: box.leftCol,
                right: box.rightCol,
                bottom: box.bottomRow
              }}
              className="bounding_box"
            />
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
