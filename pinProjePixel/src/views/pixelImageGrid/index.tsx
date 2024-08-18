import React, { useState, useRef } from "react";
import "./pixelImageGrid.css";
import gridImage from "../../../public/grid2.png";

const PixelGame = () => {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  const imgRef = useRef(null);

  const handleMouseMove = (event) => {
    const imgRect = imgRef.current.getBoundingClientRect(); // Resmin ekran üzerindeki pozisyonunu alır
    const mouseX = event.clientX - imgRect.left; // Tıklanan x koordinatı
    const mouseY = event.clientY - imgRect.top; // Tıklanan y koordinatı

    // Koordinatları güncelle
    setCoordinates({ x: mouseX, y: mouseY });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center", // Dikeyde ortalar
        }}
      >
        <div
          style={{
            height: "600px",
            width: "600px",
            position: "relative",
          }}
        >
          <img
            id="pixelimg"
            ref={imgRef}
            draggable="false"
            unselectable="on"
            src={gridImage}
            alt="Pixel Image"
            onMouseMove={handleMouseMove}
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
              objectFit: "contain",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: `${Math.floor(coordinates.x / 30) * 30}px`,
              top: `${Math.floor(coordinates.y / 30) * 30}px`,
              width: "60px",
              height: "60px",
              border: "1px solid black",
              pointerEvents: "none", // Kullanıcı etkileşimlerini engeller
            }}
          ></div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <p>
            Koordinatlar: X: {coordinates.x.toFixed(2)}, Y:
            {coordinates.y.toFixed(2)}
          </p>
          <p>
            Kare ={" "}
            {Math.ceil(coordinates.x.toFixed(2) / 30) +
              Math.floor(coordinates.y.toFixed(2) / 30) * 20}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PixelGame;
