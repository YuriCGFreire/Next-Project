import React from 'react'

function Form(props) {
    return (
        <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
            </div>
            {props.children}
        </form>
    )
}

export default Form