import { useState, useMemo, useCallback } from "react";
import "./pixelGrid.css";

const Index = () => {
  const gridSize = 100;
  const [selectedSize, setSelectedSize] = useState(1);
  const [hoveredCells, setHoveredCells] = useState<number[]>([]);
  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [displayedCells, setDisplayedCells] = useState<number[]>([
    100, 101, 102, 103,
  ]);

  const handleMouseEnter = useCallback(
    (cellId: number) => {
      const newHoveredCells = [];
      for (let i = 0; i < selectedSize; i++) {
        for (let j = 0; j < selectedSize; j++) {
          const nextCellId = cellId + i * gridSize + j;
          if (nextCellId < gridSize * gridSize) {
            newHoveredCells.push(nextCellId);
          }
        }
      }
      setHoveredCells(newHoveredCells);
    },
    [selectedSize, gridSize]
  );

  const handleCellClick = useCallback(() => {
    const isDisplayed = hoveredCells.some((cell) =>
      displayedCells.includes(cell)
    );

    if (isDisplayed) {
      alert("Seçilemez! Bu pikseller display durumunda.");
      return;
    }

    setSelectedCells((prevSelectedCells) => [
      ...prevSelectedCells,
      ...hoveredCells,
    ]);
    setDisplayedCells((prevDisplayedCells) => [
      ...prevDisplayedCells,
      ...hoveredCells,
    ]);
    alert(`Seçilen pikseller: ${hoveredCells.join(", ")}`);
  }, [hoveredCells, displayedCells]);

  const cells = useMemo(() => {
    return Array.from({ length: gridSize * gridSize }).map((_, index) => {
      const cellIndex = index + 1;
      const isHovered = hoveredCells.includes(cellIndex);
      const isSelected = selectedCells.includes(cellIndex);
      const isDisplayed = displayedCells.includes(cellIndex);

      let className = "cellStyle";
      if (isHovered) className += " hovered";
      if (isSelected) className += " selected";
      if (isDisplayed) className += " displayed";

      return (
        <div
          key={index}
          className={className}
          onMouseEnter={() => handleMouseEnter(cellIndex)}
          onClick={handleCellClick}
        ></div>
      );
    });
  }, [
    hoveredCells,
    selectedCells,
    displayedCells,
    handleMouseEnter,
    handleCellClick,
  ]);

  return (
    <div>
      <div>
        <label>
          Seçim boyutu:
          <select
            value={selectedSize}
            onChange={(e) => setSelectedSize(Number(e.target.value))}
          >
            <option value={1}>1x1</option>
            <option value={2}>2x2</option>
            <option value={3}>3x3</option>
            <option value={4}>4x4</option>
          </select>
        </label>
      </div>
      <div className="gridContainer">{cells}</div>
    </div>
  );
};

export default Index;
