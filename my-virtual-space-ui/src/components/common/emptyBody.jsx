import React from 'react';

const EmptyBody = ({label, lenght, customThClass = ''}) => {

    return (
        <tbody className={"tbody " + customThClass}>
        <tr>
            <td className="td-0" colSpan={lenght}>{label}</td>
        </tr>
        </tbody>
    );
};

export default EmptyBody;
