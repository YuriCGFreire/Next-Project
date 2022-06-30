import React from 'react'

function Input(props) {
    return (
        <div>
            <label htmlFor={props.htmlFor} className="sr-only">{props.text}</label>
            <input id={props.id} name={props.name} type={props.type} autoComplete={props.autoComplete} required className="mb-3 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-gray-900 focus:border-gray-900 focus:z-10 sm:text-sm" placeholder={props.text} />
        </div>
    )
}

export default Input