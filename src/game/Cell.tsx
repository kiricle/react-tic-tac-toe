import { CellValue } from './Board';

const Cell = ({ id, value, status, clickHandler }: CellValue) => {
    return (
        <div
            onClick={clickHandler}
            className={`cell ${status}`}
            data-id={id}
        >
            {value}
        </div>
    );
};

export default Cell;
