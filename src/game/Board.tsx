import Cell from './Cell';
import React, { useState } from 'react';

export interface CellValue {
    value: '' | 'X' | 'O';
    id: string;
    status: 'empty' | 'filled' | 'win-comb';
    clickHandler?: (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
}

const deepCopyCells = (prevCells: CellValue[]) =>
    JSON.parse(JSON.stringify(prevCells));

const startCells: CellValue[] = [
    { value: '', status: 'empty', id: '0' },
    { value: '', status: 'empty', id: '1' },
    { value: '', status: 'empty', id: '2' },
    { value: '', status: 'empty', id: '3' },
    { value: '', status: 'empty', id: '4' },
    { value: '', status: 'empty', id: '5' },
    { value: '', status: 'empty', id: '6' },
    { value: '', status: 'empty', id: '7' },
    { value: '', status: 'empty', id: '8' },
];

const Board = () => {
    const [cells, setCells] = useState(startCells);
    const [player1Turn, setPlayer1Turn] = useState(true);
    const [hasWinner, setHasWinner] = useState(false);

    const calculateWinner = (cells: CellValue[]) => {
        const combs = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let comb of combs) {
            if (
                cells[comb[0]].value === cells[comb[1]].value &&
                cells[comb[1]].value === cells[comb[2]].value &&
                cells[comb[0]].value != ''
            ) {
                setHasWinner(true);
                cells.forEach((cell) => {
                    cell.status = 'filled';
                });
                cells[comb[0]].status = 'win-comb';
                cells[comb[1]].status = 'win-comb';
                cells[comb[2]].status = 'win-comb';
                setCells((prev) => cells);
                return;
            }
        }
    };

    const resetGame = () => {
        setCells(startCells);
        setHasWinner(false);
        setPlayer1Turn(true);
    };

    const handleCellClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (hasWinner) return;
        const target = event.target as HTMLDivElement;
        const id = Number(target.getAttribute('data-id'));

        if (cells[id].status !== 'empty') return;

        setCells((prev) => {
            const newCells = deepCopyCells(prev);
            newCells[id].value = player1Turn ? 'X' : 'O';
            newCells[id].status = 'filled';
            setPlayer1Turn((prev) => !prev);
            calculateWinner(newCells);
            return newCells;
        });
    };

    return (
        <div className="board">
            {cells.map((cell) => (
                <Cell
                    key={cell.id}
                    value={cell.value}
                    status={cell.status}
                    id={cell.id}
                    clickHandler={handleCellClick}
                />
            ))}
            {hasWinner ? (
                <button
                    onClick={resetGame}
                    className="restart-btn"
                >
                    Restart
                </button>
            ) : null}
        </div>
    );
};

export default Board;
