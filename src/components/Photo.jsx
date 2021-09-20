import React from 'react'

export const Photo = ({alt_description, urls: {regular}}) => {
    return (
        <div className="photo"> 
            <img src={regular} alt={alt_description}/>
        </div>
    )
}
