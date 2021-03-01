import React from "react";

const Anime = ({anime, index, columns}) => {
    const getClass = column => column?.customThClass || "";

    return (
        <tr
            className="overlay row"
            key={anime.id}
        >
            {columns.map((column, i) =>
                column.path === 'index'
                    ? <td key={anime.id + i} className={getClass(column)}>{index + 1}</td>
                    : <td key={anime.id + i} className={getClass(column)}>{anime[column.path]}</td>)}
        </tr>
    );
}

export default Anime;